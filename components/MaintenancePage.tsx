"use client";

import Image from "next/image";
import { ArrowUpRight, Hammer, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const discordUrl = "https://discord.gg/GahvDNZTB";

// Fixed to Europe/Berlin time: September 12, 2026 is CEST (UTC+2).
const openingDate = new Date("2026-09-12T18:00:00+02:00").getTime();

function getTimeLeft() {
  const difference = Math.max(0, openingDate - Date.now());
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function MaintenancePage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="maintenance-shell">
      <video className="maintenance-video" autoPlay muted loop playsInline aria-hidden="true">
        <source src="/assets/maintenance-bg.mp4" type="video/mp4" />
      </video>
      <div className="maintenance-backdrop" aria-hidden="true" />
      <div className="maintenance-vignette" aria-hidden="true" />
      <div className="maintenance-stars" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => (
          <i key={index} style={{ "--star-x": `${8 + index * 8}%`, "--star-y": `${12 + (index * 19) % 72}%`, "--star-delay": `${index * 0.4}s` } as React.CSSProperties} />
        ))}
      </div>
      <section className="maintenance-content">
        <div className="maintenance-rule"><span /><Sparkles size={15} /><span /></div>
        <p className="maintenance-kicker">NIMBUS CONQUER</p>
        <Image className="maintenance-logo" src="/assets/nimbus-official-logo.png" alt="Nimbus Conquer" width={520} height={285} priority />
        <p className="maintenance-status">THE REALM IS BEING FORGED</p>
        <h1 className="maintenance-title">Coming<br /><span>soon</span></h1>
        <p className="maintenance-copy">Our gates are closed while we polish the world, tune the battles, and prepare Nimbus Conquer for its first brave adventurers. For more server updates, join us on Discord so we can all stay up to date together.</p>
        <div className="countdown" aria-label="Countdown to opening on September 12, 2026 at 6 PM Central European Summer Time">
          {([['days', timeLeft.days], ['hours', timeLeft.hours], ['minutes', timeLeft.minutes], ['seconds', timeLeft.seconds]] as const).map(([label, value]) => (
            <div className="countdown-unit" key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>
          ))}
        </div>
        <p className="opening-date">OPENING SEPTEMBER 12, 2026 · 6:00 PM CEST (EUROPE/BERLIN)</p>
        <a className="discord-button" href={discordUrl} target="_blank" rel="noopener noreferrer"><span className="discord-mark">◉</span> Join us on Discord <ArrowUpRight size={15} /></a>
        <p className="maintenance-note"><Hammer size={13} /> Stay close. The adventure begins soon.</p>
        <div className="vote-promotions">
          <a className="xtreme-vote" href="https://www.xtremetop100.com/in.php?site=1132379570" target="_blank" rel="noopener noreferrer">
            <img src="https://www.xtremetop100.com/votenew.jpg" alt="Vote for us" />
          </a>
          <a className="nostalgic-vote" href="https://nostalgic.gg/en/conquer-online/nimbusconquer-2" target="_blank" rel="noopener noreferrer">
            <img src="https://nostalgic.gg/api/widgets/banner/1894.svg" alt="Vote on Nostalgic.gg" width="200" height="80" />
          </a>
        </div>
      </section>
    </main>
  );
}
