import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Contact REFORGE",
  description: "Contact REFORGE in Limassol — membership, classes, and coaching enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.studio.mapsQuery)}`;

  return (
    <section className="pt-28 pb-24">
      <Container className="grid gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            kicker="Contact"
            title={"GET IN\nTOUCH."}
            subtitle="Send an enquiry. We will come back to you."
          />
          <Reveal delay={0.1} className="mt-10 space-y-3 text-sm text-text-secondary">
            <p>{siteConfig.studio.venue}</p>
            <p>
              {siteConfig.studio.street}
              <br />
              {siteConfig.studio.city}, {siteConfig.studio.postal}
              <br />
              {siteConfig.studio.country}
            </p>
            <p>
              <a href={`tel:${siteConfig.studio.phoneE164}`} className="hover:text-accent">
                {siteConfig.studio.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={maps} className="text-accent hover:underline">
                Open map
              </a>
            </p>
            <p className="text-text-muted">Email address forthcoming.</p>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
