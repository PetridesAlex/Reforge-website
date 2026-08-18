"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "@/lib/store/cart-context";
import { siteConfig } from "@/lib/config/site";
import { formatPrice } from "@/lib/utils/format";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQuantity, count } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity ${
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
          {siteConfig.checkoutEnabled ? (
            <Button href="/cart" className="w-full">
              Checkout
            </Button>
          ) : (
            <>
              <p className="mb-4 text-sm text-text-secondary">
                Online checkout is coming soon. You can review your cart or send an enquiry to reserve pieces.
              </p>
              <div className="flex flex-col gap-3">
                <Button href="/cart" className="w-full">
                  View cart
                </Button>
                <Button href="/contact" variant="secondary" className="w-full">
                  Enquire
                </Button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
