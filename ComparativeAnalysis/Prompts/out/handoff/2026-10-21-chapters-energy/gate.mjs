// Life Chapters, energy first: the batch gate (owner round 2, L1-L10 A, 2026-10-21).
//   node gate.mjs <file.json> [more.json ...]     every file's units are checked together
// A unit is { key, kind, text }. The energy is the subject: no character names, no Chinese characters, {el} {g} {e}
// stand for element names. Domain and manual lines say what a period favours (no-advice lifted as on Your Almanac,
// D1 B) but are never imperatives. The rest of the prediction law holds (no digits, no hedge, no illness/death/divorce/
// sums, gender-neutral, the reader the subject of the last sentence). Openings are fixed per kind. Units of one energy
// (function) share no five-word run, except the fixed frames; chapter and domain lines share none with THE DOMAINS.
import fs from 'node:fs'; import path from 'node:path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../../../..') + '/';
const units = process.argv.slice(2).flatMap((f) => JSON.parse(fs.readFileSync(f, 'utf8')).units || []);
const fill = (t) => t.replace(/\{el\}|\{e\}/g, 'Metal').replace(/\{g\}/g, 'Earth');
const words = (t) => (t.match(/[A-Za-z']+/g) || []).length;
const sents = (t) => (t.match(/[^.!?]+[.!?]+/g) || []).map((s) => s.trim());
const BUDGET = { chapter_energy: [30, 60, 2, 3], ground: [12, 26, 1, 1], chapter_domain: [14, 34, 1, 1], manual: [14, 36, 1, 2],
  decade_energy: [14, 38, 1, 2], decade_now: [30, 60, 2, 3], year_energy: [20, 42, 2, 2], land: [12, 30, 1, 1] };
const OPEN = {
  chapter_energy: /^Your (Early|Rising|Home|Late) Chapter (carries|carried) \{el\}, /,
  ground: /^Under it ran (more )?\{g\}/,
  chapter_domain: /^(In Career|In Wealth|In Love|At home|With friends|In Health|In your thinking|In Growth), this chapter favours /,
  manual: /^This chapter /,
  decade_now: /^This decade brings \{el\}/,
  year_energy: /^\{el\} brings /,
  land: /^(You|Your|Someone|Something|A|An|Home|Work)\b/,
};
const DOM_OPEN = { Career: 'In Career', Wealth: 'In Wealth', Love: 'In Love', Family: 'At home', Social: 'With friends', Health: 'In Health', Mind: 'In your thinking', Growth: 'In Growth' };
const CH_NAME = { year: 'Early', month: 'Rising', day: 'Home', hour: 'Late' };
const PAIR = /^[A-Z][^|]{1,40}\|[a-z][^|]{1,40}$/;
const BAN = [/[—–;:]/, /\b(room|verdict|destiny|destined|fate|fated|karma|cosmic|universe|palace|pillars?|ten gods?|bazi|day master|luck|journey|navigate|landscape|realm|unlock|elevate|foster|leverage|vibrant|profound|pivotal|crucial|delve|tapestry|testament|intricate|robust|seamless|resonat\w*|nestled|showcase|underscore)\b/i,
  /\b(trauma|trigger|boundaries|attachment style|nervous system)\b/i, /\bahead of\b/i, /,\s+so\b/i, /[一-鿿]/, /\d/, /[$£€%]/,
  /\b(illness|disease|cancer|diagnos\w*|surgery|death|die|dies|died|dying|divorce\w*|miscarr\w*|bankrupt\w*|accident\w*|curse\w*|doom\w*|misfortune|disaster)\b/i,
  /\b(may|might|perhaps|probably|likely)\b/i, /\b(tends to|sometimes you|often you)\b/i, /\b(he|she|his|her|hers|him|husband|wife|boyfriend|girlfriend)\b/i,
  /\b(Twin|Rival|Artisan|Virtuoso|Horizon|Steward|General|Magistrate|Alchemist|Sage|Nobleman)s?\b/,
  /\b(old age|to the end|elderly|retire(d|ment)?|sore|stiff|aching|aches|ache|pain|painful|injur\w*)\b/i,
  /\b(Wood|Fire|Earth|Metal|Water)\b/];
const IMP = /^(Let|Keep|Ask|Take|Give|Make|Pick|Choose|Try|Say|Spend|Set|Put|Hand|Allow|Leave|Stop|Start|Go|Do|Don't|Find|Tell|Trust|Show|Read|Write|Call|Sit|Sleep|Eat|Share|Save|Send|Stay|Wait|Hold|Use|Offer|Finish|Listen|Learn|Rest|Step|Speak|Remember|Notice|Look|Watch|Protect|Guard|Build|Fix|Name|Join|Chase|Enter|Accept|Close|Expect|Seek|Avoid|Embrace|Welcome|Beware|Lean|Lead|Focus|Slow)\b/;
const fails = []; const seen = new Set();
for (const u of units) {
  const F = (m) => fails.push(`${u.key} [${u.kind}]: ${m}`);
  if (seen.has(u.key)) F('duplicate key'); seen.add(u.key);
  if (typeof u.text !== 'string' || !u.text.trim()) { F('missing'); continue; }
  if (u.kind === 'favours') { if (!PAIR.test(u.text)) F('a favours pair reads "Lean|over" (first capitalised, second lower case, 2-40 characters each)'); for (const re of BAN) { const m = u.text.match(re); if (m) F(`banned "${m[0]}"`); } continue; }
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
  if (words(last) < 5) F('last sentence under five words');
  const tense = (u.key.match(/\.(lived|early|now|coming)(\.[ab])?$/) || [])[1];
  if ((tense === 'lived' || tense === 'early') && /\b(will|is|are|has|have|carries|brings)\b/.test(u.text.split('.')[0]) && u.kind !== 'ground') F('a lived unit opens in the past tense');
  if ((tense === 'lived' || tense === 'early') && /\bwill\b/i.test(u.text)) F('"will" in a lived unit');
  if (tense === 'coming' && /\bsince your\b/i.test(u.text)) F('"since your" in a coming unit');
  if (tense === 'now' && u.kind === 'chapter_energy' && !/\bSince your\b/.test(u.text)) F('a chapter now says since when ("Since your late teens", "Since your mid-thirties", "Since your late forties")');
  if (tense === 'coming' && u.kind === 'chapter_energy' && !/\bFrom your\b/.test(u.text)) F('a coming chapter says from when ("From your mid-thirties", "From your late forties")');
  if (OPEN[u.kind] && !OPEN[u.kind].test(u.text)) F(`opening: ${OPEN[u.kind]}`);
  if (u.kind === 'chapter_energy') { const g = u.key.match(/chapter\.(\w+)\./)[1]; if (!u.text.startsWith(`Your ${CH_NAME[g]} Chapter`)) F(`opens "Your ${CH_NAME[g]} Chapter"`); if (/\.lived$/.test(u.key) !== /^Your \w+ Chapter carried/.test(u.text)) F('carried for lived, carries otherwise'); }
  if (u.kind === 'chapter_domain') { const D = u.key.match(/chapter_domain\.(\w+)\./)[1]; if (!u.text.startsWith(DOM_OPEN[D] + ',')) F(`opens "${DOM_OPEN[D]},"`); }
  if (u.kind === 'decade_energy') { const lived = /\.(lived|early)\./.test(u.key); if (!(lived ? /^These years brought (more )?\{el\}/ : /^This decade brings (more )?\{el\}/).test(u.text)) F(lived ? 'opens "These years brought {el}"' : 'opens "This decade brings {el}"'); }
  if (u.kind === 'land' && !/\bthis year\b/.test(u.text)) F('a landing says "this year"');
  if (/^(chapter_energy|decade_energy|decade_now|year_energy)$/.test(u.kind) && !/\{el\}/.test(u.text)) F('the energy is named ({el})');
  if (/\{(?!el\}|g\}|e\})/.test(u.text)) F('unknown placeholder');
}
// five-word runs: units of one energy, the frames excepted; a and b variants of one decade line must differ too
const FRAME = /\b(teens|twenties|thirties|forties)\b|(carries|carried) metal|metal the energy of|metal your own energy|metal more of your own|more of your own energy|your own energy (into|and|in|which|after|though|on|to|with|at|when|just|the)\b|the metal and you felt|the energy of (action|order|mind|body|expression)|energy of \w+ and your|and your chart|under it (runs|ran) earth|this decade brings metal|(brings|brought) more metal|these years brought metal|this chapter favours|your thinking this chapter|thinking this chapter favours|metal brings \w+ for a|brings \w+ for a whole|for a whole year the|(body|mind|expression|action|order) for a whole year|for a second year running|a second year running the|a second year running and|second year running and \w+|second year running the \w+|(body|mind|expression|action|order) for a second year|brings \w+ for a second|metal brings \w+ for a|this year and you|this chapter \w+ you/;
// runs stay inside one sentence, so a sentence end beside an age frame is not a repeat
const runs = (t) => { const r = new Set(); for (const s of fill(t).split(/[.!?]/)) { const ws = s.toLowerCase().match(/[a-z']+/g) || []; for (let i = 0; i + 5 <= ws.length; i++) { const x = ws.slice(i, i + 5).join(' '); if (!FRAME.test(x)) r.add(x); } } return r; };
const group = (u) => (u.key.match(/^ENERGY (\w+)/) || [])[1] || u.kind;
const byG = {}; for (const u of units) if (u.kind !== 'favours' && u.text) (byG[group(u)] ||= []).push(u);
for (const list of Object.values(byG)) for (let i = 0; i < list.length; i++) { const a = runs(list[i].text); for (let j = i + 1; j < list.length; j++) for (const x of runs(list[j].text)) if (a.has(x)) { fails.push(`${list[i].key} and ${list[j].key}: shared run "${x}"`); break; } }
let DOM = null; try { DOM = (await import(ROOT + 'Elementum_App/src/content/domains.js')).DOMAINS_CONTENT; } catch { /* optional */ }
if (DOM) {
  const STOP = new Set('a an the and or but of to in on at for with by from as you your yours it its this that these those is are was were be been do does did have has had not no more most than then so very just one into over under up out about who what which when where while what all any each every own same other some such can could would should will'.split(' '));
  const contentful = (x) => x.split(' ').filter((w) => !STOP.has(w)).length >= 3;
  const domRuns = new Map(); const add = (t, where) => { for (const x of runs(t)) if (contentful(x) && !domRuns.has(x)) domRuns.set(x, where); };
  for (const [id, s] of Object.entries(DOM.seats)) for (const [d, du] of Object.entries(s.domains || {})) for (const [k, t] of Object.entries(du)) add(t, `${id}.${d}.${k}`);
  for (const u of units) if (/^(chapter_energy|chapter_domain|manual)$/.test(u.kind) && u.text) for (const x of runs(u.text)) if (domRuns.has(x)) { fails.push(`${u.key}: shares "${x}" with THE DOMAINS (${domRuns.get(x)})`); break; }
}
if (fails.length) { console.log(fails.join('\n')); console.log(`\n${fails.length} problem(s) across ${units.length} units.`); process.exit(1); }
console.log(`PASS: ${units.length} units clean.`);
