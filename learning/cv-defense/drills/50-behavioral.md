# Drill D50 — Behavioral / STAR

**Phase 1, sitting 13.** Read with `../stories.md`.

**Why it's here and not last.** In the old roadmap behavioral sat at tier 7, behind three project
deep-drills and the skills work. **That's backwards for an active hunt:** at most companies the
behavioral round is *first*, run by a recruiter or a hiring manager, and it is the round that decides
whether the technical rounds happen at all.

**The uncomfortable fact this drill exists to fix:** the story bank is strong on **technical** judgment
(a hard bug, a legacy fix, an honest failure) and thin on **interpersonal** judgment (disagreement,
influence, pressure). Behavioral rounds are mostly the second kind.

---

## Teach block (read once, then close)

### 1. STAR, and the two parts everyone gets wrong

**S**ituation → **T**ask → **A**ction → **R**esult.

- **Situation is too long.** Two sentences. The interviewer does not need the org chart. **If your setup
  is longer than your action, the story is wrong.**
- **Result gets dropped.** A story with no outcome is an anecdote. Even a small result — *"date entry
  went from twelve clicks to one"* — converts it.
- **Action must be "I", not "we".** "We" is the single most common way a strong candidate sounds
  passive. Say what *you* decided.

**~90 seconds.** Then stop and let them ask.

### 2. The six stories you already have

Bank them by what they *cover*, not by which project they came from
(`../stories.md`):

| Story | Primary | Also answers |
|---|---|---|
| **1. Date picker without forking** | technical judgment | legacy code · hard bug · pragmatism |
| **2. Stale-response race across 36 modules** | a hard bug | systems thinking · **growth over time** |
| **3. Mobile keyboard bug** | initiative | user empathy · beyond the ticket |
| **4. Mobile team's API contract** | cross-team work | ambiguity · communication |
| **5. AdSense rejection** | **failure** | commercial awareness · being wrong |
| **6. Taking numbers off your own CV** | **integrity** | detail · self-review · being wrong |

**Two are worth more than the others:**

- **#2 paired with MyWorkMyDay** — the same stale-response bug, half-handled in a `useFetch` hook four
  years earlier, fixed properly across 36 services later. *"Same bug, four years of judgment apart."*
  **That's a growth arc told through code**, and it's the answer to "how have you improved?"
- **#6** — you audited your own CV against the repos and deleted claims nobody would ever have checked.
  **It is disarming precisely because nobody would have caught it.**

### 3. The gap — and it is a real one

**Four questions get asked constantly and you have no story banked for any of them:**

1. **"Tell me about a time you disagreed with a stakeholder."**
2. **"Tell me about a production issue under pressure."**
3. **"When did you get another team to change something you didn't own?"**
4. **"Why are you leaving?"**

Your Dwellworks bullet says *requirements, design sessions, feature demos, sprint ceremonies, release
coordination* with a **US client**. That bullet is a promise that #1 and #2 have real answers. **Being
asked and having nothing undoes the technical credit from every other round.**

> **These are not being drafted for you.** A manufactured conflict story is transparent — it has no
> texture, the other person has no motive, and the follow-up *"what did they say?"* kills it. **Bring
> the real ones to the sitting.**

**What makes a disagreement story land:** the other person had a **legitimate reason** for their
position. You state it fairly. Then you say what you did, and — critically — **what happened when you
were partly wrong.** A disagreement story where you were simply right is a red flag.

### 4. "Why are you leaving" — the constrained one

**Hard boundary (`CLAUDE.md`): no thinksys internal detail, no work email, no client specifics, no
naming names.** And never trash the employer — an interviewer hears it as a preview of how you'll talk
about *them*.

**The shape that works:** forward-looking, about scope, not about grievance. Product depth, owning more
of a stack, being closer to the product decisions. **You already have the honest version:** at work you
own a layer of someone else's platform; on your own projects you own all of it and prefer it that way.
**That's a real reason and it's flattering to the right employer.**

### 5. Two habits worth more than any single story

**"I don't have a great example of that."** Say it if it's true, then offer the nearest real thing.
Interviewers have heard every manufactured story. **A candidate who declines one question honestly gets
believed on all the others.**

**Ask what they're actually testing.** *"Do you mean disagreeing on scope, or on a technical
approach?"* — one clarifying question makes the answer land and costs nothing.

---

## Closed-book quiz

**A. The banked six (40%)** — delivered cold, ~90 seconds each, STAR shape.
1. "Tell me about a difficult bug."
2. "Tell me about a time you failed."
3. "Tell me about working with another team."
4. "Tell me about a time you were wrong."

**B. The gap (40%)** — the four with no bank yet.
5. "Tell me about a time you disagreed with a stakeholder or client."
6. "Something broke in production. Walk me through it."
7. "When did you get another team to change something you didn't own?"
8. "Why are you looking to leave?"

**C. Ladder (20%)**
9. After any story: "What would you do differently?"
10. After any story: "What did the other person think?"
11. "How have you grown as a developer in four years?"

---

## Grading key — *Claude only, don't read before answering*

- **A (40%):** STAR shape, **"I" not "we"**, a stated result, ≤ ~2 min. Deduct for a Situation longer
  than the Action. Q2 → the AdSense rejection with *"I misread the business model."* Q4 → the CV audit.
  **Reusing the same story for two questions caps the section at 5.**
- **B (40%):** **Q5 and Q6 fail if there is no real story.** That is the point of the drill — the
  failure is the finding, and it goes to `../stories.md` as homework. **Do not accept a hypothetical**
  ("I *would* handle it by…"). Q8 → forward-looking, no employer criticism, **any thinksys internal
  detail is an immediate fail on the hard boundary.**
- **C (20%):** Q9 → a real answer, not false modesty. **Q10 is the one that separates candidates** —
  can he state the other person's position fairly? Q11 → the stale-response arc (MyWorkMyDay →
  CloudForestX) is the strongest available answer.

**Coverage gate:** four banked stories delivered in STAR shape without repetition, **at least two of the
four missing stories supplied as real situations**, and "why are you leaving" clean of the employer
boundary.

**After the sitting:** write stories 7 and 8 into `../stories.md` in his words. **D50 is not complete
until the bank has at least one real interpersonal story in it.**
