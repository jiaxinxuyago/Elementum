// ─────────────────────────────────────────────────────────────────────────────
// INFRA · Supabase client (single instance)
// ─────────────────────────────────────────────────────────────────────────────
// Public creds come from site.config.json (the publishable key is meant to ship
// in the client — security is enforced by Row-Level Security, DOC10 §3/§4.2).
// Null-safe: if config is absent, the app still runs anonymously (auth-gated
// features stay signed-out) instead of crashing at import.
// ─────────────────────────────────────────────────────────────────────────────
import { createClient } from '@supabase/supabase-js';
import siteConfig from '../../site.config.json';

const url = siteConfig.supabaseUrl;
const key = siteConfig.supabaseAnonKey;

export const supabase = url && key ? createClient(url, key) : null;
export const hasAuth = !!supabase;
