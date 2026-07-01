// ─────────────────────────────────────────────────────────────────────────────
// ENGINE · public API barrel
// ─────────────────────────────────────────────────────────────────────────────
// Pure BaZi calculation. NO dependencies on content, contract, or UI — this is
// the computational core. Consumers (UI components, the content resolver)
// import from here (`@/engine`); never deep-import an engine source file.
//
// Verified collision-free, so each module is re-exported wholesale.
// ─────────────────────────────────────────────────────────────────────────────

export * from './calculator.js';       // chart calc, ten-gods, patterns, bands, constants
export * from './buildEnergyChart.js';  // energy-chart assembly for the reading UI
export * from './compatibility.js';     // pair compatibility scoring
export * from './dominanceWheel.js';    // dominance-wheel geometry + rules
export * from './energyRoles.js';       // energy-role classification
export * from './temporal.js';          // day/month/year temporal projections
export * from './stemPinyin.js';        // stem → pinyin romanization (canonical)
