// ===================================================================
// ELEMENTUM · D13 identity builder  (P1 plate copy)
// ===================================================================
// Assembles the identity-plate strings from a chart + the stem's card.
// Romanization (pinyin with tone marks) is Latin, not CJK — allowed in
// Part 1. The English inscription is the drafted per-stem line (filler
// until the UI fixes word budgets). No CJK.
// ===================================================================

import { STEM_PINYIN as STEM_ID, STEM_PINYIN_TONED as STEM_PINYIN } from '../../engine/index.js';

// Drafted English inscriptions (one per stem) — filler, owner-approved direction.
const STEM_INSCRIPTION = {
  '甲': 'You grow toward the light you believe in — even where nothing shelters you.',
  '乙': 'You bend where others break — and call it nothing, though it is everything.',
  '丙': 'You warm every room you enter — and rarely ask who warms you.',
  '丁': 'You keep a small fire no storm has found — others read by its light.',
  '戊': 'You hold what others set down — so long, they forget the weight was theirs.',
  '己': 'Everything you tend grows — you are the last to call it your harvest.',
  '庚': 'You say what others soften — and pay, quietly, for being the one who did.',
  '辛': 'You were polished by what pressed you — brilliance is the part that survived.',
  '壬': 'You hold more than anyone thinks to ask about — depth was never meant to be seen.',
  '癸': 'You change things slowly, softly, completely — and let the credit fall elsewhere.',
};

// Earthly-branch hour → romanization + clock range (for the foundry mark).
const BRANCH_HOUR = {
  '子': ['ZǏ', '23–1'], '丑': ['CHǑU', '1–3'], '寅': ['YÍN', '3–5'], '卯': ['MǍO', '5–7'],
  '辰': ['CHÉN', '7–9'], '巳': ['SÌ', '9–11'], '午': ['WǓ', '11–13'], '未': ['WÈI', '13–15'],
  '申': ['SHĒN', '15–17'], '酉': ['YǑU', '17–19'], '戌': ['XŪ', '19–21'], '亥': ['HÀI', '21–23'],
};

export const stemId = (stem) => STEM_ID[stem] || 'geng';

export function buildIdentity(chart, card, hourUnknown) {
  const stem = chart.dayMaster.stem;
  const element = chart.dayMaster.element;
  const polarity = chart.dayMaster.polarity === 'yin' ? 'YIN' : 'YANG';
  const archetype = card?.identity?.archetypeName || 'The Day Master';
  const manifesto = (card?.identity?.manifesto || '').split(' · ')[0] || '';

  const [y, m, d] = (chart.meta?.birthDate || '').split('-').map((n) => parseInt(n, 10));
  const hourBranch = chart.pillars?.hour?.branch;
  let hourSeg = 'HOUR UNSET';
  if (!hourUnknown && BRANCH_HOUR[hourBranch]) {
    const [pin, range] = BRANCH_HOUR[hourBranch];
    hourSeg = `${pin} HOUR ${range}`;
  }
  const cast = `CAST FROM ${y} · ${m} · ${d} · ${hourSeg}`;

  return {
    dayMaster: STEM_ID[stem] || 'geng',
    archetype,
    pinyin: `${STEM_PINYIN[stem] || ''} · ${polarity} ${element.toUpperCase()}`,
    manifesto,
    inscription: STEM_INSCRIPTION[stem] || '',
    cast,
  };
}
