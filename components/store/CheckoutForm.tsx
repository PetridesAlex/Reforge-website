"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/store/cart-context";
import { submitOrder, type OrderState } from "@/app/actions/orders";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils/format";
import {
  cartSubtotalCents,
  cartTotalCents,
  cyprusCities,
  shippingCents,
  shippingOptions,
  type ShippingMethod,
} from "@/lib/store/shipping";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";

const initial: OrderState = { ok: false, message: "" };

const fieldClass =
  "w-full border border-border bg-transparent px-4 py-3 text-sm text-text placeholder:text-text-muted";

export function CheckoutForm() {
  const router = useRouter();
  const { items, clear, count } = useCart();
  const [shipping, setShipping] = useState<ShippingMethod>("pickup");
  const [state, action, pending] = useActionState(submitOrder, initial);
  const subtotal = cartSubtotalCents(items);
  const total = cartTotalCents(items, shipping);

  useEffect(() => {
    if (state.ok && state.orderId) {
      clear();
      router.push(`/checkout/success?order=${encodeURIComponent(state.orderId)}`);
    }
  }, [state.ok, state.orderId, clear, router]);

  if (items.length === 0 && !state.ok) {
    return (
      <p className="text-text-secondary">
        Your cart is empty. Add a piece from the store first.
      </p>
    );
  }

  return (
    <form action={action} className="grid gap-8">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      <input type="hidden" name="cart" value={JSON.stringify(items)} />
      <input type="hidden" name="shipping" value={shipping} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" name="firstName" error={state.fieldErrors?.firstName} required />
        <Field label="Last name" name="lastName" error={state.fieldErrors?.lastName} required />
        <Field label="Email" name="email" type="email" error={state.fieldErrors?.email} required />
        <Field label="Phone" name="phone" type="tel" error={state.fieldErrors?.phone} required />
      </div>

      <div>
        <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-text-muted">Shipping in {siteConfig.store.shipsTo}</p>
        <div className="grid gap-3">
          {shippingOptions.map((option) => {
            const active = shipping === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setShipping(option.id)}
                className={cn(
                  "border px-4 py-4 text-left transition-colors duration-300",
                  active ? "border-accent bg-accent/10" : "border-border hover:border-accent/50",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em]">{option.label}</p>
                  <p className="text-sm text-accent">{formatPrice(shippingCents(option.id))}</p>
                </div>
                <p className="mt-2 text-sm text-text-secondary">{option.detail}</p>
              </button>
            );
          })}
        </div>
      </div>

      {shipping === "cyprus" ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Street" name="street" error={state.fieldErrors?.street} required />
          </div>
          <div>
            <label htmlFor="city" className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-text-muted">
              City
            </label>
            <select id="city" name="city" required className={fieldClass} defaultValue="Limassol">
              {cyprusCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {state.fieldErrors?.city ? <p className="mt-2 text-sm text-danger">{state.fieldErrors.city}</p> : null}
          </div>
          <Field label="Postal code" name="postal" error={state.fieldErrors?.postal} required />
        </div>
      ) : (
        <>
          <input type="hidden" name="street" value="" />
          <input type="hidden" name="city" value="" />
          <input type="hidden" name="postal" value="" />
        </>
      )}

      <div>
        <label htmlFor="notes" className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-text-muted">
          Notes
        </label>
        <textarea id="notes" name="notes" rows={4} className={fieldClass} placeholder="Size notes, pickup time, anything we should know." />
      </div>

      <div className="border border-border bg-surface px-5 py-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">{count} items</p>
        <div className="mt-4 flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span>Shipping</span>
          <span>{formatPrice(shippingCents(shipping))}</span>
        </div>
        <div className="mt-4 flex justify-between border-t border-border pt-4">
          <span className="font-display text-2xl">Total</span>
          <span className="font-display text-2xl text-accent">{formatPrice(total)}</span>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-text-muted">
          Sample catalog. No card is charged yet. We’ll confirm the order, then Stripe will take payment when the shop is live.
        </p>
      </div>

      {state.message && !state.ok ? <p className="text-sm text-danger">{state.message}</p> : null}

      <Button type="submit" disabled={pending || items.length === 0}>
        {pending ? "Placing order…" : "Place order"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-text-muted">
        {label}
      </label>
      <input id={name} name={name} type={type} required={required} className={fieldClass} />
      {error ? <p className="mt-2 text-sm text-danger">{error}</p> : null}
    </div>
  );
}
