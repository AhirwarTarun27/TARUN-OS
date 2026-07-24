# CloudForestX — CV Truth Table

**What the CV claims vs. what the repos actually back.** Read before any interview where CloudForestX
will be probed.

Flags: 🟢 built it / can claim authorship · 🟡 integrated, claim fluency not authorship · 🔴 not yours.

Last verified against the repos: **2026-07-24**. Note: all six CloudForestX repos are **archive exports
with no `.git`**, so authorship cannot be verified from history — grounding is code + Tarun's account.

---

## The live CV bullets

| # | CV line | Backed by | Flag |
|---|---|---|---|
| 1 | Built the React and TypeScript SPA behind 40 cost dashboards spanning waste detection, rightsizing, reservations and power scheduling | `src/pages/` = 40 modules incl. IdleInstances, RightSizing, ScheduleVM, Reservations, CostSaving; 470 TS files, 0 JS | surfaces 🟢 · **detection algorithms 🔴** |
| 2 | Built Node.js ingestion and REST APIs that pull EC2, EBS, S3 and CloudWatch data via STS cross-account roles into PostgreSQL | `cfx-aws-initial-fetch-master` — `auth.ts` STS client + SDK factory, 18 cron jobs, Sequelize models with `PredictedMonthlyCost`; `cloudsaver-master` express + pg + sequelize | 🟢 *(raised from 🟡 on Tarun's instruction 2026-07-24)* · **recommendation logic 🔴** |
| 3 | Architected global account and month filtering in Redux Toolkit, keeping every dashboard in sync from a single selection | `store/accountSlice.ts` (`ALL_VALUE`, `defaultCurrency`), `store/monthSlice.ts`, typed `RootState` selectors | 🟢 |
| 4 | Built the data-visualization layer -- charts, gauges, geo maps -- on ECharts and Recharts behind a reusable chart hook | `hooks/useEcharts.tsx`; echarts 5.4.2 + recharts 2.0.9 + react-gauge-chart + react-google-charts; `components/flagMap/` | 🟢 |
| 5 | Built a typed API layer and a generic fetch hook with request-id guards, eliminating stale-response races across 36 service modules | `APIService` → `HttpService` → 34 domain services; `hooks/useFetchData.tsx` `requestIdRef` guard | 🟢 |

---

## Removed on 2026-07-24 — and why they may never come back

| Removed claim | What the repo actually says |
|---|---|
| "Added **component test coverage with React Testing Library** across the dashboard surfaces" | **One** test file in 470 source files: `src/App.test.tsx`, the **verbatim CRA default** (`renders learn react link`). It would fail against this app. RTL ships with CRA; nobody wrote a test. **This is the most dangerous claim that was on the CV** — "walk me through a test you wrote" ends it instantly. |
| "Cut initial bundle **40%** via **code-splitting**, **lazy loading**, and **TanStack Query**" | TanStack Query / React Query: **not installed**. `React.lazy`: **one** file (`SupportPage.tsx`). `react-lazyload`: **one** file (`UsersList.tsx`). App is CRA `react-scripts` 4.0.2, **not ejected** — the webpack config was never his to tune. **No bundle measurement exists anywhere.** |
| **Zustand** (tech stack + skills) | **Not installed** — and verified absent from *every* repo he has: 6 CloudForestX, 8 Dwellworks, 4 personal. State here is Redux Toolkit + 2 Contexts. |
| **Webpack** (tech stack) | CRA hides webpack; not ejected. Webpack stays on **Dwellworks**, where the 20-entry config is real. |
| "real-time analytics dashboards" (bullet 1) | Socket.IO exists and is real, but the cost dashboards read PostgreSQL that scheduled jobs keep warm — they are **not** live-streaming AWS data. Reworded so "real-time" isn't implied of the cost data. |
| "built from **Figma** as responsive React components" | Unverifiable from code and adds nothing. Dropped for length. Still true and fine to say out loud. |

---

## Words to never use about this project

| Never say | Say instead | Because |
|---|---|---|
| TanStack Query / React Query | "a generic fetch hook I built, with request-id race guards" | not installed — and the honest version is more impressive |
| Zustand | "Redux Toolkit" | not installed anywhere |
| React Testing Library / "I wrote tests" | "no frontend test culture there; I use Vitest on my own projects" | 1 untouched CRA default file |
| "cut the bundle 40%" | (nothing — no measurement exists) | unfalsifiable and unsupported |
| "I built the idle-detection / rightsizing algorithm" | "I built the pipeline that stored the data and the surfaces that presented it" | 🔴 boundary |
| "Azure" | "AWS is what I worked on" | Azure SDKs exist in the backend; not his scope |
| "it streams live AWS data" | "the UI reads PostgreSQL; scheduled jobs keep it fresh" | the actual architecture, and a better answer |

---

## The authorship boundary, in one paragraph

> *"To be precise about scope — I owned the front end end to end, and on the backend I built the
> ingestion path and the APIs: assuming into customer accounts, pulling inventory and CloudWatch
> metrics with the AWS SDK, normalizing that into PostgreSQL, and serving it out. The recommendation
> logic on top — the thresholds that decide something is idle, the rightsizing rules — sat with the team
> that owned the analysis side. I know how it consumed what I stored, but I didn't design the
> algorithms."*

---

## Numbers that are safe to quote

- **470** TypeScript source files (356 `.tsx` + 114 `.ts`), **zero** JavaScript
- **40** page modules · **27** component modules · **36** service modules
- **5** registered Redux Toolkit slices · **6** custom hooks
- **24** distinct `@aws-sdk/client-*` packages in the backend · **18** AWS cron jobs · **15** AWS controllers
- Team **6** · **Jul 2023 – May 2025** · **200+** enterprise accounts *(Tarun's own business figure — not
  code-verifiable; if pushed, "on the order of a few hundred across our tenants")*

## Numbers that do NOT exist — never invent them

No bundle-size reduction. No load-time figure. No Lighthouse or Core Web Vitals score. No test-coverage
percentage. No dollar savings delivered to any customer. No customer names. No exact account counts per
tenant. **If asked for a number you do not have, say you do not have it.**
