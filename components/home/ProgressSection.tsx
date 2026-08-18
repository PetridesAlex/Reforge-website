import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { LiveMeter } from "@/components/home/LiveMeter";
import { cn } from "@/lib/utils/cn";

const groups = [
  {
    kicker: "Execution",
    items: [
      { label: "Sessions", value: "Logged in-app" },
      { label: "Training streak", value: "Consistency tracked" },
      { label: "Workout history", value: "Always available" },
      { label: "Training volume", value: "Load recorded per session" },
    ],
  },
  {
    kicker: "Performance",
    items: [
      { label: "Personal bests", value: "PRs recorded" },
      { label: "Body metrics", value: "Private to the member" },
      { label: "Challenge performance", value: "Weekly board" },
      { label: "Achievements", value: "Unlocked through work" },
    ],
  },
] as const;

export function ProgressSection() {
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            kicker="Progress"
            title={"YOUR WORK.\nYOUR PROGRESS."}
            subtitle="What the member app tracks. Illustrative system — not live member data."
          />
          <Reveal delay={0.1}>
            <p className="max-w-xs text-[11px] uppercase leading-relaxed tracking-[0.18em] text-text-muted">
              Private to the athlete.
              <br />
              Visible in the REFORGE app.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-14 border border-border">
          <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              In-app tracking
            </p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
              Eight measures · member-only
            </p>
          </div>

          {groups.map((group, groupIndex) => (
            <div key={group.kicker} className={cn(groupIndex > 0 && "border-t border-border")}>
              <div className="border-b border-border px-5 py-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-text-muted">
                  {String(groupIndex + 1).padStart(2, "0")} / {group.kicker}
                </p>
              </div>
              <Stagger
                className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4"
                delay={groupIndex * 0.12}
                stagger={0.06}
              >
                {group.items.map((item, i) => {
                  const index = groupIndex * 4 + i;
                  return (
                    <StaggerItem key={item.label}>
                      <article className="group relative h-full bg-background p-6 transition-colors duration-500 hover:bg-surface">
                        <span
                          aria-hidden
                          className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                        />
                        <div className="flex items-start justify-between gap-4">
                          <p className="font-display text-xl text-accent">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="text-[10px] uppercase tracking-[0.18em] text-text-muted">
                            {group.kicker}
                          </p>
                        </div>
                        <LiveMeter delay={index * 0.1} />
                        <h3 className="font-display text-3xl leading-[0.92]">{item.label}</h3>
                        <p className="mt-3 text-sm text-text-secondary">{item.value}</p>
                      </article>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
