"use client";

import { useSyncExternalStore } from "react";
import { readConsent, writeConsent } from "@/lib/consent";
import { Button } from "@/components/ui/Button";

function subscribeConsent(onChange: () => void) {
  window.addEventListener("reforge-consent", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("reforge-consent", onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function CookieSettings() {
  const choice = useSyncExternalStore(subscribeConsent, readConsent, () => null);

  return (
    <div className="border border-border bg-surface px-5 py-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Your choice</p>
      <p className="mt-2 text-sm text-text-secondary">
        Current setting: {choice === "accepted" ? "Accepted" : choice === "essential" ? "Essential only" : "Not set"}
      </p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Button
          onClick={() => {
            writeConsent("accepted");
          }}
        >
          Accept cookies
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            writeConsent("essential");
          }}
        >
          Essential only
        </Button>
      </div>
    </div>
  );
}
