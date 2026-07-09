// ===================================================================
// ELEMENTUM · QA report email sender (dev tooling, not shipped)
// ===================================================================
// Deterministic wrapper around the push worker's POST /report so the
// scheduled agents invoke ONE allowlistable command instead of
// hand-composing Invoke-RestMethod calls (variable shapes can never
// match a permission prefix rule — 2026-07-09 lesson).
//
//   node tools/send-report.mjs --subject "..." --text-file <path>
//   node tools/send-report.mjs --subject "..." --text "..."
//
// Key comes from the ELEMENTUM_REPORT_KEY user env var (runbook §3.4).
// Endpoint + recipient are fixed server-side — this cannot email anyone
// but the owner. Exit 0 sent · 1 failed · 2 usage/missing key.
// ===================================================================
import fs from 'node:fs';

const args = process.argv.slice(2);
const get = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : null; };
const subject = get('--subject');
const textFile = get('--text-file');
const text = textFile ? fs.readFileSync(textFile, 'utf8') : get('--text');
if (!subject || !text) { console.error('usage: node tools/send-report.mjs --subject "..." (--text-file <path> | --text "...")'); process.exit(2); }
const key = process.env.ELEMENTUM_REPORT_KEY;
if (!key) { console.error('ELEMENTUM_REPORT_KEY not set — cannot send'); process.exit(2); }

const res = await fetch('https://elementum-push.jiaxinxuyago.workers.dev/report', {
  method: 'POST',
  headers: { 'x-report-key': key, 'Content-Type': 'application/json' },
  body: JSON.stringify({ subject, text }),
});
const body = await res.text();
console.log(res.ok ? `sent: ${subject}` : `FAILED HTTP ${res.status}: ${body.slice(0, 200)}`);
// Graceful exit (no process.exit): hard-exiting with live fetch handles trips
// a libuv assertion on Windows that corrupts the exit code into noise.
process.exitCode = res.ok ? 0 : 1;
