// ===================================================================
// ELEMENTUM · ChartContext
// Holds birthData (collected through onboarding), the computed chart
// (set after LoadingScreen triggers calculateBaziChart), and the
// optional-path flags (approximateHour, hourUnknown, preferNotToSay,
// customNotifyTime). Provider wraps the whole app in App.jsx.
// ===================================================================

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

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

// Pricing tiers — DOC5 §19. Stored here so every component can read/write
// without prop-drilling. DevBar lets the designer flip between them.
export const TIERS = ['free', 'seeker', 'advisor'];
export const TIER_LABELS = { free: 'Free', seeker: 'Seeker', advisor: 'Advisor' };
export const TIER_PRICES = { free: '$0', seeker: '$9.99/mo', advisor: '$19.99/mo' };

export function ChartProvider({ children }) {
  const [birthData, setBirthData] = useState(INITIAL_BIRTH_DATA);
  const [chart, setChart] = useState(null);
  const [tier, setTier] = useState('free');

  // Merge partial updates, e.g. updateBirthData({ year: 1991 })
  const updateBirthData = useCallback((patch) => {
    setBirthData((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetFlow = useCallback(() => {
    setBirthData(INITIAL_BIRTH_DATA);
    setChart(null);
  }, []);

  const value = useMemo(
    () => ({
      birthData, updateBirthData, setBirthData,
      chart, setChart,
      tier, setTier,
      resetFlow,
    }),
    [birthData, chart, tier, updateBirthData, resetFlow]
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
