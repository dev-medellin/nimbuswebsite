import type { Metadata } from "next";
import RankingsBrowser from "../../components/RankingsBrowser";
import { SiteShell } from "../../components/SiteShell";
export const metadata: Metadata = { title: "Rankings | Nimbus Conquer", description: "Discover the highest-ranked Nimbus Conquer adventurers and guilds." };

export default function RankingsPage() {
  return <SiteShell><main className="rankings-page"><section className="rankings-intro"><p>THE HALL OF FAME</p><h1>SERVER RANKINGS</h1><span>Discover the adventurers and guilds leading the realm.</span><small>Updated from the latest server rankings</small></section><section className="rankings-frame"><RankingsBrowser /></section></main></SiteShell>;
}
