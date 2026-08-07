# Teaching Notes — Interview Q&A

## User preferences (locked)
- **Rebuild from fundamentals.** Assume nothing; clean re-teach.
- **Medium lessons:** ~8-10 questions, ~20 min each.
- **FLOW is the whole point.** Re-sequence the ebook by dependency, not by its format-based sections.
  Never introduce a keyword before the lesson that owns it. Every lesson explicitly connects back to
  the previous one and forward to the next.
- **Dark theme** for all HTML (light hurts his eyes). Shared stylesheet: `assets/course.css`.
- **Ignore Angular** (20 scenario Qs). React is his core library.
- He's a working dev — respect that. Rebuilding = filling gaps + sharpening articulation, not baby steps.

## Method
- Interleave: teach a concept, then immediately pull the ebook's OUTPUT-based Qs and PROBLEMS that use
  it as retrieval practice in the same/next lesson. This is what makes the dots connect.
- **Every drill has TWO halves (locked 2026-07-30, his request).** A lesson is not gated until both pass:
  1. **Speak it** — interviewer-style theory questions on the material just taught. "What is X?",
     "X vs Y?", "when would you reach for X?" — asked the way a human asks them, not as snippets.
     Always **first**, before any snippet, so it's genuine recall and not read-off-the-code.
  2. **Predict it** — the cold output snippets / coding drills.
  Reason: he was passing gates on output prediction alone. Predicting output wrong loses a whiteboard
  question; going blank on "what is a closure" loses the phone screen. Different failures, both real.
- **How to grade the speak half — wording free, keywords strict.** He will NOT recite definitions
  word-for-word and must never be marked down for paraphrasing, reordering, or using his own words.
  But each theory question carries **2-4 must-hit terms** that encode the mechanism (`lexical` for
  closures, `call time` for `this`, `TypeError` for an illegal op on a resolved binding, `microtask`
  for promise ordering). Missing a must-hit term is a miss — those are the exact words interviewers
  listen for, and his own L3 lesson makes the point that "a function inside a function" describes the
  shape, not the mechanism. State the must-hit terms in the grade, not in the question.
- **Every theory answer gets one mandatory "so why…?" follow-up.** The first answer is usually the
  memorised surface; the follow-up is where the understanding is. A correct definition that collapses
  on the follow-up is a miss.
- Every lesson: knowledge (cited) → retrieval quiz → output-prediction/coding drill → primary source → next.
- Source of truth for question mapping: `reference/232Questions.txt` (extracted from the PDF).

## TODO / backlog
- [ ] Build `reference/glossary.html` once term count justifies it (hoisting, TDZ, coercion, closure, etc.).
- [ ] Find a trusted React machine-coding source before Module 17 (see RESOURCES Gaps).

## Progress log
- 2026-07-07: Workspace created. Mapped all 5 non-Angular sections. Built course map + Lesson 0001 (Types & Coercion).
- 2026-07-25: M1 marked done. Built Lesson 0002 (Scope, Hoisting & the TDZ) — scope chain, hoisting
  table, TDZ, var/let/const 4-axis answer, the "prints 6" loop with both fixes, 4 quizzes + shadowing
  bonus. Added `.tbl` / `.tbl-scroll` comparison-table styles to `assets/course.css` (first lesson to
  need tables). Deliberately previewed a closure at the end of the loop drill so M3 lands as a name
  for something already felt. Next: Lesson 0003 — Functions, closures & HOFs.
- 2026-07-28: Drilled L2 cold — 13 snippets, 3 rounds. Score fell round over round (4/5 → 1/5 → 1/3).
  Finding: **not a knowledge gap, a retrieval-indexing gap.** He answered three rules correctly and
  then missed the SAME rule in a different-shaped snippet minutes later. He fires the first rule the
  snippet's surface resembles and stops, instead of reading binding state per line. Fix shipped as
  lesson §7 "The three-question procedure" + a 4×4 state/operation table (every miss was one cell).
  Full record: `learning-records/0002-scope-hoisting-tdz.md`.
  **Gate for Lesson 3: he applies the procedure unprompted, not that he scores higher.** Re-drill 5
  snippets first and reject output-only answers.
  → Round 4 (same day): 3/5 clean, procedure applied, halted execution flagged unprompted. **Gate
  passed, cleared for Lesson 3.** One item still open: he will not name `TypeError` (3 misses in one
  session, behavior understood, label won't stick). Re-test it cold at the top of Lesson 3 and again
  at the `Object.freeze` drill in M5, where it recurs naturally.
- 2026-07-29: Built Lesson 0003 (Functions, Closures & HOFs). Opens with a **§0 gate check** re-testing
  the open `TypeError` item before any new material — that pattern (carry the open item into the next
  lesson's cold open) should repeat for every unresolved drill finding. Covers functions-as-values →
  lexical environment → closure → private state → callbacks → HOFs → pure/impure → IIFE → arrow limits,
  plus `once`/`memoize`/counter drills. Deliberately re-uses M2's "prints 6" loop and its `3 3 3`
  synchronous twin, so closures are introduced as the NAME for something already met twice.
  `this` is parked for M4 with an explicit note (arrows can't be taught without touching it).
  M2 marked done, M3 current. **Not drilled yet — do not advance to M4 until it is.**
- 2026-07-30: Drilled L3 cold — 9 snippets, 2 rounds. R1 2/5, R2 3/4. Finding: **not a closure gap, a
  read-point gap.** All three R1 misses put a *time gap* between the write and the read (counter
  mutation, `var` loop, `push` before a `length` read) — L2's three-question procedure assumes the read
  is on the line you're looking at, so it doesn't fire across a gap. Fix shipped as lesson **§3b "The
  fourth question"** (*when does this run, and what is the binding at that moment?*) + a
  captured-vs-copied table + a pre/post increment callout. R2 confirmed the fix on three deferred-read
  snippets. **L2's open `TypeError` item closed cold, first try, unprompted.** M3 done, M4 current.
  Full record: `learning-records/0003-functions-closures-hofs.md`.
  → **Open item to carry into Lesson 4's §0 gate check:** pre vs post increment as a *returned* value
  (`n++` → old, `++n` → new). Cold, before any new material.
- 2026-07-30 (late, ran past midnight): unplanned coding-drill session on L3 §10 — `once` then `memoize`.
  He asked for `once` to be explained; the block was that he read the two moments (`once()` runs vs the
  wrapper runs) as one. Taught it as A/B moments + the box-and-remote picture; landed. Then he built
  `memoize` in three passes: v1 compared *results* not *arguments* (the real conceptual error — you
  can't know the result without doing the work you're skipping) → v2 `{}` cache, single arg, worked →
  v3 `Map` + `JSON.stringify(args)`. He found the `let key;` unassigned bug by tracing, not running.
  **He learns this material by tracing execution by hand — keep pushing traces over "run it and see".**
  Covered: prototype-chain `in` bug, string-coerced object keys, type-preserving serialization,
  and the serialize-key limitation (object key order, functions → `null`).
  Note for L4: he twice answered only the output half of a two-part question (`n++` vs `++n`; the
  collide question). Consistent enough to be a pattern, not a slip — see the note below.
- Teaching note (generalise this): **a skipped sub-question is a miss signal, not an oversight.** When a
  drill attaches "and say why X differs from Y" to a snippet and he answers only the output, grade the
  sub-question as missed. Same avoidance shape as L2's refusal to name `TypeError` — describe the
  behavior, dodge the label.
- Teaching note (generalise this): cold-drill every lesson before moving on. The lesson HTML alone
  produced confident recall of definitions and unreliable application. The drill is where the real
  diagnosis came from, and the misses are better lesson content than anything written up front.
- 2026-07-31: Ran the **owed M3 speak half** + a re-drill (§0 gate, S1-S7 spoken, Q1-Q5 cold snippets).
  §0 pre/post increment missed cold, taught, then **passed twice unprompted** in the same session — item
  **closed**. Speak: 5 pass, 1 miss (HOF vs callback), 1 half (memory leaks). Predict: 3/5.
  Finding: **it is a labelling gap, not a reasoning gap.** Three times he stated the correct mechanism
  and then produced the wrong label or value from it — said "same reference", answered `out === user`
  as `false`; had *built* `once`/`memoize`/a factory, defined HOF as "a function inside a function".
  Closures themselves are solid (Q2's let-vs-var discrimination held from last session). The M3 gate's
  "verbal coverage unproven" caveat is **discharged**. Full record: `learning-records/0003-functions-closures-hofs.md`.
  → **Open items to carry into Lesson 4's §0 gate check:** (1) **HOF vs callback**, cold, and do NOT hand
  him examples first — he can build them and not name them; (2) **`===` on objects** — reference identity
  vs structural equality; test it inside M4's objects material, not in isolation.
- Teaching note (generalise this): **when he states the right mechanism, do not accept it as a pass until
  he produces the label or the value from it.** The mechanism sentence is where he is strong and it masks
  the gap — the failure is always one step downstream, at the name. Grade the label, not the explanation.
  This is now confirmed across three sessions and three unrelated topics (`TypeError`, `n++`, `===`).
- 2026-07-31: Built Lesson 0004 (The `this` keyword & binding). Scope taken from the course map — M4 is
  `this` only; objects/prototypes stay M5. Opens with the **§0 gate check** carrying both open L3 items
  (HOF vs callback; `===` on objects) *before* any new material — that pattern is now standard for every
  lesson. Structure: this-is-decided-at-call-time → the four binding rules in **precedence order**
  (new > explicit > implicit > default) → losing `this` (the copied-method bug) → call/apply/bind +
  partial application → **arrows as the payoff L3 deliberately owed** → classes/React → the procedure's
  **fifth question** → 5 quizzes, 6 output drills, `myBind` coding drill.
  Three deliberate connective choices: (1) the whole lesson is framed as the **inverse of L3** —
  closures are lexical and fixed at authoring time, `this` is dynamic and re-decided per call; that
  contrast is the most common follow-up in the module. (2) The copied-method bug is taught as a
  *Lesson 3* fact (functions are values, you threw the call site away), not a new rule. (3) The arrow
  section proves "an object literal is not a scope", which is why the arrow reaches past it — that's the
  L2 scope rule doing the work, not a new arrow rule.
  **Not drilled yet — do not advance to M5 until it is.** When drilling, per the 07-31 grading rule:
  ask for the **rule number and name**, not just the output — he states mechanisms correctly and then
  fails to produce the label.
