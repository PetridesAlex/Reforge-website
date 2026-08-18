"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const bars = [42, 78, 55, 92, 64, 88, 48, 96, 70, 58, 84, 50];

export function LiveMeter({ delay = 0 }: { delay?: number }) {
  const reduced = useReducedMotion();

  return (
    <div className="relative mb-6 h-16 overflow-hidden border-b border-accent/40">
      <div
        className={cn(
          "absolute inset-y-0 left-0 origin-left bg-accent/20",
          !reduced && "animate-meter-fill",
        )}
        style={{ width: "70%", animationDelay: `${delay}s` }}
      />
      {!reduced ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-accent/55 to-transparent animate-meter-shimmer"
          style={{ animationDelay: `${delay + 0.2}s` }}
        />
      ) : null}
      <div className="absolute inset-x-0 bottom-0 flex h-full items-end gap-[3px] px-0.5">
        {bars.map((height, i) => (
          <span
            key={i}
            className={cn(
              "flex-1 origin-bottom bg-accent shadow-[0_0_10px_rgba(200,255,0,0.35)]",
              !reduced && "animate-meter-eq",
            )}
            style={{
              height: `${height}%`,
              animationDelay: `${delay + i * 0.11}s`,
              animationDuration: `${0.85 + (i % 5) * 0.18}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
