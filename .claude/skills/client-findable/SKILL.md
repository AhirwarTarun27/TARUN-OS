---
name: client-findable
description: Phase 3 of the client pipeline and the layer clients actually pay for — turn a live site into a findable business. Runs the technical gate (robots, indexing, schema), then builds a numbered, priority-ordered, paste-ready platform queue: Google Business Profile, Search Console, Bing, the B2B/local directories that fit THIS client's buyer, the AI-search layer, and the review engine. Delegates vertical directory research to the listing-researcher subagent. Enforces the location-page substance test so no thin doorway pages get built. Trigger on "/client-findable", "get the client found", "google business profile", "list the client on directories", "local seo for <client>", "why isn't the client ranking". One run = one findability.md board, or one batch of it executed.
---

# Client Findable — Phase 3: the layer they can't do themselves

**A beautiful site nobody finds is a failure.** The build is table stakes — every shop in Gandhidham can produce a website. This phase is the product. It is what earns the retainer, produces the testimonial, and triggers the referral that becomes client #2.

It is also the phase Tarun will be tempted to skip, because it is dashboards and OTPs rather than code. **Do not let him.** Findability is the flywheel.

## Preconditions
- The site is **live on the real domain**. Not a preview URL. (Everything here points at a domain.)
- `clients/<slug>/engagement.md` exists and names **the customer type** — that answer decides the entire platform list below.
- Read `references/client-platforms.md` and `references/ai-search-visibility.md` before starting. They are the corpus; this skill is the executor.

## Step 0 — Verify reality before you plan anything

**Do not trust the board. Fetch the world.**

The two most dangerous problems on Kesri's engagement were invisible to every status file in the repo — one was a Cloudflare dashboard toggle, the other an unset build variable. Neither existed in code. A findability plan built on a stale board will confidently tell Tarun to skip the thing that's broken.

Run these first, every time:

```
curl https://<domain>/robots.txt        # what does the SERVER send?
curl -s https://<domain> | grep -i robots   # any noindex in the live <head>?
curl https://<domain>/sitemap-index.xml # does it exist, and do the URLs use the real domain?
```

Check for:
- [ ] **AI crawlers allowed?** `GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot` — a `Disallow: /` for these kills the entire AI-search layer, and it is usually a Cloudflare *zone-level managed robots.txt* injected ahead of the app's own route. It is invisible in the repo.
- [ ] **No accidental `noindex`.** Especially from a preview-origin guard falling back when an env var is unset in CI.
- [ ] **Sitemap URLs use the real domain**, not a `*.workers.dev` fallback.
- [ ] **The site actually loads, fast, on a phone.**

Anything failing here is **P0 and jumps the entire queue.** There is no point creating a Google Business Profile for a site that is telling Google not to index it.

## Step 1 — Lock the canonical NAP

Generate the NAP block from the site's single data file (Kesri: `src/data/company.ts`). **Never retype it.** Write it into `findability.md` under `## Canonical NAP`.

Every field on every platform from here on is a **copy-paste from that block.** `Plot no-1002` and `Plot No. 1002` are two different businesses to a crawler, and a fractured entity is the most common reason a legitimate local business quietly fails to rank — and the reason an AI engine, which cross-confirms facts before stating them, stays silent about it.

Get the legal name right. **Kesri, not Kesari.**

## Step 2 — Research the vertical tier → `listing-researcher`

The universal, B2B, and local-consumer tiers are already known (`references/client-platforms.md`). **What changes per client is the vertical tier**, and it cannot be recalled from memory — Indian directory listicles are SEO spam farms full of dead links.

Delegate to the **`listing-researcher`** subagent. Give it: the client's name, what they actually sell, **who their buyer is**, their geography and travel radius, the live URL, the canonical NAP, and what's already done.

It returns a ranked list, a batch of citation filler, a skip list with reasons, and — most usefully — **the platforms the competitors are on that this client isn't.**

## Step 3 — Build the board: `clients/<slug>/findability.md`

The deliverable. **Numbered, priority-ordered, and paste-ready.**

The test this board must pass: *Tarun opens it at 8pm, tired, and executes an item without thinking.* If any item requires him to compose, decide, or research, the board has failed and this skill did not do its job.

Every item carries:

```
[ ] N. <Platform>                              P<0-2> · <time> · owner: CLIENT/TARUN
    Why:      <one line, tied to THIS client's buyer>
    Needs:    <mobile OTP / postcard / GST doc / nothing>
    Where:    <exact URL>
    Category: <the exact category to select>
    Paste:    <the literal text to paste — description, NAP, service list>
    Verify:   <how you know it worked, observably>
    Done:     <URL of the created listing, filled in when done>
```

**"Done" requires a URL.** A listing without a logged URL is not done — it's a listing you can neither fix nor find.

### Board order (P0 first, always)

1. **Technical gate** — anything failing Step 0. Nothing else matters until these are green.
2. **Google Business Profile** — the single biggest lever (~32% of local ranking weight; complete profiles get ~7× the clicks). Frequently outranks the client's own site. Get the **primary category** right — it is the highest-leverage field on the whole profile and a wrong one caps the ceiling permanently.
3. **Google Search Console** — submit the sitemap, request indexing on the money pages. Not a listing; **the instrument.** No GSC means no monthly report, which means no retainer renewal.
4. **Bing Places + Bing Webmaster** — imports from GBP/GSC in minutes. Feeds Copilot.
5. **Apple Business** — Apple Maps, Siri, Spotlight. Free. Nobody local does it.
6. **The buyer's platforms** — B2B tier (IndiaMART, TradeIndia…) *or* local-consumer tier (JustDial, Sulekha…), **never both**, chosen by the customer type from Phase 1. Listing an industrial supplier on JustDial is noise.
7. **Vertical tier** — from `listing-researcher`.
8. **AI-search layer** — see below.
9. **Review engine** — see below.
10. **Citation filler** — batched into one sitting, honestly labelled as what it is.

### On the directories: the catalog is the work, not the signup

A listing with a company name and nothing else is dead weight. **Each product and service gets its own entry, with real copy and a real photo.** That copy is pre-written on the board. Tarun pastes; he doesn't compose.

**Warn the client before creating IndiaMART/JustDial listings** — the sales calls start immediately and are relentless. Better they hear it from Tarun first than experience it as something he did to them.

## Step 4 — The AI-search layer (the moat)

Full spec in `references/ai-search-visibility.md`. On the board:

- [ ] **AI crawlers allowed** (the Step 0 P0 — this gates everything else here)
- [ ] **`sameAs` schema populated** with every profile created in Step 3. This is the payoff for the directory grind: it's the literal instruction that all these listings are one entity, and it's what lets a model cross-confirm a fact and decide it's true enough to say out loud.
- [ ] **`LocalBusiness` schema complete** — no null `geo`, no missing `priceRange`
- [ ] **`/llms.txt`** published
- [ ] **≥5 question-headed sections**, answer in the first 40-60 words. Questions sourced from **real customer enquiries** — the client's WhatsApp and the contact-form inbox are a better keyword tool than any SEO software.
- [ ] **Prompt-check baseline recorded** *before* any of this, so improvement is provable.

### The prompt check — run it monthly, log it, show the client

Pick 5-8 real buying questions. Run each verbatim in **ChatGPT, Perplexity, and Google AI Overviews.** Log to `clients/<slug>/reports/`:

| Prompt | ChatGPT | Perplexity | AI Overview | Who won instead |
|---|---|---|---|---|
| "ETP plant supplier near Kandla port" | ✗ | ✗ | ✗ | <competitor> |

**Expect a wall of ✗ at baseline. That is the point.** The first ✓ is the most persuasive artifact in the entire engagement — a screenshot of an AI naming the client — and it is worth more than any traffic chart.

**Promise the work, never the ranking.** There is no algorithm to game here and no dashboard to point at. The honest pitch is the strong one: *"Your buyers are starting to ask an AI instead of Google. Right now it has never heard of you. We fix that, and we show you the scoreboard every month."*

## Step 5 — The review engine

Reviews are the **#2 local ranking factor** and the strongest conversion factor. Businesses with 50+ reviews at 4.5+ outrank competitors that beat them on every other signal. Almost nobody asks for them on purpose.

Ship the *system*, not a one-off push:

- [ ] Grab the short GBP review link (`g.page/r/...`). QR code it — invoice, visiting card, email signature.
- [ ] **Pre-write the WhatsApp ask** on the board. The client's team sends it without composing anything.
- [ ] **Ask at the moment of delivered value** — plant commissioned, AMC renewed, job done. Not randomly.
- [ ] **Respond to every review**, good and bad. Response rate is itself a signal, and a calm reply to a bad review sells better than a wall of five stars.
- [ ] **Cadence over campaign.** 2-4 real reviews a month beats 20 in a week, which looks bought.
- [ ] **Never buy or fake reviews.** One purge zeroes the profile.

**B2B reality check:** procurement managers rarely leave Google reviews. For a B2B client, target a realistic 10-20 over a year and lean harder on client logos and credentials. **Do not promise a restaurant's review velocity to an industrial supplier** — an unmet promise here poisons the retainer conversation.

## Step 6 — Service × location pages: the substance test

The playbook says build them. **This gate decides whether they get built**, because a thin near-duplicate page is a known Google penalty target — and, worse, it is structurally an invitation to invent facts.

**Build `/<service>-in-<place>` ONLY if you can write 3+ sentences that are TRUE and UNIQUE to that place:**

- A real project or installation there?
- A real logistics, regulatory, or industry fact about that place?
- A local office, team, or response-time commitment?

**All no → do not build the page.** The local signal is carried instead by `areaServed` schema + the GBP service area + directory citations, which is what actually ranks a single-location business anyway.

> **Kesri today: all no.** The questionnaire is unanswered, `trust.ts` is entirely null, and there is not one confirmed fact that distinguishes Bhuj from Mundra. Its BUILD-PLAN was right to choose one `areaServed` array over per-city doorway pages. **Skip. Revisit when the questionnaire returns real project locations.**

When the facts do arrive, a location page built on them is genuinely strong. **The substance is the page.** Without it, you are just generating text — and generating text about a client whose facts you don't have is how the never-invent-a-fact rule dies.

## Step 7 — Work the queue, then close the gate

Most items here are dashboard work with an OTP: **only Tarun can do them.** Be honest about that. The AIOS's job is to make each one a paste, not a project.

**Do not invent work to look busy.** If the next action is "log into Cloudflare and flip a toggle", the correct output is *"nothing for me to do — go click it, then come back."*

As each item completes: tick it, **log the URL**, and update ▶ NEXT ACTION in `engagement.md` **before** moving on.

Phase 3 does not have a clean end — it flows into Phase 5 retainer work. It is "done enough" for Phase 4 when:

- [ ] Technical gate green (indexed, AI crawlers allowed, sitemap submitted)
- [ ] GBP live and verified
- [ ] GSC + Bing verified, sitemap submitted
- [ ] The buyer's platforms listed, **with real catalog entries**
- [ ] `sameAs` schema populated with every live profile
- [ ] Review system running (link, QR, script, cadence)
- [ ] Prompt-check baseline logged

Then: **"Run `/client-handover <slug>` — hand over the accounts, show them the win, and ask for the referral."**

## Rules

1. **Verify over the wire, first, every time.** Fetch the real robots.txt and the real `<head>`. A board is a claim about the world, not the world — and the worst problems live in dashboards, not repos.
2. **Paste-ready or it doesn't count.** If an item makes Tarun think at 8pm, this skill failed. Category, copy, NAP, verification — all pre-written.
3. **"Done" requires a logged URL.** No URL, not done.
4. **NAP is byte-identical everywhere.** Generated from the site's one data file. Never retyped.
5. **The customer type picks the tier.** B2B *or* local-consumer, not both. Get this wrong and the whole phase is wasted effort.
6. **Never invent a fact to fill a listing field.** If a platform wants a certification or a capacity the client hasn't confirmed, it becomes a questionnaire item — not a guess. One caught invention loses a B2B client for good.
7. **Location pages must earn their existence.** Three true, unique sentences or the page doesn't get built. `areaServed` + GBP + citations carry the local signal instead.
8. **Every account in the client's name.** Log the owner per listing — Phase 4 verifies it. Tarun is the manager, never the owner.
9. **Promise the work, not the ranking.** Especially for AI search. Anyone promising a guaranteed ChatGPT citation is selling something they cannot deliver, and the retainer dies on the first unmet promise.
10. **Free by default.** If a platform's real value is paywalled, say so plainly and let the client decide. Never quietly expensed, never eaten out of the margin.
