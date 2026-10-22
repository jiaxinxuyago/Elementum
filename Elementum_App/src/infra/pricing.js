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
// Annual plans (S6 A): the default offer; a 7-day free trial on annual only.
export const TIER_PRICES_ANNUAL = { seeker: '$59.99/yr', advisor: '$119.99/yr' };

// One-time Self-Report add-on (Seeker tier).
export const SELF_REPORT_PRICE = '$6.99';

// Founding pass — beta-only one-time offer, capped at 300 and removed at public
// launch (S5 A, 2026-10-22). Buyers from then get Seeker for life plus Advisor
// for 12 months (the webhook writes advisor_until; src/infra/entitlement.js);
// buyers before keep Advisor for life. FOUNDING_PRICE is display-only — set it
// to MATCH the Stripe Payment Link. FOUNDING_GRANTS_TIER is the tier a new buyer
// holds right after purchase.
export const FOUNDING_PRICE = '$9 once'; // matches the Stripe Payment Link ($9.00)
export const FOUNDING_GRANTS_TIER = 'advisor';
