# Build AccentWallPlanner

## 1. Role & mission

You are a senior front-end engineer. You are building **AccentWallPlanner**, a visual, to-scale accent-wall trim layout planner for US DIY homeowners riding the 2026 accent-wall trend. They arrive from Pinterest and TikTok, they are not technical, and they are on a phone. It covers four trim styles: board & batten, picture-frame / box molding, wainscoting, and slat wall. It is a static site, monetized with Google AdSense, with zero backend.

**The wedge, which must never be compromised:** every incumbent is a numbers-only calculator. The #1 ranking tool states outright that it is "a calculation tool, not a visualization engine," and none of them handle the layouts real people actually have. A DIY creator said it exactly: *"Online calculators only work if your boxes are the same size."* So this tool does two things nobody else does. It **renders the user's actual wall to-scale, live, as they type**, and it **solves full row × column grids with different-size boxes on one wall**. It outputs a shareable PNG of the layout (the render *is* the Pinterest pin) plus an exact cut list.

Everything in this document serves those two capabilities. If a decision would weaken either one, it is the wrong decision.

## 2. Operating rules

- **Ship ugly, ship fast.** "Ranks #1 and loads fast" beats "best code." Done beats perfect. Target is a 3-4 week MVP at roughly 10-12 hours per week, solo.
- **The pure core is sacred.** The solver has zero framework imports and zero DOM access. It is the IP. Everything else is replaceable.
- **TypeScript, strict.** Types are the design. Write the `Layout` type before you write any UI.
- **Zero dependencies unless one earns its place.** The full approved list is in section 3. Do not add to it without asking.
- **Do not add a backend.** Not for anything. If you think you need one, you have misread the wedge.
- **Verify in a real browser before claiming something works.** Use the Playwright MCP.

### The MCP rule

- **The Playwright MCP (`@playwright/mcp`) is pre-approved and standard.** Wire it by default, no need to ask. It is the verification backbone: it drives a real browser to prove changes work, exercise the wedge, check keyboard flows, and take screenshots.
  ```
  claude mcp add playwright npx @playwright/mcp@latest
  ```
- **The Chrome DevTools MCP is approved for this project specifically**, because Core Web Vitals are priority #1 and it is the only tool that actually measures them (`performance_start_trace` records a real Chrome trace and extracts LCP, CLS, INP). It drives real Chrome, not Edge.
  ```
  claude mcp add chrome-devtools npx chrome-devtools-mcp@latest
  ```
- **For every OTHER MCP: do NOT install, and do NOT run `claude mcp add` or edit MCP config.** They are optional power-ups, never prerequisites. If one would genuinely help, surface it as a one-line suggestion and **wait for explicit approval.**
- **On approval, branch by type:**
  - **Doc-reference MCPs** (read-only, they only fetch docs that rarely change, e.g. `astro-docs`): **do NOT install.** Research the underlying resource and write a local `references/mcp/<tool-name>.md` capturing the functions, params, and usage patterns the MCP would have surfaced. Future sessions read that file. Far fewer tokens, and docs do not change often. Refresh only on the command "update the `<tool-name>` reference."
  - **Action MCPs** (they execute things: GitHub, databases, filesystem): these are the exemption. A reference file cannot run a command, so install the real MCP at least-privilege scope.
- **Tailwind v4 docs** are a near-certain doc-reference need. Capture them as `references/mcp/tailwind-4-docs.md` rather than installing an MCP. (The `tailwind-4-docs` skill from `Lombiq/Tailwind-Agent-Skills` is already a local form and is fine to add as-is.)
- The same restraint applies to any tooling install that is not strictly required for the milestone in front of you. Suggest, do not auto-install. Keep the kit lean.

### Git

Never run git commands. When work is ready to commit, write the commit message and hand it over. The human pushes.

## 3. Stack (pinned)

| Layer | Choice |
|---|---|
| Framework | **Astro 5**, static SSG. No SSR. No adapter. |
| Interactivity | **Preact** islands, hydrated `client:idle` |
| Styling | **Tailwind v4** (CSS-first `@theme`, no `tailwind.config.js`) |
| Fonts | System stack. No webfonts. |
| Render | **SVG.** Not canvas. |
| Export | Zero-dependency SVG → canvas → `toBlob('image/png')` |
| Hosting | Cloudflare Pages, static, deployed to `*.pages.dev` |
| Analytics | Cloudflare Web Analytics |
| Ads | Native AdSense, `async` + `requestIdleCallback`. **No Partytown.** |

**The complete dependency list. Nothing else without asking:**

```bash
npm i -D vitest          # tests the pure solver, environment:'node', no DOM setup
npx astro add sitemap    # @astrojs/sitemap, official Astro Core
```

**JSON-LD and `<head>` meta are hand-written.** No `astro-seo`, no `schema-dts`. Both are convenience, and hand-rolling costs about an hour.

**Why SVG, not canvas:** crisp at any zoom, accessible (real DOM nodes), trivially serializable for the PNG export, and emittable as static HTML at build time. Canvas gives up all four.

**Explicitly rejected, do not reintroduce:** Partytown. `canvg` / `html-to-image` / `dom-to-image` / runtime Satori. `nanostores` / Zustand. DaisyUI / Flowbite / `@tailwindcss/typography`. `@astrojs/react`. `happy-dom` / Testing Library. `astro-compress`. `astro-robots-txt`.

## 4. Architecture contract

### The core insight, which is the whole design

All four trim styles are one problem: **a grid, drawn on a wall.**

| Style | Really is |
|---|---|
| Board & batten | 1 row × N columns. Each column *is* a solid batten. |
| Slat wall | Same solver. Narrower slats, tighter gaps, full height. |
| Wainscoting | 1 row of panels, bounded by rails, split by stiles. |
| Picture-frame molding | M rows × N columns. Each cell is a panel, framed by 4 molding pieces. |

The only variance: sometimes the rectangle **is** the trim (a batten), and sometimes it is the **opening** the trim frames (a panel). The layout model carries both, so **the renderer never learns what a batten is.**

### The data schema

```ts
type Rect = { x: number; y: number; w: number; h: number }   // inches, origin top-left

type Member = Rect & {
  kind: 'batten' | 'slat' | 'rail' | 'stile' | 'box-side'
  cutLength: number
  miter?: 'both' | 'none'
}

type CutItem = { label: string; length: number; qty: number }

type Layout = {
  wall:     { w: number; h: number }
  members:  Member[]     // solid trim pieces
  panels:   Rect[]       // framed openings, for shading + size readouts
  cutList:  CutItem[]    // miters already resolved
  warnings: string[]     // "gap under 1in, will look cramped"
}

type Config = {
  wall: { w: number; h: number }
  rowHeights: number[] | 'even'
  colWidths:  number[] | 'even'
  margins: { top: number; right: number; bottom: number; left: number }
  gap: { x: number; y: number }
  memberWidth: number
}

solve(style: Style, config: Config): Layout   // pure. no DOM. no framework.
```

**Mixed-size boxes are `rowHeights` and `colWidths` as explicit arrays. This is not a special mode. It is the general case, and even spacing is the degenerate one** (`'even'` means "distribute the remainder"). Build it this way from the first line or the model will not survive contact with style four.

### Data flow, one direction, no exceptions

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

### Non-negotiable invariants

1. **`WallSvg` contains zero style conditionals.** No `if (style === ...)`, ever. It takes a `Layout` and draws rectangles. If it needs a branch, the `Layout` model is wrong. Fix the model, not the renderer.
2. **The solver is pure.** No DOM, no framework import, no `window`. This is what lets Astro run it in Node at build time and emit the SVG into the HTML, while the browser runs the identical function for live updates. One implementation, two runtimes. Break this and you lose either the LCP or the interactivity.
3. **The URL is the state.** `config` serializes to the querystring with short keys. `history.replaceState` on a 300ms debounce, never `pushState` on every keystroke. Plus an explicit "Copy link" button.
4. **Every page carries `<link rel="canonical">` pointing at the clean path, ignoring the querystring.** URL-as-state combined with programmatic pages is a duplicate-content generator. This is cheap on day one and ugly to retrofit after indexing. Do it immediately.
5. **Ad slots are reserved at first paint** with explicit `aspect-ratio` and `min-height` per breakpoint. AdSense loads `async` inside `requestIdleCallback`. Nothing is ever inserted above the SVG after paint.
6. **Content pages ship 0kb of JavaScript.** Only the planner route hydrates.
7. **The SVG gets `role="img"` plus an auto-generated `<title>` and `<desc>`** describing the layout in plain words ("6 evenly spaced battens, 14.2in gaps, on a 120x96in wall"). Screen readers get a real description and Google gets indexable text inside the hero image. Same code, two wins.

### Routes

- `/` — the planner. Targets "accent wall layout planner."
- `/board-and-batten-calculator/`, `/picture-frame-molding-calculator/`, `/wainscoting-calculator/`, `/slat-wall-calculator/` — four hand-written landing pages, real content, own H1, FAQ, the planner island preset to that style.
- Programmatic long-tail via `getStaticPaths` from a data file: `/[style]/[w]x[h]-wall/`, `/picture-frame-molding/[rows]x[cols]-grid/`.

Schema: `HowTo` + `FAQPage` on style pages, `SoftwareApplication` on `/`.

## 5. Build order

**Ordered by risk, not by comfort. Do not reorder.** The instinct is to start with board & batten because it is easy and owns the biggest search term. Resist it. That term belongs to inchcalculator's domain authority regardless of what you build, and starting easy means the layout model is not stress-tested until week three, when changing it is expensive.

### Milestone 1 — The solver survives the hardest case

`solve('picture-frame', config)` handles an M×N grid with mixed row heights and column widths plus margins, returning a correct `Layout` with a miter-resolved cut list.

**Acceptance criteria:**
- Vitest suite is green, `environment: 'node'`, no DOM.
- A **mixed-size grid** case passes (different row heights AND different column widths on one wall).
- An even-grid case passes.
- An impossible config (members wider than the wall) returns a `warnings` entry rather than crashing or producing negative geometry.
- **No UI exists yet. `WallSvg` does not exist yet.** If you have written a component, you are off-plan.

### Milestone 2 — One dumb renderer, four styles, zero conditionals

`WallSvg` takes a `Layout` and draws it. The other three solvers land as degenerate cases of the same grid.

**Acceptance criteria:**
- All four styles render correctly through the single `WallSvg`.
- A test asserts `WallSvg` has no style conditional. Grep it yourself: no `style ===` anywhere in the component.
- Board & batten is expressed as a 1×N grid, not as bespoke code.
- The cut list is correct for each style, with miters resolved for box sides.

### Milestone 3 — Live, to-scale, and shareable

The island hydrates on idle over a build-time inline SVG. URL-as-state round-trips. PNG export works.

**Acceptance criteria:**
- Deployed to the Cloudflare Pages `*.pages.dev` preview URL.
- View-source shows a **real inline `<svg>`** in the HTML before any JS runs.
- Sharing a URL restores the exact layout, verified in a fresh browser context via Playwright MCP.
- PNG downloads, is to-scale, and carries a small `accentwallplanner.com` mark plus the wall dimensions.
- Chrome DevTools MCP reports **CLS < 0.1** with ad slots present and reserved.

**Domain purchase is the final go-live milestone, not a prerequisite.** Build and deploy on `*.pages.dev`. `accentwallplanner.com` gets bought and DNS-attached only when the tool is real.

## 6. Definition of done / quality gates

Every slice passes these before it counts.

- **Core Web Vitals:** LCP under 2.0s, **CLS under 0.1**, INP under 200ms. Measured with Chrome DevTools MCP on a real trace, not estimated.
- **JS budget:** 0kb on content pages. Under 20kb on the planner route.
- **Accessibility:** keyboard-operable controls, visible focus states, `role="img"` plus `<title>`/`<desc>` on the SVG, WCAG AA contrast. Verify keyboard flow with Playwright MCP.
- **SEO:** unique title and meta description per route, `rel=canonical` to the clean path, valid JSON-LD (test in Google's Rich Results Test), sitemap generated, `robots.txt` present and permissive to AI crawlers.
- **Tests:** the solver has unit tests. The mixed-size grid case is not optional. UI tests are not required for the MVP.
- **Mobile:** every milestone is checked at 390px wide before it is called done. This audience is on a phone.

## 7. Guardrails / do-NOTs

**Project-specific traps:**

- **Do not let style knowledge into the renderer.** This is the single biggest architectural risk. It fails silently: the fourth style forces one branch, the page generator forces another, and the ~100-page programmatic SEO play (the actual growth engine) quietly degrades into hand-built pages. You will not notice until it is expensive.
- **Do not treat mixed-size boxes as a feature flag or a v2.** It is the general case and the reason this product exists.
- **Do not build board & batten first** because it is easy. See section 5.
- **Do not use canvas for the live render.** It kills accessibility, crispness, and the build-time SVG emission.
- **Do not add a dependency for the PNG export.** SVG → `XMLSerializer` → `Blob` → `Image` → `canvas.drawImage` → `toBlob`. No external images inside the SVG, or the canvas taints and the export silently fails.
- **Do not insert anything above the SVG after first paint.** That is a CLS regression and ads already put you near the budget.
- **Do not ship a webfont.** System stack only.
- **Do not add `localStorage` "save a layout" until milestones 1-3 are done.** It is a nice-to-have and it is not the wedge.
- **Do not add user accounts. Ever.** There is no backend.

**Universal:**

- Do not auto-install MCPs or tooling. Suggest and wait. See section 2.
- Do not run git commands. Write the commit message, hand it over.
- Do not claim something works without verifying it in a real browser.
- Do not silently expand scope. If a milestone reveals new work, say so.

## 8. First action

Before writing any feature code:

1. **Restate the plan back**, in your own words: the wedge, the layout-model insight, and why milestone 1 has no UI in it. If any of it does not make sense, ask now.
2. **Scaffold:** `npm create astro@latest`, static output, add Preact and Tailwind v4, add `@astrojs/sitemap` and Vitest. Wire the Playwright MCP.
3. **Write `src/lib/layout.ts` first.** The `Layout`, `Member`, `Rect`, `CutItem`, and `Config` types, and nothing else. No implementation.
4. **Then write the failing test** for a picture-frame grid with mixed row heights and column widths, on a 120in × 96in wall.
5. **Then make it pass.**

Do not create a component until milestone 1's acceptance criteria are green.
