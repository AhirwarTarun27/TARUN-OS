# Machine Coding

> **The round where you build a working thing, from a blank file, on a clock, while talking.**
> Front-end machine coding: vanilla JS/DOM and React. 45-min drills on weekdays; full 60-90 min
> rounds from week 4.
>
> Unlike DSA, this workspace is **tracked *and* coached.** `/machine-coding` reviews your design,
> grades against the rubric, and eventually interviews you.

## Why

DSA is the **gate**. Machine coding is the **offer**. `context/priorities.md` ranks it 1(b) — "my
edge" — for the active 2-3 month job switch.

## The honest starting diagnosis (2026-07-14)

Stated plainly so the system can be aimed at the real problem:

> *"My confidence is very low. I think I will not be able to solve even a simple problem, because
> of AI-assisted coding. I don't write the code by my hand."*

Real. But it is not one problem. It is **three muscles AI ate, plus one never built:**

1. **Blank file → structure.** Deciding *what the components are and what the state shape is* got
   outsourced. This is the minute-zero freeze. **This is the main bug.**
2. **API recall without autocomplete.** Knowing what `debounce` does ≠ typing one cold in 3 minutes.
   Pure reps.
3. **Finishing something demo-able inside a clock.** AI has no clock.
4. **The rubric — never had it.** Machine coding is not graded on "does it work." It is graded on
   scope clarity, structure, and a **working P0 before the buzzer**. Ugly + complete beats beautiful
   + half-done, every time. Most candidates fail this round *while writing good code.*

**The corollary that sets the whole curriculum:** you can't build an autocomplete because it is a
*four-primitive composition* (debounce + filter + keyboard nav + controlled input) and you don't yet
own a single primitive. **Watching more video does not fix that. Starting much smaller does.**

## Why this is NOT the DSA system

In DSA the unit is a **problem** and the rep is re-solving it. That works because the pattern *is*
the problem.

In machine coding, re-solving the same app just memorizes that app. The unit that actually transfers
is the **primitive** — debounce, list-CRUD state, event delegation, `useEffect` cleanup, portal,
drag-drop, undo stack. **Every machine coding question is a composition of 3-5 primitives.**

So the rep is not "re-solve the question." The rep is a **cold rebuild from a blank file, on a timer,
zero lookups.** That is what makes it stick.

## The two rules that outrank everything here

1. **During the clock, no AI writes code.** Not Claude, not Copilot, not ChatGPT. The lab's editor
   has **no autocomplete on purpose**. Docs are allowed (MDN, React docs) — real interviewers allow
   docs. **After the buzzer, AI is the reviewer, never the author.** That is not a restriction; it is
   the entire product. A graded rep every day is the thing you cannot get on your own.
2. **One Akshay video per week, maximum — and only *after* you have solo-built something that week.**
   The series is the trap. Ten more videos will feel like progress and produce nothing.

## The files

| File | What it is |
|---|---|
| **[`lab/`](lab/)** | **Where you actually write the code.** Open `lab/index.html` in the browser. |
| **[`rubric.md`](rubric.md)** | How the round is really scored + the 45-min block protocol. |
| **[`primitives.md`](primitives.md)** | The map: 27 building blocks, target cold-build times, and which questions compose them. |
| **[`queue.md`](queue.md)** | The live ladder. **R0 → R3 → R10**, each rung a cold rebuild. Holds the **Phase marker.** |
| **[`profile.md`](profile.md)** | **The model of you.** Failure modes, freeze signature, primitive mastery, the hint ledger. |
| `problems/` | The authored Phase 1 problem bank the lab reads. |
| `builds/` | One folder per session. Cold storage — see the read budget below. |

## The read budget (why this doesn't get expensive in month 3)

**Token cost is driven by what gets *read*, not what gets *stored*.** Disk is free. So this system
stores everything forever and reads almost none of it.

- **`profile.md` is a fixed-size *rewritten model*, not an append-only log.** It is the same size
  after 100 sessions as after 3. A human coach doesn't reread every past session either — they carry
  a model of you. That's what this is.
- A full review reads **exactly three things**: `profile.md`, today's `session.md`, today's code.
  ≈1,600 tokens, **flat forever.**
- `builds/**` is **never globbed.** A raw `session.json` is opened only to answer a specific
  diagnostic question, and the skill must say why out loud.

## The path — four phases

You ramp in. Phase 1 is **deliberately below your level** so you finish every single one and the
blank-file freeze dies. That is a feature, not babying.

### Phase 0 — steal the process (2 sessions, week of Jul 14)

Watch **ONE** Akshay Saini machine-coding video. **Once.** You are not there to learn the solution.
You are there to steal the *process*. The only artifact you take away is the filled-in **process
card** in [`rubric.md`](rubric.md): what did he ask before typing, how did he split P0/P1, what did
he build first, what did he do when time ran short.

Then **close YouTube.**

### Phase 1 — guided solo (weeks of Jul 14 + Jul 21)

Tiny, **single-primitive** problems, in the lab. You finish every one of them.

**The scaffold, and it is the whole phase: the lab locks the code editor until you submit a design.**
Component tree + state shape, first. Then `/machine-coding design` critiques it **before** you write
a line. Reviewing finished code does not rebuild decomposition. Fixing it *before* you type does.

- Week 1: Counter · Star rating · Accordion · Tabs · Stopwatch
- Week 2: Todo list · Search filter · Progress bar · Traffic light · OTP input

**The scaffold comes off at the end of week 2.**

### Phase 2 — the interviewer (week of Jul 28 →)

`/machine-coding interview`. Vague prompt, requirements **withheld until you ask**, clock running, no
code given no matter what, graded at the buzzer. Problems now chosen **by your profile** — it targets
your shakiest primitive and your most-repeated failure mode.

Debounced search · modal + focus trap · form validation · pagination · infinite scroll · nested
comments · file explorer tree · tic-tac-toe.

### Phase 3 — full rounds (week of Aug 4 →)

One 60-90 min timed round per week, from the Akshay series. **Not in the lab** — a real Vite project
in VS Code with Copilot disabled, because a real round is a multi-file app and the file structure is
itself graded.

## Resources

- **Namaste dev practice** — https://namastedev.com/practice — the daily volume from Phase 2 on.
  Small, graded, JS + React. **Sort easy-first.**
- **Akshay Saini machine coding series** — https://www.youtube.com/watch?v=J-QIayOSDN8&list=PLU56c6oCwyh7rGUlJblJ8A8ujRNS7w0aM
  — **Phase 0 (process extraction) and Phase 3 (full rounds) only.** See the one-per-week cap above.
- **MDN + React docs** — allowed during the clock. Everything else is not.

## Level

Beginner *on the round*, not on the language. He is a working developer. The gap is the **cold
build**, not the JavaScript.
