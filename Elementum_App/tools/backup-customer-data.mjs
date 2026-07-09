// ===================================================================
// ELEMENTUM · customer-data backup (PM_02 HK-1 — the money tables)
// ===================================================================
// Nightly export of the ONLY server-side customer data to local disk +
// OneDrive: entitlements (who owns what), the auth.users id↔email map
// (the decoder ring that makes a Supabase project loss recoverable —
// Stripe's client_reference_id re-links through it), and
// push_subscriptions (courtesy; users can resubscribe).
//
// Contains customer emails (PII) ⇒ destinations are OFF-git by design.
// Free-tier Supabase has no point-in-time recovery; this is the backstop.
//
// Run:      node tools/backup-customer-data.mjs
// Needs:    ELEMENTUM_SUPABASE_SERVICE_KEY user env var (set once via
//           tools/setup-backup-key.ps1 — hidden prompt, never in chat/history)
// Schedule: Windows Task Scheduler "Elementum Customer Data Backup", nightly
//           02:45 (registered alongside the QA detector; PM_01 §machine-local)
// Failure:  writes BACKUP_FAILED.md at the project root (hygiene preflight
//           surfaces sentinels) and exits 1.
// ===================================================================
import { mkdirSync, writeFileSync, copyFileSync, readdirSync, unlinkSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '../..');
const SUPABASE_URL = 'https://nbactbfxqslzehzbgetp.supabase.co';
const KEY = process.env.ELEMENTUM_SUPABASE_SERVICE_KEY;
const LOCAL_DIR = 'D:/Elementum/Backups/customer-data';
const ONEDRIVE_DIR = 'C:/Users/NOBOD/OneDrive/Desktop/LanternDigital/Backups/customer-data';
const KEEP = 30;
const SENTINEL = resolve(PROJECT_ROOT, 'BACKUP_FAILED.md');

const headers = { apikey: KEY, Authorization: `Bearer ${KEY}` };

async function rest(table) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, { headers });
  if (!res.ok) throw new Error(`${table}: HTTP ${res.status} ${(await res.text()).slice(0, 120)}`);
  return res.json();
}

async function authUsers() {
  // Auth Admin API, paginated — we only keep the id↔email map (+ dates).
  const users = [];
  for (let page = 1; page <= 50; page++) {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?page=${page}&per_page=200`, { headers });
    if (!res.ok) throw new Error(`auth users p${page}: HTTP ${res.status} ${(await res.text()).slice(0, 120)}`);
    const batch = (await res.json()).users || [];
    users.push(...batch.map((u) => ({ id: u.id, email: u.email, created_at: u.created_at, last_sign_in_at: u.last_sign_in_at })));
    if (batch.length < 200) break;
  }
  return users;
}

function rotate(dir) {
  const files = readdirSync(dir).filter((f) => f.startsWith('customer-data_')).sort();
  for (const f of files.slice(0, Math.max(0, files.length - KEEP))) unlinkSync(resolve(dir, f));
}

try {
  if (!KEY) throw new Error('ELEMENTUM_SUPABASE_SERVICE_KEY is not set — run tools/setup-backup-key.ps1 once.');

  const [entitlements, pushSubs, users] = await Promise.all([
    rest('entitlements'), rest('push_subscriptions'), authUsers(),
  ]);
  if (!users.length) throw new Error('auth users export came back EMPTY — refusing to write a useless snapshot.');

  const snapshot = {
    exportedAt: new Date().toISOString(),
    supabaseProject: SUPABASE_URL,
    counts: { entitlements: entitlements.length, users: users.length, push_subscriptions: pushSubs.length },
    tables: { entitlements, auth_users: users, push_subscriptions: pushSubs },
  };

  const stamp = new Date().toISOString().slice(0, 10);
  const name = `customer-data_${stamp}.json`;
  mkdirSync(LOCAL_DIR, { recursive: true });
  mkdirSync(ONEDRIVE_DIR, { recursive: true });
  const localPath = resolve(LOCAL_DIR, name);
  writeFileSync(localPath, JSON.stringify(snapshot, null, 1));
  copyFileSync(localPath, resolve(ONEDRIVE_DIR, name));
  rotate(LOCAL_DIR);
  rotate(ONEDRIVE_DIR);

  // A good run clears any stale failure sentinel.
  if (existsSync(SENTINEL)) unlinkSync(SENTINEL);
  console.log(`backup OK — ${snapshot.counts.entitlements} entitlements, ${snapshot.counts.users} users, ${snapshot.counts.push_subscriptions} push subs → ${localPath} (+OneDrive)`);
} catch (err) {
  const msg = `# BACKUP FAILED — customer data\n\n${new Date().toISOString()}\n\n${err.message}\n\nFix and rerun: \`node Elementum_App/tools/backup-customer-data.mjs\` (see PM_01).\n`;
  try { writeFileSync(SENTINEL, msg); } catch { /* even the sentinel failed — stderr below still tells the story */ }
  console.error('BACKUP FAILED:', err.message);
  process.exit(1);
}
