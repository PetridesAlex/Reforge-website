import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { WeeklyTimetable } from "@/components/classes/WeeklyTimetable";
import { Reveal } from "@/components/motion/Reveal";
import { getClasses } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Classes",
  description: "REFORGE weekly class timetable — strength, conditioning, functional, and mobility sessions.",
  alternates: { canonical: "/classes" },
};

export default async function ClassesPage() {
  const classes = await getClasses();
  const sample = classes.some((c) => c.isPlaceholder);

  return (
    <section className="relative overflow-hidden pt-28 pb-24">
      <Image
        src="/images/gym/studio-floor.webp"
        alt=""
        fill
        priority
        className="object-cover opacity-[0.16]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      <Container className="relative">
        <div className="max-w-2xl">
          <SectionHeading
            kicker="Classes"
            title={"WEEKLY\nTIMETABLE."}
            subtitle="Public schedule. No login required to view. Spaces and coaches update from the studio calendar when connected."
          />
        </div>
        {sample ? (
          <Reveal delay={0.08} className="mt-6">
            <PlaceholderNote>Sample timetable until live class data is connected.</PlaceholderNote>
          </Reveal>
        ) : null}
        <Reveal delay={0.12} className="mt-12">
          <WeeklyTimetable classes={classes} />
        </Reveal>
      </Container>
    </section>
  );
}
