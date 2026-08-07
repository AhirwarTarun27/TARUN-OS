# Module 2 — The AWS cost model

> **Phase 1 depth — covers the CV boundary only. Phase 2 extends this file in place.**
> Drilled in **D10** together with `03-analysis-engine.md`. They share one boundary sentence.
>
> **What this module is for.** Two CV bullets talk about money — *"40 cost dashboards"* and
> *"waste detection, rightsizing, reservations and power scheduling."* You built those surfaces. The
> first question a good interviewer asks is **"where does the dollar number come from?"** If you can
> answer that in two sentences, the 🔴 on those bullets closes. You do **not** need the engine's
> internals to answer it. That's Phase 2.
>
> Grounded in `Documents/CloudForestX/cloudsaver-master`. Every claim below traces to a file.

## 1. The one-sentence answer

**Price comes from the AWS Price List API. Usage comes from CloudWatch. Savings is the difference,
multiplied out to a month, converted into the user's currency.**

That's it. Everything below is the detail behind those four clauses.

## 2. Price — the Price List API, *not* Cost Explorer, *not* the CUR

`authentication/auth.ts` builds a **`PricingClient`** from `@aws-sdk/client-pricing` (line 59, case
`'Pricing'` at line 431) through the same STS cross-account credential factory as every other client
(see `04-frontend-and-data-layer.md` §5). Each EC2 inventory record carries an
**`InstancePricePerHour`** and a **`CurrencyCode`**.

**Say this precisely, because it is the detail that proves you were in the code:**

> *"We priced off the AWS Price List API and stored an hourly rate per resource. We weren't parsing
> Cost and Usage Reports out of S3 and we weren't calling Cost Explorer — the numbers were built up
> from per-resource rates and metrics, not read down from a bill."*

**Verified absent from the whole repo:** `GetCostAndUsage`, `CostExplorerClient`,
`CostAndUsageReport`, any CUR manifest or `.csv.gz` parsing. Do not say "Cost Explorer." Do not say
"CUR." Both are the obvious guess and both are wrong here.

**The honest trade-off if they push** — *"why not just read the bill?"*:
Price-List-plus-metrics gives you a number **per resource, before the bill exists**, which is what a
recommendation needs ("this instance costs $X/hr and could cost $Y"). A CUR tells you what you already
spent, at line-item granularity, a day late. **The cost of our approach: list price is not the
customer's negotiated or discounted price**, so the absolute figure is an estimate — the *delta*
between current and projected is the number that holds up. That answer reads as senior. Volunteer it.

## 3. Usage — CloudWatch, averaged over a configurable window

`CLOUDFORESTX_UTILIZATION_DAYS`, **default `'30'`** (`authentication/config.ts:44`), sets the
look-back. The metrics collected per instance and stored on the rightsizing row: **AvgCPU, AvgMemory,
AvgNetworkIn, AvgNetworkOut, PeakCPU, PeakMem** (`models/aws/rightsizing/awsRightSizing.ts`).

Averages **and** peaks, both — that pairing is the point. An average alone would recommend downsizing a
box that is flat all week and spikes to 100% every Friday night.

Other windows are separately configurable, which tells you the model was tuned per resource class:
`CLOUDFORESTX_IDEAL_STORAGE_DAYS`, `CLOUDFORESTX_VM_PATTERN_DAYS`, `CLOUDFORESTX_WORKSPACE_CONFIG_DAYS`,
`CLOUDFORESTX_CLUSTER_CONFIG_DAYS`, `CLOUDFORESTX_DOWNSCALE_CONFIG_DAYS` (default `'14'`).

## 4. Hourly → monthly: the 730.33 constant

`awsCostSavingController.ts:536` — `previousGenerationCost += prevGenVM.PossibleHourlySavings * 730.33`.

**730.33 = 8,764 ÷ 12**, the hours in an average month including leap years. The reservation math uses
the rounder **730** (`yearlyRetailPrice / 730`). If asked why both exist: they were written at different
times by different hands, and the ~0.05% difference is noise against list-price estimation. **Don't
defend it as deliberate.** *"Two constants for the same thing — that's the kind of drift I'd normalise"*
is a better answer than a rationalisation.

## 5. Multi-currency — the part people don't expect

200+ accounts don't all bill in USD. Every account row carries a **`CurrencyCode`**; the user picks a
display currency; and **every bucket is converted before it is summed**:

```
currencyConversion(currencyRatesObj, currencyCode, selectedCurrency, Number(value))
```

`awsCostSavingController.ts:120-170` — the conversion wraps each of the seven savings totals
individually inside the per-account loop. **Convert-then-sum, never sum-then-convert**, because the
accounts don't share a source currency.

This is worth volunteering. It's a small thing that shows you understood the product was multi-tenant
across geographies, not just multi-account.

## 6. The shape the dashboards actually receive

`awsCostSavingController.ts:173-200` — this is the payload behind the savings surfaces:

```
Saving_Analysis:  Possible_Monthly_Savings · Potential_Spot_Savings · Realised_Savings
Saving_Areas:     Idle_Resources                        (Category: idleresource)
                  Mis_Provisioned_Resources             (Category: rightsizing)
                  Previous_Generation_Resources         (Category: rightsizing)
                  Reserve_Purchase_Recommendations      (Category: rightsizing)
                  Scheduling
```

**Possible vs. Realised is the distinction to land.** *Possible* is what the engine says you could
save. *Realised* is what was actually saved after someone acted. A cost tool that only shows Possible
never proves its own value — the Realised number is the one that renews the contract.

Note `Idle_Resources` sums **idle + unused** together (`totalIdleCost + totalUnusedResourceSavings`,
line 138-145) even though the engine computes them as two separate families. If asked why: they're one
concept to the buyer — *"you're paying for something nobody is using."*

## 7. The boundary

> **"I built the surfaces that show these numbers, and I built the ingestion that fed them. I didn't
> write the analysis that produces the recommendation."**

Say it once, plainly, then keep going. It is not a weakness — the person asking wants to know whether
you know where your own work stops. See `03-analysis-engine.md` §5 for the longer version.

## 8. Facts I must never get wrong

- **AWS Price List API** (`@aws-sdk/client-pricing`). **Never** Cost Explorer. **Never** CUR.
- Utilization window default **30 days**, env-configurable.
- **730.33** hours/month in the savings math; **730** in the reservation math.
- Metrics stored: **AvgCPU, AvgMemory, AvgNetworkIn, AvgNetworkOut, PeakCPU, PeakMem** — averages *and*
  peaks.
- Currency conversion happens **per account, before summing**.
- Three headline numbers: **Possible / Spot / Realised**. Five saving areas.
- **List price ≠ the customer's actual rate.** The delta is defensible; the absolute is an estimate.
  Volunteer this before they find it.
