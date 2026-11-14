// Life Chapters polish round (owner 2026-11-14: audit M1-M9 A, MINOR A; the Almanac's AM1-AM4 for the shared year
// and landing lines). Copied from the batch gate and extended.
//   node gate.mjs base.json out-PN.json [...]      later files override the base by key; the polish rules apply to the
//                                                  units in the later files ("own"); --all applies them to every unit
// A unit is { key, kind, text }. The energy is the subject: no character names, no Chinese characters, {el} {g} {e}
// stand for element names. Domain and manual lines say what a period favours (no-advice lifted as on Your Almanac,
// D1 B) but are never imperatives. The rest of the prediction law holds (no digits, no hedge, no illness/death/divorce/
// sums, gender-neutral, the reader the subject of the last sentence). Openings are fixed per kind. Units of one energy
// (function) share no five-word run, except the fixed frames; chapter and domain lines share none with THE DOMAINS.
import fs from 'node:fs'; import path from 'node:path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../../../..') + '/';
const ALL = process.argv.includes('--all'); const files = process.argv.slice(2).filter((x) => x !== '--all');
const byKey = new Map(); const own = new Set();
files.forEach((f, i) => { for (const u of JSON.parse(fs.readFileSync(f, 'utf8')).units || []) { byKey.set(u.key, u); if (i > 0 || ALL) own.add(u.key); } });
const units = [...byKey.values()];
const fill = (t) => t.replace(/\{el\}|\{e\}/g, 'Metal').replace(/\{g\}/g, 'Earth');
const words = (t) => (t.match(/[A-Za-z']+/g) || []).length;
const sents = (t) => (t.match(/[^.!?]+[.!?]+/g) || []).map((s) => s.trim());
const BUDGET = { chapter_energy: [30, 60, 2, 3], ground: [12, 26, 1, 1], chapter_domain: [14, 34, 1, 1], manual: [14, 36, 1, 2],
  decade_energy: [14, 38, 1, 2], decade_now: [30, 60, 2, 3], year_energy: [20, 42, 2, 2], land: [12, 30, 1, 1] };
const OPEN = {
  chapter_energy: /^Your (Early|Rising|Home|Late) Chapter (carries|carried) \{el\}, /,
  ground: /^Under it (ran|runs) (more )?\{g\}/,
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
// ── the polish rules (owner 2026-11-14) ──
const RANK = /\b(need most|you need most|shortest of|the energy you need)\b/i;                       // AM2
const AMOUNT = /\b(runs? over|ran over|overflow\w*|too much|already full|crowded with|brimming|more than (it|your chart) can (carry|hold)|heavy with)\b/i; // AM3 (not Body)
const OUTCOME = /\b(end the year|by the end|come through it|finish the year|come out of it|end it)\b/i;  // AM1 (year, landing)
const CARRY = /\b(carr(y|ies|ied)|sees? you through|saw you through|steadie[sd]|steady you|eases?|eased|keeps? you level|kept you level|holds? you up|held you up|bears? you up|anchor\w*)\b/i;
const CARRIER_BAN = /\b(mentors?|teachers?|tutors?|courses?|study|studies|deadlines?|rules?|titles?|crafts?|stage|audience|perform\w*|ventures?|income|teams?|peers|rivals?|contests?|routines?)\b/i; // M4: neutral acts only
const PEOPLE_BAN = /\b(brothers?|sisters?|siblings?|grandparents?|parents?)\b/i;                     // M5
const LATE_BAN = /\b(boss|bosses|managers?|deadlines?|exams?|careers?|promotions?|first job|wages?|salary|school|learn the trade|classmates)\b/i;
const EARLY_BAN = /\b(jobs?|boss|bosses|career|partners?|salary|wages?|office|colleagues?)\b/i;
const LOVE_PAIR = /partner (who|with)[^.]* over (one|a partner|someone)\b/i;                         // M7
const sentencesOf = (t) => (t.match(/[^.!?]+[.!?]+/g) || []);
function polish(u, F) {
  const t = u.text; const k = u.key; const fnm = (k.match(/^ENERGY (\w+)/) || [])[1];
  const rel = /\.(release|heavy|core_over)\b/.test(k);
  if (RANK.test(t)) F('ranks an energy (AM2): say "an energy your chart runs short of"');
  if (rel && fnm !== 'body' && AMOUNT.test(t)) F(`claims an amount (AM3, accuracy: release is direction, not quantity): "${t.match(AMOUNT)[0]}"`);
  if (/^(year_energy|land)$/.test(u.kind)) { if (OUTCOME.test(t)) F(`says how it ends (AM1): "${t.match(OUTCOME)[0]}"`); if (/, and you\b/.test(t)) F('", and you" in a shared year or landing line (AM4)'); if (/\byou (feel|felt)\b/i.test(t)) F('"you feel" in a shared year or landing line (AM4)'); }
  if (u.kind === 'ground' && /\byou (feel|felt)\b/i.test(t)) F('"you feel" in a ground line (M3 rewrite)');
  if (rel) for (const s of sentencesOf(t)) if (CARRY.test(s) && CARRIER_BAN.test(s)) F(`the carrier is an energy's own image (M4): "${s.match(CARRIER_BAN)[0]}" — use a neutral act`);
  if (PEOPLE_BAN.test(t)) F(`names kin the chart cannot know (M5): "${t.match(PEOPLE_BAN)[0]}"`);
  if (/\.late\b/.test(k) && LATE_BAN.test(t)) F(`a late line with working-age life (M5): "${t.match(LATE_BAN)[0]}"`);
  if (/\.early\./.test(k) && EARLY_BAN.test(t)) F(`a child line with adult life (M9): "${t.match(EARLY_BAN)[0]}"`);
  if (u.kind === 'chapter_domain' && /\b(first job|learn the trade|school|exams?|graduat\w*)\b/i.test(t)) F('a domain line that does not fit every age from 16 to 75 (M5)');
  if (/chapter_domain\.Love\./.test(k) && LOVE_PAIR.test(t)) F('compares two kinds of partner (M7): favour a way of being with a partner');
  if (/land\.year\.\w+\.day/.test(k) && /\byour partner\b/i.test(t)) F('"your partner" assumes a partner (M5): say "a partner" or the home');
}
// M2 / AM4: the ", and you" budget over the units being written, per kind (shared year and landing lines: none)
function budget() {
  const by = {}; for (const u of units) if (own.has(u.key) && u.kind !== 'favours') (by[u.kind] ||= []).push(u);
  for (const [kd, list] of Object.entries(by)) { const n = list.filter((u) => /, and you\b/.test(u.text)).length; const cap = /^(year_energy|land)$/.test(kd) ? 0 : Math.floor(list.length * 0.25);
    if (n > cap) fails.push(`budget [${kd}]: ${n} of ${list.length} units use ", and you" (cap ${cap}, M2): close more of them on a sentence that opens with "You" or another shape`); }
}
for (const u of units) {
  const F = (m) => fails.push(`${u.key} [${u.kind}]: ${m}`);
  if (own.has(u.key) && typeof u.text === 'string' && u.kind !== 'favours') polish(u, F);
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
const FRAME = /\b(teens|twenties|thirties|forties)\b|(carries|carried) metal|metal the energy of|metal your own energy|metal more of your own|more of your own energy|own energy \w+ (your|a) chart|your own energy (into|and|in|which|after|though|on|to|with|at|when|just|the)\b|the metal and you felt|the energy of (action|order|mind|body|expression)|energy of \w+ and your|and your chart|under it (runs|ran) earth|this decade brings metal|(brings|brought) more metal|these years brought metal|this chapter favours|than your chart can use|more than your chart can|works against your chart|your chart runs short of|your chart does better without|under it (runs|ran) more earth|your thinking this chapter|thinking this chapter favours|metal brings \w+ for a|brings \w+ for a whole|for a whole year the|(body|mind|expression|action|order) for a whole year|for a second year running|a second year running the|a second year running and|second year running and \w+|second year running the \w+|(body|mind|expression|action|order) for a second year|brings \w+ for a second|metal brings \w+ for a|this year and you|this chapter \w+ you/;
// runs stay inside one sentence, so a sentence end beside an age frame is not a repeat
const runs = (t) => { const r = new Set(); for (const s of fill(t).split(/[.!?]/)) { const ws = s.toLowerCase().match(/[a-z']+/g) || []; for (let i = 0; i + 5 <= ws.length; i++) { const x = ws.slice(i, i + 5).join(' '); if (!FRAME.test(x)) r.add(x); } } return r; };
const group = (u) => (u.key.match(/^ENERGY (\w+)/) || [])[1] || u.kind;
const byG = {}; for (const u of units) if (u.kind !== 'favours' && u.text) (byG[group(u)] ||= []).push(u);
for (const list of Object.values(byG)) for (let i = 0; i < list.length; i++) { const a = runs(list[i].text); for (let j = i + 1; j < list.length; j++) for (const x of runs(list[j].text)) if (a.has(x)) { fails.push(`${list[i].key} and ${list[j].key}: shared run "${x}"`); break; } }
let DOM = null; try { DOM = (await import(ROOT + 'Elementum_App/src/content/domains.js')).DOMAINS_CONTENT; } catch { /* optional */ }
if (DOM) {
  const STOP = new Set('a an the and or but of to in on at for with by from as you your yours it its this that these those is are was were be been do does did have has had not no more most than then so very just one into over under up out about who what which when where while what all any each every own same other some such can could would should will'.split(' '));
  // "the people after you" is the Hour Gate's ruled term (DOM-1 Q10), shared by design
  const contentful = (x) => !/people after you/.test(x) && x.split(' ').filter((w) => !STOP.has(w)).length >= 3;
  const domRuns = new Map(); const add = (t, where) => { for (const x of runs(t)) if (contentful(x) && !domRuns.has(x)) domRuns.set(x, where); };
  for (const [id, s] of Object.entries(DOM.seats)) for (const [d, du] of Object.entries(s.domains || {})) for (const [k, t] of Object.entries(du)) add(t, `${id}.${d}.${k}`);
  for (const u of units) if (/^(chapter_energy|chapter_domain|manual)$/.test(u.kind) && u.text) for (const x of runs(u.text)) if (domRuns.has(x)) { fails.push(`${u.key}: shares "${x}" with THE DOMAINS (${domRuns.get(x)})`); break; }
}
budget();
if (fails.length) { console.log(fails.join('\n')); console.log(`\n${fails.length} problem(s) across ${units.length} units.`); process.exit(1); }
console.log(`PASS: ${units.length} units clean.`);
