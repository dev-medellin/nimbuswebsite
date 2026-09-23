"use client";

import { RefreshCw, Search } from "lucide-react";
import { useEffect, useState } from "react";

const categories = [["level", "Level", "Level"], ["gold", "Gold", "Silver"], ["ko", "KO Board", "KO points"], ["guild", "Guilds", "Members"], ["nobility", "Nobility", "Donation"], ["trojan", "Trojan", "Battle power"], ["warrior", "Warrior", "Battle power"], ["archer", "Archer", "Battle power"], ["water", "Water Taoist", "Battle power"], ["fire", "Fire Taoist", "Battle power"]] as const;
type Row = { rank: number; name: string; class: string; level: number; guild: string; value: string; nobility_title?: string; status?: string };
const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/$/, "");

export default function RankingsBrowser() {
  const [category, setCategory] = useState("level");
  const [rows, setRows] = useState<Row[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    setLoading(true); setRows([]); setError(false);
    async function load() {
      try {
        const response = await fetch(`${apiUrl}/rankings?type=${category}`, { cache: "no-store", signal: controller.signal, headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error("Rankings unavailable");
        const payload = await response.json();
        if (!Array.isArray(payload?.data)) throw new Error("Invalid rankings response");
        if (active) setRows(payload.data);
      } catch { if (active) setError(true); }
      finally { clearTimeout(timeout); if (active) setLoading(false); }
    }
    void load();
    return () => { active = false; controller.abort(); clearTimeout(timeout); };
  }, [category, refresh]);

  const guilds = category === "guild";
  const scoreLabel = categories.find(([key]) => key === category)?.[2] || "Score";
  const visible = rows.filter((row) => `${row.name} ${row.guild}`.toLowerCase().includes(query.toLowerCase()));
  const pageCount = Math.max(1, Math.ceil(visible.length / pageSize));
  const pageRows = visible.slice((page - 1) * pageSize, page * pageSize);

  return <div className="rankings-browser">
    <div className="rankings-toolbar"><div><p className="rankings-kicker">THE LEADERBOARD</p><h2>{guilds ? "Guild standings" : "Adventurer standings"}</h2><span>Up to 20 entries per page · Europe/Berlin server data</span></div><button type="button" onClick={() => { setPage(1); setRefresh((value) => value + 1); }} disabled={loading} className="rankings-refresh"><RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh</button></div>
    <div className="rankings-tabs" aria-label="Ranking categories">{categories.map(([key, label]) => <button type="button" aria-pressed={category === key} className={category === key ? "active" : ""} key={key} onClick={() => { setRows([]); setLoading(true); setError(false); setPage(1); setCategory(key); }} disabled={category === key}>{label}</button>)}</div>
    <label className="rankings-search"><Search size={16} /><span>Search rankings</span><input placeholder="Player or guild name" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} /></label>
    {loading ? <div className="rankings-state" role="status">Loading the hall of fame…</div> : error ? <div className="rankings-state error" role="alert">Rankings are temporarily unavailable. Please try Refresh.</div> : !rows.length ? <div className="rankings-state" role="status">No rankings have been published for this category yet.</div> : <div className="rankings-table-wrap"><table className="rankings-table"><caption className="sr-only">Top {categories.find(([key]) => key === category)?.[1]} rankings</caption><thead><tr><th scope="col">#</th><th scope="col">{guilds ? "Guild" : "Player"}</th>{!guilds && <><th scope="col">Class</th><th scope="col">Level</th></>}<th scope="col">{guilds ? "Leader" : "Guild"}</th><th scope="col">{scoreLabel}</th><th scope="col">{guilds ? "Fund" : "Nobility"}</th>{guilds && <th scope="col">Wins</th>}</tr></thead><tbody>{pageRows.map((row, index) => <tr key={`${row.rank}-${row.name}`}><td><span className={`rank-badge rank-${((page - 1) * pageSize) + index + 1}`}>{row.rank}</span></td><td><strong>{row.name}</strong></td>{!guilds && <><td data-label="Class">{row.class}</td><td data-label="Level">{row.level}</td></>}<td data-label={guilds ? "Leader" : "Guild"}>{row.guild || "—"}</td><td data-label={scoreLabel} className="rank-value">{row.value}</td><td data-label={guilds ? "Fund" : "Nobility"}>{row.nobility_title || "—"}</td>{guilds && <td data-label="Wins">{row.status || "—"}</td>}</tr>)}</tbody></table>{!visible.length ? <p className="rankings-empty" role="status">No rankings match your search.</p> : <div className="rankings-pagination"><span>Page {page} of {pageCount} · {visible.length} entries</span><div><button type="button" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</button><button type="button" disabled={page === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}>Next</button></div></div>}</div>}
  </div>;
}
