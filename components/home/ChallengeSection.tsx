"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { WeeklyChallenge } from "@/types";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { LiveCountdown } from "@/components/challenges/LiveCountdown";

export function ChallengeSection({ challenge }: { challenge: WeeklyChallenge }) {
  const reduced = useReducedMotion();
  const live = challenge.status === "live";

  return (
    <section className="relative overflow-hidden border-t border-border">
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 16, ease: "linear" }}
      >
        <Image
          src="/images/gym/dumbbells-wod.webp"
          alt=""
          fill
          loading="lazy"
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-background/88" />
      <div className="texture absolute inset-0" />
      <div aria-hidden className="challenge-scan pointer-events-none absolute inset-0" />

      <Container className="relative py-24 sm:py-32">
        <div className="grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
                  Weekly challenge
                </p>
                {live ? (
                  <span className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                    <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
                    Live
                  </span>
                ) : (
                  <span className="border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-text-muted">
                    {challenge.status}
                  </span>
                )}
              </div>
              <h2 className="font-display mt-5 text-5xl leading-[0.88] sm:text-7xl">
                THIS WEEK&apos;S
                <br />
                CHALLENGE
              </h2>
              <h3 className="font-display mt-8 text-4xl text-accent sm:text-6xl">{challenge.name}</h3>
              <p className="mt-4 max-w-lg text-text-secondary">{challenge.description}</p>
            </Reveal>

            {challenge.movements.length ? (
              <Stagger className="mt-8 space-y-2" delay={0.1}>
                {challenge.movements.map((move, i) => (
                  <StaggerItem key={move.name}>
                    <div className="flex items-center justify-between border border-border bg-background/60 px-4 py-3">
                      <div className="flex items-center gap-4">
                        <span className="font-display text-2xl text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm uppercase tracking-[0.14em]">{move.name}</span>
                      </div>
                      {move.reps ? (
                        <span className="text-sm text-text-secondary">{move.reps}</span>
                      ) : null}
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            ) : (
              <p className="mt-6 text-sm uppercase tracking-[0.16em] text-text-muted">
                {challenge.workout}
              </p>
            )}

            <Reveal delay={0.15} className="mt-10">
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-text-muted">Time remaining</p>
              <LiveCountdown endsAt={challenge.endsAt} />
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Record</p>
                  <p className="mt-2 font-display text-3xl">{challenge.currentRecord ?? "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Athletes</p>
                  <p className="mt-2 font-display text-3xl">{challenge.participantCount ?? "TBC"}</p>
                </div>
              </div>
              {challenge.isPlaceholder ? (
                <div className="mt-4">
                  <PlaceholderNote>Sample challenge until live data is connected.</PlaceholderNote>
                </div>
              ) : null}
              <Button href={`/challenges/${challenge.slug}`} className="mt-8">
                View challenge
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.12} y={36}>
            <div className="border border-accent/25 bg-background/70 p-6 sm:p-8 backdrop-blur-sm">
              <div className="mb-6 flex items-end justify-between">
                <p className="text-[11px] uppercase tracking-[0.24em] text-accent">Podium</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">Top 03</p>
              </div>
              <Stagger className="space-y-3">
                {challenge.leaderboard.slice(0, 3).map((entry, i) => (
                  <StaggerItem key={`${entry.rank}-${entry.athleteName}`}>
                    <div
                      className={`flex items-center justify-between border px-4 py-5 transition-colors duration-300 ${
                        i === 0
                          ? "border-accent bg-accent/10"
                          : "border-border bg-surface/80 hover:border-accent/40"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-display text-4xl leading-none text-accent">
                          {String(entry.rank).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
                            {i === 0 ? "Gold" : i === 1 ? "Silver" : "Bronze"}
                          </p>
                          <p className="mt-1 text-sm uppercase tracking-[0.12em]">{entry.athleteName}</p>
                        </div>
                      </div>
                      <p className="text-sm text-text-secondary">{entry.scoreDisplay}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
