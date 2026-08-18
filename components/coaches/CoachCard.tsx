import Image from "next/image";
import Link from "next/link";
import type { Coach } from "@/types";
import { Badge } from "@/components/ui/Badge";

export function CoachCard({ coach }: { coach: Coach }) {
  return (
    <Link href={`/coaches/${coach.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface">
        <Image
          src={coach.image}
          alt={coach.isPlaceholder ? `${coach.name} placeholder portrait` : coach.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5">
          {coach.isPlaceholder ? <Badge className="mb-3">Profile forthcoming</Badge> : null}
          <h3 className="font-display text-3xl leading-none text-text">{coach.name}</h3>
          <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-accent">{coach.role}</p>
        </div>
      </div>
    </Link>
  );
}
