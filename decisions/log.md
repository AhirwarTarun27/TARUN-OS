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

---

## 2026-07-06 — Reframed `/scout-problem`: greenfield + impact-first, no preset wedge, backend allowed

**Decision:** Rewrote the selection philosophy in `.claude/skills/scout-problem/SKILL.md` across three of Tarun's corrections in one session:
1. **Greenfield + impact-first.** Every product is judged as a standalone build from scratch and ranked by **impact = demand × CPM × winnability**. Code/template reuse (GradeJar, JsonBeam, etc.) is forbidden from entering the verdict — it only tells you what NOT to re-scout.
2. **No preset wedge.** Persistence / "it remembers" is no longer assumed to be *the* differentiator. Some products need it, most don't. The wedge is whatever the data shows incumbents are concretely weak on, derived fresh in the teardown.
3. **Front-end-heavy is a priority, not a hard gate.** A project that's ~30-40% backend is in-scope when demand, usability, and rankability are strong. Restructured the criteria into **three make-or-break gates** (demand floor / beatable top-10 / money-model viable) plus priorities (front-end, small-niche, 3-4wk MVP). Added a cost-to-serve guardrail to the money gate so loosening the backend rule can't break the free+AdSense economics (cheap/cacheable/edge/static backend fine; per-request paid API or server LLM per pageview is not).

**Why:** Tarun flagged three biases baked into prior runs: (a) crediting GradeJar code reuse as a plus (biases toward clones over higher-impact problems); (b) treating persistence as a required feature (it's a past-project hangover, not a rule); (c) hard-gating pure front-end (closes an open window on high-demand, easily-rankable ideas that happen to carry a modest backend). All three narrowed the hunt artificially. The real bar is **highly viable + highly usable + highly rankable in the top 10** — everything else is a priority that breaks ties. Would change my mind: nothing — this is the intended selection logic going forward.

**Alternatives considered:** Keep reuse/persistence/front-end as tiebreakers only (rejected — even as tiebreakers they distort the ranking). Drop the front-end preference entirely (rejected — it's still the default for speed/SEO/cost, just not a gate). Remove the cost-to-serve check when allowing backends (rejected — it's the one guardrail that keeps free+AdSense solvent).

**Owner:** Tarun.

---

## 2026-07-06 — NO-GO: Lawn-care schedule / program tracker

**Decision:** Killed the persistent lawn-care schedule tracker. First scout run under the reframed skill (greenfield + impact-first). It was the data-backed top pick of a 6-candidate impact shortlist; the full teardown killed it.

**Why:** Demand passes easily (Scotts ×2, Sunday, Lawn Doctor, Milorganite, Consumer Reports, Bob Vila, Lowe's + Illinois Extension all maintain pages; r/lawncare + thelawnforum active). Two strikes kill it. (1) **Beatable top-10 FAILS** — the head money keywords ("lawn fertilizer schedule", "when to apply lawn fertilizer") return a pure authority-article fortress (national brands + a `.edu` extension + Consumer Reports/Bob Vila, YMYL-adjacent). Zero tools rank on the head; only the thin tail ("lawn care schedule calculator") surfaces small sites (lawncalcpro, lawnscal). A zero-authority domain can't crack the head in the MVP window. (2) **Wedge already executed, free** — the "remembers your lawn's program + reminds you" differentiator is already delivered by Yard Mastery (Allyn Hane's app: schedule by zip+grass, tracks applications w/ rates+dates, smart reminders), Scotts' My Lawn (calendar + push reminders + custom plan), and TruGreen's app. A web tool with no push notifications is strictly worse at the core "remind me" job. High home-services CPM is real but moot once #3 fails.

**Structural lessons banked (carry forward):** (1) Before believing a "persistent tracker for X" wedge, check the APP STORES, not just the web SERP — the persistence/reminder job is often already owned by a free app (lawn: Yard Mastery/Scotts My Lawn; sewing: Threadloop/Stash Hub). (2) High-CPM home-services lanes are article/authority fortresses on the head terms (Scotts/Sunday/TruGreen/Lawn Doctor + .edu) — reconfirmed. (3) **Saturation wave:** the "lone dated incumbent" gap closes fast — pool-chemical and aquarium-stocking SERPs both now carry 8-10 freshly built modern tools (AquaFindr, FishHuddle, pooldose, thepoolnerd, etc.); verify an incumbent is actually still weak, don't trust an old leader's reputation (AqAdvisor is no longer alone).

**Alternatives considered:** Target only the tool-intent tail where small sites rank (rejected — thin volume, and the job is owned by free apps with reminders). Ship a stateless fertilizer-rate calculator (rejected — commodity; Omni/completecalculators/Scotts own it, no wedge). Deep-validate sewing/quilting instead (still on the table — soft yardage-calc SERP + Pinterest distribution, but its persistence wedge is also app-owned).

**Owner:** Tarun.

---

## 2026-07-06 — `/scout-problem` gets a mandatory Step 0 (demand-gated brainstorm)

**Decision:** Added a required **Step 0 — demand-gated brainstorm** to `scout-problem/SKILL.md` for the "user arrives with nothing" path. The no-idea flow must now: generate a wide raw list (~12-20), run a *fast live-search demand pre-screen on every candidate*, kill everything below the demand floor, and present only the 6-7 verified survivors — each row carrying its demand evidence + confidence + a CPM/winnability hunch. A candidate that wasn't searched cannot reach the user. Also clarified Rule 4: the *deep teardown* stays 1-2 candidates, but the *pre-screen* is deliberately wide.

**Why:** First run of the no-idea path produced a shortlist brainstormed from memory ("tile/flooring layout planner" as top pick); Tarun checked it and found near-zero US search volume. The old skill only demanded data *after* the user picked — so the shortlist itself was vibes. Fix moves a lightweight demand check *before* anything is presented. Would change my mind: nothing — a shortlist without per-candidate demand data is a process failure.

**Alternatives considered:** Keep demand research post-pick only (rejected — that's the exact failure). Require exact volumes for every candidate (rejected — free tools can't; triangulation + confidence is the honest bar, exact numbers get pulled in the deep teardown / explore-project).

**Owner:** Tarun.

---

## 2026-07-06 — GO: Accent-wall trim layout planner (bet #3 candidate)

**Decision:** GO on a visual, to-scale accent-wall trim layout planner (board & batten + picture-frame/box molding + wainscoting + slat wall). Brief: `research/accent-wall-trim-planner.md`. Chosen from a 7-candidate demand-verified shortlist; deep-teardown'd alongside raised-bed soil (NO-GO).

**Why:** Only candidate that clears all three gates *and* has a concrete, still-open wedge. Demand PASS (trend confirmed "everywhere in 2026," 8-12 dedicated tools per sub-term, TikTok/Pinterest presence; med-high confidence, exact volume TBD via Semrush/Ahrefs in explore-project). Beatable top-10 PASS — the #1 tool (inchcalculator) is explicitly "a calculation tool, not a visualization engine" (numbers-only, single-row, no box grids); Omni is purely numeric; the visual tools that exist (FrameLayoutPro/HangCalc) solve a *different* job (hanging existing art). The gap was quoted verbatim by a DIY creator on TikTok: "Online calculators only work if your boxes are the same size." Money-model PASS — home-decor CPM, low-adblock DIY audience, $0 static backend. Front-end-heavy (an SVG/canvas renderer *is* the product), 3-4wk MVP, and the shareable render doubles as the Pinterest/TikTok distribution asset. Caveat: inchcalculator's authority likely holds the exact head term — win the visual/adjacent/long-tail + programmatic per-style pages instead; move now before the AI-calc-farm saturation wave reaches the visual-grid niche.

**Alternatives considered:** Raised-bed soil (NO-GO, below). Recessed lighting / chicken coop / wheelchair ramp / party drinks / BBQ (shortlisted, not picked for teardown this run).

**Owner:** Tarun.

---

## 2026-07-06 — NO-GO: Raised-bed soil / garden-soil calculator

**Decision:** Killed the raised-bed soil calculator after full teardown.

**Why:** Demand passes easily (garden, 10+ dedicated tools incl. Almanac, tens of thousands/mo, spring-peaked). Beatable top-10 FAILS — the wedge I hypothesized (soil-mix ratios + bag counts + multiple bed shapes) is *already fully built and clean*: Eartheasy ships 6 bed shapes (rect, square, hex, octagon, L, U) + mix breakdown + bag counts across bag sizes + reference tables, ad-free; Gardener's Supply adds mix ratios + fertilizer; Almanac (Old Farmer's Almanac, high authority) guards it (403'd on fetch = strong-brand signal). Modern, feature-complete, authoritative top-10 with no concrete gap left. A visual bed render adds little decision value (soil volume isn't a spatial-layout problem); cost estimation is a thin add-on Eartheasy nearly covers. Reconfirms the banked lesson: verify the incumbent is *actually* still weak — here they're strong.

**Alternatives considered:** Add cost-per-bag estimation as the wedge (rejected — too thin, near-covered). Visual 3D bed render (rejected — low decision value for a volume problem).

**Owner:** Tarun.

---

## 2026-07-07 — Added a resumable pipeline-status tracker to `/explore-project`

**Decision:** Every `/explore-project` run now maintains a living per-project status file at `research/<slug>-status.md` — a checklist of the four gated steps (Domain → Stack → Architecture → Setup kit) + the two output artifacts, each with state + a decision one-liner + date, topped by a single ▶ NEXT ACTION line. The skill creates it on start (or resumes from it if present) and updates it FIRST at every confirmation gate, before advancing — "log the step, then move." Discovery is handled by a one-line pointer in `week.md` + an auto-memory pointer, both aimed at the status file. Backfilled it for the in-flight bet #3 (AccentWallPlanner): Scout GO + domain locked done, stack awaiting confirm, architecture next.

**Why:** the pipeline is multi-step and gated, but the only durable record was a single `decisions/log.md` entry written at the very END (the scoped Pre-Build Brief). A context compaction mid-run — which just happened to AccentWallPlanner, with the domain locked and the stack already presented — left the continuation with no idea where planning stood. A living status file + discovery pointers make any run resumable by a cold session. Would change my mind: nothing — cheap insurance against a failure we already hit.

**Alternatives considered:** A dedicated top-level `pipeline/` folder (rejected — co-locating in `research/` matches the existing `<slug>.md` / `<slug>-prebuild.md` convention; discovery is handled by pointers, not folder placement). Rely on `decisions/log.md` alone (rejected — it's append-only history, not a resumable "where am I / what's next" surface, and only fires at the end). Memory-only (rejected — memory step-detail goes stale between gates; the file is the source of truth, memory just points at it).

**Owner:** Tarun.

---

## 2026-07-07 — Active job switch (2-3 months) + system-design track pivot (DDIA → Xu)

**Decision:** Tarun declared an **active job hunt with a 2-3 month target** — a frontend-heavy full-stack role now, complete full-stack long-term. This overrides the prior "stable day job, no job hunt" North Star. Updated `CLAUDE.md` (quarter priorities), `context/priorities.md` (job switch is now Priority 1, ordered by leverage), and `week.md` (Floor line reframed). The four learning blocks (`dsa`, `machine-coding`, `sysdesign`, `interview-qa`) are now the interview-prep engine. Side-hustle building stays a real priority (AI-assisted, in the 8pm `project` block). Marketing stays on autopilot. Paired pivot: **demoted DDIA-style deep reading for system design** — archived the old `/teach` track (which was actually Brendan Burns' *Designing Distributed Systems*, mislabeled "DDIA") to `archives/learning/`, and switched the `sysdesign` slot to **Alex Xu's *System Design Interview* Vol 1 then Vol 2** via `/teach` at `learning/system-design-interview/`, video-first (curated in `learning/system-design-video-path.md`, spine = ByteByteGo/Hello Interview), prep **mainly design-out-loud**.

**Why:** A 2-3 month job switch is a pipeline, not a reading project — it rewards breadth, a repeatable design framework, DSA volume (the usual gate), and mock reps, not 600 pages of deep data-systems theory. DDIA cover-to-cover wouldn't finish in time and wouldn't move the interview needle; it's the reward read for after landing. Xu is the interview canon and pairs with its author's own YouTube channel (ByteByteGo). Implementation stays light because Tarun's money-products are backend-free by design, so they lack the surface to practice real system design — the interview skill is verbal/whiteboard. Would change my mind: if interviews turn out not to be real (Tarun confirmed they are).

**Alternatives considered:** Read DDIA for 1-2 months as planned (rejected — too slow, mistargeted for interviews, wouldn't finish). Pause the side-hustle build to focus fully on the hunt (rejected — Tarun set it as non-negotiable; kept it bounded to the 8pm block, AI-assisted). Learn system design mainly by implementing it in projects (rejected — his projects are backend-free; interview SD is design-out-loud). Hard-delete the old track (rejected — AIOS never-delete rule; archived instead).

**Owner:** Tarun.

---

## 2026-07-10 — Marketing engine inverted: daily queue → weekly-first + AIOS build mode

**Decision:** Replaced the daily `/marketing` queue with a **weekly-first engine**: one Sunday session (chained as step 8 of `/weekly-review`, ≤45 min of Tarun's time) that scores channels against live data, assigns exactly ONE **build-mode** asset — a compounding asset (pSEO page set, on-site article) the AIOS produces end-to-end, ready-to-commit, **directly in the local product repo** — and queues ≤4 human items. Daily runs demoted to an optional trigger-only micro-mode (≤2 items, dated triggers like pitch follow-ups). Priorities through Sep 15: **GradeJar back-to-school sprint is build assignment #1** (need-on-final + gradebook-setup pSEO set, live + indexed by mid-Sept); **JsonBeam runs maintenance** (Starter-5 directory batch, privacy-audit article, ≤2 items/wk) and its **Show HN gate now requires AdSense re-review PASSED**. Assets tracked BUILT → SHIPPED in each action plan; stuck >2 weeks at BUILT = kill-or-carry. All hard boundaries unchanged (draft-only community posting, never LinkedIn/work email, no paid, AIOS never commits/deploys/posts).

**Why:** The daily engine failed its first week on its own evidence: 3 queues ever (Jul 3/7/8) then 3 straight empty days, weekly scoring never ran, zero compounding content shipped — only Phase-0 plumbing + 2 pitch emails — while JsonBeam's GA4 users fell 60→25 and AdSense rejected it for low-value content. The playbook's own model (rule 3: compounding beats feed) contradicted the engine's unit of work (daily human-posted feed items). With the job hunt as Priority 1, daily human posting is not a realistic dependency; weekly batch + AIOS-built assets moves the human to review-and-deploy only. Would change my mind: if two consecutive weekly sessions produce assets that stall at BUILT, the bottleneck is review capacity, not cadence — rescope then.

**Alternatives considered:** Keep daily but lighter (rejected — the failure mode was the daily dependency itself, not queue size). Build-mode drafts as markdown handoffs in TARUN-OS (rejected — adds a porting step where assets rot; Tarun chose direct-in-repo). Fully autonomous posting/deploying (rejected — hard boundary: every external word and deploy stays human).

**Owner:** Tarun.

---

## 2026-07-10 — AccentWallPlanner: build-planning COMPLETE (all 4 `/explore-project` gates confirmed)

**Decision:** Bet #3 is scoped and build-ready. Four decisions locked in one session:

1. **Domain:** `accentwallplanner.com` (locked 07-07). Not yet purchased; purchase is the final go-live milestone, not a prerequisite.
2. **Stack:** Astro 5 SSG + lazy Preact islands + Tailwind v4 + system fonts; SVG render engine; zero-dep SVG→canvas→PNG export; static Cloudflare Pages; native AdSense, no Partytown.
3. **Architecture:** a **style-agnostic `Layout` model** — `solve(style, config) → { members[], panels[], cutList[] }` — so ONE dumb SVG renderer serves all four trim styles with zero conditionals. The solver is a pure, DOM-free TS core (functional core, imperative shell), which lets Astro run it at build time to emit an inline SEO/LCP SVG *and* run the identical function in-browser for live updates. URL-as-state. Zero backend.
4. **Build order:** hardest style FIRST. Picture-frame molding with **mixed-size boxes** is outcome #1, ahead of board & batten. Milestone 1 ships with no UI at all.

**Kit:** enable official `frontend-design` (already in the marketplace cache, not installed). New repo gets Playwright MCP (standing exception) + Chrome DevTools MCP (approved: it's the only tool that actually *measures* the CLS threat) and exactly two libraries, **Vitest + `@astrojs/sitemap`**. JSON-LD and `<head>` meta hand-written.

**Why:** All four trim styles are the same problem — a grid drawn on a wall. The only variance is whether a rectangle *is* the trim (batten, slat) or is the opening the trim frames (panel). Encoding that in the type system, rather than in the renderer, is what keeps the ~100-page programmatic-SEO play a *data* problem instead of a *code* problem. That play is the growth engine, so it gets protected first.

Build order follows from the same logic. The #1 architectural risk is style-coupling leaking into the layout model, and it fails *silently*: style four forces one branch, the page generator forces another, and by week three the renderer has conditionals you cannot remove. Building the hardest case first stress-tests the model while it is still cheap to change, and it happens to be the wedge. Ranked #2 was AdSense-induced CLS — real, but bounded and solved by slot reservation, and it cannot silently corrupt the design.

Conceding `board and batten calculator` to inchcalculator's domain authority (per the scout brief) is what frees the build order from chasing the head term.

**Would change my mind:** if the mixed-size-grid solver (milestone 1) cannot be expressed without style-specific branches, the `Layout` model is wrong and the whole "one renderer" thesis needs rework before any UI is written. That is exactly why milestone 1 has no UI.

**Alternatives considered:** `accentwallcalculator.com` (rejected — "planner" names the visual differentiator and sits in SEO whitespace). Next.js static export (rejected — heavier JS baseline) and Vite vanilla SPA (rejected — wrong for programmatic SEO). Canvas render (rejected — loses accessibility, crispness, and build-time SVG emission). Board & batten first (rejected — see above). `astro-seo` + `schema-dts` (rejected — convenience only, `schema-dts` last tagged 2022, hand-rolling costs ~1hr and matches the zero-dep export ethos).

**Open item, carried:** exact Semrush/Ahrefs volumes were never pulled — the scout brief directed this as step 1 of `/explore-project` and the run opened with Domain instead. Demand stands at triangulated medium-high confidence. Reconcile BEFORE committing build weeks to `week.md`. If real volume lands materially below the low-to-mid-tens-of-thousands estimate, re-run the demand gate rather than build anyway.

**Owner:** Tarun.

---

## 2026-07-11 — GO: Start a local web-solutions business (Kesari Enterprise = proof-of-concept client)

**Decision:** Tarun is starting a **local web-solutions business** — end-to-end websites for local/regional businesses around Gandhidham, Kutch, Gujarat: build → domain → Cloudflare deploy → Google findability → paid retainer. First client is **Kesari Enterprise** (his relative's B2B water-treatment firm; repo `…/KesariEnterprise`), priced **₹10K one-time + ₹3K/year** — a deliberate below-market relative/case-study rate, not the rate card. Kesari runs the full real process as the reusable template; a satisfied relative with real reach becomes the referral engine for paying clients. Building a repeatable **client-delivery playbook** (`references/client-delivery-playbook.md`); an agency **portfolio site comes later**, after Kesari ships with real results.

**Why:** Most aligned side-business he can start — he can already build and deploy; the gap is the "around" (findability, scoping, pricing, handover, retainer), which is learnable and is exactly what clients pay for. Kesari is a safe first client (relative — no lawsuit/ghost risk) but run as a real paid engagement so it yields a true template *and* a real case study with results. Recurring retainers, not one-time builds, are the actual business. Guardrail: this stays a side-business; the #1 quarter goal (job switch, DSA gate) is the floor — when a weeknight collision hits, prep wins. Time budget ~2h weekday + 4-5h weekend.

**Key calls / lessons banked:** (1) The client's *business outcome* sets the target, not "more traffic" — Kesari is B2B credibility + regional findability (Kutch/Gujarat), not mass volume. (2) ₹10K is a case-study price; market for this build quality is ~₹25-50K one-time + a tiered retainer — don't anchor future quotes to Kesari. (3) Findability is the flywheel trigger (GBP + service×location pages + India B2B directories IndiaMART/JustDial/TradeIndia + client roster + Search Console), not how pretty the site is. (4) The agency portfolio is built AFTER Kesari ships with real results — an empty portfolio is weak, and building it first is procrastination from sales/delivery.

**Alternatives considered:** Treat Kesari as a casual favour (rejected — kills the template value; run it as a real client). Build the agency portfolio first (rejected — sequence it after a real case study exists). One-time builds only (rejected — the recurring retainer is the business). Go full-throttle now (rejected — job hunt is Priority 1; keep this bounded).

**Owner:** Tarun.

## 2026-07-12 — Standardised the Cloudflare go-live as a skill + script

**Decision:** Built `/cloudflare-go-live` (skill) + `scripts/cloudflare-go-live.mjs` (dry-run-by-default, idempotent) + `references/cloudflare-go-live.md`, extracted from taking kesrienterprise.com live the hard way. 13 of the ~19 steps are now scripted against the Cloudflare/Resend APIs; the 6 that genuinely have no API (buy domain, repoint nameservers at BigRock, click the email verification link, GitHub OAuth connect, build variables, solve the real Turnstile) are named explicitly at the end of every run so they cannot be silently skipped.

**Why:** The procedure is repetitive and I will run it for every future client, but four of its steps are non-obvious and two are outright Cloudflare bugs — the `www` Custom-Domain/Route dead-end, and the useless `10000: Authentication error` that a missing token permission produces. Rediscovering those costs hours each time. The script's preflight now probes every API surface and names the exact missing permission group, which turns the worst failure mode into a one-line fix.

**Email stack decided: Resend (send) + Cloudflare Email Routing (receive).** Researched properly rather than assumed: Cloudflare Email *Sending* advertises "3,000/month included" but that is included with the **Workers Paid plan ($5/mo)**, not free. Resend's 3,000/month (100/day) genuinely is free. Since the rule is free-only right now, the split stack wins. Resend's free tier is per-account, so **each client gets their own Resend account**; the Cloudflare account stays single and shared across all clients.

**Confirmed free at scale:** unlimited zones per CF account, and static-asset requests do not count against the Workers 100k/day. A brochure site therefore costs nothing and consumes none of the budget. The first real ceiling is **Turnstile: 20 widgets per account**, which caps the one-account model at ~20 clients. Worth knowing years early.

**Lives in TARUN-OS, not `~/.claude/skills/`.** Global skills sit on the work laptop and vanish on another machine. TARUN-OS is git-backed and portable, and it is the centralised record. When working inside a product repo, point the session at the TARUN-OS path.

**Alternatives considered:** (1) All-Cloudflare email — rejected, costs $5/mo and Resend is proven. (2) Global skill install — rejected, not portable, and the go-live is run from inside the *product* repo anyway. (3) Apply-by-default script — rejected; it creates real public infrastructure, and a typo in `--domain` would mint a junk zone. Dry run is the default and `--apply` is opt-in.

**Owner:** Tarun.

## 2026-07-13 — AdSense becomes a build-time contract, not a launch-day cleanup

**Decision:** Built `/adsense-ready` (skill, two modes: `contract` + `audit`), `references/adsense-policy.md` (the official Google policy corpus, distilled and source-cited), and `handoff-prompts/adsense-retrofit.md` (a paste-ready prompt for existing repos). Wired it into `/explore-project` as a **fifth gated step**, so every handoff prompt now carries an **AdSense Compliance Contract** (§5) inline, every milestone's acceptance criteria ends with `/adsense-ready audit` returning no new FAILs, and §9 opens with a step-0 instruction to **copy the skill folder into the new repo**. Fed the same requirements down into `/design-architecture` (the route list must include trust pages, a content-depth bar, and an interlinking map) and `/pick-stack` (slot reservation, CMP, `ads.txt`).

**Why:** The pipeline treated AdSense as exactly two things — a revenue-viability gate at scout, and a Core Web Vitals hazard at stack/architecture. It never treated it as an **approval surface**. Across all six pipeline skills and both generated handoff prompts, the words *privacy policy*, *about*, *contact*, *terms*, *low-value content*, *E-E-A-T*, and *ads.txt* appeared **zero times**. This has already cost real money twice: **JsonBeam was rejected for low-value content on 2026-07-08**, and GradeJar's trust pages were bolted on ad hoc on 2026-07-02 by luck rather than design. AccentWallPlanner's handoff prompt was heading for the same wall at 100x scale — its route list is `/`, four style pages, and ~100 near-identical programmatic pages, with **no trust pages at all**.

**The load-bearing rule:** Google Publisher Policies prohibit ads *"on screens without publisher-content or with low-value content."* **A bare tool widget is such a screen.** The calculator is not the content — it is the functionality. The content is what a human wrote around it. Corollary, and the trap for programmatic SEO: **never templated + indexed + monetized.** Programmatic pages are either genuinely differentiated, or `noindex` **and** ad-free.

**Alternatives considered:** (1) Fold the rules into the existing skills rather than build a new one — rejected; the checklist is long, it needs to run standalone at every milestone, and it has to be **copyable into a cold product repo**, which a scattered set of edits cannot be. (2) Reference the TARUN-OS skill path from the new repo without copying — rejected; a cold agent may not have read access outside its working directory, and the gate would silently no-op. (3) Inline the rules in every handoff prompt with no skill — rejected; the prompt bloats and every already-written prompt drifts from the policy the moment it updates. The chosen answer does both: the contract is inline in §5 (self-contained), **and** the skill is copied in (runnable at every gate).

**Owner:** Tarun.

## 2026-07-13 — `/scout-problem` now kills ideas on revenue-floor grounds, not just demand

**Decision:** Rewrote Gate 3 from "money-model viable" (a *cost* check) to **"revenue floor cleared"** (a *revenue* check), added a new **Step 4 — Revenue model** that produces a three-scenario dollar band with every input shown, and added `references/adsense-economics.md` as the benchmark source. The verdict and the brief now always carry the band. New Rule 7: **"Traffic is not revenue. Never return GO without a revenue band."**

**Why:** The gate checked cost-to-serve and hand-waved "decent-to-high CPM." It never estimated revenue. The actual identity is `sessions × pages-per-session × page RPM ÷ 1000`, and the scout estimated **none of the three terms** — each of which is a multiplier, so a weak one cannot be outrun by a strong one.

**The forcing evidence — JsonBeam, run through the new model:** floor-tier CPC (nobody bids to reach someone formatting JSON — there is no product to sell them at that moment), a **40-60% ad-blocking developer audience** (general audiences: 5-15%), and **~1.0 pages/session** (land, paste, leave). Three multipliers, all near the floor. **It can win #1 on every JSON keyword and still sit in the $0.25-$3 RPM basement.** All three were knowable before a line of code was written. It is a good product and a good SEO play; it is a bad *AdSense* play. Meanwhile **AccentWallPlanner** — home improvement, ~$2.40 CPC with real buyer intent (Home Depot, Lowe's, contractors bidding), US homeowners who barely ad-block, and a natural content surface — is structurally the best money bet in the portfolio, and **it was not chosen for that reason.**

**The through-line, and the reason both of today's decisions are really one:** **session depth and AdSense approvability are the same lever.** A bare widget is simultaneously *1.0 pages/session* (the revenue floor) and *"a screen without publisher-content"* (the rejection reason). The content ecosystem that fixes the approval also doubles the revenue. It is never a compliance tax — it is the business model.

**Owner:** Tarun.
