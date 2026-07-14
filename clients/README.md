# Clients — the web-solutions engagement registry

One folder per client. **This is business data, not code.** The client's website lives in its own repo; the *engagement* — who they are, what they're paying, where they are in the pipeline, what's been listed where — lives here.

Two reasons it's separate:
1. **One place to see every client at once.** `/client-pipeline` with no argument reads this directory and prints the portfolio.
2. **Pricing and engagement data must never end up in a repo you might hand to the client.**

## Structure

```
clients/
  _template/          copied verbatim when a new client is onboarded
  <slug>/
    engagement.md     who, what, price, phase, repo path, ▶ NEXT ACTION   ← source of truth
    findability.md    the Phase 3 platform board — paste-ready queue
    handover.md       account ownership ledger (Phase 4)
    retainer.md       tier, renewal date, growth queue (Phase 5)
    reports/          dated monthly reports + AI prompt-check logs
```

## The slug

Lowercase, hyphenated, **spelled the way the client spells it.** The slug becomes NAP data, and NAP consistency is a real ranking factor — a misspelling here propagates into a directory listing and fractures the business entity.

The first client is `kesri-enterprise`. It is spelled **Kesri**, not Kesari. The repo, the domain, and the brochure all agree; only the folder name on Tarun's laptop is wrong.

## How it's driven

Never edited by hand in the normal course of work. The skills own these files:

| Phase | Skill | Writes |
|---|---|---|
| 1 · Sell & Scope | `/client-scope` | `engagement.md` |
| 2 · Build | `/client-build` | build section of `engagement.md` |
| 3 · Findable | `/client-findable` | `findability.md` |
| 4 · Handover | `/client-handover` | `handover.md` |
| 5 · Retainer | `/client-retainer` | `retainer.md`, `reports/` |

`/client-pipeline` reads all of them and answers the only question that matters on a weeknight: **what do I do next?**

The process is documented in `references/client-delivery-playbook.md`. The platform corpus is in `references/client-platforms.md` and `references/ai-search-visibility.md`.
