# <Client Name> — Engagement

> The source of truth for this client. `/client-pipeline <slug>` reads this file first.
> Update it **before** advancing a phase, never after. A step logged late is a bug.

**Status:** Phase <N> — <phase name>
**▶ NEXT ACTION:** <one imperative line, with a time estimate. This is the product of this file.>
**Blocked on:** <who / what — or "nothing">

---

## The outcome (one sentence)

> *"<What changes in their business. Names a customer and a change. NOT a deliverable.>"*

Every decision in the next four phases bends to this sentence. If a move adds traffic but not this, it's the wrong move for this client.

## The business

- **What they sell:**
- **How they make money:** <which service is most profitable / which they want more of>
- **The customer:** <procurement manager? walk-in consumer? both? — **this decides the entire Phase 3 platform list**>
- **How customers find them today:**
- **What a win looks like in 6 months:** <a number, not "more enquiries">
- **Geography:** <city · district · how far they'll travel>

## Commercials

| | |
|---|---|
| **One-time** | ₹<amount> |
| **Retainer** | ₹<amount>/<period> · <Care / Growth> |
| **Advance** | <30-50%> — **paid <date> / NOT PAID** |
| **Running costs passed through** | domain ~₹900/yr · <email / other> |

<If this is a below-market rate, say why, and say plainly that it is NOT the rate card.>

## Scope

**Included:** <named pages, named features, revisions capped at 2>

**NOT included:** <logo design · content writing · photography · product data entry · social media · ongoing edits outside the retainer — name whichever apply>

**Timeline:** <dates> · *waiting-on-client clause: <what they owe, by when>*

## The build

- **Repo:** `<absolute path>`
- **Live URL:** <domain, or "not live">
- **Tier:** static / static + one function / full backend — <one line why>
- **Stack:** <e.g. Astro + Cloudflare Workers, the house template>

## Questionnaire

**Sent:** <date> / **NOT SENT** ← *if not sent, this is almost certainly the ▶ NEXT ACTION*
**Answered:** <date / partial / no>

It has the longest lead time in the project and every unanswered item is a field that renders as nothing, forever. **"None" is a complete answer.** Never lead a client toward inventing a fact to fill a section.

**Still blocking:**
- [ ] <field> → <what it unlocks on the site>

## Phase board

- [ ] **1 · Sell & Scope** → `/client-scope` — <date / pending>
- [ ] **2 · Build** → `/client-build` — <date / pending>
- [ ] **3 · Findable** → `/client-findable` — <date / pending> · board: `findability.md`
- [ ] **4 · Handover** → `/client-handover` — <date / pending> · ledger: `handover.md`
- [ ] **5 · Retainer** → `/client-retainer` — <date / pending> · `retainer.md`

Legend: `[x]` done · `[~]` in progress · `[ ]` pending

## Decisions

- <date> — <decision + one-line why>

*(Formal record goes in `decisions/log.md`.)*
