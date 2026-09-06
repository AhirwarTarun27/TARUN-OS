# 1 — The loop, and the one gate

> **They ask:** *"Walk me through your workflow."*

**Grounding:** `ai-dev-workflow/README.md:22-34`, `skills/kickoff/SKILL.md:38-41`, `skills/plan/SKILL.md:10-11`
**Colour:** 🟢 — you designed it, you can defend every decision in it

---

## The shape, on a whiteboard

```
  ┌─ PHASE 0 · joining a repo (once) ────────────────────────────┐
  │  onboard    survey it, write the dossier, write the contract │
  │  setup      make it actually run on this machine             │
  │  orient     teach ME the project, in tiers                   │
  └──────────────────────────────────────────────────────────────┘

  ┌─ PHASE 1 · the front half ───────────────────────────────────┐
  │  kickoff ABC-123                                             │
  │     ├─ spec       vague request  →  written spec   (skippable)│
  │     ├─ research   read the code  →  file:line facts (REQUIRED)│
  │     └─ plan       facts          →  phased plan on disk      │
  └──────────────────────────────────────────────────────────────┘
                            │
                    ╔═══════▼═══════╗
                    ║  I APPROVE    ║   ← the ONLY gate in the system
                    ╚═══════════════╝
  ┌─ PHASE 2 · the build half ───────────────────────────────────┐
  │  implement   one phase at a time, committed per phase        │
  │  verify      build + lint + drive the real app in a browser  │
  │  review      adversarial critic ∥ blast-radius mapper        │
  │  ship        branch, commit, PR — NEVER merges               │
  └──────────────────────────────────────────────────────────────┘

  ┌─ PHASE 3 ────────────────────────────────────────────────────┐
  │  compound    capture the ONE thing this cycle taught         │
  └──────────────────────────────────────────────────────────────┘
```

## Say this

> "It's eight stages, but the thing that matters is where the gate is.
>
> The front half is research then plan. Research is not optional and it reads the actual code, so the
> plan comes out with real file paths in it rather than assumptions. Then it writes the plan to disk and
> **stops.**
>
> That's the only approval gate in the whole system. Everything after it runs without asking me again.
>
> The back half implements one phase at a time and commits each phase, so every phase is a save point I
> can go back to. Then verify, then an adversarial review in fresh context, then it opens a PR. It never
> merges."

---

## The question they are actually testing

> ### *"Why is the gate at the plan and not at the code?"*

**This is the whole design and it is your best answer on the repo.**

> "Because of leverage. A bad line of code is one bad line. **A bad line of a plan becomes hundreds.**
>
> If I review the code, I'm reviewing the consequences of a decision that's already been made, and by
> then it's expensive to reverse. If I review the plan, I'm reviewing the decision itself, when changing
> it costs one paragraph.
>
> And there's a second reason, which is that one gate is honest. If I put a gate at every stage I'd
> start rubber-stamping them, because nobody reads the fourth confirmation dialog. One gate that I
> genuinely read is worth more than five I click through."

The skill enforces this explicitly — `kickoff/SKILL.md:38-41` tells the model **not to ask in a way that
invites a reflexive yes**, because *"its whole value is that a human actually reads the plan."*

---

## Follow-ups they will ask

| They ask | I say |
|---|---|
| *"What's in the plan file?"* | It opens with a human-readable end-to-end walkthrough — how the thing will work once built, with file paths per layer and why this approach over the obvious alternative. Then phases, each with its own verification step. The walkthrough is first because that's the part I can actually judge. |
| *"Why commit per phase?"* | They're save points, not history. A phase I can return to is worth more than a tidy log. I can always squash later. |
| *"Why does research come before planning?"* | Because otherwise the plan is fiction. The plan's file paths come from research reading real code. Planning from assumption is how you get a plan that references files that don't exist. |
| *"Why doesn't ship merge?"* | Merging is a human decision with a blast radius I can't delegate. Opening the PR is the mechanical part; approving it isn't. |
| *"What if the plan is wrong?"* | Then I reject it and it costs me ten minutes, which is the entire point of putting the gate there. |
| *"Isn't this slower?"* | For a one-line fix, yes, and I don't use it for those. It pays off exactly when the change is big enough that I'd have regretted not planning it. |

---

## The honest part — and it's an asset, not a confession

> "One thing worth being precise about: I've been working this way for about a year, but the packaged
> version is recent, so different stages have different mileage. Onboarding and verification I use every
> day. The full kickoff-to-PR chain as written I've driven less, because on my current project I've
> adapted the artifact layout rather than following my own pipeline exactly."

**Then the interesting bit — this is the actual answer, the paragraph above is just the setup:**

> "The adaptation is actually the part I'd defend hardest. I designed it to write specs, research and
> plans as separate documents. On the real project I collapsed that into a single working document plus
> a run log, because the ceremony wasn't paying for itself on changes of that size. A workflow you
> follow rigidly when it isn't earning its keep is just process."

---

## Never get wrong

1. **The gate is at the plan.** Not at the code, not at the PR. If you say "at the PR" you've described a
   normal git workflow and thrown away the entire idea.
2. **Research is required, spec is skippable.** Not the other way round.
3. **`ship` never merges** (`skills/ship/SKILL.md:10`).
4. **Eight stages, one gate.** If you can't say the number of gates instantly, you don't know your own
   system.
