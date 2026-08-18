import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Podium } from "@/components/challenges/Podium";
import { getChallenges } from "@/lib/data/queries";
import { timeRemaining } from "@/lib/utils/format";
import { Badge } from "@/components/ui/Badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Challenges",
  description: "REFORGE weekly challenges, leaderboards, and previous winners.",
  alternates: { canonical: "/challenges" },
};

export default async function ChallengesPage() {
  const challenges = await getChallenges();
  const current = challenges.find((c) => c.status === "live") ?? challenges[0];
  const past = challenges.filter((c) => c.id !== current?.id);

  return (
    <section className="pt-28 pb-24">
      <Container>
        <SectionHeading
          kicker="Challenges"
          title={"THIS WEEK'S\nSTANDARD."}
          subtitle="Compete. Log. Climb the board. Weekly challenges live in the REFORGE app and on this site."
        />

        {current ? (
          <Reveal delay={0.08}>
            <Link
              href={`/challenges/${current.slug}`}
              className="mt-14 block border border-border bg-surface p-8 sm:p-12 transition-transform duration-500 hover:-translate-y-1 hover:border-accent"
            >
              <Badge>{current.status}</Badge>
              <h2 className="font-display mt-6 text-5xl sm:text-7xl">{current.name}</h2>
              <p className="mt-4 max-w-2xl text-text-secondary">{current.description}</p>
              <p className="mt-6 text-[12px] uppercase tracking-[0.16em] text-accent">
                {timeRemaining(current.endsAt)}
              </p>
              {current.isPlaceholder ? (
                <div className="mt-4">
                  <PlaceholderNote>Sample challenge content.</PlaceholderNote>
                </div>
              ) : null}
            </Link>
          </Reveal>
        ) : null}

        {current?.podium.length ? (
          <Reveal className="mt-16">
            <h3 className="font-display mb-6 text-3xl">Podium</h3>
            <Podium places={current.podium} />
          </Reveal>
        ) : null}

        <Reveal className="mt-20">
          <h3 className="font-display text-4xl">Past challenges</h3>
        </Reveal>
        <Stagger className="mt-8 divide-y divide-border border-y border-border">
          {past.map((c) => (
            <StaggerItem key={c.id}>
              <Link href={`/challenges/${c.slug}`} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between hover:text-accent">
                <span className="font-display text-3xl">{c.name}</span>
                <span className="text-sm text-text-muted uppercase tracking-[0.14em]">{c.status}</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
