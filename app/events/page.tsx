"use client";

import Navigation from "../../components/Navigation";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const eventKinds = [
  ["pk", "Score War"],
  ["city", "City War"],
  ["guild", "Guild War"],
  ["boss", "Boss Spawn"],
  ["beast", "Guild Beast"],
] as const;

const weekdayEvents: Record<number, { name: string; kind: (typeof eventKinds)[number][0] }[]> = {
  1: [{ name: "Twin City War", kind: "city" }, { name: "TeratoDragon", kind: "boss" }],
  2: [{ name: "Phoenix City War", kind: "city" }, { name: "SwordMaster", kind: "boss" }],
  3: [{ name: "Ape City War", kind: "city" }, { name: "Capricorn", kind: "boss" }],
  4: [{ name: "Desert City War", kind: "city" }, { name: "Raikou", kind: "boss" }],
  5: [{ name: "Bird Island City War", kind: "city" }, { name: "ThrillingSpook", kind: "boss" }],
  6: [{ name: "Score War", kind: "pk" }, { name: "Tash", kind: "boss" }],
  0: [{ name: "Guild War", kind: "guild" }, { name: "WarBeast", kind: "boss" }],
};

const bossSpawns = [
  ["TeratoDragon", "4152", "Twin City 1002 · (565, 794)", "Monday · 20:00"],
  ["SwordMaster", "4170", "Desert City 1000 · (325, 495)", "Tuesday · 20:00"],
  ["Capricorn", "3821", "Phoenix Castle 1011 · (798, 475)", "Wednesday · 20:00"],
  ["Raikou", "3822", "Secret Raikou map 1105 · (135, 102)", "Thursday · 20:00"],
  ["ThrillingSpook", "4172", "Bird Island 1015 · (820, 650)", "Friday · 20:00"],
  ["Tash", "3823", "Desert City 1000 · (493, 273)", "Saturday · 20:00"],
  ["SnowBanshee", "4171", "Ape City 1020 · (585, 645)", "No active schedule"],
  ["WarBeast", "3921", "Guild War map 1645 · (171, 206)", "Guild War start / reset"],
] as const;

const schedule = [
  { day: 1, name: "Twin City War", time: "20:00", kind: "city" }, { day: 1, name: "TeratoDragon", time: "20:00", kind: "boss" },
  { day: 2, name: "Phoenix City War", time: "20:00", kind: "city" }, { day: 2, name: "SwordMaster", time: "20:00", kind: "boss" },
  { day: 3, name: "Ape City War", time: "20:00", kind: "city" }, { day: 3, name: "Capricorn", time: "20:00", kind: "boss" },
  { day: 4, name: "Desert City War", time: "20:00", kind: "city" }, { day: 4, name: "Raikou", time: "20:00", kind: "boss" },
  { day: 5, name: "Bird Island City War", time: "20:00", kind: "city" }, { day: 5, name: "ThrillingSpook", time: "20:00", kind: "boss" },
  { day: 6, name: "Score War", time: "20:00", kind: "pk" }, { day: 6, name: "Tash", time: "20:00", kind: "boss" },
  { day: 0, name: "Guild War", time: "19:00", kind: "guild" }, { day: 0, name: "WarBeast", time: "19:00", kind: "boss" },
  { day: -1, name: "Guild Beast", time: "19:00", kind: "beast" },
] as const;

function getEventsForDate(date: Date) {
  return [...(weekdayEvents[date.getDay()] ?? []), { name: "Guild Beast", kind: "beast" as const }];
}

function getBerlinDate() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" }));
}

function getNextEvent() {
  const now = getBerlinDate();
  for (let offset = 0; offset <= 8; offset += 1) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
    const candidates = schedule.filter((item) => item.day === -1 || item.day === date.getDay()).map((item) => {
      const [hours, minutes] = item.time.split(":").map(Number);
      const target = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hours - 2, minutes);
      return { ...item, target, date };
    }).filter((item) => item.target > Date.now()).sort((a, b) => a.target - b.target);
    if (candidates[0]) return candidates[0];
  }
  return { ...schedule[0], target: Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() + 7, 17, 0), date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7) };
}

const legacyDetailEvents = [
  { icon: "♟", title: "City War", badge: "GUILD", accent: "city", subtitle: "One city night, Monday through Thursday.", intro: "For one hour the city gates slam shut, the district turns free-PK, and the guild pole becomes a target. Beat the pole down, and the guild that has done the most damage to it when it drops takes the city — plus a cut of the old holder's treasury.", bullets: ["When Monday – Thursday · 19:00 – 20:00", "Where The war district of whichever city is up that night", "Bring Anyone can fight, but only a guild can hold a pole"], rotation: ["Monday", "Phoenix Castle", "Tuesday", "Ape City", "Wednesday", "Desert City", "Thursday", "Bird Island"], rewards: ["Ownership of city until the next war", "10% of the losing guild's fund"], target: "2027-07-06T19:00:00+02:00" },
  { icon: "⚔", title: "PK Tournament", badge: "SOLO", accent: "pk", subtitle: "Three arenas, one survivor each. Bring a PK Ticket.", intro: "The oldest prize fight on the server. Buy in with a PK Ticket, get thrown into the arena for your level bracket, and be the last one standing. Whoever is still standing collects from GeneralWinner — and the survivors fight again.", bullets: ["When Every Saturday, and the 1st of every month · 20:30 – 22:30", "Where Twin City — GeneralBravery at (452, 292)", "Bring A PK Ticket, one per entry"], rotation: ["20:30", "GeneralBravery arrives in Twin City; registration opens.", "21:10", "Registration closes. GeneralWinner appears in each arena.", "21:30", "Second round begins.", "22:30", "Final round begins."], rewards: ["500,000 silver", "A Dragon Ball", "2,000,000 silver", "A Super Phoenix Gem", "A Super Dragon Gem"], target: "2027-07-10T20:30:00+02:00" },
  { icon: "♜", title: "Guild War", badge: "GUILD", accent: "guild", subtitle: "The whole weekend, for the Guild Map itself.", intro: "From Saturday afternoon to Sunday evening the Guild Map is open and the WhiteGate pole is fair game the entire time. Whoever holds it when it finally falls owns the Guild Map, the teleport network, and the right to buy the Guild Beast.", bullets: ["When Saturday 14:00 → Sunday 20:00", "Where The Guild Map — the WhiteGate pole", "Bring A guild"], rotation: ["Saturday", "14:00 – 20:00 Sunday", "Guild Map battle window", "Sunday", "20:00", "Final capture closes the war"], rewards: ["Ownership of the Guild Map", "10% of the losing guild's fund", "The four Guild Teleporters", "The right to buy the Guild Beast"], target: "2027-07-10T14:00:00+02:00" },
  { icon: "♛", title: "Guild War Ends", badge: "GUILD", accent: "ends", subtitle: "The buzzer. Whoever holds the pole holds the map all week.", intro: "This is the moment the weekend is actually fought over. The WhiteGate pole can be taken and retaken all through the war, and no one gets a final shot after the guild holding it when the horn sounds.", bullets: ["When Every Sunday · 20:00", "Where The Guild Map — the WhiteGate pole", "Bring Be the guild holding the pole when the clock runs out"], rotation: ["The winning guild", "Is announced server-wide the second the war closes.", "The map", "Stays settled before the next weekend begins."], rewards: ["The Guild Map until next Saturday", "The four Guild Teleporters", "The right to buy the Guild Beast"], target: "2027-07-11T20:00:00+02:00" },
  { icon: "♨", title: "Guild Beast", badge: "GUILD", accent: "beast", subtitle: "One Dragon Ball a day, for one hour only.", intro: "Once the guild holding the Guild Map has paid the Beast Guard, the Guild Beast walks out onto the map every night at 21:00 and stays for an hour. Kill it before 22:00 and it drops a Dragon Ball — one a day, no more.", bullets: ["When Every day · 21:00 – 22:00", "Where The Guild Map at (86, 78) — the Beast Guard announces it", "Bring The Guild War holders must have bought the beast for 500,000 guild fund"], rotation: ["If nobody kills it", "The beast simply leaves at 22:00. It does not carry over."], rewards: ["A Dragon Ball"], target: "2027-07-06T21:00:00+02:00" },
];

const detailEvents = [
  { icon: "♟", title: "City War", badge: "GUILD", accent: "city", subtitle: "A different city takes the spotlight each weekday.", intro: "City War is the nightly fight for control of a city pole. The guild that deals the most damage when the pole falls takes the city and its rewards.", bullets: ["When Monday – Friday · 20:00 – 21:00", "Where The featured city for that day", "Bring Your guild and your strongest build"], rotation: ["Monday", "Twin City War", "Tuesday", "Phoenix City War", "Wednesday", "Ape City War", "Thursday", "Desert City War", "Friday", "Bird Island City War"], rewards: ["Control of the city", "Guild prestige", "City war rewards"], target: "2027-07-06T19:00:00+02:00" },
  { icon: "⚔", title: "Score War", badge: "GUILD", accent: "pk", subtitle: "A weekly score battle where every point matters.", intro: "Score War is a focused weekly competition. Enter with your guild, earn points through the event objectives, and finish the hour on top of the leaderboard.", bullets: ["When Every Saturday · 20:00 – 21:00", "Where The designated Score War arena", "Bring Your guild and prepare to compete"], rotation: ["20:00", "Score War begins.", "During the event", "Build your score and defend your lead.", "21:00", "Final scores are recorded."], rewards: ["Score War rewards", "Guild recognition", "Seasonal prizes"], target: "2027-07-10T20:30:00+02:00" },
  { icon: "♜", title: "Guild War", badge: "GUILD", accent: "guild", subtitle: "The weekly battle for guild dominance.", intro: "Guild War is a two-hour guild battle where coordination, timing, and control decide which guild earns the right to stand above the rest.", bullets: ["When Every Sunday · 19:00 – 21:00", "Where The Guild War map", "Bring Your guild and your battle plan"], rotation: ["19:00", "Guild War begins.", "During the war", "Capture objectives and protect your guild's lead.", "21:00", "The winning guild is recorded."], rewards: ["Guild War victory", "Guild prestige", "Event rewards"], target: "2027-07-10T14:00:00+02:00" },
  { icon: "♨", title: "Guild Beast", badge: "GUILD", accent: "beast", subtitle: "A daily hunt with one hour to claim the reward.", intro: "The Guild Beast appears every day for a limited window. Gather the guild, defeat the beast, and claim its daily reward before it disappears.", bullets: ["When Every day · 19:00 – 20:00", "Where The Guild Map", "Bring The Guild War holders must have unlocked the beast"], rotation: ["19:00", "The Guild Beast appears.", "20:00", "The beast leaves and does not carry over."], rewards: ["A Dragon Ball", "Daily guild reward"], target: "2027-07-06T21:00:00+02:00" },
];

function getNextEventFor(title: string) {
  const matcher = title === "City War" ? (item: (typeof schedule)[number]) => item.kind === "city" : title === "PK Tournament" ? (item: (typeof schedule)[number]) => item.name === "Score War" : title === "Guild War Ends" ? (item: (typeof schedule)[number]) => item.name === "Guild War" : (item: (typeof schedule)[number]) => item.name.startsWith(title);
  const now = getBerlinDate();
  for (let offset = 0; offset <= 8; offset += 1) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
    const candidate = schedule.filter((item) => matcher(item) && (item.day === -1 || item.day === date.getDay())).map((item) => { const [hours, minutes] = item.time.split(":").map(Number); return { target: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hours - 2, minutes), date, time: item.time }; }).filter((item) => item.target > Date.now()).sort((a, b) => a.target - b.target)[0];
    if (candidate) return candidate;
  }
  return { target: Date.now(), date: now, time: "—" };
}

function DetailCountdown({ eventName, target }: { eventName?: string; target?: string }) {
  const [values, setValues] = useState([0, 0, 0, 0]);
  const resolvedEventName = eventName ?? (target?.includes("07-06T19") ? "City War" : target?.includes("07-10T20:30") ? "PK Tournament" : target?.includes("07-10T14") ? "Guild War" : target?.includes("07-11T20") ? "Guild War Ends" : "Guild Beast");
  useEffect(() => { const update = () => { const distance = Math.max(0, getNextEventFor(resolvedEventName).target - Date.now()); setValues([Math.floor(distance / 86400000), Math.floor(distance / 3600000) % 24, Math.floor(distance / 60000) % 60, Math.floor(distance / 1000) % 60]); }; update(); const timer = window.setInterval(update, 1000); return () => window.clearInterval(timer); }, [resolvedEventName]);
  return <div className="detail-countdown">{values.map((value, index) => <div key={index}><strong>{String(value).padStart(2, "0")}</strong><span>{["DAYS", "HOURS", "MINS", "SECS"][index]}</span></div>)}</div>;
}

export default function EventsPage() {
  const [nextEvent, setNextEvent] = useState(getNextEvent);
  const [countdown, setCountdown] = useState([0, 0, 0, 0]);
  const [calendarMonth, setCalendarMonth] = useState(() => { const now = getBerlinDate(); return new Date(now.getFullYear(), now.getMonth(), 1); });
  const [selectedDay, setSelectedDay] = useState(() => getBerlinDate().getDate());

  const calendarCells = useMemo(() => {
    const firstDay = (calendarMonth.getDay() + 6) % 7;
    const totalDays = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
    return Array.from({ length: firstDay + totalDays }, (_, index) => index < firstDay ? null : index - firstDay + 1);
  }, [calendarMonth]);
  const selectedDate = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), selectedDay);
  const selectedEvents = getEventsForDate(selectedDate);
  const today = getBerlinDate();
  const monthLabel = calendarMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase();

  const changeMonth = (offset: number) => {
    setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
    setSelectedDay(1);
  };

  useEffect(() => { const update = () => { const upcoming = getNextEvent(); setNextEvent(upcoming); const distance = Math.max(0, upcoming.target - Date.now()); setCountdown([Math.floor(distance / 86400000), Math.floor(distance / 3600000) % 24, Math.floor(distance / 60000) % 60, Math.floor(distance / 1000) % 60]); }; update(); const timer = window.setInterval(update, 1000); return () => window.clearInterval(timer); }, []);

  return (
    <div className="events-page min-h-screen bg-[#173247] text-[#d8e5e5]">
      <Navigation />
      <main className="mx-auto max-w-6xl px-2 pb-10 pt-24 sm:px-5">
        <section className="events-intro">
          <h1>SERVER EVENTS</h1>
          <p>Silver, Dragon Balls, Super Gems and whole cities change hands on a schedule. Here is the whole calendar,<br className="hidden sm:block" /> what you need to turn up with, and what the winner walks away with.</p>
          <small>All times are shown as Server time (UTC) with your own clock underneath.</small>
        </section>
        <section className="events-frame px-5 py-5 sm:px-10">
          <h1 className="events-heading">NEXT EVENT</h1>
          <div className="events-divider" />
          <h2 className="next-event-title"><span>♟</span> {nextEvent.name}</h2>
          <p className="next-event-subtitle">Starts {nextEvent.date.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" })} at {nextEvent.time} server time — Europe/Berlin</p>
          <div className="countdown-grid">{countdown.map((value, index) => <div className="countdown-box" key={index}><strong>{String(value).padStart(2, "0")}</strong><span>{["DAYS", "HOURS", "MINS", "SECS"][index]}</span></div>)}</div>
          <button className="how-to-enter" onClick={() => document.getElementById("event-details")?.scrollIntoView({ behavior: "smooth" })}>How to enter</button>
        </section>

        <section className="events-frame mt-4 px-5 py-5 sm:px-10">
          <h2 className="events-heading">EVENT CALENDAR</h2>
          <div className="events-divider" />
          <div className="legend">{eventKinds.map(([kind, label]) => <span key={kind}><i className={`event-dot ${kind}`} />{label}</span>)}</div>
          <div className="calendar-toolbar"><button aria-label="Previous month" onClick={() => changeMonth(-1)}><ChevronLeft size={15} /></button><strong>{monthLabel}</strong><button aria-label="Next month" onClick={() => changeMonth(1)}><ChevronRight size={15} /></button></div>
          <div className="calendar-grid">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <div className="calendar-weekday" key={day}>{day}</div>)}{calendarCells.map((day, index) => day === null ? <div className="calendar-empty" key={`empty-${index}`} /> : <button key={day} onClick={() => setSelectedDay(day)} className={`calendar-cell ${selectedDay === day ? "selected" : ""} ${today.getFullYear() === calendarMonth.getFullYear() && today.getMonth() === calendarMonth.getMonth() && today.getDate() === day ? "today" : ""}`}><b>{day}</b>{getEventsForDate(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day)).map((event) => <span key={event.name}><i className={`event-dot ${event.kind}`} />{event.name}</span>)}</button>)}</div>
          <div className="selected-event"><MapPin size={14} /> Selected day: {calendarMonth.toLocaleDateString("en-US", { month: "long" })} {selectedDay}, {calendarMonth.getFullYear()} <span>{selectedEvents.map((item) => item.name).join(" · ") || "No scheduled events"}</span></div>
        </section>

        <section className="boss-roster" aria-labelledby="boss-roster-title">
          <div className="boss-roster-heading">
            <div><p>WORLD BOSS SCHEDULE</p><h2 id="boss-roster-title">Spawn overview</h2></div>
            <span>Europe/Berlin server time</span>
          </div>
          <div className="boss-roster-grid">
            {bossSpawns.map(([name, id, location, active]) => <article className={`boss-roster-card ${active === "No active schedule" ? "inactive" : ""}`} key={name}>
              <div className="boss-roster-top"><h3>{name}</h3><span>BossID {id}</span></div>
              <p><MapPin size={13} /> {location.replace(" Â· ", " · ")}</p>
              <strong>{active.replace(" Â· ", " · ")}</strong>
            </article>)}
          </div>
        </section>

        <section id="event-details" className="event-details-list">{detailEvents.map((event) => <article className={`event-detail-frame ${event.accent}`} key={event.title}><header className="event-detail-header"><div className="event-detail-title"><span className="event-detail-icon">{event.icon}</span><div><h2>{event.title} <em>{event.badge}</em></h2><p>{event.subtitle}</p></div></div></header><div className="event-detail-divider" /><div className="event-detail-columns"><div className="event-detail-copy"><p>{event.intro}</p><ul>{event.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><h3>{event.title === "City War" ? "THE ROTATION" : event.title === "PK Tournament" ? "HOW THE NIGHT RUNS" : "EVENT NOTES"}</h3><div className="event-rotation">{event.rotation.map((line) => <span key={line}>{line}</span>)}</div></div><aside className="event-detail-aside"><div className="detail-panel"><p className="detail-label">NEXT ONE IN</p><DetailCountdown target={event.target} /><p className="detail-time">Europe/Berlin server time</p></div><div className="detail-panel"><h3>★ WHAT THE WINNER GETS</h3><p>The reward depends on the event result and is announced server-wide when the event ends.</p><div className="reward-tags">{event.rewards.map((reward) => <span key={reward}>{reward}</span>)}</div></div></aside></div></article>)}</section>
      </main>
    </div>
  );
}
