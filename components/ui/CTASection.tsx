"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export function CTASection({
  title,
  subtitle,
  primary,
  secondary,
}: {
  title: string;
  subtitle?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="border-t border-border bg-bg-raised py-24 sm:py-32">
      <Container className="text-center">
        <Reveal>
          <h2 className="font-display text-5xl leading-[0.9] sm:text-7xl whitespace-pre-line">{title}</h2>
          {subtitle ? (
            <p className="mx-auto mt-6 max-w-lg text-text-secondary">{subtitle}</p>
          ) : null}
        </Reveal>
        <Reveal delay={0.12} className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href={primary.href}>{primary.label}</Button>
          {secondary ? (
            <Button href={secondary.href} variant="secondary">
              {secondary.label}
            </Button>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
