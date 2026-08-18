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

export function ProductGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const list = useMemo(
    () => products.filter((p) => (filter === "all" ? true : p.category === filter)),
    [products, filter],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em]",
              filter === f.id ? "border-accent bg-accent text-background" : "border-border text-text-muted",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <Stagger className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" key={filter}>
        {list.map((product, i) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} index={i} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
