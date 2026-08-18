import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatBlock } from "@/components/ui/StatBlock";
import { CommunityPostCard } from "@/components/community/CommunityPostCard";
import { CoachCard } from "@/components/coaches/CoachCard";
import { CTASection } from "@/components/ui/CTASection";
import { Hero } from "@/components/home/Hero";
import { HeroMarquee } from "@/components/home/HeroMarquee";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { LazySection } from "@/components/motion/LazySection";
import { ChallengeSection } from "@/components/home/ChallengeSection";
import { ClassesSection } from "@/components/home/ClassesSection";
import { TrainingSection } from "@/components/home/TrainingSection";
import { AppSection } from "@/components/home/AppSection";
import { ProgressSection } from "@/components/home/ProgressSection";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { StoreSection } from "@/components/home/StoreSection";
import { siteConfig } from "@/lib/config/site";
import type {
  Achievement,
  Coach,
  CommunityPost,
  GymClass,
  Product,
  TrainingCategory,
  WeeklyChallenge,
} from "@/types";

const pillars = [
  {
    label: "Training",
    title: "Purpose over noise.",
    body: "Strength, engine, and movement programmed for real output — not random work.",
  },
  {
    label: "Performance",
    title: "Proof on the board.",
    body: "Personal bests, weekly challenges, and progress you can actually check.",
  },
  {
    label: "Community",
    title: "The floor is shared.",
    body: "Train together. Compete together. Public highlights stay honest.",
  },
  {
    label: "Consistency",
    title: "Show up again.",
    body: "The standard is the next session — not a one-off effort.",
  },
] as const;

function Intro() {
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-end">
        <Reveal className="col-span-7">
          <h2 className="font-display text-5xl leading-[0.88] sm:text-7xl lg:text-8xl">
            THIS IS MORE
            <br />
            THAN A GYM.
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="col-span-5 max-w-md text-text-secondary leading-relaxed">
          <p>
            REFORGE is a performance studio built on four standards: training, performance,
            community, and consistency. The work is serious. The environment is focused. The
            progress is measurable.
          </p>
          <p className="mt-4">
            Members train together, compete in weekly challenges, unlock achievements, and carry
            the standard beyond a single session.
          </p>
        </Reveal>
      </Container>
      <Container className="mt-16">
        <Stagger className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {pillars.map((pillar, i) => (
            <StaggerItem key={pillar.label}>
              <article className="group relative h-full bg-background px-6 py-8 transition-colors duration-500 hover:bg-surface">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                    {pillar.label}
                  </p>
                  <p className="font-display text-xl leading-none text-text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <h3 className="font-display mt-6 text-3xl leading-[0.92] sm:text-4xl">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{pillar.body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function TrainingPreview({ categories }: { categories: TrainingCategory[] }) {
  return <TrainingSection categories={categories} />;
}

function WhyReforge() {
  const stats = Object.values(siteConfig.stats);
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <Container>
        <SectionHeading kicker="Why REFORGE" title={"BUILT FOR\nPERFORMANCE."} />
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatBlock
              key={stat.label}
              value={stat.value}
              label={stat.label}
              placeholder={stat.placeholder}
              delay={i * 0.16}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ClassesPreview({ classes }: { classes: GymClass[] }) {
  return <ClassesSection classes={classes} />;
}

function ChallengePreview({ challenge }: { challenge: WeeklyChallenge | undefined }) {
  if (!challenge) return null;
  return <ChallengeSection challenge={challenge} />;
}

function AchievementsPreview({ achievements }: { achievements: Achievement[] }) {
  return <AchievementsSection achievements={achievements} />;
}

function AppShowcase() {
  return <AppSection />;
}

function CommunityPreview({ posts }: { posts: CommunityPost[] }) {
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <Container>
        <SectionHeading
          kicker="Community"
          title={"TRAIN TOGETHER.\nGROW TOGETHER."}
          subtitle="A look at life on the floor — sessions, shout-outs, and the work we celebrate together. The full conversation lives in the REFORGE app."
        />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <StaggerItem key={post.id}>
              <CommunityPostCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.1}>
          <Button href="/community" className="mt-10">
            View community
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

function ProgressPreview() {
  return <ProgressSection />;
}

function CoachesPreview({ coaches }: { coaches: Coach[] }) {
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading kicker="Coaches" title={"THE PERSON\nBEHIND THE WORK."} />
          <Reveal delay={0.1}>
            <Button href="/coaches" variant="secondary">
              Meet the coach
            </Button>
          </Reveal>
        </div>
        <Stagger className={coaches.length === 1 ? "mt-14" : "mt-14 grid gap-6 md:grid-cols-3"}>
          {coaches.slice(0, 3).map((coach) => (
            <StaggerItem key={coach.id}>
              <CoachCard coach={coach} featured={coaches.length === 1} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function StorePreview({ products }: { products: Product[] }) {
  return <StoreSection products={products} />;
}

export function HomePage({
  categories,
  classes,
  challenge,
  achievements,
  posts,
  coaches,
  products,
}: {
  categories: TrainingCategory[];
  classes: GymClass[];
  challenge?: WeeklyChallenge;
  achievements: Achievement[];
  posts: CommunityPost[];
  coaches: Coach[];
  products: Product[];
}) {
  return (
    <>
      <Hero />
      <HeroMarquee />
      <Intro />
      <LazySection estimate="auto 1800px">
        <TrainingPreview categories={categories} />
      </LazySection>
      <LazySection>
        <WhyReforge />
      </LazySection>
      <LazySection>
        <ClassesPreview classes={classes} />
      </LazySection>
      <LazySection>
        <ChallengePreview challenge={challenge} />
      </LazySection>
      <LazySection>
        <AchievementsPreview achievements={achievements} />
      </LazySection>
      <LazySection estimate="auto 1100px">
        <AppShowcase />
      </LazySection>
      <LazySection>
        <CommunityPreview posts={posts} />
      </LazySection>
      <LazySection>
        <ProgressPreview />
      </LazySection>
      <LazySection>
        <CoachesPreview coaches={coaches} />
      </LazySection>
      <LazySection estimate="auto 1600px">
        <StorePreview products={products} />
      </LazySection>
      <CTASection
        title={"READY TO\nREFORGE?"}
        subtitle="Join the community."
        primary={{ href: "/join", label: "Become a member" }}
        secondary={{ href: "/contact", label: "Contact us" }}
      />
    </>
  );
}
