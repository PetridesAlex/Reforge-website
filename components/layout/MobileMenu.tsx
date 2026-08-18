"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/config/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-30 lg:hidden">
          <motion.button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/60 backdrop-blur-[8px]"
            onClick={onClose}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-x-3 top-[5rem] flex max-h-[calc(100dvh-5.75rem)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[0_32px_90px_rgba(0,0,0,0.55)] sm:inset-x-4 sm:top-[5.5rem] sm:max-h-[calc(100dvh-6.25rem)]"
            initial={reduced ? false : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: reduced ? 0.12 : 0.36, ease }}
          >
            <div
              aria-hidden
              className="h-px shrink-0 bg-gradient-to-r from-transparent via-accent to-transparent"
            />

            <div className="flex items-end justify-between gap-4 border-b border-border px-5 py-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">Menu</p>
                <p className="font-display mt-1 text-3xl leading-none">Navigate</p>
              </div>
              <p className="pb-0.5 text-right text-[10px] uppercase tracking-[0.16em] text-text-muted">
                {siteConfig.studio.venue}
                <br />
                {siteConfig.studio.city}
              </p>
            </div>

            <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-2" aria-label="Mobile">
              {navLinks.map((link, i) => {
                const active =
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                const index = String(i + 1).padStart(2, "0");

                return (
                  <motion.div
                    key={link.href}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduced ? 0 : 0.05 + i * 0.03, duration: 0.3, ease }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex items-center gap-4 rounded-xl px-3 py-2.5 transition-colors duration-300",
                        active ? "bg-accent/10 text-accent" : "text-text hover:bg-surface hover:text-accent",
                      )}
                    >
                      <span
                        className={cn(
                          "w-7 shrink-0 font-sans text-[10px] font-semibold tabular-nums tracking-[0.22em]",
                          active ? "text-accent" : "text-text-muted group-hover:text-accent",
                        )}
                      >
                        {index}
                      </span>
                      <span className="font-display text-[1.75rem] leading-none tracking-[0.1em] sm:text-[2rem]">
                        {link.label}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-opacity",
                          active ? "opacity-100" : "opacity-0 group-hover:opacity-50",
                        )}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="shrink-0 border-t border-border bg-surface px-4 py-4">
              <div className="flex flex-col gap-2.5">
                <Button href="/join" className="w-full" onClick={onClose}>
                  Join REFORGE
                </Button>
                <Button href="/contact" variant="secondary" className="w-full" onClick={onClose}>
                  Contact
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
