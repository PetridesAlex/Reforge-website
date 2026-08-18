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

function AchievementIcon({ code }: { code: string }) {
  const props = { size: 20, strokeWidth: 1.8 } as const;
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
}: {
  achievement: Achievement;
  index?: number;
}) {
  const reduced = useReducedMotion();
  const legendary = achievement.rarity === "legendary";

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 32, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.14, ease }}
      whileHover={reduced ? undefined : { y: -6 }}
      className="group relative h-full overflow-hidden border border-border bg-surface p-5 transition-colors duration-500 hover:border-accent/50 hover:bg-background"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
      />
      <div className="flex items-start justify-between gap-4">
        <div
          className={cn(
            "relative flex h-12 w-12 items-center justify-center border bg-background",
            rarityIcon[achievement.rarity],
            legendary && "shadow-[0_0_24px_rgba(200,255,0,0.18)]",
          )}
        >
          <AchievementIcon code={achievement.code} />
          {legendary && !reduced ? (
            <span className="live-dot absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-accent" />
          ) : null}
        </div>
        <p className="font-display text-lg text-accent">{String(index + 1).padStart(2, "0")}</p>
      </div>
      <p
        className={cn(
          "mt-5 text-[10px] font-semibold uppercase tracking-[0.22em]",
          rarityLabel[achievement.rarity],
        )}
      >
        {achievement.rarity}
      </p>
      <h3 className="font-display mt-3 text-2xl leading-none text-text">{achievement.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">{achievement.description}</p>
    </motion.article>
  );
}
