# Memory — cross-machine session handoffs

This root exists so a session started on ANY machine (second laptop, cloud session at claude.ai/code)
can inherit the working state that lives outside the repo: Claude's local auto-memory folder does not
sync through GitHub, so anything a fresh session must know gets distilled here and pushed.

**Naming convention:** `YYYY-MM-DD_<session-title-slug>.md` — the date the handoff was written plus the
title of the session that wrote it (as shown in the Claude Code sidebar), lowercased, spaces → hyphens.

**Rules**
- One file per handoff; never rewrite an old handoff — write a new one (the newest file is the live one,
  older files are history).
- A handoff records: standing laws, current workstream state (with the head commit), pending/parked
  items, and pointers into the doc roots. It never duplicates what the docs already record — it points.
- A session picking up on another machine reads the NEWEST file here first, then follows its pointers.
- The full local auto-memory (richer, append-only) stays at
  `C:\Users\NOBOD\.claude\projects\D--Elementum-Elementum-Project\memory\` on the primary laptop.
