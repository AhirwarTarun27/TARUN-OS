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
| **Tenancy management** | Ongoing landlord/lease handling *during* the assignment |
| **Departure** | End-of-assignment move-out: walkthrough, repairs, deposit recovery |
| **Metro area** | The geographic unit the platform organizes coverage and pricing around |
| **Service team** | The pool of consultants/agents covering a given metro |
| **Spark** | The internal name for consultant (DSC) assignment — offering an order to a consultant and having them accept |

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
