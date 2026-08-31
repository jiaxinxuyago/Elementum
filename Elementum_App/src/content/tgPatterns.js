// ===================================================================
// ELEMENTUM · tgPatterns — the TG_PATTERN axis (the ten-god relation
// patterns, the 精华 of classical reading)
// ===================================================================
// Owner directive 2026-08-19: the classical god-pair patterns (食神制杀,
// 枭神夺食, 伤官见官…) are a first-class reading angle — each is a named
// event with its own cell, TRIGGERED CONDITIONALLY when the chart's
// resolved positions contain both sides, and revealed inside every
// participating seat's reading panel (Seeker layer).
//   · cell: name (汉字 + persona-led English) + trigger sides + line
//     (≤40w, the compact chemistry note) + reading (70–100w, the full
//     pattern reading: mechanism → how it shows → counsel + predictive
//     beat) + fused_line (≤25w, appended when both sides share one
//     pillar — the strongest classical trigger, owner's example:
//     偏印+食神 in the same pillar MUST reveal 印枭夺食).
//   · priority = array order (first match wins per seat): resolutions
//     before conflicts before productive chains.
// Station truth: by_axis/json/TG_PATTERN/*.json (this file is the
// deliberate transcription, REA_05). Supersedes the SET_PIECES ×5
// one-liners (their lines carried over).
// ===================================================================

export const TG_PATTERNS = [
  {
    key: 'shishen_zhi_sha', zh: '食神制杀', en: 'The Artisan tames the General',
    gods: [['食神'], ['七杀']],
    line: 'Your chart holds a rare pairing: the Artisan’s ease stands guard over the General’s pressure. Stress that grinds other people becomes production in you, and your calmest work tends to happen close to the deadline.',
    reading: 'This is one of the luckiest arrangements a chart can carry: the Artisan’s ease standing between you and the General’s pressure. Where others meet stress raw, yours arrives pre-processed, turned into output, wit, and steady hands. People read you as unshakeable and wonder how. The pattern runs deepest in work: crisis assignments become your showcase, and authority tends to find you calm exactly when it is testing everyone. Keep the Artisan fed, rest, craft, pleasure, because your composure is not free. It is produced. Protect the producer and the General stays yours to command.',
    fused_line: 'The two share one pillar in you, so this alchemy runs close to the bone: pressure converts almost instantly.',
  },
  {
    key: 'shang_guan_pei_yin', zh: '伤官配印', en: 'The Virtuoso harnessed by the Sage',
    gods: [['伤官'], ['正印']],
    line: 'Your brilliance and your learning share the chart, and they harness each other: talent with a syllabus. Study before you dazzle, and the shine turns durable.',
    reading: 'This is the scholar-performer’s pattern: the Virtuoso’s brilliance held by the Sage’s learning, talent given a syllabus. In you the rebel streak and the studious streak are the same engine viewed twice, and they mature each other. The reading is generous: your gift sharpens with every credential, and your learning stays alive because the performer keeps testing it in public. Careers in teaching, writing, and any stage with substance suit you unusually well. Honor both masters, study before you dazzle, and the pattern turns raw shine into a durable name.',
    fused_line: 'Sharing one pillar, the pairing is seamless in you: your talent and your training speak with one voice.',
  },
  {
    key: 'xiao_shen_duo_shi', zh: '枭神夺食', en: 'The Alchemist starves the Artisan',
    gods: [['偏印'], ['食神']],
    line: 'The Alchemist and the Artisan share your chart, and they compete: too much theory starves your ease. When output stalls, the cure is one finished thing made with your hands, and fewer perfect plans.',
    reading: 'The old books call this the owl seizing the food: the Alchemist’s overthinking swooping on the Artisan’s ease. In you it plays as a talented mind that second-guesses its own output, projects polished in private until the moment passes, appetite dulled by analysis. The tell is a drawer of nearly finished things. The pattern softens with structure: deadlines you did not set, collaborators who ship, one craft practiced with the hands. Watch health during overthinking seasons, digestion and sleep first. Feed the maker in you before the theorist, and both stay brilliant.',
    fused_line: 'In you they share a single pillar, so the tug is constant: guard your finishing rituals fiercely.',
  },
  {
    key: 'shang_guan_jian_guan', zh: '伤官见官', en: 'The Virtuoso confronts the Magistrate',
    gods: [['伤官'], ['正官']],
    line: 'Your chart carries the old collision of brilliance and rank: the Virtuoso chafes exactly where the Magistrate climbs. Careers run smoothest when your talent gets a stage inside the structure, under a title with some give in it.',
    reading: 'This is the classic collision: the Virtuoso’s brilliance meeting the Magistrate’s rank, talent that cannot help correcting the very authority it serves. In you it reads as a career of friction with bosses, rules, and titles, brightest exactly where you are least supervised. The old reading warns of clashes with officials. The modern one says: choose structures that license your candor, consulting, creating, running your own show. Under the wrong boss you are a lawsuit waiting politely. Under the right format you are the reform the structure needed. Pick formats, never fights.',
    fused_line: 'They sit in one pillar in you, so the friction is native: build your own structure early.',
  },
  {
    key: 'sha_yin_xiang_sheng', zh: '杀印相生', en: 'Pressure feeds the Sage',
    gods: [['七杀'], ['偏印', '正印']],
    line: 'Pressure and shelter feed each other in your chart: hard chapters keep converting into wisdom and rank. What tests you also promotes you, and the pattern strengthens with age.',
    reading: 'This is the pattern of the tempered scholar: the General’s pressure flowing into the seal’s wisdom, hardship that keeps converting into rank and understanding. In you difficulty has never been only difficulty. Each hard chapter left you promoted, certified, or wiser, usually all three. The classical reading marks this for authority earned the honest way, through weight actually carried. Expect responsibility to keep finding you, and expect to keep growing under it. The one discipline: rest between campaigns. The converter needs cooling, and your wisdom deserves years enough to spend itself.',
    fused_line: 'Fused in one pillar, the conversion is immediate for you: pressure barely lands before it becomes lesson.',
  },
  {
    key: 'bi_jie_duo_cai', zh: '比劫夺财', en: 'The peers contest the purse',
    gods: [['比肩', '劫财'], ['正财', '偏财']],
    line: 'Self stars and wealth stars share your pillars, the classic contested purse. Money does best held plainly in your name: partnerships loosen it, lending blurs it, and generosity deserves its own budget line.',
    reading: 'Self stars and wealth stars share your chart, the classic contested purse. The reading is practical: money in your life attracts company, friends with ventures, siblings with needs, partners with opinions, and it thins wherever ownership blurs. The strength inside the pattern is real: the same peers who reach for your wallet will carry you through droughts no bank would. So the counsel cuts both ways. Formalize every shared asset, price your generosity annually, and keep one account nobody knows the shape of. Then enjoy your people. They are your riskiest holding and your best one.',
    fused_line: 'Sharing a pillar, purse and peers sit in one seat for you: write things down early and often.',
  },
  {
    key: 'shi_shang_sheng_cai', zh: '食伤生财', en: 'The maker’s economy',
    gods: [['食神', '伤官'], ['正财', '偏财']],
    line: 'Your output stars feed your wealth stars directly: what you make converts to money with rare ease. Build one channel where creating flows straight to earning, and keep it yours.',
    reading: 'This is the maker’s economy, the luckiest commercial wiring a chart can have: your output stars feed your wealth stars directly. What you create, express, or perform converts into money with unusually little friction, and the conversion improves with age. The reading favors livelihoods where the product is visibly yours, craft, content, cooking, counsel, code. Salary alone will always feel slightly wrong, like renting your own hands. Build at least one channel where making flows straight to earning. Then protect the upstream: your income is only ever as healthy as your appetite to create.',
    fused_line: 'Fused in one pillar, the pipeline is short in you: the day you make is the day you earn.',
  },
  {
    key: 'cai_guan_xiang_sheng', zh: '财官相生', en: 'Wealth underwrites rank',
    gods: [['正财', '偏财'], ['正官']],
    line: 'Your wealth stars feed your officer star: diligence converts into title, resources into standing. You rise by being worth promoting. Negotiate rank as deliberately as you earn.',
    reading: 'Wealth stars feed your officer star, the executive’s pattern: resources flowing into standing, diligence converting into title. In you ambition is practical rather than loud. You rise by being worth promoting, budgets balanced, results banked, and the ladder responds. The classical reading promises position built on provision: property and career reinforce each other across your middle decades. The modern counsel: negotiate rank as deliberately as you earn, because this pattern under-asks by nature. Let the record speak, then make sure someone senior is in the audience when it does.',
    fused_line: 'In one pillar together, earning and standing braid tightly for you: every gain quietly argues for your next title.',
  },
  {
    key: 'guan_yin_xiang_sheng', zh: '官印相生', en: 'Rank shelters the scholar',
    gods: [['正官'], ['正印', '偏印']],
    line: 'Your officer star feeds your seal: structure flows into learning, position into protection. Institutions treat you kindly and mentors appear inside them. Steady ascent is the wiring.',
    reading: 'The officer star feeds your seal, the old civil-service blessing: structure flowing into learning, position into protection. In you authority and wisdom cooperate rather than compete. Institutions treat you kindly, mentors appear inside hierarchies, and your name gathers weight without scandal. The classical reading marks the steadiest kind of ascent, unhurried and unbroken. Careers in administration, medicine, law, and teaching suit the wiring. The one hazard is over-shelter: comfort inside the frame can outlast the frame’s worth. Audit the institution every few years. Loyalty is your gift, aim it well.',
    fused_line: 'Fused in one pillar, the blessing is concentrated: your rank and your learning rise as one column.',
  },
];
