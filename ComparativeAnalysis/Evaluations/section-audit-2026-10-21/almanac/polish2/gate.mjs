// ===================================================================
// The gate for Your Almanac's units (EVT-1). Budgets by kind and the voice
// laws in force on this surface: the domain law (2026-10-17) without its
// no-advice rule (owner D1 B, 2026-10-20), plus the section-audit rules the
// owner ruled 2026-11-14 (AM1-AM4 A): no ", and you" joint, no "you feel",
// no rank (most, shortest) or amount (too much) claims, ground lines on the
// locked words feeds and shapes. Round two (AP1-AP5 A, 2026-11-14): the energy
// line never says ask and never trails a participle; no "already" in an energy line;
// a landing's second sentence never opens on a gerund; the echo never says ask.
// A unit fails on any breach.
//   node gate.mjs [file.json]      # default template.json
// ===================================================================
import fs from 'fs';
const file = process.argv[2] || new URL('./template.json', import.meta.url);
const { units } = JSON.parse(fs.readFileSync(file, 'utf8'));
const BUDGET = { 'head.energy': [2, 6], 'head.land': [2, 7], energy: [16, 32], ground: [8, 20], land: [16, 38], echo: [10, 25], pillar: [20, 40], mark: [12, 30], void: [12, 30], star: [12, 30], push: [4, 14] };
const BAN = [/\bmay\b/i, /\bmight\b/i, /\blikely\b/i, /\bperhaps\b/i, /\bcould\b/i, /ahead of/i, /, so\b/i, /:/, /;/, /—/, /\billness\b|\bdeath\b|\bdivorce\b|\bbankrupt/i, /\$|£|€|\d/, /\broom\b/i, /\bverdict\b/i];
const words = (t) => t.replace(/\{\w+\}/g, 'X').split(/\s+/).filter(Boolean).length;
let bad = 0;
for (const u of units) {
  const out = []; const t = u.text;
  if (u.kind.startsWith('favours')) {
    const [a, b] = t.split('|'); if (!a || !b) out.push('needs lean|over');
    for (const p of [a, b]) if (p && words(p) > 5) out.push(`phrase over 5 words: ${p}`);
  } else {
    const [lo, hi] = BUDGET[u.kind] || [1, 60]; const n = words(t); if (n < lo || n > hi) out.push(`${n} words, budget ${lo}–${hi}`);
    for (const s of t.split(/(?<=\.)\s+/)) if ((s.match(/,/g) || []).length > 2) out.push(`over two commas: ${s}`);
    const sentences = t.split(/(?<=\.)\s+/).filter(Boolean);
    if (!u.kind.startsWith('head') && u.kind !== 'push' && !/\byou\b|\byour\b/i.test(sentences[sentences.length - 1])) out.push('the reader is not in the last sentence');
  }
  for (const r of BAN) if (r.test(t.replace(/\{\w+\}/g, ''))) out.push(`banned: ${r}`);
  if (!u.kind.startsWith('favours')) {
    if (/, and you\b/i.test(t)) out.push('AM4: the ", and you" joint');
    if (/\byou feel\b/i.test(t)) out.push('AM4: "you feel"');
    if (/\b(most|shortest|least|lacks?)\b/i.test(t) && u.kind === 'energy') out.push('AM2: a rank claim');
    if (/too much|in excess|overuse|already (has|have|holds|runs|pours|gives)|full of|crowded with|plenty/i.test(t) && u.kind === 'energy') out.push('AM3: an amount claim');
  }
  if (u.kind === 'energy') {
    if (/\bask(s|ed|ing)?\b/i.test(t)) out.push('AP1: "ask" belongs to the landing only');
    const s2 = t.split(/(?<=\.)\s+/)[1] || '';
    if (/,\s+(\w+ing)\b[^.]*\.$/.test(s2) && !/,\s+(nothing|something|anything|everything|morning|evening|spring|thing|during)\b/i.test(s2)) out.push('AP1: the second sentence trails a participle: ' + s2);
    if (/\balready\b/i.test(t)) out.push('AP3: "already" claims what the chart holds');
  }
  if (u.kind === 'echo' && /\bask(s|ed|ing)?\b/i.test(t)) out.push('AP1: "ask" belongs to the landing only');
  if (u.kind === 'land') { const s2 = t.split(/(?<=\.)\s+/)[1] || ''; if (/^\w+ing\b/.test(s2) && !/^(Nothing|Something|Everything|Anything|Evening|Morning|Spring)\b/.test(s2)) out.push('AP2: the second sentence opens on a gerund: ' + s2); }
  if (u.kind === 'ground') { if (!u.key.endsWith('ground.matches') && !/\b(feeds|shapes)\b/.test(t)) out.push('AM4: ground line without feeds or shapes'); if (/holds down|pushes back|draws/i.test(t)) out.push('AM4: ground line off the locked words'); }
  if (out.length) { bad++; console.log(`✗ ${u.key}\n   ${out.join('\n   ')}`); }
}
console.log(bad ? `${bad} of ${units.length} units fail` : `✓ ${units.length} units pass the gate`);
process.exit(bad ? 1 : 0);
