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
- Any metric value (40%, 95+, 50%, 3.2s→1.1s, 200+, 20+, team sizes, 40-50 min).
- Employers, job titles, dates, education, certifications, contact details.
- The authorship boundary — a 🟡 or 🔴 line may be re-worded but **never promoted into a "built/owned/architected" claim.**
- Nothing may appear that is not in the Allowed Vocabulary. **Empty beats invented.** A CV that
  shortlists him for a role he cannot defend in the room is a net loss.

If the JD demands something he does not have, it goes in the **honest gap list** in the `.notes.md`, never into the `.tex`.

---

## Allowed Vocabulary (the allow-list)

**Nothing outside this set may appear as a skill/technology in a tailored CV.** Defensibility flags:
🟢 built/owns · 🟡 integrated/contributed (claim fluency, not authorship) · 🔴 must be justified carefully.

**Frontend** — React.js 🟢 · Next.js 🟡 (portfolio-backed) · Vue.js 🟢 · TypeScript 🟢 · JavaScript ES6+ 🟢 ·
Redux 🟢 · Redux Toolkit 🟢 · Zustand 🟢 · Context API 🟢 · TanStack Query / React Query 🟢 · Axios 🟢 ·
React Hooks 🟢 · SPA architecture 🟢 · Astro 🟢 · Preact 🟢 · HTML5 🟢 · CSS3 🟢

**Backend** — Node.js 🟡 (contributed the CloudForestX aggregation APIs) · PostgreSQL 🟡 · REST APIs 🟢 ·
SignalR 🟢 (real-time, Dwellworks) · WebSockets 🟡 · NestJS 🟡 (integrated against, DentScribe) ·
Express 🟡 (MERN / education) · MongoDB 🟡 (MERN / education — **not** production)

**AI & GenAI** — LLM Integration 🟡 (DentScribe portal consumed the pipeline) · OpenAI API 🟡 ·
speech-to-text / Whisper 🟡 (integrated) · AI Agents & Agentic Workflows 🟢 (his AIOS) · MCP 🟢 ·
Prompt Engineering 🟢 · Subagent orchestration 🟢 · Context engineering 🟢 ·
AI-Assisted Development 🟢 · Claude Code 🟢 · GitHub Copilot 🟢 (certified)

**Cloud & Deployment** — AWS: Lambda, S3, EFS, EC2 🟡 (integrated/UI; **did not build the cost/analysis
engine** 🔴) · Cloudflare Workers 🟢 · Docker 🟡 (light)

**UI / Styling** — Material-UI (MUI) 🟢 · Tailwind CSS 🟢 · SASS/SCSS 🟢 · Responsive Design 🟢 · Figma 🟢 (consumed designs)

**Build & Tooling** — Webpack 🟢 · Vite 🟢 · Git 🟢

**Quality & Performance** — React Testing Library 🟡 · Vitest 🟡 · Core Web Vitals 🟢 · Bundle Optimization 🟢 ·
Performance Optimization 🟢 · SEO 🟢 · code-splitting 🟢 · lazy loading 🟢 · memoization 🟢

**Accessibility & Security** — WCAG 🟢 · ARIA 🟢 · XSS/CSRF Prevention 🟡

**Methods** — Agile 🟢 · MERN stack 🟢 (education) · cross-browser / IE11 support 🟢

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
| **Dwellworks** | 12 | Current | Corporate relocation platform | 20+ feature modules | All frontend 🟢. No backend (.NET dropped on purpose). |
| **CloudForestX** | 6 | — | AWS cloud cost optimization, 200+ accounts | 40% bundle 🔴 · 95+ CWV 🔴 · 200+ accounts | Frontend 🟢 + contributed Node/PG APIs 🟡. **Analysis engine 🔴 — never claim it.** |
| **DentScribe** | 10 | — | AI dental documentation, saves 40-50 min/visit | 40-50 min/visit | Portal + admin 🟢. **AI pipeline (Whisper→GPT→writeback) 🟡/🔴 — integrated, not authored.** |
| **MyWorkMyDay** | 7 | — | HR SaaS, 20+ clients | -50% API calls · 3.2s→1.1s 🟡 · 20+ clients | Frontend 🟢. Numbers 🟡 (repo pending — justify the mechanism). |

Project stacks are in `master.tex`. A tailored CV may reorder projects to lead with the JD's emphasis
(AI role → DentScribe first; cloud role → CloudForestX first; frontend-architecture role → Dwellworks
first) but must not move a bullet between projects.

---

## Immutable set (never tailored)

- **Contact:** Noida, India · ahirwartarun095@gmail.com · +91-9106177149 · linkedin.com/in/ahirwartarun · github.com/AhirwarTarun27 · tarunahirwar.com
- **Employer:** ThinkSys Inc, Noida · **Senior Software Developer** · Apr 2022 – Present (single employer; all four projects nest inside it)
- **Headline (summary) title:** Senior Full-Stack Developer · **4+ years** in the JavaScript ecosystem
- **Education:** Full Stack Web Development, Masai School (Jul 2021 – Apr 2022) · B.Tech, Marwadi University, Rajkot (Aug 2013 – Jul 2017, CGPA 7.15/10)
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
