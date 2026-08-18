import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Privacy",
  description: "REFORGE privacy notice — placeholder pending legal review.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="pt-28 pb-24">
      <Container className="max-w-3xl">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.22em] text-accent">Placeholder — legal review required</p>
          <h1 className="font-display mt-4 text-5xl">Privacy</h1>
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-text-secondary">
          <p>
            This page is a draft outline only. It is not finalized legal advice and must be reviewed before
            being treated as a live privacy policy.
          </p>
          <p>
            REFORGE may collect name, email, phone, and enquiry details submitted through this website,
            including email addresses entered in the newsletter form. Membership and training data in
            the REFORGE mobile app is governed separately.
          </p>
          <p>
            Contact and membership forms are processed on our servers. Email notifications may be sent
            through Resend. Data stored in Supabase is subject to that project&apos;s access controls.
          </p>
          <p>
            A complete privacy policy will replace this placeholder after business and legal review. See also{" "}
            <Link href="/cookies" className="text-accent">
              cookies
            </Link>
            .
          </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
