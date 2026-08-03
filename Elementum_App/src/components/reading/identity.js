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

// Earthly-branch hour → clock range (for the foundry mark).
const BRANCH_HOUR = {
  '子': '23–1', '丑': '1–3', '寅': '3–5', '卯': '5–7',
  '辰': '7–9', '巳': '9–11', '午': '11–13', '未': '13–15',
  '申': '15–17', '酉': '17–19', '戌': '19–21', '亥': '21–23',
};

// Cast-line month names (R1 owner ruling 2026-08-03: month-name format).
const MONTH_NAME = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

export const stemId = (stem) => STEM_ID[stem] || 'geng';

// Timezone abbreviation at the birth date — DST-aware, derived from the
// birth place's stored IANA zone. Zones whose short form is only a raw
// GMT offset (Asia/Shanghai → "GMT+8") fall back to the long name's
// initials (China Standard Time → CST) so a located birth always
// carries its zone on the cast line.
function tzAbbr(birthData) {
  const tz = birthData?.location?.timezone;
  if (!tz || !birthData?.year) return '';
  try {
    const d = new Date(Date.UTC(birthData.year, (birthData.month || 1) - 1, birthData.day || 1, 12));
    const part = (style) => new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: style })
      .formatToParts(d).find((p) => p.type === 'timeZoneName')?.value || '';
    const short = part('short');
    if (short && !/GMT[+-]/.test(short)) return short;
    const initials = part('long').split(' ').map((w) => w[0]).join('');
    return /^[A-Z]{2,5}$/.test(initials) ? initials : short;
  } catch { return ''; }
}

export function buildIdentity(chart, card, birthData) {
  const hourUnknown = !!(birthData?.hourUnknown || birthData?.hourWindow);
  const stem = chart.dayMaster.stem;
  const element = chart.dayMaster.element;
  const polarity = chart.dayMaster.polarity === 'yin' ? 'YIN' : 'YANG';
  const archetype = card?.identity?.archetypeName || 'The Day Master';
  const manifesto = (card?.identity?.manifesto || '').split(' · ')[0] || '';

  const [y, m, d] = (chart.meta?.birthDate || '').split('-').map((n) => parseInt(n, 10));
  const hourBranch = chart.pillars?.hour?.branch;
  let hourSeg = 'HOUR UNSET';
  if (!hourUnknown && BRANCH_HOUR[hourBranch]) hourSeg = BRANCH_HOUR[hourBranch];
  const abbr = tzAbbr(birthData);
  const cast = `CAST FROM ${y} · ${MONTH_NAME[m - 1] || m} ${d} · ${hourSeg}${abbr ? ` ${abbr}` : ''}`;

  return {
    dayMaster: STEM_ID[stem] || 'geng',
    archetype,
    // Lowercased element key (metal/wood/fire/earth/water) for pigment lookup.
    element: (element || '').toLowerCase(),
    pinyin: `${STEM_PINYIN[stem] || ''} · ${polarity} ${element.toUpperCase()}`,
    manifesto,
    inscription: STEM_INSCRIPTION[stem] || '',
    cast,
  };
}
