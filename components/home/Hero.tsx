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
      persistent={
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
          <div className="pointer-events-auto mx-auto flex w-full max-w-7xl flex-wrap gap-4 px-5 pb-16 sm:px-8 sm:pb-20">
            <Button href="/join">Join REFORGE</Button>
            <Button href="/training" variant="secondary">
              Explore training
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex h-full w-full flex-col justify-end px-5 pb-36 sm:px-8 sm:pb-44">
        <div className="mx-auto w-full max-w-7xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.32em] text-accent">
            Welcome to
          </p>
          <h1 className="font-display mt-3 max-w-4xl text-6xl leading-[0.86] text-text sm:text-8xl lg:text-[7.5rem]">
            REFORGE
          </h1>
        </div>
      </div>
    </ScrollMask>
  );
}
