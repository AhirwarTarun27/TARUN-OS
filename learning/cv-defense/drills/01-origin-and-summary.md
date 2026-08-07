# Drill D01 — Origin & the Summary line

**Phase 1, sitting 2.** New 2026-07-31.

**Goal:** defend the parts of the CV that had **zero material anywhere in the system** and get asked in
almost every first round — the career change, the title, and the four lines of Summary that sit above
everything else on the page.

> **Why this drill exists.** `defend-map.md` opens with *"no line goes to an interview un-mapped."*
> Four lines were exceptions: the Summary paragraph, the unbroken job title, the Mechanical Engineering
> degree, and Education/Certifications. Every one of them is read before a single project bullet.

---

## Teach block (read once, then close)

### 1. Mechanical Engineering → developer

**The facts on the page:** B.Tech Mechanical, Marwadi University Rajkot, **Aug 2013 – Jul 2017**.
Masai School full-stack, **Jul 2021 – Apr 2022**. ThinkSys, **Apr 2022 – present**.

**They will ask two things, and the second one is the real one:**

1. *"Why the switch from mechanical?"*
2. *"What were you doing between 2017 and 2021?"* — **a four-year gap sits on the page in plain sight.**

> ### ⚠ THIS SECTION IS UNFILLED — Tarun supplies it, Claude never drafts it
>
> **Nothing in this repo records what happened between Jul 2017 and Jul 2021.** It will not be
> invented, guessed at, or softened into a generic story. Bring the real answer to the sitting and it
> gets written in here, in your words.
>
> **The shape that works, whatever the content:** *one sentence on what you were doing → one sentence
> on what made you switch → immediately forward into Masai and the four years since.* Total: fifteen
> seconds. **The failure mode is not the gap. It's treating the gap as something to apologise for** —
> length and defensiveness are what make an interviewer probe. A flat, confident, short answer closes
> it permanently.

**On the degree itself, one useful framing:** mechanical engineering is a modelling discipline —
constraints, tolerances, tradeoffs, systems that fail at their weakest joint. That is not a stretch and
it is not a gimmick, so say it once and don't lean on it. **Four years of shipping software is the
argument. The degree is a footnote.**

### 2. The title span — `Senior Software Developer, Apr 2022 – Present`

**Read it the way an interviewer does:** one unbroken title, starting four months after a nine-month
bootcamp. It reads as *"Senior from day one."*

This is a **risk, not a lie** — the CV states one current title over one continuous employment, which is
how services-company CVs are normally written. But you need a prepared answer, because being asked this
cold and improvising is how a good candidate loses a room.

**The two honest components:**
- **Title inflation is normal at services companies**, and you know it. Saying so before they do is
  disarming.
- **What actually changed** between MyWorkMyDay (2022, building assigned surfaces) and Dwellworks
  (2025, client-facing: requirements, design sessions, demos, release coordination). **That progression
  is the real answer** — scope and ownership, not the label.

> Model: *"That's my current title over one continuous stint — I didn't join as a senior. Titles move
> fast at services companies, so I'd rather point at what changed: on my first project I was building
> assigned surfaces. Now I'm in requirements and design sessions with the client directly, demoing, and
> coordinating releases across time zones."*

**Do not volunteer this one.** Unlike the boundaries, this answer is only strong as a response. Raising
it unprompted invites a doubt that most interviewers were not going to have.

### 3. The Summary paragraph — line by line

> *"Senior Full-Stack Developer with **4+ years** in the JavaScript ecosystem (React, Next.js, Vue,
> TypeScript, Node.js), building data-heavy enterprise SaaS **end to end, from PostgreSQL and Node APIs
> to fast, typed React interfaces**. Experienced with **AI-powered products, Large Language Model (LLM)
> integration, context engineering, and AI-assisted development.**"*

| Fragment | Status | What to know |
|---|:--:|---|
| **"4+ years"** | 🟢 | Apr 2022 → now = 4 yr 3 mo. The number is correct. Don't hedge it. |
| **"Next.js, Vue"** | 🟡 | Both are the thin end of the Frontend line. See `../skills-defense.md`. **Don't let the Summary be where you first meet these words.** |
| **"end to end, from PostgreSQL and Node APIs to typed React"** | 🟡 | **The one that needs care.** |
| **"AI-powered products, LLM integration"** | 🟡 | DentScribe *consumed* a pipeline. Same boundary as D12. |
| **"context engineering"** | 🟢 | TARUN-OS. Concrete answer available — use it. |
| **"AI-assisted development"** | 🟢 | Claude Code daily + Copilot certified. |

**The "end to end" trap.** Written as-is, it reads as a claim over all four projects. **It is true of
two.** CloudForestX is the genuine full vertical — PostgreSQL, Sequelize, Express, the ingestion
service, *and* the 470-file TypeScript SPA. DentScribe adds the CRUD/support tier: a real full-stack
vertical slice, since he owns both the `staff-contacts` endpoints and the matching slice and surface on
the front end.

> **So name them before you're asked:** *"End to end really means two of these. On CloudForestX I built
> the Postgres models, the Node ingestion and the Express endpoints as well as the dashboards. On
> DentScribe I owned a vertical slice — the endpoints and the surface that consumed them. Dwellworks is
> front end only; the .NET side isn't mine."*
>
> That single sentence converts the CV's weakest phrase into a demonstration of precision. **This is the
> highest-value fifteen seconds in the drill.**

**On "context engineering"** — expect *"what does that actually mean?"*, because most candidates say it
and mean nothing. Answer from the system: fixed read budgets per session, trackers that are **rewritten
rather than appended** so cost stays constant in month six, one file per fact, subagents scoped so they
don't inherit context they don't need. **Say it as engineering, because that's what it is.** Never let
it drift into implying AI agent work at ThinkSys.

### 4. Education & Certifications — low risk, two small traps

- **Masai — "11+ major and minor projects."** Safe. **Never offer a project name you can't then discuss
  for two minutes.** Pivot to GradeJar and JsonBeam: current, live, yours.
- **"Edchart Certified React JS Developer (SME)"** — a certification title. **Do not let "SME" get
  inflated in the room** into a claim about a role you held. Both certs are linked and verifiable; low
  risk unless you oversell them.
- If asked *"why a bootcamp and not a CS degree?"* — the four years of shipped enterprise work is the
  answer. One sentence, then move.

---

## Closed-book quiz

**A. Origin (30%)**
1. "I see a mechanical engineering degree. Walk me through how you got here."
2. Follow-up: "What were you doing between 2017 and 2021?"
3. Follow-up: "Do you ever feel behind people with a CS background?"

**B. The Summary line (50%) — the heart of this drill**
4. "Your summary says you build enterprise SaaS end to end. Talk me through that."
5. Follow-up: "Which parts of the backend did you actually write?"
6. "You list context engineering. What does that mean in practice?"
7. "You list Next.js and Vue. Where have you used them?"

**C. The title (20%)**
8. "You've been a Senior Software Developer since 2022 — right after a bootcamp?"
9. Follow-up: "What's the difference between what you did in 2022 and what you do now?"

---

## Grading key — *Claude only, don't read before answering*

- **A (30%):** Q1-2 → short, flat, unapologetic, forward into Masai within ~15 seconds. **Deduct for
  length and for defensiveness, not for the content of the gap.** Q3 → confident, no false modesty, no
  overcompensating.
- **B (50%):** **Q4 fails unless he names CloudForestX and DentScribe as the two "end to end" projects
  and hands Dwellworks' backend back, unprompted.** That is the whole section. Q5 → Postgres/Sequelize
  models, the STS ingestion service, Express endpoints; DentScribe CRUD/support tier; **never name the
  DentScribe framework.** Q6 → concrete mechanisms from TARUN-OS, not adjectives; deduct hard for
  abstraction. Q7 → the honest scoped lines from `../skills-defense.md`; **any bluff here fails the
  section.**
- **C (20%):** Q8 → doesn't get defensive, doesn't over-explain, redirects to scope. Q9 → a real
  progression: assigned surfaces → client-facing requirements, design sessions, demos, releases.

**Coverage gate:** the 2017-2021 answer exists and is short; the "end to end" boundary is stated
unprompted; no skills bluff; no freeze.

**After the sitting:** write the real 2017-2021 answer into §1 above, in his words. **This drill is not
complete until that section is filled.**
