# Infra chunk (④)

The external-infrastructure boundary. Everything that connects the app to the
outside world lives here (client side) or is documented here (deploy / server
side), so it can be branched and iterated without touching engine, content, or
UI.

## Client side (this folder — `src/infra/`)

| File | Owns |
|---|---|
| `endpoints.js` | Third-party API URLs the client fetches (e.g. Open-Meteo geocoding). |
| `links.js` | Outbound links — Stripe checkout, social profiles, app-store listings. `null` until wired. |
| `index.js` | Public barrel. Import via `../infra/index.js`; deep imports are lint-blocked. |

**Rule:** no external URL or link is hard-coded in a service/component. Add it
here and import it. `null` link = "not yet available" → hide/disable the UI.

## Deploy / server side (documented, not in this folder)

- **`Elementum_App/wrangler.jsonc`** — the Cloudflare Worker deploy manifest.
  Stays at the app root because `tools/sync-live.ps1` runs `wrangler deploy`
  from there; do **not** move it.
- **Server / Worker code** (user data, Stripe webhooks, auth) does not exist
  yet. When it lands it belongs in a dedicated `worker/` tree (outside `src/`,
  since it is not part of the React bundle), with its own entry and bindings.
  See `Documents/Designengineering/DOC10_Backend_Architecture.md`.
