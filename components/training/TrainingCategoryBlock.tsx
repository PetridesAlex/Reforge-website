"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { TrainingCategory } from "@/types";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils/cn";

export function TrainingCategoryBlock({
  category,
  index,
}: {
  category: TrainingCategory;
  index: number;
}) {
  const reduced = useReducedMotion();
  const reverse = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");
  const pulse = category.slug === "hyrox" || category.slug === "conditioning";

  return (
    <section id={category.slug} className="scroll-mt-24 border-t border-border">
      <div
        className={cn(
          "grid lg:min-h-[min(88vh,920px)] lg:grid-cols-2",
          reverse && "lg:[&>*:first-child]:order-2",
        )}
      >
        <div className="relative min-h-[46vh] overflow-hidden bg-surface sm:min-h-[52vh] lg:min-h-full">
          <motion.div
            className="absolute inset-0"
            initial={reduced ? false : { scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent",
              reverse
                ? "lg:bg-gradient-to-l lg:from-transparent lg:via-background/15 lg:to-background/75"
                : "lg:bg-gradient-to-r lg:from-transparent lg:via-background/15 lg:to-background/75",
            )}
          />
          <div className="texture absolute inset-0 opacity-40" />
          <p
            aria-hidden
            className="pointer-events-none absolute -bottom-6 left-3 font-display text-[8.5rem] leading-none text-white/[0.07] sm:left-6 sm:text-[11rem] lg:text-[14rem]"
          >
            {num}
          </p>
          <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8 lg:hidden">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              {category.short}
            </p>
          </div>
        </div>

        <div className="relative flex items-center bg-background">
          <div className="relative z-10 mx-5 -mt-8 border border-border bg-background p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:mx-8 sm:p-8 lg:mx-0 lg:mt-0 lg:w-full lg:border-0 lg:bg-transparent lg:p-12 lg:shadow-none xl:p-16">
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                    Protocol {num}
                  </p>
                  <h2 className="font-display mt-3 text-[2.6rem] leading-[0.86] sm:text-6xl lg:text-7xl">
                    {category.name}
                  </h2>
                </div>
                <span
                  aria-hidden
                  className="hidden font-display text-5xl leading-none text-accent/80 sm:block lg:text-6xl"
                >
                  {num}
                </span>
              </div>
              <span aria-hidden className="mt-5 block h-px w-16 bg-accent" />
              <p className="mt-3 hidden text-[11px] uppercase tracking-[0.22em] text-text-muted lg:block">
                {category.short}
              </p>
            </Reveal>

            {pulse ? (
              <Reveal delay={0.06} className="mt-6 flex items-end gap-3">
                <div className="flex h-8 items-end gap-[3px]" aria-hidden>
                  {[0.35, 0.7, 0.48, 1, 0.42, 0.82, 0.55, 0.92].map((h, i) => (
                    <span
                      key={i}
                      className={cn(
                        "w-[3px] origin-bottom bg-accent",
                        reduced ? "opacity-70" : "animate-meter-eq",
                      )}
                      style={{
                        height: `${h * 100}%`,
                        animationDelay: `${i * 0.11}s`,
                      }}
                    />
                  ))}
                </div>
                <p className="pb-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-text-muted">
                  Live demand
                </p>
              </Reveal>
            ) : null}

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[15px] leading-[1.7] text-text-secondary sm:text-base">
                {category.description}
              </p>
            </Reveal>

            <Reveal delay={0.14} className="mt-8 overflow-hidden border border-border">
              <div className="border-b border-border bg-surface px-5 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
                  Who it is for
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text sm:text-[15px]">
                  {category.whoFor}
                </p>
              </div>
              <Stagger className="divide-y divide-border" delay={0.08} stagger={0.06}>
                {category.benefits.map((benefit, i) => (
                  <StaggerItem key={benefit} y={12}>
                    <div className="group flex items-center gap-4 bg-background px-5 py-3.5 transition-colors duration-300 hover:bg-surface">
                      <span className="w-7 shrink-0 font-display text-xl leading-none text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-text-secondary transition-colors duration-300 group-hover:text-text">
                        {benefit}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>

            <Reveal delay={0.18}>
              <Button href="/join" className="mt-8 w-full sm:w-fit">
                Train this
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
