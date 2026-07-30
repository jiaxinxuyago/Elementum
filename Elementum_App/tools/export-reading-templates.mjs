// ===================================================================
// ELEMENTUM · axis-station seeder (the archetype classification method)
// ===================================================================
// Builds Reading/Database/templates/json/<AXIS>/<archetype>.json — one
// folder per axis of the taxonomy (REA_01, normative), one placeholder
// template per archetype of that axis. Each file carries the archetype's
// identity + CANDIDATE variables harvested from the live corpus and the
// REA_02 locks — all pending the owner's per-axis construct ruling.
// STEM_BAND_PATTERN is HELD (owner 2026-07-30) — folder README only.
// After changes run tools/build-template-twins.mjs.
//   node tools/export-reading-templates.mjs
// Spec: REA_05 §1–§3.
// ===================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../../Reading/Database/templates/json');
const CHECK = process.argv.includes('--check');
const REA03 = path.resolve(__dirname, '../../Reading/Documents/REA_03_Reading_Generation_Schema.md');

const { calculateBaziChart } = await import('../src/engine/calculator.js').catch(() => import('../src/engine/index.js'));
const engine = await import('../src/engine/index.js');
const calc = calculateBaziChart || engine.calculateBaziChart;
const { STEM_CARD_DATA, TG_CARD_DATA } = await import('../src/content/archetypeSource.js');
const { buildIdentity } = await import('../src/components/reading/identity.js');
const { FACE_CARD, FAMILY_BRIEF, FAMILY_CLAUSE, FAMILY_ELEMENT, ENERGY_TILE } = await import('../src/content/reading/index.js');
const { DM_READING } = await import('../src/content/reading/readingContent.js');
const { TG_PERSONA } = await import('../src/content/tgNames.js');
const jd = await import('../src/components/journey/journeyData.js');

// ── taxonomy keys ──────────────────────────────────────────────────
const STEMS = [
  { hz: '甲', id: 'jia' }, { hz: '乙', id: 'yi' }, { hz: '丙', id: 'bing' }, { hz: '丁', id: 'ding' }, { hz: '戊', id: 'wu' },
  { hz: '己', id: 'ji' }, { hz: '庚', id: 'geng' }, { hz: '辛', id: 'xin' }, { hz: '壬', id: 'ren' }, { hz: '癸', id: 'gui' },
];
const GODS = [
  { hz: '比肩', id: 'bijian' }, { hz: '劫财', id: 'jiecai' }, { hz: '食神', id: 'shishen' }, { hz: '伤官', id: 'shangguan' },
  { hz: '偏财', id: 'piancai' }, { hz: '正财', id: 'zhengcai' }, { hz: '七杀', id: 'qisha' }, { hz: '正官', id: 'zhengguan' },
  { hz: '偏印', id: 'pianyin' }, { hz: '正印', id: 'zhengyin' },
];
const ELS = ['metal', 'earth', 'wood', 'water', 'fire'];
const EL_HZ = { metal: '金', earth: '土', wood: '木', water: '水', fire: '火' };
const BANDS = ['concentrated', 'balanced', 'open'];
const FAMILIES = [
  { id: 'core', family: 'self', zh: '比劫' }, { id: 'root', family: 'resource', zh: '印' },
  { id: 'drive', family: 'wealth', zh: '财' }, { id: 'voice', family: 'output', zh: '食伤' },
  { id: 'duty', family: 'officer', zh: '官杀' },
];
const POSITIONS = ['yearStem', 'yearBranch', 'monthStem', 'monthBranch', 'dayBranch', 'hourStem', 'hourBranch'];

// GOD-axis locks that live only in REA_02 (transcribed; source noted per file).
const GOD_DEFLINE = {
  '比肩': 'Same nature, same register — the standard you hold yourself to',
  '劫财': 'Same nature, different register — the edge of comparison',
  '食神': 'Output that flows from you — giving that feels like being',
  '伤官': 'Cross-current output — brilliance made of what it meets',
  '偏财': 'Wide-ranging engagement — opportunity sensed at a distance',
  '正财': 'Methodical, directed acquisition — value built and kept',
  '七杀': "Pressure that doesn't grant permission — the trial that forges",
  '正官': 'Framework-mediated pressure — the standard that legitimizes',
  '偏印': 'Unconventional nourishment — insight that transmutes',
  '正印': 'Nourishment that deepens without redirecting — the root that holds',
};
const GOD_CHARGE = { '比肩': 'steady', '劫财': 'fierce', '食神': 'gentle', '伤官': 'fierce', '偏财': 'dynamic', '正财': 'gentle', '七杀': 'fierce', '正官': 'gentle', '偏印': 'fierce', '正印': 'gentle' };

// CONDITION-axis locks (REA_02 §5c).
const CONDITIONS = {
  overfueled: { term: 'Overfueled', zh: '身强', defline: jd.DEFLINE.Overfueled, cond_tail: jd.COND_TAIL.Overfueled, fold_verdict: jd.FOLD_VERDICT.Overfueled, remedy: 'Channel' },
  balanced: { term: 'Balanced', zh: '中和', defline: jd.DEFLINE.Balanced, cond_tail: jd.COND_TAIL.Balanced, fold_verdict: jd.FOLD_VERDICT.Balanced, remedy: null },
  underfueled: { term: 'Underfueled', zh: '身弱', defline: jd.DEFLINE.Underfueled, cond_tail: jd.COND_TAIL.Underfueled, fold_verdict: jd.FOLD_VERDICT.Underfueled, remedy: 'Refill' },
  channel: { term: 'Channel', zh: '克泄耗', defline: jd.DEFLINE.Channel, appr_tail: jd.APPR_LINE.Channel.tail, kind: 'remedy verb' },
  refill: { term: 'Refill', zh: '生助', defline: jd.DEFLINE.Refill, appr_tail: jd.APPR_LINE.Refill.tail, kind: 'remedy verb' },
};

// identity fields via the real builder → per-stem seed charts
const SEED_DATES = { 甲: [5, 3], 乙: [5, 4], 丙: [5, 5], 丁: [5, 6], 戊: [5, 7], 己: [5, 8], 庚: [4, 29], 辛: [4, 30], 壬: [5, 1], 癸: [5, 2] };
const identities = {};
for (const [stem, [mo, da]] of Object.entries(SEED_DATES)) {
  const chart = calc({ year: 1995, month: mo, day: da, hour: 18, gender: 'male', longitude: 116.4, location: 'X' });
  identities[chart.dayMaster.stem] = buildIdentity(chart, STEM_CARD_DATA[chart.dayMaster.stem], false);
}
// element-generic mean lines via one built model
const gChart = calc({ year: 1995, month: 4, day: 29, hour: 18, gender: 'male', longitude: 116.4, location: 'X' });
const gEc = engine.buildEnergyChart(gChart);
const gId = buildIdentity(gChart, STEM_CARD_DATA[gChart.dayMaster.stem], false);
const gModel = jd.buildJourneyModel({ chart: gChart, ec: gEc, identity: gId, card: STEM_CARD_DATA[gChart.dayMaster.stem], birthData: {} });
const meanOf = {};
for (const el of ELS) meanOf[el] = jd.buildElementScreen(gModel, el).mean;

// ELEMENT·GOD structural-interaction lines — parsed from REA_03 §4b (doc = source).
const interactionOf = {};
{
  const md = fs.readFileSync(REA03, 'utf8');
  for (const m of md.matchAll(/^\| ([金木水火土]_[一-鿿]{2}) \| ([^|]+) \| ([^|]+) \| ([^|]+) \|$/gm)) {
    interactionOf[m[1].trim()] = { persona: m[2].trim(), dm_element: m[3].trim(), interaction: m[4].trim() };
  }
}

// ── file writer ────────────────────────────────────────────────────
const CANDIDATE_NOTE = 'All variables below are CANDIDATES carried from the live corpus / REA_02 locks — the axis construct is TBD, ruled per-axis with the owner.';
let count = 0;
let drift = 0;
function write(axis, name, body) {
  const dir = path.join(OUT, axis);
  const fp = path.join(dir, `${name}.json`);
  const next = JSON.stringify(body, null, 2) + '\n';
  count++;
  if (CHECK) {
    // drift audit (REA_05 sync law): compare harvested state vs the on-disk station.
    if (!fs.existsSync(fp)) { console.log(`MISSING  ${axis}/${name}.json`); drift++; }
    else if (fs.readFileSync(fp, 'utf8') !== next) { console.log(`DRIFT    ${axis}/${name}.json`); drift++; }
    return;
  }
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fp, next, 'utf8');
}
const file = (axis, name, key, canonical, candidates, sources, extra = {}) => write(axis, name, {
  $archetype: name, axis, key, canonical_name: canonical ?? null,
  construct: 'TBD — ruled per-axis with the owner', candidate_note: CANDIDATE_NOTE,
  sources, ...extra, candidates,
});

// fresh tree (build mode only)
if (!CHECK) fs.rmSync(OUT, { recursive: true, force: true });

// ── STEM ×10 ──
for (const s of STEMS) {
  const card = STEM_CARD_DATA[s.hz] || {};
  const idn = identities[s.hz] || {};
  const dm = DM_READING[s.hz] || {};
  file('STEM', s.id, s.hz, card.identity?.archetypeName ?? null, {
    archetype_name: card.identity?.archetypeName ?? null,
    manifesto: card.identity?.manifesto ?? null,
    inscription: idn.inscription ?? null,
    pinyin_display: idn.pinyin ?? null,
    dm_claims: dm.claims ?? null,
    dm_mechanism: dm.edge ?? null,
    yourNature_desc: card.yourNature?.desc ?? null,
    __ore: {
      note: 'legacy corpus carried as mining material (fates pending rulings incl. §7 #4 / provisional R4)',
      subtitle: card.subtitle ?? null, chips: card.chips ?? null,
      yourNature_phrase: card.yourNature?.phrase ?? null,
      gifts: card.gifts ?? null, shadows: card.shadows ?? null,
      elementIntro: card.identity?.elementIntro ?? null,
      manual: card.manual ?? null, energy: card.energy ?? null,
      psych: card.psych ?? null, archetypes: card.archetypes ?? null,
      blocks: card.blocks ?? null,
    },
  }, ['Elementum_App/src/content/archetypeSource.js', 'src/content/reading/readingContent.js (DM_READING)', 'buildIdentity']);
}

// ── STEM_BAND ×30 ──
for (const s of STEMS) for (const b of BANDS) {
  file('STEM_BAND', `${s.id}_${b}`, `${s.hz}_${b}`, null, {}, ['(no authored data — construct TBD; K1b self-card target)']);
}

// ── STEM_BAND_PATTERN — HELD ──
if (!CHECK) {
  const dir = path.join(OUT, 'STEM_BAND_PATTERN');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'README.md'),
    '# STEM_BAND_PATTERN ×150 — HELD (owner 2026-07-30)\n\nThis axis is parked until its data ruling. Existing data at this grain: 15 hand-authored `yourNature.desc` variants (庚 only) in `Elementum_App/src/content/stemVariants.js` — they enter as candidates when the axis is ruled.\n', 'utf8');
}

// ── ELEMENT ×5 ──
for (const el of ELS) {
  file('ELEMENT', el, EL_HZ[el], null, {
    energy_tile_hook: ENERGY_TILE[el]?.hook ?? null,
    energy_tile_tag: ENERGY_TILE[el]?.pol ?? null,
    mean_line: meanOf[el] ?? null,
  }, ['src/content/reading/surfaceContent.js (ENERGY_TILE — interim, 庚-voiced)', 'src/components/journey/journeyData.js (MEAN)'],
  { status_note: 'interim copy — target grain is ELEMENT_GOD per the K2 pass' });
}

// ── GOD ×10 ──
for (const g of GODS) {
  const tg = TG_CARD_DATA[g.hz] || {};
  file('GOD', g.id, g.hz, TG_PERSONA[g.hz] ?? null, {
    persona_name: TG_PERSONA[g.hz] ?? null,
    definition_line: GOD_DEFLINE[g.hz] ?? null,
    keyword: jd.KEYWORD[g.hz] ?? null,
    charge: GOD_CHARGE[g.hz] ?? null,
    pole_catalyst: jd.POLE_CATALYST[g.hz] ?? null,
    pole_friction: jd.POLE_FRICTION[g.hz] ?? null,
    adj_catalyst: jd.ADJ_CATALYST[g.hz] ?? null,
    adj_friction: jd.ADJ_FRICTION[g.hz] ?? null,
    face_kw: FACE_CARD[g.hz]?.kw ?? null,
    face_teaser: FACE_CARD[g.hz]?.teaser ?? null,
    family_brief: FAMILY_BRIEF?.[g.hz] ?? null,
    family_clause: FAMILY_CLAUSE?.[g.hz] ?? null,
    family_element: FAMILY_ELEMENT?.[g.hz] ?? null,
    __ore: {
      note: 'TG corpus — the K2 generation source (kept per REA_03 §2.4)',
      rulingRealm: tg.rulingRealm ?? null, chips: tg.chips ?? null,
      gifts: tg.gifts ?? null, shadows: tg.shadows ?? null,
      hiddenDynamic: tg.hiddenDynamic ?? null,
      outputs: tg.outputs ?? null, frictions: tg.frictions ?? null,
      domainSignatures: tg.domainSignatures ?? null, sixRelations: tg.sixRelations ?? null,
    },
  }, ['REA_02 §2/§4/§4b locks', 'src/content/tgNames.js', 'src/components/journey/journeyData.js', 'src/content/reading/facesContent.js', 'src/content/archetypeSource.js (TG_CARD_DATA)']);
}

// ── ELEMENT_GOD ×50 ──
for (const el of ELS) for (const g of GODS) {
  const key = `${EL_HZ[el]}_${g.hz}`;
  const info = interactionOf[key] || {};
  file('ELEMENT_GOD', key, key, info.persona ?? TG_PERSONA[g.hz] ?? null, {
    structural_interaction: info.interaction ?? null,
    dm_element: info.dm_element ?? null,
    k2_card: {
      face: null, persona: null, chips: null, rulingDomain: null,
      registers: {
        dominant: { r: null, x: null, gate: null, seeker: { shadow: null, work: null, bonds: null, season: null } },
        absent: { r: null, x: null, gate: null, seeker: { shadow: null, work: null, bonds: null, season: null } },
      },
    },
  }, ['REA_03 §4b (interaction seeds — parsed from the doc)', 'k2 construct: REA_03 §4 spec (unauthored)']);
}

// ── CONDITION ×3+2 ──
for (const [id, c] of Object.entries(CONDITIONS)) {
  file('CONDITION', id, c.zh, c.term, { ...c }, ['REA_02 §5c locks (via journeyData vocabulary tables)']);
}

// ── FAMILY ×5 ──
for (const f of FAMILIES) {
  file('FAMILY', f.id, f.zh, jd.RELATION_NOUN[f.family] ?? null, {
    relation_noun: jd.RELATION_NOUN[f.family] ?? null,
    family_line: jd.FAMILY_LINE[f.family] ?? null,
    family_key: f.family,
  }, ['REA_02 §5b locks (via journeyData vocabulary tables)']);
}

// ── POSITION ×7 ──
for (const p of POSITIONS) {
  file('POSITION', p, p, null, { palace_frame: { domain: null, relationalReframe: null } }, ['(unauthored — REA_03 §4 B6)']);
}

// ── TEMPLATED ×16 (the sentence patterns) ──
const T = (name, status, budget, body) => file('TEMPLATED', name, name, null, body, ['REA_03 §5 (patterns)'], { status_note: status, budget });
T('tpl_cast_line', 'LIVE ⚠ R1 (provisional hybrid ruling on file)', 'one line', { pattern: 'CAST FROM {y} · {m} · {d} · {hour-label} {tz}' });
T('tpl_core_energy_line', 'LIVE', 'one line', { pattern: 'Your Core Energy is {El}' });
T('tpl_core_own_element', 'LIVE', 'one line', { pattern: "Your core is {El} — the {Arch}'s own element." });
T('tpl_core_seal_explainer', 'LIVE', '1–2 sentences', { pattern: "The seal at the wheel's center is {El}'s sign — the day master you were cast with; its share leads the wheel." });
T('tpl_relation_row', 'LIVE', 'one line', { pattern: '{El} is your {Relation}' });
T('tpl_pill_title', 'LIVE', 'one line', { pattern: '{El} is Your {Relation}' });
T('tpl_dx_line', 'LIVE', 'one line', { pattern: 'Your {El} is {Cond} — {Remedy} it.', clauses: { mapping: 'role-driven (owner-ratified 2026-07-23): friction-side incl. core excess → Overfueled·Channel · catalyst-side incl. missing → Underfueled·Refill · Balanced chart → Balanced·keep the mix' } });
T('tpl_verdict_line', 'LIVE', 'one line', { pattern: '{connector} {pole} · {verb}', clauses: { connectors: { core_overfueled: 'curdling into', core_underfueled: 'reaching for', core_balanced: 'holding', friction: 'curdling into', catalyst: 'rising toward' }, verbs: { core_overfueled: 'channel it', core_underfueled: 'refill it', core_balanced: 'trust it', friction: 'loosen it', catalyst_missing: 'borrow it', catalyst_lead: 'feed it', catalyst_other: 'keep it close' } } });
T('tpl_share_coreline', 'LIVE', 'one line', { pattern: '{El} is your Core — {Cond}' });
T('tpl_dm_prescription', 'INTERIM (pending K2)', '1–2 sentences', { pattern: 'SEEK THIS · {EL} / SKIP THIS · {EL} + body', clauses: { seek_present: '{El} is the energy your chart asks for — thin in you and worth feeding. Seek it on purpose.', seek_missing: "{El} is the energy you don't carry — the one your chart asks for most. Borrow it daily{, through …}.", skip: '{El} is already rich in you — more of it weighs the core. Stop adding; let what you have ease.' } });
T('tpl_element_verdict', 'LIVE', '1 sentence', { clauses: { core: 'Balanced — nothing to force; keep the mix. / Underfueled — it burns more than it takes in; refill it.', core_excess: "Overfueled — honor it, don't feed it further.", friction: 'Already rich in you — more of it weighs the core; stop adding.', catalyst_missing: 'Cast with none — borrow it daily · with {others}.', catalyst_thin: 'Thin in you — worth feeding.', catalyst: 'Give it more to shape.' } });
T('tpl_hour_chip', 'LIVE', '≤12w', { pattern: 'Cast without your hour — close, not exact. Discover it →' });
T('tpl_presence_frames', 'PLANNED', '≤20w ×4', { pattern: null, clauses: { dominant: null, present: null, scarce: null, absent: null } });
T('tpl_cycle_line', 'PLANNED', 'label ≤10w + line ≤20w · ×20', { pattern: 'Why {ElA} {feeds/tests} {ElB} — the cycle, in your chart', clauses: null });
T('tpl_rx_ribbon', 'PLANNED', 'ribbon ≤14w + 10 fragments', { pattern: null, clauses: null });
T('tpl_pattern_conclusion', 'PLANNED', '≤25w · per pattern type (~6)', { pattern: null, clauses: null });

if (CHECK) {
  if (drift) { console.log(`✗ ${drift}/${count} templates drifted from the harvested corpus + locks`); process.exit(1); }
  console.log(`✓ station in sync: ${count}/${count} templates match the live corpus + REA_02 locks + REA_03 §4b exactly`);
} else {
  console.log(`✓ axis station: ${count} archetype templates in ${OUT}`);
}
