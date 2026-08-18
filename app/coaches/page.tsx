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
          subtitle="Bios, specialties, and certifications will be published as they are confirmed. Placeholder profiles are clearly marked."
        />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map((coach) => (
            <StaggerItem key={coach.id}>
              <CoachCard coach={coach} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
