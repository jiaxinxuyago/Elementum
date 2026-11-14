// ===================================================================
// ELEMENTUM · pairings — when a classical god pairing holds (owner R2 A, 2026-11-14)
// ===================================================================
// A pairing (TG_PATTERNS) used to print whenever both characters sat in the
// chart. The classics name each pairing only under a condition: the Day
// Master's strength, and the absence of the cure that lifts it. One table,
// read by the Blueprint's part 4 and the Domains PATTERN step, with the
// source for each row (the owner sees it before the rules go live).
// ctx: { has(...gods), shows(...gods), strong, weak, dm, mb, structure }
// ===================================================================

export const PAIRING_RULES = {
  shishen_zhi_sha: {
    when: (c) => !c.shows('偏印', '正印') && !c.shows('偏财', '正财'),
    holds: 'No seal and no wealth shows on a stem.',
    source: '子平真诠 论偏官: 七杀用食制，不要露财透印',
  },
  shang_guan_pei_yin: {
    when: (c) => !c.strong,
    holds: 'The Day Master is not strong.',
    source: '子平真诠 论伤官: 伤官佩印而伤官旺 (成); 佩印而伤轻身旺 (败)',
  },
  xiao_shen_duo_shi: {
    when: (c) => !c.weak && !c.has('偏财', '正财') && !c.has('七杀'),
    holds: 'The Day Master is not weak, no wealth sits in the chart, and no General.',
    source: '子平真诠 论用神成败救应: 食逢枭而就杀以成格，或生财以护食',
  },
  shang_guan_jian_guan: {
    when: (c) => !c.has('正印', '偏印') && !(/[庚辛]/.test(c.dm) && /[亥子丑]/.test(c.mb)) && !(/[壬癸]/.test(c.dm) && /[寅卯辰]/.test(c.mb) && c.has('偏财', '正财')) && c.structure !== '七杀',
    holds: 'No seal sits in the chart, it is not 金水伤官 (or 水木伤官 with wealth), and the structure is not the General’s.',
    source: '渊海子平 伤官诀: 金水伤官要见官 … 惟有水木伤官格，财官两见始为欢; 子平真诠 论伤官 (佩印); 去官留杀',
  },
  sha_yin_xiang_sheng: {
    when: (c) => !c.strong,
    holds: 'The Day Master is not strong.',
    source: '子平真诠 论偏官: 杀用印，身弱 (杀重身轻，以印化杀)',
  },
  bi_jie_duo_cai: {
    when: (c) => !c.weak && !c.has('正官', '七杀') && !c.has('食神', '伤官'),
    holds: 'The Day Master is not weak, and no officer or output sits in the chart to check or turn the peers.',
    source: '子平真诠 论用神成败救应: 财逢劫而透食以化之，生官以制之; 论财: 财多身弱用比劫',
  },
  shi_shang_sheng_cai: {
    when: (c) => !c.weak,
    holds: 'The Day Master is not weak.',
    source: '子平真诠 论食神: 身强食旺而财透',
  },
  cai_guan_xiang_sheng: {
    when: (c) => !c.weak,
    holds: 'The Day Master is not weak.',
    source: '子平真诠 论财: 财旺生官，身强',
  },
  guan_yin_xiang_sheng: {
    when: (c) => !c.strong,
    holds: 'The Day Master is not strong.',
    source: '子平真诠 论正官: 官印双全 (身轻用印)',
  },
};

// a pairing the STATE already names is not printed again (R2 A, audit X-007)
export const STATE_PAIRING = { virtuoso: 'shang_guan_jian_guan', magistrate: 'shang_guan_jian_guan', alchemist: 'xiao_shen_duo_shi', starved: 'xiao_shen_duo_shi', peers: 'bi_jie_duo_cai' };

/** The context a pairing is read in: what the chart seats (stems and branches' main stems), what shows on a stem, the strength. */
export function pairingContext(chart, positions, { structure = null } = {}) {
  const S = new Set(positions.map((p) => p.god)); const T = new Set(positions.filter((p) => p.kind === 'stem').map((p) => p.god));
  const st = chart.dayMaster?.strength || '';
  return { has: (...g) => g.some((x) => S.has(x)), shows: (...g) => g.some((x) => T.has(x)), strong: /strong/.test(st), weak: /weak/.test(st), dm: chart.pillars.day.stem, mb: chart.pillars.month.branch, structure };
}

export const pairingHolds = (key, ctx) => (PAIRING_RULES[key] ? PAIRING_RULES[key].when(ctx) : true);
