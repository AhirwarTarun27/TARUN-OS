# Pipeline Status — AccentWallPlanner (`/explore-project`)

> Resumable state of the build-planning pipeline for this product.
> **New session:** open `week.md`, then read THIS file, then resume from ▶ NEXT ACTION.
> Do NOT redo completed steps. After each confirmed gate, update this file BEFORE proceeding.

**Product:** AccentWallPlanner &nbsp; **Domain:** accentwallplanner.com (LOCKED, not purchased) &nbsp; **Stage:** `COMPLETE — ready to build`
**▶ NEXT ACTION:** Hand the prompt at `handoff-prompts/accent-wall-trim-planner.md` to the new repo. Before committing build weeks to `week.md`, close the open item below (exact search volumes).

## Pipeline checklist
- [x] Scout → GO — `research/accent-wall-trim-planner.md` — 2026-07-06
- [x] 1. Domain → **accentwallplanner.com** LOCKED — "planner" names the visual differentiator, sits in SEO whitespace vs the saturated "…calculator" terms, and is more shareable for a Pinterest/TikTok DIY audience; per-style landing pages still capture "[style] calculator" queries — 2026-07-07
- [x] 2. Stack → Astro 5 SSG + Preact islands + Tailwind v4 + system fonts; **SVG** live-render engine; zero-dependency SVG→canvas→PNG export; static Cloudflare Pages; CF Web Analytics + native AdSense (no Partytown). Presented 2026-07-07, **confirmed as presented — 2026-07-10**
- [x] 3. Architecture → **style-agnostic `Layout` model** (`solve(style,config) → {members[], panels[], cutList[]}`) so ONE dumb SVG renderer serves all 4 trim styles; pure-TS solver core runs at build (inline SEO/LCP SVG) AND in-browser (live updates); URL-as-state; zero backend; static CF Pages. **Confirmed as presented — 2026-07-10**
- [x] 4. Setup kit → **light-first, decor-magazine** design direction (NOT Tarun's dark default — this product serves Pinterest-browsing homeowners); mobile-first, render-dominant; PNG export carries the domain watermark = the growth loop. Kit: enable official `frontend-design` (already in marketplace cache); new repo gets Playwright MCP + Chrome DevTools MCP (CLS instrument) + **Vitest + `@astrojs/sitemap` ONLY**. **Confirmed — 2026-07-10**
- [x] Output 1: Pre-Build Brief → `research/accent-wall-trim-planner-prebuild.md` — 2026-07-10
- [x] Output 2: Handoff prompt → `handoff-prompts/accent-wall-trim-planner.md` — 2026-07-10
- [x] Decision logged → `decisions/log.md` (2026-07-10 entry) — 2026-07-10

## Decisions captured so far
- **Domain:** accentwallplanner.com over accentwallcalculator.com — the product's wedge is the visual *planner*, so "planner" names the differentiator, occupies SEO whitespace, and shares better; "[style] calculator" queries are still won via programmatic per-style pages.
- **Architecture:** all 4 trim styles are one problem, "a grid drawn on a wall". The only variance: sometimes the rect IS the trim (batten/slat), sometimes it's the opening the trim frames (panel). So `Layout` carries `members[]` + `panels[]` and the renderer never learns what a batten is. Mixed-size boxes (the incumbent-killer) = `rowHeights[]`/`colWidths[]`, the general case; even spacing is the degenerate one. Pure solver ⇒ same function renders the inline SVG at build (LCP + indexable) and drives live updates in the browser (functional core, imperative shell). Named trap: URL-as-state × programmatic pages = duplicate content ⇒ `rel=canonical` to the clean path on day one.
- **Build order:** hardest style FIRST — picture-frame molding with **mixed-size boxes** is outcome #1, not board & batten. It stress-tests the `Layout` model while it's still cheap to change, and it IS the wedge. Head term `board and batten calculator` is conceded to inchcalculator's domain authority (per the scout brief) regardless of build order — 2026-07-10
- **Biggest risk (ranked):** #1 style-coupling leaking into the layout model (silently kills the ~100-page programmatic SEO play; mitigate = build mixed-size grid first + a test that renders all 4 styles through one renderer with zero conditionals). #2 AdSense-induced CLS (real but bounded; reserve every slot, async + on-idle).
- **Stack:** confirm the house Astro SSG pattern. Build-specific calls: **SVG (not canvas)** for the live to-scale wall (crisp, accessible, serializes to a share-image); a **zero-dependency SVG→canvas→PNG export** for the Pinterest/TikTok asset; **lazy-hydrated** Preact island so the 0-JS landing pages stay fast. The one CWV risk = **AdSense-induced CLS** → reserve every ad slot, load AdSense async + on idle, no Partytown; measure with `web-perf`. Rejected: Next.js static export (heavier JS baseline), Vite vanilla SPA (bad for the ~100-page programmatic-SEO play).

## Context
- Scout brief (full teardown + wedge + MVP scope): `research/accent-wall-trim-planner.md`
- Legend: `[x]` done · `[~]` presented / awaiting confirm · `[ ]` pending.

## Open items (not blocking)
- **Exact search volumes never pulled.** The scout brief directs "pull Semrush/Ahrefs numbers as the first action in `/explore-project`" — the run opened with Domain instead. Demand stands at triangulated medium-high confidence. Reconcile BEFORE the Pre-Build Brief is written, since its "first 3 build outcomes" become real `week.md` commitments.

---
*Update protocol: this file is rewritten at every `/explore-project` gate — tick the step, log the decision + date, reset ▶ NEXT ACTION — BEFORE the next sub-skill runs.*
