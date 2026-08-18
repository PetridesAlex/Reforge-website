"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

const TechWall = dynamic(() => import("@/components/effects/TechWall"), {
  ssr: false,
});

export function FooterBackdrop() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
      {reduced ? (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,255,0,0.08),_transparent_55%),linear-gradient(180deg,#040504_0%,#080908_100%)]" />
      ) : (
        <TechWall
          className="h-full w-full"
          density={6}
          sweep={0.7}
          sweepSpeed={0.32}
          ambient={0.12}
          pulse={0.08}
          pulseRate={0.9}
          grain={0.045}
          vignette={0.38}
          color="#12180c"
          accentColor="#c8ff00"
          edgeColor="#e8ff8a"
          backgroundColor="#040504"
          cursorGlow={0.5}
          cursorRadius={0.32}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/28 via-background/48 to-background/78" />
    </div>
  );
}
