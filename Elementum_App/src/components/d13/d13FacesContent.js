// ===================================================================
// ELEMENTUM · FACES card content (per Ten-God persona)
// ===================================================================
// The collapsed/expanded face-card copy for the P6–P10 FACES pages,
// ported verbatim from d13/The Five Energies Journey - Full.html.
//
// Keyed by the Ten-God 汉字 (NOT by element): a Ten God's persona is the
// same reading regardless of whose chart it sits in — 比肩 is always The
// Twin (identity & autonomy). Only the element that CARRIES the god, and
// its strength, change per user. So this map is Day-Master-independent.
//
// Persona display names live in content/tgNames.js (TG_PERSONA); this file
// carries the keywords, "what it rules" domain, and the reading teaser.
// ===================================================================

export const FACE_CARD = {
  '比肩': { kw: ['Independent', 'Resolute', 'Self-made'], ruleT: 'Identity & autonomy', ruleB: 'standing on your own.', teaser: 'You trust your own counsel first. Self-reliance is a strength — and, now and then, a wall others can’t get past.' },
  '劫财': { kw: ['Driven', 'Competitive', 'Bold'], ruleT: 'Ambition & rivalry', ruleB: 'the spur of a worthy opponent.', teaser: 'You rise to a contest. Comparison sharpens you, though it can also spend the energy you meant to keep.' },
  '正印': { kw: ['Grounding', 'Nurturing', 'Patient'], ruleT: 'Steady support', ruleB: 'the roots that hold you.', teaser: 'You learn deeply and keep what you learn. Support — given or received — is never wasted on you.' },
  '偏印': { kw: ['Intuitive', 'Unorthodox', 'Transmuting'], ruleT: 'Unorthodox insight', ruleB: 'nourishment from the unexpected.', teaser: 'You feed on the strange and the oblique — understanding tends to arrive sideways, rarely on cue.' },
  '食神': { kw: ['Fluent', 'Generous', 'Easeful'], ruleT: 'Natural expression', ruleB: 'making that flows without strain.', teaser: 'Ideas come easily and you give them away gladly. Creation, for you, is play before it is ever work.' },
  '伤官': { kw: ['Brilliant', 'Unruly', 'Daring'], ruleT: 'Brilliant expression', ruleB: 'talent that bends the rules.', teaser: 'You dazzle when you break form. The same spark that wins the room can unsettle the ones who run it.' },
  '正财': { kw: ['Steady', 'Accruing', 'Enduring'], ruleT: 'Steady holdings', ruleB: 'wealth tended and kept.', teaser: 'Worth, to you, is built slowly and kept. Security is something earned in steady, deliberate increments.' },
  '偏财': { kw: ['Expansive', 'Sensing', 'Distant'], ruleT: 'Windfall & opportunity', ruleB: 'wealth that arrives in waves.', teaser: 'You read money as movement — pulled toward the deal on the horizon more than the one already in hand.' },
  '七杀': { kw: ['Forging', 'Relentless', 'Decisive'], ruleT: 'Raw challenge', ruleB: 'the pressure that forges you.', teaser: 'Pressure never asks your permission. You’re sharpened by the trials you would never have chosen.' },
  '正官': { kw: ['Principled', 'Measured', 'Ordered'], ruleT: 'Order & duty', ruleB: 'the structure you answer to.', teaser: 'A discipline to grow into: measured authority that holds the line without forcing it.' },
};

// The element's meaning relative to the Day Master, by Ten-God FAMILY — so
// it stays correct for any Day Master (Wood is 财/wealth for a Metal DM, but
// 比劫/self for a Wood DM). Used for the fd-card one-line brief domain.
export const FAMILY_BRIEF = {
  '比肩': 'you', '劫财': 'you',
  '正印': 'your support & nourishment', '偏印': 'your support & nourishment',
  '食神': 'your output & expression', '伤官': 'your output & expression',
  '正财': 'your wealth & desire', '偏财': 'your wealth & desire',
  '七杀': 'your authority & structure', '正官': 'your authority & structure',
};

// Persona reading pages (P12/P13): the life-domains this face rules, plus the
// Seeker gate copy. Authored Wood-first (§8 of the deliverable) — 正财 The
// Steward + 偏财 The Horizon are the reference personas; other gods fall back
// to the R/X + gate reading (no domain deep-dive) until authored. Icons: one
// of dom-wealth | dom-rel | dom-career | dom-health.
export const PERSONA_DOMAINS = {
  '正财': {
    secSub: 'The Steward shapes how you handle money, love, work and your own body. Open any one for its reading.',
    domains: [
      { icon: 'dom-wealth', name: 'Wealth', tease: 'Your home domain — security built in steady layers, and the fear of ever losing it.' },
      { icon: 'dom-rel', name: 'Relationships', tease: 'You love by providing and keeping. Loyalty runs deep; letting go runs hard.' },
      { icon: 'dom-career', name: 'Career', tease: 'You compound mastery. The long game rewards you where the quick pivot would not.' },
      { icon: 'dom-health', name: 'Health', tease: 'How holding-on settles in the body — where steadiness turns to tension. Seeker.', locked: true },
    ],
    gateLabel: 'Seeker — the full Steward reading',
    gateBody: 'Every domain in depth · where holding turns to hoarding · the season it tightens.',
  },
  '偏财': {
    secSub: 'The Horizon shows up most where timing and appetite decide the outcome.',
    domains: [
      { icon: 'dom-wealth', name: 'Wealth', tease: 'Upside over safety — you back the bet others hesitate on, and feel the swings.' },
      { icon: 'dom-career', name: 'Career', tease: 'You thrive on the new venture, the open lane — and stall when the work goes flat.' },
      { icon: 'dom-rel', name: 'Relationships', tease: 'Drawn to the spark of the new — where novelty helps, and where it costs. Seeker.', locked: true },
    ],
    gateLabel: 'Seeker — the full Horizon reading',
    gateBody: 'Every domain in depth · where reaching turns to restlessness · the season it spikes.',
  },
};
