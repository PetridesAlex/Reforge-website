"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "@/lib/store/cart-context";
import { formatPrice } from "@/lib/utils/format";
import { Button } from "@/components/ui/Button";
import { cartSubtotalCents } from "@/lib/store/shipping";
import { siteConfig } from "@/lib/config/site";

export function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQuantity, count } = useCart();
  const subtotal = cartSubtotalCents(items);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-background transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Cart"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-2xl">Cart ({count})</h2>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close cart" className="p-2">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-text-secondary">Your cart is empty.</p>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li key={`${item.productId}-${item.size}`} className="flex gap-4">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-surface">
                    <Image src={item.image} alt="" fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <Link href={`/store/${item.slug}`} className="text-sm font-medium hover:text-accent">
                      {item.name}
                    </Link>
                    <p className="text-xs text-text-muted">Size {item.size}</p>
                    <p className="mt-1 text-sm">{formatPrice(item.priceCents, item.currency)}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <label className="sr-only" htmlFor={`qty-${item.productId}-${item.size}`}>
                        Quantity
                      </label>
                      <input
                        id={`qty-${item.productId}-${item.size}`}
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.productId, item.size, Number(e.target.value))
                        }
                        className="w-16 border border-border bg-transparent px-2 py-1 text-sm"
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
          )}
        </div>
        <div className="border-t border-border p-5">
          {items.length ? (
            <>
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="uppercase tracking-[0.16em] text-text-muted">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="mb-4 text-xs leading-relaxed text-text-muted">
                Ships in {siteConfig.store.shipsTo}. Pickup at {siteConfig.studio.venue}, {siteConfig.studio.city}.
              </p>
              <div className="flex flex-col gap-3">
                <Button href="/checkout" className="w-full" onClick={() => setOpen(false)}>
                  Checkout
                </Button>
                <Button href="/cart" variant="secondary" className="w-full" onClick={() => setOpen(false)}>
                  View cart
                </Button>
              </div>
            </>
          ) : (
            <Button href="/store" className="w-full" onClick={() => setOpen(false)}>
              Shop REFORGE
            </Button>
          )}
        </div>
      </aside>
    </>
  );
}
