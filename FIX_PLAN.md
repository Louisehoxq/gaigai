# GaiGai fix plan

Goal: make the prototype honest, then use it to test whether discovery shifts spend to inclusive-employment social enterprises (SEs). Each phase is its own pull request, stacked on the previous one. Nothing is merged automatically.

| Phase | Branch | What |
| --- | --- | --- |
| 0 | `fix/phase-0-honest-data` | Remove invented reviews, quotes, metrics, prices, donations and hard-coded "verified" labels. Add a prototype banner. Fix README. |
| 1 | `fix/phase-1-raise-data` | Load the real raiSE directory (359 members) from a snapshot; fetch script; filters. |
| 2 | `fix/phase-2-scope` | Multi-select beneficiary groups; align copy and navigation to the thesis. |
| 3 | `fix/phase-3-pilot` | Tracked outbound links, QR codes, pilot kit for SEs. |
| 4 | `fix/phase-4-hygiene` | Production build, rate limits, input validation, CI, tests, LICENSE. |

## Rules

* No content without a source. If a number, quote, rating or label is not backed by a link, it does not ship.
* raiSE tier comes from the raiSE directory snapshot only.
* Donations are out of scope: SEs live on trading revenue, and payments add compliance burden.

## Phase 0 notes

Removed: Google ratings and reviews, owner replies, founder and beneficiary quotes, impact metrics, menu items and prices, donation goals and amounts, seeded donor messages, the fake PayNow QR and UEN, the "Enterprise Portal" (it only showed simulated data), animated story chapters, phone numbers and emails, and the invented "estimated social return" on the trail drawer.

Kept: names, websites, categories, beneficiary groups, locations and opening hours, all clearly labelled as unverified sample data.

## Phase 2 notes

* The single `cause` per enterprise is replaced by two lists: `groups` (tagged by raiSE, filled from the directory snapshot) and `selfDescribedGroups` (what the enterprise says about itself, unverified). The filter matches either; cards show them differently.
* Groups follow raiSE's beneficiary tags (disabilities, mental health, former offenders, single parents, youth-at-risk, low-income, chronically unemployed), plus **older workers**, which raiSE does not track at all.
* Not done: "open now" and "near my MRT" filters (opening hours are free text and unverified, so a filter would be wrong often), and widening the sample (the raiSE Directory tab from Phase 1 is the wider list; mapping it needs geocoded, checked addresses).

## Phase 3 notes

* Added anonymous event counting (`/api/events`: scans, outbound clicks, trail adds, raiSE-record clicks), tagged outbound links (`utm_*`), a QR landing (`/?src=qr&se=<id>`), `scripts/make-qr.mjs`, and a pilot kit in `pilot/`.
* Counts measure intent, not footfall or sales. The tally sheet and SE check-ins are the only footfall signal; there is no payments data.
* Not done: recruiting SEs, sending any outreach, deploying, and counting return visitors (needs a visitor identifier, which means a privacy decision for you).

## Phase 4 notes

Done: production mode (`npm run build && npm start` serves `dist/`, Vite only in dev), per-route body limits (8 KB; 8 MB for audio only), input validation on every API route (`server/validate.ts`), in-memory rate limits, user text passed to Gemini as a JSON string, generic error messages (no upstream details leaked), 503 when Gemini is not configured, security headers, configurable model names, 27 unit and data tests, and a CI workflow (type check, tests, build).

Not done, and why:

* **Trails and bookmarks still live in the browser.** Moving them to a backend means accounts or a visitor id, which is a privacy and product decision (see Phase 3).
* **Event storage is a local file.** Use a database before relying on counts on hosting with ephemeral disks.
* **LICENSE.** Choosing a licence is the owner's decision. The old README badge was removed.
* **Automated accessibility test (axe).** Not added; the earlier accessibility claims are untested.
* **Deriving `mapX`/`mapY` from lat/lng.** The vector map is a hand-drawn SVG and needs calibrating to do this correctly.
* **Content-Security-Policy.** Needs a careful allowlist for Google Maps and fonts; not guessed.
* **Gemini model names** are unverified; they are now configurable.
* **`bun.lock`** is out of date (npm was used here): run `bun install`.
