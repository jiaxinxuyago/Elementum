// THE DOMAINS + BLUEPRINT gate, the rulings round (owner R1–R17, G1, MN all A, 2026-11-14). node gate.mjs <file.json> [more.json …]
// A content file is { units: [{ key, kind, page, family, text }] }. It keeps every check of the depth gate
// (2026-10-21-domains-blueprint/gate.mjs): budgets, punctuation and bans, the prediction law, the reader as the subject
// of the last sentence, tense by key, chart invariance, and no five-word run shared by two units of one page.
// It adds the rulings:
//   R10  a seat's units in one domain (headline, How you are, lived, past, ahead) are one page: no shared five-word run
//   R11  a gap line claims no loss
//   R12  a Love ahead beat states no shared home as fact
//   R13  a past version (.lived_past) is in the simple past: no "since", "so far", "have been"
//   R14  no "at least once" or "more than once"
//   R15  a unit keyed by a character never uses another character's reserved words (verbs.json); a Day or Hour seat
//        beat uses at least one of its own character's words
//   R16  at most one in eight units of one family closes on ", and you" (so a page rarely shows two); decade lines never restate "these years";
//        no opening shared by more than two units of a frame family (missing, need, seen)
import fs from 'node:fs'; import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname) + '/';
const files = process.argv.slice(2).filter((a) => a.endsWith('.json')); const C = { units: [], _approved: [] };
for (const f of files) { const j = JSON.parse(fs.readFileSync(path.resolve(f), 'utf8')); C.units.push(...(j.units || [])); C._approved.push(...(j._approved || [])); }
const VERBS = JSON.parse(fs.readFileSync(HERE + 'verbs.json', 'utf8'));
const words = (t) => (t.match(/[A-Za-z']+/g) || []).length;
const sents = (t) => (t.match(/[^.!?]+[.!?]+/g) || []).map((s) => s.trim());
// [words lo, hi, sentences lo, hi]
const BUDGET = {
  // the domain units (the 2026-10-17 domains gate)
  headline: [3, 12, 1, 1], recognition: [30, 65, 2, 3], lived: [22, 50, 2, 2], lived_past: [22, 50, 2, 2], ahead: [20, 55, 2, 2],
  decade: [18, 45, 1, 2], gap: [14, 32, 1, 1], pattern: [14, 32, 1, 1], fused: [10, 24, 1, 1], unruled: [20, 45, 1, 2], waiting: [20, 45, 1, 2],
  // the Blueprint and By-year units (the depth gate)
  structure: [22, 50, 2, 3], structure_rule: [18, 45, 2, 2], status: [12, 36, 1, 2], rescue: [12, 30, 1, 1],
  strongest: [12, 32, 1, 1], missing: [22, 45, 2, 2], season: [30, 60, 2, 3], season_need: [14, 32, 1, 1], seen: [9, 22, 1, 1], seen_close: [6, 16, 1, 1],
  bond: [12, 30, 1, 1], bond_none: [12, 30, 1, 1], pattern_bp: [14, 32, 1, 1], year_domain: [14, 30, 1, 1],
};
const HEADLIKE = new Set(['headline']);
const BAN = [/[—–;]/, /\b(room|verdict|legitimate|institutional|destiny|destined|fate|fated|karma|cosmic|universe|palace|pillars?|ten gods?|bazi|day master|luck|lucky|luckily)\b/i,
  /\b(delve|tapestry|testament|pivotal|crucial|intricate|robust|seamless|foster|underscore|showcase|leverage|vibrant|nestled|profound|realm|unlock|elevate|resonat\w*|navigate|landscape|journey)\b/i,
  /\b(trauma|trigger|boundaries|attachment style|regulate|nervous system)\b/i, /\bahead of\b/i, /,\s+so\b/i, /[一-鿿]/, /\d/, /[$£€%]/,
  /\b(illness|disease|cancer|diagnos\w*|surgery|death|die|dies|died|dying|divorce\w*|miscarr\w*|bankrupt\w*|accident\w*|curse\w*|doom\w*|misfortune|disaster)\b/i,
  /\b(may|might|perhaps|probably|likely|should|often|sometimes|usually)\b/i, /\b(you may feel|tends? to)\b/i,
  /\b(he|she|his|her|hers|him|husband|wife|boyfriend|girlfriend|brother|sister|mother|father|son|daughter)\b/i,
  /\b(old age|to the end|elderly|retire(d|ment)?|sore|stiff|aching|aches|ache|pain|painful|injur\w*|hurt|hurts)\b/i,
  /\b(at least once|more than once|at least one|more than one)\b/i]; // R14
const IMP = /^(Let|Keep|Ask|Take|Give|Make|Pick|Choose|Try|Say|Spend|Set|Put|Hand|Allow|Leave|Stop|Start|Go|Do|Don't|Find|Tell|Trust|Show|Read|Write|Call|Sit|Sleep|Eat|Share|Save|Send|Stay|Wait|Hold|Use|Offer|Finish|Listen|Learn|Rest|Step|Speak|Remember|Notice|Look|Watch|Protect|Guard|Build|Fix|Price|Marry|Audit|Name|Hire|Join|Chase|Enter|Accept|Close|Expect|Seek|Avoid|Embrace|Welcome|Beware)\b/;
const PERSONAS = { 比肩: 'Twin', 劫财: 'Rival', 食神: 'Artisan', 伤官: 'Virtuoso', 偏财: 'Horizon', 正财: 'Steward', 七杀: 'General', 正官: 'Magistrate', 偏印: 'Alchemist', 正印: 'Sage' };
const GOD_ID = { bijian: '比肩', jiecai: '劫财', shishen: '食神', shangguan: '伤官', piancai: '偏财', zhengcai: '正财', qisha: '七杀', zhengguan: '正官', pianyin: '偏印', zhengyin: '正印' };
const STRUCT_GOD = { zhengguan: '正官', qisha: '七杀', zhengcai: '正财', piancai: '偏财', zhengyin: '正印', pianyin: '偏印', shishen: '食神', shangguan: '伤官', jianlu: '比肩', yueren: '劫财', yuejie: '劫财' };
const ownerOf = (key) => { const m = key.match(/^(?:POSITION|GOD) ([a-z]+)/); if (m) return PERSONAS[GOD_ID[m[1]]]; const s = key.match(/^STRUCTURE ([a-z]+)_ge\b/); return s ? PERSONAS[STRUCT_GOD[s[1]]] : null; };
const has = (t, w) => new RegExp(`\\b${w.replace(/ /g, '\\s+')}`, 'i').test(t);
const ANDYOU = (t) => /,\s+and\s+(\S+\s+){0,2}(you|your)\b/i.test(sents(t).slice(-1)[0] || '');
const fails = []; const units = C.units;
function check(u) {
  const { key, kind, text: t } = u; const F = (m) => fails.push(`${key} [${kind}]: ${m}`);
  if (!BUDGET[kind]) return F('unknown kind');
  if (typeof t !== 'string' || !t.trim()) return F('missing');
  const tt = t.replace(/\{(\w+)\}/g, 'Wood');
  const [lo, hi, smin, smax] = BUDGET[kind]; const w = words(tt), s = sents(tt);
  if (w < lo || w > hi) F(`${w} words (${lo}-${hi})`);
  if (s.length < smin || s.length > smax) F(`${s.length} sentences (${smin}-${smax})`);
  if (s.join(' ').length + 1 < tt.trim().length - 1) F('text outside a sentence (missing final stop?)');
  for (const re of BAN) { const m = tt.match(re); if (m) F(`banned "${m[0]}"`); }
  if (/:/.test(tt)) F('colon');
  s.forEach((x, i) => { const c = (x.match(/,/g) || []).length; if (c > 2) F(`sentence ${i + 1} has ${c} commas`); if (IMP.test(x)) F(`sentence ${i + 1} reads as advice`); });
  const last = s[s.length - 1] || '';
  const readerLast = /^(\S+ ){0,3}you\b/i.test(last) || /^[^,]{0,45},\s+you\b/.test(last) || /^(Your|What you)\b/.test(last) || /,\s+(and|but)\s+(\S+ ){0,2}you\b/i.test(last);
  if (!HEADLIKE.has(kind) && !readerLast && !(C._approved || []).includes(key)) F('the reader is not the subject of the last sentence');
  if (!HEADLIKE.has(kind) && words(last) < 5) F('last sentence under five words');
  if (/\.(lived|lived_past)\b/.test(key) && /\bwill\b/i.test(tt)) F('"will" in a lived unit');
  if (/\.(ahead|coming)\b/.test(key) && /\bsince your\b/i.test(tt)) F('"since" in a coming unit');
  if (kind === 'lived_past' && /\b(since|so far|have been|has been|you have|you've|still)\b/i.test(tt)) F('a past version stays in the simple past (R13)');
  if (kind === 'gap' && /\b(less|fewer|lost|lose|missed|miss|neglect\w*|gave up|went without|cost|thinner|drifted)\b/i.test(tt)) F('a gap line claims no loss (R11)');
  if (/· domain_climb\.Love\.ahead$/.test(key) && /\b(a|your|the|one) (shared )?home\b|\bhome together\b|\bmove in\b|\blive together\b|\bset up house\b/i.test(tt)) F('a Love ahead beat states no shared home (R12)');
  if (kind === 'decade' && /\b(these|those) (ten )?years\b|\b(this|that) decade\b/i.test(tt)) F('a decade line never restates its period (R16)');
  // chart invariance: a unit keyed by a character names no other character
  const own = ownerOf(key);
  if (own || /^(TEMPLATED|SEASON)/.test(key)) for (const p of Object.values(PERSONAS)) if (p !== own && new RegExp(`\\b${p}s?\\b`).test(tt) && !/^TG_PATTERN/.test(key)) F(`names the ${p} (chart invariance)`);
  // R15: no other character's reserved words; a Day or Hour seat beat uses its own
  if (own) {
    for (const [p, v] of Object.entries(VERBS)) if (p !== own && !p.startsWith('_')) for (const r of v.reserved) if (has(tt, r)) F(`uses the ${p}'s reserved "${r}" (R15)`);
    if (/^POSITION \w+_(day|hour)_\w+ · domain_climb\.\w+\.(recognition|lived|lived_past|ahead)$/.test(key) && !VERBS[own].own.some((x) => has(tt, x))) F(`uses none of the ${own}'s own words (R15)`);
  }
}
units.forEach(check);
// no five-word run shared by two units of one page (R10: a seat's units in one domain are one page)
const runs = (t) => { const ws = (t || '').toLowerCase().match(/[a-z']+/g) || []; const r = new Set(); for (let i = 0; i + 5 <= ws.length; i++) { const x = ws.slice(i, i + 5).join(' '); if (!/\b(teens|twenties|thirties|forties|fifties|sixteen)\b/.test(x)) r.add(x); } return r; };
const byPage = {}; for (const u of units) (byPage[u.page] ||= []).push(u);
// a lived beat and its past version never print together, so they may tell the same pattern
const pastPair = (a, b) => [a, b].sort().join('|').replace(/\.lived_past\|.*\.lived$|\.lived\|.*\.lived_past$/, '') !== [a, b].sort().join('|') && a.replace(/\.lived(_past)?$/, '') === b.replace(/\.lived(_past)?$/, '');
for (const list of Object.values(byPage)) for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
  if (pastPair(list[i].key, list[j].key)) continue;
  const a = runs(list[i].text); for (const x of runs(list[j].text)) if (a.has(x)) { fails.push(`${list[i].key} and ${list[j].key}: shared run "${x}"`); break; }
}
// R16: the close budget per family, and distinct openings in the frame families
const byFam = {}; for (const u of units) if (u.family) (byFam[u.family] ||= []).push(u);
for (const [fam, list] of Object.entries(byFam)) {
  if (list.length >= 4) { const n = list.filter((u) => ANDYOU(u.text)).length; const cap = Math.floor(list.length * 0.12); if (n > cap) fails.push(`family ${fam}: ${n} of ${list.length} units close on ", and you" (at most ${cap}, R16: a page shows up to six of a family, so at most one in eight may use it)`); }
  if (/^(missing|need|seen)/.test(fam)) {
    const open = {}; for (const u of list) { const o = (u.text.toLowerCase().match(/[a-z']+/g) || []).slice(0, 3).join(' '); (open[o] ||= []).push(u.key); }
    for (const [o, ks] of Object.entries(open)) if (ks.length > 2) fails.push(`family ${fam}: ${ks.length} units open "${o}" (at most two, R16)`);
    for (const fr of ['nobody inside it', 'your season asks for', 'you come across as']) { const n = list.filter((u) => u.text.toLowerCase().includes(fr)).length; if (n > 3) fails.push(`family ${fam}: "${fr}" in ${n} units (at most three, R16)`); }
  }
}
if (fails.length) { console.log(fails.join('\n')); console.log(`\n${fails.length} problem(s) across ${units.length} units.`); process.exit(1); }
console.log(`PASS: ${units.length} units clean.`);
