"use client";

import { MapPin, RefreshCw, Store } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { MarketItem } from "../lib/services";

type MarketResponse = { data?: MarketItem[]; records?: MarketItem[]; vendors?: MarketItem[]; checked_at?: string };
type Filter = "all" | "1handed" | "2handed" | "normal" | "refined" | "unique" | "elite" | "super" | "0" | "1" | "2" | "1" | "3" | "5";

const apiBase = () => (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/$/, "");
const textOf = (item: MarketItem) => `${item.kind || ""} ${item.itemKind || ""} ${item.itemType || ""} ${item.category || ""} ${item.itemName || ""}`.toLowerCase();
const socketFilledOrOpen = (value: number | string | undefined) => {
  if (value === undefined || value === null) return false;
  const normalized = String(value).trim().toLowerCase();
  return normalized !== "" && normalized !== "0" && normalized !== "nosocket";
};
const socketCount = (item: MarketItem) => [item.socketOne ?? item.socket1 ?? item.soc1, item.socketTwo ?? item.socket2 ?? item.soc2].filter(socketFilledOrOpen).length;
const gemName = (value: number | string | undefined) => {
  if (!socketFilledOrOpen(value)) return "";
  const raw = String(value).trim();
  if (raw.toLowerCase() === "emptysocket" || raw === "255") return "Open socket";
  const numeric: Record<string, string> = { "1": "Normal Phoenix Gem", "2": "Refined Phoenix Gem", "3": "Super Phoenix Gem", "11": "Normal Dragon Gem", "12": "Refined Dragon Gem", "13": "Super Dragon Gem", "21": "Normal Fury Gem", "22": "Refined Fury Gem", "23": "Super Fury Gem", "31": "Normal Rainbow Gem", "32": "Refined Rainbow Gem", "33": "Super Rainbow Gem", "41": "Normal Kylin Gem", "42": "Refined Kylin Gem", "43": "Super Kylin Gem", "51": "Normal Violet Gem", "52": "Refined Violet Gem", "53": "Super Violet Gem", "61": "Normal Moon Gem", "62": "Refined Moon Gem", "63": "Super Moon Gem", "71": "Normal Tortoise Gem", "72": "Refined Tortoise Gem", "73": "Super Tortoise Gem" };
  if (numeric[raw]) return numeric[raw];
  return raw.replace(/Gem$/i, " Gem").replace(/([a-z])([A-Z])/g, "$1 $2");
};
const socketDetails = (item: MarketItem) => { const first = gemName(item.socketOne ?? item.socket1 ?? item.soc1); const second = gemName(item.socketTwo ?? item.socket2 ?? item.soc2); return [first && `Soc1: ${first}`, second && `Soc2: ${second}`].filter(Boolean).join(" · ") || "No socket"; };
const mapName = (map: number | undefined) => map === 1036 ? "Market" : map != null ? `Map ${map}` : "Unknown map";

function SelectFilter({ label, value, options, onChange }: { label: string; value: Filter; options: Array<[Filter, string]>; onChange: (value: Filter) => void }) {
  return <label className="market-filter"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value as Filter)}><option value="all">All</option>{options.map(([option, name]) => <option value={option} key={option}>{name}</option>)}</select></label>;
}

export function MarketLiveList() {
  const [items, setItems] = useState<MarketItem[]>([]);
  const [checkedAt, setCheckedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hand, setHand] = useState<Filter>("all");
  const [quality, setQuality] = useState<Filter>("all");
  const [gem, setGem] = useState<Filter>("all");
  const [sockets, setSockets] = useState<Filter>("all");
  const [bless, setBless] = useState<Filter>("all");

  const refresh = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBase()}/market/vendors`, { cache: "no-store" });
      if (!response.ok) throw new Error("Market unavailable");
      const payload = await response.json() as MarketResponse;
      setItems(payload.data ?? payload.records ?? payload.vendors ?? []);
      setCheckedAt(payload.checked_at ?? null);
    } catch {
      setItems([]);
      setCheckedAt(null);
    } finally { setLoading(false); }
  };

  useEffect(() => { void refresh(); }, []);

  const filtered = useMemo(() => items.filter((item) => {
    const text = textOf(item);
    const itemQuality = String(item.quality || "").toLowerCase();
    const itemGem = String(item.gemKind || item.quality || "").toLowerCase();
    const itemBless = String(item.blessValue ?? item.bless ?? "");
    const handMatch = hand === "all" || (hand === "1handed" ? /(1\s*-?\s*hand|one\s*hand|1h)/.test(text) : /(2\s*-?\s*hand|two\s*hand|2h)/.test(text));
    const gemMatch = gem === "all" || (/gem/.test(text) && itemGem === gem);
    return handMatch && (quality === "all" || itemQuality === quality) && gemMatch && (sockets === "all" || socketCount(item) === Number(sockets)) && (bless === "all" || itemBless === bless);
  }), [items, hand, quality, gem, sockets, bless]);

  return <section className="market-list"><div className="market-list-head"><div><p className="market-eyebrow"><Store size={15} /> Player marketplace</p><h2>Market Live</h2><p className="market-subtitle">Browse player stalls and filter equipment by hand type, quality, sockets, gems, and bless.</p></div><div className="market-live-actions"><span className={`market-status ${checkedAt ? "is-live" : "is-offline"}`}><span />{checkedAt ? "Live feed" : "Unavailable"}</span><button type="button" onClick={refresh} disabled={loading}><RefreshCw size={14} className={loading ? "spin" : undefined} /> {loading ? "Refreshing" : "Refresh"}</button></div></div><div className="market-filters"><SelectFilter label="Kind" value={hand} onChange={setHand} options={[["1handed", "1-handed"], ["2handed", "2-handed"]]} /><SelectFilter label="Quality" value={quality} onChange={setQuality} options={[["normal", "Normal"], ["refined", "Refined"], ["unique", "Unique"], ["elite", "Elite"], ["super", "Super"]]} /><SelectFilter label="Gem kind" value={gem} onChange={setGem} options={[["normal", "Normal gem"], ["refined", "Refined gem"], ["super", "Super gem"]]} /><SelectFilter label="Sockets" value={sockets} onChange={setSockets} options={[["0", "No socket"], ["1", "1 socket"], ["2", "2 sockets"]]} /><SelectFilter label="Bless" value={bless} onChange={setBless} options={[["1", "1"], ["3", "3"], ["5", "5"]]} /></div><div className="market-list-count">{loading ? "Loading listings..." : `${filtered.length} listing${filtered.length === 1 ? "" : "s"} found`}</div>{filtered.length ? <div className="market-table-wrap"><div className="market-table market-table-labels"><span>Item</span><span>Seller / stall</span><span>Details</span><span>Location</span><span>Price</span></div>{filtered.map((item, index) => <article className="market-table market-table-row" key={item.listingId ?? item.id ?? item.itemUid ?? index}><div><strong>{item.itemName || "Unnamed item"}{item.plus ? ` +${item.plus}` : ""}</strong><small>{item.category || item.itemKind || "Item listing"}</small></div><div><strong>{item.seller || item.owner || "Unknown seller"}</strong><small>{item.stallName || "Player stall"}</small></div><div><span>{item.quality || "Normal"}</span><small>{socketDetails(item)}{item.bless || item.blessValue ? ` · Bless ${item.blessValue ?? item.bless}` : ""}</small></div><div><strong>{mapName(item.map)}</strong><small>{item.x != null && item.y != null ? <><MapPin size={12} /> {item.x}, {item.y}</> : "Coordinates unavailable"}</small></div><div className="market-price">{item.price != null ? item.price.toLocaleString() : "—"}<small>{item.currency || "silver"}</small></div></article>)}</div> : <div className="market-empty"><Store size={28} /><h3>{loading ? "Connecting to the live market" : "No listings match these filters"}</h3><p>{loading ? "Checking the game-server market webhook..." : "Try clearing one or more filters."}</p></div>}<p className="market-updated">{checkedAt ? `Last checked ${new Date(checkedAt).toLocaleString()}` : "Live data will appear when the game-server webhook is reachable."}</p></section>;
}
