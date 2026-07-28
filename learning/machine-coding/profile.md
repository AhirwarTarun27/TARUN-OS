# Profile — the model of how Tarun codes

> **This is the file that makes the AIOS a coach instead of a grader.**
>
> ⚠ **REWRITTEN at every `/machine-coding review`. Never appended to. Hard cap: 150 lines.**
> A log grows forever; a model does not. This is the same size after 100 sessions as after 3 — which
> is the entire reason this system still costs ~1,600 tokens a session in month six.
>
> A human coach doesn't reread every past session either. They carry a model of you. **This is that
> model.** Everything else (`builds/**`) is cold storage and is not read.

**Sessions banked:** 1 · **Last updated:** 2026-07-28 (counter, R0 attempt-day 2, 4.25/10, P0 ✗)

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
| Throttle | — | Derived vs stored | — | Optimistic update | — |
| localStorage | — | Custom hooks | — | Tree recursion | — |
| Fetch states | — | useReducer | — | | |
| Timer + cleanup | — | Context | — | | |
| Event emitter | — | Portal / modal | — | | |
| Keyboard nav | — | Form validation | — | | |
| | | Refs | — | | |

**Owned: 0 / 27** · shaky: 1 · untouched: 26

**Lifting state** is `~` on structure, not on execution — `count` in `App`, handlers passed down to a
presentational `Counter`. Correct on the first try. It never ran, so it doesn't graduate past `~`.

**Derived vs stored stays `—`, and this is deliberate.** Counter exists to train it: the bounds are
derived (`count === max`), and the requirement he was *given* was "the buttons should disable at the
bounds." He never implemented the disable, so he never wrote the derivation. He didn't store derived
state — but only by not writing the feature at all. **That is a vacuous pass and it must not be
credited.** The primitive is untouched until a build actually derives something.

---

## Recurring failure modes

The top 5, by count. **A failure mode with a count of 3+ is not a mistake, it is a habit** — and it
gets targeted directly by the next problem the profile picks.

| Failure mode | Count | Last seen | Status |
|---|---|---|---|
| **Never exercises the interaction he just wired** | 1 | 2026-07-28 | 🎯 **THE fix.** Wrote both handlers, never clicked a button. `setState is not defined` survived 15 min and the buzzer. |
| Blows the time target badly | 1 | 2026-07-28 | 25:38 vs a 15:00 target (+71%) on the smallest problem in the bank. |
| **Builds a near-miss of the requirement he was handed** | 1 | 2026-07-28 | Asked about bounds, was told *"Min 0, max 10. **The buttons should disable at the bounds.**"* Built value-clamping instead — and the min clamp is off by one, so it reaches −1 anyway. Winning the clarify point and then not implementing the answer is worse than never asking. |
| Self-rates high on a build that doesn't run | 1 | 2026-07-28 | Tagged `solo` 4/5 with P0 ✗. Watch this one — an inflated rating poisons every rung above it. |

**Disconfirmed on session 1** *(predicted by the seed diagnosis, did NOT happen — do not re-add without
new evidence):*
- ~~Starts coding without asking a single clarifying question~~ → asked 3, two landed.
- ~~Discovers the component structure while typing~~ → wrote the design first and the code matched it.
- ~~Styles before P0 renders~~ → touched zero CSS.

Still unobserved (no data): stores derived state; forgets the empty state.

---

## Freeze signature

**Where he stalls.** The highest-value signal in the system — pause data that self-report can never
produce. Populated from pauses > 45s in the session replay.

| Stage | Freezes | Median length | Typical cursor location |
|---|---|---|---|
| Clarify | 0 | — | — |
| Design | 0 | — | — |
| State init | 1 | 2:00 | `useState(0)` → first handler body |
| Event wiring | 2 | 0:57 | the `Counter({...})` props signature |
| Render / JSX | 0 | — | — |
| Debugging | 0 | — | — |

**Current read:** he does not freeze while *deciding*. He freezes while *connecting* — every stall was
at the seam between a component and its handlers. Design phase: clean. Clarify phase: clean. All three
freezes landed inside CODE, and none of them were spent debugging, because he never ran the path that
was broken. **Zero debugging freezes with a broken P0 is the tell, not a compliment.**

---

## Trends

Last 5 sessions unless noted. **These are the numbers that show whether this is working.**

| Metric | Value | Direction |
|---|---|---|
| Median time-to-first-render | 1:16 (from CODE start) | — (baseline, and it's strong) |
| Clarifying questions asked | 3 (2 landed) | — (baseline) |
| Rubric score (out of 10) | 4.25 | — (baseline) |
| P0 hit-rate (last 10) | 0 / 1 | — |
| Longest single freeze | 2:00 | — (baseline) |
| Time vs target | +71% | — (baseline) |

---

## The hint ledger

**What actually unblocks him.** Max 8 entries, least-recently-useful evicted.

> This is the payoff. In month two, the coaching is not *"here's a hint."* It is:
> ***"You're stalling at state init again, same as Jul 14 and Jul 22. Both times, the unlock was
> asking: what is the smallest thing that changes when the user clicks?"***
>
> That only works if this table is honest and kept small.

| When he's stuck on | The hint that worked | Times used |
|---|---|---|
| _(empty — session 1 took no hints and no lookups; nothing has been tested on him yet)_ | | |

---

## Coach's standing note

*One paragraph, rewritten each review. What I'd tell an interviewer about him, and what he should
work on next. Kept short on purpose.*

> **After session 1 (2026-07-28, counter, 4.25/10, P0 ✗):** The seed diagnosis was **wrong about the
> shape of the gap.** He clarifies, he designs before he types, he doesn't style early, and he hit
> first render 1:16 into CODE with a component split that was correct on the first attempt. Blank
> file → structure is **not** the problem. The problem is the **verification loop**: he writes code
> forward and never runs the path he just wrote, so a one-word typo (`setState` where `setCount` was
> declared four lines up) lived through 15 minutes and cost the entire 3-point P0 block on a problem
> he had already solved structurally. He also stalls at **wiring**, never at deciding — all three
> freezes sat at the component/handler seam. He also **won the clarify point and then didn't build the
> answer** — told the buttons should disable at the bounds, he wrote value-clamping instead. Next
> session, grade him hardest on **click-after-wire** and on **finishing under target**; his structure
> does not need coaching yet. Watch the honesty of his self-ratings — he tagged a non-running build
> 4/5, and the ladder is only worth anything if that number is brutal. He is closer to a passing round
> than the score suggests; do not soften the score to tell him that, tell him directly.
>
> **Live ladder decision (2026-07-28):** Counter is Building at attempt-day 2 and got a **one-time
> extension to day 3** instead of the `watched` force-bank. The cap exists for *can't derive the
> structure*; he derived it. Blank file, solo — green → bank R0 `solo`, not green → `watched`, no
> further extension.
