import { siteConfig } from "@/lib/config/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/brand/reforge-logo.png`,
      },
      {
        "@type": "SportsActivityLocation",
        name: siteConfig.studio.name,
        url: siteConfig.url,
        telephone: siteConfig.studio.phoneE164,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.studio.street,
          addressLocality: siteConfig.studio.city,
          postalCode: siteConfig.studio.postal,
          addressCountry: "CY",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
