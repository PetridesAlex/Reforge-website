import {
  mockAchievements,
  mockChallenges,
  mockClasses,
  mockCoaches,
  mockCommunity,
  mockProducts,
  trainingCategories,
} from "@/lib/data/mock";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils/slug";
import type {
  Achievement,
  ClassCategory,
  Coach,
  CommunityPost,
  GymClass,
  Product,
  StoreCategorySlug,
  WeeklyChallenge,
} from "@/types";

function mapCategory(title: string): ClassCategory {
  const t = title.toLowerCase();
  if (t.includes("strength")) return "strength";
  if (t.includes("condition")) return "conditioning";
  if (t.includes("mobility")) return "mobility";
  if (t.includes("function") || t.includes("hyrox")) return "functional";
  return "other";
}

export async function getTrainingCategories() {
  return trainingCategories;
}

export async function getClasses(): Promise<GymClass[]> {
  if (!isSupabaseConfigured()) return mockClasses;
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return mockClasses;
    const { data, error } = await supabase
      .from("gym_classes")
      .select("id, coach_id, title, description, starts_at, ends_at, location, capacity, level")
      .gte("starts_at", new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString())
      .order("starts_at", { ascending: true })
      .limit(40);
    if (error || !data?.length) return mockClasses;

    return data.map((row) => {
      const starts = new Date(row.starts_at);
      const ends = new Date(row.ends_at);
      const durationMin = Math.max(
        1,
        Math.round((ends.getTime() - starts.getTime()) / 60_000),
      );
      return {
        id: row.id,
        title: row.title,
        description: row.description,
        category: mapCategory(row.title),
        startsAt: row.starts_at,
        endsAt: row.ends_at,
        durationMin,
        coachName: "REFORGE Coach",
        coachSlug: null,
        level: row.level,
        capacity: row.capacity,
        enrolledCount: null,
        location: row.location,
      };
    });
  } catch {
    return mockClasses;
  }
}

export async function getAchievements(): Promise<Achievement[]> {
  if (!isSupabaseConfigured()) return mockAchievements;
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return mockAchievements;
    const { data, error } = await supabase
      .from("achievements")
      .select("code, title, description, category, rarity")
      .eq("is_active", true)
      .order("title");
    if (error || !data?.length) return mockAchievements;
    return data.map((row) => ({
      code: row.code,
      title: row.title,
      description: row.description ?? "",
      category: row.category ?? "training",
      rarity: (row.rarity ?? "common") as Achievement["rarity"],
    }));
  } catch {
    return mockAchievements;
  }
}

export async function getChallenges(): Promise<WeeklyChallenge[]> {
  if (!isSupabaseConfigured()) return mockChallenges;
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return mockChallenges;
    const { data, error } = await supabase
      .from("weekly_challenges")
      .select(
        "id, name, description, instructions, movements, score_type, starts_at, ends_at, status",
      )
      .in("status", ["live", "closed", "scheduled"])
      .order("starts_at", { ascending: false })
      .limit(12);
    if (error || !data?.length) return mockChallenges;

    const challenges: WeeklyChallenge[] = [];
    for (const row of data) {
      const { data: podium } = await supabase
        .from("challenge_podium")
        .select("place, score_display, member_id")
        .eq("challenge_id", row.id)
        .order("place");

      const { data: results } = await supabase
        .from("challenge_results")
        .select("score_display, score_value, member_id")
        .eq("challenge_id", row.id)
        .eq("status", "verified")
        .limit(10);

      const movements = Array.isArray(row.movements) ? row.movements : [];
      challenges.push({
        id: row.id,
        slug: slugify(row.name) || row.id,
        name: row.name,
        description: row.description,
        instructions: row.instructions,
        workout: row.instructions,
        movements: movements.map((m: { name?: string; reps?: string; notes?: string }) => ({
          name: m.name ?? "Movement",
          reps: m.reps ?? null,
          notes: m.notes ?? null,
        })),
        rules: [
          "One verified score per athlete.",
          "Submit results through the REFORGE app.",
        ],
        scoreType: row.score_type,
        startsAt: row.starts_at,
        endsAt: row.ends_at,
        status: row.status,
        participantCount: results?.length ?? null,
        currentRecord: results?.[0]?.score_display ?? null,
        leaderboard: (results ?? []).map((r, i) => ({
          rank: i + 1,
          athleteName: "Athlete",
          scoreDisplay: r.score_display,
        })),
        podium: (podium ?? []).map((p) => ({
          place: p.place as 1 | 2 | 3,
          athleteName: "Athlete",
          scoreDisplay: p.score_display,
        })),
      });
    }
    return challenges;
  } catch {
    return mockChallenges;
  }
}

export async function getChallengeBySlug(slug: string) {
  const all = await getChallenges();
  return all.find((c) => c.slug === slug) ?? null;
}

export async function getCoaches(): Promise<Coach[]> {
  if (!isSupabaseConfigured()) return mockCoaches;
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return mockCoaches;
    const { data, error } = await supabase
      .from("coach_public_profiles")
      .select("id, full_name, avatar_url, community_bio, slug");
    if (error || !data?.length) return mockCoaches;
    return data.map((row) => ({
      id: row.id,
      slug: row.slug || slugify(row.full_name) || row.id,
      name: row.full_name,
      role: "Coach",
      bio: row.community_bio || "Coach profile forthcoming.",
      specialties: [],
      certifications: [],
      philosophy: "",
      image: row.avatar_url || "/images/gym/kettlebell-athlete.webp",
      classTitles: [],
      isPlaceholder: false,
    }));
  } catch {
    return mockCoaches;
  }
}

export async function getCoachBySlug(slug: string) {
  const coaches = await getCoaches();
  return coaches.find((c) => c.slug === slug) ?? null;
}

export async function getCommunityHighlights(): Promise<CommunityPost[]> {
  if (!isSupabaseConfigured()) return mockCommunity;
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return mockCommunity;
    const { data, error } = await supabase
      .from("community_posts")
      .select(
        "id, author_name, author_role, body, like_count, comment_count, post_type, created_at, featured_on_website",
      )
      .eq("featured_on_website", true)
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(12);
    if (error || !data?.length) return mockCommunity;
    return data.map((row) => ({
      id: row.id,
      authorName: row.author_name,
      authorRole: row.author_role,
      body: row.body,
      likeCount: row.like_count,
      commentCount: row.comment_count,
      postType: row.post_type,
      createdAt: row.created_at,
      featuredOnWebsite: true,
    }));
  } catch {
    return mockCommunity;
  }
}

function mapStoreCategory(slug: string | null): StoreCategorySlug {
  if (slug === "hoodies" || slug === "socks" || slug === "headwear" || slug === "t-shirts") {
    return slug;
  }
  return "t-shirts";
}

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return mockProducts;
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return mockProducts;
    const { data, error } = await supabase
      .from("store_products")
      .select(
        "id, slug, name, subtitle, description, status, price_cents, currency, featured, details, materials, category:store_categories(slug), images:store_product_images(public_url, alt_text, sort_order), variants:store_product_variants(id, size_label, stock_qty, active)",
      )
      .eq("status", "active")
      .order("featured", { ascending: false });
    if (error || !data?.length) return mockProducts;

    return data.map((row) => {
      const images = (row.images ?? [])
        .sort((a: { sort_order?: number }, b: { sort_order?: number }) =>
          (a.sort_order ?? 0) - (b.sort_order ?? 0),
        )
        .map((img: { public_url: string }) => img.public_url);
      const variants = (row.variants ?? [])
        .filter((v: { active?: boolean }) => v.active !== false)
        .map((v: { id: string; size_label?: string | null; stock_qty?: number }) => ({
          id: v.id,
          size: v.size_label ?? "OS",
          stock: v.stock_qty ?? null,
        }));
      const categoryRel = Array.isArray(row.category) ? row.category[0] : row.category;
      return {
        id: row.id,
        slug: row.slug,
        name: row.name,
        subtitle: row.subtitle,
        description: row.description ?? "",
        category: mapStoreCategory(categoryRel?.slug ?? null),
        priceCents: row.price_cents,
        currency: row.currency ?? "EUR",
        sizes: variants.map((v: { size: string }) => v.size),
        variants,
        image: images[0] || "/images/gym/reforge-store.webp",
        images: images.length ? images : ["/images/gym/reforge-store.webp"],
        featured: row.featured,
        details: row.details,
        materials: row.materials,
        isPlaceholderPrice: false,
      };
    });
  } catch {
    return mockProducts;
  }
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}
