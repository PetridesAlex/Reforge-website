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
