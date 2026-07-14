# Profile — the model of how Tarun codes

> **This is the file that makes the AIOS a coach instead of a grader.**
>
> ⚠ **REWRITTEN at every `/machine-coding review`. Never appended to. Hard cap: 150 lines.**
> A log grows forever; a model does not. This is the same size after 100 sessions as after 3 — which
> is the entire reason this system still costs ~1,600 tokens a session in month six.
>
> A human coach doesn't reread every past session either. They carry a model of you. **This is that
> model.** Everything else (`builds/**`) is cold storage and is not read.

**Sessions banked:** 0 · **Last updated:** — (seeded 2026-07-14, pre-first-session)

---

## Primitive mastery

`—` never attempted · `~` shaky (built it, needed lookups) · `✅` owned (cold, under target)

Full definitions + target times: [`primitives.md`](primitives.md).

| Tier 1 — DOM/JS | | Tier 2 — React | | Tier 3 — Interaction | |
|---|---|---|---|---|---|
| List render | — | Controlled input | — | Drag & drop | — |
| Controlled input | — | List CRUD | — | Infinite scroll | — |
| Event delegation | — | Lifting state | — | Pagination | — |
| Debounce | — | useEffect cleanup | — | Undo/redo | — |
| Throttle | — | Derived vs stored | — | Optimistic update | — |
| localStorage | — | Custom hooks | — | Tree recursion | — |
| Fetch states | — | useReducer | — | | |
| Timer + cleanup | — | Context | — | | |
| Event emitter | — | Portal / modal | — | | |
| Keyboard nav | — | Form validation | — | | |
| | | Refs | — | | |

**Owned: 0 / 27** · shaky: 0 · untouched: 27

---

## Recurring failure modes

The top 5, by count. **A failure mode with a count of 3+ is not a mistake, it is a habit** — and it
gets targeted directly by the next problem the profile picks.

| Failure mode | Count | Last seen | Status |
|---|---|---|---|
| _(nothing yet — needs a first session)_ | | | |

**Candidates to watch for, based on the stated diagnosis** *(hypotheses, not findings — delete any that
don't show up in the data):*
- Starts coding without asking a single clarifying question
- Discovers the component structure while typing instead of deciding it first
- Stores derived state (the #1 structural bug in this round)
- Styles before P0 renders
- Forgets the empty state

---

## Freeze signature

**Where he stalls.** The highest-value signal in the system — pause data that self-report can never
produce. Populated from pauses > 45s in the session replay.

| Stage | Freezes | Median length | Typical cursor location |
|---|---|---|---|
| Clarify | — | — | — |
| Design | — | — | — |
| State init | — | — | — |
| Event wiring | — | — | — |
| Render / JSX | — | — | — |
| Debugging | — | — | — |

**Current read:** *no data yet.*

---

## Trends

Last 5 sessions unless noted. **These are the numbers that show whether this is working.**

| Metric | Value | Direction |
|---|---|---|
| Median time-to-first-render | — | — |
| Clarifying questions asked | — | — |
| Rubric score (out of 10) | — | — |
| P0 hit-rate (last 10) | — | — |
| Longest single freeze | — | — |

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
| _(empty)_ | | |

---

## Coach's standing note

*One paragraph, rewritten each review. What I'd tell an interviewer about him, and what he should
work on next. Kept short on purpose.*

> **Seed (2026-07-14, pre-first-session):** Working developer; the JavaScript is not the gap. The gap
> is the **cold build** — AI-assisted coding atrophied *blank file → structure*, and confidence is low
> enough that he expects to fail simple problems. Phase 1 is deliberately set below his level so he
> finishes every one. **Watch specifically for whether he asks zero clarifying questions and whether he
> discovers structure while typing** — those are the two predicted habits, and the design gate exists to
> break the second one. Do not let him skip ahead to interviewer mode early; the confidence rebuild is
> load-bearing, not a nicety.
