import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/ui/CTASection";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "About REFORGE",
  description: "The REFORGE story — who we are, our philosophy, training, community, and facilities.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-24">
        <Image src="/images/gym/studio-floor.webp" alt="" fill className="object-cover opacity-25" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <Container className="relative">
          <SectionHeading
            kicker="About"
            title={"WHO\nWE ARE."}
            subtitle={`${siteConfig.studio.name} trains at ${siteConfig.studio.venue} in ${siteConfig.studio.city}. A performance studio for people who show up.`}
          />
        </Container>
      </section>

      {[
        {
          title: "Our philosophy",
          body: "Training. Performance. Community. Consistency. REFORGE is not a drop-in entertainment gym. It is a standard — the work, the people, and the progress you can measure.",
        },
        {
          title: "Training philosophy",
          body: "Sessions are programmed with intent. Strength, conditioning, functional work, Hyrox-style pieces, mobility, and personal coaching sit in one ecosystem. The REFORGE app tracks the work so the floor stays honest.",
        },
        {
          title: "Community",
          body: "Athletes train together, compete in weekly challenges, and celebrate the work. The public website only shows content that is explicitly featured. The rest stays in the member community.",
        },
        {
          title: "Coaches",
          body: `Coaching sits at the centre of REFORGE. ${siteConfig.studio.owner} founded the studio. Additional coach profiles will be published as they are confirmed.`,
        },
        {
          title: "Facilities",
          body: `${siteConfig.studio.venue}, ${siteConfig.studio.street}, ${siteConfig.studio.city} ${siteConfig.studio.postal}, ${siteConfig.studio.country}. Facility photography and opening hours will be added when confirmed.`,
        },
        {
          title: "Mission",
          body: "Forge stronger athletes. Hold a serious standard. Build a community that shows up.",
        },
      ].map((block, i) => (
        <section key={block.title} className="border-t border-border py-16">
          <Container className="grid gap-8 lg:grid-cols-12">
            <Reveal delay={i * 0.04} className="col-span-4">
              <h2 className="font-display text-4xl">{block.title}</h2>
            </Reveal>
            <Reveal delay={0.08 + i * 0.04} className="col-span-7">
              <p className="max-w-2xl leading-relaxed text-text-secondary">{block.body}</p>
            </Reveal>
          </Container>
        </section>
      ))}
      <CTASection
        title={"READY TO\nREFORGE?"}
        primary={{ href: "/join", label: "Become a member" }}
        secondary={{ href: "/contact", label: "Contact us" }}
      />
    </>
  );
}
