import type { Metadata } from "next";
import { MarketLiveList } from "../../components/MarketLiveList";
import { PvpPageTemplate } from "../../components/PvpTemplates";

export const metadata: Metadata = {
  title: "Market Live | Nimbus Conquer",
  description: "Browse live player market listings across the Nimbus Conquer realm.",
};

export default function MarketPage() {
  return <PvpPageTemplate eyebrow="Player Trading Post" title="Market Live" description="Browse current player stalls and see where each listing is waiting in the realm." bodyClassName="market-page"><MarketLiveList /></PvpPageTemplate>;
}
