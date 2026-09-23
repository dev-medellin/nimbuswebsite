import type { Metadata } from "next";
import { MarketLiveList } from "../../components/MarketLiveList";
import { PageIntro, SiteShell } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Market Live | Nimbus Conquer",
  description: "Browse live player market listings across the Nimbus Conquer realm.",
};

export default function MarketPage() {
  return <SiteShell><PageIntro eyebrow="The player marketplace" title="Market Live">Browse current player stalls and see where each listing is waiting in the realm.</PageIntro><main className="market-page bg-[#e6d3a5] px-6 py-14 sm:px-10"><div className="mx-auto max-w-6xl"><MarketLiveList /></div></main></SiteShell>;
}
