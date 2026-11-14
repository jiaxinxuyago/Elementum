// The Domains reading as elementum.life serves it now (owner 2026-11-14: "show me an artifact of the current state of
// the domain reading now"). Renders the eleven comparison charts (../compare/charts.json) through the app's own
// resolvers with the live flags as they stand (no bpRules override), in the shape the screens read: the hub, each
// domain page (head, life line, By position, By decade, By year) and the Blueprint's four parts.
//   node .../current/snapshot-now.mjs   → now.json
import fs from 'node:fs';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname) + '/';
const APP = path.resolve(HERE, '../../../../../Elementum_App') + '/';
const { calculateBaziChart } = await import(APP + 'src/engine/calculator.js');
const { buildEnergyChart } = await import(APP + 'src/engine/buildEnergyChart.js');
const { buildJourneyModel } = await import(APP + 'src/components/journey/journeyData.js');
const { STEM_CARD_DATA } = await import(APP + 'src/content/index.js');
const { resolvePositions } = await import(APP + 'src/components/reading/positionsResolve.js');
const { resolveDomains, DEPTH_RULES_V2 } = await import(APP + 'src/components/reading/domainsResolve.js');
const { resolveDomainView, resolveBlueprint, resolveChapters } = await import(APP + 'src/components/reading/depthResolve.js');
const { DOMAINS_CONTENT } = await import(APP + 'src/content/domains.js');

const YEAR = 2026; const TODAY = '2026-11-14';
const charts = JSON.parse(fs.readFileSync(HERE + '../compare/charts.json', 'utf8'));
const u = (x) => (x && (x.text || x.label) ? { label: x.label || '', text: x.text || '', draft: !!x.draft } : null);
const out = { rulesV2: DEPTH_RULES_V2, year: YEAR, today: TODAY, charts: {} };
for (const [id, c] of Object.entries(charts)) {
  const chart = calculateBaziChart(c.birth); const hu = c.hu;
  const ec = buildEnergyChart(chart); const m = buildJourneyModel({ chart, ec, identity: {}, card: STEM_CARD_DATA[chart.pillars.day.stem] });
  const opts = { hourUnknown: hu, condition: m.condition, roles: Object.fromEntries(Object.entries(m.byEl).map(([k, v]) => [k, v.role])), year: YEAR, today: TODAY };
  const pos = resolvePositions(chart, hu);
  const dm = resolveDomains(chart, pos, DOMAINS_CONTENT, opts);
  const age = resolveChapters(chart, pos, opts).age;
  const top = dm.pages.filter((p) => p.seats.length).slice(0, 2).map((p) => p.domain);
  const domains = dm.pages.map((p) => {
    const v = resolveDomainView(p, chart, DOMAINS_CONTENT, opts);
    return {
      domain: v.domain, headline: v.headline || '', intro: v.intro || '', lit: v.lit || [], heavy: top.includes(p.domain),
      pips: p.seats.map((s) => s.el), hubLine: p.headline || p.count || '',
      how: v.how || '', pattern: v.pattern?.text || '',
      blocks: v.blocks.map((b) => (b.kind === 'gap' ? { kind: 'gap', label: b.label, text: b.text || '' } : { kind: 'seat', name: b.name, meta: b.meta, text: b.text || '' })),
      notes: (v.notes || []).map((n) => (typeof n === 'string' ? n : n.text)),
      byDecade: v.byDecade.map((d) => ({ label: d.label, text: d.text })),
      byYear: v.byYear.map((y) => ({ label: y.label, text: y.text })),
    };
  });
  const B = resolveBlueprint(chart, pos, opts); const S = B.structure;
  const p = chart.pillars;
  out.charts[id] = {
    why: c.why, birth: c.birth, hu, age, strength: chart.dayMaster?.strength, dayStem: p.day.stem,
    pillars: ['year', 'month', 'day', 'hour'].map((g) => (hu && g === 'hour' ? null : { g, stem: p[g].stem, branch: p[g].branch })),
    positions: pos.map((x) => ({ id: x.id, gate: x.gateKey, el: x.el, kind: x.kind, term: x.term || '' })),
    seek: m.seek.map((x) => x.el), ease: m.skip.map((x) => x.el),
    domains,
    blueprint: {
      title: B.title,
      structure: { reading: u(S.reading), rule: u(S.rule), statusLabel: S.statusLabel, status: u(S.status), rescue: u(S.rescue) },
      runs: { strongest: u(B.runs.strongest), missing: B.runs.missing.map(u), seasonName: B.runs.seasonCell?.name || '', season: u(B.runs.season), needs: B.runs.needs.map(u) },
      seen: { plain: B.seen.plain.map(u), inside: B.seen.inside.map(u), close: u(B.seen.close) },
      pairs: { pairs: B.pairs.pairs.map(u), bonds: B.pairs.bonds.map(u), noneHard: u(B.pairs.noneHard) },
    },
  };
}
fs.writeFileSync(HERE + 'now.json', JSON.stringify(out) + '\n');
console.log(`now.json: ${Object.keys(out.charts).length} charts, rules ${DEPTH_RULES_V2 ? 'v2 (live)' : 'v1'}`);
