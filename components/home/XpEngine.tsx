"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const TOTAL = 10;
const BASE = 6;
const ease = [0.22, 1, 0.36, 1] as const;

export function XpEngine({ nextStandard = "10 WORKOUTS" }: { nextStandard?: string }) {
  const reduced = useReducedMotion();
  const [filled, setFilled] = useState(reduced ? BASE : 0);
  const [gain, setGain] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const timeouts: number[] = [];

    for (let i = 1; i <= BASE; i += 1) {
      timeouts.push(window.setTimeout(() => setFilled(i), i * 110));
    }

    timeouts.push(
      window.setTimeout(() => {
        const tick = window.setInterval(() => {
          setFilled((value) => (value >= TOTAL - 1 ? BASE : value + 1));
          setGain(true);
          timeouts.push(window.setTimeout(() => setGain(false), 720));
        }, 2400);
        timeouts.push(tick);
      }, BASE * 110 + 700),
    );

    return () => {
      timeouts.forEach((id) => {
        window.clearTimeout(id);
        window.clearInterval(id);
      });
    };
  }, [reduced]);

  const percent = Math.round((filled / TOTAL) * 100);

  return (
    <div className="mt-12 w-full border-y border-border bg-surface/40">
      <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:px-10 xl:px-14">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
            XP engine
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
            Every logged workout applies XP toward the next standard. Sample track — not live member data.
          </p>
        </div>
        <div className="flex items-end justify-between gap-8 sm:justify-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted">Sessions applied</p>
            <p className="font-display mt-1 text-4xl leading-none text-text">
              {String(filled).padStart(2, "0")}
              <span className="text-xl text-text-muted"> / {String(TOTAL).padStart(2, "0")}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted">Next standard</p>
            <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-text">
              {nextStandard}
            </p>
            <p
              className={cn(
                "mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent transition-opacity duration-300",
                gain ? "opacity-100" : "opacity-40",
              )}
            >
              Workout logged · +XP
            </p>
          </div>
        </div>
      </div>

      <div className="relative h-2.5 w-full overflow-hidden bg-border/70">
        <motion.div
          className="absolute inset-y-0 left-0 bg-accent shadow-[0_0_24px_rgba(200,255,0,0.35)]"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: reduced ? 0 : 0.55, ease }}
        />
        {!reduced ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-meter-shimmer"
          />
        ) : null}
      </div>

      <div className="grid grid-cols-10 gap-px bg-border" aria-hidden>
        {Array.from({ length: TOTAL }).map((_, i) => {
          const on = i < filled;
          const current = i === filled - 1;
          return (
            <div
              key={i}
              className={cn(
                "relative flex h-10 items-center justify-center bg-background sm:h-12",
                on && "bg-accent/10",
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-full max-w-[70%] rounded-full transition-colors duration-300",
                  on ? "bg-accent" : "bg-border",
                  current && gain && "shadow-[0_0_16px_rgba(200,255,0,0.55)]",
                )}
              />
              {current && gain ? (
                <span className="absolute -top-2 right-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-accent">
                  +XP
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
