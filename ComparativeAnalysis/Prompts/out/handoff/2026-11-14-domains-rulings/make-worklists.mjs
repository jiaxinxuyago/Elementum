// The rulings round (owner R1–R17, G1, MN all A, 2026-11-14): the station → fourteen writer worklists.
//   node make-worklists.mjs        writes worklist-<id>.json and prints the counts
// Each unit: { key, kind, page, family, current, new?, approved?, notes: [{ id, issue, fix }] }.
//   page    the gate's overlap group (R10: a seat's units in one domain are one page)
//   family  the gate's close-budget group (R16)
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.dirname(new URL(import.meta.url).pathname) + '/';
const ROOT = path.resolve(HERE, '../../../../..') + '/';
const ST = ROOT + 'Reading/Database/templates/by_axis/json/';
const AUD = ROOT + 'ComparativeAnalysis/Evaluations/section-audit-2026-10-21/domains/';
const HO = ROOT + 'ComparativeAnalysis/Prompts/out/handoff/';
const rd = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const { findings } = rd(AUD + 'findings.json');
const applied = new Set(rd(AUD + 'tweaks-applied.json').map((t) => t.key));
const byKey = {};
for (const f of findings) {
  if (!f.key || (f.severity === 'TWEAK' && applied.has(f.key))) continue;
  (byKey[f.key] ||= []).push({ id: `${f.source.replace('group-', '')}:${f.id}`, severity: f.severity, issue: f.issue, fix: f.fix });
}
// the owner-approved texts (the 10-17 golden template, the round-8 golden units, the seven Y2 lines)
const golden = new Set();
const walk = (o) => { if (typeof o === 'string') golden.add(o.trim()); else if (o && typeof o === 'object') Object.values(o).forEach(walk); };
const t17 = rd(HO + '2026-10-17-domains-template/template.json'); walk([t17.seats, t17.decades, t17.gaps, t17.patterns, t17.unruled]);
for (const f of ['2026-10-18-depth-template/template.json', '2026-10-21-domains-blueprint/approved.json']) for (const u of rd(HO + f).units) golden.add((u.template || u.text).trim());

const W = {}; const add = (w, u) => (W[w] ||= []).push({ ...u, ...(u.current && golden.has(u.current.trim()) ? { approved: true } : {}), notes: byKey[u.key] || [] });
const GOD_OF = { bijian: '比肩', jiecai: '劫财', shishen: '食神', shangguan: '伤官', piancai: '偏财', zhengcai: '正财', qisha: '七杀', zhengguan: '正官', pianyin: '偏印', zhengyin: '正印' };

// 1 · the seat beats, by gate (R15 reads the characters of one gate side by side)
for (const f of fs.readdirSync(ST + 'POSITION').filter((x) => x.endsWith('.json')).sort()) {
  const id = f.replace('.json', ''); const c = rd(ST + 'POSITION/' + f).candidates; if (!c.domain_climb) continue;
  const [, , gate, kind] = id.match(/^([a-z]+)_(year|month|day|hour)_(stem|branch)$/);
  for (const [d, u] of Object.entries(c.domain_climb)) {
    const w = gate === 'day' ? (['Love', 'Family'].includes(d) ? 'S-day-a' : 'S-day-b') : `S-${gate}-${kind}`;
    const base = `POSITION ${id} · domain_climb.${d}`; const page = `seat:${id}.${d}`;
    for (const k of ['headline', 'recognition', 'lived', 'ahead']) if (u[k]) add(w, { key: `${base}.${k}`, kind: k, page, family: k === 'headline' ? 'headline' : k === 'recognition' ? 'recognition' : 'seatbeat', current: u[k] });
    if (gate === 'month' || gate === 'day') add(w, { key: `${base}.lived_past`, kind: 'lived_past', page, family: 'seatbeat', current: u.lived_past || '', new: !u.lived_past, base_lived: u.lived });
  }
}
// 2 · the decade and year lines, by domain (R16 counts a domain page's decade and year lines together)
const DEC1 = ['Family', 'Career', 'Wealth'];
for (const [gid, zh] of Object.entries(GOD_OF)) {
  const c = rd(ST + `GOD/${gid}.json`).candidates;
  for (const [d, poles] of Object.entries(c.decade_lines || {})) for (const [pole, ts] of Object.entries(poles)) for (const [tense, t] of Object.entries(ts)) {
    add(DEC1.includes(d) ? 'DEC-1' : 'DEC-2', { key: `GOD ${gid} · decade_lines.${d}.${pole}.${tense}`, kind: 'decade', page: `decade:${d}`, family: `decade.${d}`, current: t });
  }
}
const depth = rd(ST + 'TEMPLATED/tpl_depth.json').candidates.units;
for (const [k, t] of Object.entries(depth)) {
  const m = k.match(/^GOD (\w+) · year_domain\.(\w+)$/); if (!m) continue;
  add(DEC1.includes(m[2]) ? 'DEC-1' : 'DEC-2', { key: k, kind: 'year_domain', page: `year:${m[2]}`, family: `year.${m[2]}`, current: t });
}
// 3 · the templated domain lines: gaps, unruled, waiting (R9), the pattern lines
const tpl = rd(ST + 'TEMPLATED/tpl_domains.json').candidates;
for (const [d, gs] of Object.entries(tpl.domain_gaps || {})) for (const [g, t] of Object.entries(gs)) add('TPL', { key: `TEMPLATED tpl_domains · domain_gaps.${d}.${g}`, kind: 'gap', page: `gap:${d}`, family: 'gap', current: t });
for (const [d, t] of Object.entries(tpl.domain_unruled || {})) add('TPL', { key: `TEMPLATED tpl_domains · domain_unruled.${d}`, kind: 'unruled', page: `tpl:${d}`, family: 'unruled', current: t });
for (const [d, t] of Object.entries(tpl.domain_unruled_headline || {})) add('TPL', { key: `TEMPLATED tpl_domains · domain_unruled_headline.${d}`, kind: 'headline', page: `tpl:${d}`, family: 'headline', current: t });
for (const d of ['Wealth', 'Health', 'Career', 'Family', 'Social', 'Mind', 'Growth']) {
  add('TPL', { key: `TEMPLATED tpl_domains · domain_waiting.${d}`, kind: 'unruled', page: `tpl:${d}`, family: 'waiting', current: tpl.domain_waiting?.[d] || '', new: !tpl.domain_waiting?.[d] });
  add('TPL', { key: `TEMPLATED tpl_domains · domain_waiting_headline.${d}`, kind: 'headline', page: `tpl:${d}`, family: 'headline', current: tpl.domain_waiting_headline?.[d] || '', new: !tpl.domain_waiting_headline?.[d] });
}
for (const f of fs.readdirSync(ST + 'TG_PATTERN').filter((x) => x.endsWith('.json')).sort()) {
  const k = f.replace('.json', ''); const c = rd(ST + 'TG_PATTERN/' + f).candidates;
  for (const [d, t] of Object.entries(c.domain_lines || {})) add('TPL', { key: `TG_PATTERN ${k} · domain_lines.${d}`, kind: 'pattern', page: `pattern:${k}`, family: 'pattern', current: t });
  if (c.fused_line) add('TPL', { key: `TG_PATTERN ${k} · fused_line`, kind: 'fused', page: `pattern:${k}`, family: 'fused', current: c.fused_line });
}
// 4 · the Blueprint: the structures and their state notes by structure (R1, R7)
const STRUCTS = { zhengguan_ge: ['formed.none', 'formed.cured', 'broken.virtuoso', 'strained.virtuoso', 'strained.mixed', 'strained.heavy'],
  qisha_ge: ['formed.none', 'formed.cured', 'strained.mixed', 'broken.money', 'strained.money', 'broken.unchecked', 'strained.unchecked', 'strained.heavy', 'strained.alchemist'],
  zhengcai_ge: ['formed.none', 'formed.cured', 'strained.heavywealth', 'broken.peers', 'strained.peers', 'strained.general'],
  piancai_ge: ['formed.none', 'formed.cured', 'strained.heavywealth', 'broken.peers', 'strained.peers', 'strained.general'],
  zhengyin_ge: ['formed.none', 'formed.cured', 'strained.excess', 'strained.money'],
  pianyin_ge: ['formed.none', 'formed.cured', 'strained.excess', 'strained.money', 'strained.starved'],
  shishen_ge: ['formed.none', 'formed.cured', 'broken.alchemist', 'strained.alchemist', 'strained.drained'],
  shangguan_ge: ['formed.none', 'formed.cured', 'broken.magistrate', 'strained.magistrate', 'strained.excess', 'strained.drained'],
  jianlu_ge: ['formed.none', 'strained.unchecked', 'strained.idle'], yuejie_ge: ['formed.none', 'strained.unchecked', 'strained.idle'], yueren_ge: ['formed.none', 'strained.idle'] };
const FAM = { zhengguan_ge: 'officer', qisha_ge: 'officer', zhengcai_ge: 'wealth', piancai_ge: 'wealth', zhengyin_ge: 'seal', pianyin_ge: 'seal', shishen_ge: 'output', shangguan_ge: 'output', jianlu_ge: 'self', yuejie_ge: 'self', yueren_ge: 'self' };
for (const [sid, states] of Object.entries(STRUCTS)) {
  add('BP-1', { key: `STRUCTURE ${sid} · reading`, kind: 'structure', page: `structure:${sid}`, family: 'structure', current: depth[`STRUCTURE ${sid} · reading`] || '' });
  for (const st of states) {
    const k = `STRUCTURE ${sid} · status.${st}`; const fk = `STRUCTURE ${FAM[sid]} · status.${st}`;
    add('BP-1', { key: k, kind: 'status', page: `structure:${sid}`, family: 'status', current: depth[k] || '', new: !depth[k], family_note: depth[fk] || null });
  }
}
// 5 · the Blueprint: missing (and its no-hour version, R5), seen, the season needs (R6), the close
for (const gid of Object.keys(GOD_OF)) {
  add('BP-2', { key: `GOD ${gid} · missing`, kind: 'missing', page: 'bp-missing', family: 'missing', current: depth[`GOD ${gid} · missing`] });
  add('BP-2', { key: `GOD ${gid} · missing.open`, kind: 'missing', page: 'bp-missing', family: 'missing.open', current: depth[`GOD ${gid} · missing.open`] || '', new: !depth[`GOD ${gid} · missing.open`] });
  for (const k of ['seen.plain', 'seen.inside']) add('BP-2', { key: `GOD ${gid} · ${k}`, kind: 'seen', page: `bp-${k}`, family: k.replace('.', '-'), current: depth[`GOD ${gid} · ${k}`] });
  for (const st of ['shown', 'rooted', 'hidden']) add('BP-2', { key: `GOD ${gid} · season_need.${st}`, kind: 'season_need', page: 'bp-need', family: `need.${st}`, current: depth[`GOD ${gid} · season_need.${st}`] });
}
add('BP-2', { key: 'TEMPLATED tpl_depth · seen.close', kind: 'seen_close', page: 'bp-seen.inside', family: 'close', current: depth['TEMPLATED tpl_depth · seen.close'] });
// 6 · the Blueprint: the bonds (R3: dated lines get lived and coming versions) and the pairing lines
for (const [k, t] of Object.entries(depth)) {
  if (/^TEMPLATED tpl_depth · bond\.none_hard$/.test(k)) add('BP-3', { key: k, kind: 'bond_none', page: 'bp-bonds', family: 'bond', current: t });
  else if (/^TEMPLATED tpl_depth · bond\.\w+\.\w+$/.test(k)) add('BP-3', { key: k, kind: 'bond', page: 'bp-bonds', family: 'bond', current: t });
  else if (/^TG_PATTERN \w+ · blueprint_line$/.test(k)) add('BP-3', { key: k, kind: 'pattern_bp', page: 'bp-pairs', family: 'pattern_bp', current: t });
}
for (const [w, list] of Object.entries(W)) fs.writeFileSync(HERE + `worklist-${w}.json`, JSON.stringify({ worklist: w, units: list }, null, 1) + '\n');
for (const [w, list] of Object.entries(W)) console.log(w.padEnd(14), String(list.length).padStart(4), 'units', String(list.filter((u) => u.new).length).padStart(3), 'new', String(list.filter((u) => u.notes.length).length).padStart(3), 'with findings', String(list.filter((u) => u.approved).length).padStart(3), 'approved');
