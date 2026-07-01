# Pre-Build Brief — Gradejar (teacher grade tools)

**Status: BUILD-READY.** Output of `/explore-project` on `research/teacher-grade-tools.md` (GO verdict).
Date: 2026-06-27 · Owner: Tarun · Bet #2.

---

## Name + domain

**Gradejar** → **gradejar.com** (✅ live RDAP: unregistered as of 2026-06-27).

- "Jar" = a container that *holds and keeps* your classes — lands the persistence wedge without saying "keeper."
- Brandable, not exact-match (post-EMD safe), front-loads the "grade" keyword, 8 chars, easy to say/spell/share.
- No app, company, or trademark named "gradejar" found (SERP + app stores + TM search all clean).

**Domain purchase is the LAST step** (build on the Cloudflare Pages preview URL `*.pages.dev`; register gradejar.com + wire DNS at go-live, after the project is done).
- ⚠️ Squat risk, flagged once: grade-* names are being grabbed (`gradelocker` Mar 2026, `gradeslate`/`gradetally` May 2026 all on Cloudflare). gradejar.com could be taken before go-live — accepted tradeoff per your "buy last" rule. Backups (tallygrade/keepgrade) are the fallback.
- Optional now, no purchase: grabbing the free social handles `@gradejar` (X), `gradejar` (GitHub org), `@gradejar` (Instagram) costs nothing if you want to reserve identity early.

**Avoid:** `gradekeep.com` — open, but collides with the established **Gradekeeper** teacher gradebook (thousands of users); reads as a knockoff.
**Backups (open):** `tallygrade.com`, `keepgrade.com`.

---

## The wedge + MVP scope

**Wedge:** every incumbent (ezgrader.us, quickgra.de, the clone sea) is a **stateless, single-assignment novelty** that forgets your class on reload. Gradejar is the modern, fast, mobile-first grader that **remembers your classes** — at **$0 backend** (localStorage, no login, no server).

**Core (table stakes):** wrong-answers → percentage + letter grade, instant, with full grade chart.

**Differentiator (the wedge, still small):**
1. Saved classes/rosters via localStorage (no account)
2. Multiple assignments per class + simple average
3. Custom grading scale + presets
4. Partial / half-credit support
5. Printable + CSV/PDF export
6. Mobile-first, instant, no-submit UX

**Out of MVP (v2 / suite expansion):** accounts, cloud sync, LMS integration, rubric maker, random student picker, seating chart, worksheet tools.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | **Astro** (static-first SSG, islands) |
| Interactive islands | **Preact** via `@astrojs/preact` (~4KB) — calculators only |
| Styling | **Tailwind** (compiled/purged, 0 runtime JS) + system font stack (no web fonts) |
| Persistence | **localStorage**, vanilla, via a versioned `store.ts` |
| Export | CSV via native `Blob`; PDF via `window.print()` + print stylesheet (0 bytes); lazy-load a PDF lib only if truly needed |
| Hosting/CDN | **Cloudflare Pages** (static edge, free tier, US-fast) — same as Jsonbeam |
| Analytics | **Cloudflare Web Analytics** (free, no cookie banner) |
| Ads | **Google AdSense** — `async`, lazy below-fold, reserved slots |

**Why:** Astro ships **0 JS** on content pages → fastest LCP + perfect crawlability to beat dated incumbents. Islands hydrate only the calculator. File-based routing makes the one-domain-many-keyword-pages suite trivial. Cloudflare Pages is already wired and flat-cost at scale.

**Rejected:** Next.js (heavier JS, needless SSR); Eleventy (great static SEO, but Astro islands give cleaner interactivity for the same ~0-JS pages).

---

## Architecture

**Diagram (build → edge → browser):**

```
BUILD (Astro SSG): src/pages/*.astro + src/lib/grade-core ──► static HTML per keyword page
        │
        ▼
Cloudflare Pages (global edge, immutable cache)  ← no dynamic origin
        │ HTML (cached)          │ hashed JS/CSS (immutable)
        ▼                        ▼
BROWSER: static SEO shell (0 JS) ─► <GraderIsland> Preact (hydrates)
                                          │ reads/writes
                                          ▼
                          localStorage  gradejar:v1  { classes... }
         AdSense (async, lazy, reserved slots) · CF Web Analytics (async beacon)
```

**Three-layer component model:**
- **`grade-core`** — pure, framework-agnostic TS. All math: `wrongToPercent()`, `applyScale()`, `average()`, `partialCredit()`. No DOM, no Preact, unit-tested.
- **Preact islands** — thin UI wrappers (`<GraderIsland>`, `<ClassManager>`, `<ScaleEditor>`) that call `grade-core`.
- **`.astro` pages** — static SEO content + drop in the right island with page config (e.g. `mode="wrong-count"`).

**State tiers:** ephemeral (component state) · URL-as-state (`?q=20&scale=standard` → shareable/linkable) · persisted (localStorage).

**Persisted schema (versioned):**
```
gradejar:v1 → { version:1, classes:[ { id, name, scale, assignments:[ { id, name, scores:[...] } ] } ], settings }
```
All reads/writes go through `store.ts` with a `migrate(old)` step. Wrap writes in try/catch (`QuotaExceededError`). Ship "Export all data" (JSON) early.

**SEO architecture:** per-page unique title/meta/canonical via `astro-seo`; `SoftwareApplication` + `FAQPage` JSON-LD via `astro-seo-schema` + `schema-dts`; `sitemap.xml` via `@astrojs/sitemap`; internal linking between the keyword pages; one brandable domain, many pages.

**Scale-to-mass-traffic:** everything static + edge-cached → 1k or 1M sessions/mo cost ~the same and serve at the same speed. No origin, no DB, no cold starts. Per-user data lives on the user's device.

**Biggest risk: localStorage data loss = trust collapse** (the whole wedge is "it remembers"). Mitigate with: single versioned `store.ts` + `migrate()`, try/catch on writes, early JSON export/backup, never auto-delete (archive instead).

**Front-end system-design reps:** islands architecture · shared-core/thin-adapter · URL-as-state vs persisted state · client-side schema versioning/migrations · edge caching + immutable assets.

---

## Setup checklist

**MCPs — STANDARD (pre-approved, wire these in):**
```
claude mcp add playwright npx @playwright/mcp@latest        # verification backbone — every web project, pre-approved
claude mcp add astro-docs ...                               # near-default for the Astro stack: pins to current Astro v6/v7 APIs
```

**Skills to install (reference first — highest build ROI):**
```
# reference (pins model to current API — proven in Jsonbeam):
npx <skills-cli> add Lombiq/Tailwind-Agent-Skills   # tailwind-4-docs → current Tailwind v4 syntax
# guidance (pick ONE):
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills      # accessibility-checklist, performance-optimization, frontend-ui-engineering
# (alt guidance: vercel-labs/agent-skills → web-design-guidelines, for visual polish instead)
```

**MCPs — SUGGESTED ONLY (do NOT auto-install; ask the user first):**
```
claude mcp add --transport http cloudflare-docs https://docs.mcp.cloudflare.com/mcp
claude mcp add gsc -e GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\sa.json -- npx -y mcp-server-gsc   # GSC read-only service account
claude mcp add pagespeed -e <APIKEY_ENV>=YOUR_KEY -- npx -y pagespeed-insights-mcp                  # confirm env var name in README
```

**Libraries:**
```
npx astro add preact sitemap
npm i astro-seo astro-seo-schema schema-dts@^1
npm i -D @axe-core/playwright @playwright/test
```

**Critical: do NOT use `@astrojs/partytown`** to offload AdSense — verified it breaks AdSense (CORS) and lowers Lighthouse Best-Practices. Load AdSense natively: `async` + reserved/sized slots + lazy below-fold.

**Already have (don't re-install):** `frontend-design` (design step), `web-perf` (live CWV profiling), `cloudflare`/`wrangler`.

**Design direction — "Warm Modern Classroom":** clean, fast, anti-2010s. Khan Academy/Duolingo warmth × Linear restraint. Calculator is the hero (big tactile inputs, live as-you-type, no Calculate button). Mobile-first single column → calculator-left/saved-classes-right on desktop. System fonts; off-white `#FAFAF7` + slate ink + one calm primary (teal/indigo) + semantic grade colors (green A→red F). Reserved ad slots styled as quiet bordered containers. Light mode for MVP.

**The one CWV risk: AdSense** (CLS/INP). Reserve fixed ad-slot dimensions, keep above-the-fold ad-free/pre-reserved, async + lazy, measure every page with `web-perf` before launch.

---

## First 3 build outcomes (drop into week.md)

1. **`grade-core` engine + `/ez-grader` page live.** Pure TS math (wrong-count → % + letter, full grade chart) unit-tested, mounted as a Preact island on a static, SEO-tagged `/ez-grader` page, deployed to Cloudflare Pages on gradejar.com. Smallest end-to-end slice that ranks + works.
2. **Persistence wedge: save a class.** `store.ts` (versioned localStorage) + `<ClassManager>` — create a class, add one assignment, see the average, reload and it's still there. Plus "Export all data" (JSON). This is the differentiator no incumbent has.
3. **Second keyword page + SEO scaffold.** `/test-grade-calculator` reusing `grade-core`, with `astro-seo` metadata, `SoftwareApplication`+`FAQPage` JSON-LD, and `sitemap.xml`. Proves the one-domain-many-pages suite pattern.

**Build on the Cloudflare Pages preview URL (`*.pages.dev`).** Buying gradejar.com + wiring DNS is the FINAL go-live milestone, after the project is done — not now. (Optional: reserve the free `@gradejar` social handles early, no purchase.)
