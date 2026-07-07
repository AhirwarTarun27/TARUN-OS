# Scout Brief — Accent-Wall Trim Layout Planner (GO)

**Verdict: GO.** Bet #3 candidate. Scouted 2026-07-06 under the demand-gated (Step 0) scout process.

## The problem (one sentence)

People planning a trending accent wall — board & batten, picture-frame / box molding, wainscoting, or slat wall — struggle to work out *even, professional spacing* (especially full grids and different-size boxes on one wall), and today they either do error-prone hand math or use numbers-only calculators that can't show what the finished wall will look like.

**Target user:** US-first DIY homeowners riding the 2026 accent-wall trend — heavily Pinterest/TikTok, skews home-decor DIY, weekend-project budget (~$85-200/wall). Low ad-block audience (not devs).

## Keyword cluster + demand read

One broad cluster, several sub-terms that all share the same "even-spacing layout" engine:

- **Board & batten:** `board and batten calculator`, `board and batten spacing calculator`, `how to space board and batten`
- **Picture-frame / box molding:** `picture frame molding calculator`, `box trim calculator`, `picture frame wainscoting calculator`
- **Wainscoting:** `wainscoting calculator`, `wainscoting layout calculator`
- **Slat wall / accent wall:** `slat wall calculator`, `accent wall layout`, `accent wall calculator`
- **Long-tail (the gap):** `different size boxes on one wall`, `picture frame molding spacing grid`, `board and batten spacing X boards`

**Demand: PASS — medium-high confidence.** Triangulated (no paid tool yet):
- 8-12 dedicated tools maintained *per sub-term* (inchcalculator, Omni, calconic, professionalcalculators, scale-converter, archedmanor, homebyalley, ourprojectideas, Angi, + many DIY blogs) — a strong "many players maintain a tool" demand proxy.
- TikTok "discover" pages exist for `picture frame molding calculator`; active Pinterest boards.
- Trend articles call board & batten "absolutely everywhere in 2026," cheap-high-impact, beginner DIY.
- Estimated cluster volume: **low-to-mid tens of thousands/mo US.** *Confirm exact figures with Semrush/Ahrefs as step 1 of `/explore-project`.*

## Top-10 teardown

| Tool | What / authority | Visual? | Features | Monetization / feel |
|------|------------------|---------|----------|---------------------|
| **inchcalculator** (board&batten, wainscoting) | Authoritative construction-calc aggregator, ranks #1 | **No** — "a calculation tool, not a visualization engine"; static example image only | Even-spacing solver, board count; single-row only; **no box grids**, no mixed sizes | Contractor-referral CTA (not even AdSense-optimized); clean but utilitarian |
| **Omni Calculator** (board&batten, wainscoting) | Authoritative aggregator | **No** — purely numeric + one static photo | Board/batten count, furring, trim; fixed spacing, no waste solver | Branded, long page, some bloat |
| **homebyalley** (picture frame molding) | DIY blog tool | **No** preview | **Single-wall only**; no multi-row/col grid solver | Affiliate |
| **archedmanor / ourprojectideas / Angi** | Blog calculators | No | Numeric spacing, thin-to-moderate | Affiliate / ads |
| **calconic board&batten widget** | Embeddable widget | Partial layout, generic | Basic spacing | Widget |
| **FrameLayoutPro / HangCalc / Reptile Jigs** | Visual, real-time diagrams | **Yes** — but for hanging *existing frames/art* (nail placement) | Different job entirely — not trim molding | — |

## The wedge (concrete, derived from data)

1. **No incumbent renders the user's actual wall to-scale, live.** The #1 tool explicitly does not visualize.
2. **Incumbents fail the real-world cases** users actually have — full grids (rows × columns) and *different-size boxes on one wall*. Quoted verbatim by a DIY creator on TikTok: *"Online calculators only work if your boxes are the same size."*
3. **The niche is fragmented** — separate single-style calculators; no one tool covers board & batten + wainscoting + picture-frame/box grid + slat wall.

**Build = one visual, to-scale accent-wall layout planner** that (a) draws the user's wall live with the battens/panels/boxes in place, (b) solves even spacing for grids and mixed box sizes (the cases incumbents can't), (c) covers all four trim styles, and (d) outputs a **shareable image** of the layout (the render *is* the Pinterest/TikTok pin) plus a cut list.

## Fit scorecard

| Criterion | Call | Note |
|-----------|------|------|
| Demand floor | **PASS** | Cluster low-mid tens of thousands/mo, trending, med-high confidence |
| Beatable top-10 | **PASS** | Incumbents numeric-only / single-style; thin blogs rank; concrete open visual+grid wedge |
| Money-model viable | **PASS** | Home-improvement/decor CPM, DIY low-adblock audience, $0 static backend, cheap edge-served |
| Front-end-heavy | **STRONG PASS** | An SVG/canvas render engine *is* the product |
| 3-4 wk MVP | **PASS** | Spacing/grid solver + renderer + per-style landing pages |
| Scale / expand | **PASS** | Style cluster + programmatic landing pages + shareable renders → Pinterest/TikTok flywheel |

## Caveats (log honestly)

- **inchcalculator has domain authority** and owns the exact head term `board and batten calculator`; we likely won't outrank it there in the MVP window. Win the **visual / adjacent / long-tail** terms (picture frame molding calculator, accent wall layout planner, box molding grid, slat wall calculator, "different size boxes") + programmatic per-style pages, and let the shareable render earn Pinterest/TikTok links. Cluster breadth makes head-term loss non-fatal.
- **Saturation clock:** AI-calculator farms are moving into home calcs, and visual picture-*hanging* tools exist. The trim-molding *visual + grid* planner is still open — this is a reason to move now, not wait (matches the banked "the gap closes fast" lesson).
- **Exact search volumes unconfirmed** (free-tool limit). Pull Semrush/Ahrefs numbers as the first action in `/explore-project`.

## Rough MVP scope (~3-4 weeks, ~10-12 hrs/wk, zero code reuse)

- **Spacing/grid solver:** even-gap batten spacing; grid solver for box molding incl. mixed-size boxes and margins; wainscoting rails/stiles; slat spacing.
- **Live to-scale wall renderer** (SVG/canvas), responsive + mobile-first, updates as you type.
- **4 style modes:** board & batten, picture-frame/box molding (grid), wainscoting, slat wall.
- **Outputs:** exact measurements + cut list, and a **downloadable/shareable image** of the layout.
- **Static site (Astro SSG)**, one keyword landing page per style; AdSense slots reserved (native, no Partytown); localStorage "save a layout" optional (nice-to-have, NOT the wedge).
- **Distribution baked in:** shareable render designed as a Pinterest/TikTok asset.

---

**Verdict: GO. Run `/explore-project research/accent-wall-trim-planner.md` to scope the build.**
