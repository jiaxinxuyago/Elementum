// ─────────────────────────────────────────────────────────────────────────────
// INFRA · external links
// ─────────────────────────────────────────────────────────────────────────────
// Centralized home for outbound links so nothing is hard-coded across the UI
// (rule 4). Values are null until the Beta lights each one up; consumers must
// treat null as "not yet available" and hide/disable the affordance.
// ─────────────────────────────────────────────────────────────────────────────

// Stripe checkout / payment links, per pricing tier.
// TODO(beta): populate when Stripe is wired (see DOC10 backend architecture).
export const PAYMENT = {
  seekerCheckout: null,
  advisorCheckout: null,
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
