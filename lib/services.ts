import { news, products, rankings, wikiArticles, wikiCategories } from "../data/mock";
import type { Product, Ranking } from "../types";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/$/, "");

async function api<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!response.ok) return null;
    return await response.json() as T;
  } catch {
    return null;
  }
}

type ShopResponse = { items?: Array<{ itemId: number; name: string; description?: string; category?: string; price: number; stock?: number | null; isOutOfStock?: boolean }> };
type RankingsResponse = { data?: Array<{ rank: number; name: string; class: string; level: number; guild: string; value: string }> };
export type MarketItem = {
  id?: number;
  listingId?: string;
  itemUid?: number;
  itemID?: number;
  itemName?: string;
  seller?: string;
  owner?: string;
  stallName?: string;
  map?: number;
  x?: number;
  y?: number;
  category?: string;
  kind?: string;
  itemKind?: string;
  itemType?: string;
  gemKind?: string;
  quality?: string;
  plus?: number;
  bless?: number;
  blessValue?: number;
  soc1?: number | string;
  soc2?: number | string;
  socket1?: number | string;
  socket2?: number | string;
  socketOne?: number | string;
  socketTwo?: number | string;
  price?: number;
  currency?: string;
  status?: string;
};
type MarketResponse = { data?: MarketItem[]; records?: MarketItem[]; vendors?: MarketItem[]; checked_at?: string };

export async function getProducts(): Promise<Product[]> {
  const response = await api<ShopResponse>("/shop/catalog");
  if (!response?.items?.length) return products;

  return response.items.map((item) => ({
    slug: String(item.itemId),
    name: item.name,
    description: item.description || "A useful addition for your next adventure.",
    price: Number(item.price) || 0,
    category: item.category || "Quartermaster",
    available: !item.isOutOfStock,
  }));
}

export async function getProduct(slug: string) {
  return (await getProducts()).find((item) => item.slug === slug);
}

export async function getRankings(): Promise<Ranking[]> {
  const response = await api<RankingsResponse>("/rankings?type=character");
  if (!response?.data?.length) return rankings;

  return response.data.map((row) => ({
    rank: row.rank,
    name: row.name,
    className: row.class,
    level: Number(row.level) || 0,
    rebirth: 0,
    guild: row.guild || "No Guild",
    score: row.value || "0",
  }));
}

export async function getWikiArticles() { return wikiArticles; }
export async function getWikiCategories() { return wikiCategories; }
export async function getNews() { return news; }
