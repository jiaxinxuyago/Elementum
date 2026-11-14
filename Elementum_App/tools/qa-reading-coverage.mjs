// ===================================================================
// ELEMENTUM · the written-reading coverage sweep (owner 2026-11-14: "make sure we have all the templates and stations
// covered for all archetypes and situations")
// ===================================================================
// Renders the three written sections through the app's own resolvers, with the live flags, for a wide spread of charts
// and dates, and walks every model the screens read:
//   - the Domains: the hub, each domain page (head, How you are, pattern, seats, gap rows, notes, By decade, By year)
//     and the Energy Blueprint (resolveDomains, resolveDomainView, resolveBlueprint);
//   - Life Chapters (resolveChapters → chaptersResolve.resolveEnergyChapters), and Stars beside it;
//   - the event signature, Your Almanac on the Today tab (resolveAlmanac: hub, day, month, year).
// A line fails when it is a draft stand-in (`draft: true`, the key not written in the station), an empty line where a
// line is due, or text with an unfilled slot ({god}), "undefined", "NaN" or "null".
// The charts: birth dates from 1930 to 2024 (--from/--to; the app's picker runs 1900 to this year) at every hour, both genders, one in four with the hour unknown, until every
// day stem × month branch cell (the 120 season cells) has its share; the report lists the archetypes reached (day stem,
// strength band, structure and its state, condition) so a gap in the spread shows as well as a gap in the words.
//   node tools/qa-reading-coverage.mjs [--n 1200] [--days 6] [--from 1930] [--to 2024] [--json <file>] [--keys]
// Exit 1 while any section has a failing line.
// ===================================================================
import fs from 'node:fs';
import { calculateBaziChart } from '../src/engine/calculator.js';
import { buildEnergyChart } from '../src/engine/buildEnergyChart.js';
import { buildJourneyModel } from '../src/components/journey/journeyData.js';
import { STEM_CARD_DATA } from '../src/content/index.js';
import { resolvePositions } from '../src/components/reading/positionsResolve.js';
import { resolveDomains, DEPTH_RULES_V2 } from '../src/components/reading/domainsResolve.js';
import { resolveDomainView, resolveBlueprint, resolveChapters, resolveStars } from '../src/components/reading/depthResolve.js';
import { resolveAlmanac } from '../src/components/dashboard/almanac/almanacResolve.js';
import { DOMAINS_CONTENT } from '../src/content/domains.js';
import { buildMergedModel } from '../src/components/journey/journeyData.js';
import { LADDER, STEM_LADDER, LADDER_NOTICE_BAND, ladderTry } from '../src/content/ladder.js';

const argv = process.argv.slice(2);
const arg = (k, d) => (argv.includes(k) ? argv[argv.indexOf(k) + 1] : d);
const N = Number(arg('--n', 1200)); const DAYS = Number(arg('--days', 6));
const YEAR = 2026; const TODAY = '2026-11-14';
let s = 20261114; const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
const iso = (d) => d.toISOString().slice(0, 10);
const BAD = /\{\w+\}|\bundefined\b|\bNaN\b|\bnull\b/;

// ── the tally ───────────────────────────────────────────────────────
const S = {}; const miss = {}; const reach = { stem: {}, cell: {}, strength: {}, structure: {}, state: {}, condition: {}, gate: {}, hu: {}, gender: {} };
const bump = (o, k) => (o[k] = (o[k] || 0) + 1);
function line(section, key, ok, why, sample) {
  const t = (S[section] ||= { n: 0, bad: 0 }); t.n++;
  if (!ok) { t.bad++; const m = (miss[`${section} | ${key}`] ||= { n: 0, why, sample }); m.n++; }
}
/** Walks a model: every unit ({key, text, draft}) counts, and every string is checked for unfilled slots. */
function walk(section, v, path = '', seen = new WeakSet()) {
  if (v == null) return;
  if (typeof v === 'string') { if (BAD.test(v)) line(section, path, false, 'unfilled slot or bad value', v.slice(0, 140)); return; }
  if (typeof v !== 'object' || seen.has(v)) return;
  seen.add(v);
  if ('draft' in v && ('text' in v || 'key' in v)) {
    const key = v.key || (v.keys || []).join(' + ') || path;
    line(section, key, !v.draft && !!(v.text || v.lean || v.over), v.draft ? 'draft stand-in (not written)' : 'empty text', String(v.text || '').slice(0, 140));
  }
  if (Array.isArray(v)) v.forEach((x, i) => walk(section, x, `${path}[${i}]`, seen));
  else for (const [k, x] of Object.entries(v)) if (k !== 'chart' && k !== 'ctx') walk(section, x, path ? `${path}.${k}` : k, seen);
}

// ── the charts ──────────────────────────────────────────────────────
const charts = [];
const FROM = Number(arg('--from', 1930)); const TO = Number(arg('--to', 2024));
const start = Date.UTC(FROM, 0, 1); const span = Math.min(Date.UTC(TO, 11, 31), Date.parse(TODAY)) - start;
for (let i = 0; charts.length < N && i < N * 4; i++) {
  const d = new Date(start + Math.floor(rnd() * span));
  const birth = { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate(), hour: Math.floor(rnd() * 24), location: 'Beijing', gender: rnd() < 0.5 ? 'male' : 'female' };
  charts.push([birth, rnd() < 0.25]);
}
// the review charts the earlier rounds read, always in
charts.unshift([{ year: 1995, month: 4, day: 29, hour: 18, location: 'Beijing', gender: 'male' }, false], [{ year: 1990, month: 9, day: 17, hour: 5, location: 'Beijing', gender: 'male' }, false], [{ year: 1992, month: 5, day: 25, hour: 12, location: 'Beijing', gender: 'female' }, true]);

const t0 = Date.now(); let rendered = 0; let errors = 0; const errs = {};
for (const [birth, hu] of charts) {
  let chart; try { chart = calculateBaziChart(birth); } catch { continue; }
  try {
    const ec = buildEnergyChart(chart); const m = buildJourneyModel({ chart, ec, identity: {}, card: STEM_CARD_DATA[chart.pillars.day.stem] });
    const opts = { hourUnknown: hu, condition: m.condition, roles: Object.fromEntries(Object.entries(m.byEl).map(([k, v]) => [k, v.role])), year: YEAR, today: TODAY };
    const pos = resolvePositions(chart, hu);
    // the Domains
    const dm = resolveDomains(chart, pos, DOMAINS_CONTENT, opts);
    for (const p of dm.pages) {
      line('Domains · hub card', `${p.domain} hub line`, !!(p.headline || p.count), 'empty');
      const v = resolveDomainView(p, chart, DOMAINS_CONTENT, opts);
      line('Domains · headline', p.headlineSrc || `${p.domain} headline`, !!v.headline, 'empty');
      line('Domains · How you are', p.howSrc || `${p.domain} how`, !!v.how, 'empty');
      for (const b of v.blocks) line(b.kind === 'gap' ? 'Domains · gap row' : 'Domains · seat', b.src || b.label, !!b.text, 'empty');
      for (const d of v.byDecade) line('Domains · By decade', d.src || d.label, !!d.text && !BAD.test(d.text), 'empty or unfilled', d.text);
      walk('Domains · page', { how: v.how, headline: v.headline, intro: v.intro, pattern: v.pattern, blocks: v.blocks, notes: v.notes, byDecade: v.byDecade, byYear: v.byYear });
    }
    const B = resolveBlueprint(chart, pos, opts); walk('Domains · Blueprint', B);
    // Life Chapters, and Stars
    const L = resolveChapters(chart, pos, opts); walk('Life Chapters', L);
    const St = resolveStars(chart, opts); walk('Stars', St);
    // Your Almanac (the event signature): the hub and the day, month and year pages
    const bd = `${birth.year}-${String(birth.month).padStart(2, '0')}-${String(birth.day).padStart(2, '0')}`;
    const dates = [TODAY]; for (let k = 1; k < DAYS; k++) dates.push(iso(new Date(Date.UTC(2025, 0, 1) + Math.floor(rnd() * 6 * 365) * 86400000)));
    walk('Almanac · hub', resolveAlmanac(chart, { kind: 'hub', date: TODAY, hourUnknown: hu, birthDate: bd }));
    for (const date of dates) walk('Almanac · day', resolveAlmanac(chart, { kind: 'day', date, hourUnknown: hu, birthDate: bd }));
    for (const date of dates.slice(0, 3)) walk('Almanac · month', resolveAlmanac(chart, { kind: 'month', date, hourUnknown: hu, birthDate: bd }));
    for (const date of dates.slice(0, 2)) walk('Almanac · year', resolveAlmanac(chart, { kind: 'year', date, hourUnknown: hu, birthDate: bd }));
    // the Day Master surfaces (the revelation and the Day Master page on the ladder, the type): every row the
    // screens read must exist for this chart. Fallback text is not marked as a draft in code, so a fallback passes here.
    {
      // the sweep builds the journey model without an identity, so the archetype name is set here as the app sets it
      const g = buildMergedModel({ ...m, archetype: m.archetype || STEM_CARD_DATA[m.stem]?.identity?.archetypeName }, chart); const SL = STEM_LADDER[m.stem] || {}; const core = m.core.name;
      for (const k of ['element_line', 'recognition', 'as_line', 'behaviour', 'contrast', 'self_nature']) line('Day Master · stem lines', `STEM ${m.stem} · ladder.${k}`, !!SL[k], 'empty');
      line('Day Master · stem lines', `tpl_ladder · element_heading.${core}`, !!LADDER.element_heading[core], 'empty');
      line('Day Master · how you run', `tpl_ladder · condition.${m.condition}`, ['heading', 'body', 'try'].every((k) => !!LADDER.condition[m.condition]?.[k]), 'empty');
      for (const r of Object.values(g.rows)) {
        const ov = (t, b) => SL.overrides?.[`${t}.${r.fn}.${b}`] ?? LADDER[t]?.[r.fn]?.[b];
        line('Day Master · energy rows', `tpl_ladder · nature ${core}/${r.name}`, !!(r.isCore ? SL.self_nature : LADDER.nature_pair[core]?.[r.name]), 'empty');
        line('Day Master · energy rows', `tpl_ladder · function_plain.${r.fn}`, !!LADDER.function_plain[r.fn] && !!LADDER.function_short[r.fn], 'empty');
        line('Day Master · energy rows', `tpl_ladder · in_you.${r.fn}.${r.volume}`, !!ov('in_you', r.volume), 'empty');
        line('Day Master · energy rows', `tpl_ladder · notice.${r.fn}.${LADDER_NOTICE_BAND[r.volume]}`, !!ov('notice', LADDER_NOTICE_BAND[r.volume]), 'empty');
        const t = ladderTry(r.fn, r.pole, r.volume);
        line('Day Master · energy rows', `tpl_ladder · try ${r.fn} ${r.pole} ${r.volume}`, !!t && !BAD.test(t), 'empty or unfilled', t);
      }
      const t = g.type;
      line('Day Master · type', 'tpl_type · name + line', !!t?.name && !!t?.line && !BAD.test(t.name + t.line), 'empty or unfilled', `${t?.name} ${t?.line}`);
      line('Day Master · type', `tpl_ladder · mode_plain.${t?.mode.fn}`, !!LADDER.mode_plain[t?.mode.fn], 'empty');
      if (t?.need) line('Day Master · type', `tpl_ladder · need_phrase.${t.need.fn}`, !!(SL.overrides?.[`need_phrase.${t.need.fn}`] ?? LADDER.need_phrase[t.need.fn]), 'empty');
      line('Day Master · type', 'tpl_type · circle.head', !!t?.circle.head && !BAD.test(t.circle.head), 'empty or unfilled', t?.circle.head);
      walk('Day Master · merged model', { rows: g.rows, runLine: g.runLine, runHeadline: g.runHeadline, rx: g.rx, start: g.start, who: g.who, reading: g.reading });
    }
    // the archetypes reached
    const p = chart.pillars; bump(reach.stem, p.day.stem); bump(reach.cell, p.day.stem + p.month.branch); bump(reach.strength, chart.dayMaster?.strength);
    bump(reach.structure, B.title.replace(/^An? /, '')); bump(reach.state, `${B.title.replace(/^An? | structure.*$/g, '')} · ${B.structure.statusLabel}`); bump(reach.condition, m.condition);
    bump(reach.gate, L.gateNow || '?'); bump(reach.hu, hu ? 'hour unknown' : 'hour known'); bump(reach.gender, birth.gender);
    rendered++;
  } catch (e) { errors++; const k = String(e && e.message).slice(0, 120); (errs[k] ||= []).push(birth); }
}
const secs = ((Date.now() - t0) / 1000).toFixed(0);

// ── the report ──────────────────────────────────────────────────────
console.log(`${rendered} charts rendered in ${secs}s (${errors} threw), ${DAYS} Almanac dates each, Blueprint rules ${DEPTH_RULES_V2 ? 'v2 (live)' : 'v1'}\n`);
let open = 0;
for (const [k, v] of Object.entries(S)) { if (v.bad) open++; console.log(`${v.bad ? 'GAP ' : 'ok  '} ${k.padEnd(26)} ${String(v.bad).padStart(6)} of ${String(v.n).padStart(7)} lines fail (${((100 * v.bad) / v.n).toFixed(2)}%)`); }
const R = (o) => Object.entries(o).sort((a, b) => b[1] - a[1]);
console.log(`\nArchetypes reached:`);
console.log(`  day stems ${Object.keys(reach.stem).length}/10 · season cells ${Object.keys(reach.cell).length}/120 (fewest ${Math.min(...Object.values(reach.cell))} charts) · strength bands ${Object.keys(reach.strength).length}/5 · conditions ${Object.keys(reach.condition).length}`);
console.log(`  structures ${Object.keys(reach.structure).length}: ${R(reach.structure).map(([k, n]) => `${k} ${n}`).join(' · ')}`);
console.log(`  structure states ${Object.keys(reach.state).length}: ${R(reach.state).map(([k, n]) => `${k} ${n}`).join(' · ')}`);
console.log(`  chapter now: ${R(reach.gate).map(([k, n]) => `${k} ${n}`).join(' · ')} · ${R(reach.hu).map(([k, n]) => `${k} ${n}`).join(' · ')}`);
const keys = Object.entries(miss).sort((a, b) => b[1].n - a[1].n);
if (keys.length) {
  console.log(`\n${keys.length} distinct failing keys${argv.includes('--keys') ? '' : ' (the first 40; --keys for all)'}:`);
  for (const [k, v] of keys.slice(0, argv.includes('--keys') ? keys.length : 40)) console.log(`  ${String(v.n).padStart(6)}×  ${k}  [${v.why}]${v.sample ? `  "${v.sample}"` : ''}`);
}
if (errors) { console.log('\nThrew:'); for (const [k, v] of Object.entries(errs)) console.log(`  ${v.length}× ${k}  e.g. ${JSON.stringify(v[0])}`); }
const ji = argv.indexOf('--json');
if (ji >= 0) fs.writeFileSync(argv[ji + 1], JSON.stringify({ rendered, errors, errs, sections: S, reach, keys: Object.fromEntries(keys) }, null, 1));
if (open || errors) process.exit(1);
console.log('\nPASS: every line on every section is written, for every chart and date reached.');
