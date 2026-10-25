import Link from "next/link";
import { getWikiArticles } from "../../../../lib/services";
import { Panel } from "../../../../components/SiteShell";
import { PvpPageTemplate } from "../../../../components/PvpTemplates";
import { wikiArticles } from "../../../../data/mock";
export function generateStaticParams() { return wikiArticles.map((article) => ({ category: article.category.toLowerCase().replaceAll(" ", "-"), slug: article.slug })); }
export default async function WikiArticlePage({ params }: { params: { category: string; slug: string } }) { const article = (await getWikiArticles()).find((item) => item.slug === params.slug); if (!article) return <PvpPageTemplate eyebrow="Field Manual" title="Guide not found" />; return <PvpPageTemplate eyebrow={article.category} title={article.title} description={article.excerpt} width="narrow"><Panel>{article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<Link className="link" href="/wiki">← Back to field manual</Link></Panel></PvpPageTemplate>; }
