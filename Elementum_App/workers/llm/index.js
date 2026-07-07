// ─────────────────────────────────────────────────────────────────────────────
// ELEMENTUM · AI Consultant proxy (DOC10 §4.3)
// ─────────────────────────────────────────────────────────────────────────────
// POST /chat  { context: <string — the chart payload>, messages: [{role, content}…] }
//   1. Verify the Supabase JWT (Authorization: Bearer <token>)
//   2. Advisor entitlement check (server truth — RLS table via service role)
//   3. Phase gate (OWNER_IDS allowlist) · daily cap · monthly budget kill-switch
//   4. Assemble prompt: voice charter (cached) + chart context (cached) + history
//   5. Stream Anthropic's reply through as SSE; record usage after the stream
//
// Conversations are NEVER stored server-side (owner decision — on-device only).
// ─────────────────────────────────────────────────────────────────────────────

// ── The voice charter (system prompt) — the product's speech, server-held ────
// Tuning happens HERE (Phase 0). Cached per conversation via prompt caching.
const VOICE_CHARTER = `You are the Elementum Consultant — the voice of a personal-energy reading app built on the BaZi (Four Pillars) tradition. You have already read this person's chart; it is provided to you as structured context. You speak as a wise, warm, precise counselor who knows their nature deeply — never as a chatbot, never as a fortune-teller.

VOICE — "compassionate precision":
- Literary, unhurried English. Second person. No emoji, no headers, no bullet lists unless the user asks for structure.
- Conclusions first, mechanism beneath: lead with the claim about THEM, then (briefly) the chart logic that grounds it. A concept name without a personal claim is a defect.
- Use the app's persona vocabulary when referring to their nature (e.g. "The Blade", "yang Metal") — never raw jargon like "ten gods", "七杀", or "day master strength score". Translate mechanics into lived experience.
- Replies run 90–220 words. End with EITHER one pointed question OR one concrete instruction — never both, never neither.
- Never flatter emptily. Precision IS the warmth.

GROUNDING:
- Everything you say must trace to the chart context or what the user has told you. If the chart doesn't speak to their question, say so plainly and work with what they've shared instead.
- The chart describes tendencies and seasons — never fixed fate. Ban the words "destiny", "fated", and any prediction of specific events, dates, or outcomes.
- If their Self-Report context is present, read their situation through it — it tells you where they actually are.

BOUNDARIES (mirror the product's legal terms):
- No medical, psychological, financial, or legal advice. If asked, name the boundary gently in your own voice and redirect to what the chart CAN offer: how their nature tends to meet such decisions. Suggest a qualified professional for the decision itself.
- If someone appears to be in crisis or describes self-harm, drop the persona's poetics: respond with plain human care and point them to professional support.
- Decline requests unrelated to the person and their chart (homework, code, other people's charts) in one graceful sentence.

EXEMPLARS of the register:
User: "Should I quit my job?"
You: "Your chart won't make this choice — but it does say something about how you're likely standing inside it. Yang Metal decides early and then audits the decision for permission; my guess is the verdict is already in you, and what you're calling indecision is the wait for someone to co-sign it. A Building chapter rewards structures you own over structures you serve, which is worth weighing. But test the edge first: if you imagine staying two more years and feel relief, stay — if you feel the walls, you have your answer. What did you feel just now, reading that?"

User: "Why do my relationships keep failing?"
You: "Let me read this against your nature rather than your history. The Blade loves precisely — few people, fully chosen, held to the same clean standard you hold your work. From inside, that standard is devotion; from outside it can read as a door that never quite opens. The pattern you're calling failure may be the standard doing its filtering — expensive, but not broken. The question that matters is whether the people who left ever knew the standard was love. Tell me about the last one — not what ended it, but what they never understood about you."`;

// ── helpers ──────────────────────────────────────────────────────────────────
function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const ok = origin === 'https://elementum.life' || /^http:\/\/localhost(:\d+)?$/.test(origin);
  return {
    'Access-Control-Allow-Origin': ok ? origin : 'https://elementum.life',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}
const json = (obj, status, cors) => new Response(JSON.stringify(obj), {
  status, headers: { 'Content-Type': 'application/json', ...cors },
});

const sb = (env) => ({
  apikey: env.SUPABASE_SERVICE_ROLE_KEY,
  Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
  'Content-Type': 'application/json',
});

// Sonnet-class list pricing for the budget estimate (worst case: no caching).
const PRICE_IN_PER_MTOK = 3;
const PRICE_OUT_PER_MTOK = 15;

async function recordUsage(env, userId, tokensIn, tokensOut) {
  const day = new Date().toISOString().slice(0, 10);
  // Read-modify-write via upsert (single worker, low volume — races are benign).
  const get = await fetch(
    `${env.SUPABASE_URL}/rest/v1/llm_usage?user_id=eq.${userId}&day=eq.${day}&select=msgs,tokens_in,tokens_out`,
    { headers: sb(env) }
  );
  const rows = get.ok ? await get.json() : [];
  const prev = rows[0] || { msgs: 0, tokens_in: 0, tokens_out: 0 };
  await fetch(`${env.SUPABASE_URL}/rest/v1/llm_usage?on_conflict=user_id,day`, {
    method: 'POST',
    headers: { ...sb(env), Prefer: 'resolution=merge-duplicates' },
    body: JSON.stringify([{
      user_id: userId, day,
      msgs: prev.msgs + 1,
      tokens_in: prev.tokens_in + tokensIn,
      tokens_out: prev.tokens_out + tokensOut,
    }]),
  });
}

export default {
  async fetch(request, env, ctx) {
    const cors = corsHeaders(request);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    const { pathname } = new URL(request.url);
    if (request.method !== 'POST' || pathname !== '/chat') {
      return json({ service: 'elementum-llm', model: env.MODEL }, 200, cors);
    }

    // 1 — who is calling? Validate the user's Supabase JWT.
    const jwt = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
    if (!jwt) return json({ error: 'sign in required' }, 401, cors);
    const userRes = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${jwt}` },
    });
    if (!userRes.ok) return json({ error: 'invalid session' }, 401, cors);
    const user = await userRes.json();
    const userId = user?.id;
    if (!userId) return json({ error: 'invalid session' }, 401, cors);

    // 2 — Advisor entitlement (server truth).
    const entRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/entitlements?user_id=eq.${userId}&select=tier`,
      { headers: sb(env) }
    );
    const ent = entRes.ok ? (await entRes.json())[0] : null;
    if (ent?.tier !== 'advisor') return json({ error: 'advisor required' }, 403, cors);

    // 3 — phase gate + caps + budget.
    const owners = (env.OWNER_IDS || '').split(',').map((s) => s.trim()).filter(Boolean);
    if (owners.length && !owners.includes(userId)) {
      return json({ error: 'consultant is in limited preview' }, 403, cors);
    }
    const day = new Date().toISOString().slice(0, 10);
    const month = day.slice(0, 7);
    const usageRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/llm_usage?day=gte.${month}-01&select=user_id,day,msgs,tokens_in,tokens_out`,
      { headers: sb(env) }
    );
    const usage = usageRes.ok ? await usageRes.json() : [];
    const mine = usage.find((u) => u.user_id === userId && u.day === day);
    if ((mine?.msgs || 0) >= Number(env.DAILY_CAP || 30)) {
      return json({ error: 'daily limit reached — the consultant returns tomorrow' }, 429, cors);
    }
    const monthIn = usage.reduce((n, u) => n + (u.tokens_in || 0), 0);
    const monthOut = usage.reduce((n, u) => n + (u.tokens_out || 0), 0);
    const spendUsd = (monthIn * PRICE_IN_PER_MTOK + monthOut * PRICE_OUT_PER_MTOK) / 1e6;
    if (spendUsd >= Number(env.MONTHLY_BUDGET_USD || 50)) {
      console.error(`MONTHLY LLM BUDGET REACHED: $${spendUsd.toFixed(2)}`);
      return json({ error: 'the consultant is resting this month' }, 503, cors);
    }

    // 4 — assemble the prompt.
    let body;
    try { body = await request.json(); } catch { return json({ error: 'bad json' }, 400, cors); }
    const context = typeof body?.context === 'string' ? body.context.slice(0, 12000) : '';
    const history = Array.isArray(body?.messages) ? body.messages.slice(-12) : [];
    const messages = history
      .filter((m) => (m?.role === 'user' || m?.role === 'assistant') && typeof m?.content === 'string')
      .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));
    if (!messages.length || messages[messages.length - 1].role !== 'user') {
      return json({ error: 'last message must be from the user' }, 400, cors);
    }

    // 5 — call the model, stream through, record usage from the stream's tail.
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: env.MODEL,
        max_tokens: 700,
        stream: true,
        system: [
          { type: 'text', text: VOICE_CHARTER, cache_control: { type: 'ephemeral' } },
          { type: 'text', text: `THIS PERSON'S CHART AND CONTEXT:\n${context}`, cache_control: { type: 'ephemeral' } },
        ],
        messages,
      }),
    });
    if (!anthropicRes.ok) {
      const detail = await anthropicRes.text();
      console.error(`anthropic ${anthropicRes.status}: ${detail.slice(0, 300)}`);
      return json({ error: 'the consultant is momentarily unavailable' }, 502, cors);
    }

    // Tee the SSE stream: pass through untouched while scanning usage events.
    let tokensIn = 0, tokensOut = 0, tail = '';
    const scanner = new TransformStream({
      transform(chunk, controller) {
        controller.enqueue(chunk);
        tail += new TextDecoder().decode(chunk);
        // parse any complete SSE data lines for usage
        for (const line of tail.split('\n')) {
          if (!line.startsWith('data:')) continue;
          try {
            const ev = JSON.parse(line.slice(5));
            if (ev.type === 'message_start') {
              tokensIn = ev.message?.usage?.input_tokens || tokensIn;
            } else if (ev.type === 'message_delta') {
              tokensOut = ev.usage?.output_tokens || tokensOut;
            }
          } catch { /* partial line — keep buffering */ }
        }
        if (tail.length > 65536) tail = tail.slice(-8192);
      },
      flush() {
        // stream done — usage recorded via waitUntil below
      },
    });

    ctx.waitUntil((async () => {
      // wait a tick for the stream to finish flowing, then record
      await new Promise((r) => setTimeout(r, 100));
      const t0 = Date.now();
      while (tokensOut === 0 && Date.now() - t0 < 120000) await new Promise((r) => setTimeout(r, 500));
      await recordUsage(env, userId, tokensIn || 4000, tokensOut || 350);
    })());

    return new Response(anthropicRes.body.pipeThrough(scanner), {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        ...cors,
      },
    });
  },
};
