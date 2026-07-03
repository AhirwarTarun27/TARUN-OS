# Marketing Playbook (reusable engine)

The framework the AIOS uses to market any product in the portfolio. Product-agnostic by
design: the model, criteria, SOPs, and tools below never change. What changes per product
is the scoring: each product gets its own priority column in the master table and its own
research folder at `marketing/<product>/` (channels, competitors, content strategy,
action plan, outreach targets).

Products through it so far: **GradeJar** (teachers, US-first) and **JsonBeam** (developers,
global with US priority). To onboard the next product: add a priority column, rescore the
table for that audience, generate `marketing/<product>/`.

Built: 2026-07-03. Generalized to multi-product: 2026-07-03. Budget assumption: $0 (organic
only). Human time: ~15 min/day approve-and-post TOTAL across all products (one shared
queue), plus ~30 min Sundays.

## The model

AdSense products make money one way: **traffic x RPM**. So marketing optimizes for:

1. **Recurring visitors** beat one-time visitors. A teacher who grades weekly is worth ~30 visits/yr. A dev whose default JSON tool is yours is worth hundreds. A one-question visitor is worth 1-3.
2. **US traffic** beats global (US RPM is 3-10x higher). And *realized* RPM depends on the audience: dev audiences run ad blockers heavily (~40-60%), teachers mostly don't. Score volume AND what a view actually pays.
3. **Compounding channels** (SEO, pins, videos, backlinks) beat feed channels (posts that die in 24h).
4. **Tool queries survive AI search.** AI Overviews eat informational queries, but a user still has to visit to USE a calculator or formatter. Bias toward "do a thing" keywords over "learn a thing" keywords.

## Scoring criteria (1-5 each)

| Criterion | 5 means | 1 means |
|---|---|---|
| Audience fit | Exactly our users, in tool-hunting mode | Wrong people or wrong mindset |
| Traffic potential | Can drive 10k+ visits/mo at maturity | <100 visits/mo ceiling |
| Conversion potential | Visitors become repeat users | Drive-by, never return |
| Time required | Near zero ongoing | Daily heavy lifting |
| Cost | Free forever | Needs real budget |
| Scalability | Compounds without more effort | Linear: more traffic = more work |
| Ease of automation | AIOS runs it end-to-end | Human-only |
| Long-term ROI | Still paying off in 2 years | Dead in a week |

## Master channel ranking (one priority column per product)

The qualitative columns describe the channel at its best fit; the per-product columns are
the verdict for that audience. The "why" behind each verdict lives in that product's
`marketing/<product>/channels.md`.

Priority key: **H** = in the action plan now. **M** = activate after H channels are running
or at a trigger event. **L** = not worth it for this product. **X** = excluded by boundary
or budget.

| Channel | ROI (best fit) | Difficulty | Cost | Time to results | Automation | Long-term value | GradeJar | JsonBeam |
|---|---|---|---|---|---|---|---|---|
| Google SEO (core pages) | Very high | Medium | $0 | 2-6 mo | High (AIOS drafts) | Very high | **H** | **H** |
| Programmatic SEO | Very high | Medium | $0 | 2-6 mo | Very high | Very high | **H** | **H** (error-message + converter patterns) |
| AI Search Optimization (GEO) | High | Low | $0 | 2-3 mo | High | Very high | **H** | **H** |
| Backlinks / digital PR | Very high | Medium | $0 | 1-3 mo | High (drafts + target lists) | Very high | **H** | **H** |
| Niche blogs/newsletters outreach | High | Medium | $0 | 1-3 mo | High (AIOS drafts pitches) | High | **M** (teacher blogs, inside PR) | **H** (dev newsletters are THE dev channel) |
| Pinterest | High | Low-med | $0 | 1-3 mo | Very high (drafts + free scheduler) | High | **H** | **L** (devs don't plan on Pinterest) |
| Reddit | High | Medium | $0 | Days-weeks | Medium (drafts; human posts) | High (feeds AI citations) | **H** | **H** (r/webdev, r/javascript) |
| Email newsletter (own list) | High | Low | $0 (free tier) | 3-6 mo | Very high | Very high | **H** | **L** (nobody subscribes to a formatter) |
| HARO-style (SOS, Qwoted, Featured) | High | Low | $0 | 1-2 mo | High (AIOS drafts pitches) | High | **H** (inside PR) | **M** (fewer dev-relevant queries) |
| Hacker News (Show HN) | High (spike) | Low | $0 | 1 day | Medium | Medium (links + folklore) | **L** (wrong audience; one privacy-story shot) | **H** (one launch; this IS the audience) |
| GitHub (awesome lists, OSS) | High | Low-med | $0 | Weeks-months | High | High | **L** | **H** (awesome-list PRs now, OSS later) |
| Facebook Groups | Medium-high | Medium | $0 | Days-weeks | Medium (drafts; human posts) | Medium | **M** | **L** |
| YouTube (how-to screencasts) | High | High | $0 | 3-6 mo | Medium (scripts yes, recording no) | Very high (most AI-cited platform) | **M** | **M** (trigger: error pages take off) |
| YouTube Shorts | Medium | Medium | $0 | 1-3 mo | Medium | Medium | **M** | **L** |
| Bluesky | Medium | Low | $0 | Weeks | High | Medium | **M** (#EduSky) | **M** (dev presence growing) |
| X (Twitter) | Medium | Low | $0 | Weeks | High | Low-med (links throttled) | **M** | **M** (build-in-public + visual shares) |
| Product Hunt | Medium | Medium | $0 | 1 day spike | Medium | Medium (backlink + proof) | **M** (once, at full feature) | **M** (once, after Show HN) |
| Quora | Medium | Low | $0 | 1-2 mo | High | Medium (AI training source) | **M** | **L** (devs use Stack Overflow, not Quora) |
| Startup/tool directories | Medium | Low | $0 | 1-2 mo | High (one-time batch) | Medium (backlinks) | **M** (one-time) | **M** (one-time) |
| Niche review sites / indexes | Medium | Low | $0 | 1-3 mo | High (one-time) | Medium | **M** (EdTech Index etc, one-time) | **L** (directories cover it) |
| Referral mechanics (in-product share) | High | Medium | $0 | 1-3 mo | Product work, then zero | High | **M** (product task) | **M** (shareable links; product task) |
| Niche influencer partnerships | Medium-high | High | $0 (goodwill) | 2-6 mo | Medium (AIOS finds + drafts) | High | **M** (after traction) | **L** (newsletters cover it) |
| Dev.to / Hashnode | Medium | Low | $0 | 1-2 mo | Very high | Medium (syndication + GEO consensus) | **L** (wrong audience) | **M** (syndicate site content, canonical) |
| Indie Hackers | Medium | Low | $0 | Days | High | Low-med | **L** (builders, not teachers) | **M** (builders ARE users here) |
| Medium | Low | Low | $0 | 1-2 mo | Very high | Low (traffic gutted by AI) | **L** (syndication only) | **L** (Dev.to covers syndication) |
| Instagram | Low-med | High | $0 | 3-6 mo | Medium | Low (link-hostile) | **L** | **L** |
| TikTok | Low-med | High | $0 | Variable | Low | Low (volatile) | **L** | **L** |
| Threads | Low | Low | $0 | Weeks | High | Low | **L** | **L** |
| Discord communities | Low | Medium | $0 | Weeks | Low (human-only) | Low | **L** | **L** |
| Slack communities | Low | Medium | $0 | Weeks | Low | Low | **L** | **L** |
| Stack Overflow | Low | High | $0 | Weeks | Low (mods remove tool links) | Medium (AI-cited) | **L** | **L** (ban risk > payoff) |
| Podcasts (guesting) | Medium | High | $0 | 3-6 mo | Low | Medium | **L** (revisit after traction) | **L** |
| Guest posting | Medium | High | $0 | 2-4 mo | Medium | Medium | **L** (PR outreach covers it) | **L** |
| Cold email | Low | Medium | $0 | Weeks | High | Low (to users = spam; to editors = that's PR) | **L** | **L** |
| Affiliate marketing | Low | Medium | Rev share | Months | Medium | Low (no margin: AdSense pays us, not users) | **L** | **L** |
| Local communities | Low | Medium | $0 | Months | Low | Low (products are not local) | **L** | **L** |
| AI tool directories | Low | Low | $0 | Weeks | High | Low | **L** (not an AI tool) | **L** (not an AI tool) |
| Paid ads: Google/Meta/Reddit/Pinterest/X | Negative at $0 | Medium | $$$ | Days | High | Low for AdSense model | **X** (budget) | **X** (budget) |
| Influencer (paid) | Unknown | Medium | $$$ | Weeks | Medium | Medium | **X** (budget) | **X** (budget) |
| LinkedIn | n/a | n/a | n/a | n/a | n/a | n/a | **X** (hard boundary: job-growth only) | **X** (hard boundary: job-growth only) |

Why paid is X even beyond budget: AdSense RPM on tool sites runs roughly $5-25 per 1,000 views (estimate, before ad blockers). Almost any CPC is higher than what a visit earns back. Paid only makes sense to seed a compounding loop (e.g. Pinterest pin engagement), never for direct traffic.

## SOPs (what the engine runs)

**Daily (AIOS drafts, Tarun approves ~15 min):** run `/marketing`. It reads every active `marketing/<product>/action-plan.md` + content strategy, drafts today's items across all products (pin, Reddit comment/post, pitch, page copy), writes them to ONE `marketing/queue/YYYY-MM-DD.md`. Tarun approves, posts, marks done. Posted items land in `marketing/log.md`. The 15-minute budget is total, not per product.

**Weekly (Sunday, with /weekly-review):** pull `node scripts/report.mjs`; compare channels per product; kill what's flat after a fair test (4-6 weeks for feed channels, 3 months for SEO); double down on what moves; adjust next week's calendar.

**Monthly:** rank check on money keywords per product, backlink review, refresh 1-2 old pages, GEO citation spot-check (ask ChatGPT/Perplexity/Claude the money questions, log who gets cited).

**Per-launch (new product):** add a priority column to the master table and rescore for the new audience -> generate `marketing/<product>/` (channels, competitors, content-strategy, action-plan, outreach-targets) -> directory batch + launch-window plan in week 1.

**Outreach SOP:** AIOS builds target list with contact + why-them -> drafts personalized pitch (value-first: here is a free tool your readers will use, here is what makes it different) -> Tarun approves + sends from personal (non-work) email -> log in `marketing/log.md` -> one polite follow-up after 7 days, then stop.

**Community SOP (Reddit/FB/HN):** 90/10 rule. 9 genuinely helpful comments/answers for every 1 mention of the product. Never drop bare links. Mention the tool only when it answers the actual question, disclose "I built this," prefer answering the question in-thread AND linking. One community at a time until trusted.

## Tools (all free)

| Job | Tool | Notes |
|---|---|---|
| Drafting, research, scheduling logic | The AIOS (this repo) | The whole point: no paid SaaS |
| Analytics | GA4 + Cloudflare + `scripts/report.mjs` | Already wired |
| Search performance | Google Search Console | **Not wired yet — needs Tarun auth** |
| Pin scheduling (GradeJar) | Pinterest native scheduler | Free, 30 days ahead |
| Email list (GradeJar) | MailerLite or Buttondown free tier | Free to 500-1,000 subs |
| PR requests | Source of Sources (free), Qwoted free tier, Featured | HARO successors |
| Rank spot-checks | Manual search + GSC | No paid rank trackers |
| Image/pin creation | Canva free / HTML-to-image templates | AIOS can generate copy + layout specs |

## Reuse notes

- The criteria and SOPs are product-agnostic. Scores are not: every product gets its own column, scored for its audience. Never copy a column.
- The GradeJar vs JsonBeam columns show how hard scores flip per audience: Pinterest/FB/own-email go H->L, HN/GitHub/dev-newsletters go L->H. Rescoring is the whole job.
- Keep every score honest. If a channel gets a fair test and flatlines, mark it L in that product's column and write why in `decisions/log.md`.
