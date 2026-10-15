// THE EDGE GATE (ELEMENT_GOD.edge v4, the door): checks a filled edge skeleton.
//   node validate-edge.mjs <file.json|dir> [--json] [--quiet]
// Blocking: the claim exact · the lead one sentence of 10-20 words with a lawful opener · three items whose domains equal facts.ruling_domains in order · each line 3-5 words, lowercase, no stop, no colon, no digit · the metric one of the bars · the reader zone · a four-word run shared with any fact · "will never" · a virtue head or a capacity opener on the lead · "become a/an" · a phrase repeated within the file or across the dir.
import fs from 'node:fs'; import path from 'node:path';
import { wc, zoneCheck, VIRTUE_HEAD } from './lib.mjs';
const argv = process.argv.slice(2); const quiet = argv.includes('--quiet'); const asJson = argv.includes('--json');
const grams4 = (t) => { const w = String(t || '').toLowerCase().replace(/[^a-z' ]+/g, ' ').split(/\s+/).filter(Boolean); const out = new Set(); for (let i = 0; i + 4 <= w.length; i++) out.add(w.slice(i, i + 4).join(' ')); return out; };
const flatStrings = (v) => typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(flatStrings) : (v && typeof v === 'object') ? Object.values(v).flatMap(flatStrings) : [];
const CAPACITY = /^(you can|you are able|you have the ability|you tend to)/i;
const OPENER = /^(It makes you|It is why you|It gives you|You are the one who)\b/;
export function validateEdge(file, seen = new Map()) {
  const sk = JSON.parse(fs.readFileSync(file, 'utf8')); const v = sk.fields?.edge?.value; const f = sk.facts || {}; const B = [];
  if (!v || typeof v !== 'object') return { file: path.basename(file), blocking: ['no value'], pass: false };
  if (v.claim !== f.claim_fixed) B.push(`claim: expected "${f.claim_fixed}", got "${v.claim}"`);
  const lead = String(v.lead || ''); const lw = wc(lead);
  if (lw < 10 || lw > 20) B.push(`lead: ${lw} words (10-20)`);
  if ((lead.match(/[.!?](\s|$)/g) || []).length !== 1) B.push('lead: one sentence');
  if (!OPENER.test(lead)) B.push('lead: opener not lawful (It makes you / It is why you / It gives you / You are the one who)');
  if (VIRTUE_HEAD.test(lead.replace(OPENER, '').trim())) B.push('lead: virtue head');
  if (CAPACITY.test(lead)) B.push('lead: capacity opener');
  if (/\bwill never\b/i.test(JSON.stringify(v))) B.push('a "will never" guarantee');
  if (/\bbecome an? \w+/i.test(JSON.stringify(v))) B.push('a field of work as an instruction ("become a")');
  if (/\d/.test(JSON.stringify(v))) B.push('a digit');
  const items = Array.isArray(v.items) ? v.items : [];
  if (items.length !== 3) B.push(`items: ${items.length} (3)`);
  const want = f.ruling_domains || [];
  items.forEach((it, i) => { if (it.domain !== want[i]) B.push(`items[${i}].domain: "${it.domain}" (ruling order: ${want.join(', ')})`); });
  const firsts = new Set();
  items.forEach((it, i) => {
    const line = String(it.line || ''); const n = wc(line);
    if (n < 3 || n > 5) B.push(`items[${i}].line: ${n} words (3-5)`);
    if (/[.!?]$/.test(line)) B.push(`items[${i}].line: terminal stop`);
    if (/:/.test(line)) B.push(`items[${i}].line: colon`);
    if (/^[A-Z]/.test(line)) B.push(`items[${i}].line: capital opener`);
    const fw = line.toLowerCase().split(/\s+/).find((w) => !['the', 'a', 'an', 'your', 'one'].includes(w)) || ''; if (firsts.has(fw)) B.push(`items[${i}].line: opens on "${fw}" like another row`); firsts.add(fw);
    const key = line.toLowerCase().trim(); if (seen.has(key) && seen.get(key) !== path.basename(file)) B.push(`items[${i}].line: "${line}" repeats ${seen.get(key)}`); seen.set(key, path.basename(file));
  });
  const keys = (f.bars || []).map((b) => b.key); if (!keys.includes(v.metric)) B.push(`metric: "${v.metric}" not in ${keys.join('/')}`);
  const z = zoneCheck([lead, ...items.map((it) => it.line)].join(' ')); if (z.outside.length) B.push(`outside the reader zone: ${z.outside.join(', ')}`);
  const factG = new Set(); for (const s of flatStrings({ chips: f.catalyst_chips, ledger: f.catalyst_ledger, def: f.pair_definition_catalyst, adv: f.pair_advise_catalyst })) for (const g of grams4(s)) factG.add(g);
  for (const g of grams4([lead, ...items.map((it) => it.line)].join('. '))) if (factG.has(g)) B.push(`four-word run shared with a fact: "${g}"`);
  return { file: path.basename(file), blocking: B, zoneEdge: z.edge, pass: B.length === 0 };
}
const target = argv.find((a) => !a.startsWith('--')); const files = fs.statSync(target).isDirectory() ? fs.readdirSync(target).filter((x) => x.endsWith('.json') && !x.endsWith('.gate.json')).sort().map((x) => path.join(target, x)) : [target];
const seen = new Map(); const results = files.map((f) => validateEdge(f, seen));
if (asJson) console.log(JSON.stringify(results, null, 1)); else for (const r of results) { console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.file}`); if (!quiet) for (const b of r.blocking) console.log('   ✗ ' + b); if (!quiet && r.zoneEdge?.length) console.log('   zone edge (not blocking): ' + r.zoneEdge.join(', ')); }
process.exit(results.every((r) => r.pass) ? 0 : 1);
