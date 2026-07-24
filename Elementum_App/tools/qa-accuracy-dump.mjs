// ===================================================================
// ELEMENTUM · Engine Accuracy QA — full chart dump for cross-checking
// ===================================================================
// Run AFTER ANY engine code change (see DevLog_Docs/Development/
// DEV_04_Engine_Accuracy_QA.md). Prints every dimension a reference BaZi site
// exposes, so each can be compared by eye:
//   Four Pillars · stem Ten Gods · Day Master strength/band/pattern ·
//   element scores + dominance % · catalyst · 合冲刑害 patterns.
// Usage:  node tools/qa-accuracy-dump.mjs
// ===================================================================
import { calculateBaziChart, getEnergyBand } from '../src/engine/calculator.js';
import { buildEnergyChart } from '../src/engine/buildEnergyChart.js';

import { CASES } from './qa-cases.mjs';

const tg = g => g ? `${g.zh}(${g.en})` : '—';

for (const c of CASES) {
  const chart = calculateBaziChart(c);
  const ec = buildEnergyChart(chart);
  const P = chart.pillars;
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`${c.label}  ·  ${c.year}-${String(c.month).padStart(2,'0')}-${String(c.day).padStart(2,'0')} ${c.hour}:00 ${c.location} ${c.gender}`);
  console.log('FOUR PILLARS (year · month · day · hour):');
  console.log('   ', `${P.year.stem}${P.year.branch}`, `${P.month.stem}${P.month.branch}`, `${P.day.stem}${P.day.branch}`, `${P.hour.stem}${P.hour.branch}`);
  console.log('STEM TEN GODS:', tg(chart.tenGods.yearStem), '·', tg(chart.tenGods.monthStem), '· 日主 ·', tg(chart.tenGods.hourStem));
  console.log('DAY MASTER  :', chart.dayMaster.stem, chart.dayMaster.element, chart.dayMaster.polarity,
              '| strength', chart.dayMaster.strength, `(${chart.dayMaster.strengthScore})`,
              '| band', getEnergyBand(chart.dayMaster.strength), '| pattern', chart.tgPattern, '| catalyst', chart.catalyst);
  console.log('ELEMENT SCORES → DOMINANCE %:');
  for (const e of ec.energies) {
    const sc = chart.elements[e.el[0].toUpperCase()+e.el.slice(1)]?.score ?? 0;
    console.log(`   ${e.el.padEnd(6)} ${String(e.presence).padStart(3)}%  (score ${sc.toFixed(3)})  roles=[${e.roles}]  lead=${e.leadGod}  faces=${e.faces.map(f=>`${f.god}/${f.polarity}`).join(',')||'—'}`);
  }
  console.log('PATTERNS 合冲刑害:', (chart.patterns||[]).map(p=>`${p.zh}(${(p.branches||[]).join('')})`).join('  ') || 'none');
}
