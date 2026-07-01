// ─────────────────────────────────────────────────────────────────────────────
// INFRA · external service endpoints
// ─────────────────────────────────────────────────────────────────────────────
// The single source of truth for third-party API URLs the client talks to.
// No URLs hard-coded in services/components — they import from here (rule 4).
// ─────────────────────────────────────────────────────────────────────────────

// Open-Meteo geocoding API — free, no key required.
// Docs: https://open-meteo.com/en/docs/geocoding-api
export const GEOCODING = {
  search: 'https://geocoding-api.open-meteo.com/v1/search',
};
