# Drill D00 — The Opener

**Phase 1, sitting 1.** The highest-frequency moment in any interview.

**Goal:** deliver "tell me about yourself" and each project's 30-second pitch cold, smoothly, without
fading, and survive the standard opener follow-ups.

**Format:** read the teach block once, then close it and answer **closed-book**. Coverage gate:
mechanism → 2 follow-ups → boundary, no freeze. Confidence /5 and gaps go to `../progress.md`.

> ### ⚠ Rewritten 2026-07-31 — the old version rehearsed four deleted claims
>
> This file was seeded before the CV rewrite of 2026-07-24 and never re-synced. It taught **"a
> server-to-client hydration layer"** (banned word — Odin uses `ReactDOM.render`, there is no SSR),
> **"I owned the front end"** (removed claim), **"the report editor, the calendar"** (both deleted —
> `SOAPNoteTab` is read-only, `BigCalendar` is a 15-line wrapper with events commented out), and
> **"cutting load time with memoization"** (the exact category error the 3.2s→1.1s number was killed
> for). It also *understated* CloudForestX, which was raised from "contributed" to **"built"** on the
> same date.
>
> **Four deleted claims, in the first drill of the sequence.** Lesson for the whole system: when a
> claim is removed, grep every file that teaches it.

---

## Teach block (read once, then close)

### The 30-second self-pitch

> I'm a full-stack developer with about four years at ThinkSys, working mostly in the JavaScript
> ecosystem — React, TypeScript, Vue and Node. That time has been on large, data-heavy enterprise SaaS:
> a corporate relocation platform, a cloud cost-optimization tool, an AI dental documentation product,
> and an HR system. My core strength is complex React front ends, and on CloudForestX I worked across
> the PostgreSQL and Node layer behind them as well. On the side I build and ship my own web products,
> live on their own domains, so I'm comfortable taking something from idea to production and
> search-ranked. Right now I'm after a frontend-heavy full-stack role where I can go deep on product.

**Why it's built this way:** identity first, then the domains (specific, not generic), then the honest
strength with **one named project carrying the full-stack claim**, then what you want. Nothing here for
an interviewer to puncture.

### Per-project 30-second openers — *what it is → your role → one hook*

**Dwellworks**
> A corporate relocation platform. When a company moves an employee abroad, it runs the whole move: a
> local consultant, finding the family a home and a school, the lease, the visa, through to move-out.
> I ship React features across the flagship app's front end — **20 independently-mounted React bundles
> embedded in a legacy .NET Razor monolith**, which still has to support IE11. I built the shared
> component library those bundles all consume, and a real-time operations dashboard on Redux and
> SignalR.
>
> *Never: "hydration" · "code-splitting" · "I own the front end" · "TypeScript" · SignalR "to families".*

**CloudForestX**
> A cloud cost-optimization platform. Enterprises run hundreds of AWS accounts and waste a large chunk
> of the bill on idle and oversized resources. It pulls in their usage data and shows exactly where the
> waste is, with rightsizing and reservation recommendations. I built the React and TypeScript SPA
> behind **40 cost dashboards**. On the data side it ingests EC2, EBS, S3 and CloudWatch across
> **200+ accounts through STS cross-account roles** into PostgreSQL — **I wrote the STS credential
> factory** that makes that cross-account access work.
>
> *Boundary, and say it here rather than waiting: "I built the surface that shows the recommendation.
> I didn't write the analysis that produces it."*
>
> ### ⚠ Updated 2026-08-12 — do NOT say "I built the Node ingestion service"
>
> That bullet was **reverted to 🟡, re-grade pending, on 2026-08-09** (`defend-map.md`): the evidence
> proves the code exists and does those things, not that he wrote it, and asked directly he could not
> tell. **Until it is re-graded: describe the architecture, let the follow-up define scope, say what
> you actually remember.** **STS specifically is 🟢** — he wrote the factory (kb `04` §5), so that
> half stays. Re-grade is **due before 15 Sept**, at `D21`.

**DentScribe**
> An AI documentation product for dental practices. It records the appointment, turns the conversation
> into a clinical SOAP note, and files it back into the practice's own management software
> automatically. I built the React and TypeScript portal — **19 surfaces across 4 roles**, multi-tenant
> — including the report review surface where the dentist reviews the AI-generated note before it goes
> out. The clever part is that the note is worthless unless it lands back in the practice's system, so
> a lot of the product value is that writeback.
>
> *Boundary: "I built the portal onto the pipeline. I didn't write the transcription workers, the
> prompts, or the practice-management integration."*
> *Never: "the note editor" · "the calendar" · "find and replace" · "the portal polled".*

**MyWorkMyDay**
> An HR management SaaS serving 20-plus business clients — employee management, payroll, performance
> analytics. I built core surfaces plus reusable typed components and custom hooks, and implemented
> role-based access control across both route access and in-page actions. I also cut redundant search
> API calls by about half with request debouncing.
>
> *It's the oldest and smallest entry. **Its job is trajectory, not depth** — answer, then connect
> forward to CloudForestX and move on. Never bind memoization to load time.*

---

## Closed-book quiz

**A. The self-pitch (40%)**
1. "Tell me about yourself." Target ~30 seconds. Smooth, no filler.

**B. The project openers (40%)**
2. "Tell me about a project you worked on." Pick one, deliver the full opener.
3. Rapid: the one-sentence "what is it" for each of the other three.

**C. Follow-up ladder (20%)**
4. "You call yourself full-stack, but this sounds frontend-heavy. Which is it?"
5. "Which project are you proudest of, and why?"
6. "Why are you looking to move?" Forward-looking. Never trash the employer, and **never leak any
   ThinkSys-internal or work-email detail** — hard boundary.

---

## Grading key — *Claude only, don't read before answering*

- **A (40%):** ~30s. Identity → domains → honest strength → the ask. Deduct for rambling, for opening
  with a tech list instead of a story, and for **overclaiming** the backend.
  **The 2026-07-24 "underclaiming CloudForestX" deduction is SUSPENDED** — the Node bullet was reverted
  to 🟡 on 2026-08-09. Until `D21` re-grades it, *"worked across the Node and PostgreSQL layer"* is the
  correct register and **"I built the Node ingestion service" is the deduction**, not the target.
- **B (40%):** each opener = what it is (plain) → role → one hook. **The CloudForestX and DentScribe
  boundaries must be stated unprompted. A missing boundary fails section B** — that omission is exactly
  the puncture the drill exists to close.
  **Instant fail on any banned word:** *hydration · code-splitting · TypeScript-at-Dwellworks · "I own
  the front end" · the note editor · the calendar · "the portal polled".* Stop him, name it, restart
  that opener.
- **C (20%):** Q4 → *"I lead with the front end, and on CloudForestX I worked across the Node and
  PostgreSQL layer too"* — one named project carrying the claim, in the 🟡 register until re-graded.
  Q5 → any project with a **specific** reason. Q6 → growth/scope/stack, no employer trash, no internal
  detail.

**Coverage gate:** all three sections attempted, both boundaries landed, no banned word, no freeze.
Log the gate + Confidence /5 + gaps to `../progress.md`.
