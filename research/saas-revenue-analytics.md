# Scout Brief — SaaS Revenue Analytics (open-core) — GO, SHELVED 2026-07-28

> **SHELVED, not disproven.** Tarun stood this down on 2026-07-28 in favour of an AI-first product,
> because here AI is a "later" bullet (the `AI "why did MRR move" summary` in the roadmap) rather
> than the core of the offering, and he wants the build to produce a defensible AI-integration
> interview story for the active job hunt.
>
> **It failed no gate.** The 2026-07-20 NO-GO sweep explicitly exempted this brief: it monetizes by
> subscription, not ad impressions, and distributes via GitHub / HN / dev communities rather than a
> SERP, so none of the three walls that killed 46 AdSense candidates apply to it. If the AI-first
> scout returns NO-GO, **this is the fallback and it can be picked up unchanged.**
>
> Successor plan: `.claude/plans/research-saas-revenue-analytics-md-here-velvety-popcorn.md`.
> Margin gate for the successor: `references/ai-saas-economics.md`.

**Verdict: GO.** Full-stack open-core SaaS candidate. Scouted 2026-07-17 under a *non-AdSense* scout
(subscription/open-core, React+Node full-stack, BYO-key/cheap-to-serve constraint). **Recommended to
build FIRST** — cleanest gap of the five, tightest scope, Tarun is the target user.

## The problem (one sentence)

SaaS founders want correct, polished MRR / churn / LTV / cohort dashboards from their Stripe data,
but the good tools (Baremetrics, ChartMogul) cost $75-129/mo scaling to $10-15k/yr, ProfitWell's
free tier was absorbed into Paddle, Stripe's own Sigma needs hand-written SQL (payment-data only,
~3-hr lag, no polished/shareable dashboards), and rolling your own means getting the
proration/trial/upgrade math right yourself.

**Target user:** bootstrapped/indie SaaS founders on Stripe (the IndieHackers / r/SaaS crowd) who
want Baremetrics-grade metrics without the price, plus the ProfitWell-free refugees. Technical
buyers, so open-source + self-host + BYO-key is a feature, not friction. **Tarun is himself the
target user** (runs/wants SaaS), which makes dogfooding immediate.

## Keyword cluster + demand read

Cluster: `baremetrics alternative`, `chartmogul alternative`, `profitwell alternative`, `open source
saas metrics`, `self-hosted mrr dashboard`, `stripe mrr churn dashboard`, `open source baremetrics`.

**Demand: PASS — medium confidence.** Triangulated (no paid keyword tool yet):
- Three serious paid tools sustain the category (Baremetrics, ChartMogul, ProfitWell → Paddle
  Retain). Baremetrics ~98 G2 reviews — the paying pool is real but modest, low ARPU-weighted.
- ProfitWell's free tier being folded into Paddle left an unfilled "free/cheap metrics" hole — the
  exact opening.
- Live "build your own SaaS metrics dashboard" content + Show HN attempts = active DIY demand.
- *Confirm head-term volumes (Semrush/Ahrefs) as step 1 of `/explore-project`.*

## Competitor teardown

| Tool | Type | State | The gap |
|------|------|-------|---------|
| **Baremetrics** | Paid $75–1,152/mo | Polished, Stripe-native, easy setup | Price is the wedge against it |
| **ChartMogul** | Paid $129/mo→$10–15k/yr | Deep, customizable analytics | Price + complexity |
| **ProfitWell / Paddle Retain** | Was free | Absorbed into Paddle | No longer a standalone free tool → the hole |
| **Stripe Sigma** | Stripe add-on (SQL) | Query your Stripe data via SQL | Needs SQL, payment-data only, ~3-hr lag, no drag-drop/shareable dashboards, no "why did it move" |
| **Cowlytics** (OSS) | GPL, **42★** | README all "Coming soon" placeholders | **Never finished** |
| **growth-metrics-dashboard** (OSS) | **1★**, 10 commits, 49 open issues, no release | Stub | **Dead** |
| **Lago** (OSS, YC) | Usage-based billing/metering | Funded, active | Adjacent — a *billing* engine, not a metrics dashboard |

**The wedge (make-or-break, CONFIRMED OPEN):** no maintained open-source Baremetrics alternative
exists. Ship a **correct-by-default** (proration / trial / upgrade / failed-payment handled right),
**polished, shareable** SaaS-metrics dashboard — self-hostable + BYO Stripe key. The moat is *metric
correctness*, not charts.

## Revenue model (open-core, three-scenario band, month 12)

Model: open-source core (self-host free); paid = hosted cloud + advanced (forecasting, dunning,
multi-source, team seats, longer history). Organic-only growth (GitHub + Show HN + IndieHackers +
SEO), solo ~10-12 hrs/wk. Hosted anchor ~$19-39/mo, undercutting Baremetrics/ChartMogul. Low ARPU,
count-driven.

- **Pessimistic:** ~10-15 payers → **~$150-400 MRR.**
- **Realistic:** ~25-60 payers (a few hundred GitHub stars + IH/HN traction) → **~$600-1,800 MRR.**
- **Optimistic:** ~100-180 payers (catches the ProfitWell-refugee wave) → **~$3,000-6,000 MRR.**

Ceiling honest: **indie-scale.** Baremetrics/ChartMogul themselves are low-single-digit-millions ARR.
Expandable via Paddle / Lemon Squeezy / App Store / Chargebee sources + forecasting/dunning → a
"financial data platform for SaaS," which is what keeps the ceiling open.

## Fit scorecard

| Criterion | Call | Note |
|-----------|------|------|
| Demand floor | **PASS** (med) | Real category + ProfitWell hole; bounded ARPU |
| Beatable / winnable | **STRONG PASS** | No live OSS rival (42★ placeholder + 1★ stub); Stripe-native doesn't do the job |
| Willingness-to-pay | **PASS** | Steep proven paid market ($75-129/mo→$10-15k/yr) |
| Cheap to serve (constraint) | **STRONG PASS** | Reads Stripe API, BYO-key, ~zero marginal cost |
| Full-stack React+Node | **STRONG PASS** | Webhooks + calc engine + auth + dashboards |
| MVP in ~2-4 wks | **PASS** | Core reachable solo |
| Ceiling / expand | **MODERATE** | Indie ceiling; expandable to multi-source financial platform |
| Portfolio value (Priority 1) | **STRONG** | Clean full-stack interview story |

## Caveats (log honestly)

- **DIY threat:** a technical founder can build a basic version in 2-3 weeks. So the pitch must be
  "don't rebuild it — self-host ours in an hour / pay us to host," and the **correctness engine**
  (proration, trials, upgrades/downgrades, failed-payment recovery, currency) is the real
  differentiator, not the charts.
- **Single-integration risk** (Stripe-only) → roadmap Paddle / Lemon Squeezy / App Store early.
- **Bounded ceiling / modest ARPU** — a winnable indie SaaS, not a billion-dollar category. Chosen
  for finishability + winnability next to an active job hunt.
- **Exact search volumes unconfirmed** (free-tool limit) — pull at `/explore-project`.

## Rough MVP scope (~2-4 weeks core, solo, zero code reuse)

- **Ingest:** connect Stripe (restricted key) → webhook ingest + historical backfill.
- **Metrics engine (correct math):** MRR, ARR, active subs, churn (logo + revenue), ARPU, LTV, net
  revenue retention, and the MRR-movement breakdown (new / expansion / contraction / churn /
  reactivation) — with trials/prorations/upgrades handled correctly.
- **UI:** one clean dashboard + a shareable/public board.
- **Deploy:** self-host (Docker) + BYO Stripe key; hosted-tier scaffold.
- **Later:** cohorts, forecasting, dunning, multi-source, AI "why did MRR move" summary (BYO-key).

---

**Verdict: GO. Run `/explore-project research/saas-revenue-analytics.md` to scope the build.**
Downstream pipeline is AdSense/static-shaped — adapt it for a full-stack subscription SaaS
(backend/DB/auth/billing, cost-to-serve as a first-class gate, dev-audience distribution).
