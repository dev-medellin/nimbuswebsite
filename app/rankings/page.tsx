import { getRankings } from "../../lib/services";
import type { Metadata } from "next";
import { RankingsBrowser } from "../../components/Interactive";
import { PageIntro, Panel, SiteShell } from "../../components/SiteShell";
export const metadata: Metadata = { title: "Rankings | Nimbus Conquer", description: "Discover the highest-ranked Nimbus Conquer adventurers and guilds." };

export default async function RankingsPage() {
  return <SiteShell><PageIntro eyebrow="The hall of fame" title="Rankings">The names that have climbed highest.</PageIntro><main className="content-grid"><Panel><RankingsBrowser rows={await getRankings()} /></Panel></main></SiteShell>;
}
