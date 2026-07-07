-- ─────────────────────────────────────────────────────────────────────────────
-- 0003_llm_usage.sql — AI Consultant usage counters (DOC10 §4.3)
-- ─────────────────────────────────────────────────────────────────────────────
-- One row per user per day: message count + token totals. Powers the 30/day
-- per-user cap and the monthly budget kill-switch in the elementum-llm Worker.
-- NO conversation content is ever stored (owner decision — chats live
-- on-device only). RLS enabled with no client policies: worker-only access.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.llm_usage (
  user_id    uuid not null references auth.users(id) on delete cascade,
  day        date not null,
  msgs       integer not null default 0,
  tokens_in  bigint  not null default 0,
  tokens_out bigint  not null default 0,
  primary key (user_id, day)
);

alter table public.llm_usage enable row level security;
-- (no policies on purpose — the elementum-llm Worker writes via service role)

create index if not exists llm_usage_day_idx on public.llm_usage (day);
