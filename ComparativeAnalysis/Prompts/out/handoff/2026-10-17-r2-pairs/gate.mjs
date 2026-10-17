// Round 2 pair-cell gate (owner 2026-10-17: R2-1 balanced advice and definitions, R2-5 acts by meaning per reader set,
// R2-4 and the Minor findings on shared fields). node gate.mjs out-<core>.json   exit 1 on any failure
import fs from 'node:fs'; import path from 'node:path';
import { OLD, MEANING, LIMIT, sents, actSentences, fams } from './acts.mjs';
const HERE = path.dirname(new URL(import.meta.url).pathname); const outFile = path.resolve(process.argv[2]);
const core = path.basename(outFile).replace(/^out-|\.json$/g, ''); const W = JSON.parse(fs.readFileSync(`${HERE}/worklist-${core}.json`, 'utf8'));
const out = JSON.parse(fs.readFileSync(outFile, 'utf8')); const fails = []; const F = (m) => fails.push(m);
const IMP = /^(Let|Keep|Ask|Take|Give|Make|Pick|Choose|Try|Say|Spend|Set|Put|Hand|Allow|Leave|Stop|Start|Go|Do|Don't|Find|Tell|Trust|Show|Read|Write|Call|Sit|Sleep|Eat|Book|Bring|Share|Save|Send|Name|Stay|Wait|Move|Count|Check|Plan|Hold|Use|Add|Offer|Open|Close|Finish|Lead|Follow|Listen|Learn|Teach|Build|Rest|Step|Slow|Speak|Join|Sign|Plant|Grow|Tend|Clear|Cut|Drop|Cancel|Begin|Spend|Cook|Visit|Walk|Play|Post|Accept|See|Mend|Fix|Pass|Spread|Sort|Hold|Return|Agree|Stand|Turn|Invite|Write|Record|Map|Note|Practise|Water|Repair|Count|Lend|Gather|Host|Attend|Mark|Write|Leave)\b/;
const SHORT = /\b(short|thin|little|less than|lack|lacking|skip|rarely|seldom|too few|not enough|small|falls? short|runs? out|missing)\b/i;
const PEOPLE = /\b(partner|child|children|kids?|boss|promotions?|raises?|colleagues?|under you|above you|household|students?)\b/i;
// the length limits on the whole text; the style checks on the new parts only (the approved fixed lines are not re-ruled)
const text = (t, tag, { min = 30, max = 60, sMin = 3, sMax = 7 } = {}, fresh = t) => {
  const n = t.split(/\s+/).length; const ss = sents(t);
  if (n < min || n > max) F(`${tag}: ${n} words (${min} to ${max})`); if (ss.length < sMin || ss.length > sMax) F(`${tag}: ${ss.length} sentences (${sMin} to ${sMax})`);
  t = fresh; for (const s of sents(t)) if ((s.match(/,/g) || []).length > 2) F(`${tag}: more than two commas: "${s}"`);
  if (/[—–;:]/.test(t)) F(`${tag}: dash, semicolon or colon`); if (/\b(room|verdict)\b/i.test(t)) F(`${tag}: "room"/"verdict"`);
  if (/,\s+so\b|\bso that\b/i.test(t)) F(`${tag}: "X, so Y" frame`); if (/\b(ahead of|sooner than)\b/.test(t)) F(`${tag}: "ahead of"/"sooner than"`);
};
const acts = {}; const allActs = [];
for (const c of W.cells) {
  const o = out.find((x) => x.pair_cell === c.pair_cell); if (!o) { F(`${c.pair_cell}: missing`); continue; }
  for (const k of ['advise_catalyst', 'advise_friction', 'advise_balanced']) {
    const t = o[k]?.text; const tag = `${c.pair_cell} ${k}`; if (!t) { F(`${tag}: missing`); continue; }
    const a = actSentences(t); const ss = sents(t); const old = k === 'advise_balanced' ? [] : sents(c[k].text);
    text(t, tag, {}, ss.filter((x) => !old.includes(x)).join(' '));
    if (a.length < 2 || a.length > 4) F(`${tag}: 2 to 4 act sentences (found ${a.length}; acts start at the first instruction)`);
    if (k !== 'advise_balanced') { const cur = c[k]; const keptFixed = sents(cur.text).filter((s) => cur.fixed.includes(s)); const newFixed = ss.slice(0, ss.length - a.length);
      if (!cur.notes.length && newFixed.join(' ') !== keptFixed.join(' ')) F(`${tag}: the diagnosis/remedy lines change only where the field has notes`);
      if (k === 'advise_friction' && ss[0] !== sents(cur.text)[0]) F(`${tag}: the "Seek …" sentence stays word for word`); }
    else { if (SHORT.test(ss[0])) F(`${tag}: the balanced diagnosis names a shortage: "${ss[0]}"`); if (a.length === ss.length) F(`${tag}: open on a keep-the-mix diagnosis before the acts`); }
    if (PEOPLE.test(t) && !(k !== 'advise_balanced' && PEOPLE.test(c[k].text) && !c[k].notes.length)) F(`${tag}: assumes a person ("${t.match(PEOPLE)[0]}")`);
    acts[`${c.pair_cell}.${k}`] = a; for (const s of a) allActs.push({ s, at: `${c.pair_cell} ${k}`, cell: c.pair_cell, k });
  }
  const bt = o.definition_balanced?.tail; if (!bt || !/^In balance, /.test(bt)) F(`${c.pair_cell} definition_balanced: tail missing or not opening "In balance, "`); else text(`${c.definition_balanced.head} ${bt}`, `${c.pair_cell} definition_balanced`, { max: 50, sMin: 3, sMax: 4 }, bt);
  for (const p of ['catalyst', 'friction']) { const t = o[`definition_${p}`]?.tail; if (!t) continue; if (!c[`definition_${p}`].notes.length) F(`${c.pair_cell} definition_${p}: change only where the field has notes`); if (!/^(As a (catalyst|friction)|Running (thin|over)),/.test(t)) F(`${c.pair_cell} definition_${p}: tail opener`); text(`${sents(c[`definition_${p}`].text).slice(0, 2).join(' ')} ${t}`, `${c.pair_cell} definition_${p}`, { max: 50, sMin: 3, sMax: 4 }, t); }
}
for (const set of ['weak', 'strong', 'balanced']) {
  const cnt = {}; for (const c of W.cells) for (const s of acts[`${c.pair_cell}.${c.sets[set]}`] || []) for (const f of fams(s, MEANING)) (cnt[f] = cnt[f] || []).push(`${c.pair_cell} ${c.sets[set]}: "${s}"`);
  for (const [f, l] of Object.entries(cnt)) if (l.length > (LIMIT[f] || 1)) F(`${set} reader set: "${f}" ×${l.length} (at most ${LIMIT[f] || 1}):\n      ${l.join('\n      ')}`);
}
{ const cnt = {}; for (const c of W.cells) for (const k of ['advise_catalyst', 'advise_friction']) for (const s of acts[`${c.pair_cell}.${k}`] || []) for (const f of fams(s, OLD)) (cnt[f] = cnt[f] || []).push(`${c.pair_cell} ${k}`); for (const [f, l] of Object.entries(cnt)) if (l.length > 1) F(`core (round-1 M6 rule): "${f}" ×${l.length}: ${l.join(', ')}`); }
const seen = new Map(); for (const f of fs.readdirSync(HERE).filter((x) => /^out-\w+\.json$/.test(x) && x !== path.basename(outFile))) for (const o of JSON.parse(fs.readFileSync(`${HERE}/${f}`, 'utf8'))) for (const k of ['advise_catalyst', 'advise_friction', 'advise_balanced']) for (const s of actSentences(o[k]?.text || '')) seen.set(s.toLowerCase(), `${o.pair_cell} ${k}`);
const local = new Map(); for (const x of allActs) { const l = x.s.toLowerCase(); if (seen.has(l)) F(`${x.at}: the act "${x.s}" is already in ${seen.get(l)}`); const prev = local.get(l); if (prev && !(prev.cell === x.cell && [prev.k, x.k].includes('advise_balanced') && [prev.k, x.k].includes('advise_catalyst'))) F(`${x.at}: repeats "${x.s}" from ${prev.at}`); if (!prev) local.set(l, x); }
console.log(`${core}: ${W.cells.length} cells, ${fails.length} failures`); for (const f of fails) console.log('  ✗ ' + f); process.exit(fails.length ? 1 : 0);
