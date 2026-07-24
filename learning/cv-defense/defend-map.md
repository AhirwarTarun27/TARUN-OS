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

## Dwellworks (Team 12) — all 🟢 · **FULL DEEP-DRILL**

| Bullet | Color | Grounding | Drill |
|---|:--:|---|:--:|
| Owned Odin front end, 20+ modules, React + Vue | 🟢 | kb dwellworks/00 §7; Odin webpack bundles | D20 |
| App state (Redux, React Hooks) + Axios layer | 🟢 | kb §7 (Redux-vs-hooks, axios service layer) | D20 |
| Server-to-client hydration + legacy pages → React | 🟢 | kb §7 (`window.globalObject`); Odin Razor surface | D20 |
| Real-time notifications + messaging (SignalR) | 🟢 | kb §7 (SignalR) | D20 |
| Perf + Webpack code-splitting + IE11 | 🟢 | kb §8 (IE11, 20 bundles) | D20 |

_No backend claims here (we dropped .NET on purpose). **Full deep-drill: every bullet to explanation level —
🟢 means "you built it," not "skip it."** Drill the domain (relocation lifecycle) + the architecture until
you can narrate any line without notes._

## CloudForestX (Team 6) — **FULL DEEP-DRILL**

| Bullet | Color | Grounding | Drill |
|---|:--:|---|:--:|
| React/TS SPA → real-time AWS dashboards | 🟢 | kb cloudforestx/00 §5 | D21 |
| Data-viz layer (charts, gauges, geo maps) from Figma | 🟢 | kb §5 (visualizations) | D21 |
| Onboarding flows + global account/date filtering | 🟢 | kb §5 | D21 |
| Node.js + PostgreSQL endpoints (serve cost data) | 🟡 | kb §5 ("contributed some backend APIs") | D33 |
| **Cut bundle 40% + 95+ Core Web Vitals** | 🔴 | kb Module 5 (perf reframe — the CV's weakest spot) | D11 |
| **Idle-detection + rightsizing UI (EC2/Lambda/EFS/S3)** | UI 🟢 / engine 🔴 | kb §3, §5 — you built the views, not the analysis engine | D10 |

_**Full deep-drill: the whole project to explanation level** — the 🔴 engine + numbers and the 🟢 frontend alike._

## DentScribe (Team 10)

| Bullet | Color | Grounding | Drill |
|---|:--:|---|:--:|
| Review-and-sign surface for AI SOAP notes | 🟢 | kb dentscribe/00 §7 (portal) | D22 |
| SOAP report editor (sections, find-replace, perio) | 🟢 | kb §5; portal | D22 |
| Appointment calendar + multi-stage workflow | 🟢 | kb §7; portal calendar surface | D22 |
| Admin portal + per-model AI cost tracking | 🟢 | kb §3 (AiCosting is portal work — genuinely yours) | D22 |
| Portal: 10 Redux slices, role-gated routing, 401 middleware | 🟢 | kb §7 (store, router, apiMiddleware) | D22 |
| **"recording → AI SOAP → PMS writeback"** | wiring 🟢 / pipeline 🔴 / writeback 🟡 | kb Module 2 (Whisper→GPT→JSON), Module 4 (Sikka/PQL) | D12 |

## MyWorkMyDay (Team 7) — repo pending

| Bullet | Color | Grounding | Drill |
|---|:--:|---|:--:|
| Core surfaces (dashboard, payroll, analytics) | 🟢 | CV; repo pending | D70 |
| Reusable typed components + custom hooks | 🟢 | CV; repo pending | D70 |
| Role-based access control (RBAC) | 🟢 | CV; repo pending | D70 |
| **Cut API calls 50% + load 3.2s → 1.1s** | 🟡 | CV number; repo pending — must justify the mechanism | D70 |

## Projects (personal — all 🟢, fully yours)

| Project | Color | Grounding | Drill |
|---|:--:|---|:--:|
| GradeJar — local-first gradebook, zero backend | 🟢 | `MyProjects/GradeJar` (astro.config, localStorage, SSG) | D40 |
| JsonBeam — fast, ad-free JSON formatter | 🟢 | `MyProjects/Jsonbeam` (Astro, Cloudflare Workers) | D41 |

## Skills clusters (defend what a keyword-scan will probe)

| Cluster | To defend | Color | Drill |
|---|---|:--:|:--:|
| Frontend (React, Next, Vue, TS, Astro…) | Next.js, Vue, Astro | 🟡/🟢 | D30, D31, D34 |
| Backend (Node, PostgreSQL, REST, SignalR) | the Node/PG boundary | 🟡 | D33 |
| AI & GenAI (LLM, OpenAI API, prompt eng, agents, MCP, Claude Code) | LLM integration 🟡 · agents/MCP/Claude Code 🟢 (your AIOS proves it) | 🟡/🟢 | D32 |
| Cloud & Deployment (AWS, Cloudflare, Docker) | the AWS cost model | 🔴/🟢 | D10, D34 |
| Quality & Perf (CWV, bundle opt, SEO) | the 40% / CWV | 🔴 | D11 |

---

**Reading this map before a session:** find the drill you're on, read only its rows, note the color. 🔴 and
🟡 rows carry a boundary sentence you must be able to say. 🟢 rows just need to come out sharp — and for
**Dwellworks + CloudForestX, every row is drilled deep** regardless of color.
