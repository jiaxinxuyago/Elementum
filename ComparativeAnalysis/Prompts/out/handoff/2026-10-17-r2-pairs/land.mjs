// Land round-2 pair-cell work: advise_balanced (new field) inserted into station + pairs.js with provenance; changed
// existing fields (advice, balanced/shared definitions) through the audit kit's applier. node land.mjs [--dry]
import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
import { sents } from './acts.mjs';
const HERE = path.dirname(new URL(import.meta.url).pathname); const ROOT = path.resolve(HERE, '../../../../..') + '/';
const dry = process.argv.includes('--dry'); const BY = 'final-audit-r2'; const today = new Date().toISOString().slice(0, 10);
const RULING = 'Owner 2026-10-17: round-2 majors approved (R2-1 balanced advice and definitions, R2-4 neutral people, R2-5 acts by meaning per reader set) and the Minor fixes on shared fields.';
const js = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
let pairs = fs.readFileSync(ROOT + 'Elementum_App/src/content/pairs.js', 'utf8'); const fixes = []; let nNew = 0;
for (const f of fs.readdirSync(HERE).filter((x) => /^out-\w+\.json$/.test(x))) {
  const W = JSON.parse(fs.readFileSync(`${HERE}/worklist-${f.replace(/^out-|\.json$/g, '')}.json`, 'utf8'));
  for (const o of JSON.parse(fs.readFileSync(`${HERE}/${f}`, 'utf8'))) {
    const c = W.cells.find((x) => x.pair_cell === o.pair_cell);
    for (const k of ['advise_catalyst', 'advise_friction']) if (o[k].text !== c[k].text) fixes.push({ key: `PAIR ${o.pair_cell} · function.${k}`, text: o[k].text, id: 'R2 pairs' });
    const bal = `${c.definition_balanced.head} ${o.definition_balanced.tail}`; if (bal !== c.definition_balanced.text) fixes.push({ key: `PAIR ${o.pair_cell} · function.definition_balanced`, text: bal, id: 'R2-1' });
    for (const p of ['catalyst', 'friction']) if (o[`definition_${p}`]?.tail) { const t = `${sents(c[`definition_${p}`].text).slice(0, 2).join(' ')} ${o[`definition_${p}`].tail}`; if (t !== c[`definition_${p}`].text) fixes.push({ key: `PAIR ${o.pair_cell} · function.definition_${p}`, text: t, id: 'R2 pairs' }); }
    // the new field
    const sf = `${ROOT}Reading/Database/templates/by_axis/json/ELEMENT_PAIR/${o.pair_cell}.json`; const st = JSON.parse(fs.readFileSync(sf, 'utf8'));
    const before = st.candidates.function.advise_balanced ?? null; const t = o.advise_balanced.text;
    if (before !== t) {
      const ent = Object.entries(st.candidates.function).filter(([k]) => k !== 'advise_balanced'); const i = ent.findIndex(([k]) => k === 'advise_friction'); ent.splice(i + 1, 0, ['advise_balanced', t]); st.candidates.function = Object.fromEntries(ent);
      (st.$provenance = st.$provenance || []).push({ field: 'function.advise_balanced', adopted_from: BY, date: today, ruling: RULING, finding: 'R2-1', replaced: before });
      const a = pairs.indexOf(`'${o.pair_cell}': {`); const nx = pairs.slice(a + 1).search(/\n  '[^']+': \{/); const b = nx < 0 ? pairs.length : a + 1 + nx; let s = pairs.slice(a, b);
      if (before == null) { const m = s.match(/\n(\s+)advise_friction: '(?:[^'\\]|\\.)*',?\n/); if (!m) throw new Error(o.pair_cell + ': advise_friction anchor'); const line = m[0].endsWith(',\n') ? m[0] : m[0].replace(/'\n$/, "',\n"); s = s.replace(m[0], `${line}${m[1]}advise_balanced: '${js(t)}',\n`); }
      else { const o2 = `advise_balanced: '${js(before)}'`; if (s.split(o2).length !== 2) throw new Error(o.pair_cell + ': balanced anchor'); s = s.replace(o2, `advise_balanced: '${js(t)}'`); }
      pairs = pairs.slice(0, a) + s + pairs.slice(b); if (!dry) fs.writeFileSync(sf, JSON.stringify(st, null, 2) + '\n'); nNew++;
    }
  }
}
if (!dry) fs.writeFileSync(ROOT + 'Elementum_App/src/content/pairs.js', pairs);
const ff = `${HERE}/r2-pairs.fixes.json`; fs.writeFileSync(ff, JSON.stringify(fixes, null, 1));
console.log(`${dry ? 'DRY ' : ''}advise_balanced written: ${nNew}; existing fields changed: ${fixes.length}`);
console.log(execFileSync('node', [`${ROOT}ComparativeAnalysis/Prompts/audit/apply-fixes.mjs`, ff, '--by', BY, '--ruling', RULING, ...(dry ? ['--dry'] : [])], { cwd: ROOT, encoding: 'utf8' }));
