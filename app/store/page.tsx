import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { ProductGrid } from "@/components/store/ProductGrid";
import { Reveal } from "@/components/motion/Reveal";
import { getProducts } from "@/lib/data/queries";
import { siteConfig } from "@/lib/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "REFORGE Store",
  description: "REFORGE merchandise — t-shirts, hoodies, socks, and hats. Ships in Cyprus. Pickup at City Box Gym, Limassol.",
  alternates: { canonical: "/store" },
};

export default async function StorePage() {
  const products = await getProducts();

  return (
    <>
      <section className="relative min-h-[52vh] overflow-hidden pt-28 pb-24 sm:min-h-[60vh]">
        <Image
          src="/images/gym/dumbbells-wod.webp"
          alt=""
          fill
          priority
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/25" />
        <div className="texture absolute inset-0 opacity-25" />
        <Container className="relative flex min-h-[28vh] items-end sm:min-h-[32vh]">
          <SectionHeading
            kicker="Store"
            title={"WEAR\nTHE WORK."}
            subtitle="REFORGE merchandise for the floor and after. Ships in Cyprus. Pickup at City Box Gym, Limassol."
          />
        </Container>
      </section>

      <section className="border-y border-border">
        <div className="grid gap-px bg-border sm:grid-cols-3">
          {[
            { kicker: "01", title: "Cyprus shipping", body: "Island-wide delivery. We only ship inside Cyprus." },
            { kicker: "02", title: "Studio pickup", body: siteConfig.store.pickupDetail },
            { kicker: "03", title: "Pay on confirm", body: "Place the order now. Stripe checkout connects next." },
          ].map((item) => (
            <div key={item.kicker} className="bg-background px-5 py-6 sm:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">{item.kicker}</p>
              <p className="font-display mt-2 text-2xl leading-none">{item.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-x-hidden pt-16 pb-24">
        <Container>
          {products.some((p) => p.isPlaceholderPrice) ? (
            <Reveal>
              <PlaceholderNote>
                Sample catalog pricing until live product data is connected. No card is charged yet.
              </PlaceholderNote>
            </Reveal>
          ) : null}
          <div className="mt-8">
            <ProductGrid products={products} />
          </div>
        </Container>
      </section>
    </>
  );
}
