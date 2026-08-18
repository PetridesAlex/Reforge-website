import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Terms",
  description: "REFORGE terms of use — placeholder pending legal review.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="pt-28 pb-24">
      <Container className="max-w-3xl">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.22em] text-accent">Placeholder — legal review required</p>
          <h1 className="font-display mt-4 text-5xl">Terms</h1>
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-text-secondary">
            <p>
              This page is a draft outline only. It is not finalized legal advice and must be reviewed before
              being treated as binding terms of use.
            </p>
            <p>
              The REFORGE website is a public marketing site. Membership, class booking, and payments are not
              completed on this site until those features are enabled.
            </p>
            <p>
              Sample catalog items, statistics, coach profiles, and challenge results marked as placeholders
              are not live commercial offers.
            </p>
            <p>Complete terms will replace this placeholder after business and legal review.</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
