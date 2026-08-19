// ===================================================================
// ELEMENTUM · positions — the POSITION axis vocabulary (REA_02 §5e)
// ===================================================================
// Owner construct ruling 2026-08-19 (the Nebula move — configurations
// are NAMED EVENTS, read from the name):
//   · grain: 8 slots (stem + branch per pillar), day stem excluded
//     (it is the Day Master itself) → 7 slots × 10 gods = 70 positions
//   · gates: Year = Origin · Month = Career · Day = Partner · Hour =
//     Legacy (owner-locked palace nouns; closes the K2-C pending ruling)
//   · term: persona-led + 汉字 — "The Alchemist inside the Career Gate"
//     · 偏印在月支. Stem slots read "at the Gate" (the shown face);
//     branch slots read "inside the Gate" (the root). Adjustable at
//     template review.
//   · every position reading DECLARES its ruled domains from the
//     canonical taxonomy before interpreting.
// Station truth: by_axis/json/POSITION/*.json; readings transcribe here.
// ===================================================================

// The four gates (palace nouns, owner-locked 2026-08-19).
export const GATES = { year: 'Origin Gate', month: 'Career Gate', day: 'Partner Gate', hour: 'Legacy Gate' };
export const GATE_ZH = { year: '年柱', month: '月柱', day: '日柱', hour: '时柱' };

// The canonical domain taxonomy ×8 (owner-locked 2026-08-19) — every
// position declares which of these it rules, explicitly, before reading.
export const DOMAIN_TAXONOMY = ['Wealth', 'Health', 'Career', 'Love', 'Family', 'Social', 'Mind', 'Growth'];

// The seven slots (day stem = the Day Master, excluded).
export const SLOTS = [
  { id: 'year_stem', gate: 'year', kind: 'stem', zh: '年干' },
  { id: 'year_branch', gate: 'year', kind: 'branch', zh: '年支' },
  { id: 'month_stem', gate: 'month', kind: 'stem', zh: '月干' },
  { id: 'month_branch', gate: 'month', kind: 'branch', zh: '月支' },
  { id: 'day_branch', gate: 'day', kind: 'branch', zh: '日支' },
  { id: 'hour_stem', gate: 'hour', kind: 'stem', zh: '时干' },
  { id: 'hour_branch', gate: 'hour', kind: 'branch', zh: '时支' },
];

// Term builders — the named event.
export const positionTerm = (persona, slot) =>
  `${persona} ${slot.kind === 'stem' ? 'at' : 'inside'} the ${GATES[slot.gate]}`;
export const positionZh = (godHz, slot) => `${godHz}在${slot.zh}`;

// Authored position readings, keyed `${godId}_${slotId}`.
// pianyin_month_branch (偏印在月支, the owner's own example) = the
// TEMPLATE POSITION; the other 69 batch after its lock.
export const POSITION_READINGS = {
  pianyin_month_branch: {
    domains: ['Mind', 'Growth', 'Career'],
    defline: 'The Alchemist holds your chart’s strongest seat, the month branch, and does its thinking from the middle of your working life.',
    reading: 'This position rules Mind and Growth, and it rules them from the Career Gate. The month branch is the frame of a chart, the seat that colors your whole working life, and yours is held by the quiet scholar. Insight is not a hobby here. It is how you earn, decide, and climb. Careers that reward private depth suit you, and roles that punish slowness starve you. Guard the study hours the way others guard their salary, because for you they are the same thing.',
  },
};
