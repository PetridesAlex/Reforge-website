"use client";

import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HeroBackdrop } from "@/components/home/HeroBackdrop";
import { ScrollMask } from "@/components/effects/ScrollMask";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <ScrollMask
      variant="type"
      word="REFORGE"
      src="/images/gym/kettlebell-still.webp"
      alt="Kettlebells on the REFORGE studio floor"
      overlay={0.28}
      radius={0}
      zoom={1.06}
      feather={8}
      scrollLength={1.45}
      settle={0.8}
      background="#040504"
      revealContent
      reduced={reduced}
      media={<HeroBackdrop reduced={reduced} />}
    >
      <div className="flex h-full w-full flex-col justify-end px-5 pb-8 pt-28 sm:px-8 sm:pb-12 md:pb-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent sm:text-[12px] sm:tracking-[0.32em]">
              Welcome to
            </p>
            <h1 className="font-display mt-2 text-[3.25rem] leading-[0.86] text-text sm:mt-3 sm:text-8xl lg:text-[7.5rem]">
              REFORGE
            </h1>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href="/join" className="w-full sm:w-auto">
              Join REFORGE
            </Button>
            <Button href="/training" variant="secondary" className="w-full sm:w-auto">
              Explore training
            </Button>
          </div>
        </div>
      </div>
    </ScrollMask>
  );
}
