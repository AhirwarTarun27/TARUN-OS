# Client Platforms — where a client gets found

The reusable answer to *"where do we list this client?"* Written once, read by `/client-findable` for every client, forever. Nothing here costs money.

**Read this with `references/ai-search-visibility.md`.** That file covers the AI-answer layer (ChatGPT, Perplexity, AI Overviews). This file covers the classic layer (Google, Bing, directories). A client needs both — winning one does not win the other.

---

## The rule that comes before any platform: NAP discipline

**NAP** = Name, Address, Phone. It is the entity key that ties every listing back to one business.

One canonical block. **Byte-identical everywhere.** Not "basically the same" — identical. `Plot no-1002` and `Plot No. 1002` are two different businesses to a crawler, and a fractured entity is the single most common reason a legitimate local business fails to rank.

Rules:
1. **The client's website is the source of truth.** Generate the NAP block from the site's one data file (Kesri: `src/data/company.ts`), never retype it.
2. **Paste, never type.** Every directory field gets a copy-paste from the canonical block.
3. **One primary phone.** List others as secondary, but the primary must be the same number on every platform.
4. **Get the legal name right.** Kesri Enterprise is spelled *Kesri*, not *Kesari*. A misspelling on one platform creates a duplicate entity.
5. **Log every listing** in the client's `findability.md` with the URL and the login used. An unfindable listing you created is worse than no listing — you can't fix it and you can't kill it.

Before creating a single listing, write the canonical block into `clients/<slug>/findability.md` under `## Canonical NAP`. Everything downstream copies from there.

---

## Tier 1 — Universal (every client, no exceptions)

| Platform | Free? | Needs | Impact | URL |
|---|---|---|---|---|
| **Google Business Profile** | Yes | Postcard **or** phone/video verify | **The single biggest lever.** GBP signals are ~32% of local ranking weight (Whitespark 2026 Local Search Ranking Factors) — second only to proximity. Complete profiles get ~7× the clicks of incomplete ones. It frequently outranks the client's own website. | business.google.com |
| **Google Search Console** | Yes | DNS or HTML-file verify | Not a listing — the instrument. Submit the sitemap, request indexing on money pages, and it becomes the data source for the monthly retainer report. **No GSC = no report = no retainer renewal.** | search.google.com/search-console |
| **Bing Places** | Yes | Phone/email verify; can import from GBP | Small direct traffic, but Bing feeds **Copilot and DuckDuckGo**, and the import takes ~5 minutes once GBP exists. Free citation, near-zero cost. | bingplaces.com |
| **Bing Webmaster Tools** | Yes | Import from GSC in one click | Second search engine, five minutes, and it's the only free source of Bing/Copilot query data. | bing.com/webmasters |
| **Apple Business** | Yes | Business verification | Powers Apple Maps, Siri, and Spotlight. Rebranded from Apple Business Connect in April 2026, available in 200+ countries including India. Nobody local does this — iPhone-carrying procurement managers exist. | business.apple.com |

**Order matters.** GBP first (everything else can import from it), then GSC, then the rest.

### Google Business Profile — the fields that actually move ranking

Do not treat this as a form to fill. In order of impact:

1. **Primary category.** The highest-leverage single field on the whole profile. Pick the most specific category that is *true*. One wrong category caps the profile's ceiling permanently.
2. **Reviews.** The #2 local ranking factor after GBP completeness. See the review engine below.
3. **Service area** (for businesses that travel to the customer) — set the real districts, not an aspirational radius.
4. **Services list** — every service as its own entry, named the way customers search for it.
5. **Real photos.** Not stock. Site photos, plant photos, team photos.
6. **Business description** — 750 chars, front-load the primary service + the primary geography.
7. **Hours, phone, website URL** — from the canonical NAP block.
8. **Posts** — weekly-ish. Cheap, and they're a freshness signal. This is Growth-retainer work.

**A service-area business can hide its street address** while still ranking for the area. If the client works out of a home or a plot without a customer-facing office, hide it. Don't invent a showroom.

---

## Tier 2 — India B2B / industrial (the procurement tier)

For clients whose customer is a **purchase/procurement manager at another company** — manufacturers, suppliers, exporters, industrial services. This is Kesri's tier.

These are not just SEO citations. **They are where B2B buyers actually search.** A procurement manager sourcing an ETP plant opens IndiaMART before they open Google.

| Platform | Free? | Needs | Notes |
|---|---|---|---|
| **IndiaMART** | Free listing; paid tiers upsold hard | Mobile OTP | The largest. Non-negotiable for any manufacturer/supplier. Expect sales calls after signup — that is the price of the free tier. |
| **TradeIndia** | Free listing | Mobile OTP | Strong for exporters and anyone wanting buyers beyond the home state. |
| **ExportersIndia** | Free listing | Mobile OTP | Founded 1997. Worth it if the client has any export ambition. |
| **IndianYellowPages** | Free listing | Email/phone | Pure citation value. Low effort, low return, but it's free NAP. |
| **Kompass India** | Free basic | Email | B2B/industrial skew. Lower volume, decent domain authority for citations. |

**Sequencing:** IndiaMART and TradeIndia first — they carry the real buyer intent. The rest are citation filler; batch them into one sitting.

**The catalog is the work, not the signup.** A listing with the company name and nothing else is dead weight. Each product/service gets its own catalog entry with a real description and a real photo. This is where the AIOS earns its keep — the copy is pre-written in `findability.md`, Tarun pastes it.

---

## Tier 3 — India local-consumer

For clients whose customer is **a person choosing a local business** — restaurants, clinics, salons, home services, retail, tuition.

| Platform | Free? | Needs | Notes |
|---|---|---|---|
| **JustDial** | Free listing | Mobile OTP | India's local search default. Heavy sales pressure post-signup. |
| **Sulekha** | Free listing | Mobile OTP | Strong in home services, education, real estate. |
| **Yellow Pages India** | Free | Email | Citation value; traditional sectors. |

**Skip Tier 3 entirely for a pure B2B client**, and skip Tier 2 entirely for a pure consumer-local client. Listing a water-treatment plant supplier on JustDial is noise; listing a salon on IndiaMART is noise. Mixed businesses (a firm that sells B2B *and* to walk-in consumers) take both.

---

## Tier 4 — Vertical (never assumed, always researched)

Every industry has platforms that outperform every generic directory for that industry, and they change. **Do not guess this tier from memory.**

`/client-findable` delegates it to the **`listing-researcher`** subagent, which live-verifies what actually matters for that client's vertical + geography + customer type, and returns a ranked list with a skip list and reasons.

Illustrative only — confirm before use: healthcare → Practo; real estate → Housing/99acres/MagicBricks; home services → Urban Company; IT/agencies → Clutch; restaurants → Zomato/Swiggy; hotels → Booking/MMT.

---

## Tier 5 — Trust and credentials (B2B, quietly powerful)

Not directories, but they carry entity weight and procurement managers check them.

- **Udyam / MSME registration** — free, government. Confers legitimacy and unlocks tenders. If the client is registered, put the number on the site.
- **GSTIN on the website** — standard credibility signal for Indian B2B. Ask for it; **never invent it.**
- **LinkedIn Company Page** — free, high-authority `sameAs` target, and it's an entity signal for AI search. Note: this is the *client's* LinkedIn, which is fine. Tarun's own LinkedIn boundary (professional/job-growth only) is untouched by this.
- **Industry associations / chambers of commerce** — Kutch and Gandhidham have local trade bodies. A member listing is a high-relevance local citation.

---

## The review engine (the #1 lever, and nobody runs it systematically)

Reviews are the second-strongest local ranking factor and the strongest conversion factor. Businesses with 50+ reviews and a 4.5+ average consistently outrank competitors that beat them on every other signal. Almost no small business asks for reviews on purpose.

**The system** — this is retainer work, and it's what a client can feel:

1. **Get the short review link.** GBP gives a `g.page/r/...` link. Shorten it, put it everywhere.
2. **Make it one tap.** QR code on the invoice, on the visiting card, in the email signature.
3. **Ask at the moment of delivered value** — job completed, plant commissioned, AMC renewed. Not randomly.
4. **Pre-write the ask.** A WhatsApp message the client's team sends without thinking about it. Kept in `findability.md`.
5. **Never buy or fake reviews.** Google detects and penalizes. One purge can zero the profile.
6. **Respond to every review**, good and bad. Response rate is itself a signal, and a calm reply to a bad review sells better than a wall of five stars.
7. **Cadence, not a campaign.** 2-4 real reviews a month beats 20 in one week (which looks bought).

**B2B reality check:** procurement managers rarely leave Google reviews. For a B2B client, target a realistic 10-20 quality reviews over a year, and lean harder on client logos, case studies, and the credentials tier. Don't promise a restaurant's review velocity to an industrial supplier.

---

## Lead capture → WhatsApp (turn the site into a visible machine)

A contact form that quietly emails an inbox nobody checks is invisible. The client cannot feel it working, so they will not renew.

**The layer:** form submission → instant WhatsApp (or SMS) alert to the client's phone, plus email, plus a lead log.

Why it matters more than it looks:
- **Speed to lead decides who wins.** The supplier who replies in 5 minutes beats the one who replies tomorrow, and in B2B the enquiry usually went to three suppliers at once.
- **It makes the value visible.** Every ping is proof the retainer is working. This is the single best renewal argument you will ever have.
- **It costs nothing** on the free tiers already in use.

Implementation notes (specified in `/client-build`, built at build time, never bolted on):
- The existing Kesri stack already has the hard part — a working `POST /api/contact` on a Cloudflare Worker with Turnstile + Zod + Resend. The WhatsApp alert is one more call in that handler.
- A **click-to-WhatsApp button** (`wa.me/<e164>`) is the cheaper half and often converts better than the form. **It requires the client's explicit permission** to publish that number — publishing a proprietor's personal mobile as a business channel is their call, not ours. (Kesri: `company.whatsapp` is deliberately `null` pending questionnaire item 9.)
- Log every lead. The lead count is a line in the monthly report.

---

## What this costs

Everything above is free. If a platform starts asking for money, it goes on the client's own decision list — it does not get quietly expensed, and it does not get eaten out of Tarun's margin.

**Expect sales pressure.** IndiaMART and JustDial will call, repeatedly, after a free signup. Warn the client before creating the listing so the calls don't come as a surprise from something you set up.

---

## Account ownership — the rule that protects the relationship

**Every account is created in the client's name, with the client's email, and the client owns it.** Tarun is the manager, never the owner.

- GBP, domain, GSC, and email **must** be the client's. No exceptions.
- If a directory only allows one login, it is created with the client's email and the credentials are handed over in Phase 4.
- Never hold a domain or a profile hostage. It converts one unhappy client into a reputation problem in a town where everyone knows everyone.

Record who owns what, per listing, in `findability.md`. Phase 4 (`/client-handover`) verifies it.

---

*Refresh this file when a platform materially changes (new tier, new verification, dead directory). Ranking-factor percentages age fast — re-verify yearly. Last verified: 2026-07-13.*
