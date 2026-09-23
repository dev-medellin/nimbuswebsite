"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const sections = [
  {
    title: "THE VISION",
    subtitle: null,
    image: "/assets/gameplay/gameplay-3.png",
    imagePosition: "left",
    content: [
      "No Pay-To-Win. VIP for cosmetics only.",
      "Loot notifications for all players.",
      "New zones to explore and new monsters to farm.",
      "New quests and events to keep the game fresh.",
    ],
  },
  {
    title: "CLASSIC+ EXPERIENCE",
    subtitle: null,
    image: "/assets/gameplay/gameplay-1.png",
    imagePosition: "right",
    content: [
      "x1 Exp and Drop rates, manually reverse engineered.",
      "The classic 4 classes. Trojan, Warrior, Archer, Taoist.",
      "+9 to +12 recalculated with the same formula.",
      "No CPs. No Shopping Mall items, cosmetics only.",
    ],
  },
  {
    title: "NOT A TYPICAL SERVER",
    subtitle: null,
    image: "/assets/gameplay/gameplay-2.png",
    imagePosition: "left",
    content: [
      "Custom created server engine from scratch.",
      "Recreated spawns designed to hunt and farm.",
      "Community driven improvements.",
      "If most of the community wants it, they can have it.",
    ],
  },
];

export default function GameplayVisionSection() {
  return (
    <section className="bg-[#0a1420] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1 }}
            className={`mb-6 grid gap-3 lg:mb-8 lg:grid-cols-2 lg:gap-4 ${
              section.imagePosition === "right" ? "lg:[&>:last-child]:order-first" : ""
            }`}
          >
            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden border-2 border-[#b98a45]"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: section.imagePosition === "left" ? -12 : 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 + 0.08 }}
              className="border-2 border-[#b98a45] bg-[#1b2b43] p-4 shadow-[3px_3px_0_#111b2c]"
            >
              <h2 className="font-fantasy text-xl text-[#e2b955] sm:text-2xl">{section.title}</h2>

              <ul className="mt-3 space-y-2 text-xs leading-5 text-[#d2dbe7] sm:text-sm">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="shrink-0 text-[#e2b955]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


