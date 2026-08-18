"use client";

import Link from "next/link";
import { navLinks } from "@/lib/config/site";
import { Button } from "@/components/ui/Button";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixed inset-0 z-30 bg-background/98 transition-opacity duration-300 lg:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <nav className="flex h-full flex-col justify-center px-8 pt-16" aria-label="Mobile">
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
            className={`font-display border-b border-border py-4 text-4xl transition-all ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-8 flex flex-col gap-3">
          <Button href="/join" className="w-full" onClick={onClose}>
            Join REFORGE
          </Button>
          <Button href="/contact" variant="secondary" className="w-full" onClick={onClose}>
            Contact
          </Button>
        </div>
      </nav>
    </div>
  );
}
