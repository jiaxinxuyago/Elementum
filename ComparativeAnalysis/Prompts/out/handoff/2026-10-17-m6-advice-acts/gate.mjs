// M6 gate (owner 2026-10-17): across the ten advice and remedy texts one core can show, each act family appears at most
// once; acts draw on the element; no act sentence repeats anywhere in the corpus; the text keeps the house limits.
//   node gate.mjs <out-core.json>     exit 1 on any failure
import fs from 'node:fs'; import path from 'node:path';
import { FAMILIES, familiesOf, sents } from './acts.mjs';
const HERE = path.dirname(new URL(import.meta.url).pathname); const ROOT = path.resolve(HERE, '../../../../..') + '/';
const outFile = path.resolve(process.argv[2]); const out = JSON.parse(fs.readFileSync(outFile, 'utf8'));
const core = path.basename(outFile).replace(/^out-|\.json$/g, '');
const work = JSON.parse(fs.readFileSync(`${HERE}/worklist-${core}.json`, 'utf8'));
const DECL = /^(You|Your|Yours|Little|Nothing|What|Whatever|With|Most|Much|Some|Each|It|That|This|There|Whether|Seek|Let it)\b/;
const norm = (t) => t.toLowerCase().replace(/[^a-z' ]+/g, ' ').split(/\s+/).filter(Boolean);
const grams = (t, n = 4) => { const w = norm(t); const g = new Set(); for (let i = 0; i + n <= w.length; i++) g.add(w.slice(i, i + n).join(' ')); return g; };
const walk = (o, cb, p = '') => { if (typeof o === 'string') cb(p, o); else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) walk(v, cb, p ? `${p}.${k}` : k); };
const fails = []; const F = (m) => fails.push(m); const fam = {}; const mine = [];
for (const c of work.cells) {
  const o = out.find((x) => x.pair_cell === c.pair_cell); if (!o) { F(`${c.pair_cell}: missing`); continue; }
  const st = JSON.parse(fs.readFileSync(`${ROOT}Reading/Database/templates/by_axis/json/ELEMENT_PAIR/${c.pair_cell}.json`, 'utf8')).candidates;
  for (const p of ['advise_catalyst', 'advise_friction']) {
    const tag = `${c.pair_cell} ${p}`; const acts = o[p]?.acts;
    if (!Array.isArray(acts) || acts.length < 2 || acts.length > 4) { F(`${tag}: 2 to 4 act sentences`); continue; }
    const text = [...c[p].fixed, ...acts].join(' '); const n = text.split(/\s+/).length; const ss = sents(text);
    if (n < 30 || n > 60) F(`${tag}: ${n} words (30 to 60)`);
    if (ss.length < 3 || ss.length > 7) F(`${tag}: ${ss.length} sentences (3 to 7)`);
    for (const a of acts) {
      if (sents(a).length !== 1) F(`${tag}: each act is one sentence: "${a}"`);
      if (DECL.test(a)) F(`${tag}: an act is an instruction, not a statement: "${a}"`);
      if ((a.match(/,/g) || []).length > 2) F(`${tag}: more than two commas: "${a}"`);
      if (/[—–;:]/.test(a)) F(`${tag}: dash, semicolon or colon: "${a}"`);
      if (/\b(room|verdict)\b/i.test(a)) F(`${tag}: rationed or banned word: "${a}"`);
      if (/,\s+so\b|\bso that\b/i.test(a)) F(`${tag}: "X, so Y" frame: "${a}"`);
      if (/\b(a|your|their) child\b|\bkids?\b/i.test(a)) F(`${tag}: assumes the reader has a child: "${a}"`);
      for (const f of familiesOf(a)) (fam[f] = fam[f] || []).push(`${tag}: "${a}"`);
      mine.push({ tag, a });
    }
    // phrase law: no four-word run shared with another text of the same pair cell
    const others = []; walk(st, (k, t) => { if (k !== `function.${p}`) others.push([k, t]); });
    const g = grams(acts.join(' ')); for (const [k, t] of others) for (const x of grams(t)) if (g.has(x)) F(`${tag}: shares "${x}" with ${k}`);
    o[`_${p}_text`] = text;
  }
}
for (const [f, list] of Object.entries(fam)) if (list.length > 1) F(`act family "${f}" appears ${list.length} times in this core (at most once):\n      ${list.join('\n      ')}`);
// no act sentence repeated anywhere: other cores' outputs and the corpus as it stands
const seen = new Map(); for (const f of fs.readdirSync(HERE).filter((x) => /^out-\w+\.json$/.test(x) && x !== path.basename(outFile))) for (const o of JSON.parse(fs.readFileSync(`${HERE}/${f}`, 'utf8'))) for (const p of ['advise_catalyst', 'advise_friction']) for (const a of o[p]?.acts || []) seen.set(a.toLowerCase(), `${o.pair_cell} ${p}`);
for (const { tag, a } of mine) if (seen.has(a.toLowerCase())) F(`${tag}: the act "${a}" is already in ${seen.get(a.toLowerCase())}`);
const local = new Map(); for (const { tag, a } of mine) { if (local.has(a.toLowerCase())) F(`${tag}: repeats "${a}" from ${local.get(a.toLowerCase())}`); local.set(a.toLowerCase(), tag); }
fs.writeFileSync(outFile.replace(/\.json$/, '.assembled.json'), JSON.stringify(out.map((o) => ({ pair_cell: o.pair_cell, advise_catalyst: o._advise_catalyst_text, advise_friction: o._advise_friction_text })), null, 1));
console.log(`${core}: ${work.cells.length} cells, families ${JSON.stringify(Object.fromEntries(Object.entries(fam).map(([k, v]) => [k, v.length])))}, ${fails.length} failures`);
for (const f of fails) console.log('  ✗ ' + f); process.exit(fails.length ? 1 : 0);
