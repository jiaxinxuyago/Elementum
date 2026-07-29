// ===================================================================
// ELEMENTUM · generation-schema xlsx generator
// ===================================================================
// Parses Reading/Documents/REA_14_Reading_Generation_Schema.md (canonical)
// and emits Reading/Database/REA_14_generation_schema.xlsx (the sortable twin).
// Sheets: Variables (§3 K1 + §4 K2 + §5 T) · Backlog (§8) · UI Slot Index (§9)
// · Variant Axes (§1) · Rules (§10) · Rulings (§11).
// Edit the markdown, then re-run:  node tools/build-field-map-xlsx.mjs
// ===================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MD = path.resolve(__dirname, '../../Reading/Documents/REA_14_Reading_Generation_Schema.md');
const OUT = path.resolve(__dirname, '../../Reading/Database/REA_14_generation_schema.xlsx');

const md = fs.readFileSync(MD, 'utf8');
const clean = (c) => c.trim().replace(/\*\*/g, '').replace(/`/g, '');
const tableOf = (chunk, nth = 0) => {
  const blocks = [];
  let cur = [];
  for (const l of chunk.split('\n')) {
    if (l.trim().startsWith('|')) cur.push(l);
    else if (cur.length) { blocks.push(cur); cur = []; }
  }
  if (cur.length) blocks.push(cur);
  const t = blocks.filter((b) => b.length >= 3)[nth];
  if (!t) return null;
  const parse = (l) => l.split('|').slice(1, -1).map(clean);
  return { header: parse(t[0]), rows: t.slice(2).map(parse) };
};
const section = (re) => { const m = md.match(re); return m ? m[0] : ''; };

const wb = new ExcelJS.Workbook();
wb.creator = 'build-field-map-xlsx.mjs (generated from REA_14 markdown — the markdown is canonical)';
const FONT = { name: 'Arial', size: 10 };
const HEAD_FONT = { name: 'Arial', size: 10, bold: true, color: { argb: 'FFF4EFE6' } };
const HEAD_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF584A3E' } };
const addTable = (ws, header, rows, widths) => {
  const h = ws.addRow(header);
  h.font = HEAD_FONT; h.eachCell((c) => { c.fill = HEAD_FILL; });
  for (const r of rows) { const a = ws.addRow(r); a.font = FONT; a.alignment = { vertical: 'top', wrapText: true }; }
  widths.forEach((w, i) => { ws.getColumn(i + 1).width = w; });
};

// ── Sheet 1: Variables ────────────────────────────────────────────
const ws = wb.addWorksheet('Variables', { views: [{ state: 'frozen', ySplit: 2 }] });
ws.addRow(['REA_14 — Reading Generation Schema · generated from Reading/Documents/REA_14_Reading_Generation_Schema.md — markdown is canonical, do not hand-edit']);
ws.mergeCells(1, 1, 1, 9);
ws.getRow(1).font = { ...FONT, italic: true, size: 9 };
const COLS = ['Part', 'Variable', 'Type / Pattern', 'Axis', 'Measured', 'Budget', 'Example (庚 1995-04-29 · 18:00 / handoff demo)', 'UI slots', 'Status'];
const head = ws.addRow(COLS);
head.font = HEAD_FONT; head.eachCell((c) => { c.fill = HEAD_FILL; });
const push = (cls, cells) => {
  const a = ws.addRow([cls, ...cells]);
  a.font = FONT; a.alignment = { vertical: 'top', wrapText: true };
  if (/⚠/.test(cells.join(' '))) a.getCell(6).font = { ...FONT, color: { argb: 'FF9B2C2C' }, bold: true };
  const st = cells[7] || '';
  a.getCell(9).font = { ...FONT, bold: true, color: { argb: st.startsWith('LIVE') ? 'FF2F6F4F' : /INTERIM/.test(st) ? 'FF8A6D3B' : 'FF7A5C99' } };
};
const t3 = tableOf(section(/## §3[\s\S]*?(?=## §4)/));
for (const r of t3.rows) push('I · identity (K1)', r);
const t4 = tableOf(section(/## §4[\s\S]*?(?=## §5)/));
for (const r of t4.rows) push('II · reading (K2)', r);
const t5 = tableOf(section(/## §5[\s\S]*?(?=## §6)/));
for (const r of t5.rows) push('T · template', [r[0], r[1], 'TEMPLATED', '', '', r[2], r[3], r[4]]);
[16, 30, 24, 20, 16, 26, 56, 20, 10].forEach((w, i) => { ws.getColumn(i + 1).width = w; });
ws.autoFilter = { from: { row: 2, column: 1 }, to: { row: ws.rowCount, column: COLS.length } };

// ── Sheet 2: Backlog (§8) ─────────────────────────────────────────
const t8 = tableOf(section(/## §8[\s\S]*?(?=## §9)/));
const ws8 = wb.addWorksheet('Backlog', { views: [{ state: 'frozen', ySplit: 1 }] });
addTable(ws8, t8.header, t8.rows, [50, 24, 70]);

// ── Sheet 3: UI Slot Index (§9) ───────────────────────────────────
const t9 = tableOf(section(/## §9[\s\S]*?(?=## §10)/));
const ws9 = wb.addWorksheet('UI Slot Index', { views: [{ state: 'frozen', ySplit: 1 }] });
addTable(ws9, t9.header, t9.rows, [10, 26, 84, 26]);

// ── Sheet 4: Variant Axes (§1) ────────────────────────────────────
const t1 = tableOf(section(/## §1[\s\S]*?(?=\*\*Compound tags)/));
const ws1 = wb.addWorksheet('Variant Axes', { views: [{ state: 'frozen', ySplit: 1 }] });
addTable(ws1, t1.header, t1.rows, [20, 8, 64, 22]);

// ── Sheet 5: Rules (§10) ──────────────────────────────────────────
const ws10 = wb.addWorksheet('Rules');
ws10.addRow(['Standing rules for template generation (REA_14 §10 — see the markdown for full text)']).font = { ...FONT, bold: true, size: 11 };
for (const l of section(/## §10[\s\S]*?(?=## §11)/).split('\n').filter((x) => /^\d+\./.test(x.trim()))) {
  const a = ws10.addRow([clean(l)]); a.font = FONT; a.alignment = { vertical: 'top', wrapText: true };
}
ws10.getColumn(1).width = 140;

// ── Sheet 6: Rulings queue (§11) ──────────────────────────────────
const t11 = tableOf(section(/## §11[\s\S]*?(?=\n---)/));
const ws11 = wb.addWorksheet('Rulings', { views: [{ state: 'frozen', ySplit: 1 }] });
addTable(ws11, t11.header, t11.rows, [6, 34, 110]);

fs.mkdirSync(path.dirname(OUT), { recursive: true });
await wb.xlsx.writeFile(OUT);
console.log(`✓ wrote ${OUT} (${ws.rowCount - 2} variable rows, ${wb.worksheets.length} sheets)`);
