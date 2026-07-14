# Client Delivery Playbook — Web Solutions

The repeatable motion for every website client. Run it in order, every time. The website is the *deliverable*; this playbook is the *service*. Client #1 (Kesri Enterprise) is the template — no step gets skipped because they're a relative.

**The one rule above all:** the client's **business outcome** is the product, not the website. Before anything, answer: *how does this business make money, and how does a site help that?* A restaurant wants foot traffic. Kesri wants credibility + regional findability. An e-commerce shop wants online sales. The whole engagement bends to that answer.

> **This document is the *why*. The skills are the *how*.**
> Each phase below is executed by a skill, so no engagement is ever re-derived by hand:
> **`/client-pipeline`** is the parent — it knows where every client is and names the one next action.
> Under it: `/client-scope` · `/client-build` · `/client-findable` · `/client-handover` · `/client-retainer`.
> Per-client state lives in `clients/<slug>/`. The platform corpus is `references/client-platforms.md`
> and `references/ai-search-visibility.md`.

---

## Phase 1 — Sell & Scope (before you write a line of code) → `/client-scope`

The phase that separates a business from a favour. Most projects die here, or get their margin destroyed here.

- [ ] **Discovery call.** How do they make money? Who's the customer? What does a "win" look like? What do they already have (logo, photos, content, domain, socials)?
- [ ] **Define the outcome in one sentence.** e.g. *"Show up on Google across Kutch/Gujarat and look credible to procurement managers."* This is what you're actually selling.
- [ ] **Fixed scope, in writing.** Page count, features, revision rounds (cap at 2), and an explicit **"NOT included"** list. Scope creep lives in the gaps you leave undefined.
- [ ] **Price it** (see the pricing block below). Always quote **one-time + retainer together.**
- [ ] **Take a 30-50% advance before starting.** Even for a relative — Kesari can be an exception you *consciously choose*, not a default. No advance = no start.
- [ ] **Timeline with a "waiting on you" clause.** The client's content is the usual bottleneck; make that their responsibility on paper.
- [ ] **One-page written agreement.** Scope + price + advance + timeline over email/WhatsApp is enough to start. It protects the relationship, not just you.
- [ ] **Send the client questionnaire — NOW, in Phase 1.** Every fact the site can't render without: legal name, GST, certifications (**"none" is a complete answer**), capacities, real coordinates, service radius, WhatsApp permission, which clients can be named, real photos. **It has the longest lead time in the entire project.** Kesri's was drafted and never sent, and months later — with the site already live — it is still blocking the trust bar, the schema, and the client logos. Every unanswered item is a field that renders as nothing, forever.

## Phase 2 — Build → `/client-build`

You've got this. Three business-brain reminders:

- [ ] **Pick the lowest deployment tier that solves it:** static → static + one serverless function → full backend. Don't sell a backend they don't need.
- [ ] **Never invent a fact.** Certifications, numbers, client names stay empty until the client confirms them. One caught lie loses a B2B client for good.
- [ ] **Reuse the architecture.** Kesri's Astro + Cloudflare Worker stack is the starting template for the next client. That's the whole point of doing #1 properly.
- [ ] **Thin slices, verify as you go.** Build → check the build → move on.
- [ ] **Bake the ecosystem in at build time, never bolt it on:** AI-search schema (incl. an empty `sameAs` array wired to the data file), lead capture → the client's phone, a review-link slot, and analytics with a conversion event. Retrofitting costs 5× more and usually just doesn't happen.

## Phase 3 — Findable (the layer clients pay for and can't do themselves) → `/client-findable`

A beautiful site nobody finds is a failure. This is where you earn the retainer.

- [ ] **Verify over the wire FIRST.** Fetch the live `robots.txt` and the live `<head>`. **The worst problems live in dashboards, not repos** — a Cloudflare zone toggle can block every AI crawler, and an unset CI variable can ship a `noindex` site. Neither appears in any status file. Both are live on Kesri right now.
- [ ] **Domain in the CLIENT's name/account** (you manage it). ~₹900/yr, passed through, not eaten.
- [ ] **Deploy** to Cloudflare, attach domain, DNS, SSL. Verify it loads fast on mobile.
- [ ] **Google Business Profile** — claim/create, correct **primary category** (the highest-leverage field on the whole profile), service area, real photos, all phone numbers. **~32% of local ranking weight.** Reviews are the #2 lever — build the *system*, not a one-off push.
- [ ] **Google Search Console + sitemap** — verify, submit sitemap, request indexing on the money pages. *No GSC = no monthly report = no retainer renewal.*
- [ ] **Bing Webmaster + Bing Places + Apple Business** — minutes each, free, and Apple/Copilot are surfaces nobody local bothers with.
- [ ] **On-page basics** — unique title + description per page, `LocalBusiness` JSON-LD, **NAP byte-identical everywhere** (generated from one source file, never retyped).
- [ ] **The buyer's directories — B2B *or* local-consumer, never both.** B2B/industrial: IndiaMART, TradeIndia, ExportersIndia. Consumer-local: JustDial, Sulekha. *Listing an industrial supplier on JustDial is noise that costs an evening.* **The catalog is the work, not the signup.** Full corpus: `references/client-platforms.md`.
- [ ] **The AI-search layer** — let the AI crawlers in, populate `sameAs` with every profile you just created, write question-headed content, and run the monthly prompt check. **Winning Google does not win AI search**, and nobody in the region is selling this. See `references/ai-search-visibility.md`.
- [ ] **Service × location pages — only if they pass the substance test.** Build `/<service>-in-<place>` **only** when you can write 3+ sentences that are TRUE and UNIQUE to that place (a real project there, a real logistics/regulatory fact, a local team). **All no → don't build it.** A thin doorway page is a Google penalty target *and* structurally an invitation to invent facts. `areaServed` + the GBP service area + directory citations carry the local signal instead — which is what actually ranks a single-location business anyway. *(Kesri today: skip. Its BUILD-PLAN was right to choose one `areaServed` array over per-city pages.)*
- [ ] **Business email** (Cloudflare Email Routing is free) if they want name@theirdomain.

## Phase 4 — Handover → `/client-handover`

- [ ] **Every account in the client's name** — domain, hosting, GBP, email. You're the manager, not the owner. Never hold their domain hostage.
- [ ] **One-page "how your site works"** — what it does, how to reach you for changes, what you handle vs what they do.
- [ ] **Show the win** — walk them through Search Console / GBP so they *feel* the value. This is what triggers referrals.
- [ ] **Collect final payment + a testimonial + written permission** to use them in your portfolio.
- [ ] **Ask for referrals directly:** "Who else do you know who needs this?"

## Phase 5 — Retainer (the actual business) → `/client-retainer`

One-time builds are a treadmill. Recurring income is the business.

- [ ] **Agree the retainer up front** (Phase 1); start it at handover.
- [ ] **Two tiers:**
  - **Care** — hosting, domain renewal, uptime, small edits, backups.
  - **Growth** — Care + actively keeping them ranking: new location pages, GBP posts, review chasing, and a monthly *"here's what people searched to find you"* report.
- [ ] **Send a simple monthly/quarterly report.** The report is what makes them keep paying and keep referring.

---

## Pricing quick-reference (Gujarat Tier-2/3 market, 2026)

Starting numbers, not law. Adjust to the client's size and the value of the outcome.

| Item | Range | Notes |
|---|---|---|
| Simple static brochure site (4-6 pages) | ₹15K-30K one-time | |
| B2B credibility site (custom, SEO, form, schema) | ₹25K-50K one-time | Kesari-class build |
| Full backend (bookings / inventory / login) | ₹50K+ | Only when the business needs live data |
| Care retainer | ₹1.5K-4K/month or ₹10K-25K/yr | Hosting + edits |
| Growth retainer (findability) | ₹5K-15K/month | Where the real money is |

**Kesri is priced ₹10K + ₹3K/yr on purpose** — relative + first case study. That is NOT your rate card. Client #2 pays market. (₹3K/**year** is ₹250/month. It is a gesture, not a retainer — don't let it become the mental anchor for what recurring work is worth.)

---

## What actually bites you (rarely the code)

- **No advance / no written scope** → endless free changes, maybe no payment. Fix in Phase 1.
- **The client is the bottleneck,** not you — content, logo permission, sign-off. Put "waiting on client" in the timeline.
- **Sending the questionnaire late** → the site ships with permanently empty fields. It has the longest lead time in the project. Send it in Phase 1. *(Kesri's is still unsent. The site is live.)*
- **Undercharging the retainer** → unpaid lifetime support. Price recurring from day one.
- **Accounts in your name** → you become their hostage-taker, or their unpaid IT forever. Everything in the client's name. In a district where everyone knows everyone, the referral engine runs in reverse just as fast as it runs forward.
- **Eating running costs** → domain/email/APIs quietly kill your margin. Pass them through.
- **Selling a backend they don't need** → 10x the ops, cost, and liability for nothing. Default to static.
- **Inventing a fact to fill a gap** → one caught invention (a fake ISO number, a made-up capacity) loses a B2B client permanently, and they tell the two other plants they know. **Empty beats invented.** This rule outranks every SEO consideration in the playbook.
- **Trusting a status file over the live site** → both of Kesri's worst problems were dashboard settings, invisible to every file in the repo. **Fetch the real `robots.txt`. Read the real `<head>`.**
- **Building the site and stopping** → Phase 3 is the product. A client who never sees a monthly report forgets why they pay you, and never refers you.

---

*First client: Kesri Enterprise (2026) — spelled **Kesri**, not Kesari. Strategy + the why: `decisions/log.md`, "Start a local web-solutions business" (2026-07-11). Executed by the `/client-*` skills; per-client state in `clients/<slug>/`.*
