// THE CHART READER: one calculation model, every chart variable.
// Runs a chart through the app's own engine and selection code and reads
// back EVERYTHING the reading derives from it: the four pillars with their
// hidden stems and ten gods, the day master and its strength, the element
// composition, band, presences, volumes, roles, the excess override, the
// faces per element, the ledger rows, the pool doors, the seven seats, the
// god-pair patterns, the luck pillars and the current flow. The harness
// never guesses a state and no other source of chart variables exists
// (REA_17 §0 rule 2; Prompts/01_INPUT_PACK.md).
//   node chart.mjs [golden|ding-weak|xin-earth …]    the readable sheet
//   node chart.mjs golden --json                       the full variable dump
//   node chart.mjs --birth 1995-04-29T18 --location Beijing [--gender male]
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const APP = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../Elementum_App/');
const { calculateBaziChart, HIDDEN_STEMS, getTenGod } = await import(APP + '/src/engine/calculator.js');
const { buildEnergyChart } = await import(APP + '/src/engine/buildEnergyChart.js');
const { buildJourneyModel, poolDoors, buildElementScreen, buildCarryModel } = await import(APP + '/src/components/journey/journeyData.js');
const { resolvePositions } = await import(APP + '/src/components/reading/positionsResolve.js');
const { resolveDayMasterReading } = await import(APP + '/src/components/reading/readingResolve.js');
const { STEM_CARD_DATA } = await import(APP + '/src/content/index.js');
const { PAIR_CELLS } = await import(APP + '/src/content/pairs.js');
const { TG_PATTERNS } = await import(APP + '/src/content/tgPatterns.js');

// The charts of the comparison runs: the golden chart as a real birth, the two
// contrast charts as the selection fixtures' synthetic presences
// (Elementum_App/tools/qa-selection-fixtures.mjs).
export const CHARTS = {
  golden: { id: 'golden', label: 'golden 庚 The Blade, 1995-04-29 18:00 Beijing (Overfueled; Earth 33 / Wood 33 / Metal 23 / Water 6 / Fire 5)', birth: { year: 1995, month: 4, day: 29, hour: 18, location: 'Beijing', gender: 'male' } },
  'ding-weak': { id: 'ding-weak', label: 'contrast 丁 The Candle, weak, one Order door (fixture: Wood 30 / Fire 15 / Earth 5 / Metal 10 / Water 40)', stem: '丁', element: 'Fire', strength: 'weak', p: { Wood: 30, Fire: 15, Earth: 5, Metal: 10, Water: 40 } },
  'xin-earth': { id: 'xin-earth', label: 'contrast 辛 The Jewel, Overfueled, heavy Earth (fixture: Metal 20 / Earth 45 / Wood 15 / Fire 10 / Water 10)', stem: '辛', element: 'Metal', strength: 'strong', p: { Metal: 20, Earth: 45, Wood: 15, Fire: 10, Water: 10 } },
};
const CAP = { metal: 'Metal', earth: 'Earth', wood: 'Wood', water: 'Water', fire: 'Fire' };
const BAND_TERM = { concentrated: 'Overfueled', balanced: 'Balanced', open: 'Underfueled' };
const STEM_YIN = { 甲: 0, 乙: 1, 丙: 0, 丁: 1, 戊: 0, 己: 1, 庚: 0, 辛: 1, 壬: 0, 癸: 1 };
const FEED = { Wood: 'Fire', Fire: 'Earth', Earth: 'Metal', Metal: 'Water', Water: 'Wood' }; const TAME = { Wood: 'Earth', Earth: 'Water', Water: 'Fire', Fire: 'Metal', Metal: 'Wood' };
const fnOf = (core, energy) => core === energy ? 'Body' : FEED[energy] === core ? 'Mind' : FEED[core] === energy ? 'Expression' : TAME[core] === energy ? 'Action' : 'Order';

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
      el: CAP[r.el], hz: r.hz, presence: r.presence, isCore: !!r.isCore, function: fnOf(CAP[m.core.el], CAP[r.el]),
      role: r.isCore ? 'core' : r.role, volume: r.volume, excess: !!r.excess, condition: r.dx?.condition || null,
      pole: r.isCore ? (r.dx?.condition === 'Overfueled' ? 'friction' : r.dx?.condition === 'Underfueled' ? 'catalyst' : 'none') : r.role,
      pairKey, state, stateSource: source, turn: s.mech?.turn || null,
      faces: (r.faces || []).map((f) => ({ god: f.god, share: f.share, persona: f.persona, polarity: f.polarity })),
      leadGod: ecE?.leadGod || null, absentGod: ecE?.absentGod || null,
      fnRows: (r.fnRows || []).map((x, i) => ({ word: x.word, god: x.god || ecE?.leadGod || null, door: ['trait', 'scene', 'outside'][i % 3] })),
    };
  });
  const doors = poolDoors(m);
  const dm = resolveDayMasterReading(stem, chart, doors, m.band);
  const carry = buildCarryModel(m, dm);
  // seats and the god-pair patterns (positionsResolve attaches the pattern reading; the key is matched back)
  const positions = spec.birth ? resolvePositions(chart).map((p) => ({ id: p.id, god: p.god, persona: p.persona, slot: p.slot, kind: p.kind, gate: p.gate, term: p.term, domains: p.domains, el: p.el || null, pattern: p.pattern ? { key: TG_PATTERNS.find((t) => t.reading === p.pattern.reading)?.key || null, targets: p.pattern.targets, fused: !!p.pattern.fusedLine } : null })) : [];
  const pillars = spec.birth ? Object.fromEntries(Object.entries(chart.pillars).map(([k, p]) => [k, { ...p, hidden: (HIDDEN_STEMS[p.branch] || []).map((h) => ({ stem: h.s, weight: h.w ?? h.weight ?? null, tenGod: getTenGod(stem, h.s)?.zh || null })), stemTenGod: k === 'day' ? 'Day Master' : getTenGod(stem, p.stem)?.zh || null }])) : null;
  return {
    id: spec.id, label: spec.label, synthetic: !spec.birth, stem, core: CAP[m.core.el], yin,
    band: m.band, bandTerm: BAND_TERM[m.band], balanced: !!m.balanced,
    dayMaster: chart.dayMaster, pillars, tenGods: chart.tenGods || null, composition: chart.elements, missingElements: chart.missingElements || [],
    tension: chart.tension || null, tgPattern: chart.tgPattern || null, catalystElement: chart.catalyst || null, archetypeKey: chart.archetypeKey || null,
    pattern: chart.pattern || null, combinations: chart.combinations || [], branchPatterns: chart.patterns || [], luckPillars: chart.luckPillars || [], currentFlow: spec.birth ? { year: chart.currentFlowYear, month: chart.currentFlowMonth, day: chart.currentFlowDay } : null,
    energies, doors, selected: { gifts: dm.gifts.map((g) => ({ phrase: g.phrase, door: g.door, face: g.face })), shadows: dm.shadows.map((g) => ({ phrase: g.phrase, door: g.door, face: g.face })), nature: dm.nature ? dm.nature.slice(0, 80) + '…' : null },
    carryCard: { lead: carry.lead || null, ease: carry.ease?.sentence || null, seek: carry.seek?.sentence || null },
    positions,
  };
}

export function describeChart(c) {
  const L = [`Chart ${c.id}: ${c.label}`, `Day Master ${c.stem} (${c.core}${c.yin ? ', yin' : ', yang'}), strength ${c.dayMaster.strength}${c.dayMaster.strengthScore != null ? ' (' + c.dayMaster.strengthScore + ')' : ''}, band ${c.band} = ${c.bandTerm}${c.synthetic ? ' [synthetic presences; faces by the engine\'s polarity fallback; no pillars, no seats]' : ''}`];
  if (c.pillars) { L.push(`  pillars: ${Object.entries(c.pillars).map(([k, p]) => `${k} ${p.stem}${p.branch} (${p.stemTenGod}; hidden ${p.hidden.map((h) => h.stem + '=' + h.tenGod).join(',')})`).join(' · ')}`); L.push(`  tension ${c.tension} · tgPattern ${c.tgPattern} · catalyst element ${c.catalystElement} · archetypeKey ${c.archetypeKey} · pattern ${c.pattern?.name || ''} · branch patterns ${c.branchPatterns.map((p) => p.zh + p.branches.join('')).join(', ') || 'none'}`); L.push(`  luck pillars: ${c.luckPillars.map((p) => `${p.stem}${p.branch} ${p.startAge}–${p.endAge}${p.isCurrent ? ' (now)' : ''}`).join(' · ')}`); if (c.currentFlow) L.push(`  current flow: year ${c.currentFlow.year.stem}${c.currentFlow.year.branch} (${c.currentFlow.year.stemTenGod?.zh}) · month ${c.currentFlow.month.stem}${c.currentFlow.month.branch} · day ${c.currentFlow.day.stem}${c.currentFlow.day.branch}`); }
  for (const e of c.energies) L.push(`  ${e.el.padEnd(5)} ${String(e.presence).padStart(2)}%  ${(e.function || '').padEnd(10)} ${e.role.padEnd(8)} ${e.volume.padEnd(9)}${e.excess ? ' EXCESS' : ''}  pair ${e.pairKey}  state ${e.state} (${e.stateSource || 'no turn'})  faces ${e.faces.map((f) => `${f.god} ${f.share}%`).join(' + ') || '(none)'}  ledger ${e.fnRows.map((r) => `${r.word}/${r.door}`).join(' · ') || '(none)'}`);
  L.push(`  doors: gifts ${c.doors.gifts?.map((d) => d.door).join(', ') || (c.balanced ? 'Balanced baseline' : 'none')} · shadows ${c.doors.shadows?.map((d) => d.door).join(', ') || (c.balanced ? 'Balanced baseline' : 'none')}`);
  L.push(`  chips shown: gifts ${c.selected.gifts.map((g) => g.phrase).join(' / ') || 'none'} · shadows ${c.selected.shadows.map((g) => g.phrase).join(' / ') || 'none'}`);
  if (c.positions.length) L.push(`  seats: ${c.positions.map((p) => `${p.id} (${p.term})${p.pattern ? ' [pattern ' + p.pattern.key + (p.pattern.fused ? ', fused' : '') + ']' : ''}`).join(' · ')}`);
  return L.join('\n');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const argv = process.argv.slice(2); const opt = (n) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : undefined; };
  let specs;
  if (opt('birth')) { const [d, h] = opt('birth').split('T'); const [year, month, day] = d.split('-').map(Number); specs = [{ id: 'birth-' + opt('birth'), label: `birth ${opt('birth')} ${opt('location') || 'Beijing'}`, birth: { year, month, day, hour: +(h || 12), location: opt('location') || 'Beijing', gender: opt('gender') || 'male' } }]; }
  else { const ids = argv.filter((a) => !a.startsWith('--')); specs = (ids.length ? ids : Object.keys(CHARTS)).map((id) => CHARTS[id] || (() => { throw new Error('unknown chart ' + id); })()); }
  for (const s of specs) { const c = resolveChart(s); if (argv.includes('--json')) console.log(JSON.stringify(c, null, 1)); else console.log(describeChart(c) + '\n'); }
}
