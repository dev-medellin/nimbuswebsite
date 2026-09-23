"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Download, Flag, Shield, Swords, Users, MessageCircle } from "lucide-react";
import { motion, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import GameplayVisionSection from "../components/GameplayVisionSection";
import ServerStatus from "../components/ServerStatus";

const news = [
  ["MAY 02, 2026", "Event times", "The complete daily event schedule is now available. Gather your guild and prepare for war."],
  ["MAY 01, 2026", "The realm is open", "Create your account, download the classic client, and begin your journey with the community."],
];

function getEuropeClockParts() {
  const values = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Berlin", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).formatToParts(new Date());
  const get = (type: string) => Number(values.find((part) => part.type === type)?.value || 0);
  return [get("hour"), get("minute"), get("second"), 0];
}

export default function HomePage() {
  const [launchCountdown, setLaunchCountdown] = useState([0, 0, 0, 0]);

  useEffect(() => { setLaunchCountdown(getEuropeClockParts()); const timer = window.setInterval(() => setLaunchCountdown(getEuropeClockParts()), 1000); return () => window.clearInterval(timer); }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#101827] text-[#29251d]">
        <Navigation />
        <main>
          <section className="relative min-h-[690px] overflow-hidden border-b-4 border-[#7d5427] bg-[#172a43] pt-[78px]">
            <video className="home-hero-video" autoPlay muted loop playsInline aria-hidden="true"><source src="/assets/maintenance-bg.mp4" type="video/mp4" /></video>
            <div className="hero-overlay absolute inset-0" />
            <motion.div animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.1, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute left-[58%] top-[12%] size-72 rounded-full bg-[#e6c56d]/20 blur-3xl" />
            <div className="relative mx-auto grid min-h-[612px] max-w-6xl items-center gap-10 px-6 py-14 lg:grid-cols-[.95fr_1.05fr] lg:px-10">
              <motion.div initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="relative z-10">
                <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15, duration: .5 }} className="mb-5 inline-flex items-center gap-2 border border-[#d6ae5d]/60 bg-[#0b1422]/70 px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#e5c77e]"><Flag size={13} /> European classic realm</motion.div>
                <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .7 }} className="max-w-xl font-fantasy text-5xl font-bold leading-[1.05] text-[#fff8e9] drop-shadow-[3px_3px_0_#4b2630] sm:text-7xl">Return to the<br /><motion.span animate={{ textShadow: ["0 0 0px #e2b955", "0 0 22px #e2b955", "0 0 0px #e2b955"] }} transition={{ duration: 3.2, repeat: Infinity }} className="text-[#e2b955]">Golden Age</motion.span></motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55, duration: .7 }} className="mt-6 max-w-lg text-base leading-7 text-[#d0d5dc]">A faithful classic Conquer Online adventure for players who remember when every level, item, and duel mattered.</motion.p>
                <div className="hero-launch-countdown" aria-label="Current time in Europe/Berlin"><p>EUROPE/BERLIN SERVER TIME</p><div className="hero-europe-clock"><strong>{launchCountdown[0].toString().padStart(2, "0")}:{launchCountdown[1].toString().padStart(2, "0")}:{launchCountdown[2].toString().padStart(2, "0")}</strong></div></div>
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .75, duration: .6 }} className="mt-8 flex flex-wrap gap-3"><motion.div whileHover={{ y: -5, scale: 1.03 }} whileTap={{ scale: .98 }}><Link href="/download" className="inline-flex items-center gap-3 border border-[#d6ae5d]/70 bg-[#0c1728]/80 px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-[#f0d38b] transition hover:bg-[#263b57]"><Download size={15} /> Download client</Link></motion.div></motion.div>
                <div className="vote-promotions">
                  <a className="xtreme-home-vote" href="https://www.xtremetop100.com/in.php?site=1132379570" target="_blank" rel="noopener noreferrer"><span>Support Nimbus</span><img src="https://www.xtremetop100.com/votenew.jpg" alt="Vote for us" /></a>
                  <a className="nostalgic-vote" href="https://nostalgic.gg/en/conquer-online/nimbusconquer-2" target="_blank" rel="noopener noreferrer"><img src="https://nostalgic.gg/api/widgets/banner/1894.svg" alt="Vote on Nostalgic.gg" width="200" height="80" /></a>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: .88, x: 28 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1, delay: .25, ease: "easeOut" }} className="relative hidden h-[510px] lg:block"><motion.div animate={{ y: [0, -13, 0], rotate: [0, .7, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0"><Image src="/assets/nimbus-official-logo.png" alt="Official Nimbus Conquer logo" fill priority sizes="50vw" className="object-contain drop-shadow-[0_24px_25px_rgba(0,0,0,.65)]" /></motion.div></motion.div>
            </div>
          </section>

          <ServerStatus />

          <section className="bg-[#e6d3a5] px-6 py-20 sm:px-10"><div className="mx-auto max-w-6xl"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#8a342e]">The old ways live again</p><h2 className="mt-3 font-fantasy text-4xl leading-tight text-[#263652] sm:text-5xl">A server made<br />for <span className="text-[#8a342e]">legends.</span></h2><p className="mt-5 leading-7 text-[#5e5545]">No crowded menus. No disposable gear. Just classic maps, guild wars, meaningful upgrades, and a European community that plays together.</p><Link href="/wiki" className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8a342e] hover:text-[#263652]">Read the chronicles <ArrowRight size={14} /></Link></div><div className="grid gap-4 sm:grid-cols-3">{[[Shield, "Earn your armor", "Progression with purpose."], [Swords, "Fight with honor", "Classic PvP and guild wars."], [Users, "Find your people", "A community that remembers."]].map(([Icon, title, text]) => <div className="border-2 border-[#b28a4e] bg-[#f2e4bd] p-5 shadow-[3px_3px_0_#b28a4e]" key={title as string}><span className="grid size-11 place-items-center border border-[#b28a4e] bg-[#263652] text-[#e8c574]"><Icon size={20} /></span><h3 className="mt-5 font-fantasy text-lg text-[#263652]">{title as string}</h3><p className="mt-2 text-sm leading-6 text-[#6d614c]">{text as string}</p></div>)}</div></div></div></section>

          <section className="border-y-4 border-[#14243a] bg-[#253c59] px-6 py-20 sm:px-10"><div className="mx-auto max-w-6xl"><div className="text-center"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#e1bd68]">The server chronicle</p><h2 className="mt-3 font-fantasy text-4xl text-[#fff4d9] sm:text-5xl">Built for the <span className="text-[#dfb85f]">long road</span></h2></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[["Max +9", "Upgrade ceiling"], ["Max Level 130", "Classic progression"], ["Drop DB, Meteor, and +1 Compose Random Item", "Reward system"], ["Real Co Level Experience", "Authentic adventure"], ["Hard Socket Rate", "Meaningful upgrades"], ["Long Term Server", "Built to endure"]].map(([title, text], index) => <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .08 }} whileHover={{ y: -4 }} className="border-2 border-[#b98a45] bg-[#1b2b43] p-5 shadow-[3px_3px_0_#111b2c]" key={title}><p className="font-fantasy text-xl text-[#e6c878]">{title}</p><p className="mt-2 text-xs uppercase tracking-wider text-[#b9c5d5]">{text}</p></motion.div>)}</div></div></section>

          <GameplayVisionSection />

          <section className="bg-[#e6d3a5] px-6 py-20 sm:px-10"><div className="mx-auto max-w-6xl"><div className="flex items-end justify-between border-b-2 border-[#b28a4e] pb-4"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#8a342e]">Realm bulletin</p><h2 className="mt-2 font-fantasy text-4xl text-[#263652]">Latest <span className="text-[#8a342e]">news</span></h2></div><Link href="/news" className="text-xs font-bold uppercase tracking-widest text-[#8a342e]">All news →</Link></div><div className="mt-8 grid gap-5 md:grid-cols-2">{news.map(([date, title, text]) => <article className="border-2 border-[#b28a4e] bg-[#f2e4bd] p-6 shadow-[3px_3px_0_#b28a4e]" key={title}><p className="text-[10px] font-bold tracking-[.2em] text-[#8a342e]">{date}</p><h3 className="mt-3 font-fantasy text-2xl text-[#263652]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#6d614c]">{text}</p><Link href="/news" className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8a342e]">Read announcement <ArrowRight size={13} /></Link></article>)}</div></div></section>
          <section className="bg-[#101827] px-6 py-20 sm:px-10"><div className="mx-auto max-w-6xl"><div className="text-center"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#d8b866]">Join the fellowship</p><h2 className="mt-3 font-fantasy text-4xl text-[#fff4d9]">Our <span className="text-[#d8b866]">community</span></h2><p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#aeb8c9]">Meet fellow adventurers, follow server news, and join the official Nimbus community.</p></div><div className="mt-10 grid gap-6 md:grid-cols-2"><div className="border-2 border-[#586b87] bg-[#1d304c] p-6 shadow-[4px_4px_0_#0a101b]"><div className="flex items-center gap-4 border-b border-[#8292aa]/30 pb-5"><span className="grid size-12 place-items-center bg-[#586b87] text-[#fff4d9]"><MessageCircle size={24} /></span><div><h3 className="font-fantasy text-2xl text-[#fff4d9]">Discord</h3><p className="text-xs uppercase tracking-widest text-[#b8c5d6]">Official community server</p></div></div><div className="mt-5 flex justify-center overflow-hidden bg-[#101827]/60"><iframe title="Nimbus Conquer Discord server" src="https://discord.com/widget?id=1539705483064254486&theme=dark" className="h-[500px] w-full max-w-[510px] border-0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" /></div></div><div className="border-2 border-[#586b87] bg-[#1d304c] p-6 shadow-[4px_4px_0_#0a101b]"><div className="flex items-center gap-4 border-b border-[#8292aa]/30 pb-5"><span className="grid size-12 place-items-center bg-[#8a342e] font-bold text-2xl text-[#fff4d9]">f</span><div><h3 className="font-fantasy text-2xl text-[#fff4d9]">Facebook</h3><p className="text-xs uppercase tracking-widest text-[#b8c5d6]">Community updates</p></div></div><div className="mt-5 flex min-h-28 items-center justify-center overflow-hidden bg-[#101827]/60"><div className="fb-page" data-href="https://www.facebook.com/nimbusconquer" data-tabs="timeline,events" data-width="500" data-height="500" data-hide-cover="false" data-show-facepile="true" data-adapt-container-width="true" data-lazy="true"><blockquote cite="https://www.facebook.com/nimbusconquer" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/nimbusconquer">Nimbus Conquer on Facebook</a></blockquote></div></div></div></div></div></section>
          <Script id="facebook-sdk" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v24.0" strategy="afterInteractive" />
        </main>
        <footer className="border-t-4 border-[#7d5427] bg-[#111a29] px-6 py-8 text-center text-xs text-[#9ba8ba] sm:px-10"><span className="font-fantasy text-[#dcb766]">✦ NIMBUS CONQUER</span><span className="mx-3 hidden sm:inline">·</span><span className="mt-2 block sm:mt-0 sm:inline">A classic European realm for a new generation of heroes</span></footer>
      </div>
    </MotionConfig>
  );
}
