# GradeJar — Marketing Action Plan (30/60/90)

Written 2026-07-03. Budget $0. AIOS drafts everything. Engine is **weekly-first** as of
2026-07-10 — the REPLAN below supersedes the 30/60/90 cadences; the checklists survive as
the item inventory with status tags (`[>]` moved, `[~]` parked).

## REPLAN 2026-07-10 — weekly engine + back-to-school sprint (now → Sep 15)

Reality check: the daily engine produced 3 queues in week one, then lapsed (the job hunt
is Priority 1 and the queue needed daily human posting). The engine is now one Sunday
session + AIOS build mode — see `marketing/playbook.md` SOPs. What survives is what
compounds: this sprint exists because **the Aug 1 - Sep 15 teacher window opens in ~3
weeks and indexing takes weeks** — the seasonal pages must go live NOW, not in August.

**Product repo (build mode):** `C:\Users\ahirwar.tarun\Documents\Learning\MyProjects\GradeJar`
(confirm conventions on first build-mode run).

**Sprint priorities, in order:**

- [x] **P1a — BUILT 2026-07-18: static "N wrong out of M" reference matrix on `/ez-grader`.**
  Replaces the `/ez-grader/N-questions` pSEO batch, which is **CANCELLED — see the doorway
  ruling below.** Root cause found by reading the live HTML: `/ez-grader` ranks for
  `10 wrong out of 50 questions` (pos 70) and `1 wrong out of 10` (pos 47) while the served
  page contained the phrase "10 wrong" **zero times** — the full grade chart is rendered by
  `<GraderIsland>`, a `client:load` Preact island, so the numbers exist only after hydration
  where a crawler does not reliably see them. New `WrongOutOfTable.astro` computes the whole
  matrix at build time from `grade-core` (never hardcoded) and emits it as static HTML.
  Verified: build green 23 pages · 165/165 unit tests · the three target phrasings now
  present in `dist/ez-grader.html` · page grew 90,277 → 95,086 bytes of crawlable content.
  **Deploy still gated on the AdSense verdict.**

- **⛔ CANCELLED — `/ez-grader/N-questions` pSEO batch (ruled 2026-07-18).** Fifteen routes
  each mounting the same widget with a pre-filled total is **precisely the keyword-doorway
  shape that D31 spent 2,722 lines removing** (`STATUS.md`: "unique prose over an identical
  tool is still a keyword doorway"), and `ArticleBody.astro`'s own contract says templated
  body copy with the keyword swapped is scaled-content abuse. Shipping it into an active
  low-value-content re-review risks the site's second chance to earn anything. One deep
  reference table serves every one of those long-tails without adding a route. The 07-18
  queue's plan-edit proposal (swap ez-grader/N ahead of need-on-final) is therefore moot —
  neither ordering was right, because the page set itself was the wrong artifact.

- [ ] **P1b — BUILD: need-on-final + gradebook-setup set** (still the hardest deadline in
  the portfolio: live + indexed by mid-Sept for the teacher window and Dec finals). **Must
  clear the doorway test before a line is written:** each page needs a genuinely different
  computation or input shape, not the same island behind different prose. Target: drafts
  ~Jul 24 → `[ ] BUILT` · deploy gated on the AdSense verdict → `[ ] SHIPPED`.
  **⚠ DEPLOY HOLD, added 2026-07-18:** build now, but **do not deploy until the AdSense
  re-review verdict lands**. Two reasons: (1) pushing a batch of new calculator-variant
  pages into the crawl during a pending low-value-content re-review is the exact pattern
  that caused the rejection; (2) a ranked page on an unapproved site earns $0, so approval
  is upstream of every dollar this set could make. Building is AIOS effort, so the
  mid-September deadline does not slip — the pages sit ready to ship on approval day.
  Not started as of 07-18 (second consecutive week at zero days of work).
- [ ] **P2 — Directory one-time batch** (AIOS pre-fills 20 submissions; one Sunday sitting).
- [ ] **P3 — July pitch follow-ups, dated:** `[ ]` Larry Ferlazzo (due ~Jul 10) ·
  `[ ]` Free Tech for Teachers (due ~Jul 14). One follow-up each, then stop (outreach SOP).
- [ ] **P4 — Pinterest decision** (first weekly session): monthly batch via the native
  30-day scheduler (one sitting/month) vs park. Not a daily channel either way.
- [ ] **Measurement (headlines every queue until done):** `[ ]` GSC API wiring (Tarun
  one-time auth grant) · `[ ]` decide GradeJar user analytics — add a GA4 property vs
  accept bot-inclusive CF edge logs.

**Parked at replan:** email newsletter (ongoing human cost doesn't fit the weekly reality),
`/ez-grader/N` pSEO batch (behind the seasonal set now), HARO platforms (already parked),
YouTube / Bluesky / Quora / influencer wave (revisit at the Day-90 rescore).

## Phase 0 — STOP-THE-BLEED (this week, Jul 3-6)

The 2026-07-03 audit found the site is invisible to every acquisition system. Nothing below
matters until these five are done. All are Tarun tasks (auth required); AIOS preps each step.

- [x] **Google Search Console, VERIFIED 2026-07-03:** property live (DNS TXT `google-site-verification=pSYsZ-QBCk3Sb0t1U-NplmKatcxv_krAfoBGwmyE4NU`). All 6 money pages (/, /ez-grader, /grade-calculator, /final-grade-calculator, /gradebook, /test-grade-calculator) indexed via URL Inspection — confirmed done. NOTE: pages were indexed through URL Inspection (the top search-bar tool), which does NOT populate the "Submitted sitemaps" list. Optional follow-up (won't speed already-indexed pages, only helps future discovery + coverage reporting): Sitemaps -> Add a new sitemap -> `sitemap-index.xml`.
- [ ] **AdSense — REJECTED 2026-07-14, RESUBMISSION PENDING.** ⚠ This item was marked done on 2026-07-03 with "nothing else to do but wait." That was wrong by 07-14 and the marketing engine ran on the stale status for four days. Corrected 2026-07-18.
  - **Verdict:** rejected for **low value content** on 2026-07-14 — same shape as JsonBeam on 07-08. API state is now `NEEDS_ATTENTION` (was `GETTING_READY`). Google reviewed the **pre-retrofit** site: it entered the queue 07-03, and the `/adsense-ready` audit did not run until 07-13. Process-ordering failure, not a skill failure — see the GradeJar repo `.claude/learning/STATUS.md`.
  - **Fix status: BUILT + DEPLOYED + VERIFIED LIVE 2026-07-18.** `/how-it-works/` 200 · `/about/` names a real human · `http://` 301s to HTTPS (blocker F-1 done — STATUS.md is stale on this) · **0 `<ins>` units render** (correct review posture) · `ads.txt` 200 with the right pub ID.
  - **Nothing open. Both gates cleared 2026-07-18.** (1) **Funding Choices was never actually open** — the GDPR message has read `Published` for gradejar.com since **3 Jul 2026** (jsonbeam.com since 22 Jun), confirmed in the AdSense dashboard. An earlier entry called this a live misstatement based on a client-side probe finding no `fundingchoices` script; that inference was wrong, because Google only serves the CMP once a site is approved and running ads. Retracted in `marketing/log.md`. (2) Recrawl confirmed and **Request review clicked 07-18** — API flipped `NEEDS_ATTENTION` → `GETTING_READY`. Verdict clock running; re-read from `scripts/report.mjs` every session.
  - **Not before approval:** do not flip `PUBLIC_ADSENSE_LIVE=true`; do not swap in real ad-unit IDs (45 placeholders `1000000003`… would not fill anyway).
  - **Standing rule this cost us:** AdSense status is re-read from `scripts/report.mjs` at every weekly session and never assumed from the last file that mentioned it.
- [x] **Analytics:** wired 2026-07-03. Cloudflare zone-level Web Analytics (`httpRequests1dGroups`/`httpRequestsAdaptiveGroups`, edge-log traffic incl. bots) added to `scripts/report.mjs` — GradeJar now shows page views, daily uniques, top pages, top countries alongside JsonBeam's GA4 block. Details: `references/cloudflare-api.md` §5. GA4 property is still an option later (Option B) but not needed now.
- [x] **Unblock AI-search crawlers:** confirmed via robots.txt fetch 2026-07-03 — `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Claude-SearchBot`/`Claude-User` are NOT blocked (fall through to wildcard `Allow: /`). Only pure-training bots (`GPTBot`, `ClaudeBot`, `CCBot`, `Bytespider`, `Google-Extended`, `Amazonbot`, `Applebot-Extended`, `meta-externalagent`) stay blocked, which is the desired state.
- [x] **GSC wiring gap — DONE.** Confirmed live 2026-07-14: `scripts/report.mjs` returns real GradeJar Search Console data (934 impressions/wk, avg position 66.7).

## Days 1-30 (Jul 3 - Aug 2) — Foundation + pitch season

Back-to-school editorial lists are being assembled NOW. July is pitch month.

**SEO/pSEO (AIOS drafts, Tarun ships):**
- [ ] Keyword map for the full niche (AIOS, week 1) -> `marketing/gradejar/keyword-map.md`
- [~] PARKED 2026-07-10 — First pSEO batch: `/ez-grader/N-questions` for the 15 most-searched N values. Behind the need-on-final seasonal set (REPLAN P1); revisit after it ships.
- [ ] Front-load every existing FAQ answer (GEO extraction pass over the 15 tool pages).

**PR/outreach (AIOS drafts, Tarun sends):**
- [ ] `outreach-targets.md`: 25 targets (WeAreTeachers, Edutopia, Larry Ferlazzo, Cult of Pedagogy, TeachThought, Bored Teachers, edtech roundup authors, .edu teacher-resource pages).
- [ ] Pitch 12+ back-to-school roundups in July. Hook: free + private + no-login gradebook.
- [~] PARKED 2026-07-03 — Source of Sources / Qwoted / Featured. SOS apex domain is broken (persistent "index file not found"); Qwoted free tier rejects personal Gmail (wants a domain email). HARO-style PR is low-leverage for a no-authority Day-1 site anyway; revisit after traction or once `tarun@gradejar.com` is set up. The PR that works NOW is direct blog pitches (Larry-style), which need no platform.

**Pinterest:**
- [ ] Create business account + 4 boards (Grading Tips, Gradebook Setup, GPA Help, Teacher Time-Savers).
- [ ] Build one reusable pin template (Canva free or HTML-to-image, dark not required here: pin style optimized for saves).
- [ ] First 20 pins queued via native scheduler. Then 1-2/day steady.

**Reddit (slow burn starts now):**
- [ ] Age the account: 2 weeks of pure helpfulness in r/Teachers + r/edtech. Zero links.
- [ ] AIOS daily thread scan + drafted replies in the queue.

**Email:**
- [~] PARKED 2026-07-10 — MailerLite/Buttondown + signup box + Issue #1. Ongoing human
  cost doesn't fit the weekly-first reality; revisit at Day-90 rescore.

**Directories (one-time batch):**
- [>] MOVED 2026-07-10 to REPLAN P2 — AIOS pre-fills 20 submissions (EdTech Index, AlternativeTo, free-tool + startup directories). Tarun submits in one sitting.

## Days 31-60 (Aug 3 - Sep 1) — Back-to-school push

- [ ] Reddit value post week of Aug 17-24 (peak setup time): the honest maker post with the privacy hook. Same week: FB group recommendation-thread activity.
- [ ] Pinterest to 2 pins/day through Sep 15 (gradebook setup + grading scale content).
- [>] MOVED 2026-07-10 to REPLAN P1 — pSEO batch 2: grading-scale pages + need-on-final set (prep for Dec finals: pages need 3 months to rank). Pulled forward; building NOW.
- [ ] Newsletter issues Aug 1 + Aug 15 to whatever list exists.
- [ ] First YouTube screencast IF Tier 1 is humming: "Private gradebook setup in 5 minutes" (AIOS scripts it, faceless screen recording is fine).
- [ ] Follow up all July pitches (one follow-up each, day 7).
- [ ] **Measure (Sep 1):** GSC impressions trend, indexed-page count, first backlinks, Pinterest saves, AdSense approval status, first AI-citation spot-check.

## Days 61-90 (Sep 2 - Oct 1) — Sustain + double down

- [ ] Weekly review kills or doubles each channel on data (fair test = 6 weeks for feed channels).
- [ ] pSEO batch 3 sized by what batches 1-2 did in GSC.
- [ ] Bluesky #EduSky presence starts (3 AIOS-drafted posts/wk) if 15-min budget allows.
- [ ] Quora one-time batch: top 20 questions.
- [ ] Product Hunt launch ONLY if roster + CSV import have shipped; otherwise park for the M-release.
- [ ] Influencer target list (20 teacher micro-creators) drafted for an October outreach wave, pitched with real usage numbers.
- [ ] **Day-90 scorecard (Oct 1):** indexed pages, organic clicks/wk, backlinks, Pinterest outbound clicks, email subs, AdSense earnings, AI citations. Rescore the master table with real data.

## Success criteria

| Checkpoint | Realistic target (estimates, not promises) |
|---|---|
| Day 30 | Indexed + AdSense review underway; 20+ pages in GSC; 20 pins live; 12 pitches out; list capture live |
| Day 60 | 500-2,000 organic visits/mo; 3-8 backlinks; ads serving (if approved); 50+ email subs |
| Day 90 | 2,000-8,000 visits/mo trending up; first AI citation observed; one channel clearly winning -> feed it |

## Standing rules

- Weekly: Sunday `/marketing` session chained from `/weekly-review` — scorecard + ONE
  build-mode assignment + ≤4 human items (≤45 min total). Micro-days only on dated triggers.
- Build-mode assets track BUILT → SHIPPED here; stuck >2 weeks at BUILT = kill-or-carry.
- Never: LinkedIn, work email, paid ads, auto-posting to communities, unreviewed external copy.
- Dec finals season is the biggest student-side spike of the year: the need-on-final pages MUST be live and indexed by mid-September. Do not let this slip.
