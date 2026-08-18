import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getCoachBySlug, getCoaches } from "@/lib/data/queries";
import { Reveal } from "@/components/motion/Reveal";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const coaches = await getCoaches();
  return coaches.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const coach = await getCoachBySlug(slug);
  if (!coach) return { title: "Coach" };
  return {
    title: coach.name,
    description: `${coach.name} — ${coach.role} at REFORGE.`,
    alternates: { canonical: `/coaches/${coach.slug}` },
  };
}

export default async function CoachDetailPage({ params }: Props) {
  const { slug } = await params;
  const coach = await getCoachBySlug(slug);
  if (!coach) notFound();

  return (
    <section className="pt-28 pb-24">
      <Container className="grid gap-12 lg:grid-cols-2">
        <Reveal className="relative aspect-[3/4] overflow-hidden bg-surface">
          <Image
            src={coach.image}
            alt={coach.isPlaceholder ? `${coach.name} placeholder portrait` : coach.name}
            fill
            className="object-cover"
            priority
          />
        </Reveal>
        <Reveal delay={0.12}>
          {coach.isPlaceholder ? <Badge>Profile forthcoming</Badge> : null}
          <h1 className="font-display mt-4 text-5xl sm:text-7xl">{coach.name}</h1>
          <p className="mt-3 text-[12px] uppercase tracking-[0.2em] text-accent">{coach.role}</p>
          <p className="mt-8 leading-relaxed text-text-secondary">{coach.bio}</p>

          <h2 className="font-display mt-10 text-2xl">Specialties</h2>
          <ul className="mt-3 space-y-1 text-sm text-text-secondary">
            {coach.specialties.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <h2 className="font-display mt-8 text-2xl">Certifications</h2>
          <ul className="mt-3 space-y-1 text-sm text-text-secondary">
            {coach.certifications.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <h2 className="font-display mt-8 text-2xl">Training philosophy</h2>
          <p className="mt-3 text-text-secondary">{coach.philosophy}</p>

          {coach.classTitles.length ? (
            <>
              <h2 className="font-display mt-8 text-2xl">Classes</h2>
              <p className="mt-3 text-sm text-text-secondary">{coach.classTitles.join(" · ")}</p>
            </>
          ) : null}

          <Button href="/join" className="mt-10">
            Train with {coach.name}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
