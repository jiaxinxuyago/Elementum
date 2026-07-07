// ===================================================================
// ELEMENTUM · AuthModal — email/password sign-in / create-account sheet
// ===================================================================
// Bottom-sheet (mirrors UpgradeModal). Sign-in is optional (DOC10): the copy
// makes clear birth data stays on-device and an account only keeps unlocks +
// restores them across devices. Google button is added with the Google OAuth
// setup (follow-on); email/password works today.
// ===================================================================
import { useState } from 'react';
import { useAuth } from '../../store/authContext.jsx';
import { Icon } from '../shared/icons';
import { ink, inkSoft, inkLight, bronzeDark, cream } from '../../styles/tokens';

const inputStyle = {
  width: '100%', padding: '12px 14px', marginBottom: 10, borderRadius: 10,
  border: '1px solid #D8CFBE', background: '#FFFFFF',
  fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15, color: '#2B2722',
  boxSizing: 'border-box',
};

// `purchase` — purchase-context variant: copy explains the account exists to own
// the pass, and onSuccess(user) fires after auth (the caller continues to Stripe).
// Google OAuth is a FULL-PAGE redirect (away to Google, back to the app), so a
// purchase-context sign-in stores its `intent` first ('founding' | 'selfreport');
// on return, that product's intent consumer continues straight to its Stripe
// checkout (UpgradeModalHost handles 'founding'; SelfReportScreen 'selfreport').
export const PURCHASE_INTENT_KEY = 'elementum_purchase_intent_v1';

// `initialMode` — which face the sheet opens with: 'signup' (default; purchase +
// profile flows) or 'signin' (the Welcome screen's returning-user entrance).
export default function AuthModal({ open, onClose, onSuccess, purchase = false, initialMode = 'signup', intent = 'founding' }) {
  const { signUp, signIn, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState(initialMode); // 'signup' | 'signin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setErr(null); setBusy(true);
    const { data, error } = await (mode === 'signup' ? signUp : signIn)(email.trim(), password);
    setBusy(false);
    if (error) { setErr(error.message); return; }
    onClose?.();
    onSuccess?.(data?.user || null);
  };

  const eyebrow = purchase
    ? (mode === 'signup' ? 'One step before checkout' : 'Welcome back')
    : (mode === 'signup' ? 'Create account' : 'Welcome back');
  const title = purchase
    ? 'Make your pass yours'
    : (mode === 'signup' ? 'Save your readings' : 'Sign in');
  const blurb = purchase
    ? 'Your Founding Pass is tied to this account — so it’s yours forever, restorable on any device. Birth data stays on this device.'
    : 'Your birth data stays on this device — an account just keeps your unlocks and lets you restore them on any device.';

  return (
    <div
      // stopPropagation: when stacked above the paywall sheet, dismissing the
      // auth scrim must not also dismiss the paywall underneath.
      onClick={(e) => { e.stopPropagation(); onClose?.(); }}
      style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 210, display: 'flex', alignItems: 'flex-end' }}
    >
      <div
        role="dialog" aria-modal="true" aria-label="Sign in"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative', width: '100%', background: cream,
          borderRadius: '24px 24px 0 0', padding: '28px 22px 34px',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.12)',
          animation: 'authUp 350ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <style>{`@keyframes authUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
        <button
          type="button" aria-label="Close" onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: 999, background: 'transparent', border: 'none', color: inkLight, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon id="ico-dismiss" size={18} />
        </button>

        <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: bronzeDark, fontWeight: 500, marginBottom: 6, marginTop: 4 }}>
          {eyebrow}
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 400, lineHeight: 1.15, color: ink, margin: '0 0 6px' }}>
          {title}
        </h2>
        <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13.5, color: inkSoft, lineHeight: 1.5, margin: '0 0 18px' }}>
          {blurb}
        </p>

        <form onSubmit={submit}>
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" style={inputStyle} />
          <input type="password" required minLength={6} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} style={inputStyle} />
          {err && <div style={{ color: '#B0452F', fontFamily: "'EB Garamond', Georgia, serif", fontSize: 12.5, margin: '2px 2px 10px' }}>{err}</div>}
          <button
            type="submit" disabled={busy}
            style={{ width: '100%', padding: '13px 0', borderRadius: 999, border: 'none', background: bronzeDark, color: '#F8F6F0', fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', cursor: busy ? 'default' : 'pointer', opacity: busy ? 0.7 : 1 }}
          >
            {busy ? 'One moment…' : purchase ? 'Continue to checkout' : (mode === 'signup' ? 'Create account' : 'Sign in')}
          </button>
        </form>

        {/* — or — divider + Google */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0 12px' }}>
          <span style={{ flex: 1, height: 1, background: '#DDD4C2' }} />
          <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: inkLight }}>or</span>
          <span style={{ flex: 1, height: 1, background: '#DDD4C2' }} />
        </div>
        <button
          type="button"
          onClick={async () => {
            setErr(null);
            // Full-page redirect ahead — persist the purchase intent so the
            // return trip continues to checkout instead of stranding the buyer.
            try {
              if (purchase) sessionStorage.setItem(PURCHASE_INTENT_KEY, intent);
              else sessionStorage.removeItem(PURCHASE_INTENT_KEY);
            } catch { /* storage unavailable — sign-in still works */ }
            const { error } = (await signInWithGoogle()) || {};
            if (error) setErr(error.message);
          }}
          style={{
            width: '100%', padding: '12px 0', borderRadius: 999,
            border: '1px solid #D8CFBE', background: '#FFFFFF',
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15, color: ink,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}
        >
          <svg width="17" height="17" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.7 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.2 17.7 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.7 6c4.5-4.2 6.9-10.4 6.9-17.7z"/>
            <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z"/>
            <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.6l-7.7-6c-2.1 1.4-4.7 2.2-7.5 2.2-6.3 0-11.6-3.7-13.5-8.9l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        <button
          type="button"
          onClick={() => { setErr(null); setMode(mode === 'signup' ? 'signin' : 'signup'); }}
          style={{ display: 'block', margin: '14px auto 0', background: 'transparent', border: 'none', color: inkLight, fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13, cursor: 'pointer' }}
        >
          {mode === 'signup' ? 'Already have an account? Sign in' : 'New here? Create an account'}
        </button>
      </div>
    </div>
  );
}
