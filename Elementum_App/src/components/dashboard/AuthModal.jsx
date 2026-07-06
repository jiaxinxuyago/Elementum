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
export default function AuthModal({ open, onClose, onSuccess, purchase = false }) {
  const { signUp, signIn } = useAuth();
  const [mode, setMode] = useState('signup'); // 'signup' | 'signin'
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

        <button
          type="button"
          onClick={() => { setErr(null); setMode(mode === 'signup' ? 'signin' : 'signup'); }}
          style={{ display: 'block', margin: '16px auto 0', background: 'transparent', border: 'none', color: inkLight, fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13, cursor: 'pointer' }}
        >
          {mode === 'signup' ? 'Already have an account? Sign in' : 'New here? Create an account'}
        </button>
      </div>
    </div>
  );
}
