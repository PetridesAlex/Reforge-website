"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import StaggeredText from "@/components/motion/StaggeredText";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: "linear" }}
      >
        <Image
          src="/images/hero.webp"
          alt="REFORGE studio floor"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      <div className="texture absolute inset-0" />
      <motion.div
        aria-hidden
        className="absolute left-0 top-0 h-full w-px bg-accent/40"
        initial={reduced ? false : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.1, ease }}
        style={{ transformOrigin: "top" }}
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-24">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          className="text-[12px] font-semibold uppercase tracking-[0.32em] text-accent"
        >
          REFORGE
        </motion.p>
        <StaggeredText
          as="h1"
          text="FORGE YOUR|STRONGEST SELF."
          segmentBy="words"
          separator="|"
          direction="top"
          delay={80}
          duration={0.7}
          blur
          staggerDirection="forward"
          easing={[0.22, 1, 0.36, 1]}
          className="font-display mt-4 max-w-4xl text-6xl leading-[0.86] sm:text-8xl lg:text-[7.5rem]"
        />
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42, ease }}
          className="mt-6 max-w-md text-base text-text-secondary sm:text-lg"
        >
          Performance-driven training.
          <br />
          Real community.
          <br />
          Measurable progress.
        </motion.p>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.55, ease }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button href="/join">Join REFORGE</Button>
          <Button href="/training" variant="secondary">
            Explore training
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
