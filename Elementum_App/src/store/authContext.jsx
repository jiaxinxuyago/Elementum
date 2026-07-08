// ===================================================================
// ELEMENTUM · AuthContext — Supabase auth (accounts + session)
// ===================================================================
// Sign-in is OPTIONAL (DOC10): the app runs anonymously by default; auth is
// required only to purchase (attribute payment) and to restore entitlements on
// a new device. Birth data stays on-device — auth never gates the free reading.
// Entitlements (tier) are read separately (chartContext) once a session exists.
// ===================================================================
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, hasAuth } from '../infra/supabase.js';

const AuthContext = createContext(null);
// Resolved by every auth method when supabase is null (config-absent build).
const NO_AUTH = { data: null, error: { message: 'Sign-in is not configured in this build.' } };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(!hasAuth); // no backend → immediately "ready" (anonymous)

  useEffect(() => {
    if (!hasAuth) return;
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setUser(data.session?.user ?? null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => { active = false; sub.subscription.unsubscribe(); };
  }, []);

  // Config-absent builds export supabase = null (infra/supabase.js) — resolve
  // to supabase-js's { error } shape instead of throwing, so callers' error
  // paths render normally and submit buttons never strand on their busy state.

  const signUp = useCallback((email, password) => (supabase ? supabase.auth.signUp({ email, password }) : Promise.resolve(NO_AUTH)), []);
  const signIn = useCallback((email, password) => (supabase ? supabase.auth.signInWithPassword({ email, password }) : Promise.resolve(NO_AUTH)), []);
  const signInWithGoogle = useCallback(
    () => (supabase
      ? supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined },
      })
      : Promise.resolve(NO_AUTH)),
    []
  );
  const signOut = useCallback(async () => { if (supabase) await supabase.auth.signOut(); }, []);

  return (
    <AuthContext.Provider value={{ user, ready, hasAuth, signUp, signIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  // Safe fallback so components don't crash outside the provider / when auth is off.
  return ctx || {
    user: null, ready: true, hasAuth: false,
    signUp: async () => ({ error: new Error('auth unavailable') }),
    signIn: async () => ({ error: new Error('auth unavailable') }),
    signInWithGoogle: async () => {},
    signOut: async () => {},
  };
}
