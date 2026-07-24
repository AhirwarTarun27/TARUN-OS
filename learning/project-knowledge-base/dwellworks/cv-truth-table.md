# Dwellworks — CV Truth Table

**What the CV claims vs. what the Odin repo actually backs.** Read this before any interview where the
Dwellworks lines will be probed. Its job is to make sure you are never caught defending something the
code does not support.

Flags: 🟢 built it / can claim authorship · 🟡 integrated with it, claim fluency not authorship ·
🔴 not yours, never claim.

Last verified against the repo: **2026-07-24**.

---

## The live CV bullets

| # | CV line | Backed by | Flag |
|---|---|---|---|
| 1 | Ship React features across 20 independently-mounted SPA bundles embedded in a legacy .NET Razor monolith, holding IE11 support | `webpack.common.js` — exactly 20 entries; `ReactDOM.render` into `react_*` divs; IE11 alias + core-js + babel-polyfill; `.nvmrc` 12.18.1 | 🟢 features · 🟡 the original architecture |
| 2 | Built a real-time operations dashboard on Redux and SignalR with auto-reconnect and state recovery, tracking every active relocation | `order-dashboard/` own Redux+thunk store; `signalrHoc.jsx` with `withAutomaticReconnect`, disconnect dispatch, refetch-on-reconnect; `ServiceHealth.jsx` Service Radar | 🟢 the front end · 🔴 the .NET hub |
| 3 | Built the shared component library -- form fields, virtualized selects, advanced data grid, Google Maps views -- reused across all 20 bundles | `components/shared/` 78 files; `form/` + FormContext + 8 field components; `grid/AdvancedGrid.jsx`; `virtual-select.js` on react-window; `discover-map/` | 🟢 built and extended · say "built components in", not "founded" |
| 4 | Hardened the UI with layered React error boundaries and a stack-trace logger, containing failures to one cell instead of the whole page | 7 boundaries at 3 levels incl. `CellErrorBoundary.jsx`, `FieldErrorBoundary.jsx`; `utils/seq-logger.js` + `logService.js` + `LoggerContext`; stacktrace-js | 🟢 client side · 🔴 Seq server / backend Serilog |
| 5 | Instrumented React surfaces with Google Analytics 4 virtual pageview tracking, giving product per-page visibility into user drop-off | `shared/hooks/googleAnalytics.js` — `VirtualPageView` → `dataLayer`, `isInitialMount` guard; GA4 commits Dec 2025 – Jan 2026 | 🟢 instrumentation · 🔴 the analysis / GA4 property |
| 6 | Work directly with the US client on requirements, design sessions, feature demos, sprint ceremonies and release coordination | Not code-verifiable. Tarun's own account. | 🟢 |

---

## Removed on 2026-07-24 — and why they may never come back

These were on the CV and the code contradicts them. Each one was a question you would have lost.

| Removed claim | What the code actually says |
|---|---|
| "server-to-client **hydration** layer" | `ReactDOM.render` at every entry point. **Zero** `ReactDOM.hydrate`. There is no React SSR — the server renders Razor, not React. Nothing is hydrated. |
| "cut load with Webpack **code-splitting**" | No `splitChunks` in `webpack.common.js`. **Zero** `React.lazy`. **Zero** dynamic `import()`. What exists is 20 separate entry points. |
| "real-time notifications and **in-app messaging** with SignalR **between consultants and relocating families**" | Hub is `controlTowerHub`, event `UpdateControlTower`, registration by **`programManagerId`**. It serves **program managers**. Transferee notifications are **polling** (`GetUserNotifications?numOfDays=7`). In-app messaging does not exist — nearest are a chatbot bundle and a comment-edit modal. |
| "**TypeScript**" in the Dwellworks tech stack | **0** `.ts`/`.tsx` files, no `tsconfig.json`, 409 `.js`/`.jsx`. TypeScript is real on CloudForestX and personal projects only. |
| "Own the front end … **20+ feature modules**" | Several ThinkSys and Dwellworks devs are active in the same code. "20 bundles" is verifiable; "own the front end" was not. Reframed to "ship features across". |
| "Built the transferee-facing self-serve surfaces … intake survey, home and school finding, move tracking, resource library, payments" | A feature tour of the product, not a description of his work. Replaced with bullets that name a mechanism. |
| "Shipped the reporting surface for RMCs" | `rmc-reporting` bundle exists (11 files) but was not a primary area. Dropped rather than defended thin. |

---

## Words to never use about this project

| Never say | Say instead | Because |
|---|---|---|
| hydration / hydrate / SSR | "mounts client-side into a server-rendered page from a server-injected config object" | `render`, not `hydrate` |
| code-splitting / lazy loading | "20 independent entry bundles, one per page" | no splitChunks, no `import()` |
| micro-frontends | "embedded SPAs" / "islands" | no independent deploy, no module federation |
| TypeScript | (nothing — it isn't here) | 0 `.ts` files |
| unit tests / React Testing Library / Jest | (nothing — it isn't here) | no runner, no test files. RTL belongs to CloudForestX |
| "I built the microservices" | "I integrated with them and can explain how they fit" | 🔴 boundary |
| "I designed the auth" | "JWT issued by IdentityMicroservice, verified everywhere else; I consumed it" | 🔴 boundary |

---

## The authorship boundary, in one paragraph

Say this early and it buys you credibility for everything after:

> *"I should be clear on scope — I worked on the Odin front end. Odin's front end talks to nearly every
> service on the platform, so I know how the pieces fit and why they're split, but I didn't write the
> .NET services, the batch jobs or the queue infrastructure. I can walk you through the architecture;
> I'd just be misrepresenting myself if I claimed I built it."*

Interviewers reward this. Overclaiming dies in two follow-ups.

---

## Numbers that are safe to quote

Every one is verifiable in the repo:

- **20** webpack entry points / bundles
- **409** `.js`/`.jsx` source files
- **78** files in the shared component library
- **14** API service modules on a shared axios layer
- **7** error boundaries across 3 levels
- **156** `window.globalObject` reads
- **75** lines in the date-picker runtime patch
- React **16.12** · Redux **4.0.5** · webpack **4.41.5** · axios **0.19.2** · Node **12.18.1** ·
  `@microsoft/signalr` **8.0.7** · .NET Framework **4.6.1**
- Team size **12** *(Tarun's own account — not code-verifiable)*

## Numbers that do NOT exist — never invent them

No measured bundle-size reduction. No load-time figure. No Lighthouse or Core Web Vitals score. No
user counts, order volumes, revenue or contract values. No "X% faster". No conversion lift from the GA4
work. **If asked for a number you do not have, say you do not have it** — a fabricated figure is the one
thing an interviewer can catch you on cold, and it ends the interview silently.
