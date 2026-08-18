"use client";

import { useEffect, useState } from "react";

function countdownParts(endsAt: string) {
  const diff = Math.max(0, new Date(endsAt).getTime() - Date.now());
  return {
    closed: diff <= 0,
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

export function LiveCountdown({ endsAt }: { endsAt: string }) {
  const [parts, setParts] = useState<ReturnType<typeof countdownParts> | null>(null);

  useEffect(() => {
    const tick = () => setParts(countdownParts(endsAt));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [endsAt]);

  const units = [
    { label: "Days", value: parts?.days ?? 0 },
    { label: "Hrs", value: parts?.hours ?? 0 },
    { label: "Min", value: parts?.minutes ?? 0 },
    { label: "Sec", value: parts?.seconds ?? 0 },
  ];

  return (
    <div className="grid grid-cols-4 gap-px bg-border" suppressHydrationWarning>
      {units.map((unit) => (
        <div key={unit.label} className="bg-background/80 px-2 py-4 text-center">
          <p className="font-display text-3xl leading-none text-accent sm:text-5xl">
            {parts ? String(unit.value).padStart(2, "0") : "––"}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-text-muted">{unit.label}</p>
        </div>
      ))}
    </div>
  );
}
