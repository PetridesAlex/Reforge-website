import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center pt-28 pb-24">
      <Container>
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.22em] text-accent">404</p>
          <h1 className="font-display mt-4 text-6xl sm:text-8xl">OUT OF RANGE.</h1>
          <p className="mt-4 text-text-secondary">This page does not exist.</p>
          <Button href="/" className="mt-8">
            Back to REFORGE
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
