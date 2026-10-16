// THE EDGE GATE (ELEMENT_GOD.edge v4, the door): checks a filled edge skeleton.
//   node validate-edge.mjs <file.json|dir> [--json] [--quiet]
// Blocking (v7): the claim exact · the lead 35-55 words in 3-6 sentences opening on You, with a short imperative, no It opener · the three domains equal to facts.ruling_domains in order · the metric one of the bars · the reader zone on the lead · a four-word run shared with any fact · "will never" · a virtue head or a capacity opener · "become a/an" · a lead repeated across the dir.
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
  if (lw < 35 || lw > 55) B.push(`lead: ${lw} words (35-55)`);
  const nS = (lead.match(/[.!?](\s|$)/g) || []).length; if (nS < 3 || nS > 6) B.push(`lead: ${nS} sentences (3-6)`);
  if (!/^You\b/.test(lead)) B.push('lead: must open on You');
  if (/\bIt (makes|is why|gives) you\b/.test(lead)) B.push('lead: an It opener');
  const sents = lead.split(/(?<=[.!?])\s+/); if (!sents.some((x) => { const n = wc(x); return n >= 2 && n <= 4 && /^[A-Z][a-z]+\b/.test(x) && !/^(You|It|The|A|An)\b/.test(x); })) B.push('lead: no short imperative of two to four words');
  if (VIRTUE_HEAD.test(lead.replace(/^You\s+(are|get|have)\s+/, '').trim())) B.push('lead: virtue head');
  if (CAPACITY.test(lead)) B.push('lead: capacity opener');
  if (/\bwill never\b/i.test(JSON.stringify(v))) B.push('a "will never" guarantee');
  if (/\bbecome an? \w+/i.test(JSON.stringify(v))) B.push('a field of work as an instruction ("become a")');
  if (/\d/.test(JSON.stringify(v))) B.push('a digit');
  const items = Array.isArray(v.domains) ? v.domains.map((d) => ({ domain: d })) : Array.isArray(v.items) ? v.items : [];
  if (items.length !== 3) B.push(`domains: ${items.length} (3)`);
  const want = f.ruling_domains || [];
  items.forEach((it, i) => { if (it.domain !== want[i]) B.push(`domains[${i}]: "${it.domain}" (ruling order: ${want.join(', ')})`); });
  const leadKey = lead.toLowerCase().trim(); if (seen.has(leadKey) && seen.get(leadKey) !== path.basename(file)) B.push(`lead repeats ${seen.get(leadKey)}`); seen.set(leadKey, path.basename(file));
  const keys = (f.bars || []).map((b) => b.key); if (!keys.includes(v.metric)) B.push(`metric: "${v.metric}" not in ${keys.join('/')}`);
  const z = zoneCheck(lead); if (z.outside.length) B.push(`outside the reader zone: ${z.outside.join(', ')}`);
  const factG = new Set(); for (const s of flatStrings({ chips: f.catalyst_chips, ledger: f.catalyst_ledger, def: f.pair_definition_catalyst, adv: f.pair_advise_catalyst })) for (const g of grams4(s)) factG.add(g);
  for (const g of grams4(lead)) if (factG.has(g)) B.push(`four-word run shared with a fact: "${g}"`);
  return { file: path.basename(file), blocking: B, zoneEdge: z.edge, pass: B.length === 0 };
}
const target = argv.find((a) => !a.startsWith('--')); const files = fs.statSync(target).isDirectory() ? fs.readdirSync(target).filter((x) => x.endsWith('.json') && !x.endsWith('.gate.json')).sort().map((x) => path.join(target, x)) : [target];
const seen = new Map(); const results = files.map((f) => validateEdge(f, seen));
if (asJson) console.log(JSON.stringify(results, null, 1)); else for (const r of results) { console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.file}`); if (!quiet) for (const b of r.blocking) console.log('   ✗ ' + b); if (!quiet && r.zoneEdge?.length) console.log('   zone edge (not blocking): ' + r.zoneEdge.join(', ')); }
process.exit(results.every((r) => r.pass) ? 0 : 1);
