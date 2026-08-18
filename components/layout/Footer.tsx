import Image from "next/image";
import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/config/site";
import { Button } from "@/components/ui/Button";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { FooterBackdrop } from "@/components/layout/FooterBackdrop";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

function FooterLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  const className =
    "group relative inline-block py-1.5 font-display text-2xl leading-none tracking-[0.08em] text-text-secondary transition-colors duration-300 hover:text-accent";

  const inner = (
    <>
      {label}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
      />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

function FooterColumn({
  title,
  links,
  delay,
}: {
  title: string;
  links: ReadonlyArray<{ href: string; label: string; external?: boolean }>;
  delay?: number;
}) {
  return (
    <nav aria-label={title}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">{title}</p>
      <Stagger className="mt-5 flex flex-col items-start" delay={delay} stagger={0.05}>
        {links.map((item) => (
          <StaggerItem key={item.href}>
            <FooterLink href={item.href} label={item.label} external={item.external} />
          </StaggerItem>
        ))}
      </Stagger>
    </nav>
  );
}

export function Footer() {
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.studio.mapsQuery)}`;
  const social = [
    siteConfig.instagramUrl
      ? { href: siteConfig.instagramUrl, label: "Instagram", external: true }
      : null,
    { href: siteConfig.whatsappUrl, label: "WhatsApp", external: true },
    { href: siteConfig.appStoreUrl, label: "App Store", external: true },
    { href: siteConfig.playStoreUrl, label: "Google Play", external: true },
  ].filter((item): item is { href: string; label: string; external: boolean } => item !== null);

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <FooterBackdrop />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-70"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <Reveal>
          <p className="animate-accent-switch font-display text-4xl leading-[0.9] text-accent sm:text-6xl lg:text-7xl">
            BUILT FOR THOSE
            <br />
            WHO SHOW UP.
          </p>
        </Reveal>

        <Reveal className="mt-14 grid gap-8 border-t border-border pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)] lg:items-end lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Newsletter
            </p>
            <p className="font-display mt-4 text-4xl leading-[0.9] sm:text-5xl">Stay on the list.</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary">
              Class drops, challenges, and studio notes from Limassol. No spam.
            </p>
          </div>
          <NewsletterForm />
        </Reveal>

        <div className="mt-14 grid gap-12 border-t border-border pt-12 md:grid-cols-2 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="border border-border bg-background/92 p-6 shadow-[0_28px_80px_rgba(0,0,0,0.5)] backdrop-blur-md sm:p-8">
            <Link href="/" className="group inline-flex items-center gap-4" aria-label="REFORGE home">
              <span className="relative flex h-16 w-16 shrink-0 items-center justify-center border border-accent/40 bg-surface transition-colors duration-300 group-hover:border-accent sm:h-[4.5rem] sm:w-[4.5rem]">
                <Image
                  src="/brand/reforge-logo.png"
                  alt=""
                  width={48}
                  height={48}
                  className="h-11 w-11 object-contain sm:h-12 sm:w-12"
                />
              </span>
              <span className="flex flex-col">
                <span className="font-display text-5xl leading-none tracking-[0.12em] text-text transition-colors duration-300 group-hover:text-accent sm:text-6xl">
                  REFORGE
                </span>
                <span className="mt-2 text-[12px] font-semibold uppercase tracking-[0.28em] text-accent">
                  {siteConfig.studio.city} · {siteConfig.studio.country}
                </span>
              </span>
            </Link>

            <p className="font-display mt-8 max-w-sm text-4xl leading-[0.9] text-text sm:text-5xl">
              {siteConfig.tagline}
            </p>
            <ul className="mt-6 max-w-sm space-y-3">
              {["Performance-driven training.", "Real community.", "Measurable progress."].map(
                (line) => (
                  <li
                    key={line}
                    className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-text"
                  >
                    <span aria-hidden className="h-px w-6 shrink-0 bg-accent" />
                    {line}
                  </li>
                ),
              )}
            </ul>

            <address className="mt-8 not-italic">
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-accent">Studio</p>
              <a
                href={maps}
                className="group mt-4 block transition-colors duration-300"
              >
                <span className="font-display text-3xl leading-none tracking-[0.08em] text-text transition-colors duration-300 group-hover:text-accent sm:text-4xl">
                  {siteConfig.studio.venue}
                </span>
                <span className="mt-4 block space-y-1.5 text-[13px] font-medium uppercase tracking-[0.16em] text-text">
                  <span className="block">{siteConfig.studio.street}</span>
                  <span className="block">
                    {siteConfig.studio.city} {siteConfig.studio.postal}
                  </span>
                  <span className="block">{siteConfig.studio.country}</span>
                </span>
                <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Open map
                  <span aria-hidden className="h-px w-6 bg-accent transition-all duration-300 group-hover:w-10" />
                </span>
              </a>
              <a
                href={`tel:${siteConfig.studio.phoneE164}`}
                className="mt-5 inline-block font-display text-3xl leading-none tracking-[0.08em] text-accent transition-colors duration-300 hover:text-text sm:text-4xl"
              >
                {siteConfig.studio.phoneDisplay}
              </a>
            </address>

            <Button href="/join" className="mt-8">
              Join REFORGE
            </Button>
            </div>
          </Reveal>

          <FooterColumn title="Navigation" links={footerNav.training} delay={0.06} />
          <div>
            <FooterColumn title="Company" links={footerNav.company} delay={0.1} />
            <div className="mt-10">
              <FooterColumn title="Legal" links={footerNav.legal} delay={0.14} />
            </div>
          </div>

          <FooterColumn title="Connect" links={social} delay={0.16} />
        </div>

        <Reveal delay={0.1} className="mt-16 border-t border-border pt-7">
          <div className="flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-text-muted sm:grid sm:grid-cols-3 sm:items-center sm:gap-4">
            <p className="sm:justify-self-start">© {new Date().getFullYear()} REFORGE</p>
            <p className="sm:justify-self-center">All rights reserved</p>
            <p className="sm:justify-self-end">
              {siteConfig.studio.city}, {siteConfig.studio.country}
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
