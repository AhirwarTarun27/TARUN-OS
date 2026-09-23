# CV Fact-Bank — the truthfulness spine for `/cv-tailor`

> This is the ONLY source of truth the tailoring skill reads alongside `master.tex`. It exists so a
> tailored CV can chase a job description's keywords **without ever inventing one**. Read it top to
> bottom before tailoring. Update it (not the tailored outputs) whenever a real new skill or project
> lands.

---

## The law (non-negotiable)

Tailoring **re-weights, reorders and re-words Tarun's real experience** to a JD's vocabulary. It never
changes the underlying work. Concretely:

**MAY change per JD:**
- The order of skill clusters and the items inside them (front-load what the JD asks for — ATS weights top-first).
- The Summary's emphasis and opening framing (same facts, JD-shaped).
- The order of experience bullets, and which project leads (reorder only).
- Bullet wording, to mirror the JD's verbs and terms — **only using words in the Allowed Vocabulary or a legitimate synonym below.**

**MUST NOT change, ever:**
- Any metric value (40%, 50%, 3.2s→1.1s, 200+, 20+, team sizes, 40-50 min).
  **Three Dwellworks claims were removed on 2026-07-24 as factually false against the Odin repo, and
  may never return** (verified in `Odin/Scripts/react/`):
  1. **"server-to-client hydration layer"** — the code calls `ReactDOM.render`, never `ReactDOM.hydrate`.
     There is no React SSR. The real mechanism is a server-injected `window.globalObject` config read in
     156 places, with each bundle mounting client-side into a `<div id="react_*">`. Say "mounts as an
     independent SPA bootstrapped from a server-injected config object" — never "hydration".
  2. **"Webpack code-splitting"** — `webpack.common.js` has no `splitChunks`, and the source has zero
     `React.lazy` and zero dynamic `import()`. What exists is **20 separate entry points**, one per Razor
     page. Say "20 independently-mounted SPA bundles" — never "code-splitting".
  3. **"SignalR ... between consultants and relocating families"** — the hub is `controlTowerHub`, event
     `UpdateControlTower`, and it registers by **`programManagerId`**. It pushes live order updates to
     **program managers** in the Control Tower dashboard. Transferee notifications are a separate
     **polling** endpoint (`GetUserNotifications?numOfDays=7`). "In-app messaging" does not exist.
  **TypeScript may never appear in the Dwellworks stack line** — the Odin front end is 409 `.js`/`.jsx`
  files with zero `.ts`/`.tsx` and no `tsconfig.json`. TypeScript is real on CloudForestX and his own
  projects only.

  🔴 **The Dwellworks AI chatbot ("Dwellton") is NOT his, at any layer. Investigated 2026-09-10 after an
  HR contact said his projects show no AI work, and Tarun asked whether it could be claimed.** The answer
  is no, and the evidence is unambiguous:
  - **Frontend** is `Scripts/react/src/components/chatbot/` — 3 files, 507 lines. **Every commit is Dave
    Gottl's**, 2024-12-03 to 2025-05-07, on `feature/chatbot-integration`.
  - **Backend is heavily C#**, which Tarun does not claim: `Controllers/Api/ChatBotController.cs`, the
    whole `Integration/ChatBotApi/` Flurl client, the `ChatSession` / `ChatMessage` / `ChatCitation`
    entities, `ChatBotRepository.cs`, and the `ChatBotMessageHistory` / `ChatBot_Empty` /
    `ChatBotFeedback` EF migrations. **19 commits, all Dave Gottl's.**
  - The AI model is **not in the repo at all** — it is an external service reached over HTTP at
    `configHelper.ChatBotApiUrl`.
  - `git log --author="avnit"` returns **zero** files matching chatbot, bot, assistant or dwellton —
    including the CSS at `Content/styles/css/chatbot/` and `xref_scss/22_chatbot/`.
  - It also **predates his June 2025 Dwellworks start**.

  **Never put an AI *product* claim on Dwellworks.** He may learn the feature and discuss it as fluency
  🟡 in the room; it is never a CV bullet. The AI keywords he needs come from DentScribe and his own
  AI-assisted practice — see the placements recorded below.

  **The one carve-out, added 2026-09-12 at Tarun's instruction — a PROCESS claim, not a product claim.**
  The Dwellworks block now carries one bullet: *"AI-assisted development day to day: self-built Claude
  Code agents, prompt and context engineering."* It describes **how he writes the code**, not a feature
  he shipped for the client. That is true and defensible: the practice is ~1 year old across his own
  repos and his work one, and the Claude Code agents are his. **The line between the two claim classes is
  the whole rule** — a bullet that could be read as *"he built AI features for Dwellworks"* is still 🔴
  and Dwellton is still Dave Gottl's. Do not reword this bullet toward product vocabulary (no "built",
  no "integrated", no "chatbot", no feature noun). Full defence: `learning/cv-defense/answers/devflow/`.

  **Removed from the Dwellworks bullet on 2026-09-10 at Tarun's instruction: "legacy", "monolith" and
  "IE11".** All three signalled an old codebase and he judged that it was costing him shortlists. The
  bullet now reads "a server-rendered .NET Razor app". The underlying facts are unchanged and IE11
  support stays 🟢 in the allow-list for interview use — this was a CV presentation decision, not a
  fact deletion.

  **Three CloudForestX claims were removed on 2026-07-24 as false against `cloudsaver-frontend-master`,
  and may never return:**
  1. **"component test coverage with React Testing Library"** — there is **one** test file in 470 source
     files, `src/App.test.tsx`, and it is the **verbatim Create React App default** (`renders learn react
     link`). It would fail against this app. RTL is in `package.json` only because CRA ships it.
     **There is now no test-coverage claim anywhere on the CV, deliberately** — Odin has no React tests
     either. If a JD demands testing, that is an honest gap for the notes file.
  2. **"Cut initial bundle 40% via code-splitting, lazy loading, and TanStack Query"** — TanStack Query /
     React Query is **not installed**; `React.lazy` appears in **one** file (`SupportPage.tsx`);
     `react-lazyload` in **one** file (`UsersList.tsx`). The app is Create React App (`react-scripts`
     4.0.2, not ejected), so the webpack config was never his to tune. No measured bundle number exists.
  3. **Zustand** — **not installed.** CloudForestX state is Redux Toolkit (5 registered slices: user,
     account, ui, month, organization) plus 2 React Contexts. Zustand is also removed from the Skills
     list; it appears in no repo.
  **Webpack was removed from the CloudForestX stack line** — CRA hides it. Webpack stays on Dwellworks,
  where the 20-entry config is real.

  **Four DentScribe claims were removed on 2026-07-24 as false or unsupported against
  `Learning/Dentscribe/frontend`, and may never return:**
  1. **"inline find-and-replace"** — searched the entire front end; it does not exist. The only
     `searchTerm` (in `DentistReports/index.tsx`) is a **server-side list filter** that sends
     `{ search: … }` to the reports-list API. There is no find-and-replace in any editor.
  2. **"the clinical note editor with per-section editing"** — `SOAPNoteTab.tsx` is **149 lines and
     read-only** (fetch + copy-to-clipboard, no edit mode). Edit mode exists on exactly two tabs:
     `isAfterCareSummaryEditMode` and `isTcNotesEditMode`. Reworded to "aftercare and coordinator
     sections with per-section editing" — true as written, never "the note editor".
  3. **"polling report status"** — the portal has **no** report polling. The only `setInterval` in the
     front end is `SikkaWebView` checking whether an OAuth popup closed. Status polling is a **backend
     cron** (`SOAPWritebackStatusCron`). Say "surfacing report state", never "polling".
  4. **"daily appointment calendar laid out as operatories against time slots"** —
     `components/BigCalendar/index.tsx` is a **15-line pass-through wrapper** with every operatory event
     commented out (`// TODO:REMOVE DUMMY EVENTS`), and the Dashboard's `resources` is a **hard-coded
     four-item array** (`OP-1`…`OP-4`), not the practice's real operatories. Bullet dropped entirely.

  **JavaScript was removed from the DentScribe stack line** — the portal is 317 TypeScript files
  (218 `.tsx` + 99 `.ts`) with **zero** `.js`/`.jsx`.

  **Two MyWorkMyDay claims were removed on 2026-07-24:**
  1. **"load time from 3.2s to 1.1s ... with memoization (React.memo, useMemo)"** — a **category error**,
     the same class as the banned 95+ CWV claim. Memoization reduces **re-renders**, not initial load;
     load time is bundle size, network, server response and render-blocking work. The number was attached
     to a mechanism that cannot produce it, in Tarun's own specialty. **The load-time figure is deleted
     and may not return under any mechanism**, because there is no repo to measure and no measurement
     story to tell.
  2. **TanStack Query** (stack line) — struck from the allow-list entirely; it exists in no repo he has.
  **What survives:** the **50% API-call reduction**, re-attributed to **request debouncing alone**, which
  genuinely causes it. Memoization is still named but now correctly bound to re-render cost.
  **Tailwind CSS was added to this project's stack line on 2026-07-24 on Tarun's instruction.**
  **The "95+ Core Web Vitals" claim was removed on 2026-07-24 and may not return.** Core Web Vitals
  are LCP/INP/CLS measured in ms and unitless CLS — there is no 0-100 CWV score, so the claim was a
  category error in Tarun's own specialty. Re-adding it as "95+ Lighthouse" is a separate decision
  he declined; the bundle number carries this bullet alone now.
- Employers, job titles, dates, education, certifications, contact details.
- The authorship boundary — a 🟡 or 🔴 line may be re-worded but **never promoted into a "built/owned/architected" claim.**
- Nothing may appear that is not in the Allowed Vocabulary. **Empty beats invented.** A CV that
  shortlists him for a role he cannot defend in the room is a net loss.

If the JD demands something he does not have, it goes in the **honest gap list** in the `.notes.md`, never into the `.tex`.

---

## Allowed Vocabulary (the allow-list)

**Nothing outside this set may appear as a skill/technology in a tailored CV.** Defensibility flags:
🟢 built/owns · 🟡 integrated/contributed (claim fluency, not authorship) · 🔴 must be justified carefully.

**Frontend** — React.js 🟢 · Next.js 🟡 (portfolio-backed) · Vue.js 🟢 (Odin legacy surface, incl. the
runtime date-picker patch) · TypeScript 🟢 (CloudForestX: 470 files, zero JS — **not** Dwellworks) ·
JavaScript ES6+ 🟢 · Redux 🟢 · Redux Toolkit 🟢 · Context API 🟢 · Axios 🟢 ·
React Hooks 🟢 · SPA architecture 🟢 · Astro 🟢 · Preact 🟢 · HTML5 🟢 · CSS3 🟢 ·
ECharts 🟢 (CloudForestX data-viz layer + `useEcharts` hook) · Recharts 🟢 (CloudForestX) ·
react-window virtualization 🟢 (both Odin and CloudForestX) · Socket.IO 🟢 (CloudForestX)

> **STRUCK 2026-07-24 — never re-add without new evidence:** ~~Zustand~~ and
> ~~TanStack Query / React Query~~. Both were verified absent from **every** repo Tarun has — all six
> CloudForestX repos, all eight Dwellworks repos, and all four personal projects (GradeJar, JsonBeam,
> AccentWallPlanner, KesariEnterprise). They were on the CV and in the Skills list with no basis
> anywhere. If he learns one, re-add it flagged 🟡 with the project that proves it.

**Backend** — Node.js 🟢 (CloudForestX ingestion + APIs, raised 2026-07-24; **DentScribe CRUD/support
modules, raised 2026-07-29**) · PostgreSQL 🟢 · Sequelize 🟢 (CloudForestX) ·
**TypeORM 🟢 (DentScribe — added 2026-07-29)** · REST APIs 🟢 · Express 🟢 (CloudForestX backend) ·
SignalR 🟢 (Dwellworks) · Socket.IO 🟢 (CloudForestX) · WebSockets 🟡 ·
MongoDB 🟡 (MERN / education — **not** production)

> **NestJS stays removed from the Skills list and from every stack line** (2026-07-24, Tarun's
> instruction; reaffirmed 2026-07-29). Naming the framework invites a question with no upside. **Say
> "Node.js" and "TypeScript REST endpoints"** — same fact, no invitation. Do not re-add NestJS.
>
> **DentScribe backend RAISED to 🟢 on 2026-07-29 — but only for the CRUD/support tier.** Grounded in
> `Dentscribe/backend-api/src/BackendApi/app/modules/staff-contacts/` (controller + service + entity +
> 3 DTOs), which demonstrably contains: `AuthenticatedGuard` + `RolesGuard` with a `@Roles` decorator,
> ownership-scoped TypeORM queries (`where: { _id, user: { _id: userId } }` — the ownership condition is
> *inside* the query, so the unauthorised row is never loaded), clamped pagination (offset ≥ 0, limit
> 1–100 default 10), an **allow-listed sort field** that 400s on anything else, `SanitizeHTMLPipe` on
> request bodies, structured JSON error logging, and Swagger annotations. He also owns the matching
> `staffContacts` slice + surface on the front end, making it a genuine **full-stack vertical slice** —
> that is the strongest true framing available for this project.
>
> **The pipeline boundary did NOT move and never may:** the transcription workers, the prompts, the
> Sikka/PQL integration and the SNS/SQS wiring stay 🔴. The boundary paragraph in
> `dentscribe/03-portal-architecture.md` §6 is still the thing to say in the room — it now needs one
> added clause: *"I wrote CRUD and support endpoints on that API; I did not write the AI pipeline."*
>
> ⚠️ **The repo has no `.git`**, so authorship here rests on Tarun's own account (given 2026-07-29), not
> on commit history. The bullet was therefore written to assert only what the code demonstrably *does*.
> **If he can name only `staff-contacts`, the bullet still holds** — it says "endpoints" (that module
> alone exposes GET/POST/PATCH/DELETE), never "modules" or a count.

**AI & GenAI** — LLM Integration 🟡 (DentScribe portal consumed the pipeline) · OpenAI API 🟡 ·
speech-to-text / Whisper 🟡 (integrated) · AI Agents & Agentic Workflows 🟢 (his AIOS **+ devflow**) · MCP 🟢 ·
Prompt Engineering 🟢 · Subagent orchestration 🟢 · Context engineering 🟢 ·
AI-Assisted Development 🟢 · Claude Code 🟢 · GitHub Copilot 🟢 (certified)

> ## ⚠️ devflow — RE-REVERSED 2026-09-12. It is OFF the CV again, as a named project.
>
> **Current state, and it supersedes the 2026-09-10 block below.** At Tarun's instruction on 2026-09-12
> the devflow **Projects entry was deleted** and so was the role-level delivery-loop line under the
> ThinkSys heading. The AI vocabulary they carried moved **into the Dwellworks block as one bullet**:
> *"AI-assisted development day to day: self-built Claude Code agents, prompt and context engineering."*
>
> **Why this is not a straight return to spoken-only.** The 09-10 trigger (an HR contact saying his
> projects showed no AI work) was answered by putting AI vocabulary in **body text inside the experience
> section**, which the ATS rules at the bottom of this file rank *above* a Projects entry and far above
> the Skills list. What is given up is the **clickable proof** — the repo link and the 15-skills /
> 5-subagents detail are no longer on the page. That is a deliberate trade, not an oversight.
>
> **A second, quieter gain.** The deleted role-level line read *"Work inside a self-built, gated
> AI-assisted delivery loop: spec, plan, implement, verify, ship."* Against the 🔴 below — no ticket has
> shipped through the full \`kickoff → ship\` loop, \`.agent/specs/\`, \`plans/\` and \`learnings/\` are empty on
> the live project — that line was the weakest claim on the CV. The replacement bullet asserts
> AI-assisted development, which is true, and asserts no loop.
>
> **\`/cv-tailor\` must NOT re-add devflow to Projects** on an AI-heavy JD. It may rewrite the Dwellworks
> bullet's wording within the allow-list. He still raises devflow verbally and shares the link in the
> room; every 🔴 below still binds.
>
> ---
>
> **Superseded, kept for the reasoning — devflow — REVERSED 2026-09-10. It was ON the CV, with the repo link.**
>
> **The spoken-only rule below is superseded. Do not re-apply it.** The trade it described was explicit
> about its own exit condition: *"If applications stall on AI-heavy JDs specifically, that trade is the
> first thing to revisit."* An HR contact told Tarun his projects show no AI work. **That is the trigger,
> and it fired.** Combined with the finding that the Dwellworks chatbot is not his at any layer, devflow
> is the densest true AI vocabulary he owns, and keeping it off the page was costing him first rounds.
>
> **What goes on the CV** (verified in the repo 2026-09-10): a Projects entry, first in the section, with
> `github.com/AhirwarTarun27/ai-dev-workflow` as the link. **15 skills · 5 subagents · 6 Node scripts ·
> 4 hook types** (PreToolUse, PostToolUse, Stop, SessionStart), published as an installable Claude Code
> plugin with a marketplace manifest.
>
> **MCP is deliberately NOT on the devflow line.** Checked 2026-09-10: "MCP" appears exactly once in the
> repo, in `README.md`, as a note that `.mcp.json` holds project MCP servers. That is a Claude Code
> convention devflow points at, not something devflow implements. **MCP stays in the Skills list, credited
> to the AIOS.** Do not move it onto the devflow line without new evidence.
>
> **The stated cost still stands and is handled verbally, not on paper.** The repo is 6 commits dated
> 11–15 Aug 2026 and a reader can see that in one click. So in the room he leads with the distinction
> — *"the practice is about a year old across my own projects and my work one; the plugin is the
> extraction, the day I wrote it down"* — and never with a claim that the repo is old. Every 🔴 below
> still binds.
>
> ---
>
> **Superseded, kept for the reasoning — devflow — SPOKEN ONLY. Deliberately NOT on the CV (decided 2026-08-15).**
> `github.com/AhirwarTarun27/ai-dev-workflow`. **The practice is ~1 year old** across several repos
> (personal + work); **the plugin is the extraction of it, published 2026-08-11.** Running on his current
> employer project since, and on his own projects before that. **Do not add it to `master.tex` and do not
> let `/cv-tailor` add it**, however well it matches an AI-heavy JD. He raises it verbally and shares the
> link if the conversation goes there.
>
> **Why this is a defensible call, not a missed opportunity:** the load-bearing fact is that practice
> preceded package by about a year — that fits in a conversation and does not fit in a CV bullet. Printed,
> the reader supplies the commit dates themselves and concludes "recent side project" with nothing to
> contradict it. Spoken, he leads with the distinction and the commit history becomes a footnote.
>
> **The cost of the choice, stated honestly:** the AI & GenAI cluster therefore stays **Skills-list-only**,
> which is where the ATS rule below says keywords carry least weight. He is trading ATS weight for
> narrative control. If applications stall on AI-heavy JDs specifically, that trade is the first thing to
> revisit.
>
> **Allow-list — say freely, out loud:** portable/stack-agnostic workflow 🟢 · research → plan → **single approval
> gate** → implement → verify → review → ship 🟢 · guardrails as deterministic **hooks** (PreToolUse,
> PostToolUse, Stop, SessionStart) rather than instructions 🟢 · **model-tiered subagents** (haiku locate /
> sonnet verify / opus plan+review) 🟢 · the `devloop.json` per-project contract 🟢 · `testMode: tdd |
> evidence` 🟢 · browser-verified evidence, incl. a real HTTP 500 caught on a live project 🟢 ·
> adversarial review in fresh context 🟢 · 16-source attribution 🟢
>
> **🟢 Say freely, it is the real credential:** *"I've been working this way for about a year, across my
> own projects and my work one. The plugin is the extraction — the day I wrote it down, not the day I
> worked it out."* Per-project setups came first; `verifier` and `impact-mapper` were generalised out of
> an earlier .NET/React setup (`ATTRIBUTION.md:37-43`).
>
> **🔴 NEVER claim:** that **the repo** is a year old — the practice is, the commits are not, and one
> click disproves it · that tickets have shipped through the full `kickoff → ship` loop (`.agent/specs/`,
> `plans/` and `learnings/` are all empty on the live project) · that a team uses it or it has adopters ·
> **anything at all about the employer project it runs on** — not its name, domain, users or purpose.
> *"My current project"* is the entire permitted sentence.
>
> **🟡 The framing, and it must be exact:** *"I designed it and directed it; the prose was written with AI
> assistance; I own it."* Not *"AI generated it"* (reads as no ownership) and not *"I hand-wrote it"* (the
> diff is 5 commits in 38 minutes on one day, and they will look). Using the tool to write the tool is the
> point, not the embarrassment. Full defence: `learning/cv-defense/answers/devflow/`.

**Cloud & Deployment** — AWS: Lambda, S3, EFS, EC2 🟡 (integrated/UI; **did not build the cost/analysis
engine** 🔴) · Cloudflare Workers 🟢 · Docker 🟡 (light)

**UI / Styling** — Material-UI (MUI) 🟢 · Tailwind CSS 🟢 · SASS/SCSS 🟢 · Responsive Design 🟢 · Figma 🟢 (consumed designs)

**Build & Tooling** — Webpack 🟢 · Vite 🟢 · Git 🟢

**Quality & Performance** — **Vitest 🟢 (personal projects only — 22 real test files across GradeJar 2,
JsonBeam 6, AccentWallPlanner 10, KesariEnterprise 4)** · Core Web Vitals 🟢 · Bundle Optimization 🟢 ·
Performance Optimization 🟢 · SEO 🟢 · lazy loading 🟡 · memoization 🟢

> **React Testing Library is 🔴 as an employer claim.** The only RTL in any work repo is CloudForestX's
> untouched CRA default test. **Neither employer project has a frontend test suite.** The honest and
> perfectly good interview answer: *"The enterprise codebases I worked in had no frontend test culture —
> Odin has no React tests at all. I test my own projects with Vitest, and I'd push for coverage on
> critical paths anywhere I joined."* That answer beats a claim that dies on "show me a test you wrote."
>
> **code-splitting is 🔴 for both employer projects** — Odin has no `splitChunks`/`lazy`/dynamic
> `import()`; CloudForestX has `React.lazy` in exactly one file. Do not list it as a skill.

**Accessibility & Security** — WCAG 🟢 · ARIA 🟢 · XSS/CSRF Prevention 🟡

**Methods** — **Agile Methodologies 🟢** · MERN stack 🟢 (education) · cross-browser / IE11 support 🟢

> **Agile is deliberately placed twice (2026-07-24, Tarun's ATS request):** as a token on the
> **Cloud, Tooling & Practices** skills line, *and* in **body text** on the Dwellworks client bullet
> ("in an Agile environment: … sprint ceremonies …"). The body-text placement is the one that scores —
> see the ATS rules at the bottom of this file: keywords in context outweigh a bare skills list.
> **This is the only survivor of the deleted "Soft Skills" line** — Team Collaboration, Problem Solving
> and Communication stay deleted; they are pure junior signal and no ATS meaningfully weights them.

---

## Synonym clusters (mirror the JD's word with one he can defend)

When a JD uses the left-hand term, it is legitimate to use the mapped real skill/phrasing — same fact, JD's vocabulary.

> **REPAIRED 2026-07-24.** Six rows of this table were still mapping JD terms onto **TanStack Query,
> Zustand, React Testing Library, code-splitting** and **"server-to-client hydration layer"** — every
> one of which is banned 100 lines above in this same file. That is the worst possible place for a
> stale row: the ban list is read by a human, this table is read by the tailoring skill, so a JD
> saying "state management" would have quietly put Zustand back on a CV. **If a claim is ever removed
> above, grep this table before closing the edit.**

| JD says | Use (all in the allow-list) |
|---|---|
| state management | Redux, Redux Toolkit (5 slices, CloudForestX), Context API |
| server state / data fetching / caching | Axios data layer, Redux Toolkit slices, a generic fetch hook with request-id guards. **No dedicated server-cache library — do not reach for TanStack Query.** |
| API integration / RESTful services / consuming APIs | REST APIs, Axios data layer |
| API development / building endpoints | Node.js + Express + Sequelize + PostgreSQL endpoints (CloudForestX — 🟢, "built"); Node.js + TypeScript + TypeORM REST endpoints with guards, DTO validation and pagination (DentScribe — 🟢 for the CRUD/support tier only, **never the AI pipeline**) |
| real-time / live updates / websockets | SignalR (Dwellworks), Socket.IO (CloudForestX), WebSockets |
| unit / component testing, TDD | Vitest — **personal projects only (22 test files).** Neither employer codebase has a frontend suite; that is an honest gap for the notes file, never a CV claim. |
| SPA / single-page app | React SPA |
| responsive / mobile-first / cross-browser | Responsive Design, IE11 support |
| performance / speed / web vitals | Core Web Vitals, bundle optimization, memoization (re-render cost), react-window virtualization, request debouncing. **Not code-splitting** — 🔴 on both employer projects. |
| accessibility / a11y | WCAG, ARIA |
| SSR / SSG / static generation | Astro (SSG), Next.js |
| component library / design system | reusable typed components, custom hooks, MUI, the 78-file Odin shared library |
| GenAI / LLM / AI-powered features | LLM integration, OpenAI API, prompt engineering |
| AI agents / agentic / workflow automation | AI Agents & Agentic Workflows, MCP, Claude Code, subagent orchestration |
| cloud / AWS | AWS SDK reads of EC2, EBS, S3, CloudWatch through STS cross-account roles 🟢 (CloudForestX ingestion). Lambda + EFS surfaced in the UI 🟡. **The cost/analysis engine is 🔴.** |
| legacy modernization / migration / micro-frontend-ish | 20 independently-mounted SPA bundles inside a .NET Razor monolith, legacy-to-React migration (Dwellworks). **Never "hydration", never "micro-frontends"** — see the removed-claims list above. |
| enterprise SaaS / multi-tenant / B2B | Dwellworks, CloudForestX, DentScribe, MyWorkMyDay (all enterprise SaaS) |

---

## Per-project fixed facts (immutable)

| Project | Team | Period | Domain | Metrics (immutable) | Boundary |
|---|---|---|---|---|---|
| **Dwellworks** | 12 | **Jun 2025 – Present** · US | Corporate relocation platform | **20 webpack bundles** (verified) · 7 error boundaries | All frontend 🟢 + client-facing 🟢. No backend (.NET dropped on purpose). **Shadow resource under Navnit Singh** — verify work via `git log --author="avnit" --since=2025-06-01`, never by Tarun's own name (returns zero). |
| **CloudForestX** | 6 | **Jul 2023 – May 2025** | AWS cloud cost optimization, 200+ accounts | **200+ accounts · 470 TS files · 40 pages · 36 services** (40% bundle claim DELETED 2026-07-24) | Frontend 🟢. **Node ingestion + REST APIs 🟢** (raised from 🟡 on Tarun's instruction 2026-07-24 — he owns the STS→SDK→Postgres→API path). **Analysis/recommendation algorithms 🔴 — never claim them.** UI verbs only on waste-detection, rightsizing and power-scheduling. |
| **DentScribe** | 10 | **Oct 2022 – Jun 2023** · US | AI dental documentation, saves 40-50 min/visit | 40-50 min/visit · **317 TS files · 19 surfaces · 10 slices** | Portal + admin 🟢. **CRUD/support REST endpoints on the API 🟢 (raised 2026-07-29 — see the Backend note above; grounded in `staff-contacts`).** **AI pipeline (Whisper→GPT→writeback), prompts, Sikka/PQL, SNS/SQS 🔴 — integrated, not authored.** Never name NestJS. |
| **MyWorkMyDay** ⚠️ **CUT FROM THE CV 2026-09-10** | 7 | **Apr 2022 – Sep 2022** | HR SaaS, 20+ clients | **-50% API calls 🟡 · 20+ clients** (3.2s→1.1s DELETED 2026-07-24) | Frontend 🟢. **No repo exists on this machine — confirmed 2026-07-24, searched all of `Documents/`.** Defensible by *mechanism only*, never by file. See `project-knowledge-base/myworkmyday/defense-notes.md`. |

> **MyWorkMyDay was removed from `master.tex` entirely on 2026-09-10** (Tarun's instruction). It was the
> only project with **no repo on this machine**, so it was the one block he could not defend by file. Its
> facts stay in this table for history and for interview questions, but **no MyWorkMyDay bullet appears on
> the CV, and its bullets did NOT migrate to CloudForestX** — the law above forbids moving a bullet between
> projects, and the RBAC / debounce claims belong to the project that earned them.
>
> **There is no date gap to fill, so do not invent one.** The same edit **removed every per-project date
> range** from the Experience section. `Apr 2022 – Present` on the ThinkSys entry is now the only date
> there, and it already covers the whole span. **Never extend CloudForestX (or any project) backwards to
> cover the Apr–Sep 2022 window** — it would overlap DentScribe, contradict the immutable dates below, and
> is checkable against LinkedIn and any background check. If asked about those six months, the true answer
> is a short one about a first HR SaaS project.

**Dates are immutable and they sum exactly**: 6m + 9m + 1y 11m + 1y 2m = 52 months = Apr 2022 →
Jul 2026, no gap, no overlap. Confirmed by Tarun 2026-07-24. This corrected
`project-knowledge-base/cloudforestx/00-narrative.md`, which had said "from Apr 2022" in §5 and §7.

Project stacks are in `master.tex`. A tailored CV may reorder projects to lead with the JD's emphasis
(AI role → DentScribe first; cloud role → CloudForestX first; frontend-architecture role → Dwellworks
first) but must not move a bullet between projects.

---

## Immutable set (never tailored)

- **Contact:** Noida, India · ahirwartarun095@gmail.com · +91-9106177149 · linkedin.com/in/ahirwartarun · github.com/AhirwarTarun27 · tarunahirwar.com
- **Employer:** ThinkSys Inc, Noida · **Senior Software Developer** · Apr 2022 – Present (single employer; all four projects nest inside it)
- **Headline (summary) title:** ⚠️ **CHANGED 2026-09-10 to Senior Software Developer · 4.5+ years.**
  Tarun aligned the Summary title with the real ThinkSys job title, so the CV now says **Senior Software
  Developer** in both places. This is an improvement, not a drift — an exact title match is what ATS
  weights, and the old split between "Senior Full-Stack Developer" (summary) and "Senior Software
  Developer" (experience) had no upside. **Both strings are still real; do not invent a third.**
  ⚠️ **"4.5+ years" is ~1 month early.** Apr 2022 → 10 Sep 2026 is 4 years 5 months, i.e. ~4.44. It
  becomes literally true around mid-Oct 2026. Flagged to Tarun; left as he wrote it. Do not push it
  further, and revert to "4+ years" if a stickler-heavy application worries him.
- **Education:** Full Stack Web Development, Masai School (Jul 2021 – Apr 2022) · B.Tech **Mechanical Engineering**, Marwadi University, Rajkot (Aug 2013 – Jul 2017). **The CGPA was removed on 2026-07-24 — do not restore it.** The branch was added the same day: it does not explain the 2017–2021 gap, which Tarun handles verbally, but it makes the career change legible, which is most of what the gap signals to a reader.
- **Certifications:** GitHub Copilot Beginner to Pro, Udemy (Aug 2025) · Edchart Certified React JS Developer (SME), Credly (Jul 2025)

The summary title (Senior Full-Stack Developer) and the experience-entry title (Senior Software
Developer) are two different real strings. A JD may make one more prominent, but neither is invented or swapped.

---

## Common gaps (never add — log honestly if the JD asks)

GraphQL · Angular / Svelte / Solid · Python / Java / Go / Ruby / PHP · React Native / native mobile ·
Kubernetes / Terraform / full CI-CD pipelines (Docker only, light) · production MongoDB (MERN was
education) · authored microservices / backend-heavy ownership · data engineering / ML training (he
*integrates* LLMs, does not train models). If a must-have sits here, the honest move is to name the
**nearest defensible adjacent** in the notes (e.g. "no GraphQL; strong REST + TanStack Query") and flag
it as a real gap, not to fake it.

---

## ATS rules baked into every tailored output

- Keywords must appear in **body text**, not only in the Skills list — ATS weights context.
- Spell every acronym once with its expansion: Large Language Model (LLM), Role-Based Access Control
  (RBAC), Model Context Protocol (MCP), Core Web Vitals (CWV).
- Standard section names (Summary, Skills, Experience, Projects, Education, Certifications) — keep them.
- Mirror the JD's exact phrasing where it maps to a real skill (a JD scanning for "React.js" and a CV
  saying "ReactJS" can miss — match the JD's spelling from the allow-list).
- One idea per bullet, quantified where a real number exists. **Length is now governed by the one-line
  budget below, which supersedes the old "~15-25 words" guidance.**
- The template (`master.tex`, RenderCV/charter) stays. Its only real ATS risk is the two-column date
  rows (paracol); RenderCV is widely ATS-tested, so keep it, but if a specific ATS is known to choke,
  the fallback is a single-column date-inline variant — note it, do not silently restructure.

---

## The one-line bullet budget (added 2026-09-10)

Every Experience bullet must render on **exactly one line**. Tarun asked for this on 2026-09-10 to tighten
the page and buy vertical breathing space.

The geometry: letterpaper is 21.59cm, side margins are **1.2cm** (do **not** widen them — that shrinks the
line and breaks the rule), leaving 19.19cm of text width less the 20pt `highlights` left margin, so about
18.5cm. In Charter 10pt that is roughly 105 characters.

- **Hard ceiling: 98 rendered characters per bullet.** LaTeX escapes (`\%`, `--`) count as rendered output.
- **Target spread: 45–98.** The ceiling is a maximum, **not a target**. If every bullet lands at 97 the
  uniformity is itself the problem — see the next section.

Extra breathing space is bought **vertically only**: `itemsep`, `topsep`/`parsep`, `\titlespacing`,
inter-project `\vspace`, and the Skills line breaks. Never by widening the side margins.

## Anti-detector style rules (added 2026-09-10)

**Why this exists:** on 2026-09-10 Tarun ran the CV through an AI-content detector and scored ~76%. The
score itself is noisy on a document this short and is **not** a target to chase, but the patterns driving
it were real and were also flattening the CV for human readers: every CloudForestX bullet opened with
"Built the", six bullets ended in a trailing "-ing" result clause, four used the same `--` appositive, and
nearly every bullet sat between 18 and 24 words.

Detectors score how predictable each next word is and how much sentence length varies. **Every bullet
written by `/cv-tailor` or by hand must satisfy all six:**

1. **No two consecutive bullets open with the same verb**, and some bullets do not open with a verb at all.
2. **No trailing "-ing" result clause.** Delete the result, or make it a second short sentence. (This is the
   single most reliable LLM fingerprint in résumé text.)
3. **No `--` appositives.** Use a colon, or split the sentence.
4. **Vary length deliberately** across the 45–98 band.
5. **Keep verified specifics.** Real numbers and real names raise unpredictability, which is exactly what
   the detector measures. Compress by cutting connective tissue, never by cutting the specifics.
6. **Prefer problem-then-fix over verb-then-outcome** on at least two bullets per project.

> **The tension to hold:** rules 1–6 want variance, the one-line budget wants compression. They are
> compatible only if the ceiling is treated as a maximum. As shipped on 2026-09-10 the 19 bullets run
> **60 to 95 characters**, which is the shape to preserve.

## The two AI keyword placements (locked 2026-09-10, re-cut 2026-09-12)

An HR contact told Tarun his projects showed no AI work. It was true: AI vocabulary lived only in the
Summary and the Skills list, which the first ATS rule above calls the weakest placement. **Both
placements below are grounded in code or a repo he owns. There is no third.**

> **What changed on 2026-09-12.** The original placements 1 and 2 — the role-level delivery-loop line and
> the devflow Projects entry — were **both removed** at Tarun's instruction and replaced by a single
> bullet inside the Dwellworks block. See the re-reversal note above for the trade. The surviving
> placements are renumbered below.

1. **One bullet inside the Dwellworks block**, placed last: *"AI-assisted development day to day:
   self-built Claude Code agents, prompt and context engineering."* It describes how he works, claims
   **no AI feature on the client product** and **no team adoption** — both still 🔴. Body text inside the
   experience section is the highest-weighted placement available short of the headline.
2. **DentScribe reframed AI-first** — the AI bullets lead the block, and the **AI cost dashboards** are
   surfaced instead of being buried in the phrase "billing and admin". Verified on disk at
   `Learning/Dentscribe/frontend`: `src/content/applications/AiCosting/PracticeList/` (`AICostingTab.tsx`,
   `PracticeCostBarChart.tsx`) plus the `src/state/services/ai-costing/` service layer wired into the
   dashboards, user details and the router. **The portal surface is per PRACTICE, not per model** — the
   per-model pricing table is backend. Never write "per-model".
   **The pipeline boundary did not move: "integrated against", never "built". No prompts, no workers, no Sikka.**

---

## The professional headline (added 2026-09-10)

An ATS checker flagged the CV for having no headline under the name. Added, because a title line
immediately below the name is the highest-weighted position in the document for both a parser and a human
skimmer, and it was empty.

**Current default in `master.tex`:**

> `Senior Software Developer | React, TypeScript, Node.js, AI Integration`

**This line is the single most JD-sensitive string on the CV. `/cv-tailor` MUST rewrite it per job
description**, mirroring the posting's exact job title wherever Tarun genuinely qualifies. A generic
headline is worth much less than a matched one — matching the posting's own title string is the whole
point of having the line.

**Two rules on the wording:**
1. **The title half must stay a real title he holds.** "Senior Software Developer" is real. A JD's exact
   title may be used when he qualifies for it. Never invent seniority.
2. **The keyword half is skills, never a second title.** The checker's own suggestion was *"Senior
   Software Developer | React, TypeScript, AI Integration Specialist"* — **"AI Integration Specialist"
   was deliberately rejected.** It reads as a second job title, and LLM integration is 🟡 (integrated, not
   authored) in this file. `AI Integration` as a capability is defensible; `AI Integration Specialist` as
   a title is not.

## CloudForestX bullets strengthened (2026-09-10)

Tarun judged *"Stale responses kept overwriting fresh ones. A request-id guard fixed it across 36
modules."* as reading like a small bug fix rather than senior work. He was right — the problem-then-fix
framing undersold it. Three changes, all from claims already verified in `cloudforestx/cv-truth-table.md`:

- **Restored truth-table bullet 3, which had been missing from the CV entirely:** *"Architected global
  account and month filters in Redux Toolkit: one selection, 40 dashboards."* 🟢, grounded in
  `store/accountSlice.ts` (`ALL_VALUE`, `defaultCurrency`), `store/monthSlice.ts` and typed `RootState`
  selectors. **This is the strongest architecture bullet the project has** and it was simply absent.
- **Reframed the request-id bullet from a bug to a layer:** *"A typed API layer over 36 service modules,
  with request-id guards against stale-response races."* Same fact (`APIService` → `HttpService` → 34
  domain services, `hooks/useFetchData.tsx` `requestIdRef`), stated as the thing he built rather than the
  thing that broke. The truth table already notes the honest version beats the banned TanStack Query claim.
- **Added two verified numbers that were sitting unused:** **470** typed source files (356 `.tsx` + 114
  `.ts`, zero JS) on the SPA bullet, and the **18** scheduled AWS jobs on the ingestion bullet.

CloudForestX now runs **6** bullets, matching Dwellworks and DentScribe. **The 🔴 boundary is unchanged:**
detection, rightsizing and recommendation algorithms are never his.
