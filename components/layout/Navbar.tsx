"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/config/site";
import { useCart } from "@/lib/store/cart-context";
import { cn } from "@/lib/utils/cn";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled || open ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-4 px-5 sm:h-[72px] sm:px-8">
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="REFORGE home">
          <Image
            src="/brand/reforge-logo.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            priority
          />
          <span className="font-display text-2xl leading-none tracking-[0.12em]">REFORGE</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex xl:gap-2" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative px-2.5 py-1 font-display text-[1.15rem] leading-none tracking-[0.14em] transition-colors duration-300 xl:px-3 xl:text-[1.25rem]",
                  active ? "text-accent" : "text-text-secondary hover:text-text",
                )}
              >
                <span className="relative z-10 inline-block transition-transform duration-300 ease-out group-hover:-translate-y-px">
                  {link.label}
                </span>
                {active ? (
                  <motion.span
                    layoutId={reduced ? undefined : "nav-underline"}
                    className="absolute inset-x-2.5 -bottom-0.5 h-px bg-accent xl:inset-x-3"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                ) : (
                  <span
                    aria-hidden
                    className="absolute inset-x-2.5 -bottom-0.5 h-px origin-left scale-x-0 bg-accent/80 transition-transform duration-300 ease-out group-hover:scale-x-100 xl:inset-x-3"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-text-secondary transition-transform duration-200 hover:scale-110 hover:text-accent"
            aria-label={`Open cart, ${count} items`}
          >
            <ShoppingBag size={18} />
            {count > 0 ? (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center bg-accent px-1 text-[10px] font-bold text-background">
                {count}
              </span>
            ) : null}
          </button>
          <Button href="/join" className="hidden px-4 py-2 md:inline-flex">
            Join REFORGE
          </Button>
          <Button href="/contact" variant="secondary" className="hidden px-4 py-2 md:inline-flex">
            Contact
          </Button>
          <button
            type="button"
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={cn("h-px w-6 bg-text transition-transform", open && "translate-y-[4px] rotate-45")} />
            <span className={cn("h-px w-6 bg-text transition-opacity", open && "opacity-0")} />
            <span className={cn("h-px w-6 bg-text transition-transform", open && "-translate-y-[4px] -rotate-45")} />
          </button>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
      <span className="sr-only">{siteConfig.name}</span>
    </header>
  );
}
