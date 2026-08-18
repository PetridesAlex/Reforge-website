"use client";

import { CartProvider } from "@/lib/store/cart-context";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/layout/Preloader";
import { CookieConsent } from "@/components/layout/CookieConsent";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Preloader />
      <Navbar />
      <CartDrawer />
      {children}
      <CookieConsent />
    </CartProvider>
  );
}
