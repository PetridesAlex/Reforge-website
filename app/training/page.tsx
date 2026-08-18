import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/ui/CTASection";
import { Reveal } from "@/components/motion/Reveal";
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
          src="/images/gym/kettlebell-athlete.webp"
          alt=""
          fill
          className="object-cover opacity-30"
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
        <section
          key={cat.slug}
          id={cat.slug}
          className="scroll-mt-24 border-t border-border py-20 sm:py-28"
        >
          <Container className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <Reveal className="relative aspect-[4/5] overflow-hidden bg-surface" x={i % 2 === 1 ? 28 : -28} y={0}>
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                loading="lazy"
                className="object-cover"
                sizes="50vw"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[11px] uppercase tracking-[0.24em] text-accent">0{i + 1}</p>
              <h2 className="font-display mt-3 text-5xl sm:text-6xl">{cat.name}</h2>
              <p className="mt-6 text-text-secondary leading-relaxed">{cat.description}</p>
              <p className="mt-6 text-sm uppercase tracking-[0.14em] text-text">Who it is for</p>
              <p className="mt-2 text-text-secondary">{cat.whoFor}</p>
              <ul className="mt-6 space-y-2">
                {cat.benefits.map((b) => (
                  <li key={b} className="border-l border-accent pl-4 text-sm text-text-secondary">
                    {b}
                  </li>
                ))}
              </ul>
              <Button href="/join" className="mt-8">
                Train this
              </Button>
            </Reveal>
          </Container>
        </section>
      ))}
      <CTASection
        title={"YOUR WORK\nSTARTS HERE."}
        primary={{ href: "/classes", label: "See classes" }}
        secondary={{ href: "/join", label: "Join REFORGE" }}
      />
    </>
  );
}
