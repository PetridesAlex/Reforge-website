"use server";

import { headers } from "next/headers";
import { brandedEmail, sendNotificationEmail } from "@/lib/email/resend";
import { rateLimit } from "@/lib/security/rate-limit";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { contactSchema, membershipSchema, newsletterSchema } from "@/lib/validation/forms";

export type FormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

function firstError(error: { issues: Array<{ path: PropertyKey[]; message: string }> }) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

async function clientKey() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    interestedIn: formData.get("interestedIn") || "",
    website: formData.get("website"),
  });

  if (!parsed.success) {
    return { ok: false, message: "Please check the form.", fieldErrors: firstError(parsed.error) };
  }

  if (parsed.data.website) {
    return { ok: true, message: "Thank you. We will be in touch." };
  }

  const limit = rateLimit(`contact:${await clientKey()}`);
  if (!limit.ok) {
    return { ok: false, message: "Too many submissions. Try again later." };
  }

  const data = parsed.data;
  const html = brandedEmail({
    title: "Contact inquiry",
    intro: "A new inquiry was submitted from the REFORGE website.",
    rows: [
      { label: "Name", value: `${data.firstName} ${data.lastName}` },
      { label: "Email", value: data.email },
      { label: "Phone", value: data.phone || "—" },
      { label: "Subject", value: data.subject },
      { label: "Interest", value: data.interestedIn || "—" },
      { label: "Message", value: data.message.replace(/\n/g, "<br/>") },
    ],
  });

  const emailResult = await sendNotificationEmail({
    subject: `REFORGE contact: ${data.subject}`,
    html,
  });

  const service = createSupabaseServiceClient();
  if (service) {
    await service.from("website_contact_inquiries").insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject,
      message: data.message,
      interested_in: data.interestedIn || null,
    });
  }

  if (!emailResult.sent && !service) {
    return {
      ok: false,
      message: "Inquiry could not be sent yet. Email and database are not configured.",
    };
  }

  return { ok: true, message: "Thank you. We will be in touch." };
}

export async function submitMembership(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = membershipSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    experience: formData.get("experience"),
    goal: formData.get("goal"),
    preferredTraining: formData.get("preferredTraining"),
    contactMethod: formData.get("contactMethod"),
    notes: formData.get("notes"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    return { ok: false, message: "Please check the form.", fieldErrors: firstError(parsed.error) };
  }

  if (parsed.data.website) {
    return { ok: true, message: "Application received." };
  }

  const limit = rateLimit(`join:${await clientKey()}`);
  if (!limit.ok) {
    return { ok: false, message: "Too many submissions. Try again later." };
  }

  const data = parsed.data;
  const html = brandedEmail({
    title: "Membership lead",
    intro: "A membership interest form was submitted from the REFORGE website.",
    rows: [
      { label: "Name", value: data.name },
      { label: "Email", value: data.email },
      { label: "Phone", value: data.phone },
      { label: "Experience", value: data.experience },
      { label: "Goal", value: data.goal },
      { label: "Training", value: data.preferredTraining },
      { label: "Contact", value: data.contactMethod },
      { label: "Notes", value: (data.notes || "—").replace(/\n/g, "<br/>") },
    ],
  });

  const emailResult = await sendNotificationEmail({
    subject: `REFORGE membership lead: ${data.name}`,
    html,
  });

  const service = createSupabaseServiceClient();
  if (service) {
    await service.from("website_membership_leads").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      experience: data.experience,
      goal: data.goal,
      preferred_training: data.preferredTraining,
      contact_method: data.contactMethod,
      notes: data.notes || null,
      status: "new",
    });
  }

  if (!emailResult.sent && !service) {
    return {
      ok: false,
      message: "Application could not be stored yet. Email and database are not configured.",
    };
  }

  return { ok: true, message: "Application received." };
}

export async function submitNewsletter(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    return { ok: false, message: "Please check the form.", fieldErrors: firstError(parsed.error) };
  }

  if (parsed.data.website) {
    return { ok: true, message: "You're on the list." };
  }

  const limit = rateLimit(`newsletter:${await clientKey()}`);
  if (!limit.ok) {
    return { ok: false, message: "Too many submissions. Try again later." };
  }

  const email = parsed.data.email.toLowerCase();
  const html = brandedEmail({
    title: "Newsletter signup",
    intro: "Someone joined the REFORGE email list from the website footer.",
    rows: [{ label: "Email", value: email }],
  });

  const emailResult = await sendNotificationEmail({
    subject: `REFORGE newsletter: ${email}`,
    html,
  });

  const service = createSupabaseServiceClient();
  let stored = false;
  if (service) {
    const { data: existing } = await service
      .from("website_newsletter_subscribers")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return { ok: true, message: "You're already on the list." };
    }

    const { error } = await service.from("website_newsletter_subscribers").insert({
      email,
      source: "footer",
    });
    stored = !error;
  }

  if (!emailResult.sent && !stored) {
    return {
      ok: false,
      message: "Signup could not be stored yet. Email and database are not configured.",
    };
  }

  return { ok: true, message: "You're on the list." };
}
