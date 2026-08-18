import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckoutForm } from "@/components/store/CheckoutForm";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout REFORGE merchandise. Ships in Cyprus.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <section className="pt-28 pb-24">
      <Container className="max-w-2xl">
        <SectionHeading
          kicker="Checkout"
          title={"PLACE\nTHE ORDER."}
          subtitle={`Ships in ${siteConfig.store.shipsTo} only. Pickup at ${siteConfig.studio.venue}, ${siteConfig.studio.city}. Payment via Stripe comes next.`}
        />
        <div className="mt-12">
          <CheckoutForm />
        </div>
      </Container>
    </section>
  );
}
