# Gradejar — Build Handoff Prompt

> Paste everything below the line into the agent of a fresh `gradejar` repository to begin the build.
> Source of truth for scope: `research/teacher-grade-tools-prebuild.md` (in the AIOS repo). This prompt is self-contained — the new repo does not need that file.

---

## 1. Role & mission

You are a senior front-end engineer shipping **Gradejar** (gradejar.com) — a teacher-first grade-calculator suite that reinvents the dated "EZ grader." Users are K-12 and college teachers (US-first) who grade stacks of tests and need raw scores turned into percentages and letter grades in one tap.

Every incumbent (ezgrader.us, quickgra.de, and a sea of clones) is a **stateless, single-assignment novelty that forgets the teacher's class on reload**. That is the entire opening.

**The wedge — never compromise it:** Gradejar *remembers your classes*. Saved classes/rosters, multiple assignments + averaging, custom grading scales, and partial credit — all persisted locally with **zero backend, no login, no server**. If a change ever risks losing a teacher's saved data, stop and rethink; that data is the product.

We win on three things, in priority order: **(1) page speed, (2) SEO, (3) shipping fast.** A tool that ranks #1 and loads instantly beats a prettier tool nobody finds.

## 2. Operating rules

- **Ship ugly, ship ranked.** Done + fast + indexable beats perfect. Planning is not progress.
- **Every dependency must justify its bytes.** Default to fewer, lighter libs. Prefer the platform (native `Blob`, `window.print()`, `localStorage`) over packages.
- **Match the codebase as it grows** — consistent naming, small modules, no premature abstraction.
- **Mobile-first, instant, no-submit.** Results update live as the teacher types. No "Calculate" button.
- **MCP / tooling rule (hard):** The **Playwright MCP (`@playwright/mcp`) is standard and pre-approved** — wire it in and use it to verify every slice in a real browser (persistence across reloads, keyboard flows, screenshots). The **`astro-docs` MCP** and the **`tailwind-4-docs` skill** are recommended for this stack (they pin you to current Astro/Tailwind v4 APIs) — add them. For ANY OTHER MCP server, do **NOT** install and do **NOT** run `claude mcp add` or edit config; if one would genuinely help (e.g. a PageSpeed or Search Console MCP for the SEO loop), **surface it as a one-line suggestion and WAIT for explicit approval.** Same restraint for any non-essential package: suggest, don't auto-install. Keep the kit lean.
- **Domain is bought LAST.** Do not register or attach gradejar.com during the build. Develop and deploy on the **Cloudflare Pages preview URL** (`*.pages.dev`). Buying the domain + wiring DNS is the final go-live step, after the project is done. Use relative URLs / an env-driven `site` value so the canonical domain can be swapped in at go-live without rework.

## 3. Stack (pinned)

| Layer | Choice |
|---|---|
| Framework | **Astro** (static-first SSG, islands architecture) |
| Interactive islands | **Preact** via `@astrojs/preact` — calculator widgets only |
| Styling | **Tailwind CSS** (compiled/purged) + **system font stack** (no web fonts) |
| Persistence | Browser **localStorage**, vanilla, behind a versioned `store.ts` |
| Export | CSV via native `Blob`; PDF via `window.print()` + print stylesheet (0 added bytes). Lazy-`import()` a PDF lib only if truly required |
| Hosting/CDN | **Cloudflare Pages** (static, global edge, free tier) |
| Analytics | **Cloudflare Web Analytics** (free, no cookie banner) |
| Ads | **Google AdSense** — `async`, lazy below-fold, reserved fixed-size slots |

Install (after scaffolding Astro): `npx astro add preact sitemap tailwind`, then `npm i astro-seo astro-seo-schema schema-dts@^1`, and dev-only `npm i -D @axe-core/playwright @playwright/test`. Pin `schema-dts@^1` to satisfy `astro-seo-schema`'s peer.

**Do NOT use `@astrojs/partytown`** to offload AdSense — it breaks AdSense (CORS) and lowers the Lighthouse Best-Practices score. Load AdSense natively.

## 4. Architecture contract

```
BUILD (Astro SSG): src/pages/*.astro + src/lib/grade-core ──► static HTML per keyword page
        │
        ▼
Cloudflare Pages (global edge, immutable cache)   ← no dynamic origin, ever
        │ HTML (cached)            │ hashed JS/CSS (immutable)
        ▼                          ▼
BROWSER: static SEO shell (0 JS) ─► <GraderIsland> Preact (hydrates on view/idle)
                                          │ reads/writes
                                          ▼
                           localStorage  gradejar:v1  { classes... }
   AdSense (async, lazy, reserved slots) · CF Web Analytics (async beacon)
```

**Three-layer component model — keep these boundaries clean:**
- **`src/lib/grade-core/`** — pure, framework-agnostic TypeScript. ALL grading math lives here: `wrongToPercent()`, `applyScale()`, `average()`, `partialCredit()`. No DOM, no Preact, no localStorage. Fully unit-tested.
- **Preact islands** (`src/components/`) — thin UI that calls `grade-core`: `<GraderIsland>`, `<ClassManager>`, `<ScaleEditor>`. UI logic only.
- **`.astro` pages** (`src/pages/`) — static SEO content + mount the right island with page config (e.g. `<GraderIsland mode="wrong-count" />`).

**State tiers:** ephemeral → component state · shareable → URL-as-state (`?q=20&scale=standard`) · durable → localStorage.

**Persisted schema (versioned — this is an invariant):**
```ts
// gradejar:v1
{ version: 1,
  classes: [ { id, name, scale, assignments: [ { id, name, scores: number[] } ] } ],
  settings: {} }
```

**Non-negotiable invariants:**
1. **Single-writer persistence.** Every read/write goes through `src/lib/store.ts`. Components never touch `localStorage` directly. `store.ts` owns the `version` field and a `migrate(old)` function so future schema changes never wipe a teacher's data.
2. **Safe writes.** Wrap writes in try/catch; handle `QuotaExceededError` gracefully. Never auto-delete — archive instead. Ship a one-click **"Export all data" (JSON)** early so teachers can self-backup.
3. **Zero backend.** No server, no DB, no auth in MVP. Persistence is on the user's device.
4. **SEO is structural, not an afterthought.** Each keyword page is its own `.astro` file with unique `<title>`/meta/canonical (via `astro-seo`), `SoftwareApplication` + `FAQPage` JSON-LD (via `astro-seo-schema` + `schema-dts`), and is listed in a generated `sitemap.xml` (`@astrojs/sitemap`). Internal-link the keyword pages to each other.

**Design direction — "Warm Modern Classroom":** clean, fast, anti-2010s. Khan Academy/Duolingo warmth × Linear restraint. The calculator is the hero — big tactile number inputs, large readable grade chart, live results. Mobile = single centered column; desktop = calculator-left / saved-classes-right. System fonts; off-white `#FAFAF7` base, slate ink, one calm primary (teal or indigo), semantic grade colors (green A → red F) used sparingly. Reserved ad slots styled as quiet bordered containers. Light mode only for MVP.

## 5. Build order (first 3 milestones)

**M1 — `grade-core` + `/ez-grader` live.**
Pure-TS engine (wrong-count → % + letter grade, full grade chart), unit-tested, mounted as a Preact island on a static, SEO-tagged `/ez-grader` page, deployed to Cloudflare Pages on the **preview URL** (`gradejar.pages.dev`) — the custom domain comes last.
*Done when:* visiting `/ez-grader` on the Pages preview URL, typing a wrong-answer count instantly shows the % + letter + full chart; the page is static HTML with unique metadata; Lighthouse SEO + Performance are green.

**M2 — Persistence wedge: save a class.**
`store.ts` (versioned localStorage) + `<ClassManager>`: create a class, add an assignment, see the average; reload → it's still there. Plus "Export all data" (JSON).
*Done when:* a created class with one assignment survives a full page reload; all persistence flows through `store.ts`; a `QuotaExceededError` is handled without data loss; export downloads valid JSON.

**M3 — Second keyword page + SEO scaffold.**
`/test-grade-calculator` reusing `grade-core`, with `astro-seo` metadata, `SoftwareApplication` + `FAQPage` JSON-LD, generated `sitemap.xml`, and internal links to/from `/ez-grader`.
*Done when:* both pages share one `grade-core`, each has valid rich-results-testable JSON-LD, and `sitemap.xml` lists every page.

**Go-live (the LAST milestone — only after the build is done, on the user's say-so):**
Register gradejar.com, attach it as a custom domain on the Cloudflare Pages project, set DNS, set the canonical `site` URL to the real domain, regenerate `sitemap.xml`/canonicals, then submit to Google Search Console. Do **not** do any of this earlier.

## 6. Definition of done / quality gates (every slice must pass)

- **Core Web Vitals:** LCP < 2.0s, CLS < 0.05, INP < 200ms on a mid-tier mobile profile — measured WITH AdSense loaded. Ads must sit in reserved, fixed-size slots so they can't shift layout.
- **Accessibility:** keyboard-operable calculator, visible focus, labeled inputs, WCAG 2.1 AA. Gate it with an automated `@axe-core/playwright` test.
- **SEO:** unique title/description/canonical per page; valid JSON-LD; page in `sitemap.xml`; renders fully without JS (content is static; only the widget needs hydration).
- **Tests:** `grade-core` has unit tests for every grading function (edge cases: 0 wrong, all wrong, partial credit, custom scale boundaries). Persistence has a reload/round-trip test.
- **Bundle:** content pages ship ~0 JS; the island stays small. Justify any new dependency.

## 7. Guardrails / do-NOTs

- ❌ No backend, DB, accounts, or login in MVP.
- ❌ No `@astrojs/partytown` for AdSense (breaks it).
- ❌ No web fonts (use the system stack — protects LCP/CLS).
- ❌ No component touching `localStorage` directly — only `store.ts`.
- ❌ No unversioned schema writes, no auto-deletes — never risk a teacher's saved data.
- ❌ No MCP server installs and no non-essential package installs without asking the user first (see §2).
- ❌ No heavy client PDF lib eagerly bundled — print stylesheet first, lazy-load only if forced.
- ❌ Do NOT register or attach gradejar.com during the build — domain purchase + DNS is the final go-live milestone.

## 8. First action

Before writing feature code:
1. Scaffold the Astro project, add Preact + Tailwind + sitemap, set up the Cloudflare Pages deploy, and confirm a blank deploy is live on the **Pages preview URL** (`*.pages.dev`). **Do not buy or attach the custom domain yet — that's the final go-live milestone.**
2. Restate the M1 plan back in 3–5 bullets and call out any assumption you're making (e.g. exact default grading scale, A–F cutoffs).
3. Stub the directory shape: `src/lib/grade-core/`, `src/lib/store.ts`, `src/components/`, `src/pages/`.
4. Then build M1 — `grade-core` + tests first, UI second.

If anything here conflicts with what you find once building, flag it and propose the fix — don't silently diverge from the architecture contract.
