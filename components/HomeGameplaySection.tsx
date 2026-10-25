"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crosshair, Pickaxe, ScrollText } from "lucide-react";
import { motion } from "framer-motion";

const experiences = [
  {
    icon: Crosshair,
    title: "Prepare for combat",
    text: "Every hunt strengthens the character you bring into tournaments, city wars, and guild battles.",
  },
  {
    icon: Pickaxe,
    title: "Build your arsenal",
    text: "Mining, trading, and rare drops create a player-led economy where equipment carries real value.",
  },
  {
    icon: ScrollText,
    title: "Fight for the realm",
    text: "Scheduled battles, boss encounters, PK tournaments, and guild wars keep rivalries alive every week.",
  },
];

export default function HomeGameplaySection() {
  return (
    <section className="pvp-gameplay overflow-hidden bg-[#08101b] px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative min-h-[440px] overflow-hidden border border-[#bd9148]/65 shadow-[10px_10px_0_#101c2c]"
          >
            <Image
              src="/assets/gameplay/gameplay-1.png"
              alt="A Nimbus Conquer player battling Birdmen"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07101d] via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#e0bb66]">From the fields of Wind Plain</p>
              <h2 className="mt-2 max-w-xl font-fantasy text-4xl leading-tight text-[#fff4d9] sm:text-5xl">Every hunt prepares you for the next fight.</h2>
            </div>
          </motion.div>

          <div className="flex flex-col justify-between border border-[#bd9148]/50 bg-[#111f31] p-6 shadow-[7px_7px_0_#050a11] sm:p-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#d8b866]">Life in the realm</p>
              <p className="mt-4 text-sm leading-7 text-[#aeb9c8]">Train alone, organize a guild, control the market, and step into battle when the realm calls for champions.</p>
            </div>

            <div className="my-8 divide-y divide-white/10 border-y border-white/10">
              {experiences.map(({ icon: Icon, title, text }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="grid grid-cols-[auto_1fr] gap-4 py-5"
                >
                  <span className="grid size-10 place-items-center border border-[#b98a45]/60 text-[#d8b866]"><Icon size={18} /></span>
                  <div>
                    <h3 className="font-fantasy text-xl text-[#fff1c9]">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-[#96a5b8]">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/events" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#d8b866] hover:text-white">
              See realm events <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {[
            ["/assets/gameplay/gameplay-2.png", "Face the wilds", "Classic monster fields reward preparation and persistence."],
            ["/assets/gameplay/gameplay-3.png", "Chase the rare drop", "The next hunt can change your character's entire journey."],
          ].map(([image, title, text], index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.1 }}
              className="group grid overflow-hidden border border-[#6d7e94]/45 bg-[#111f31] sm:grid-cols-[190px_1fr]"
            >
              <div className="relative min-h-[190px] overflow-hidden">
                <Image src={image} alt="" fill sizes="190px" className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center p-6">
                <h3 className="font-fantasy text-2xl text-[#fff1c9]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#9fadc0]">{text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
