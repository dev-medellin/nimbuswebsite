import Link from "next/link";
import { getNews } from "../../lib/services";
import { PageIntro, Panel, SiteShell } from "../../components/SiteShell";
export default async function NewsPage() { const items = await getNews(); return <SiteShell><PageIntro eyebrow="From the scribe's desk" title="News & announcements">The latest word from the Nimbus community.</PageIntro><main className="content-grid">{items.map((item) => <Panel key={item.slug}><p className="eyebrow">{item.category} · {item.date}</p><h2>{item.title}</h2><p className="muted">{item.excerpt}</p><Link className="link" href={`/news/${item.slug}`}>Read more →</Link></Panel>)}</main></SiteShell>; }
