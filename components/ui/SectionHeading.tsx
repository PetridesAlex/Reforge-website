"use client";

import { cn } from "@/lib/utils/cn";
import { Reveal } from "@/components/motion/Reveal";

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
  className,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "text-center", className)}>
      {kicker ? (
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
          {kicker}
        </p>
      ) : null}
      <h2 className="font-display text-4xl leading-[0.92] text-text sm:text-5xl lg:text-6xl whitespace-pre-line">
        {title}
      </h2>
      <span
        aria-hidden
        className="mt-5 block h-px w-16 origin-left bg-accent"
      />
      {subtitle ? (
        <p
          className={cn(
            "mt-5 max-w-xl text-base leading-relaxed text-text-secondary",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
