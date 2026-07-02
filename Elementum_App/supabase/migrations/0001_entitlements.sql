-- ─────────────────────────────────────────────────────────────────────────────
-- 0001_entitlements.sql — server-side source of truth for what a user unlocked.
-- ─────────────────────────────────────────────────────────────────────────────
-- Birth data stays on-device (localStorage, DOC10 §3). This table holds ONLY
-- the entitlement + billing linkage — no astrology PII. Run once in the Supabase
-- SQL editor (or via `supabase db push`).
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.entitlements (
  user_id            uuid primary key references auth.users(id) on delete cascade,
  tier               text not null default 'free' check (tier in ('free','seeker','advisor')),
  has_founding       boolean not null default false,
  has_self_report    boolean not null default false,
  stripe_customer_id text,
  updated_at         timestamptz not null default now()
);

alter table public.entitlements enable row level security;

-- A signed-in user may READ only their own entitlement row.
create policy "read own entitlement"
  on public.entitlements for select
  using (auth.uid() = user_id);

-- NOTE: there is deliberately NO client insert/update/delete policy. Entitlements
-- are written ONLY by the Stripe webhook using the service-role key (which
-- bypasses RLS). That is what makes "paid" server-truth and unspoofable — the
-- client can never grant itself a tier.

-- Auto-create a free-tier row the moment a user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.entitlements (user_id) values (new.id)
  on conflict (user_id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
