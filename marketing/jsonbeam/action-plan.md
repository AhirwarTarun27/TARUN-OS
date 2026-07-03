# JsonBeam — Marketing Action Plan (30/60/90)

Written 2026-07-03. Budget $0. Shares Tarun's ~15 min/day + ~30 min Sunday with GradeJar:
ONE combined queue, and GradeJar's Phase 0 + back-to-school window (Aug 1 - Sep 15) win
ties through mid-September. The `/marketing` skill turns this file into daily queues.

**Baseline (live via `scripts/report.mjs`, 2026-07-03):** 36 users / 46 sessions / 84
pageviews in the last 7 days. Direct 34 sessions, organic search 7, social 4. US 18 users,
India 10. AdSense: site GETTING_READY, $0. Live pages: 17 tools + 4 info.
Translation: the site exists but Google barely sends anyone. This plan is discovery first,
amplification second.

## Phase 0 — visibility plumbing (this week, Jul 3-6)

Same lesson as the GradeJar audit: nothing below matters until the acquisition systems can
see the site. Tarun tasks (auth needed); AIOS preps each step.

- [ ] **Google Search Console:** confirm jsonbeam.com is verified; submit `sitemap.xml`; run `site:jsonbeam.com` and log the indexed count; request indexing on the 6 money pages (/, /json-formatter, /json-validator, /json-repair, /json-diff, /json-to-csv). 7 organic sessions/wk says indexing or authority is near zero.
- [ ] **AdSense GETTING_READY diagnosis:** the review has been stuck. Check: `ads.txt` served at jsonbeam.com/ads.txt, AdSense code present on every page, and enough indexable text per page. Thin tool pages are the classic reason reviews stall: the Days 1-30 on-page pass fixes that too.
- [ ] **Unblock AI-search crawlers (verified blocked 2026-07-03):** Cloudflare's managed robots.txt blocks ClaudeBot, GPTBot, CCBot, Google-Extended, Amazonbot and more. Allow citation bots (OAI-SearchBot, ChatGPT-User, ClaudeBot/Claude-SearchBot, PerplexityBot); keeping pure trainers blocked is a defensible middle ground. ALSO verified: the site 403s non-browser fetchers, so check Cloudflare bot protection (Bot Fight Mode) isn't blocking allowed crawlers at the WAF layer. robots.txt can't fix a 403.
- [ ] **Verify the privacy claim end-to-end:** devtools open, run every tool, confirm no payload leaves the browser. It leads all copy, the HN launch, and the PR wedge. Do not market it unverified.
- [x] **Analytics:** GA4 wired; `scripts/report.mjs` already covers JsonBeam.

## Days 1-30 (Jul 3 - Aug 2) — Foundation

Note: on-page work is code in the JsonBeam repo, which has been in observe mode. This plan
assumes observe mode ends for SEO-critical changes only (meta, FAQ blocks, schema,
ads.txt). Tarun's call; logged in `decisions/log.md`.

**SEO/pSEO (AIOS drafts, Tarun ships):**
- [ ] Keyword map for the JSON-tools niche (AIOS, week 1) -> `marketing/jsonbeam/keyword-map.md`. Long-tails first: repair, convert, diff intents.
- [ ] On-page pass over all 17 tool pages: meta title/description, one-line front-loaded answer, FAQ + JSON-LD, cross-links. Doubles as the AdSense-review content fix.
- [ ] Error-message pSEO batch 1: 10-15 pages on the top JSON parse errors, each embedding/linking `/json-repair`. Watch GSC before scaling.

**Links (AIOS drafts, Tarun submits/sends):**
- [ ] `outreach-targets.md` populated: dev newsletters + awesome lists + listicle authors (~25 targets). Done at plan creation; keep statuses current.
- [ ] Awesome-list PRs (awesome-json + adjacent): read each list's contribution rules, submit 3-5 PRs.
- [ ] Directory batch: 15-20 submissions (AlternativeTo, SaaSHub, LibHunt, StackShare, free-tool directories) in one sitting, AIOS pre-fills.
- [ ] Newsletter pitches DRAFTED but HELD: send only after on-page polish + privacy verification. One first impression.

**Reddit (slow burn starts now):**
- [ ] Age the account: 2 weeks of pure helpfulness in r/webdev + r/javascript. Zero links. Read each sub's self-promo rules.
- [ ] AIOS daily thread scan + drafted replies in the queue.

**Content:**
- [ ] Flagship piece drafted: the privacy audit ("I checked what 10 online JSON formatters do with your data", network-tab receipts). Publish on site first, canonical, syndicate to dev.to. This is also the Show HN ammo.

## Days 31-60 (Aug 3 - Sep 1) — The launch window

- [ ] **Show HN (the one shot):** prereqs = Phase 0 done + privacy verified + pages polished. "Show HN: JsonBeam - 17 JSON tools that never upload your data". AIOS preps title options, first comment, and answers to the predictable objections (why not jq, why not my IDE, huge files, how it makes money). Tarun launches Tue-Thu ~9am ET and lives in the thread that day.
- [ ] Newsletter pitches SENT within days of HN (Console.dev first: best fit). Reference the HN reception if it went well.
- [ ] Indie Hackers launch post the same week.
- [ ] Product Hunt: go/no-go decision after HN. PH adds a backlink + proof; skip and fix first if HN feedback was rough.
- [ ] pSEO batch 2, sized by what batch 1 did in GSC. Candidates: more error pages, converter guides, comparison pages ("JsonBeam vs JSONLint", "why not just my IDE").
- [ ] X build-in-public starts light: 3/wk, visualizer screenshots (the JSON Crack trick).
- [ ] **Measure (Sep 1):** GSC impressions trend, indexed count, backlinks won, HN/newsletter referral spikes, AdSense status.

## Days 61-90 (Sep 2 - Oct 1) — Sustain + double down

- [ ] Weekly review feeds or kills each channel on data (fair test = 4-6 wks feed channels, 3 mo SEO).
- [ ] pSEO batch 3 per GSC data.
- [ ] Comparison + "why not just my IDE" content set completed.
- [ ] Follow up every sent pitch once (day 7-10), then stop.
- [ ] **Day-90 scorecard (Oct 1):** indexed pages, organic clicks/wk, backlinks, referrals by source, AdSense approval + first earnings, AI-citation spot check. Rescore the JsonBeam column in `marketing/playbook.md` with real data.

## Success criteria

Ceiling honesty: dev audiences run ad blockers heavily (~40-60%), so realized RPM will
undercut GradeJar's. The bet is volume + daily-repeat use. If Day-90 data says the ceiling
is too low, this plan throttles to maintenance and the queue budget goes to GradeJar.
That's a fine outcome; the plumbing and backlinks keep paying anyway.

| Checkpoint | Realistic target (estimates, not promises) |
|---|---|
| Day 30 | All 21 pages indexed; AdSense unblocked or approved; 10+ directory/awesome-list links; error batch 1 live; Reddit account warm |
| Day 60 | Show HN done; 300-1,500 organic visits/mo; 5-10 quality backlinks; 1-2 newsletter mentions |
| Day 90 | 1,000-5,000 visits/mo trending up; ads serving; one channel clearly winning -> feed it |

## Standing rules

- One queue with GradeJar, ≤15 min/day total. GradeJar's back-to-school window wins ties through mid-September.
- Never: LinkedIn, work email, paid ads, auto-posting to communities, unreviewed external copy, unverified privacy claims.
- Show HN and newsletter pitches are one-shots. Never send early just to hit a date.
