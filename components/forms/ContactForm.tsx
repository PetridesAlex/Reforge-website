"use client";

import { useActionState } from "react";
import { submitContact, type FormState } from "@/app/actions/forms";
import { Button } from "@/components/ui/Button";

const initial: FormState = { ok: false, message: "" };

const fieldClass =
  "w-full border border-border bg-transparent px-4 py-3 text-sm text-text placeholder:text-text-muted";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.ok) {
    return (
      <div className="border border-accent/40 bg-surface p-10">
        <p className="text-[11px] uppercase tracking-[0.22em] text-accent">Received</p>
        <h2 className="font-display mt-4 text-4xl">We have your message.</h2>
        <p className="mt-4 text-text-secondary">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" name="firstName" error={state.fieldErrors?.firstName} required />
        <Field label="Last name" name="lastName" error={state.fieldErrors?.lastName} required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" error={state.fieldErrors?.email} required />
        <Field label="Phone" name="phone" type="tel" error={state.fieldErrors?.phone} />
      </div>
      <Field label="Subject" name="subject" error={state.fieldErrors?.subject} required />
      <div>
        <label htmlFor="interestedIn" className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-text-muted">
          Interested in
        </label>
        <select id="interestedIn" name="interestedIn" className={fieldClass}>
          <option value="">Select</option>
          <option value="membership">Membership</option>
          <option value="personal-training">Personal Training</option>
          <option value="classes">Classes</option>
          <option value="corporate">Corporate</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-text-muted">
          Message
        </label>
        <textarea id="message" name="message" required rows={6} className={fieldClass} />
        {state.fieldErrors?.message ? (
          <p className="mt-2 text-sm text-danger">{state.fieldErrors.message}</p>
        ) : null}
      </div>
      {state.message && !state.ok ? <p className="text-sm text-danger">{state.message}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-text-muted">
        {label}
      </label>
      <input id={name} name={name} type={type} required={required} className={fieldClass} />
      {error ? <p className="mt-2 text-sm text-danger">{error}</p> : null}
    </div>
  );
}
