"use server";

import { headers } from "next/headers";
import { brandedEmail, sendNotificationEmail } from "@/lib/email/resend";
import { rateLimit } from "@/lib/security/rate-limit";
import { orderSchema } from "@/lib/validation/forms";
import { formatPrice } from "@/lib/utils/format";
import { cartSubtotalCents, cartTotalCents, shippingCents, shippingOptions } from "@/lib/store/shipping";
import type { CartItem } from "@/types";
import type { FormState } from "@/app/actions/forms";

export type OrderState = FormState & { orderId?: string };

function firstError(error: { issues: Array<{ path: PropertyKey[]; message: string }> }) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

async function clientKey() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

function parseCart(raw: string): CartItem[] | null {
  try {
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return parsed.filter(
      (item) =>
        item &&
        typeof item.productId === "string" &&
        typeof item.name === "string" &&
        typeof item.size === "string" &&
        typeof item.quantity === "number" &&
        item.quantity > 0,
    );
  } catch {
    return null;
  }
}

export async function submitOrder(_prev: OrderState, formData: FormData): Promise<OrderState> {
  const parsed = orderSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    shipping: formData.get("shipping"),
    street: formData.get("street") || "",
    city: formData.get("city") || "",
    postal: formData.get("postal") || "",
    notes: formData.get("notes") || "",
    cart: formData.get("cart"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    return { ok: false, message: "Please check the form.", fieldErrors: firstError(parsed.error) };
  }

  if (parsed.data.website) {
    return { ok: true, message: "Order received.", orderId: "RF-HOLD" };
  }

  const items = parseCart(parsed.data.cart);
  if (!items?.length) {
    return { ok: false, message: "Your cart is empty." };
  }

  const limit = rateLimit(`order:${await clientKey()}`);
  if (!limit.ok) {
    return { ok: false, message: "Too many submissions. Try again later." };
  }

  const data = parsed.data;
  const method = data.shipping;
  const ship = shippingOptions.find((option) => option.id === method);
  const subtotal = cartSubtotalCents(items);
  const total = cartTotalCents(items, method);
  const orderId = `RF-${Date.now().toString(36).toUpperCase()}`;
  const lines = items
    .map(
      (item) =>
        `${item.quantity} × ${item.name} (${item.size}) — ${formatPrice(item.priceCents, item.currency)}`,
    )
    .join("<br/>");

  const html = brandedEmail({
    title: `Order ${orderId}`,
    intro:
      "A store order was placed on the REFORGE website. Payment is not taken yet — Stripe will be connected later. Confirm the order before shipping.",
    rows: [
      { label: "Name", value: `${data.firstName} ${data.lastName}` },
      { label: "Email", value: data.email },
      { label: "Phone", value: data.phone },
      { label: "Shipping", value: ship ? `${ship.label} — ${ship.detail}` : method },
      {
        label: "Address",
        value:
          method === "cyprus"
            ? `${data.street}, ${data.city} ${data.postal}, Cyprus`
            : "Pickup — City Box Gym, Limassol",
      },
      { label: "Items", value: lines },
      { label: "Subtotal", value: formatPrice(subtotal) },
      { label: "Shipping", value: formatPrice(shippingCents(method)) },
      { label: "Total", value: formatPrice(total) },
      { label: "Notes", value: (data.notes || "—").replace(/\n/g, "<br/>") },
    ],
  });

  await sendNotificationEmail({
    subject: `REFORGE order ${orderId}`,
    html,
  });

  return {
    ok: true,
    orderId,
    message: "Order received. We’ll confirm it and take payment before anything ships.",
  };
}
