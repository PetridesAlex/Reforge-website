"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const shots = [
  {
    src: "/images/gym/kettlebell-still.webp",
    alt: "Kettlebells on the REFORGE studio floor",
  },
  {
    src: "/images/gym/kettlebell-athlete.webp",
    alt: "",
  },
  {
    src: "/images/gym/studio-floor.webp",
    alt: "",
  },
  {
    src: "/images/gym/athlete-dumbbells.webp",
    alt: "",
  },
] as const;

const HOLD_MS = 8200;

export function HeroBackdrop({ reduced }: { reduced: boolean | null }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % shots.length);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {shots.map((shot, i) => {
        const active = reduced ? i === 0 : i === index;
        return (
          <motion.div
            key={shot.src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-[-8%] origin-center will-change-transform"
              initial={false}
              animate={
                reduced || !active
                  ? { scale: 1.08, x: "0%", y: "0%" }
                  : { scale: [1.08, 1.18], x: ["1%", "-1.4%"], y: ["0.4%", "-0.9%"] }
              }
              transition={{ duration: HOLD_MS / 1000, ease: "linear" }}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                priority={i === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        );
      })}

      <div className="hero-breathe absolute inset-0 bg-gradient-to-t from-background via-background/68 to-background/25" />
      <div aria-hidden className="hero-scan pointer-events-none absolute inset-0" />
      {!reduced ? (
        <>
          <div aria-hidden className="hero-grain pointer-events-none absolute -inset-[20%]" />
          <div aria-hidden className="hero-sweep pointer-events-none absolute inset-y-0 -left-1/3 w-1/2" />
        </>
      ) : (
        <div className="texture absolute inset-0" />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.55)]"
      />
    </div>
  );
}
