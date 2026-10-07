# Interviews: the loop that makes each one count

> **Every interview is data.** A question you fumbled once should never be fumbled twice.
> This folder is how that happens.

## The loop

1. **Within 1 hour of the call:** copy `_template.md` to `log/YYYY-MM-DD-company-round.md`. Dump every question and what you actually said. Rough is fine. **Memory fades fast. You already lost 5 answers from Alepo R1 this way.**
2. **Then, with Claude:** say *"review my interview"*. Each question gets a verdict and lands in `question-bank.md`: a new entry, or the old entry's count goes up and its answer gets sharper.
3. **Before the next interview:** read every 🔴 and 🟡 in the bank out loud. That's the prep. Then `mission/interview-sprint.md` for the rest.
4. **Run `/console log`** so the board counts it.

## Files

| File | What it is | How it changes |
|---|---|---|
| `question-bank.md` | **The artifact.** Every question you've been asked, with your best answer and the mistake to avoid | **Rewritten.** One entry per question, sharpened each time. Never duplicated |
| `log/*.md` | One file per interview. What was asked, what you said, what happened | Written once, never edited after review |
| `_template.md` | Copy this after each call | Fixed |

## Status in the bank

🔴 fumbled · 🟡 okay but fixable · 🟢 strong · ⚪ asked, but your answer wasn't recorded

**A 🔴 turns 🟢 only after you've said the new answer out loud in a real interview and it held.**

## Rules

- **Log what you said, not what you wish you'd said.** The gap between the two is the whole point.
- **The bank never names a company in an answer.** Answers get reused everywhere.
- **Prep packs for one company** (like `learning/ai-fluency/alepo-round-1*.md`) are inputs. When a question from them gets asked, its answer moves here.
