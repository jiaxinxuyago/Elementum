// ===================================================================
// ELEMENTUM · Engine QA test charts — single source for all QA tools
// ===================================================================
// Consumed by qa-accuracy-dump.mjs (human-readable cross-check dump),
// qa-engine-regression.mjs (golden-fixture diff), and
// qa-pillar-crosscheck.mjs (independent Tier-A derivation — run it
// BEFORE blessing any new/changed case; disagreement = do not bless).
// Coverage axes (2026-07-09): yang-strong · yin-weak · seasonal ·
// female luck-direction · late-子 day rollover · 立春 year boundary ·
// solar-time longitude correction. Non-boundary dates sit ≥4 days from
// every solar term (the crosscheck's term table is approximate).
// Adding a case: crosscheck first, then re-bless goldens:
//   node tools/qa-pillar-crosscheck.mjs && node tools/qa-engine-regression.mjs --update
// ===================================================================

export const CASES = [
  // The owner-verified golden (manual cross-site protocol, 2026-06).
  { label: 'REFERENCE 庚 (strong)', year: 1995, month: 4, day: 29, hour: 18, location: 'Beijing', gender: 'male' },
  // Yin Fire DM born mid-winter (子月) — weak-season yin DM + female
  // (luck-pillar direction reverses for yin-year females).
  { label: '丁 yin-fire winter female', year: 1988, month: 12, day: 18, hour: 7, location: 'Beijing', gender: 'female' },
  // Yin Wood DM on a metal branch in metal-dominant autumn (酉月) —
  // the weak-DM case; also carries a 卯酉冲 (hour vs month/day).
  { label: '乙 weak-wood autumn', year: 1990, month: 9, day: 17, hour: 5, location: 'Beijing', gender: 'male' },
  // Same calendar day as the golden but born 23:00 (late 子时) — pins
  // the engine's day-rollover convention against a verified anchor.
  { label: '庚-anchor late-子 rollover', year: 1995, month: 4, day: 29, hour: 23, location: 'Beijing', gender: 'male' },
  // ⚠ TWO CASES DISABLED PENDING ENGINE FIXES (found by qa-pillar-crosscheck
  // 2026-07-09 — do NOT bless goldens that encode the buggy values):
  // 1. Pre-立春 January: engine month stem 己丑, classical (五虎遁 from the
  //    engine's own 丙子 year) says 辛丑 — wrap-month stem misindex.
  //    { label: '庚 pre-立春 year boundary', year: 1997, month: 1, day: 28, hour: 12, location: 'Beijing', gender: 'male' },
  // 2. Ürümqi 87.6°E: calculator.js trueSolarHour SUBTRACTS (lon-120)/15 —
  //    sign inverted (真太阳时 = clock + 4min×(经度−120°)); 18:00 must be
  //    申 (15:50), engine says 戌 (20:10). Invisible near 120°E.
  //    { label: '庚 Ürümqi solar-time', year: 1995, month: 4, day: 29, hour: 18, location: 'Ürümqi', longitude: 87.6, gender: 'male' },
];
