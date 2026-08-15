# Module 0 — Product & Business Context

**Goal:** explain what Dwellworks' platform *is*, what business it serves, and who pays for it — to
someone who has never heard of corporate relocation. Cold, in plain English, without a single technical
term.

This module exists because of a specific interview failure mode: you describe the tech beautifully and
the interviewer still has no idea what the product does. With relocation software that risk is high —
**the interviewer will not know this domain either.** If you can make them understand it in 60 seconds,
you've already outperformed most candidates. Module 0.5 turns this into the pitch; this module is the
understanding underneath it.

**Study until you can explain the domain and the customer to a non-technical person, unprompted.**

---

## 1. The one sentence

> **Dwellworks runs a relocation platform — when a company moves an employee to another city or country,
> the platform manages that entire move: assigning a local consultant, finding the family a home and a
> school, handling the lease and the visa paperwork, and tracking every step through to move-out.**

Internally the flagship product is called **Odin** ("Dwellworks' Destination Software"). Odin is one
repo of nine; the platform is the whole set. If someone asks "what's Odin?" — that's the main
application, the one an actual user logs into.

## 2. The domain, explained cold

This is the section to over-learn. Everything else depends on it.

### The business it serves

A company relocates an employee — say a Bosch engineer moving from Stuttgart to Chicago for a three-year
assignment. The company doesn't want that engineer spending six weeks failing to rent an apartment in a
country whose rental market they don't understand. So they pay someone to run the move.

That's the industry: **corporate relocation**, and specifically **destination services** — everything
that happens at the *destination* end of a move (find a home, find a school, get set up, run the lease)
as opposed to the shipping-your-furniture end.

### The chain of who pays whom

```
Corporate employer  ─ pays ─►  RMC  ─ subcontracts ─►  Dwellworks  ─ dispatches ─►  local consultant
(the one relocating                (relocation        (destination                 (boots on the ground
 the employee)                      management         service provider)            in the city)
                                    company)
```

Some corporates come direct; many come through an **RMC**. Dwellworks sits in the destination-services
seat and often has the RMC as its actual customer. This is visible in the code — there is an `RmcUser`
role, an `RmcAccessType`, `RMCServiceEnum`, and a whole `rmc-reporting` front-end bundle whose only job
is reporting *back* to the RMC. **The RMC is a first-class user of the product, not just a payer.**

### The vocabulary (an interviewer won't know these — knowing them makes you sound senior)

| Term | What it means |
|---|---|
| **Transferee** | The relocating employee. The end user. In code, `Transferee` extends `ApplicationUser` |
| **Assignment / Order** | One relocation engagement. `Order` is the central entity the whole platform revolves around |
| **Authorization** | The corporate's formal "yes, move this person, and here's what we'll pay for." It kicks off the order — this is what the entire `ClientAPI` repo exists to process |
| **RMC** | Relocation Management Company — the middleman that orchestrates a corporate's whole relocation program |
| **DSC / Consultant** | Destination Services Consultant. The local human who drives the transferee around and gets the job done |
| **Program Manager** | Dwellworks-side operator overseeing an account's orders |
| **Home finding** | The core service — shortlisting and touring properties with the transferee |
| **Area orientation** | The city-familiarization tour before home finding |
| **Settling in** | Post-arrival admin: bank account, utilities, phone, registration |
| **Tenancy management** | Everything *after* the lease is signed — the landlord relationship, the recurring bills and the damage claims, for the length of the assignment. **Detail box below** |
| **Departure** | End-of-assignment move-out: walkthrough, repairs, deposit recovery |
| **Metro area** | The geographic unit the platform organizes coverage and pricing around |
| **Service team** | The pool of consultants/agents covering a given metro |
| **Spark** | The internal name for consultant (DSC) assignment — offering an order to a consultant and having them accept |

#### Detail box — tenancy management (added 2026-07-30)

Expanded because the one-line version was too thin to defend under follow-up. **Home finding ends at the
lease signature; tenancy management begins there and runs to move-out.** The transferee is now somebody's
tenant in a foreign country, possibly without the language, and Dwellworks stays in the middle of that
relationship. `TenancyManagement.cs` is one record per order, in three blocks:

**1. The tenancy record — terms and people.** `MonthlyRent`, `LeaseStart`, `LeaseEnd`, `LeaseTerm`,
`LengthOfAssignment`, `StampDuty`; the full property address; a complete **landlord** contact block (`Ll*`)
and **real-estate agent** contact block (`Re*`). The fields that matter most are
`DepositPaidBy` / `RentPaidBy` / `BrokerFeePaidBy` — **who bears each cost**: employer, transferee, or
Dwellworks. That is the entire commercial shape of a relocation package expressed in three columns.

**2. `TenancyPayment` — recurring bills with an approval workflow.** Types: `Rent`, `CouncilTax`, `Water`,
`Gas`, `Electric`, `HeatingCooling`. Each carries provider, account number, due date, amount, **currency**,
and a `PeriodFrom`/`PeriodTo` window. Status runs **`Pending → Approved → Exported`** or `Declined`, with
approver/decliner, timestamps and reasons (`NoLongerOccupant`, `OverlappingDates`). `Exported` means it
leaves for finance — this is a real money pipeline, not a notes field.

**3. `TenancyClaim` — damage and disputes.** `TenantDamage` / `ThirdPartyDamage` / `Other`, moving
`New → Solved / Unsolved / N/A`, recording who raised it and who resolved it.

**The frontend maps one-to-one, and it's the best "modernization in place" evidence in the product.** The
`tenancy-management` bundle is `TenancyManagement.jsx` with exactly two tabs — `claims/` and `payments/` —
behind `TenancyErrorBoundary.jsx`, while the property/landlord/agent record is still edited through the
older `Scripts/app/views/orders/program_details_components/tenancy_management_{property,landlord,real_estate}.js`.
New work in React, the legacy record in the old stack, **same feature**. Use this in the "nine repos /
over-engineered" push-back.

There is also a client-specific DTO and notification builder under `Odin.Data/ClientApi/<RMC>/` for tenancy
management — tenancy events are pushed back out to the RMC. That is concrete proof the **RMC is a real
user with its own surface**, not merely the payer.

> **Verify before quoting:** `TenancyManagement` inherits `MobileTable`, which *suggests* it syncs to a
> mobile client. Confirm what that base class actually does before saying so in an interview.

### The lifecycle of one move

This is the spine of the product. Learn it as a sequence — nearly every screen and every service maps to
one step:

```
1. Authorization arrives           (corporate/RMC says "move this person")   → ClientAPI
2. Order created                   (the assignment record)                   → Odin
3. Consultant assigned + accepts   ("Spark")                                 → Odin
4. Intake survey                   (family, budget, pets, schools, dates)    → Odin
5. Area orientation                (city tour)                               → Odin
6. Home finding + school finding   (shortlist, tour, choose)                 → Odin + PropertyMicroservice
7. Lease signed                    (the deliverable)                         → Odin + PropertyMicroservice
8. Settling in + visa/immigration  (bank, utilities, registration, paperwork)→ Odin
9. Tenancy management              (runs for the length of the assignment)   → Odin
10. Departure                      (walkthrough, repairs, deposit back)      → Odin
11. Billing + reporting            (fees, invoices, RMC reports)             → Odin + Stats
```

Every one of those steps is a real thing in `Odin.Data/Core/Models/` — `AreaOrientationTask`,
`SchoolFinding`, `TenancyManagement`, `SettlingInTask`, `DepartureWalkthrough`, `DepartureDeposit`,
`VisaImmigrationInfo`, `RemovalService`, `AirportPickup`, `DscFeeCalculation`. **If you can recite this
lifecycle, you can answer any "what does the product do" question by pointing at a step.**

## 3. Who the customers are

Four distinct audiences. Naming all four is what separates "I worked on a website" from "I understood
the business."

**1. The buyer — corporates and RMCs.** Large employers relocating staff, usually via an RMC. They care
about cost control, compliance, and being able to see the status of every move without emailing anyone.
The `rmc-reporting` bundle and `ClientAPI`'s authorization APIs exist for them.

**2. The end user — the transferee and their family.** Non-technical, stressed, often in a foreign
country, on a phone. They get self-serve views: intake survey, MyMove, discover, school finding, resource
library, funds, payments, help center, chatbot. **This audience is why the UI quality actually mattered —
they didn't choose the software and they can't be trained on it.**

**3. The internal operators — consultants and program managers.** The heaviest daily users. Order
dashboard, task management, appointments, notifications, reporting. They live in the product all day, so
their screens optimize for density and speed, not hand-holding — the opposite of the transferee UI. That
tension is a good thing to have noticed.

**4. The supply side — agents, brokerages, suppliers, station agents.** The network that actually
delivers the service. `NetworkManagementWeb` is a whole application for managing them: suppliers,
brokerages, coverage areas, service teams, concierge, station agents.

Plus internal back-office (`DsInternal`: contracts, corporate-client surveys, customers, countries, metro
areas) and finance roles — the role list in code includes `Accounting`, `Director`, `Coordinator`,
`GlobalSupplyChain`.

**The one-liner if they ask "who are the users?":** *"Four groups — the corporate or RMC who pays, the
relocating employee and their family, our own consultants and program managers running the move, and the
supplier network delivering it. The platform has a different surface for each."*

## 4. The business model — YOU FILL THIS IN

**The code cannot tell us how Dwellworks charges, and I will not invent it.** The code shows fee
*machinery* — `DscFeeCalculation`, `ConsultingDailyFee`, `ConsultingHourlyFee`, `BrokerFeeType`,
`AccountPayable`, `AccountReceivable`, `ProgramPaymentsController` — which says fees are per-consultant
(daily/hourly), broker commissions exist, and there's real two-sided accounting. It does **not** say what
a customer is billed.

Fill these in from what you actually know, and if you don't know, say so in the interview — *"I was on
the product side, I don't have the commercial detail"* is a completely fine answer:

- Is it billed **per relocation/order**, as a **retainer/program contract**, or both?
- Roughly what does one relocation cost the client? (Order of magnitude only — never quote a real
  contract.)
- Rough scale: how many orders/transferees a year, how many countries or metros?
- How many people on your team, and who else was on the platform?

> **Never fabricate a number to fill a pause.** Same rule as CloudForestX. A made-up figure is the one
> thing an interviewer can catch you on cold.

## 5. What the platform actually does — four buckets

Don't list screens. Group them. This is how you narrate a platform with hundreds of pages in 30 seconds:

1. **Take the work in.** Authorizations from corporate and RMC systems, order creation, consultant
   assignment (Spark), the transferee intake survey. *"How a move enters the system."*
2. **Find the home.** Area orientation, property search and shortlisting, school finding, property tours,
   lease creation and lease documents. *"The core service people actually pay for."*
3. **Run the assignment.** Task and appointment tracking, settling-in, visa/immigration, tenancy
   management, departure and deposit recovery, documents, real-time notifications, in-app messaging and a
   chatbot. *"Everything between arrival and move-out."*
4. **Run the network and report on it.** Supplier/brokerage/agent management, coverage areas and service
   teams per metro, fee calculation, payables and receivables, invoicing, statistics, and RMC-facing
   reporting. *"The business behind the service."*

## 6. Why nine repos — the honest read

Do not describe this as a clean microservice architecture. It isn't, and claiming it is invites a
question you'll lose. The accurate description:

> **"It's a large .NET Framework monolith — Odin — with newer .NET Core services carved off around it
> over time. It's a modernization-in-progress, not a greenfield microservice design."**

The evidence, which you should be able to cite:

- **Odin** is .NET Framework 4.6.1, ASP.NET MVC 5 + Web API 2, EF6, Ninject, OWIN. It holds the domain —
  orders, transferees, tasks, leases, billing.
- The services carved out are **newer stacks**: `PropertyMicroserviceCore` (ASP.NET Core 2.2),
  `ECoordService`, `StatsMicroservice`, `DsInternal`, `NetworkManagementWeb` (all .NET Core, some
  Dockerized, Property has AKS manifests).
- `IdentityMicroservice` is the genuine shared-service win: **it issues JWTs and everything else only
  verifies them**, against an RSA public key, with Redis for revocation. That's a real architectural
  boundary, not an accident.
- `ClientAPI` is a separate integration boundary — it speaks to **external** systems (ServiceEngine,
  Destination, Aires) and runs seven batch console jobs plus Azure Storage Queues.
- Async coupling is via **Azure Storage Queues** and change trackers, not a service mesh.

**Why this framing wins.** "I worked on a legacy modernization" is a *stronger* story than "I worked on
microservices" — it means you've dealt with constraints, migration paths and code you didn't write.
Every senior interviewer has lived that. Own it; don't apologize for it.

## 7. Where you sit

**Frontend-heavy**, working primarily in the Odin front end — the React bundles and the Razor/Vue
surface — integrating against the .NET services behind them.

The posture, word for word:

> *"I worked primarily on the front end — Odin's React and Razor surface. But Odin's front end talks to
> almost every service in the platform: identity for auth, the property service for home finding and
> leases, the stats service for dashboards, the client API for authorizations. I had to understand where
> the data came from to build against it. I won't claim I wrote the .NET microservices, but I can walk
> you through how the system fits together and why it's split the way it is."*

**The boundary you never cross:** don't claim authorship of the .NET services, the batch jobs, the queue
infrastructure, or the auth design. Claim *fluency* in them. An interviewer respects "I integrated with
it and understand it" enormously; they will destroy an overclaim in two follow-ups.

**Where you can go deep without risk:** the 20 webpack bundles, `window.globalObject` server→React data
injection, the Redux-vs-hooks split, the IE11 constraint, the axios service layer, SignalR notifications.
That's Module 3 and it's your strongest material — a genuinely unusual frontend architecture with real
tradeoffs to discuss.

## 8. Facts I must never get wrong

- Domain: **corporate relocation / destination services.** Not real estate. Not HR software.
- Flagship product: **Odin** — "Dwellworks' Destination Software."
- Central entity: the **Order** (one relocation assignment). Kicked off by an **authorization**.
- The end user is the **transferee** (the relocating employee); the *buyer* is often an **RMC** or a
  corporate employer. **Both are real users of the product** — the RMC gets its own reporting surface.
- Four audiences: buyer (corporate/RMC) · transferee · internal consultants & program managers ·
  supplier network.
- The service spine: **authorization → order → consultant assigned → intake → area orientation → home &
  school finding → lease → settling in → tenancy management → departure → billing.**
- Architecture in one line: **a .NET Framework monolith (Odin) with .NET Core services carved off around
  it**, shared JWT identity, Azure Queues for async.
- My role: **frontend-heavy on Odin**, integrating with the whole platform.
- **I do not know the commercial model from the code** — §4 is mine to fill or to decline.

---

## 9. The service map — who owns what

> **Added 2026-08-11, after the D20 drill.** Asked *"what did you build?"*, the answer was a confident
> seven-service tour with **four service-ownership claims wrong and one unverified**. The errors are
> listed at the bottom — but read the whole map first. **Patching five sentences is not the fix; owning
> the map is.** An interviewer who hears one wrong ownership claim starts checking all of them.
>
> **The rule this protects:** claim *fluency* in the services, never *authorship*. Fluency you get wrong
> is worse than fluency you decline — *"I'd have to check, I was on the front end"* costs nothing.

### The repos

`Odin` is **one of nine**. Eight are named in the sources below; **the ninth is not identified in this
module — get it off the repo list and fill it in here.** Do not guess it in a room.

| Repo | Stack | What it owns |
|---|---|---|
| **Odin** ⭐ | .NET Framework 4.6.1 · MVC 5 + Web API 2 · EF6 · Ninject · OWIN | **The domain and almost all of it.** Orders, transferees, tasks, appointments, leases, departures, tenancy, visa, payments, billing, reporting. **Plus the entire front end — your scope.** |
| **ClientAPI** | .NET, integration boundary | **Authorizations** in and out. Talks to *external* systems: ServiceEngine, Destination, Aires. Seven batch console jobs + Azure Storage Queues. |
| **IdentityMicroservice** | .NET Core | **Issues JWTs; everything else only verifies them** against an RSA public key. Redis for revocation. Controllers: User, UserProfile, **Spark**, Brokerage. *The one genuine shared-service win.* |
| **PropertyMicroserviceCore** | ASP.NET Core 2.2, Dockerized, AKS (`propms-aks.yaml`) | **Home finding, school finding, lease.** JWT verify-only. Redis token validation. Azure Queue change trackers. |
| **StatsMicroservice** | .NET Core + SignalR + WebJob + Azure Function | **Statistics and reporting.** Lifecycle step 11 (billing + reporting), alongside Odin. |
| **NetworkManagementWeb** | .NET Core | **The supply side.** Brokerage, Supplier, Concierge, ServiceTeamAdmin, CoverageAreaAdmin, StationAgent, InternationalSupplier, OdinAdmin. |
| **DsInternal** | .NET Core | **Back-office reference data.** Contracts, CorpClientSurveys, Countries, Customers, NewMetroAreas. |
| **ECoordService** | .NET Core, Dockerfile, V1 controllers | Carved-off service. *Thin in this module — go read it before claiming its scope.* |
| **_(ninth)_** | — | **Unknown. Fill this in.** |

### The default is Odin

**When you don't know which service owns something, the answer is almost certainly Odin** — it's the
monolith and it holds the domain. Every one of tonight's four errors moved something *out* of Odin that
lives *in* Odin. Concretely, Odin owns:

- **Models** (`Odin.Data/Core/Models/`) — `AreaOrientationTask` · `SchoolFinding` · `TenancyManagement` ·
  `TenancyClaim` · `TenancyPayment` · `SettlingInTask` · `DepartureWalkthrough` · `DepartureDeposit` ·
  `DepartureRepair` · **`VisaImmigrationInfo`** · `RemovalService` · `AirportPickup` · `RentTask` ·
  `Appointment` · `Task` · `WorkflowStages` · `UserRoles`
- **Controllers** — Orders · Lease · Departures · FinalHousing · Itinerary · MyMove · Payments ·
  **ProgramPayments** · Reporting · **Spark** · SelectProperties · Notifications · TenancyManagement
- **Fee machinery** — `DscFeeCalculation` · `ConsultingDailyFee` · `ConsultingHourlyFee` ·
  `BrokerFeeType` · `AccountPayable` · `AccountReceivable`
- **All 20 webpack bundles**, including `spark-app`, `order-dashboard`, `payment`, `funds`,
  `tenancy-management`, `rmc-reporting`

### Where I got it wrong — 2026-08-11

| I said | Actually | Why it matters |
|---|---|---|
| *"ClientAPI — **authorization of users**"* | **Repo right, word wrong.** ClientAPI *is* the authorization repo. But **Authorization = the corporate's formal "yes, move this person, and here's what we'll pay for."** It is **not** login. Login/JWT is IdentityMicroservice — which I then said correctly two sentences later. | **Second miss on this exact term** (first: 07-30). I have both concepts and keep attaching the word to the wrong one. In a relocation interview this is the domain's signature vocabulary — getting it backwards is the tell that I learned the code and not the business. |
| *"Spark ← NetworkManagement"* | **Spark controller in IdentityMicroservice**, plus a **`Spark` controller and `spark-app` bundle in Odin.** NetworkManagement never touches it. | Spark is consultant assignment — a *core lifecycle step* (#3). Putting it in the supplier-admin app says I don't know where the main flow runs. |
| *"Visa + payments ← DsInternal"* | Both **Odin**. `VisaImmigrationInfo.cs`, `ProgramPaymentsController`, the `Payments` controller, the `payment` and `funds` bundles. DsInternal is contracts, corp surveys, countries, customers, metros. | Two lifecycle steps (#8 settling-in/visa, #11 billing) handed to a back-office reference-data app. |
| *"Visa ← PropertyMicroservice"* | Property = **home finding, school finding, lease.** Nothing else. | **Third time oversizing Property** (flagged 07-30, unresolved since). This one is now a habit, not a slip. |
| *"Order dashboard data ← Stats"* | ⚠ **UNVERIFIED — check before this ever enters a room.** The dashboard is grounded in **Odin**: `components/order-dashboard/store/` (`fetchOrders`, `getControlTowerOrders`), `signalrHoc.jsx`, `controlTowerHub`. Stats is .NET Core + SignalR for *statistics*. Both have SignalR, which is probably why they blurred. | **This is the dangerous one in the other direction — I may be giving away my own headline CV bullet** to a service I didn't write. Bullet 2 is the real-time operations dashboard. If Odin serves it, saying "Stats" hands my strongest work to someone else. |

### The verification pass — do this in an office block, not at midnight

Read-only, survives interruption, and it's the `load` half of the track. Run from the repo root:

```bash
# 1. The ninth repo — name it
ls

# 2. Spark: where does it actually live?
grep -ril "spark" --include=*.cs --include=*.jsx --include=*.js . | grep -v node_modules | head -30

# 3. Visa + payments: confirm they are Odin
find . -name "VisaImmigrationInfo.cs" -o -name "ProgramPaymentsController.cs" | grep -v node_modules

# 4. Property's REAL scope — read the controller list, do not infer it
ls PropertyMicroserviceCore/*/Controllers/

# 5. THE ONE THAT MATTERS: what backend serves the order dashboard?
grep -rn "getControlTowerOrders\|fetchOrders\|controlTowerHub" Odin/Scripts/react/src/components/order-dashboard/ | head -20
```

Step 5 first if the block gets cut short — it's the only one that touches a CV bullet.

**Then update this section, `defend-map.md` if a bullet's grounding moved, and clear the rows in
`cv-defense/progress.md`.** A verification you don't write down is a verification you repeat.

> **Shadow-resource reminder:** commits on this account are under `--author="avnit" --since=2025-06-01`,
> never his own name. That's for proving *authorship of a change* — it does not tell you who owns a
> service. Structure comes from reading the repos.

---

### Sources (grounding)

- **Product identity + stack:** `Odin/CLAUDE.md` §1–2; `Odin/README.md` ("Dwellworks' Destination
  Software").
- **Personas / roles:** `Odin/Odin.Data/Core/Models/UserRoles.cs` (Consultant, ProgramManager,
  Transferee, RmcUser, StationAgent, SelectAgent, GlobalSupplyChain, Accounting, Coordinator, Director);
  `Odin/CLAUDE.md` §1 key domain entities.
- **Service lifecycle:** `Odin/Odin.Data/Core/Models/` — `AreaOrientationTask.cs`, `SchoolFinding.cs`,
  `TenancyManagement.cs`, `SettlingInTask.cs`, `DepartureWalkthrough.cs`, `DepartureDeposit.cs`,
  `DepartureRepair.cs`, `VisaImmigrationInfo.cs`, `RemovalService.cs`, `AirportPickup.cs`,
  `RentTask.cs`, `Appointment.cs`, `Task.cs`, `WorkflowStages.cs`.
- **Tenancy detail box:** `Odin.Data/Core/Models/TenancyManagement.cs`, `TenancyClaim.cs`,
  `TenancyPayment.cs`; `Odin/Controllers/Api/TenancyManagementController.cs`;
  `Odin/Validators/TenancyManagement/`; `Odin/Scripts/react/src/components/tenancy-management/`
  (`TenancyManagement.jsx`, `claims/`, `payments/`, `TenancyErrorBoundary.jsx`);
  `Odin/Scripts/app/views/orders/program_details_components/tenancy_management*.js`;
  `Odin.Data/ClientApi/<RMC>/Dtos/` + `NotificationBuilders/`.
- **User-facing surfaces:** `Odin/CLAUDE.md` §3 webpack entry points (survey, school, discover,
  my-resources, resource-library, tenancy-management, rmc-reporting, feedback, payment, funds,
  help-center, pulse-check, admin, spark-app, order-dashboard, new-mymove, chatbot);
  `Odin/Odin/Controllers/` (Orders, Lease, Departures, FinalHousing, Itinerary, MyMove, Payments,
  ProgramPayments, Reporting, Spark, SelectProperties, Notifications).
- **RMC as a customer:** `RmcUser.cs`, `RmcAccessType.cs`, `RMCServiceEnum.cs`, `rmc-reporting` bundle.
- **Authorizations + external integrations:** `ClientAPI/CLAUDE.md` — ServiceEngine / Destination /
  Aires; `ClientAPI/ClientAPI/Controllers/AuthorizationsController.cs`, `AuthorizationsV2Controller.cs`;
  `ClientAPI/ClientAPI/Processors/` (Authorization, AuthorizationCancel, AuthorizationUpdate).
- **Fee/billing machinery (structure only, no amounts):** `DscFeeCalculation.cs`,
  `ConsultingDailyFee.cs`, `ConsultingHourlyFee.cs`, `BrokerFeeType.cs`, `AccountPayable.cs`,
  `AccountReceivable.cs`, `Odin/Odin/Controllers/ProgramPaymentsController.cs`.
- **Supply-side + internal admin:** `NetworkManagementWeb/NetworkManagement/Features/` and
  `ClientApp/` (Brokerage, Supplier, Concierge, ServiceTeamAdmin, CoverageAreaAdmin, StationAgent,
  InternationalSupplier, OdinAdmin); `DsInternal/DsInternal.Web/Features/` (Contracts,
  CorpClientSurveys, Countries, Customers, NewMetroAreas).
- **Architecture split:** `PropertyMicroserviceCore/CLAUDE.md` (ASP.NET Core 2.2, JWT verify-only
  against IdentityMicroservice, Redis token validation, Azure Queue change trackers, `propms-aks.yaml`);
  `ECoordService/ECoordService.API/` (Dockerfile, V1 controllers);
  `StatsMicroservice/` (.NET Core + SignalR + WebJob + Azure Function);
  `IdentityMicroservice/IdentityMicroservice/Controllers/` (User, UserProfile, Spark, Brokerage).
- **Business model:** *no source — deliberately blank.* §4 is Tarun's to supply.
