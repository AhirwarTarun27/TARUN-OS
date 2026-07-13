# AdSense economics — will this niche actually pay?

> Researched-once-saved-forever. Read this instead of re-searching.
> Refresh on command: "update the adsense-economics reference".
> Last researched: 2026-07-13. Benchmarks age faster than policy — re-pull the tables yearly.

**What this file is for:** deciding, *before you build*, whether a niche can produce real money.
It is the revenue half of AdSense. The **approval** half — policies, trust pages, low-value
content — lives in `references/adsense-policy.md`.

**Who uses this file:** `/scout-problem` Step 4 (the revenue model) and Gate 3 (the revenue floor).

**The one-line version:** traffic is not revenue. You can rank #1 on a niche that cannot pay,
and JsonBeam is the proof.

---

## 1. The identity — the only formula that matters

```
monthly revenue  ≈  sessions  ×  pages per session  ×  page RPM  ÷  1000
```

Three terms. `/scout-problem` historically estimated **none** of them. Every term below is
independently estimable at scout time, and **each one is a multiplier** — a weak term can't be
outrun by a strong one.

Google's official definition ([metric definitions](https://support.google.com/adsense/answer/190515)):

```
page RPM = (estimated earnings ÷ page views) × 1000
```

Worked example from Google: $0.15 earned from 25 page views → `(0.15 / 25) × 1000` = **$6.00 RPM**.

### How the ad metrics compose

| Metric | What it is | Whose number it is |
|---|---|---|
| **CPC** | Cost per click | What the **advertiser** pays. Set by auction bids in your niche. |
| **CPM** | Cost per 1,000 impressions | Also the **advertiser's** cost. |
| **CTR** | Clicks ÷ impressions | How often your users click. |
| **Page RPM** | Earnings per 1,000 **pageviews** | **Your** number. The one that actually predicts income. |

RPM is the composite — it already folds in CPC, CTR, fill rate, viewability, and the number of ad
units on the page. **Model in RPM. Use CPC only as the input signal for what RPM band you're in.**

### The revenue share — every estimate is net of this
([revenue share](https://support.google.com/adsense/answer/180195))

- **AdSense for Content:** publisher keeps **68%** when advertisers buy through Google Ads;
  **80%** when they buy through a third-party platform (after that platform takes its fee).
- **AdSense for Search:** publisher keeps **51%**.
- These rates are **identical regardless of your geography**. Being in India does not reduce your
  share — but it does reduce your traffic's value if your *audience* is there (see §4).

---

## 2. Sessions — model at an achievable rank, not at #1

```
sessions ≈ Σ (keyword monthly volume × CTR at the rank you can realistically hold)
```

The mistake is multiplying volume by the #1 CTR. You will not be #1 in the MVP window against an
incumbent with domain authority — the AccentWallPlanner brief already concedes this about
inchcalculator, correctly.

### Organic CTR by position, 2026 (post-AI-Overviews)

| Position | Clean SERP | **With an AI Overview present** |
|---|---|---|
| 1 | ~27-40% (studies vary; ~27% average) | **15-20%** |
| 2 | ~12-18% | ~12% |
| 3-5 | ~5-10% | lower |
| 6-10 | ~2-3% | *rising* — the curve is flattening |

**The AI Overview tax is the single biggest change to this math.** Position-1 CTR is down ~32%
year over year (one 200k-keyword study: 28% → 19%). AI Overviews appear on roughly **67% of
commercial-intent queries** as of March 2026. Positions 6-10 are actually getting ~30% *more*
clicks than before as the curve flattens.

**Rule: model traffic at rank 3-8 with an AI-Overview haircut.** If the idea only works at #1 on
a clean SERP, it doesn't work.

---

## 3. Pages per session — the term nobody models, and the cheapest lever

| Site shape | Pages/session |
|---|---|
| **Bare utility widget** (land, use, leave) | **1.0 - 1.3** |
| Tool wrapped in a real content ecosystem (guides, style pages, methodology) | **2 - 3** |

Internal linking alone lifts pages/session by **40-60%**.

**Doubling this doubles revenue with zero additional traffic.** It is the highest-ROI lever
available to a tool site, and it costs writing, not engineering.

> **The through-line to `adsense-policy.md`:** a bare widget is *simultaneously* 1.0 pages/session
> (the revenue floor) and *"a screen without publisher-content"* (the rejection reason). **Session
> depth and AdSense approvability are the same problem.** Fixing one fixes the other. This is why
> the content ecosystem is not optional garnish — it is the business model.

---

## 4. Page RPM — what drives it

```
page RPM ≈ f( niche CPC , geo mix , ad-block rate , viewable ad units )
```

### 4a. Niche CPC — the advertiser's willingness to pay for your user

This is the biggest single lever, and it is decided **the moment you pick the niche.** You cannot
engineer your way out of a floor-tier niche.

| Tier | Niche | Typical CPC |
|---|---|---|
| Premium | **Legal** (lawyer, attorney, claims) | $50 - $500 |
| Premium | **Insurance** (auto, health, life) | $25 - $50 |
| Premium | **Finance** (loans, mortgage, credit) | $20 - $40 |
| Strong | **Ed-tech / SaaS / B2B** | $10 - $25 |
| **Workable** | **Home improvement / DIY** | **~$2.40 — high buyer intent, low competition** |
| Floor | **Dev tools, general utilities, hobby** | Bottom of the barrel |

Why the floor is the floor: **nobody bids to reach a person formatting JSON.** There is no product
to sell them at that moment. An insurer will pay $50 to reach someone shopping car insurance
because the lifetime value is thousands. Commercial intent *at the moment of the search* is what
advertisers pay for — not how technical or clever the tool is.

**Caveat for 2026:** AI Overviews have gutted organic traffic to informational pages in the
premium niches, so **high CPC alone no longer guarantees revenue.** A $50 CPC on a query that now
gets answered in the AI Overview is worth nothing. CPC × achievable traffic, always.

### 4b. Geo mix

| Tier | Countries |
|---|---|
| Top | **US, UK, Canada, Australia** — high advertiser competition |
| Mid | Western Europe, Japan |
| Bottom | India, Philippines, most of Tier-3 |

US-first is already the standing policy. **This table is why.**

### 4c. Ad-block exposure — the multiplier nobody models

This applies **directly to served impressions**. A 50% block rate halves revenue before any other
term is even considered.

| Audience | Ad-block rate |
|---|---|
| **Software developers / IT professionals** | **40 - 60%** |
| Tech and gaming sites generally | 40%+ |
| **General consumer audience** | **5 - 15%** |
| Global internet average | ~32 - 43% (dataset-dependent) |

**Building an ad-monetized tool for developers is building on a 40-60% revenue haircut, by
construction.** No amount of ranking, design, or ad optimization recovers it. This is a *niche
selection* decision, and it is irreversible after launch.

### 4d. Page RPM bands — where you land

| Band | Page RPM | Who's here |
|---|---|---|
| Basement | **$0.25 - $3** | Generic utilities, dev tools, bottom-tier geo, high ad-block |
| Typical | **$5 - $25** | Most legitimate content/tool sites, US traffic |
| Premium | **$30+** | Finance, insurance, health, tech-with-buyer-intent |

---

## 5. The portfolio, run through this model

Written down because it is the evidence that this gate is needed, and because it is honest.

| Product | CPC class | Ad-block exposure | Pages/session | Geo | Verdict |
|---|---|---|---|---|---|
| **JsonBeam** | **Floor** — nobody bids on JSON formatting | **40-60%** — developer audience | **~1.0** — land, paste, leave | US-ok | **Structurally capped in the $0.25-$3 basement.** Winning #1 on every JSON keyword does not fix any of the three. The scout gate had no way to see this. |
| **GradeJar** | Ed-tech, modest but real | Low — teachers don't ad-block | Low-ish, liftable with content | US | Workable. Session depth is the lever. |
| **AccentWallPlanner** | **~$2.40, high buyer intent** — Home Depot, Lowe's, contractors bidding | **Low** — US homeowners | **Liftable to 2-3** — style guides, how-tos are natural | **US** | **Structurally the best money bet in the portfolio.** It was not chosen for that reason — which is exactly the problem this reference exists to fix. |

**The lesson, stated plainly:** JsonBeam is a good product and a good SEO play. It is a bad
*AdSense* play, and that was knowable before a line of code was written.

---

## 6. Scout-time checklist

At `/scout-problem` Step 4, produce a **three-scenario band** (pessimistic / realistic /
optimistic monthly revenue at month 12) with every input shown, so the number can be argued with:

```
sessions    = Σ (keyword volume × CTR at achievable rank 3-8, AI-Overview-adjusted)
pages/sess  = 1.0 if it's a bare widget | 2-3 if there's a real content ecosystem
page RPM    = niche CPC tier × geo mix × (1 − ad-block rate) × viewable units
revenue     = sessions × pages/sess × RPM ÷ 1000        [already net of Google's cut]
```

Then answer the four sub-scores:

1. **CPC class** — what do advertisers pay to reach this user *at this moment*? Floor-tier with no
   adjacent commercial intent is a kill.
2. **Ad-block exposure** — who is this audience? Technical/dev = 40-60% haircut = a kill.
3. **Session-depth potential** — is there anything to *say* beyond the tool itself? If not, it's
   1.0 pages/session **and** a low-value-content rejection. Same kill, twice.
4. **Geo mix** — what share is US/UK/CA/AU?

**The hard rule: ranking #1 on a niche that cannot pay is still a NO-GO.**

### Where to get the inputs

- **Volume + CPC per keyword** — Semrush / Ahrefs give both in one pull. Google Keyword Planner's
  "top of page bid (high range)" is a free CPC proxy.
- **Ad-block rate** — inferred from audience type, using §4c. No tool needed.
- **Pages/session** — a judgment about the content surface, not a lookup. Ask: *what are the ten
  articles this site would publish?* If you can't name them, it's a bare widget.
- **Geo mix** — from the SERP and the problem's framing (US-first is the standing policy).

---

## Source index

| Topic | URL |
|---|---|
| AdSense metric definitions + RPM formula | https://support.google.com/adsense/answer/190515 |
| AdSense revenue share (68% / 80% / 51%) | https://support.google.com/adsense/answer/180195 |
| How AdSense works | https://adsense.google.com/start/how-adsense-works/ |
| CPC-by-niche benchmarks | https://www.publift.com/blog/best-adsense-niches · https://monetizepros.com/ad-sales/high-paying-ad-niches/ |
| Ad-block usage by audience | https://backlinko.com/ad-blockers-users · https://www.getsleek.io/blog/adblocker-impact-on-analytics |
| Organic CTR by position, post-AIO | https://firstpagesage.com/reports/google-click-through-rates-ctrs-by-ranking-position/ · https://indexsy.com/ctr-statistics/ |
| Better Ads Standards (ad density caps) | https://www.betterads.org/standards/ |

> Google numbers (RPM formula, revenue share) are official and stable. **Benchmark tables
> (CPC tiers, RPM bands, ad-block rates, CTR curves) are third-party aggregates** — directionally
> reliable, precise to roughly a band, not a decimal. Use them to choose between tiers, never to
> promise a number.
