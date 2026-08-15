# Bullet 6 — client-facing work

> *"Work directly with the US client on requirements, design sessions, feature demos, sprint
> ceremonies and release coordination."*

**Grounding:** Tarun's own fact — **not in the kb**, which is code-derived only · **Colour:** 🟢

**This is the bullet most likely to be probed behaviorally, and a vague answer here undoes the
technical credit from bullets 1-5.**

## Say this

```
"I work directly with the US client — requirements, design sessions, feature demos,
their sprint ceremonies and release coordination. It's a distributed team across US
and India time zones, so a lot of the job is making sure a decision taken in one
timezone doesn't block the other for a day."
```

Team shape: **3 QA · 2 UX · 1 project manager · 6 developers** (3 US, 3 India).

## Follow-ups they will ask

These are **behavioral**, so they need stories, not mechanisms.

| They ask | What it's testing |
|---|---|
| **Tell me about a time you disagreed with a client requirement** | Do you push back with evidence, or just comply? |
| **How do you handle a production issue in a different time zone?** | Ownership across a handoff boundary |
| **How do you demo to a non-technical stakeholder?** | Can you talk product, not implementation? |
| How do you handle changing requirements mid-sprint? | Judgement about scope vs. schedule |

## Two stories already available — use them here

**1. The date picker fixed without forking.** The vendor date-picker only generated a ±7-year window,
so entering a date of birth meant clicking one year at a time. Options were to fork a minified vendor
file (unmaintainable) or swap the library across a legacy surface (a big change for one method).
Instead: a ~75-line runtime patch that finds the component and overrides the one method, widening the
range and auto-scrolling to the selected year. Loads after the vendor script, guards for the component
being missing, no-ops if the library is ever upgraded.

> **The point to land: reversible, and it fails safe.** That is what makes it senior rather than a hack.

**2. The mobile keyboard bug.** The Orders AI assistant chat sat in a floating panel. On mobile the
on-screen keyboard pushed the input off-screen, so users couldn't see what they were typing. Fix: make
the chat full-screen on mobile so the layout reflows above the keyboard instead of being pushed by it.
Small, but it's a genuine *"I noticed a real user problem"* story.

## Open item

**Prepare one real STAR story for "disagreed with a client requirement."** That is `D50`, and it is
the highest-value gap on this bullet. Neither story above covers disagreement.

## Never get wrong

- **Never name ThinkSys work content, repo names, client specifics or internal project names** beyond
  what's already on the CV. The employer boundary holds in every answer
- The CV is a public document — internal names (Odin, Spark, Control Tower) stay **off the page** but
  are fair game **in the room**
