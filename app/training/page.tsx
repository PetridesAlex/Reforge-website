import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/ui/CTASection";
import { TrainingCategoryBlock } from "@/components/training/TrainingCategoryBlock";
import { getTrainingCategories } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Training",
  description: "REFORGE training philosophy — strength, conditioning, functional fitness, mobility, performance, and personal coaching.",
  alternates: { canonical: "/training" },
};

export default async function TrainingPage() {
  const categories = await getTrainingCategories();

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-20">
        <Image
          src="/images/gym/studio-floor.webp"
          alt=""
          fill
          className="object-cover object-center opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background" />
        <Container className="relative">
          <SectionHeading
            kicker="Training"
            title={"MORE THAN\nA WORKOUT."}
            subtitle="REFORGE training is built for performance. Each category has a purpose — strength, engine, movement, and coaching that holds the standard."
          />
        </Container>
      </section>

      {categories.map((cat, i) => (
        <TrainingCategoryBlock key={cat.slug} category={cat} index={i} />
      ))}
      <CTASection
        title={"YOUR WORK\nSTARTS HERE."}
        primary={{ href: "/classes", label: "See classes" }}
        secondary={{ href: "/join", label: "Join REFORGE" }}
      />
    </>
  );
}
