# AI Search Visibility — the layer nobody local is selling

How a client gets **cited by ChatGPT, Perplexity, Google AI Overviews, and Copilot** — not just ranked on Google.

This is the moat. Every agency in Kutch can build a website. Some can do Google. **None are doing this**, and it is the thing that makes a Growth retainer defensible instead of a line item the client cancels in month four.

Read alongside `references/client-platforms.md` — that file is the classic layer, this is the answer layer. **They are different games.** Winning one does not win the other.

---

## Why this is a separate game

The numbers, as of 2026:

- AI assistants recommend only **~1.2% of local businesses on ChatGPT** and **~7.4% on Perplexity**, versus **~35.9%** appearing in Google's local 3-pack. The funnel is an order of magnitude narrower.
- Only **~11% of domains cited by ChatGPT are also cited by Perplexity.** The two engines barely agree on who exists.
- Citation rates differ by **~46×** between engines (ChatGPT cites a given brand ~0.59% of the time; Perplexity ~13.05%).
- In retail, **fewer than half** the brands winning local Google search appeared in AI recommendations at all.

The mechanism behind all of it: **AI engines retrieve from a much smaller index than Google's SERP.** They don't rank ten blue links, they pick two or three sources they trust enough to quote. Retrieval skews hard toward pages with **strong schema, clearly declared entities, and consistent cross-platform facts** — because a model that is about to state something as fact needs the fact to be unambiguous.

**Practical consequence:** a client can be #1 on Google in Gandhidham and be completely invisible when a procurement manager asks ChatGPT *"who supplies ETP plants near Kandla port?"* — which is increasingly how the question gets asked.

---

## The prerequisite that silently kills everything: let the crawlers in

**Check this before anything else. It is a 5-minute fix and it invalidates all the work below if it's wrong.**

AI engines cannot cite a page they are not allowed to read. Two things commonly block them, and neither shows up in the site's code:

### 1. Cloudflare's managed robots.txt (zone-level, dashboard toggle)

Cloudflare can inject a managed `robots.txt` **ahead of the application's own robots route**. Its default posture blocks the AI training and grounding crawlers.

**Know exactly which bot does what — the impact is real but narrower than it looks, and overstating it will get you caught:**

| Bot | Blocked by CF default | What that actually costs |
|---|---|---|
| `ClaudeBot` | Yes | **Claude cannot read the site at all.** Total block. |
| `GPTBot` | Yes | OpenAI **training** blocked. But `OAI-SearchBot` / `ChatGPT-User` are *not* on the list — **ChatGPT search can still fetch and cite the site.** |
| `Google-Extended` | Yes | Opts out of **Gemini app grounding**. It does **not** remove the site from **AI Overviews** — those run off the regular Search index via `Googlebot`, which is untouched. |
| `CCBot` | Yes | Common Crawl. A training corpus feeding many models — a slow, compounding loss. |
| `PerplexityBot` | **No** | Perplexity can crawl and cite normally. |
| `Googlebot` / `Bingbot` | **No** | Classic search indexing is completely unaffected. |

So the honest read: **this is a real loss, not a catastrophe.** Claude is fully locked out, the training corpora are opted out, and Gemini grounding is off — while ChatGPT search, Perplexity, and AI Overviews still work. Fix it, but **do not tell a client "you're invisible to AI" when they can check and find you're not.** One overstated claim costs more credibility than the fix is worth.

> **This is live on `kesrienterprise.com` right now**, exactly as described. It is the P0 item on Kesri's board. Cloudflare dashboard → the zone → the managed robots.txt / AI crawler control → turn it off.

**Judgment call, and it belongs to the client:** blocking AI crawlers protects content from being trained on. For a publisher with content worth stealing, that can be the right trade. **For a local business that wants to be found, it is self-harm** — it opts them out of a growing discovery channel to protect brochure copy nobody is stealing. Explain both sides, recommend "allow", let them decide.

### 2. The app's own robots.txt / noindex logic

Check that the site's real robots route allows the AI user-agents, and that nothing is emitting `noindex` by accident. A staging/preview-origin guard that falls back to `noindex` when an env var is missing will de-index a live site the moment a build runs without it. (Kesri has exactly this trap armed: `PUBLIC_SITE_URL` is unset in Workers Builds.)

**Verify, don't assume:** fetch `https://<domain>/robots.txt` and read what actually comes back over the wire. Not what's in the repo — what the server sends.

---

## The build-time layer (baked in, never bolted on)

`/client-build` is responsible for all of this. Retrofitting it later costs 5× more.

### Entity schema — tell the machine what this business *is*

An AI engine has to resolve "Kesri Enterprise" to an entity before it can recommend it. Schema is how you hand it the answer instead of making it guess.

Minimum viable entity block:

- **`LocalBusiness`** (or the right subtype) with `name`, full `address`, `telephone`, `url`, `areaServed`, `geo`, `openingHours`, `priceRange`.
- **`sameAs`** — an array linking every other profile: GBP, LinkedIn, IndiaMART, TradeIndia, Facebook. **This is the single most under-used field in local schema.** It is the literal instruction *"all of these are the same entity as me"*, and it is what lets a model cross-confirm a fact across three sources and decide it's true. Most sites omit it entirely.
- **`Service`** entries per real service, and **`Product`** per real product.
- **`FAQPage`** on pages with genuine Q&A.
- **`BreadcrumbList`** site-wide — cheap, and it declares site structure.

**The honesty constraint is a feature, not a tax.** Do not add `aggregateRating` or `offers` to make Google's Rich Results Test stop complaining. Google flags Kesri's `Product` schema as "invalid" for missing `offers`/`review`/`aggregateRating` — and the correct response is to leave it invalid. **Fake review markup is a manual-action risk, and a hallucinated price is a lie a model will repeat to a customer.** Empty beats invented. Fill these fields when the facts arrive.

### `llms.txt`

A plain-Markdown file at `/llms.txt` describing what the site is and pointing at the key pages. Cheap to write, trivially maintained, and adoption is rising. Treat it as an inexpensive bet, not a silver bullet.

### Question-headed content — the highest-citation format there is

This is the biggest content lever and it is nearly free.

**Question-headed content is the single highest-citation format on both AI Overviews and ChatGPT search.** Perplexity quotes long-form content with question `H2`s close to verbatim when the answer matches the user's question.

The pattern:

```
## What does an ETP plant cost for a mid-size edible-oil unit?
<the actual answer, in the first two sentences, in plain language>
<then the detail>
```

Rules that make it work:
1. **The H2 is the literal question a customer asks.** In their words, not the industry's. "How much does an ETP plant cost" beats "Effluent Treatment Plant — Commercial Considerations."
2. **Answer in the first 40-60 words.** A model extracts the answer near the heading. Burying it under three paragraphs of preamble means it never gets quoted.
3. **Be specific and factual.** Vague marketing prose is unquotable — there's nothing in it to cite.
4. **One question, one section.** Don't merge.
5. **Never invent to fill a section.** If the client can't answer the question truthfully, the section doesn't exist yet. Ask them; it becomes a questionnaire item.

Source the questions from what customers actually ask: sales calls, WhatsApp enquiries, the contact-form messages, Search Console queries. **A client's inbox is a free keyword tool** and it beats any SEO software for this.

---

## The findability layer (ongoing, retainer work)

`/client-findable` owns this.

### Cross-platform consistency IS the entity signal

Everything in `client-platforms.md` about NAP discipline is *doubly* load-bearing here. A model deciding whether to state "Kesri Enterprise supplies ETP plants in Gandhidham" as fact is looking for **corroboration across independent sources**. Website + GBP + IndiaMART + LinkedIn all saying the identical thing is the corroboration. One inconsistent address is a reason to stay silent.

**This is why the boring directory work and the shiny AI work are the same work.** Sell them as one thing.

### Be present where the models read

Models retrieve from a small trusted set. For an Indian local B2B, that set skews toward: the client's own site (if schema-clear and crawlable), GBP/Google Maps data, the large B2B directories, LinkedIn, and any news/association mention. **This is exactly the platform list already being executed.** No extra work — just don't skip the citations, because they're what makes the AI layer possible.

### Measure it — the prompt check

There is no Search Console for AI search. So measure it by hand. It takes 10 minutes a month and it is a **spectacular** thing to put in front of a client.

**The routine:** pick 5-8 buying questions a real customer would ask. Run each, verbatim, in **ChatGPT, Perplexity, and Google AI Overviews.** Record: is the client mentioned? cited with a link? which competitors appear instead?

Log it in `clients/<slug>/reports/` as a dated table:

| Prompt | ChatGPT | Perplexity | AI Overview | Who won instead |
|---|---|---|---|---|
| "ETP plant supplier near Kandla port" | ✗ | ✗ | ✗ | <competitor> |
| "RO plant AMC Gandhidham" | ✗ | ✓ (cited) | ✗ | — |

Expect a wall of ✗ at baseline. **That is the point.** The first ✓ is the most persuasive artifact in the entire engagement — it's a screenshot of an AI recommending the client by name, and it is worth more than any traffic chart. It also sets an honest expectation: this is a slow lever, measured over quarters.

---

## What to promise, and what not to

**Promise:** we make the site machine-readable, we make the facts consistent everywhere, we let the AI crawlers in, we write in the format AI engines quote, and **we measure whether it's working every month.** That is more than anyone else in the region is doing.

**Do not promise:** a ranking, a citation, or a timeline. There is no algorithm to game here and no dashboard to point at. Anyone promising "guaranteed ChatGPT ranking" is selling something they cannot deliver.

The honest pitch is the strong one: *"Your customers are starting to ask an AI instead of Google. Right now the AI has never heard of you. We fix that, and we show you the scoreboard every month."*

---

## The checklist

Technical gate (must pass first — everything else is wasted otherwise):
- [ ] `https://<domain>/robots.txt` fetched over the wire — AI crawlers **allowed**
- [ ] No zone-level managed robots.txt overriding the app
- [ ] No accidental `noindex` (check the live `<head>`, and check the env-var fallback path)
- [ ] Sitemap live and submitted

Entity gate:
- [ ] `LocalBusiness` schema complete — no null `geo`, no missing `priceRange`
- [ ] **`sameAs` array** linking every profile (GBP, LinkedIn, IndiaMART, TradeIndia)
- [ ] `Service` / `Product` schema per real offering — **no invented ratings or prices**
- [ ] `BreadcrumbList` site-wide
- [ ] NAP byte-identical across every platform

Content gate:
- [ ] `/llms.txt` published
- [ ] ≥5 question-headed sections, answer in the first 40-60 words
- [ ] Questions sourced from real customer enquiries, not imagination
- [ ] `FAQPage` schema on them

Measurement:
- [ ] Prompt-check baseline recorded before any of the above (so improvement is provable)
- [ ] Monthly re-run, logged in `clients/<slug>/reports/`

---

*Benchmarks here age fast — the citation percentages are 2026 figures and the engines change quarterly. Re-verify yearly. Last verified: 2026-07-13.*
