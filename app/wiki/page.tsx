import { BookOpen } from "lucide-react";
import type { Metadata } from "next";
import { getWikiArticles, getWikiCategories } from "../../lib/services";
import { WikiTabs } from "../../components/Interactive";
import { PvpPageTemplate, PvpSectionHeading } from "../../components/PvpTemplates";
export const metadata: Metadata = { title: "Nimbus Wiki | Nimbus Conquer", description: "Guides, classes, quests and progression tips for Nimbus Conquer." };

export default async function WikiPage() {
  const [categories, articles] = await Promise.all([getWikiCategories(), getWikiArticles()]);
  return <PvpPageTemplate eyebrow="Combat Intelligence" title="Nimbus Wiki" description="Guides for progression, equipment, quests, classes, and the battles ahead." bodyClassName="pvp-wiki-page"><PvpSectionHeading eyebrow="Field Manual" title="Knowledge for every fighter" description="Study the realm before you step into the arena." icon={<BookOpen size={24} />} /><WikiTabs categories={categories} articles={articles} /></PvpPageTemplate>;
}
