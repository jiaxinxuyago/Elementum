// ===================================================================
// ELEMENTUM · Engine QA test charts — single source for all QA tools
// ===================================================================
// Consumed by qa-accuracy-dump.mjs (human-readable cross-check dump)
// and qa-engine-regression.mjs (golden-fixture diff). Beijing-born
// (treated as the 120°E standard meridian) so cross-site solar-time
// differences don't muddy reference comparison. Add cases covering:
// a yin Day Master, a weak DM, and a near-hour-boundary time, over time.
// Adding a case requires re-blessing goldens:
//   node tools/qa-engine-regression.mjs --update
// ===================================================================

export const CASES = [
  { label: 'REFERENCE 庚 (strong)', year: 1995, month: 4, day: 29, hour: 18, location: 'Beijing', gender: 'male' },
];
