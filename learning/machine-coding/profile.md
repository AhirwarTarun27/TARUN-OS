# Profile — the model of how Tarun codes

> **This is the file that makes the AIOS a coach instead of a grader.**
>
> ⚠ **REWRITTEN at every `/machine-coding review`. Never appended to. Hard cap: 150 lines.**
> A log grows forever; a model does not. This is the same size after 100 sessions as after 3 — which
> is the entire reason this system still costs ~1,600 tokens a session in month six.
>
> A human coach doesn't reread every past session either. They carry a model of you. **This is that
> model.** Everything else (`builds/**`) is cold storage and is not read.

**Sessions banked:** 2 · **Last updated:** 2026-08-11 (counter, **R0 banked `solo`**, 6.1/10, P0 ✓)

---

## Primitive mastery

`—` never attempted · `~` shaky (built it, needed lookups) · `✅` owned (cold, under target)

Full definitions + target times: [`primitives.md`](primitives.md).

| Tier 1 — DOM/JS | | Tier 2 — React | | Tier 3 — Interaction | |
|---|---|---|---|---|---|
| List render | — | Controlled input | — | Drag & drop | — |
| Controlled input | — | List CRUD | — | Infinite scroll | — |
| Event delegation | — | Lifting state | ~ | Pagination | — |
| Debounce | — | useEffect cleanup | — | Undo/redo | — |
| Throttle | — | **Derived vs stored** | **~** | Optimistic update | — |
| localStorage | — | Custom hooks | — | Tree recursion | — |
| Fetch states | — | useReducer | — | | |
| Timer + cleanup | — | Context | — | | |
| Event emitter | — | Portal / modal | — | | |
| Keyboard nav | — | Form validation | — | | |
| | | Refs | — | | |

**Owned: 0 / 27** · shaky: 2 · untouched: 25

**Derived vs stored — promoted `—` → `~` on 08-11.** He wrote `disabled={count === 0}` and
`disabled={count === 10}`: the bounds computed from `count`, no `isMaxed` state. That is exactly the
bug this problem exists to find, and he didn't write it. `~` not `✅` — it took 26 minutes and three
freezes to get there.

**Lifting state stays `~`, and it went BACKWARDS this session.** His design said `<Button/>` with
`count` passed down; he then built a single `App` with no child component at all. Counter's stated
purpose is *"count lives in the parent, the buttons live in the child."* Session 1 designed it right
and never ran it; session 2 ran it and never built it. **Two sessions on this problem, primitive still
unexercised.** R3 must produce the child component or the rung is cosmetic.

**Refs `—`, and the 08-11 warm-up confirms why:** he reached for `ref.onFocus(true)` and used one ref
where the drill asked for an array. Nothing rendered (the component was named `app`, not `App`), so
he got no feedback at all.

---

## Recurring failure modes

The top 5, by count. **A failure mode with a count of 3+ is not a mistake, it is a habit** — and it
gets targeted directly by the next problem the profile picks.

| Failure mode | Count | Last seen | Status |
|---|---|---|---|
| **Jumps to implementation without eliciting requirements** | 2 | 2026-08-11 | 🎯 **THE fix.** 6 requirements never surfaced; 3 asked, 1 landed. Never asked *"what must work if I run out of time?"* — the one question that hands you the P0. His own words: *"I directly think about the solution... what should be the code."* |
| **Blows the time target badly** | 2 | 2026-08-11 | **+77%** (26:35 vs 15:00), worse than 07-28's +71%. Two sessions, same problem, both way over. |
| **Skips the guidance the phase is FOR** | 1 | 2026-08-11 | `designReviewRequested: false` in **Phase 1**, whose definition is *"design reviewed before coding."* Free, clock paused, shipped past it — and the design had a prop/state duplication the review would have caught in one line. |
| CSS before P0 is green (law #2) | 1 | 2026-08-11 | 24:17, with P0 never marked. Session 1 touched zero CSS, so this is new. |
| Writes JSX style-object syntax into `.css` | 1 | 2026-08-11 | `display: 'flex'`, `justifycontent: 'space-between'`. Quoted values are invalid CSS and `justifycontent` is not a property. **Neither rule applied** and he didn't notice. |

**Cleared on 08-11** *(fixed — do not re-add without new evidence):*
- ~~Never exercises the interaction he just wired~~ → **fixed.** Clicked through 0→10, clean runs from
  22:00 on. This was THE fix after session 1 and it took one session.
- ~~Builds a near-miss of the requirement he was handed~~ → **fixed.** Told the buttons should disable
  at the bounds; this time he built the disable, on both ends, correctly.
- ~~Self-rates high on a build that doesn't run~~ → **fixed, and this one matters most.** 4/5 on a
  broken build (07-28) → **3/5 on a working one.** The ladder is only worth something if that number
  is honest, and it now is.

Still unobserved: forgets the empty state.

---

## Freeze signature

**Where he stalls.** The highest-value signal in the system — pause data that self-report can never
produce. Populated from pauses > 45s in the session replay.

| Stage | Freezes | Median length | Typical cursor location |
|---|---|---|---|
| Clarify | 0 | — | — |
| Design | 0 | — | — |
| State init | 1 | 2:00 | `useState(0)` → first handler body |
| **Event wiring** | **5** | **1:27** | the empty `function onClickHandler(){` body |
| Render / JSX | 0 | — | — |
| **Debugging** | **1** | 1:27 | a ternary with no else branch |
| Re-reading his own design | 1 | 1:17 | the comment block at jsx:5 |

**Current read: confirmed twice, and it is now the signature.** He does not freeze while *deciding* —
clarify and design are clean in both sessions. He freezes at **wiring**: 5 of 8 lifetime freezes sat
inside an empty handler body, staring at how to parameterize it. The unlock both times was the same
decision — *one handler taking an argument, or two handlers?* He burned 3:00+ on that question alone.

**New and good: the first debugging freeze he has ever recorded** (19:46, on a broken ternary). Session
1 had zero debugging freezes *because he never ran the broken path* — that was the tell, not a
compliment. A debugging freeze means the verification loop is finally running.

---

## Trends

Last 5 sessions unless noted. **These are the numbers that show whether this is working.**

| Metric | Value | Direction |
|---|---|---|
| Median time-to-first-render | **0:37** (from CODE start) | ⬆ from 1:16 — strong and improving |
| Clarifying questions asked | 3 (**1** landed) | ⬇ from 3 (2 landed) |
| Requirements never surfaced | 6 | new metric — the biggest single gap |
| Rubric score (out of 10) | **6.1** | ⬆ from 4.25 — first pass |
| P0 hit-rate (last 10) | **1 / 2** | ⬆ |
| Longest single freeze | 1:54 | ⬆ from 2:00 |
| Time vs target | **+77%** | ⬇ from +71% — the one metric moving the wrong way |

---

## The hint ledger

**What actually unblocks him.** Max 8 entries, least-recently-useful evicted.

| When he's stuck on | The hint that worked | Times used |
|---|---|---|
| _(still empty — 2 sessions, zero hints taken, zero lookups. Untested.)_ | | |

**Untested after two sessions is itself a finding:** he does not ask for help, he absorbs the time
instead. That is what +77% looks like from the inside.

---

## Coach's standing note

> **After session 2 (2026-08-11, counter, 6.1/10, P0 ✓, R0 `solo`):** The session-1 fix worked in one
> rep — he clicked the buttons, found his own bug, and rated himself *down* on a build that actually
> runs. Verification loop: closed. First render at **0:37** is genuinely good and structure still needs
> no coaching. **The gap has moved one stage earlier: he does not gather requirements.** Six were never
> surfaced, he never asked the question that hands you the P0, and he skipped the free design review
> that would have caught `count` as both prop and state in his own written design. His self-report
> diagnoses it perfectly without prompting — *"I directly think about the solution."* That is the whole
> profile in one sentence. Everything downstream follows from it: no P0 defined → the P0 boxes never
> ticked → +77% over target because nothing sequenced the work. **Next session, grade hardest on the
> clarify phase and on finishing under target; do not spend a word on his structure.** Also watch that
> Counter has now been built twice without ever producing the child component it exists to train —
> R3 must produce `<Counter>`/`<Button>` or the rung is cosmetic.
>
> **Ladder ruling (2026-08-11) — an explicit override, logged so it is never a quiet precedent:**
> `ingest.mjs` returned `P0 ✗` because `goals: {}` — the P0 checkboxes in the lab were never ticked.
> Banked **R0 `solo`** anyway on *evidence in the replay*: `finalDom` shows `<h1>10</h1>`, count driven
> 0→10, Increase disabled at the bound — all three of `bank.js`'s P0 criteria satisfied, plus clean
> runs from 22:00 to the buzzer. **This is categorically different from the 2026-07-28 bank the guard
> was written to stop**, where the header read `P0 ✗` and the build genuinely threw
> `setState is not defined`. A claim was overridden then; a checkbox is being overridden now.
> **Ticking P0 is the demo step — in a real round nobody reads your code, they watch it run.** Miss it
> again and it is a failure mode, not a bookkeeping slip.
