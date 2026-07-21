# AccentWallPlanner — Marketing Action Plan

Written 2026-07-20, three weeks after the other two products got theirs. Budget $0. AIOS drafts
everything. Engine is weekly-first (Sunday `/marketing`) plus the daily rotation in
`marketing/daily-rotation.md`.

**Product repo:** `C:\Users\ahirwar.tarun\Documents\Learning\MyProjects\AccentWallPlanner`
**Live:** accentwallplanner.com since 2026-07-19. 16 pages. GSC verified, sitemap submitted,
Bing + IndexNow registered.

**Why this product gets the most daily slots of the three:**

- **~$2.40 CPC with real buyer intent** — Home Depot, Lowe's and contractors bid on this audience.
  The only workable-tier product in the portfolio (`references/adsense-economics.md` calls it
  "structurally the best money bet").
- **5-15% ad-block**, not 40-60%. US homeowners, not developers.
- **No AdSense rejection history.** JsonBeam and GradeJar both carry one. This is the clean slate,
  and therefore the best shot at a first approval.
- **The only product whose marketing content can be machine-generated** from its own renderer.

---

## Phase 0 — the two things blocking everything

- [ ] **P0a — Apply the keyword retarget.** `research/accent-wall-retarget-copy.md` was written
  2026-07-18 and **never applied**. The demand pull found the tool-intent cluster the entire site is
  titled for totals **~253 Bing/mo**, while the informational cluster nothing targets totals
  **~5,300/mo**. `wainscoting` alone is 2,900/mo and flat across 25 weeks. `picture frame molding
  calculator` — the declared wedge, built first — returns **no data at all**.
  Shipped titles in `src/lib/styleContent.ts` still read `'Picture Frame Molding Calculator — Free
  Layout & Cut List'`. The replacement copy already exists. **This is a paste job worth roughly 20x
  the addressable cluster and it is the highest-ROI marketing action available on any product.**

- [ ] **P0b — Wire GA4.** There is no GA4 property on this domain; only JsonBeam has one.
  Cloudflare's edge numbers include bots — the top pages on 07-20 were `/`, `/setup/`, `/console/`
  and `/api/user/`, and the last three are scanner probes, not visitors. **Until GA4 exists, the
  Pinterest channel is unmeasurable**, which means the 2026-10-20 verdict cannot be made honestly.
  Do this before the first pin goes up.

---

## Phase 1 — Pinterest (the engine)

- [ ] **P1a — Create the Pinterest account** and claim all three domains.
  `marketing/setup/pinterest.md`. ~45 min, one sitting. Blocks the whole daily rotation.
- [x] **P1b — BUILT 2026-07-20: the pin generator.** `scripts/generate-pins.mjs` +
  `scripts/pin-set.mjs` in the product repo. Renders wall layouts through the live `solve` +
  `renderSvg` pipeline to 1000x1500 PNGs with a paste-ready queue. **25 pins drawn and verified.**
  Curated, not permuted — every entry has a distinct query behind it, per the same scaled-content
  rule the site's own colour endpoint follows. Output is gitignored; nothing ships to the site.
- [ ] **P1c — Run the rotation.** Mon/Wed/Fri, 3 pins each. ~2.7 weeks of runway on the current
  set; extend `pin-set.mjs` before it empties.
- [ ] **P1d — Verdict 2026-10-20.** Judge on Pinterest impressions + GA4 referral sessions. Write
  the result to `decisions/log.md` either way.

## Phase 2 — search (the compounding half)

- [ ] **P2a — Retarget the informational cluster properly.** P0a fixes the titles. The follow-on is
  content depth on `wainscoting` (2,900/mo), which currently has one page carrying a calculator
  title. This is the single biggest organic opportunity in the portfolio.
- [ ] **P2b — The programmatic long-tail pages that were planned and never built.**
  `research/accent-wall-trim-planner-prebuild.md` specced `/[style]/[w]x[h]-wall/` and
  `/picture-frame-molding/[rows]x[cols]-grid/`. **None exist.** They would serve double duty: organic
  long-tail *and* unique destination URLs for pins.
  **Must clear the doorway test first** — same ruling that killed GradeJar's `/ez-grader/N-questions`
  batch on 07-18. A page per wall size mounting the same widget is a keyword doorway. Only build if
  each page carries a genuinely different computed result, not the same tool behind different prose.
- [ ] **P2c — GSC demand check ~2026-08-09.** Already scheduled: 2-3 weeks after indexing, read real
  impression data before any further content investment. This replaced the paid-tool volume gate
  that never fired before the build.

## Phase 3 — not yet

- [~] **TikTok.** The prebuild brief names it as one of the two channels that matter for this
  audience, and it is probably right. **Parked** because video cannot be generated from the renderer
  and would eat the entire daily budget. Revisit only if Pinterest works.
- [~] **Reddit** (r/DIY, r/HomeImprovement). Parked by decision 2026-07-20 — the 90/10 ratio costs
  weeks of genuine commenting before a single link is allowed, and drafts can't be pre-written.
- [~] **Product Hunt.** Wrong audience. PH is makers, not homeowners.

---

## Standing rules specific to this product

1. **Every marketing image comes from the renderer.** Stock and scraped room photos were rejected
   because content you don't own is an explicit AdSense rejection reason. AI-generated rooms were
   rejected because they render impossible miters and undercut a precision tool's whole claim.
   Both are logged in `AccentWallPlanner/memory-bank/activeContext.md`. Both stand.
2. **Curated, never permuted.** Four styles x ten colours x five wall sizes is the scaled-content
   pattern, on Pinterest as much as on the site.
3. **URLs are slash-less** (`trailingSlash: 'never'`). `/wainscoting`, not `/wainscoting/`. Getting
   this wrong in a pin link costs a 301 on every click.
4. **The PNG export watermark is the growth loop.** Every plan a user downloads carries the domain.
   Do not let it be removed or made ugly.
5. AdSense hold: this site is deliberately not yet submitted. Do not submit until the content depth
   from P2a exists — a third rejection on the account is a real risk, not a theoretical one.

---

## Success criteria

| Checkpoint | Realistic target (estimate, not a promise) |
|---|---|
| Aug 20 (1 mo) | Pinterest impressions climbing; GA4 live; retarget shipped; 25+ pins posted |
| Sep 20 (2 mo) | First Pinterest referral sessions; wainscoting cluster ranking somewhere real |
| Oct 20 (3 mo) | **Verdict date.** Pinterest kept or killed on data. AdSense readiness decided. |
