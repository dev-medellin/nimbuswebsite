import Link from "next/link";
import { getNews } from "../../lib/services";
import { Panel } from "../../components/SiteShell";
import { PvpPageTemplate } from "../../components/PvpTemplates";
export default async function NewsPage() { const items = await getNews(); return <PvpPageTemplate eyebrow="Realm Dispatch" title="News & Announcements" description="Battle reports, server updates, and the latest word from the Nimbus community." bodyClassName="pvp-card-grid"><div className="pvp-card-grid-inner">{items.map((item) => <Panel key={item.slug}><p className="eyebrow">{item.category} · {item.date}</p><h2>{item.title}</h2><p className="muted">{item.excerpt}</p><Link className="link" href={`/news/${item.slug}`}>Read dispatch →</Link></Panel>)}</div></PvpPageTemplate>; }
