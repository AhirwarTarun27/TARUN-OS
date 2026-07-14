---
name: client-build
description: Phase 2 of the client pipeline — build the client's site on the lowest deployment tier that solves their problem, reusing the house Astro + Cloudflare Workers template, and bake the four ecosystem layers (AI-search schema, lead capture to WhatsApp, review link, analytics) in at build time rather than bolting them on later. Enforces the never-invent-a-fact rule. Chains to /cloudflare-go-live for deploy. Trigger on "/client-build", "build the client site", "start the client build", "what stack for this client", "deploy the client site". One run = one build brief the client repo is held to, or one build slice shipped.
---

# Client Build — Phase 2: Build

Tarun can already build. This skill exists for the three business decisions *around* the build that a developer's instincts get wrong, and for the one structural rule that decides whether Phase 3 is cheap or expensive.

**The structural rule: the ecosystem gets designed in, not added on.** A site that reaches Phase 3 without schema, without lead alerts, and without an analytics event is a site that needs a second build. This is the same lesson as `adsense-build-time-gate` — JsonBeam was rejected because approval was treated as a launch-day task instead of a design constraint. Findability is exactly the same shape of mistake, waiting to happen.

## Preconditions
- Phase 1 is done. `clients/<slug>/engagement.md` exists with an outcome sentence, a scope, and **the customer type**.
- The advance is paid (or the exception is consciously logged).
- The questionnaire has been **sent**. Not answered — sent. If it hasn't, stop and send it; it gates fields you're about to build around.

## Step 1 — Pick the lowest tier that solves the problem

```
static  →  static + one serverless function  →  full backend
```

**Default to static. Climb one rung only when the business genuinely needs it.**

| Tier | When | Cost / ops |
|---|---|---|
| **Static** | Brochure, credibility, services, contact-by-phone | Free. Nothing to break. |
| **Static + one function** | A contact form, a quote request — anything that posts once | Free tier. One endpoint to maintain. **This is where most clients land.** |
| **Full backend** | Live data the business runs on: bookings, inventory, logins, payments | 10× the ops, cost, and liability. Real money, real 2am problems. |

**Selling a backend a client doesn't need is the most expensive mistake in this playbook.** It multiplies ops, cost, and liability for nothing, and Tarun is the one carrying the pager. A restaurant does not need a database to show a menu.

State the tier in `engagement.md` with one line of why.

## Step 2 — Reuse the template

The house stack, proven on Kesri:

- **Astro** (`output: 'static'`), TypeScript strict
- **Cloudflare Workers with Static Assets** via `@astrojs/cloudflare` — *not* Pages; deploy with `wrangler deploy`
- **Tailwind** via the Vite plugin
- **`@astrojs/sitemap`**
- **Zero client JS** by default — it's how the site loads instantly on a bad phone on a Gujarat 4G connection, which is the only network that matters
- Self-hosted fonts at build time. No Google Fonts on the critical path.
- Contact form: **honeypot → Turnstile → Zod validate → Resend → thank-you page**. All of it free tier.

Reference implementation: `C:\Users\ahirwar.tarun\Documents\Learning\MyProjects\KesariEnterprise`. **The point of doing client #1 properly was to make client #2 fast.** Copy the pattern; don't redesign it.

Two things that must be per-client, not copied:
- **Each client gets their own Resend account** (the free tier is per-account).
- The **Cloudflare account stays single and shared** — unlimited zones and static assets are free. But **Turnstile caps at ~20 widgets per account**, so at ~20 clients this needs revisiting. Logged in `decisions/log.md` 2026-07-12.

## Step 3 — One data file is the source of truth for NAP

Name, address, phone live in exactly **one** file (Kesri: `src/data/company.ts`). The footer, the contact page, and the JSON-LD all read from it.

**Three copies of an address will drift**, and a drifted NAP fractures the business entity across the web — which quietly caps local ranking and makes the client invisible to AI search, which cross-confirms facts across sources before it will state one. This is not tidiness. It is the foundation of Phase 3.

## Step 4 — Bake in the four ecosystem layers NOW

This is the part that makes this skill worth having. Each of these is cheap at build time and expensive later.

### 4a. AI-search readiness (see `references/ai-search-visibility.md`)

- **`LocalBusiness` schema** — complete: `name`, `address`, `telephone`, `url`, `areaServed`, `geo`, `openingHours`, `priceRange`.
- **`sameAs` array** — links every profile the client has (GBP, LinkedIn, IndiaMART, TradeIndia). Ship it as an empty array wired to the data file, so Phase 3 just fills it in. **This is the most under-used field in local schema** and it's the one that tells a model "all of these are the same business as me."
- **`Service` / `Product` schema** per real offering. **`BreadcrumbList`** site-wide.
- **Question-headed H2s** — the highest-citation content format in AI search. The answer goes in the first 40-60 words, right under the heading. Source the questions from the client's real enquiries.
- **`/llms.txt`** — cheap, maintained in one file.
- **Verify the AI crawlers can actually read the site** before calling this done. See the technical gate in the reference — a zone-level managed robots.txt can silently block every one of them, and no amount of schema survives that.

### 4b. Lead capture → the client's phone

A form that emails an inbox nobody opens is invisible, and an invisible service does not get renewed.

- Form submission → **instant WhatsApp or SMS alert** to the client, plus email, plus a lead log.
- **Speed to lead decides who wins.** In B2B the same enquiry went to three suppliers at once; the one who replies in five minutes takes the job.
- A **click-to-WhatsApp button** (`wa.me/<e164>`) is the cheaper half and often converts better than the form itself.
- **Publishing a WhatsApp number needs the client's explicit permission.** It is usually the proprietor's personal mobile, and that is their call, not ours. Wire the field, leave it `null`, ship the button the day they say yes. (Kesri: `company.whatsapp` is deliberately `null` pending questionnaire item 9.)

### 4c. The review path

Reviews are the #1 local ranking lever and almost nobody asks for them on purpose. Ship the plumbing now: a review-link slot in the data file, ready for the `g.page/r/...` link that Phase 3's GBP setup produces.

### 4d. Analytics with a conversion event

Not vanity pageviews. **The conversion event** — a form submission landing on `/thank-you`. That number is the first line of the monthly retainer report, and without it Phase 5 has nothing to show.

**Adding analytics changes the privacy policy.** If the site's privacy page currently says "we set no cookies and run no analytics" — as Kesri's honestly does — then wiring GA4 means editing that page in the same commit. Shipping analytics while the privacy policy denies them is a lie on a legal page.

## Step 5 — Never invent a fact

The hard rule, and it outranks every SEO consideration in this pipeline.

**Certifications, capacities, founding years, project counts, client names, ratings, prices — every one of them stays empty until the client confirms it in writing.**

- Build components that **render nothing** when a field is null. Not a placeholder. Not "Est. 2010". Nothing.
- Do not add `aggregateRating` or `offers` to schema to make Google's Rich Results Test stop showing a warning. **A fake rating is a manual-action risk and a hallucinated price is a lie a model will repeat to a customer.** Leave it invalid; fill it when the facts arrive.
- **One caught invention loses a B2B client permanently.** A procurement manager who finds a fake ISO number does not ask for an explanation — they just never call again, and they tell the two other plants they know. In a district this size, that is the whole market.

Empty beats invented. Every time.

## Step 6 — Build in thin slices, verify as you go

Build → check the build actually works → move on. Not build-everything-then-debug.

Use Playwright to *see* the page render. The client's site will be opened on a mid-range Android phone on a patchy connection, not on Tarun's monitor.

## Step 7 — Deploy → chain to `/cloudflare-go-live`

When the build is ready for a real domain, run **`/cloudflare-go-live`**. It handles the zone, the nameserver repoint (BigRock is external — that step is manual), the Worker custom domain, the www redirect, Turnstile, Email Routing for `info@`, and Resend as the free sender. It is a dry run by default and idempotent, so a half-finished go-live is safe to re-run.

**The domain is bought in the client's name and paid by the client** (~₹900/yr, passed through). Tarun manages it. He never owns it.

**Before declaring the deploy done, verify over the wire:**
- [ ] The live site loads, fast, on a phone.
- [ ] `curl https://<domain>/robots.txt` — allows Google **and** the AI crawlers. Read what the *server* sends, not what's in the repo.
- [ ] No accidental `noindex` in the live `<head>`.
- [ ] **Every environment variable the build needs is set in the CI/build environment, not just locally.** A missing `PUBLIC_SITE_URL`-style var that falls back to a preview origin will ship a de-indexed site to the live domain the first time CI runs. Kesri has exactly this trap armed right now.
- [ ] A real form submission arrives, end to end, on the live domain.

## Step 8 — Close the phase

Update `engagement.md`: tick Phase 2, record the tier + stack + live URL, set ▶ NEXT ACTION to Phase 3.

Close with: **"Run `/client-findable <slug>` — the site exists; now make it findable. That's the part they're actually paying for."**

## Rules

1. **Lowest tier that solves it.** Static until the business genuinely needs more. A backend nobody needs is 10× the ops, cost, and liability — and Tarun carries the pager.
2. **The ecosystem is baked in, not bolted on.** Schema, lead alerts, review slot, conversion event — all at build time. Retrofitting costs 5× more and usually doesn't happen at all.
3. **One data file owns NAP.** Three copies of an address will drift, and a drifted entity is invisible to AI search.
4. **Never invent a fact.** Empty beats invented. Components render nothing when a field is null. This rule beats every SEO warning Google will show you.
5. **Reuse the template.** Kesri's Astro + Cloudflare Workers stack is the starting point for every client. Doing #1 properly is what makes #2 profitable.
6. **Verify over the wire before calling it live.** Fetch the real robots.txt. Check the real `<head>`. Submit the real form. A repo that *should* produce a good site is not a good site.
7. **Analytics and the privacy policy ship together.** Never leave a legal page claiming something the site no longer does.
