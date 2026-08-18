export type DayKey = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export type ClassCategory =
  | "strength"
  | "conditioning"
  | "functional"
  | "mobility"
  | "other";

export type GymClass = {
  id: string;
  slug?: string;
  title: string;
  description: string | null;
  category: ClassCategory;
  startsAt: string;
  endsAt: string;
  durationMin: number;
  coachName: string;
  coachSlug?: string | null;
  level: string;
  capacity: number;
  enrolledCount: number | null;
  location: string;
  isPlaceholder?: boolean;
};

export type TrainingCategory = {
  slug: string;
  name: string;
  short: string;
  description: string;
  whoFor: string;
  benefits: string[];
  image: string;
};

export type Achievement = {
  code: string;
  title: string;
  description: string;
  category: string;
  rarity: "common" | "rare" | "epic" | "legendary";
};

export type ChallengeScoreType =
  | "lowest_time"
  | "highest_reps"
  | "highest_weight"
  | "highest_points"
  | "coach_score";

export type WeeklyChallengeStatus =
  | "draft"
  | "scheduled"
  | "live"
  | "closed"
  | "archived";

export type ChallengeMovement = {
  name: string;
  reps?: string | null;
  notes?: string | null;
};

export type LeaderboardEntry = {
  rank: number;
  athleteName: string;
  scoreDisplay: string;
  isPlaceholder?: boolean;
};

export type ChallengePodiumPlace = {
  place: 1 | 2 | 3;
  athleteName: string;
  scoreDisplay: string;
  isPlaceholder?: boolean;
};

export type WeeklyChallenge = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  instructions: string | null;
  workout: string | null;
  movements: ChallengeMovement[];
  rules: string[];
  scoreType: ChallengeScoreType;
  startsAt: string;
  endsAt: string;
  status: WeeklyChallengeStatus;
  participantCount: number | null;
  currentRecord: string | null;
  leaderboard: LeaderboardEntry[];
  podium: ChallengePodiumPlace[];
  isPlaceholder?: boolean;
};

export type Coach = {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  certifications: string[];
  philosophy: string;
  image: string;
  classTitles: string[];
  isPlaceholder: boolean;
};

export type CommunityPost = {
  id: string;
  authorName: string;
  authorRole: "member" | "coach" | "admin";
  body: string;
  image?: string | null;
  likeCount: number;
  commentCount: number;
  postType: "status" | "media" | "workout" | "pr" | "achievement" | "announcement";
  createdAt: string;
  featuredOnWebsite: boolean;
  isPlaceholder?: boolean;
};

export type StoreCategorySlug = "t-shirts" | "hoodies" | "socks" | "headwear";

export type ProductVariant = {
  id: string;
  size: string;
  stock: number | null;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  description: string;
  category: StoreCategorySlug;
  priceCents: number | null;
  currency: string;
  sizes: string[];
  variants: ProductVariant[];
  image: string;
  images: string[];
  featured: boolean;
  details: string | null;
  materials: string | null;
  isPlaceholderPrice: boolean;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  size: string;
  quantity: number;
  priceCents: number | null;
  currency: string;
};
