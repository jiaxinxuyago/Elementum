// ===================================================================
// ELEMENTUM · field-map xlsx generator
// ===================================================================
// Parses the markdown tables of Reading/Documents/REA_12_Reading_Data_Field_Map.md
// and emits Reading/Database/REA_12_field_map.xlsx (the sortable twin).
// The markdown doc is canonical — edit it, then re-run:
//   node tools/build-field-map-xlsx.mjs
// ===================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MD = path.resolve(__dirname, '../../Reading/Documents/REA_12_Reading_Data_Field_Map.md');
const OUT = path.resolve(__dirname, '../../Reading/Database/REA_12_field_map.xlsx');

const md = fs.readFileSync(MD, 'utf8');

// ── parse: every "## X · Title" section that contains a pipe table ──
const sections = [];
const parts = md.split(/^## /m).slice(1);
for (const part of parts) {
  const title = part.split('\n')[0].trim();
  const lines = part.split('\n').filter((l) => l.trim().startsWith('|'));
  if (lines.length < 3) continue;
  const parseRow = (l) => l.split('|').slice(1, -1).map((c) => c.trim().replace(/\*\*/g, '').replace(/`/g, ''));
  const header = parseRow(lines[0]);
  const rows = lines.slice(2).map(parseRow);
  sections.push({ title, header, rows });
}

const wb = new ExcelJS.Workbook();
wb.creator = 'build-field-map-xlsx.mjs (generated from REA_12 markdown)';

const FONT = { name: 'Arial', size: 10 };
const HEAD_FONT = { name: 'Arial', size: 10, bold: true, color: { argb: 'FFF4EFE6' } };
const HEAD_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF584A3E' } };
const SECTION_FONT = { name: 'Arial', size: 11, bold: true, color: { argb: 'FF584A3E' } };

// Sheet 1 — the unified field map (sections A..M share the 7-col schema)
const fieldSections = sections.filter((s) => /^[A-M] /.test(s.title));
const ws = wb.addWorksheet('Field Map', { views: [{ state: 'frozen', ySplit: 2 }] });
const COLS = ['Section', 'ID', 'Field', 'Type', 'Varies by', 'Measured (words · chars)', 'Budget', '庚 example (1995-04-29 · 18:00)', 'Source of truth / notes', 'Status'];
ws.addRow(['REA_12 — Reading Data Field Map · generated from Reading/Documents/REA_12_Reading_Data_Field_Map.md — the markdown is canonical; do not hand-edit this file']);
ws.mergeCells(1, 1, 1, COLS.length);
ws.getRow(1).font = { ...FONT, italic: true, size: 9 };
const head = ws.addRow(COLS);
head.font = HEAD_FONT;
head.eachCell((c) => { c.fill = HEAD_FILL; });

for (const s of fieldSections) {
  const status = /LOCKED/.test(s.title) ? 'LOCKED' : 'WIP';
  const sectionName = s.title.replace(/ — .*/, '');
  for (const r of s.rows) {
    // uniform 8-col section tables: # | Field | Type | Varies by | Measured | Budget | Example | Source/notes
    const row = [sectionName, r[0], r[1], r[2], r[3], r[4], r[5], r[6] || '', r[7] || '', status];
    const added = ws.addRow(row);
    added.font = FONT;
    added.alignment = { vertical: 'top', wrapText: true };
    if (/⚠/.test(row.join(' '))) added.getCell(7).font = { ...FONT, color: { argb: 'FF9B2C2C' }, bold: true };
    if (status === 'WIP') added.getCell(10).font = { ...FONT, color: { argb: 'FF8A6D3B' }, bold: true };
    else added.getCell(10).font = { ...FONT, color: { argb: 'FF2F6F4F' }, bold: true };
  }
}
const widths = [16, 6, 30, 15, 20, 18, 24, 52, 40, 9];
widths.forEach((w, i) => { ws.getColumn(i + 1).width = w; });
ws.autoFilter = { from: { row: 2, column: 1 }, to: { row: ws.rowCount, column: COLS.length } };

// Sheet 2 — the variant-axis taxonomy
const tax = sections.find((s) => s.title.startsWith('0 '));
if (tax) {
  const ws2 = wb.addWorksheet('Variant Axes', { views: [{ state: 'frozen', ySplit: 1 }] });
  const h2 = ws2.addRow(tax.header);
  h2.font = HEAD_FONT; h2.eachCell((c) => { c.fill = HEAD_FILL; });
  for (const r of tax.rows) { const a = ws2.addRow(r); a.font = FONT; a.alignment = { vertical: 'top', wrapText: true }; }
  [18, 8, 64, 22].forEach((w, i) => { ws2.getColumn(i + 1).width = w; });
}

// Sheet 3 — standing rules (section N bullet list)
const rulesPart = parts.find((p) => p.startsWith('N '));
if (rulesPart) {
  const ws3 = wb.addWorksheet('Rules');
  ws3.addRow(['Standing rules for template generation (REA_12 §N — see the markdown for full text)']).font = SECTION_FONT;
  const rules = rulesPart.split('\n').filter((l) => /^\d+\./.test(l.trim()));
  for (const r of rules) {
    const a = ws3.addRow([r.trim().replace(/\*\*/g, '').replace(/`/g, '')]);
    a.font = FONT; a.alignment = { vertical: 'top', wrapText: true };
  }
  ws3.getColumn(1).width = 140;
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
await wb.xlsx.writeFile(OUT);
console.log(`✓ wrote ${OUT} (${fieldSections.length} field sections, ${ws.rowCount - 2} rows)`);
