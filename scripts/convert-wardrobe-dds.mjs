import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { deflateSync } from "node:zlib";

const source = process.argv[2];
const destination = process.argv[3];

if (!source || !destination) {
  throw new Error("Usage: node scripts/convert-wardrobe-dds.mjs <source-folder> <destination-folder>");
}

const crcTable = Array.from({ length: 256 }, (_, value) => {
  let crc = value;
  for (let bit = 0; bit < 8; bit += 1) crc = (crc & 1) ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
  return crc >>> 0;
});

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const name = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  const checksum = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([length, name, data, checksum]);
}

function rgb565(value) {
  return [
    Math.round(((value >>> 11) & 31) * 255 / 31),
    Math.round(((value >>> 5) & 63) * 255 / 63),
    Math.round((value & 31) * 255 / 31),
  ];
}

function decodeDds(file) {
  if (file.toString("ascii", 0, 4) !== "DDS ") throw new Error("Not a DDS file");
  const height = file.readUInt32LE(12);
  const width = file.readUInt32LE(16);
  const pixels = Buffer.alloc(width * height * 4);
  const format = file.toString("ascii", 84, 88);
  if (format === "\0\0\0\0" && file.readUInt32LE(88) === 32) {
    for (let pixel = 0; pixel < width * height; pixel += 1) {
      const source = 128 + pixel * 4;
      const target = pixel * 4;
      pixels[target] = file[source + 2];
      pixels[target + 1] = file[source + 1];
      pixels[target + 2] = file[source];
      pixels[target + 3] = file[source + 3];
    }
    return { width, height, pixels };
  }
  if (!["DXT1", "DXT3", "DXT5"].includes(format)) throw new Error(`Unsupported DDS format ${format}`);

  let offset = 128;

  for (let blockY = 0; blockY < Math.ceil(height / 4); blockY += 1) {
    for (let blockX = 0; blockX < Math.ceil(width / 4); blockX += 1) {
      const colorOffset = format === "DXT1" ? offset : offset + 8;
      const color0Value = file.readUInt16LE(colorOffset);
      const color1Value = file.readUInt16LE(colorOffset + 2);
      const color0 = rgb565(color0Value);
      const color1 = rgb565(color1Value);
      const colors = [
        color0,
        color1,
        color0.map((channel, index) => Math.round((2 * channel + color1[index]) / 3)),
        color0.map((channel, index) => Math.round((channel + 2 * color1[index]) / 3)),
      ];
      if (format === "DXT1" && color0Value <= color1Value) {
        colors[2] = color0.map((channel, index) => Math.round((channel + color1[index]) / 2));
        colors[3] = [0, 0, 0];
      }
      const indices = file.readUInt32LE(colorOffset + 4);
      const alpha0 = format === "DXT5" ? file[offset] : 255;
      const alpha1 = format === "DXT5" ? file[offset + 1] : 255;
      const alphaValues = [alpha0, alpha1];
      if (format === "DXT5") {
        const steps = alpha0 > alpha1 ? 7 : 5;
        for (let index = 1; index < steps; index += 1) alphaValues.push(Math.round(((steps - index) * alpha0 + index * alpha1) / steps));
        if (alpha0 <= alpha1) alphaValues.push(0, 255);
      }
      let alphaIndices = 0n;
      if (format === "DXT5") for (let byte = 0; byte < 6; byte += 1) alphaIndices |= BigInt(file[offset + 2 + byte]) << BigInt(byte * 8);

      for (let pixel = 0; pixel < 16; pixel += 1) {
        const x = blockX * 4 + (pixel % 4);
        const y = blockY * 4 + Math.floor(pixel / 4);
        if (x >= width || y >= height) continue;
        const color = colors[(indices >>> (pixel * 2)) & 3];
        let alphaValue = 255;
        if (format === "DXT3") alphaValue = ((file[offset + Math.floor(pixel / 2)] >>> ((pixel % 2) * 4)) & 15) * 17;
        if (format === "DXT5") alphaValue = alphaValues[Number((alphaIndices >> BigInt(pixel * 3)) & 7n)];
        if (format === "DXT1" && color0Value <= color1Value && ((indices >>> (pixel * 2)) & 3) === 3) alphaValue = 0;
        const target = (y * width + x) * 4;
        pixels[target] = color[0];
        pixels[target + 1] = color[1];
        pixels[target + 2] = color[2];
        pixels[target + 3] = alphaValue;
      }
      offset += format === "DXT1" ? 8 : 16;
    }
  }
  return { width, height, pixels };
}

function encodePng({ width, height, pixels }) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  const rows = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) pixels.copy(rows, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(rows, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

mkdirSync(destination, { recursive: true });
const files = readdirSync(source).filter((file) => file.toLowerCase().endsWith(".dds"));
for (const file of files) {
  const image = decodeDds(readFileSync(join(source, file)));
  writeFileSync(join(destination, `${basename(file, ".dds")}.png`), encodePng(image));
}
console.log(`Converted ${files.length} wardrobe icons to ${destination}`);
