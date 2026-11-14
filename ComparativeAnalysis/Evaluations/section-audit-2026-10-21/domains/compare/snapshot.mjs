// The Domains + Blueprint before/after comparison (owner 2026-11-14: "after these rulings are applied, show me a side
// by side comparison of the domain reading so that I can tell the difference").
//   node .../compare/snapshot.mjs --pick              choose the comparison charts (written to charts.json, once)
//   node .../compare/snapshot.mjs before|after        render every chart's eight domain pages and Blueprint → <name>.json
// The pages are composed in the order the app shows them (DepthViews): title, How you are, pattern, the seats and the gap
// row, notes, By decade, By year; the Blueprint's four parts. "after" renders with the dev-site rules on (bpRules: true).
import fs from 'node:fs';
import path from 'node:path';
const APP = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../../../../Elementum_App') + '/';
const { calculateBaziChart } = await import(APP + 'src/engine/calculator.js');
const { buildEnergyChart } = await import(APP + 'src/engine/buildEnergyChart.js');
const { buildJourneyModel } = await import(APP + 'src/components/journey/journeyData.js');
const { STEM_CARD_DATA } = await import(APP + 'src/content/index.js');
const { resolvePositions } = await import(APP + 'src/components/reading/positionsResolve.js');
const { resolveDomains } = await import(APP + 'src/components/reading/domainsResolve.js');
const { resolveDomainView, resolveBlueprint } = await import(APP + 'src/components/reading/depthResolve.js');
const { DOMAINS_CONTENT } = await import(APP + 'src/content/domains.js');
const { structureOf, branchBonds } = await import(APP + 'src/engine/depth/chartDepth.js');

const HERE = path.dirname(new URL(import.meta.url).pathname) + '/';
const YEAR = 2026; const TODAY = '2026-11-14';
const mode = process.argv[2];

function build(birth, hu) {
  const chart = calculateBaziChart(birth);
  const ec = buildEnergyChart(chart); const m = buildJourneyModel({ chart, ec, identity: {}, card: STEM_CARD_DATA[chart.pillars.day.stem] });
  const opts = { hourUnknown: hu, condition: m.condition, roles: Object.fromEntries(Object.entries(m.byEl).map(([k, v]) => [k, v.role])), year: YEAR, today: TODAY, bpRules: mode === 'after' };
  const pos = resolvePositions(chart, hu);
  return { chart, m, opts, pos, dm: resolveDomains(chart, pos, DOMAINS_CONTENT, opts) };
}
const sec = (part, label, u) => (u && (u.text || u.label) ? { part, label: label || '', key: u.key || u.src || '', text: u.text || '' } : null);

function domainPage(p, chart, opts) {
  const v = resolveDomainView(p, chart, DOMAINS_CONTENT, opts);
  const out = [{ part: 'Title', label: v.intro, key: p.headlineSrc || '', text: v.headline || '' }];
  if (v.how) out.push({ part: 'How you are', label: '', key: p.howSrc || '', text: v.how });
  if (v.pattern) out.push({ part: 'Pattern', label: '', key: v.pattern.src || '', text: v.pattern.text });
  for (const b of v.blocks) out.push({ part: b.kind === 'gap' ? 'Gap' : 'Seat', label: b.kind === 'gap' ? b.label : `${b.name} · ${b.meta}`, key: b.src, text: b.text || '' });
  for (const n of v.notes || []) out.push({ part: 'Note', label: '', key: '', text: typeof n === 'string' ? n : n.text });
  for (const d of v.byDecade) out.push({ part: 'By decade', label: d.label, key: d.src, text: d.text });
  for (const y of v.byYear) out.push({ part: 'By year', label: y.label, key: y.key, text: y.text });
  return { domain: p.domain, sections: out.filter((x) => x.text || x.label) };
}
function blueprintPage(chart, pos, opts) {
  const B = resolveBlueprint(chart, pos, opts); const S = B.structure; const out = [];
  out.push({ part: '1 · Structure', label: B.title, key: S.reading?.key, text: S.reading?.text });
  out.push(sec('1 · Why', '', S.rule));
  out.push({ part: '1 · State', label: S.statusLabel, key: S.status?.key, text: S.status?.text });
  if (S.rescue) out.push({ part: '1 · What protects it', label: S.rescue.label, key: S.rescue.key, text: S.rescue.text });
  out.push(sec('2 · Strongest', '', B.runs.strongest));
  for (const x of B.runs.missing) out.push(sec('2 · Missing', x.label, x));
  out.push(sec('2 · Season', B.runs.seasonCell?.name, B.runs.season));
  for (const x of B.runs.needs) out.push(sec('2 · Season need', x.label, x));
  for (const x of B.seen.plain) out.push(sec('3 · In plain view', x.label, x));
  for (const x of B.seen.inside) out.push(sec('3 · Inside', x.label, x));
  out.push(sec('3 · Close', '', B.seen.close));
  for (const x of B.pairs.pairs) out.push(sec('4 · Pairing', x.label, x));
  for (const x of B.pairs.bonds) out.push(sec('4 · Bond', x.label, x));
  out.push(sec('4 · No hard bond', '', B.pairs.noneHard));
  return { sections: out.filter(Boolean) };
}

if (mode === '--pick') {
  // one chart per change the rulings make, found with the engine as it is before the rulings
  let s = 20261114; const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
  const want = {
    golden: { why: 'the golden chart', birth: { year: 1995, month: 4, day: 29, hour: 18, location: 'Beijing', gender: 'male' }, hu: false },
  };
  const tests = {
    youngHourLead: ['R9: How you are from a seat the reader has not reached', ({ dm, chart }) => { const age = YEAR - (chart.luckPillars[0].startYear - chart.luckPillars[0].startAge); return age >= 18 && age <= 30 && dm.pages.some((p) => p.seats?.length && p.seats.every((x) => x.gateKey === 'hour')); }],
    pastMonth: ['R13: a reader past the Month Gate with Month seats', ({ pos, chart }) => { const age = YEAR - (chart.luckPillars[0].startYear - chart.luckPillars[0].startAge); return age >= 52 && age <= 62 && pos.filter((p) => p.gateKey === 'month').length >= 2 && pos.some((p) => p.gateKey === 'day'); }],
    mixedCured: ['R1: officers mixed, the cure already seated (M-1)', ({ chart }) => { const st = structureOf(chart, { strength: chart.dayMaster.strength }); return st.breaker === '官杀混杂'; }],
    weakWealthPeers: ['R1: a weak chart told its peers rob its wealth', ({ chart }) => { const st = structureOf(chart, { strength: chart.dayMaster.strength }); return st.breaker === '比劫' && /weak/.test(chart.dayMaster.strength); }],
    strongSealMoney: ['R1: a strong seal chart told money breaks it', ({ chart }) => { const st = structureOf(chart, { strength: chart.dayMaster.strength }); return st.breaker === '财' && /strong/.test(chart.dayMaster.strength); }],
    jinshui: ['R1: 金水伤官 read as broken by the officer it wants', ({ chart }) => { const st = structureOf(chart, { strength: chart.dayMaster.strength }); return st.key === '伤官' && st.breaker === '正官' && /[庚辛]/.test(chart.pillars.day.stem) && /[亥子丑]/.test(chart.pillars.month.branch); }],
    dualBond: ['R3: one pair of gates with two bond lines', ({ chart }) => { const b = branchBonds(chart, {}); const k = b.map((x) => x.gates.slice().sort().join('-')); return k.some((x, i) => k.indexOf(x) !== i); }],
    familyGap: ['R11: a reader aged 16 to 34 with a gap row', ({ dm, chart, opts }) => { const age = YEAR - (chart.luckPillars[0].startYear - chart.luckPillars[0].startAge); return age >= 20 && age <= 30 && dm.pages.some((p) => resolveDomainView(p, chart, DOMAINS_CONTENT, opts).blocks.some((b) => b.kind === 'gap')); }],
  };
  for (let i = 0; i < 6000 && Object.keys(tests).some((k) => !want[k]); i++) {
    const birth = { year: 1962 + Math.floor(rnd() * 46), month: 1 + Math.floor(rnd() * 12), day: 1 + Math.floor(rnd() * 28), hour: Math.floor(rnd() * 24), location: 'Beijing', gender: rnd() < 0.5 ? 'male' : 'female' };
    let ctx; try { ctx = build(birth, false); } catch { continue; }
    for (const [k, [why, f]] of Object.entries(tests)) if (!want[k] && f(ctx)) { want[k] = { why, birth, hu: false }; break; }
  }
  want.noHour = { why: 'R5: no birth hour', birth: { ...want.familyGap.birth }, hu: true };
  fs.writeFileSync(HERE + 'charts.json', JSON.stringify(want, null, 1) + '\n');
  for (const [k, v] of Object.entries(want)) console.log(k.padEnd(16), JSON.stringify(v.birth), v.hu ? '(hour unknown)' : '', '·', v.why);
  process.exit(0);
}
if (!['before', 'after'].includes(mode)) { console.log('usage: snapshot.mjs --pick | before | after'); process.exit(2); }
const charts = JSON.parse(fs.readFileSync(HERE + 'charts.json', 'utf8'));
const out = {};
for (const [id, c] of Object.entries(charts)) {
  const { chart, m, opts, pos, dm } = build(c.birth, c.hu);
  const p = chart.pillars;
  out[id] = {
    why: c.why, birth: c.birth, hu: c.hu, pillars: ['year', 'month', 'day', 'hour'].map((g) => (c.hu && g === 'hour' ? '··' : p[g].stem + p[g].branch)).join(' '),
    condition: m.condition, strength: chart.dayMaster?.strength,
    domains: dm.pages.map((pg) => domainPage(pg, chart, opts)),
    blueprint: blueprintPage(chart, pos, opts),
  };
}
fs.writeFileSync(HERE + mode + '.json', JSON.stringify(out, null, 1) + '\n');
console.log(`${mode}.json: ${Object.keys(out).length} charts, ${Object.values(out).reduce((a, c) => a + c.domains.length, 0)} domain pages`);
