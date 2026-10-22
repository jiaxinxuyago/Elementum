// ─────────────────────────────────────────────────────────────────────────────
// INFRA · external links
// ─────────────────────────────────────────────────────────────────────────────
// Centralized home for outbound links so nothing is hard-coded across the UI
// (rule 4). Values are null until the Beta lights each one up; consumers must
// treat null as "not yet available" and hide/disable the affordance.
// ─────────────────────────────────────────────────────────────────────────────

// Stripe checkout / payment links, per pricing tier.
// TODO(beta): populate when Stripe is wired (see INF_01 backend architecture).
export const PAYMENT = {
  // Subscriptions (S6 A): one Payment Link per plan, each with metadata
  // plan=seeker|advisor (INF_02 §1.8). Null until the owner creates them.
  seekerCheckout: null,
  seekerAnnualCheckout: null,
  advisorCheckout: null,
  advisorAnnualCheckout: null,
  // Stripe Customer Portal login link (manage or cancel a subscription).
  billingPortal: null,
  // Founding pass — one-time LIVE Stripe Payment Link ($9, capped at 300 in
  // Stripe). Seeker for life plus 12 months of Advisor (S5 A).
  foundingCheckout: 'https://buy.stripe.com/fZu3coeb9dQwgihctm7Re00',
  // Self-Report — one-time LIVE Payment Link ($6.99). ⚠ The webhook routes
  // products by amount (workers/stripe-webhook PRODUCTS) — price changes in
  // Stripe must ship with a matching worker update.
  selfReportCheckout: 'https://buy.stripe.com/3cIcMY4Az8wcc21gJC7Re03',
};

// Social profiles.
export const SOCIAL = {
  instagram: null,
  tiktok: null,
  xiaohongshu: null,
  wechat: null,
};

// App-store listings.
export const APP_STORE = {
  ios: null,
  android: null,
};

// The live app. Used by the shareable identity card footer + the compatibility
// invite link, so both share the one canonical origin (rule 4, no hard-coding).
export const APP_URL = 'https://elementum.life';
// Bare host for display on the card face (no protocol).
export const APP_HOST = APP_URL.replace(/^https?:\/\//, '');
