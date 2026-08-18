import type { ChallengePodiumPlace } from "@/types";

const medals = { 1: "Gold", 2: "Silver", 3: "Bronze" } as const;

export function Podium({ places }: { places: ChallengePodiumPlace[] }) {
  const ordered = [1, 2, 3].map((n) => places.find((p) => p.place === n));

  return (
    <div className="grid gap-px bg-border sm:grid-cols-3">
      {ordered.map((place, i) => (
        <div
          key={i}
          className={`bg-background p-6 text-center sm:p-8 ${i === 0 ? "sm:order-2" : i === 1 ? "sm:order-1" : "sm:order-3"}`}
        >
          <p className="font-display text-2xl text-accent">{String(i + 1).padStart(2, "0")}</p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            {medals[(i + 1) as 1 | 2 | 3]}
          </p>
          <p className="font-display mt-4 text-3xl leading-none sm:text-4xl">
            {place?.athleteName ?? "—"}
          </p>
          <p className="mt-3 text-sm text-text-secondary">{place?.scoreDisplay ?? "Result forthcoming"}</p>
        </div>
      ))}
    </div>
  );
}
