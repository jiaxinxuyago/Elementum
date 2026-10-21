// Life Chapters, energy first (owner 2026-10-21): the gate for the round-2 unit kinds. node gate-energy.mjs <file.json>
// The energy is the subject: no character (persona) names at all, no Chinese characters, {el} {g} {e} placeholders
// stand for the element names. Domain and manual lines are statements of what a period favours (the no-advice rule
// is lifted as on Your Almanac, D1 B), never imperatives. The rest of the prediction law holds.
import fs from 'node:fs';
const C = JSON.parse(fs.readFileSync(process.argv[2] || 'samples-energy.json', 'utf8'));
const fill = (t) => t.replace(/\{el\}|\{e\}/g, 'Metal').replace(/\{g\}/g, 'Earth');
const words = (t) => (t.match(/[A-Za-z']+/g) || []).length;
const sents = (t) => (t.match(/[^.!?]+[.!?]+/g) || []).map((s) => s.trim());
const BUDGET = { chapter_energy: [30, 60, 2, 3], ground: [12, 26, 1, 1], chapter_domain: [14, 34, 1, 1], manual: [14, 36, 1, 2],
  decade_energy: [14, 38, 1, 2], decade_now: [30, 60, 2, 3], year_energy: [20, 42, 2, 2], land: [12, 30, 1, 1] };
const PAIR = /^[A-Z][^|]{1,40}\|[a-z][^|]{1,40}$/;
const BAN = [/[—–;:]/, /\b(room|verdict|destiny|destined|fate|fated|karma|cosmic|universe|palace|pillars?|ten gods?|bazi|day master|luck|journey|navigate|landscape|realm|unlock|elevate|foster|leverage|vibrant|profound|pivotal|crucial)\b/i,
  /\bahead of\b/i, /,\s+so\b/i, /[一-鿿]/, /\d/, /[$£€%]/,
  /\b(illness|disease|cancer|diagnos\w*|surgery|death|die|dies|died|dying|divorce\w*|bankrupt\w*|accident\w*|curse\w*|doom\w*|misfortune|disaster)\b/i,
  /\b(may|might|perhaps|probably|likely)\b/i, /\b(he|she|his|her|hers|him|husband|wife|boyfriend|girlfriend)\b/i,
  /\b(Twin|Rival|Artisan|Virtuoso|Horizon|Steward|General|Magistrate|Alchemist|Sage)s?\b/,
  /\b(old age|elderly|retire(d|ment)?|pain|painful|injur\w*)\b/i];
const IMP = /^(Let|Keep|Ask|Take|Give|Make|Pick|Choose|Try|Say|Spend|Set|Put|Allow|Leave|Stop|Start|Go|Do|Don't|Find|Tell|Trust|Show|Stay|Wait|Hold|Use|Seek|Avoid|Embrace|Protect|Guard|Build|Accept|Expect|Remember|Notice|Look|Watch|Rest|Step|Speak|Listen|Learn)\b/;
const fails = []; const units = C.units || [];
for (const u of units) {
  const F = (m) => fails.push(`${u.key} [${u.kind}]: ${m}`);
  if (u.kind === 'favours') { if (!PAIR.test(u.text)) F('a favours pair reads "Lean|over", each side 2 to 40 characters'); if (/\d|[一-鿿]/.test(u.text)) F('digit or character'); continue; }
  const b = BUDGET[u.kind]; if (!b) { F('unknown kind'); continue; }
  const t = fill(u.text); const w = words(t), s = sents(t);
  if (w < b[0] || w > b[1]) F(`${w} words (${b[0]}-${b[1]})`);
  if (s.length < b[2] || s.length > b[3]) F(`${s.length} sentences (${b[2]}-${b[3]})`);
  if (s.join(' ').length + 1 < t.trim().length - 1) F('text outside a sentence');
  for (const re of BAN) { const m = u.text.match(re); if (m) F(`banned "${m[0]}"`); }
  s.forEach((x, i) => { const c = (x.match(/,/g) || []).length; if (c > 2) F(`sentence ${i + 1} has ${c} commas`); if (IMP.test(x)) F(`sentence ${i + 1} is an imperative`); });
  const last = s[s.length - 1] || '';
  const readerLast = /^(\S+ ){0,3}you\b/i.test(last) || /^[^,]{0,60},\s+you\b/.test(last) || /^(Your|What you)\b/.test(last) || /,\s+(and|but)\s+(\S+ ){0,3}you\b/i.test(last);
  if (!readerLast) F('the reader is not the subject of the last sentence');
  if (/\.(lived|early)\b/.test(u.key) && /\bwill\b/i.test(u.text)) F('"will" in a lived unit');
  if (/\.coming\b/.test(u.key) && /\bsince your\b/i.test(u.text)) F('"since" in a coming unit');
  if (u.kind === 'chapter_energy' && !/^Your (Early|Rising|Home|Late) Chapter (carries|carried) \{el\}/.test(u.text)) F('a chapter opens "Your X Chapter carries {el}"');
  if (/^(chapter_energy|decade_energy|decade_now|year_energy)$/.test(u.kind) && !/\{el\}/.test(u.text)) F('the energy is named ({el})');
  if (u.kind === 'chapter_domain' && !/\bfavours\b/.test(u.text)) F('a domain line says what the chapter favours');
}
// the shared frames every unit opens on are not repeats: the chapter and decade openings and the ground line
const FRAME = /\b(teens|twenties|thirties|forties)\b|carries metal|carried metal|metal the energy of|the energy of (action|order|mind|body|expression)|under it (runs|ran) earth|this decade brings metal|these years brought metal|energy of \w+ and your|and your chart|the metal and you feel|metal and you feel|this chapter favours/;
const stem = (k) => k.replace(/\.(lived|now|coming)$/, '').replace(/^TEMPLATED tpl_(almanac|chapters)/, 'T');
const runs = (t) => { const ws = fill(t).toLowerCase().match(/[a-z']+/g) || []; const r = new Set(); for (let i = 0; i + 5 <= ws.length; i++) { const x = ws.slice(i, i + 5).join(' '); if (!FRAME.test(x)) r.add(x); } return r; };
const byPage = {}; for (const u of units) if (u.kind !== 'favours') (byPage[u.page] ||= []).push(u);
for (const list of Object.values(byPage)) for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
  if (stem(list[i].key) === stem(list[j].key)) continue; const a = runs(list[i].text); for (const x of runs(list[j].text)) if (a.has(x)) { fails.push(`${list[i].key} and ${list[j].key}: shared run "${x}"`); break; }
}
if (fails.length) { console.log(fails.join('\n')); console.log(`\n${fails.length} problem(s) across ${units.length} units.`); process.exit(1); }
console.log(`PASS: ${units.length} units clean.`);
