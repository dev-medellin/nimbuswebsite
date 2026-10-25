import type { Metadata } from "next";
import { PaypalShopBrowser } from "../../components/PaypalShopBrowser";
import { PvpPageTemplate, PvpSectionHeading } from "../../components/PvpTemplates";
export const metadata: Metadata = { title: "Shop | Nimbus Conquer", description: "Cosmetics and account services for Nimbus Conquer." };

export default function ShopPage() {
  return <PvpPageTemplate eyebrow="Realm Quartermaster" title="Nimbus Shop" description="Support the realm through secure PayPal donations in USD." bodyClassName="pvp-shop-page"><PvpSectionHeading eyebrow="Available Supplies" title="Prepare for the road ahead" description="Account services and selected support rewards." /><PaypalShopBrowser /></PvpPageTemplate>;
}
