import type { CartItem } from "@/types";
import { siteConfig } from "@/lib/config/site";

export const cyprusCities = [
  "Limassol",
  "Nicosia",
  "Larnaca",
  "Paphos",
  "Famagusta",
] as const;

export type CyprusCity = (typeof cyprusCities)[number];
export type ShippingMethod = "pickup" | "cyprus";

export const shippingOptions: Array<{
  id: ShippingMethod;
  label: string;
  detail: string;
  cents: number;
  placeholder?: boolean;
}> = [
  {
    id: "pickup",
    label: siteConfig.store.pickupLabel,
    detail: siteConfig.store.pickupDetail,
    cents: siteConfig.store.pickupCents,
  },
  {
    id: "cyprus",
    label: siteConfig.store.deliveryLabel,
    detail: siteConfig.store.deliveryDetail,
    cents: siteConfig.store.cyprusDeliveryCents,
    placeholder: siteConfig.store.isPlaceholderShipping,
  },
];

export function lineTotalCents(item: CartItem) {
  if (item.priceCents === null) return null;
  return item.priceCents * item.quantity;
}

export function cartSubtotalCents(items: CartItem[]) {
  if (items.some((item) => item.priceCents === null)) return null;
  return items.reduce((sum, item) => sum + (item.priceCents ?? 0) * item.quantity, 0);
}

export function shippingCents(method: ShippingMethod) {
  return shippingOptions.find((option) => option.id === method)?.cents ?? 0;
}

export function cartTotalCents(items: CartItem[], method: ShippingMethod) {
  const subtotal = cartSubtotalCents(items);
  if (subtotal === null) return null;
  return subtotal + shippingCents(method);
}
