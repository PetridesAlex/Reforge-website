"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils/cn";

function parseStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { amount: 0, suffix: value };
  return { amount: Number(match[1]), suffix: match[2] ?? "" };
}

export function StatBlock({
  value,
  label,
  placeholder,
  delay = 0,
}: {
  value: string;
  label: string;
  placeholder?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const reduced = useReducedMotion();
  const { amount, suffix } = parseStat(value);
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(reduced ? amount : 0);

  useMotionValueEvent(motionVal, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      motionVal.set(amount);
      return;
    }
    const controls = animate(motionVal, amount, {
      duration: 1.85,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, amount, delay, reduced, motionVal]);

  return (
    <div ref={ref} className="border-t border-border pt-6">
      <p className={cn("font-display text-5xl tabular-nums text-accent sm:text-6xl lg:text-7xl")}>
        {display}
        {suffix}
      </p>
      <span
        aria-hidden
        className={cn(
          "mt-4 block h-px origin-left bg-accent transition-transform duration-[1800ms] ease-out",
          inView ? "scale-x-100" : "scale-x-0",
        )}
        style={{ transitionDelay: `${delay}s` }}
      />
      <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-text">
        {label}
      </p>
      {placeholder ? (
        <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-text-muted">
          Placeholder figure
        </p>
      ) : null}
    </div>
  );
}
