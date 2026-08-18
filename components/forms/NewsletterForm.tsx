"use client";

import { useActionState } from "react";
import Link from "next/link";
import { submitNewsletter, type FormState } from "@/app/actions/forms";

const initial: FormState = { ok: false, message: "" };

export function NewsletterForm() {
  const [state, action, pending] = useActionState(submitNewsletter, initial);

  if (state.ok) {
    return (
      <div className="border border-accent/40 bg-surface px-6 py-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Subscribed</p>
        <p className="font-display mt-2 text-3xl leading-none">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="w-full">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          className="box-border min-h-14 w-full flex-1 appearance-none border border-text/35 bg-surface px-5 text-base leading-normal text-text placeholder:text-text-muted focus:border-accent focus:outline-none sm:min-h-16 sm:text-lg"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-14 shrink-0 items-center justify-center bg-accent px-8 text-[12px] font-semibold uppercase tracking-[0.18em] text-background transition-colors duration-200 hover:bg-[#d4ff2e] disabled:opacity-50 sm:min-h-16 sm:px-10 sm:text-[13px]"
        >
          {pending ? "Sending…" : "Subscribe"}
        </button>
      </div>
      {state.fieldErrors?.email ? (
        <p className="mt-3 text-sm text-danger">{state.fieldErrors.email}</p>
      ) : null}
      {state.message && !state.ok ? <p className="mt-3 text-sm text-danger">{state.message}</p> : null}
      <p className="mt-3 text-[11px] leading-relaxed uppercase tracking-[0.14em] text-text-muted">
        By subscribing you agree to receive studio emails.{" "}
        <Link href="/privacy" className="text-text-secondary transition-colors hover:text-accent">
          Privacy
        </Link>
      </p>
    </form>
  );
}
