# 3 — The agents, and what "orchestration" actually means

> **They ask:** *"What does orchestrating an agentic workflow actually mean?"*

**Grounding:** `ai-dev-workflow/agents/*.md`, `README.md:107-111`, `agents/scout.md:12-13`, `skills/implement/SKILL.md:45-47`
**Colour:** 🟢 — but the failure mode is answering abstractly. `defend-map.md:202` already predicts this exact probe.

---

## ⛔ The trap on this line

Most candidates say "agentic workflow" and mean nothing. The interviewer is checking whether you're one
of them. **Answer with mechanisms and file names, never with adjectives.** If your answer contains the
words "leverage", "seamless", or "orchestrate" without a noun attached, you have failed the question.

---

## The five agents

| Agent | Model | Tools | Job | Can it fix anything? |
|---|---|---|---|:--:|
| `scout` | **haiku** | Read, Grep, Glob | Locate code. Answer one narrow question with `file:line` citations | ❌ |
| `architect` | **opus** | Read, Grep, Glob, **Write** | Write the plan file. **Only** the plan file | ❌ |
| `verifier` | **sonnet** | Bash, PowerShell, Read, Grep | Run the verify chain, diagnose the failure to file and line | ❌ |
| `critic` | **opus** | Read, Grep, Glob, Bash | Adversarial review in fresh context | ❌ |
| `impact-mapper` | **opus** | Read, Grep, Glob, Bash | Trace outward, produce a retest checklist | ❌ |

**The pattern across all five: every one is read-only or writes exactly one file, and none of them can
fix anything.**

> "That's deliberate. `verifier` runs the checks and explains the result, and it explicitly does not
> repair anything, because running a check and deciding what to change are two different jobs. If the
> thing that reports the failure is also the thing that fixes it, you never find out whether it
> understood the failure or just made the symptom go away."

---

## Say this

> "Concretely, orchestration means three things in my system.
>
> **First, scoping.** Each agent gets its own tool allow-list. The one that locates code has Read, Grep
> and Glob and nothing else. It physically cannot edit a file, so I don't have to trust that it won't.
>
> **Second, model tiering.** Locating code runs on the cheapest model. Planning and reviewing run on the
> most expensive one. Those are the two places where being wrong is costly, and searching a repo is not
> a reasoning problem.
>
> **Third, context isolation.** When I fan out five agents to survey a codebase, each one reads maybe
> forty files and reports back half a page. Those forty files never enter my main context window. That's
> the actual point of a subagent — it's a context firewall, not a productivity trick."

The instruction that encodes it, `agents/scout.md:12-13`:
> *"Your caller has a limited context window and is delegating to you precisely so that the forty files
> you read never enter it. **Read widely; report narrowly.**"*

---

## The design rule they will probe

> ### **"Fan out to read, stay single-threaded to write."**

```
READING — parallel is great              WRITING — parallel is a disaster
───────────────────────────              ────────────────────────────────
      ┌─ scout: architecture?             agent A ─┐
main ─┼─ scout: domain model?                      ├─→ same file tree
      ├─ scout: main flows?               agent B ─┘
      ├─ scout: prerequisites?
      └─ scout: conventions?              both make implicit decisions
                                          neither knows what the other chose
   5 answers, ~half a page each           → conflicting code that both
   40+ files never hit main context          "passed" independently
```

`skills/implement/SKILL.md:45-47`:
> *"Never run parallel agents that write to the same tree — concurrent writers make conflicting implicit
> decisions. Parallel reading is fine."*

> "Reads are idempotent and independent. Writes aren't. Two agents editing the same tree each make a
> hundred small implicit choices — naming, error handling, where a helper goes — and neither one knows
> what the other decided. You end up with code that's internally inconsistent in ways no test catches.
>
> So I fan out aggressively for research and I stay strictly single-threaded for implementation."

**The cost note, if they push on why not just parallelise everything:** fanning out costs roughly 15× a
single chat in tokens. It's worth it for reading, where it buys context isolation. It's not worth it for
writing, where it buys you a merge conflict with yourself.

---

## Follow-ups they will ask

| They ask | I say |
|---|---|
| *"Why five scouts and not one big survey?"* | Each one gets a different narrow question. One agent asked five questions produces a blurry answer to all five and blows its own context. Five agents asked one question each produce five sharp answers in parallel. |
| *"How do you stop an agent going off the rails?"* | Tool allow-list first, so most of "off the rails" is unreachable. Then a narrow, single question. Then the hooks, which apply regardless of what any agent decides. |
| *"Isn't opus for reviewing expensive?"* | Yes, and it's the right place to spend. A missed defect in review costs more than the token difference. The savings come from running the high-volume work — searching — on the cheapest model. |
| *"What's a subagent, really?"* | A separate context window with its own tools and its own prompt, that returns a summary instead of a transcript. The isolation is the feature. |
| *"Have you hit a case where this broke down?"* | Yes. On the live project I stopped using the full multi-document pipeline because the coordination overhead outweighed the benefit for changes of that size. Adapting it was the right call, and it's in my flaws log. |

---

## The connection to context engineering

**This is the bridge if they ask about context engineering** (see `survival-sheet.md` §4). Three of the
four named strategies are visible right here:

| Strategy | Where |
|---|---|
| **Just-in-time retrieval** | `scout` fetches only what's needed, when needed, rather than pre-loading the repo |
| **Tool scoping** | each agent's allow-list |
| **Structured note-taking** | the dossier written to `.agent/`, read by everything downstream, so nothing re-explores |

The fourth, **compaction**, is the `handoff` skill:
> *"Context degrades as it fills. A clean restart from a good handoff beats struggling on in a saturated
> window — so this is a routine move, not a defeat."*

> "That last line is a habit thing. Most people treat clearing context as giving up. It's cheaper to
> write a good handoff and restart clean than to keep working in a window that's already degraded."

---

## Never get wrong

1. **Five agents.** scout, architect, verifier, critic, impact-mapper.
2. **haiku for locating, opus for planning and reviewing, sonnet for verifying.** Know the tiering.
3. **None of them fix anything.** They locate, plan, diagnose, review, map. The caller decides.
4. **`architect` writes exactly one file** — the plan. Never source code.
5. **Fan out to READ. Single-thread to WRITE.** Getting this backwards is the one answer that would make
   an experienced interviewer stop believing you built it.
