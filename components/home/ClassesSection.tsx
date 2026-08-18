import Image from "next/image";
import type { GymClass } from "@/types";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ClassCard } from "@/components/classes/ClassCard";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function ClassesSection({ classes }: { classes: GymClass[] }) {
  const upcoming = classes.slice(0, 6);
  const nextId = upcoming[0]?.id;

  return (
    <section className="relative overflow-hidden border-t border-border">
      <Image
        src="/images/gym/studio-floor.webp"
        alt=""
        fill
        loading="lazy"
        className="object-cover opacity-[0.18]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/92 to-background" />

      <Container className="relative grid gap-12 py-24 sm:py-32 lg:grid-cols-[0.9fr_1.2fr] lg:items-end">
        <Reveal>
          <SectionHeading
            kicker="Classes"
            title={"SHOW UP.\nTRAIN HARD."}
            subtitle="A sample of the week. Live timetable loads from the studio calendar when connected."
          />
          <div className="mt-8 flex items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-text-muted">
            <span>
              <span className="text-accent">{upcoming.length}</span> sessions shown
            </span>
            <span className="h-px w-8 bg-border" />
            <span>Public timetable</span>
          </div>
          <Button href="/classes" className="mt-8">
            View all classes
          </Button>
        </Reveal>

        <Reveal delay={0.1} y={32}>
          <div className="border border-border bg-background/70 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">This week</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">Studio floor</p>
            </div>
            <Stagger>
              {upcoming.map((gymClass) => (
                <StaggerItem key={gymClass.id}>
                  <ClassCard gymClass={gymClass} featured={gymClass.id === nextId} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
