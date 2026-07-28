// ===================================================================
// ELEMENTUM · reading-data-variables xlsx generator
// ===================================================================
// Parses Reading/Documents/REA_12_Reading_Data_Variables.md (canonical)
// and emits Reading/Database/REA_12_reading_data_variables.xlsx.
// Sheets: Variables (the §2 registry, unified) · UI Slot Index (§3) ·
// Variant Axes (§1) · Rules (§4) · Rulings (§5).
// Edit the markdown, then re-run:  node tools/build-field-map-xlsx.mjs
// ===================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MD = path.resolve(__dirname, '../../Reading/Documents/REA_12_Reading_Data_Variables.md');
const OUT = path.resolve(__dirname, '../../Reading/Database/REA_12_reading_data_variables.xlsx');

const md = fs.readFileSync(MD, 'utf8');
const clean = (c) => c.trim().replace(/\*\*/g, '').replace(/`/g, '');
const tableOf = (chunk) => {
  const lines = chunk.split('\n').filter((l) => l.trim().startsWith('|'));
  if (lines.length < 3) return null;
  const parse = (l) => l.split('|').slice(1, -1).map(clean);
  return { header: parse(lines[0]), rows: lines.slice(2).map(parse) };
};
const section = (re) => { const m = md.match(re); return m ? m[0] : ''; };

const wb = new ExcelJS.Workbook();
wb.creator = 'build-field-map-xlsx.mjs (generated from REA_12 markdown — the markdown is canonical)';
const FONT = { name: 'Arial', size: 10 };
const HEAD_FONT = { name: 'Arial', size: 10, bold: true, color: { argb: 'FFF4EFE6' } };
const HEAD_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF584A3E' } };
const addTable = (ws, header, rows, widths) => {
  const h = ws.addRow(header);
  h.font = HEAD_FONT; h.eachCell((c) => { c.fill = HEAD_FILL; });
  for (const r of rows) { const a = ws.addRow(r); a.font = FONT; a.alignment = { vertical: 'top', wrapText: true }; }
  widths.forEach((w, i) => { ws.getColumn(i + 1).width = w; });
};

// ── Sheet 1: Variables (unified §2 registry) ──────────────────────
const ws = wb.addWorksheet('Variables', { views: [{ state: 'frozen', ySplit: 2 }] });
ws.addRow(['REA_12 — Reading Data Variables · generated from Reading/Documents/REA_12_Reading_Data_Variables.md — markdown is canonical, do not hand-edit']);
ws.mergeCells(1, 1, 1, 9);
ws.getRow(1).font = { ...FONT, italic: true, size: 9 };
const COLS = ['Class', 'Variable', 'Type / Pattern', 'Axis', 'Measured', 'Budget', '庚 example (1995-04-29 · 18:00)', 'UI slots', 'Status'];
const head = ws.addRow(COLS);
head.font = HEAD_FONT; head.eachCell((c) => { c.fill = HEAD_FILL; });

const push = (cls, cells) => {
  const a = ws.addRow([cls, ...cells]);
  a.font = FONT; a.alignment = { vertical: 'top', wrapText: true };
  if (/⚠/.test(cells.join(' '))) a.getCell(6).font = { ...FONT, color: { argb: 'FF9B2C2C' }, bold: true };
  const st = cells[7] || '';
  a.getCell(9).font = { ...FONT, bold: true, color: { argb: st.startsWith('LIVE') ? 'FF2F6F4F' : /INTERIM/.test(st) ? 'FF8A6D3B' : 'FF7A5C99' } };
};
const tV = tableOf(section(/### §2\.V[\s\S]*?(?=### §2\.A)/));
for (const r of tV.rows) push('V · vocabulary', r);           // Var|Type|Axis|Measured|Budget|Example|Slots|Status
const tA = tableOf(section(/### §2\.A[\s\S]*?(?=### §2\.T)/));
for (const r of tA.rows) push('A · archetype', r);
const tT = tableOf(section(/### §2\.T[\s\S]*?(?=### §2\.D)/));
for (const r of tT.rows) push('T · template', [r[0], r[1], r[2], '', '', r[3], r[4], r[5]]); // Var|Pattern|Axis|Example|Slots|Status
const tD = tableOf(section(/### §2\.D[\s\S]*?(?=### §2\.B)/));
for (const r of tD.rows) push('D · derived', [r[0], 'derived input', 'DERIVED', '', 'never authored', r[1], r[2], 'LIVE']);
[16, 34, 26, 22, 16, 26, 56, 22, 10].forEach((w, i) => { ws.getColumn(i + 1).width = w; });
ws.autoFilter = { from: { row: 2, column: 1 }, to: { row: ws.rowCount, column: COLS.length } };

// backlog note row
const backlog = section(/### §2\.B[\s\S]*?(?=\n---)/).split('\n').slice(2).join(' ').trim();
if (backlog) {
  const a = ws.addRow(['B · backlog', 'unsurfaced corpus (fate: REA_04 §7 #4)', '', '', '', '', clean(backlog).slice(0, 900), '—', 'BACKLOG']);
  a.font = { ...FONT, italic: true }; a.alignment = { vertical: 'top', wrapText: true };
}

// ── Sheet 2: UI Slot Index (§3) ───────────────────────────────────
const t3 = tableOf(section(/## §3[\s\S]*?(?=\n---)/));
const ws2 = wb.addWorksheet('UI Slot Index', { views: [{ state: 'frozen', ySplit: 1 }] });
addTable(ws2, t3.header, t3.rows, [10, 26, 80, 28]);

// ── Sheet 3: Variant Axes (§1) ────────────────────────────────────
const t1 = tableOf(section(/## §1[\s\S]*?(?=\n\*\*Variable classes)/));
const ws3 = wb.addWorksheet('Variant Axes', { views: [{ state: 'frozen', ySplit: 1 }] });
addTable(ws3, t1.header, t1.rows, [20, 8, 64, 22]);

// ── Sheet 4: Rules (§4) ───────────────────────────────────────────
const ws4 = wb.addWorksheet('Rules');
ws4.addRow(['Standing rules for template generation (REA_12 §4 — see the markdown for full text)']).font = { ...FONT, bold: true, size: 11 };
for (const l of section(/## §4[\s\S]*?(?=## §5)/).split('\n').filter((x) => /^\d+\./.test(x.trim()))) {
  const a = ws4.addRow([clean(l)]); a.font = FONT; a.alignment = { vertical: 'top', wrapText: true };
}
ws4.getColumn(1).width = 140;

// ── Sheet 5: Rulings queue (§5) ───────────────────────────────────
const t5 = tableOf(section(/## §5[\s\S]*$/));
const ws5 = wb.addWorksheet('Rulings', { views: [{ state: 'frozen', ySplit: 1 }] });
addTable(ws5, t5.header, t5.rows, [6, 30, 100]);

fs.mkdirSync(path.dirname(OUT), { recursive: true });
await wb.xlsx.writeFile(OUT);
console.log(`✓ wrote ${OUT} (${ws.rowCount - 2} variable rows, 5 sheets)`);
