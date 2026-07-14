# Kesri Enterprise — Findability Board

> Phase 3. **The entire remaining engagement.** The site has been live for days and is findable by nobody.
> Every item below is executable without thinking. Paste, verify, tick, log the URL.

**Progress:** 3/17 · **▶ NEXT:** §0.1 — Cloudflare managed robots.txt (5 min, P0)
**Buyer:** procurement managers at industrial plants, Kandla–Mundra belt → **B2B tier. No JustDial, no Sulekha.**

---

## Canonical NAP

Generated from `KesariEnterprise/src/data/company.ts` — the single source of truth. **Never retype it. Paste it.**

```
Name:     Kesri Enterprise
          (Technical Engineering Division)
Address:  Plot no-1002, Tenement-3, Ward-9/B(A), S.N. Owners, Bharat Nagar,
          Gandhidham, Kachchh, Gujarat-370201, India
Phone:    +91 80006 37761        (primary — use this one everywhere)
          +91 94274 51658        (secondary)
          +91 80000 87983        (secondary)
Email:    info@kesrienterprise.com
Website:  https://kesrienterprise.com
```

**It is Kesri, not Kesari.** The repo folder on the laptop is misspelled; nothing else is. One misspelled listing creates a duplicate entity and fractures the NAP.

**Area served:** Gandhidham · Kandla · Mundra · Anjar · Bhuj · Kutch
**Bases:** Mundra + Gandhidham

---

## §0 · Technical gate — P0. Nothing below matters until these are green.

### 0.1 — Cloudflare managed robots.txt is blocking the AI crawlers · **P0 · 5 min · owner: TARUN**

**Verified live on 2026-07-13.** `https://kesrienterprise.com/robots.txt` currently returns a Cloudflare-injected managed block, ahead of the app's own route.

**Be precise about what it costs — don't overstate this to the client:**

| Bot | Blocked? | Actual impact |
|---|---|---|
| `ClaudeBot` | **Yes** | **Claude cannot read the site at all.** Total block. |
| `GPTBot` | **Yes** | OpenAI *training* blocked. `OAI-SearchBot` is **not** listed → **ChatGPT search can still cite the site.** |
| `Google-Extended` | **Yes** | Gemini app grounding off. **Does NOT remove the site from AI Overviews** — those run off `Googlebot`, which is untouched. |
| `CCBot` | **Yes** | Common Crawl — a training corpus feeding many models. Slow, compounding loss. |
| `Amazonbot`, `Applebot-Extended`, `Bytespider`, `meta-externalagent` | Yes | Alexa, Apple Intelligence, TikTok, Meta AI. |
| `PerplexityBot` | **No** | Perplexity crawls and cites normally. |
| `Googlebot` / `Bingbot` | **No** | **Classic search indexing is completely unaffected.** |

**The honest read: a real loss, not a catastrophe.** Fix it — but never tell a client "you're invisible to AI" when they can check and find they're not.

```
FIX:  Cloudflare dashboard → kesrienterprise.com → Settings (or Security → Bots)
      → find the managed robots.txt / AI crawler control → turn it OFF
VERIFY: curl https://kesrienterprise.com/robots.txt
        → no "Disallow: /" under ClaudeBot / GPTBot / Google-Extended
```

**This is the client's call, technically.** Blocking AI crawlers protects content from training. For a publisher that can be right. **For a B2B supplier who wants procurement managers to find them, it's self-harm** — opting out of a growing discovery channel to protect brochure copy nobody is stealing. Recommend "allow"; let him decide.

- [ ] Done · verified:

### 0.2 — `PUBLIC_SITE_URL` is unset in Workers Builds · **P0 · 2 min · owner: TARUN**

**A latent de-indexing landmine.** The live site is currently healthy (verified 2026-07-13: no `noindex`, canonical correct, sitemap on the real domain). The danger is the *next* CI build.

`src/lib/indexing.ts` falls back to the workers.dev origin when `PUBLIC_SITE_URL` is missing, and that fallback emits **`noindex, nofollow` + `Disallow: /`**. The variable is not set as a Workers Builds Build variable, and the GitHub → Workers Builds trigger **has never been observed firing**. The day it does, it ships a de-indexed site to the live domain — and nothing will alert anyone.

The checked-in `dist/client/robots.txt` already says `Disallow: /` from exactly this failure mode. The gun is loaded.

```
FIX:  Cloudflare → Workers & Pages → kesri-enterprise → Settings → Build
      → Variables → add:  PUBLIC_SITE_URL = https://kesrienterprise.com
VERIFY: trigger a build, then curl https://kesrienterprise.com/robots.txt
        → still "Allow: /", sitemap still points at kesrienterprise.com
```

- [ ] Done · verified:

### 0.3 — Already green ✅

- [x] Site live and fast at https://kesrienterprise.com
- [x] Sitemap live, real domain — `https://kesrienterprise.com/sitemap-index.xml` (25 URLs)
- [x] No `noindex` in the live `<head>`; canonical correct

---

## §1 · Google Business Profile · **P1 · 30 min · owner: CLIENT (Tarun as manager)**

The single biggest lever. ~32% of local ranking weight; complete profiles get ~7× the clicks. **It will likely outrank the website itself.** Kesri has none.

```
Where:  business.google.com
Needs:  postcard OR phone/video verification — expect a few days' delay. START THIS EARLY.
Owner:  MUST be created under the CLIENT's Google account. Tarun = manager, never owner.
```

**Primary category:** `Water treatment supplier`
*(Confirm the exact string in Google's picker. Fallbacks if unavailable: "Water treatment plant" or "Water purification company." **The primary category is the highest-leverage field on the entire profile — a wrong one caps the ceiling permanently.**)*

**Additional categories:** `Water filter supplier` · `Environmental engineer` · `Sewage treatment plant`

**Address decision — flag to Tarun, don't decide silently:** the premises is a tenement plot in Bharat Nagar, not a showroom. Instinct says hide it. **Recommendation: show it.** The address is already public on the site and in the JSON-LD, so hiding it on GBP creates a NAP inconsistency — the exact thing this whole phase exists to prevent. Set the service area *in addition*.

**Service area:** Gandhidham · Kandla · Mundra · Anjar · Bhuj · Kachchh district

**Description — paste this verbatim (every claim is true and sourced from the brochure):**

> Kesri Enterprise is a water treatment company based in Gandhidham, Kutch, serving industrial plants across the Kandla–Mundra belt.
>
> We supply, install and maintain water and wastewater treatment infrastructure: industrial RO systems, water softeners and DM plants, sewage treatment plants (STP), and effluent treatment plants (ETP). We also supply treatment chemicals, antiscalants, coagulants and boiler inhibitors.
>
> Our operation & maintenance (O&M) and annual maintenance contracts (AMC) cover media refilling, retrofitting and plant upkeep.
>
> We work with pharmaceutical, edible oil and agri, food and beverage, hospitality, and chemical manufacturing plants across Gandhidham, Kandla, Mundra, Anjar, Bhuj and Kutch.
>
> Call +91 80006 37761 or visit kesrienterprise.com

**Services (add each as its own entry, named the way a buyer searches):**
`Industrial RO Plant` · `Water Softener` · `DM Plant` · `STP (Sewage Treatment Plant)` · `ETP (Effluent Treatment Plant)` · `Water Treatment Chemicals` · `O&M / AMC Contracts` · `Plant Retrofitting` · `Media Refilling`

**Photos:** real installations only. **Never a competitor's branded product in shot** (repo hard rule). If there are no photos, that is a questionnaire item — not a reason to use stock.

**Hours:** ask the client. Don't guess.

**Verify:** search `Kesri Enterprise Gandhidham` on Google Maps → the profile appears.

- [ ] Done · profile URL:
- [ ] Review link captured (`g.page/r/...`) → feeds §5

---

## §2 · Search consoles · **P1 · 25 min total · owner: CLIENT account**

- [ ] **Google Search Console** — `search.google.com/search-console` · DNS verify (Cloudflare makes this trivial) · submit `https://kesrienterprise.com/sitemap-index.xml` · request indexing on: `/`, `/services/etp`, `/services/stp`, `/services/oandm-amc`, `/products/industrial-ro`
      **This is the instrument, not a listing. No GSC = no monthly report = no retainer renewal.** It is also the source of the single most persuasive sentence in the whole business: *"here are the actual words people typed to find you."*
      Done · property:
- [ ] **Bing Webmaster** — `bing.com/webmasters` · import from GSC in one click · feeds Copilot
      Done:
- [ ] **Bing Places** — `bingplaces.com` · import from GBP
      Done:
- [ ] **Apple Business** — `business.apple.com` · free · Apple Maps + Siri + Spotlight. **Nobody local does this.**
      Done:

---

## §3 · The buyer's platforms — B2B tier · **P1 · ~3-4 hrs total · owner: CLIENT account**

**This is where procurement actually searches.** A buyer sourcing an ETP opens IndiaMART before they open Google. These are not just SEO citations — they are the lead channel.

⚠️ **Warn the client BEFORE creating these.** IndiaMART and TradeIndia will start calling immediately and relentlessly to upsell. Better he hears it from Tarun first than experiences it as something Tarun did to him.

**The catalog is the work, not the signup.** A listing with just a company name is dead weight.

**The 10 catalog entries** (paste the product/service descriptions straight from the live site — they're already written and already true):

| Entry | Source page |
|---|---|
| Industrial RO Plant | `/products/industrial-ro` |
| Puretech RO (up to 500 LPH — *the only confirmed capacity figure in existence; do not invent others*) | `/products/puretech-ro` |
| AugaPure RO | `/products/augapure-ro` |
| Water Softener | `/products/water-softener` |
| DM Plant | `/products/dm-plant` |
| Mineral Controller | `/products/mineral-controller` |
| STP — Sewage Treatment Plant | `/services/stp` |
| ETP — Effluent Treatment Plant | `/services/etp` |
| Water Treatment Chemicals | `/services/water-treatment-chemicals` |
| O&M / AMC | `/services/oandm-amc` |

- [ ] **IndiaMART** — `seller.indiamart.com` · free listing · mobile OTP · **the biggest. Do this first.** All 10 catalog entries.
      Done · URL:
- [ ] **TradeIndia** — `tradeindia.com` · free · mobile OTP · all 10 entries
      Done · URL:
- [ ] **ExportersIndia** — `exportersindia.com` · free · mobile OTP
      Done · URL:
- [ ] **IndianYellowPages** — free · citation value
      Done · URL:
- [ ] **Kompass India** — free basic · B2B/industrial skew, decent authority
      Done · URL:

**Not doing:** JustDial, Sulekha, Yellow Pages consumer listings. **Wrong buyer.** A procurement manager sourcing an ETP plant does not use JustDial. Listing there is noise that costs an evening.

- [ ] **Run `listing-researcher`** for the vertical tier — water-treatment / environmental-engineering directories, Kutch & Gujarat trade bodies, industrial associations, tender portals. **Especially: where are the competitors listed that Kesri isn't?**
      Done · output:

---

## §4 · Credentials tier · **P2 · owner: CLIENT**

Not directories, but procurement managers check them and they carry entity weight.

- [ ] **LinkedIn Company Page** — free, high-authority `sameAs` target, real entity signal for AI search. *(This is the **client's** LinkedIn. Tarun's own LinkedIn boundary — professional/job-growth only — is untouched by this.)*
- [ ] **Udyam / MSME registration number** — if registered, put it on the site. Unlocks tenders. **Questionnaire item.**
- [ ] **GSTIN on the site** — standard Indian B2B credibility signal. **Questionnaire item. Never invent it.**
- [ ] **Kutch / Gandhidham chamber of commerce or industrial association** — a member listing is a high-relevance local citation.

---

## §5 · AI-search layer — the moat · **P2**

Full spec: `references/ai-search-visibility.md`. **Gated on §0.1.**

- [ ] §0.1 done (AI crawlers allowed) ← **everything here is wasted until this is true**
- [ ] **`sameAs` array populated** in `LocalBusiness` schema with every profile from §1-§4 (GBP, LinkedIn, IndiaMART, TradeIndia, ExportersIndia).
      **This is the payoff for the entire directory grind.** It's the literal instruction that all these listings are one entity — and it's what lets a model cross-confirm a fact and decide it's true enough to say out loud. Kesri's schema has **no `sameAs` at all** today.
- [ ] **`geo` coordinates** → `LocalBusiness.geo` is `null`. **Questionnaire item.** Do not geocode the street line — it resolves to the wrong end of Bharat Nagar.
- [ ] **`priceRange`** → currently missing; Google flags it. Ask the client for a band (e.g. `₹₹`). **Don't invent one.**
- [ ] **`BreadcrumbList`** site-wide · **`FAQPage`** on the question-headed pages
- [ ] **`/llms.txt`** published
- [ ] **≥5 question-headed sections.** Source the questions from real enquiries — the contact-form inbox and the client's WhatsApp beat any keyword tool.
      Starters (confirm with the client that they can answer each one **truthfully**):
      - *"How much does an ETP plant cost for a mid-size edible-oil unit?"*
      - *"What's the difference between an STP and an ETP?"*
      - *"How often does an industrial RO plant need media refilling?"*
      - *"What does a water-treatment AMC actually cover?"*
      - *"Which treatment plant does a pharma unit need to meet GPCB norms?"*
      **If he can't answer one truthfully, the section doesn't exist yet.** Never write it anyway.

### ⚠️ Do NOT "fix" the Product schema warning

Google's Rich Results Test flags `/products/industrial-ro` as **"1 invalid item"** — `Product` is missing `offers` / `review` / `aggregateRating`.

**Leave it invalid.** A fake rating is a manual-action risk and a hallucinated price is a lie a model will repeat to a customer. The repo's STATUS.md already says this explicitly: *"Do not invent either to clear the 'invalid item' label."* Add them the day real prices or real reviews exist. **Empty beats invented.**

### Prompt check — baseline BEFORE any of the above, then monthly

Log to `reports/`. Run each verbatim in ChatGPT, Perplexity, and Google AI Overviews.

| Prompt | ChatGPT | Perplexity | AI Overview | Who won instead |
|---|---|---|---|---|
| ETP plant supplier near Kandla port | | | | |
| RO plant supplier in Gandhidham | | | | |
| STP plant manufacturer in Kutch | | | | |
| Water treatment AMC Gandhidham | | | | |
| DM plant supplier Gujarat | | | | |
| Effluent treatment plant for an edible oil factory in Gujarat | | | | |

**Expect a wall of ✗.** That is the point — it's the baseline that makes the first ✓ provable. That first ✓ is the most persuasive artifact in the entire engagement.

- [ ] Baseline logged · date:

---

## §6 · Review engine · **P2 · ongoing**

Reviews are the **#2 local ranking factor.** Kesri has zero.

- [ ] Grab the short GBP review link (`g.page/r/...`) → QR code → invoice, visiting card, email signature
- [ ] **Ask at the moment of delivered value** — plant commissioned, AMC renewed, service call closed. Not randomly.
- [ ] **Respond to every review**, good and bad
- [ ] **Never buy reviews.** One purge zeroes the profile.

**The WhatsApp ask — paste-ready, for the client's team to send:**

> Namaste [Name], thank you for trusting Kesri Enterprise with your [RO plant / ETP / AMC].
>
> If you're happy with the work, would you leave us a quick review on Google? It genuinely helps other plants in the region find us.
>
> [review link]
>
> Takes 30 seconds. Thank you.
> — Ashtdhuja, Kesri Enterprise

**B2B reality check:** procurement managers rarely leave Google reviews. **Target 10-20 quality reviews over a year**, not 50. Lean harder on the client logos (Patanjali, Bunge, Emami Agrotech, COFCO, IPCA, Radisson — *pending written permission to name them*) and the credentials tier. **Do not promise a restaurant's review velocity to an industrial supplier** — an unmet promise here poisons the retainer conversation.

---

## §7 · Service × location pages — **SKIP.** Substance test failed.

Would be: *"ETP Plant in Mundra"*, *"RO Plant Supplier in Bhuj"*, *"STP for Industries in Anjar"*.

**The test — 3+ sentences that are TRUE and UNIQUE to that place:**

- ❌ A real project or installation there? — **Unknown.** The questionnaire is unanswered.
- ❌ A real logistics/regulatory/industry fact about that place? — **Not confirmed.**
- ❌ A local office, team, or response-time commitment there? — **No.** Bases are Gandhidham + Mundra only.

**All no → do not build them.** The repo's BUILD-PLAN already made this call correctly — one `areaServed` array instead of per-city doorway pages. It was right.

A thin doorway page is a Google penalty target **and** it is structurally an invitation to invent facts about a client whose facts you don't have. That is how the never-invent-a-fact rule dies.

The local signal is carried instead by: `areaServed` schema + the GBP service area + the directory citations. **For a single-location B2B firm, that is what actually ranks anyway.**

**Revisit when:** the questionnaire returns real project locations. *"We commissioned a 20 KLD ETP at a plant in Mundra in 2024"* is a true, unique sentence — and a page built on three of those is genuinely strong. **The substance is the page.**

---

## Account ownership ledger

**Every account in the CLIENT's name.** Tarun manages; he never owns. Phase 4 verifies this.

| Platform | Owner | Login | Created |
|---|---|---|---|
| Domain (BigRock) | ? — **verify in Phase 4** | | |
| Cloudflare (hosting) | Tarun (shared account) | | **Disclose to client** |
| Google Business Profile | **CLIENT** | | |
| Google Search Console | **CLIENT** | | |
| IndiaMART / TradeIndia / etc. | **CLIENT** | | |
| info@kesrienterprise.com | **CLIENT** | | via CF Email Routing |
