// ===================================================================
// ELEMENTUM · Selection fixtures gate (owner rulings 2026-09-20)
// ===================================================================
// Runs a fixed set of synthetic charts through the app's own reading
// assembly (buildEnergyChart → buildJourneyModel → poolDoors →
// resolveDayMasterReading → buildCarryModel → buildElementScreen) and
// asserts the contracts the evaluation reconciliation fixed:
//   B11  one band for every surface (nature variant = ec.band)
//   B9   a chip never comes through a door the chart did not open;
//        [] doors → no chips; Balanced → the 3+3 baseline
//   D2   a lone door shows both its faces; no cross-door borrowing
//   B10  a wanted abundant/dominant energy's page turn = its carry wide line
//   D3   the core is never flipped by the 40% override
//   §4   volume boundaries (0.5 / 10 / 20 / 40) just below, at and above, on
//        the pure classifier and on the assembled page turn (eval-pack spec §4/§8)
//   §5   the weighted god ledger: single face 3 · lead ≥60% 2+1 · lead <60% 2+2 ·
//        50/50 deterministic lead · door rotation trait/scene/outside
// Usage: node tools/qa-selection-fixtures.mjs   (exit 1 on any failure)
// ===================================================================
import { buildEnergyChart } from '../src/engine/buildEnergyChart.js';
import { buildJourneyModel, poolDoors, buildCarryModel, buildElementScreen } from '../src/components/journey/journeyData.js';
import { resolveDayMasterReading } from '../src/components/reading/readingResolve.js';
import { STEM_CARD_DATA } from '../src/content/index.js';
import { STEM_VARIANTS } from '../src/content/stemVariants.js';
import { PAIR_CELLS } from '../src/content/pairs.js';
import { K2_CELLS } from '../src/content/k2.js';
import { volumeOf, resolveBand, VOLUME } from '../src/engine/energyRoles.js';

const BIG = new Set(['abundant', 'dominant']);
const FIXTURES = [
  { name: 'golden 庚 (1995-04-29 18:00 Beijing)', stem: '庚', element: 'Metal', strength: 'strong', p: { Earth: 33, Wood: 33, Metal: 23, Water: 6, Fire: 5 }, expect: { band: 'concentrated', gifts: 3, shadows: 2 } },
  { name: 'weak 丁, one shadow door (Order)', stem: '丁', element: 'Fire', strength: 'weak', p: { Wood: 30, Fire: 15, Earth: 5, Metal: 10, Water: 40 }, expect: { band: 'open', gifts: 2, shadows: 1 } },
  { name: 'strong 庚, no shadow door', stem: '庚', element: 'Metal', strength: 'strong', p: { Metal: 5, Earth: 5, Wood: 30, Fire: 30, Water: 30 }, expect: { band: 'concentrated', gifts: 3, shadows: 0 } },
  { name: 'strong 庚, lone Mind door (Earth 54)', stem: '庚', element: 'Metal', strength: 'strong', p: { Earth: 54, Wood: 16, Water: 13, Fire: 13, Metal: 4 }, expect: { band: 'concentrated', gifts: 3, shadows: 2, sameDoor: 'mind' } },
  { name: 'moderate 庚, Wood 30 (Balanced baseline)', stem: '庚', element: 'Metal', strength: 'moderate', p: { Metal: 15, Earth: 15, Wood: 30, Fire: 25, Water: 15 }, expect: { band: 'balanced', gifts: 3, shadows: 3, balanced: true } },
  { name: 'moderate 庚, Wood 40 (band split)', stem: '庚', element: 'Metal', strength: 'moderate', p: { Metal: 15, Earth: 15, Wood: 40, Fire: 15, Water: 15 }, expect: { band: 'open', gifts: 2, shadows: 3 } },
  { name: 'moderate 庚, Metal 60 (core exempt)', stem: '庚', element: 'Metal', strength: 'moderate', p: { Metal: 60, Earth: 10, Wood: 10, Fire: 10, Water: 10 }, expect: { band: 'balanced', gifts: 3, shadows: 3, balanced: true, coreRole: 'core' } },
  { name: 'strong 辛 (yin), heavy Earth', stem: '辛', element: 'Metal', strength: 'strong', p: { Metal: 20, Earth: 45, Wood: 15, Fire: 10, Water: 10 }, expect: { band: 'concentrated', yin: true } },
];
const STRENGTH_FOR_BAND = { open: 'weak', concentrated: 'strong', balanced: 'moderate' };
let fails = 0; const fail = (f, msg) => { fails++; console.log(`  ✗ ${f.name}: ${msg}`); };

for (const f of FIXTURES) {
  const chart = { dayMaster: { stem: f.stem, element: f.element, strength: f.strength }, elements: Object.fromEntries(Object.entries(f.p).map(([k, score]) => [k, { score }])), pillars: {}, tgPattern: 'pure' };
  const ec = buildEnergyChart(chart);
  const m = buildJourneyModel({ chart, ec, identity: {}, card: STEM_CARD_DATA[f.stem] });
  const doors = poolDoors(m);
  const r = resolveDayMasterReading(f.stem, chart, doors, m.band);
  const carry = buildCarryModel(m, r);
  const e = f.expect;
  if (m.band !== ec.band) fail(f, `journey band ${m.band} ≠ ec.band ${ec.band}`);
  if (e.band && m.band !== e.band) fail(f, `band ${m.band}, expected ${e.band}`);
  // B11: the nature paragraph is the resolved band's variant
  const v = STEM_VARIANTS[`${f.stem}_${m.band}`]?.yourNature?.desc;
  if (v && r.nature !== v) fail(f, `nature paragraph is not the ${m.band} variant`);
  // counts
  if (e.gifts != null && r.gifts.length !== e.gifts) fail(f, `${r.gifts.length} gifts, expected ${e.gifts}`);
  if (e.shadows != null && r.shadows.length !== e.shadows) fail(f, `${r.shadows.length} shadows, expected ${e.shadows}`);
  if (e.balanced && !doors.balanced) fail(f, 'expected the Balanced baseline');
  // B9 / D2: every chip's door is an open door (or Balanced)
  if (!doors.balanced) {
    const openG = new Set(doors.gifts.map((d) => d.door)), openS = new Set(doors.shadows.map((d) => d.door));
    for (const x of r.gifts) if (!openG.has(x.door)) fail(f, `gift "${x.phrase}" came through closed door ${x.door}`);
    for (const x of r.shadows) if (!openS.has(x.door)) fail(f, `shadow "${x.phrase}" came through closed door ${x.door}`);
    if (e.sameDoor && !(r.shadows.length === 2 && r.shadows.every((x) => x.door === e.sameDoor))) fail(f, `lone ${e.sameDoor} door should show both faces`);
  }
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
    if (!carry.seek?.sentence.includes(wide)) fail(f, `${x.name} carry seek row lacks the wide line`);
  }
  // no arrows or dashes in assembled copy
  for (const t of [r.nature, carry.lead, carry.ease?.sentence, carry.ease?.remedy, carry.seek?.sentence, carry.seek?.remedy]) if (t && /[—→;]/.test(t)) fail(f, `sign in copy: "${t.slice(0, 50)}"`);
  console.log(`${fails ? ' ' : ' '} ${f.name}: band ${m.band} · gifts ${r.gifts.map((x) => x.phrase).join(' / ') || '—'} · shadows ${r.shadows.map((x) => x.phrase).join(' / ') || '—'}`);
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
  const DOORS = ['trait', 'scene', 'outside'];
  const check = (name, weights, wantLead, wantMinor, expectLeadGod) => {
    const f = { name: `ledger · ${name}` }; const x = blend(weights); const rows = x.fnRows || [];
    const lead = x.faces[0].god;
    if (expectLeadGod && lead !== expectLeadGod) fail(f, `lead face ${lead}, expected ${expectLeadGod}`);
    const nLead = rows.filter((r) => (r.god ?? lead) === lead).length, nMinor = rows.length - nLead;
    if (nLead !== wantLead || nMinor !== wantMinor) fail(f, `${nLead}+${nMinor} rows, expected ${wantLead}+${wantMinor} (${rows.map((r) => r.word).join(' / ')})`);
    // rank: rows are the authored top-N of each cell, in authored order; doors rotate trait/scene/outside by position
    const minor = x.faces[1]?.god;
    const expected = [...L(lead).slice(0, wantLead).map((r) => ({ ...r, god: lead })), ...(minor ? L(minor).slice(0, wantMinor).map((r) => ({ ...r, god: minor })) : [])];
    expected.forEach((e, i) => { const r = rows[i]; if (!r || r.word !== e.word) fail(f, `row ${i} is ${r?.word}, expected ${e.word}`); else if (r.text !== e.doors[DOORS[i % 3]]) fail(f, `row ${i} (${r.word}) did not enter by the ${DOORS[i % 3]} door`); });
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

console.log(fails ? `\n✗ ${fails} selection fixture failure(s)` : '\n✓ selection fixtures: every contract holds');
process.exit(fails ? 1 : 0);
