// THE TEMPLATE GATE: checks a filled skeleton field by field against its spec
// (shape · both ends of the word range · mechanical law · the cut law · the
// within-page four-gram · the cross-stem four-gram · the reader zone).
//   node validate-template.mjs <filled-skeleton.json> [--json] [--quiet]
//   node validate-template.mjs <dir>                 (every *.json in the dir)
// Exit 1 on any blocking finding.
import fs from 'node:fs';
import path from 'node:path';
import { makeGate, fourGramCheck, lawfulPair, swapGramCheck, zoneCheck, ZONE_BLOCK_PER100, wc, flat, idioms4w, STEMS, S, J, repShared, repGrams as repGramsOf, DOOR_STAMP, cureSet, VIRTUE_HEAD, arenaWord, CHANNEL_BRAKES, REFILL_PUSH, longSentences, STEM_RHYTHM, POLE_STATE, formulaRepeat, sentencesOf, SEEK_BEAT } from './lib.mjs';
const argv = process.argv.slice(2); const quiet = argv.includes('--quiet');
const sentences = (t) => String(t || '').split(/[.!?]+\s/).filter(Boolean).length;
// --against <benchmark dir>: the benchmarked pass may not reuse a four-word run of the current line it was shown (blocking)
const againstDir = (() => { const i = argv.indexOf('--against'); return i >= 0 ? argv[i + 1] : null; })();
export function validateTemplate(file, opts = {}) {
  const sk = JSON.parse(fs.readFileSync(file, 'utf8'));
  const orig = (() => { const d = opts.against || againstDir; if (!d) return null; const f = path.join(d, path.basename(file).replace(/\.json$/, '.original.json')); return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null; })(); const R = { file: path.basename(file), page: sk.page, fields: {}, blocking: [], readFlags: [], repInfo: [], rhythm: {}, zone: null };
  const log = (s) => { if (!quiet) console.log(s); }; log(`\n## ${path.basename(file)} · ${sk.page}`);
  const stem = Object.keys(STEMS).find((k) => sk.cell.includes(`STEM/${STEMS[k].file}`)) || (STEMS[sk.stem] ? sk.stem : null); // the skeleton's own stem key (handoff.mjs since 2026-09-30) names it on the energy pages
  const texts = {}; // path → text for the four-gram check
  // two candidates on the pull-heavy fields (owner 2026-09-30, H7): a spec with candidates: 2 carries value_b beside value; the twin is gated as its own field, named <path>#b, and the two never trip the four-gram against each other (only one ships). The originals (<file>.original.json) carry no twin and are exempt.
  const isOriginal = /\.original\.json$/.test(String(file));
  for (const [fp, f] of Object.entries(sk.fields || {})) if (f.spec?.candidates === 2) { const vb = f.value_b; const filled = vb != null && String(typeof vb === 'string' ? vb : Object.values(vb).join('')).trim() && !/REDACTED/.test(JSON.stringify(vb)); if (filled) sk.fields[`${fp}#b`] = { spec: f.spec, value: vb }; else if (!isOriginal) { R.blocking.push(`${fp} :: second candidate missing (value_b; the spec asks for two)`); log(`  ✗  ${fp} :: second candidate missing (value_b)`); } }
  for (const [fp, f] of Object.entries(sk.fields || {})) {
    const findings = []; const F = (w, m) => findings.push(`${w} :: ${m}`); const gate = makeGate(F); const s = f.spec; const v = f.value;
    const empty = v == null || (typeof v === 'string' && !v.trim()) || (typeof v === 'object' && Object.values(v).every((x) => !String(x || '').trim()));
    if (empty || (typeof v === 'string' && /REDACTED/.test(v))) { F(fp, 'EMPTY (not filled)'); R.fields[fp] = { pass: false, findings }; R.blocking.push(...findings); continue; }
    const zoneCard = /ELEMENT_PAIR\.function|cta_verdict|fn_reading|adj_chips/.test(s.card);
    if (typeof v === 'string') {
      gate(fp, v, { budget: s.max, min: s.min, noYou: /no "you"/.test(s.person || ''), youOpen: s.opener === 'You', theOpen: s.opener && s.opener !== 'You' ? s.opener : undefined, capOpen: s.card === 'ELEMENT_PAIR.cta_verdict' });
      if (s.form === 'L1 · L2') { if (!/\s·\s/.test(v)) F(fp, 'missing the " · " split'); if (!v.includes(s.opener_L2)) F(fp, `L2 does not carry "${s.opener_L2}"`); const l1 = v.split(' · ')[0].trim(); const w = wc(l1); if (w < 2 || w > 4) F(fp, `L1 ${w} words (2–4)`); if (new RegExp(`\\b(${STEMS[stem]?.el}|you)\\b`, 'i').test(l1)) F(fp, 'L1 names the element or the reader'); }
      if (s.sentences && (v.match(/[.!?]/g) || []).length > s.sentences) F(fp, `more than ${s.sentences} sentence(s)`);
      if (s.card === 'ELEMENT_PAIR.cta_verdict') { const m = String(v).match(POLE_STATE); if (m) R.readFlags.push(`${fp} :: pole state word "${m[0]}" (the verdict renders on either pole's page, C5; not blocking, the read decides)`); }
      if (s.card === 'STEM_BAND.yourNature_desc' && /\b(used to|than before|no longer|these days|anymore|once were)\b/i.test(v)) R.readFlags.push(`${fp} :: reads as a decline from an earlier self (the band is a present state)`);
      if (s.card === 'ELEMENT_PAIR.mechanism.catalyst_turn') { if (/^Run (thin|heavy),/.test(v)) F(fp, 'opens with the retired "Run thin," / "Run heavy," (owner 2026-09-29: a plain statement of the state, the element named)'); const el = s.element || (String(sk.page || '').match(/energy page of (Wood|Fire|Earth|Metal|Water)/) || [])[1]; if (el && !new RegExp(`\\b${el}\\b`).test(String(v).split(/[.:]/)[0])) F(fp, `the element (${el}) is not named in the first sentence`); }
      if (s.card === 'ELEMENT_PAIR.function.definition_catalyst' || s.card === 'ELEMENT_PAIR.mechanism.base') { const el = s.element || (String(sk.page || '').match(/energy page of (Wood|Fire|Earth|Metal|Water)/) || [])[1]; if (el && !arenaWord(v, el, { selfNoun: s.card === 'ELEMENT_PAIR.mechanism.base' })) F(fp, `no word of ${el}'s chemistry anywhere in the field (owner 2026-09-30; the element's name counts in the base, never in the definition)`); }
      if (s.card === 'ELEMENT_PAIR.function.advise_catalyst') { if (/\b(invest in|buy (stocks|crypto|property)|quit your job|see a doctor|take (a|your) medication|dosage)\b/i.test(v)) F(fp, 'chart-derived prescription'); if (/\b(guarantee|will never|always (works|pays))\b/i.test(v)) F(fp, 'guarantee'); if (s.remedy_verb) { const m = String(v).match(s.remedy_verb === 'Channel' ? CHANNEL_BRAKES : REFILL_PUSH); if (m) R.readFlags.push(`${fp} :: ${s.remedy_verb} advice prescribes "${m[0]}" (the band's remedy verb, D8; not blocking, the read decides)`); } if (/advise_friction$/.test(fp)) { const pk = (String(sk.cell || '').match(/ELEMENT_PAIR\/([^\s+]+)/) || [])[1]; const cure = s.cure_set || (pk ? cureSet(pk) : []); const named = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'].filter((el) => new RegExp(`\\b${el}\\b`).test(v)); if (!SEEK_BEAT.test(v)) F(fp, 'prescription beat missing ("Seek {Element}, the {Function} energy", owner 2026-09-30)'); if (cure.length && named.some((el) => !cure.includes(el))) F(fp, `names an element outside the cure set (${named.filter((el) => !cure.includes(el)).join(', ')}; cure set ${cure.join(', ')})`); } }
      texts[fp] = v;
    } else if (s.card === 'STEM.gifts') {
      const pw = wc(v.phrase); if (pw > s.phrase.max && !idioms4w().has(String(v.phrase).toLowerCase())) F(fp, `phrase ${pw} words > ${s.phrase.max}`); if (pw < 1) F(fp, 'phrase empty');
      if (String(v.phrase).toLowerCase() === String(v.dim).toLowerCase()) F(fp, 'phrase = dim');
      if (wc(v.dim) > s.dim.max) F(fp, `dim ${wc(v.dim)} words > ${s.dim.max}`);
      gate(fp + '.desc', v.desc, { budget: s.desc.max_words, capOpen: true }); const n = sentences(v.desc); if (n > s.desc.sentences_max) F(fp, `desc ${n} sentences > ${s.desc.sentences_max}`);
      gate(fp + '.phrase', v.phrase, {}); if (/^(The|A) [a-z]+$/.test(String(v.phrase))) F(fp, 'bare image phrase');
      if (VIRTUE_HEAD.test(String(v.phrase).trim())) R.readFlags.push(`${fp} :: the chip opens on a virtue word ("${v.phrase}"): a symptom, not a virtue (not blocking, the read decides)`);
      const all = new Set(); for (const f2 of fs.readdirSync(S + 'STEM')) if (f2.endsWith('.json') && f2 !== STEMS[stem]?.file + '.json') { const c = J('STEM/' + f2); [...(c.gifts || []), ...(c.shadows || [])].forEach((x) => all.add(String(x.phrase).toLowerCase())); } if (all.has(String(v.phrase).toLowerCase())) F(fp, `phrase "${v.phrase}" already sits in another stem's pool`);
      texts[fp] = v.desc;
    } else if (s.card === 'ELEMENT_PAIR.carry') {
      gate(fp + '.clause', v.clause, { budget: s.clause.max, min: s.clause.min }); gate(fp + '.remedy', v.remedy, { budget: s.remedy.max, min: s.remedy.min });
      if (s.openers && !s.openers.some((o) => String(v.clause || '').startsWith(o))) F(fp, 'wide clause does not open with one of the eight openers');
      if (/\bdoor\b/i.test(v.clause + ' ' + v.remedy)) F(fp, 'the word "door" never reaches a reader');
      if (s.cut_from) { const turn = sk.fields[s.cut_from]?.value || ''; const c = String(v.clause).toLowerCase().replace(/^the /, ''); if (!(turn.toLowerCase().includes(c.slice(0, 30)) || turn.toLowerCase().includes(String(v.clause).toLowerCase().slice(5, 40)))) F(fp, `clause is not cut from ${s.cut_from}`); if (!turn.toLowerCase().includes(String(v.remedy).toLowerCase().replace(/\.$/, '').slice(0, 25))) F(fp, `remedy is not the directive of ${s.cut_from}`); }
      if (/[一-鿿]/.test(v.clause + v.remedy)) F(fp, 'Chinese character (the idiom is said in English, never quoted)');
      texts[fp] = [v.clause, v.remedy].join(' ');
    } else if (s.card === 'ELEMENT_GOD.fn_reading') {
      const ww = wc(v.word); if (ww > s.word.max) F(fp + '.word', `${ww} words > ${s.word.max}`); gate(fp + '.word', v.word, {}); if (/\b(diligent|exemplary|enterprising|meticulous|sardonic|ossified|discerning|judicious|astute|sagacious)\b/i.test(v.word)) F(fp + '.word', 'report-card or noble register');
      if (VIRTUE_HEAD.test(String(v.word).trim())) R.readFlags.push(`${fp}.word :: the chip opens on a virtue word ("${v.word}"): a symptom, not a virtue (not blocking, the read decides)`);
      gate(fp + '.text', v.text, { budget: s.text.max, min: s.text.min, capOpen: true });
      if (/\b(remember when|that time you|when you were (a|an|\d))\b/i.test(v.text)) F(fp + '.text', 'claimed memory');
      if (DOOR_STAMP.test(v.text)) F(fp + '.text', 'time or place stamp (the doors illustrate the trait, they do not stage a scene; owner 2026-09-29)');
      const [hz, god] = s.cell.split('_'); const SIB = { '比肩': '劫财', '劫财': '比肩', '食神': '伤官', '伤官': '食神', '偏财': '正财', '正财': '偏财', '七杀': '正官', '正官': '七杀', '偏印': '正印', '正印': '偏印' }; const sib = J(`ELEMENT_GOD/${hz}_${SIB[god]}.json`).adj_chips; if ([...(sib.catalyst || []), ...(sib.friction || [])].map((x) => x.toLowerCase()).includes(String(v.word).toLowerCase())) F(fp + '.word', `chip "${v.word}" also sits on the sibling cell`);
      texts[fp] = v.text;
    }
    // the reader zone per field
    if (zoneCard) { const z = zoneCheck(typeof v === 'string' ? v : Object.values(v).join(' ')); if (s.card === 'ELEMENT_GOD.fn_reading' && v.word) { const zw = zoneCheck(v.word); if (zw.outside.length) F(fp + '.word', `outside the reader zone: ${zw.outside.join(', ')}`); } if (z.per100 > ZONE_BLOCK_PER100) F(fp, `reader zone: ${z.per100} outside-zone words per 100 > ${ZONE_BLOCK_PER100}`); else if (z.outside.length) R.readFlags.push(`${fp} :: outside the zone (not blocking): ${z.outside.join(', ')}`); }
    // the formula-phrase window within the field (owner 2026-09-30, B6): blocking
    if (texts[fp] != null) for (const ph of formulaRepeat(texts[fp])) F(fp, `formula phrase repeated within three sentences: "${ph}" (a formula phrase never twice within three consecutive sentences; owner 2026-09-30, B6)`);
    if (texts[fp] != null) R.rhythm[fp] = longSentences(texts[fp]);
    R.fields[fp] = { pass: findings.length === 0, findings }; R.blocking.push(...findings);
    log(`${findings.length ? '  ✗  ' : '  ok '} ${fp}${findings.length ? '\n     - ' + findings.join('\n     - ') : ''}`);
  }
  // the within-page four-gram (the repetition law): every pair of fields of the page blocks (owner 2026-09-30, F1 across the page: the ledger rows against each other and against the pair fields); the lawful echoes and the two candidates of one field are exempt
  const pairish = (p) => /^(mechanism|function|carry|cta_verdict)/.test(p);
  const keys = Object.keys(texts);
  for (let i = 0; i < keys.length; i++) for (let j = i + 1; j < keys.length; j++) { const a = keys[i], b = keys[j]; if (lawfulPair(a, b)) continue; if (a.startsWith('carry') && b.startsWith('mechanism') || b.startsWith('carry') && a.startsWith('mechanism')) continue; if (a.replace(/#b$/, '') === b.replace(/#b$/, '')) continue; const sh = repShared(texts[a], texts[b]); if (!sh.length) continue; const msg = `${a} ↔ ${b} :: "${sh[0]}"`; R.blocking.push(`repetition law (${pairish(a) && pairish(b) ? 'the cell' : 'the page'}): ` + msg); log('  ✗  repetition law: ' + msg); }
  // the formula-phrase window across adjacent fields (owner 2026-09-30, B6): for each ordered pair of adjacent fields in the skeleton's field order, the last two sentences of the first and the first two of the second; blocking, both fields named. A field's second candidate (#b) stands in for it against the same neighbours.
  const order = keys.filter((k) => !/#b$/.test(k)); const variants = (k) => [k, ...(texts[`${k}#b`] != null ? [`${k}#b`] : [])];
  for (let i = 0; i + 1 < order.length; i++) for (const a of variants(order[i])) for (const b of variants(order[i + 1])) { const tail = sentencesOf(texts[a]).slice(-2).join('. '); const head = sentencesOf(texts[b]).slice(0, 2).join('. '); for (const ph of formulaRepeat(`${tail}. ${head}`)) { const re = new RegExp(`\\b${ph}\\b`, 'i'); if (!(re.test(tail) && re.test(head))) continue; const msg = `${a} ↔ ${b} :: "${ph}" twice within three sentences across adjacent fields (owner 2026-09-30, B6)`; R.blocking.push('formula phrase window (the page): ' + msg); log('  ✗  formula phrase window: ' + msg); } }
  // cross-stem four-gram on the swap-gram fields
  if (stem) for (const [fp, t] of Object.entries(texts)) { const f = sk.fields[fp].spec; const map = { 'STEM_BAND.yourNature_desc': ['STEM_BAND', 'yourNature_desc', `${STEMS[stem].file}_${f.band || ''}.json`], 'STEM_BAND.self_card': ['STEM_BAND', 'self_card', null], 'STEM.inscription': ['STEM', 'inscription', STEMS[stem].file + '.json'], 'STEM.yourNature_desc': ['STEM', 'yourNature_desc', STEMS[stem].file + '.json'] }[f.card]; if (!map) continue; const own = map[2] || `${STEMS[stem].file}_`; for (const h of swapGramCheck(t, map[0], map[1], own)) { if (h.file.startsWith(STEMS[stem].file + '_')) continue; R.blocking.push(`cross-stem four-gram: ${fp} ↔ ${map[0]}/${h.file} :: "${h.gram}"`); log(`  ✗  cross-stem four-gram: ${fp} ↔ ${h.file} :: "${h.gram}"`); } }
  // the mandated formulas (openers, the identity formula with the spine verb, the sign's term line, the wide openers) are lawful matches
  if (orig) for (const [fp, t] of Object.entries(texts)) { const ov = orig.fields?.[fp]?.value; const ot = typeof ov === 'string' ? ov : ov ? Object.values(ov).filter((x) => typeof x === 'string').join(' ') : ''; const sp = sk.fields[fp].spec; const meta = stem ? STEMS[stem] : null; const exempt = [sp.opener, sp.opener_L2 && meta ? `${sp.opener_L2} ${meta.spine}` : sp.opener_L2, ...(sp.openers || []), meta ? `${meta.name} is ${meta.pol === 'yin' ? 'Yin' : 'Yang'} ${meta.el}` : '', 'and running thin, it is', 'and running over, it is'].filter(Boolean).join(' . '); const ex = repGramsOf(exempt); const sh = repShared(t, ot).filter((g) => !ex.has(g)); if (sh.length) { R.blocking.push(`reuses the current line: ${fp} :: "${sh[0]}"${sh.length > 1 ? ` (+${sh.length - 1})` : ''}`); log(`  ✗  reuses the current line: ${fp} :: "${sh[0]}"`); } }
  R.pass = R.blocking.length === 0;
  if (R.readFlags.length) log('  read flags: ' + R.readFlags.join(' | '));
  if (R.repInfo.length) log('  repetition inventory (not blocking): ' + R.repInfo.slice(0, 5).join(' | '));
  if (Object.keys(R.rhythm).length) log(`  rhythm (sentences over twenty words per field; reported, never blocking${stem && STEM_RHYTHM[stem] ? `; stem rhythm: ${STEM_RHYTHM[stem]}` : ''}): ` + Object.entries(R.rhythm).map(([k, n]) => `${k} ${n}`).join(' · '));
  log(R.pass ? `  → PASS (${Object.keys(sk.fields).length} fields)` : `  → FAIL (${R.blocking.length} blocking)`);
  return R;
}
if (path.resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  const target = argv.filter((a) => !a.startsWith('--'))[0]; if (!target) { console.log('usage: node validate-template.mjs <filled-skeleton.json | dir> [--json] [--quiet]'); process.exit(2); }
  const files = fs.statSync(target).isDirectory() ? fs.readdirSync(target).filter((f) => f.endsWith('.json') && !f.endsWith('.gate.json')).map((f) => path.join(target, f)) : [target];
  let fails = 0; for (const f of files) { const R = validateTemplate(f); if (argv.includes('--json')) fs.writeFileSync(f.replace(/\.json$/, '.gate.json'), JSON.stringify(R, null, 1)); if (!R.pass) fails++; if (quiet) console.log(`${R.pass ? 'PASS' : 'FAIL'}  ${path.basename(f)}${R.pass ? '' : '  ← ' + R.blocking.slice(0, 4).join(' | ')}`); }
  process.exit(fails ? 1 : 0);
}
