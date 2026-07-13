# Pre-Build Brief — AccentWallPlanner

**Status:** BUILD-READY. All four `/explore-project` steps confirmed 2026-07-10.
**Scout brief (GO, 2026-07-06):** `research/accent-wall-trim-planner.md`
**Pipeline status:** `research/accent-wall-trim-planner-status.md`
**Handoff prompt:** `handoff-prompts/accent-wall-trim-planner.md`

---

## 1. Name + domain

**AccentWallPlanner** — `accentwallplanner.com` (LOCKED, available at time of check, **not yet purchased**).

"Planner" names the visual differentiator, sits in SEO whitespace against the saturated `…calculator` terms, and shares better to a Pinterest/TikTok DIY audience. The `[style] calculator` queries are still captured, via programmatic per-style pages.

**Domain purchase is the final go-live milestone, not a prerequisite.** Build and deploy on the Cloudflare Pages `*.pages.dev` preview URL. Squat risk on a four-word exact-match domain is low. Flagged once; the decision is Tarun's.

Handles to grab at go-live: `@accentwallplanner` on Pinterest and TikTok (the two channels that matter for this audience).

---

## 2. The wedge + MVP scope

### The wedge (never compromise)

> The only accent-wall tool that renders **your** wall to-scale, live, and solves the layouts the incumbents cannot: full row × column grids, and **different-size boxes on one wall.**

Three facts from the scout teardown, all load-bearing:

1. The #1 ranking tool (inchcalculator) **explicitly does not visualize.** It is "a calculation tool, not a visualization engine."
2. Incumbents fail the real cases. A DIY creator on TikTok, verbatim: *"Online calculators only work if your boxes are the same size."*
3. The niche is fragmented into single-style calculators. Nobody covers board & batten, wainscoting, picture-frame molding, and slat wall in one tool.

### MVP scope (~3-4 weeks, ~10-12 hrs/wk)

- Spacing and grid solver: even-gap battens, M×N box grids with **mixed row heights and column widths**, wainscoting rails and stiles, slat spacing.
- Live to-scale SVG wall renderer, mobile-first, updates as you type.
- Four style modes, all served by one renderer.
- Outputs: exact measurements, a cut list, and a **downloadable PNG** of the layout.
- Static Astro SSG site. One keyword landing page per style, plus programmatic long-tail pages.
- AdSense slots reserved from first paint.

**Explicitly not the wedge, do not let it block a ship:** `localStorage` "save a layout," dark mode, build-time OG images, user accounts (never).

### Honest caveat, carried forward

inchcalculator has domain authority and owns `board and batten calculator`. **We will not outrank it there in the MVP window, and we are not trying to.** Win the visual, adjacent, and long-tail terms (`picture frame molding calculator`, `accent wall layout planner`, `box molding grid`, `slat wall calculator`, `different size boxes on one wall`), plus programmatic per-style pages, and let the shareable render earn Pinterest and TikTok links.

---

## 3. Stack (confirmed 2026-07-10)

| Layer | Choice |
|---|---|
| Framework | Astro 5, static SSG, no SSR anywhere |
| Interactivity | Preact islands, `client:idle` |
| Styling | Tailwind v4 (CSS-first `@theme`, no `tailwind.config.js`) |
| Fonts | System stack. No webfonts, no FOUT, no preload. |
| Render engine | **SVG**, not canvas |
| Export | Zero-dependency SVG → canvas → `toBlob('image/png')` |
| Hosting | Cloudflare Pages, static |
| Analytics | Cloudflare Web Analytics |
| Ads | Native AdSense, async + on-idle. **No Partytown.** |

**Why SVG over canvas:** crisp at any zoom, accessible (real DOM nodes, `role="img"`, `<title>`/`<desc>`), trivially serializable for the PNG export, and it can be emitted as static HTML at build time. Canvas gives up all four.

**Rejected:** Next.js static export (heavier JS baseline). Vite vanilla SPA (wrong for a ~100-page programmatic-SEO play).

---

## 4. Architecture (confirmed 2026-07-10)

### The core insight

All four trim styles are the same problem: **a grid, drawn on a wall.**

| Style | Really is |
|---|---|
| Board & batten | 1 row × N columns. Each column *is* a solid batten. |
| Slat wall | Same solver. Narrower slats, tighter gaps, full height. |
| Wainscoting | 1 row of panels, bounded by rails, split by stiles. |
| Picture-frame molding | M rows × N columns. Each cell is a panel, framed by 4 molding pieces. |

The only variance: sometimes the rectangle **is** the trim (a batten), and sometimes it is the **opening** the trim frames (a panel). So the layout model carries both, and **the renderer never learns what a batten is.**

```ts
type Member = { x: number; y: number; w: number; h: number;
                kind: 'batten' | 'slat' | 'rail' | 'stile' | 'box-side';
                cutLength: number; miter?: 'both' | 'none' }

type Layout = {
  wall:    { w: number; h: number }
  members: Member[]    // solid trim
  panels:  Rect[]      // framed openings (shading + size readouts)
  cutList: CutItem[]   // { label, length, qty }, miters resolved
  warnings: string[]   // "gap under 1in, will look cramped"
}

solve(style: Style, config: Config): Layout
```

Mixed-size boxes are `rowHeights: number[] | 'even'` and `colWidths: number[] | 'even'`. The solver distributes the remainder. **It is not a special mode. It is the general case, and even spacing is the degenerate one.**

### Data flow (words and boxes)

```
BUILD TIME (Node)                             BROWSER
─────────────────                             ───────
data/styles.ts ─┐
data/pages.ts  ─┼─> getStaticPaths ─> .astro page
page preset    ─┘                        │
                                         └─> static HTML + inline <svg>   [LCP, indexable, 0 JS]
                                                       │
        ┌──────────────────────────────────────────────┘
        │   solve(config) : pure TS, zero DOM
        │   THE SAME FUNCTION RUNS ON BOTH SIDES
        └──────────────────────────────────────────────┐
                                                       ▼
  ?w=120&h=96&style=bb&n=6 ────────>┌──────────────────┐
            ▲                       │  config (state)  │<── controls  [Preact island, client:idle]
            │  replaceState         └────────┬─────────┘
            │  (debounced 300ms)             ▼
            │                           solve(config)
            │                                │
            │                                ▼
            │                       ┌────────────────┐
            └───────────────────────│    Layout      │
                                    │  members[]     │
                                    │  panels[]      │
                                    │  cutList[]     │
                                    └───────┬────────┘
                     ┌──────────────────────┼──────────────────────┐
                     ▼                      ▼                      ▼
                <WallSvg/>             <CutList/>             PNG export
             dumb. zero style           (table)          SVG→canvas→toBlob
             logic. ever.                                   (zero deps)

  [AdSlot: fixed aspect-ratio box, reserved at paint, filled on idle]
```

### Layer by layer

**Rendering & SEO.** Astro SSG, everything prerendered. Routes: `/` (the planner), four hand-written style pages (`/board-and-batten-calculator/`, `/picture-frame-molding-calculator/`, `/wainscoting-calculator/`, `/slat-wall-calculator/`), then programmatic long-tail via `getStaticPaths` from a data file (`/[style]/[w]x[h]-wall/`, `/picture-frame-molding/[rows]x[cols]-grid/`).

Because the solver is pure and DOM-free, **Astro runs it in Node at build time and emits the SVG directly into the HTML.** The hero is a real, to-scale, indexable inline SVG before any JS loads. The island then hydrates the same markup on idle. One implementation, two runtimes, no flash of empty state.

Schema: `HowTo` + `FAQPage` on style pages, `SoftwareApplication` on `/`. Hand-written JSON-LD, no dependency. Sitemap via `@astrojs/sitemap`.

**The named trap:** URL-as-state × programmatic pages generates duplicate content. Every query permutation looks like a new page. Fix with `<link rel="canonical">` on every page pointing at the clean path, ignoring the querystring. **Cheap on day one, ugly to retrofit after indexing.**

**Components.** Complexity concentrates in `src/lib/solver/` (pure TypeScript, zero framework imports, unit-testable without a browser). That is the actual IP and the thing that beats inchcalculator. `src/lib/layout.ts` holds the types: the seam. `WallSvg` takes a `Layout` and draws rects, and is deliberately stupid. Controls live in the island. `AdSlot.astro` is a fixed-size container. Thin UI over a fat pure core puts the bugs where they are cheapest to test.

**State.** One direction, no exceptions: `URL or page preset → config → solve() → Layout → SVG + cut list`. The URL is the serialization format. Short keys, `history.replaceState` on a 300ms debounce so the back button stays usable, plus an explicit "Copy link" button. Layouts become shareable links, and programmatic pages deep-link into presets instead of needing bespoke code.

**Performance.** LCP is an inline SVG, so there is no image request. System fonts, so no font request. Only the planner route ships JS: Preact is ~4kb, the solver is small. Target under 20kb on the planner, **0kb on pure content pages**. `solve()` is arithmetic over a few dozen rects and will not approach the 50ms INP budget, but range sliders fire continuously, so throttle them to `requestAnimationFrame`.

CLS is the one to respect. Every ad slot gets explicit `aspect-ratio` and `min-height` per breakpoint, reserved at first paint. AdSense loads `async` inside `requestIdleCallback`. Nothing is ever inserted above the SVG after paint.

**Caching.** Cloudflare Pages. Content-hashed assets `max-age=31536000, immutable`. HTML `max-age=0, must-revalidate`, served from edge cache. A `_headers` file covers it. There is no origin to protect.

**Scale.** At 100k+ sessions/month nothing breaks, because nothing is running. No database, no functions, no rate limits. Cost stays ~$0 plus the domain. The only moving parts belong to Google and Cloudflare. Build time is the sole quantity that grows with page count, and a few hundred pages compile in seconds. Revisit near 50k pages, which is a problem worth having.

**Backend.** None. Zero. Deliberately.

### The scaling story

The design has no bottleneck because it has no server. Every route is a file on a CDN. Traffic could 100x and the only line item that changes is the AdSense payout. That is the point of static: the growth ceiling is Google's willingness to send traffic, never the infrastructure's willingness to serve it.

### Biggest architectural risk (ranked)

**#1 — Style-coupling leaking into the layout model.** If `Layout` cannot express mixed-size boxes on day one, the fourth style forces a renderer branch, then the page generator forces another, and the programmatic SEO play (the actual growth engine) quietly degrades into hand-built pages. You would not notice until week three, when the renderer has grown conditionals you cannot remove.

**Mitigation:** build **picture-frame molding with mixed-size boxes first.** It is the hardest case and it is the wedge. If the model survives it, the other three styles fall out as degenerate cases. Write the `Layout` type before any UI exists. Add a test that renders all four styles through one renderer with **zero style conditionals**. If that test needs an `if`, the model is wrong.

**#2 — AdSense-induced CLS.** Real, but bounded and well-understood. Slot reservation solves it. It cannot silently corrupt the architecture the way #1 can.

### Front-end system-design learning notes

The reps this build buys. All five are live interview material, which matters during an active job switch.

- **Functional core, imperative shell.** One pure function at build time and in the browser is why the SVG is both SEO-visible and interactive. Study: `functional core imperative shell`.
- **Islands architecture and partial hydration.** Why 0-JS content pages plus one hydrated island beats an SPA for a mass-traffic SEO tool. Study: `islands architecture partial hydration`.
- **URL as state.** The querystring as a shareable, indexable, back-button-friendly store, and the canonicalization tax it incurs. Study: `URL as single source of truth`.
- **Layout stability under third-party ads.** Reserving space for content you do not control. Study: `cumulative layout shift ad slot reservation`.
- **Programmatic SEO.** Generating N pages from data without tripping duplicate content. Study: `programmatic SEO canonical faceted navigation`.

---

## 5. Setup checklist

### Design direction

Competitors look like engineering utilities. **Looking like a design tool is itself the differentiation,** and it is what makes the render worth pinning. Chase "home-decor magazine," not "calculator."

- **Light-first UI.** Warm neutral base, soft paper-like canvas behind the wall. One quiet accent for interactive chrome, because the wall colors are the *content*.
  - This deliberately departs from Tarun's dark-theme default. That preference governs AIOS artifacts generated **for him**, not a product built for Pinterest-browsing homeowners.
- **Mobile-first, hard.** Pinterest and TikTok traffic is overwhelmingly mobile. Render on top and sticky, controls in a scrollable sheet below. Desktop gets inspector-left, render-right.
- **The render is the product.** Soft drop shadow, to-scale dimension annotations with leader lines, warm-white trim against a selectable wall color. Ship 3-4 tasteful presets (classic white, sage, deep navy, warm greige). Color choice is free virality: people pin the one matching their room.
- **The PNG export carries a small, tasteful `accentwallplanner.com` mark plus the wall dimensions.** That is the growth loop in one design decision. Do not skip it, do not make it ugly.
- **Type:** system stack, weight contrast does the work. Measurements in large `tabular-nums`.
- **One accessibility move that pays SEO rent:** the SVG gets `role="img"` and an auto-generated `<title>` and `<desc>` describing the layout in words ("6 evenly spaced battens, 14.2in gaps, on a 120x96in wall"). Screen readers get a real description; Google gets indexable text inside the hero image. Same code, two wins.

**References:** Pinterest pin composition (image-dominant, minimal chrome). Excalidraw / Figma canvas-plus-inspector split. Benjamin Moore ColorSnap, for how a decor audience expects to pick color.

### Enable now (user-level, benefits every project)

`frontend-design` — Anthropic's official skill, **already in the marketplace cache, just not enabled.** Nothing to install.
`/plugin` → Manage plugins → `claude-plugins-official` → `frontend-design` → Enable.

### For the new repo (nothing is installed into TARUN-OS)

**MCPs:**

| MCP | Type | Command |
|---|---|---|
| Playwright | Standing exception, pre-approved | `claude mcp add playwright npx @playwright/mcp@latest` |
| Chrome DevTools | Action MCP, approved 2026-07-10 | `claude mcp add chrome-devtools npx chrome-devtools-mcp@latest` |
| Tailwind v4 docs | Doc-reference, **do not install** | Capture as `references/mcp/tailwind-4-docs.md` on approval |
| Astro docs | Doc-reference | Already captured. Do nothing. |

Playwright verified: 34.9k stars, v0.0.78 (2026-07-09), Microsoft. Chrome DevTools MCP is Google-official and is the only tool that *measures* the #1 threat: it records a real Chrome trace and extracts CLS, LCP, INP. `web-perf` is the playbook, Playwright loads the page, Chrome DevTools MCP is the instrument. It drives real Chrome, not Edge.

**Libraries (dependency line held deliberately lean, confirmed 2026-07-10):**

```bash
npm i -D vitest          # tests the pure solver in environment:'node', zero DOM setup
npx astro add sitemap    # @astrojs/sitemap v3.7.3, official Astro Core
```

That is the whole list. **JSON-LD and `<head>` meta are hand-written, no dependency.** `astro-seo` and `schema-dts` were considered and cut: both are convenience, `schema-dts` was last tagged in 2022, and hand-rolling costs about an hour while matching the zero-dep ethos the PNG export already commits to.

### Already installed, do not double-install

`web-perf` (CWV playbook) · `cloudflare` + `wrangler` (Pages deploy + Web Analytics, this is the deploy answer) · `session-handoff` · `references/mcp/astro-docs.md`.

### Deliberately skipped

Partytown (native AdSense chosen; Partytown also breaks ad viewability). All SVG→PNG libraries (`canvg`, `html-to-image`, `dom-to-image`, runtime Satori) because zero-dep export is an architectural commitment. State libraries (`nanostores`, Zustand) because URL-as-state needs no store. Tailwind component kits (DaisyUI, Flowbite) because they fight a distinctive pinnable identity. `@astrojs/react` (we're on Preact). `happy-dom` / Testing Library (unnecessary for a pure-function solver). `astro-compress`, `astro-robots-txt`, `@astrojs/rss` (dep-for-nothing). Full Playwright E2E suite (scope creep at 3-4 solo weeks). `executeautomation/mcp-playwright` (use Microsoft's).

---

## 6. First 3 build outcomes

Ready to drop into `week.md`. **Ordered by the risk-#1 mitigation, not by comfort.**

**Outcome 1 — The solver survives the hardest case.**
`solve('picture-frame', config)` handles an M×N grid with **mixed row heights and column widths** plus margins, and returns a correct `Layout` with a miter-resolved cut list.
*Done =* Vitest suite green, including a mixed-size grid case, an even-grid case, and an impossible-config case that produces a `warning` instead of a crash. No UI exists yet. No `WallSvg` exists yet.

**Outcome 2 — One dumb renderer, four styles, zero conditionals.**
`WallSvg` takes a `Layout` and draws it. The other three solvers land, as degenerate cases of the same grid.
*Done =* a test renders all four styles through the single renderer and **`WallSvg` contains no style conditional**. If it needs an `if`, stop and fix the model.

**Outcome 3 — It's live, to-scale, and shareable.**
The Preact island hydrates on idle over a build-time inline SVG. URL-as-state round-trips. PNG export works with the watermark.
*Done =* deployed to `*.pages.dev`, a shared link restores the exact layout, the PNG downloads with the domain mark, and Chrome DevTools MCP reports **CLS < 0.1** with ad slots reserved.

**Go-live (not an MVP outcome):** buy `accentwallplanner.com`, attach DNS, submit to GSC + Bing, add to AdSense. Then the site joins the weekly `/marketing` queue alongside JsonBeam and GradeJar.

---

## 7. Open item, carried forward

**Exact search volumes were never pulled.** The scout brief directs: *"Pull Semrush/Ahrefs numbers as the first action in `/explore-project`."* The run opened with the Domain step instead, so demand still rests on triangulation at **medium-high confidence** (8-12 maintained tools per sub-term, active TikTok/Pinterest surfaces, trend coverage). Estimated cluster volume: low-to-mid tens of thousands/month US.

This did not block scoping, and it does not block Outcome 1, which is pure solver work valid under any volume. **Reconcile it before committing the build weeks to `week.md`.** If real volume comes in materially below the estimate, the honest move is to re-run the demand gate, not to build anyway.
