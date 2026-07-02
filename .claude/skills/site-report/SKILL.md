---
name: site-report
description: Pull live traffic + revenue for a product (JsonBeam now, GradeJar at go-live) and turn it into a diagnosis + 2-3 simple growth moves. Runs scripts/report.mjs, banks a dated snapshot for trend tracking, then reads the funnel and prescribes the highest-leverage next action. Trigger on "status of jsonbeam", "how's jsonbeam / gradejar doing", "traffic report", "analytics", "adsense report", "how's the site", "site metrics", "are we ranking". One run = live numbers + a track-record entry + a ranked action list.
---

# Site Report — numbers into moves

The user doesn't want a data dump. He wants to know **what the numbers mean** and **the simplest effective thing to do next** to grow traffic, rankings, searchability, usage, and revenue. Every run ends with a diagnosis and a short ranked action list, in his voice.

Data is already wired — see [[connections-wired]]. Never say it isn't. Pull it, don't ask him to paste it.

## Files this skill touches

- `scripts/report.mjs` — the data source. Run it, read its stdout. (GA4 + AdSense, all sites.)
- `reports/metrics-log.md` — append-only snapshot log (create `reports/` on first run). This is the track record.
- `week.md` — read for current priority so advice respects it (GradeJar go-live is the active bet; JsonBeam is observe-mode).
- `references/voice.md` — match the register. Casual, short sentences, no em dashes, bullets over paragraphs.

## Execution — run in order

### 1. Pull the data

Run `node scripts/report.mjs` from repo root. For a fuller read on a normal request, also run `node scripts/report.mjs --days=30` so you can state the 7-day pace against the 30-day trend. Add `--realtime` only if the user asks who's on right now.

If the script errors on auth, don't guess — run `node scripts/verify-connections.mjs` and report which connection is down.

### 2. Bank a snapshot (the track record)

Append one dated row to `reports/metrics-log.md` (create the file with a header if missing). One line per run, newest at the bottom, so week-over-week trend is visible at a glance:

```
| Date | Site | Users 7d | Sessions 7d | Views 7d | Organic % | Eng. rate | US % | Earnings 7d | Approval |
```

This is what makes "good track record" real — each run compounds. Never delete rows.

### 3. Diagnose — read the funnel, lead with the ONE thing

Don't recite every metric. Find the binding constraint and name it first. Work the funnel top-down:

- **Approval gate (AdSense).** If a site is `GETTING_READY`, revenue is *supposed* to be $0 — say so, don't treat it as a problem, don't give RPM advice. `READY` = ads live, now RPM/CTR matter. `NEEDS_ATTENTION`/`REQUIRES_REVIEW` = a real blocker to surface.
- **Traffic source mix is the health signal for a search tool.** High **Direct %** with low **Organic Search %** = SEO isn't landing yet (Google barely sends anyone). This is the usual bottleneck early. Rising organic share is the single best sign the tool is earning its ranking.
- **Volume + trend.** Is 7-day pace ahead of or behind the 30-day run rate? Growing, flat, or sliding?
- **Engagement.** Low engagement rate + short session = either wrong-intent traffic or the landing page doesn't hook. Cross-check against which pages pull traffic.
- **Top pages.** Is the homepage soaking up most views (brand/direct) while the money tool/keyword pages get scraps (no organic intent)? That confirms an SEO problem, not a product one.
- **Geo vs US-first.** US clicks pay far higher AdSense RPM. If US share is low relative to India/other, flag it — same traffic, less revenue. Targeting US-intent keywords lifts both rank relevance and RPM.

State the diagnosis in 2-4 lines. Plain. What's working, what's the bottleneck, why.

### 4. Prescribe — 2-3 simple moves, ranked by leverage

Only the highest-impact, lowest-effort actions. No laundry list. Each move = one line: the action + the metric it moves. Pull from the play menu, matched to the diagnosis:

**If organic search is thin (the common case):**
- Confirm the site + sitemap are submitted in Google Search Console; check index coverage (are pages even indexed?).
- Tighten the top pages' `<title>`/meta to lead with the exact keyword users search (matches the CLAUDE.md "every page is an SEO asset" contract).
- Ship more tool/keyword landing pages (JsonBeam Phase 3; GradeJar's M4 waves) — each is a new organic front door.
- Earn a few quality backlinks: submit to dev-tool directories, relevant subreddits/forums, a Show HN. US-first placements.

**If engagement is low:**
- Match the landing page's above-fold to the search intent; make the tool usable in one glance.
- Re-check page speed / CLS on real devices (the CWV budget) — slow = bounce.

**If geo skews off US:**
- Weight new content/keywords to US phrasing and US-specific use cases.

**If a site is `READY` and earning:**
- Read RPM vs CTR: low RPM = geo/niche pricing; low CTR = ad placement/fill. Tune placement only after real fill data.

**Always respect the active priority.** Read `week.md` first. If JsonBeam growth work would pull focus off the GradeJar go-live, say so and mark those moves "after GradeJar is live." The one exception is anything that just starts a slow clock (GSC submission, indexing) — flag those as "do now, they compound while you wait." Give the ideas either way; let him choose.

### 5. Close

One line: the single most leveraged next action, and whether it's a do-now or an after-GradeJar. If a trend is worth watching, name the metric to watch next run.

## Output contract

Every run produces:
1. A tight scoreboard of the live numbers (7-day, with 30-day context) — not a raw paste of the script.
2. A new row in `reports/metrics-log.md`.
3. A 2-4 line diagnosis leading with the binding constraint.
4. 2-3 ranked moves, each tied to the metric it shifts and flagged do-now vs after-GradeJar.
5. A one-line close naming the single next action.

## Rules

1. **Pull, don't ask.** The data is wired. Run the script every time. Never ask him to paste numbers.
2. **Diagnose, don't dump.** Lead with the one binding constraint. The scoreboard supports the diagnosis; it isn't the point.
3. **$0 under `GETTING_READY` is not a problem.** State it plainly and move on. No monetization advice until `READY`.
4. **Two or three moves, never more.** Simple and effective beats exhaustive. Rank by leverage.
5. **Respect the priority.** GradeJar go-live is the active bet; JsonBeam is observe-mode. Flag anything that pulls focus — except slow-clock SEO (GSC/indexing), which is do-now.
6. **The log only grows.** Append snapshots; never delete. That's the track record.
7. **His voice.** Casual, direct, short sentences, no em dashes, bullets over paragraphs.
