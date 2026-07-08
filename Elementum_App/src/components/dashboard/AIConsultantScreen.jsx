// ===================================================================
// ELEMENTUM · AIConsultantScreen  (DOC5 §12 Card 4 — AI Consultant)
// ===================================================================
// Advisor chat, REAL LLM (DOC10 §4.3): messages stream from the
// elementum-llm Worker (Sonnet behind a model switch), which verifies
// the session + Advisor entitlement and enforces caps server-side.
// The chart context payload (v2.1 spec) is composed on-device and sent
// per-request; conversations live ONLY in this component's state.
// First use requires the privacy consent (chart+context leave the
// device for the AI provider — /legal §privacy). The old scripted
// buildReplies remains below solely as few-shot source material.
// ===================================================================

import { useEffect, useMemo, useRef, useState } from 'react';
import { useChart } from '../../store/chartContext.jsx';
import { useAuth } from '../../store/authContext.jsx';
import { STEM_CARD_DATA } from '../../content/index.js';
import { supabase } from '../../infra/index.js';
import { buildConsultantPayload } from './consultantPayload.js';
import siteConfig from '../../../site.config.json';
import { Icon } from '../shared/icons';
import HorizonHeader from '../guidance/HorizonHeader.jsx';
import { ink, inkSoft, inkLight, bronzeDark, silk, cream, paperHair, quietBg } from '../../styles/tokens';

const LLM_URL = siteConfig.llmWorkerUrl;
const CONSENT_KEY = 'elementum_consultant_consent_v1';
const readConsent = () => { try { return localStorage.getItem(CONSENT_KEY) === '1'; } catch { return false; } };

// Conversations are ON-DEVICE ONLY (DOC10 §4.3 owner decision — the server
// stores zero chat content). Per-account key so shared devices don't leak
// threads across sign-ins; capped so storage can't grow unbounded.
const CHAT_KEY = (uid) => `elementum_consultant_chat_v1:${uid}`;
const CHAT_CAP = 60;
const readStoredChat = (uid) => {
  if (!uid) return [];
  try {
    const arr = JSON.parse(localStorage.getItem(CHAT_KEY(uid)) || '[]');
    return Array.isArray(arr) ? arr.filter((m) => m && typeof m.text === 'string' && typeof m.role === 'string') : [];
  } catch { return []; }
};

const SELF_REPORT_KEY = 'elementum_selfreport_v1';
function readSelfReport() { try { return JSON.parse(localStorage.getItem(SELF_REPORT_KEY) || 'null'); } catch { return null; } }

// Scripted, chart-aware reflections. Rotated per user turn. Each is a function
// of the chart so it always sounds like it has read the chart. When a
// Self-Report (`sr`) is present, its life context is woven into the rotation so
// the consultant genuinely uses it — not just claims to in the context bar.
// Retained (exported) as few-shot source material for the §4.3 voice charter —
// no longer called at runtime; the worker's real model replaced it.
export function buildReplies(chart, sr) {
  const stem = chart?.dayMaster?.stem || '庚';
  const el = chart?.dayMaster?.element || 'Metal';
  const arch = STEM_CARD_DATA[stem]?.identity?.archetypeName || `${el} Day Master`;
  const cat = chart?.catalyst || 'Fire';
  const replies = [
    `Reading your chart, ${arch} doesn't usually struggle with the answer — it struggles with permission. Your ${el} nature has likely already reached a verdict here. What would change if you trusted it a day sooner than feels safe?`,
    `Your catalyst is ${cat}. When you feel stuck, it's often because you're starving that element — not because the situation is unsolvable. Where could you bring more ${cat.toLowerCase()} into this, this week?`,
    `As ${arch}, the cost you tend to underprice is the relational one — being right lands, but it can land cold. The chart isn't asking you to soften the read, only to deliver it through a warmer door.`,
    `Here's what your chart suggests: this isn't a decision problem, it's a timing one. The ${el} in you wants the clean cut now; the better move may be to let the situation finish arriving first. What are you not yet seeing?`,
  ];
  // Weave Self-Report context toward the front so it's actually used.
  if (sr) {
    const chapter = sr.chapter ? sr.chapter.toLowerCase() : null;
    const doms = Array.isArray(sr.domains) && sr.domains.length
      ? sr.domains.map((d) => d.toLowerCase()).join(' and ') : null;
    if (chapter || doms) {
      replies.unshift(
        `You told me you're in a ${chapter || 'transitional'} chapter${doms ? `, with ${doms} most alive right now` : ''} — so I'm reading this through that lens, not in the abstract. For ${arch}, a ${chapter || 'transitional'} stretch usually asks you to hold the standard without letting it harden into a wall. Where is the edge serving you here, and where is it just keeping people out?`
      );
    }
    if (sr.context && sr.context.trim()) {
      const snip = sr.context.trim();
      replies.splice(1, 0,
        `Holding what you wrote — "${snip.slice(0, 90)}${snip.length > 90 ? '…' : ''}" — against the chart: your ${el} nature wants to resolve this cleanly, but the situation you describe may need one more season of evidence before the cut lands right. What's the smallest move that keeps your options open?`
      );
    }
  }
  return replies;
}

export default function AIConsultantScreen({ onBack }) {
  const { chart, hasSelfReport } = useChart();
  const { user } = useAuth();
  // Derived-once values (recompute only if the chart / entitlement changes) —
  // useMemo, not refs, so they're never read during render via `.current`.
  const selfReport = useMemo(() => (hasSelfReport ? readSelfReport() : null), [hasSelfReport]);
  const srActive = hasSelfReport && !!selfReport;
  // The chart context sent with every request (stable string ⇒ prompt-cache hits).
  const contextPayload = useMemo(() => buildConsultantPayload(chart, selfReport), [chart, selfReport]);
  const [consented, setConsented] = useState(readConsent);
  const [busy, setBusy] = useState(false);
  const opening = srActive
    ? "I've read your chart, your Manual, and your Self-Report — I know where you actually are right now, not just what the chart says. Tell me what's on your mind."
    : "I've read your chart and your Manual. I know what the chart says — tell me what's actually on your mind. (Add a Self-Report in Guidance and I'll tune to your life context too.)";

  const [messages, setMessages] = useState(() => readStoredChat(user?.id));   // {role, text}
  const [streaming, setStreaming] = useState('');  // partial consultant text
  const [input, setInput] = useState('');
  const [contextOpen, setContextOpen] = useState(false);
  const bodyRef = useRef(null);
  const timer = useRef(null);

  // Stream a consultant message word-by-word.
  const streamReply = (full) => {
    const words = full.split(' ');
    let i = 0;
    setStreaming('');
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      i += 1;
      setStreaming(words.slice(0, i).join(' '));
      if (i >= words.length) {
        clearInterval(timer.current);
        setMessages((m) => [...m, { role: 'consultant', text: full }]);
        setStreaming('');
      }
    }, 55);
  };

  // Opening message streams once on mount — a legitimate mount-time animation
  // effect (the stream itself runs via setInterval). A restored thread resumes
  // where it left off instead of greeting again.
  useEffect(() => {
    if (!messages.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      streamReply(opening);
    }
    return () => clearInterval(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If sign-in resolves after mount, swap in that account's stored thread
  // (kills any in-flight greeting so it can't append onto restored history).
  useEffect(() => {
    if (!user?.id) return;
    const stored = readStoredChat(user.id);
    if (!stored.length) return;
    clearInterval(timer.current);
    queueMicrotask(() => { setStreaming(''); setMessages(stored); });
  }, [user?.id]);

  // Persist as the thread grows — device-local, never the server.
  useEffect(() => {
    if (!user?.id || !messages.length) return;
    try { localStorage.setItem(CHAT_KEY(user.id), JSON.stringify(messages.slice(-CHAT_CAP))); } catch { /* storage full — thread stays in-memory */ }
  }, [messages, user?.id]);

  // Auto-scroll to the latest content.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, streaming]);

  // Real send (DOC10 §4.3): session token + chart payload + rolling history →
  // the LLM worker → SSE deltas rendered into the existing streaming UI.
  const send = async () => {
    const text = input.trim();
    if (!text || streaming || busy) return;
    const history = [...messages, { role: 'user', text }];
    setMessages(history);
    setInput('');
    setBusy(true);
    setStreaming('…');
    try {
      const { data } = await supabase.auth.getSession();
      const token = data?.session?.access_token;
      if (!token) {
        setStreaming('');
        streamReply('The consultant reads from your account — sign in on the Profile tab first, then come back with your question.');
        return;
      }
      const res = await fetch(`${LLM_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          context: contextPayload,
          messages: history.slice(-12).map((m) => ({
            role: m.role === 'consultant' ? 'assistant' : 'user',
            content: m.text,
          })),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setStreaming('');
        streamReply(err.error === 'advisor required'
          ? 'The full consultant opens with Advisor access.'
          : (err.error || 'The consultant is momentarily unavailable — try again shortly.'));
        return;
      }
      // Parse the SSE stream: append text deltas as they arrive.
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = '';
      let full = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop();
        for (const line of lines) {
          if (!line.startsWith('data:')) continue;
          let ev;
          try { ev = JSON.parse(line.slice(5)); } catch { continue; /* keep-alive / partial line */ }
          if (ev.type === 'content_block_delta' && ev.delta?.text) {
            full += ev.delta.text;
            setStreaming(full);
          } else if (ev.type === 'error') {
            // Upstream error mid-stream (overloaded etc.) — arrives under HTTP 200.
            throw new Error(ev.error?.type || 'stream error');
          }
        }
      }
      // An empty stream is a failure, not a reply — never post a bare '…' bubble.
      if (!full) throw new Error('empty stream');
      setMessages((m) => [...m, { role: 'consultant', text: full }]);
      setStreaming('');
    } catch {
      setStreaming('');
      streamReply('The consultant is momentarily unavailable — try again in a moment.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', background: silk }}>
      {/* Header — horizon band (no cloud veil; chat fills the frame) */}
      <div style={{ flexShrink: 0, padding: '54px 20px 10px' }}>
        <HorizonHeader
          art="/art/fhdr-consult.png"
          bgPosition="50% 34%"
          tint="122,94,154"
          ruleColor="rgb(112,86,144)"
          eyebrow="Counsel"
          title="The Consultant"
          subtitle="Answers grounded in your whole chart"
          onBack={onBack}
        />
        <div style={{ height: 12 }} />
        {/* Context bar (collapsible) */}
        <button type="button" onClick={() => setContextOpen((o) => !o)} style={{
          appearance: 'none', background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px 0 0',
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 11.5, color: inkLight,
          display: 'inline-flex', alignItems: 'center', gap: 5,
        }}>
          <Icon id="ico-chev-r" size={12} color={inkLight} />
          {contextOpen ? 'Context loaded' : 'Context loaded — tap to view'}
        </button>
        {contextOpen && (
          <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 11.5, color: inkSoft, marginTop: 4, lineHeight: 1.5 }}>
            ✓ Full chart · ✓ Energy Manual · {srActive ? '✓ Self-Report' : '○ Self-Report (not added)'}
          </div>
        )}
      </div>

      {/* Chat history */}
      <div ref={bodyRef} style={{ flex: 1, overflowY: 'auto', padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((m, i) => <Bubble key={i} role={m.role} text={m.text} />)}
        {streaming && <Bubble role="consultant" text={streaming} cursor />}
      </div>

      {/* First-use privacy consent (required before anything leaves the device
          — /legal §privacy). Until agreed, the input is replaced by this card. */}
      {!consented ? (
        <div style={{ flexShrink: 0, padding: '14px 20px 18px', borderTop: `1px solid ${paperHair}`, background: cream }}>
          <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 12.5, lineHeight: 1.55, color: inkSoft, margin: '0 0 10px' }}>
            The consultant reads your chart. When you send a message, <strong>your chart and
            life context are sent to our AI provider (Anthropic)</strong> to compose the reply —
            they are not used for training, and your conversation is never stored on our
            servers. Details in <a href="/legal#privacy" target="_blank" rel="noopener" style={{ color: bronzeDark }}>the privacy policy</a>.
          </p>
          <button
            type="button"
            onClick={() => { try { localStorage.setItem(CONSENT_KEY, '1'); } catch { /* still allow */ } setConsented(true); }}
            style={{
              width: '100%', padding: '12px 0', borderRadius: 999, border: 'none',
              background: bronzeDark, color: silk, cursor: 'pointer',
              fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14, fontWeight: 500, letterSpacing: 0.4,
            }}
          >
            I understand — begin the conversation
          </button>
        </div>
      ) : (
      <div style={{ flexShrink: 0, padding: '10px 16px 18px', borderTop: `1px solid ${paperHair}`, display: 'flex', gap: 8, background: cream }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
          placeholder={user ? 'Ask anything about your path…' : 'Sign in (Profile tab) to consult…'}
          style={{
            flex: 1, boxSizing: 'border-box', padding: '11px 14px', borderRadius: 999,
            border: `1px solid ${paperHair}`, background: silk, color: ink,
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14,
          }} />
        <button type="button" onClick={send} disabled={!input.trim() || !!streaming || busy} aria-label="Send" style={{
          appearance: 'none', width: 44, height: 44, borderRadius: 999, border: 'none', flexShrink: 0,
          background: input.trim() && !streaming && !busy ? bronzeDark : '#D8D0C0', color: silk, cursor: input.trim() && !streaming && !busy ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon id="ico-arrow-r" size={18} color={silk} /></button>
      </div>
      )}
    </div>
  );
}

function Bubble({ role, text, cursor }) {
  const isUser = role === 'user';
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div style={{
        maxWidth: '82%', padding: '10px 14px', borderRadius: 18,
        background: isUser ? bronzeDark : quietBg,
        color: isUser ? silk : ink,
        fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14.5, lineHeight: 1.6,
        borderTopRightRadius: isUser ? 4 : 18, borderTopLeftRadius: isUser ? 18 : 4,
      }}>
        {text}{cursor && <span style={{ opacity: 0.6 }}>▍</span>}
      </div>
    </div>
  );
}
