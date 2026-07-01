// ─────────────────────────────────────────────────────────────────────────────
// INFRA · pricing config
// ─────────────────────────────────────────────────────────────────────────────
// Commercial config — subscription tiers, display labels, and display prices —
// in one place so a price change is a single edit (no literals scattered across
// screens). Display strings only; the Stripe checkout links live in links.js.
// ─────────────────────────────────────────────────────────────────────────────

export const TIERS = ['free', 'seeker', 'advisor'];
export const TIER_LABELS = { free: 'Free', seeker: 'Seeker', advisor: 'Advisor' };
export const TIER_PRICES = { free: '$0', seeker: '$9.99/mo', advisor: '$19.99/mo' };

// One-time Self-Report add-on (Seeker tier).
export const SELF_REPORT_PRICE = '$6.99';
