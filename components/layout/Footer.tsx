import Image from "next/image";
import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/config/site";
import { Button } from "@/components/ui/Button";
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
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-70"
      />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <Reveal>
          <p className="animate-accent-switch font-display text-4xl leading-[0.9] text-accent sm:text-6xl lg:text-7xl">
            BUILT FOR THOSE
            <br />
            WHO SHOW UP.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 border-t border-border pt-12 md:grid-cols-2 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-4" aria-label="REFORGE home">
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center border border-border bg-surface transition-colors duration-300 group-hover:border-accent">
                <Image
                  src="/brand/reforge-logo.png"
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
              </span>
              <span className="flex flex-col">
                <span className="font-display text-4xl leading-none tracking-[0.16em] transition-colors duration-300 group-hover:text-accent sm:text-5xl">
                  REFORGE
                </span>
                <span className="mt-2 text-[11px] uppercase tracking-[0.28em] text-text-muted">
                  {siteConfig.studio.city} · {siteConfig.studio.country}
                </span>
              </span>
            </Link>

            <p className="font-display mt-8 max-w-sm text-3xl leading-[0.95] text-text">
              {siteConfig.tagline}
            </p>
            <ul className="mt-5 max-w-sm space-y-2.5">
              {["Performance-driven training.", "Real community.", "Measurable progress."].map(
                (line) => (
                  <li
                    key={line}
                    className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-text-secondary"
                  >
                    <span aria-hidden className="h-px w-5 shrink-0 bg-accent" />
                    {line}
                  </li>
                ),
              )}
            </ul>

            <address className="mt-8 not-italic">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Studio</p>
              <a
                href={maps}
                className="group mt-4 block transition-colors duration-300"
              >
                <span className="font-display text-2xl leading-none tracking-[0.08em] text-text transition-colors duration-300 group-hover:text-accent">
                  {siteConfig.studio.venue}
                </span>
                <span className="mt-4 block space-y-1 text-[12px] uppercase tracking-[0.16em] text-text-muted transition-colors duration-300 group-hover:text-text-secondary">
                  <span className="block">{siteConfig.studio.street}</span>
                  <span className="block">
                    {siteConfig.studio.city} {siteConfig.studio.postal}
                  </span>
                  <span className="block">{siteConfig.studio.country}</span>
                </span>
                <span className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Open map
                  <span aria-hidden className="h-px w-6 bg-accent transition-all duration-300 group-hover:w-10" />
                </span>
              </a>
              <a
                href={`tel:${siteConfig.studio.phoneE164}`}
                className="mt-5 inline-block font-display text-2xl leading-none tracking-[0.08em] text-text transition-colors duration-300 hover:text-accent"
              >
                {siteConfig.studio.phoneDisplay}
              </a>
            </address>

            <Button href="/join" className="mt-8">
              Join REFORGE
            </Button>
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

        <Reveal
          delay={0.1}
          className="mt-16 flex flex-col gap-2 border-t border-border pt-6 text-[11px] uppercase tracking-[0.16em] text-text-muted sm:flex-row sm:justify-between"
        >
          <p>© {new Date().getFullYear()} REFORGE</p>
          <p>
            {siteConfig.studio.city}, {siteConfig.studio.country}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
