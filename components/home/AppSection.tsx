"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { LiveMeter } from "@/components/home/LiveMeter";

const features = [
  "Workout tracking",
  "Class schedule",
  "Weekly challenges",
  "Leaderboards",
  "Achievements",
  "Progress tracking",
  "Community",
  "Coach communication",
  "REFORGE Store",
];

export function AppSection() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <Image
        src="/images/gym/kettlebell-portrait.webp"
        alt=""
        fill
        loading="lazy"
        className="object-cover opacity-[0.16]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/70" />
      <div className="texture absolute inset-0" />

      <Container className="relative grid items-center gap-16 py-24 sm:py-32 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <SectionHeading
            kicker="The app"
            title={"YOUR TRAINING.\nYOUR PROGRESS.\nONE PLACE."}
            subtitle="Sessions, challenges, progress, and community — carried in the REFORGE member app. Available on iOS and Android."
          />
          <Stagger className="mt-10 grid grid-cols-1 gap-px bg-border sm:grid-cols-2" delay={0.08} stagger={0.05}>
            {features.map((feature, i) => (
              <StaggerItem key={feature} className={i === features.length - 1 ? "sm:col-span-2" : undefined}>
                <div className="group flex items-center gap-4 bg-background/80 px-4 py-3.5 backdrop-blur-sm transition-colors duration-300 hover:bg-surface">
                  <span className="font-display text-lg text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-text-secondary transition-colors duration-300 group-hover:text-text">
                    {feature}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.16} className="mt-10">
            <StoreBadges />
          </Reveal>
        </div>

        <Reveal delay={0.12} className="flex justify-center lg:justify-end">
          <PhoneMock />
        </Reveal>
      </Container>
    </section>
  );
}

function PhoneMock() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="relative"
      animate={reduced ? undefined : { y: [0, -14, 0] }}
      transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
      />
      <div className="relative h-[560px] w-[278px] rounded-[2.6rem] border border-white/12 bg-[#111] p-[10px] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
        <div className="relative h-full overflow-hidden rounded-[2.1rem] bg-bg-deep">
          <Image
            src="/images/gym/kettlebell-portrait.webp"
            alt="REFORGE app on iPhone"
            fill
            loading="lazy"
            className="object-cover"
            sizes="278px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/85" />
          <span className="absolute left-1/2 top-3 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
          <div className="absolute inset-x-0 top-10 px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">Today</p>
            <p className="font-display mt-1 text-4xl leading-none">REFORGE</p>
            <div className="mt-4 border border-white/10 bg-black/40 p-3 backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-[0.18em] text-text-muted">Next session</p>
              <p className="font-display mt-1 text-2xl">Strength</p>
              <p className="mt-1 text-xs text-text-secondary">18:00 · Studio floor</p>
            </div>
            <div className="mt-3 border border-white/10 bg-black/40 p-3 backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-[0.18em] text-text-muted">This week</p>
              <div className="mt-2">
                <LiveMeter />
              </div>
            </div>
          </div>
          <p className="absolute inset-x-5 bottom-8 text-[11px] uppercase tracking-[0.2em] text-white/80">
            Train. Track. Repeat.
          </p>
          {!reduced ? (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/18 to-transparent"
              initial={{ x: "-120%" }}
              animate={{ x: "280%" }}
              transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
            />
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
