"use client";

import { CartProvider } from "@/lib/store/cart-context";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Navbar } from "@/components/layout/Navbar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      {children}
    </CartProvider>
  );
}
