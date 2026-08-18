import type { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/store/ProductCard";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function StoreSection({ products }: { products: Product[] }) {
  const featured = products.slice(0, 4);

  return (
    <section className="border-t border-border py-24 sm:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            kicker="Store"
            title={"WEAR\nTHE WORK."}
            subtitle="REFORGE merchandise. Ships in Cyprus. Pickup at City Box Gym."
          />
          <Reveal delay={0.1}>
            <Button href="/store" variant="secondary">
              Shop REFORGE
            </Button>
          </Reveal>
        </div>
      </Container>

      <div className="mt-14 w-full">
        <div className="flex flex-col gap-3 border-y border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Lookbook</p>
          <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
            {featured.length} pieces · sample catalog
          </p>
        </div>
        <Stagger className="grid w-full grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, i) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} index={i} layout="lookbook" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
