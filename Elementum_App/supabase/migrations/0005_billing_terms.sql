-- ─────────────────────────────────────────────────────────────────────────────
-- 0005_billing_terms.sql — the Founding Pass term and subscriptions (BIZ_05 S5 A,
-- S6 A, owner 2026-10-22). Run once in the Supabase SQL editor BEFORE deploying
-- the stripe-webhook and llm workers that write and read these columns.
-- ─────────────────────────────────────────────────────────────────────────────
-- tier          stays the lifetime base tier (free · seeker · advisor). Founding
--               buyers before this migration keep 'advisor' for life.
-- advisor_until a Founding buyer from now on gets tier 'seeker' for life plus
--               Advisor until this time (12 months from purchase).
-- sub_tier      the plan of a Stripe subscription (seeker · advisor), written
--               only by subscription events; it never overwrites tier.
-- sub_status    the Stripe subscription status (active, trialing, past_due,
--               canceled, unpaid, incomplete, incomplete_expired, paused).
-- The effective tier is the highest of the three (src/infra/entitlement.js).
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.entitlements
  add column if not exists advisor_until timestamptz,
  add column if not exists sub_tier text check (sub_tier in ('seeker','advisor')),
  add column if not exists sub_status text;

-- Subscription events find the user by their Stripe customer id.
create index if not exists entitlements_stripe_customer_idx
  on public.entitlements (stripe_customer_id);
