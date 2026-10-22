// ─────────────────────────────────────────────────────────────────────────────
// INFRA · effective tier
// ─────────────────────────────────────────────────────────────────────────────
// One rule for what an entitlement row unlocks, shared by the app
// (store/chartContext.jsx) and the llm worker. The row's `tier` is the lifetime
// base; a Founding term (`advisor_until`, S5 A) and a live subscription
// (`sub_tier` + `sub_status`, S6 A) can only raise it. Columns from migration
// 0005 may be absent on an older row: absent reads as "nothing extra".
// ─────────────────────────────────────────────────────────────────────────────

const RANK = { free: 0, seeker: 1, advisor: 2 };
const BY_RANK = ['free', 'seeker', 'advisor'];
// past_due keeps access while Stripe retries the card (its dunning window).
const LIVE_SUB = new Set(['active', 'trialing', 'past_due']);

export function effectiveTier(row, now = Date.now()) {
  if (!row) return 'free';
  let rank = RANK[row.tier] ?? 0;
  if (row.advisor_until && Date.parse(row.advisor_until) > now) rank = Math.max(rank, RANK.advisor);
  if (row.sub_tier && LIVE_SUB.has(row.sub_status)) rank = Math.max(rank, RANK[row.sub_tier] ?? 0);
  return BY_RANK[rank];
}
