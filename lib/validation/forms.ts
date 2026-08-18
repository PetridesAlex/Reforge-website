import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().min(2, "Subject is required").max(160),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(4000),
  interestedIn: z
    .enum(["membership", "personal-training", "classes", "corporate", "other", ""])
    .optional(),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const membershipSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(6, "Phone is required").max(40),
  experience: z.enum(["beginner", "intermediate", "advanced", "athlete"]),
  goal: z.enum([
    "build-strength",
    "lose-fat",
    "improve-fitness",
    "performance",
    "community",
    "other",
  ]),
  preferredTraining: z.enum([
    "strength",
    "conditioning",
    "functional",
    "hyrox",
    "mobility",
    "personal-coaching",
    "unsure",
  ]),
  contactMethod: z.enum(["email", "phone", "whatsapp"]),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type MembershipInput = z.infer<typeof membershipSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(160),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const orderSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(6, "Phone is required").max(40),
  shipping: z.enum(["pickup", "cyprus"]),
  street: z.string().trim().max(160).optional().or(z.literal("")),
  city: z.enum(["Limassol", "Nicosia", "Larnaca", "Paphos", "Famagusta", ""]).optional(),
  postal: z.string().trim().max(12).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  cart: z.string().min(2, "Cart is empty"),
  website: z.string().max(0).optional().or(z.literal("")),
}).superRefine((data, ctx) => {
  if (data.shipping === "cyprus") {
    if (!data.street || data.street.length < 4) {
      ctx.addIssue({ code: "custom", path: ["street"], message: "Street is required for delivery" });
    }
    if (!data.city) {
      ctx.addIssue({ code: "custom", path: ["city"], message: "City is required for delivery" });
    }
    if (!data.postal || data.postal.length < 3) {
      ctx.addIssue({ code: "custom", path: ["postal"], message: "Postal code is required for delivery" });
    }
  }
});

export type OrderInput = z.infer<typeof orderSchema>;
