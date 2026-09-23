import type { Metadata } from "next";
import { PaypalShopBrowser } from "../../components/PaypalShopBrowser";
import { PageIntro, SiteShell } from "../../components/SiteShell";
export const metadata: Metadata = { title: "Shop | Nimbus Conquer", description: "Cosmetics and account services for Nimbus Conquer." };

export default function ShopPage() {
  return <SiteShell><PageIntro eyebrow="The merchant's hall" title="Nimbus Shop">Support the realm with secure PayPal donations in USD.</PageIntro><main className="relative overflow-hidden bg-[#e6d3a5] px-6 py-14 sm:px-10"><div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(135deg,#b28a4e_1px,transparent_1px),linear-gradient(45deg,#b28a4e_1px,transparent_1px)] [background-size:34px_34px]" /><div className="relative mx-auto max-w-6xl"><div className="mb-10 border-b-2 border-[#b28a4e] pb-5"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#8a342e]">The merchants of Nimbus</p><h2 className="mt-2 font-fantasy text-2xl text-[#263652]">Useful things for the road ahead</h2></div><PaypalShopBrowser /></div></main></SiteShell>;
}
