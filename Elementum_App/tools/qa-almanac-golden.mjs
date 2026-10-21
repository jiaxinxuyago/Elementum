// ===================================================================
// ELEMENTUM · Your Almanac's golden check (EVT-1)
// ===================================================================
// Asserts the solar-term table, the periods, the energies, the lift, the
// leads with the freshness rule, the domain weights and the push schedule
// on the golden chart (1995-04-29 18:00 Beijing) against the values the
// owner read on the round 1–3 page (https://claude.ai/artifact/Rtixt7at5a6gTSre7ZhEhs).
// Dates are read in Beijing time.
//   node tools/qa-almanac-golden.mjs        # exit 1 on any mismatch
// ===================================================================
process.env.TZ = 'Asia/Shanghai';
const { calculateBaziChart } = await import('../src/engine/calculator.js');
const { termInstant } = await import('../src/engine/almanac/solarTerms.js');
const A = await import('../src/engine/almanac/index.js');

let fails = 0;
const eq = (what, got, want) => { if (got !== want) { fails++; console.log(`✗ ${what}\n    got  ${got}\n    want ${want}`); } };
const ch = calculateBaziChart({ year: 1995, month: 4, day: 29, hour: 18, location: 'Beijing', gender: 'male' });
const ctx = A.almanacContext(ch, { birthDate: '1995-04-29' });

// the 节 table (F1 A): within 20 minutes of the published instants
for (const [y, i, iso] of [[2024, 1, '2024-02-04T08:27Z'], [2025, 1, '2025-02-03T14:10Z'], [2027, 1, '2027-02-04T01:46Z'], [2025, 9, '2025-10-08T00:41Z']]) {
  const off = Math.abs(termInstant(y, i) - Date.parse(iso)) / 60000; if (off > 20) { fails++; console.log(`✗ term ${y}/${i} off by ${off} min`); }
}
eq('grow/release', A.ELEMENTS.map((e) => `${e}:${ctx.sign[e]}`).join(' '), 'Wood:1 Fire:1 Earth:-1 Metal:-1 Water:1');
eq('functions', A.ELEMENTS.map((e) => ctx.fn[e]).join(' '), 'Action Order Mind Body Expression');
const per = (k, d) => { const p = A.periodOf(k, d); return `${p.start}..${p.end} ${p.stem}${p.branch}`; };
eq('month', per('month', '2026-10-20'), '2026-10-08..2026-11-06 戊戌');
eq('year', per('year', '2026-10-20'), '2026-02-04..2027-02-03 丙午');
eq('year turns', per('year', '2027-02-04'), '2027-02-04..2028-02-03 丁未');
const d20 = A.readPeriod(ctx, A.periodOf('day', '2026-10-20'));
eq('20 Oct energy', `${d20.energy.el}/${d20.energy.gel} ${d20.energy.fn} ${d20.energy.state} ${d20.energy.ground} lift ${d20.lift.value}`, 'Fire/Wood Order need feeds lift 1');
eq('20 Oct domains', A.DOMAINS.map((d) => `${d}${d20.domains[d].lvl}${d20.domains[d].dir[0]}`).join(' '), 'Career3m Wealth0q Love1o Family3m Social2o Health0q Mind0q Growth0q');
const mo = A.readPeriod(ctx, A.periodOf('month', '2026-10-20'), { asOf: '2026-10-20' });
eq('month lead', `${mo.lead.key} ${mo.loud} ${mo.lift.value}`, 'clash.month 4 -0.9');
eq('leads', A.leadsFor(ctx, '2026-10-19', 26).map((r) => `${r.period.start.slice(5)}:${r.lead.key}`).join(' '),
  '10-19:bind.year 10-20:clash.hour 10-21:repeat.month 10-22:punish.day 10-23:void 10-24:quiet.劫财 10-25:clash.day 10-26:bind.month 10-27:clash.month 10-28:bind.day 10-29:frame.month 10-30:frame.hour 10-31:bind.year 11-01:clash.hour 11-02:repeat.month 11-03:punish.day 11-04:void 11-05:quiet.伤官 11-06:turned 11-07:mark.month 11-08:clash.month 11-09:bind.day 11-10:frame.month 11-11:frame.hour 11-12:return 11-13:clash.hour');
eq('push', A.pushSchedule(ctx, '2026-10-19', 35).map((x) => `${x.date.slice(5)}:${x.code}`).join(' '),
  '10-20:Fire.order.grow:clash.hour 10-25:Water.expression.grow:clash.day 10-27:Wood.action.grow:clash.month 11-01:Earth.mind.release:clash.hour 11-06:Wood.action.grow:turned 11-07:Wood.action.grow:mark.month 11-12:Metal.body.release:return 11-15:Water.expression.grow:clash.year 11-18:Fire.order.grow:clash.day 11-20:Earth.mind.release:clash.month');

console.log(fails ? `${fails} mismatch(es)` : 'almanac golden: all match');
process.exit(fails ? 1 : 0);
