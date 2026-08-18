"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/config/site";
import { useCart } from "@/lib/store/cart-context";
import { cn } from "@/lib/utils/cn";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

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
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          "relative z-50 border-b transition-colors duration-300",
          scrolled || open
            ? "border-border bg-background/90 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto grid h-[72px] max-w-[90rem] grid-cols-[1fr_auto] items-center px-5 sm:h-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <Link
            href="/"
            scroll
            className="flex shrink-0 items-center gap-2.5 justify-self-start sm:gap-3"
            aria-label="REFORGE home"
            onClick={(event) => {
              setOpen(false);
              if (pathname === "/") {
                event.preventDefault();
              }
              window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            }}
          >
            <Image
              src="/brand/reforge-logo.png"
              alt=""
              width={48}
              height={48}
              className="h-10 w-10 object-contain sm:h-12 sm:w-12"
              priority
            />
            <span className="font-display text-[1.65rem] leading-none tracking-[0.12em] sm:text-[1.85rem]">
              REFORGE
            </span>
          </Link>

          <nav
            className="hidden items-center justify-center lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-2 py-2 font-display text-[1.15rem] leading-none tracking-[0.1em] transition-colors duration-200 xl:px-2.5 xl:text-[1.3rem] xl:tracking-[0.12em]",
                    active
                      ? "text-text"
                      : "text-text-secondary hover:text-text",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-2 bottom-1 h-px bg-accent transition-opacity duration-200 xl:inset-x-2.5",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-self-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="group relative flex h-10 w-10 items-center justify-center border border-text/30 bg-surface text-text transition-[border-color,background-color,color,transform] duration-300 hover:border-accent hover:bg-accent hover:text-background"
              aria-label={`Open cart, ${count} items`}
            >
              <ShoppingBag size={18} strokeWidth={2} className="transition-transform duration-300 group-hover:scale-105" />
              {count > 0 ? (
                <span className="absolute -right-1.5 -top-1.5 z-10 flex h-[18px] min-w-[18px] items-center justify-center bg-accent px-1 font-display text-[12px] leading-none text-background ring-2 ring-background group-hover:bg-background group-hover:text-accent group-hover:ring-accent">
                  {count}
                </span>
              ) : null}
            </button>

            <span aria-hidden className="hidden h-4 w-px bg-border md:block" />

            <Link
              href="/join"
              className="hidden h-9 items-center bg-accent px-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-background transition-colors duration-200 hover:bg-[#d4ff2e] md:inline-flex"
            >
              Join
            </Link>
            <Link
              href="/contact"
              className="hidden h-9 items-center border border-border px-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-text transition-colors duration-200 hover:border-text/40 md:inline-flex"
            >
              Contact
            </Link>

            <button
              type="button"
              className="relative z-50 flex h-9 w-9 flex-col items-center justify-center lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={cn(
                  "absolute h-px w-5 bg-text transition-transform duration-300",
                  open ? "rotate-45" : "-translate-y-[5px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-5 bg-text transition-opacity duration-200",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-5 bg-text transition-transform duration-300",
                  open ? "-rotate-45" : "translate-y-[5px]",
                )}
              />
            </button>
          </div>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
      <span className="sr-only">{siteConfig.name}</span>
    </header>
  );
}
