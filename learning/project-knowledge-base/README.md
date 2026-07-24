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
| MyWorkMyDay (HR SaaS) | Awaiting repo | `myworkmyday/` |
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
| 4 | Frontend architecture | My domain — drilled hardest for a frontend role |
| 5 | Frontend performance (honest reframe) | Where the CV is weakest — must be truthful |
| 6 | Tradeoffs & what I'd improve | Senior differentiator |
| 7 | Behavioral / STAR | Every interview has this |

Reference artifacts, built when their module comes up (not tested directly):
`cloudforestx/architecture-diagram.md` (Module 1) and `cloudforestx/cv-truth-table.md` (Module 5).

## Dwellworks module ladder

Nine repos, one platform. The domain (corporate relocation) is unfamiliar enough that it gets the full
Module 0 treatment before anything technical.

| # | Module | Why it's here |
|---|--------|----------------|
| 0 | Product & business context | The domain is unfamiliar; every interview opens here |
| 0.5 | Narrative & pitch | The 30s / 2min scripts + honest role framing |
| 1 | Ecosystem & repo map | 9 repos — how they fit and why they're split |
| 2 | Odin backend architecture | MVC5 + Web API 2, EF6, Unit of Work, Ninject, OWIN |
| 3 | **Odin frontend architecture** | My domain — 20 webpack bundles, `window.globalObject`, Redux vs hooks, IE11. Drilled hardest |
| 4 | Identity & auth across services | JWT-RSA issue/verify split, Redis revocation, the role model |
| 5 | The .NET Core microservices | Property, Stats, ECoordService, DsInternal, NetworkManagement |
| 6 | Integrations & async | ServiceEngine / Destination / Aires, Azure Queues, change trackers, batch jobs, SignalR |
| 7 | Data & persistence | EF6 vs EF Core, migrations, soft deletes, three databases |
| 8 | Tradeoffs & what I'd improve | Legacy .NET 4.6.1, IE11, Node 12, 100+ DbSets — the senior differentiator |
| 9 | Behavioral / STAR | Every interview has this |

Reference artifact, built alongside Module 0.5 (not tested directly): `dwellworks/cv-truth-table.md` —
what the CV claims vs. what the code backs, so a frontend-heavy role is never caught defending backend
work it didn't do.

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
| 3 | **Portal frontend architecture** | My domain — 10 Redux slices, role-gated route allow-lists, the global 401 middleware. Drilled hardest |
| 4 | Sikka & PMS integration | PQL, the requestKey lifecycle, writeback + retry + status polling. The domain moat |
| 5 | Auth, security & PHI | JWT, 2FA, trusted devices, login lockout, `officeId` tenancy, data purge — it's medical data |
| 6 | Billing & subscriptions | Stripe tiers, trials, coupons, pause/cancel, and per-model AI cost tracking |
| 7 | Tradeoffs & what I'd improve | A 12k-line service, `synchronize: true` in production, no migrations, unversioned prompts — the senior differentiator |
| 8 | Behavioral / STAR | Every interview has this |

Reference artifact, built alongside Module 0.5 (not tested directly): `dentscribe/cv-truth-table.md`.

## Guardrails

- **Never invent.** If the code is silent, the doc says so. No fabricated metrics.
- **Truth over flattery.** CV claims the code can't back get reframed or dropped (`cv-truth-table.md`),
  so I'm never caught defending something I didn't build.
- **Current status** always lives in `progress.md`.
