"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Crown,
  Download,
  Gem,
  Map,
  MessageCircle,
  Shield,
  Sparkles,
  Swords,
  Trophy,
  Users,
} from "lucide-react";
import { motion, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import HomeGameplaySection from "./HomeGameplaySection";
import HomeServerStatus from "./HomeServerStatus";

const news = [
  {
    date: "MAY 02, 2026",
    category: "EVENTS",
    title: "Prepare for battle",
    text: "The complete daily event schedule is now available. Gather your guild and prepare for war.",
  },
  {
    date: "MAY 01, 2026",
    category: "ANNOUNCEMENT",
    title: "The realm is open",
    text: "Create your account, download the classic client, and begin your journey with the community.",
  },
];

const pillars = [
  {
    icon: Shield,
    number: "01",
    title: "Earn every upgrade",
    text: "Build equipment through hunting, mining, quests, and a player-driven economy where progress still has weight.",
  },
  {
    icon: Swords,
    number: "02",
    title: "Master classic combat",
    text: "Return to skill-based class battles, guild rivalries, city wars, and scheduled tournaments.",
  },
  {
    icon: Users,
    number: "03",
    title: "Leave a legacy",
    text: "Form alliances, climb the rankings, and become part of a persistent world built for the long road.",
  },
];

const realmFeatures = [
  [Crown, "Level 130", "Classic level cap"],
  [Gem, "Maximum +9", "Meaningful equipment ceiling"],
  [Trophy, "Daily battles", "Events and city wars"],
  [Map, "Classic world", "Familiar maps and quests"],
] as const;

function getEuropeClockParts() {
  const values = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (type: string) => Number(values.find((part) => part.type === type)?.value || 0);
  return [get("hour"), get("minute"), get("second")];
}

export default function HomePageTemplate() {
  const [serverClock, setServerClock] = useState([0, 0, 0]);

  useEffect(() => {
    setServerClock(getEuropeClockParts());
    const timer = window.setInterval(() => setServerClock(getEuropeClockParts()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const clock = serverClock.map((part) => part.toString().padStart(2, "0")).join(":");

  return (
    <MotionConfig reducedMotion="user">
      <div className="classic-pvp-home min-h-screen bg-[#0b111c] text-[#282318]">
        <Navigation />

        <main>
          <section className="home-hero relative isolate min-h-[780px] overflow-hidden border-b border-[#c1984d]/50 bg-[#0b111c] pt-[78px]">
            <video className="home-hero-video" autoPlay muted loop playsInline aria-hidden="true">
              <source src="/assets/maintenance-bg.mp4" type="video/mp4" />
            </video>
            <div className="home-hero-overlay absolute inset-0 -z-10" />
            <div className="home-hero-grid absolute inset-0 -z-10 opacity-20" />

            <motion.div
              animate={{ opacity: [0.2, 0.42, 0.2], scale: [1, 1.08, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute right-[8%] top-[18%] -z-10 size-[28rem] rounded-full bg-[#d7ae59]/15 blur-[90px]"
            />

            <div className="relative mx-auto grid min-h-[700px] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-10">
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="relative z-10"
              >
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 border border-[#d7ae59]/35 bg-[#07101d]/75 px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#ecd38f] backdrop-blur">
                    <span className="size-2 rounded-full bg-[#48d597] shadow-[0_0_12px_#48d597]" />
                    Nimbus Conquer · Classic PvP Realm
                  </span>
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#aeb9c8]">
                    <Clock3 size={13} className="text-[#d7ae59]" /> {clock} Berlin
                  </span>
                </div>

                <h1 className="max-w-3xl font-fantasy text-5xl font-bold leading-[.98] text-[#fff8e8] drop-shadow-[0_4px_20px_rgba(0,0,0,.65)] sm:text-7xl xl:text-[5.25rem]">
                  Enter the arena.
                  <span className="mt-2 block bg-gradient-to-r from-[#f4dd94] via-[#d8aa4e] to-[#fff1bd] bg-clip-text text-transparent">
                    Claim your name.
                  </span>
                </h1>

                <p className="mt-7 max-w-2xl text-base leading-7 text-[#c8d0dc] sm:text-lg">
                  Build your character through the hunt, then prove it where it matters—in tournaments, city wars, guild battles, and open-world rivalries.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Link href="/register" className="home-primary-cta group">
                    Begin your journey
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/download" className="home-secondary-cta">
                    <Download size={16} /> Download client
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#aeb9c8]">
                  <span className="flex items-center gap-2"><Sparkles size={13} className="text-[#d7ae59]" /> Earned progression</span>
                  <span className="flex items-center gap-2"><Swords size={13} className="text-[#d7ae59]" /> PK tournaments</span>
                  <span className="flex items-center gap-2"><Users size={13} className="text-[#d7ae59]" /> City and guild wars</span>
                </div>
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, scale: 0.94, x: 24 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.2 }}
                className="relative mx-auto w-full max-w-[570px]"
              >
                <div className="relative aspect-[16/11]">
                  <Image
                    src="/assets/nimbus-official-logo.png"
                    alt="Nimbus Conquer"
                    fill
                    priority
                    sizes="(max-width: 1024px) 85vw, 44vw"
                    className="object-contain drop-shadow-[0_28px_35px_rgba(0,0,0,.75)]"
                  />
                </div>
                <div className="home-realm-card">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#9caabd]">The next fight is waiting</p>
                    <p className="mt-1 font-fantasy text-xl text-[#fff1c9]">Enter the arena</p>
                  </div>
                  <Link href="/wiki" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#e8c778] hover:text-white">
                    View player guide <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.aside>
            </div>

            <div className="relative border-t border-white/10 bg-[#07101d]/75 px-6 py-4 backdrop-blur-md">
              <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-center text-[10px] font-bold uppercase tracking-[.18em] text-[#9eabba] sm:text-left">
                  Help more adventurers discover Nimbus
                </p>
                <div className="vote-promotions !mt-0">
                  <a className="xtreme-home-vote" href="https://www.xtremetop100.com/in.php?site=1132379570" target="_blank" rel="noopener noreferrer">
                    <span>Support Nimbus</span>
                    <img src="https://www.xtremetop100.com/votenew.jpg" alt="Vote for Nimbus on XtremeTop100" />
                  </a>
                  <a className="nostalgic-vote" href="https://nostalgic.gg/en/conquer-online/nimbusconquer-2" target="_blank" rel="noopener noreferrer">
                    <img src="https://nostalgic.gg/api/widgets/banner/1894.svg" alt="Vote for Nimbus on Nostalgic.gg" width="200" height="80" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <HomeServerStatus />

          <section className="pvp-progression relative overflow-hidden bg-[#eadbb5] px-6 py-24 sm:px-10">
            <div className="home-parchment-pattern absolute inset-0 opacity-35" />
            <div className="relative mx-auto max-w-7xl">
              <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <p className="home-section-kicker">The path of a conqueror</p>
                  <h2 className="mt-4 max-w-lg font-fantasy text-4xl leading-[1.08] text-[#263652] sm:text-6xl">
                    Every advantage is <span className="text-[#8a342e]">earned.</span>
                  </h2>
                  <p className="mt-6 max-w-md leading-7 text-[#655b49]">
                    Classic PvP starts before the first strike. Hunt, upgrade, trade, build your guild, and prepare for the battles that decide who rules the realm.
                  </p>
                  <Link href="/wiki" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#8a342e] transition hover:text-[#263652]">
                    Explore the game guide <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="space-y-4">
                  {pillars.map(({ icon: Icon, number, title, text }, index) => (
                    <motion.article
                      key={title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ delay: index * 0.08 }}
                      className="group grid gap-5 border border-[#b88b4d] bg-[#f5e9c9]/90 p-6 shadow-[5px_5px_0_#c5a46d] transition hover:-translate-y-1 hover:shadow-[7px_7px_0_#ad7b3f] sm:grid-cols-[auto_1fr_auto] sm:items-center"
                    >
                      <span className="grid size-14 place-items-center border border-[#b88b4d] bg-[#263652] text-[#e8c574]">
                        <Icon size={23} />
                      </span>
                      <div>
                        <h3 className="font-fantasy text-2xl text-[#263652]">{title}</h3>
                        <p className="mt-2 max-w-xl text-sm leading-6 text-[#6d614c]">{text}</p>
                      </div>
                      <span className="font-fantasy text-3xl text-[#a66e42]/45">{number}</span>
                    </motion.article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="pvp-foundations border-y border-[#b68c48]/50 bg-[#111d2d] px-6 py-20 sm:px-10">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="home-section-kicker text-[#d7ae59]">Realm foundations</p>
                  <h2 className="mt-3 font-fantasy text-4xl text-[#fff5dc] sm:text-5xl">Classic at heart. <span className="text-[#d9b45f]">Built for battle.</span></h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-[#aeb9c8]">A focused rule set keeps achievement readable and gives every hunt, trade, and battle a place in your progression.</p>
              </div>

              <div className="mt-10 grid gap-px overflow-hidden border border-[#c49a51]/35 bg-[#c49a51]/35 sm:grid-cols-2 lg:grid-cols-4">
                {realmFeatures.map(([Icon, title, text], index) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.07 }}
                    className="bg-[#17263b] p-6 transition hover:bg-[#1c304a]"
                  >
                    <Icon size={21} className="text-[#d9b45f]" />
                    <p className="mt-5 font-fantasy text-2xl text-[#fff1c9]">{title}</p>
                    <p className="mt-2 text-xs uppercase tracking-[.14em] text-[#9faec0]">{text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <HomeGameplaySection />

          <section className="pvp-news relative bg-[#eadbb5] px-6 py-24 sm:px-10">
            <div className="home-parchment-pattern absolute inset-0 opacity-30" />
            <div className="relative mx-auto max-w-7xl">
              <div className="flex flex-col justify-between gap-5 border-b border-[#a8783f] pb-5 sm:flex-row sm:items-end">
                <div>
                  <p className="home-section-kicker">Realm bulletin</p>
                  <h2 className="mt-3 font-fantasy text-4xl text-[#263652] sm:text-5xl">Latest from <span className="text-[#8a342e]">Nimbus</span></h2>
                </div>
                <Link href="/news" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#8a342e] hover:text-[#263652]">
                  View all news <ArrowRight size={14} />
                </Link>
              </div>

              <div className="mt-8 divide-y divide-[#b98a4d] border-y border-[#b98a4d]">
                {news.map((item, index) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="group grid gap-5 py-7 sm:grid-cols-[150px_1fr_auto] sm:items-center"
                  >
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#8a342e]">{item.category}</p>
                      <p className="mt-2 text-xs text-[#77684f]">{item.date}</p>
                    </div>
                    <div>
                      <h3 className="font-fantasy text-2xl text-[#263652] transition group-hover:text-[#8a342e]">{item.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#655b49]">{item.text}</p>
                    </div>
                    <Link href="/news" aria-label={`Read ${item.title}`} className="grid size-10 place-items-center border border-[#9f713d] text-[#8a342e] transition group-hover:bg-[#8a342e] group-hover:text-[#fff2d2]">
                      <ArrowRight size={16} />
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section className="pvp-community relative overflow-hidden bg-[#0b111c] px-6 py-24 sm:px-10">
            <div className="home-hero-grid absolute inset-0 opacity-10" />
            <div className="relative mx-auto max-w-7xl">
              <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
                <div>
                  <p className="home-section-kicker text-[#d7ae59]">Join the fellowship</p>
                  <h2 className="mt-3 font-fantasy text-4xl text-[#fff4d9] sm:text-5xl">The realm lives through <span className="text-[#d8b866]">its people.</span></h2>
                  <p className="mt-5 max-w-md text-sm leading-7 text-[#aeb8c9]">Find party members, follow announcements, meet rival guilds, and help shape the next chapter of Nimbus.</p>
                  <div className="mt-8 space-y-3 text-sm text-[#c4ceda]">
                    <p className="flex items-center gap-3"><CalendarDays size={16} className="text-[#d8b866]" /> Live event announcements</p>
                    <p className="flex items-center gap-3"><MessageCircle size={16} className="text-[#d8b866]" /> Player support and discussion</p>
                    <p className="flex items-center gap-3"><Users size={16} className="text-[#d8b866]" /> Guild recruitment and community</p>
                  </div>
                  <a href="https://www.facebook.com/nimbusconquer" target="_blank" rel="noopener noreferrer" className="home-secondary-cta mt-8">
                    Follow on Facebook <ArrowRight size={15} />
                  </a>
                </div>

                <div className="overflow-hidden border border-[#b68c48]/55 bg-[#121f31] p-3 shadow-[8px_8px_0_rgba(0,0,0,.25)] sm:p-5">
                  <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center bg-[#5865f2] text-white"><MessageCircle size={20} /></span>
                      <div>
                        <h3 className="font-fantasy text-xl text-[#fff4d9]">Nimbus Discord</h3>
                        <p className="text-[9px] font-bold uppercase tracking-[.15em] text-[#95a4b8]">Official community server</p>
                      </div>
                    </div>
                    <span className="hidden items-center gap-2 text-[9px] font-bold uppercase tracking-[.15em] text-[#53d79a] sm:flex"><span className="size-2 rounded-full bg-[#53d79a]" /> Community online</span>
                  </div>
                  <iframe
                    title="Nimbus Conquer Discord server"
                    src="https://discord.com/widget?id=1539705483064254486&theme=dark"
                    className="h-[500px] w-full border-0"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="pvp-final-cta border-y border-[#b98a45]/60 bg-[#203653] px-6 py-14 sm:px-10">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 text-center lg:flex-row lg:text-left">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#dfbd6e]">Your story is waiting</p>
                <h2 className="mt-2 font-fantasy text-3xl text-[#fff4d9] sm:text-4xl">The realm remembers its champions.</h2>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/register" className="home-primary-cta">Create an account <ArrowRight size={16} /></Link>
                <Link href="/download" className="home-secondary-cta"><Download size={16} /> Get the client</Link>
              </div>
            </div>
          </section>

          <Script id="facebook-sdk" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v24.0" strategy="afterInteractive" />
        </main>

        <footer className="pvp-footer">
          <div><Link href="/">NIMBUS CONQUER</Link><span>CLASSIC PVP REALM</span></div>
          <p>Classic PvP · Earn your power · Fight for your name</p>
        </footer>
      </div>
    </MotionConfig>
  );
}
