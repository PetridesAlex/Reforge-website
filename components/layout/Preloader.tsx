"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { introSeen, markIntroSeen } from "@/lib/consent";

const DURATION_MS = 5000;
const ease = [0.22, 1, 0.36, 1] as const;
const letters = "REFORGE".split("");
const limeCycle = ["#f5f7f0", "#c8ff00", "#d4ff2e", "#e8ff8a", "#c8ff00", "#f5f7f0"];

function readShouldShowIntro() {
  return !introSeen();
}

export function Preloader() {
  const reduced = useReducedMotion();
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const shouldShow = hydrated && readShouldShowIntro() && !reduced;
  const [done, setDone] = useState(false);
  const visible = shouldShow && !done;

  useEffect(() => {
    if (!hydrated) return;

    if (!shouldShow || done) {
      markIntroSeen();
      return;
    }

    const hide = window.setTimeout(() => setDone(true), DURATION_MS);
    return () => window.clearTimeout(hide);
  }, [done, hydrated, shouldShow]);

  return (
    <AnimatePresence onExitComplete={markIntroSeen}>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background px-5"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease }}
          role="status"
          aria-live="polite"
          aria-label="Loading REFORGE"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.72, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            <Image
              src="/brand/reforge-logo.png"
              alt=""
              width={280}
              height={280}
              priority
              className="h-36 w-36 object-contain sm:h-48 sm:w-48 lg:h-56 lg:w-56"
            />
          </motion.div>

          <h1 className="mt-8 flex overflow-hidden font-display text-7xl leading-none tracking-[0.16em] sm:mt-10 sm:text-9xl lg:text-[10rem]">
            {letters.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                className="inline-block"
                initial={{ y: "110%", opacity: 0, color: "#f5f7f0" }}
                animate={{
                  y: "0%",
                  opacity: 1,
                  color: limeCycle,
                }}
                transition={{
                  y: { duration: 0.75, delay: 0.28 + i * 0.07, ease },
                  opacity: { duration: 0.75, delay: 0.28 + i * 0.07, ease },
                  color: {
                    duration: 2.8,
                    delay: 1 + i * 0.14,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
