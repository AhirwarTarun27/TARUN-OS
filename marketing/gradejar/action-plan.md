# GradeJar — Marketing Action Plan (30/60/90)

Written 2026-07-03. Budget $0. Tarun ~15 min/day + ~30 min Sundays. AIOS drafts everything.
The `/marketing` skill turns this file into daily queues in `marketing/queue/`.

## Phase 0 — STOP-THE-BLEED (this week, Jul 3-6)

The 2026-07-03 audit found the site is invisible to every acquisition system. Nothing below
matters until these five are done. All are Tarun tasks (auth required); AIOS preps each step.

- [x] **Google Search Console:** DNS TXT verification confirmed live 2026-07-03 (`google-site-verification=pSYsZ-QBCk3Sb0t1U-NplmKatcxv_krAfoBGwmyE4NU` resolving on gradejar.com). Verify inside GSC shows the dashboard (not a "Verify ownership" screen) — confirm, then still need: submit `sitemap-index.xml`, request indexing on the 6 money pages (/, /ez-grader, /grade-calculator, /final-grade-calculator, /gradebook, /test-grade-calculator).
- [x] **AdSense:** gradejar.com is now listed in the account, status `GETTING_READY` (confirmed via `scripts/report.mjs` 2026-07-03). Review clock is running. Nothing else to do but wait.
- [x] **Analytics:** wired 2026-07-03. Cloudflare zone-level Web Analytics (`httpRequests1dGroups`/`httpRequestsAdaptiveGroups`, edge-log traffic incl. bots) added to `scripts/report.mjs` — GradeJar now shows page views, daily uniques, top pages, top countries alongside JsonBeam's GA4 block. Details: `references/cloudflare-api.md` §5. GA4 property is still an option later (Option B) but not needed now.
- [x] **Unblock AI-search crawlers:** confirmed via robots.txt fetch 2026-07-03 — `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Claude-SearchBot`/`Claude-User` are NOT blocked (fall through to wildcard `Allow: /`). Only pure-training bots (`GPTBot`, `ClaudeBot`, `CCBot`, `Bytespider`, `Google-Extended`, `Amazonbot`, `Applebot-Extended`, `meta-externalagent`) stay blocked, which is the desired state.
- [ ] **GSC wiring gap (AIOS follow-up):** once GSC verification is confirmed in-dashboard, wire the Search Console API into the report script (service account, same pattern as GA4) so the engine sees queries/impressions. Needs Tarun's one-time auth grant.

## Days 1-30 (Jul 3 - Aug 2) — Foundation + pitch season

Back-to-school editorial lists are being assembled NOW. July is pitch month.

**SEO/pSEO (AIOS drafts, Tarun ships):**
- [ ] Keyword map for the full niche (AIOS, week 1) -> `marketing/gradejar/keyword-map.md`
- [ ] First pSEO batch: `/ez-grader/N-questions` for the 15 most-searched N values. Real per-page charts + unique copy. Watch GSC before scaling.
- [ ] Front-load every existing FAQ answer (GEO extraction pass over the 15 tool pages).

**PR/outreach (AIOS drafts, Tarun sends):**
- [ ] `outreach-targets.md`: 25 targets (WeAreTeachers, Edutopia, Larry Ferlazzo, Cult of Pedagogy, TeachThought, Bored Teachers, edtech roundup authors, .edu teacher-resource pages).
- [ ] Pitch 12+ back-to-school roundups in July. Hook: free + private + no-login gradebook.
- [ ] Sign up: Source of Sources, Qwoted (free), Featured. AIOS scans daily, drafts answers.

**Pinterest:**
- [ ] Create business account + 4 boards (Grading Tips, Gradebook Setup, GPA Help, Teacher Time-Savers).
- [ ] Build one reusable pin template (Canva free or HTML-to-image, dark not required here: pin style optimized for saves).
- [ ] First 20 pins queued via native scheduler. Then 1-2/day steady.

**Reddit (slow burn starts now):**
- [ ] Age the account: 2 weeks of pure helpfulness in r/Teachers + r/edtech. Zero links.
- [ ] AIOS daily thread scan + drafted replies in the queue.

**Email:**
- [ ] MailerLite/Buttondown free account + signup box on gradejar.com ("Grading tips, 2x/month").
- [ ] Issue #1 drafted for Aug 1 (back-to-school gradebook setup guide).

**Directories (one-time batch):**
- [ ] AIOS pre-fills 20 submissions (EdTech Index, AlternativeTo, free-tool + startup directories). Tarun submits in one sitting.

## Days 31-60 (Aug 3 - Sep 1) — Back-to-school push

- [ ] Reddit value post week of Aug 17-24 (peak setup time): the honest maker post with the privacy hook. Same week: FB group recommendation-thread activity.
- [ ] Pinterest to 2 pins/day through Sep 15 (gradebook setup + grading scale content).
- [ ] pSEO batch 2: grading-scale pages + need-on-final set (prep for Dec finals: pages need 3 months to rank).
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

- Daily: run `/marketing` -> approve queue (≤15 min) -> post -> log.
- Sunday: channel scorecard inside `/weekly-review` (+ ~30 min pin batching).
- Never: LinkedIn, work email, paid ads, auto-posting to communities, unreviewed external copy.
- Dec finals season is the biggest student-side spike of the year: the need-on-final pages MUST be live and indexed by mid-September. Do not let this slip.
