import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MembershipForm } from "@/components/forms/MembershipForm";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Join REFORGE",
  description: "Apply for REFORGE membership. This is an interest form — not payment.",
  alternates: { canonical: "/join" },
};

const steps = [
  { n: "01", title: "Apply", body: "Tell us your experience, goal, and how you train." },
  { n: "02", title: "Coach follow-up", body: "A coach contacts you using the method you choose." },
  { n: "03", title: "Start the work", body: "Membership details are confirmed directly. No payment on this form." },
];

export default function JoinPage() {
  return (
    <section className="relative overflow-hidden pt-28 pb-24">
      <Image
        src="/images/gym/kettlebell-athlete.webp"
        alt=""
        fill
        priority
        className="object-cover opacity-[0.2]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/70" />
      <div className="texture absolute inset-0" />

      <Container className="relative grid gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div>
          <SectionHeading
            kicker="Join"
            title={"BECOME\nA MEMBER."}
            subtitle="This is not payment. Submit your interest and a coach will follow up. Membership pricing will be confirmed directly."
          />

          <Reveal delay={0.08} className="mt-12 border border-border bg-background/50 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">How it works</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">Three steps</p>
            </div>
            <Stagger>
              {steps.map((step, i) => (
                <StaggerItem key={step.n}>
                  <div
                    className={`group flex gap-5 px-5 py-6 transition-colors duration-300 hover:bg-surface/80 ${
                      i < steps.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <span className="font-display text-3xl leading-none text-accent">{step.n}</span>
                    <div>
                      <p className="font-display text-2xl leading-none">{step.title}</p>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-secondary">{step.body}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          <Reveal delay={0.18} className="mt-8 text-[11px] uppercase tracking-[0.18em] text-text-muted">
            {siteConfig.studio.venue} · {siteConfig.studio.city}
            <span className="mx-3 text-border">/</span>
            <a href={`tel:${siteConfig.studio.phoneE164}`} className="transition-colors hover:text-accent">
              {siteConfig.studio.phoneDisplay}
            </a>
          </Reveal>
        </div>

        <MembershipForm />
      </Container>
    </section>
  );
}
