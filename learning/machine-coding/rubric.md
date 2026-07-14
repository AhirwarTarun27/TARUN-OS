# The Rubric — how this round is actually scored

> **You are not graded on "does it work."** You are graded on scope clarity, structure, and a
> **working P0 before the buzzer**. This is the thing nobody tells you, and it is why strong coders
> fail this round.
>
> `/machine-coding review` scores every session against this card and writes the result to
> [`profile.md`](profile.md).

## The three laws

Everything below is detail. These three decide the round.

### 1. P0 working beats everything. Never start P1 before P0 works.

An ugly, complete, demo-able P0 **passes**. A beautiful, elegant, half-finished P1 **fails**. The
interviewer needs to see the thing *work*. Every minute spent on P1 while P0 is broken is a minute
spent failing.

### 2. Nothing gets styled until P0 works.

CSS is the most seductive form of procrastination in this round, because it *feels* like progress and
it *looks* like output. **If the list does not render, you do not get to make it pretty.** The lab
flags the moment you touch `styles.css` before P0 is green.

### 3. Always have a demo-able thing before the buzzer.

At any moment after minute 20, you should be able to hit run and show *something* working. Not a
half-refactor. Not a broken build. **Never leave the code in a non-running state to chase one more
feature.** Commit-shaped thinking: the app is always green.

---

## The scorecard (out of 10)

| # | Criterion | Pts | What earns it |
|---|-----------|-----|---------------|
| 1 | **Clarify + scope** | 1 | Asked real questions *before* coding. Stated assumptions out loud. **Declared P0/P1/P2 yourself.** |
| 2 | **Design before code** | 1 | Component tree + state shape written down first. Not discovered while typing. |
| 3 | **P0 works end to end** | **3** | The core requirement runs. **The single heaviest weight in the round.** |
| 4 | **Code structure** | 2 | Sensible split, honest names, no 200-line god component, logic pulled out of JSX. |
| 5 | **Edge cases** | 1 | Empty · loading · error · boundary · cleanup. **Empty state is the most-forgotten one.** |
| 6 | **Time management** | 1 | P0 before P1. Demo-able before the buzzer. Didn't rabbit-hole. |
| 7 | **Communication** | 0.5 | Narrated the thinking. Said what you were about to do before doing it. |
| 8 | **Polish** | 0.5 | a11y, keyboard, CSS. **Only counts if 1-7 are done.** Zero if P0 is broken. |

**Passing bar: 6/10.** Below 4 in the first two weeks is expected and is not a signal about you — it
is the system finding the gap. Grades that start low and climb are the point.

## The block protocol (the 45-min weekday drill)

The lab enforces this. You cannot skip a phase.

| Phase | Time | What happens |
|-------|------|--------------|
| **WARM-UP** | 5 min | One primitive, cold, blank file. The lab picks it from your weak list. |
| **CLARIFY** | 3 min | The prompt is vague **on purpose.** Type your questions. **Only the ones you ask get answered.** At the buzzer you see what you never thought to ask. |
| **DESIGN** | 5 min | Component tree + state shape. **The code editor is locked until you submit this.** |
| **CODE** | 30 min | Blank file. No autocomplete. No AI. Docs allowed. |
| **BUZZER** | 2 min | Hard stop. Self-report: what stuck you, what you looked up, what you'd redo. |

Then `/machine-coding review` grades it. That can run past the block.

## The clarify phase — what a good question sounds like

Most people ask zero questions and start coding. **That alone costs you a full point and it is the
easiest point in the round.** You do not need to be clever. You need to close the obvious holes:

- *What's the data source? Hard-coded array, or a real API?*
- *How many items? 10 or 10,000?* (This is the question that decides if virtualization matters.)
- *Do I need keyboard support?*
- *Should state persist on refresh?*
- *Is this mobile-responsive or desktop only?*
- *Should I handle the error case, or assume the happy path?*
- *What is the ONE thing that must work if I run out of time?* ← **the best question in the round.**

That last one is a cheat code. It makes the interviewer hand you the P0 themselves.

---

## Phase 0 process card — fill this in from the Akshay video

> Watch **ONE** video. **Once.** You are not there to learn the solution. You are there to steal the
> process. Fill this in *while watching*, then close YouTube.
>
> Video: https://www.youtube.com/watch?v=J-QIayOSDN8&list=PLU56c6oCwyh7rGUlJblJ8A8ujRNS7w0aM
> Watched on: _______

**1. Before he typed a single line, what did he do?**
> _(what did he ask? what did he assume out loud? what did he write down?)_

**2. How did he decide what to build FIRST?**
> _(what was his P0? did he say it explicitly, or just start?)_

**3. What was his file/component structure, and when did he decide it?**
> _(up front, or did it emerge while coding?)_

**4. When did he write CSS?**
> _(before or after the thing worked? be honest about what you observed)_

**5. What did he do when something broke?**
> _(console.log? read the error? guess?)_

**6. What did he SKIP, and did he say why?**
> _(the scoping instinct — this is the most valuable thing in the video)_

**7. The one habit I am stealing from this:**
> _(pick exactly one. not five.)_

---

*After this card is filled in, Phase 0 is done. Do not watch a second video until you have solo-built
something. **One video per week, maximum.** The series is the trap.*
