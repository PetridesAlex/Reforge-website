import type { Achievement } from "@/types";
import { AchievementBadge } from "@/components/ui/AchievementBadge";
import { Reveal } from "@/components/motion/Reveal";
import StaggeredText from "@/components/motion/StaggeredText";
import { XpEngine } from "@/components/home/XpEngine";

export function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  const list = achievements.slice(0, 9);

  return (
    <section className="border-t border-border py-24 sm:py-32">
      <div className="flex flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-end lg:px-10 xl:px-14">
        <Reveal>
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
            Achievements
          </p>
          <StaggeredText
            as="h2"
            text="EARNED. NOT GIVEN."
            segmentBy="words"
            direction="top"
            delay={80}
            duration={0.6}
            blur
            staggerDirection="forward"
            easing={[0.22, 1, 0.36, 1]}
            className="font-display text-4xl leading-[0.92] text-text sm:text-5xl lg:text-6xl xl:text-7xl"
          />
          <span aria-hidden className="mt-5 block h-px w-16 origin-left bg-accent" />
          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary">
            Members unlock achievements through consistency and performance in the REFORGE app.
            Each session moves the XP bar. Standards unlock when the work is done.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[11px] uppercase leading-relaxed tracking-[0.18em] text-text-muted">
            <span className="font-display text-5xl leading-none text-accent">
              {String(list.length).padStart(2, "0")}
            </span>
            <span className="mt-3 block">
              Standards
              <br />
              Unlocked in-app
            </span>
          </p>
        </Reveal>
      </div>

      <XpEngine nextStandard="10 WORKOUTS" />

      <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Standards</p>
        <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
          Common · Rare · Epic · Legendary
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
        {list.map((achievement, i) => (
          <AchievementBadge
            key={achievement.code}
            achievement={achievement}
            index={i}
            layout="mosaic"
          />
        ))}
      </div>
    </section>
  );
}
