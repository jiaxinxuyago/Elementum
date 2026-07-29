// ===================================================================
// ELEMENTUM · reading-template exporter / drift audit
// ===================================================================
// Seeds Reading/Database/templates/json/*.json (one file per REA_03 variable)
// from the LIVE corpus (src/content + journeyData), and stubs the PLANNED
// set. With --check it reports JSON↔src/content drift instead of writing.
// Spec: REA_05 §1–§3. After changes run tools/build-template-twins.mjs.
//   node tools/export-reading-templates.mjs [--check]
// ===================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../../Reading/Database/templates/json');
const CHECK = process.argv.includes('--check');

const { calculateBaziChart } = await import('../src/engine/calculator.js').catch(() => import('../src/engine/index.js'));
const engine = await import('../src/engine/index.js');
const calc = calculateBaziChart || engine.calculateBaziChart;
const { STEM_CARD_DATA } = await import('../src/content/index.js');
const { buildIdentity } = await import('../src/components/reading/identity.js');
const { FACE_CARD, ENERGY_TILE } = await import('../src/content/reading/index.js');
const jd = await import('../src/components/journey/journeyData.js');

const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const GODS = ['比肩', '劫财', '食神', '伤官', '偏财', '正财', '七杀', '正官', '偏印', '正印'];
const ELS = ['metal', 'earth', 'wood', 'water', 'fire'];
const EL_HZ = { metal: '金', earth: '土', wood: '木', water: '水', fire: '火' };
const BANDS = ['concentrated', 'balanced', 'open'];
const POSITIONS = ['yearStem', 'yearBranch', 'monthStem', 'monthBranch', 'dayBranch', 'hourStem', 'hourBranch'];

// identity fields that need the real builder → derive per stem via seed charts
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
const meanOf = {}; const hookOf = {}; const tagOf = {};
for (const el of ELS) {
  const s = jd.buildElementScreen(gModel, el);
  meanOf[el] = s.mean;
  hookOf[el] = ENERGY_TILE[el]?.hook ?? null;
  tagOf[el] = ENERGY_TILE[el]?.pol ?? null;
}

const byStem = (f) => Object.fromEntries(STEMS.map((s) => [s, f(s) ?? null]));
const byGod = (f) => Object.fromEntries(GODS.map((g) => [g, f(g) ?? null]));
const byEl = (f) => Object.fromEntries(ELS.map((e) => [e, f(e) ?? null]));
const nullBy = (keys, shape = null) => Object.fromEntries(keys.map((k) => [k, typeof shape === 'function' ? shape() : shape]));
const k2Keys = ELS.flatMap((e) => GODS.map((g) => `${EL_HZ[e]}_${g}`));
const k2Stub = () => ({
  face: null, persona: null, chips: null, rulingDomain: null,
  registers: {
    dominant: { r: null, x: null, gate: null, seeker: { shadow: null, work: null, bonds: null, season: null } },
    absent: { r: null, x: null, gate: null, seeker: { shadow: null, work: null, bonds: null, season: null } },
  },
});

const T = (name, extra) => ({ $template: name, class: 'T', axis: 'TEMPLATED', status: extra.status ?? 'LIVE', budget: extra.budget ?? 'one line', source_of_truth: extra.source ?? 'Elementum_App/src/components/journey (patterns) · REA_03 §5', ...extra.body });

const TEMPLATES = [
  // ── A · identity (K1) ──
  { $template: 'archetype_name', class: 'A', axis: 'STEM', status: 'LIVE', budget: '≤3w', source_of_truth: 'Elementum_App/src/content/archetypeSource.js', values: byStem((s) => STEM_CARD_DATA[s]?.identity?.archetypeName) },
  { $template: 'manifesto', class: 'A', axis: 'STEM', status: 'LIVE', budget: '≤14w · split " · "', source_of_truth: 'Elementum_App/src/content/archetypeSource.js', values: byStem((s) => STEM_CARD_DATA[s]?.identity?.manifesto) },
  { $template: 'inscription', class: 'A', axis: 'STEM', status: 'LIVE', budget: 'propose ≤17w / ≤85c (R2)', source_of_truth: 'Elementum_App/src/content/archetypeSource.js (via buildIdentity)', values: byStem((s) => identities[s]?.inscription) },
  { $template: 'pinyin_display', class: 'A', axis: 'STEM', status: 'LIVE', budget: 'one line', source_of_truth: 'buildIdentity', values: byStem((s) => identities[s]?.pinyin) },
  { $template: 'yourNature_desc', class: 'A', axis: 'STEM', status: 'LIVE', budget: 'propose ≤46w (R4 — not surfacing)', source_of_truth: 'Elementum_App/src/content/archetypeSource.js', values: byStem((s) => STEM_CARD_DATA[s]?.yourNature?.desc) },
  { $template: 'dm_claims', class: 'A', axis: 'STEM', status: 'PLANNED', budget: '10–16w each · claim 1 ≡ inscription', source_of_truth: 'REA_03 §3 (part-2 P4)', values: byStem(() => null) },
  { $template: 'dm_mechanism', class: 'A', axis: 'STEM', status: 'PLANNED', budget: '≤30w', source_of_truth: 'REA_03 §3 (part-2 P4)', values: byStem(() => null) },
  { $template: 'self_card', class: 'A', axis: 'STEM·BAND', status: 'PLANNED', budget: 'face ≤8w · presence ≤30w', source_of_truth: 'REA_03 §3 (K1b)', values: nullBy(STEMS.flatMap((s) => BANDS.map((b) => `${s}_${b}`)), () => ({ face: null, presence: null })) },
  // ── A · reading (K2 + persona layer) ──
  { $template: 'face_kw', class: 'A', axis: 'GOD', status: 'LIVE', budget: '3 chips lowercase', source_of_truth: 'Elementum_App/src/content/reading/facesContent.js', values: byGod((g) => FACE_CARD[g]?.kw) },
  { $template: 'face_teaser', class: 'A', axis: 'GOD', status: 'LIVE', budget: '⚠ R5: measured 45–50w vs gate-teaser law ≤25w', source_of_truth: 'Elementum_App/src/content/reading/facesContent.js', values: byGod((g) => FACE_CARD[g]?.teaser) },
  { $template: 'energy_tile_hook', class: 'A', axis: 'ELEMENT (target ELEMENT·GOD)', status: 'INTERIM', budget: '~1 line · 庚-gated', source_of_truth: 'Elementum_App/src/content/reading/surfaceContent.js', values: byEl((e) => hookOf[e]) },
  { $template: 'energy_tile_tag', class: 'A', axis: 'ELEMENT (target ELEMENT·GOD)', status: 'INTERIM', budget: '~6 words', source_of_truth: 'Elementum_App/src/content/reading/surfaceContent.js', values: byEl((e) => tagOf[e]) },
  { $template: 'mean_line', class: 'A', axis: 'ELEMENT (target ELEMENT·GOD)', status: 'INTERIM', budget: '1 sentence', source_of_truth: 'Elementum_App/src/components/journey/journeyData.js (MEAN)', values: byEl((e) => meanOf[e]) },
  { $template: 'k2_energy_card', class: 'A', axis: 'ELEMENT·GOD', status: 'PLANNED', budget: 'REA_03 §4 spec (face ≤8w · persona ≤20w · chips 5×≤4w · rulingDomain ≤14w · r/x ≤30w · gate ≤25w · seeker 40/30/30/30w)', source_of_truth: 'REA_03 §4 + §4b (the 50-key reference)', values: nullBy(k2Keys, k2Stub) },
  { $template: 'palace_frames', class: 'A', axis: 'POSITION', status: 'PLANNED', budget: 'domain ≤14w + relational reframe', source_of_truth: 'REA_03 §4 (B6)', values: nullBy(POSITIONS, () => ({ domain: null, relationalReframe: null })) },
  // ── T · template patterns ──
  T('tpl_cast_line', { status: 'LIVE ⚠ R1', budget: 'one line', body: { pattern: 'CAST FROM {y} · {m} · {d} · {hour-label} {tz}', open_ruling: 'R1 — numeric vs handoff month-name format' } }),
  T('tpl_core_energy_line', { body: { pattern: 'Your Core Energy is {El}' } }),
  T('tpl_core_own_element', { body: { pattern: "Your core is {El} — the {Arch}'s own element." } }),
  T('tpl_core_seal_explainer', { budget: '1–2 sentences', body: { pattern: "The seal at the wheel's center is {El}'s sign — the day master you were cast with; its share leads the wheel." } }),
  T('tpl_relation_row', { body: { pattern: '{El} is your {Relation}' } }),
  T('tpl_pill_title', { body: { pattern: '{El} is Your {Relation}' } }),
  T('tpl_dx_line', { body: { pattern: 'Your {El} is {Cond} — {Remedy} it.', clauses: { mapping: 'role-driven (owner-ratified 2026-07-23): friction-side incl. core excess → Overfueled·Channel · catalyst-side incl. missing → Underfueled·Refill · Balanced chart → Balanced·keep the mix' } } }),
  T('tpl_verdict_line', { body: { pattern: '{connector} {pole} · {verb}', clauses: { connectors: { core_overfueled: 'curdling into', core_underfueled: 'reaching for', core_balanced: 'holding', friction: 'curdling into', catalyst: 'rising toward' }, verbs: { core_overfueled: 'channel it', core_underfueled: 'refill it', core_balanced: 'trust it', friction: 'loosen it', catalyst_missing: 'borrow it', catalyst_lead: 'feed it', catalyst_other: 'keep it close' } } } }),
  T('tpl_share_coreline', { body: { pattern: '{El} is your Core — {Cond}' } }),
  T('tpl_dm_prescription', { status: 'INTERIM', budget: '1–2 sentences · pending K2', body: { pattern: 'SEEK THIS · {EL} / SKIP THIS · {EL} + body', clauses: { seek_present: '{El} is the energy your chart asks for — thin in you and worth feeding. Seek it on purpose.', seek_missing: "{El} is the energy you don't carry — the one your chart asks for most. Borrow it daily{, through …}.", skip: '{El} is already rich in you — more of it weighs the core. Stop adding; let what you have ease.' } } }),
  T('tpl_element_verdict', { budget: '1 sentence', body: { clauses: { core: 'Balanced — nothing to force; keep the mix. / Underfueled — it burns more than it takes in; refill it.', core_excess: "Overfueled — honor it, don't feed it further.", friction: 'Already rich in you — more of it weighs the core; stop adding.', catalyst_missing: 'Cast with none — borrow it daily · with {others}.', catalyst_thin: 'Thin in you — worth feeding.', catalyst: 'Give it more to shape.' } } }),
  T('tpl_hour_chip', { budget: '≤12w', body: { pattern: 'Cast without your hour — close, not exact. Discover it →' } }),
  T('tpl_presence_frames', { status: 'PLANNED', budget: '≤20w patterns ×4', body: { pattern: null, clauses: { dominant: null, present: null, scarce: null, absent: null } } }),
  T('tpl_cycle_line', { status: 'PLANNED', budget: 'label ≤10w + line ≤20w · ×20', body: { pattern: 'Why {ElA} {feeds/tests} {ElB} — the cycle, in your chart', clauses: null } }),
  T('tpl_rx_ribbon', { status: 'PLANNED', budget: 'ribbon ≤14w + 10 fragments', body: { pattern: null, clauses: null } }),
  T('tpl_pattern_conclusion', { status: 'PLANNED', budget: '≤25w · per pattern type (~6)', body: { pattern: null, clauses: null } }),
];

fs.mkdirSync(OUT, { recursive: true });
let drift = 0;
for (const t of TEMPLATES) {
  const p = path.join(OUT, `${t.$template}.json`);
  const next = JSON.stringify(t, null, 2) + '\n';
  if (CHECK && fs.existsSync(p)) {
    const cur = fs.readFileSync(p, 'utf8');
    if (cur !== next && t.status?.startsWith('LIVE')) { console.log(`DRIFT: ${t.$template}`); drift++; }
    continue;
  }
  if (CHECK) { console.log(`MISSING: ${t.$template}`); drift++; continue; }
  fs.writeFileSync(p, next, 'utf8');
  console.log(`wrote ${t.$template}.json (${t.class} · ${t.status})`);
}
if (CHECK) console.log(drift ? `${drift} drift/missing` : 'station in sync with live corpus');
else console.log(`✓ ${TEMPLATES.length} template files in ${OUT}`);
