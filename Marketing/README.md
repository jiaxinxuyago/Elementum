# Marketing · the content library

**Born:** 2026-10-23, the marketing session.
**Strategy of record:** `Operations/Business/BIZ_06_Community_Traction_Plan.md` (owned by the marketing session). Launch plan and gates: `BIZ_05`. Owner rulings go to `Operations/Project_Management/PM_04_Ruling_Queue.md`.

Content is data. One file per piece or per batch, named `YYYY-MM-DD_<kind>_<slug>.md` by the date it was written. A piece is never edited after it is posted; a new version gets a new file and the old one says which file replaced it.

## Folders

| Folder | Holds |
|---|---|
| `scripts/` | Short-video scripts (TikTok, Reels) and carousels, in batches |
| `community/` | Drafted answers for borrowed communities (Reddit, Discord), one file per community with its self-promotion rules |
| `outreach/` | Creator and warm-DM messages, the creator list |
| `email/` | Waitlist confirmation, the welcome series (BIZ_05 M5), monthly emails |
| `calendar.md` | What posts when, where, with which link, and what happened |

Folders are created when their first piece lands.

## The rules every piece passes

1. **Built from the locked corpus.** Every reading line is quoted from `Elementum_App/src/content/` (the free identity fields: archetype name, manifesto, inscription, keywords, overview, Your Nature) and cited by stem. No invented astrology, no traits the app does not say.
2. **The voice.** `REA_16` and `BIZ_03`: short sentences, plain words, no dashes, no semicolons, no italic, none of the banned AI words (delve, unlock, journey, navigate, resonate and the rest of `REA_16` §1b). Contractions are fine in captions and voice-over.
3. **Personality, not fortune.** No predictions, no guarantees, no "this month you will". Apple 4.3(b) and the audience both reward it.
4. **Accurate BaZi.** The Day Master is the heavenly stem of the birth day, one of ten. The year animal is a different thing. Say so when it helps.
5. **Privacy.** Never ask for birth data in public, in comments or in DMs. The chart is computed on the reader's device. Answer "what's my Day Master?" with the link, never with "send me your birthday".
6. **Faceless (C2 A).** House art, the app's own screens, voice-over or text-to-speech. No founder face.
7. **Tracked links.** Every link carries UTM tags. The app records `utm_source`, `utm_campaign` and `ref` on `app_open` (`src/infra/analytics.js`), and not `utm_content`, so the piece id goes in `utm_campaign`:
   `https://elementum.life/?utm_source=tiktok&utm_medium=video&utm_campaign=b01-s07`
   Sources: `tiktok`, `instagram`, `reddit`, `discord`, `email`, `creator-<handle>`.
8. **Under 100 sign-ups a day** (`BIZ_05` L2 B). A piece that could go big gets posted when the waitlist can take it.

## Index

| File | What | State |
|---|---|---|
| `scripts/2026-10-23_batch-01_day-masters.md` | Batch 01: the ten Day Masters, two element carousels, one POV hook | draft, waiting on M1 |
