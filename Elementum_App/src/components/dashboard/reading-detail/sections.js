// ===================================================================
// ELEMENTUM · reading-detail section sequence  (DES_04 §11 getSections)
// ===================================================================
// The ordered reading sequence used by DetailShell's prev/next strip +
// "X of N" counter. Mirrors DES_04 §11 getSections() but maps to the
// routes that actually exist. Seasonal Calibration is conditional on
// the chart having missing elements (DES_04 §11) — included once R7 lands.
//
//   key   — FLOW route hash (without leading #/)
//   tag   — short label for the prev/next strip
// ===================================================================

export function getReadingSections(chart) {
  const secs = [
    { key: 'read-daymaster', tag: 'Day Master' },
    { key: 'read-elemental', tag: 'Elemental Nature' },
    { key: 'read-tengods',   tag: 'Dominant Energies' },
    { key: 'read-forces',    tag: 'Forces in Motion' },
  ];
  // Seasonal Calibration — only when the chart is missing an element.
  if (chart?.missingElements?.length) {
    secs.push({ key: 'read-seasonal', tag: 'Seasonal Calibration' });
  }
  secs.push({ key: 'read-chapters', tag: 'Life Chapters' });
  secs.push({ key: 'read-patterns', tag: 'Pillar Patterns' });
  return secs;
}
