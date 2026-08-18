import type { LeaderboardEntry } from "@/types";

export function Leaderboard({ entries }: { entries: LeaderboardEntry[] }) {
  if (!entries.length) {
    return <p className="text-sm text-text-muted">Leaderboard forthcoming.</p>;
  }

  return (
    <ol className="divide-y divide-border border-y border-border">
      {entries.map((entry) => (
        <li key={`${entry.rank}-${entry.athleteName}`} className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <span className="font-display text-2xl text-accent w-10">
              {String(entry.rank).padStart(2, "0")}
            </span>
            <span className="text-sm uppercase tracking-[0.12em]">{entry.athleteName}</span>
          </div>
          <span className="text-sm text-text-secondary">{entry.scoreDisplay}</span>
        </li>
      ))}
    </ol>
  );
}
