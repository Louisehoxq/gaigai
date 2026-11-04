# GaiGai (街街)

A discovery prototype for Singapore social enterprises (SEs) that employ people who are often left out of work: persons with disabilities, older workers, ex-offenders, single mothers and others.

**Hypothesis being tested:** if everyday consumers can easily find these SEs, some of their spend shifts to them, and that sustains inclusive jobs when business costs rise. This repo is the prototype; it does not yet prove or disprove that.

> **Status: prototype with sample data.** Nothing here is verified. See "Data" below.

## What works today

* Map of 10 sample SEs (Google Maps, with a vector-map fallback).
* Search and filters by category, beneficiary group and neighbourhood.
* Bookmarks and a weekend trail (stored in the browser only).
* Optional voice search and map-grounded search through a small Express proxy to the Gemini API.

## Data

* `src/data/socialEnterprises.ts` holds **10 hand-entered sample records**. Names, websites and categories are real organisations. Addresses, coordinates, opening hours, MRT walking times and descriptions have **not** been checked.
* `data/raise-directory.tsv` is a snapshot of the public raiSE directory (358 social enterprise members, taken 2026-11-05). `node scripts/build-raise.mjs` turns it into `src/data/raiseDirectory.json`, which the app reads. To refresh it, run `node scripts/fetch-raise.mjs` on a machine that can reach raiSE, then the build script. Please ask raiSE before republishing this data.
* The tier shown on a sample enterprise comes from that snapshot via `data/raise-links.json` (each link has a reason). Five of the ten sample enterprises are not raiSE members, and show no tier.
* The directory has no addresses or opening hours, so only the 10 sample enterprises appear on the map.
* An earlier version contained invented ratings, reviews, quotes, impact metrics, menu prices and donation figures. They were removed. Do not reintroduce content that is not sourced.
* GaiGai is independent and not affiliated with raiSE, the Singapore Centre for Social Enterprise.

## Run it

Requires Node 18+.

```bash
npm install --legacy-peer-deps
cp .env.example .env     # add keys (all optional)
npm run dev              # development server on http://localhost:3000
npm run check            # type check, tests, production build
npm run build && npm start   # production: serves dist/ (set NODE_ENV via the start script)
```

Environment variables (see `.env.example`):

* `VITE_GOOGLE_MAPS_API_KEY`: live Google Maps. Without it the vector map is used.
* `GEMINI_API_KEY`: voice and map-grounded search. Without it those routes return 503.
* `GEMINI_TRANSCRIBE_MODEL`, `GEMINI_MAPS_MODEL`: model names. The defaults could not be verified against Google's docs; override them if a call fails with "model not found".
* `ADMIN_TOKEN`: lets you read `/api/events/summary` (pilot counts).
* `PORT`, `TRUST_PROXY` (number of reverse proxies in front, so rate limits see real client IPs).

The API is rate-limited per IP (60 events per minute, 10 Gemini calls per minute), kept in memory: it resets on restart and is per instance.

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4, Lucide, Motion, `@vis.gl/react-google-maps`, Express, `@google/genai`.

## Roadmap

See `FIX_PLAN.md`.
