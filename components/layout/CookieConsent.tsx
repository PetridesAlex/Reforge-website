"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { introSeen, readConsent, READY_EVENT, writeConsent } from "@/lib/consent";
import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

export function CookieConsent() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = () => {
      if (readConsent()) return;
      setOpen(true);
    };

    if (introSeen() || reduced) {
      const wait = window.setTimeout(show, reduced ? 200 : 400);
      return () => window.clearTimeout(wait);
    }

    window.addEventListener(READY_EVENT, show);
    return () => window.removeEventListener(READY_EVENT, show);
  }, [reduced]);

  function choose(value: "accepted" | "essential") {
    writeConsent(value);
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[90] p-3 sm:p-5"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.45, ease }}
        >
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border bg-background/95 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
            <div
              aria-hidden
              className="h-px bg-gradient-to-r from-transparent via-accent to-transparent"
            />
            <div className="px-5 py-5 sm:px-7 sm:py-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Cookies</p>
              <h2 className="font-display mt-2 text-3xl leading-none sm:text-4xl">This site uses cookies.</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">
                We use essential storage for your cart and this choice. No analytics are on yet. You can
                change this anytime on the cookies page.
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button onClick={() => choose("accepted")}>Accept</Button>
                <Button variant="secondary" onClick={() => choose("essential")}>
                  Essential only
                </Button>
                <Link
                  href="/cookies"
                  className="px-2 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted hover:text-accent"
                >
                  Cookie policy
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
