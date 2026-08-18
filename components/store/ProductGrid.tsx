"use client";

import { useMemo, useState } from "react";
import type { Product, StoreCategorySlug } from "@/types";
import { ProductCard } from "@/components/store/ProductCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils/cn";

const filters: Array<{ id: "all" | StoreCategorySlug; label: string }> = [
  { id: "all", label: "All" },
  { id: "t-shirts", label: "T-Shirts" },
  { id: "hoodies", label: "Hoodies" },
  { id: "socks", label: "Socks" },
  { id: "headwear", label: "Hats" },
];

export function ProductGrid({
  products,
  layout = "catalog",
  bleed = false,
}: {
  products: Product[];
  layout?: "catalog" | "lookbook";
  bleed?: boolean;
}) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const list = useMemo(
    () => products.filter((p) => (filter === "all" ? true : p.category === filter)),
    [products, filter],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
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
      <Stagger
        key={`${filter}-${layout}`}
        className={
          layout === "lookbook"
            ? cn(
                "mt-10 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4",
                bleed && "-mx-5 w-[calc(100%+2.5rem)] sm:-mx-8 sm:w-[calc(100%+4rem)] lg:-mx-10 lg:w-[calc(100%+5rem)]",
              )
            : "mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        }
      >
        {list.map((product, i) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} index={i} layout={layout} />
          </StaggerItem>
        ))}
      </Stagger>
      {list.length === 0 ? (
        <p className="mt-10 text-sm text-text-muted">No pieces in this category yet.</p>
      ) : null}
    </div>
  );
}
