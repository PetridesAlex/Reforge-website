import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Order received",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <section className="pt-28 pb-24">
      <Container className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">Order received</p>
        <h1 className="font-display mt-4 text-5xl leading-[0.88] sm:text-7xl">IT’S IN.</h1>
        <span aria-hidden className="mt-5 block h-px w-16 bg-accent" />
        <p className="mt-6 text-lg leading-relaxed text-text-secondary">
          We have your order{order ? ` ${order}` : ""}. Nothing has been charged yet. We’ll confirm the pieces,
          shipping in Cyprus, and take payment before anything leaves the studio.
        </p>
        <p className="mt-4 text-sm text-text-muted">
          Pickup is at {siteConfig.studio.venue}, {siteConfig.studio.street}, {siteConfig.studio.city}. Questions?{" "}
          <Link href="/contact" className="text-accent">
            Contact us
          </Link>{" "}
          or WhatsApp.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/store">Back to the shop</Button>
          <Button href="/classes" variant="secondary">
            See classes
          </Button>
        </div>
      </Container>
    </section>
  );
}
