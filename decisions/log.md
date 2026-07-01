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
