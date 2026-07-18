# Scout Brief — Client Portal + Proposals for Agencies/Freelancers (open-core) — GO

**Verdict: GO.** Full-stack open-core SaaS candidate. Scouted 2026-07-17 under the non-AdSense scout.
**Strong #2** — and a defensible **#1 if the Kesri web-solutions synergy is the priority** (you'd
dogfood it on real clients AND sell/host it).

## The problem (one sentence)

Freelancers and small agencies need one branded place to send proposals, share files, show project
progress, and collect payment, but the good tools cost $19-39+/seat/mo each (often several stacked),
and the common free path is stitching Notion + Stripe together by hand.

**Target user:** solo freelancers and small agencies (design, dev, marketing, photography/events)
worldwide — including the India/Gujarat SMB-services market Tarun already serves via Kesri.
Semi-technical buyers, so self-host + white-label is attractive.

## Keyword cluster + demand read

Cluster: `client portal software`, `open source client portal`, `self-hosted client portal`, `white
label client portal`, `dubsado alternative`, `honeybook alternative`, `copilot alternative`, `client
portal for freelancers / agencies`.

**Demand: PASS — high confidence.** A crowded, mature *paid* market = strong WTP proof:
- HoneyBook ($19, dominates photography/events), Dubsado ($20), **Copilot/Assembly ($39/seat, 294 G2
  reviews, 4.8★)**, SuiteDash, Agiled, Moxie, Bonsai, SuperOkay, Plutio, Taskip, Ahsuite.
- Users report ~15 hrs/wk saved. Reddit (r/freelance, r/graphic_design, r/photography): HoneyBook /
  Dubsado dominate; **Notion + Stripe is the common DIY** — real, unmet-cheaply pain.
- *Confirm head-term volumes (Semrush/Ahrefs) at `/explore-project`.*

## Competitor teardown

| Tool | Type | State | The gap |
|------|------|-------|---------|
| **Copilot / Assembly** | Paid $39/seat | Polished branded portal, 294★ G2 4.8 | Price/seat; closed |
| **HoneyBook** | Paid $19 | Proposal→payment, AI composer | Creative-vertical, US-centric, closed |
| **Dubsado** | Paid $20 | Deep workflows | Steep 1-2 wk setup; closed |
| **SuiteDash / Agiled / others** | Paid | All-in-one | Closed, per-seat, complex |
| **Atrium** (Vibra-Labs) | **ELv2 source-available**, **41★**, last commit May 20 2026, active | Next.js/NestJS; PM, files, invoicing, Stripe, white-label, custom domains, RBAC, multi-tenant | The direct competitor — but its licence **forbids offering it as a service**, and it's still tiny |
| **Client Portal** (WP plugin), SuiteCRM forks | Legacy/thin | WordPress-bound | Not a modern full-stack product |

**The wedge:** the OSS side is thin and the one live competitor (Atrium) is **ELv2 source-available**
(can't be run as a service). Ship a **truly open-source (AGPL/MIT)** client portal + proposals,
self-hostable + white-label, with a **sharp focus** — a vertical (dev/design agencies) or the
international/India-SMB slice — and/or **AI proposal drafting (BYO-key)**. Do NOT chase feature-parity
with the paid incumbents.

## Revenue model (open-core, three-scenario band, month 12)

Model: open-source core self-host free; paid = hosted cloud + white-label domains + seats + advanced
(AI proposals, e-sign, automations). Organic-only growth + Kesri dogfooding credibility. Hosted
anchor ~$15-29/mo or per-seat, undercutting Copilot/SuiteDash.

- **Pessimistic:** ~$200-500 MRR.
- **Realistic:** ~$1,000-3,000 MRR (a wedge lands + a Kesri case study drives credibility).
- **Optimistic:** ~$5,000-10,000 MRR (vertical / white-label / agency-reseller wedge catches).

Bigger TAM than analytics, but more competition. Ceiling moderate-good.

## Fit scorecard

| Criterion | Call | Note |
|-----------|------|------|
| Demand floor | **STRONG PASS** | Crowded, proven paid market |
| Beatable / winnable | **PASS** (contested) | OSS thin; one live ELv2 competitor (Atrium) to out-position on licence + focus |
| Willingness-to-pay | **STRONG PASS** | $19-39+/seat/mo proven |
| Cheap to serve (constraint) | **PASS** | CRUD + files + Stripe + auth; self-host = user's storage / BYO-S3; no MoR tax problem |
| Full-stack React+Node | **STRONG PASS** | Multi-tenant auth + RBAC + files + Stripe |
| MVP in ~2-4 wks | **WEAK PASS** | Needs tight scoping (portal + files + one proposal flow; skip the rest) |
| Ceiling / expand | **GOOD** | Big buyer pool + reseller/white-label + verticals |
| Synergy (Kesri) | **STRONG** | Dogfood on real clients + sellable asset |
| Portfolio value (Priority 1) | **STRONG** | Multi-tenant SaaS story |

## Caveats (log honestly)

- **Scope creep is the #1 risk.** The paid tools are all-in-one; a solo MVP must ship a sharp slice,
  not parity. Portal + files + one proposal flow + Stripe — nothing else in v1.
- **Atrium is fresh and active** — the gap is closing. Move with a clear licence (true-OSS vs ELv2) +
  focus wedge, or don't move.
- **Free DIY (Notion+Stripe) caps the low end** — paid conversion is the branded/white-label/
  automation value, so the white-label + custom-domain polish is load-bearing, not a nice-to-have.
- **Exact search volumes unconfirmed** — pull at `/explore-project`.

## Rough MVP scope (~2-4 weeks core, tight, zero code reuse)

- Multi-tenant org + auth + RBAC (each agency = an isolated org).
- Invite clients → **branded portal** (logo / colors / custom domain).
- Project/status view + file sharing.
- One **proposal flow**: create → client views → client accepts.
- Stripe invoice / payment.
- Self-host (Docker), **true-OSS licence (AGPL/MIT)** as the wedge vs Atrium's ELv2.
- **Later:** AI proposal drafting (BYO-key), e-sign, automations, tasks, vertical templates.

---

**Verdict: GO. Run `/explore-project research/client-portal.md` to scope the build** (build after, or
instead of, analytics per your call). Same pipeline-adaptation note as the analytics brief.
