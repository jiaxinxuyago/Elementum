// ===================================================================
// ELEMENTUM · station ↔ code transcription checker (+ bootstrap harvester)
// ===================================================================
// EDITING-SURFACE FLIP (owner-ruled 2026-08-04, Option B): the station
// (Reading/Database/templates/by_axis/json/) is THE editing surface for
// reading content. Live code (src/content) ships a deliberate manual
// transcription of it — never an auto-pipeline (REA_05 §1.3).
//
// DEFAULT MODE = CHECK (writes nothing). Field-level audit of every
// code-mapped candidate variable: station value ≠ live code value →
// `OWED` (a transcription is owed in src/content), exit 1. Fields that
// exist only in the station (pending authoring, e.g. future zh
// inscriptions) and the station's metadata/__ore are station-owned and
// never compared. `--check` is accepted as an alias of the default.
//
// --harvest  ⚠ DESTRUCTIVE BOOTSTRAP ONLY: rebuilds the whole station
// from live code + REA_02 locks, OVERWRITING any owner rulings that
// live only in the station JSONs. Also (re)emits _ORDER.json (canonical
// archetype order per axis, used by build-template-twins.mjs to order
// the by_variable pivot).
// STEM_BAND_PATTERN is HELD (owner 2026-07-30) — folder README only.
// After station edits run tools/build-template-twins.mjs.
// Spec: REA_05 §1–§3.
// ===================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../../Reading/Database/templates/by_axis/json');
const HARVEST = process.argv.includes('--harvest');
const CHECK = !HARVEST;   // check is the default; '--check' remains a no-op alias
const REA03 = path.resolve(__dirname, '../../Reading/Documents/REA_03_Reading_Generation_Schema.md');

const { calculateBaziChart } = await import('../src/engine/calculator.js').catch(() => import('../src/engine/index.js'));
const engine = await import('../src/engine/index.js');
const calc = calculateBaziChart || engine.calculateBaziChart;
const { STEM_CARD_DATA, TG_CARD_DATA } = await import('../src/content/archetypeSource.js');
const { STEM_VARIANTS } = await import('../src/content/stemVariants.js');
const { buildIdentity } = await import('../src/components/reading/identity.js');
const { FACE_CARD, FAMILY_BRIEF, FAMILY_CLAUSE, FAMILY_ELEMENT, ENERGY_TILE } = await import('../src/content/reading/index.js');
const { DM_READING } = await import('../src/content/reading/readingContent.js');
const { TG_PERSONA } = await import('../src/content/tgNames.js');
const cyc = await import('../src/content/cycles.js');
const k2 = await import('../src/content/k2.js');
const pos = await import('../src/content/positions.js');
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
// (the old POSITIONS ×7 palace_frame stub axis was superseded by the
// god×slot POSITION construct, owner 2026-08-19 — see src/content/positions.js)

// GOD-axis locks that live only in REA_02 (transcribed; source noted per file).
const GOD_DEFLINE = {
  '比肩': 'Same nature, same register — the standard you hold yourself to',
  '劫财': 'Same nature, different register — the edge of comparison',
  '食神': 'Output that flows from you — giving that feels like being',
  '伤官': 'Cross-current output — brilliance made of what it meets',
  '偏财': 'Wide-ranging engagement — opportunity sensed at a distance',
  '正财': 'Methodical, directed acquisition — value built and kept',
  '七杀': "Pressure that doesn't grant permission — the trial that forges",
  '正官': 'Framework-mediated pressure — the standard that steadies',
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
  identities[chart.dayMaster.stem] = buildIdentity(chart, STEM_CARD_DATA[chart.dayMaster.stem], {});
}
// element-generic mean lines via one built model
const gChart = calc({ year: 1995, month: 4, day: 29, hour: 18, gender: 'male', longitude: 116.4, location: 'X' });
const gEc = engine.buildEnergyChart(gChart);
const gId = buildIdentity(gChart, STEM_CARD_DATA[gChart.dayMaster.stem], {});
const gModel = jd.buildJourneyModel({ chart: gChart, ec: gEc, identity: gId, card: STEM_CARD_DATA[gChart.dayMaster.stem] });
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
// Canonical archetype order per axis = seeder emission order; persisted as
// _ORDER.json so the by_variable pivot (build-template-twins.mjs) can list
// variants in taxonomy order instead of filesystem order.
const order = {};
function write(axis, name, body) {
  (order[axis] ||= []).push(name);
  const dir = path.join(OUT, axis);
  const fp = path.join(dir, `${name}.json`);
  count++;
  if (CHECK) {
    // Transcription audit (REA_05 sync law, station-first since 2026-08-04):
    // field-level, code-mapped candidates only. Station-only fields,
    // metadata, and __ore are station-owned — never compared.
    if (!fs.existsSync(fp)) { console.log(`MISSING  ${axis}/${name}.json (station file gone — restore from git or --harvest)`); drift++; return; }
    const disk = JSON.parse(fs.readFileSync(fp, 'utf8'));
    const { __ore: _codeOre, ...codeVars } = body.candidates || {};
    const stationVars = disk.candidates || {};
    // `dim` is authoring metadata on tagged-pool items (REA_16 §3) — it lives
    // station-side only and is stripped before comparing against code.
    const stripDim = (v) => Array.isArray(v)
      ? v.map((it) => { if (it && typeof it === 'object' && 'dim' in it) { const { dim, ...keep } = it; return keep; } return it; })
      : v;
    for (const [k, v] of Object.entries(codeVars)) {
      if (!(k in stationVars)) { console.log(`OWED     ${axis}/${name}.json :: ${k} (live-code field missing from station)`); drift++; }
      else if (JSON.stringify(stripDim(stationVars[k])) !== JSON.stringify(v)) { console.log(`OWED     ${axis}/${name}.json :: ${k}`); drift++; }
    }
    return;
  }
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fp, JSON.stringify(body, null, 2) + '\n', 'utf8');
}
const file = (axis, name, key, canonical, candidates, sources, extra = {}) => write(axis, name, {
  $archetype: name, axis, key, canonical_name: canonical ?? null,
  construct: 'TBD — ruled per-axis with the owner', candidate_note: CANDIDATE_NOTE,
  sources, ...extra, candidates,
});

// fresh tree (harvest mode only) — DESTRUCTIVE, see header.
if (HARVEST) {
  console.log('⚠  HARVEST MODE: rebuilding the station from live code — owner rulings that live only in station JSONs WILL BE OVERWRITTEN.');
  fs.rmSync(OUT, { recursive: true, force: true });
}

// ── STEM ×10 ──
for (const s of STEMS) {
  const card = STEM_CARD_DATA[s.hz] || {};
  const idn = identities[s.hz] || {};
  const dm = DM_READING[s.hz] || {};
  file('STEM', s.id, s.hz, card.identity?.archetypeName ?? null, {
    archetype_name: card.identity?.archetypeName ?? null,
    manifesto: card.identity?.manifesto ?? null,
    inscription: idn.inscription ?? null,
    stem_keywords: card.identity?.keywords ?? null,
    pinyin_display: idn.pinyin ?? null,
    dm_claims: dm.claims ?? null,
    dm_mechanism: dm.edge ?? null,
    yourNature_desc: card.yourNature?.desc ?? null,
    dm_overview: card.identity?.overview ?? null,
    gifts: card.gifts ?? null,
    shadows: card.shadows ?? null,
    __ore: {
      note: 'legacy corpus carried as mining material (fates pending rulings incl. §7 #4 / provisional R4)',
      subtitle: card.subtitle ?? null, chips: card.chips ?? null,
      yourNature_phrase: card.yourNature?.phrase ?? null,
      elementIntro: card.identity?.elementIntro ?? null,
      manual: card.manual ?? null, energy: card.energy ?? null,
      psych: card.psych ?? null, archetypes: card.archetypes ?? null,
      blocks: card.blocks ?? null,
    },
  }, ['Elementum_App/src/content/archetypeSource.js', 'src/content/reading/readingContent.js (DM_READING)', 'buildIdentity'],
  { status_note: 'manifesto + inscription: axis LOCKED STEM ×10 (identity-seal, owner 2026-08-03) — invariant under band/pattern; band nuance = yourNature_desc (R4)' });
}

// ── STEM_BAND ×30 ──
for (const s of STEMS) for (const b of BANDS) {
  file('STEM_BAND', `${s.id}_${b}`, `${s.hz}_${b}`, null, {
    yourNature_desc: STEM_VARIANTS[`${s.hz}_${b}`]?.yourNature?.desc ?? null,
    self_card: STEM_VARIANTS[`${s.hz}_${b}`]?.selfCard ?? null,
  }, ['Elementum_App/src/content/stemVariants.js (STEM_VARIANTS band keys)'],
  { status_note: 'yourNature band variant (BAND-A) + self_card core-element band mirror (BAND-C; slot = core element screen) — band grain only; resolver falls band → STEM baseline' });
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
    domains: k2.GOD_DOMAINS[g.hz] ?? null,
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
    k2_overview: k2.K2_CELLS[key]?.overview ?? null,
    k2_functional: k2.K2_CELLS[key]?.functional ?? null,
    k2_domain_readings: k2.K2_CELLS[key]?.domain_readings ?? null,
    k2_card: {
      face: null, persona: null, chips: null, rulingDomain: null,
      registers: {
        dominant: { r: null, x: null, gate: null, seeker: { shadow: null, work: null, bonds: null, season: null } },
        absent: { r: null, x: null, gate: null, seeker: { shadow: null, work: null, bonds: null, season: null } },
      },
    },
  }, ['REA_03 §4b (interaction seeds — parsed from the doc)', 'k2 construct: REA_03 §4 spec (unauthored)']);
}

// ── POSITION ×70 (10 gods × 7 slots — owner construct 2026-08-19) ──
// Named configurations ("The Alchemist inside the Career Gate · 偏印在月支");
// term/汉字/gate derive from the REA_02 §5e vocabulary; domains/defline/
// reading are authored per position (template = pianyin_month_branch).
for (const g of GODS) for (const s of pos.SLOTS) {
  const id = `${g.id}_${s.id}`;
  const auth = pos.POSITION_READINGS[id] || {};
  file('POSITION', id, pos.positionZh(g.hz, s), pos.positionTerm(TG_PERSONA[g.hz] ?? g.hz, s), {
    term: pos.positionTerm(TG_PERSONA[g.hz] ?? g.hz, s),
    term_zh: pos.positionZh(g.hz, s),
    gate: pos.GATES[s.gate],
    slot_zh: s.zh,
    slot_kind: s.kind,
    domains: auth.domains ?? null,
    defline: auth.defline ?? null,
    reading: auth.reading ?? null,
  }, ['REA_02 §5e (position vocabulary) · engine pillar gods'],
  { status_note: 'POSITION axis (owner construct 2026-08-19): domains declared from the canonical taxonomy ×8; template = pianyin_month_branch, the other 69 batch after its lock' });
}

// ── CONDITION ×3+2 ──
for (const [id, c] of Object.entries(CONDITIONS)) {
  file('CONDITION', id, c.zh, c.term, { ...c }, ['REA_02 §5c locks (via journeyData vocabulary tables)']);
}

// ── FAMILY ×5 ──
for (const f of FAMILIES) {
  file('FAMILY', f.id, f.zh, jd.RELATION_NOUN[f.family] ?? null, {
    relation_noun: jd.RELATION_NOUN[f.family] ?? null,
    shadow_noun: jd.SHADOW_NOUN[f.family] ?? null,
    family_line: jd.FAMILY_LINE[f.family] ?? null,
    family_key: f.family,
  }, ['REA_02 §5b locks (via journeyData vocabulary tables)']);
}


// ── TEMPLATED ×16 (the sentence patterns) ──
const T = (name, status, budget, body) => file('TEMPLATED', name, name, null, body, ['REA_03 §5 (patterns)'], { status_note: status, budget });
T('tpl_cast_line', 'LIVE · R1 RULED (owner-locked 2026-08-03): month-name format', 'one line', { pattern: 'CAST FROM {y} · {MONTH-NAME} {d} · {hour-range} {tz}', example: 'CAST FROM 1995 · APRIL 29 · 17–19 CST', hour_unknown_fallback: 'CAST FROM {y} · {MONTH-NAME} {d} · HOUR UNSET', tz_derivation: 'birth-place IANA zone → Intl short abbr at the birth date (DST-aware); zones whose short form is a raw GMT offset fall back to the long name initials (Asia/Shanghai → CST); omitted only when no zone is stored (buildIdentity, identity.js)' });
T('tpl_core_energy_line', 'LIVE', 'one line', { pattern: 'Your Core Energy is {El}' });
T('tpl_core_own_element', 'LIVE', 'one line', { pattern: "Your core is {El} — the {Arch}'s own element." });
T('tpl_core_seal_explainer', 'LIVE', '1–2 sentences', { pattern: "The seal at the wheel's center is {El}'s sign — the day master you were cast with; its share leads the wheel." });
T('tpl_relation_row', 'LIVE', 'one line', { pattern: '{El} is your {Relation}' });
T('tpl_pill_title', 'LIVE', 'one line', { pattern: '{El} is Your {Relation}' });
T('tpl_dx_line', 'LIVE', 'one line', { pattern: 'Your {El} is {Cond} — {Remedy} it.', clauses: { mapping: 'role-driven (owner-ratified 2026-07-23): friction-side incl. core excess → Overfueled·Channel · catalyst-side incl. missing → Underfueled·Refill · Balanced chart → Balanced·keep the mix' } });
T('tpl_verdict_line', 'LIVE', 'one line', { pattern: '{connector} {pole} · {verb}', clauses: { connectors: { core_overfueled: 'curdling into', core_underfueled: 'reaching for', core_balanced: 'holding', friction: 'curdling into', catalyst: 'rising toward' }, verbs: { core_overfueled: 'channel it', core_underfueled: 'refill it', core_balanced: 'trust it', friction: 'loosen it', catalyst_missing: 'borrow it', catalyst_lead: 'feed it', catalyst_other: 'keep it close' } } });
T('tpl_share_coreline', 'LIVE', 'one line', { pattern: '{El} is your Core — {Cond}' });
T('tpl_dm_prescription', 'INTERIM (pending K2) — UNSURFACED since the J4 sub-screen retired (owner 2026-08-13); P4 renders no prescription cards', '1–2 sentences', { pattern: 'SEEK THIS · {EL} / SKIP THIS · {EL} + body', clauses: { seek_present: '{El} is the energy your chart asks for — thin in you and worth feeding. Seek it on purpose.', seek_missing: "{El} is the energy you don't carry — the one your chart asks for most. Borrow it daily{, through …}.", skip: '{El} is already rich in you — more of it weighs the core. Stop adding; let what you have ease.' } });
T('tpl_element_verdict', 'LIVE', '1 sentence', { clauses: { core: 'Balanced — nothing to force; keep the mix. / Underfueled — it burns more than it takes in; refill it.', core_excess: "Overfueled — honor it, don't feed it further.", friction: 'Already rich in you — more of it weighs the core; stop adding.', catalyst_missing: 'Cast with none — borrow it daily · with {others}.', catalyst_thin: 'Thin in you — worth feeding.', catalyst: 'Give it more to shape.' } });
T('tpl_hour_chip', 'LIVE', '≤12w', { pattern: 'Cast without your hour — close, not exact. Discover it →' });
T('tpl_presence_frames', 'PLANNED', '≤20w ×4', { pattern: null, clauses: { dominant: null, present: null, scarce: null, absent: null } });
T('tpl_cycle_line', 'VOCABULARY LOCKED (REA_02 §5d, owner 2026-08-14) — the 生/克 cognition floor; surfaces pending (wheel arrows · seat derivations · team sentence · Codex chapter)', 'law verb + image line ≤8w · ×10', {
  pattern: '{ElA} {feeds|tames} {ElB} — {image line}',
  law_verbs: cyc.LAW_VERB, feeds: cyc.FEEDS, tames: cyc.TAMES,
  image_lines: cyc.CYCLE_LINE, team_nouns: cyc.TEAM_NOUN, family_teams: cyc.FAMILY_TEAM,
});
T('tpl_rx_ribbon', 'PLANNED', 'ribbon ≤14w + 10 fragments', { pattern: null, clauses: null });
T('tpl_pattern_conclusion', 'PLANNED', '≤25w · per pattern type (~6)', { pattern: null, clauses: null });

// _ORDER.json — seeder-owned structural manifest (REA_01 taxonomy order).
const orderFp = path.join(OUT, '_ORDER.json');
const orderNext = JSON.stringify(order, null, 2) + '\n';
if (CHECK) {
  if (!fs.existsSync(orderFp)) { console.log('MISSING  _ORDER.json (run --harvest once to restore)'); drift++; }
  else if (fs.readFileSync(orderFp, 'utf8') !== orderNext) { console.log('OWED     _ORDER.json (taxonomy order changed in code)'); drift++; }
  if (drift) { console.log(`✗ ${drift} transcription(s) owed between the station and live code (${count} files audited) — station is the editing surface; resolve by transcribing to src/content (or fixing an unintended station edit)`); process.exit(1); }
  console.log(`✓ station ↔ live code: every code-mapped field in sync across ${count} files (station-only fields not compared — station-owned)`);
} else {
  fs.writeFileSync(orderFp, orderNext, 'utf8');
  console.log(`⚠  harvest complete: ${count} templates rebuilt from live code in ${OUT} — review git diff before committing`);
}
