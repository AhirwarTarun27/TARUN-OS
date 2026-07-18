---
name: weekly-review
description: The 30-minute Sunday execution ritual. Scores the week honestly (done vs not done), banks shipped work to the done-log, kills or carries unfinished outcomes, clears the parking lot, and sets next week's 3 outcomes. Trigger on "weekly review", "let's review the week", "/weekly-review", or every Sunday. One run = a reset board and an updated streak.
---

# Weekly Review — the ritual that fixes follow-through

This is the keystone habit. The user plans well but doesn't follow through. This ritual is the forcing function: it confronts what actually got done, makes progress visible, and resets a tiny plan for the week ahead. No sugarcoating — a skipped outcome is a skipped outcome. Well-wisher, not drill sergeant.

Default day: **Sunday.** 30 minutes. Same time each week.

## Files this skill touches

- `week.md` — the operating board (read, then reset)
- `shipped.md` — the done-log + streak (append only)
- `learning/reading/rules.md` — the tested-rules artifact (read for due verdicts; rewrite, never append)
- `decisions/log.md` — log any real decision made during review (append, optional)

## Execution — run in order, conversationally

### 1. Face the scoreboard (no sugarcoat)

Read `week.md`. For each of this week's 3 outcomes ask: **done or not done?** Binary. "Almost" is not done.
- State the score plainly: "You hit X of 3."
- For each miss, ask one honest question: *"What actually blocked it — capacity, clarity, or did you avoid it?"* Don't accept "no time" if the parking lot is full of busywork. Name the real cause.

### 2. Bank the wins

For every done outcome AND anything else real that shipped this week (deploys, decisions, things learned), append a dated one-line entry to the Log in `shipped.md`, newest on top:
`## YYYY-MM-DD — <what shipped>`
This is the proof. The done-list is the antidote to the follow-through problem. It has to grow every week.

### 3. Update the streak

In `shipped.md`:
- Increment **Weeks reviewed in a row** by 1 (reset to 1 only if a whole week was skipped).
- Update **Total things shipped** to the new count.
- Say it out loud: "3 weeks straight. Don't break the chain."

### 4. Kill or carry (anti-sunk-cost)

For each unfinished outcome, force a choice — never auto-carry:
- **Carry** — only if it's still the single most important thing. Goes into next week. Max one carry.
- **Kill** — if it's been sitting two weeks, cut it. The kill switch matters as much as the launch button. Killing a stale goal is a win, not a failure.

### 5. Clear the parking lot

Go through every parking-lot item, triage each in one pass:
- **Eliminate** — would anyone notice if this never happened? Delete it. Don't carry waste.
- **This week** — promote to a next-week outcome, but only if it beats what's already there (max 3 total).
- **Someday** — park it durably (a someday list or `decisions/log.md`) and clear it off the board.
Empty the parking lot every week. It's a holding pen, not a backlog.

### 6. Set next week (keep it tiny)

- Pick a **one-line theme** — the single focus for the week.
- Pick **exactly 3 outcomes**, smallest things that move the engine (products) or the floor (job), laddering up to the North Star.
- Push back hard on scope creep. "Work on Jsonbeam" is not an outcome. "Ship the share-link feature and deploy" is.
- Each outcome must be shippable in a normal week at ~10-12 focused hours. Anything bigger gets broken down.

### 7. Reset the board

Rewrite `week.md` for the new week:
- New date range and theme.
- The 3 new outcomes (unchecked).
- Clear "Today — ONE must-ship".
- Empty parking lot.
- Leave the North Star block unchanged unless the user explicitly changed strategy.

### 8. Reading — verdicts due, and is anything worth drilling? (~3 min)

Two questions, both fast. Read `learning/reading/rules.md`.

**(a) Verdicts due.** For every rule past its verdict date, ask the only question that matters:
*"Did you run it, and what happened?"* Four states, **no auto-carry** (rule 3 applies here too):
**Kept** · **Killed** (log the epitaph — **this is a win**, say so) · **Rewritten** (new rule, new
+14 date) · **Never ran it** (14 days and it never got run → the rule wasn't real; kill it or shrink
it). Then rewrite `rules.md` — never append.

**(b) Anything worth drilling?** Glance at this week's captures in the current book file. The bar:
*did something change his mind or threaten a belief he holds?* If yes → he runs `/reading` on his own
time this week (15 min, not now — this ritual is already 75+ min). If no → **"nothing bit me this
week" is a legitimate answer.** Do not push. A drill with no fuel manufactures a fake rule, and fake
rules crowd out real ones.

**If (b) comes back empty four weeks running, say so out loud** — the track is dying quietly and
needs either a real slot or an honest kill.

### 9. Chain: marketing week

Same sitting, immediately — run `/marketing` weekly mode (30-45 min budget). The weekly
marketing session is habit-stacked here so it can't lapse the way the daily queue did.
If genuinely out of time, schedule it within 24h and write the debt into `week.md`'s
parking lot — never silently skip.

### 10. Cadence handoff

Once a month, or whenever structure feels messy, suggest: *"Run `/audit` to check the AIOS structure, and `/level-up` to find one automation to ship."* Three different jobs: weekly-review = did I execute; /audit = is the OS built right; /level-up = what to automate next.

## Output contract

Every run produces:
1. An honest score for the week just ended (X of 3, with the real reason for each miss).
2. Updated `shipped.md` — new log entries + bumped streak.
3. A reset `week.md` for the week ahead with theme + 3 outcomes.
4. Every due reading rule given a verdict (kept/killed/rewritten/never-ran) and `rules.md` rewritten.
5. The weekly `/marketing` session run in the same sitting (or explicitly scheduled within 24h).
6. A one-line close: streak count + next week's theme + "don't break the chain."

## Rules

1. **Binary scoring.** Done or not done. No partial credit, no "almost."
2. **The done-log only grows.** Never delete from `shipped.md`.
3. **No auto-carry.** Every unfinished outcome is explicitly killed or carried. Max one carry.
4. **Three outcomes, never more.** The whole point is focus. Refuse scope creep.
5. **Name the real blocker.** "No time" is rarely the truth. Find what actually happened.
6. **Honest, not harsh.** No sugarcoat — that's what was asked for — but always on the user's side.
