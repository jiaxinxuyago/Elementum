// Land M2 (owner 2026-10-17): new fields (persona tails → K2 fn_reading.<pole>.define; balanced texts → PAIR
// function.definition_balanced) are inserted into the station and into k2.js / pairs.js with provenance; rewrites
// of existing fields (shared definitions, advice) go through the audit kit's applier.
//   node land.mjs [--dry]          (reads every out-<core>.json in this folder; run each through gate.mjs first)
import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
const HERE = path.dirname(new URL(import.meta.url).pathname); const ROOT = path.resolve(HERE, '../../../../..') + '/';
const dry = process.argv.includes('--dry');
const RULING = 'Owner 2026-10-17: "Go with B for definitions, A for advice … treat the blend as an individual"; "M2 approved, apply the fix across all the content that shares the issue."';
const BY = 'm2-definitions'; const today = new Date().toISOString().slice(0, 10);
const js = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const ST = (axis, cell) => `${ROOT}Reading/Database/templates/by_axis/json/${axis}/${cell}.json`;
let k2 = fs.readFileSync(ROOT + 'Elementum_App/src/content/k2.js', 'utf8'); let pairs = fs.readFileSync(ROOT + 'Elementum_App/src/content/pairs.js', 'utf8');
const span = (code, cell) => { const start = code.indexOf(`'${cell}': {`); if (start < 0) throw new Error('no cell ' + cell); const next = code.slice(start + 1).search(/\n  '[^']+': \{/); return [start, next < 0 ? code.length : start + 1 + next]; };
const fixes = []; let nNew = 0;
for (const f of fs.readdirSync(HERE).filter((x) => /^out-\w+\.json$/.test(x))) {
  const core = f.replace(/^out-|\.json$/g, ''); const work = JSON.parse(fs.readFileSync(`${HERE}/worklist-${core}.json`, 'utf8'));
  for (const o of JSON.parse(fs.readFileSync(`${HERE}/${f}`, 'utf8'))) {
    const c = work.cells.find((x) => x.pair_cell === o.pair_cell);
    // persona tails
    for (const [cell, poles] of Object.entries(o.tails)) {
      const sf = ST('ELEMENT_GOD', cell); const st = JSON.parse(fs.readFileSync(sf, 'utf8'));
      const [a, b] = span(k2, cell); let s = k2.slice(a, b);
      for (const pole of ['catalyst', 'friction']) {
        const tail = poles[pole]; const node = st.candidates.fn_reading[pole]; const before = node.define ?? null;
        if (before === tail) continue;
        st.candidates.fn_reading[pole] = { define: tail, ...Object.fromEntries(Object.entries(node).filter(([k]) => k !== 'define')) };
        (st.$provenance = st.$provenance || []).push({ field: `fn_reading.${pole}.define`, adopted_from: BY, date: today, ruling: RULING, finding: 'M2', replaced: before });
        if (before == null) { const o2 = `${pole}: { ledger:`; if (s.split(o2).length !== 2) throw new Error(`${cell} ${pole}: ledger anchor`); s = s.replace(o2, `${pole}: { define: '${js(tail)}', ledger:`); }
        else { const o2 = `define: '${js(before)}'`; if (s.split(o2).length !== 2) throw new Error(`${cell} ${pole}: define anchor`); s = s.replace(o2, `define: '${js(tail)}'`); }
        nNew++;
      }
      k2 = k2.slice(0, a) + s + k2.slice(b); if (!dry) fs.writeFileSync(sf, JSON.stringify(st, null, 2) + '\n');
    }
    // balanced text
    { const full = `${c.catalyst.head} ${o.balanced_tail}`; const sf = ST('ELEMENT_PAIR', o.pair_cell); const st = JSON.parse(fs.readFileSync(sf, 'utf8'));
      const fnode = st.candidates.function; const before = fnode.definition_balanced ?? null;
      if (before !== full) {
        const ent = Object.entries(fnode).filter(([k]) => k !== 'definition_balanced'); const i = ent.findIndex(([k]) => k === 'definition_friction');
        ent.splice(i + 1, 0, ['definition_balanced', full]); st.candidates.function = Object.fromEntries(ent);
        st.$provenance = st.$provenance || []; st.$provenance.push({ field: 'function.definition_balanced', adopted_from: BY, date: today, ruling: RULING, finding: 'M2 · S5', replaced: before });
        const [a, b] = span(pairs, o.pair_cell); let s = pairs.slice(a, b);
        if (before == null) { const m = s.match(/\n(\s+)definition_friction: '(?:[^'\\]|\\.)*',\n/); if (!m) throw new Error(o.pair_cell + ': friction anchor'); s = s.replace(m[0], `${m[0]}${m[1]}definition_balanced: '${js(full)}',\n`); }
        else { const o2 = `definition_balanced: '${js(before)}'`; if (s.split(o2).length !== 2) throw new Error(o.pair_cell + ': balanced anchor'); s = s.replace(o2, `definition_balanced: '${js(full)}'`); }
        pairs = pairs.slice(0, a) + s + pairs.slice(b); if (!dry) fs.writeFileSync(sf, JSON.stringify(st, null, 2) + '\n'); nNew++;
      } }
    // rewrites of existing fields
    for (const pole of ['catalyst', 'friction']) {
      if (o.shared?.[pole]?.decision === 'rewrite') fixes.push({ key: `PAIR ${o.pair_cell} · function.definition_${pole}`, text: `${c[pole].head} ${o.shared[pole].tail}`, id: `M2 shared ${pole}` });
      if (o[`advise_${pole}`]?.decision === 'rewrite') fixes.push({ key: `PAIR ${o.pair_cell} · function.advise_${pole}`, text: o[`advise_${pole}`].text, id: `M2 advise ${pole}` });
    }
  }
}
if (!dry) { fs.writeFileSync(ROOT + 'Elementum_App/src/content/k2.js', k2); fs.writeFileSync(ROOT + 'Elementum_App/src/content/pairs.js', pairs); }
const fixFile = `${HERE}/m2-existing.fixes.json`; fs.writeFileSync(fixFile, JSON.stringify(fixes, null, 1));
console.log(`${dry ? 'DRY ' : ''}new fields written: ${nNew}; rewrites of existing fields: ${fixes.length}`);
console.log(execFileSync('node', [`${ROOT}ComparativeAnalysis/Prompts/audit/apply-fixes.mjs`, fixFile, '--by', BY, '--ruling', RULING, ...(dry ? ['--dry'] : [])], { cwd: ROOT, encoding: 'utf8' }));
