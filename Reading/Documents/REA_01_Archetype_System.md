# REA_01 — The Compound Archetype System — an overview

> **Formerly DES_01** (moved to the Reading library 2026-07-23) **and before that DOC2** (2026-07-09). Historical citations of "DES_01" or "DOC2" refer to this file (registry: Operations/README.md).

> **REWRITTEN 2026-07-28 (owner-directed) as the reading library's front door.** The old body (the April-2026 2-layer key system + v2.1 banner) is superseded: its 50-key taxonomy and "why 50" argument moved to **REA_04 §4b**; its 庚 reference derivation to **REA_04 Appendix A**; its locked names live in **REA_03 §2**; its assembly rules in **REA_04 §2**. The old body is in git. This doc explains the system in prose — it defines nothing normatively; every table it mentions has one canonical home elsewhere.

## The one idea

**The same Day Master living under different dominant energies is a categorically different person.** That is what 子平真诠 actually describes, and it is what this system implements: identity is not a single type looked up in a table — it is a **compound**, assembled per chart from fixed, authored parts. Elementum's calculation commits to a 子平真诠 (structure-core) + 滴天髓 (relative-clash) synthesis (engine rules: DEV_01 §3; sources: REA_02); the reading layer consumes the engine's output through the axes below. Two laws govern everything on top: **the engine owns every number** (nothing in the reading layer computes), and **substance vs function** — dominance ranking is 五行 substance; 合-binding and 刑/害/破 are relational texture that colors a reading but never reorders it (the full contract: REA_04 §2.2).

## The compound, axis by axis

A user's archetype is the composition of five archetype dimensions — each one a variant axis of the taxonomy (REA_04 §1), each with its own locked vocabulary (REA_03) and its own authored data (REA_04):

1. **The STEM core (×10)** — who you are. The day pillar's stem names one of ten archetypes (roster below): name, manifesto, inscription, claims. The identity card reads this and only this.
2. **The CONDITION (×3)** — how your core runs. Overfueled / Balanced / Underfueled, with its remedy verb (Channel / Refill). Locked terms + definition lines: REA_03 §5c.
3. **The five FAMILY relations (×5, fixed per Day Master)** — what each element *is to you*. For any DM, each element resolves to exactly one family: Core · Root · Drive · Voice · Duty (REA_03 §5b). This is singular and certain — for a Metal DM, Earth is always the Root.
4. **The GOD faces (ELEMENT·GOD, ×50)** — the *character* inside each relation. Polarity splits every relation into up to two Ten-God personas (The Twin … The Sage), surfaced strictly by math (1–2 present faces per element; whole-element absence reads as the ghost). The 50-key pool — every valid element×god pairing, each authored once and shared by every user whose chart selects it — is the system's content engine: **REA_04 §4b**.
5. **The POSITION axis (宫位, ×7)** — where a god sits changes what it speaks to: 日支 = partner, 时柱 = children/legacy, 年 = origins, 月 = career. Composed from the same 50-key pool × palace frames; nothing new authored per cell.

Around the compound sit the two non-archetype classes: **derived values** (percentages, roles, ordering, presence frames — engine-owned, never authored) select and pitch the compound per chart; **vocabulary constants** (REA_03) name every part of it identically for every user. Dominance never rewrites a persona's words — it decides *which* faces surface, in *what order*, at *what register* (REA_04 §2).

## The ten archetypes (the system's public face)

*Names locked in REA_03 §2; manifesto values authored in `archetypeSource.js` (roster shown for orientation — the variable: REA_04 §3 `manifesto`).*

| 干 | Archetype · manifesto |
|---|---|
| 甲 | **The Oak** — Builds what others can only imagine. Growth is not ambition — it is the architecture. |
| 乙 | **The Vine** — Finds the path no one else sees. Arrives exactly where it intended. |
| 丙 | **The Sun** — Doesn't choose to illuminate. Simply is light — and everything near it comes alive. |
| 丁 | **The Candle** — Illuminates completely what it's pointed at. Nothing more. Nothing less. |
| 戊 | **The Mountain** — People orient their lives around it without knowing why. The ground that holds. |
| 己 | **The Field** — Grows things in silence. Leaves everything it touches more alive than it found it. |
| 庚 | **The Blade** — Precision before intention · An edge is never given — it is forged. |
| 辛 | **The Jewel** — Perceives what is excellent the way others perceive temperature — before the question is asked. |
| 壬 | **The Ocean** — Holds more beneath the surface than it ever shows. Always has. Always will. |
| 癸 | **The Rain** — Knows what is true before it is spoken. Nourishes what it touches without announcing it. |

## One chart, end to end (the golden reference)

Born 1995-04-29 at 18:00 in Beijing → pillars 乙亥 / 庚辰 / 庚寅 / 乙酉. The engine derives: day stem **庚 → The Blade** (STEM). The core runs **Overfueled → Channel it** (CONDITION). The five relations resolve (FAMILY): Earth is the Root (33%), Wood the Drive (33%), Metal the Core (23%), Water the Voice (6%), Fire the Duty (5%). Each relation carries its lead face (GOD): the Root speaks as **The Alchemist** (偏印 · Insight), the Drive as **The Steward** (正财 · Caution), the Core as **The Twin** (比肩 · Independence), the Voice as **The Artisan** (食神 · Flow), the Duty as **The General** (七杀 · Force) — and because the self runs Overfueled, the Root and the Core itself read as Friction ("curdling into Distance / Isolation") while Wood, Water, and the scarce-but-needed Fire read as Catalyst ("rising toward Security / Grace / Command"). One person: *a Blade — Overfueled, Alchemist-heavy, seeking the forge.* No sentence of that compound was written for this user; every part was authored once and selected by the chart. Full derivation: REA_04 Appendix A.

## Where everything lives

| You need | Go to |
|---|---|
| What any term means (names, keywords, poles, condition terms, definition lines) | **REA_03 Concept_Dictionary** |
| What data exists, its axis, budget, templates, the assembly model, open rulings | **REA_04 Reading_Generation_Schema** (+ xlsx twin in `Reading/Database/`) |
| How content is produced (pipelines, coverage, block selection) | **REA_05 Generation_Architecture** |
| How to write a field (prompts, voice, quality gates) | **REA_06 Content_Generation_Guide** |
| What order concepts are taught | **REA_07 Concept_Ladder** |
| Why v2.1 decided what it decided | **REA_08** (record) |
| The engine's math | **DEV_01** (Operations/Development/) |
| The authored values themselves | `Elementum_App/src/content/` (runtime truth) · `Reading/Database/elementum_profile_database.html` (HTML twin) |

## Document Metadata

| | |
|---|---|
| **Document** | REA_01 — The Compound Archetype System (overview / front door) |
| **Version** | 2.0 · 2026-07-28 (full rewrite; supersedes the April-2026 2-layer key-system body — old body in git) |
| **Status** | Orientation only — defines nothing normatively; canonical homes cited per section |
| **Audience** | Anyone entering the reading library cold |
