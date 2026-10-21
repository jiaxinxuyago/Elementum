-- ─────────────────────────────────────────────────────────────────────────────
-- 0004_push_schedule.sql — Your Almanac reminders (EVT-1, owner P1 A · P4 A)
-- ─────────────────────────────────────────────────────────────────────────────
-- The phone posts the next five weeks of marked days as dates and codes
-- ([{ "date": "2026-10-27", "code": "Wood.action.grow:clash.month" }]) and its
-- UTC offset in minutes, so the hourly cron knows the reader's local date.
-- Still NO birth data and NO chart. Applied by the owner in the Supabase SQL
-- editor; the worker reads these columns only when ALMANAC_PUSH = '1'.
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.push_subscriptions
  add column if not exists schedule  jsonb,
  add column if not exists tz_offset smallint not null default 0
    check (tz_offset between -840 and 840);
