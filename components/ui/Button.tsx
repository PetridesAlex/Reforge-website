"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

const styles = {
  primary:
    "bg-accent text-background hover:bg-[#d6ff3d] hover:shadow-[0_12px_40px_rgba(200,255,0,0.22)] disabled:opacity-50 disabled:hover:shadow-none",
  secondary:
    "border border-border bg-transparent text-text hover:border-accent hover:text-background hover:bg-accent disabled:opacity-50",
  ghost: "text-text-secondary hover:text-accent",
};

const sizes = {
  md: "px-6 py-3 text-[12px]",
  lg: "min-h-16 px-8 py-5 text-[13px] tracking-[0.22em]",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const reduced = useReducedMotion();
  const showArrow = variant !== "ghost";

  const cls = cn(
    "group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden font-semibold tracking-[0.18em] uppercase transition-shadow duration-300",
    sizes[size],
    styles[variant],
  );

  const inner = (
    <>
      {variant === "primary" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-white/25 skew-x-[-20deg] transition-transform duration-700 ease-out group-hover:translate-x-[220%]"
        />
      ) : null}
      {variant === "secondary" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
        />
      ) : null}
      <span className="relative z-10">{children}</span>
      {showArrow ? (
        <ArrowRight
          aria-hidden
          size={size === "lg" ? 16 : 14}
          strokeWidth={2.2}
          className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-1"
        />
      ) : null}
    </>
  );

  const motionProps = reduced
    ? {}
    : {
        whileHover: { y: -2 },
        whileTap: { scale: 0.98, y: 0 },
        transition: { type: "spring" as const, stiffness: 420, damping: 28 },
      };

  if (href) {
    return (
      <motion.div className={cn("inline-flex", className)} {...motionProps}>
        <Link href={href} className={cls} onClick={onClick}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(cls, className)}
      {...motionProps}
    >
      {inner}
    </motion.button>
  );
}
