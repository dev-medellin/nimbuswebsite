import { ArrowUpRight } from "lucide-react";
import Navigation from "./Navigation";

export default function AccessUnavailable({ title, message }: { title: string; message: string }) {
  return (
    <div className="min-h-screen bg-[#101827] text-[#fff8e9]">
      <Navigation />
      <main className="flex min-h-screen items-center justify-center px-6 pt-20 text-center">
        <div className="max-w-xl border-2 border-[#b28a4e] bg-[#172a43] p-8 shadow-[6px_6px_0_#0b111c] sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-[#e1bd68]">Server not yet open</p>
          <h1 className="mt-4 font-fantasy text-4xl text-[#fff8e9] sm:text-5xl">{title}</h1>
          <p className="mt-5 leading-7 text-[#cbd2dc]">{message}</p>
          <p className="mt-4 text-xs font-bold uppercase tracking-[.14em] text-[#d8b866]">Opening September 12, 2026 · 6:00 PM CEST (Europe/Berlin)</p>
          <a className="mt-7 inline-flex items-center gap-3 border-2 border-[#7f8cff] bg-gradient-to-b from-[#5865F2] to-[#4752c4] px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-white shadow-[0_4px_0_#242a68] transition hover:-translate-y-0.5 hover:brightness-110" href="https://discord.gg/GahvDNZTB" target="_blank" rel="noopener noreferrer">Join us on Discord <ArrowUpRight size={15} /></a>
        </div>
      </main>
    </div>
  );
}
