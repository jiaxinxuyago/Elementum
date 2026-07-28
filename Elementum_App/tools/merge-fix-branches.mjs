// ===================================================================
// ELEMENTUM - guarded auto-merge for fix branches (owner-approved
// 2026-07-27: agents merge+push ONLY through this audited path).
// ===================================================================
// The ONLY sanctioned way any agent lands fix branches on main. Every
// wall the raw-git allowlist keeps is enforced here in code:
//   - merges ONLY branches named autofix/*
//   - requires main checked out, clean tree, in sync with origin
//   - aborts any branch that conflicts (skips it, never resolves blind)
//   - post-merge gates: eslint 0-errors + engine golden regression +
//     production build; ANY failure = hard rollback to the pre-merge SHA
//   - pushes to origin/main only after gates pass (NOTE: push triggers
//     the GitHub Actions deploy of elementum.life - by owner design)
//   - retires merged branches (remote delete + local prune)
//
//   node tools/merge-fix-branches.mjs <autofix/...> [autofix/...] [--dry-run]
//
// Exit: 0 = all merged+pushed - 1 = pushed but some branches skipped
//       2 = gates failed, rolled back - 3 = precondition refused
// ===================================================================
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const APP = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const ROOT = path.dirname(APP);
const git = (args, opts = {}) =>
  execSync(`git -C "${ROOT}" ${args}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...opts }).trim();
const run = (cmd, cwd) => execSync(cmd, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

const argv = process.argv.slice(2);
const dryRun = argv.includes('--dry-run');
const branches = argv.filter((a) => a !== '--dry-run');
const refuse = (msg) => { console.error(`REFUSED: ${msg}`); process.exitCode = 3; };

if (!branches.length) { refuse('no branches given. Usage: node tools/merge-fix-branches.mjs autofix/<name> ...'); process.exit(3); }
const NAME_OK = /^autofix\/[A-Za-z0-9][A-Za-z0-9._-]*$/;
for (const b of branches) if (!NAME_OK.test(b)) { refuse(`"${b}" is not an autofix/* branch - this tool merges nothing else.`); process.exit(3); }

git('fetch origin --prune');
if (git('rev-parse --abbrev-ref HEAD') !== 'main') { refuse('main is not checked out.'); process.exit(3); }
if (git('status --porcelain')) { refuse('working tree is dirty - a human (or another agent) has uncommitted work.'); process.exit(3); }
const counts = git('rev-list --left-right --count origin/main...main').split(/\s+/);
if (counts[0] !== '0' || counts[1] !== '0') { refuse(`main and origin/main have diverged (behind ${counts[0]} / ahead ${counts[1]}).`); process.exit(3); }

const startSha = git('rev-parse HEAD');
const merged = [], skipped = [];

for (const b of branches) {
  let ref = null;
  try { git(`rev-parse --verify --quiet origin/${b}`); ref = `origin/${b}`; } catch {}
  if (!ref) { try { git(`rev-parse --verify --quiet ${b}`); ref = b; } catch {} }
  if (!ref) { skipped.push({ b, why: 'branch not found (local or origin)' }); continue; }
  try {
    git(`merge --no-ff --no-edit -m "Auto-merge ${b} (fix pipeline, gated by merge-fix-branches.mjs)" ${ref}`);
    merged.push(b);
  } catch (e) {
    try { git('merge --abort'); } catch {}
    skipped.push({ b, why: 'merge conflict - left for a human or a re-based fixer' });
  }
}

if (!merged.length) {
  console.log('Nothing merged.' + (skipped.length ? ` Skipped: ${skipped.map((s) => `${s.b} (${s.why})`).join('; ')}` : ''));
  process.exitCode = skipped.length ? 1 : 0;
} else {
  // ---- Gates: the same bars every fixer already had to clear --------
  const gates = [
    { name: 'eslint 0-errors', cmd: 'npx eslint . --max-warnings=9999', cwd: APP },
    { name: 'engine golden regression', cmd: 'node tools/qa-engine-regression.mjs', cwd: APP },
    { name: 'production build', cmd: 'npm run build', cwd: APP },
  ];
  let gateFail = null;
  for (const g of gates) {
    try { run(g.cmd, g.cwd); console.log(`gate ok: ${g.name}`); }
    catch (e) {
      gateFail = { g, out: `${e.stdout || ''}\n${e.stderr || ''}`.trim().split('\n').slice(-30).join('\n') };
      break;
    }
  }

  if (gateFail) {
    git(`reset --hard ${startSha}`);
    console.error(`GATE FAILED after merge: ${gateFail.g.name} - main rolled back to ${startSha.slice(0, 7)}, nothing pushed.`);
    console.error(gateFail.out);
    process.exitCode = 2;
  } else if (dryRun) {
    git(`reset --hard ${startSha}`);
    console.log(`DRY RUN: ${merged.length} branch(es) merged clean + all gates passed; rolled back, nothing pushed.`);
  } else {
    git('push origin main');
    const endSha = git('rev-parse HEAD');
    for (const b of merged) {
      try { git(`push origin --delete ${b}`); } catch {}
      try { git(`branch -D ${b}`); } catch {}
    }
    try { git('worktree prune'); } catch {}
    console.log(`MERGED+PUSHED ${merged.length} branch(es): ${merged.join(', ')}`);
    console.log(`main: ${startSha.slice(0, 7)}..${endSha.slice(0, 7)} (GitHub Actions now deploys elementum.life)`);
    if (skipped.length) { console.log(`SKIPPED: ${skipped.map((s) => `${s.b} (${s.why})`).join('; ')}`); process.exitCode = 1; }
  }
}
