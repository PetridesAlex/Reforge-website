"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { WeeklyChallenge } from "@/types";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { LiveCountdown } from "@/components/challenges/LiveCountdown";
import { Leaderboard } from "@/components/challenges/Leaderboard";
import { Podium } from "@/components/challenges/Podium";
import { formatDateRange } from "@/lib/utils/format";
import { siteConfig } from "@/lib/config/site";

const scoreLabel: Record<WeeklyChallenge["scoreType"], string> = {
  lowest_time: "For time",
  highest_reps: "Max reps",
  highest_weight: "Max load",
  highest_points: "Points",
  coach_score: "Coach scored",
};

export function ChallengeDetail({ challenge }: { challenge: WeeklyChallenge }) {
  const reduced = useReducedMotion();
  const live = challenge.status === "live";

  return (
    <div>
      <section className="relative overflow-hidden pt-28 pb-20">
        <motion.div
          className="absolute inset-0"
          initial={reduced ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 16, ease: "linear" }}
        >
          <Image
            src="/images/gym/dumbbells-wod.webp"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        <div className="texture absolute inset-0" />
        <div aria-hidden className="challenge-scan pointer-events-none absolute inset-0" />

        <Container className="relative">
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
            <h1 className="font-display mt-6 text-6xl leading-[0.86] sm:text-8xl lg:text-[7.5rem]">
              {challenge.name}
            </h1>
            {challenge.description ? (
              <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
                {challenge.description}
              </p>
            ) : null}
          </Reveal>

          <Reveal delay={0.1} className="mt-10 max-w-xl">
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-text-muted">Time remaining</p>
            <LiveCountdown endsAt={challenge.endsAt} />
          </Reveal>

          <Reveal delay={0.16} className="mt-10 grid gap-px bg-border sm:grid-cols-3">
            <Meta label="Window" value={formatDateRange(challenge.startsAt, challenge.endsAt)} />
            <Meta label="Score" value={scoreLabel[challenge.scoreType]} />
            <Meta label="Athletes" value={challenge.participantCount != null ? String(challenge.participantCount) : "TBC"} />
          </Reveal>

          {challenge.isPlaceholder ? (
            <Reveal delay={0.2} className="mt-6">
              <PlaceholderNote>Sample challenge until live weekly_challenges data is connected.</PlaceholderNote>
            </Reveal>
          ) : null}
        </Container>
      </section>

      <section className="border-t border-border pb-24">
        <Container>
          <div className="grid gap-px bg-border lg:grid-cols-2">
            <Reveal className="bg-background p-6 sm:p-10">
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-accent">01 / Workout</p>
                  <h2 className="font-display mt-2 text-4xl leading-none sm:text-5xl">The piece</h2>
                </div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
                  {scoreLabel[challenge.scoreType]}
                </p>
              </div>
              {challenge.workout ? (
                <p className="max-w-md text-sm leading-relaxed text-text-secondary">{challenge.workout}</p>
              ) : (
                <p className="text-sm text-text-muted">Posted in-app.</p>
              )}
              {challenge.movements.length ? (
                <Stagger className="mt-8 space-y-px bg-border" delay={0.08}>
                  {challenge.movements.map((move, i) => (
                    <StaggerItem key={move.name}>
                      <div className="flex items-center justify-between bg-background px-4 py-4">
                        <div className="flex items-center gap-4">
                          <span className="font-display text-2xl text-accent">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm uppercase tracking-[0.14em]">{move.name}</span>
                        </div>
                        {move.reps ? <span className="text-sm text-text-secondary">{move.reps}</span> : null}
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              ) : null}
              {challenge.instructions ? (
                <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-text-muted">
                  {challenge.instructions}
                </p>
              ) : null}
            </Reveal>

            <Reveal delay={0.08} className="bg-background p-6 sm:p-10">
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-accent">02 / Rules</p>
                  <h2 className="font-display mt-2 text-4xl leading-none sm:text-5xl">The standard</h2>
                </div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">Verified</p>
              </div>
              <Stagger className="space-y-px bg-border">
                {challenge.rules.map((rule, i) => (
                  <StaggerItem key={rule}>
                    <div className="flex gap-4 bg-background px-4 py-5">
                      <span className="font-display text-2xl leading-none text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm leading-relaxed text-text-secondary">{rule}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Record</p>
                  <p className="font-display mt-2 text-3xl">{challenge.currentRecord ?? "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Participants</p>
                  <p className="font-display mt-2 text-3xl">
                    {challenge.participantCount != null ? challenge.participantCount : "TBC"}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-16">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="font-display text-4xl sm:text-5xl">Podium</h2>
              <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Top 03</p>
            </div>
            <Podium places={challenge.podium} />
          </Reveal>

          <Reveal className="mt-16">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="font-display text-4xl sm:text-5xl">Leaderboard</h2>
              <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">In-app scores</p>
            </div>
            <Leaderboard entries={challenge.leaderboard} />
          </Reveal>

          <Reveal delay={0.08} className="mt-16">
            <Button href="/join" size="lg">
              Join {siteConfig.name}
            </Button>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background/70 px-5 py-5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">{label}</p>
      <p className="mt-2 text-sm uppercase tracking-[0.08em] text-text">{value}</p>
    </div>
  );
}
