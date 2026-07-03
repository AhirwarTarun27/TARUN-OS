# JsonBeam — Channel Research

Researched 2026-07-03 with live checks. Audience: developers, QA, and data folks who touch
JSON daily. Global by nature, US-first for RPM (GA4 already shows US #1, India #2).
Positioning hooks that work everywhere: **fast, all-in-one (17 tools), no login, private
(JSON never leaves the browser)**.

Two honesty rules for all copy:
1. **Verify the privacy claim end-to-end before leading with it** (devtools open, every
   tool, no payload leaves the browser). Devs will check. HN will check live.
2. **Never say "ad-free."** AdSense is coming (site is GETTING_READY). "Fast and clean"
   is the framing that survives ads.

The privacy hook is bigger than it looks: devs paste production API payloads (tokens,
emails, PII) into random ad-stuffed formatter sites every day, and most companies tell
them not to. A toolkit that provably processes everything client-side sidesteps that whole
anxiety. It is the JsonBeam version of GradeJar's FERPA story.

All traffic/conversion numbers are estimates to set expectations, not promises.

---

## Tier 1 — full deep dives (these are the plan)

### 1. Google SEO (core pages)

- **Why:** "json formatter" and friends are huge, evergreen dev searches. Tool queries survive AI Overviews: you use a formatter, you don't read about it. 17 tool pages already exist; each is a keyword page.
- **Who's there:** devs mid-task with zero patience. They click the top result, paste, format, leave or bookmark. Winning = rank + instant load + obviously usable in 2 seconds.
- **Reality check:** head terms ("json formatter", "json validator") are owned by domains aged 10-20 years (jsonformatter.org, jsonlint.com, codebeautify.org). We don't fight that yet. We flank on long-tails with weaker incumbents: "json repair online", "fix invalid json", "json to typescript interface", "json to go struct", "json diff online", "json table viewer". Repair + convert intents are the soft underbelly.
- **Content that performs:** tool above the fold, one-line answer first, short how-it-works, FAQ (schema'd), cross-links across all 17 tools.
- **RPM honesty:** dev audiences run ad blockers at the highest rate of any audience (~40-60% on dev tools). Realized RPM will undercut GradeJar's teacher traffic. Volume + daily-repeat use has to carry it. Priced into the plan.
- **Frequency:** 1-2 new/refreshed pages per week. **Mistakes:** chasing the head term first; thin pages; publishing before GSC is wired.
- **Traffic potential:** 10k-100k+ visits/mo at maturity (codebeautify-class ceiling). **Difficulty:** Medium. **Budget:** $0. **ROI:** Highest of any channel here.
- **Automatable:** High. AIOS owns keyword map + drafts every page. Note: on-page changes are code in the JsonBeam repo, which has been in observe mode. SEO-critical edits only, Tarun's call.
- **Workflow:** AIOS picks next keyword from map -> drafts copy + meta + FAQ JSON-LD -> Tarun reviews, builds, deploys -> submit URL in GSC -> check impressions at 2/6/12 weeks.

### 2. Programmatic SEO

- **Why:** the proven tool-site model. Two patterns fit JsonBeam exactly:
  - **Error-message pages:** "unexpected token < in json at position 0", "unexpected end of json input", "json parse error trailing comma". Massive recurring searches, currently answered by Stack Overflow threads. Each page: explain the error in one sentence, show the fix, embed/link `/json-repair` to fix it live. Nobody in the niche pairs the explanation with an interactive fixer. This set feeds the tool AND ranks.
  - **Converter pages:** extend json-to-X beyond csv/yaml/typescript/go: xml, python (pydantic/dataclass), java, kotlin, zod, sql. Each has its own search demand. New converters are product work; guides can start content-only.
- **Mistakes:** near-duplicate thin pages; launching 50 at once. Batches of 10-15, watch GSC, scale or stop.
- **Traffic potential:** 5k-50k/mo across the long tail. **Automatable:** Very high (template + data + AIOS copy).

### 3. AI Search Optimization (GEO)

- **Why:** devs are the heaviest AI-assistant users of any audience. "best online json formatter", "is it safe to paste json into online tools", "how to fix invalid json" get asked in ChatGPT/Claude/Perplexity constantly. AI referrals convert ~3-4x better. Nobody in this niche structures for citations.
- **BLOCKER FOUND (verified 2026-07-03):** Cloudflare's managed robots.txt on jsonbeam.com blocks ClaudeBot, GPTBot, CCBot, Google-Extended, Amazonbot, Bytespider, meta-externalagent. AND the site returns 403 to non-browser fetchers (seen live), meaning Cloudflare bot protection may block even robots.txt-allowed crawlers at the WAF layer. Fix both: allow citation bots (OAI-SearchBot, ChatGPT-User, ClaudeBot/Claude-SearchBot, PerplexityBot) in robots.txt AND check Bot Fight Mode / Super Bot Fight settings. robots.txt can't fix a 403.
- **How citation works:** front-loaded answers, Q&A structure, schema, multi-source consensus (Reddit + GitHub + dev.to + own site). Reddit feeds ~46% of Perplexity citations; for dev tools, GitHub presence feeds AI answers too. So Reddit/GitHub work is ALSO GEO work.
- **Workflow:** unblock crawlers -> front-load every tool page's answer -> build consensus mentions -> monthly citation audit in `marketing/log.md`.

### 4. Backlinks / digital PR — dev flavor

- **Why:** low domain authority; links change what we can rank for. The dev version of PR is NOT HARO: it's newsletters, awesome lists, and tool roundups.
- **Targets:**
  - **Dev newsletters:** Console.dev (reviews dev tools weekly: the single best-fit pitch in this plan), JavaScript Weekly / Node Weekly / Frontend Focus (Cooperpress), Bytes (ui.dev), TLDR Web Dev. One inclusion = thousands of qualified visits + a permanent authoritative link.
  - **GitHub awesome lists:** awesome-json and adjacent lists. A merged PR = permanent high-value backlink + steady discovery. Read each list's contribution rules first; some require OSS: skip those honestly.
  - **"Best JSON tools" listicle authors:** dozens of dev blogs run them; pitch an update, value-first.
- **Timing rule:** pitch AFTER on-page polish + privacy verification. One first impression with editors.
- **Frequency:** a 2-3 week pitch wave (3-5/wk), then opportunistic. One follow-up at day 7-10, then stop.
- **Traffic potential:** referral spikes + the SEO multiplier. 10-30 quality links in 90 days changes what the domain can rank for. **ROI:** Very high.

### 5. Reddit (dev subs)

- **Why:** r/webdev, r/javascript, r/node, r/learnprogramming, r/SideProject, r/InternetIsBeautiful. Recurring threads: "tools you use daily", JSON parse-error help, "stop pasting secrets into online tools". Doubles as GEO (Reddit feeds AI citations).
- **Audience behavior:** even more marketing-allergic than teachers. Most dev subs ban self-promo outside designated threads (r/webdev = Showoff Saturday). Read each sub's rules BEFORE the first post.
- **Non-spammy:** 90/10 strictly. Answer the question fully in-thread, mention the tool only when it truly fits, always disclose "I built this". Age the account: 2 weeks pure helpfulness, zero links. NEVER automate.
- **Frequency:** 3-5 helpful comments/wk, ≤1 mention/wk. **Traffic:** spiky (a good thread = 500-5k visits); the AI-citation echo is the long-term payoff.

### 6. Hacker News (Show HN)

- **Why:** THE dev launch channel, and JsonBeam is HN-shaped: fast, no-login, privacy-respecting utility by a solo dev. Front page = 10k-50k visits in a day + permanent links + follow-on newsletter mentions (editors trawl HN for content).
- **One shot.** Prereqs: Phase 0 done (else the traffic is wasted on an invisible site), privacy claim verified (HN reads the network tab live), pages polished, comment ammo prepped.
- **The pitch:** "Show HN: JsonBeam - 17 JSON tools that never upload your data". Launch Tue-Thu ~9am ET; Tarun lives in the thread that day; AIOS pre-drafts answers to the predictable objections (why not jq, why not my IDE, what about huge files, how do you make money).
- **Honest expectations:** most Show HNs get 5-20 upvotes and a few hundred visits. Front page is a lottery ticket; good prep just makes the ticket cheap. Rules: no vote-begging, no sockpuppets, disclose everything.

### 7. GitHub

- **Why:** devs discover tools through GitHub. Two plays:
  - **Now (near-zero cost):** awesome-list PRs + a proper JsonBeam GitHub presence to link from.
  - **Later (big commitment):** open-source one component (e.g. the JSON repair engine) as a standalone package. JSON Crack built 30k+ stars and its entire funnel this way. Only if/when the bet justifies it: run it through /roast first.
- **Automatable:** High for the list PRs (AIOS drafts, Tarun submits).

---

## Tier 2 — activate later or at trigger events (M)

- **Product Hunt:** one launch, AFTER Show HN (HN feedback sharpens the PH pitch). Realistic: a few hundred visitors + a permanent backlink + proof.
- **Dev.to / Hashnode:** syndicate site guides with canonical tags ("How JSON repair actually works", the privacy-audit piece). High automation, modest steady traffic, feeds GEO consensus.
- **X (dev Twitter):** build-in-public + visualizer screenshots (JSON Crack's growth trick: pretty graph images travel even with throttled links; the image IS the content). 3 posts/wk, AIOS-drafted.
- **Indie Hackers:** builders are actual users here (flip from GradeJar). Launch post + milestone posts, light touch.
- **Bluesky:** growing dev community, link-friendly, zero competition. 3/wk if the budget allows.
- **YouTube:** "fix broken JSON in 10 seconds" screencasts. M-low: formatter demos are thin. Trigger: if error-message pages take off, mirror the top ones in video.
- **Directories (one-time batch):** AlternativeTo, SaaSHub, LibHunt, StackShare, free-tool directories. 15-20 submissions, one sitting, AIOS pre-fills every form.

## Tier 3 — not for JsonBeam (L)

- **Pinterest / Facebook groups / Instagram / TikTok / Threads:** developers don't tool-hunt there. (Pinterest/FB are H/M for GradeJar: the playbook columns show the flip.)
- **Own email newsletter:** nobody subscribes to a formatter's newsletter. The retention play here is bookmark + default-tool habit, not inbox. Revisit only if the error-guide content grows a real readership.
- **Quora:** devs ask Stack Overflow, not Quora. Skip.
- **Stack Overflow:** tempting, but mods + the rep system remove tool links on sight. Ban risk > payoff. Individual genuine answers are fine; as a channel, skip.
- **Discord/Slack dev servers:** private, anti-promo, human-only. Not worth the 15 min/day.
- **Podcasts / guest posts / cold email:** slow, heavy, or spam. Revisit at 10k+ visits/mo.

## Excluded (X)

- **Paid ads (all platforms):** $0 budget, and dev CPC vs ad-blocked RPM is deeply negative math.
- **LinkedIn:** hard boundary. Job-growth only. Never in any queue.
