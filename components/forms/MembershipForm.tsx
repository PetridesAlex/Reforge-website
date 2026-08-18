"use client";

import type { ReactNode } from "react";
import { useActionState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { submitMembership, type FormState } from "@/app/actions/forms";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const initial: FormState = { ok: false, message: "" };

const fieldClass =
  "w-full border border-border bg-surface/80 px-4 py-3.5 text-sm text-text transition-colors duration-300 hover:border-accent/40 focus:border-accent focus:outline-none";

export function MembershipForm() {
  const [state, action, pending] = useActionState(submitMembership, initial);
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {state.ok ? (
        <motion.div
          key="success"
          initial={reduced ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border border-accent bg-surface p-10 text-center sm:p-16"
        >
          <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Welcome</p>
          <h2 className="font-display mt-6 text-5xl leading-[0.9] sm:text-7xl">
            YOU&apos;RE IN
            <br />
            THE WORK.
          </h2>
          <span aria-hidden className="mx-auto mt-6 block h-px w-16 bg-accent" />
          <p className="mx-auto mt-6 max-w-md text-text-secondary">
            Your membership interest has been received. A coach will contact you using the method you chose.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          action={action}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative border border-border bg-background/80 backdrop-blur-sm lg:sticky lg:top-28"
        >
          <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-accent" />
          <div className="flex items-end justify-between border-b border-border px-6 py-5 sm:px-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Application</p>
              <p className="font-display mt-2 text-3xl leading-none sm:text-4xl">Join REFORGE</p>
            </div>
            <p className="text-right text-[11px] uppercase tracking-[0.16em] text-text-muted">
              No payment
              <br />
              today
            </p>
          </div>

          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            aria-hidden="true"
          />

          <div className="grid gap-8 p-6 sm:p-8">
            <Fieldset kicker="01" title="Personal" delay={0.04}>
              <Field label="Name" name="name" error={state.fieldErrors?.name} required delay={0.06} />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Email" name="email" type="email" error={state.fieldErrors?.email} required delay={0.1} />
                <Field label="Phone" name="phone" type="tel" error={state.fieldErrors?.phone} required delay={0.14} />
              </div>
            </Fieldset>

            <Fieldset kicker="02" title="Training" delay={0.16}>
              <Select
                label="Training experience"
                name="experience"
                error={state.fieldErrors?.experience}
                delay={0.18}
                options={[
                  ["beginner", "Beginner"],
                  ["intermediate", "Intermediate"],
                  ["advanced", "Advanced"],
                  ["athlete", "Athlete"],
                ]}
              />
              <Select
                label="Main goal"
                name="goal"
                error={state.fieldErrors?.goal}
                delay={0.22}
                options={[
                  ["build-strength", "Build Strength"],
                  ["lose-fat", "Lose Fat"],
                  ["improve-fitness", "Improve Fitness"],
                  ["performance", "Performance"],
                  ["community", "Community"],
                  ["other", "Other"],
                ]}
              />
              <Select
                label="Preferred training"
                name="preferredTraining"
                error={state.fieldErrors?.preferredTraining}
                delay={0.26}
                options={[
                  ["strength", "Strength"],
                  ["conditioning", "Conditioning"],
                  ["functional", "Functional"],
                  ["hyrox", "Hyrox-style"],
                  ["mobility", "Mobility"],
                  ["personal-coaching", "Personal Coaching"],
                  ["unsure", "Not sure yet"],
                ]}
              />
            </Fieldset>

            <Fieldset kicker="03" title="Follow-up" delay={0.28}>
              <Select
                label="Preferred contact method"
                name="contactMethod"
                error={state.fieldErrors?.contactMethod}
                delay={0.3}
                options={[
                  ["email", "Email"],
                  ["phone", "Phone"],
                  ["whatsapp", "WhatsApp"],
                ]}
              />
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.45 }}
              >
                <label htmlFor="notes" className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-text-muted">
                  Notes
                </label>
                <textarea id="notes" name="notes" rows={4} className={fieldClass} />
              </motion.div>
            </Fieldset>

            {state.message && !state.ok ? <p className="text-sm text-danger">{state.message}</p> : null}

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.45 }}
            >
              <Button type="submit" size="lg" disabled={pending} className="w-full">
                {pending ? "Submitting…" : "Submit interest"}
              </Button>
              <p className="mt-4 text-center text-[11px] uppercase tracking-[0.16em] text-text-muted">
                A coach will follow up. No charge on this form.
              </p>
            </motion.div>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Fieldset({
  kicker,
  title,
  delay,
  children,
}: {
  kicker: string;
  title: string;
  delay: number;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.fieldset
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="grid gap-5"
    >
      <legend className="flex items-center gap-3 pb-1">
        <span className="font-display text-lg text-accent">{kicker}</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text">{title}</span>
        <span aria-hidden className="h-px flex-1 bg-border" />
      </legend>
      {children}
    </motion.fieldset>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  delay = 0,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <label htmlFor={name} className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-text-muted">
        {label}
      </label>
      <input id={name} name={name} type={type} required={required} className={fieldClass} />
      {error ? <p className="mt-2 text-sm text-danger">{error}</p> : null}
    </motion.div>
  );
}

function Select({
  label,
  name,
  options,
  error,
  delay = 0,
}: {
  label: string;
  name: string;
  options: Array<[string, string]>;
  error?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <label htmlFor={name} className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-text-muted">
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          required
          className={cn(fieldClass, "appearance-none pr-10")}
          defaultValue=""
        >
          <option value="" disabled>
            Select
          </option>
          {options.map(([value, text]) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
        />
      </div>
      {error ? <p className="mt-2 text-sm text-danger">{error}</p> : null}
    </motion.div>
  );
}
