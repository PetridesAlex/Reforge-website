"use client";

import {
  Award,
  CalendarCheck,
  Crown,
  Dumbbell,
  Flame,
  Medal,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Achievement } from "@/types";
import { cn } from "@/lib/utils/cn";

const ease = [0.22, 1, 0.36, 1] as const;

const rarityIcon = {
  common: "text-text-muted border-border",
  rare: "text-text border-white/25",
  epic: "text-accent border-accent/50",
  legendary: "text-accent border-accent",
};

const rarityLabel = {
  common: "text-text-muted",
  rare: "text-text",
  epic: "text-accent",
  legendary: "text-accent",
};

function AchievementIcon({ code, size = 20 }: { code: string; size?: number }) {
  const props = { size, strokeWidth: 1.8 } as const;
  switch (code) {
    case "first_session":
      return <Zap {...props} />;
    case "sessions_10":
      return <Dumbbell {...props} />;
    case "sessions_25":
      return <Target {...props} />;
    case "sessions_50":
      return <Flame {...props} />;
    case "sessions_100":
      return <Trophy {...props} />;
    case "streak_7":
      return <CalendarCheck {...props} />;
    case "weekly_champion":
      return <Crown {...props} />;
    case "weekly_bronze":
      return <Medal {...props} />;
    case "new_pr":
      return <TrendingUp {...props} />;
    default:
      return <Award {...props} />;
  }
}

export function AchievementBadge({
  achievement,
  index = 0,
  layout = "card",
}: {
  achievement: Achievement;
  index?: number;
  layout?: "card" | "mosaic";
}) {
  const reduced = useReducedMotion();
  const legendary = achievement.rarity === "legendary";
  const mosaic = layout === "mosaic";
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: mosaic ? 40 : 32, scale: mosaic ? 1 : 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.65, delay: index * (mosaic ? 0.06 : 0.14), ease }}
      whileHover={reduced ? undefined : { y: mosaic ? 0 : -6 }}
      className={cn(
        "group relative h-full overflow-hidden transition-colors duration-500",
        mosaic
          ? "min-h-[320px] bg-background p-6 sm:min-h-[360px] sm:p-8 lg:min-h-[400px] lg:p-10"
          : "border border-border bg-surface p-5 hover:border-accent/50 hover:bg-background",
        mosaic && "hover:bg-surface",
        mosaic && legendary && "bg-accent/[0.05] hover:bg-accent/[0.08]",
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
      />
      {mosaic ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-6 -right-1 font-display text-[8.5rem] leading-none text-white/[0.045] transition-colors duration-500 group-hover:text-accent/15 sm:text-[10rem]"
        >
          {indexLabel}
        </span>
      ) : null}

      <div className="relative flex items-start justify-between gap-4">
        <div
          className={cn(
            "relative flex items-center justify-center border bg-background transition-transform duration-500 group-hover:scale-105",
            mosaic ? "h-14 w-14" : "h-12 w-12",
            rarityIcon[achievement.rarity],
            legendary && "shadow-[0_0_24px_rgba(200,255,0,0.18)]",
          )}
        >
          <AchievementIcon code={achievement.code} size={mosaic ? 22 : 20} />
          {legendary && !reduced ? (
            <span className="live-dot absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-accent" />
          ) : null}
        </div>
        <p className={cn("font-display text-accent", mosaic ? "text-2xl" : "text-lg")}>{indexLabel}</p>
      </div>
      <p
        className={cn(
          "relative mt-8 text-[10px] font-semibold uppercase tracking-[0.22em]",
          rarityLabel[achievement.rarity],
        )}
      >
        {achievement.rarity}
      </p>
      <h3
        className={cn(
          "font-display relative mt-3 leading-[0.9] text-text",
          mosaic ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl leading-none",
        )}
      >
        {achievement.title}
      </h3>
      <p className="relative mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
        {achievement.description}
      </p>
    </motion.article>
  );
}
