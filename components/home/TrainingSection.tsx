import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TrainingCategory } from "@/types";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import StaggeredText from "@/components/motion/StaggeredText";
import { cn } from "@/lib/utils/cn";

export function TrainingSection({ categories }: { categories: TrainingCategory[] }) {
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
              Training
            </p>
            <StaggeredText
              as="h2"
              text="TRAIN. COMPETE. REFORGE."
              segmentBy="words"
              direction="top"
              delay={80}
              duration={0.6}
              blur
              staggerDirection="forward"
              easing={[0.22, 1, 0.36, 1]}
              className="font-display text-4xl leading-[0.92] text-text sm:text-5xl lg:text-6xl xl:text-7xl"
            />
            <span aria-hidden className="mt-5 block h-px w-16 origin-left bg-accent" />
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/training" variant="secondary">
              Explore training
            </Button>
          </Reveal>
        </div>
      </Container>

      <div className="mt-14 grid w-full grid-cols-1 gap-px bg-border md:grid-cols-2 xl:grid-cols-4">
        {categories.map((cat, i) => (
          <TrainingTile key={cat.slug} category={cat} index={i} />
        ))}
      </div>
    </section>
  );
}

function TrainingTile({
  category,
  index,
}: {
  category: TrainingCategory;
  index: number;
}) {
  const featured = index === 0;
  const wide = index === 5 || index === 6;

  return (
    <Link
      href={`/training#${category.slug}`}
      className={cn(
        "group relative isolate block min-h-[62vh] overflow-hidden bg-background md:min-h-[46vh] xl:min-h-[42vh]",
        featured && "md:col-span-2 xl:row-span-2 xl:min-h-full",
        wide && "xl:col-span-2",
      )}
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        loading="lazy"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/15 transition-colors duration-500 group-hover:via-black/60" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-accent/55"
      />
      <p className="absolute left-5 top-5 font-display text-2xl text-accent sm:left-7 sm:top-7">
        {String(index + 1).padStart(2, "0")}
      </p>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-accent">{category.short}</p>
        <h3
          className={cn(
            "font-display mt-2 leading-[0.9]",
            featured ? "text-5xl sm:text-6xl lg:text-8xl" : "text-4xl sm:text-5xl lg:text-6xl",
          )}
        >
          {category.name}
        </h3>
        <span className="mt-4 inline-flex translate-y-2 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-text opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100">
          Explore
          <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
