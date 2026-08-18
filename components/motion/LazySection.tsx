import { cn } from "@/lib/utils/cn";

/**
 * Browser-native lazy rendering. Content stays in the HTML for SEO,
 * but the browser can skip painting until the section approaches the viewport.
 */
export function LazySection({
  children,
  className,
  estimate = "auto 720px",
}: {
  children: React.ReactNode;
  className?: string;
  estimate?: string;
}) {
  return (
    <div
      className={cn(className)}
      style={{ contentVisibility: "auto", containIntrinsicSize: estimate }}
    >
      {children}
    </div>
  );
}
