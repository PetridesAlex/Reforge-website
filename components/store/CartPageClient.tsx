"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/store/cart-context";
import { formatPrice } from "@/lib/utils/format";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cartSubtotalCents } from "@/lib/store/shipping";
import { siteConfig } from "@/lib/config/site";

export function CartPageClient() {
  const { items, updateQuantity, removeItem, clear, count } = useCart();
  const subtotal = cartSubtotalCents(items);

  return (
    <section className="pt-28 pb-24">
      <Container className="max-w-3xl">
        <SectionHeading
          kicker="Cart"
          title="YOUR CART."
          subtitle={`Ships in ${siteConfig.store.shipsTo}. Pickup at ${siteConfig.studio.venue}, ${siteConfig.studio.city}.`}
        />
        {items.length === 0 ? (
          <p className="mt-10 text-text-secondary">
            Cart is empty.{" "}
            <Link href="/store" className="text-accent">
              Shop REFORGE
            </Link>
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
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-text-muted">{count} items</p>
              <p className="font-display text-3xl">{formatPrice(subtotal)}</p>
            </div>
            <p className="mt-4 text-sm text-text-secondary">
              Shipping is selected at checkout. Card payment via Stripe comes later — this order is received first.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/checkout">Checkout</Button>
              <Button href="/store" variant="secondary">
                Continue shopping
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
