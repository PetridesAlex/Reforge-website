import { cn } from "@/lib/utils/cn";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}
