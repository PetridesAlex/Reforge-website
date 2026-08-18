"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/store/cart-context";
import { getCheckoutAdapter } from "@/lib/store/checkout";
import { siteConfig } from "@/lib/config/site";
import { formatPrice } from "@/lib/utils/format";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useState } from "react";

export function CartPageClient() {
  const { items, updateQuantity, removeItem, clear, count } = useCart();
  const [message, setMessage] = useState<string | null>(null);

  async function checkout() {
    const adapter = getCheckoutAdapter();
    const result = await adapter.createSession(items);
    setMessage(result.message);
    if (result.url) window.location.href = result.url;
  }

  return (
    <section className="pt-28 pb-24">
      <Container className="max-w-3xl">
        <SectionHeading kicker="Cart" title="YOUR CART." />
        {items.length === 0 ? (
          <p className="mt-10 text-text-secondary">
            Cart is empty. <Link href="/store" className="text-accent">Shop REFORGE</Link>
          </p>
        ) : (
          <>
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {items.map((item) => (
                <li key={`${item.productId}-${item.size}`} className="flex gap-4 py-6">
                  <div className="relative h-24 w-20 shrink-0 bg-surface">
                    <Image src={item.image} alt="" fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <Link href={`/store/${item.slug}`} className="font-medium hover:text-accent">
                      {item.name}
                    </Link>
                    <p className="text-sm text-text-muted">Size {item.size}</p>
                    <p className="mt-1">{formatPrice(item.priceCents, item.currency)}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <input
                        type="number"
                        min={1}
                        aria-label={`Quantity for ${item.name}`}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.productId, item.size, Number(e.target.value))
                        }
                        className="w-16 border border-border bg-transparent px-2 py-1"
                      />
                      <button
                        type="button"
                        className="text-[11px] uppercase tracking-[0.14em] text-text-muted hover:text-danger"
                        onClick={() => removeItem(item.productId, item.size)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-text-muted">{count} items</p>
            {!siteConfig.checkoutEnabled ? (
              <p className="mt-4 text-sm text-text-secondary">
                Online checkout is coming soon. No payment will be taken. You can enquire to reserve these pieces.
              </p>
            ) : null}
            {message ? <p className="mt-4 text-sm text-accent">{message}</p> : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={checkout}>
                {siteConfig.checkoutEnabled ? "Checkout" : "Checkout unavailable"}
              </Button>
              <Button href="/contact" variant="secondary">
                Enquire to reserve
              </Button>
              <Button variant="ghost" onClick={clear}>
                Clear
              </Button>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
