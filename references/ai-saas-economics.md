# AI SaaS economics — will this product survive its own inference bill?

> Researched-once-saved-forever. Read this instead of re-searching.
> Refresh on command: "update the ai-saas-economics reference".
> Last researched: 2026-07-28. Model prices move fast. Re-pull the price table quarterly, the rest yearly.

**What this file is for:** deciding, *before you build*, whether a subscription AI product can make
money at a price its buyer will actually pay. It is the subscription-era sibling of
`references/adsense-economics.md`, which covers ad-funded products only.

**Who uses this file:** `/scout-problem` when the product is a paid AI SaaS (substitute this for
the AdSense RPM sub-scores in Gate 3), and `/explore-project` when pricing and caps get designed.

**The one-line version:** in AdSense the trap was *traffic is not revenue*. Here the trap is
**revenue is not margin**. Every user action costs you real money, forever, and a flat price does
not stop a heavy user from costing more than they pay.

**The thing that surprises everyone first:** a Claude Pro or Max subscription does **not** include
API access. Pro covers claude.ai and Claude Code. A deployed product that calls a model needs its
own Console account with prepaid credits, billed per token. Same for every other provider. Budget
for it as a real line item from day one, and set a hard monthly spend cap in the console before
the first user signs up.

---

## 1. The identity — the only formula that matters

```
gross margin  =  (price  −  inference COGS  −  payment fee  −  infra)  ÷  price
```

Per active account, per month. Four terms, and **inference COGS is the only one that scales with
how much the customer uses the product.** That asymmetry is the entire problem: revenue is flat
per account, cost is not.

The benchmark to beat: classic SaaS runs **75-85%** gross margin. AI-native products are averaging
**~52% in 2026** (up from ~41% in 2024 as operators learned to control inference). Multiple public
vertical-SaaS companies disclosed 6-9 points of year-over-year margin compression in Q4 2025 and
named AI features as the cause.

**The kill rule:** if a realistic **heavy** user at the anchor price drops gross margin below
**60%**, the idea is a NO-GO or the pricing model is wrong. Model the heavy user, not the average
one. The average user never kills a business; the P95 user does.

---

## 2. Inference COGS — cost per AI action

### 2a. The price table

Verified 2026-07-28. USD per million tokens.

| Model | Input | Output | Cached input | Notes |
|---|---:|---:|---:|---|
| Claude Opus 5 | 5.00 | 25.00 | ~0.50 | Frontier tier |
| Claude Sonnet 5 | 3.00 | 15.00 | ~0.30 | Intro 2.00 / 10.00 through 2026-08-31 |
| Claude Haiku 4.5 | 1.00 | 5.00 | ~0.10 | 200K context (others 1M) |
| Kimi K2.6 (Moonshot) | 0.95 | 4.00 | 0.16 | ~83% cache discount |
| Kimi K2.5 (Moonshot) | 0.60 | 3.00 | 0.10 | |

Anthropic cache reads bill at roughly **0.1×** base input. Cache **writes** bill at **1.25×**
(5-minute TTL) or **2×** (1-hour TTL). See §3a — that write premium is why caching is not free.

### 2b. Worked example — one document-generation action

A realistic B2B vertical action: a stable instruction block plus schema and few-shot examples,
then the customer's variable input, then a structured document out.

| Component | Tokens | Stable? |
|---|---:|---|
| System prompt + schema + few-shot | 4,000 | Yes, cacheable |
| Customer's variable input | 1,500 | No |
| Generated output | 1,200 | n/a |

Cost per action:

| Model | Uncached | Cached prefix | Cache saving |
|---|---:|---:|---:|
| Claude Opus 5 | $0.0575 | $0.0395 | 31% |
| Claude Sonnet 5 | $0.0345 | $0.0237 | 31% |
| Claude Haiku 4.5 | $0.0115 | $0.0079 | 31% |
| Kimi K2.6 | $0.0100 | $0.0069 | 32% |

**An 8x spread across providers for the identical action.** Model choice is not a taste question,
it is the single largest COGS lever available.

**The non-obvious finding: caching only saves ~31% here, not 90%.** The headline discount applies
to *cached input tokens only*, and in this workload output dominates the bill. Caching pays off in
proportion to how input-heavy the prompt is. A long-context retrieval or code-review action with a
short answer gets the full benefit; a short-prompt long-generation action gets almost none. **Work
out your own input:output ratio before assuming caching rescues the margin.**

---

## 3. The three levers

### 3a. Prompt caching — a P&L line, not an optimisation

Cached input bills at ~0.1× (Anthropic) or ~0.17× (Kimi). Treat it as a first-class design
constraint, not a tuning pass. Full mechanics live in the `claude-api` skill's
`shared/prompt-caching.md`; the economics that matter here:

- **Caching is a prefix match.** One byte changed anywhere in the prefix invalidates everything
  after it. Interpolating a timestamp or a user ID into the system prompt silently destroys the
  entire saving with no error.
- **Minimum cacheable prefix**, and it is **not** monotonic across generations: 512 tokens on
  Opus 5, 1024 on Sonnet 5 and Opus 4.8, 4096 on Opus 4.6 and Haiku 4.5. A 3K prompt caches on
  Opus 5 and silently does not on Haiku 4.5.
- **At low volume, caching can cost more than it saves.** The write premium is 1.25× and the
  default TTL is 5 minutes. If requests arrive less often than every 5 minutes, you pay the write
  premium on nearly every call and read the cache almost never. **Below roughly one request per
  5 minutes, caching is a net loss.** That is exactly where a pre-launch product lives, so do not
  bank the caching saving in the scout-time model. Model uncached, treat caching as upside.
- Verify with `usage.cache_read_input_tokens`. If it is zero across repeated requests, a silent
  invalidator is at work.

### 3b. Model tiering — route by step, not by product

Do not pick one model for the whole product. Split the workflow and price each step:

| Step type | Model tier | Why |
|---|---|---|
| Classification, extraction, routing, tagging | Cheapest tier | Verifiable output, low reasoning demand, usually the highest-volume step |
| Drafting, summarising, transformation | Mid tier | Quality is visible but recoverable |
| The one step where output quality *is* the product | Frontier tier | The only place worth paying 5x |

A product that runs everything on a frontier model is choosing to pay 5-8x for steps that do not
need it. Route deliberately, and let the eval harness (§6) prove the cheap tier is good enough
rather than assuming it.

### 3c. Hard caps — the only thing that stops a negative-margin user

This is the lever that decides whether the business survives. See §4.

---

## 4. Pricing model — why flat unmetered is a NO-GO by construction

Take $29/month, a median user at 200 actions, and a heavy user at 1,000. Payment fee $1.95
(§5), infra $0.50.

**Median user (200 actions):**

| Model | Inference | Gross margin |
|---|---:|---:|
| Opus 5 | $7.90 | 64% |
| Sonnet 5 | $4.74 | 75% |
| Haiku 4.5 | $1.58 | 86% |
| Kimi K2.6 | $1.37 | 87% |

Comfortable. This is the number that makes founders think the model works.

**Heavy user (1,000 actions):**

| Model | Inference | Gross margin |
|---|---:|---:|
| Opus 5 | $39.50 | **−45%** (you lose $12.95/month) |
| Sonnet 5 | $23.70 | **10%** |
| Haiku 4.5 | $7.90 | 64% |
| Kimi K2.6 | $6.86 | 68% |

**The same product, the same price, is either a healthy business or an actively loss-making one
depending entirely on usage distribution.** Flat unmetered pricing means the customers who love
the product most are the ones bankrupting it. That is why flat pricing is a NO-GO here, not a
preference.

### The cap, derived

At $29 with the 60% margin floor, the allowable inference spend per account is
`$29 × 40% − $1.95 − $0.50` = **$9.15/month**. That converts directly into the number you put in
the product:

| Model (cached) | Actions included before margin breaches 60% |
|---|---:|
| Opus 5 | 231 |
| Sonnet 5 | 386 |
| Haiku 4.5 | 1,158 |
| Kimi K2.6 | 1,332 |

Break-even (margin hits zero) sits at 672 / 1,120 / 3,360 / 3,867 actions respectively.

Every number in §2b and §4 is reproducible with `node scripts/ai-margin.mjs`.

**Design rule: the plan's included allowance is the 60% number, and the hard cap is enforced in
code, server-side, before the model call.** A cap that only appears in the pricing page is not a
cap. Overage is metered and sold in credit packs.

---

## 5. Payment fee — and the India constraint

Selling B2B SaaS to US/EU customers from India needs a **merchant of record**, which handles US
sales tax, EU VAT and 30+ other jurisdictions as the seller of record. Direct Stripe leaves that
compliance burden on you.

| Option | Fee | Note |
|---|---|---|
| **Lemon Squeezy** | 5% + $0.50 | MoR. Stripe-owned since 2024, still operates independently. Best fit for indie SaaS. |
| **Paddle** | 5% + $0.50 | MoR. **No India-format FIRA auto-generation** for GST export-of-services compliance. |
| Stripe direct | 2.9% + $0.30 | Cheaper, but you own global tax registration and remittance. |

**Default: Lemon Squeezy**, on the FIRA point. The 5% + $0.50 is the number to use in every margin
calculation. At $29 that is $1.95, or **6.7% of revenue** — larger than the inference bill on a
cheap-tier median user, and routinely left out of founder spreadsheets.

---

## 6. The eval harness is a cost control, not just a quality tool

You cannot route to a cheaper model without evidence it is good enough. A fixed input set with
expected outputs and a scoring script is what converts "Haiku might work here" into a measured
decision. It is also the artefact that makes the cost story defensible in an interview: anyone can
say they used a cheap model, very few can show the eval that justified it.

Build it at M1, on the one action that exists. It does not need to be sophisticated: 20 inputs,
expected outputs, a pass/fail or a similarity score, run from the CLI.

---

## 7. Scout-time checklist

Run this on every AI SaaS candidate before it reaches the shortlist.

- [ ] **What is the unit action?** Name the single thing the user does that costs money.
- [ ] **Token shape.** Estimate stable-prefix / variable-input / output tokens. Compute the
      input:output ratio — it decides whether caching helps at all (§2b).
- [ ] **Cost per action, uncached**, on the cheapest tier that could plausibly do the job.
- [ ] **Usage distribution.** Median actions/month, and a heavy user at ~5x median.
- [ ] **Anchor price** the buyer will actually pay, evidenced by an existing paid tool's price
      page. No paid incumbents usually means no budget, not a green field.
- [ ] **Margin at the heavy user.** Below 60% → NO-GO or re-price. This is the gate.
- [ ] **Cap derivable?** If the product cannot meter the unit action, it cannot cap it, and flat
      pricing is forced. That is a NO-GO.
- [ ] **Jurisdiction.** Which providers see customer data, and where. For US/EU B2B buyers this is
      a procurement question, and it belongs in the data-handling page before launch, not after
      the first deal stalls on it.
- [ ] **Is the model the moat?** If a foundation model already does this natively in its own
      chat app, the product is a wrapper with a countdown timer on it.

### Where to get the inputs

| Input | Source |
|---|---|
| Model prices | Provider pricing pages. The table in §2a, refreshed. |
| Real token counts | `client.messages.count_tokens()` against a representative prompt. Never `tiktoken` — it is OpenAI's tokenizer and undercounts Claude by 15-20%. |
| Anchor price | Competitor pricing pages. Screenshot them; they change. |
| Usage distribution | Guess at scout time, instrument at M1, revise. Flag it as the weakest input in the model. |
| Payment fee | §5. |

---

## Source index

- [The AI COGS Problem: SaaS Gross Margin Compression 2026](https://www.saasmag.com/ai-cogs-saas-gross-margin-compression/) — the 80% → 65% compression example.
- [Your AI Feature Is Quietly Destroying Your Gross Margin](https://www.thesaascfo.com/your-ai-feature-is-quietly-destroying-your-gross-margin/) — inference efficiency ratio.
- [AI inference costs permanently break the gross margin assumption](https://secondorderlabs.com/articles/tech-journalism/ai-inference-costs-permanently-break-the-gross-margin-assumption-that-built-the-saas-valuation-model/) — the ~52% vs 75-85% benchmark, LLMflation, caching as a P&L lever.
- [AI SaaS Pricing: How to Price AI Features Without Killing Your Margins](https://conception-labs.com/blog/ai-saas-pricing-how-to-price-ai-features-without-killing-your-margins) — why flat per-seat pricing cannot absorb variable cost.
- [Vertical AI Micro-SaaS: The Only AI Business Model That Still Works in 2026](https://www.aimagicx.com/blog/vertical-ai-micro-saas-business-model-2026) — thin-wrapper collapse, owned-workflow thesis.
- [Kimi API Pricing (Jun 2026)](https://developer.puter.com/tutorials/kimi-api-pricing/) and [Kimi K2.6 on OpenRouter](https://openrouter.ai/moonshotai/kimi-k2.6) — Moonshot price table.
- [Paddle vs Lemon Squeezy vs MoR for Indian businesses](https://www.playto.so/blogs/paddle-vs-lemon-squeezy-vs-playto-pay-india) — the FIRA/GST export point.
- [Stripe vs Paddle vs Lemon Squeezy (2026)](https://buildmvpfa.st/blog/stripe-vs-paddle-vs-lemonsqueezy-2026) — fee comparison.
- Anthropic model prices, cache read/write multipliers, and cacheable-prefix minimums: the
  `claude-api` skill (`shared/prompt-caching.md`, model table). Prefer it over re-searching.
