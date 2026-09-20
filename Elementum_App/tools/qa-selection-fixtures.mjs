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
// Usage: node tools/qa-selection-fixtures.mjs   (exit 1 on any failure)
// ===================================================================
import { buildEnergyChart } from '../src/engine/buildEnergyChart.js';
import { buildJourneyModel, poolDoors, buildCarryModel, buildElementScreen } from '../src/components/journey/journeyData.js';
import { resolveDayMasterReading } from '../src/components/reading/readingResolve.js';
import { STEM_CARD_DATA } from '../src/content/index.js';
import { STEM_VARIANTS } from '../src/content/stemVariants.js';
import { PAIR_CELLS } from '../src/content/pairs.js';

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
console.log(fails ? `\n✗ ${fails} selection fixture failure(s)` : '\n✓ selection fixtures: every contract holds');
process.exit(fails ? 1 : 0);
