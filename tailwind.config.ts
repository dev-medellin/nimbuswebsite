import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: { fontFamily: { fantasy: ["Cinzel", "Georgia", "serif"] } } }, plugins: [] };
export default config;
