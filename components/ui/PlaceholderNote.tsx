export function PlaceholderNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">{children}</p>
  );
}
