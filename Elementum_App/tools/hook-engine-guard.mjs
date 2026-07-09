// ===================================================================
// ELEMENTUM · PostToolUse hook — engine regression guard
// ===================================================================
// Wired in .claude/settings.local.json (PostToolUse, matcher Edit|Write).
// Reads the hook payload from stdin; when the edited file lives under
// Elementum_App/src/engine/, runs the golden-fixture regression check
// (tools/qa-engine-regression.mjs) and, on any drift, exits 2 so the
// diff is fed straight back to Claude in-session. Silent otherwise.
// ===================================================================
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url)); // …/Elementum_App/tools

let raw = '';
process.stdin.setEncoding('utf8');
for await (const chunk of process.stdin) raw += chunk;

let filePath = '';
try { filePath = JSON.parse(raw)?.tool_input?.file_path || ''; } catch { /* no payload → not an engine edit */ }
if (!/[\\/]src[\\/]engine[\\/]/i.test(filePath)) process.exit(0);

try {
  execFileSync(process.execPath, [path.join(HERE, 'qa-engine-regression.mjs')], {
    cwd: path.dirname(HERE),
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 45000,
  });
} catch (e) {
  console.error('ENGINE REGRESSION GUARD — the edit to ' + filePath + ' changed verified engine output:');
  console.error(String(e.stdout || ''));
  console.error(String(e.stderr || ''));
  console.error('If intentional: re-verify per DEV_04_Engine_Accuracy_QA.md, then `node tools/qa-engine-regression.mjs --update`.');
  process.exit(2);
}
