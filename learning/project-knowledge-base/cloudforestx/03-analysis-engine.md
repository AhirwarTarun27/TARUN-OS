# Module 3 — The analysis engine

> **Phase 1 depth — covers the CV boundary only. Phase 2 extends this file in place.**
> Drilled in **D10** together with `02-aws-cost-model.md`.
>
> **This is the 🔴 on your CV.** The bullet says *"40 cost dashboards spanning waste detection,
> rightsizing, reservations and power scheduling."* Every one of those words names an algorithm you
> did **not** write. You wrote the surface that shows its output.
>
> **What Phase 1 needs from you:** describe each family in one sentence, name the inputs, know what the
> output row looks like, and hand the algorithm back cleanly. **What Phase 1 does not need:** the
> thresholds' derivation, the pattern-clustering maths, or the Azure half.
>
> Grounded in `Documents/CloudForestX/cloudsaver-master`.

## 1. The shape: five recommendation families, one pattern

Every family is the same pipeline. **A cron job reads inventory + CloudWatch metrics, applies a rule,
and writes rows into a Sequelize table. The dashboards read that table through Express.** No
recommendation is computed at request time — by the time your React page asks for it, the answer is
already a row.

That single sentence is the most useful thing you can say about this engine, because it explains why
the front end was a read-and-filter problem, not a compute problem. **Lead with it.**

| Family | Where it lives | What it looks for |
|---|---|---|
| **Idle** | `controllers/aws/awsIdleInstanceController.ts` (~2,800 lines) | Resources that exist and run but do nothing — `checkIdleInstance`, `checkIdleEFS`, `checkIdleFSx`, `checkIdleS3` |
| **Unused** | `controllers/aws/awsUnusedController.ts` (~3,200 lines) | Resources nothing is attached to — **14 checks**: ELB, EBS, Elastic IP, ElastiCache, SQS, SNS, resource groups, ECS, Global Accelerator, Elastic Beanstalk, RDS, DynamoDB, Workspaces, EMR |
| **Rightsizing** | `controllers/aws/awsRightSizingController.ts` (~2,000 lines) | Boxes bigger than their workload — `checkInstanceConsumption`, `checkAWSScaling`, `checkAWSPreviousGenerationInstance` |
| **Reservations** | `cron/aws/awsReservedRecommendationJob.ts` | On-demand hourly rate vs. amortized 1-year / 3-year reserved rate |
| **Scheduling (power)** | `InstancePatternAnalysisController.ts`, `vmPatternAnalysisController.ts`, `models/aws/scheduling/*` | Machines with a repeating on/off shape — turn them off when nobody uses them |

## 2. Rightsizing — the one to know best

It's the family your dashboards showed most, and the output row is concrete enough to recite.
`models/aws/rightsizing/awsRightSizing.ts`:

```
InstanceId · Instance · InstanceType · Platform · InstanceLifecycle
CurrentHourlyCost · ProjectedHourlyCost · PossibleHourlySavings
AvgCPU · AvgMemory · AvgNetworkIn · AvgNetworkOut · PeakCPU · PeakMem
UtilizationScore · Recommended · Status · CurrencyCode · AccountId · IsDisabled
```

**`Recommended` is the target instance type. `UtilizationScore` is the engine's confidence-ish
summary of the metric block.** `CurrentHourlyCost − ProjectedHourlyCost = PossibleHourlySavings`, and
that × 730.33 is what the dashboard renders as a monthly number (`02-aws-cost-model.md` §4).

**Three sub-checks, and they're different questions:**
- `checkInstanceConsumption` — is this box under-used against its metrics?
- `checkAWSScaling` — up or down, and by how much?
- `checkAWSPreviousGenerationInstance` — is it on an older instance generation? A newer generation is
  usually **cheaper and faster for the same workload**, so this is free money with no capacity risk.
  It gets its own savings bucket in the API (`Previous_Generation_Resources`).

### The detail that proves you were in this system

**Thresholds are per-account and configurable.** `models/aws/awsRightsizingThreshold.ts`:

```
AccountId · UpscaleThreshold · UpscaleDays · DownscaleThreshold · DownscaleDays
```

Four knobs per tenant, managed through `awsRightsizingThresholdController.ts`. **Both a threshold and
a duration, in both directions.** That means the rule is not *"CPU under X"* — it's *"CPU under X, for
D consecutive days"*, which is what stops a quiet weekend from generating a downsize recommendation on
Monday.

> Say this if you get one sentence on the engine: *"The rules weren't hardcoded — rightsizing ran off
> a per-account threshold table with an upscale and downscale threshold and a day-count for each, so
> one tenant could be more aggressive than another. I consumed that; I didn't tune it."*

## 3. Reservations — the arithmetic is simple, say it plainly

`awsReservedRecommendationJob.ts`. Reserved pricing comes back as a `YearlyCost` and a
`TriennialCost`, and both get flattened to an hourly rate to compare against on-demand:

```
hourYearlySavings   = InstancePricePerHour − (YearlyCost / 12) / 730
hourTriennialSavings = InstancePricePerHour − (TriennialCost / 36) / 730
```

then multiplied out to monthly, yearly and 3-year totals, and stored with the `OfferingClass` and
region. **Gated on `isAWSInstanceCurrentGen`** — there's no point recommending a 3-year commitment on
hardware AWS is retiring. That gate is a good thing to notice out loud.

## 4. Idle vs. unused vs. mis-provisioned — don't blur them

Interviewers in this domain test whether you can separate these. One line each:

- **Idle** — it's running, it's costing money, and its metrics say nobody is using it.
- **Unused** — it's provisioned and attached to nothing at all (an unattached EBS volume, an
  unassociated Elastic IP). Existence is the waste; there are no utilization metrics to read.
- **Mis-provisioned (rightsizing)** — it *is* being used, just at the wrong size.

The API folds idle and unused into one `Idle_Resources` figure because to the buyer they're the same
sentence: *"you're paying for something nobody is using."* The engine keeps them apart because the
detection method is completely different — metrics for one, topology for the other.

## 5. The boundary — the whole point of this module

> **"I built the surface that shows the recommendation. I didn't write the analysis that produces it.
> I built the ingestion that feeds it — the STS cross-account reads of EC2, EBS, S3 and CloudWatch into
> PostgreSQL — and I built the 40 dashboards on top. The recommendation logic in between was someone
> else's."**

**Say it once, unprompted, early.** Volunteering the boundary reads as senior; being pushed to it
reads as caught. And note what the sentence *keeps*: the ingestion **and** the dashboards. That's both
ends of the pipeline. It is a strong claim, not an apology.

**If they push further** — *"could you have written the engine?"* — the honest and good answer is
about the shape, not modesty: *"The hard part isn't the arithmetic, it's the thresholds. Every rule
here has a duration attached to it because the failure mode is confidently recommending a downsize off
a quiet week. That's a product judgment built from customer feedback, not something I'd have got right
from the code."*

## 6. Facts I must never get wrong

- **Recommendations are precomputed by cron into Sequelize tables.** The front end reads rows; it never
  computes a recommendation.
- **Five families:** idle · unused · rightsizing · reservations · scheduling. **14** unused-resource
  checks.
- Rightsizing thresholds are **per-account**, with a **threshold + a day-count** for both up and down.
- Rightsizing's three sub-checks: **consumption · scaling · previous generation.**
- `CurrentHourlyCost − ProjectedHourlyCost = PossibleHourlySavings`. `Recommended` = the target type.
- **Previous-generation is its own savings bucket**, separate from mis-provisioning.
- **Never claim you wrote any of this.** The bullet says "built the SPA behind 40 cost dashboards" —
  that is exactly and only what it says.
- **Do not claim anything about what was running in production.** Several cron entry points in this
  repo state are fully commented out (`awsRightSizingService`, `awsUsageService`,
  `awsReservedRecommendationJob`, `instanceSchedulingService`). Describe **the mechanism**, never the
  deployment state — you'd be guessing, and the guess is checkable.
