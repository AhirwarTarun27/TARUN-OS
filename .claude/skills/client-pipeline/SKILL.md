---
name: client-pipeline
description: The parent pipeline for every web-solutions client. Knows where each client is in the 5-phase delivery motion and tells Tarun the ONE next action to take today, with paste-ready copy — so no engagement is ever re-derived by hand. Reads clients/<slug>/engagement.md, prints the next action, and runs the owning sub-skill (client-scope, client-build, client-findable, client-handover, client-retainer). Trigger on "/client-pipeline", "what's next for <client>", "client status", "new client", "how's <client> going", "where are we with <client>". One run = one client advanced by one concrete step, or a portfolio view.
---

# Client Pipeline — the orchestrator for the web-solutions business

The playbook (`references/client-delivery-playbook.md`) describes the motion. **This skill executes it.** It is the answer to *"what do I do for this client today?"* — asked at 8pm on a weeknight, with two hours and a day job's worth of tiredness.

Every client runs the identical 5-phase motion. This parent tracks where each one is, names the single next action, and hands off to the sub-skill that owns it.

## The three modes

| Invocation | Mode | What it does |
|---|---|---|
| `/client-pipeline` | **Portfolio** | Every client, their phase, their next action, what's blocked. |
| `/client-pipeline <slug>` | **Advance** | Read that client's state → print the ▶ NEXT ACTION → offer to run the owning sub-skill. |
| `/client-pipeline new` | **Intake** | Run `client-scope` for a client that doesn't exist yet. |

If a slug is ambiguous or misspelled, list the real ones rather than guessing. **Client names are NAP data** — getting one wrong is not cosmetic. (The first client is `kesri-enterprise`, spelled *Kesri*, not *Kesari*.)

## The 5 phases → the 5 sub-skills

```
Phase 1  Sell & Scope   → client-scope      discovery · outcome sentence · scope · price · advance
Phase 2  Build          → client-build      tier · template · ecosystem baked in · deploy
Phase 3  Findable       → client-findable   GBP · consoles · directories · AI search · reviews
Phase 4  Handover       → client-handover   accounts · docs · show the win · testimonial · referral
Phase 5  Retainer       → client-retainer   monthly report · growth work · review cadence
```

**Each step stays its own skill.** This parent only orchestrates and reports — fix logic in the sub-skill, never here.

Phases run in order, but **Phase 3 never truly ends** — it moves from a build-out into Phase 5 retainer work. A client in Phase 5 with an incomplete findability board still has Phase 3 items in their queue.

## State — where a client lives

Everything is in `clients/<slug>/`. The client's code repo stays pure code; the *engagement* is business data and lives here.

```
clients/
  _template/            copied verbatim for every new client
  <slug>/
    engagement.md       who, what, price, phase, repo path, ▶ NEXT ACTION   ← the source of truth
    findability.md      the platform board (Phase 3) — paste-ready queue
    handover.md         account ownership ledger (Phase 4)
    retainer.md         tier, renewal date, growth queue (Phase 5)
    reports/            dated monthly client reports + AI prompt-check logs
```

`engagement.md` carries the **▶ NEXT ACTION** line. That line is the product of this entire skill.

**Update state FIRST, before advancing.** Tick the step, log the decision one-liner + date, reset ▶ NEXT ACTION — *then* move. A step logged after the fact is a bug. (Same rule as `/explore-project`; it is what makes the pipeline survive a context reset.)

## Portfolio mode — `/client-pipeline`

Read every `clients/*/engagement.md`. Print one compact table:

```
CLIENT               PHASE                  NEXT ACTION                          BLOCKED ON
kesri-enterprise     3 — Findable (4/16)    Turn off CF managed robots.txt (5m)  —
<next client>        1 — Scope              Send the questionnaire               client reply
```

Then name **the one client to touch tonight** and why. Do not present a menu of six things — the whole point of this skill is that Tarun stops choosing.

## Advance mode — `/client-pipeline <slug>` (the main path)

### 1. Read the real state, don't trust the file blindly

Open `clients/<slug>/engagement.md`. Then **spot-check reality against it** before reporting anything:

- If the site is live, fetch it. Does `robots.txt` say what the board thinks it says? Is the page actually up?
- If there's a repo path, check its own status file (e.g. `<repo>/.claude/learning/STATUS.md`).
- If a listing is marked done, it should have a URL logged next to it. **No URL = not done.**

A findability board that has drifted from reality is worse than no board, because it will confidently tell Tarun to skip the thing that's broken. **Kesri's two P0 landmines were both invisible to every status file in the repo.** Verify, then report.

### 2. Print the next action — the actual deliverable

```
Kesri Enterprise · Phase 3 (Findable) · 4/16 done

▶ NEXT — P0 · 5 min · blocks the entire AI-search layer
  Cloudflare dashboard → kesrienterprise.com → turn OFF the managed robots.txt.
  It is currently telling ChatGPT, Claude, and Gemini not to read the site.
  Verify: curl https://kesrienterprise.com/robots.txt — no `Disallow: /` for GPTBot.

THEN — P0 · 2 min
  Workers Builds → Settings → Variables → add PUBLIC_SITE_URL=https://kesrienterprise.com
  Without it, the next build ships a noindex site to the live domain.

THEN — P1 · 30 min
  Google Business Profile. Paste-ready copy is in findability.md §3.
```

Rules for this output:
- **One ▶ NEXT.** Not a list to choose from.
- **Every item carries a time estimate.** Tarun has ~2h on a weeknight and needs to know if this fits.
- **Every item carries a verification step.** "Done" means observably done, not "I clicked it".
- **P0 items jump the queue regardless of phase.** A live site telling crawlers to go away outranks any planned work.
- **Blocked items say who they're blocked on.** If it's the client, the next action is chasing the client — that IS the action.

### 3. Offer to run the owning sub-skill

**STOP. Ask:** "Want me to run `/client-<phase>` and work the queue, or are you going to knock out the next action first?"

Some next actions are pure dashboard work only Tarun can do (OTP, postcard, a Cloudflare toggle). For those, the honest answer is *"nothing for me to do here — go click it, then come back."* **Say that.** Don't invent work to look busy.

### 4. Update state before finishing

Whatever moved, tick it in `engagement.md` and the relevant board, with the date and the URL/evidence. Reset ▶ NEXT ACTION. **Then** report.

## Intake mode — `/client-pipeline new`

1. Copy `clients/_template/` → `clients/<slug>/`.
2. Run `client-scope`.
3. On completion, `engagement.md` exists with Phase 1 ticked and ▶ NEXT ACTION set to the Phase 2 kickoff.

Slug rule: lowercase, hyphenated, and **spelled the way the client spells it** — this becomes NAP data.

## Rules

1. **One next action, always.** The failure mode this skill exists to kill is Tarun opening a client folder at 8pm and having to think. If the output requires a decision, it has failed. Name the action, name the time, name the verification.

2. **Verify before you report.** A board is a claim about the world, not the world. Fetch the live robots.txt. Check the repo's status file. **Every "done" needs a URL or an observable check next to it.** The two most dangerous items in Kesri's engagement were invisible to every file that claimed to track it.

3. **Never invent a fact about a client.** Certifications, capacities, turnover, project counts, client names — all stay empty until the client confirms them. Empty renders as nothing; invented renders as a lie a procurement manager will eventually catch, and then the referral engine runs in reverse. This rule outranks every SEO consideration in this pipeline.

4. **Every account in the client's name.** Domain, GBP, GSC, email, directories. Tarun is the manager, never the owner. Never hold a domain hostage — in a town where everyone knows everyone, that is not a negotiating position, it is a reputation.

5. **Free by default.** Everything the pipeline touches is free-tier. If a platform wants money, it goes to the client as a decision — never quietly expensed, never eaten out of the margin.

6. **The client's business outcome is the product, not the website.** Before any phase, the one-sentence outcome from `engagement.md` is the tiebreaker. Kesri wants credibility with procurement managers and regional findability — not traffic. A move that adds traffic but not credibility is the wrong move for *this* client.

7. **Respect the time budget.** Side-business is ~2h weekday, 4-5h weekend, and **the job hunt wins any weeknight collision** (DSA is the gate — see `context/priorities.md`). If the next action doesn't fit tonight, say so and name the smaller slice that does.

8. **Findability is the flywheel.** The site is table stakes; getting found is what earns the retainer, the testimonial, and the referral. When in doubt about what to work on, work Phase 3.

9. **Kesri is the template, not the rate card.** ₹10K + ₹3K/yr is a deliberate below-market relative/case-study price. Never anchor a new quote to it. Market for a Kesri-class build is ₹25-50K one-time + a real retainer — see the playbook's pricing table.
