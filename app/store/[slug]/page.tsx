import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductDetail } from "@/components/store/ProductDetail";
import { getProductBySlug, getProducts } from "@/lib/data/queries";
import { siteConfig } from "@/lib/config/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/store/${product.slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = (await getProducts())
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  const jsonLd =
    product.priceCents !== null
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          image: product.image.startsWith("http")
            ? product.image
            : `${siteConfig.url}${product.image}`,
          brand: { "@type": "Brand", name: "REFORGE" },
          offers: {
            "@type": "Offer",
            priceCurrency: product.currency,
            price: (product.priceCents / 100).toFixed(2),
            availability: "https://schema.org/PreOrder",
          },
        }
      : null;

  return (
    <section className="pt-28 pb-24">
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <Container>
        <ProductDetail
          product={product}
          related={related}
        />
      </Container>
    </section>
  );
}
