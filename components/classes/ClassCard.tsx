"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GymClass } from "@/types";
import { dayKey, formatDuration, formatTime } from "@/lib/utils/format";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

export function ClassCard({
  gymClass,
  featured = false,
  actionHref = "/classes",
  actionLabel = "Details",
}: {
  gymClass: GymClass;
  featured?: boolean;
  actionHref?: string;
  actionLabel?: string;
}) {
  const spaces =
    gymClass.enrolledCount === null
      ? "Spaces TBC"
      : gymClass.enrolledCount >= gymClass.capacity
        ? "Full"
        : `${gymClass.capacity - gymClass.enrolledCount} spaces`;
  const [now] = useState(() => Date.now());
  const start = new Date(gymClass.startsAt).getTime();
  const end = new Date(gymClass.endsAt).getTime();
  const ended = Number.isFinite(end) ? end <= now : start <= now;
  const live = start <= now && end > now;
  const stamp = ended ? "Ended" : live ? "Live" : featured ? "Up next" : dayKey(gymClass.startsAt);

  return (
    <article
      className={cn(
        "group relative grid grid-cols-[4.5rem_1fr] gap-4 overflow-hidden border-b border-border py-5 pl-4 transition-all duration-300 sm:grid-cols-[5.5rem_1fr_auto] sm:items-center sm:pl-5",
        ended && "opacity-55",
        live && "bg-accent/10",
        featured && !ended ? "bg-accent/8" : !live && "hover:bg-surface",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0 left-0 w-px bg-accent transition-all duration-500",
          featured ? "w-[3px]" : "group-hover:w-[3px]",
        )}
      />
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
          {stamp}
        </p>
        <p
          className={cn(
            "font-display mt-1 text-3xl leading-none",
            ended ? "text-text-muted" : "text-accent",
          )}
        >
          {formatTime(gymClass.startsAt)}
        </p>
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          {live ? (
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
              Live
            </span>
          ) : featured && !ended ? (
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Up next</span>
          ) : null}
          <h3 className="font-display text-2xl leading-none text-text transition-colors duration-300 group-hover:text-accent">
            {gymClass.title}
          </h3>
        </div>
        <p className="mt-2 text-sm text-text-secondary">
          {formatDuration(gymClass.durationMin)} · {gymClass.coachName}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge>{gymClass.level}</Badge>
          <Badge>{spaces}</Badge>
        </div>
      </div>
      <Link
        href={actionHref}
        className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent sm:flex"
      >
        {actionLabel}
        <ArrowRight size={14} />
      </Link>
    </article>
  );
}
