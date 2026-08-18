import type {
  Achievement,
  Coach,
  CommunityPost,
  GymClass,
  Product,
  TrainingCategory,
  WeeklyChallenge,
} from "@/types";

export const DATA_MODE_NOTICE =
  "Sample content for the public website. Live data loads from Supabase when connected.";

export const trainingCategories: TrainingCategory[] = [
  {
    slug: "strength",
    name: "Strength",
    short: "Build force under control.",
    description:
      "Barbell, dumbbell, and kettlebell work designed to develop real strength — not just fatigue. Sessions focus on progressive loading, quality positions, and the lifts that transfer to everything else you do.",
    whoFor:
      "Athletes who want a stronger base for sport, Hyrox-style events, or everyday performance.",
    benefits: [
      "Progressive strength development",
      "Better positions under load",
      "Measurable personal records",
    ],
    image: "/images/training/strength.webp",
  },
  {
    slug: "conditioning",
    name: "Conditioning",
    short: "Engine work that stays honest.",
    description:
      "Intervals, mixed-modal pieces, and aerobic capacity sessions that build the engine without wasting the work. Conditioning at REFORGE is programmed — not random.",
    whoFor: "Athletes building work capacity, race fitness, or a durable engine.",
    benefits: [
      "Sustainable engine development",
      "Repeatable high-output work",
      "Smarter recovery between efforts",
    ],
    image: "/images/training/conditioning.webp",
  },
  {
    slug: "functional",
    name: "Functional Training",
    short: "Move well. Move with purpose.",
    description:
      "Full-body sessions that blend strength, skill, and conditioning. Built for athletes who train for life and performance — not isolation for its own sake.",
    whoFor: "Members who want complete sessions that transfer beyond the studio floor.",
    benefits: [
      "Integrated movement patterns",
      "Work capacity under mixed demand",
      "Training that stays relevant",
    ],
    image: "/images/training/functional.webp",
  },
  {
    slug: "hyrox",
    name: "Hyrox-style Training",
    short: "Race-ready mixed work.",
    description:
      "Station-based running and functional work inspired by Hyrox-style competition. Not a race license page — a training lens for athletes who want that style of demand.",
    whoFor: "Athletes preparing for mixed running and station work, or who want that stimulus in training.",
    benefits: [
      "Run + station pairing",
      "Race-pace exposure",
      "Grit with structure",
    ],
    image: "/images/gym/dumbbells-wod.webp",
  },
  {
    slug: "mobility",
    name: "Mobility",
    short: "Range you can actually use.",
    description:
      "Targeted mobility and restoration so strength work stays available. Positions, breathing, and tissue care that support the rest of the week.",
    whoFor: "Anyone training hard who wants to keep moving well under load.",
    benefits: [
      "Usable range of motion",
      "Better positions in lifts",
      "Recovery that supports output",
    ],
    image: "/images/training/mobility.webp",
  },
  {
    slug: "performance",
    name: "Performance",
    short: "Train with intent.",
    description:
      "Programming that tracks progress — sessions, streaks, personal bests, and challenge performance. The work is the point. The data proves it.",
    whoFor: "Athletes who want training to be measurable, not vague.",
    benefits: [
      "Clear session intent",
      "Progress you can see",
      "Standards that raise the floor",
    ],
    image: "/images/training/performance.webp",
  },
  {
    slug: "personal-coaching",
    name: "Personal Coaching",
    short: "Your work. Coached.",
    description:
      "One-to-one and small-group coaching with REFORGE coaches. Programming, accountability, and feedback built around your training.",
    whoFor: "Members who want a coach in their corner — not a generic plan.",
    benefits: [
      "Individual programming",
      "Direct coach feedback",
      "Accountability that sticks",
    ],
    image: "/images/training/coaching.webp",
  },
];

function nextWeekday(day: number, hour: number, minute = 0) {
  const now = new Date();
  const date = new Date(now);
  const delta = (day + 7 - now.getDay()) % 7;
  date.setDate(now.getDate() + (delta === 0 && now.getHours() >= hour ? 7 : delta));
  date.setHours(hour, minute, 0, 0);
  return date;
}

function classSlot(
  id: string,
  title: string,
  category: GymClass["category"],
  day: number,
  hour: number,
  durationMin: number,
  coachName: string,
  level: string,
  capacity: number,
): GymClass {
  const starts = nextWeekday(day, hour);
  const ends = new Date(starts.getTime() + durationMin * 60_000);
  return {
    id,
    title,
    description: null,
    category,
    startsAt: starts.toISOString(),
    endsAt: ends.toISOString(),
    durationMin,
    coachName,
    coachSlug: coachName === "Andreas Petrides" ? "andreas-petrides" : null,
    level,
    capacity,
    enrolledCount: null,
    location: "Studio Floor",
    isPlaceholder: true,
  };
}

/** Sample timetable until live gym_classes data is connected. */
export const mockClasses: GymClass[] = [
  classSlot("c-mon-str", "STRENGTH", "strength", 1, 18, 60, "Andreas Petrides", "All levels", 12),
  classSlot("c-mon-cond", "CONDITIONING", "conditioning", 1, 19, 45, "REFORGE Coach", "All levels", 12),
  classSlot("c-tue-fun", "FUNCTIONAL", "functional", 2, 18, 60, "Andreas Petrides", "All levels", 12),
  classSlot("c-tue-mob", "MOBILITY", "mobility", 2, 19, 45, "REFORGE Coach", "All levels", 12),
  classSlot("c-wed-str", "STRENGTH", "strength", 3, 7, 60, "Andreas Petrides", "All levels", 12),
  classSlot("c-wed-hyx", "HYROX-STYLE", "functional", 3, 18, 60, "REFORGE Coach", "Intermediate", 12),
  classSlot("c-thu-cond", "CONDITIONING", "conditioning", 4, 18, 45, "Andreas Petrides", "All levels", 12),
  classSlot("c-thu-str", "STRENGTH", "strength", 4, 19, 60, "REFORGE Coach", "All levels", 12),
  classSlot("c-fri-fun", "FUNCTIONAL", "functional", 5, 18, 60, "Andreas Petrides", "All levels", 12),
  classSlot("c-sat-perf", "PERFORMANCE", "other", 6, 9, 75, "Andreas Petrides", "All levels", 14),
  classSlot("c-sat-mob", "MOBILITY", "mobility", 6, 11, 45, "REFORGE Coach", "All levels", 12),
  classSlot("c-sun-str", "STRENGTH", "strength", 0, 10, 60, "REFORGE Coach", "All levels", 12),
];

export const mockAchievements: Achievement[] = [
  { code: "first_session", title: "FIRST SESSION", description: "Complete your first REFORGE workout.", category: "training", rarity: "common" },
  { code: "sessions_10", title: "10 WORKOUTS", description: "Complete 10 workouts.", category: "training", rarity: "common" },
  { code: "sessions_25", title: "25 WORKOUTS", description: "Complete 25 workouts.", category: "training", rarity: "rare" },
  { code: "sessions_50", title: "50 WORKOUTS", description: "Complete 50 workouts.", category: "training", rarity: "rare" },
  { code: "sessions_100", title: "100 WORKOUTS", description: "Complete 100 workouts.", category: "training", rarity: "epic" },
  { code: "streak_7", title: "7 DAY STREAK", description: "Train seven days in a row.", category: "consistency", rarity: "rare" },
  { code: "weekly_champion", title: "CHALLENGE WINNER", description: "Win a weekly REFORGE challenge.", category: "challenges", rarity: "legendary" },
  { code: "weekly_bronze", title: "PODIUM FINISH", description: "Finish on the weekly challenge podium.", category: "challenges", rarity: "epic" },
  { code: "new_pr", title: "PERSONAL BEST", description: "Set a personal record.", category: "performance", rarity: "rare" },
];

const challengeWeekStart = nextWeekday(1, 0);
const challengeWeekEnd = new Date(challengeWeekStart.getTime() + 7 * 86_400_000 - 60_000);

export const mockChallenges: WeeklyChallenge[] = [
  {
    id: "ch-current",
    slug: "engine-week",
    name: "ENGINE WEEK",
    description:
      "A mixed conditioning piece scored on time. Sample challenge content until live weekly_challenges data is connected.",
    instructions: "Complete the prescribed work for time. Log your result in the REFORGE app.",
    workout: "For time: 3 rounds — 20 kettlebell swings, 15 burpees, 400m run.",
    movements: [
      { name: "Kettlebell swings", reps: "20" },
      { name: "Burpees", reps: "15" },
      { name: "Run", reps: "400m" },
    ],
    rules: [
      "One verified score per athlete.",
      "Movement standards as posted by coaching staff.",
      "Results submitted through the REFORGE app.",
    ],
    scoreType: "lowest_time",
    startsAt: challengeWeekStart.toISOString(),
    endsAt: challengeWeekEnd.toISOString(),
    status: "live",
    participantCount: null,
    currentRecord: null,
    leaderboard: [
      { rank: 1, athleteName: "Athlete 01", scoreDisplay: "—", isPlaceholder: true },
      { rank: 2, athleteName: "Athlete 02", scoreDisplay: "—", isPlaceholder: true },
      { rank: 3, athleteName: "Athlete 03", scoreDisplay: "—", isPlaceholder: true },
    ],
    podium: [],
    isPlaceholder: true,
  },
  {
    id: "ch-past-1",
    slug: "iron-standard",
    name: "IRON STANDARD",
    description: "Past challenge placeholder — winner data is not live.",
    instructions: null,
    workout: "Max unbroken kettlebell swings.",
    movements: [{ name: "Kettlebell swings", reps: "Max" }],
    rules: ["Verified scores only."],
    scoreType: "highest_reps",
    startsAt: new Date(challengeWeekStart.getTime() - 14 * 86_400_000).toISOString(),
    endsAt: new Date(challengeWeekStart.getTime() - 7 * 86_400_000).toISOString(),
    status: "closed",
    participantCount: null,
    currentRecord: null,
    leaderboard: [],
    podium: [
      { place: 1, athleteName: "Winner forthcoming", scoreDisplay: "—", isPlaceholder: true },
      { place: 2, athleteName: "Runner-up forthcoming", scoreDisplay: "—", isPlaceholder: true },
      { place: 3, athleteName: "Bronze forthcoming", scoreDisplay: "—", isPlaceholder: true },
    ],
    isPlaceholder: true,
  },
];

export const mockCoaches: Coach[] = [
  {
    id: "coach-andreas",
    slug: "andreas-petrides",
    name: "Andreas Petrides",
    role: "Owner / Coach",
    bio: "Founder of REFORGE. Full biography, specialties, and certifications will be published here once confirmed.",
    specialties: ["Placeholder — specialties forthcoming"],
    certifications: ["Placeholder — certifications forthcoming"],
    philosophy:
      "Training, performance, community, consistency. The work is the standard.",
    image: "/images/gym/kettlebell-athlete.webp",
    classTitles: ["STRENGTH", "FUNCTIONAL", "CONDITIONING", "PERFORMANCE"],
    isPlaceholder: true,
  },
  {
    id: "coach-02",
    slug: "coach-02",
    name: "Coach 02",
    role: "Coach",
    bio: "Placeholder coach profile. Name, photo, and credentials will be added when confirmed.",
    specialties: ["Placeholder — specialties forthcoming"],
    certifications: ["Placeholder — certifications forthcoming"],
    philosophy: "Placeholder — training philosophy forthcoming.",
    image: "/images/gym/kettlebell-portrait.webp",
    classTitles: [],
    isPlaceholder: true,
  },
  {
    id: "coach-03",
    slug: "coach-03",
    name: "Coach 03",
    role: "Coach",
    bio: "Placeholder coach profile. Name, photo, and credentials will be added when confirmed.",
    specialties: ["Placeholder — specialties forthcoming"],
    certifications: ["Placeholder — certifications forthcoming"],
    philosophy: "Placeholder — training philosophy forthcoming.",
    image: "/images/gym/athlete-dumbbells.webp",
    classTitles: [],
    isPlaceholder: true,
  },
];

export const mockCommunity: CommunityPost[] = [
  {
    id: "post-1",
    authorName: "REFORGE",
    authorRole: "admin",
    body: "Sample coach announcement. Live community highlights appear here only when a post is explicitly featured for the website.",
    image: "/images/gym/studio-floor.webp",
    likeCount: 0,
    commentCount: 0,
    postType: "announcement",
    createdAt: new Date().toISOString(),
    featuredOnWebsite: true,
    isPlaceholder: true,
  },
  {
    id: "post-2",
    authorName: "Athlete",
    authorRole: "member",
    body: "Sample training highlight. Private member posts are never shown on the public site.",
    image: "/images/gym/iron-plates.webp",
    likeCount: 0,
    commentCount: 0,
    postType: "media",
    createdAt: new Date().toISOString(),
    featuredOnWebsite: true,
    isPlaceholder: true,
  },
  {
    id: "post-3",
    authorName: "Athlete",
    authorRole: "member",
    body: "Sample achievement moment. Featured content is curated — not a live member feed.",
    image: "/images/gym/kettlebell-still.webp",
    likeCount: 0,
    commentCount: 0,
    postType: "achievement",
    createdAt: new Date().toISOString(),
    featuredOnWebsite: true,
    isPlaceholder: true,
  },
];

export const mockProducts: Product[] = [
  {
    id: "p-tee",
    slug: "reforge-t-shirt",
    name: "REFORGE T-Shirt",
    subtitle: "Training staple",
    description:
      "REFORGE training tee. Product details, materials, and live pricing load from the store catalog when Supabase is connected.",
    category: "t-shirts",
    priceCents: null,
    currency: "EUR",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      { id: "p-tee-s", size: "S", stock: null },
      { id: "p-tee-m", size: "M", stock: null },
      { id: "p-tee-l", size: "L", stock: null },
      { id: "p-tee-xl", size: "XL", stock: null },
    ],
    image: "/images/gym/reforge-store.webp",
    images: ["/images/gym/reforge-store.webp", "/images/gym/urban-gym.webp"],
    featured: true,
    details: "Placeholder product copy until the live catalog is connected.",
    materials: null,
    isPlaceholderPrice: true,
  },
  {
    id: "p-hoodie",
    slug: "reforge-hoodie",
    name: "REFORGE Hoodie",
    subtitle: "Studio layer",
    description: "REFORGE hoodie. Live stock and pricing come from the store catalog.",
    category: "hoodies",
    priceCents: null,
    currency: "EUR",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      { id: "p-hoodie-s", size: "S", stock: null },
      { id: "p-hoodie-m", size: "M", stock: null },
      { id: "p-hoodie-l", size: "L", stock: null },
      { id: "p-hoodie-xl", size: "XL", stock: null },
    ],
    image: "/images/gym/urban-gym.webp",
    images: ["/images/gym/urban-gym.webp"],
    featured: true,
    details: "Placeholder product copy until the live catalog is connected.",
    materials: null,
    isPlaceholderPrice: true,
  },
  {
    id: "p-socks",
    slug: "reforge-socks",
    name: "REFORGE Socks",
    subtitle: "Session pair",
    description: "REFORGE socks. Details confirmed from the live catalog.",
    category: "socks",
    priceCents: null,
    currency: "EUR",
    sizes: ["S/M", "L/XL"],
    variants: [
      { id: "p-socks-sm", size: "S/M", stock: null },
      { id: "p-socks-lxl", size: "L/XL", stock: null },
    ],
    image: "/images/gym/iron-plates.webp",
    images: ["/images/gym/iron-plates.webp"],
    featured: true,
    details: null,
    materials: null,
    isPlaceholderPrice: true,
  },
  {
    id: "p-hat",
    slug: "reforge-hat",
    name: "REFORGE Hat",
    subtitle: "Studio cap",
    description: "REFORGE hat. Details confirmed from the live catalog.",
    category: "headwear",
    priceCents: null,
    currency: "EUR",
    sizes: ["OS"],
    variants: [{ id: "p-hat-os", size: "OS", stock: null }],
    image: "/images/gym/rack-dumbbells.webp",
    images: ["/images/gym/rack-dumbbells.webp"],
    featured: true,
    details: null,
    materials: null,
    isPlaceholderPrice: true,
  },
];
