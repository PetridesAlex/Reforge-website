"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ClassCategory, DayKey, GymClass } from "@/types";
import { ClassCard } from "@/components/classes/ClassCard";
import {
  formatStudioWeekRange,
  studioDateKey,
  studioWeek,
  type StudioWeekDay,
} from "@/lib/utils/studio-time";
import { cn } from "@/lib/utils/cn";

const filters: Array<{ id: "all" | ClassCategory; label: string }> = [
  { id: "all", label: "All" },
  { id: "strength", label: "Strength" },
  { id: "conditioning", label: "Conditioning" },
  { id: "functional", label: "Functional" },
  { id: "mobility", label: "Mobility" },
  { id: "other", label: "Other" },
];

function pickInitialDay(week: StudioWeekDay[], classes: GymClass[]): DayKey {
  const today = week.find((d) => d.isToday) ?? week[0];
  const now = Date.now();
  const hasUpcomingToday = classes.some(
    (gymClass) =>
      studioDateKey(gymClass.startsAt) === today.dateKey &&
      new Date(gymClass.startsAt).getTime() > now,
  );
  if (hasUpcomingToday) return today.key;
  const next = week.find((d) =>
    classes.some(
      (gymClass) =>
        studioDateKey(gymClass.startsAt) === d.dateKey &&
        new Date(gymClass.startsAt).getTime() > now,
    ),
  );
  return next?.key ?? today.key;
}

export function WeeklyTimetable({ classes }: { classes: GymClass[] }) {
  const reduced = useReducedMotion();
  const week = useMemo(() => studioWeek(), []);
  const [day, setDay] = useState<DayKey>(() => pickInitialDay(week, classes));
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [now] = useState(() => Date.now());
  const selected = week.find((d) => d.key === day) ?? week[0];

  const counts = useMemo(() => {
    const map = Object.fromEntries(week.map((d) => [d.dateKey, 0])) as Record<string, number>;
    for (const gymClass of classes) {
      const key = studioDateKey(gymClass.startsAt);
      if (key in map) map[key] += 1;
    }
    return map;
  }, [classes, week]);

  const dayClasses = useMemo(() => {
    return classes
      .filter((gymClass) => studioDateKey(gymClass.startsAt) === selected.dateKey)
      .filter((gymClass) => (filter === "all" ? true : gymClass.category === filter))
      .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  }, [classes, selected.dateKey, filter]);

  const upcomingId =
    dayClasses.find((gymClass) => new Date(gymClass.startsAt).getTime() > now)?.id ?? null;
  const sessionLabel = `${dayClasses.length} ${dayClasses.length === 1 ? "session" : "sessions"}`;
  const statusLabel = selected.isToday ? "Today" : selected.isPast ? "Completed" : "Upcoming";

  return (
    <div className="overflow-hidden border border-border bg-background/80 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-5 sm:px-7">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            This week
          </p>
          <h2 className="font-display mt-2 text-4xl leading-none sm:text-5xl">
            {selected.long} {selected.day}
          </h2>
          <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-text-muted">
            {selected.monthLong} {selected.year}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-[0.16em] text-text-secondary">
            {formatStudioWeekRange(week)}
          </p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-text">
            {sessionLabel}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-text-muted">{statusLabel}</p>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-border" role="tablist" aria-label="Week">
        {week.map((d) => {
          const active = day === d.key;
          const count = counts[d.dateKey] ?? 0;
          return (
            <button
              key={d.dateKey}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`${d.long} ${d.day} ${d.monthLong}, ${count} ${count === 1 ? "session" : "sessions"}`}
              onClick={() => setDay(d.key)}
              className={cn(
                "relative flex flex-col items-center gap-1 px-0.5 py-3 transition-colors duration-300 sm:py-4",
                active
                  ? "bg-accent text-background"
                  : d.isToday
                    ? "text-accent"
                    : d.isPast
                      ? "text-text-muted hover:text-text"
                      : "text-text-secondary hover:text-text",
              )}
            >
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] sm:text-[10px]">
                {d.short}
              </span>
              <span className="font-display text-[1.65rem] leading-none sm:text-3xl">{d.day}</span>
              <span className="flex h-1.5 items-center justify-center gap-[3px]" aria-hidden>
                {count > 0
                  ? Array.from({ length: Math.min(count, 3) }).map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-1 w-1 rounded-full",
                          active ? "bg-background" : "bg-accent",
                        )}
                      />
                    ))
                  : (
                    <span className={cn("h-1 w-1 rounded-full", active ? "bg-background/30" : "bg-border")} />
                  )}
              </span>
              {d.isToday && !active ? (
                <span className="absolute inset-x-2 bottom-0 h-0.5 bg-accent" />
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
          key={`${selected.dateKey}-${filter}`}
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {dayClasses.length ? (
            dayClasses.map((gymClass) => (
              <ClassCard
                key={gymClass.id}
                gymClass={gymClass}
                featured={gymClass.id === upcomingId}
                actionHref="/join"
                actionLabel="Train"
              />
            ))
          ) : (
            <p className="px-5 py-12 text-sm text-text-muted sm:px-7">
              No classes listed for {selected.long} {selected.day} {selected.monthShort}.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
