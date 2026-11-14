// Snapshot the golden-chart pages and the other preset charts as the reader sees them (for the side-by-side).
//   TZ=Asia/Shanghai node snapshot.mjs <out.json>
process.env.TZ = 'Asia/Shanghai';
const R = '/home/user/Elementum/Elementum_App/src/';
const { calculateBaziChart } = await import(R + 'engine/calculator.js');
const { resolveAlmanac } = await import(R + 'components/dashboard/almanac/almanacResolve.js');
const fs = await import('fs');
const CHARTS = { geng: [1995, 4, 29], jia: [1995, 5, 3], ding: [1995, 5, 6], ji: [1995, 5, 8], gui: [1995, 5, 2] };
const DATES = ['2026-10-20', '2026-10-22', '2026-10-25', '2026-10-27', '2026-11-06', '2026-11-12'];
const out = {};
const pick = (m) => ({ head: m.head.text, line: [m.line.key, m.line.text], ground: [m.ground.key, m.ground.text], clause: m.landing.clause, land: m.landing.body ? [m.landing.body.key, m.landing.body.text] : null, echo: m.landing.echo ? [m.landing.echo.key, m.landing.echo.text] : null, fav: m.domains.filter((d) => d.fav && d.fav.lean).map((d) => [d.domain, d.fav.key, `${d.fav.lean} over ${d.fav.over}`]) });
for (const [k, [y, mo, d]] of Object.entries(CHARTS)) {
  const ch = calculateBaziChart({ year: y, month: mo, day: d, hour: 18, location: 'Beijing', gender: 'male' }); const bd = `${y}-0${mo}-${String(d).padStart(2, '0')}`;
  out[k] = { days: Object.fromEntries(DATES.map((dt) => [dt, pick(resolveAlmanac(ch, { kind: 'hub', date: dt, birthDate: bd }))])), month: pick(resolveAlmanac(ch, { kind: 'month', date: '2026-10-20', birthDate: bd })), year: pick(resolveAlmanac(ch, { kind: 'year', date: '2026-10-20', birthDate: bd })) };
}
fs.writeFileSync(process.argv[2], JSON.stringify(out, null, 1)); console.log('snapshot', Object.keys(out).length, 'charts');
