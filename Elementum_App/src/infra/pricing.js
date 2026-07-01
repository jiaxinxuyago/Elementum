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

// Founding pass — beta-only one-time offer (the purchase is removed at official
// launch; buyers keep their access). Grants lifetime access at the tier below.
// FOUNDING_PRICE is display-only — set it to MATCH the price on your Stripe
// Payment Link. FOUNDING_GRANTS_TIER is the single source for what it unlocks.
export const FOUNDING_PRICE = '$49 once'; // PLACEHOLDER — match your Stripe link
export const FOUNDING_GRANTS_TIER = 'advisor';
