# 2 — The guardrails, and why they are hooks

> **They ask:** *"How do you stop it doing something stupid?"* / *"How do you know AI-written code is correct?"*

**Grounding:** `ai-dev-workflow/README.md:78-89`, `hooks/hooks.json`, `scripts/verify-gate.mjs:1-12`, `scripts/guard-paths.mjs:8-9`
**Colour:** 🟢 — this is the strongest engineering in the repo and the best thing you can show on a screen share

---

## The one line

> **An instruction in `CLAUDE.md` is a request the model can ignore. A hook is not.**

That sentence is in the repo at `README.md:89`. Lead with it. It is the whole thesis and it lands in
under five seconds.

## Why it is true

```
INSTRUCTION IN A CONFIG FILE            A HOOK
────────────────────────────            ──────
"please don't edit .env"                Claude Code calls YOUR script
        │                               BEFORE the tool runs
        ▼                                       │
   model reads it                               ▼
        │                               script inspects the path
        ▼                                       │
   model USUALLY complies                       ▼
        │                               exit 2  →  tool call BLOCKED
        ▼                                        stderr goes back to the model
   sometimes doesn't.                            as feedback
   No mechanism. Just a request.
                                        Deterministic. Zero tokens.
                                        Not negotiable.
```

The model is a probabilistic system being asked to follow a rule. A hook is ordinary Node code running
outside it. **You cannot talk your way past `process.exit(2)`.**

---

## The four hooks

| Event | Fires on | Script | What it does |
|---|---|---|---|
| `PreToolUse` | `Edit \| Write \| NotebookEdit` | `guard-paths.mjs` | **Blocks** edits to secrets, lockfiles, build output, vendored code |
| `PostToolUse` | `Edit \| Write` | `format-file.mjs` | Runs the project's own formatter on the file just written |
| `Stop` | end of turn | `verify-gate.mjs` | **Refuses to end the turn** while build or lint fails |
| `SessionStart` | new session | `session-context.mjs` | Injects project state so the session starts oriented |

**The protected list** (`scripts/_lib.mjs`) hardcodes 16 patterns: `.env` and `.env.*`, `*.min.js/css`,
`dist/ build/ out/`, `node_modules/`, `vendor/`, `*.lock` plus all three JS lockfiles, `*.pfx *.p12
*.pem`, `id_rsa`, `.git/`. Projects add more via `protectedPaths`, and `allowPaths` is checked **first**
as the escape hatch.

---

## The Stop hook — the one worth walking through on screen

This is the answer to *"how do you know AI-written code is correct?"* **Show it, don't describe it.**

> "Normally the model decides when it's finished. This hook takes that decision away. At the end of
> every turn it runs the project's actual verify chain, and if the build or lint fails it returns exit
> code 2, which means the turn doesn't end. The failure output goes back to the model as feedback and it
> has to fix it.
>
> So 'done' means the build passed, not that the model asserted it passed."

### Three details that prove you wrote it

**1. It is armed, not always-on.**
```
.agent/state/active-gate    created by /devflow:implement
                            deleted by /devflow:ship
```
> "Without that marker, every casual question I asked would kick off a full build. The gate only exists
> while I'm actually mid-implementation."

**2. Re-entry guard.** `verify-gate.mjs:22` — `if (input?.stop_hook_active) process.exit(0)`.
> "A Stop hook that fires on its own continuation loops forever. That line is the base case."

**3. It cannot trap the session.** Claude Code force-ends after 8 consecutive blocks.
> "That's deliberate. A genuinely broken build shouldn't hold my session hostage — the escape hatch is
> that the platform gives up before I do, and I can always delete the marker."

**4. The failure message tells it what NOT to do.** `verify-gate.mjs:65-68`:
> *"Do not weaken or delete tests, and do not disable the check to get past this gate."*

That line exists because **the obvious way for a model to pass a failing test is to delete the test.**
Naming the cheat in the error message is cheaper than detecting it afterwards. This is a great detail to
volunteer — it shows you thought about how the system gets gamed.

**5. On pass it stamps evidence.** `.agent/state/last-verify.json` gets a timestamp, so `ship` can cite a
real verification rather than trusting that one happened.

---

## The review layer — two agents, two different questions

`review` runs two agents **in parallel, in one message**:

| Agent | Asks |
|---|---|
| `critic` | **"Is this right?"** — correctness, security, spec compliance |
| `impact-mapper` | **"What else breaks if it isn't?"** — traces outward to every consumer, produces a retest list |

> "They're deliberately separate because they're different questions and mixing them produces a worse
> answer to both."

**Two design decisions worth naming:**

1. **It runs in fresh context.** *"The agent that wrote the code is not the one who should grade it."* An
   agent that just spent an hour justifying its approach is the worst possible reviewer of that approach.
2. **It is told it may find nothing.** `review/SKILL.md:35-41` — *"A reviewer told to find problems will
   find some even in sound work. If the change is sound, say so and report nothing."*

> "That second one matters more than it sounds. If the reviewer always returns findings, the findings
> stop meaning anything and I start ignoring them. A review that can come back clean is a review I'll
> actually read."

---

## Follow-ups they will ask

| They ask | I say |
|---|---|
| *"What if a hook has a bug?"* | It fails open by design — every hook no-ops silently if the contract file is missing, so installing the plugin can't break an un-onboarded repo. The Stop hook is the exception: it fails loud, because a silent verification gate is worse than none. |
| *"Doesn't this cost a lot of tokens?"* | No, that's the point. Hooks are plain Node with zero dependencies. They cost nothing and they're deterministic. Anything I can enforce in code, I do, and I save the model's attention for things that need judgment. |
| *"Why block lockfiles and dist?"* | Generated files. If the model edits a lockfile directly, the next install silently reverts it and I've got a phantom bug. Same for build output. |
| *"How do you review 800 lines of AI-generated code?"* | I don't. That's an upstream failure. The workflow implements one phase at a time so the diff stays small enough to actually read. If a diff is unreviewable, the plan was wrong, not the review. |
| *"What has it actually caught?"* | On my current project the verification step drove the running app in a browser and caught a 500 on an admin dashboard — I've got the screenshot banked as evidence. That's the exact class of thing a green build misses. |

---

## The verification principle behind all of it

> **"Evidence, not assertion. 'Should work now' is not a result."** (`README.md:113`)

And the sharpest version, from the verify skill:
> *"Read the browser console and network activity. A clean-looking screen with a failed request behind it
> is the most common false pass there is."*

> "That's the failure mode I actually care about. Not code that crashes — code that looks fine and
> isn't."

---

## Never get wrong

1. **Exit code 2 blocks.** Exit 0 allows. If you say "exit 1" you've never read the code.
2. **Four hooks.** PreToolUse, PostToolUse, Stop, SessionStart. *(The README says three — see
   `05-the-flaws.md`. Know this before someone else spots it.)*
3. **The Stop hook is armed by a marker file.** Not always-on. This is the question that separates
   "I designed it" from "I generated it."
4. **`critic` and `impact-mapper` run in parallel and neither one fixes anything.** They report. The
   caller decides.
