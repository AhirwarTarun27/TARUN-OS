# This Week — Mon Aug 10 → Sun Aug 16, 2026

> **`/console` is the front door now, not this file.** Run `node scripts/console.mjs` (or `/console`)
> first, every session. This file holds the week's 3 outcomes; the console holds today's one action.
> **Reset every Sunday** by running `/weekly-review` (next: Sun Aug 16).
> **Updated 2026-08-10** — first board of the mission. Previous board expired 2026-07-26 and ran
> stale for 22 days.

## Theme

**Start the funnel before you feel ready.** The prep engine produced ~zero for 26 days and the honest
diagnosis was never discipline: it was 8 tracks with no finish line, a board that could only accuse,
and collapses driven by job anxiety. That's now four tracks, a floor, and a countdown. **Week one's
job is to prove the system moves at all.**

## North Star (why any of this matters)

- **The mission:** a **signed offer by 15 November** — funded startup / mid-product, frontend-heavy
  full-stack, ~16-26 LPA. Full plan and the reasoning behind every cut: **`mission/plan.md`**.
- **The floor (day job):** ThinkSys until 7 Sept. **Full compliance, assigned .NET, say nothing.**
  ~15 working days protecting ₹3.14L. It is not a hill worth that.
- **Machine coding is the gate, not DSA.** DSA is parked until Phase B and then capped at ~20
  problems. This supersedes the old "DSA is the gate" line, which contradicted the 07-29 triage for
  three weeks.
- **The engine (products):** GradeJar, JsonBeam, AccentWallPlanner run on the hands-off `/marketing`
  queue. Kesri is client #1. **None of it competes with the mission before 15 November.**
- **The rule:** hit the floor and the day counted. 1 CV drill + 1 coding rep + 3 applications.

## This week's 3 outcomes (max 3 — done or NOT done)

- [ ] **The funnel exists.** **15+ applications submitted** into the sacrificial wave (services cos,
      consultancies, recruiters, roles you'd decline) and logged via `/console log`. Not researched.
      Submitted. The `apply` block produced 6+ in one sitting on 07-29 and has been dark since.
- [ ] **Machine coding produces its first rep ever.** Counter reaches **P0 green**, session ingested,
      R0 banked. The system was built 2026-07-14 and has produced **zero** reps in 27 days. Either it
      starts producing or it isn't real.
- [ ] **4 CV drills closed** (M + F + B, closed-book). D20 is in progress at conf 3/5; front-load
      **D21 and D33** — they double as the Node credential recovery.

## Today — ONE must-ship

> The single thing that, if you do nothing else today, makes the day count.

- **Date:** Wed Aug 12 *(Phase A1, day 3. Tue 08-11 banked **3/5** — **first floor day of the mission.**)*
- **Full day: office happened AND `apply` produced applications.** First complete day-shape of the
  mission. The protected 9pm–12am block is fully available.
- **Must-ship:** **close D20 → `CV drills` moves 0/14 → 1/14.** The only counter still at literal
  zero, and the console independently named it NEXT: *100% of interviews start here.*

  | 9:00–9:15 | **`/machine-coding` — submit the design FIRST** | Phase 1 keeps the editor locked until the design is in. The design must show a **presentational `<Star>` child**, not one flat `App`. |
  |---|---|---|
  | 9:15–9:45 | **machine-coding — Star Rating**, timed | Target **20:00**. Build 2/10. `App` owns `rating`; `<Star filled onPick />` ×5. |
  | 9:45–10:00 | **TICK THE P0 BOXES**, then `node learning/machine-coding/lab/ingest.mjs` | 08-11 exported `goals: {}` and needed a manual override. Twice = a profile failure mode, not a slip. |
  | 10:30–11:15 | **cv-defense — D20 sitting 2** — say **"drill me"** | **The must-ship.** The 6 Dwellworks CV bullets. Sitting 1 hit M✓ F✓✓ B✓, conf 4. |
  | 11:15–11:30 | **`/console log`** the applications | `state.json` `applications: []` — 08-11's 3 plus today's are all missing. |
  | 11:30–12:00 | `/daily-log wrap` | |

- **Why the coding slot has a design constraint tonight.** `queue.md` says Counter has been built
  **twice as a single `App`**, so `lifting-state` — the primitive it exists to train — has **zero
  reps**. A third flat build banks a number and teaches nothing. That is July's exact failure mode
  (ticks without reps) wearing a new hat. **Star Rating with a real child is the first lifting-state
  rep either build was supposed to produce.**
- **Every drill opens with a scope question** until the 08-11 pattern stops: three scope questions,
  three system answers. He does not separate himself from the platform. Non-negotiable at sitting 2.

## Parking lot (capture, do NOT act)

Brain-dump here so it leaves your head. Triage at the weekly review. Nothing here is this week's problem.

- ~~Bonus clawback clause~~ — **CLOSED 08-10.** Unconditional. ₹3.14L on 1 Sept is safe.
- ~~Monthly burn~~ — **CLOSED 08-10.** 4 months is real available time. Dry ~31 Dec holds.
- ~~Placeholder office hours~~ — **CLOSED 08-10.** Real day filled into `daily/schedule.md` and the
  dashboard `SCHED` together. Office 9:30-6:30, protected block 9pm-12am.
- **CloudForestX Node bullet is 🟡 pending re-grade.** Read `project-knowledge-base/cloudforestx/`
  kb 04 §5, then re-grade. **Due before 15 Sept**, when wave 2 starts costing real companies.
  **This is now the only open item in the whole mission.**
- **Two lab bugs, found 08-11.** Fix in a dedicated session, never mid-block. (1) `runPreview` mounts
  `typeof App !== 'undefined' ? App : null` — a component named anything else renders **silently, with
  no error**, which is how the warm-up looked broken. The lab's own law says it never hides a real
  mistake; this hides one. (2) `end-btn` calls `enterPhase('buzzer')`, so pressing **End** while
  already in BUZZER appears to do nothing — the real end is "Export session". Rename or disable it.
- **The warm-up drill is aimed at the wrong material. Found 2026-08-12, from Tarun, unprompted.**
  `primitives.md` line 105 weights the rotation toward `~` **or `—`**. But the warm-up is a *retrieval*
  drill (*"come out of your fingers without thinking"*), and `—` means **never attempted** — there is
  nothing encoded to retrieve. 25 of 27 primitives are `—`, so the rotation reliably serves a blank
  wall with a 5-minute clock on it, and `primitives.md` offers one sentence, not a reference.
  **It is the only part of the system with no path out of "I don't know this yet"** — the build ladder
  has the 2-attempt-day → read a reference → rebuild from notes → bank `watched` trapdoor; the warm-up
  never got it. **Fix: cold warm-ups fire only at `~`. A `—` primitive gets first exposure (read the
  doc, close it, rebuild from notes) → becomes `~` → then it is drill-eligible.** Today that leaves
  exactly two legal cold targets: `lifting-state`, `derived-vs-stored`. Dedicated session, never
  mid-block. **Do not "fix" it by having the AI write the example — rule #1 stands.**
- **AI crawlers `Disallow: /` on jsonbeam, gradejar, kesrienterprise** (Cloudflare managed robots).
  P1, not P0 — Googlebot/Bingbot are allowed everywhere, nothing is de-indexed. Carried from 07-19.
  `shipped.md` 2026-07-03 claims this was fixed; that claim is false in production.
