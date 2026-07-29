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

## 2026-07-13 — The client-delivery playbook becomes an executable pipeline

**Decision:** Built the **`/client-pipeline`** parent + five phase skills (`/client-scope`, `/client-build`, `/client-findable`, `/client-handover`, `/client-retainer`), the **`listing-researcher`** subagent, a central **`clients/`** registry (`engagement.md` · `findability.md` · `handover.md` · `retainer.md` · `reports/`, plus a `_template/`), and two new reference corpora: **`references/client-platforms.md`** (every free platform, tiered by the client's actual buyer) and **`references/ai-search-visibility.md`** (the AI-answer layer). Seeded `clients/kesri-enterprise/` from the real, verified repo + live-site state.

**Why:** `references/client-delivery-playbook.md` was **a document nothing read.** Every client meant re-deriving the same motion by hand at 8pm on a weeknight — discovery, scope, price, build, GBP, directories, handover, retainer. The only client-adjacent skill in the whole AIOS was `/cloudflare-go-live`, which automates one slice of Phase 3. There was no per-client state anywhere. Meanwhile Kesri had been **live for days and findable by nobody** — no Google Business Profile, no Search Console, no directory listing, no analytics — because the phase that earns the retainer had no skill behind it and kept losing to the phases that did.

**The design calls:**

1. **Parent + 5 phase skills**, mirroring the `/explore-project` orchestrator convention. `/client-pipeline <slug>` answers exactly one question — *what do I do next?* — with a time estimate, paste-ready copy, and a verification step. **If the output requires a decision, the skill has failed.**
2. **Central `clients/` registry, not per-repo state.** Business data (pricing, engagement, listings) must never live in a repo that might be handed to the client, and the portfolio view has to answer "where is every client" in one read.
3. **The four ecosystem layers get baked in at build time** — AI-search schema, lead capture → WhatsApp, review link, conversion event. Same lesson as the AdSense decision above: **retrofitting a design constraint costs 5× and usually just doesn't happen.**
4. **Service × location pages now require a substance test.** The playbook said "build them"; Kesri's BUILD-PLAN deliberately refused, choosing one `areaServed` array over per-city doorway pages. **The BUILD-PLAN was right, and the playbook is now amended.** Build `/<service>-in-<place>` only when 3+ sentences are true *and* unique to that place. Otherwise `areaServed` + GBP + citations carry the local signal — which is what actually ranks a single-location business. The deeper reason: **a thin doorway page is structurally an invitation to invent facts**, and that is how the never-invent-a-fact rule dies. *Kesri today: all no → skip.*

**The moat, and why it's real:** AI assistants recommend only **~1.2% of local businesses on ChatGPT and ~7.4% on Perplexity**, versus ~35.9% in Google's local 3-pack — and only **~11% of domains cited by ChatGPT are also cited by Perplexity.** Winning Google does **not** win AI search. No agency in Kutch is fighting on that front, and it's what makes a Growth retainer defensible instead of a line item cancelled in month four. **Promise the work and the monthly scoreboard — never a ranking.**

**Two things found while seeding Kesri that no status file in its repo knew about** — both dashboard settings, both invisible to any amount of code review, which is now Rule 1 of `/client-findable` (*verify over the wire, first*):
- **Cloudflare's zone-level managed robots.txt** blocks `ClaudeBot` (total), `GPTBot`, `Google-Extended`, `CCBot` and others. Verified live. **Precisely:** Claude can't read the site at all; OpenAI *training* is blocked but `OAI-SearchBot` isn't listed so ChatGPT search still works; `Google-Extended` kills Gemini grounding but **not** AI Overviews (those run off `Googlebot`, untouched); Perplexity is unaffected. **A real loss, not a catastrophe — and the distinction matters, because a client can check.**
- **`PUBLIC_SITE_URL` is unset in Workers Builds.** The live site is currently healthy, but `src/lib/indexing.ts` falls back to the workers.dev origin and emits `noindex, nofollow` + `Disallow: /`. The GitHub build trigger has never been observed firing. **The day it does, it de-indexes the live domain and nothing alerts anyone.** The checked-in `dist/client/robots.txt` already says `Disallow: /` from exactly this path.

**Alternatives considered:** (1) *3 fatter skills instead of 6* — rejected; it blurs the "one next action" granularity, which is the entire product. (2) *State inside each client repo (the GradeJar pattern)* — rejected; no portfolio view, and pricing data ends up in a repo the client may receive. (3) *Always build location pages, per the playbook as written* — rejected; see design call 4. (4) *Generate the client-facing process doc generically, once* — rejected; a generic version is a leaflet, a per-prospect one is a plan.

**Owner:** Tarun.

## 2026-07-14 — DSA ladder re-anchored: D0 = the day you SOLVE it, not the day you see it

**Decision:** Rewrote the spaced-rep engine in `learning/dsa/queue.md` (+ `README.md`, the `/daily-log` skill, `CLAUDE.md`). Four changes:

1. **D0 is now the solve date.** A problem with no working solution stays **`Attempting`** — off the ladder entirely, no D0, no due dates — and is carried day to day.
2. **Carry cap = 2 attempt-days.** Still stuck at the end of day 2 → watch the full solution, re-solve from notes, **force-bank D0 tagged `watched`**.
3. **Every D0 is tagged `solo` / `hinted` / `watched`**, and a **`watched` D0 makes the D5 pass mandatory** regardless of what D2 rates.
4. **Revisions beat new problems** when the 45-min block can't fit both.

**Why:** Tarun raised (1) — he might not solve a problem on the day he starts it. He's right, and the reason is bigger than convenience: **the ladder's offsets are meaningless if the anchor is a day nothing was learned.** A "D2 revision" of a problem he never got working is a first attempt wearing a costume, scheduled by a system that believes he already knows it.

(2), (3) and (4) are mine, and each closes a hole the fix would otherwise open or leave:

- Without the **cap**, the fix creates a worse bug than the one it solves — a single hard question silently eats a week of the block, with nothing in the system objecting. Patterns stick through *volume of patterns seen*; grinding one question is the anti-pattern, and D5/D10 exist precisely to catch what didn't land the first time.
- The **`watched` tag** closes the hole the old system could not see: a solo-solved problem and a video-solved problem received the **identical** schedule. And it fails in a sneaky direction — a watched problem is still *fresh* two days later, so D2 rates high, D5 gets skipped, and by D10 the pattern is gone. **A smooth D2 on a watched problem is a false positive.** Forcing D5 is the trap-door.
- **Revisions-first** because a missed revision decays a pattern he half-owns, while a deferred new problem costs exactly one day.

**Would change my mind:** if `watched` problems consistently rate ≥ 4 at *both* D5 and D10, the forced D5 is wasted reps and can be relaxed back to the plain D2-rating rule.

**Alternatives considered:** *Solo-only counts as D0* (rejected — Namaste DSA's own method assumes you'll be stuck on D0 and watch the video; requiring an unaided solve would stall throughput badly). *Any completed session banks D0* (rejected — that's the current broken behaviour with extra steps). *No carry cap* (rejected — see above). *Extend the block when revisions pile up* (rejected — it bleeds into `machine-coding` at 12:45 and quietly steals from another Priority-1 block).

**Owner:** Tarun.

## 2026-07-14 — Machine coding gets a lab, a ladder, and a profile — and the AI is banned from writing code in it

**Decision:** Built the machine-coding system (`learning/machine-coding/` + `/machine-coding` + wiring into `/daily-log`). Five load-bearing calls:

1. **The AI never writes code during the block.** Not a snippet, not "here's roughly how debounce works," not even when asked directly. The lab's editor has **no autocomplete, no bracket matching, nothing**. After the buzzer, AI is the *reviewer*, never the author.
2. **The rep is a COLD REBUILD, not a re-solve** — and this is where it deliberately breaks from the DSA ladder. **R0 → R3 → R10**, each rung a blank file from memory on a timer. The unit of mastery is the **primitive**, not the problem.
3. **A lab, not the terminal and not chat.** A local dark-theme page (`lab/index.html`) with four gated phases. **The code editor is physically locked until a design is submitted**, and the problem's real requirements are **hidden until he asks for them**.
4. **`profile.md` is a fixed-size REWRITTEN model, not an append-only log.** Failure-mode counts, freeze signature, primitive mastery, and a **hint ledger** of what has actually unblocked him.
5. **Phase-gated 0→3** (steal the process → guided solo → interviewer → full rounds). The skill **refuses** to run interviewer mode early.

**Why:** Tarun named the problem himself: *"My confidence is very low. I think I will not be able to solve even a simple problem, because of AI-assisted coding. I don't write the code by my hand."* That is not one problem — it's **three muscles AI ate** (blank-file→structure; API recall without autocomplete; finishing inside a clock) **plus one he never had** (the rubric — this round grades scope clarity, structure, and a working P0 before the buzzer, so ugly+complete beats beautiful+half-done, and strong coders fail it while writing good code).

The corollary set the entire curriculum: **he can't build an autocomplete because it's a four-primitive composition and he owns zero primitives.** More video doesn't fix that; starting much smaller does. So Phase 1 is deliberately *below* his level (counter, star rating, accordion) — he finishes every one, and the blank-file freeze dies.

Two decisions were his and both improved the design:
- **Ramp in, don't start with the interviewer.** He was explicit that opening at interview difficulty would just confirm the fear. Correct — the confidence rebuild is load-bearing, not a nicety.
- **"Can the system know me well enough in two months to give a *real* hint?"** That question produced `profile.md`, which is the difference between a grader and a coach. The payoff: not *"here's a hint"* but *"you're stalling at state init again, same as Jul 14 and Jul 22 — both times the unlock was: what's the smallest thing that changes when the user clicks?"*

**The cost principle (his catch, and it's the reason this survives):** *token cost is driven by what gets **read**, not what gets **stored**.* Disk is free, so the system stores every session forever and reads almost none of it. **`profile.md` is rewritten, never appended — the same size after 100 sessions as after 3.** A review reads exactly three files (~1,600 tokens, **flat forever**), never globs `builds/`, and opens a raw `session.json` only to answer a named diagnostic question. A human coach doesn't reread every past session either; they carry a model of you.

**Would change my mind:** if the design-gate scaffold is still needed after week 3, the problem isn't the scaffold — it's that Phase 1 was still too hard, and the bank needs smaller problems. And if the freeze data turns out to be noise (pauses that are just thinking, not stalling), the instrumentation is over-built and should collapse to milestones only.

**Alternatives considered:** *Route it through `/teach`* (rejected — `/teach` makes HTML lessons and cheat sheets; this is a *performance* skill needing a clock, a rubric, withheld requirements, and a coach that refuses to help). *Copy the DSA ladder verbatim* (rejected — re-solving the same app memorizes that app; the primitive is what transfers). *Code in VS Code with Copilot off* (rejected for drills — pure honor system, no timer, no protocol; **kept for Phase 3 full rounds**, where multi-file structure is itself graded). *Just use Namaste dev's editor* (rejected — no timer, no P0/P1/P2 discipline, and the code never lands in the repo, so cold rebuilds can't be diffed against the original). *Screenshots in the replay* (rejected — ~1,500 vision tokens each × 30/session, and they tell me less than the code does; **capture the final rendered DOM as text instead**, ~1 KB).

**Owner:** Tarun.

---

## 2026-07-17 — Swapped `reading` ↔ `interview-qa` in the weekday schedule

**Decision:** `interview-qa` moves to 11:00–11:30am. `reading` takes the 11:45pm–12:15am slot. Block codes and the 7-scored-block count are unchanged.

**Why:** `interview-qa` hit **1 of the last 5 weekdays**. At the 07-16 wrap Tarun named the cause himself: *"The energy is not there... I need to change the schedule of this one."* It was the only learning block stranded after two office blocks — everything else is front-loaded into 11:00am–3:30pm. That is **placement, not discipline**: a high-effort block in a low-energy slot fails no matter how much willpower is thrown at it, and `interview-qa` feeds Priority 1 (the active job switch), so it can't be allowed to keep dying. `reading` took the late slot because it's the one block cheap enough to survive it — **provided it stays intake-only** (see the next entry; the two decisions are load-bearing on each other).

**Cost accepted:** the late slot is now **narrative books only**. Dense technical books are excluded by design — a textbook at 11:45pm after two office blocks is a page re-read four times. If a dense book ever matters, it needs a morning block or it doesn't get read.

**What would change my mind:** if `interview-qa` still misses at 11:00am, the problem was never the slot — it's the block itself, and it needs a different fix (or a kill).

**Alternatives considered:** *Leave it and try harder* (rejected — five weekdays of data say the slot is the cause). *Cut `interview-qa` entirely* (rejected — it's job-hunt-adjacent and this quarter's Priority 1). *Full reading drill at 11:45pm* (rejected — see next entry; it would rebuild the exact failure being fixed).

**Owner:** Tarun.

---

## 2026-07-17 — Reading is tracked + interrogated; the drill is on-demand, not daily

**Decision:** Built `/reading` + `learning/reading/`. The 11:45pm block is **intake only** — read, and if something bites, write one line (`/daily-log wrap` banks it). The drill (compress → test → own, landing ONE rule with a **+14-day verdict date**) runs **on demand**, prompted at `/weekly-review`, never in the block. The artifact is `learning/reading/rules.md` — cross-book, bounded at 20 live, rewritten not appended.

**Why:** Tarun asked for a reading companion (AIM / COMPRESS / TEST / OWN) in the same message that approved moving `reading` to 11:45pm. **Those two requests contradict each other**: the swap works *because reading is cheap to do tired*, and the companion makes reading the most cognitively expensive block on the board. Both can't be true. Splitting **intake** (nightly, cheap, no AI) from **the drill** (occasional, expensive, on demand) is what keeps the swap honest — without it, `reading` becomes the new `interview-qa` inside a month, for the identical reason.

**Why on-demand rather than a fixed weekly slot:** a fixed drill slot with no fuel **manufactures fake rules**, and fake rules crowd out real ones and turn the file into homework. `/weekly-review` asks *"anything worth drilling?"* — **"nothing bit me this week" is a legitimate answer.** Mirrors the `/marketing` daily→weekly inversion of 2026-07-10, which worked.

**Why a +14-day verdict at all:** a takeaway written down and never revisited **steered nothing**. DSA has D0→D2→D5→D10; machine-coding has R0→R3→R10. Reading was the only track asking for *life change* with no ladder under it. But the rep here is deliberately **not recall** (trivial for a good idea) — it's **did reality confirm or kill it**. A killed rule is a success; a track where nothing dies is lying.

**What would change my mind:** if the Sunday prompt returns "nothing to drill" **four weeks running**, the track is dying quietly and needs either a real slot or an honest kill. If `rules.md` fills with rules that are never run (the "never ran it" verdict dominating), the rules are being written too big — shrink the bar, don't add discipline.

**Alternatives considered:** *Full drill nightly in the block* (rejected — rebuilds the failure being fixed). *`/teach` owns it* (rejected — `/teach` authors lessons from high-trust sources; here the source is the book, and Tarun doesn't need to be taught the book, he needs his reading of it interrogated. Same boundary drawn for `/machine-coding`). *Four separate modes for AIM/COMPRESS/TEST/OWN* (rejected — they're three beats of one 15-min conversation; separate invocations are ceremony he'd skip). *Per-book folders* (rejected — one file per book; fewer files survive a tired 11:45pm).

**Owner:** Tarun.

---

## 2026-07-17 — Scout: next project = full-stack open-core SaaS — GO on SaaS-analytics + client-portal (build analytics first)

**Decision:** Ran a *non-AdSense* scout for Tarun's next project (full-stack React+Node, open-source-first, subscription/open-core upside, high-ceiling aspiration). Reframed the scoring axes from `demand × RPM × winnability` to **`demand × willingness-to-pay × winnability × ceiling`** under a hard constraint (**cheap to serve — self-hostable or BYO-key**, so Tarun never funds strangers' usage). Intake Q&A locked: any buyer, AI-or-not (data decides), cheap/BYO-key infra. Pre-screened ~22 categories, presented a top-5, deep-teardown'd the two Tarun picked. **GO on both:** (A) **SaaS revenue analytics** (open-core Baremetrics/ChartMogul alt) and (B) **client portal + proposals** for agencies/freelancers. **Recommended build order: SaaS analytics first.** Briefs: `research/saas-revenue-analytics.md`, `research/client-portal.md`.

**Why:** The winnable open-core play is "the open-source alternative to a *specific expensive closed SaaS*, in a category both the AI-hype wave and the OSS wave skipped." Every hyped 2026 category is a funded / big-platform fortress, unwinnable solo (MCP gateways = Docker/MS/IBM/AWS; LLM obs = Braintrust $80M @ $800M; AI agents = n8n/Activepieces/Flowise; sync engines = Zero/ElectricSQL). AI belongs as a **BYO-key feature, not the product**. SaaS-analytics is the **cleanest gap found** — the only OSS "rivals" are a 42★ all-"Coming soon"-placeholder repo (Cowlytics) and a 1★ dead stub (growth-metrics-dashboard), and Stripe's own Sigma needs SQL + gives no shareable dashboards — against steep proven WTP ($75-129/mo→$10-15k/yr) and a perfect BYO-Stripe-key fit; Tarun is the user. Client-portal has a bigger, proven paid market (Copilot 294 G2 reviews @4.8★, HoneyBook/Dubsado) and **high synergy with the Kesri web-solutions business** (dogfood + sell), but the gap is more contested (Atrium: 41★, active, but **ELv2 source-available** — so a true-OSS licence is the wedge) and the scope is bigger. Build analytics first because, next to an active job hunt (Priority 1), the dominant risk is *not finishing* — tightest scope + cleanest gap wins, and it doubles as a full-stack portfolio piece. **Would change my mind:** if real search volumes (pull at `/explore-project`) come back materially thin, re-run the demand gate.

**Alternatives considered / killed this run:** Referral/affiliate (biggest ceiling + WTP, but Dub Partners — funded OSS, Framer/Perplexity/Superhuman — just entrenched the modern-OSS slot); onboarding/tours (very high WTP but Usertour holds the OSS slot); AI personal CRM (cleanest AI-native gap but weak consumer WTP — a category graveyard). NO-GOs: MCP gateways/OpenAPI→MCP generators, AI agent builders, LLM observability, local-first sync engines, bookmark managers (Karakeep), meeting notes (Meetily), screen recording (Cap), email marketing (Listmonk/Mautic), AI support (Chatwoot/Zammad), AI chat-with-DB (Vanna/Wren), document extraction (Unstract + commoditizing VLMs), Gumroad-alts (PHP incumbents + merchant-of-record tax moat) — all fortressed, commoditized, or dead-on-WTP.

**Pipeline note:** the downstream pipeline (`/explore-project`, `/pick-stack`, `/design-architecture`, `/adsense-ready`) is AdSense/static-shaped. A full-stack subscription SaaS needs it adapted — backend/DB/auth/billing, **cost-to-serve as a first-class gate**, no AdSense gate, and dev-audience distribution (GitHub + Show HN + IndieHackers + SEO, not the AdSense `/marketing` engine). Adapt at scope time, don't force-fit.

**Owner:** Tarun.

---

## 2026-07-18 — .NET Framework track runs on employer time only, never a job-hunt block

**Decision:** Management assigned Tarun to **.NET Framework 4.x (legacy)** backend work. Built a `/teach` workspace at `learning/dotnet-backend/` — a **translation course** (Node → .NET), not a backend course — with a spine project he builds alongside every lesson (**HelpDesk API**: Web API 2 + EF6 + LocalDB, at `MyProjects/HelpDeskApi/`). 10 sessions, Read → Write → Ship, ~2 working weeks. **The track runs in the `office-am` (3:30-5:30pm) and `office-pm` (10:00-11:30pm) blocks only.** Recorded in `daily/schedule.md`.

**Why:** This collides head-on with Priority 1. Tarun is in an **active job switch** (frontend-heavy full-stack, 2-3 month target, declared 2026-07-07) and .NET Framework 4.x is legacy — it is **not** the stack he is interviewing for, and it is close to the least transferable thing he could be spending hours on right now. His day is already 100% allocated, so the track could only come from somewhere. Management ordered it, so it is **work**, so it is paid for with **employer hours** — not with the four daily hours he is spending to leave. The day job is the floor that de-risks the switch; keeping it stable is the point, and being useful in the new stack is how it stays stable.

**Scope discipline:** the goal is **time-to-productive, not mastery**. "Learn .NET" is a 6-month project. "Be dangerous in an existing .NET codebase" is ~2 weeks, because the backend *concepts* already transfer from Node — the gap is C# vocabulary and .NET conventions. Everything that maps cleanly gets one row on `reference/node-to-dotnet.html` and zero lesson time. The sessions are spent almost entirely on the four places the Node instinct is actively **wrong**: (1) the threading model — Node's single thread was silently protecting every shared variable he has ever written; (2) `.Result`/`.Wait()` **deadlocking** on ASP.NET Framework, a bug that does not exist in .NET Core so modern advice will never warn him; (3) DI service lifetimes; (4) deferred execution / `IQueryable`.

**Hard constraint discovered:** .NET Framework 4.8 caps at **C# 7.3** (no records, top-level statements, `init`, switch expressions, file-scoped namespaces). Effectively all C# written online since 2020 targets .NET 5+ and will not compile for him. Every snippet shown must be dialect-checked. Environment verified the same day — VS 2022 + VS 2019, 4.8 targeting pack, SQL Server LocalDB, SSMS 22 all present, so there is **no setup gate**.

**The failure mode being guarded against:** .NET quietly expanding into `dsa` / `machine-coding` / `sysdesign` / `interview-qa` **because it has a boss attached to it and the job hunt does not**. Urgency beating importance. The realistic four-week bad outcome is a polished HelpDesk API next to a DSA queue that went dark again — on a 2-3 month clock that has already had one 5-day blackout (see 2026-07-14). **If that starts happening it gets named at `/weekly-review` as a failure, not accepted as progress.**

**What would change my mind:** if work moves to **.NET Core / .NET 8-9**, the calculus flips — modern .NET is a genuinely marketable full-stack backend and could earn real prep time rather than only employer time. Revise `MISSION.md` if that happens. Conversely, if the track ever starts costing job-hunt blocks, cut it back to the bare minimum that keeps work unblocked.

**Pedagogical call:** build-alongside, always — Tarun's own words: *"just the theory is the thing which I will forget after some time. But when I learn by doing is the stuff then it's great thing."* Every lesson ends in a build step. Note the deliberate difference from `/machine-coding`, where the AI writes **no** code at all: here the AI shows syntax and patterns (he cannot type C# he has never seen), but **Tarun types every line that goes into HelpDesk API**. Never hand him a finished class to paste.

**Alternatives considered:** *Take the `interview-qa` block* (rejected — that block feeds Priority 1 and was only just rescued from dying on 2026-07-17; spending it on legacy .NET would undo that fix within a week). *Add a new early block* (rejected — adds real hours to an already-full day, and the employer should pay for employer-assigned learning). *Split with weekend catch-up* (rejected for now — weekends are the only untracked recovery time, and Sunday already carries `/weekly-review`; revisit only if office blocks prove too fragmented). *A full comprehensive .NET course* (rejected — optimizes for the wrong variable; mastery of a stack he is leaving is the most expensive possible use of these hours).

**Owner:** Tarun.

---

## 2026-07-18 — GradeJar plus/minus GPA moves to thirds (3.67), and data-shape calls get made before adoption

**Decision:** Changed `PLUS_MINUS` in `grade-core` from tenths to thirds — `A- 3.67 · B+ 3.33 · B- 2.67 · C+ 2.33 · C- 1.67 · D+ 1.33 · D- 0.67`. Whole letters, `A+` and `F` unchanged. Logged in the product repo as **D32**.

**Why:** Two conventions exist and we shipped the one US registrars don't print. That made Gradejar disagree with the transcript it exists to match, which is the worst possible thing for a calculator's credibility. Search Console made the cost concrete rather than theoretical: `/gpa-scale` ranked for `0.67 gpa` at **position 47** while the page printed `0.7`. We were ranking for a number we did not contain.

**Why now, and not later:** `store.ts:resolveScale()` resolves a saved class's built-in scale **id** against the live `BUILTIN_SCALES` object at read time. It does not freeze grade points at save time. So changing these values silently recomputes every saved plus-minus class. At today's ~zero adoption that is free. After real adoption it is a schema migration with a data-loss surface, against a product whose one guardrail is *"if a change risks losing a teacher's saved data, stop and rethink."* **Carry forward: any decision about the shape of persisted data is nearly free before adoption and expensive after. Make those calls at build time, on purpose, not when a user complains.** This is the same class of rule as `/adsense-ready` — design the constraint in early, don't retrofit it.

**Explicitly not changed:** thresholds in prose (Latin honours bands, admissions cutoffs, "3.7+ is excellent"). Those are **cutoffs, not letter grade points**. Rewriting them to 3.67 would invent precision the sources don't have. Changing values is not the same as changing every number that looks like one.

**What it surfaced:** two verify scripts that had been passing for the wrong reason — an assertion matching `3.3` as a **substring** of `3.33` (green, and meaningless), and the de-doorway regression guard fetching trailing-slash URLs that `trailingSlash: 'never'` turns into a local 404, so **it had not actually been running**. Plus 22 latent `astro check` errors, invisible because `astro build` does not typecheck. **Carry forward: a gate nobody has watched fail is not known to work.** Add `astro check` to the definition of done in every Astro product.

**Alternatives considered:** *Keep tenths and change only the prose* (rejected — the engine would still be wrong, and every saved class with it). *Support both conventions as a user toggle* (rejected for now — real optionality, but it multiplies the persisted-data surface for a preference almost no teacher knows they have; revisit only if users ask). *Defer until after the AdSense verdict* (rejected — the migration cost only goes up, and the correction helps the page that is currently ranking for the wrong number).

**Owner:** Tarun.

---

## 2026-07-18 — Deploying **during** an AdSense review is the safe direction, not the risky one

**Decision:** When fixes are ready and an AdSense review is in flight, **deploy immediately**. Do not hold changes back waiting for the verdict. Applies to every product in the pipeline.

**Why:** Google reviews the **live site**, crawled whenever the application reaches the queue. There is no snapshot taken at apply time and no penalty for changing the site mid-review. So holding fixes back does not protect anything — it guarantees the reviewer judges the version that already failed. The intuition that "don't touch it while they're looking" is safe is exactly backwards, and it is an expensive instinct: each rejection burns a review cycle measured in weeks.

**What triggered it:** on 2026-07-18, with review #2 already submitted, production was verified over the wire to be serving the new `/ez-grader` content but **not** the `/gpa-scale` + `/gpa-conversion` fixes — the two pages most exposed to a "low value content" verdict were sitting in the queue in their pre-fix state.

**The real risk, correctly named:** not *changing* the site during review, but a **broken** site during the crawl. "Site unavailable" is an actual rejection reason. So the gate is the full verify suite plus a build, then deploy, then confirm the live URLs serve. Not delay.

**Carry forward, three rules:** (1) **Verify production over the wire, never from a status file** — the split state above was invisible to every board in the repo. (2) **A client-side absence does not prove a dashboard setting is off** — Funding Choices was wrongly flagged as an urgent blocker from a probe that found no `__tcfapi`, when Google simply does not serve the CMP until a site is approved. (3) **Do not re-apply just because you deployed** — the existing review picks up the new content on its own.

**Alternatives considered:** *Hold everything until the verdict lands* (rejected — the reasoning above; it optimises for a penalty that does not exist while accepting a real cost). *Deploy only the content fixes and hold engine changes* (rejected — splitting a green working tree into partial deploys adds risk for no benefit once the whole tree passes the gate).

**Should feed:** `/adsense-ready` — the post-rejection remediation path should state this outright, since the skill currently has no guidance for "fixes ready, review already in flight."

**Owner:** Tarun.

## 2026-07-19 — Converted the AccentWallPlanner demand gate from a paid-tool check to a live-GSC check

**Decision:** Killed the "pull real Semrush/Ahrefs volumes before committing build weeks" gate on
AccentWallPlanner. Replaced it with a free, dated check against live Search Console impression data
(~2026-08-09, 2-3 weeks after indexing) to be run **before any further content investment** in the site.

**Why:** The gate was written 2026-07-10 and never fired. AWP went live 2026-07-19 — the build weeks
were spent without the demand numbers ever being confirmed. A gate that gets bypassed without a
decision is worse than no gate, because you'll trust it to stop you next time and it won't. Now that
`/gsc-onboard` has AWP verified and reporting, real impression data is both free and more truthful
than a Semrush estimate. The gate moves from pre-build (already moot) to pre-content-investment
(still live and still consequential).

**What would change my mind:** if GSC shows near-zero impressions at the 08-09 check, the honest read
is that the niche was never there — and that's a kill signal for further investment, not a prompt to
buy a Semrush seat to confirm what GSC already said.

**Alternatives considered:** (a) kill the gate outright and just log the bypass — rejected, more spend
is still ahead of this site; (b) keep it and pull the volumes anyway — rejected, it's paid, slower,
and less truthful than the live data now flowing.

**Owner:** Tarun.

## 2026-07-19 — Removed "AdSense status" from the weekly outcome board

**Decision:** AdSense approval status no longer occupies one of the 3 weekly outcomes. It moves to
`/site-report` as a tracked metric.

**Why:** It scored ✅ this week on the clause "confirmed clean status with no new rejections sitting
unanswered" — an outcome that cannot be failed as long as nothing bad happens to you. That's a status
check wearing an outcome's costume, and it consumed a third of the board while requiring no action.
Both sites sit at `GETTING_READY` and the only real lever (content depth, de-doorwaying) is already
handled inside product work.

**What would change my mind:** an actual rejection landing. A rejection *is* actionable and would earn
a board slot immediately via `/adsense-ready recover`.

**Owner:** Tarun.

## 2026-07-19 — Built /verify-live: production, not a status file, is the source of truth

**Decision:** Scoped and shipped the wire-truth checker via `/level-up`. `scripts/verify-live.mjs` +
`.claude/skills/verify-live/SKILL.md`. It asserts 8 house invariants against production for all four
live domains and prints only the disagreements. **It reports; it never fixes.**

**Method spec (3Ms):**
- **Constraint:** trust bottleneck. Weekly-review scoring, client phase advancement and AdSense timing
  all read from files that can be wrong. At 1 client I catch it; at 5 I won't — and CLAUDE.md rule #1
  for clients is *never invent a fact about a client*.
- **EAD:** not eliminable (not-checking is what broke); ~95% deterministic, so Automate with **zero AI step**.
- **Process:** trigger = manual command · sources = production HTTP only · transform = fetch→normalize→assert
  · decisions = per-assertion pass/fail, exit 1 on any P0 · destination = stdout.
- **Autonomy: L1.** Deliberately not L3/L4. An auto-fixer recreates the exact disease — a fourth thing
  that looks done. The machine owns finding drift; I own fixing it.
- **KPI:** bucket = less cost. Metric = status-vs-production disagreements surviving to a weekly review
  or a client. Baseline 5 in ~8 days. Target 0.

**Why now:** five documented incidents in eight days. Three Kesri robots.txt claims that disagreed with
production (one required a correction stamp in `shipped.md`), plus two stale `connections.md` rows found
in the 07-19 audit. My stated fix was *more manual discipline* — which is what had already failed three times.

**What it found on its first run:** `shipped.md` 2026-07-03 records "robots.txt allows AI crawlers" as
part of "Phase 0 visibility CLOSED" for both products. **That claim is false in production.** ClaudeBot,
GPTBot, Google-Extended, CCBot and meta-externalagent all carry `Disallow: /` on jsonbeam.com,
gradejar.com AND kesrienterprise.com — not just Kesri, which is the only site the boards ever flagged.
Source is the Cloudflare managed robots block on all three. AccentWallPlanner, built later, is clean —
which is why it passed its 07-19 verification. Classic search is unaffected everywhere; nothing is
de-indexed. This is the AI-search moat being off across the whole older portfolio, not a ranking emergency.

**Discipline note:** the checker's first version produced 6 P0 "failures", of which **all 6 were checker
bugs** — it hardcoded `/sitemap.xml` (Astro emits `sitemap-index.xml`) and scored the mere presence of
the Cloudflare managed block as P0 (its default content is `Allow: /`). Caught by `curl`-ing production
before trusting the tool. Banked as a rule in the SKILL.md: verify the checker before trusting it, or it
becomes another confident file that's wrong.

**What would change my mind:** if the invariant list starts growing speculatively rather than from real
incidents, it becomes a maintenance tax and I'll prune it back to the ones that have actually fired.

**Owner:** Tarun.

---

## 2026-07-20 — NO-GO ×30. The "beat a weak incumbent in 3-4 weeks" thesis is structurally dead

**Decision:** Ran `/scout-problem` with no starting idea. Pre-screened **30 candidates** across **6 structural
shapes** and ~12 verticals with live SERP checks. **Every single one failed Gate 2 (beatable top-10).** Zero
survivors reached a deep teardown. No brief written. This is a NO-GO on the *shape*, not just on 30 ideas.

**The shapes tested, and how each died:**

| Shape | Tested | What killed it |
|---|---|---|
| Formula calculators | 12 | AI calc-farms. `completecalculators` / `engineercalc` / `best-calculators` / `calcbee` / `thecalcs` recur across *unrelated* verticals. Towing returned **9 of 10** as farms. |
| Visual layout planners | 6 | Manufacturer tools + Planner5D + AI photo visualizers. Orbit's free sprinkler designer traces your yard on Google Maps. |
| Curated databases | 4 | Already built. `towratings.net` = every US vehicle 1991-2026 from OEM docs; `towcapacity411` = 14,008 trims; VIN decode via NHTSA. |
| B2B / high-CPC tools | 3 | Owned by the SaaS vendors who *are* the advertisers. Every PTO calculator on page 1 is an HR platform's lead magnet. |
| Practice tests / question banks | 3 | Funded exam-prep fortresses. `driving-tests.org` holds 6 of 10 CDL slots via programmatic state pages. |
| Engineering-moat tools | 3 | **The decisive one.** See below. |

**The load-bearing finding — the moat I assumed existed does not:** the last hypothesis standing was
*"pick something genuinely hard to build, where cloning costs weeks."* I tested it with **cut-list
optimization** (2D bin-packing, a real algorithm). Page 1 returned **nine free browser-based optimizers with
kerf handling, grain direction and PDF export, most with no login.** Deck design returned Simpson Strong-Tie
giving away permit-submittal drawings plus a full bill of materials, free. **Algorithmic difficulty is no
longer a barrier, because the thing that makes it cheap for Tarun to build makes it cheap for everyone.**

**The gate conflict, stated plainly:** Gate 2 (beatable top-10) and the ~3-4 week MVP constraint are now
**mutually exclusive**.
- Buildable solo in 3-4 weeks → an AI farm has already built ten of them → Gate 2 fails.
- Genuinely hard to clone → does not fit in 3-4 weeks → the MVP constraint fails.

The overlap between those two is the window this entire pipeline was designed around, and **it has closed.**
GradeJar (06-27) and AccentWallPlanner (07-06) were scouted while it was still open. They were not wrong then.

**How fast this moved:** the 07-06 lawn-care NO-GO banked a "saturation wave" lesson from **two** niches
(pool chemicals, aquarium stocking). Two weeks later it is **all thirty**, across every shape. Maturity
signal: niches now have listicles *ranking the free tools* (closet layout has **four**, each cataloguing
8-21 tools; kitchen remodel has "Top 6 Ranked by Experts"). A market with review articles about its free
tools is not a gap.

**Carry forward — what a moat is now.** Not features, not algorithms, not a dataset that can be scraped or
is public (FCC broadband data is public, which is why 10 sites sell the same lookup). Only four things left:
(1) **distribution** that does not route through a SERP; (2) **authority compounded over years on one
domain**; (3) **data you generate that did not exist before**; (4) **a relationship** (the client business).
Note that (2) argues for deepening the three live sites rather than launching a fourth, and (4) is the
side-business already started on 07-11.

**Shapes deliberately NOT tested, and why:** community/UGC (needs a backend and has a cold-start problem,
breaks the MVP gate), games (floor-tier CPC, hit-driven), pure content/media (that is the E-E-A-T play,
which is an argument for GradeJar/AWP depth, not a new property). Naming them so the sweep is not overclaimed.

**What would change my mind:** a niche where the *user's own accumulated data* is the product AND no free
mobile app owns the job (the 07-06 app-store check still applies), or a distribution channel that makes the
SERP irrelevant. Neither showed up in 30 tries. Also honest: this was a Step-0 pre-screen, not 30 full
teardowns. A single candidate could survive a deep look. Nothing in the pre-screen earned one.

**Alternatives considered:** *Present a padded shortlist of the least-bad 6* (rejected outright. The skill's
own Step 0 forbids presenting candidates whose demand and winnability were not verified, and every one I
verified failed. Padding would be the exact process failure logged on 07-06). *Force a GO on the tent-layout
planner*, the only near-gap found, where page 1 is regional party-rental lead-capture with no neutral
national tool (rejected. Thin volume, and the rental companies own the transaction the searcher is heading
toward). *Re-scout the same lanes with narrower long-tail terms* (rejected. The tail of a saturated head is
thinner, not softer).

**Owner:** Tarun.

### Round 2 — Tarun relaxed audience size + freshness. 16 more candidates, also 0 survivors.

On his call, re-ran with new gates: **narrow professional/trade audience** (2-8k/mo, below farm economics)
+ **decaying data** (answer changes annually / per state / per reg cycle) + **no incumbent maintainer**.
Tested: HVAC A2L transition · NEC adoption by state · contractor licensing reciprocity · state paid sick
leave · pesticide RUP lookup · notary RON rules · STR/Airbnb rules by city · IRC/IBC adoption · teacher cert
reciprocity · cottage food laws · IFTA quarterly rates · drone laws by state · NFHS sports rule changes ·
beekeeping/apiary rules · septic permit rules. **Running total: 46 candidates, 0 GO.**

**It failed for a completely different reason than round 1, and that reason is the real finding:**

> **In any professional niche with money, the SaaS vendors serving that profession already own the content.**

HR/payroll SaaS owns leave law (Paylocity, Rippling, Paycor, Patriot). STR software owns Airbnb regs
(Lodgify, Awning, Hostex). Field-service SaaS owns the HVAC A2L transition (XOi, BellaFSM). Construction SaaS
owns building codes (Procore, UpCodes, Projul). **ServiceTitan owns septic *licensing*.** Ed lead-gen owns
teacher certification. They are funded, they never stop publishing, and they are structurally incapable of
being outlasted by a solo operator.

**The synthesis — one rule explains all 46 results:**

> **For a solo builder, CPC and winnability are inversely correlated.**

High CPC means the end customer is valuable → the companies serving that customer are well funded → they can
afford a content team → they are already in the SERP. Low CPC means nobody is funded, the SERP is open, and
the revenue floor fails instead. **The AdSense arbitrage was always the gap between advertiser value and
content investment. AI closed that gap at the low end (calc-farms); vendor content marketing closed it at the
high end.** Round 1 and round 2 are the same wall approached from opposite sides.

**Corollary, and it matters for the portfolio:** **AccentWallPlanner is the last idea of its type that will
be found.** It survives only because it sits in the remaining sliver: consumer DIY, ~$2.40 CPC with real
buyer intent, and vendors (Home Depot, Lowe's) unsophisticated enough not to have built the visual tool. That
is a survivor, not a repeatable pipeline output. **Do not expect the pipeline to produce another one.**

**What this does NOT invalidate:** the 2026-07-17 open-core SaaS scout (`research/saas-revenue-analytics.md`,
`research/client-portal.md`). Those were scored on `demand × WTP × winnability × ceiling`, monetize by
subscription not ad impressions, and distribute via GitHub / HN / dev communities rather than a SERP. **None
of the three walls above apply to them.** They remain GO and un-started.

**What would change my mind:** a distribution channel that makes the SERP irrelevant, or genuine domain
expertise in a niche (which substitutes for authority). Tarun has neither for a *new* niche. He has both for
the three domains he already owns and for the Kutch client market.

**Honest limits of this run:** 46 Step-0 pre-screens, not 46 teardowns. A single candidate could survive a
deep look. None earned one. Also untested: community/UGC, games, pure content/media (each breaks a different
gate, named so the sweep is not overclaimed).

---

## 2026-07-20 — No bet #4. Pinterest becomes the marketing engine, judged 2026-10-20

**Decision.** Tarun stops looking for a fourth AdSense product and puts the daily budget (15-20 min) into
marketing the three that exist. The full-stack SaaS continues on its own track and is unaffected — it was
never an AdSense bet. **Pinterest is the primary channel, AccentWallPlanner is the primary product, and the
verdict lands 2026-10-20.**

**The number that decided it.** Live over the wire, 2026-07-20:

| Site | Google clicks (7d) | Avg position | AdSense |
|---|---|---|---|
| JsonBeam | 4 | 6.5 | `GETTING_READY` |
| GradeJar | **0** (on 1,135 impressions) | **67.8** | `GETTING_READY` |
| AccentWallPlanner | 1 day old | — | **not added at all** |

Earnings $0.00. GA4 shows **7 real humans in 7 days** on JsonBeam. The Cloudflare figures (870 / 857 / 355
pageviews) are mostly bots — AWP's top pages after `/` were `/setup/`, `/console/`, `/api/user/`, which are
scanner probes, and JsonBeam's #1 country is the Netherlands, which is a datacenter.

**A correction I owe the record.** I first argued this as "$0 across six months" and used it as evidence the
shape had failed. **That was wrong and Tarun caught it.** All three sites plus Kesri were built in ~30-35
days. GradeJar is 18 days old; position 67.8 at 18 days is a starting line, not a verdict. Two AdSense
rejections in twelve days is not a six-month failure rate. I had accused him of reading an experiment before
it ran, then did exactly that with worse data. **The argument that survived the correction is narrower and
timeline-independent:** one AdSense account means the bets are correlated, not independent, and four
instances of the same shape is one bet placed four times.

**And his counter-argument was better than the one I answered.** SEO has a 3-6 month latency; sites 1-3 are
sitting inside that window doing nothing he can accelerate; his build capacity is idle. Building during the
wait is pipelining, not impatience. **The synthesis: build, but vary a variable — channel, shape, or
monetization — rather than shipping a fourth Google-ranked calculator on the same account.**

**Why Pinterest specifically, and not "more marketing".** The engine was never the problem. It has a
44-row playbook, five real queue files, twenty log entries and a documented failure-and-rebuild cycle. And
across its entire history it had produced **zero posts on any platform** — 2 pitch emails, 2 follow-ups, one
Reddit account. Daily cadence died in a week (07-03 → 07-10). Weekly-first replaced it and also produced
nothing in the ten days after. **Cadence was never the variable. Both designs required a decision before an
action, and the decision is what never happened.**

Pinterest is the one free channel where the decision can be removed entirely, because
**AccentWallPlanner can generate its own marketing content.** A fresh pin requires an image file never
uploaded before, and winning accounts publish 3+ a day. That volume is what kills the channel for everyone
else. This site owns a renderer that draws walls to scale, so `scripts/generate-pins.mjs` produces pins from
`solve` + `renderSvg` — the same reasoning as the existing `/diagrams/` endpoints: an image generated by the
engine cannot drift from what the tool actually does. 25 drawn and verified on day one.

Supporting facts, verified not assumed: one Pinterest business account can claim **multiple domains** (since
2021), so the one-account rule holds; claiming is DNS TXT, and all three zones are on Cloudflare with the API
already wired; the native scheduler is free but caps near 10 queued, so daily upload beats batching.

**Alternatives considered and rejected.**
- *Rotate evenly across three products daily.* Closest to what the last two engines did. Pinterest needs
  volume to work at all, so a third of the budget produces sub-threshold pinning that never reaches escape
  velocity.
- *Reddit.* Killed by Tarun. The 90/10 ratio costs weeks of genuine commenting before one link is allowed,
  drafts cannot be pre-written without risking the account, and the skill already forbids automating
  community posting. The account keeps aging at zero cost.
- *TikTok.* Genuinely right for this audience — the best promo line in the repo is a DIY creator's TikTok
  quote. Parked because video cannot be generated from the renderer and would eat the whole budget.
- *Affiliate on AccentWallPlanner.* Home improvement is a strong affiliate vertical and it has no approval
  gate, unlike AdSense. Held back this quarter: mixing an affiliate layer into a property whose sibling
  account has a live review is not worth it before a first approval lands.

**The honest risk.** This leans hard on one channel. If Pinterest fails, the rotation produces little,
because Reddit is out and JsonBeam's queue is finite. That is a deliberate trade: spreading thin across five
channels at 15 minutes a day is precisely what produced zero posts twice.

**Two blockers that must close before the channel can be judged at all:**
1. **AccentWallPlanner has no GA4 property.** Only JsonBeam does. Cloudflare edge logs include bots, so
   without GA4 there is no way to tell whether a human arrived from Pinterest.
2. **The keyword retarget written 2026-07-18 has still never been applied.** Site titles target a ~253/mo
   cluster while ~5,300/mo sits untargeted; `wainscoting` alone is 2,900/mo and flat. Copy already exists at
   `research/accent-wall-retarget-copy.md`.

**Verdict date: 2026-10-20.** Judge on Pinterest impressions plus GA4 referral sessions. Expected shape:
impressions in ~2 weeks, first referral traffic 60-90 days, compounding months 3-4. **It will look dead
through August. That is the channel's normal shape, not a failure**, and this date exists so it does not get
killed on feel in week three. Write the outcome here either way.

## 2026-07-29 — The .NET track becomes a two-performance backend track, on job-hunt hours

**Decision:** `learning/dotnet-backend/` is renamed `learning/backend/` and re-scoped from a .NET-only
translation course into **one curriculum serving two different performances**: Node.js **written and
spoken** (the interview), C#/.NET **read and explained** (the job). It moves off employer hours onto a
scored 3:00-5:00pm block. C#-the-language is taught first and fast, purely by correlation to JavaScript.
SQL is folded in at sessions 7-8. Code moves outside the repo to `MyProjects/backend-lab/`. A new
`/backend` skill runs the block. This supersedes the decision of 2026-07-18 above.

**Why:** management wants him .NET-ready for internal shortlisting, and the job switch is interviewed on
Node. The 07-18 framing treated those as competing claims on the calendar and solved it by fencing .NET
into office hours. That was right when the track was 100% .NET. It is wrong now: roughly **60% of this
curriculum is Node backend interview prep** — concurrency, async, the request pipeline, SQL — which is
priority #1 work and legitimately earns job-hunt hours. Fencing it into employer time would have meant
either teaching Node on the employer's clock or not teaching it at all.

**The non-obvious call — the .NET rep is code review, not composition.** Tarun's stated plan is to let AI
write the high-level C# and to focus on explanation. Taken literally that yields no C# hands-on at all.
The reframe: the firing risk was never that he cannot *write* C#, it is that he **approves** what he
cannot *read*. `.Result` on a Framework controller deadlocks. A `static` field on a controller is a race
under a thread pool. A lazy-loaded navigation property in a loop is an N+1. All three are things a Node
developer writes without flinching, and none are visible without reading fluency. So every .NET session
ends with a **planted-bug review** instead of a build. It trains the skill his goal actually needs and
costs less block time than composition.

**The second call — internals are woven, not front-loaded.** He asked for computer internals first.
Internals-first is right for retention and wrong for sequencing; a week of CPU and memory leaves him
able to explain neither backend. The resolution is that they are the same thing — every place the two
runtimes diverge *is* an internals fact (event loop vs thread pool, stack vs heap and why `int` cannot
be null, epoll vs IOCP, pool starvation causing the deadlock, disk pages under a B-tree). Internals
enter at the divergence point via a new `.internals` component, never as a standalone chapter.

**What would change my mind:** if the sprint ends and the .NET half starts crowding out `dsa`,
`machine-coding` or `interview-qa` once office blocks return, this goes back behind the employer-hours
fence. The risk named on 07-18 has not gone away: **.NET has a boss attached to it and the job hunt does
not, so urgency will keep trying to beat importance.** Also: if work moves to .NET Core, the C# 7.3
ceiling and half the trap material stop applying and the mission gets revised again.
