import type { Achievement } from "@/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AchievementBadge } from "@/components/ui/AchievementBadge";
import { Reveal } from "@/components/motion/Reveal";

export function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  const list = achievements.slice(0, 9);

  return (
    <section className="border-t border-border py-24 sm:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            kicker="Achievements"
            title={"EARNED.\nNOT GIVEN."}
            subtitle="Members unlock achievements through consistency and performance in the REFORGE app."
          />
          <Reveal delay={0.1}>
            <p className="max-w-xs text-[11px] uppercase leading-relaxed tracking-[0.18em] text-text-muted">
              {list.length} standards
              <br />
              Unlocked in-app
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((achievement, i) => (
            <AchievementBadge key={achievement.code} achievement={achievement} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
