---
name: daily-log
description: The weekday execution ritual — bookends the day and tracks the fixed routine. Morning mode (10:30am) sets today's focus per block; wrap mode (12:15am) runs a short QnA on how each block went and logs one compact entry. Keeps a terse rolling daily log, and on the last weekday of the month compresses it into a monthly summary and resets. Trigger on "/daily-log", "plan my day", "morning planning", "wrap up the day", "daily log", "how did today go", "log today". One run = one plan set OR one day banked.
---

# Daily Log — the weekday execution ritual

The daily counterpart to `/weekly-review`. `week.md` holds the 3 outcomes; this ritual makes
sure the **hours** ladder up to them. It bookends each weekday: a 15-min plan in the morning,
a 30-min wrap at night. Same well-wisher-not-drill-sergeant posture — honest, on the user's side.

**Weekdays only.** Weekends have no schedule and no log.

## Two modes

Pick the mode from the argument or the time of day:
- **`plan`** (≈10:30 am) — set today's focus. Fast. No log entry yet.
- **`wrap`** (≈12:15 am) — score the day, run the QnA, write the one compact log entry.

If invoked with no argument: before ~5pm → `plan`; after → `wrap`. Ask if genuinely unclear.

## Files this skill touches

- `daily/schedule.md` — the fixed routine + block codes (read every run; never edit unless the user changes their routine)
- `daily/log.md` — the current-month rolling log (append at wrap; reset at month-end)
- `daily/summaries/YYYY-MM.md` — monthly summary (write at month-end)
- `archives/daily/YYYY-MM.md` — raw month archived at month-end (never deleted)
- `week.md` — read at plan-time to tie the day to this week's 3 outcomes
- `learning/*/learning-records/` — read at wrap to pull what `/teach` covered for `sysdesign` / `interview-qa`
- `learning/reading/books/<slug>.md` — the current book (wrap only: bank ONE capture line. Never drill here — that's `/reading`, on demand)
- `learning/dsa/queue.md` — the DSA spaced-rep tracker (read at plan for what's due; advance the rung + recompute due dates at wrap)
- `learning/machine-coding/queue.md` — the machine-coding cold-rebuild ladder (read at plan for what's due; **`lab/ingest.mjs` writes the row itself** — at wrap just confirm it landed). **Never read `learning/machine-coding/builds/`** — that's `/machine-coding`'s job, under its read budget.
- `shipped.md` — if the day shipped something real, also bank a one-liner there (don't double-track routine)
- `daily/dashboard/` — the streak dashboard engine: Write `today.json` + run `build.mjs` only.
  NEVER read `template.html` or `daily/dashboard.html` (build output) — the build owns them.

## Mode: `plan` (morning)

1. Open `week.md`. State this week's 3 outcomes in one line so the day is anchored to them.
2. Open `daily/schedule.md`. The routine is fixed, so planning = deciding the **focus** for the
   flexible blocks, not rebuilding the timetable. Ask a tight set (descriptive, not a wall):
   - **Must-ship:** the ONE thing that makes today count (mirror it into `week.md` → "Today — ONE must-ship").
   - **`dsa`:** read `learning/dsa/queue.md` → surface **overdue** revisions, then revisions **due today** (problem + rung), then the **one new-problem slot**: the carried `Attempting` problem if there is one, else ask which NEW problem is today's D0. **Revisions beat new problems** — if they fill the block, say so and skip the new one. (See "DSA spaced-rep engine" below.)
   - **`machine-coding`:** read `learning/machine-coding/queue.md` → the **Phase marker**, then **overdue cold rebuilds**, then rebuilds **due today**, then the **one new-build slot** (next problem in the phase curriculum). **Rebuilds beat new builds** — if they fill the block, say so and skip the new one. Point him at `learning/machine-coding/lab/index.html`. Depth belongs to `/machine-coding`, not here.
   - **`sysdesign`:** which Xu Vol 1 chapter/topic → confirm to run via `/teach` (interview-focused; see learning/system-design-video-path.md for the watch-first video).
   - **`project`:** which task on the current product?
   - **`reading`:** which book / where.
   - **Flex:** any block you already know you'll move or skip today, and why.
3. Refresh the dashboard's pending day (write-only): Write `daily/dashboard/today.json` =
   `{ "entry": { "date": "YYYY-MM-DD", "day": "Ddd", "pending": true, "mustShip": "<today's must-ship>" } }`
   (add `"weekOutcomes": "…"` only when `week.md` was just reset), run
   `node daily/dashboard/build.mjs --ingest`, then republish the Artifact
   (`file_path: daily/dashboard.html` + url/favicon from the `daily-streak-dashboard` memory).
4. Keep it to ~15 min. Don't write a log entry — that happens at wrap. End by pointing at the
   first block and, for `sysdesign`/`interview-qa`, remind that those run through `/teach`.

## Mode: `wrap` (midnight)

1. Read `daily/schedule.md` for the 8 scored block codes. Read today's `plan` intentions if set.
2. **Run the QnA — short and honest.** Go block by block, but move fast:
   - Which of the 8 blocks **hit**? (binary per block — "half" = miss, same rule as weekly-review)
   - For each **miss**, one honest question: capacity, clarity, or avoidance? Log the real cause in a few words.
   - For each **learning block** (`sysdesign`, `interview-qa`): one line on what `/teach` covered. Pull it from
     `learning/<topic>/learning-records/` if written there; otherwise ask and let `/teach` own the depth.
   - **`dsa` block:** if it hit, update `learning/dsa/queue.md`. **Ask whether each new problem was actually SOLVED** —
     a working solution banks **D0 = today** (+ tag it `solo` / `hinted` / `watched`); no working solution leaves it
     **Attempting** with attempt-day +1 (force-bank as `watched` when that hits 2). For each **revision** done, ask the
     1–5 smoothness rating, advance the rung, and recompute Next due per the ladder (see "DSA spaced-rep engine" below).
     Notes stay one-line — depth is in Tarun's notebook.
   - **`machine-coding` block:** if it hit, ask whether he ran `node learning/machine-coding/lab/ingest.mjs`.
     If yes, the queue row is already written — just confirm it landed and note the rung in one line
     (e.g. `machine-coding=star-rating R0 solo, P0 ✓`). If he coded but never exported, say so: an
     un-ingested session is a rep with no record and no grade. **Never grade it here** — that's
     `/machine-coding review`, and it has a read budget this ritual must not blow.
   - **`reading` block:** if it hit, ask **"what bit you?"** — one line, and bank it to `## Captures`
     in `learning/reading/books/<slug>.md`. **"Nothing" is a valid answer and writes nothing** — most
     nights are blank by design. Never drill it here, never summarize the chapter, never suggest
     `/reading` at this hour: the block is **intake only** and that's the whole reason it survives the
     11:45pm slot. The drill is on-demand, prompted at `/weekly-review`.
   - **Energy** for the day, 1–5.
   - Did the **must-ship** land? ✅ / ❌.
3. **Write ONE compact entry** to the top of `daily/log.md` (newest on top), ~4 lines:
   ```
   ## 2026-07-06 Mon · 6/8 · energy 4/5
   ✓ reading machine-coding workout project office-am office-pm
   ✗ sysdesign — meetings ran over · interview-qa — too tired
   notes: machine-coding=LRU cache done · project=roster rankings UI shipped · must-ship=✅ marketing queue
   ```
   Terse. This file must stay scannable across a full month.
4. If something **real** shipped (a deploy, a decision, a finished feature — not routine adherence),
   also append a one-liner to `shipped.md` and suggest logging any decision in `decisions/log.md`.
5. **Refresh the streak dashboard — write-only, never read the HTML.**
   a. Write `daily/dashboard/today.json`: `{ "entry": { …today's scored entry… } }` — same facts as
      the log entry: `date`, `day`, `blocks` (7 booleans), a `reasons` tag per missed block
      (`avoidance|capacity|clarity|energy|disruption|other`), `energy` 1-5, `office`, `mustShip`
      true/false, terse `notes`, optional `shipped: [ … ]` (mirrors what went to `shipped.md`).
   b. Run `node daily/dashboard/build.mjs --ingest` — it validates, merges into `data/YYYY-MM.json`,
      seeds tomorrow's pending day, rebuilds `daily/dashboard.html`, and deletes `today.json`.
      Echo its one-line summary.
   c. Publish the Artifact: `file_path: daily/dashboard.html`, url + favicon from the
      `daily-streak-dashboard` memory. If the dashboard LOOKS wrong, fix `template.html` in a
      dedicated session — never at wrap.
6. Close with one line: blocks hit today + the single thing to fix tomorrow. No lecture.

## Month-end: compress + reset

On the **last weekday of the month** (or first run of a new month if it was missed), before writing
the new day's entry:

1. Read all of `daily/log.md` for the month.
2. Write `daily/summaries/YYYY-MM.md` — the compressed record:
   - Hit-rate per block (e.g. `reading 22/23 · sysdesign 15/23 · interview-qa 9/23`).
   - Longest streaks and the worst recurring miss (with its real cause).
   - 3–5 biggest wins of the month (cross-reference `shipped.md`).
   - 1–2 concrete adjustments to carry into next month.
3. Copy the raw month verbatim to `archives/daily/YYYY-MM.md` (**never delete** — AIOS rule).
4. Reset `daily/log.md`: new `# Daily Log — YYYY-MM (Month)` header, the format comment block, empty entries.
5. Update the summary's "carry-in" note at the top of the fresh `daily/log.md` so next month starts informed.
6. Dashboard: nothing to do — `data/YYYY-MM.json` rolls over automatically at the first ingest of
   the new month. Never delete old month files (they feed habit-strength history).

## Output contract

- **plan run:** this week's 3 outcomes restated, today's per-block focus set, `week.md` must-ship updated. No log entry.
- **wrap run:** the QnA answered, one compact entry prepended to `daily/log.md`, any real ship banked to `shipped.md`, the dashboard ingested via `build.mjs` + redeployed, a one-line close.
- **month-end run:** a written monthly summary, raw month archived, `daily/log.md` reset clean.

## DSA spaced-rep engine

`learning/dsa/queue.md` is the source of truth (full method + tables live there). This ritual only
reads/advances it — it never teaches DSA (Rule 3). **Revised 2026-07-14.**

**D0 = the day the problem was SOLVED, not the day it was first seen.** This is the whole point —
the ladder's offsets are meaningless if the anchor is a day nothing was learned.

- **Attempting** (started, no working solution yet): **not on the ladder.** No D0, no due dates.
  Carried day to day, attempt-day +1 each day it's actually worked.
  **Carry cap = 2 attempt-days** → still stuck at the end of day 2? Watch the full solution,
  re-solve from notes, **bank D0 that day tagged `watched`.** Never let one problem eat a week.
- **Banking D0:** a working solution — however he got there — banks D0 **today**, with a tag:
  `solo` (unaided) · `hinted` (nudge, but wrote it himself) · `watched` (needed the full solution).

The ladder, offsets from **D0** (the *solve* date):

- **D2 = D0+2** — always.
  - D0 tagged **`watched`** → **D5 is MANDATORY**, whatever D2 rates. *(A watched problem is still
    fresh at D2, so a high D2 rating is a false positive — D5 is the trap-door that catches it.)*
  - Otherwise: rated **≥ 3** → skip D5, next due **D10**. Rated **< 3** → next due **D5**.
- **D5 = D0+5** — when D2 < 3 **or** D0 was `watched`. After D5, next due **D10** regardless.
- **D10 = D0+10** — compulsory. Rated **≥ 3** → **Graduated**. Rated **< 3** → flag **🔁 Revisit**
  (stays surfaced every session until re-cleared).

**At `plan`** — surface in this priority order, because **revisions beat new problems** (a missed
revision decays a pattern he half-owns; a deferred new problem costs one day):
1. **Overdue** revisions (next due < today) · 2. revisions **due today** · 3. **the one new-problem
slot** — the carried `Attempting` problem if there is one, else ask for a fresh D0.
**If 1+2 fill the 45-min block, say so and skip slot 3.** Never defer a revision to start something new.

**At `wrap`** — for each problem worked:
- **Attempting, solved** → bank D0 = today + the tag, compute next due (D0+2), move to Active.
- **Attempting, not solved** → attempt-day +1. If that hits **2**, force-bank as `watched` (D0 = today).
- **Revision done** → ask the 1–5 rating, advance the rung, recompute next due per the ladder above.

Detailed notes = Tarun's notebook, not here. One-line gist only.

## Rules

1. **Binary per block.** Hit or miss. "Almost" is a miss. Same discipline as `/weekly-review`.
2. **Short by design.** ~4 lines per day. If an entry sprawls, cut it. The log is a dashboard, not a diary.
3. **Delegate the learning.** Never teach `sysdesign` or `interview-qa` here — that's `/teach`. This ritual only tracks that they happened and what they covered.
4. **Employer boundary holds.** Office blocks are ✓/✗ time-adherence only. Never ask for or record thinksys work content.
5. **Weekdays only.** No weekend prompts.
6. **Name the real blocker.** For every miss, the honest cause in a few words — not "no time."
7. **Never delete a month.** Compress → summary, archive → raw, then reset. The record survives.
8. **Ladder to `week.md`.** The day exists to move this week's 3 outcomes. If a day's blocks don't, say so.
9. **Dashboard is write-only at ritual time.** One `today.json` Write + one build command + one
   Artifact publish. Never open `dashboard.html` or `template.html` during plan or wrap.
