# Client Delivery Playbook — Web Solutions

The repeatable motion for every website client. Run it in order, every time. The website is the *deliverable*; this playbook is the *service*. Client #1 (Kesari Enterprise) is the template — no step gets skipped because they're a relative.

**The one rule above all:** the client's **business outcome** is the product, not the website. Before anything, answer: *how does this business make money, and how does a site help that?* A restaurant wants foot traffic. Kesari wants credibility + regional findability. An e-commerce shop wants online sales. The whole engagement bends to that answer.

---

## Phase 1 — Sell & Scope (before you write a line of code)

The phase that separates a business from a favour. Most projects die here, or get their margin destroyed here.

- [ ] **Discovery call.** How do they make money? Who's the customer? What does a "win" look like? What do they already have (logo, photos, content, domain, socials)?
- [ ] **Define the outcome in one sentence.** e.g. *"Show up on Google across Kutch/Gujarat and look credible to procurement managers."* This is what you're actually selling.
- [ ] **Fixed scope, in writing.** Page count, features, revision rounds (cap at 2), and an explicit **"NOT included"** list. Scope creep lives in the gaps you leave undefined.
- [ ] **Price it** (see the pricing block below). Always quote **one-time + retainer together.**
- [ ] **Take a 30-50% advance before starting.** Even for a relative — Kesari can be an exception you *consciously choose*, not a default. No advance = no start.
- [ ] **Timeline with a "waiting on you" clause.** The client's content is the usual bottleneck; make that their responsibility on paper.
- [ ] **One-page written agreement.** Scope + price + advance + timeline over email/WhatsApp is enough to start. It protects the relationship, not just you.

## Phase 2 — Build

You've got this. Three business-brain reminders:

- [ ] **Pick the lowest deployment tier that solves it:** static → static + one serverless function → full backend. Don't sell a backend they don't need.
- [ ] **Never invent a fact.** Certifications, numbers, client names stay empty until the client confirms them. One caught lie loses a B2B client for good.
- [ ] **Reuse the architecture.** Kesari's Astro + Cloudflare Worker stack is the starting template for the next client. That's the whole point of doing #1 properly.
- [ ] **Thin slices, verify as you go.** Build → check the build → move on.

## Phase 3 — Findable (the layer clients pay for and can't do themselves)

A beautiful site nobody finds is a failure. This is where you earn the retainer.

- [ ] **Domain in the CLIENT's name/account** (you manage it). ~₹900/yr, passed through, not eaten.
- [ ] **Deploy** to Cloudflare, attach domain, DNS, SSL. Verify it loads fast on mobile.
- [ ] **Google Business Profile** — claim/create, correct category, service area, real photos, all phone numbers. Ask the client to gather 5-10 reviews. Reviews are the #1 local lever.
- [ ] **Google Search Console + sitemap** — verify, submit sitemap, request indexing on the money pages.
- [ ] **Bing Webmaster** — 5 minutes, a second search engine for free.
- [ ] **Service × location pages** — one page per service+area (matches real searches, ranks with no blog). Kesari: *"RO Plant Supplier in Kutch," "ETP Plant in Gandhidham," "STP for Industries in Mundra."*
- [ ] **On-page basics** — unique title + description per page, `LocalBusiness` JSON-LD, NAP identical everywhere (one source file).
- [ ] **India B2B directories (B2B/industrial clients only)** — IndiaMART, TradeIndia, JustDial. Where procurement actually searches, plus free citations that lift Google ranking. Skip for pure consumer-local clients.
- [ ] **Business email** (Google Workspace / Zoho) if they want name@theirdomain.

## Phase 4 — Handover

- [ ] **Every account in the client's name** — domain, hosting, GBP, email. You're the manager, not the owner. Never hold their domain hostage.
- [ ] **One-page "how your site works"** — what it does, how to reach you for changes, what you handle vs what they do.
- [ ] **Show the win** — walk them through Search Console / GBP so they *feel* the value. This is what triggers referrals.
- [ ] **Collect final payment + a testimonial + written permission** to use them in your portfolio.
- [ ] **Ask for referrals directly:** "Who else do you know who needs this?"

## Phase 5 — Retainer (the actual business)

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

**Kesari is priced ₹10K + ₹3K/yr on purpose** — relative + first case study. That is NOT your rate card. Client #2 pays market.

---

## What actually bites you (rarely the code)

- **No advance / no written scope** → endless free changes, maybe no payment. Fix in Phase 1.
- **The client is the bottleneck,** not you — content, logo permission, sign-off. Put "waiting on client" in the timeline.
- **Undercharging the retainer** → unpaid lifetime support. Price recurring from day one.
- **Accounts in your name** → you become their hostage-taker, or their unpaid IT forever. Everything in the client's name.
- **Eating running costs** → domain/email/APIs quietly kill your margin. Pass them through.
- **Selling a backend they don't need** → 10x the ops, cost, and liability for nothing. Default to static.

---

*First client: Kesari Enterprise (2026). Strategy + the why: see the `decisions/log.md` entry "Start a local web-solutions business."*
