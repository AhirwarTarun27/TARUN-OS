# Reading — the book track

> **Tracked and interrogated — not taught.**
> `/teach` authors lessons and cheat sheets. Here the source material is the **book**, not the AI.
> You don't need to be taught *Psychology of Money* — you need your **reading of it** interrogated.
> Same boundary `decisions/log.md` drew for machine-coding: `/teach` makes lessons; this is a
> *thinking* skill. Run by [`/reading`](../../.claude/skills/reading/SKILL.md).

## What this track is actually for

Not book notes. Book notes are landfill — you write them once and never open them again.

The output is **`rules.md`**: a short, bounded list of rules you **tested against reality** and kept.
Everything else in this folder is storage you will almost never read. That's by design.

## The split — intake is not thinking

Reading and thinking-about-reading are two different activities. Trying to do both in one 30-minute
slot is why most people's reading produces nothing.

| Beat | When | Cost |
|---|---|---|
| **Intake** | Nightly, the 11:45pm block. Read. If something bites, **one line**. No AI. | ~0 |
| **Capture** | `/daily-log wrap` at 12:15am asks "what bit you?" and banks the line. | ~10s |
| **Aim** | `/reading aim` — once per book, before/early. Three questions to carry in. | 5 min |
| **Drill** | `/reading` — compress → test → own, one pass, lands ONE rule. **On demand.** | 15 min |
| **Verdict** | +14 days, at `/weekly-review`. Kept / Killed / Rewritten / Never ran it. | 2 min |
| **Close** | `/reading close` — survivors promote to `rules.md`. | 10 min |

**Why the drill has no fixed slot** (decided 2026-07-17): a fixed drill slot with no fuel
manufactures fake rules, and fake rules crowd out real ones. `/weekly-review` asks *"anything worth
drilling?"* — **"nothing bit me this week" is a legitimate answer** and no drill happens. Mirrors the
`/marketing` daily→weekly inversion of 2026-07-10, which worked.

## The two rules the block lives under

**1. The block is intake only. It never runs `/reading`.**
It's 11:45pm, after two office blocks. That's why `reading` is *in* that slot — it's the one block
cheap enough to survive it. Put a synthesis drill there and it dies exactly the way `interview-qa`
died in that same slot: 1 hit in 5 weekdays, energy, every time. **Placement, not discipline.**

**2. Narrative books only in the late slot.**
Psychology, business, biography, ideas — those survive 11:45pm. A dense technical book does not; it
becomes a page you re-read four times and a miss in the log. If a dense book genuinely matters, it
needs a morning block or it doesn't get read. This is a real cost of the swap, accepted on purpose.

## The filter — most chapters earn nothing

*Psychology of Money* is 20 chapters. Twenty chapters do **not** produce twenty rules. Run the drill
on all of them and you'd spend ~4 hours talking and produce 20 rules you'd run zero of.

**The bar for a drill:** *did this change my mind, or threaten a belief I actually hold?*
If no — one line, move on. Most chapters are reinforcement or entertainment. That's normal.

**A book that yields 3 rules you actually ran is a triumph.** Most nights produce one line and
nothing else, and that is the system working, not failing.

## Verdicts — why a rule gets a date

A rule you wrote down and never revisited **steered nothing**. DSA has D0→D2→D5→D10.
Machine-coding has R0→R3→R10. Reading is the only track asking for *life change* — it doesn't get
to be the only one without a ladder.

But the rep here is **not recall**. "Can you still remember the idea" is trivial for a good idea.
The only honest question at +14 days is **did reality confirm it or kill it.**

| Verdict | Meaning |
|---|---|
| **Kept** | You ran it. It survived. It's yours. |
| **Killed** | You ran it. Reality broke it. **This is a success** — log the epitaph. |
| **Rewritten** | Idea was right, the rule was wrong. New rule, new verdict date. |
| **Never ran it** | The honest fourth. If 14 days passed and you never ran it, **the rule wasn't real.** Kill it or shrink it. Never let it silently roll. |

A track where nothing ever gets killed is a track that's lying to you.

## Files

| File | Role |
|---|---|
| `rules.md` | **The artifact.** Cross-book, bounded, **rewritten not appended**. The thing that steers. |
| `books/<slug>.md` | One file per book — aim, captures, what got drilled, the closing verdict. Stored forever, read rarely. |

**The read budget:** a drill reads `rules.md` + the one book file. **Never glob `books/`.**
Same discipline as `machine-coding` — token cost is driven by what gets *read*, not what gets stored.
