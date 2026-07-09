-- ─────────────────────────────────────────────────────────────────────────────
-- 0002_push_subscriptions.sql — Web Push subscriptions (INF_01 §4.4)
-- ─────────────────────────────────────────────────────────────────────────────
-- One row per subscribed device. Deliberately minimal + privacy-preserving:
-- a push endpoint, its crypto keys, and the preferred send hour. NO birth data,
-- NO chart. user_id is optional (anonymous users can subscribe; linked when a
-- session exists, cleared if the account is deleted).
--
-- RLS is enabled with NO client policies: all reads/writes go through the
-- elementum-push Worker (service-role), so the client never touches this table.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.push_subscriptions (
  endpoint   text primary key,
  p256dh     text not null,
  auth       text not null,
  user_id    uuid references auth.users(id) on delete set null,
  utc_hour   smallint not null default 8 check (utc_hour between 0 and 23),
  created_at timestamptz not null default now()
);

alter table public.push_subscriptions enable row level security;
-- (no policies on purpose — service-role Worker access only)

create index if not exists push_subscriptions_utc_hour_idx
  on public.push_subscriptions (utc_hour);
