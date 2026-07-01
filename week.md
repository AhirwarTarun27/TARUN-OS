# This Week — Tue Jun 30 → Sun Jul 5, 2026

> **Your single source of truth.** If it's not here, it's not happening this week.
> Open this file FIRST, every session. Notion, Calendar, your head — all noise until it lands here.
> Reset every Sunday by running `/weekly-review` (next: Sun Jul 5).

## North Star (why any of this matters)

- **Floor:** Your day job (thinksys). Stable, grow in place, no job hunt. Pays the bills, de-risks everything.
- **Engine:** A portfolio of front-end-heavy tools built for scale, money-led (AdSense). **JsonBeam = bet #1: live, observe mode** (watch Analytics/AdSense, don't add code). **GradeJar = bet #2: BUILT + benchmarked #1, now shipping live.** Future bets get *researched before built.*
- **Edge:** Get better as a developer *through building*. Front-end system design now. Backend depth later.
- **The rule:** Ship ugly. "Ranks #1 and loads fast" beats "best editor." Done beats perfect. **A #1-benchmarked product earning $0 because it isn't live is the only failure that matters right now.**

## This week's 3 outcomes (max 3 — done or NOT done)

M1 + M2 core are done and benchmarked **#1**, but the build isn't fully finished — **named roster + rankings is in progress, and CSV import + M3 are still open**. Go-live is greenlit and the AdSense account is approved. The deploy is still blocked on **Cloudflare auth** — that's today's must-ship and the one thing gating everything else.

- [ ] **GradeJar live on gradejar.com.** Authenticate Cloudflare → deploy to CF Pages (`gradejar.pages.dev`) → buy `gradejar.com` → attach custom domain + DNS → set canonical `site` to the real domain → regenerate sitemap/canonicals. *Done = https://gradejar.com loads the live site.*
- [ ] **AdSense earning + indexed.** Set the real `ca-pub-…` client + swap placeholder ad `unit` ids → **add gradejar.com as a site in AdSense the day it deploys** (review = "Getting ready" → "Ready" takes days-to-2wks; start the clock EARLY — this is why JsonBeam shows 700 views/wk but $0) → validate ads fill once approved → re-confirm CWV with real ads → submit sitemap to Google Search Console. *Done = site submitted to AdSense + GSC; real ads serving once Google approves.*
- [ ] **Ship M3 — second keyword page.** `/test-grade-calculator` reusing `grade-core` (own SEO meta + JSON-LD, in sitemap, cross-linked with `/ez-grader`). *Done = a second ranked landing page is live.*

## Today — ONE must-ship

> The single thing that, if you do nothing else today, makes the day count.

- **Date:** Tue Jun 30
- **Must-ship:** Authenticate Cloudflare and deploy GradeJar to `gradejar.pages.dev`. Clear the one blocker that's held everything. (All deploy work happens in the GradeJar repo, not here.)

## Parking lot (capture, do NOT act)

Brain-dump here so it leaves your head. Triage it during the weekly review. Nothing here is this week's problem.

- AI/AIOS-run daily marketing system (Priority 2) — scope it the week AFTER GradeJar is live; pick a channel that is NOT LinkedIn.
- GradeJar M2 backlog (finish after go-live): named roster + rankings (in progress — additive, index-aligned, no migration) + CSV import. GPA-per-band and per-assignment weighting already shipped.
- JsonBeam: monthly Analytics/AdSense check (observe mode, no code).
- DSA practice (Priority 3) — light; gut-check whether interview prep is real this quarter or just the day-job Floor talking.
