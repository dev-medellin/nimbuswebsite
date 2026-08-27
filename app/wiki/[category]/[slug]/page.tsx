import Link from "next/link";
import { getWikiArticles } from "../../../../lib/services";
import { PageIntro, Panel, SiteShell } from "../../../../components/SiteShell";
import { wikiArticles } from "../../../../data/mock";
export function generateStaticParams() { return wikiArticles.map((article) => ({ category: article.category.toLowerCase().replaceAll(" ", "-"), slug: article.slug })); }
export default async function WikiArticlePage({ params }: { params: { category: string; slug: string } }) { const article = (await getWikiArticles()).find((item) => item.slug === params.slug); if (!article) return <SiteShell><PageIntro eyebrow="Wiki" title="Guide not found" /></SiteShell>; return <SiteShell><PageIntro eyebrow={article.category} title={article.title}>{article.excerpt}</PageIntro><main className="article"><Panel>{article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<Link className="link" href="/wiki">← Back to wiki</Link></Panel></main></SiteShell>; }
