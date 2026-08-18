"use client";

import { useReducedMotion } from "framer-motion";
import BendingMarquee from "@/components/home/BendingMarquee";

const items = [
  "Forge your strongest self",
  "Train. Compete. Reforge.",
  "Built for those who show up",
  "Earned. Not given.",
  "The work is the standard",
  "Limassol",
];

export function HeroMarquee() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative h-[220px] overflow-hidden border-y border-border bg-bg-deep sm:h-[280px]"
      aria-label="REFORGE"
    >
      {reduced ? (
        <p className="font-display flex h-full items-center justify-center px-5 text-center text-2xl leading-none text-accent sm:text-4xl">
          {items.slice(0, 3).join("  ·  ")}
        </p>
      ) : (
        <BendingMarquee
          items={items}
          separator="+"
          bend={48}
          speed={18}
          rows={2}
          panelWidth={380}
          panelHeight={520}
          fontSize={28}
          fontWeight={400}
          letterSpacing={2}
          color="#c8ff00"
          bandColor="#0a0a0a"
          className="font-display"
        />
      )}
    </section>
  );
}
