# Your Almanac reminders: the owner's steps (P4 A)

The code is in main and switched off in three places. Nothing changes for any reader until you do all of the steps below. Agents never apply migrations, run wrangler or deploy the worker.

## What is already in main

- `Elementum_App/supabase/migrations/0004_push_schedule.sql`: adds `schedule` (dates and codes) and `tz_offset` (minutes east of UTC) to `push_subscriptions`. Still no birth data and no chart.
- `Elementum_App/workers/push/index.js`: `POST /schedule`, and the hourly cron. With `ALMANAC_PUSH = '1'`:
  - on a scheduled local date it sends the composed reminder, for example "Fire sharpens you, and a plan for later moves / A plan for later moves today. Read your day.";
  - on other days inside a current schedule it sends nothing;
  - once a schedule runs out (the reader has not opened the app for five weeks) the old daily line resumes.
  Without the variable the worker behaves exactly as today.
- `Elementum_App/workers/push/almanacCopy.js`: the reminder copy, generated from the Almanac's units by `tools/build-push-copy.mjs`.
- The app: `syncPushSchedule` in `src/infra/push.js`, called when the Almanac hub opens, only while `ALMANAC_PUSH` in `src/liveFlags.js` is true.

## Your steps, in order

1. **Apply the migration.** Supabase dashboard → SQL editor → paste `Elementum_App/supabase/migrations/0004_push_schedule.sql` → Run.
2. **Turn the worker's switch on.** In `Elementum_App/workers/push/wrangler.jsonc`, add `"ALMANAC_PUSH": "1"` under `vars` (or ask me to make that one-line commit).
3. **Deploy the worker** from `Elementum_App`: `npx wrangler deploy --config workers/push/wrangler.jsonc`.
4. **Tell me**, and I set `ALMANAC_PUSH = true` in `src/liveFlags.js` and push. The app then posts each reader's schedule when they open the Today tab.
5. **Check it on your phone:** open the Today tab once, then Profile → "send me a preview". The preview still sends the daily line. The next marked day sends the Almanac line at your chosen hour.

## To turn it off again

Set `ALMANAC_PUSH` back to `"0"` in the worker's vars and redeploy. The schedules stay in the table, unused.
