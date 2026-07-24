# Defend-Map — every CV line, its grounding, and how safe it is

> 🟢 yours · 🟡 fluency (integrated / contributed — never claim authorship) · 🔴 must-learn (the bullet
> implies more than you built). **Grounding** = where the truth lives (repo and/or `../project-knowledge-base`
> module, abbreviated *kb*). **Drill** = the `drills/` file that closes it.
> **Rule: no line goes to an interview un-mapped.**
>
> **Depth ≠ color.** Color is *risk* (can you defend it). Depth is *how hard we drill it*.
> **Dwellworks and CloudForestX are full deep-drill** — every bullet to explanation level, even the 🟢 ones
> (Tarun's call: his top two projects, he wants to narrate every line cold).

## Summary

| Claim | Color | Grounding | Drill |
|---|:--:|---|:--:|
| Full-stack, JS ecosystem (React, TypeScript, Node) | 🟢 | all four projects | D00 |
| Next.js | 🟡 | portfolio (Next 16) + ThinkSys site (verbal only) | D30 |
| Vue | 🟢 | Dwellworks Odin Vue surface | D31 |
| "PostgreSQL and Node service layers" | 🟡 | CloudForestX (contributed endpoints) | D33 |
| "AI-powered products / LLM integration" | 🟡 | DentScribe portal (consumed the pipeline) | D12/D32 |
| "AI-assisted development" | 🟢 | GitHub Copilot cert; daily practice | D32 |

> **CV rewritten 2026-07-24.** Bullets below match the current `master.tex`. Two things changed
> shape: every engagement now carries a date range, and the CV was re-scoped to **domain vocabulary
> only** because it ships publicly at `tarunahirwar.com/Tarun-Ahirwar-Resume.pdf`. Internal names
> (Odin, CloudSaver, Spark, Sikka, the PMS vendors) are **off the CV but still fair game in the
> room** — an interview is not a public document. Know them; don't print them.

## Dwellworks (Team 12) — **Jun 2025 – Present** — all 🟢 · **FULL DEEP-DRILL**

> **Bullets rewritten 2026-07-24 (v2), grounded in the Odin repo.** The old set described the
> *product*, not his work, and three lines were **factually contradicted by the code**. Full detail in
> `project-knowledge-base/dwellworks/cv-truth-table.md`; the teaching module is
> `dwellworks/03-frontend-architecture.md`.

| Bullet | Color | Grounding | Drill |
|---|:--:|---|:--:|
| 20 independently-mounted SPA bundles in a legacy .NET Razor monolith, IE11 held | features 🟢 / original architecture 🟡 | kb 03 §2, §9 — `webpack.common.js` 20 entries, IE11 alias, `.nvmrc` 12.18.1 | D20 |
| **Real-time operations dashboard** on Redux + SignalR, auto-reconnect + state recovery | frontend 🟢 / .NET hub 🔴 | kb 03 §6 — `signalrHoc.jsx`, Service Radar, refetch-on-reconnect | D20 |
| **Shared component library** (form fields, virtualized selects, advanced grid, Maps) across 20 bundles | 🟢 built + extended | kb 03 §5 — `shared/` 78 files, `virtual-select.js` on react-window | D20 |
| **Layered error boundaries + stack-trace logger**, failures contained to one cell | client 🟢 / Seq server 🔴 | kb 03 §7 — 7 boundaries at 3 levels, `seq-logger.js` | D20 |
| **GA4 virtual pageview instrumentation** → per-page drop-off visibility | instrumentation 🟢 / analysis 🔴 | kb 03 §8 — `useGoogleAnalytics`, `isInitialMount` guard | D20 |
| **Client-facing: requirements, design sessions, demos, ceremonies, release coordination** | 🟢 | Tarun's own fact — **not in the kb**, which is code-derived only | D20 |

_No backend claims here (.NET dropped on purpose). **Full deep-drill: every bullet to explanation
level — 🟢 means "you built it," not "skip it."**_

**Three words that must never leave your mouth on this project** — the code contradicts all three:
**"hydration"** (it's `ReactDOM.render`, no SSR), **"code-splitting"** (no `splitChunks`, no
`React.lazy`, no dynamic `import()`), and **SignalR "between consultants and families"** (it's
`controlTowerHub` registered by `programManagerId`, serving **program managers**). Also: **no
TypeScript** and **no React tests** exist in Odin — never claim either here.

_Shadow-resource note: he works this account under Navnit Singh, so his commits are under
`--author="avnit" --since=2025-06-01`, never his own name._

## CloudForestX (Team 6) — **Jul 2023 – May 2025** — **FULL DEEP-DRILL**

> **Bullets rewritten 2026-07-24 (v2), grounded in all six repos.** Three claims were **factually
> contradicted by the code** and are gone. Detail in `project-knowledge-base/cloudforestx/cv-truth-table.md`;
> teaching module is `cloudforestx/04-frontend-and-data-layer.md`.

| Bullet | Color | Grounding | Drill |
|---|:--:|---|:--:|
| React + TypeScript SPA behind **40 cost dashboards** (waste detection, rightsizing, reservations, power scheduling) | surfaces 🟢 / **algorithms 🔴** | kb 04 §1 — 470 TS files, 0 JS; 40 pages | D21 |
| **Node ingestion + REST APIs**: EC2/EBS/S3/CloudWatch via **STS cross-account roles** → PostgreSQL | 🟢 *(raised from 🟡 2026-07-24)* / **recommendation logic 🔴** | kb 04 §5 — `auth.ts` STS factory, 18 cron jobs, Sequelize models | D33 |
| **Global account + month filtering** in Redux Toolkit, every dashboard in sync | 🟢 | kb 04 §2 — `accountSlice`/`monthSlice`, `ALL_VALUE` sentinel | D21 |
| Data-viz layer (charts, gauges, geo maps) on **ECharts + Recharts** behind a reusable hook | 🟢 | kb 04 §4 — `useEcharts` | D21 |
| **Typed API layer + fetch hook with request-id guards**, killing stale-response races across 36 services | 🟢 | kb 04 §3 — `useFetchData` `requestIdRef` | D21 |

**Three claims DELETED 2026-07-24 — never restore:** ~~React Testing Library coverage~~ (1 test file:
the untouched CRA default — the most dangerous claim that was on this CV), ~~cut bundle 40% via
code-splitting/lazy-loading/**TanStack Query**~~ (TanStack not installed; `React.lazy` in one file; CRA
not ejected; no measurement exists), ~~**Zustand**~~ (absent from **every** repo he has). The 95+ CWV
claim was removed 2026-07-24 as a category error and also stays dead.

_**There is now no test-coverage claim anywhere on the CV, deliberately.** Neither employer project has
a frontend test suite. The honest answer — and it's a good one: "those codebases had no frontend test
culture; I use **Vitest** on my own projects" — that's real, **22 test files** across GradeJar (2),
JsonBeam (6), AccentWallPlanner (10), KesariEnterprise (4)._

_**Full deep-drill: the whole project to explanation level** — the 🔴 engine + number and the 🟢
frontend alike. The two 🔴-adjacent UI bullets each need their boundary sentence ready: "I built the
surface that shows the recommendation; I didn't write the analysis that produces it."_

## DentScribe (Team 10) — **Oct 2022 – Jun 2023**

> **Bullets rewritten 2026-07-24 (v2), grounded in `Learning/Dentscribe/frontend`.** Four claims were
> **false or unsupported** and are gone. Detail in `project-knowledge-base/dentscribe/cv-truth-table.md`;
> teaching module is `dentscribe/03-portal-architecture.md`.

| Bullet | Color | Grounding | Drill |
|---|:--:|---|:--:|
| React + TS portal, **19 surfaces** across **4 roles**, multi-tenant on `officeId` | 🟢 | kb 03 §1, §7 — `content/applications/` (19), `ROLES` enum (4), 317 TS files / 0 JS | D22 |
| **Report review surface** — tabbed note, transcript, aftercare + coordinator with per-section editing | 🟢 | kb 03 §5 — `isAfterCareSummaryEditMode`, `isTcNotesEditMode`; SOAPNoteTab is **read-only** | D22 |
| **Integrated against a queue-backed AI pipeline**, surfacing report state + triggering writeback | portal 🟢 / pipeline 🟡 / **prompts + workers + Sikka 🔴** | kb 03 §6 diagram; Module 2 (Whisper→GPT→JSON), Module 4 (Sikka/PQL) | D12 |
| **10 Redux Toolkit slices** + global auth middleware + route guards (role / tenant / subscription) | 🟢 | kb 03 §2-§4 — `store.ts`, `apiMiddleware.ts`, `router.tsx` `AuthGuard` | D22 |
| **Client-facing + cross-team API contracts** (backend + mobile) | 🟢 | kb 03 §8 — the `statusCode 400 due to mobile app issue` comment is literal proof | D22 |

**Four claims DELETED 2026-07-24 — never restore:** ~~inline find-and-replace~~ (does not exist in any
of 317 files; the only `searchTerm` is a server-side list filter), ~~"the clinical note editor"~~
(`SOAPNoteTab.tsx` is 149 lines and **read-only** — edit mode exists on aftercare + TC notes only),
~~polling report status~~ (the portal never polls; the only `setInterval` watches an OAuth popup —
writeback polling is a **backend cron**), ~~the operatories × time-slots calendar~~ (`BigCalendar` is a
**15-line wrapper** with events commented out; the dashboard hard-codes four operatories).

_The CV says "the practice's management software" and never names Sikka, Dentrix, Eaglesoft or
Open Dental — a public-document constraint, not a knowledge gap. **In the room, name all four**;
kb test A3 and C9 both grade on them._

_**The two boundary sentences to memorize** (kb 03 §6): "I built the portal, not the transcription
workers, the prompts or the Sikka integration" · "the mobile app is a separate codebase I didn't work
in." And on auth: **the client-side route guard is UX, not security** — the server's `roles.guard` and
`officeId-match.guard` are the boundary. Getting that right is what they're testing._

## MyWorkMyDay (Team 7) — **Apr 2022 – Sep 2022** — **NO REPO** (confirmed 2026-07-24)

> **Bullets rewritten 2026-07-24 (v2).** The repo does not exist on this machine — all of `Documents/`
> was searched. This project is defensible **by mechanism only, never by file**. The full sheet is
> `project-knowledge-base/myworkmyday/defense-notes.md` (there is no code-grounded module and there
> won't be one).

| Bullet | Color | Grounding | Drill |
|---|:--:|---|:--:|
| Core surfaces (employee management, payroll, performance analytics) | 🟢 | his own account — **generalized on purpose**; lead with payroll as "the hardest" (notes §2) | D70 |
| Reusable typed components + custom hooks (form validation, data fetching) | 🟢 | mechanism only — describe both hooks as *patterns* (notes §3) | D70 |
| RBAC gating **route access + in-page actions** | 🟢 | mechanism only — **both levels**, and "it's UX, not security" (notes §4) | D70 |
| **Cut redundant search API calls 50% via debouncing** + memoization for re-render cost | 🟡 | his number; mechanism is sound — debounce causes it (notes §5) | D70 |

**DELETED 2026-07-24 — never restore:** ~~load time from 3.2s to 1.1s~~. A **category error** of the same
class as the banned 95+ CWV claim: `React.memo`/`useMemo` reduce **re-renders**, not initial load, so the
number was bound to a mechanism that cannot cause it — in his own specialty. There is no repo to measure
and no measurement story. **If ever asked about the old number:** *"I took that off — I couldn't stand
behind how it was measured, and memoization wasn't what would have caused it."* That answer is a credit.
Also struck: ~~TanStack Query~~ from the stack line. **Tailwind CSS added** on his instruction.

_**The play for this project:** it's the oldest and smallest entry and its job is **trajectory**, not
depth. Answer, then connect forward — the stale-response bug half-handled in the `useFetch` hook here is
the one he fixed properly at CloudForestX with a request-id guard across 36 services. Same problem, four
years of judgment apart. **Don't go deep here; move the conversation to CloudForestX or DentScribe.**_

## Projects (personal — all 🟢, fully yours)

| Project | Color | Grounding | Drill |
|---|:--:|---|:--:|
| GradeJar — local-first gradebook, zero backend | 🟢 | `MyProjects/GradeJar` (astro.config, localStorage, SSG) | D40 |
| JsonBeam — fast, ad-free JSON formatter | 🟢 | `MyProjects/Jsonbeam` (Astro, Cloudflare Workers) | D41 |
| **Section lead-in: "research, build, deploy, and operate end to end — domain, edge infrastructure, SEO, and analytics"** | 🟢 | Cloudflare Workers deploys, owned domains, GSC onboarding (`scripts/gsc-onboard.mjs`), `scripts/report.mjs` | D40/D41 |
| **Section lead-in: "an agentic AI development workflow (Claude Code, Model Context Protocol) that I built and orchestrate myself"** | 🟢 | TARUN-OS itself — skills, subagents, `references/mcp/` | D32 |

_The lead-in added 2026-07-24 does two jobs. It states the **end-to-end ownership** no employer
bullet on this CV can show, because at ThinkSys he owns a slice of someone else's platform. And it
**anchors the AI & GenAI cluster in body text**, which until now appeared only in the Skills list —
where the fact-bank's own ATS rule says keywords carry least weight. **Expect it to be probed:
"what does orchestrating an agentic workflow actually mean?"** Answer from TARUN-OS concretely
(skills, subagents, MCP servers, the study-and-test loop in `project-knowledge-base/`), not
abstractly. **Do not let this drift into implying AI agent work at ThinkSys** — it is his own
system, and DentScribe's LLM work stays 🟡 integration._

## Skills clusters (defend what a keyword-scan will probe)

| Cluster | To defend | Color | Drill |
|---|---|:--:|:--:|
| Frontend (React, Next, Vue, TS, Astro, ECharts, Recharts…) | Next.js, Vue, Astro; **ECharts/Recharts now anchored in the CloudForestX bullet** | 🟡/🟢 | D30, D31, D34 |
| Backend (Node, PostgreSQL, REST, SignalR) | the Node/PG boundary | 🟡 | D33 |
| AI & GenAI (LLM, OpenAI API, prompt eng, agents, MCP, Claude Code) | LLM integration 🟡 · agents/MCP/Claude Code 🟢 — **now anchored in the Projects lead-in, not Skills-only** | 🟡/🟢 | D32 |
| Cloud & Deployment (AWS, Cloudflare, Docker) | the AWS cost model | 🔴/🟢 | D10, D34 |
| Quality & Perf (bundle opt, SEO, RTL) | the 40%; **CWV claim is gone — do not re-argue it** | 🔴/🟡 | D11 |

---

**Reading this map before a session:** find the drill you're on, read only its rows, note the color. 🔴 and
🟡 rows carry a boundary sentence you must be able to say. 🟢 rows just need to come out sharp — and for
**Dwellworks + CloudForestX, every row is drilled deep** regardless of color.
