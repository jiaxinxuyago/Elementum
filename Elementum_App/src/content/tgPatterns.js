// ===================================================================
// ELEMENTUM · tgPatterns — the TG_PATTERN axis (the ten-god relation
// patterns, the 精华 of classical reading)
// ===================================================================
// Owner directives 2026-08-19: the classical god-pair patterns are a
// first-class CONDITIONAL reading angle — and INVISIBLE machinery in-app
// (re-ruling: no classic quotes, no god/persona mechanics in the reading;
// the names/汉字 surface only in the future Codex chapter).
//   · trigger: both sides among the chart's resolved positions; FUSED
//     tier when they share one pillar (owner's law: 偏印+食神 同柱 must
//     reveal). One pattern per seat, priority = array order.
//   · reading (45–70w, PURE YOU-LANGUAGE) WEAVES into the seat's first
//     declared domain ¶ matching `targets` (unlabeled continuation
//     fallback after the domains otherwise); fused_line appends.
//   · line (≤40w) + zh/en names = Codex ore, not rendered in the app.
// Station truth: by_axis/json/TG_PATTERN/*.json (this file is the
// deliberate transcription, REA_05).
// ===================================================================

export const TG_PATTERNS = [
  {
    key: 'shishen_zhi_sha', zh: '食神制杀', en: 'The Artisan tames the General',
    gods: [['食神'], ['七杀']],
    targets: ['Career', 'Health'],
    line: 'Your chart holds a rare pairing: the Artisan’s ease stands guard over the General’s pressure. Stress that grinds other people becomes production in you, and your calmest work tends to happen close to the deadline.',
    reading: 'There is a rarer wiring underneath this: stress reaches you pre-processed. Deadlines that grind other people turn into output in your hands, and your calmest work happens closest to the pressure. That composure is produced, and it costs fuel. Protect the rest, the craft, and the small pleasures that produce it, and pressure stays your employee.',
    fused_line: 'The two share one pillar in you, so this alchemy runs close to the bone: pressure converts almost instantly.',
  },
  {
    key: 'shang_guan_pei_yin', zh: '伤官配印', en: 'The Virtuoso harnessed by the Sage',
    gods: [['伤官'], ['正印']],
    targets: ['Career', 'Mind'],
    line: 'Your brilliance and your learning share the chart, and they harness each other: talent with a syllabus. Study before you dazzle, and the shine turns durable.',
    reading: 'Underneath runs a lucky pairing: your boldest ideas and your patience for study feed each other instead of fighting. Every credential sharpens the showmanship, every performance keeps the learning honest. Build the stage and the library in the same decade. Together they turn raw shine into a name that lasts.',
    fused_line: 'Sharing one pillar, the pairing is native in you: your talent and your training speak with one voice.',
  },
  {
    key: 'xiao_shen_duo_shi', zh: '枭神夺食', en: 'The Alchemist starves the Artisan',
    gods: [['偏印'], ['食神']],
    targets: ['Mind', 'Career', 'Health'],
    line: 'The Alchemist and the Artisan share your chart, and they compete: too much theory starves your ease. When output stalls, the cure is one finished thing made with your hands, and fewer perfect plans.',
    reading: 'One catch runs underneath: your own analysis can starve your output. Projects polish in private until the moment passes, and the drawer of nearly finished things grows. The cure is structural, deadlines you did not set, collaborators who ship, one craft done with the hands. In heavy thinking seasons, watch sleep and appetite first.',
    fused_line: 'In you they share a single pillar, so the tug is constant: guard your finishing rituals fiercely.',
  },
  {
    key: 'shang_guan_jian_guan', zh: '伤官见官', en: 'The Virtuoso confronts the Magistrate',
    gods: [['伤官'], ['正官']],
    targets: ['Career'],
    line: 'Your chart carries the old collision of brilliance and rank: the Virtuoso chafes exactly where the Magistrate climbs. Careers run smoothest when your talent gets a stage inside the structure, under a title with some give in it.',
    reading: 'One friction runs underneath: you keep correcting the very structures you climb. Under close supervision you dim and chafe, and your brightest work appears wherever the leash is longest. Choose formats that license your candor, your own practice, your own desk, a title with give in it, and the friction becomes reform.',
    fused_line: 'They sit in one pillar in you, so the friction is native: build your own structure early.',
  },
  {
    key: 'sha_yin_xiang_sheng', zh: '杀印相生', en: 'Pressure feeds the Sage',
    gods: [['七杀'], ['偏印', '正印']],
    targets: ['Career', 'Growth', 'Mind'],
    line: 'Pressure and shelter feed each other in your chart: hard chapters keep converting into wisdom and rank. What tests you also promotes you, and the pattern strengthens with age.',
    reading: 'A stronger current runs underneath: hardship keeps converting into wisdom and rank for you. Each heavy chapter has left you promoted, certified, or deeper, usually all three, and the pattern strengthens with age. Trust weight to be a ladder. Just rest between climbs, because the converter needs cooling.',
    fused_line: 'Fused in one pillar, the conversion is immediate for you: pressure barely lands before it becomes lesson.',
  },
  {
    key: 'bi_jie_duo_cai', zh: '比劫夺财', en: 'The peers contest the purse',
    gods: [['比肩', '劫财'], ['正财', '偏财']],
    targets: ['Wealth'],
    line: 'Self stars and wealth stars share your pillars, the classic contested purse. Money does best held plainly in your name: partnerships loosen it, lending blurs it, and generosity deserves its own budget line.',
    reading: 'One law runs underneath your money: it attracts company. Friends with ventures, family with needs, partners with opinions, and it thins wherever ownership blurs. The same people would also carry you through droughts no bank would. So formalize every shared asset, price your generosity yearly, and keep one account whose shape nobody knows.',
    fused_line: 'Sharing a pillar, purse and peers sit in one seat for you: write things down early and often.',
  },
  {
    key: 'shi_shang_sheng_cai', zh: '食伤生财', en: 'The maker’s economy',
    gods: [['食神', '伤官'], ['正财', '偏财']],
    targets: ['Wealth', 'Career'],
    line: 'Your output stars feed your wealth stars directly: what you make converts to money with rare ease. Build one channel where creating flows straight to earning, and keep it yours.',
    reading: 'A generous wiring runs underneath: what you make converts to money with unusual ease. The work that feels like play earns more than the work that feels like duty, and the conversion improves with age. Keep one channel where creating flows straight to earning, and guard your appetite to make. Your income lives downstream of it.',
    fused_line: 'Fused in one pillar, the pipeline is short in you: the day you make is the day you earn.',
  },
  {
    key: 'cai_guan_xiang_sheng', zh: '财官相生', en: 'Wealth underwrites rank',
    gods: [['正财', '偏财'], ['正官']],
    targets: ['Career', 'Wealth'],
    line: 'Your wealth stars feed your officer star: diligence converts into title, resources into standing. You rise by being worth promoting. Negotiate rank as deliberately as you earn.',
    reading: 'A steady engine runs underneath: what you earn keeps converting into standing. Results banked become titles offered, and property and position reinforce each other through your middle decades. The one flaw is under-asking. Negotiate rank as deliberately as you earn it, and make sure someone senior sees the ledger.',
    fused_line: 'In one pillar together, earning and standing braid tightly for you: every gain quietly argues for your next title.',
  },
  {
    key: 'guan_yin_xiang_sheng', zh: '官印相生', en: 'Rank shelters the scholar',
    gods: [['正官'], ['正印', '偏印']],
    targets: ['Career', 'Mind'],
    line: 'Your officer star feeds your seal: structure flows into learning, position into protection. Institutions treat you kindly and mentors appear inside them. Steady ascent is the wiring.',
    reading: 'A protected road runs underneath: structure keeps converting into learning for you, and position into shelter. Mentors appear inside hierarchies, promotions arrive without scandal, and your name gathers weight the slow, durable way. The only hazard is staying past a frame’s worth. Audit the ladder every few years, then climb on.',
    fused_line: 'Fused in one pillar, the blessing is concentrated: your rank and your learning rise as one column.',
  },
];
