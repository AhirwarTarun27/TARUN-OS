# Project Knowledge Base

Interview-prep mastery system for the projects on my CV. I study one module, get tested on it
closed-book, and my **score + confidence** get recorded before I move on. Built for the active,
remote-first job switch — priority #1.

> **Private repo only.** This folder contains analysis of proprietary employer code (CloudForestX /
> ThinkSys, Dwellworks, DentScribe). It is **tracked in git** so it syncs across machines — and
> `TARUN-OS` is a **private** GitHub repo. That is the only reason this is safe.
>
> **What goes in:** architecture, patterns, repo and project names, tech stack, domain vocabulary.
> **What never goes in:** connection strings, RSA/JWT keys, API keys, private-feed credentials,
> customer or transferee names, real ticket contents, database dumps, or any value copied out of a
> config file. **If this repo is ever made public, this folder comes out first.**
>
> **DentScribe adds two rules**, because it's a medical product built on an AI pipeline:
> no patient data, practice names or real IDs of any kind (dental PHI), and **the prompt files under
> `modules/upload/instructions/` are the product's core IP** — their existence and purpose are
> documented, their contents are never copied.

## How it works — the loop

1. Claude authors one **study module** (grounded — every claim traces to a real repo file).
2. I read it, then say **"ready"**.
3. Claude tests me **closed-book** (I don't look at the module while answering): explain-it questions,
   rapid-fire facts, and one interviewer-style push-back.
4. Claude grades a **Score /10**, asks my **Confidence /5**, and logs both + my gaps to `progress.md`.
5. **Gate:** Score ≥ 7 **AND** Confidence ≥ 3 → next module. Otherwise re-read the weak spots and retest.
6. After all modules pass → **full mock interviews** that stitch everything together.

**Confidence scale:** 1 no idea · 2 shaky · 3 can explain the basics · 4 confident + handle follow-ups · 5 could teach it.

## Projects

| Project | Status | Folder |
|---|---|---|
| CloudForestX (Cloud Cost Optimization) | **In progress** | `cloudforestx/` |
| Dwellworks (Relocation / Destination Services) | **In progress** | `dwellworks/` |
| DentScribe (AI Dental Docs) | **In progress** | `dentscribe/` |
| MyWorkMyDay (HR SaaS) | **Mechanism-only defense** ✅ · repo promised, not yet shared | `myworkmyday/defense-notes.md` |
| ThinkSys Website | Awaiting repo | `thinksys-website/` |

## The module shape (standard from Dwellworks onward)

Every project starts with **two** opening modules, not one:

- **Module 0 — Product & business context.** What the product is, the domain it lives in, who buys it,
  who uses it, and why it exists. Tested on its own, because you cannot pitch a domain you can't explain,
  and the interviewer usually doesn't know the domain either.
- **Module 0.5 — Narrative & pitch.** The 30-second and 2-minute scripts, your role, the follow-ups.

CloudForestX predates this split — its `00-narrative.md` folds both together. **Queued for a retro-fit**
so both projects share one shape; not done yet.

## CloudForestX module ladder

| # | Module | Why it's here |
|---|--------|----------------|
| 0 | Narrative & pitch | Opens every interview |
| 1 | System architecture | Senior expectation; grounds everything |
| 2 | AWS access & cost model | The "wow" material unique to this domain |
| 3 | Analysis engine | The product's actual value |
| 4 | **Frontend architecture & the data layer** ✅ **written** | My domain — 470 TS files, RTK global filters, `useFetchData` race guard, `useEcharts`, **plus the STS→SDK→PostgreSQL ingestion path**. **Carries the per-CV-bullet drill sheet (§8).** Drilled hardest |
| 5 | Frontend performance (honest reframe) | **Largely resolved 2026-07-24** — the 40% bundle claim was deleted rather than reframed, since TanStack Query was never installed and CRA was never ejected. What remains: the no-test-suite answer (kb 04 §7) |
| 6 | Tradeoffs & what I'd improve | Senior differentiator |
| 7 | Behavioral / STAR | Every interview has this |

Reference artifacts: `cloudforestx/cv-truth-table.md` ✅ **written** — claim vs. code, the three claims
deleted on 2026-07-24 (RTL coverage, the 40%/TanStack bundle line, Zustand), and the safe-to-quote
number list. `cloudforestx/architecture-diagram.md` (Module 1) still to build.

## Dwellworks module ladder

Nine repos, one platform. The domain (corporate relocation) is unfamiliar enough that it gets the full
Module 0 treatment before anything technical.

| # | Module | Why it's here |
|---|--------|----------------|
| 0 | Product & business context | The domain is unfamiliar; every interview opens here |
| 0.5 | Narrative & pitch | The 30s / 2min scripts + honest role framing |
| 1 | Ecosystem & repo map | 9 repos — how they fit and why they're split |
| 2 | Odin backend architecture | MVC5 + Web API 2, EF6, Unit of Work, Ninject, OWIN |
| 3 | **Odin frontend architecture** ✅ **written** | My domain — 20 webpack bundles, `window.globalObject`, Redux vs hooks, the shared library, SignalR Control Tower, error boundaries + Seq, GA4, IE11. **Carries the per-CV-bullet drill sheet (§10).** Drilled hardest |
| 4 | Identity & auth across services | JWT-RSA issue/verify split, Redis revocation, the role model |
| 5 | The .NET Core microservices | Property, Stats, ECoordService, DsInternal, NetworkManagement |
| 6 | Integrations & async | ServiceEngine / Destination / Aires, Azure Queues, change trackers, batch jobs, SignalR |
| 7 | Data & persistence | EF6 vs EF Core, migrations, soft deletes, three databases |
| 8 | Tradeoffs & what I'd improve | Legacy .NET 4.6.1, IE11, Node 12, 100+ DbSets — the senior differentiator |
| 9 | Behavioral / STAR | Every interview has this |

Reference artifact ✅ **written**: `dwellworks/cv-truth-table.md` — what the CV claims vs. what the code
backs, so a frontend-heavy role is never caught defending backend work it didn't do. It also records the
**five claims removed from the CV on 2026-07-24** because the repo contradicted them (hydration,
code-splitting, SignalR-to-families, TypeScript, "own the front end"), and the safe-to-quote number list.

## DentScribe module ladder

Two repos read (`backend-api/`, `frontend/`); a third — the mobile recording app — **exists and was not
read**, and is treated as a named boundary, never a guess. The domain (AI clinical documentation +
writeback into dental practice management software) is unfamiliar enough to get the full Module 0
treatment before anything technical.

| # | Module | Why it's here |
|---|--------|----------------|
| 0 | Product & business context | Dental documentation + PMS writeback is an unfamiliar domain, and "AI note-taker" is the answer that loses the room |
| 0.5 | Narrative & pitch | The 30s / 2min scripts + honest role framing |
| 1 | System architecture | One NestJS repo, seven deployed processes, SNS→SQS, ECS via AWS Copilot |
| 2 | The AI pipeline | Whisper → GPT analysis → JSON formatting. The product's actual value |
| 3 | **Portal frontend architecture** ✅ **written** | My domain — 19 surfaces / 4 roles, 10 Redux slices + `resetStore`, the 5-shape auth middleware, the 4-dimension access guard, the report review tabs, the pipeline boundary. **Carries the per-CV-bullet drill sheet (§10).** Drilled hardest |
| 4 | Sikka & PMS integration | PQL, the requestKey lifecycle, writeback + retry + status polling. The domain moat |
| 5 | Auth, security & PHI | JWT, 2FA, trusted devices, login lockout, `officeId` tenancy, data purge — it's medical data |
| 6 | Billing & subscriptions | Stripe tiers, trials, coupons, pause/cancel, and per-model AI cost tracking |
| 7 | Tradeoffs & what I'd improve | A 12k-line service, `synchronize: true` in production, no migrations, unversioned prompts — the senior differentiator |
| 8 | Behavioral / STAR | Every interview has this |

Reference artifact ✅ **written**: `dentscribe/cv-truth-table.md` — claim vs. code, the **four claims
deleted on 2026-07-24** (find-and-replace, "the note editor", polling, the operatories calendar), the
never-say table, and the two boundary sentences (AI pipeline · the mobile app).

## MyWorkMyDay — the one exception to the module shape

**No repo on this machine** (all of `Documents/` searched, 2026-07-24) — **Tarun will share it later**, so
this is interim. For now the project gets a single `defense-notes.md` instead of a module ladder, and it
runs on a different standard: the other three projects are defended by **pointing at a file**; this one is
defended by **explaining the mechanism**. The notes open with a **five-item re-verify list** for the day
the repo lands (TypeScript, Tailwind, the debounce behind the 50%, the two custom hooks, both RBAC levels).

That is not a lesser standard — an interviewer can't see any of these repos either, so a mechanism that
holds up *is* the proof. What fails here is a mechanism that doesn't, which is exactly why the
`3.2s → 1.1s via memoization` claim was deleted rather than reframed. The notes keep his own account and
the general web mechanisms strictly separated, and they end with the instruction that matters most for
this entry: **don't go deep, connect it forward to CloudForestX, and move on.**

## Guardrails

- **Never invent.** If the code is silent, the doc says so. No fabricated metrics.
- **Truth over flattery.** CV claims the code can't back get reframed or dropped (`cv-truth-table.md`),
  so I'm never caught defending something I didn't build.
- **Current status** always lives in `progress.md`.
