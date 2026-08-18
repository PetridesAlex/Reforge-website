"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Product, StoreCategorySlug } from "@/types";
import { formatPrice } from "@/lib/utils/format";
import { useCart } from "@/lib/store/cart-context";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const categoryLabel: Record<StoreCategorySlug, string> = {
  "t-shirts": "T-Shirts",
  hoodies: "Hoodies",
  socks: "Socks",
  headwear: "Headwear",
};

export function ProductCard({
  product,
  index,
  layout = "catalog",
}: {
  product: Product;
  index?: number;
  layout?: "catalog" | "lookbook";
}) {
  const [quick, setQuick] = useState(false);
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0] ?? "M");
  const lookbook = layout === "lookbook";
  const price = formatPrice(product.priceCents, product.currency);

  return (
    <article className={cn("group", lookbook && "relative isolate min-h-[70vh] overflow-hidden bg-background md:min-h-[58vh]")}>
      <div className={cn("relative overflow-hidden bg-surface", lookbook ? "absolute inset-0" : "aspect-[4/5]")}>
        <Link href={`/store/${product.slug}`} className="absolute inset-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            sizes="(max-width: 768px) 100vw, 25vw"
            loading="lazy"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
          <span
            aria-hidden
            className="absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-accent/50"
          />
        </Link>
        {typeof index === "number" ? (
          <p className="pointer-events-none absolute left-4 top-4 font-display text-xl text-accent">
            {String(index + 1).padStart(2, "0")}
          </p>
        ) : null}
        <p className="pointer-events-none absolute right-4 top-4 text-[10px] uppercase tracking-[0.2em] text-white/80">
          {categoryLabel[product.category]}
        </p>
        <button
          type="button"
          onClick={() => setQuick(true)}
          className={cn(
            "absolute inset-x-0 z-10 flex items-center justify-between bg-background/92 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm transition-all duration-500 motion-reduce:translate-y-0",
            lookbook
              ? "bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
              : "bottom-0 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
          )}
        >
          Quick view
          <ArrowRight size={14} />
        </button>
      </div>

      <div className={cn(lookbook ? "pointer-events-none absolute inset-x-0 bottom-0 z-[1] p-5 pb-14 sm:p-7 sm:pb-16" : "mt-5")}>
        <p className="text-[11px] uppercase tracking-[0.22em] text-accent">
          {product.subtitle ?? categoryLabel[product.category]}
        </p>
        <Link
          href={`/store/${product.slug}`}
          className={cn(
            "font-display mt-2 block leading-[0.9] transition-colors duration-300 hover:text-accent",
            lookbook ? "pointer-events-auto text-4xl sm:text-5xl" : "text-3xl",
          )}
        >
          {product.name}
        </Link>
        <div className="mt-3 flex items-end justify-between gap-3">
          <p className="text-sm text-text-secondary">{price}</p>
          <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
            {product.sizes.join(" · ")}
          </p>
        </div>
      </div>

      {quick ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`qv-${product.id}`}
          onClick={() => setQuick(false)}
        >
          <div
            className="grid w-full max-w-2xl overflow-hidden border border-border bg-bg-raised sm:grid-cols-[0.85fr_1.15fr]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative hidden min-h-[320px] sm:block">
              <Image src={product.image} alt="" fill className="object-cover" />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-accent">
                {categoryLabel[product.category]}
              </p>
              <h3 id={`qv-${product.id}`} className="font-display mt-2 text-4xl leading-[0.9]">
                {product.name}
              </h3>
              <p className="mt-3 text-sm text-text-secondary">{price}</p>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">{product.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={cn(
                      "min-w-11 border px-3 py-2 text-[11px] uppercase tracking-[0.14em] transition-colors duration-200",
                      size === s ? "border-accent text-accent" : "border-border text-text-secondary hover:border-accent/50",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <Button
                  onClick={() => {
                    addItem(product, size);
                    setQuick(false);
                  }}
                >
                  Add to cart
                </Button>
                <Button variant="secondary" href={`/store/${product.slug}`}>
                  Full details
                </Button>
                <Button variant="ghost" onClick={() => setQuick(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
