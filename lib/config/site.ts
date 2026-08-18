export const siteConfig = {
  name: "REFORGE",
  legalName: "REFORGE",
  tagline: "Forge your strongest self.",
  description:
    "Performance-driven training. Real community. Measurable progress.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  studio: {
    name: "REFORGE",
    venue: "City Box Gym",
    street: "Augoustas Theodoras 9",
    city: "Limassol",
    region: "Lemesos",
    postal: "3035",
    country: "Cyprus",
    phoneDisplay: "+357 99 860056",
    phoneE164: "+35799860056",
    owner: "Andreas Petrides",
    mapsQuery: "City Box Gym, Augoustas Theodoras 9, Limassol 3035, Cyprus",
  },
  /**
   * Stats are placeholders until official figures are supplied.
   * Do not treat these as live gym metrics.
   */
  stats: {
    athletes: { value: "500+", label: "Athletes", placeholder: true },
    weeklySessions: { value: "40+", label: "Weekly sessions", placeholder: true },
    coaches: { value: "10+", label: "Coaches", placeholder: true },
    community: { value: "1", label: "Community", placeholder: true },
  },
  /** Override with the numeric App Store URL once Apple assigns an ID. */
  appStoreUrl:
    process.env.NEXT_PUBLIC_APP_STORE_URL || "https://apps.apple.com/cy/app/reforge",
  playStoreUrl:
    process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
    "https://play.google.com/store/apps/details?id=cy.reforge.app",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
  whatsappUrl: `https://wa.me/35799860056`,
  checkoutEnabled: false,
  store: {
    shipsTo: "Cyprus",
    pickupLabel: "Pickup at City Box Gym",
    pickupDetail: "Augoustas Theodoras 9, Limassol 3035",
    deliveryLabel: "Cyprus delivery",
    deliveryDetail: "Island-wide. Sample rate until live shipping is connected.",
    pickupCents: 0,
    cyprusDeliveryCents: 500,
    isPlaceholderShipping: true,
    isPlaceholderCatalog: true,
  },
  email: {
    contactTo: process.env.RESEND_TO_EMAIL ?? null,
    from: process.env.RESEND_FROM_EMAIL ?? null,
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/training", label: "Training" },
  { href: "/classes", label: "Classes" },
  { href: "/challenges", label: "Challenges" },
  { href: "/community", label: "Community" },
  { href: "/coaches", label: "Coaches" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
] as const;

export const footerNav = {
  training: [
    { href: "/training", label: "Training" },
    { href: "/classes", label: "Classes" },
    { href: "/challenges", label: "Challenges" },
    { href: "/community", label: "Community" },
    { href: "/coaches", label: "Coaches" },
    { href: "/store", label: "Store" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/join", label: "Join" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/cookies", label: "Cookies" },
    { href: "/terms", label: "Terms" },
  ],
} as const;
