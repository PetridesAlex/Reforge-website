"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/types";
import { useCart } from "@/lib/store/cart-context";
import { formatPrice } from "@/lib/utils/format";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductCard, categoryLabel } from "@/components/store/ProductCard";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const reduced = useReducedMotion();
  const [size, setSize] = useState(product.sizes[0] ?? "M");
  const [qty, setQty] = useState(1);
  const [image, setImage] = useState(product.images[0] ?? product.image);
  const { addItem } = useCart();
  const variant = product.variants.find((v) => v.size === size);
  const stock = variant?.stock;
  const out = stock === 0;

  return (
    <div>
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden bg-surface">
            <motion.div
              key={image}
              className="absolute inset-0"
              initial={reduced ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease }}
            >
              <Image src={image} alt={product.name} fill className="object-cover" priority />
            </motion.div>
          </div>
          {product.images.length > 1 ? (
            <div className="mt-3 flex gap-2">
              {product.images.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setImage(src)}
                  className={cn(
                    "relative h-20 w-16 overflow-hidden border transition-colors duration-300",
                    image === src ? "border-accent" : "border-border hover:border-accent/50",
                  )}
                >
                  <Image src={src} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            {categoryLabel[product.category]}
          </p>
          <h1 className="font-display mt-3 text-5xl leading-[0.88] sm:text-7xl">{product.name}</h1>
          {product.subtitle ? (
            <p className="mt-3 text-sm uppercase tracking-[0.16em] text-text-muted">{product.subtitle}</p>
          ) : null}
          <p className="mt-6 text-2xl text-text">
            {formatPrice(product.priceCents, product.currency)}
            {product.isPlaceholderPrice ? (
              <span className="ml-3 text-[11px] uppercase tracking-[0.16em] text-text-muted">Sample price</span>
            ) : null}
          </p>
          <p className="mt-6 leading-relaxed text-text-secondary">{product.description}</p>
          {product.details ? <p className="mt-4 text-sm text-text-muted">{product.details}</p> : null}
          {product.materials ? <p className="mt-2 text-sm text-text-muted">{product.materials}</p> : null}

          <div className="mt-8 grid gap-px bg-border sm:grid-cols-2">
            <div className="bg-background px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent">Ships</p>
              <p className="mt-1 text-sm text-text">Cyprus only</p>
            </div>
            <div className="bg-background px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent">Pickup</p>
              <p className="mt-1 text-sm text-text">{siteConfig.studio.venue}, {siteConfig.studio.city}</p>
            </div>
          </div>

          <p className="mt-8 text-[11px] uppercase tracking-[0.18em] text-text-muted">Size</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  "min-w-11 border px-3 py-2 text-[11px] tracking-[0.14em] transition-colors duration-300",
                  size === s ? "border-accent bg-accent text-background" : "border-border hover:border-accent/50",
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <label className="mt-6 block text-[11px] uppercase tracking-[0.18em] text-text-muted" htmlFor="qty">
            Quantity
          </label>
          <input
            id="qty"
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            className="mt-2 w-24 border border-border bg-transparent px-3 py-2"
          />

          <div className="mt-4">
            {stock === null || stock === undefined ? (
              <Badge>Stock TBC</Badge>
            ) : out ? (
              <Badge className="border-danger text-danger">Out of stock</Badge>
            ) : (
              <Badge>{stock} in stock</Badge>
            )}
          </div>

          <Button className="mt-8" disabled={out} onClick={() => addItem(product, size, qty)}>
            Add to cart
          </Button>
          <p className="mt-4 text-sm text-text-muted">
            Place the order at checkout. Card payment via Stripe comes next — nothing is charged yet.
          </p>
        </Reveal>
      </div>

      {related.length ? (
        <div className="mt-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Also in the shop</p>
          <h2 className="font-display mt-2 text-4xl">More pieces</h2>
          <Stagger className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, i) => (
              <StaggerItem key={item.id}>
                <ProductCard product={item} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      ) : null}
    </div>
  );
}
