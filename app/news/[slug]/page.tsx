import Link from "next/link";
import { getNews } from "../../../lib/services";
import { Panel } from "../../../components/SiteShell";
import { PvpPageTemplate } from "../../../components/PvpTemplates";
import { news } from "../../../data/mock";
export function generateStaticParams() { return news.map((item) => ({ slug: item.slug })); }
export default async function NewsArticlePage({ params }: { params: { slug: string } }) { const item = (await getNews()).find((entry) => entry.slug === params.slug); if (!item) return <PvpPageTemplate eyebrow="Realm Dispatch" title="Announcement not found" />; return <PvpPageTemplate eyebrow={`${item.category} · ${item.date}`} title={item.title} description={item.excerpt} width="narrow"><Panel><p>Champions of Nimbus, the road ahead is clear. Our community continues to shape a classic world where patience, teamwork, and skill matter. Watch this space for the next field report.</p><Link className="link" href="/news">← All announcements</Link></Panel></PvpPageTemplate>; }
