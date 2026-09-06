# Module 0 — Narrative & Pitch

**Goal:** deliver the "tell me about a project you worked on" answer cold — in 30 seconds or 2 minutes —
and handle the standard opener follow-ups without fading. This is the **highest-frequency moment in any
interview**; it opens almost every round and sets the tone for everything after.

**Study this until you can say the 30-second pitch out loud, from memory, smoothly.** The facts come from
the codebase (grounded in the exploration of all 6 repos); the pitch scripts are yours to memorize and adapt.

---

## 1. The one sentence

> **CloudForestX is a cloud cost optimization platform that helps enterprises cut their AWS bill
> by automatically finding idle and oversized resources, scheduling non-production machines to power off
> out of hours, and recommending reservations — all in one dashboard with alerts.**

Internally the product and its repos are called **CloudSaver**. Same product. "CloudForestX" is the brand
name on your CV; `cloudsaver-*` / `cfx-*` is what the repositories are named. Mention this once if it comes
up; don't let it trip you.

## 2. The problem it solves (the "why this exists")

Enterprises run infrastructure across **many** cloud accounts. Cloud spend is notoriously wasteful:

- Teams over-provision "just in case," so machines run at 5% CPU.
- Dev/test/staging boxes run 24/7 when they're only used 8 hours on weekdays.
- Resources get orphaned after a project ends (unattached disks, idle load balancers, unused IPs).
- Steady workloads stay on on-demand pricing instead of reservations/savings plans.

The bill grows, finance can't explain it, and engineering has no time to police it. **CloudForestX is the
control tower for that spend** — it connects to the accounts, ingests usage + billing data, and turns it
into *specific, actionable savings* instead of a raw dashboard of numbers.

## 3. What it actually does (the feature story)

Group the features into four buckets — this is how you narrate scope without listing 20 screens:

1. **See the spend.** Cost analysis and forecasting, spend broken down by service (compute, storage,
   database, data transfer, containers, serverless, etc.), account-wise breakup, tag-based billing, and
   comparison reports.
2. **Find the waste.** Idle instance + idle storage detection, unused-resource detection (unattached EBS,
   unassociated Elastic IPs, empty load balancers/ASGs), rightsizing recommendations (up/down-scale and
   old-generation swaps), and reserved-instance / savings-plan recommendations.
3. **Act on it.** Auto power-scheduling — the platform learns a machine's daily on/off pattern and can
   **start/stop EC2 instances on a schedule** to stop paying for idle nights and weekends.
4. **Stay safe + informed.** Cloud security-posture scanning (CIS-style best-practice checks), built-in
   **uptime + SSL-expiry monitoring** of the customer's own endpoints, real-user monitoring (RUM),
   invoicing from billing data, and alerts over email / Slack / Google Chat.

It's **multi-tenant** (each customer company is a tenant), built on **AWS**. (The platform's account
model branches on cloud provider at runtime and has placeholder support for other clouds, but AWS is
what you worked on and what you should speak to.)

## 4. Who uses it + the scale

Buyers are **enterprises and their FinOps / DevOps / platform teams** — the people accountable for a large,
multi-account cloud bill. Your CV states the platform manages **200+ enterprise AWS accounts**; frame that
as the platform's scale ("built to manage hundreds of enterprise cloud accounts across tenants").

> **Truthfulness note.** "200+" is a business/scale figure, not something provable from the code. State it
> confidently if it's real from your experience, but don't invent per-account specifics (exact dollar
> savings, exact customer names) — if pushed, say "on the order of a few hundred accounts across our
> tenants; I don't have the exact current number in front of me." Never fabricate a number to fill a pause.

## 5. Your role (frame it truthfully — this matters)

You were the **Senior Frontend Developer** on a **team of ~6**, from Jul 2023 to May 2025. Own this cleanly:

- **What you owned:** the **React + TypeScript single-page app** — the dashboards that turn raw AWS
  data into something a finance or DevOps team can act on: cost analytics screens, idle/rightsizing/unused
  views, the account-onboarding flows, the global account+month filtering, the API service layer, real-time
  notifications, and the data visualizations (charts, gauges, geo maps).
- **What you owned on the backend:** the **AWS ingestion path and the REST APIs** — STS assume-role into
  customer accounts, the SDK client factory, the scheduled sync jobs, the Sequelize models that normalize
  it into PostgreSQL, and the Express endpoints that serve it out. Module 4 §5 is the full flow.

> **Where the backend claim stops — and it stops in exactly one place.** The **recommendation algorithms**
> (what threshold makes a resource idle, which instance type to rightsize to, which reservation to buy)
> sat with the analysis team. That is the only line you hand back, and handing it back is what makes the
> rest credible. The posture: *"I owned the frontend end to end, and on the backend I built the ingestion
> pipeline and the APIs. The recommendation logic on top sat with the analysis team — I know how it
> consumed what I stored, but I didn't design the algorithms."* That lets you speak to architecture
> (Modules 1-3) with authority, and it survives two follow-ups where a vaguer claim would not.
>
> **Authorship re-graded 2026-08-16** on Tarun's declaration. The earlier "contributed some endpoints"
> framing is gone: it undersold what the CV bullet claims, which meant the script and the CV disagreed.

## 6. The pitch scripts (memorize these)

### 30-second version

```
CloudForestX is a cloud cost optimization platform — think of it as a control tower for a
company's AWS spend. Enterprises run hundreds of cloud accounts and waste a big
chunk of their bill on idle and oversized resources. The platform connects to those accounts,
pulls in all the usage and billing data, and surfaces exactly where the waste is: idle
instances, rightsizing opportunities, unused resources, reservation recommendations — and it
can even auto-schedule non-production machines to shut down at night. I was the senior frontend
developer. I owned the React and TypeScript dashboard that turns all of that data into
something a finance or DevOps team can actually act on, and I also built the Node ingestion
pipeline that pulls the AWS data in behind it.
```

### 2-minute version

```
CloudForestX — internally CloudSaver — is a multi-tenant SaaS for cloud cost optimization,
built on AWS. The problem it solves: big companies run their infrastructure
across hundreds of cloud accounts, and a large share of that spend is pure waste — machines
running at five percent CPU, dev boxes left on over the weekend, orphaned disks and IPs,
workloads on on-demand pricing that should be reserved.

The platform connects to each customer's cloud accounts, ingests their usage metrics and their
billing data, and runs analysis on top of it. On one side it gives visibility — cost broken
down by service, by account, by tag, plus forecasting. On the other side it gives action: it
detects idle and oversized resources, recommends rightsizing and reservations, finds unused
resources, and it can learn a machine's usage pattern and automatically power it off on a
schedule. There's also security-posture scanning and uptime monitoring built in, and it alerts
over email, Slack, and Google Chat.

Under the hood it's a set of microservices — a React single-page app, a main API, background
workers that fetch and analyze the cloud data, a scheduler, and a monitoring service — running
on AWS. I was the senior frontend developer on a team of about six. I owned the React and
TypeScript front end end-to-end: the cost dashboards, the data visualizations, the state
management for the global account and time-range filters, the API service layer, and real-time
notifications. On the backend I built the ingestion path and the APIs: assuming into customer
accounts with STS, pulling inventory and CloudWatch metrics with the AWS SDK, normalizing that
into PostgreSQL on a schedule, and serving it out over Express. The recommendation logic on top
sat with the analysis team. So I know the platform from the AWS call all the way to the chart,
and I'm happy to go as deep as you'd like on any part of it.
```

That last line is a deliberate hook: it invites them into the areas you've prepared (architecture,
frontend, AWS model) instead of letting them fish for a weak spot.

> **If asked "does it support other clouds?"** → *"AWS is what I worked on and what I can speak to in
> depth. I believe the account model had room for other providers, but I don't want to overclaim
> something I didn't build against."*

## 7. Standard opener follow-ups (have these ready)

- **"What was your specific role / what did you own?"** → Section 5. Frontend end-to-end + some backend
  APIs; integrated with the whole system.
- **"Why is this a hard or interesting problem?"** → Three honest angles: (1) **scale + fan-out** — pulling
  usage and billing data across hundreds of accounts and many regions without it taking forever; (2) **the
  cost data itself** — cloud billing is huge and messy, and turning it into a specific, trustworthy
  "you can save X here" recommendation is non-trivial; (3) **the frontend challenge** — presenting a very
  large, deeply nested dataset (hundreds of screens) in a way that stays fast and usable.
- **"Who were the users?"** → FinOps / DevOps / platform + finance teams at enterprises with a large,
  multi-account cloud bill.
- **"How big was the team / how long were you on it?"** → ~6 people; Jul 2023 to May 2025, just under two years.
- **Push-back: "You're a frontend dev — why should I trust your view of the whole system?"** → *"Because the
  frontend had to integrate with every backend service — every cost view, every analysis result, the
  account onboarding, the real-time notifications all flow through the UI I built. I couldn't build that
  without understanding where the data came from and how it was produced. I won't claim I wrote the
  analysis algorithms, but I can walk you through how the whole thing fits together."*

## 8. Facts I must never get wrong

- Product: **CloudForestX** (repos: **CloudSaver / cfx-**). Cloud **cost optimization** SaaS.
- **AWS-focused** — that's what you worked on; don't claim Azure.
- **Multi-tenant** (tenant = a customer company).
- Core value trio: **find idle/oversized resources → recommend rightsizing & reservations → auto-schedule
  power-off**, wrapped in **cost visualization + alerts**.
- My role: **Senior Frontend Developer**, ~6-person team. **React/TypeScript SPA end to end, plus the
  Node AWS-ingestion pipeline and the PostgreSQL-backed REST APIs.** The one thing I hand back: the
  **recommendation algorithms**.
- Runs on **AWS** (details in Module 1 — don't over-commit here beyond "microservices on AWS").

---

### Sources (grounding)

- Product scope & features: `cloudsaver-master` README + controller/route map; `config.ts` feature flags
  (Stripe billing, security scan, RUM, monitoring). AWS focus confirmed via `routes/*`.
- Feature domains: `cfx-aws-initial-fetch-master/src/controllers/aws/*` (idle, unused, rightsizing,
  forecasting, invoice, reserved, pattern analysis); `cfx-synthetic-monitoring-master` (uptime/SSL);
  security scan in `cloudsaver-master/src/services/aws/security/*`.
- Role & team size: your CV (employment facts, not code — state them as your own).
