// ===================================================================
// ELEMENTUM · AIConsultantScreen  (DOC5 §12 Card 4 — AI Consultant)
// ===================================================================
// Advisor chat. There is no LLM backend in this build, so replies are
// chart-aware scripted reflections, rendered with SIMULATED token-by-
// token streaming + a blinking cursor (per DOC5's streaming spec). A
// collapsed context bar shows the "loaded" documents. Opening message
// is preloaded.
// ===================================================================

import { useEffect, useMemo, useRef, useState } from 'react';
import { useChart } from '../../store/chartContext.jsx';
import { STEM_CARD_DATA } from '../../content/index.js';
import { Icon } from '../shared/icons';
import HorizonHeader from '../guidance/HorizonHeader.jsx';
import { ink, inkSoft, inkLight, bronzeDark, silk, cream, paperHair, quietBg } from '../../styles/tokens';

const SELF_REPORT_KEY = 'elementum_selfreport_v1';
function readSelfReport() { try { return JSON.parse(localStorage.getItem(SELF_REPORT_KEY) || 'null'); } catch { return null; } }

// Scripted, chart-aware reflections. Rotated per user turn. Each is a function
// of the chart so it always sounds like it has read the chart. When a
// Self-Report (`sr`) is present, its life context is woven into the rotation so
// the consultant genuinely uses it — not just claims to in the context bar.
function buildReplies(chart, sr) {
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
  // Derived-once values (recompute only if the chart / entitlement changes) —
  // useMemo, not refs, so they're never read during render via `.current`.
  const selfReport = useMemo(() => (hasSelfReport ? readSelfReport() : null), [hasSelfReport]);
  const srActive = hasSelfReport && !!selfReport;
  const replies = useMemo(() => buildReplies(chart, selfReport), [chart, selfReport]);
  const turn = useRef(0);   // genuinely mutable per-turn counter
  const opening = srActive
    ? "I've read your chart, your Manual, and your Self-Report — I know where you actually are right now, not just what the chart says. Tell me what's on your mind."
    : "I've read your chart and your Manual. I know what the chart says — tell me what's actually on your mind. (Add a Self-Report in Guidance and I'll tune to your life context too.)";

  const [messages, setMessages] = useState([]);   // {role, text}
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
  // effect (the stream itself runs via setInterval).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    streamReply(opening);
    return () => clearInterval(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll to the latest content.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, streaming]);

  const send = () => {
    const text = input.trim();
    if (!text || streaming) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    const reply = replies[turn.current % replies.length];
    turn.current += 1;
    setTimeout(() => streamReply(reply), 350);
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

      {/* Input */}
      <div style={{ flexShrink: 0, padding: '10px 16px 18px', borderTop: `1px solid ${paperHair}`, display: 'flex', gap: 8, background: cream }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
          placeholder="Ask anything about your path…"
          style={{
            flex: 1, boxSizing: 'border-box', padding: '11px 14px', borderRadius: 999,
            border: `1px solid ${paperHair}`, background: silk, color: ink,
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14,
          }} />
        <button type="button" onClick={send} disabled={!input.trim() || !!streaming} aria-label="Send" style={{
          appearance: 'none', width: 44, height: 44, borderRadius: 999, border: 'none', flexShrink: 0,
          background: input.trim() && !streaming ? bronzeDark : '#D8D0C0', color: silk, cursor: input.trim() && !streaming ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon id="ico-arrow-r" size={18} color={silk} /></button>
      </div>
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
