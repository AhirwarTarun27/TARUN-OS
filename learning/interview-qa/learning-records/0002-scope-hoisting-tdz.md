# Learning record — Lesson 0002: Scope, Hoisting & the TDZ

**Drilled:** 2026-07-28 · 13 cold snippets, 3 rounds, no notes, no running code.

## Score

| Round | Snippets | Clean | Notes |
|---|---|---|---|
| 1 | 5 | 4 | one off-by-one on a loop exit value |
| 2 | 5 | 1 | 3 half-right (correct verdict, wrong mechanism or wrong error type) |
| 3 | 3 | 1 | targeted at round-2 misses, still missed 2 |
| 4 | 5 | 3 | **procedure applied**, 2 partial. Gate passed. |

## The finding (this is the whole record)

**Not a knowledge gap. A retrieval-indexing gap.**

Three times in one session he answered a rule correctly, then missed *the same rule* in a
different-looking snippet minutes later:

| Rule | Right in | Missed in |
|---|---|---|
| Redeclaration is a no-op | R1 Q7 (`var` over a parameter) | R3 Q11 (bare `var a;`) |
| `let` hoists **uninitialized** (TDZ) | R1 Q5 | R3 Q12 (applied the `var` rule to a `let`) |
| `typeof` is safe on undeclared, NOT in TDZ | R1 Q5 | R2 Q9 (used the TDZ half on an undeclared name) |

He pattern-matches on the **surface shape** of the snippet, fires the first rule he recognises, and
stops. When the dress changes, the rule stops firing. He also does not re-check binding state after
each line, which is what caused R2 Q6 (right about function-declaration-beats-`var`, then forgot the
`= 10` assignment on line 2 still executes).

## Specific misses

- **Loop exit value.** Said `i` ends at 4 in a `i < 3` loop. It ends at 3. The counter always lands
  on the first value that FAILS the test.
- **`TypeError` vs `ReferenceError`.** Called `arr = [1]` on a `const` a `ReferenceError`. It is a
  `TypeError: Assignment to constant variable`. He'd been given this distinction one round earlier.
- **Never flags halted execution.** Did not notice, unprompted, that a line after an uncaught throw
  never runs. Asked directly, still missed it.
- **Dead code still hoists.** Thought `var g` inside `if (false)` means `g` never exists. Hoisting is
  parse-time and ignores reachability. (He got this one right on the retry.)

## What was solid

- Core definitions are genuinely in: hoisting, TDZ, block vs function scope, shadowing, `const`
  binding vs value. He can state all of them unprompted and correctly.
- R1 Q1 (shadowing + hoisting, two scopes) fully correct including why the global survives.
- R3 Q13 fully correct, both halves, right reasons.

## The fix issued

Added **§7 "The three-question procedure"** to the lesson: for every identifier, ask (1) which
keyword declares it, (2) what state the binding is in *at this exact line*, (3) what you're doing to
it — then read the outcome off a 4×4 state/operation table. Every miss in this session is one cell
in that table. Also banked the two redeclaration no-ops explicitly, since that rule flipped him.

## Round 4 — the procedure works

Re-drilled 5 snippets requiring a per-line state annotation. Result: 3 clean, 2 partial, versus 1/3
the round before. He annotated state per line, tracked nested hoisting across two scopes at once
(Q17), and **flagged halted execution twice unprompted** — the thing he could not do in rounds 2-3.
The indexing gap closed as soon as he had a procedure to run instead of a pattern to match.

Also got the strict-mode half of the block-level-function-declaration question (`typeof a` → `number`),
which is the half most candidates miss. Was taught the sloppy-mode Annex B half.

## The one item still open

**He does not name `TypeError`.** Three occurrences in one session: called it a `ReferenceError`
(R2 Q8), was shown the table (R3), then avoided naming it entirely while describing the behavior
correctly (R4 Q15). The behavior is understood; the label will not stick.

The sentence that should fix it: *the name resolved fine, so the reference is not the problem — the
operation on the binding is illegal, therefore `TypeError`.* Re-test this specific item cold at the
start of Lesson 3, and again at the Lesson 5 (`Object.freeze`) drill where it recurs naturally.

## Verdict

**Gate passed → cleared for Lesson 3.** The process failure is fixed. What remains is one isolated
fact, not a reasoning problem, so more scope drilling has hit diminishing returns.
