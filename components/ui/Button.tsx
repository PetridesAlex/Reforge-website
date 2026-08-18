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

const ease = [0.22, 1, 0.36, 1] as const;

const styles = {
  primary:
    "bg-accent text-background hover:bg-[#d4ff2e] hover:shadow-[0_16px_48px_rgba(200,255,0,0.28)] disabled:opacity-50 disabled:hover:shadow-none",
  secondary:
    "border border-border bg-transparent text-text hover:border-accent hover:text-background disabled:opacity-50",
  ghost: "text-text-secondary hover:text-accent",
};

const sizes = {
  md: "px-6 py-3 text-[12px]",
  lg: "min-h-16 px-8 py-5 text-[13px] tracking-[0.22em]",
};

function SlideLabel({
  children,
  reduced,
}: {
  children: React.ReactNode;
  reduced: boolean | null;
}) {
  if (reduced) {
    return <span className="relative z-10">{children}</span>;
  }

  return (
    <span className="relative z-10 block overflow-hidden leading-none">
      <span className="block whitespace-nowrap transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full group-active:duration-200">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 block whitespace-nowrap translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-active:duration-200"
      >
        {children}
      </span>
    </span>
  );
}

function SlideArrow({
  size,
  reduced,
}: {
  size: number;
  reduced: boolean | null;
}) {
  const icon = (
    <ArrowRight size={size} strokeWidth={2.2} className="block" aria-hidden />
  );

  if (reduced) {
    return <span className="relative z-10">{icon}</span>;
  }

  return (
    <span
      aria-hidden
      className="relative z-10 inline-flex h-[1em] w-[1em] items-center justify-center overflow-hidden"
      style={{ width: size, height: size }}
    >
      <span className="absolute inset-0 transition-transform duration-500 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[120%] group-active:duration-200">
        {icon}
      </span>
      <span className="absolute inset-0 -translate-x-[120%] transition-transform duration-500 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-active:duration-200">
        {icon}
      </span>
    </span>
  );
}

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
  const iconSize = size === "lg" ? 16 : 14;

  const cls = cn(
    "group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden font-semibold tracking-[0.18em] uppercase",
    "transition-[background-color,box-shadow,border-color,color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
    sizes[size],
    styles[variant],
  );

  const inner = (
    <>
      {variant === "primary" && !reduced ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-white/0 to-black/10 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
        />
      ) : null}
      {variant === "secondary" ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 origin-left bg-accent",
            reduced
              ? "opacity-0 group-hover:opacity-100"
              : "scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100",
          )}
        />
      ) : null}
      <SlideLabel reduced={reduced}>{children}</SlideLabel>
      {showArrow ? <SlideArrow size={iconSize} reduced={reduced} /> : null}
    </>
  );

  const motionProps = reduced
    ? {}
    : {
        whileHover: { y: -3, scale: 1.015 },
        whileTap: { scale: 0.985, y: 0 },
        transition: { duration: 0.45, ease },
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
