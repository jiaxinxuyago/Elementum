// THE EDGE GATE (ELEMENT_GOD.edge v4, the door): checks a filled edge skeleton.
//   node validate-edge.mjs <file.json|dir> [--json] [--quiet]
// Blocking (v9): the lead two sentences of 30-45 words, the first on the fixed frame naming the three ruling domains in order, the second opening on It is with three clauses, no hedge, no assumed relative · the three domains equal to facts.ruling_domains in order · the metric one of the bars · the reader zone on the lead · a four-word run shared with any fact · "will never" · a virtue head or a capacity opener · "become a/an" · a lead repeated across the dir.
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
  if (v.claim != null && v.claim !== f.claim_fixed) B.push(`claim: expected "${f.claim_fixed}", got "${v.claim}"`);   // v8: the claim is derived in the app; checked only where an older set carries one
  const lead = String(v.lead || ''); const lw = wc(lead);
  if (lw < 30 || lw > 45) B.push(`lead: ${lw} words (30-45)`);
  const sents = lead.split(/(?<=[.!?])\s+/).filter(Boolean); if (sents.length !== 2) B.push(`lead: ${sents.length} sentences (2)`);
  const want0 = f.ruling_domains || []; const EN = { Wood: 'Wood', Fire: 'Fire', Earth: 'Earth', Metal: 'Metal', Water: 'Water' };
  const fw = (d) => (d === 'Social' ? 'social life' : String(d || '').toLowerCase());   // the frame's noun for Social (owner's read 2026-10-16: "your social" is not a noun)
  const frame = new RegExp(`^(Wood|Fire|Earth|Metal|Water) runs through your ${fw(want0[0])}, your ${fw(want0[1])} and your ${fw(want0[2])}\\.$`);
  if (!frame.test(sents[0] || '')) B.push(`lead: the first sentence is not the frame "<Energy> runs through your ${want0.map(fw).join(', your ')}."`);
  if (!/^It is\b/.test(sents[1] || '')) B.push('lead: the second sentence must open on It is');
  if (((sents[1] || '').match(/, and /g) || []).length !== 1 || ((sents[1] || '').match(/,/g) || []).length < 2) B.push('lead: the second sentence wants three clauses, commas and a final ", and"');
  if (/\b(may|might|perhaps|probably)\b/i.test(lead)) B.push('lead: a hedge');
  if (/\b(your (sister|brother|mother|father|niece|nephew|daughter|son|grandmother|grandfather|wife|husband|kids|children))\b/i.test(lead)) B.push('lead: a relative the reader may not have');
  if (/^[^.]*\b(you can|you are able|you tend to)\b/i.test(sents[1] || '')) B.push('lead: capacity opener');
  if (VIRTUE_HEAD.test((sents[1] || '').replace(/^It is\s+/, '').trim())) B.push('lead: virtue head');
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
