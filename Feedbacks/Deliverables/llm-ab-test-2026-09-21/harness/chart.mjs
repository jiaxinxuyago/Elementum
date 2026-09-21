// Chart-state bridge: runs a chart through the app's own selection code so the
// harness never guesses which cell, pole, volume, face or seat a chart reaches.
// The engine owns every number (REA_17 §1); this file only reads them back.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const APP = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../Elementum_App/');
const { calculateBaziChart } = await import(APP + '/src/engine/calculator.js');
const { buildEnergyChart } = await import(APP + '/src/engine/buildEnergyChart.js');
const { buildJourneyModel, poolDoors, buildElementScreen } = await import(APP + '/src/components/journey/journeyData.js');
const { resolvePositions } = await import(APP + '/src/components/reading/positionsResolve.js');
const { STEM_CARD_DATA } = await import(APP + '/src/content/index.js');
const { PAIR_CELLS } = await import(APP + '/src/content/pairs.js');

// The three charts of the comparison run (REA_17 §4 step 2): the golden chart
// as a real birth, the two contrast charts as the selection fixtures'
// synthetic presences (Elementum_App/tools/qa-selection-fixtures.mjs).
export const CHARTS = {
  golden: { id: 'golden', label: 'golden 庚 The Blade, 1995-04-29 18:00 Beijing (Overfueled; Earth 33 / Wood 33 / Metal 23 / Water 6 / Fire 5)', birth: { year: 1995, month: 4, day: 29, hour: 18, location: 'Beijing', gender: 'male' } },
  'ding-weak': { id: 'ding-weak', label: 'contrast 丁 The Candle, weak, one Order door (fixture: Wood 30 / Fire 15 / Earth 5 / Metal 10 / Water 40)', stem: '丁', element: 'Fire', strength: 'weak', p: { Wood: 30, Fire: 15, Earth: 5, Metal: 10, Water: 40 } },
  'xin-earth': { id: 'xin-earth', label: 'contrast 辛 The Jewel, Overfueled, heavy Earth (fixture: Metal 20 / Earth 45 / Wood 15 / Fire 10 / Water 10)', stem: '辛', element: 'Metal', strength: 'strong', p: { Metal: 20, Earth: 45, Wood: 15, Fire: 10, Water: 10 } },
};
const CAP = { metal: 'Metal', earth: 'Earth', wood: 'Wood', water: 'Water', fire: 'Fire' };
const BAND_TERM = { concentrated: 'Overfueled', balanced: 'Balanced', open: 'Underfueled' };
const STEM_YIN = { 甲: 0, 乙: 1, 丙: 0, 丁: 1, 戊: 0, 己: 1, 庚: 0, 辛: 1, 壬: 0, 癸: 1 };

// Name the state the page turn came from by matching the assembled turn back
// to the cell's own fields (the engine's pick is the truth, the name is ours).
function stateOf(turn, cell, yin) {
  if (!turn || !cell) return { state: 'none', source: null };
  const carry = yin && cell.carry_yin ? { ...cell.carry, ...Object.fromEntries(Object.entries(cell.carry_yin).map(([k, v]) => [k, { ...(cell.carry?.[k] || {}), ...v }])) } : cell.carry || {};
  const mech = yin && cell.mechanism_yin ? { ...cell.mechanism, ...cell.mechanism_yin } : cell.mechanism || {};
  for (const k of ['unrooted', 'missing', 'wide', 'spared', 'thin', 'excess']) if (carry[k]?.clause && turn.startsWith(carry[k].clause)) return { state: k, source: `carry${yin && cell.carry_yin?.[k] ? '_yin' : ''}.${k}` };
  for (const k of ['catalyst_turn', 'friction_turn']) if (mech[k] && turn === mech[k]) return { state: k, source: `mechanism${yin && cell.mechanism_yin?.[k] ? '_yin' : ''}.${k}` };
  return { state: 'unmatched', source: null };
}

export function resolveChart(spec) {
  const chart = spec.birth ? calculateBaziChart(spec.birth)
    : { dayMaster: { stem: spec.stem, element: spec.element, strength: spec.strength }, elements: Object.fromEntries(Object.entries(spec.p).map(([k, score]) => [k, { score }])), pillars: {}, tgPattern: 'pure' };
  const ec = buildEnergyChart(chart);
  const stem = chart.dayMaster.stem;
  const m = buildJourneyModel({ chart, ec, identity: {}, card: STEM_CARD_DATA[stem] });
  const yin = STEM_YIN[stem] === 1;
  const coreHz = m.byEl[m.core.el].hz;
  const energies = m.els.map((r) => {
    const s = buildElementScreen(m, r.el);
    const pairKey = `${coreHz}_${r.hz}`;
    const { state, source } = stateOf(s.mech?.turn, PAIR_CELLS[pairKey], yin);
    const ecE = ec.energies.find((e) => e.el === r.el);
    return {
      el: CAP[r.el], hz: r.hz, presence: r.presence, isCore: !!r.isCore,
      role: r.isCore ? 'core' : r.role, volume: r.volume, excess: !!r.excess,
      pole: r.isCore ? (r.dx?.condition === 'Overfueled' ? 'friction' : r.dx?.condition === 'Underfueled' ? 'catalyst' : 'none') : r.role,
      pairKey, state, stateSource: source, turn: s.mech?.turn || null,
      faces: (r.faces || []).map((f) => ({ god: f.god, share: f.share, persona: f.persona })),
      leadGod: ecE?.leadGod || null,
      fnRows: (r.fnRows || []).map((x, i) => ({ word: x.word, god: x.god || ecE?.leadGod || null, door: ['trait', 'scene', 'outside'][i % 3] })),
      selected: {
        gifts: m.balanced ? 'baseline' : null, // filled from doors below
      },
    };
  });
  const doors = poolDoors(m);
  const positions = spec.birth ? resolvePositions(chart).map((p) => ({ id: p.id, god: p.god, persona: p.persona, slot: p.slot, kind: p.kind, gate: p.gate, term: p.term, domains: p.domains })) : [];
  return {
    id: spec.id, label: spec.label, synthetic: !spec.birth, stem, core: CAP[m.core.el], yin,
    band: m.band, bandTerm: BAND_TERM[m.band], balanced: !!m.balanced,
    pillars: spec.birth ? chart.pillars : null, tgPattern: chart.tgPattern || null,
    energies, doors, positions,
  };
}

export function describeChart(c) {
  const lines = [`Chart ${c.id}: ${c.label}`, `Day Master ${c.stem} (${c.core}${c.yin ? ', yin' : ', yang'}), band ${c.band} = ${c.bandTerm}${c.synthetic ? ' [synthetic presences; faces by the engine\'s polarity fallback; no seats]' : ''}`];
  for (const e of c.energies) lines.push(`  ${e.el.padEnd(5)} ${String(e.presence).padStart(2)}%  ${e.role.padEnd(8)} ${e.volume.padEnd(9)}${e.excess ? ' EXCESS' : ''}  pair ${e.pairKey}  state ${e.state} (${e.stateSource || 'no turn'})  faces ${e.faces.map((f) => `${f.god} ${f.share}%`).join(' + ') || '(none)'}  ledger ${e.fnRows.map((r) => `${r.word}/${r.door}`).join(' · ') || '(none)'}`);
  lines.push(`  doors: gifts ${c.doors.gifts?.map((d) => d.door).join(', ') || (c.balanced ? 'Balanced baseline' : 'none')} · shadows ${c.doors.shadows?.map((d) => d.door).join(', ') || (c.balanced ? 'Balanced baseline' : 'none')}`);
  if (c.positions.length) lines.push(`  seats: ${c.positions.map((p) => `${p.id} (${p.term})`).join(' · ')}`);
  return lines.join('\n');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  for (const id of process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(CHARTS)) console.log(describeChart(resolveChart(CHARTS[id])) + '\n');
}
