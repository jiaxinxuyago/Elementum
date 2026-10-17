// ===================================================================
// ELEMENTUM · Selection fixtures gate (owner rulings 2026-09-20)
// ===================================================================
// Runs a fixed set of synthetic charts through the app's own reading
// assembly (buildEnergyChart → buildJourneyModel → resolveDayMasterReading →
// buildDiagnosisModel → buildElementScreen) and asserts the contracts:
//   B11  one band for every surface (nature variant = ec.band)
//   E1/E2 the P4 diagnosis echoes the energy pages (chips and lines are the
//        pages' own; none through an absent or thin friction, R3). Replaced
//        B9 and D2 (the door-tagged pools, retired 2026-10-17)
//   B10  a wanted abundant/dominant energy's page turn = its carry wide line
//   D3   the core is never flipped by the 40% override
//   §4   volume boundaries (0.5 / 10 / 20 / 40) just below, at and above, on
//        the pure classifier and on the assembled page turn (eval-pack spec §4/§8)
//   §5   the weighted god ledger: single face 3 · lead ≥60% 2+1 · lead <60% 2+2 ·
//        50/50 deterministic lead · angle rotation drive/cost_self/cost_others
// Usage: node tools/qa-selection-fixtures.mjs   (exit 1 on any failure)
// ===================================================================
import { buildEnergyChart } from '../src/engine/buildEnergyChart.js';
import { buildJourneyModel, buildElementScreen, buildDiagnosisModel, clashes } from '../src/components/journey/journeyData.js';
import { resolveDayMasterReading } from '../src/components/reading/readingResolve.js';
import { STEM_CARD_DATA } from '../src/content/index.js';
import { STEM_VARIANTS } from '../src/content/stemVariants.js';
import { PAIR_CELLS } from '../src/content/pairs.js';
import { K2_CELLS, GOD_RULING_DOMAINS } from '../src/content/k2.js';
import { FUNCTION_METRICS } from '../src/content/metrics.js';
import { volumeOf, resolveBand, VOLUME } from '../src/engine/energyRoles.js';
import { functionMetrics } from '../src/engine/functionMetrics.js';
import { GOD_FN } from '../src/content/k2.js';

const BIG = new Set(['abundant', 'dominant']);
const FIXTURES = [
  { name: 'golden 庚 (1995-04-29 18:00 Beijing)', stem: '庚', element: 'Metal', strength: 'strong', p: { Earth: 33, Wood: 33, Metal: 23, Water: 6, Fire: 5 }, expect: { band: 'concentrated', fricChips: 2 } },
  { name: 'weak 丁, one shadow door (Order)', stem: '丁', element: 'Fire', strength: 'weak', p: { Wood: 30, Fire: 15, Earth: 5, Metal: 10, Water: 40 }, expect: { band: 'open', fricChips: 1 } },
  { name: 'strong 庚, no shadow door', stem: '庚', element: 'Metal', strength: 'strong', p: { Metal: 5, Earth: 5, Wood: 30, Fire: 30, Water: 30 }, expect: { band: 'concentrated', fricChips: 0 } },
  { name: 'strong 庚, lone Mind door (Earth 54)', stem: '庚', element: 'Metal', strength: 'strong', p: { Earth: 54, Wood: 16, Water: 13, Fire: 13, Metal: 4 }, expect: { band: 'concentrated', fricChips: 1 } },
  { name: 'moderate 庚, Wood 30 (Balanced baseline)', stem: '庚', element: 'Metal', strength: 'moderate', p: { Metal: 15, Earth: 15, Wood: 30, Fire: 25, Water: 15 }, expect: { band: 'balanced', balanced: true } },
  { name: 'moderate 庚, Wood 40 (band split)', stem: '庚', element: 'Metal', strength: 'moderate', p: { Metal: 15, Earth: 15, Wood: 40, Fire: 15, Water: 15 }, expect: { band: 'open' } },
  { name: 'moderate 庚, Metal 60 (core exempt)', stem: '庚', element: 'Metal', strength: 'moderate', p: { Metal: 60, Earth: 10, Wood: 10, Fire: 10, Water: 10 }, expect: { band: 'balanced', balanced: true, coreRole: 'core' } },
  { name: 'strong 辛 (yin), heavy Earth', stem: '辛', element: 'Metal', strength: 'strong', p: { Metal: 20, Earth: 45, Wood: 15, Fire: 10, Water: 10 }, expect: { band: 'concentrated', yin: true } },
];
const STRENGTH_FOR_BAND = { open: 'weak', concentrated: 'strong', balanced: 'moderate' };
let fails = 0; const fail = (f, msg) => { fails++; console.log(`  ✗ ${f.name}: ${msg}`); };

for (const f of FIXTURES) {
  const fails0 = fails; // this fixture's own result, not the global count
  const chart = { dayMaster: { stem: f.stem, element: f.element, strength: f.strength }, elements: Object.fromEntries(Object.entries(f.p).map(([k, score]) => [k, { score }])), pillars: {}, tgPattern: 'pure' };
  const ec = buildEnergyChart(chart);
  const m = buildJourneyModel({ chart, ec, identity: {}, card: STEM_CARD_DATA[f.stem] });
  const r = resolveDayMasterReading(f.stem, chart, m.band);
  const dx = buildDiagnosisModel(m);
  const e = f.expect;
  if (m.band !== ec.band) fail(f, `journey band ${m.band} ≠ ec.band ${ec.band}`);
  if (e.band && m.band !== e.band) fail(f, `band ${m.band}, expected ${e.band}`);
  // B11: the nature paragraph is the resolved band's variant
  const v = STEM_VARIANTS[`${f.stem}_${m.band}`]?.yourNature?.desc;
  if (v && r.nature !== v) fail(f, `nature paragraph is not the ${m.band} variant`);
  // the diagnosis groups follow the band (E1/E2 below check every row)
  if (e.balanced && !m.balanced) fail(f, 'expected a Balanced chart');
  if (e.balanced && dx.groups[0]?.kind !== 'balanced') fail(f, 'a Balanced chart should read one group');
  // R3: only a present friction shows chips (absent and thin cannot be overgrown)
  const fricChips = (dx.groups.find((g) => g.kind === 'friction')?.rows || []).filter((x) => x.chips.length).length;
  if (e.fricChips != null && fricChips !== e.fricChips) fail(f, `${fricChips} friction rows with chips, expected ${e.fricChips}`);
  // D3: the core is never flipped
  const core = m.els.find((x) => x.isCore);
  if (core.excess) fail(f, 'core flipped by the 40% override');
  if (e.coreRole && core.role !== e.coreRole) fail(f, `core role ${core.role}, expected ${e.coreRole}`);
  // B10: wanted abundant/dominant non-core energy → page turn = carry wide line
  for (const x of m.els) {
    if (x.isCore || x.role !== 'catalyst' || !BIG.has(x.volume) || m.balanced) continue;
    const s = buildElementScreen(m, x.el); const cell = PAIR_CELLS[`${m.core.hz}_${x.hz}`];
    const wide = (e.yin && cell.carry_yin?.wide?.clause) || cell.carry.wide?.clause;
    if (!wide) { fail(f, `${x.name}: no wide line in ${m.core.hz}_${x.hz}`); continue; }
    if (!s.mech.turn.startsWith(wide)) fail(f, `${x.name} page turn does not open with the wide line: "${s.mech.turn.slice(0, 60)}"`);
  }
  // no arrows or dashes in assembled copy
  for (const t of [r.nature, dx.lead]) if (t && /[—→;]/.test(t)) fail(f, `sign in copy: "${t.slice(0, 50)}"`);
  console.log(`${fails > fails0 ? '✗' : '✓'} ${f.name}: band ${m.band} · ${dx.groups.map((g) => `${g.kind} ${g.rows.map((x) => x.name).join('/')}`).join(' · ')}`);
}

// ---------------------------------------------------------------------------
// §4 · volume boundaries on the pure classifier (decimals allowed here)
// ---------------------------------------------------------------------------
{
  const f = { name: 'volume boundaries (classifier)' };
  const cases = [[0.4, 'absent'], [0.5, 'absent'], [0.6, 'thin'], [9.9, 'thin'], [10, 'thin'], [10.1, 'present'], [19.9, 'present'], [20, 'abundant'], [20.1, 'abundant'], [39.9, 'abundant'], [40, 'dominant'], [40.1, 'dominant']];
  for (const [p, want] of cases) if (volumeOf(p) !== want) fail(f, `volumeOf(${p}) = ${volumeOf(p)}, expected ${want}`);
  if (VOLUME.absent !== 0.5 || VOLUME.thin !== 10 || VOLUME.abundant !== 20 || VOLUME.dominant !== 40) fail(f, 'VOLUME thresholds drifted from the documented 0.5 / 10 / 20 / 40');
  // the Balanced guard: moderate strength, non-core at 39.9 / 40 / 40.1; the core itself never trips it
  const band = (Wood, Metal = 15) => resolveBand({ strength: 'moderate', dmEl: 'Metal', presence: { Metal, Earth: 15, Wood, Fire: 15, Water: 100 - Metal - 30 - Wood } });
  if (band(39.9) !== 'balanced') fail(f, `non-core 39.9 → ${band(39.9)}, expected balanced`);
  if (band(40) !== 'open') fail(f, `non-core 40 → ${band(40)}, expected open (Wood drains Metal)`);
  if (band(40.1) !== 'open') fail(f, `non-core 40.1 → ${band(40.1)}, expected open`);
  if (resolveBand({ strength: 'moderate', dmEl: 'Metal', presence: { Metal: 60, Earth: 10, Wood: 10, Fire: 10, Water: 10 } }) !== 'balanced') fail(f, 'core at 60 tripped the Balanced guard');
  if (resolveBand({ strength: 'moderate', dmEl: 'Metal', presence: { Metal: 15, Earth: 40, Wood: 15, Fire: 15, Water: 15 } }) !== 'concentrated') fail(f, 'dominant feeder (Earth 40) should fall to concentrated');
  console.log(`  ${f.name}: ${cases.length} points + Balanced guard 39.9 / 40 / 40.1 + core 60`);
}

// ---------------------------------------------------------------------------
// §4 · volume boundaries on the assembled page turn (presence is rounded to
// whole percents by buildEnergyChart, so the assembled boundary is 19 | 20,
// 39 | 40, 10 | 11, 0 | 1). Strong 庚: Wood wanted, Earth unwanted.
// ---------------------------------------------------------------------------
{
  const assemble = (p) => {
    const chart = { dayMaster: { stem: '庚', element: 'Metal', strength: 'strong' }, elements: Object.fromEntries(Object.entries(p).map(([k, score]) => [k, { score }])), pillars: {}, tgPattern: 'pure' };
    const ec = buildEnergyChart(chart); const m = buildJourneyModel({ chart, ec, identity: {}, card: STEM_CARD_DATA['庚'] });
    return { m, turn: (el) => buildElementScreen(m, el).mech.turn, x: (el) => m.els.find((e) => e.el === el) };
  };
  const cell = (hz) => PAIR_CELLS[`金_${hz}`];
  const opens = (turn, line) => !!line?.clause && turn.startsWith(line.clause);
  const rows = [
    // wanted Wood at 19 → present → the authored catalyst turn; at 20 → abundant → the wide line
    { name: 'wanted Wood 19 (present)', p: { Metal: 30, Earth: 30, Wood: 19, Fire: 11, Water: 10 }, el: 'wood', vol: 'present', want: (t) => t === cell('木').mechanism.catalyst_turn },
    { name: 'wanted Wood 20 (abundant)', p: { Metal: 30, Earth: 30, Wood: 20, Fire: 10, Water: 10 }, el: 'wood', vol: 'abundant', want: (t) => opens(t, cell('木').carry.wide) },
    { name: 'wanted Wood 40 (dominant → excess override flips it)', p: { Metal: 30, Earth: 15, Wood: 40, Fire: 5, Water: 10 }, el: 'wood', vol: 'dominant', excess: true, want: (t) => opens(t, cell('木').carry.excess) },
    { name: 'wanted Wood 1 (thin)', p: { Metal: 30, Earth: 30, Wood: 1, Fire: 29, Water: 10 }, el: 'wood', vol: 'thin', want: (t) => t === cell('木').mechanism.catalyst_turn },
    { name: 'wanted Wood 0 (absent → missing line)', p: { Metal: 30, Earth: 30, Wood: 0, Fire: 30, Water: 10 }, el: 'wood', vol: 'absent', want: (t) => opens(t, cell('木').carry.missing) },
    // unwanted Earth on a strong Blade: 0 → spared · 10 → thin · 11 → present (friction turn) · 39 → abundant (friction turn) · 40 → excess
    { name: 'unwanted Earth 0 (absent → spared line)', p: { Metal: 30, Earth: 0, Wood: 30, Fire: 30, Water: 10 }, el: 'earth', vol: 'absent', want: (t) => opens(t, cell('土').carry.spared) },
    { name: 'unwanted Earth 10 (thin line)', p: { Metal: 30, Earth: 10, Wood: 30, Fire: 20, Water: 10 }, el: 'earth', vol: 'thin', want: (t) => opens(t, cell('土').carry.thin) },
    { name: 'unwanted Earth 11 (present → friction turn)', p: { Metal: 30, Earth: 11, Wood: 30, Fire: 19, Water: 10 }, el: 'earth', vol: 'present', want: (t) => t === cell('土').mechanism.friction_turn },
    { name: 'unwanted Earth 39 (abundant → friction turn)', p: { Metal: 30, Earth: 39, Wood: 11, Fire: 10, Water: 10 }, el: 'earth', vol: 'abundant', want: (t) => t === cell('土').mechanism.friction_turn },
    { name: 'unwanted Earth 40 (dominant → excess line)', p: { Metal: 30, Earth: 40, Wood: 10, Fire: 10, Water: 10 }, el: 'earth', vol: 'dominant', want: (t) => opens(t, cell('土').carry.excess) },
  ];
  for (const r of rows) {
    const f = { name: `page turn · ${r.name}` }; const a = assemble(r.p); const x = a.x(r.el);
    if (x.volume !== r.vol) fail(f, `volume ${x.volume}, expected ${r.vol}`);
    if (r.excess && !x.excess) fail(f, 'excess override did not flip a dominant non-core energy');
    const t = a.turn(r.el);
    if (!r.want(t)) fail(f, `turn does not match the state: "${t.slice(0, 70)}"`);
    if (/[—→;]/.test(t)) fail(f, `sign in turn: "${t.slice(0, 50)}"`);
    // volume language: a wanted abundant energy never reads as thin; a thin unwanted one never reads as heavy
    if (r.vol === 'abundant' && x.role === 'catalyst' && /^Run thin/i.test(t)) fail(f, 'abundant wanted energy opens "Run thin"');
    if (r.vol === 'thin' && x.role === 'friction' && /^Run heavy/i.test(t)) fail(f, 'thin unwanted energy opens "Run heavy"');
  }
  console.log(`  page turns across the volume boundaries: ${rows.length} states`);
}

// ---------------------------------------------------------------------------
// §5 · the weighted god ledger (REA_16 §2c, owner 2026-09-03). Face weights
// are injected on the energy chart so the split is exact; the share the model
// compares is the rounded whole percent the card shows, so 59.5–59.9 read as
// 60 and take the 2+1 shape, in step with the displayed number.
// ---------------------------------------------------------------------------
{
  const blend = (weights) => {
    const chart = { dayMaster: { stem: '庚', element: 'Metal', strength: 'strong' }, elements: { Earth: { score: 33 }, Wood: { score: 33 }, Metal: { score: 23 }, Water: { score: 6 }, Fire: { score: 5 } }, pillars: {}, tgPattern: 'pure' };
    const ec = buildEnergyChart(chart); const wood = ec.energies.find((e) => e.el === 'wood');
    if (weights) { wood.faces = [{ god: '偏财', weight: weights[0], polarity: 'yang' }, { god: '正财', weight: weights[1], polarity: 'yin' }].filter((x) => x.weight > 0).sort((a, b) => b.weight - a.weight); wood.leadGod = wood.faces[0].god; }
    const m = buildJourneyModel({ chart, ec, identity: {}, card: STEM_CARD_DATA['庚'] });
    return m.els.find((e) => e.el === 'wood');
  };
  const L = (g) => K2_CELLS[`木_${g}`].fnReading.catalyst.ledger;
  const ANGLES = ['drive', 'cost_self', 'cost_others'];
  const check = (name, weights, wantLead, wantMinor, expectLeadGod) => {
    const f = { name: `ledger · ${name}` }; const x = blend(weights); const rows = x.fnRows || [];
    const lead = x.faces[0].god;
    if (expectLeadGod && lead !== expectLeadGod) fail(f, `lead face ${lead}, expected ${expectLeadGod}`);
    const nLead = rows.filter((r) => (r.god ?? lead) === lead).length, nMinor = rows.length - nLead;
    if (nLead !== wantLead || nMinor !== wantMinor) fail(f, `${nLead}+${nMinor} rows, expected ${wantLead}+${wantMinor} (${rows.map((r) => r.word).join(' / ')})`);
    // rank: rows are the authored top-N of each cell, in authored order; the angles rotate drive/cost_self/cost_others by position
    const minor = x.faces[1]?.god;
    // the minority skips a keyword that opposes a lead keyword (owner M4, 2026-10-17: BLEND_CLASHES)
    // the contract (owner R2-2, 2026-10-17): the lowest-rank clash-free combination of lead 2 + minority n
    let expected = null;
    if (!minor) expected = L(lead).slice(0, wantLead).map((r) => ({ ...r, god: lead }));
    else { const C = (n) => (n === 1 ? [[0], [1], [2]] : [[0, 1], [0, 2], [1, 2]]); const cs = []; for (const a of C(2)) for (const b of C(wantMinor)) cs.push([a, b, [...a, ...b].reduce((x, y) => x + y, 0)]); cs.sort((x, y) => x[2] - y[2]);
      for (const [a, b] of cs) { const set = [...a.map((i) => ({ ...L(lead)[i], god: lead })), ...b.map((i) => ({ ...L(minor)[i], god: minor }))]; if (!set.some((x, i) => set.some((y, j) => j > i && clashes(x.word, y.word)))) { expected = set; break; } } }
    if (!expected) { fail(f, 'no clean combination for this fixture'); return; }
    expected.forEach((e, i) => { const r = rows[i]; if (!r || r.word !== e.word) fail(f, `row ${i} is ${r?.word}, expected ${e.word}`); else if (r.text !== e.angles[ANGLES[i % 3]]) fail(f, `row ${i} (${r.word}) did not enter by the ${ANGLES[i % 3]} angle`); });
    if (x.adj.join('|') !== rows.map((r) => r.word).join('|')) fail(f, 'card chips are not the ledger words');
    console.log(`  ${f.name}: ${rows.map((r) => `${r.word}${r.god ? ` (${r.god})` : ''}`).join(' · ')}`);
  };
  check('single face 偏财', null, 3, 0, '偏财');
  check('lead 59.4 / 40.6 → 2+2', [59.4, 40.6], 2, 2, '偏财');
  check('lead 60 / 40 → 2+1', [60, 40], 2, 1, '偏财');
  check('lead 60.6 / 39.4 → 2+1', [60.6, 39.4], 2, 1, '偏财');
  check('reversed lead 正财 65 / 35 → 2+1', [35, 65], 2, 1, '正财');
  check('50 / 50 tie → 2+2, yang face leads (stable sort)', [50, 50], 2, 2, '偏财');
  // the 60% face split never touches the 40% volume law: a 50/50 face split is not the Balanced chart baseline
  const tie = blend([50, 50]); if (tie.dx?.condition === 'Balanced') fail({ name: 'ledger · face split vs chart band' }, 'a balanced face split read as the Balanced chart');
}

// ---------------------------------------------------------------------------
// E1 / E2 · THE DIAGNOSIS (P4 v4, owner 2026-10-17): the Day Master page adds
// no keyword of its own. E1: every row's chips are that energy page's chips,
// in order (none on an absent or thin friction, R3). E2: every row's line is
// text of that energy page's definition. Every energy appears once; a
// Balanced chart is one group; frictions come before catalysts.
// ---------------------------------------------------------------------------
{
  const PRESENT_V = new Set(['present', 'abundant', 'dominant']);
  let rowsChecked = 0;
  for (const f of FIXTURES) {
    const t = { name: `diagnosis · ${f.name}` };
    const chart = { dayMaster: { stem: f.stem, element: f.element, strength: f.strength }, elements: Object.fromEntries(Object.entries(f.p).map(([k, score]) => [k, { score }])), pillars: {}, tgPattern: 'pure' };
    const ec = buildEnergyChart(chart);
    const m = buildJourneyModel({ chart, ec, identity: {}, card: STEM_CARD_DATA[f.stem] });
    const dx = buildDiagnosisModel(m);
    const rows = dx.groups.flatMap((g) => g.rows);
    if (rows.length !== 5 || new Set(rows.map((r) => r.el)).size !== 5) fail(t, `${rows.length} rows, expected each of the five energies once`);
    if (m.balanced && (dx.groups.length !== 1 || dx.groups[0].kind !== 'balanced')) fail(t, 'a Balanced chart should show one group');
    if (!m.balanced && dx.groups.length === 2 && dx.groups[0].kind !== 'friction') fail(t, 'frictions should come before catalysts');
    if (/door|[—→;]/i.test(dx.lead)) fail(t, `lead breaks the house words: "${dx.lead}"`);
    for (const row of rows) {
      rowsChecked++;
      const s = buildElementScreen(m, row.el); const x = m.els.find((e) => e.el === row.el);
      const page = (s.fnReading?.ledger || []).map((l) => l.word);
      const quiet = !m.balanced && row.pole === 'friction' && !PRESENT_V.has(x.volume);
      const want = quiet ? [] : page;
      if (row.chips.join('|') !== want.join('|')) fail(t, `${row.name} chips ${row.chips.join(' / ')} ≠ its page ${want.join(' / ')}`);
      const fn = s.fn || {};
      const source = [fn.definition_balanced, fn.definition_catalyst, fn.definition_friction].join(' ');
      const tails = ['catalyst', 'friction'].map((p) => K2_CELLS[`${x.hz}_${x.god}`]?.fnReading?.[p]?.define || '').join(' ');
      const body = row.line.slice(1);
      if (!row.line || !(source + ' ' + tails).includes(body)) fail(t, `${row.name} line is not its page's text: "${row.line.slice(0, 60)}"`);
    }
  }
  console.log(`  E1/E2 diagnosis rows echo their energy pages: ${rowsChecked} rows across ${FIXTURES.length} fixtures`);
}

// M1 (owner 2026-10-14, REA_19): THE FUNCTION METRICS on every energy page of
// every fixture: three bars; the two trait bars are the two gods of the
// element's family in the station's order with levels 1 to 5 from the gods'
// shares; the style bar's level is 1 to 5 with two ends; the pole follows the
// page (friction on a friction role or the core's excess, catalyst otherwise);
// no gloss line (owner 2026-10-15, static bars); the core's style bar reads
// its band (Overfueled 4, with the excess override 5; Underfueled 2; Balanced 3).
{
  const f = { name: 'M1 function metrics' }; let pages = 0;
  for (const fx of FIXTURES) {
    const chart = { dayMaster: { stem: fx.stem, element: fx.element, strength: fx.strength }, elements: Object.fromEntries(Object.entries(fx.p).map(([k, score]) => [k, { score }])) };
    const ec = buildEnergyChart(chart); const m = buildJourneyModel({ chart, ec, identity: {}, card: STEM_CARD_DATA[fx.stem] });
    for (const el of Object.keys(m.byEl)) {
      const r = m.byEl[el]; const fm = functionMetrics(r, m.band); pages++;
      if (!fm) { fail(f, `${fx.name} · ${el}: no metrics`); continue; }
      if (fm.bars.length !== 3) fail(f, `${fx.name} · ${el}: ${fm.bars.length} bars`);
      const gods = fm.bars.filter((b) => b.kind === 'trait').map((b) => b.god);
      if (gods.length !== 2 || gods.some((g) => GOD_FN[g] !== fm.function)) fail(f, `${fx.name} · ${el}: trait gods ${gods.join('/')} are not the ${fm.function} family`);
      for (const b of fm.bars) { if (!(b.level >= 1 && b.level <= 5)) fail(f, `${fx.name} · ${el} · ${b.key}: level ${b.level}`); if (b.kind === 'style' && (!b.ends || b.ends.length !== 2)) fail(f, `${fx.name} · ${el} · ${b.key}: no ends`); }
      const wantPole = (r.role === 'friction' || r.coreExcess) ? 'friction' : 'catalyst'; if (fm.pole !== wantPole) fail(f, `${fx.name} · ${el}: pole ${fm.pole}, expected ${wantPole}`);
      if (r.isCore) { const st = fm.bars.find((b) => b.kind === 'style'); const want = r.coreExcess ? 5 : ({ Overfueled: 4, Underfueled: 2, Balanced: 3 })[m.band]; if (want && st.level !== want) fail(f, `${fx.name} · ${el}: core style level ${st.level}, expected ${want} for ${m.band}`); }
    }
  }
  console.log(`  ${f.name}: ${pages} energy pages across ${FIXTURES.length} fixtures`);
}

console.log(fails ? `\n✗ ${fails} selection fixture failure(s)` : '\n✓ selection fixtures: every contract holds');
// ---------------------------------------------------------------------------
// THE EDGE (owner 2026-10-16, v9): every adopted edge carries exactly its god's
// three ruling domains in the table's order, a two-sentence lead of 30 to 45 words
// on the fixed frame, and a metric that is one of its function's bars.
// ---------------------------------------------------------------------------
{
  const f = { name: 'edge · the ruling domains, the lead, the metric' }; let n = 0;
  for (const [cell, c] of Object.entries(K2_CELLS)) {
    if (!c.edge) continue; n++;
    const god = cell.split('_')[1]; const want = GOD_RULING_DOMAINS[god] || [];
    if (JSON.stringify(c.edge.domains) !== JSON.stringify(want)) fail(f, `${cell}: domains ${c.edge.domains?.join('/')} ≠ ${want.join('/')}`);
    // v9 (owner 2026-10-16): two sentences of 30 to 45 words; the first on the frame
    // "<Energy> runs through your <d1>, your <d2> and your <d3>." (Social reads "social life").
    const w = String(c.edge.lead || '').trim().split(/\s+/).length; if (w < 30 || w > 45) fail(f, `${cell}: lead ${w} words`);
    const EN = { '木': 'Wood', '火': 'Fire', '土': 'Earth', '金': 'Metal', '水': 'Water' }[cell.split('_')[0]];
    const fw = (d) => (d === 'Social' ? 'social life' : String(d).toLowerCase());
    if (!(c.edge.lead || '').startsWith(`${EN} runs through your ${want.map(fw).join(', your ').replace(/, your ([^,]+)$/, ' and your $1')}.`)) fail(f, `${cell}: the first sentence is not the frame`);
    if ((c.edge.lead || '').split(/(?<=[.!?])\s+/).filter(Boolean).length !== 2) fail(f, `${cell}: not two sentences`);
    const fnKey = GOD_FN[god]; const fm = Object.values(FUNCTION_METRICS).find((x) => x.function === fnKey); const bars = (fm?.bars || fm?.metrics || []).map((b) => b.key);
    if (!bars.length) fail(f, `${cell}: no bars found for the ${fnKey} function`);
    if (bars.length && !bars.includes(c.edge.metric)) fail(f, `${cell}: metric ${c.edge.metric} not in ${bars.join('/')}`);
  }
  console.log(`  ${f.name}: ${n} edges checked`);
}

process.exit(fails ? 1 : 0);
