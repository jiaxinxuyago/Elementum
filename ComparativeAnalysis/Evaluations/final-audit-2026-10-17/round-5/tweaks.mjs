// Round-2 TWEAKs → fixes, routing composite definition keys (pair head + persona tail) to the persona tail.
import fs from 'node:fs';
const { findings } = JSON.parse(fs.readFileSync('findings.json', 'utf8'));
const raw = fs.readdirSync('audit').flatMap((f) => fs.readFileSync(`audit/${f}`, 'utf8').split('\n').filter((l) => /\|\s*TWEAK\s*\|/.test(l)).map((l) => ({ src: f.replace('.md', ''), l })));
const sents = (t) => (t.match(/[^.!?]+[.!?]+/g) || []).map((s) => s.trim());
const out = new Map();
for (const f of findings.filter((x) => x.severity === 'TWEAK')) {
  const row = raw.find((r) => r.src === f.source && r.l.includes(`| ${f.id} |`))?.l || '';
  let key = f.key; let text = f.fix.trim().replace(/[”"]\s*\([^)]*\)\s*$/, '"').replace(/^Tail:\s*/i, '').replace(/^[“"]|[”"]\s*(\(\d+\))?\.?$/g, '').trim();
  const def = row.match(/K2 (\S+) · fn_reading\.(catalyst|friction)\.define/);
  if (def) { key = `K2 ${def[1]} · fn_reading.${def[2]}.define`; if (/^Your /.test(text)) text = sents(text).slice(2).join(' '); }
  out.set(key, { key, text, id: `R5 ${f.source}:${f.id}` });
}
fs.writeFileSync('tweaks.fixes.json', JSON.stringify([...out.values()], null, 1)); console.log(out.size);
