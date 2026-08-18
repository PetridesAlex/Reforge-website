-- PROPOSED MIGRATION — do not apply without approval.
-- Intended for the shared REFORGE Supabase project used by the mobile app.
-- This file lives in the website repo as documentation only.
-- Do NOT apply against production until reviewed.
--
-- Purpose: public website access without exposing private member data.

-- 1) Community: explicit website feature flag
alter table public.community_posts
  add column if not exists featured_on_website boolean not null default false;

create index if not exists community_posts_featured_website_idx
  on public.community_posts (featured_on_website, created_at desc)
  where featured_on_website = true and deleted_at is null;

drop policy if exists "community_posts_website_featured" on public.community_posts;
create policy "community_posts_website_featured" on public.community_posts
  for select
  using (featured_on_website = true and deleted_at is null);

-- 2) Public coach view (no email / phone)
create or replace view public.coach_public_profiles
with (security_invoker = true) as
select
  p.id,
  p.full_name,
  p.avatar_url,
  p.community_bio,
  coalesce(p.username, replace(lower(p.full_name), ' ', '-')) as slug
from public.profiles p
where p.role in ('coach', 'admin')
  and coalesce(p.roster_active, true) = true;

-- Anon cannot read profiles today. Prefer a security definer view if invoker
-- cannot see rows. Review before granting:
-- grant select on public.coach_public_profiles to anon, authenticated;

-- Recommended alternative (security definer, columns only):
create or replace function public.list_coach_public_profiles()
returns table (
  id uuid,
  full_name text,
  avatar_url text,
  community_bio text,
  slug text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    p.id,
    p.full_name,
    p.avatar_url,
    p.community_bio,
    coalesce(nullif(p.username, ''), replace(lower(p.full_name), ' ', '-')) as slug
  from public.profiles p
  where p.role in ('coach', 'admin')
    and coalesce(p.roster_active, true) = true;
$$;

grant execute on function public.list_coach_public_profiles() to anon, authenticated;

-- 3) Website leads — no public read
create table if not exists public.website_membership_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  experience text,
  goal text,
  preferred_training text,
  contact_method text,
  notes text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.website_contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  interested_in text,
  created_at timestamptz not null default now()
);

alter table public.website_membership_leads enable row level security;
alter table public.website_contact_inquiries enable row level security;

-- Inserts are performed server-side with the service role. No anon policies.
