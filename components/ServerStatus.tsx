"use client";

import { useEffect, useState } from "react";

type Stats = { status: string; online_players?: number; max_online_players?: number };
const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/$/, "");
const count = (value: unknown) => typeof value === "number" && Number.isFinite(value) && value >= 0 ? Math.floor(value).toLocaleString() : "—";

export default function ServerStatus() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let stopped = false;
    let timer: ReturnType<typeof setTimeout>;
    let controller: AbortController;
    async function refresh() {
      controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      try {
        const response = await fetch(`${apiUrl}/server/stats`, { cache: "no-store", signal: controller.signal, headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error("Status unavailable");
        const payload = await response.json();
        if (!payload || !["online", "offline"].includes(payload.status)) throw new Error("Invalid status");
        if (!stopped) setStats(payload);
      } catch {
        if (!stopped) setStats(null);
      } finally {
        clearTimeout(timeout);
        if (!stopped) {
          setLoading(false);
          timer = setTimeout(refresh, 30000);
        }
      }
    }
    void refresh();
    return () => { stopped = true; clearTimeout(timer); controller?.abort(); };
  }, []);

  const online = stats?.status === "online";
  const cells = [
    [loading ? "Checking…" : online ? "Online" : stats?.status === "offline" ? "Offline" : "Unavailable", "Server status"],
    [online ? count(stats?.online_players) : "—", "Adventurers online"],
    [online ? count(stats?.max_online_players) : "—", "Peak online this session"],
    ["Classic 1.0", "Realm Version"],
  ];

  return <section aria-label="Live server status" className="border-b-4 border-[#9b6d35] bg-[#d5b574] shadow-[inset_0_1px_0_#fff1b0,inset_0_-3px_0_#725027]">
    <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-[#8c602e] sm:grid-cols-4">
      {cells.map(([value, label]) => <div className="px-4 py-5 text-center" key={label}><strong className="block font-fantasy text-2xl text-[#302513]">{value}</strong><span className="text-[10px] font-bold uppercase tracking-[.15em] text-[#654c2c]">{label}</span></div>)}
    </div>
  </section>;
}
