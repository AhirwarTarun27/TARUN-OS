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

- [ ] **P1 — BUILD: need-on-final + gradebook-setup pSEO set** (pulled forward from Days
  31-60 — hardest deadline in the portfolio: live + indexed by mid-Sept for both the
  teacher window and Dec finals). AIOS builds the pages end-to-end in the GradeJar repo;
  Tarun reviews + deploys. Target: drafts complete ~Jul 19 → `[ ] BUILT` · deployed +
  indexing requested ~Jul 26 → `[ ] SHIPPED`.
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
- [x] **AdSense:** gradejar.com is now listed in the account, status `GETTING_READY` (confirmed via `scripts/report.mjs` 2026-07-03). Review clock is running. Nothing else to do but wait.
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
