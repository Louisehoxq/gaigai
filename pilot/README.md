# GaiGai pilot kit

Purpose: find out, in 4 to 6 weeks and with 5 to 10 social enterprises (SEs) in one cluster, whether GaiGai sends real customers to them. Everything here is a draft for you to adapt. Nothing has been sent to anyone.

## What the app measures (anonymous)

| Event | Meaning | Limit |
| --- | --- | --- |
| `qr_scan` | Someone scanned an SE's QR code and landed on GaiGai | Counts intent, not a visit |
| `outbound_click` | Someone tapped through to the SE's website | Counts interest, not a purchase |
| `trail_add` | Someone saved the SE to a trail | Counts intent to visit |
| `raise_record_click` | Someone opened the SE's raiSE record | Counts due diligence |

No cookies, no user id and no IP address are stored. Each event is a timestamp, an event name, an SE id and (for clicks) where in the app it happened. Read the counts with `GET /api/events/summary` and the header `x-admin-token: <ADMIN_TOKEN>`.

**None of these measures footfall or sales.** Only the SE can tell you that, so the pilot also needs the tally sheet below and a short monthly check-in.

## Setup (about half a day)

1. Deploy the app somewhere with HTTPS and set `ADMIN_TOKEN`. (See Phase 4 in `FIX_PLAN.md` first: the production build and rate limits matter once it is public.)
2. `node scripts/make-qr.mjs https://your-site` creates one QR code per SE in `pilot/qr/`. Print each as a small table or counter card.
3. Give each SE `se-brief.md` (edited) and `tally-sheet.csv`.
4. Their own website analytics will show visits tagged `utm_source=gaigai`.

## Tally sheet

Ask staff to add one line whenever a customer says they came through GaiGai or shows the QR card. Weekly count per SE goes in the sheet. This is self-reported and will undercount, but it is the only footfall signal available without payments data.

## What to decide up front (suggested; agree with the SEs first)

| Measure | Pass | Rethink |
| --- | --- | --- |
| SEs that join with no payment (target 5 to 10) | At least 5 | Fewer than 3 after direct outreach |
| Visitors who return within 30 days | At least 20% | Under 10% (needs a way to count returns; the current app does not) |
| Extra visits per SE per month (tally sheet) | At least 20 | Under 5 |
| SE says the extra business is worth the effort | At least 60% yes | Under 30% |

Context: one entry-level F&B job is roughly S$26,640 a year in wages (an illustration from the research, using the Progressive Wage Model floor). At an assumed 15% margin that needs about S$178K of extra sales. 20 extra visits a month at S$10 is about S$2,400 a year, under 2% of that. So expect the pilot to show discovery alone is small, and look hard at repeat customers, group bookings and corporate orders.

## Privacy and consent

* The app stores no personal data. If you add accounts, email sign-up or analytics, Singapore's PDPA applies: add a notice and a consent step first.
* Get each SE's written OK before listing them publicly, and let them correct their entry.
* Do not republish the raiSE directory data without asking raiSE.

## Files

* `outreach-email-draft.md`: first message to an SE (draft, not sent).
* `se-brief.md`: one page for an SE to read.
* `tally-sheet.csv`: weekly count template.
* `qr/`: generated QR codes (git-ignored).
