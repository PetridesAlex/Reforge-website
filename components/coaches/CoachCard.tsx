import Image from "next/image";
import Link from "next/link";
import type { Coach } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/lib/config/site";

export function CoachCard({
  coach,
  featured = false,
}: {
  coach: Coach;
  featured?: boolean;
}) {
  const names = coach.name.split(" ");
  const firstName = names[0] ?? coach.name;
  const lastName = names.slice(1).join(" ");

  if (featured) {
    return (
      <Link href={`/coaches/${coach.slug}`} className="group block">
        <article className="relative min-h-[80vh] w-full overflow-hidden border border-border bg-surface sm:min-h-[86vh]">
          <Image
            src={coach.image}
            alt={coach.isPlaceholder ? `${coach.name} placeholder portrait` : coach.name}
            fill
            className="object-cover object-[center_20%] transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/25 to-transparent" />
          <div className="texture absolute inset-0 opacity-30" />
          <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-accent" />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-4 border border-white/12 transition-colors duration-500 group-hover:border-accent/45 sm:inset-6"
          />

          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 lg:p-14">
            <div className="flex items-start justify-between gap-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                01 · The coach
              </p>
              <p className="text-right text-[11px] uppercase tracking-[0.22em] text-text-secondary">
                {siteConfig.studio.venue}
                <span className="mt-1 block text-text-muted">
                  {siteConfig.studio.city} · {siteConfig.studio.country}
                </span>
              </p>
            </div>

            <div className="max-w-3xl">
              {coach.isPlaceholder ? (
                <Badge className="mb-4 border-accent/30 text-accent">Profile forthcoming</Badge>
              ) : null}
              <h3 className="font-display text-6xl leading-[0.82] text-text sm:text-8xl lg:text-[7.5rem]">
                {firstName}
                {lastName ? (
                  <>
                    <br />
                    {lastName}
                  </>
                ) : null}
              </h3>
              <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.22em] text-accent sm:text-sm">
                {coach.role}
              </p>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-text sm:text-base">
                {coach.philosophy}
              </p>
              {coach.classTitles.length ? (
                <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-text-secondary">
                  {coach.classTitles.join("  ·  ")}
                </p>
              ) : null}
              <span className="mt-8 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-text transition-colors duration-300 group-hover:text-accent">
                View profile
                <span
                  aria-hidden
                  className="h-px w-8 bg-accent transition-all duration-300 group-hover:w-14"
                />
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/coaches/${coach.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden border border-border bg-surface">
        <Image
          src={coach.image}
          alt={coach.isPlaceholder ? `${coach.name} placeholder portrait` : coach.name}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5">
          {coach.isPlaceholder ? <Badge className="mb-3">Profile forthcoming</Badge> : null}
          <h3 className="font-display text-3xl leading-none text-text">{coach.name}</h3>
          <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-accent">{coach.role}</p>
        </div>
      </div>
    </Link>
  );
}
