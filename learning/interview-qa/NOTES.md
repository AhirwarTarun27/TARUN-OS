# Teaching Notes — Interview Q&A

## User preferences (locked)
- **No repeat Playwright checks (locked 2026-10-08).** Browser-test a new component (like the event loop visualizer) **once**. New lessons, sections and visualizer *scenarios* reuse tested CSS and code, so check them with Node (outputs) and a tag-balance script only.
- **Student-facing text = "you said → what's true".** No internal tags (L#, M#, drill dates) in lessons, the glossary or grades. Those belong in NOTES and the learning records only.
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
- [x] Build `reference/glossary.html` — **done 2026-08-07**, built as a **must-say-terms revision
      sheet**, not a definitions list. Every entry is *asked as → must contain → the follow-up it
      invites*, with the scoring keywords chipped. Opens with his three drill-derived tells, closes
      with a 20-row 60-second self-test. **Rule: extend it at the close of every module** — it is
      the file to re-read the morning of an interview, not the lessons.
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
- 2026-08-07: Drilled L4 — 5 rounds (gate, speak, follow-ups, 2 predict rounds, label-only re-test).
  Both L3 carry-ins (HOF vs callback; `===` on objects) **closed cold**. Speak 5/1/1, follow-ups 4/2/2,
  predict R1 **2.5/6** → predict R2 **3.5/4**, labels **7/8**. **M4 gate passed, M5 current.**
  Two findings, both fixed in-session, both shipped as lesson **§7b**:
  (1) **A call-point gap** — not a `this` gap. He named all four rules in order cold and got
  `new` beats `bind` first try, but when a function is invoked by *someone else's code*
  (`forEach`, `setTimeout`, the comma operator) he read the definition site instead of the call.
  The tell was one word, repeated 5× ("**surrounding**", "**where it is defined**"). This is L3's
  read-point gap in new clothes — both are "he anchors on source location, not the moment". Fix
  taught physically: *find the `(` that actually runs the function* + a "what strips the dot" table.
  Confirmed in R2 (3 of 3 deferred-call snippets clean).
  (2) **The `.call`/`.bind` dot trap** — he labelled explicit binding as *implicit* **three times**
  while getting all three outputs right. `inner.call(this)` has a dot, so rule 3 fires by reflex.
  This is **L2's finding recurring** — fire the first rule the surface resembles, and stop. Named it
  **surface-shape matching**; it is now the most durable failure mode in the course (3 lessons, 3
  appearances). Discriminator taught: *rule 3 reads left of the dot, rule 2 reads inside the parens.*
  Full record: `learning-records/0004-this-and-binding.md`.
  → **Open items to carry into Lesson 5's §0 gate check:** (1) **an arrow created inside a
  constructor survives extraction** — he answered `undefined`, truth is the instance value; the
  discriminator is *does a real function enclose the arrow?* (2) **arrow class field vs prototype
  method** — per-instance vs shared; taught, never tested, and M5 *is* prototypes so it lands
  naturally there. (3) `f.call.bind(f, ctx)` — the uncurry-this idiom, the 1/8 he missed. Low priority.
- **Method change (locked 2026-08-07): every lesson gets a label-only round.** Predict R2 scored
  **3.5/4 on output and 2/4 on the labels for the same four snippets**. Output rounds mask labelling
  gaps completely — finding (2) above was invisible until the labels were asked for separately. It
  costs 60 seconds: list 6-8 bare call shapes, ask for rule number + name only, no outputs, no
  explanations. Bar = 7/8. This is the third consecutive session where the *separate* label ask
  produced the real diagnosis.
- 2026-08-09: **M4 closed out** (§7b shipped, glossary M4 section written, record banked, map marked done)
  and **Lesson 0005 built — Objects & prototypes.** Framed as *the two questions underneath M4*: where the
  method actually lives (the chain) and whether this is the same object or a new one (identity). §0 gate
  carries the two untested L4 items — **arrow-in-constructor survives extraction** and **`f.call.bind(f, ctx)`**;
  the third carry item (**arrow class field vs prototype method**) is deliberately NOT in the gate, it is
  tested in §5 where M5 owns it, plus D6.
  Structure: 7 ways to create an object → keys are strings → **call by sharing** → shallow vs deep →
  the prototype chain → own vs inherited → freeze/seal → destructuring/spread/rest → the procedure's
  **sixth question** → 5 quizzes → 7 fresh output drills → **§12 label-only round** (the locked 08-07
  method, baked into the lesson for the first time) → 2 coding drills.
  Four deliberate connective choices: (1) the **string-coerced object key** and the **prototype-chain
  `in` bug** are taught as *the same facts he already found in `memoize` on 07-30*, refiled under objects —
  and the ebook's own answer to problem 16 contains that exact bug, so the drill is "find it"; (2)
  **D6 fuses L4 and L5** — the binding rule decides `this`, the chain decides where the method lived;
  (3) §12's planted trap is `Object.create` sitting in a list of copy operations, aimed squarely at
  **surface-shape matching**; (4) the ebook's "pass by reference" framing is **corrected to call by
  sharing** on purpose — he needs the label, and that is what the course grades.
  **All 30 asserted outputs verified by running them on Node 24, not written from memory** — including
  the ebook bug (`{name:"toString"}` is silently dropped) and `JSON.stringify` key-order dedupe failure.
  **Not drilled yet — do not advance to M6 until it is.** Glossary M5 section is deliberately withheld
  until the gate passes: it is the revision sheet for what he has *proven*, not what he has read.
- Teaching note (generalise this): **use fresh snippets, never the lesson's own drills.** He has read
  D1-D6; the whole L4 drill was written new for the session, which is why round 1 caught anything.
- Teaching note: after round 1 he asked to be taught ("my confidence is not that much"). He asked
  *after* attempting, not instead of attempting — that is the right instinct. Answer it generously
  and don't pre-empt it by front-loading explanation before the attempt.
- 2026-09-20: **Lesson 0005b built — Getters, setters & what `=` really does.** Not a new module; a
  **gap page underneath M5**, written from an honest self-report: *"I don't know anything about getters
  and setters, and I haven't used this kind of thing in real production code."* L5 §4 (freeze/seal),
  §8 (spread) and the descriptor table all **assume accessor properties**, which were never taught —
  so the L5 gate was standing on a floor that didn't exist. 5b is that floor.
  Structure: `=` is not always storage (`innerHTML`, `location.href` — setters he has used daily and
  never had named) → **data property vs accessor property** via `getOwnPropertyDescriptor` (the
  accessor has *no* `value`/`writable` — that is the sentence) → syntax in literal / class / 
  `defineProperty` (+ the all-`false` defaults trap) → **the use-case table he asked for**, led by Vue 2
  reactivity → **the two ways to install a property: `[[Set]]` vs `[[DefineOwnProperty]]`** → the
  spread/assign discriminator → `__proto__` pollution → edge cases → 4 quizzes → 6 cold drills →
  **§11 label-only round** (locked 08-07 method) → the two sayable sentences.
  **All asserted outputs verified on Node 20, not written from memory** — including the empty
  `Object.keys(a)` after pollution and the `TypeError` on a read-only assign target.
  Three deliberate choices: (1) the discriminator is taught as a **mechanism**, not a fact to memorise,
  because the mechanism also explains `defineProperty`, frozen arrays and `Array.prototype.push`;
  (2) **D1 leads with the getter-flattening copy bug, not the setter trivia** — it is the only part of
  this page likely to cost him real time, and both operators do it; (3) §11's traps are a **computed
  key** (`o["dynamic"+i] = v`) and **`arr.push(v)`** — both are surface shapes hiding a plain `[[Set]]`,
  aimed at **surface-shape matching**, the course's most durable failure mode, now in its fourth costume.
  **Not drilled yet. Drill 5b BEFORE the L5 gate**, not after.
- 2026-09-20 — **method consequence, act on this: the `f.call.bind(f, ctx)` item in L5's §0 gate is
  burned.** He asked about it cold in open conversation today and was taught it to the floor over four
  rounds (the ground concept he was missing was not `bind` — it was that **`call` is an ordinary method
  whose own `this` is set by the dot**, plus the fact that the two `f`s in the expression are *not the
  same `f`*: the first is only where `Function.prototype.call` was found). It can no longer be used as a
  cold gate question. **Replace it in the L5 §0 gate with a fresh uncurry shape** —
  `Function.prototype.call.bind(Array.prototype.slice)` — and ask for the *use case*, not the trace.
- 2026-09-20 — **teaching note, generalise this one.** Four consecutive "still not simple" replies on
  pass-by-value, and each of my attempts had been *longer and more elaborate* than the last (memory
  diagrams, address boxes). The unlock was **stopping and asking him to pick which of four specific
  things was confusing.** He picked #3 — *"why call it pass-by-value if a reference is involved"* —
  which was a **terminology** question, not a mechanics question. He had understood the mechanics for
  three explanations running. **When "simplify" is asked twice, stop simplifying and locate the gap
  instead; offer numbered candidate gaps rather than another explanation.** The second unlock was the
  same shape: the assign/spread answer was unreachable not because it was hard but because
  **getters/setters had never been taught**. Both times the real move was *going down a layer, not
  rewording the current one.*
- 2026-09-20: **Lesson 0005c built — The prototype chain, from the floor up.** Second gap page of the
  same day, same shape as 5b. He re-read L5 §5 and reported *"most of the things is hitting
  differently, I do not get the exact terms."* Asked him four candidate gaps and a fifth prerequisite
  question; **all four gaps came back true** (`Fn.prototype` vs `__proto__` · why prototypes exist ·
  the three code shapes looking unrelated · shadowing) and the prerequisite came back
  **"no real idea": what `new` does.**
  → **That fifth answer was the whole diagnosis. `new` step 2 IS the prototype link.** §5 asks him to
  *follow* a link he has never watched being *made*. No amount of rewriting §5 fixes that.
  Structure (order is the deliverable): **why prototypes exist at all** — 1000 dogs, one `bark`,
  framed honestly as *a memory optimisation that became the object model*, because "why does this
  exist" was a named gap → **`new` in 4 steps + a hand-written `fakeNew`** so the link is something he
  watched get installed → **the naming collision with a two-arrows-out-of-`Dog` diagram** and the fix
  *read `Dog.prototype` as `Dog.protoForMyInstances`* → **one lookup traced to `null`**, plus
  `rex.fly()` falling off the end (and the reframe: *"X is not a function" means "X was never found"*)
  → **reads walk / writes don't, with the mechanism §5 omits** → three shapes, one mechanism, incl.
  **`extends` setting TWO links** (the static chain nobody names) → class fields vs methods → 4
  quizzes → 6 cold drills → §10 label-only round.
  **All 50 asserted outputs run on Node 20, and running them corrected the plan twice:**
  (1) `{ ...instance }` is **not** always `{}` — class *fields* are own+enumerable and survive, only
  *methods* are lost (`class T { f=1; m(){} }` spreads to `{ f: 1 }`); the popular version of this
  fact is wrong and the page says so. (2) `fakeNew` **throws on a `class`** — classes refuse
  invocation without `new` — so the page states that limitation instead of hiding it.
  Two deliberate connective choices: (1) **§5's "writes don't walk" is corrected to the 5b
  mechanism** — `[[Set]]` *does* walk, looking for a setter, and only creates an own property when it
  finds a data property instead; proved with an inherited setter that fires and creates no shadow.
  **Shadowing and the `Object.assign` discriminator are one mechanism from two angles**, which is what
  makes 5b pay off twice. (2) §10's traps are the **arrow class field** and a **shadowed property** —
  both *look* inherited, both are own — aiming at **surface-shape matching**, now in its fifth costume.
  §5 keeps its terseness and gets a `div.note` routing him to 5c first. **Order is 5b → 5c → the L5
  gate.** Not drilled yet.
- 2026-09-20 — **method note, the most important one of the day. Two prerequisite gaps found in one
  session, both by ASKING, neither by drilling.** Getters/setters (under §4/§8) and `new` (under §5).
  Both were invisible to every drill because a drill tests the layer you *think* he is on. The pattern
  in both: he could not answer a question, I re-explained the *same layer* more elaborately, and it
  failed — until I stopped and offered **numbered candidate gaps** and let him pick. He picked
  accurately both times, immediately.
  → **Standing rule: when "I still don't understand" arrives twice on the same point, stop explaining
  and start locating. Offer 3-4 specific candidate gaps, including one prerequisite a layer BELOW the
  current topic, and let him choose.** The failure mode to avoid is the one I ran four times this
  morning — each re-explanation longer and more elaborate than the last, all of them aimed at a layer
  he had already understood.
  → **Corollary for the remaining modules: before teaching M6+, ask the prerequisite question first.**
  L5 assumed accessor properties and `new`; both were absent. Assume the same is true elsewhere and
  probe for it rather than discovering it after a failed gate.
- 2026-10-03: **Drilled L5** — gate, speak, follow-ups, predict (3/4), label-only (**7/8, bar met**), one arrow retest (pass). **M5 gate passed with open items, by his decision to move on; M6 current.** Findings: (1) the arrow's *enclosing function* missed twice (G1, F1), closed cold on a fresh `make.call` snippet — surface-shape matching, sixth costume; (2) **`freeze` and `slice` both read as deep/locked by the surface word** — shallow-vs-deep indexing gap, not knowledge; (3) call-by-sharing label arrived after a prompt, not cold. **He chose NOT to drill 5b/5c ("for understanding") and to do Drill B `deepClone` afterwards.** Both logged as open in `learning-records/0005-objects-and-prototypes.md`. Glossary M5 section withheld until `deepClone` is attempted. **Carry into L6 §0:** `slice` shallow vs `splice`, and `freeze` shallow, cold. **Standing rule: probe the prerequisite for M6 before teaching it.**
- 2026-10-03 (later): **Prerequisite probe for M6, then Lesson 0006 built.** Six cold questions before building, per the standing rule. Result: mechanism mostly there, **labels loose**. `forEach` returns nothing: correct. `map`/`filter`: close but `filter` was described inverted ("removing the values which are true") and the ignore-the-result half of the `map` question was skipped. Callback args: said "value, index, this" (third is the **array**). `splice` mutates: correct. `sort`: said mutates, did not give the `[1,10,9]` output, and missed that it also returns the same array. **`for-in` vs `for-of` and Map vs object: "no idea"** (clean gaps).
  Built **Lesson 0006 — Arrays & iteration (the toolkit)**: the two questions per method (*returns what, original changed?*) with a four-group table → callback contract + `["1","2","3"].map(parseInt)` → map/filter/forEach/reduce → find/findIndex/some/every incl. `findIndex` `-1` truthy and `[].every` vacuously true (ties back to his own 10-01 `some` bug) → slice vs splice → **sort** (string default, boolean-comparator bug, `undefined` last) → for-in vs for-of (strings, chain walk, `TypeError` on objects) → **seventh procedure question** → quizzes, 7 fresh drills, label-only round (traps: `sort`/`reverse` return the SAME array), `myMap` and `secondLargest` coding drills.
  **Map / Set / WeakMap / WeakSet deliberately NOT in 0006** — they become the next page, since "Map vs object" was a clean no-idea and needs its own floor. **All asserted outputs run on Node 24.** Running them corrected the L5 §0 teaching once: **mutating array methods (`push`, `pop`, `sort`) throw `TypeError` on a frozen array in sloppy mode too**, while bare `=` is silent. §0 of 0006 states it.
  Two deliberate choices: (1) §0 carries L5's two open items (`freeze` shallow, `slice` shallow) as the cold gate; (2) `myMap` Drill A is a deliberate L4+L5 fusion (must be a regular function, `.call(thisArg)`, added to `Array.prototype`, and it creates an enumerable prototype property, the §7 trap).
  **Not drilled yet. Do not build the Map/Set page until L6 is.**
- 2026-10-04 (ran past midnight): **Drilled L6** across 5 rounds: gate + speak, follow-ups, predict **3/7**, label-only **4/8 (bar failed)**, and a 3-snippet re-test (2 pass, 1 half). **M6 gate NOT passed.** Two findings, both shipped into the lesson. (1) **The callback is a call the method makes.** P2 (`map(parseInt)`) and P4 (`return` in `forEach`) share a root: he reads the callback as a loop body. This is the L4 call-point gap in an array costume. Shipped as **§2b**, with `myMap` as the cure. (2) **He answers "did it change?" and guesses "what did it return?"** `push`/`pop` were labelled SAME because they mutate, and `sort` was called "a new array" three times. Surface-shape matching, seventh costume, which fired in P1 even though §11 predicted it. Shipped as a **mutator-returns table in §1**. Also: the comparator model was wrong (he thought the comparator gets strings). **Closed:** the probe's filter inversion; `freeze` shallow. `slice` shallow passed in-session (P7) after a cold miss (G2). Full record: `learning-records/0006-arrays-and-iteration.md`.
  → **Next session §0:** a fresh label-only round (8 new shapes, cold, bar 7/8), then the open items in the record, then **Drill A `myMap`**. **Do not build the Map/Set page until the label round passes.**
- 2026-10-06: **He moved on with the L6 gate still open** (his call, same as L5). Before building, I ran a prerequisite probe of six questions. Right: object keys become strings, and Set dedupe. Half: key order (integer keys first was right, but he said the string keys come back alphabetically; they come back in insertion order). Mostly right: iterable. **Gap: when memory is freed.** He said `delete` or re-assignment frees it. The rule is reachability, and WeakMap rests on it. **Never used Map/Set in real code.**
  Built **Lesson 0006b, Map, Set & the weak ones.** Its §0 is the **L6 label-only re-run** (8 fresh shapes, bar 7/8) plus `map` returning `undefined` and the comparator, said out loud. Structure: the object as a bad dictionary (4 problems, including the `"constructor"` word-count bug), then the Map API through Q7, Map vs object, Set for dedupe and for O(1) lookup, a **§5 reachability floor**, then WeakMap/WeakSet (every restriction derived from "keys held weakly"), the quiz, drills, a label-only round, and two coding drills (`firstUnique` with Map, `findPairs` with Set). **No eighth procedure question**, because Q6 and Q7 cover the page. All outputs run on Node 24. **Two more ebook answers are wrong:** problem 18's printed output is missing `a: 2`, and problem 26's second output includes an impossible `[5, 5]`. Not drilled.
- 2026-10-06 — **found a gap one layer down, while teaching 6b §2.** He read `u.get({ id: 1 })` as "find me a key that looks like this", treating the object literal inside the parentheses as a search description. The missing fact: **arguments are evaluated before the call**, so `{ }` builds a new object and `get` only receives that new object. His instinct also matched how a plain object behaves, where `o[{id:1}]` "finds" the key, though only because every object key turns into the same string. I explained it twice and it didn't land. I located it on the third reply using the numbered-gaps rule, and it **closed on a check** (`get(b)` with `b = a` gives the value, `get(c)` with a look-alike `c` gives `undefined`). Shipped into 6b §2. **Expect this to come back** with `set.has({...})`, `arr.includes({...})`/`indexOf`, and React dependency arrays. Test it cold in the 6b drill.
- 2026-10-06: **Drilled L6b.** Both label rounds missed the bar by a little: the L6 re-run scored **5/8** (up from 4/8) and the 6b round scored **6/8**. Predict was **3/7**. **Gate not passed.** Closed: the argument-evaluation gap (cold pass), and the L6 `sort`/`push` return-value family (clean, cold). Still open: right-mechanism-wrong-value (P4: he stated "object keys become strings" in S1, then answered `o[a]` by identity); surface-shape matching (`WeakSet.add(1)` → SAME, `splice` in odd shapes); and reachability, which didn't stick from reading. The skip pattern is still there; I named it to him directly. Both coding drills are solved. Full record: `learning-records/0006b-map-and-set.md`.
  → **Next:** carry the open label items into the **next lesson's §0** (60 seconds, cold) instead of a third M6 session. He decides whether M6 closes with open items, as he did for M5. Probe the prerequisites before M7.
- 2026-10-06: **He closed M6 with open items** (his call, same as M5) and moved on to M7. At his request, the **glossary's M5 and M6 sections are now written**, overriding the earlier "withhold until the gate passes" rule. Both carry an orange "open items" pill and a Trap box (C: "shallow" read as locked/copied; D: "returns what?" as its own question). I also added **Tell 4, the skipped half**, extended Tell 2 to "the label or the *value*", and added Q6/Q7 to the procedure list. **M7 §0 has to carry:** `splice` shapes, `at(-1)`, WeakSet primitive → throws, reachability said cold, and the `firstUnique` insertion-order sentence.
- 2026-10-06: **M7 prerequisite probe, then Lesson 0007 built.** Probe: single-thread and the call stack (LIFO) were right. `setTimeout(fn, 0)` had the right mechanism but he called it the "macro *stack*" (it's a FIFO queue). **What a Promise is: "no idea"**, even though he has used async/await and `Promise.all` at work. `await`: half; he thinks it "waits then runs the next line" and is missing that it doesn't block. `1 4 3 2` correct. **M7 is split like M6:** 0007 covers the event loop and Promises; **0007b** will cover async/await (pause the function, not the thread), all/allSettled/any/race, error handling, and the hard outputs. 0007 structure: §0 M6 carry items → run-to-completion and blocking (ebook Q13's infinite loop) → call stack → host plus task queue (the label fix) → event loop v1 → Promises from zero (3 states; "settled" is not a state, the ebook is wrong; the executor is sync) → `then` returns a new Promise (forgotten-return ties to L6 §2b) → microtasks and event loop v2 → **8th procedure question: sync, microtask, or task?** → the label-then-list method on ebook Q14 → quiz, 7 drills, label round (traps: executor, `map` callback), Drill A `sleep`, Drill B `promisify` (fuses L3/L4/L5). All outputs run on Node 24. Not drilled.
- 2026-10-07: **Drilled 5b + 5c, interview-level subset** (his call: "not this deep in interviews"). Labels scored **2/8**; after the chain picture `t → T.prototype → Object.prototype → null`, a fresh check scored **4/4**. Misses: class fields read as "not found", the chain's end at `Object.prototype`, shadowing, `in` returning the function instead of a boolean, spread on a getter. **`TypeError` named cold, so that open item is closed.** Record: `learning-records/0005bc-getters-setters-prototype-chain.md`. Carried as **L7 §0 G4**. **Teaching insight:** one ASCII chain picture fixed six label misses at once. Lead with the picture next time where-does-it-live comes up.
- 2026-10-08: **The event loop visualizer is now in L7 §7b** (`assets/event-loop-viz.js`, mounted with `<div data-elviz>`). A small simulator applies the real loop rules and generates each step. It has 7 scenarios, and all of them were checked against Node output. **Reuse it in 7b:** add `await` scenarios by extending `SCENARIOS` with an op that resumes the function as a microtask.
- 2026-10-08: **Coding drills A (`sleep`) and B (`promisify`) solved**, B with heavy scaffolding. **Teaching insight:** he says reading and explaining feel fine but writing code stalls. With `promisify`, the stall was "which function is which": 4 functions with different call times. Two re-explanations failed. What worked was a **3-step ladder** (a passed function runs only where `()` is written · you write the messenger, the worker calls it and chooses its arguments · `...args` collects in params and spreads in calls), plus the line **"whoever writes the `()` chooses the arguments and gets the return value"**. It also fixed his `throw`/`return`-inside-a-callback bug. **Default for every future coding drill:** usage first, then a hand trace with real values, then steps as comments, then code. Scenario 8 (`promisify`) was added to the visualizer. Open: `fn.call(this, ...)` for methods (said, not written).
- 2026-10-08: **Drilled L7. Gate passed** (labels 7/8, predict 5/6, follow-ups 4/4). Class members closed cold. Still open: a `.then` on a pending Promise, `at`/`in` (both missed a second time), and `new` steps 3-4. He skipped the whole gate on the first ask, so the skip habit is live. Record: `learning-records/0007-event-loop-and-promises.md`. **Next: 7b** (async/await, the combinators, error handling, hard outputs). Reuse the visualizer for `await` scenarios.
- 2026-10-08: **7b probe, then Lesson 0007b built.** Probe: right on async returning a Promise, try/catch around await, and all vs allSettled. **Gap:** he thinks `await` freezes everything (predicted only `1` for `f(); log(3)`; truth `1 3 2`). The page is built on "await pauses the function, not the program", then the **then-chain model** (code after await = a `.then` callback). Covers errors (forgetting await isn't caught), sequential vs parallel (timed), `forEach` not waiting, the four combinators (the ebook's `any` corrected), Drill A `withTimeout`, and Drill B `myPromiseAll` (index not push, counter not length). The visualizer gained async/await support and **per-page scenario lists** (`data-elviz="id,id"`); 7b shows `await`/`await2`. All outputs run on Node. Not drilled.
