// THE TEMPLATE GATE: checks a filled skeleton field by field against its spec
// (shape · both ends of the word range · mechanical law · the cut law · the
// within-page four-gram · the cross-stem four-gram · the reader zone).
//   node validate-template.mjs <filled-skeleton.json> [--json] [--quiet]
//   node validate-template.mjs <dir>                 (every *.json in the dir)
// Exit 1 on any blocking finding.
import fs from 'node:fs';
import path from 'node:path';
import { makeGate, fourGramCheck, lawfulPair, swapGramCheck, zoneCheck, ZONE_BLOCK_PER100, wc, flat, idioms4w, STEMS, S, J, repShared } from './lib.mjs';
const argv = process.argv.slice(2); const quiet = argv.includes('--quiet');
const sentences = (t) => String(t || '').split(/[.!?]+\s/).filter(Boolean).length;
export function validateTemplate(file) {
  const sk = JSON.parse(fs.readFileSync(file, 'utf8')); const R = { file: path.basename(file), page: sk.page, fields: {}, blocking: [], readFlags: [], repInfo: [], zone: null };
  const log = (s) => { if (!quiet) console.log(s); }; log(`\n## ${path.basename(file)} · ${sk.page}`);
  const stem = Object.keys(STEMS).find((k) => sk.cell.includes(`STEM/${STEMS[k].file}`)) || null;
  const texts = {}; // path → text for the four-gram check
  for (const [fp, f] of Object.entries(sk.fields || {})) {
    const findings = []; const F = (w, m) => findings.push(`${w} :: ${m}`); const gate = makeGate(F); const s = f.spec; const v = f.value;
    const empty = v == null || (typeof v === 'string' && !v.trim()) || (typeof v === 'object' && Object.values(v).every((x) => !String(x || '').trim()));
    if (empty || (typeof v === 'string' && /REDACTED/.test(v))) { F(fp, 'EMPTY (not filled)'); R.fields[fp] = { pass: false, findings }; R.blocking.push(...findings); continue; }
    const zoneCard = /ELEMENT_PAIR\.function|cta_verdict|fn_reading|adj_chips/.test(s.card);
    if (typeof v === 'string') {
      gate(fp, v, { budget: s.max, min: s.min, noYou: /no "you"/.test(s.person || ''), youOpen: s.opener === 'You', theOpen: s.opener && s.opener !== 'You' ? s.opener : undefined });
      if (s.form === 'L1 · L2') { if (!/\s·\s/.test(v)) F(fp, 'missing the " · " split'); if (!v.includes(s.opener_L2)) F(fp, `L2 does not carry "${s.opener_L2}"`); const l1 = v.split(' · ')[0].trim(); const w = wc(l1); if (w < 2 || w > 4) F(fp, `L1 ${w} words (2–4)`); if (new RegExp(`\\b(${STEMS[stem]?.el}|you)\\b`, 'i').test(l1)) F(fp, 'L1 names the element or the reader'); }
      if (s.sentences && (v.match(/[.!?]/g) || []).length > s.sentences) F(fp, `more than ${s.sentences} sentence(s)`);
      if (s.card === 'STEM_BAND.yourNature_desc' && /\b(used to|than before|no longer|these days|anymore|once were)\b/i.test(v)) R.readFlags.push(`${fp} :: reads as a decline from an earlier self (the band is a present state)`);
      if (s.card === 'ELEMENT_PAIR.function.advise_catalyst') { if (/\b(invest in|buy (stocks|crypto|property)|quit your job|see a doctor|take (a|your) medication|dosage)\b/i.test(v)) F(fp, 'chart-derived prescription'); if (/\b(guarantee|will never|always (works|pays))\b/i.test(v)) F(fp, 'guarantee'); }
      texts[fp] = v;
    } else if (s.card === 'STEM.gifts') {
      const pw = wc(v.phrase); if (pw > s.phrase.max && !idioms4w().has(String(v.phrase).toLowerCase())) F(fp, `phrase ${pw} words > ${s.phrase.max}`); if (pw < 1) F(fp, 'phrase empty');
      if (String(v.phrase).toLowerCase() === String(v.dim).toLowerCase()) F(fp, 'phrase = dim');
      if (wc(v.dim) > s.dim.max) F(fp, `dim ${wc(v.dim)} words > ${s.dim.max}`);
      gate(fp + '.desc', v.desc, { budget: s.desc.max_words }); const n = sentences(v.desc); if (n > s.desc.sentences_max) F(fp, `desc ${n} sentences > ${s.desc.sentences_max}`);
      gate(fp + '.phrase', v.phrase, {}); if (/^(The|A) [a-z]+$/.test(String(v.phrase))) F(fp, 'bare image phrase');
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
      gate(fp + '.text', v.text, { budget: s.text.max, min: s.text.min });
      if (/\b(remember when|that time you|when you were (a|an|\d))\b/i.test(v.text)) F(fp + '.text', 'claimed memory');
      const [hz, god] = s.cell.split('_'); const SIB = { '比肩': '劫财', '劫财': '比肩', '食神': '伤官', '伤官': '食神', '偏财': '正财', '正财': '偏财', '七杀': '正官', '正官': '七杀', '偏印': '正印', '正印': '偏印' }; const sib = J(`ELEMENT_GOD/${hz}_${SIB[god]}.json`).adj_chips; if ([...(sib.catalyst || []), ...(sib.friction || [])].map((x) => x.toLowerCase()).includes(String(v.word).toLowerCase())) F(fp + '.word', `chip "${v.word}" also sits on the sibling cell`);
      texts[fp] = v.text;
    }
    // the reader zone per field
    if (zoneCard) { const z = zoneCheck(typeof v === 'string' ? v : Object.values(v).join(' ')); if (s.card === 'ELEMENT_GOD.fn_reading' && v.word) { const zw = zoneCheck(v.word); if (zw.outside.length) F(fp + '.word', `outside the reader zone: ${zw.outside.join(', ')}`); } if (z.per100 > ZONE_BLOCK_PER100) F(fp, `reader zone: ${z.per100} outside-zone words per 100 > ${ZONE_BLOCK_PER100}`); else if (z.outside.length) R.readFlags.push(`${fp} :: outside the zone (not blocking): ${z.outside.join(', ')}`); }
    R.fields[fp] = { pass: findings.length === 0, findings }; R.blocking.push(...findings);
    log(`${findings.length ? '  ✗  ' : '  ok '} ${fp}${findings.length ? '\n     - ' + findings.join('\n     - ') : ''}`);
  }
  // the within-page four-gram (the repetition law): pair fields block; ledger rows vs the page inventory
  const pairish = (p) => /^(mechanism|function|carry|cta_verdict)/.test(p);
  const keys = Object.keys(texts);
  for (let i = 0; i < keys.length; i++) for (let j = i + 1; j < keys.length; j++) { const a = keys[i], b = keys[j]; if (lawfulPair(a, b)) continue; if (a.startsWith('carry') && b.startsWith('mechanism') || b.startsWith('carry') && a.startsWith('mechanism')) continue; const sh = repShared(texts[a], texts[b]); if (!sh.length) continue; const msg = `${a} ↔ ${b} :: "${sh[0]}"`; if (pairish(a) && pairish(b)) { R.blocking.push('repetition law: ' + msg); log('  ✗  repetition law: ' + msg); } else R.repInfo.push(msg); }
  // cross-stem four-gram on the swap-gram fields
  if (stem) for (const [fp, t] of Object.entries(texts)) { const f = sk.fields[fp].spec; const map = { 'STEM_BAND.yourNature_desc': ['STEM_BAND', 'yourNature_desc', `${STEMS[stem].file}_${f.band || ''}.json`], 'STEM_BAND.self_card': ['STEM_BAND', 'self_card', null], 'STEM.inscription': ['STEM', 'inscription', STEMS[stem].file + '.json'], 'STEM.yourNature_desc': ['STEM', 'yourNature_desc', STEMS[stem].file + '.json'] }[f.card]; if (!map) continue; const own = map[2] || `${STEMS[stem].file}_`; for (const h of swapGramCheck(t, map[0], map[1], own)) { if (h.file.startsWith(STEMS[stem].file + '_')) continue; R.blocking.push(`cross-stem four-gram: ${fp} ↔ ${map[0]}/${h.file} :: "${h.gram}"`); log(`  ✗  cross-stem four-gram: ${fp} ↔ ${h.file} :: "${h.gram}"`); } }
  R.pass = R.blocking.length === 0;
  if (R.readFlags.length) log('  read flags: ' + R.readFlags.join(' | '));
  if (R.repInfo.length) log('  repetition inventory (not blocking): ' + R.repInfo.slice(0, 5).join(' | '));
  log(R.pass ? `  → PASS (${Object.keys(sk.fields).length} fields)` : `  → FAIL (${R.blocking.length} blocking)`);
  return R;
}
if (path.resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  const target = argv.filter((a) => !a.startsWith('--'))[0]; if (!target) { console.log('usage: node validate-template.mjs <filled-skeleton.json | dir> [--json] [--quiet]'); process.exit(2); }
  const files = fs.statSync(target).isDirectory() ? fs.readdirSync(target).filter((f) => f.endsWith('.json') && !f.endsWith('.gate.json')).map((f) => path.join(target, f)) : [target];
  let fails = 0; for (const f of files) { const R = validateTemplate(f); if (argv.includes('--json')) fs.writeFileSync(f.replace(/\.json$/, '.gate.json'), JSON.stringify(R, null, 1)); if (!R.pass) fails++; if (quiet) console.log(`${R.pass ? 'PASS' : 'FAIL'}  ${path.basename(f)}${R.pass ? '' : '  ← ' + R.blocking.slice(0, 4).join(' | ')}`); }
  process.exit(fails ? 1 : 0);
}
