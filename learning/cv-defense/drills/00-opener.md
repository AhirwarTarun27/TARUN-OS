# Drill D00 — The Opener (T0)

**Goal:** deliver "tell me about yourself" and each project's 30-second pitch cold, smoothly, without
fading — and survive the standard opener follow-ups. The highest-frequency moment in any interview.

**Format:** read the teach block once, then close it and answer **closed-book**. Claude grades /10, asks
your Confidence /5, logs to `../progress.md`, then opens the floor for your doubts.

---

## Teach block (read once, then close)

### The 30-second self-pitch (model — make it your voice)

> I'm a full-stack developer with about four years at ThinkSys, working mostly in the JavaScript
> ecosystem: React, TypeScript, Vue, and Node. I've spent that time on large, data-heavy enterprise SaaS —
> a corporate-relocation platform, a cloud cost-optimization tool, an AI dental-documentation product, and
> an HR system. My core strength is owning complex React front ends end to end and building the Node and
> PostgreSQL APIs behind them. On the side I build and ship my own web products, live on their own domains,
> so I'm comfortable taking something from idea to production and search-ranked. Right now I'm after a
> frontend-heavy full-stack role where I can go deep on product.

**Why it's built this way:** identity first (full-stack, JS), then the domains (specific, not generic), then
the honest strength (frontend end-to-end + the APIs behind it — matches the CV boundary), then what you
want. Nothing here for an interviewer to puncture.

### Per-project 30-second openers — *what it is → your role → one hook*

**Dwellworks**
> Dwellworks is a corporate-relocation platform. When a company moves an employee abroad, it runs the whole
> move: a local consultant, finding the family a home and a school, the lease, the visa, through to
> move-out. I owned the front end of the flagship app, Odin — 20-plus feature areas in React and Vue. The
> interesting part was scale plus legacy: a big enterprise codebase that still had to support IE11, a
> server-to-client hydration layer feeding data into React views, and real-time updates over SignalR.

**CloudForestX**
> CloudForestX is a cloud cost-optimization platform. Enterprises run hundreds of AWS accounts and waste a
> big chunk of the bill on idle and oversized resources. It pulls in all their usage and billing data and
> shows exactly where the waste is, plus rightsizing and reservation recommendations. I built the React and
> TypeScript dashboard that turns those huge multi-account datasets into something a finance or DevOps team
> can act on — the visualizations, the filtering — and I contributed some of the Node and PostgreSQL
> endpoints that serve the data.
> *(Boundary: "contributed some endpoints," not "built the backend." Never claim the analysis engine.)*

**DentScribe**
> DentScribe is an AI documentation product for dental practices. It records the appointment, turns the
> conversation into a clinical SOAP note with AI, and files it back into the practice's own software
> automatically. I built the portal — where the dentist reviews and signs the AI-generated note — plus the
> report editor, the calendar, and the admin side. The clever part is that the note is useless unless it
> lands back in the practice's system, so a lot of the value is that writeback.
> *(Boundary: you built the portal onto the AI pipeline; you did not write the pipeline or the Sikka layer.)*

**MyWorkMyDay**
> MyWorkMyDay is an HR management SaaS serving 20-plus business clients — employee management, payroll,
> analytics. I built core surfaces and reusable component and hook libraries, and did a round of performance
> work, cutting API calls and load time with debouncing and memoization.

---

## Closed-book quiz

**A. Deliver the self-pitch (weight 40%)**
1. "Tell me about yourself." Target ~30 seconds. Smooth, no filler.

**B. Deliver the project openers (weight 40%)**
2. "Tell me about a project you worked on." Pick one, deliver its full opener.
3. Rapid: the one-sentence "what is it" for each of the other three.

**C. Follow-up ladder (weight 20%)**
4. "You call yourself full-stack, but it sounds frontend-heavy — which is it?"
5. "Which project are you proudest of, and why?"
6. "Why are you looking to move?" Keep it forward-looking. Never trash the employer, and never leak any
   ThinkSys-internal or work-email detail (hard boundary).

---

## Grading key — *Claude only, don't read before answering*

- **A (40%):** Landed in ~30s? Identity → domains → honest strength → the ask. Deduct for rambling, for
  opening with a tech list instead of a story, or for overclaiming the backend.
- **B (40%):** Each opener = what it is (plain) → your role → one technical hook. **Full marks only if the
  CloudForestX and DentScribe boundaries are stated** (contributed endpoints; built the portal onto the
  pipeline). A missing boundary caps the section at 6 — that omission is exactly the puncture.
- **C (20%):** Q4 → "I own the front end end-to-end and build the APIs behind it; I lean frontend but I'm
  comfortable across the stack" (matches the CV). Q5 → any project with a *specific* reason, not "it was
  interesting." Q6 → growth / scope / stack, forward-looking, no employer trash, no internal detail.

Log Score /10 + Confidence /5 + gaps to `../progress.md`. Gate: ≥ 7 and ≥ 3 marks D00 ✅.
