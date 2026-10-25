import Link from "next/link";
import { getWikiArticles } from "../../../lib/services";
import { Panel } from "../../../components/SiteShell";
import { PvpPageTemplate } from "../../../components/PvpTemplates";
import { wikiCategories } from "../../../data/mock";
export function generateStaticParams() { return wikiCategories.map((category) => ({ category: category.toLowerCase().replaceAll(" ", "-") })); }
export default async function WikiCategoryPage({ params }: { params: { category: string } }) { const articles = (await getWikiArticles()).filter((article) => article.category.toLowerCase().replaceAll(" ", "-") === params.category); return <PvpPageTemplate eyebrow="Field Manual Category" title={params.category.replaceAll("-", " ")} description="Study every available report before entering the field."><Panel>{articles.length ? articles.map((article) => <div className="article-row" key={article.slug}><h2>{article.title}</h2><p className="muted">{article.excerpt}</p><Link className="link" href={`/wiki/${params.category}/${article.slug}`}>Open field report →</Link></div>) : <p>No guides have been added here yet. Check back after the next expedition.</p>}</Panel></PvpPageTemplate>; }
