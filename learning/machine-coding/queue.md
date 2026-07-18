# Machine Coding Queue — the cold-rebuild ladder

> The engine. Every build climbs a fixed ladder — **R0 → R3 → R10** — where **each rung is a cold
> rebuild from a blank file**, not a re-read.
> `/daily-log` reads this at **plan** (what's due today) and updates it at **wrap** (advance the rung,
> bank the rating, recompute the next due date). `lab/ingest.mjs` appends the R0 row automatically.

## ⚙ Current phase: **1**

*The skill reads this line and gates itself on it. Do not hand-edit it — `/machine-coding` advances it.*

| Phase | Means | Gate to leave |
|---|---|---|
| **0** | Steal the process. One Akshay video, once. | The process card in `rubric.md` is filled in. |
| **1** | Guided solo. Design reviewed **before** coding. Editor locked until design submitted. | 10 Phase-1 builds banked at R0. |
| **2** | Interviewer mode. Requirements withheld. Profile picks the problem. | 4 weeks, or a 7/10 average over 5 sessions. |
| **3** | Full 60-90 min rounds in a real Vite project. | — |

---

## Why the rep is a REBUILD, not a re-solve

**This is the one place this system deliberately breaks from the DSA ladder.**

In DSA, the unit is a **problem** and re-solving it works, because the pattern *is* the problem.

Here, re-solving the same app just memorizes that app. Useless. The unit that transfers is the
**primitive** ([`primitives.md`](primitives.md)), and every question is a composition of 3-5 of them.
So the rep is: **blank file, from memory, on a timer, zero lookups.** If you can't produce it cold,
you don't own it — no matter how well you "understood" it the first time.

## The states

| State | Meaning |
|---|---|
| **Building** | Started, no working P0 yet. **Not on the ladder.** Carried day to day. |
| **Active** | R0 banked. On the ladder, with a next-due date. |
| **Graduated** | R10 rebuilt cold, under target, rated ≥ 4. **The primitive is yours.** |
| **🔁 Revisit** | R10 failed. Surfaced every session until it clears. |

## R0 — the anchor

**R0 = the date you produce a working P0.** However you got there.

- **Got P0 working?** → bank R0 **today**. The ladder starts from this date.
- **No working P0** (ran out of time, still stuck)? → stays **Building**, attempt-day +1.
  **Carry cap = 2 attempt-days.** Still stuck at the end of day 2 → look at a reference
  implementation, understand it, rebuild it from your notes, and **bank R0 tagged `watched`.**

### The R0 tag — how you got there

**This is not bookkeeping. It changes the ladder.**

| Tag | Meaning |
|---|---|
| `solo` | Built it unaided, inside the clock. |
| `hinted` | Needed a nudge (a design review, a doc lookup, a hint) but wrote every line yourself. |
| `watched` | Needed to see a working implementation to get there. |

## The ladder

Offsets are days from **R0** (the *working-P0* date).

- **R3 = R0+3** — cold rebuild. Blank file, no notes, timed.
  - R0 tagged **`watched`** → **R7 is mandatory**, whatever R3 rates.
  - Otherwise: rated **≥ 4** → skip R7, next due = **R10**. Rated **< 4** → next due = **R7**.
- **R7 = R0+7** — cold rebuild. When R3 rated < 4, **or** when R0 was `watched`. After R7 → **R10** regardless.
- **R10 = R0+10** — cold rebuild, **timed, must beat the target time.**
  - Rated **≥ 4** *and* **under target** → **Graduated.**
  - Otherwise → **🔁 Revisit** (repeat R10 in 5 days).

> **Why `watched` forces R7:** a build you copied is still fresh 3 days later, so R3 rates high, skips
> R7, and by R10 it's gone — because you never actually derived the structure yourself. **A smooth R3
> on a watched build is a false positive.** R7 is the trap-door that catches it.

## Cold-fluency rating (1-5)

Rate the **rebuild**, not the result. Be brutal — a soft rating just hides the gap until the interview.

| | |
|---|---|
| **5** | Blank file → working. **Zero lookups.** Under target. |
| **4** | Under target, 1-2 lookups. |
| **3** | Over target, or several lookups. No freeze. |
| **2** | Froze. Had to open my notes / the old build. |
| **1** | Couldn't rebuild it. |

**< 4 = not yet yours.** (Note this bar is *higher* than DSA's `< 3`. A pattern you can half-recall is
worth something in DSA. A component you can half-build is worth nothing in a 45-minute round.)

## Daily priority — when the block can't fit everything

**Rebuilds always beat new builds.** Same law as DSA, same reason: a missed rebuild decays a primitive
you half-own; a deferred new build costs you one day.

1. **Overdue rebuilds** (next due < today).
2. **Rebuilds due today.**
3. **The one new-build slot** — the carried `Building` problem if there is one, else the next problem
   in the phase curriculum. **Skip this entirely if 1 + 2 filled the block.**

---

## Building — started, no working P0 yet

Not on the ladder. Carried daily. Force-banks as `watched` at the end of attempt-day 2.

| Problem | Primitives | Started | Attempt-days | Where you got stuck |
|---------|-----------|---------|--------------|---------------------|
| Counter | state + event handlers + render-from-state | 2026-07-17 | 1 | No working P0 in the block. Cap = 2 attempt-days, then reference-rebuild + bank R0 `watched`. |

## Active — on the ladder

Ratings column logs each rung, e.g. `R3:3 R7:4`. Next due e.g. `2026-07-17 (R3)`.

| Problem | Primitives | R0 | R0 tag | Last rung | Ratings | Next due | Target | Notes |
|---------|-----------|----|--------|-----------|---------|----------|--------|-------|
| _(empty — the first row lands when `lab/ingest.mjs` runs)_ | | | | | | | | |

## Graduated

Cold, under target, from a blank file. **These are yours.**

| Problem | Primitives | Graduated | Rungs | Final time |
|---------|-----------|-----------|-------|------------|
| _(empty)_ | | | | |
