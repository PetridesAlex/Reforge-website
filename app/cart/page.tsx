import type { Metadata } from "next";
import { CartPageClient } from "@/components/store/CartPageClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your REFORGE cart.",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartPageClient />;
}
