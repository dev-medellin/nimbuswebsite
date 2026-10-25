import type { Metadata } from "next";
import { Trophy } from "lucide-react";
import RankingsBrowser from "../../components/RankingsBrowser";
import { PvpPageTemplate, PvpSectionHeading } from "../../components/PvpTemplates";
export const metadata: Metadata = { title: "Rankings | Nimbus Conquer", description: "Discover the highest-ranked Nimbus Conquer adventurers and guilds." };

export default function RankingsPage() {
  return <PvpPageTemplate eyebrow="Hall of Fame" title="Server Rankings" description="Discover the adventurers and guilds leading the Nimbus realm." bodyClassName="pvp-rankings-page" width="wide"><PvpSectionHeading eyebrow="Live Standings" title="Champions of the realm" description="Updated from the latest available server rankings." icon={<Trophy size={24} />} /><section className="rankings-frame nimbus-rankings-frame"><RankingsBrowser /></section></PvpPageTemplate>;
}
