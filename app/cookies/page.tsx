import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { CookieSettings } from "@/components/layout/CookieSettings";

export const metadata: Metadata = {
  title: "Cookies",
  description: "How REFORGE uses cookies and similar storage on this website.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <section className="pt-28 pb-24">
      <Container className="max-w-3xl">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.22em] text-accent">
            Placeholder — legal review required
          </p>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">Cookies</h1>
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-text-secondary">
            <p>
              This page explains what this website stores in your browser. It is a draft outline and should
              be reviewed before being treated as a live cookie policy.
            </p>
            <p>
              REFORGE uses a short intro on first visit in a session, remembers your cookie choice, and keeps
              your cart on this device so items stay in the bag if you leave the shop.
            </p>
            <p>
              We do not currently run advertising or analytics cookies. If that changes, this page will be
              updated and you will be asked again.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 border border-border">
          <div className="border-b border-border px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">What we store</p>
          </div>
          <ul className="divide-y divide-border text-sm">
            <li className="px-5 py-4">
              <p className="font-medium text-text">Essential</p>
              <p className="mt-1 text-text-secondary">
                Cookie preference, shopping cart, and whether you have already seen the intro this session.
              </p>
            </li>
            <li className="px-5 py-4">
              <p className="font-medium text-text">Optional</p>
              <p className="mt-1 text-text-secondary">
                Nothing extra is on yet. Accepting cookies keeps the door open for future measurement — we
                will not add it silently.
              </p>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <CookieSettings />
        </Reveal>

        <Reveal delay={0.16} className="mt-8 text-sm text-text-muted">
          See also{" "}
          <Link href="/privacy" className="text-accent">
            Privacy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-accent">
            Terms
          </Link>
          .
        </Reveal>
      </Container>
    </section>
  );
}
