"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden>
      <path
        fill="currentColor"
        d="M16.37 12.74c.03-2.4 1.96-3.55 2.05-3.61-1.12-1.64-2.86-1.86-3.47-1.88-1.46-.15-2.87.87-3.61.87-.76 0-1.9-.85-3.13-.83-1.6.02-3.08.94-3.9 2.38-1.68 2.91-.43 7.2 1.19 9.56.8 1.16 1.74 2.45 2.97 2.4 1.2-.05 1.65-.77 3.1-.77 1.44 0 1.86.77 3.13.74 1.3-.02 2.11-1.16 2.9-2.33.92-1.33 1.3-2.63 1.32-2.7-.03-.01-2.52-.97-2.55-3.83ZM14.7 6.3c.66-.81 1.1-1.93.98-3.05-.95.04-2.12.64-2.8 1.44-.61.7-1.15 1.85-1.01 2.93 1.07.08 2.16-.54 2.83-1.32Z"
      />
    </svg>
  );
}

function PlayMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden>
      <path fill="#EA4335" d="M3.6 2.2 13.7 12 3.6 21.8c-.4-.2-.6-.6-.6-1.1V3.3c0-.5.2-.9.6-1.1Z" />
      <path fill="#FBBC04" d="M16.9 8.8 13.7 12l3.2 3.2 4.2-2.4c.8-.5.8-1.6 0-2.1l-4.2-1.9Z" />
      <path fill="#4285F4" d="M3.6 21.8 13.7 12l3.2 3.2-11.5 6.6c-.7.4-1.5-.1-1.8-1Z" />
      <path fill="#34A853" d="M16.9 8.8 5.4 2.2c.3-.4.8-.6 1.3-.4L16.9 8.8Z" />
    </svg>
  );
}

function StoreBadge({
  href,
  label,
  kicker,
  name,
  icon,
}: {
  href: string;
  label: string;
  kicker: string;
  name: string;
  icon: ReactNode;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative inline-flex min-w-[188px] items-center gap-3 overflow-hidden rounded-[12px] border border-white/18 bg-black px-4 py-2.5 text-white shadow-[0_0_0_1px_rgba(0,0,0,0.4)]"
      whileHover={reduced ? undefined : { y: -3, scale: 1.02 }}
      whileTap={reduced ? undefined : { scale: 0.98, y: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-white/15 skew-x-[-20deg] transition-transform duration-700 ease-out group-hover:translate-x-[220%]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[12px] border border-transparent transition-colors duration-300 group-hover:border-accent/70"
      />
      <span className="relative z-10">{icon}</span>
      <span className="relative z-10 flex flex-col leading-none">
        <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/70">{kicker}</span>
        <span className="mt-1 font-display text-[22px] leading-none tracking-wide">{name}</span>
      </span>
    </motion.a>
  );
}

export function StoreBadges({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:flex-wrap", className)}>
      <StoreBadge
        href={siteConfig.appStoreUrl}
        label="Download REFORGE on the App Store"
        kicker="Download on the"
        name="App Store"
        icon={<AppleMark />}
      />
      <StoreBadge
        href={siteConfig.playStoreUrl}
        label="Get REFORGE on Google Play"
        kicker="Get it on"
        name="Google Play"
        icon={<PlayMark />}
      />
    </div>
  );
}
