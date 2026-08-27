import { news, products, rankings, wikiArticles, wikiCategories } from "../data/mock";
export async function getProducts() { return products; }
export async function getProduct(slug: string) { return products.find((item) => item.slug === slug); }
export async function getRankings() { return rankings; }
export async function getWikiArticles() { return wikiArticles; }
export async function getWikiCategories() { return wikiCategories; }
export async function getNews() { return news; }
