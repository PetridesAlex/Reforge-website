import type { CartItem } from "@/types";
import { siteConfig } from "@/lib/config/site";

export type CheckoutProvider = "stripe" | "inquiry";

export type CheckoutResult = {
  provider: CheckoutProvider;
  url?: string;
  inquiryId?: string;
  message: string;
};

export interface CheckoutAdapter {
  createSession(cart: CartItem[]): Promise<CheckoutResult>;
}

class InquiryCheckout implements CheckoutAdapter {
  async createSession(cart: CartItem[]): Promise<CheckoutResult> {
    void cart;
    return {
      provider: "inquiry",
      message:
        "Online checkout is not enabled yet. Reserve items through contact or membership enquiry.",
    };
  }
}

/**
 * Stripe adapter will be wired here later without changing store UI.
 * Do not fake successful payments.
 */
class StripeCheckout implements CheckoutAdapter {
  async createSession(): Promise<CheckoutResult> {
    throw new Error("Stripe checkout is not configured.");
  }
}

export function getCheckoutAdapter(): CheckoutAdapter {
  if (siteConfig.checkoutEnabled) return new StripeCheckout();
  return new InquiryCheckout();
}
