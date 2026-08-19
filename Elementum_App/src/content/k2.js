// ===================================================================
// ELEMENTUM · k2 — the ELEMENT_GOD depth corpus (K2 campaign)
// ===================================================================
// Owner construct ruling 2026-08-19 (the energy-page depth breakdown):
//   · grain: ELEMENT_GOD ×50 (element-flavored from day one)
//   · cell: overview (the "what it means" body, replaces the interim
//     mean line) + functional ×5 (Mind · Expression · Bonds · Action ·
//     Body) + domain readings (one per the god's ruled domains)
//   · position, layered: GOD_DOMAINS = the god's inherent ruling
//     domains (this file, ×10, free) · palace placement line = engine-
//     derived, PENDING the palace-noun vocabulary ruling
//   · tier: overview + functions + domain MAP free · domain READINGS
//     Seeker-gated
// Station truth: by_axis/json/ELEMENT_GOD/*.json (+ GOD/*.json domains);
// this file is the deliberate transcription (REA_05). Register: K2 =
// god cost × element arena (REA_16 §2b-G), humanize gate, dashless.
// 土_偏印 is the owner-review TEMPLATE CELL; the other 49 batch after
// its lock.
// ===================================================================

// The five functional categories (owner-ruled set, in render order).
export const K2_FUNCTIONS = [
  { key: 'mind', label: 'Mind' },
  { key: 'expression', label: 'Expression' },
  { key: 'bonds', label: 'Bonds' },
  { key: 'action', label: 'Action' },
  { key: 'body', label: 'Body' },
];

// The god's inherent ruling domains (×10, everyday nouns; the classical
// 六亲 roles kept where they teach: Mother 正印 · Father 偏财 · Children 食神).
export const GOD_DOMAINS = {
  '比肩': ['Peers', 'Independence', 'Self-reliance'],
  '劫财': ['Rivalry', 'Shared stakes', 'Boldness'],
  '食神': ['Expression', 'Enjoyment', 'Children'],
  '伤官': ['Talent', 'Performance', 'Defiance'],
  '偏财': ['Opportunity', 'Ventures', 'Father'],
  '正财': ['Wealth', 'Savings', 'Steady love'],
  '七杀': ['Pressure', 'Command', 'Crisis'],
  '正官': ['Career', 'Status', 'Order'],
  '偏印': ['Learning', 'Intuition', 'Solitude'],
  '正印': ['Knowledge', 'Shelter', 'Mother'],
};

// K2 cells, keyed `${elementHanzi}_${god}` — 土_偏印 = the template.
export const K2_CELLS = {
  '土_偏印': {
    overview: 'Your Earth carries the Alchemist’s current: nourishment that arrives as understanding rather than comfort. This is ground that reads before it feeds, soil that turns experience over slowly until it becomes insight. It shelters you the way a library shelters, quiet, stocked, slightly apart, and it asks one rent: time alone to do the turning.',
    functional: {
      mind: 'Thinking runs deep and sideways. You digest slowly, connect strangely, and surface with conclusions no straight line could have reached.',
      expression: 'You speak after the thinking is done, so words come out finished. People mistake the pause for absence. It was assembly.',
      bonds: 'You bond through understanding rather than activity. The friend who gets one true conversation a season keeps you for decades.',
      action: 'You act once the inner map is drawn. Slow to start, hard to derail, allergic to being rushed through step one.',
      body: 'Your energy pools and releases. Long stillness, then focused bursts. Rest for you is genuinely productive, not avoidance.',
    },
    domain_readings: {
      Learning: 'Learning is where this Earth feeds you best. Not the classroom kind so much as the deep private kind: the obsession studied at midnight, the field entered through the side door. Give it one strange subject at a time and it will quietly out-earn every credential in the house.',
      Intuition: 'The hunch arrives before the reason does, and for you it is usually load-bearing. Treat the sudden knowing as a first draft: trust it enough to write it down, doubt it enough to check the math by morning.',
      Solitude: 'Time alone is this energy’s rent, and it collects whether you schedule it or not. Taken on purpose, solitude turns into your best material. Taken by accident, it curdles into distance from the people who were waiting outside the study.',
    },
  },
};
