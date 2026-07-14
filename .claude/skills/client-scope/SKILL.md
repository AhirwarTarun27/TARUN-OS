---
name: client-scope
description: Phase 1 of the client pipeline — the phase that separates a business from a favour. Runs the discovery interview, forces the client's business outcome into ONE sentence, writes a fixed scope with an explicit NOT-included list, prices it (one-time + retainer together), sets the advance, and sends the client questionnaire on day one. Outputs the engagement record, a client-facing proposal, and the "How We Take Your Business Online" process doc used as the sales asset. Trigger on "/client-scope", "new client", "scope a client", "quote a website", "price this project", "discovery call". One run = one engagement.md + one proposal + one process doc.
---

# Client Scope — Phase 1: Sell & Scope

**Most projects die here, or have their margin destroyed here.** Not in the code. The build is the part Tarun is already good at; this is the part that turns building into a business.

Runs before a single line of code. Output: a client who has agreed, in writing, to a fixed scope at a fixed price with an advance paid — and an engagement record the rest of the pipeline runs off.

## Preconditions
- A real prospect exists. This skill is not for daydreaming about clients.
- If `clients/<slug>/` already exists, this is a **re-scope** (new phase of work, a second project). Read the existing `engagement.md` first — don't overwrite the history.

## Step 1 — Discovery. Ask about the business, not the website.

Never open with "what pages do you want?" That question invites a list of pages and produces a brochure nobody finds.

Ask, in this order, and **write the answers down verbatim**:

1. **How does this business actually make money?** Which service is most profitable? Which one do they *want* more of?
2. **Who is the customer?** Not "everyone." A procurement manager at a pharma plant is a different human from a walk-in retail buyer, and they are found in completely different places. **This single answer determines the entire Phase 3 platform list.**
3. **How do customers find them today?** Referrals? A brochure? IndiaMART? Nothing? This tells you what's already working — and what the site has to beat.
4. **What does a win look like in 6 months?** Push for a number. "More enquiries" is not an answer. "Two ETP enquiries a month from outside Kutch" is.
5. **What do they already have?** Logo, photos, brochure, content, domain, socials, GST, registrations. **What exists shortens the build. What's missing is a bottleneck with the client's name on it.**
6. **Who signs off, and who else has opinions?** The uncle with views on the logo will surface eventually. Better now.

**STOP. Ask Tarun:** "Anything from the discovery that changes the shape of this?" Don't proceed on a half-answered discovery.

## Step 2 — The outcome in ONE sentence

This is the most important artifact of the phase. Everything downstream bends to it.

> *"Show up on Google across Kutch and Gujarat, and look credible to a procurement manager who has never heard of us."* — Kesri

Not "a modern responsive website." That's a deliverable. The outcome is **what changes in their business.**

Test it: does it name a *customer* and a *change*? If not, rewrite it. This sentence goes at the top of `engagement.md` and it is the tiebreaker for every decision in the next four phases.

## Step 3 — Fixed scope, in writing

Scope creep lives in the gaps you leave undefined. Close them:

- **Page count**, named. Not "a few pages."
- **Features**, named. Contact form? Yes. Blog? Say so either way.
- **Revision rounds — capped at 2.** Written down. This is the single line that saves the most evenings.
- **An explicit "NOT included" list.** This is not rude; it is the kindest thing in the document. Logo design, content writing, photography, product data entry, ongoing edits, social media — whichever of these you're not doing, name it.
- **Timeline with a "waiting on you" clause.** The client's content is almost always the bottleneck. Put that on paper now, or their delay becomes your missed deadline.

## Step 4 — Price it. One-time AND retainer, together, always.

Read the pricing table in `references/client-delivery-playbook.md`. Current bands (Gujarat Tier-2/3, 2026):

| | |
|---|---|
| Simple brochure site (4-6 pages) | ₹15K-30K one-time |
| B2B credibility site (custom, SEO, form, schema) | ₹25K-50K one-time |
| Full backend (bookings/inventory/login) | ₹50K+ |
| Care retainer | ₹1.5K-4K/mo |
| Growth retainer (findability) | ₹5K-15K/mo |

Rules:
- **Quote one-time + retainer as one number, in one breath.** A retainer introduced later sounds like a bill. Introduced at the start, it's the deal. **One-time builds are a treadmill; recurring income is the business.**
- **Never anchor to Kesri's ₹10K.** That is a deliberate below-market relative/case-study rate, not the rate card. Client #2 pays market.
- **Price the outcome, not the hours.** A site that brings a plant one ETP contract is worth more than the 40 hours it took.
- **Pass running costs through** — domain (~₹900/yr), email, any API. Eating them quietly kills the margin.

## Step 5 — The advance. This is a gate, not a suggestion.

**30-50% advance before any work starts.** No advance, no start.

For a relative or a friend, an exception is something you **consciously choose**, once, with your eyes open — never a default that quietly becomes the norm. (Kesri is that conscious exception. It does not set precedent.)

## Step 6 — Send the questionnaire. TODAY. Not in Phase 6.

**This is the step that exists because of a real, expensive mistake.** Kesri's client questionnaire was drafted and *never sent*. Its own STATUS.md calls it "the longest lead time in the project." It is still blocking the trust bar, the certifications, the geo coordinates, and the schema — months later, on a site that is already live.

Build the questionnaire from what the site cannot render without:

- Legal name + GST/registration numbers
- Certifications, and their real names and numbers (**or "none"** — that is a valid, honest answer)
- Capacities, project counts, founding year — **any number that would appear on the site**
- Exact premises coordinates (for map schema — geocoding the street line lands in the wrong place)
- Service radius: this district only, the state, or nationwide?
- **Permission to publish a WhatsApp number**, and which one
- Which existing clients can be named, and whether their logos can be used
- Photos: real ones, of real work

Two rules that make this worth doing:

- **Every unanswered item is a field that renders as nothing, forever.** Not as a placeholder, not as a guess.
- **"None" and "we don't have that" are complete answers.** The questionnaire is not a demand for impressive facts. It is a demand for *true* ones.

**Send it in Phase 1. Chase it in Phase 2.** It has a longer lead time than the entire build.

## Step 7 — Write the artifacts

### 7a. `clients/<slug>/engagement.md` — the internal source of truth

Copy `clients/_template/` first. Fill: the outcome sentence, the customer type (this drives Phase 3), the scope + NOT-included list, price + retainer + advance status, timeline, repo path, questionnaire status, and **▶ NEXT ACTION**.

### 7b. The proposal — client-facing

Short. One page. Scope, NOT-included, price, advance, timeline, what's expected from them. Over email or WhatsApp is enough to start — **a one-page written agreement protects the relationship, not just the invoice.**

### 7c. "How We Take Your Business Online" — the sales asset

This is the document that wins the next client, and it is the reason the ecosystem exists.

Write it **in the client's language, not Tarun's.** Not "JSON-LD entity schema and cross-platform NAP consistency." Instead: *"we make sure Google and ChatGPT know exactly who you are, and that every listing about you says the same thing."*

Structure:

```
1. First we learn how you make money.        (before we design anything)
2. Then we build the site.                    (fast, works on a phone, no bloat)
3. Then we make you FINDABLE.                 ← this is the part others skip
     · Google Search + Google Maps
     · The places your buyers actually search (IndiaMART, TradeIndia...)
     · ChatGPT and AI search                  ← nobody in Kutch is doing this
     · Reviews — the #1 thing that ranks you locally
     · Enquiries land on your phone instantly, not in an inbox you never open
4. Then we hand it over.                      (every account in YOUR name)
5. Then we keep you growing.
     Every month: what people searched to find you, and what we did about it.
```

Three things make this a sales asset rather than a brochure:

- **It names what others don't do.** Most local shops sell a website and disappear. This document is a list of everything that happens *after* the website — which is the entire value.
- **It is tailored.** Generated per prospect, using their business, their customer, their geography. A generic version is a leaflet; a specific one is a plan.
- **Point 5 is the close.** The monthly report is the reason they keep paying, and showing it up front makes the retainer feel like a service rather than a subscription they forgot to cancel.

## Step 8 — Close the phase

Update `engagement.md`: tick Phase 1, set ▶ NEXT ACTION to the Phase 2 kickoff. Append a one-line entry to `decisions/log.md` (client, outcome sentence, price, advance).

Close by naming the exact next command: **"Run `/client-build <slug>` to scope the build."**

## Rules

1. **Never start without an advance.** The one exception (a relative, a case study) is a decision you make once and log — never a habit.
2. **Never quote without the retainer attached.** Introduced late, it sounds like a bill.
3. **The outcome sentence names a customer and a change.** If it names a deliverable, it's wrong.
4. **The NOT-included list is mandatory.** An empty one means you haven't thought about it yet.
5. **The questionnaire goes out in Phase 1.** It has the longest lead time in the project, and every unanswered item is a permanently empty field on the site.
6. **"None" is a valid answer to every question.** Never lead a client toward inventing a certification to fill a section. Empty beats invented, always — one caught invention loses a B2B client for good.
7. **The customer-type answer is load-bearing.** It decides the entire Phase 3 platform list. A B2B industrial client and a walk-in consumer client share almost no platforms. Get this wrong in Phase 1 and Phase 3 is wasted.
