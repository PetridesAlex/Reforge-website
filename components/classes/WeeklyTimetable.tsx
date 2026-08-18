"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ClassCategory, DayKey, GymClass } from "@/types";
import { ClassCard } from "@/components/classes/ClassCard";
import { dayKey } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const days: DayKey[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const dayNames: Record<DayKey, string> = {
  MON: "Monday",
  TUE: "Tuesday",
  WED: "Wednesday",
  THU: "Thursday",
  FRI: "Friday",
  SAT: "Saturday",
  SUN: "Sunday",
};
const filters: Array<{ id: "all" | ClassCategory; label: string }> = [
  { id: "all", label: "All" },
  { id: "strength", label: "Strength" },
  { id: "conditioning", label: "Conditioning" },
  { id: "functional", label: "Functional" },
  { id: "mobility", label: "Mobility" },
  { id: "other", label: "Other" },
];

export function WeeklyTimetable({ classes }: { classes: GymClass[] }) {
  const reduced = useReducedMotion();
  const [day, setDay] = useState<DayKey>(() => {
    const map: DayKey[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return map[new Date().getDay()];
  });
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");

  const counts = useMemo(() => {
    const map = Object.fromEntries(days.map((d) => [d, 0])) as Record<DayKey, number>;
    for (const gymClass of classes) {
      map[dayKey(gymClass.startsAt)] += 1;
    }
    return map;
  }, [classes]);

  const filtered = useMemo(() => {
    return classes
      .filter((c) => dayKey(c.startsAt) === day)
      .filter((c) => (filter === "all" ? true : c.category === filter))
      .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  }, [classes, day, filter]);

  return (
    <div className="border border-border bg-background/70 backdrop-blur-sm">
      <div className="flex items-end justify-between gap-4 border-b border-border px-5 py-5 sm:px-7">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Schedule</p>
          <p className="font-display mt-2 text-3xl leading-none sm:text-4xl">{dayNames[day]}</p>
        </div>
        <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
          {filtered.length} {filtered.length === 1 ? "session" : "sessions"}
        </p>
      </div>

      <div className="grid grid-cols-7 border-b border-border" role="tablist" aria-label="Day">
        {days.map((d) => {
          const active = day === d;
          return (
            <button
              key={d}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setDay(d)}
              className={cn(
                "relative flex flex-col items-center gap-1 px-1 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 sm:py-4 sm:text-[11px] sm:tracking-[0.16em]",
                active ? "text-accent" : "text-text-muted hover:text-text",
              )}
            >
              {d}
              <span className={cn("font-display text-lg leading-none", active ? "text-accent" : "text-text")}>
                {counts[d]}
              </span>
              {active ? (
                <motion.span
                  layoutId={reduced ? undefined : "day-underline"}
                  className="absolute inset-x-2 bottom-0 h-0.5 bg-accent"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 border-b border-border px-5 py-4 sm:px-7" aria-label="Class type">
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300",
                active
                  ? "border-accent bg-accent text-background"
                  : "border-border text-text-muted hover:border-accent/50 hover:text-text",
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${day}-${filter}`}
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {filtered.length ? (
            filtered.map((gymClass, i) => (
              <ClassCard
                key={gymClass.id}
                gymClass={gymClass}
                featured={i === 0}
                actionHref="/join"
                actionLabel="Train"
              />
            ))
          ) : (
            <p className="px-5 py-12 text-sm text-text-muted sm:px-7">
              No classes listed for this filter.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
