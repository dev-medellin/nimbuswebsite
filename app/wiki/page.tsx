import { BookOpen } from "lucide-react";
import type { Metadata } from "next";
import { getWikiArticles, getWikiCategories } from "../../lib/services";
import { WikiTabs } from "../../components/Interactive";
import { PageIntro, SiteShell } from "../../components/SiteShell";
export const metadata: Metadata = { title: "Nimbus Wiki | Nimbus Conquer", description: "Guides, classes, quests and progression tips for Nimbus Conquer." };

export default async function WikiPage() {
  const [categories, articles] = await Promise.all([getWikiCategories(), getWikiArticles()]);
  return <SiteShell><PageIntro eyebrow="The keeper's library" title="Nimbus Wiki">Guides for every step of the hard-earned journey.</PageIntro><main className="relative overflow-hidden bg-[#e6d3a5] px-6 py-14 sm:px-10"><div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(135deg,#b28a4e_1px,transparent_1px),linear-gradient(45deg,#b28a4e_1px,transparent_1px)] [background-size:34px_34px]" /><div className="relative mx-auto max-w-6xl"><div className="mb-10 flex items-center gap-3 border-b-2 border-[#b28a4e] pb-5"><BookOpen className="text-[#8a342e]" size={30} /><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#8a342e]">The chronicles of Nimbus</p><h2 className="font-fantasy text-2xl text-[#263652]">Knowledge for every adventurer</h2></div></div><WikiTabs categories={categories} articles={articles} /></div></main></SiteShell>;
}
