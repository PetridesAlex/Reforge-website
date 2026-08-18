import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CoachCard } from "@/components/coaches/CoachCard";
import { getCoaches } from "@/lib/data/queries";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Coaches",
  description: "Meet the REFORGE coaching team.",
  alternates: { canonical: "/coaches" },
};

export default async function CoachesPage() {
  const coaches = await getCoaches();

  return (
    <section className="pt-28 pb-24">
      <Container>
        <SectionHeading
          kicker="Coaches"
          title={"THE STANDARD\nHAS A FACE."}
          subtitle="Andreas Petrides coaches the floor at City Box Gym. More coaches will be added here as they are confirmed."
        />
        <Stagger className={coaches.length === 1 ? "mt-14" : "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"} stagger={0.1}>
          {coaches.map((coach) => (
            <StaggerItem key={coach.id}>
              <CoachCard coach={coach} featured={coaches.length === 1} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
