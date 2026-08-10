# Learning record — Lesson 4: The `this` keyword & binding

**Drilled:** 2026-08-07 · 4 rounds (gate + speak → follow-ups → predict R1 → predict R2 → label re-test)
**Verdict:** M4 gate **PASSED**. Cleared for M5.

---

## Scores

| Round | Content | Result |
|---|---|---|
| §0 gate (carried from L3) | HOF vs callback · `===` on objects | **2/2 — both L3 open items closed** |
| Speak (S1-S7) | theory, interviewer-style | 5 pass · 1 half · 1 miss |
| Follow-ups (F1-F8) | the mandatory "so why" | 4 pass · 2 half · 2 miss |
| Predict R1 (Q1-Q5 + bonus) | cold snippets, fresh | **2.5 / 6** |
| Predict R2 (R1-R4) | cold snippets after the fix | **3.5 / 4** |
| Label re-test (8 rapid) | rule number + name only | **7 / 8 — gate bar was 7** |

---

## Finding 1 — the call-point gap (fixed in-session)

**Not a `this` knowledge gap. A call-point gap.**

He knows the rule — he said "decided at invocation" in S1 unprompted and got the hardest
precedence question in the set (`new` beats `bind`, F4) right on the first try. But the
moment a function is invoked by **somebody else's code** — `forEach`, `map`, `setTimeout`,
the comma operator — his eye goes back to where the function was *written*, and question 5
never fires.

The tell was lexical and it repeated **five times in one session**:

- S1: "binds the **surrounding** object"
- S4: "it binds the object **where it is defined**"
- F3: skipped the sub-question when challenged on that exact word
- Q1: "the addAll function **has** the counter object binding"
- Q4: "this points to the object **where the inner function is defined**"

Every round-1 miss was one instance of it:

| Snippet | He said | Truth | The `(` that fired it |
|---|---|---|---|
| Q1 `forEach(function(){ this.n += x })` | `6` | **`0`** | inside `forEach`'s implementation — bare |
| Bonus `(0, b.show)()` | `TypeError` | **`undefined`** | comma operator returns a naked function value |
| Q4 reasoning | "where it is defined" | the arrow reads `init`'s `this`, set at **`init`'s** call site | — |

**This is L3's finding in a new costume.** L3 = a *read*-point gap (assumed the read happens
on the line you're looking at). L4 = a *call*-point gap (assumed the call happens where the
function is written). Same root: he anchors on the source location instead of the moment.

**The fix taught:** physical, not conceptual — *find the `(` that actually runs the function,
then ask question 5 there.* Plus the "what strips the dot" table (see lesson §7b).

**Confirmed fixed in round 2.** R1, R2 and R4 are all "somebody else invokes it bare" and he
got all three cold, unprompted. That was the entire defect ninety minutes earlier.

---

## Finding 2 — the `.call`/`.bind` dot trap (the sharper, more valuable one)

He mislabeled explicit binding as **implicit binding three times**:

- Q2a: `g(20)` where `g = f.bind({v:1}, 10)` → said rule 3
- R2 label: `logger.log.bind(logger)` invoked later → said rule 3
- R4 label: `inner.call(this)` → said rule 3

**And his outputs for those same three snippets were all correct.** F5, Q2b and R4's output
were perfect. So the mechanism is understood and only the *filing* is wrong.

**Cause: the dot in `.call` / `.apply` / `.bind` is triggering rule 3 by surface shape.**
`inner.call(this)` looks like `obj.fn()`, so "left of the dot" fires — even though running
that rule honestly gives nonsense (`this === inner`, a function).

**The discriminator taught:**
> Rule 3 reads the object to the **LEFT of the dot**. Rule 2 reads the object **INSIDE the
> parentheses**. If the context arrived as an argument, it is always rule 2.
> And: **anything that came out of `bind` is rule 2 forever**, however it is later invoked.

This is **L2's finding recurring** — *he fires the first rule the snippet's surface resembles
and stops.* Three lessons, three appearances. It is the single most durable failure mode in
this course and it now has a name: **surface-shape matching.**

Re-tested immediately with 8 label-only prompts: **7/8**, rule 2 correct in both places and
not over-fired into rules 3 or 4. Item closed same session (same pattern as the 07-31
pre/post-increment close).

---

## Finding 3 — the label skip is now a reliable signal, not an oversight

Round 2 was asked, in bold, for "output **plus** the rule number and name for every call."
He returned output-only on all four snippets. Third session running with this shape
(`TypeError` in L2, `n++`/`===` in L3, rule names here).

**Standing rule reconfirmed and strengthened: when he silently drops the labelling half of a
question, that is the miss, not a formatting slip.** Ask for the label separately and cold —
it comes out wrong often enough to be worth its own round. The separate label round is what
produced Finding 2, which the output-based rounds had completely hidden.

---

## What was already solid (do not re-teach)

- **The four rules and their precedence.** Named all four in order, cold, first ask.
  Got `new B()` where `B = F.bind(o)` → rule 1 wins. Most candidates miss that.
- **Strict vs non-strict default binding.** Named the *substitution* explicitly in S6, not
  just "it's window."
- **Closures vs `this`** (S7) — strongest answer of the session. Lexical-and-locked vs
  re-decided-per-call, plus "`this` can be forced from outside with call/apply/bind."
  Gave the contrast *and* its standard follow-up unprompted.
- **`call` vs `apply` argument syntax** — missed in S3, fully recovered in F5 and never
  wrong again.
- **The L3 carry-ins are dead:** HOF vs callback answered by signature (not "a function
  inside a function"), and `===` on objects answered as reference identity + the React
  re-render consequence.

---

## Taught but never tested — carry into Lesson 5's §0 gate

1. **Arrow created inside a constructor survives extraction.** R3's `b()` → he said
   `undefined`, truth is `"T"`. The discriminator he lacks: *does a real function enclose the
   arrow?* Object literal → no → reaches global. Constructor → yes → captures the instance.
   Received the teaching, never re-tested cold.
2. **Arrow class field vs prototype method** — per-instance allocation vs shared. This is the
   standard React follow-up, and M5 *is* prototypes, so it tests naturally there.
3. **`f.call.bind(f, ctx)`** — the uncurry-this idiom, the 1/8 he missed. Low priority
   (genuinely hard), but it is the same surface-shape failure at higher difficulty.
4. **Rule *names*, not just numbers.** He answered "4, bare call" — that is what the call
   *looks like*; the rule is **default binding**. Minor, but the name is what gets spoken in
   an interview.

---

## Method notes for the next drill

- **Run a label-only round every lesson from now on.** Output rounds mask labelling gaps
  completely — R2 scored 3.5/4 on output and 2/4 on the labels for the *same snippets*.
  Cheap (60 seconds), and it is where the real diagnosis came from twice in a row.
- **Use fresh snippets, never the lesson's own drills.** He has read D1-D6; Q1-Q5 and R1-R4
  were written new for this session, which is why Q1 caught anything at all.
- He asked to be taught after round 1 ("my confidence is not that much"). The ask was
  accurate and well-timed — he requested it *after* attempting, not instead of attempting.
  That is the right instinct; don't discourage it by front-loading explanation.
