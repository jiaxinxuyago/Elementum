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
  // Founding pass — one-time Stripe Payment Link (Test mode first). Grants
  // lifetime Advisor access. Stays null until you paste the link URL; the
  // Founding card hides itself while null. TODO(founding): paste Payment Link.
  foundingCheckout: null,
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
