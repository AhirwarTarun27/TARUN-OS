# Kesri Enterprise — Engagement

> Client #1. The template client — the whole point is that doing this one properly makes #2 fast and profitable.
> `/client-pipeline kesri` reads this file first. Update it **before** advancing a phase, never after.

**Status:** Phase 3 — Findable *(site is live; findability barely started)*
**▶ NEXT ACTION:** Cloudflare dashboard → `kesrienterprise.com` → turn OFF the managed robots.txt. **5 min.** It currently blocks ClaudeBot entirely and opts the site out of Gemini grounding + AI training corpora. See `findability.md` §0.
**Blocked on:** the client questionnaire — **drafted but never sent.** It is the longest lead time in the whole project and it blocks the trust bar, certifications, geo coordinates, and the WhatsApp button.

*Spelling: **Kesri**, not Kesari. The repo, the domain, and the brochure all agree. Only the local folder name (`MyProjects\KesariEnterprise`) is wrong — and NAP consistency starts with the name.*

---

## The outcome (one sentence)

> *"Show up on Google across Kutch and Gujarat, and look credible to a procurement manager who has never heard of us."*

Not traffic. **Credibility + regional findability.** They served Patanjali, Bunge, Emami Agrotech, COFCO, IPCA and Radisson with nothing but a 4-page PDF brochure. A move that adds visitors but not credibility is the wrong move for this client.

## The business

- **What they sell:** B2B water-treatment infrastructure across three divisions — (1) pure water: domestic/institutional filtration, industrial RO, softening + DM plants; (2) wastewater: STP (MBBR/SBR), ETP; (3) specialty chemicals + O&M/AMC.
- **How they make money:** plant supply + installation, with **AMC/O&M as the recurring layer.** The AMC is the sticky revenue — that's the service worth ranking hardest for.
- **The customer:** **procurement managers at industrial plants** — pharma, edible oils/agri, food & beverage, hospitality, chemicals/manufacturing. In the **Kandla–Mundra port belt.**
  → **B2B tier. Not the local-consumer tier.** No JustDial, no Sulekha. IndiaMART and TradeIndia are where this buyer actually searches.
- **How customers find them today:** word of mouth and a PDF brochure. That's it. Zero digital presence before this engagement.
- **What a win looks like in 6 months:** inbound enquiries from plants that have never met them — specifically from outside their existing referral network.
- **Geography:** based in **Gandhidham + Mundra**, Kachchh, Gujarat. `areaServed`: Gandhidham, Kandla, Mundra, Anjar, Bhuj, Kutch. *(Service radius beyond Kutch is questionnaire item 10 — unanswered.)*
- **Proprietor:** Ashtdhuja Diwedi

## Commercials

| | |
|---|---|
| **One-time** | **₹10,000** |
| **Retainer** | **₹3,000/year** |
| **Advance** | Waived — conscious exception (see below) |
| **Running costs** | Domain ~₹900/yr passed through |

> **⚠️ This is NOT the rate card.** ₹10K + ₹3K/yr is a deliberate below-market relative/case-study price, chosen once, with eyes open. **Never anchor a new quote to it.** Market for a build of this quality is **₹25-50K one-time + a real retainer** (Care ₹1.5-4K/mo, Growth ₹5-15K/mo). Client #2 pays market. See the pricing table in `references/client-delivery-playbook.md`.

## Scope

**Included:** 11 routes — home, 4 services, 6 products, 5 industries, about, contact, thank-you, privacy, terms. Contact form with spam protection. Full SEO scaffolding. Custom design system.

**NOT included:** content writing beyond the brochure, photography, logo redesign, product data entry, social media.

**Timeline:** *waiting on client* — the questionnaire. Everything in the trust layer is blocked on it.

## The build

- **Repo:** `C:\Users\ahirwar.tarun\Documents\Learning\MyProjects\KesariEnterprise`
- **Live URL:** **https://kesrienterprise.com** ✅
- **Tier:** static + one serverless function — *the site is a brochure; the one function is the contact form. Correct call. No backend needed.*
- **Stack:** Astro 7 (`output: 'static'`) + Cloudflare Workers with Static Assets (`@astrojs/cloudflare` — **not Pages**; `wrangler deploy`), Tailwind v4, `@astrojs/sitemap`. **Zero client JS.** Turnstile + Zod + Resend on the form. 24 tests green.
- **This is the house template.** Client #2 starts from this repo.

### Ecosystem layers — status

| Layer | State |
|---|---|
| AI-search schema | **Partial.** `LocalBusiness` + `Product` JSON-LD ship. **No `sameAs`, no `geo`, no `priceRange`, no `FAQPage`, no `BreadcrumbList`.** |
| Lead capture → WhatsApp | **Not built.** Form → email via Resend only. `company.whatsapp` is deliberately `null` — publishing the proprietor's personal mobile is his call (questionnaire item 9). |
| Review link | **Not built** — needs GBP first. |
| Analytics + conversion event | **Not built.** Zero analytics, zero cookies. ⚠️ **`/privacy` explicitly states the site runs no analytics — adding GA4 means editing that page in the same commit.** |

## Questionnaire

**Sent:** ❌ **NOT SENT** — drafted at `<repo>/CLIENT-QUESTIONNAIRE.md`, 12 items, copy-paste ready.
**Answered:** no

Its own STATUS.md calls it *"the longest lead time in the project."* **This is the single highest-leverage thing Tarun can do that isn't a dashboard click** — it has been sitting drafted for months while the site is live and half-empty.

**Still blocking:**
- [ ] Legal name + GSTIN → credibility block on `/about`
- [ ] Certifications (**"none" is a complete answer**) → the trust bar, which currently renders nothing
- [ ] Capacities, project count, founding year → `trust.ts` is **entirely null** by design
- [ ] **Exact premises coordinates** → `LocalBusiness.geo` (geocoding the street line lands at the wrong end of Bharat Nagar)
- [ ] Service radius: Kutch only / Gujarat / pan-India → `areaServed`
- [ ] **Permission to publish a WhatsApp number**, and which one → the lead-capture layer
- [ ] Which of the 20 named clients can be cited, and can their logos be used
- [ ] Real photos of real installations

**The hard rule:** never invent any of it. `trust.ts` ships with every field `null` and components render nothing rather than fake a number. A procurement manager who catches one invented ISO number is gone for good — and tells the two other plants he knows. In a district this size, that is the whole market.

## Phase board

- [x] **1 · Sell & Scope** — done (informally, as a relative). Priced ₹10K + ₹3K/yr. **Advance waived — conscious exception.** ⚠️ *The questionnaire should have gone out here. It didn't. That is exactly why `/client-scope` now makes it a Phase-1 gate.*
- [x] **2 · Build** — done. Live at kesrienterprise.com. Phases 1-6 + 8 of the repo's own build plan complete.
- [~] **3 · Findable** — **in progress, barely started.** Board: `findability.md`. ← **the entire remaining engagement**
- [ ] **4 · Handover** — pending. Ledger: `handover.md`
- [ ] **5 · Retainer** — pending. `retainer.md`

## Open items in the repo (not blocking Phase 3)

- Phase 7 (verification) never started; Phase 9 (post-launch) is where GBP/GSC/analytics live — **that is this phase, tracked here now.**
- One live-domain form submission still unverified end to end.
- Workers Builds GitHub trigger has **never been observed firing.** Related to the P0 below.
- `/privacy` and `/terms` want a lawyer's pass.

## Decisions

- **2026-07-11** — GO on the web-solutions business. Kesri = client #1 and the reusable template. Full strategy in `decisions/log.md`.
- **2026-07-12** — Go-live standardized: each client gets their own Resend account (free tier is per-account); the Cloudflare account stays single and shared. **Turnstile caps at ~20 widgets/account → revisit at ~20 clients.**
- **2026-07-13** — **No service × location pages.** Fails the substance test: the questionnaire is unanswered, `trust.ts` is null, and there is not one confirmed fact that distinguishes Bhuj from Mundra. The repo's BUILD-PLAN was right to choose one `areaServed` array over per-city doorway pages. `areaServed` + GBP + directory citations carry the local signal instead. **Revisit when real project locations come back.**
