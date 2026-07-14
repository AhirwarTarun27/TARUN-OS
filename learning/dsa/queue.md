# DSA Spaced-Repetition Queue

> The engine for the Namaste DSA (Akshay Saini) method. Every problem is solved on a fixed
> ladder — **D0 → D2 → D5 → D10** — so the **pattern** sticks, not just the answer.
> `/daily-log` reads this at **plan** (what's due today) and updates it at **wrap**
> (advance the rung, bank the rating, recompute the next due date).
> The **physical notebook** holds the detailed notes; this file holds the schedule + ratings + one-line gist.
>
> **Revised 2026-07-14.** D0 now means *the day you solved it*, not the day you first saw it.
> See "Why D0 moved" at the bottom.

## The three states

| State | Meaning |
|---|---|
| **Attempting** | Started, not yet solved. **Not on the ladder** — no D0, no due dates. Carried day to day. |
| **Active** | D0 banked. On the ladder, with a next-due date. |
| **Graduated** | D10 passed with ≥ 3. Pattern locked. |
| **🔁 Revisit** | D10 rated < 3. Surfaced every session until it clears. |

## D0 — the anchor

**D0 = the date you produce a working solution.** However you got there.

- **Solved it?** → bank D0 **today**. The ladder starts from this date.
- **Didn't get working code** (ran out of time, day derailed, still stuck at the end)?
  → stays **Attempting**, attempt-day +1, carried to tomorrow. **No D0. No ladder.**

**The carry cap is 2 attempt-days.** If you're still stuck at the end of attempt-day 2: watch the
full solution, understand it, re-solve it from your notes, and **bank D0 that day tagged `watched`**.
Never grind one problem for a week — spaced repetition builds patterns through *volume of patterns
seen*, and the D5 + D10 passes exist precisely to catch what didn't stick the first time.

*(Attempt-days only count days you actually worked the problem. A day where revisions ate the whole
block and you never touched it doesn't burn an attempt.)*

### The D0 tag — how you got there

Tag every banked D0. **This is not bookkeeping — it changes the ladder.**

| Tag | Meaning |
|---|---|
| `solo` | Solved it unaided in the 15-20 min attempt. |
| `hinted` | Needed a nudge (a hint, the approach, part of the video) but wrote the solution yourself. |
| `watched` | Needed the full solution to get working code. |

## The ladder

Offsets are days from **D0** (the *solve* date).

- **D2 = D0+2** — always.
  - D0 tagged **`watched`** → **D5 is mandatory**, whatever D2 rates.
  - Otherwise: rated **≥ 3** → skip D5, next due = **D10**. Rated **< 3** → next due = **D5**.
- **D5 = D0+5** — when D2 rated < 3, **or** when D0 was `watched`. After D5, next due = **D10** regardless.
- **D10 = D0+10** — compulsory final pass.
  - Rated **≥ 3** → **Graduated**.
  - Rated **< 3** → flag **🔁 Revisit** — stays surfaced until re-cleared.

**Rate each pass 1–5** (smoothness). **< 3 = struggling.**

Paths: `solo`/`hinted` clean = **3 solves** (D0, D2, D10) · struggling = **4** (D0, D2, D5, D10) ·
`watched` = **always 4**.

> **Why `watched` forces D5:** a problem you watched is still fresh 2 days later, so D2 rates high,
> skips D5, and by D10 it's gone — because you never actually derived it yourself. **A smooth D2 on a
> watched problem is a false positive.** D5 is the trap-door that catches it.

## Daily priority — when the 45-min block can't fit everything

**Revisions always beat new problems.** A missed revision decays a pattern you half-own; a deferred
new problem costs you one day.

1. **Overdue revisions** (next due < today).
2. **Revisions due today.**
3. **The one new-problem slot** — the carried `Attempting` problem if there is one, else a fresh D0.
   **Skip this slot entirely if 1 + 2 filled the block.** Never defer a revision to start something new.

## The method (unchanged)

- **D0:** watch the video → at the problem statement, **pause and attempt solo 15–20 min** → if stuck,
  watch + take notebook notes → solve it again at the end.
- **Revision pass (D2/D5/D10):** struggle first → refer notebook notes → read the code → rewatch the
  video. Then solve it clean on LeetCode.
- **Notebook taxonomy** (detail lives there, one-line gist here): pattern · time complexity ·
  mistake made · new concept · key idea.

---

## Attempting — started, not yet solved

Not on the ladder. Carried daily. Force-banks as `watched` at the end of attempt-day 2.

| Problem | Pattern | Started | Attempt-days | Where you got stuck |
|---------|---------|---------|--------------|---------------------|
| _(empty)_ | | | | |

## Active queue — on the ladder

Ratings column logs each pass, e.g. `D2:2 D5:3`. Next due e.g. `2026-07-16 (D2)`.

| Problem | Pattern | D0 | D0 tag | Last rung | Ratings | Next due | Key idea |
|---------|---------|----|--------|-----------|---------|----------|----------|
| _(empty — first row lands at tonight's wrap)_ | | | | | | | |

## Graduated

Pattern locked — all passes done, final rated ≥ 3.

| Problem | Pattern | Graduated | Passes | Final |
|---------|---------|-----------|--------|-------|

---

## Why D0 moved (2026-07-14)

D0 used to mean "the day you first encountered the problem." It now means **"the day you solved it."**

**The ladder's offsets are meaningless if the anchor is a day you didn't learn anything.** A "D2
revision" of a problem you never got working isn't a revision — it's a first attempt wearing a
costume, scheduled by a system that thinks you already know it.

Two rules fell out of that, and both are load-bearing:

1. **The carry cap (2 days)** stops the fix from creating a worse problem — a single hard question
   silently eating a week of the block. Throughput matters: the pattern sticks through volume of
   patterns *seen*, not through grinding one question.
2. **The `watched` tag** closes the hole the old system couldn't see: a solo-solved problem and a
   video-solved problem used to get the **identical** schedule. They are not the same, and the
   difference only surfaces at D10 — by which point the pattern is already gone.

**Would change my mind:** if `watched` problems consistently rate ≥ 4 at D5 *and* D10, the forced D5
is wasted reps and can be relaxed back to the D2-rating rule.
