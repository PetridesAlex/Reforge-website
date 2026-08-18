"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/types";
import { useCart } from "@/lib/store/cart-context";
import { formatPrice } from "@/lib/utils/format";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/lib/config/site";
import { Reveal } from "@/components/motion/Reveal";

export function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0] ?? "M");
  const [qty, setQty] = useState(1);
  const [image, setImage] = useState(product.images[0] ?? product.image);
  const { addItem } = useCart();
  const variant = product.variants.find((v) => v.size === size);
  const stock = variant?.stock;
  const out = stock === 0;

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <Reveal>
        <div className="relative aspect-[4/5] overflow-hidden bg-surface">
          <Image src={image} alt={product.name} fill className="object-cover" priority />
        </div>
        {product.images.length > 1 ? (
          <div className="mt-3 flex gap-2">
            {product.images.map((src) => (
              <button
                key={src}
                type="button"
                onClick={() => setImage(src)}
                className={`relative h-16 w-12 overflow-hidden border ${image === src ? "border-accent" : "border-border"}`}
              >
                <Image src={src} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        ) : null}
      </Reveal>
      <Reveal delay={0.12}>
        <h1 className="font-display text-5xl sm:text-6xl">{product.name}</h1>
        {product.subtitle ? (
          <p className="mt-2 text-sm uppercase tracking-[0.16em] text-text-muted">{product.subtitle}</p>
        ) : null}
        <p className="mt-6 text-xl text-text-secondary">
          {formatPrice(product.priceCents, product.currency)}
        </p>
        {product.isPlaceholderPrice ? (
          <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-text-muted">
            Sample catalog — live pricing loads when connected
          </p>
        ) : null}
        <p className="mt-6 leading-relaxed text-text-secondary">{product.description}</p>
        {product.details ? <p className="mt-4 text-sm text-text-muted">{product.details}</p> : null}
        {product.materials ? <p className="mt-2 text-sm text-text-muted">{product.materials}</p> : null}

        <p className="mt-8 text-[11px] uppercase tracking-[0.18em] text-text-muted">Size</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`min-w-11 border px-3 py-2 text-[11px] tracking-[0.14em] ${
                size === s ? "border-accent text-accent" : "border-border"
              }`}
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
        {!siteConfig.checkoutEnabled ? (
          <p className="mt-4 text-sm text-text-muted">
            Checkout is not live. Items can be reserved through an enquiry.
          </p>
        ) : null}
      </Reveal>
    </div>
  );
}
