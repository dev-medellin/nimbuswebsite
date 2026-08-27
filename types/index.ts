export type Product = { slug: string; name: string; description: string; price: number; category: string; available: boolean; limited?: boolean };
export type Ranking = { rank: number; name: string; className: string; level: number; rebirth: number; guild: string; score: string };
export type WikiArticle = { slug: string; title: string; category: string; excerpt: string; body: string[]; image?: string };
