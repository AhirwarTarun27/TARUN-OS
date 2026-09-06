# Defend-Map — every CV line, its grounding, and how safe it is

> 🟢 yours · 🟡 fluency (integrated / contributed — never claim authorship) · 🔴 must-learn (the bullet
> implies more than you built). **Grounding** = where the truth lives (repo and/or `../project-knowledge-base`
> module, abbreviated *kb*). **Drill** = the `drills/` file that closes it.
> **Rule: no line goes to an interview un-mapped.**
>
> **Depth ≠ color.** Color is *risk* (can you defend it). Depth is *how hard we drill it*.
>
> **Re-scoped 2026-07-31 — Phase 1 is breadth-first.** The "full deep-drill Dwellworks and CloudForestX
> first" order is gone. In **Phase 1 every bullet on this page** — all four projects, both personal
> projects, the Skills clusters, the Summary and the Education lines — gets the same treatment:
> **mechanism → two follow-ups → the boundary sentence.** Nothing on the page is skipped and nothing
> gets a deeper pass than anything else, because an interviewer samples the CV at random. The extra
> platform depth that used to be "deep-drill" is **Phase 2**, and Phase 2 is gap-driven. See `roadmap.md`.

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

## The lines nobody was drilling — Summary, Education, the title

> **Added 2026-07-31.** Three CV lines had **zero material anywhere in the system** and every one of
> them gets asked. The rule at the top of this file says no line goes to an interview un-mapped; these
> were the exceptions. Drill: **D01** (`drills/01-origin-and-summary.md`).

| Claim | Color | Grounding | Drill |
|---|:--:|---|:--:|
| **"Senior Full-Stack Developer with 4+ years"** (Summary, line 1 of the CV) | 🟢 | Apr 2022 → now = 4 yr 3 mo. The number is correct. | D01 |
| **"building data-heavy enterprise SaaS end to end, from PostgreSQL and Node APIs to fast, typed React interfaces"** | 🟡 | CloudForestX is the only project where he genuinely spans PG → Node → React (kb `04` §5). DentScribe adds the CRUD/support tier (fact-bank, 2026-07-29). **"End to end" means those two, and he must name them unprompted** — otherwise it reads as a claim over all four. | D01 |
| **"AI-powered products, LLM integration, context engineering"** (Summary) | 🟡 | DentScribe *consumed* the pipeline; context engineering is TARUN-OS. Same boundary as D12/D32 — **do not let the Summary imply more than those two drills can defend.** | D01 |
| **`Senior Software Developer, ThinkSys Inc, Apr 2022 – Present`** — one unbroken title | 🔴 **risk, not a lie** | The CV shows a single title spanning from four months after a 9-month bootcamp. An interviewer reads "Senior on day one." **Needs a prepared answer**, and the honest one is about the title's scope at a services company plus what actually changed between MyWorkMyDay and Dwellworks. | D01 |
| **B.Tech Mechanical Engineering → developer** (2013-17 → Masai 2021) | 🟢 | His own story. **Guaranteed question, and the 4-year gap between graduating and Masai gets asked with it.** Answer it in one confident pass, don't apologise, don't over-explain. | D01 |
| **Masai School — "11+ major and minor projects"** | 🟡 | Bootcamp portfolio. Safe to say; **do not offer a project name you can't then discuss.** Pivot to GradeJar/JsonBeam, which are current and live. | D01 |
| **"Edchart Certified React JS Developer (SME)"** · **"GitHub Copilot Beginner to Pro"** | 🟢 | Both linked and verifiable (Credly, Udemy). Low risk. **Only trap: don't let "SME" get inflated in the room** — it's a certification title, not a role. | D01 |

## Dwellworks (Team 12) — **Jun 2025 – Present** — all 🟢

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
| **Client-facing: requirements, design sessions, demos, ceremonies, release coordination** | 🟢 | Tarun's own fact — **not in the kb**, which is code-derived only | D20 + **D50** |

_No backend claims here (.NET dropped on purpose) — **which is exactly why Dwellworks modules 1, 2, 4,
5, 6 and 7 are Phase 2.** Six of that project's ten kb modules defend backend work this CV does not
claim. **Phase 1 drills the six bullets above and stops at the boundary.**_

_🟢 means "you built it," not "skip it" — every bullet still needs mechanism → 2 follow-ups → boundary._

**Three words that must never leave your mouth on this project** — the code contradicts all three:
**"hydration"** (it's `ReactDOM.render`, no SSR), **"code-splitting"** (no `splitChunks`, no
`React.lazy`, no dynamic `import()`), and **SignalR "between consultants and families"** (it's
`controlTowerHub` registered by `programManagerId`, serving **program managers**). Also: **no
TypeScript** and **no React tests** exist in Odin — never claim either here.

_Shadow-resource note: he works this account under Navnit Singh, so his commits are under
`--author="avnit" --since=2025-06-01`, never his own name._

## CloudForestX (Team 6) — **Jul 2023 – May 2025**

> **Bullets rewritten 2026-07-24 (v2), grounded in all six repos.** Three claims were **factually
> contradicted by the code** and are gone. Detail in `project-knowledge-base/cloudforestx/cv-truth-table.md`;
> teaching module is `cloudforestx/04-frontend-and-data-layer.md`.

| Bullet | Color | Grounding | Drill |
|---|:--:|---|:--:|
| React + TypeScript SPA behind **40 cost dashboards** (waste detection, rightsizing, reservations, power scheduling) | surfaces 🟢 / **algorithms 🔴** | kb 04 §1 — 470 TS files, 0 JS; 40 pages | D21 |
| **Node ingestion + REST APIs**: EC2/EBS/S3/CloudWatch via **STS cross-account roles** → PostgreSQL | 🟢 **re-graded 2026-08-16** / **recommendation logic 🔴** | kb 04 §5 — `auth.ts` STS factory, 18 cron jobs, Sequelize models | D21 *(D33 reuses it as the Node/PG anchor)* |
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

> ### ✅ The Node bullet — re-graded 🟢 on 2026-08-16. Read this once, then stop re-litigating it.
>
> **History, so nobody reopens it by accident.** Graded 🟡 by the system, raised to 🟢 on Tarun's
> instruction (2026-07-24), **reverted to 🟡 on 2026-08-09** because when asked cold, 15 months after
> the project ended, he said he could not tell whether he wrote it. The hold was correct at the time:
> the evidence column proves the code exists and does those things, it does not prove authorship.
>
> **Closed 2026-08-16 by the documented procedure** — kb `04` §5 taught with the evidence in front of
> him, authorship declared, both stacks. `cv-truth-table.md` row 2 already read 🟢, so all three files
> now agree. The 15 Sept due date is spent.
>
> **What actually changes in the room:** he *does* volunteer *"I built the ingestion pipeline and the
> APIs."* The hedging instruction from 08-09 is dead — do not reinstate it.
>
> **What does NOT change, and it is the whole reason the claim survives:** the bullet says *ingestion
> and REST APIs*. It has never claimed the **recommendation algorithms** — thresholds, sizing rules,
> reservation picks. That single handback (`cv-truth-table.md` lines 54-59, kb `04` §5 last block) is
> what makes the rest land as senior instead of vague. **A 🟢 grade raises the follow-up bar, it does
> not remove the boundary.** Claiming authorship means surviving *"walk me through assume-role"* cold.
>
> The standing rule that produced the 08-09 hold stays live for every other line: a claim he cannot
> defend cold gets downgraded, and this same truth table has already deleted four DentScribe claims and
> three CloudForestX ones. Grading a line up or down here is routine maintenance, not an integrity event.

_The two 🔴-adjacent UI bullets each need their boundary sentence ready: **"I built the surface that
shows the recommendation; I didn't write the analysis that produces it."** That sentence is the whole
point of **D10**, which drills the cost model and the analysis engine **to boundary depth only** —
enough vocabulary to describe what the dashboards show and where your authorship stops. The full
engine internals are Phase 2._

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
> ### ⚠ Two rows deleted here on 2026-08-15 — read this before re-adding them
>
> This table carried two **"Section lead-in"** rows from 2026-07-24, both graded 🟢:
> *"research, build, deploy, and operate end to end — domain, edge infrastructure, SEO, and analytics"*
> and *"an agentic AI development workflow (Claude Code, Model Context Protocol) that I built and
> orchestrate myself."*
>
> **Neither sentence has ever existed in `master.tex`.** The Projects section is, and has always been,
> GradeJar and JsonBeam with no lead-in. The edit was planned on 2026-07-24 and never landed, and for
> three weeks this table believed the AI cluster was anchored in body text while it was in fact
> Skills-list-only — the exact weakness the note claimed to have fixed.
>
> **The rule that would have caught it, now standing: a row here is only valid if its quoted sentence
> greps clean against `master.tex`.** Grep before trusting any row on this page.
>
> Rows deleted rather than fulfilled, because on 2026-08-15 Tarun decided the AI/agentic material stays
> **spoken, not printed** (see below and `fact-bank.md`).

### devflow — spoken only, never on the CV

`github.com/AhirwarTarun27/ai-dev-workflow`. **Deliberately not in `master.tex`** (decided 2026-08-15).
There is therefore **no CV line to defend** — but it is the most likely thing he volunteers in an
interview, and the repo is public, so it gets the same rigour.

| Claim (spoken) | Color | Grounding | Drill |
|---|:--:|---|:--:|
| devflow — a portable agentic dev workflow he designed | 🟢 | the repo, cited `file:line` → **`answers/devflow/`** | D32 |
| ↳ the **single approval gate at the plan**, not the code | 🟢 | `README.md:22-34`, `skills/plan/SKILL.md:10-11` | D32 |
| ↳ guardrails as **hooks, not instructions** — exit 2 blocks | 🟢 | `hooks/hooks.json`, `scripts/verify-gate.mjs` | D32 |
| ↳ **model-tiered subagents**, fan-out-to-read / single-thread-to-write | 🟢 | `agents/*.md` frontmatter, `README.md:107-111` | D32 |
| ↳ `devloop.json` contract + `testMode: tdd\|evidence` | 🟢 | `templates/devloop.json.tmpl` | D32 |
| ↳ **the practice** — ~1 yr working this way, several repos, per-project setups before the plugin | 🟢 | his own history; `ATTRIBUTION.md:37-43` (the .NET/React lineage). **Concrete before-stories still unwritten** — `answers/devflow/04-the-contract.md` §lineage | D32 |
| ↳ **the package** — extracted 08-11, 5 commits in 38 min | 🟡 | `.agent/` on the live project: dossier ✓, tuned contract ✓, browser evidence ✓; **`specs/ plans/ learnings/` empty** | D32 |

> **⛔ Do not let `/cv-tailor` promote this onto the CV**, however well it matches an AI-heavy JD. The
> reasoning is in `fact-bank.md`: the interesting fact is that the *practice* predates the *package* by
> about a year, and that distinction fits in a conversation but not in a CV bullet. Printed, a reader
> supplies the commit dates themselves and draws the wrong conclusion unchallenged. He is trading ATS
> weight for narrative control, knowingly.
>
> **The two facts that must never merge.** Practice: ~a year, several repos — say it, it's the real
> credential. Package: days old, 5 commits inside 38 minutes on 2026-08-11 — *"that's the day I wrote
> it down, not the day I worked it out."* **Claiming the repo itself is old is an instant fail**; it is
> one click to disprove and it discounts everything true he said before it.
>
> Authorship: *"I designed it and directed it; the prose was AI-written; I own it"*, backed by a
> 16-source attribution file. **Never "AI generated it" and never "I hand-wrote it."**
>
> **The employer project it runs on is never named or described.** Not its domain, users, or purpose.
> *"My current project"* is the entire permitted sentence.

_**The AI & GenAI cluster is Skills-list-only, and that is now a deliberate choice rather than an
oversight.** Expect the probe anyway: **"what does orchestrating an agentic workflow actually mean?"**
Answer concretely — tool allow-lists, model tiering, context isolation — from
`answers/devflow/03-the-agents.md`, never abstractly. **Do not let this drift into implying AI agent work
at ThinkSys**; it is his own system, and DentScribe's LLM work stays 🟡 integration._

## Skills clusters (defend what a keyword-scan will probe)

> **The per-token board is `skills-defense.md`** — every token on all six Skills lines, its fact-bank
> flag, its anchor, its spoken line, and the rep that closes it. **That file is the detail; this table
> is just the index.** Flags come from `references/cv/fact-bank.md` — never re-derive them here.

| Cluster (CV Skills line) | The thing that gets probed | Color | Drill |
|---|---|:--:|:--:|
| **Frontend** — React, Next, Vue, TS, Redux Toolkit, Context API, Hooks, Astro, HTML/CSS | **Next.js** (portfolio-only) and **Vue** (one legacy surface) are the two thin ones. TypeScript is CloudForestX + DentScribe, **never Dwellworks**. | 🟡/🟢 | D30, D31 |
| **UI & Visualization** — MUI, Tailwind, SASS/SCSS, ECharts, Recharts | ECharts/Recharts are anchored in the CloudForestX bullet. **SCSS is the thin one** — in Odin it lives on the Razor side, not in his React. | 🟢 | D34 |
| **Backend & Data** — Node, Express, REST, PostgreSQL, Sequelize, TypeORM, SignalR, Socket.IO | the Node/PG boundary; **TypeORM is one DentScribe module in a repo with no `.git`** | 🟡/🟢 | D33 |
| **AI & GenAI** — LLM integration, OpenAI API, agents, MCP, context engineering, AI-assisted dev | LLM integration 🟡 (consumed a pipeline) · agents/MCP/Claude Code 🟢 (his own AIOS). **Anchored in the Projects lead-in, not Skills-only.** | 🟡/🟢 | D32 |
| **Cloud, Tooling & Practices** — AWS (EC2/S3/EBS/EFS/Lambda/CloudWatch/STS), Cloudflare Workers, Docker, Webpack, Vite, Git, Agile | **STS is 🟢** (he wrote the factory, kb `04` §5). **The cost/analysis engine is 🔴** → D10. **Lambda and EFS are surfaced-in-UI only**, and **Docker is light** — the three highest-risk tokens on the whole Skills block. | 🔴/🟡/🟢 | D35, D10 |
| **Quality & Performance** — Vitest, Core Web Vitals, bundle optimization, WCAG/ARIA, SEO | **Vitest is personal projects only** (22 real test files) and that is the honest, good answer. The 40% bundle claim and the 95+ CWV claim are **deleted — do not re-argue either.** | 🟡/🟢 | D34 |

---

**Reading this map before a session:** find the drill you're on, read only its rows, note the color.
🔴 and 🟡 rows carry a boundary sentence you must be able to say. 🟢 rows just need to come out sharp.

**In Phase 1 every row gets the same pass:** mechanism → two follow-ups → boundary. No row is skipped
for being 🟢 and no row is drilled deeper for being a favourite project. Depth is Phase 2, and Phase 2
is driven by what a real interview actually punished. See `roadmap.md`.
