// Writes eng8.json (engine table, fixes, notes, plan, questions) for build-v8.mjs. node eng8.mjs
const S = '/tmp/claude-0/-home-user-Elementum/897393f2-6618-542b-92a1-23f079c1450a/scratchpad';
const fs = (await import('node:fs')).default;
const R = JSON.parse(fs.existsSync(S + '/eng8-research.json') ? fs.readFileSync(S + '/eng8-research.json', 'utf8') : '{}');
const rows = [
  { name: 'Structure', zh: '格局', rule: '子平真诠. The month branch decides. Its hidden stem that shows on the year, month or hour stem names the structure, main stem first, then middle, then residual. If none shows, its main stem does. 建禄 and 月刃 when the month branch is the Day Master’s own seat.',
    golden: '<b>Steward structure 正财格.</b> 乙, the middle stem of 辰, shows on the year and hour stems.', B: '<b>General structure 七杀格.</b> 辛 alone in 酉 does not show, so it decides as the main stem.', C: '<b>Magistrate structure 正官格.</b> Nothing hidden in 巳 shows on 壬 or 乙, so its main stem 丙 decides.' },
  { name: 'Formed or broken', zh: '成败', rule: '子平真诠. The Steward, Magistrate, Sage and Artisan are used directly. The General, Virtuoso, Alchemist and Ram are used in reverse. A breaker sits in the chart, and a rescue sits in it or arrives with a decade.',
    golden: '<b>Formed, under strain.</b> The Twin and the Rival beside the Stewards (比劫夺财). Rescue: an officer, brought by the Magistrate decade 2023–2032 and the General decade 2033–2042.', B: '<b>Under strain.</b> The Magistrate 庚 on the year stem mixes with the General (官杀混杂). Rescue: output, in the Virtuoso and Artisan decades, both lived.', C: '<b>Formed.</b> The Virtuoso 壬 on show is held by the Alchemist inside the Day Gate (伤官佩印).' },
  R.season || { name: 'Season', zh: '调候', rule: '穷通宝鉴. For each Day Master in each birth month, the stems the season asks for, first and second.', golden: '三月庚金: 甲 first, 丁 second. 乙 shows, 甲 only hides, 丁 is absent.', B: 'pending the table', C: 'pending the table' },
  { name: 'Branch bonds', zh: '刑冲合害', rule: '六合, 三合 (full, and half when the middle branch is there), 六冲, 刑 (寅巳申, 丑戌未, 子卯 and the self-punishing 辰午酉亥), 六害. Read by the gates they join. A passing year’s branch is read against each gate.',
    golden: '寅亥 bind, Year with Day. 辰酉 bind, Month with Hour. No clash, punishment or harm.', B: '卯酉 clash twice, the Hour against the Month and the Day. 酉酉 self-punishment, Month with Day.', C: '巳申 bind and punish at once, Year with Month. No hour, so the Hour Gate is not read.' },
  { name: 'Characters present', zh: '十神', rule: 'Seated: on a stem, or the main stem of a branch. Hidden: only as a middle or residual stem. Absent: nowhere. Weights from the engine’s own hidden-stem table.',
    golden: 'Absent: Magistrate, Sage. Hidden only: General (寅), Virtuoso (辰). Wood and Earth carry two thirds.', B: 'Absent: Rival, Virtuoso, Steward, Alchemist, Sage. Metal carries three quarters.', C: 'Absent: Steward, General. Hidden only: Artisan, Sage, Twin.' },
  { name: 'Your years', zh: '流年', rule: 'Each year’s stem names its character, helping or weighing by the same rule as the decades. Its branch is read against each gate, and the strongest bond is shown: a clash, then a punishment, a harm, a bind or a frame.',
    golden: '2026 General, joins the Day Gate. 2028 Alchemist, clashes with the Day Gate. 2030 Twin, clashes with the Month Gate.', B: '2026 Virtuoso, self-punishes the Year Gate. 2029 Horizon, clashes with the Hour Gate.', C: '2026 Magistrate, harms the Day Gate. 2027 General, clashes with the Day Gate. 2029 Alchemist, a full Metal frame with the Month and Day Gates.' },
  R.stars || { name: 'Stars', zh: '神煞', rule: 'pending the sourced table', golden: '', B: '', C: '' },
  R.arriving || { name: 'Stars arriving', zh: '运岁神煞', rule: 'pending', golden: '', B: '', C: '' },
];
const fixes = [
  '<b>Correction to round 7.</b> The golden Blueprint showed three god pairings. The engine finds two, 比劫夺财 and 枭神夺食. The third, 食伤生财, was my error, and it is gone.',
  '<b>Correction to round 7.</b> The missing line named the General and the Virtuoso as missing. They hide inside 寅 and 辰. Only the Magistrate and the Sage are absent, and the line now says so.',
  ...(R.fixes || ['<b>Correction to round 5.</b> The calculator also finds the Taiji Nobleman (太极贵人) in the golden Year and Day Gates, since 庚 takes 寅 and 亥. That makes seven stars, not six.']),
];
const notes = R.notes || [];
const plan = [
  ['Life Chapters', 'Page title', 'TEMPLATED tpl_depth · chapters.claim', '1', '5–16', 'Free'],
  ['Life Chapters', 'Chapter reading, stem seat', 'POSITION · chapter.lived|now|coming', '50', '22–45', 'Seeker'],
  ['Life Chapters', 'Chapter reading, seat inside', 'POSITION · chapter.lived|now|coming', '50', '16–40', 'Seeker'],
  ['Life Chapters', 'Chapter reading, Day seat', 'POSITION · chapter.lived|now|coming', '30', '30–60', 'Seeker'],
  ['Life Chapters', 'Current decade, in full', 'GOD · chapter_decade.helping|heavy.now', '20', '30–60', 'Seeker'],
  ['Life Chapters', 'Decade line, lived or coming', 'GOD · chapter_decade.helping|heavy.lived|coming', '40', '14–35', 'Seeker'],
  ['Your years', 'Year line', 'GOD · year_line.helping|heavy', '20', '20–42', 'Advisor'],
  ['Your years', 'Year bond line', 'TEMPLATED tpl_depth · year_bond.<bond>.<gate>', '20', '12–30', 'Advisor'],
  ['Stars', 'Page title', 'TEMPLATED tpl_depth · stars.claim', '1', '5–16', 'Free'],
  ['Stars', 'Star chip line', 'STAR · line', R.starCount || '17', '5–14', 'Free'],
  ['Stars', 'Star reading, by gate and tense', 'STAR · reading.<gate>.<tense>', R.starReadings || '128', '35–65', 'Seeker'],
  ['Stars', 'Arriving with a decade', 'STAR · arriving.decade.now|coming', R.starArrDec || '34', '20–45', 'Seeker'],
  ['Stars', 'Arriving with a year', 'STAR · arriving.year', R.starArrYr || '17', '20–45', 'Advisor'],
  ['Blueprint', 'Structure reading', 'STRUCTURE · reading', '10', '22–50', 'Advisor'],
  ['Blueprint', 'Why this structure', 'TEMPLATED tpl_depth · structure_rule.<case>', '6', '18–45', 'Advisor'],
  ['Blueprint', 'Strain or break note', 'STRUCTURE <family> · status.<state>.<breaker>', '16', '12–36', 'Advisor'],
  ['Blueprint', 'What protects it', 'TEMPLATED tpl_depth · rescue.<family>', '5', '12–30', 'Advisor'],
  ['Blueprint', 'Strongest line', 'TEMPLATED tpl_depth · strongest.one|two', '2', '12–32', 'Advisor'],
  ['Blueprint', 'Missing character', 'GOD · missing', '10', '22–45', 'Advisor'],
  ['Blueprint', 'Season reading (W11 A)', 'SEASON · <stem>.<branch> · reading', '120', '30–60', 'Advisor'],
  ['Blueprint', 'How the chart holds a need', 'GOD · season_need.shown|rooted|hidden', '30', '14–32', 'Advisor'],
  ['Blueprint', 'Seen and unseen', 'GOD · seen.plain|inside, plus the close', '21', '9–22', 'Advisor'],
  ['Blueprint', 'God pairing line', 'TG_PATTERN · blueprint_line', '9', '14–32', 'Advisor'],
  ['Blueprint', 'Branch bond line', 'TEMPLATED tpl_depth · bond.<bond>.<gate pair>', '34', '12–30', 'Advisor'],
  ['Blueprint', 'No hard bond', 'TEMPLATED tpl_depth · bond.none_hard', '1', '12–30', 'Advisor'],
];
const questions = [
  ['W1', 'The chapter readings', [['A', 'As shown. Each seat writes its own part of the chapter. The stem seat opens it by name and the seat inside follows. Every chart composes from the same 70 seats.'], ['B', 'One reading per pair of seats in each gate, written as a whole (about 400 units). Smoother, five times the writing.']]],
  ['W2', 'Tense', [['A', 'Write each seat in every tense a reader can be in, as shown for the Horizon (130 chapter units).'], ['B', 'One reading per seat in a neutral tense (70 units). Less predictive.']]],
  ['W3', 'Decades on the Life Chapters page', [['A', 'The current decade in full, and one line for each lived and coming decade inside its chapter, as shown (60 units).'], ['B', 'The current decade only (20 units). The others stay as names in the strip.']]],
  ['W4', 'Your years (Advisor)', [['A', 'Each year from now to the decade’s end: its character’s line plus one line for its strongest bond with your gates, as shown.'], ['B', 'The character’s line only.']]],
  ['W5', 'The old seat-sheet chapter lines', [['A', 'Retire them. The seat sheet shows the new chapter unit, in the reader’s tense.'], ['B', 'Keep the old lines on the seat sheet.']]],
  ['W6', 'Star readings', [['A', 'One reading per star, gate and tense, as shown (about 128).'], ['B', 'One reading per star plus a one-sentence gate line (16 readings and about 128 short lines).']]],
  ['W7', 'The Nobleman’s base', R.w7 || [['A', 'The day stem only. Golden: it arrives with 2023–2032 and in 2027.'], ['B', 'The day stem and the year stem. Golden adds 2028, 2032 and the 2033–2042 decade.']]],
  ['W8', 'The star list', R.w8 || [['A', 'The list as drafted, the Taiji Nobleman included.'], ['B', 'Leave the Taiji Nobleman out.']]],
  ['W9', 'Formed or broken', [['A', 'Three states, formed, under strain and broken, with the rescue read from the decades, as shown.'], ['B', 'Two states, formed and broken.']]],
  ['W10', 'Seen and unseen', [['A', 'One line per character in plain view and inside (20 lines), as shown.'], ['B', 'One composed paragraph per chart, written from a template.']]],
  ['W11', 'The season line', R.w11 || [['A', 'One season reading per Day Master and month, written once (120 units), with the engine’s line on what your chart holds of it.'], ['B', 'Compose it from the table: a frame from the classical reason, plus about 15 lines on what the chart holds.']]],
  ['W12', 'Pairings and bonds in the Blueprint', [['A', 'New chart-level lines: 9 for the god pairings, 34 for the bonds by gate pair, as shown.'], ['B', 'Reuse the domain pair lines and print the bonds as labels only.']]],
  ['W13', 'A star on its own base', [['A', 'Never. A star found from the year or day branch only counts in the other seats, as the classics phrase it (seen in the other pillars).'], ['B', 'Allow it, as some apps do (a 午 year becomes its own Commander Star).']]],
  ['W14', 'Where the season editions differ', [['A', 'Follow the text (Wikisource, checked against 古文岛 and 徐乐吾) and keep the variants on file.'], ['B', 'Follow the summary table that most apps copy.']]],
  ['W15', 'What happens next', [['A', 'Write the full batch with the sealed writers, bring the engine into the app with a golden test, then rebuild the screens.'], ['B', 'Another round of templates first.']]],
];
fs.writeFileSync(S + '/eng8.json', JSON.stringify({ rows, fixes, notes, plan, questions }, null, 1));
console.log('eng8.json', plan.reduce((a, r) => a + (parseInt(r[3], 10) || 0), 0), 'units');
