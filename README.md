# REFORGE Website

Public marketing site for **REFORGE** — a performance training studio in Limassol.

This is not the REFORGE mobile app. The Expo / React Native app remains a separate codebase. The website and the app may share Supabase data. They do not share frontend code.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Supabase
- Resend
- Framer Motion
- Lucide icons
- Deployed on Vercel

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local`. Names only — never commit secret values.

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical URL, sitemap, Open Graph |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Anon key (RLS-enforced) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Lead / inquiry inserts. Never expose to the browser. |
| `RESEND_API_KEY` | Server only | Transactional email. Never expose to the browser. |
| `RESEND_FROM_EMAIL` | Server only | Verified Resend from address |
| `RESEND_TO_EMAIL` | Server only | Inbox that receives inquiries |

Without Supabase or Resend configured, the site runs on typed mock data. Forms will report that email/database are not configured.

## Supabase setup

1. Use the existing REFORGE Supabase project (same as the mobile app).
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Public reads that already work under current RLS:
   - `gym_classes`
   - `workouts_of_the_day`
   - `store_products` (active)
   - `achievements`
   - `weekly_challenges` (live / closed / scheduled)
   - verified `challenge_results` and `challenge_podium`
4. Do **not** apply schema changes without review.

A proposed migration lives at `supabase/migrations/043_website_public_access.sql`. It is documentation only until approved. It covers:

- `featured_on_website` on community posts
- public coach listing without email/phone
- `website_membership_leads` and `website_contact_inquiries` (no public read)

Until that migration is applied, coaches, community highlights, and lead storage use mocks / skip inserts.

## Resend setup

1. Create a Resend account and verify a sending domain.
2. Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `RESEND_TO_EMAIL`.
3. Contact and membership forms send from Server Actions only.

## Commands

```bash
npm run dev
npm run lint
npm run build
npm start
```

## Vercel deployment

1. Import this repository into Vercel.
2. Set the environment variables above (Production + Preview as needed).
3. Deploy. Framework preset: Next.js.

Do not add `SUPABASE_SERVICE_ROLE_KEY` or `RESEND_API_KEY` to client-side config.

## Project structure

```
app/                 App Router pages, sitemap, robots, server actions
components/          Layout, homepage, domain, UI, forms
lib/                 Config, data, supabase, email, store, validation
types/               Shared TypeScript types
public/              Brand and photography
emails/              HTML email shell
supabase/migrations  Proposed SQL (not auto-applied)
```

## Content notes

Business facts that are not confirmed are labeled as placeholders (statistics, sample timetable, catalog prices, extra coach profiles, community highlights). Studio address and phone come from the existing REFORGE studio record. App Store / Play links use the Android package `cy.reforge.app`; set `NEXT_PUBLIC_APP_STORE_URL` to the numeric Apple listing when it is live.

## Relationship to the mobile app

```
REFORGE mobile app (Expo)  →  Supabase  ←  This Next.js website
```

Never introduce Expo dependencies here. Never introduce Next.js dependencies into the mobile app.
