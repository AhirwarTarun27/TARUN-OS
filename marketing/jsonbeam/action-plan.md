# JsonBeam — Marketing Action Plan (30/60/90)

Written 2026-07-03. Budget $0. ONE combined queue with GradeJar; GradeJar's back-to-school
window (Aug 1 - Sep 15) wins ties through mid-September. Engine is **weekly-first** as of
2026-07-10 — the REPLAN below supersedes the 30/60/90 cadences; the checklists survive as
the item inventory with status tags (`[>]` moved, `[~]` parked).

## REPLAN 2026-07-10 — maintenance mode (through GradeJar's window; re-decide at Day-90)

Reality check: GA4 users fell 60 → 25 across the first week of tracking, and AdSense
rejected the site for low-value content on Jul 8 (flagged pages fixed + redeployed same
day; re-review clock running). Neither breaks the plan's logic — the organic discovery
work simply hasn't landed yet — but the dev-adblock ceiling plus GradeJar's seasonal
window mean JsonBeam runs MAINTENANCE until the Day-90 rescore. The decline is observed,
not panic-actionable: don't spend budget chasing it before organic assets exist.

**Product repo (build mode):** _confirm local path at first build-mode run and record it here._

**Allowed items only:**

- [ ] **M1 — Directory "Starter 5" batch** (drafts ready in `marketing/queue/2026-07-08.md`:
  AlternativeTo, SaaSHub, StackShare, Slant, Toolify). One sitting; one-time backlinks.
- [ ] **M2 — BUILD: privacy-audit flagship article** ("I checked what 10 online JSON
  formatters do with your data", network-tab receipts). AIOS writes it complete in the
  JsonBeam repo → `[ ] BUILT` · published on-site, canonical → `[ ] SHIPPED`.
  NOTE: on-site publishing needs the observe-mode exception decision (Days 1-30 note
  below) — Tarun's call, log it in `decisions/log.md`.
- [ ] **M3 — Show HN gate, UPDATED:** prereqs = Phase 0 ✓ + privacy verified ✓ + pages
  polished + **AdSense re-review PASSED**. Never spend the one shot while the low-value
  cloud is unresolved and a traffic spike can't monetize.
- **Cap: ≤2 human items/week.** Everything else in the 30/60/90 below is parked to the
  Day-90 rescore.

**Baseline (live via `scripts/report.mjs`, 2026-07-03):** 36 users / 46 sessions / 84
pageviews in the last 7 days. Direct 34 sessions, organic search 7, social 4. US 18 users,
India 10. AdSense: site GETTING_READY, $0. Live pages: 17 tools + 4 info.
Translation: the site exists but Google barely sends anyone. This plan is discovery first,
amplification second.

## Phase 0 — visibility plumbing (this week, Jul 3-6)

Same lesson as the GradeJar audit: nothing below matters until the acquisition systems can
see the site. Tarun tasks (auth needed); AIOS preps each step.

- [x] **AI-search crawlers + WAF 403, re-verified 2026-07-04:** live curl check (browser UA, GPTBot, OAI-SearchBot, ClaudeBot) all return HTTP 200 — the earlier WAF 403 on non-browser fetchers is gone. robots.txt is in the correct state: `OAI-SearchBot`/citation bots fall through to `Allow: /`; only pure-training bots (GPTBot, ClaudeBot, CCBot, Google-Extended, Amazonbot, Bytespider, meta-externalagent, Applebot-Extended) stay disallowed. Bing added too (Bing Webmaster connected, both sites verified — see [[gradejar-current-state]] equivalent decision 2026-07-03).
- [x] **AdSense ads.txt check, re-verified 2026-07-04:** `jsonbeam.com/ads.txt` serves `google.com, pub-6296837849054919, DIRECT, f08c47fec0942fa0` correctly. Site still shows `GETTING_READY` in the AdSense API (review clock running, not stalled on ads.txt) — normal, reviews take days-to-2wks.
- [x] **Google Search Console, VERIFIED 2026-07-03:** jsonbeam.com property live; `sitemap.xml` submitted and reads **Success, 22 discovered pages** = all real pages (17 tools + home + about + contact + privacy + terms). One sitemap is correct and complete (no index/split needed under 50k URLs). Confirmed live: `robots.txt` correctly advertises `sitemap.xml`, and the stale `sitemap-index.xml`/`sitemap-0.xml` from the old build tool return HTTP 404 in production (they only linger in local `dist/`; wipe with a clean rebuild). Indexing requested on the 6 money pages. GSC API still not wired (query/impression data still needs Tarun's one-time auth) — separate follow-up, not a Phase-0 blocker.
- [x] **Verify the privacy claim end-to-end, VERIFIED 2026-07-07:** DevTools Network check (Tarun) + source audit (AIOS) agree. The only outbound requests are GA4 (`collect` — page views + an `expand_editor` event carrying the *tool name*, e.g. "JSON as a Tree", NOT user JSON), Google AdSense (`sodar` ad-integrity signal), and Cloudflare RUM (`rum` perf beacon). Source confirms the sole event-sender is `island-fullscreen.ts:85` `gtag('event','expand_editor',{tool})`; JSON is processed in a local Web Worker via `postMessage`, never `fetch`/`sendBeacon`/XHR. **The pasted JSON never leaves the browser — claim holds.** Copy nuance: say "your JSON is never uploaded", NOT "no tracking" (GA4 + AdSense are present and disclosed on /privacy). Devs will open the Network tab on HN — claim the airtight thing.
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

- One weekly Sunday queue with GradeJar (≤45 min total, chained from `/weekly-review`);
  JsonBeam gets ≤2 human items/week in maintenance. GradeJar's back-to-school window wins
  ties through mid-September.
- Never: LinkedIn, work email, paid ads, auto-posting to communities, unreviewed external copy, unverified privacy claims.
- Show HN and newsletter pitches are one-shots. Never send early just to hit a date.
