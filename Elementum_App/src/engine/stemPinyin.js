// ─────────────────────────────────────────────────────────────────────────────
// ENGINE · stem → pinyin romanization
// ─────────────────────────────────────────────────────────────────────────────
// Canonical stem romanization, previously copy-pasted in 5+ components under
// various names (STEM_ID / STEM_KEY / STEM_TO_PINYIN / STEM_PINYIN). Two forms:
//   STEM_PINYIN       — lowercase plain, for asset filenames / keys  ('jia')
//   STEM_PINYIN_TONED — uppercase, tone-marked, for display          ('JIǍ')
// Uppercase-plain ('JIA') is just STEM_PINYIN[stem].toUpperCase().
// ─────────────────────────────────────────────────────────────────────────────

export const STEM_PINYIN = {
  '甲': 'jia', '乙': 'yi', '丙': 'bing', '丁': 'ding', '戊': 'wu',
  '己': 'ji', '庚': 'geng', '辛': 'xin', '壬': 'ren', '癸': 'gui',
};

export const STEM_PINYIN_TONED = {
  '甲': 'JIǍ', '乙': 'YǏ', '丙': 'BǏNG', '丁': 'DĪNG', '戊': 'WÙ',
  '己': 'JǏ', '庚': 'GĒNG', '辛': 'XĪN', '壬': 'RÉN', '癸': 'GUǏ',
};
