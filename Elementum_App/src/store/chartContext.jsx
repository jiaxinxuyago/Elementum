// ===================================================================
// ELEMENTUM · ChartContext
// Holds birthData (collected through onboarding), the computed chart
// (set after LoadingScreen triggers calculateBaziChart), and the
// optional-path flags (approximateHour, hourUnknown, preferNotToSay,
// customNotifyTime). Provider wraps the whole app in App.jsx.
// ===================================================================

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { calculateBaziChart, ENGINE_VERSION } from '../engine/index.js';
import { supabase } from '../infra/supabase.js';
import { useAuth } from './authContext.jsx';

const ChartContext = createContext(null);

const INITIAL_BIRTH_DATA = {
  year: null,
  month: null,       // 1–12
  day: null,         // 1–31
  hour: null,        // 0–23 (exact) OR null if unknown
  hourWindow: null,  // one of: 'late-night' | 'early' | 'morning' | 'midday' | 'afternoon' | 'evening'
  hourUnknown: false,
  // Location. If the user picked a geocoded suggestion in Step 5, `location`
  // is an object { name, longitude, latitude, country, admin1, … }. If the
  // user typed freeform text without selecting a suggestion, `location` is
  // a plain string. Either way the calc layer resolves a longitude out of it
  // via resolveLongitudeForCalc().
  location: '',
  gender: null,      // 'male' | 'female' | 'prefer-not'
  polarity: null,    // 'yang' | 'yin' (set explicitly by Step 6A when gender='prefer-not')
  notifyOn: true,
  notifyHour: 8,     // 12-hour clock, default 8
  notifyMinute: 0,
  notifyMeridiem: 'AM',
  customNotifyTime: false,
};

// Pricing tiers/labels/prices are commercial config → src/infra/pricing.js.
// This store manages only the active `tier` STATE (set via setTier).

// Self-Report — a one-time purchase (DOC5 §19), tracked SEPARATELY from the
// subscription tier (a Seeker still buys it as a one-time add-on). Persisted
// so the entitlement survives reloads. The demo has no payment backend, so
// `purchaseSelfReport()` flips the entitlement locally — mirroring how the
// tier upgrade flow flips tier state in UpgradeModal.
const SELF_REPORT_KEY = 'elementum_hasselfreport_v1';
function readSelfReportOwned() {
  try { return localStorage.getItem(SELF_REPORT_KEY) === '1'; } catch { return false; }
}

// Tier entitlement — SERVER-TRUTH (DOC10 §4.2). For signed-in users the tier
// comes from the Supabase `entitlements` row, written only by the Stripe
// webhook (service-role). The old localStorage honor-system grant is retired —
// the client can no longer grant itself a paid tier. A small per-user cache
// avoids flashing locked state on boot before the fetch lands.
const TIER_CACHE_KEY = 'elementum_tiercache_v1';
function readTierCache(userId) {
  try {
    const c = JSON.parse(localStorage.getItem(TIER_CACHE_KEY) || 'null');
    return c && c.userId === userId ? c : null;
  } catch { return null; }
}
function writeTierCache(userId, tier, hasFounding) {
  try { localStorage.setItem(TIER_CACHE_KEY, JSON.stringify({ userId, tier, hasFounding })); } catch { /* ignore */ }
}

// Session persistence (B-4) — birthData + the computed chart survive a refresh
// or deep-link, so the dashboard renders the user's REAL reading instead of the
// null-chart default fallback. Versioned keys; a parse failure falls back cleanly.
const BIRTH_KEY = 'elementum_birthdata_v1';
const CHART_KEY = 'elementum_chart_v1';
function readJSON(key) { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; } }

// A persisted chart is only trusted if it was computed by the CURRENT engine.
// Stored as { engineVersion, chart }; a bare/legacy chart (no engineVersion) or
// a version mismatch is treated as stale → discarded and recomputed from
// birthData below, so engine fixes (e.g. 合而不化) reach returning users instead
// of being masked by a stale localStorage chart. See engine ENGINE_VERSION.
function isCompleteBirthData(b) {
  return !!(b && b.year != null && b.month != null && b.day != null);
}
function computeChart(b) {
  try {
    return calculateBaziChart({
      year: b.year,
      month: b.month,
      day: b.day,
      hour: resolveHourForCalc(b),
      gender: resolveGenderForCalc(b),
      longitude: resolveLongitudeForCalc(b),
      location: resolveLocationName(b),
    });
  } catch (err) {
    console.error('[chart] recompute from birthData failed:', err);
    return null;
  }
}
// Returns the chart to seed state with: the cached chart if its engine version
// matches; otherwise a fresh recompute from birthData (or null if no birth data).
function loadInitialChart() {
  const stored = readJSON(CHART_KEY);
  if (stored && stored.engineVersion === ENGINE_VERSION && stored.chart) {
    return stored.chart;
  }
  const birth = readJSON(BIRTH_KEY) || INITIAL_BIRTH_DATA;
  return isCompleteBirthData(birth) ? computeChart(birth) : null;
}

export function ChartProvider({ children }) {
  const { user } = useAuth();
  const [birthData, setBirthData] = useState(() => readJSON(BIRTH_KEY) || INITIAL_BIRTH_DATA);
  const [chart, setChart] = useState(loadInitialChart);
  // Boot from the per-user cache (last server-confirmed tier); the entitlement
  // fetch below refreshes it as soon as the session is known.
  const [tier, setTier] = useState(() => readTierCache(user?.id)?.tier || 'free');
  const [hasSelfReport, setHasSelfReportState] = useState(readSelfReportOwned);
  const [hasFounding, setHasFoundingState] = useState(() => !!readTierCache(user?.id)?.hasFounding);
  // Compatibility result — set by the friend flow, read by CompatScreen.
  // Session-only (not persisted): a relationship reading is a transient
  // comparison, not part of the user's own saved chart.
  const [compatResult, setCompatResult] = useState(null);

  // One-time Self-Report purchase (demo: flips the local entitlement + persists).
  const purchaseSelfReport = useCallback(() => {
    try { localStorage.setItem(SELF_REPORT_KEY, '1'); } catch { /* storage unavailable (private mode) — ignore */ }
    setHasSelfReportState(true);
  }, []);
  // Direct setter (used by dev tooling / reset).
  const setHasSelfReport = useCallback((v) => {
    try { localStorage.setItem(SELF_REPORT_KEY, v ? '1' : '0'); } catch { /* storage unavailable (private mode) — ignore */ }
    setHasSelfReportState(!!v);
  }, []);
  // Fetch the server entitlement (RLS: the user reads only their own row) and
  // sync tier state + cache. Returns the fetched tier so callers can poll —
  // the Stripe redirect can land a few seconds before the webhook write.
  const refreshEntitlements = useCallback(async () => {
    if (!supabase || !user) return null;
    const { data, error } = await supabase
      .from('entitlements')
      .select('tier, has_founding, has_self_report')
      .eq('user_id', user.id)
      .maybeSingle();
    if (error || !data) return null;
    setTier(data.tier);
    setHasFoundingState(!!data.has_founding);
    if (data.has_self_report) setHasSelfReportState(true);
    writeTierCache(user.id, data.tier, !!data.has_founding);
    return data.tier;
  }, [user]);

  // Entitlement follows the session: fetch on sign-in / account switch; a
  // signed-out visitor is free tier (the account owns the unlock, not the
  // device). Async so state updates happen in the callback, not the effect body.
  useEffect(() => {
    let active = true;
    (async () => {
      await Promise.resolve(); // yield — no synchronous setState in the effect
      if (!active) return;
      if (!user) {
        setTier('free');
        setHasFoundingState(false);
        try { localStorage.removeItem(TIER_CACHE_KEY); } catch { /* ignore */ }
        return;
      }
      const cached = readTierCache(user.id);
      if (cached) { setTier(cached.tier); setHasFoundingState(!!cached.hasFounding); }
      refreshEntitlements();
    })();
    return () => { active = false; };
  }, [user, refreshEntitlements]);

  // Merge partial updates, e.g. updateBirthData({ year: 1991 })
  const updateBirthData = useCallback((patch) => {
    setBirthData((prev) => ({ ...prev, ...patch }));
  }, []);

  // Persist birthData + chart so a refresh / deep-link restores the session (B-4).
  useEffect(() => {
    try { localStorage.setItem(BIRTH_KEY, JSON.stringify(birthData)); } catch { /* storage unavailable (private mode) — ignore */ }
  }, [birthData]);
  useEffect(() => {
    try {
      if (chart) localStorage.setItem(CHART_KEY, JSON.stringify({ engineVersion: ENGINE_VERSION, chart }));
      else localStorage.removeItem(CHART_KEY);
    } catch { /* storage unavailable (private mode) — ignore */ }
  }, [chart]);

  const resetFlow = useCallback(() => {
    setBirthData(INITIAL_BIRTH_DATA);
    setChart(null);
    try { localStorage.removeItem(BIRTH_KEY); localStorage.removeItem(CHART_KEY); } catch { /* storage unavailable (private mode) — ignore */ }
  }, []);

  const value = useMemo(
    () => ({
      birthData, updateBirthData, setBirthData,
      chart, setChart,
      tier, setTier,
      hasSelfReport, purchaseSelfReport, setHasSelfReport,
      hasFounding, refreshEntitlements,
      compatResult, setCompatResult,
      resetFlow,
    }),
    [birthData, chart, tier, hasSelfReport, hasFounding, refreshEntitlements, compatResult, purchaseSelfReport, setHasSelfReport, updateBirthData, resetFlow]
  );

  return <ChartContext.Provider value={value}>{children}</ChartContext.Provider>;
}

export function useChart() {
  const ctx = useContext(ChartContext);
  if (!ctx) {
    throw new Error('useChart must be used inside <ChartProvider>');
  }
  return ctx;
}

// Derive the gender value to send into calculateBaziChart().
// - 'male'   → calculator's "male" + Yang polarity flow
// - 'female' → calculator's "female" + Yin polarity flow
// - 'prefer-not' → driven by the explicit polarity chosen on Step 6A:
//     'yang' → treat as male, 'yin' → treat as female.
//     Defaults to male (Yang) if no choice was made.
export function resolveGenderForCalc(birthData) {
  if (birthData.gender === 'male') return 'male';
  if (birthData.gender === 'female') return 'female';
  if (birthData.gender === 'prefer-not') {
    return birthData.polarity === 'yin' ? 'female' : 'male';
  }
  return 'male';
}

// Resolve the hour to pass into calculateBaziChart():
// - Exact hour (0–23): returned as-is
// - Approximate window: use the midpoint of the selected 4-hour window
// - Unknown: default to 12 (midday) — DOC5 §22 documents a 3-pillar path
//   for unknown hour, but the v1 calculator expects an hour value;
//   callers can read birthData.hourUnknown to suppress hour-pillar display.
const WINDOW_MIDPOINTS = {
  'late-night': 1,   // 11pm–3am window centered at 1am
  'early':      5,   // 3am–7am centered at 5am
  'morning':    9,   // 7am–11am centered at 9am
  'midday':     13,  // 11am–3pm centered at 1pm
  'afternoon':  17,  // 3pm–7pm centered at 5pm
  'evening':    21,  // 7pm–11pm centered at 9pm
};
export function resolveHourForCalc(birthData) {
  if (birthData.hour != null) return birthData.hour;
  if (birthData.hourWindow) return WINDOW_MIDPOINTS[birthData.hourWindow] ?? 12;
  return 12;
}

// ── LOCATION → longitude resolution ───────────────────────────────────────
// DOC5 §7 Step 5 + §22: if the user picked a geocoded suggestion we get an
// exact longitude. If they typed something freeform we try a small
// well-known-city lookup; anything unrecognised falls back silently to
// Beijing longitude (120°E, the traditional BaZi standard).
const BEIJING_LONGITUDE = 120; // 120° E — the canonical fallback

const WELL_KNOWN_CITIES = {
  beijing:    116.4,
  shanghai:   121.5,
  guangzhou:  113.3,
  chengdu:    104.1,
  hongkong:   114.2,
  newyork:    -74.0,
  'new york': -74.0,
  losangeles: -118.2,
  london:       0.0,
  tokyo:      139.7,
  paris:        2.3,
  sydney:     151.2,
  berlin:      13.4,
  toronto:    -79.4,
  singapore:  103.8,
};

/**
 * Returns a numeric longitude (negative west of Greenwich) for the calculator,
 * or `BEIJING_LONGITUDE` if the location can't be resolved.
 * Accepts either an object `{ longitude: number }` or a freeform string.
 */
export function resolveLongitudeForCalc(birthData) {
  const loc = birthData?.location;
  if (!loc) return BEIJING_LONGITUDE;

  // 1. Geocoded suggestion with a numeric longitude.
  if (typeof loc === 'object' && typeof loc.longitude === 'number') {
    return loc.longitude;
  }

  // 2. Freeform string: try the well-known city fallback.
  const str = (typeof loc === 'string' ? loc : loc.name || '').toLowerCase();
  for (const [key, lon] of Object.entries(WELL_KNOWN_CITIES)) {
    if (str.includes(key)) return lon;
  }

  return BEIJING_LONGITUDE;
}

/**
 * Convenience: returns the display string for the user's location, whether
 * stored as a geocoded object or freeform text.
 */
export function resolveLocationName(birthData) {
  const loc = birthData?.location;
  if (!loc) return '';
  if (typeof loc === 'string') return loc;
  return loc.name || '';
}
