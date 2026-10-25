"use client";

import { useEffect, useState } from "react";

type Stats = { status: string; online_players?: number; max_online_players?: number };
const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/$/, "");
const count = (value: unknown) => typeof value === "number" && Number.isFinite(value) && value >= 0 ? Math.floor(value).toLocaleString() : "—";

export default function HomeServerStatus() {
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
        const response = await fetch(`${apiUrl}/server/stats`, {
          cache: "no-store",
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
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
    return () => {
      stopped = true;
      clearTimeout(timer);
      controller?.abort();
    };
  }, []);

  const online = stats?.status === "online";
  const statusText = loading ? "Checking…" : online ? "Online" : stats?.status === "offline" ? "Offline" : "Unavailable";
  const cells = [
    [statusText, "Server status"],
    [online ? count(stats?.online_players) : "—", "Adventurers online"],
    [online ? count(stats?.max_online_players) : "—", "Peak this session"],
    ["Classic 1.0", "Realm version"],
  ];

  return (
    <section aria-label="Live server status" className="pvp-server-status relative border-b border-[#c49a51]/55 bg-[#132137]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f1d486] to-transparent" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-[#6d7f98]/30 sm:grid-cols-4 sm:divide-y-0">
        {cells.map(([value, label], index) => (
          <div className="relative px-4 py-6 text-center" key={label}>
            {index === 0 && <span className={`mr-2 inline-block size-2 rounded-full ${online ? "bg-[#48d597] shadow-[0_0_10px_#48d597]" : "bg-[#a4adba]"}`} />}
            <strong className="inline font-fantasy text-xl text-[#f8eac3] sm:text-2xl">{value}</strong>
            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[.18em] text-[#8f9fb3]">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
