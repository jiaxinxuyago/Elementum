// ===================================================================
// ELEMENTUM · the Domains and Blueprint sentence-shape check (owner R16 A, 2026-11-14)
// ===================================================================
// "At most one ', and you' close per unit family on a page; decade lines drop 'these years'; the missing and need lines
// get distinct frames." Renders the pages as the reader sees them and counts, per page and family, the closes on
// ", and you", the decade lines that restate their period, and the repeated frames.
//   node tools/qa-domains-shape.mjs [--n 200] [--v2] [--json <file>]
// Exit 1 when more than one page in twenty breaks the rule.
// ===================================================================
import { calculateBaziChart } from '../src/engine/calculator.js';
import { buildEnergyChart } from '../src/engine/buildEnergyChart.js';
import { buildJourneyModel } from '../src/components/journey/journeyData.js';
import { STEM_CARD_DATA } from '../src/content/index.js';
import { resolvePositions } from '../src/components/reading/positionsResolve.js';
import { resolveDomains } from '../src/components/reading/domainsResolve.js';
import { resolveDomainView, resolveBlueprint } from '../src/components/reading/depthResolve.js';
import { DOMAINS_CONTENT } from '../src/content/domains.js';

const argv = process.argv.slice(2); const N = Number(argv[argv.indexOf('--n') + 1]) || 200;
let s = 20261114; const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
const last = (t) => ((t || '').match(/[^.!?]+[.!?]+/g) || ['']).slice(-1)[0];
const andYou = (t) => /,\s+and\s+(\S+\s+){0,2}(you|your)\b/i.test(last(t));
const T = { pages: 0, bad: 0, fam: {}, period: 0, frames: 0, joints: [] };
const tally = (name, texts) => { const n = texts.filter(andYou).length; (T.fam[name] ||= { pages: 0, over: 0 }).pages++; if (n > 1) T.fam[name].over++; return n > 1; };
for (let i = 0; i < N; i++) {
  const birth = { year: 1960 + Math.floor(rnd() * 46), month: 1 + Math.floor(rnd() * 12), day: 1 + Math.floor(rnd() * 28), hour: Math.floor(rnd() * 24), location: 'Beijing', gender: rnd() < 0.5 ? 'male' : 'female' };
  let chart; try { chart = calculateBaziChart(birth); } catch { continue; }
  const ec = buildEnergyChart(chart); const m = buildJourneyModel({ chart, ec, identity: {}, card: STEM_CARD_DATA[chart.pillars.day.stem] });
  const opts = { condition: m.condition, roles: Object.fromEntries(Object.entries(m.byEl).map(([k, v]) => [k, v.role])), year: 2026, bpRules: argv.includes('--v2') };
  const pos = resolvePositions(chart, false);
  for (const p of resolveDomains(chart, pos, DOMAINS_CONTENT, opts).pages) {
    const v = resolveDomainView(p, chart, DOMAINS_CONTENT, opts); T.pages++;
    const seat = v.blocks.filter((b) => b.kind === 'seat').map((b) => b.text); const dec = v.byDecade.map((d) => d.text); const yr = v.byYear.map((y) => y.text);
    const per = dec.filter((t) => /\b(these|those) (ten )?years\b|\b(this|that) decade\b/i.test(t)).length; T.period += per;
    const all = [v.how, ...seat, ...dec, ...yr].filter(Boolean); T.joints.push(all.filter(andYou).length);
    if ([tally('seat beats', seat), tally('decade lines', dec), tally('year lines', yr)].some(Boolean) || per) T.bad++;
  }
  const B = resolveBlueprint(chart, pos, opts); T.pages++;
  const miss = B.runs.missing.map((x) => x.text); const need = B.runs.needs.map((x) => x.text); const seen = [...B.seen.plain, ...B.seen.inside].map((x) => x.text);
  const fr = [...miss, ...need, ...seen].filter((t) => /nobody inside it|your season asks for|you come across as/i.test(t)).length; T.frames += Math.max(0, fr - 2);
  const bp = [tally('Blueprint missing and needs', [...miss, ...need]), tally('Blueprint seen', seen), tally('Blueprint bonds', B.pairs.bonds.map((x) => x.text))].some(Boolean);
  if (bp || fr > 2) T.bad++;
}
const mean = T.joints.reduce((a, b) => a + b, 0) / T.joints.length;
console.log(`${T.pages} pages (${N} charts${argv.includes('--v2') ? ', dev-site rules' : ''})`);
for (const [k, v] of Object.entries(T.fam)) console.log(`  ${k.padEnd(28)} ${String(v.over).padStart(4)} of ${v.pages} pages close twice or more on ", and you"`);
console.log(`  decade lines restating their period: ${T.period}`);
console.log(`  repeated frames beyond two a Blueprint page: ${T.frames}`);
console.log(`  ", and you" closes per domain page: mean ${mean.toFixed(1)}, max ${Math.max(...T.joints)}`);
const share = T.bad / T.pages;
const ji = argv.indexOf('--json');
if (ji >= 0) (await import('node:fs')).writeFileSync(argv[ji + 1], JSON.stringify({ pages: T.pages, charts: N, breakPct: +(100 * share).toFixed(1), andYouMean: +mean.toFixed(1), andYouMax: Math.max(...T.joints), period: T.period, frames: T.frames, fam: Object.fromEntries(Object.entries(T.fam).map(([k, v]) => [k, [v.over, v.pages]])) }, null, 1));
console.log(`${T.bad} of ${T.pages} pages break R16 (${(100 * share).toFixed(1)}%)`);
if (share > 0.05) process.exit(1);
console.log('PASS: R16 holds on 95% of pages or more.');
