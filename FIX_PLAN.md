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
