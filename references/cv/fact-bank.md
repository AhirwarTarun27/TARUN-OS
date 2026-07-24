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

**Backend** — Node.js 🟢 (CloudForestX ingestion + APIs; raised 2026-07-24) · PostgreSQL 🟢 ·
Sequelize 🟢 · REST APIs 🟢 · Express 🟢 (CloudForestX backend) · SignalR 🟢 (Dwellworks) ·
Socket.IO 🟢 (CloudForestX) · WebSockets 🟡 · MongoDB 🟡 (MERN / education — **not** production)

> **NestJS removed from the Skills list on 2026-07-24 on Tarun's instruction**, and from the DentScribe
> Tech Stack line with it. It was only ever 🟡 (the portal *integrated against* a NestJS API; he did not
> write it), so listing it invited a question with no upside. **Do not re-add it to Skills.** He can still
> describe the backend accurately in the room — see `dentscribe/03-portal-architecture.md` §6.

**AI & GenAI** — LLM Integration 🟡 (DentScribe portal consumed the pipeline) · OpenAI API 🟡 ·
speech-to-text / Whisper 🟡 (integrated) · AI Agents & Agentic Workflows 🟢 (his AIOS) · MCP 🟢 ·
Prompt Engineering 🟢 · Subagent orchestration 🟢 · Context engineering 🟢 ·
AI-Assisted Development 🟢 · Claude Code 🟢 · GitHub Copilot 🟢 (certified)

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

| JD says | Use (all in the allow-list) |
|---|---|
| state management | Redux, Redux Toolkit, Zustand, Context API, TanStack Query |
| server state / data fetching / caching | TanStack Query (React Query), Axios |
| API integration / RESTful services / consuming APIs | REST APIs, Axios data layer |
| API development / building endpoints | Node.js + PostgreSQL endpoints (CloudForestX only — 🟡, "contributed") |
| real-time / live updates / websockets | SignalR, WebSockets |
| unit / component testing, TDD | React Testing Library, Vitest |
| SPA / single-page app | React SPA |
| responsive / mobile-first / cross-browser | Responsive Design, IE11 support |
| performance / speed / web vitals | Core Web Vitals, code-splitting, lazy loading, bundle optimization, memoization |
| accessibility / a11y | WCAG, ARIA |
| SSR / SSG / static generation | Astro (SSG), Next.js |
| component library / design system | reusable typed components, custom hooks, MUI |
| GenAI / LLM / AI-powered features | LLM integration, OpenAI API, prompt engineering |
| AI agents / agentic / workflow automation | AI Agents & Agentic Workflows, MCP, Claude Code, subagent orchestration |
| cloud / AWS | AWS (Lambda, S3, EFS, EC2) — 🟡, integration/UI scope |
| legacy modernization / migration / micro-frontend-ish | server-to-client hydration layer, legacy-to-React migration (Dwellworks) |
| enterprise SaaS / multi-tenant / B2B | Dwellworks, CloudForestX, DentScribe, MyWorkMyDay (all enterprise SaaS) |

---

## Per-project fixed facts (immutable)

| Project | Team | Period | Domain | Metrics (immutable) | Boundary |
|---|---|---|---|---|---|
| **Dwellworks** | 12 | **Jun 2025 – Present** · US | Corporate relocation platform | **20 webpack bundles** (verified) · 7 error boundaries | All frontend 🟢 + client-facing 🟢. No backend (.NET dropped on purpose). **Shadow resource under Navnit Singh** — verify work via `git log --author="avnit" --since=2025-06-01`, never by Tarun's own name (returns zero). |
| **CloudForestX** | 6 | **Jul 2023 – May 2025** | AWS cloud cost optimization, 200+ accounts | **200+ accounts · 470 TS files · 40 pages · 36 services** (40% bundle claim DELETED 2026-07-24) | Frontend 🟢. **Node ingestion + REST APIs 🟢** (raised from 🟡 on Tarun's instruction 2026-07-24 — he owns the STS→SDK→Postgres→API path). **Analysis/recommendation algorithms 🔴 — never claim them.** UI verbs only on waste-detection, rightsizing and power-scheduling. |
| **DentScribe** | 10 | **Oct 2022 – Jun 2023** · US | AI dental documentation, saves 40-50 min/visit | 40-50 min/visit · **317 TS files · 19 surfaces · 10 slices** | Portal + admin 🟢. **AI pipeline (Whisper→GPT→writeback) 🟡/🔴 — integrated, not authored.** NestJS/PostgreSQL/S3/OpenAI stay on the stack line as project context but are 🟡 for him. |
| **MyWorkMyDay** | 7 | **Apr 2022 – Sep 2022** | HR SaaS, 20+ clients | **-50% API calls 🟡 · 20+ clients** (3.2s→1.1s DELETED 2026-07-24) | Frontend 🟢. **No repo exists on this machine — confirmed 2026-07-24, searched all of `Documents/`.** Defensible by *mechanism only*, never by file. See `project-knowledge-base/myworkmyday/defense-notes.md`. |

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
- **Headline (summary) title:** Senior Full-Stack Developer · **4+ years** in the JavaScript ecosystem
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
- One idea per bullet, ~15-25 words, complete phrasing, quantified where a real number exists.
- The template (`master.tex`, RenderCV/charter) stays. Its only real ATS risk is the two-column date
  rows (paracol); RenderCV is widely ATS-tested, so keep it, but if a specific ATS is known to choke,
  the fallback is a single-column date-inline variant — note it, do not silently restructure.
