// ===================================================================
// ELEMENTUM · AuthContext — Supabase auth (accounts + session)
// ===================================================================
// Sign-in is OPTIONAL (INF_01): the app runs anonymously by default; auth is
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
  // True after the reader opens a password-reset link: Supabase signs them in
  // with a recovery session, and PasswordRecoveryModal asks for a new password.
  const [recovery, setRecovery] = useState(false);

  useEffect(() => {
    if (!hasAuth) return;
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setUser(data.session?.user ?? null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'PASSWORD_RECOVERY') setRecovery(true);
    });
    return () => { active = false; sub.subscription.unsubscribe(); };
  }, []);

  // Config-absent builds export supabase = null (infra/supabase.js) — resolve
  // to supabase-js's { error } shape instead of throwing, so callers' error
  // paths render normally and submit buttons never strand on their busy state.

  // Links in auth emails return to the origin the reader started from.
  const origin = typeof window !== 'undefined' ? window.location.origin : undefined;
  const signUp = useCallback((email, password) => (supabase ? supabase.auth.signUp({ email, password, options: { emailRedirectTo: origin } }) : Promise.resolve(NO_AUTH)), [origin]);
  // Sends the sign-up confirmation email again (Resend SMTP, INF_02 §1.1).
  const resendConfirmation = useCallback((email) => (supabase ? supabase.auth.resend({ type: 'signup', email, options: { emailRedirectTo: origin } }) : Promise.resolve(NO_AUTH)), [origin]);
  // Forgot password: emails a link back to the app; its return trip fires
  // PASSWORD_RECOVERY (above) and updatePassword() finishes the reset.
  const resetPassword = useCallback((email) => (supabase ? supabase.auth.resetPasswordForEmail(email, { redirectTo: origin }) : Promise.resolve(NO_AUTH)), [origin]);
  const updatePassword = useCallback((password) => (supabase ? supabase.auth.updateUser({ password }) : Promise.resolve(NO_AUTH)), []);
  const endRecovery = useCallback(() => setRecovery(false), []);
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
    <AuthContext.Provider value={{ user, ready, hasAuth, signUp, signIn, signInWithGoogle, signOut, resendConfirmation, resetPassword, updatePassword, recovery, endRecovery }}>
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
    resendConfirmation: async () => ({ error: new Error('auth unavailable') }),
    resetPassword: async () => ({ error: new Error('auth unavailable') }),
    updatePassword: async () => ({ error: new Error('auth unavailable') }),
    recovery: false,
    endRecovery: () => {},
  };
}
