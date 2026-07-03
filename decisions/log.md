# Decisions Log

Append-only record of meaningful decisions and why they were made. `/level-up` Phase 2 (Method interview) writes scoped automation specs here. You can also append manually whenever you decide something worth remembering.

**Format per entry:**

```
## YYYY-MM-DD — Short title

**Decision:** what was decided.

**Why:** the reasoning, constraints, and what would change your mind.

**Alternatives considered:** what else was on the table.

**Owner:** who's accountable.
```

Keep it terse. Future-you will thank present-you for capturing the *why*, not just the *what*.

---

## 2026-06-27 — Built the project-pipeline skill set

**Decision:** Created six skills to systematize new-product creation: `/scout-problem` (standalone, data-driven idea validation) plus a `/explore-project` parent that orchestrates `/domain-namer`, `/pick-stack`, `/design-architecture`, and `/setup-kit`. Moved `domain-namer` from user-level into this repo.

**Why:** Project exploration was the repetitive pain — re-typing a long research/domain/keyword prompt for every new product. Encoding the proven Jsonbeam process into modular skills removes the re-typing and bakes in selection criteria (small underserved problem + enough demand + beatable top-10 + front-end-heavy + AdSense-viable + ~3-4 week MVP) so future projects are picked on data, not preference.

**Why all at once (against the one-at-a-time default):** The process is already proven on Jsonbeam, and the skills get reviewed/corrected one by one. Real validation comes on the first live `/scout-problem` run.

**Alternatives considered:** One skill per week via `/level-up` (rejected — process already proven, user wanted them today). One giant prompt instead of modular skills (rejected — modular skills are individually correctable).

**Owner:** Tarun.

---

## 2026-06-27 — NO-GO: client-side image converter lane (HEIC→JPG, WebP→PNG)

**Decision:** Killed the image-converter lane as bet #2. First live `/scout-problem` run.

**Why:** Demand passes easily (many high-authority brands maintain dedicated pages, active HN/Reddit signal) but "beatable top-10" fails. Page 1 for `heic to jpg` / `webp to png` is a fortress of domain-authority giants (Canva, Adobe Express, iLoveIMG, CloudConvert, FreeConvert, Cloudinary, Pixlr), and the differentiation wedge (client-side, no-upload, ad-free, batch) is already executed by focused challengers — picflow.com (HEIC) and toWebP.io (WebP) both rank. Second strike: the best-ranking tools run no ads on purpose (convert-and-leave UX), so AdSense math is weak even if we ranked. A new zero-authority domain can't win this in the ~3-4 week MVP window.

**Refined selection rule (carry forward):** Do not chase high-demand niches already owned by high-authority brands, even when demand is huge. Prioritize (1) a genuinely winnable top-10 and (2) high AdSense CPM, over raw demand. Avoid YMYL and pure-developer audiences (adblock kills RPM).

**Alternatives considered:** Reshape into a long-tail converter suite targeting softer SERPs (deferred — user chose to leave the lane). Push HEIC via non-SEO distribution (rejected — breaks the AdSense/SEO thesis).

**Owner:** Tarun.

---

## 2026-06-27 — GO: Teacher grade tools (EZ Grader, reinvented) as bet #2 candidate

**Decision:** GO on a modern teacher-first grade calculator. Brief: `research/teacher-grade-tools.md`. Validated against HVAC/BTU (NO-GO) and wedding seating (NO-GO).

**Why:** Only scouted idea that passes "beatable top-10." Page 1 is low-authority, dated, **stateless** single-purpose calculators (ezgrader.us, quickgra.de, etc.); no authority moat. Wedge = persistence (localStorage-saved classes/rosters, multi-assignment, custom scales, export) — no incumbent does it, $0 backend, no login. AdSense proven in-niche. Front-end-heavy, ~3-4 wk MVP. **Caveat:** medium CPM (education) vs the high-CPM niches we killed; bet on volume + winnable SERP + suite expansion. Tradeoff accepted: a tool that ranks at medium CPM beats a high-CPM tool that never ranks.

**Alternatives considered:** Keep hunting for a winnable-AND-high-CPM niche (rejected — that intersection is rare; ship the winnable one now). HVAC/BTU (NO-GO: omni + calculator.net + retailers + strong dedicated accalculator.com). Wedding seating (NO-GO: Canva + WeddingWire + 6 dedicated free tools, heaviest build).

**Owner:** Tarun.

---

## 2026-06-27 — Pre-Build Brief: Gradejar (teacher grade tools) scoped for build

**Decision:** Ran `/explore-project` on the GO brief. Locked: name **Gradejar** / **gradejar.com** (live-verified open); stack **Astro SSG + Preact islands + Tailwind + system fonts, static on Cloudflare Pages, localStorage persistence, AdSense + CF Web Analytics**; architecture **pure-static edge-cached, shared `grade-core` TS engine across many keyword landing pages, versioned `store.ts`, schema.org + sitemap**. Full brief: `research/teacher-grade-tools-prebuild.md`.

**Why:** Static + edge is the cheapest scalable answer for a front-end-heavy, mass-traffic SEO tool with $0 backend (matches the constraint + the Jsonbeam pattern). Astro ships 0 JS on content → fastest CWV + best crawlability to beat dated incumbents. "Jar" lands the persistence wedge while staying brandable (not exact-match, post-EMD safe) and collision-free — unlike `gradekeep`, which clashes with the established Gradekeeper gradebook.

**Key calls:** (1) Name = Gradejar over open-but-colliding gradekeep; backups tallygrade/keepgrade. (2) NO Partytown for AdSense — verified it breaks ad scripts + lowers Lighthouse; load AdSense natively with reserved slots. (3) Biggest risk = localStorage data loss (the whole wedge is "it remembers") → mitigate via versioned single-writer `store.ts` + migrate() + early JSON export + never auto-delete.

**Alternatives considered:** Next.js (rejected — heavier JS, needless SSR); Eleventy (close 2nd, lost on island ergonomics); gradekeep.com (rejected — Gradekeeper brand clash); Partytown offload (rejected — breaks AdSense).

**Owner:** Tarun.

---

## 2026-06-29 — Doc-reference MCPs become local `references/mcp/` files instead of installed servers

**Decision:** Changed the MCP policy across `explore-project`, `setup-kit`, and `CLAUDE.md`. On approval, MCPs now branch by type: **doc-reference (read-only) MCPs are NOT installed** — instead the resource is researched once and cached as `references/mcp/<tool-name>.md` (functions, params, usage), and future sessions read that local file. **Action MCPs** (GitHub, DB, filesystem — they execute things) remain the exemption and still get installed at least-privilege. **Playwright** stays the standing pre-approved exception. Files refresh only on the command "update the `<tool-name>` reference". Applies to this repo too, not just scoped projects.

**Why:** Live MCP calls cost tokens every session (protocol overhead + unpredictable response sizes) to fetch knowledge that barely changes. A local markdown copy delivers the same content for a fraction of the tokens. Manual refresh keeps the user in control of staleness. Action MCPs can't be cached (a file can't run a command) and browser verification can't be cached (Playwright), so both stay live.

**Alternatives considered:** Keep installing all approved MCPs (rejected — the recurring token cost is the whole problem). Auto-refresh the reference files on a schedule (rejected — docs change rarely; on-demand refresh is leaner and user-controlled).

**Owner:** Tarun.

---

## 2026-06-30 — API references for Cloudflare, AdSense, GA4 (APIs over MCP)

**Decision:** Use the REST APIs of Cloudflare, Google AdSense, and Google Analytics 4 directly (script + token), NOT MCP servers, and cache each one's docs as a local reference: `references/cloudflare-api.md`, `references/google-adsense-api.md`, `references/google-analytics-api.md`. Accounts already exist (Tarun's; JsonBeam domain was bought on Cloudflare).

**Why:** Token efficiency. These are stable, mostly read-only reporting/management APIs; a live MCP round-trip every session to fetch endpoints that rarely change is wasted tokens. A researched-once local markdown gives the same endpoints/params/auth for a fraction of the cost, refreshed on command. Matches the CLAUDE.md doc-reference-as-local-file rule.

**Key auth calls captured:** Cloudflare = scoped API token (Bearer), `wrangler login` for Pages deploy. AdSense = OAuth2 3-legged + refresh token (no service accounts supported); scope `adsense.readonly`. GA4 = service account added as property Viewer (preferred) or OAuth2; scope `analytics.readonly`. AdSense API only *reports* earnings — ads are served by the `ca-pub-` site tag, not the API.

**Alternatives considered:** Install MCP servers for each (rejected — recurring token cost, and these don't need to *execute* much beyond reporting). Rely on model memory of the APIs (rejected — versions drift; a dated, verified local file is safer).

**Owner:** Tarun.

---

## 2026-07-03 — GradeJar marketing engine: 8 organic channels, $0 budget, AIOS-drafted + 15-min human approve

**Decision:** Built the marketing system (Priority 2). Strategy lives in `marketing/` (reusable `playbook.md` + `gradejar/` channel research, competitors, content strategy, 30/60/90 action plan); execution is the new `/marketing` skill (daily queue -> approve-and-post -> append-only `marketing/log.md`). Active channels: Google SEO, programmatic SEO, AI-search optimization (GEO), backlinks/digital PR (incl. SOS/Qwoted/Featured + teacher-blog outreach), Pinterest, Reddit, own email list, Facebook groups. 40 channels researched and ranked; paid ads and LinkedIn excluded; TikTok/Instagram/dev platforms marked wrong-fit for this product (several fit JsonBeam — rescore there).

**Why:** AdSense economics = traffic x RPM, so compounding organic channels (search, pins, links, citations) beat feed channels, and teachers (weekly repeat users) beat students (seasonal one-shots). $0 budget rules out paid; paid also loses money against tool-site RPM anyway. 15-min/day human cap keeps ban-risk channels (Reddit/FB) viable without automation. Timing drove urgency: back-to-school (Aug 1-Sep 15) is the year's biggest teacher window and roundup editors assemble lists in July. Would change my mind: a channel flatlining after a fair test (4-6 wks feed, 3 mo SEO) gets killed at the Sunday scorecard.

**Audit findings that reshaped the plan (Phase 0, fix-first):** gradejar.com is live but (1) not indexed by Google at all, (2) not added in AdSense, (3) has no GA4 in the dashboard, (4) Cloudflare's managed robots.txt blocks AI-search crawlers, killing GEO until unblocked. Also flagged: wire the GSC API into `scripts/report.mjs` once verified (needs one-time auth).

**Alternatives considered:** Playbook-only without the skill (rejected — user chose to build the engine in the same push). Daily human-led posting on a social feed channel (rejected — violates the hands-off requirement and doesn't compound). Paid experiments (rejected — $0 budget + negative unit economics vs AdSense RPM).

**Owner:** Tarun approves/posts; the AIOS drafts and tracks.

---

## 2026-07-03 — Marketing engine generalized to multi-product; JsonBeam plan created

**Decision:** Promoted the marketing engine from GradeJar-only to portfolio-wide. `marketing/playbook.md` is now product-agnostic with one priority column per product (GradeJar + JsonBeam scored side by side); the `/marketing` skill reads every `marketing/<product>/action-plan.md` and builds ONE daily queue under the same 15-min/day total budget (GradeJar's back-to-school window wins ties through mid-Sep). Created `marketing/jsonbeam/` (channels, competitors, content-strategy, 30/60/90 action-plan, outreach-targets). JsonBeam's H channels: SEO, error-message pSEO, GEO, dev newsletters + awesome lists (PR), Reddit dev subs, Show HN, GitHub. Pinterest/FB/own-email flip to L for the dev audience.

**Why:** JsonBeam is live but invisible: 7 organic search sessions/wk (vs 34 direct), AdSense stuck GETTING_READY, and (verified live 2026-07-03) Cloudflare's managed robots.txt blocks AI crawlers while the WAF 403s non-browser fetchers. Same fix-first lesson as GradeJar's audit, so the plan opens with Phase 0 plumbing. One shared queue keeps the 15-min human cap real. Caveat accepted going in: dev audiences run heavy ad blockers (~40-60%), so JsonBeam's realized RPM ceiling sits below GradeJar's; the Day-90 scorecard decides whether it keeps queue share. Also flagged: the on-page SEO pass requires code changes in the JsonBeam repo, ending its "observe mode, no code" stance for SEO-critical edits only — Tarun's call to confirm.

**Alternatives considered:** Separate queue per product (rejected — doubles daily human time). Copying GradeJar's channel scores (rejected — Pinterest/email/FB don't fit devs; HN/GitHub/newsletters do). Waiting until GradeJar's back-to-school push is done (rejected — JsonBeam's Phase 0 fixes are one-time plumbing that gates everything, and GradeJar keeps queue priority anyway).

**Owner:** Tarun approves/posts; the AIOS drafts and tracks.

---

## 2026-07-03 — Add Microsoft Bing Webmaster Tools as a tracked measurement source (APIs over MCP)

**Decision:** Track the Microsoft-search ecosystem the same way as Google: hit the Bing Webmaster Tools REST API (JSON, `?apikey=`) with a local `references/bing-webmaster-api.md` reference, and wire it into `scripts/report.mjs` (`bingReport()` per verified site) + `scripts/verify-connections.mjs` (`checkBing()`). Reports now surface Bing clicks/impressions, URL-submission quota, and top Bing queries for jsonbeam.com + gradejar.com, alongside GA4/AdSense/Cloudflare. Both sites are added and verified in Bing Webmaster Tools and the 6 money pages were submitted for indexing. Built **dormant**: with no `BING_WEBMASTER_API_KEY` in `.env`, the report prints "not configured" and the verify check reports a neutral skip — nothing throws. Depth chosen = traffic + indexing quota + top queries (fullest).

**Why:** Bing is a second organic-search channel and its own indexing surface; ignoring it left the AIOS blind to Microsoft-side traffic and to whether the submitted pages get picked up. Same token-efficiency rule as the 2026-06-30 Cloudflare/AdSense/GA4 decision — a stable, mostly read-only reporting API is cheaper as key+ref than a live MCP. One API key per user covers all sites, so the marginal cost of adding future products is zero. Would change my mind: if Bing traffic stays flat-zero for months, demote it in the report.

**Key API facts captured:** JSON base `https://ssl.bing.com/webmaster/api.svc/json/{Method}`; auth via `?apikey=` (one key per user, generated in Settings → API Access); responses wrap payload under `d`; dates come back as `/Date(ms-offset)/` (parse with `/\/Date\((\d+)/`); workhorse = GetRankAndTrafficStats, plus GetUrlSubmissionQuota and GetQueryStats; SubmitUrlBatch for pushing URLs.

**Alternatives considered:** A Bing/Microsoft MCP server (rejected — recurring token cost for a stable reporting API). Manual dashboard checks (rejected — doesn't compound into the metrics-log track record). Traffic-only depth (rejected — the submission quota is directly useful right after submitting the money pages, and top queries mirror the GA4 read).

**Owner:** Tarun. One manual step remaining: generate the Bing API key and paste it into `.env` as `BING_WEBMASTER_API_KEY`.
