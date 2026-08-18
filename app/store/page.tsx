import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { ProductGrid } from "@/components/store/ProductGrid";
import { getProducts } from "@/lib/data/queries";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "REFORGE Store",
  description: "REFORGE merchandise — t-shirts, hoodies, socks, and hats.",
  alternates: { canonical: "/store" },
};

export default async function StorePage() {
  const products = await getProducts();

  return (
    <section className="pt-28 pb-24">
      <Container>
        <SectionHeading kicker="Store" title={"WEAR\nTHE WORK."} subtitle="REFORGE merchandise. Live catalog, stock, and pricing load from Supabase when connected." />
        <div className="mt-6 space-y-2">
          {!siteConfig.checkoutEnabled ? (
            <PlaceholderNote>Online checkout is coming soon. Add items to cart and enquire to reserve.</PlaceholderNote>
          ) : null}
          {products.some((p) => p.isPlaceholderPrice) ? (
            <PlaceholderNote>Sample catalog — prices shown as on request until live product data is connected.</PlaceholderNote>
          ) : null}
        </div>
        <div className="mt-12">
          <ProductGrid products={products} />
        </div>
      </Container>
    </section>
  );
}
