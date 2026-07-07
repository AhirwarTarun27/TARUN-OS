# Pipeline Status — AccentWallPlanner (`/explore-project`)

> Resumable state of the build-planning pipeline for this product.
> **New session:** open `week.md`, then read THIS file, then resume from ▶ NEXT ACTION.
> Do NOT redo completed steps. After each confirmed gate, update this file BEFORE proceeding.

**Product:** AccentWallPlanner &nbsp; **Domain:** accentwallplanner.com (LOCKED) &nbsp; **Stage:** Step 2 of 4 (Stack) — awaiting confirm
**▶ NEXT ACTION:** Confirm the Stack (step 2) with Tarun, then run Architecture (step 3 → `design-architecture`).

## Pipeline checklist
- [x] Scout → GO — `research/accent-wall-trim-planner.md` — 2026-07-06
- [x] 1. Domain → **accentwallplanner.com** LOCKED — "planner" names the visual differentiator, sits in SEO whitespace vs the saturated "…calculator" terms, and is more shareable for a Pinterest/TikTok DIY audience; per-style landing pages still capture "[style] calculator" queries — 2026-07-07
- [~] 2. Stack → Astro 5 SSG + Preact islands + Tailwind v4 + system fonts; **SVG** live-render engine; zero-dependency SVG→canvas→PNG export; static Cloudflare Pages; CF Web Analytics + native AdSense (no Partytown). Presented, **awaiting Tarun's confirm** — 2026-07-07
- [ ] 3. Architecture → pending (`design-architecture`)
- [ ] 4. Setup kit → pending (`setup-kit`)
- [ ] Output 1: Pre-Build Brief → `research/accent-wall-trim-planner-prebuild.md`
- [ ] Output 2: Handoff prompt → `handoff-prompts/accent-wall-trim-planner.md`

## Decisions captured so far
- **Domain:** accentwallplanner.com over accentwallcalculator.com — the product's wedge is the visual *planner*, so "planner" names the differentiator, occupies SEO whitespace, and shares better; "[style] calculator" queries are still won via programmatic per-style pages.
- **Stack:** confirm the house Astro SSG pattern. Build-specific calls: **SVG (not canvas)** for the live to-scale wall (crisp, accessible, serializes to a share-image); a **zero-dependency SVG→canvas→PNG export** for the Pinterest/TikTok asset; **lazy-hydrated** Preact island so the 0-JS landing pages stay fast. The one CWV risk = **AdSense-induced CLS** → reserve every ad slot, load AdSense async + on idle, no Partytown; measure with `web-perf`. Rejected: Next.js static export (heavier JS baseline), Vite vanilla SPA (bad for the ~100-page programmatic-SEO play).

## Context
- Scout brief (full teardown + wedge + MVP scope): `research/accent-wall-trim-planner.md`
- Legend: `[x]` done · `[~]` presented / awaiting confirm · `[ ]` pending.

---
*Update protocol: this file is rewritten at every `/explore-project` gate — tick the step, log the decision + date, reset ▶ NEXT ACTION — BEFORE the next sub-skill runs.*
