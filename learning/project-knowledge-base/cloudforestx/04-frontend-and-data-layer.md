# Module 4 — Frontend Architecture & the Data Layer

**Goal:** defend every CloudForestX line on the CV to explanation level — the React SPA, the state
architecture, the data-viz layer, the typed API layer, **and the AWS→PostgreSQL ingestion path**.

Module 0 gave you the pitch. This is the engineering underneath it, and it is the module that carries
the CV. Unlike Dwellworks, this project is **fully TypeScript** and you touched **both ends** of it, so
it is the strongest project you have for a frontend-heavy full-stack role. Drill it hardest.

**Study until you can:** draw the ingestion pipeline from a customer's AWS account to a chart on screen,
explain STS assume-role cold, and answer "why did you build your own fetch hook?" with a race condition.

---

## 1. The shape of the front end

`cloudsaver-frontend-master` — Create React App (`react-scripts` 4.0.2), **not ejected**.

```
src/
├── pages/            40 page modules   (CostAnalysis, IdleInstances, RightSizing, ScheduleVM,
│                                        Reservations, Inventories, SecurityScan, RUM,
│                                        UptimeMonitoring, Invoice, TagBillingDetail, …)
├── components/       27 component modules (Dashboard, Navigation, Notifications, ReportTable,
│                                        AccountOnboarding, SelectAccount, ProtectedComponent, …)
├── services/         36 API modules    (APIService, HttpService + 34 domain services)
├── store/            Redux Toolkit     (userSlice, accountSlice, uiSlice, monthSlice, allOrgSlice)
├── hooks/            useFetchData, useEcharts, useSocket, useOnlineStatus, useCopyText,
│                     useModalZoomContext
├── context/          GlobalUserDataProvider
├── schemas/          shared TypeScript types + route definitions
├── superAdmin/       separate admin surface
├── Router.tsx        react-router v5 + ProtectedRoute
├── Socket.ts / socket-init.ts
└── ErrorBoundary.tsx
```

**Numbers you can quote:** **470 TypeScript files** — 356 `.tsx` + 114 `.ts` — and **zero JavaScript
files.** 40 pages, 27 component modules, 36 service modules, 5 registered Redux slices, 6 custom hooks.

**This is where your TypeScript claim lives.** Dwellworks has none. If an interviewer asks "where have
you used TypeScript in production?", the answer is this project, and the answer is total — the codebase
has no JS escape hatch.

---

## 2. State architecture — CV bullet 3

### The problem this solves

Every one of the 40 dashboards answers the same question in a different shape: *"for **this account**,
in **this month**, what is happening?"* Cost analysis, idle instances, rightsizing, invoices, reservations
— all of them are scoped by the same two selections. If each page owned its own account and month
picker, the user would re-select on every navigation and the pages would silently disagree.

### The solution

Two Redux Toolkit slices hold that selection globally, and every dashboard reads from them:

```ts
// store/index.ts
configureStore({ reducer: { user, account, ui, month, organization } });

export type RootState = ReturnType<typeof store.getState>;
export const accountState = (state: RootState) => state.account;   // typed selectors
export type AppDispatch = typeof store.dispatch;
```

```ts
// accountSlice — the global scope object
{ selectedAccount, isAccountSelected, selectedAccountName,
  selectedSubscriptionName, selectedAccountId, selectedSubscriptionId,
  selectedSubData, defaultCurrency: 'USD' }

// monthSlice — the global time scope
{ selectedMonth: getLastMonths()[0], monthOptions: getLastMonths() }
```

**Three details worth naming in an interview:**

1. **The `ALL_VALUE` sentinel.** `selectedAccountId` defaults to `ALL_VALUE`, not a real id. That is how
   "aggregate across every account in the tenant" is expressed with the same code path as "one account" —
   the API takes the sentinel and skips the account filter. No separate aggregate mode, no branching in
   40 pages.
2. **`defaultCurrency` lives in the account slice.** Cloud bills come back in the account's currency; the
   whole UI has to format consistently. Currency is a property of the selected scope, not of a component.
3. **`monthOptions` is derived once** from `getLastMonths()` at store init, so every month dropdown in
   the app offers the identical list.

### The follow-up: "why Redux Toolkit and not Context?"

> *"Because this is the definition of shared state — 40 pages read it and several can write it, and it
> changes often. Context re-renders every consumer on every change, which for a global filter touching
> every dashboard is exactly the wrong shape. Redux gives me selector-level subscriptions so a component
> only re-renders when the slice it selected actually changed. I did use Context, but for things that
> almost never change — the global user data provider and a zoom context inside one chart modal. That
> split is deliberate: Context for stable values, Redux for hot shared state."*

That answer shows you know *why* the tools differ, not just that both exist.

### "Why Redux Toolkit and not plain Redux?"

`createSlice` collapses action types, action creators and reducers into one declaration and uses Immer
so you can write `state.selectedMonth = x` instead of hand-rolling immutable spreads. It also ships
`configureStore` with sane defaults (thunk, devtools, immutability checks). Less boilerplate, fewer
places to make a mistake. **Note the CV says Redux Toolkit, not Redux — keep it that way.**

---

## 3. The data layer — CV bullet 5

### Three layers, on purpose

```
APIService.create()          builds a configured axios instance (base URL, auth, credentials)
      ▲
HttpService                  thin verb wrapper: get / post / put / patch / delete
      ▲
34 domain services           CostAnalysis, IdleInstanceService, RightSizingService,
                             InvoiceService, ReservationsService, SecurityScanService, …
```

**Why the split matters:** a change to auth headers, base URL or error handling happens in **one** file,
not 34. The domain services stay declarative — they name an endpoint and a shape, nothing else.

### `useFetchData` — the bullet's real content

This is your own generic replacement for what TanStack Query would do, and the part that makes it a
senior bullet is the **race guard**:

```ts
export const useFetchData = <T, Args extends any[] = []>({
  fetchData, dependencies = [], fetchOnMount,
}: UseFetchDataOptions<T, Args>) => {
  const requestIdRef = useRef(0);

  const fetch = useCallback(async (...args: any) => {
    const currentRequestId = ++requestIdRef.current;     // ← claim this request
    setLoader(true); setError(null);
    try {
      const result = await fetchData(...args);
      if (currentRequestId === requestIdRef.current) setData(result);   // ← only if still latest
    } catch (e: any) {
      if (currentRequestId === requestIdRef.current) {
        setError(e);
        if (e !== ERRORS.NETWORK_ERROR && e?.error?.message) handleError(e, history);
      }
    } finally {
      if (currentRequestId === requestIdRef.current) setLoader(false);
    }
  }, [fetchData, history]);

  useEffect(() => { if (fetchOnMount || dependencies.length > 0) fetch(); }, dependencies);

  return { data, loader, error, fetch };
};
```

**The bug it prevents — tell it as a story:**

> *"A user is on the cost dashboard and switches from Account A to Account B. That fires request A, then
> request B. If A's response is slow and lands after B's, `setData` runs twice and the screen ends up
> showing Account A's costs while the picker says Account B. On a cost tool that is worse than an error —
> the number looks plausible and it's wrong. So every call takes a monotonically increasing request id,
> and the response only commits state if its id is still the latest. Stale responses are dropped
> silently."*

**Why this is worth a CV bullet:** stale-response races are invisible in testing, only show up under
real latency, and produce *wrong data that looks right*. Recognizing that class of bug and fixing it
structurally — once, in a shared hook, for 36 services — is a senior instinct.

**Follow-ups to expect:**
- *"Why not AbortController?"* → *"Aborting is better when you also want to stop the network work, and
  I'd use it today. The request-id guard is a superset in one respect: it also protects against
  out-of-order responses that both completed. In practice I'd combine them — abort on unmount, guard on
  commit."*
- *"Why not TanStack Query?"* → **the honest answer**: *"It wasn't in the project, and adding a
  dependency to a CRA app mid-flight wasn't a call I was going to make unilaterally. What I built covers
  the loading/error/refetch surface we needed. TanStack Query would have given us caching, dedup and
  background revalidation for free, and that's what I'd reach for on a greenfield app."* **Never claim
  you used it — it is not in `package.json`.**
- *"What does it not do?"* → No cache, no request dedup, no background refetch, no pagination
  primitives. Know your own gaps; it reads as maturity.

---

## 4. The visualization layer — CV bullet 4

Four charting libraries, each for a reason:

| Library | Used for |
|---|---|
| **ECharts** 5.4.2 | the heavy interactive charts — large series, zoom, geo maps |
| **Recharts** 2.0.9 | standard React-composable charts (bar/line/area) |
| **react-gauge-chart** | gauge widgets (utilization dials) |
| **react-google-charts** | remaining chart types |
| `components/flagMap` | country/region visualization |

### `useEcharts` — the reusable wrapper

```ts
const useECharts = (option: echarts.EChartsOption, deps: any[] = [], config: UseEChartsOptions = {}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null);
  const { renderer = 'canvas', autoResize = true, devicePixelRatio = window.devicePixelRatio } = config;
  // init once, keep the instance, set option on deps change, resize on window resize, dispose on unmount
};
```

**Why a hook and not a component:** ECharts is an imperative library — it owns a DOM node, holds an
instance, and needs `setOption` / `resize` / `dispose` called at the right times. Wrapping that
lifecycle in a hook means every chart in the app gets correct init, resize and teardown for free, and
the calling component only supplies an `option` object.

**The detail to name:** `renderer: 'canvas' | 'svg'` and `devicePixelRatio`. Canvas is right for large
datasets (thousands of points); SVG is right when you need crisp text or DOM-level accessibility.
Exposing the choice per chart instead of hard-coding one is why the hook is reusable.

> **Q: "Why four chart libraries? Isn't that bloat?"**
> *"It is, and it accumulated rather than being designed — ECharts and Recharts genuinely cover different
> needs, but gauge-chart and google-charts were each pulled in for one widget. If I were consolidating
> I'd standardize on ECharts, since it can do everything the other three do, and drop about 200KB of
> dependencies."* **Volunteering this is better than being caught by it.**

---

## 5. The ingestion pipeline — CV bullet 2 (the one that raises your bar)

This is the bullet an interviewer will spend the most time on, because it is the least common thing on
your CV. Learn the whole flow.

```
1. Customer onboards an AWS account
      creates an IAM role in THEIR account that trusts OUR account
      │
2. STS AssumeRole            authSTSClient() → temporary credentials (short-lived)
      │                      ← we never store the customer's long-lived keys
3. Client factory            switch on AWS_CLIENT_NAME → the right SDK v3 client, per region
      EC2 · EBS · S3 · EFS · RDS · ELBv2 · ElastiCache · ECS · CloudWatch · Pricing · Resource Groups
      │
4. Scheduled jobs            node-cron + Bull, per account, per region
      awsResourceSyncService · awsUsageService · awsIdleResourceService
      awsRightSizingService · awsInvoiceService · awsForecastService
      │
5. Normalize → PostgreSQL    Sequelize models
      IdleEFS { AccountId, Region, FileSystemId, CapacityUsed,
                PredictedMonthlyCost, CurrencyCode, Status, IsActive, … }
      IdleS3Bucket · IdleInstanceDetails · IdleFSx · IdleS3Glacier · rightsizing · inventory ·
      invoice · metrics · reserved · scheduling · previousGeneration
      │
6. REST endpoints            cloudsaver-master (Express + TS)
      │
7. React SPA                 36 service modules → 40 dashboards
```

### The three questions you will be asked

**Q1: "How do you get access to a customer's AWS account?"** — the multi-tenancy question.

> *"Cross-account IAM roles, not credentials. The customer creates a role in their account with a trust
> policy naming our account as principal, plus an external ID, and attaches a read-only policy. We call
> STS AssumeRole against that role ARN and get back temporary credentials — access key, secret, and a
> session token that expires. Every SDK client we build for that customer is constructed with those
> temporary credentials. The point is we never hold anything long-lived belonging to the customer: if
> they revoke the role, our access is gone immediately, and there is no secret of theirs sitting in our
> database to leak."*

Know these three terms: **role ARN**, **trust policy**, **external ID** (the confused-deputy guard).

**Q2: "How do you know an instance is idle?"** — the one that proves you understand the domain.

> *"You can't tell from EC2. `DescribeInstances` tells you an instance exists, its type and its state —
> nothing about whether it's doing work. Idle comes from **CloudWatch**: you pull the utilization metrics
> for that instance over a window — CPU, network in/out, sometimes disk — at a given period and
> statistic, and apply a threshold over time. So idle detection is a metrics query joined onto an
> inventory query, and the inventory tells you what to ask CloudWatch about."*

Then the money step:

> *"Knowing it's idle isn't the product. The product is 'this is costing you $X a month.' That's the
> **Pricing API** — you take the resource's type, region and platform, look up the rate, and compute a
> predicted monthly cost. That's why the tables have a `PredictedMonthlyCost` column: the finding and
> its dollar value are stored together, because the dollar value is what the buyer acts on."*

**Q3: "Hundreds of accounts, many regions — how does that not take forever or get rate-limited?"**

The honest, senior answer:

> *"It fans out badly if you're naive about it — it's accounts × regions × services, and AWS APIs are
> paginated and throttled per account. The shape that works is: run it as scheduled background jobs
> rather than on request, so nothing user-facing ever waits on AWS; queue the work per account so one
> slow tenant doesn't block others; paginate every list call properly; and respect throttling with
> backoff and retry. The dashboards then read from PostgreSQL, never from AWS directly — the sync
> frequency is the freshness tradeoff, and for cost data, hours-old is fine because billing itself
> lags."*

**That last sentence is the key architectural insight:** *the UI never calls AWS.* It reads a database
that a scheduler keeps warm. Say it explicitly — it explains the entire system in one line.

### AWS services, short form, for the room

| Service | What it gives the product |
|---|---|
| **STS** | cross-account temporary credentials — the multi-tenancy mechanism |
| **EC2** | instance inventory, types, state, volumes, Elastic IPs |
| **CloudWatch** | utilization metrics — the basis of idle + rightsizing |
| **EBS** | volumes, including unattached ones |
| **S3** / **Glacier** | buckets, storage class, idle-storage detection |
| **EFS** / **FSx** | file systems and capacity used |
| **RDS** | managed databases |
| **ELBv2** | load balancers, including empty ones |
| **ElastiCache**, **ECS**, **EKS**, **Lambda** | further inventory surface |
| **Pricing** | rate lookup → predicted monthly cost |
| **Auto Scaling**, **Resource Groups**, **CloudTrail** | scaling groups, tagging, activity |

**Do not recite this list.** Name **STS, EC2, CloudWatch, EBS, S3 and Pricing** and explain what each
one *does for the product*. Six services you can explain beats twenty you can only list.

### The boundary — hold it

You built the **ingestion and API path**: assume-role, SDK clients, sync jobs, Sequelize models,
endpoints. The **recommendation algorithms** — what threshold makes something idle, which instance type
to rightsize to, which reservation to buy — are 🔴. Say:

> *"I built the pipeline that gets the data in and serves it out. The recommendation logic — the
> thresholds and the sizing rules — sat with the team that owned the analysis side. I know how it
> consumed what I stored, but I'd be overclaiming if I said I designed the algorithms."*

---

## 6. Real-time, routing, and the rest

**Socket.IO** — `Socket.ts` creates the client with `withCredentials: true`; `useSocket<T>` is a generic
hook that subscribes to one event and **removes the listener on unmount**:

```ts
const useSocket = <T>(event: string, callback: EventCallback<T>): Socket | null => {
  useEffect(() => {
    const newSocket = initializeSocket();
    if (newSocket && event && callback) newSocket.on(event, callback);
    return () => { if (newSocket && event) newSocket.off(event, callback); };
  }, [event, callback]);
};
```

The cleanup is the point — without `off`, every remount stacks another listener and one server event
fires the handler N times. (Same bug class you solved in Odin's SignalR HOC with `_upsertCallbacks`.
**Noticing the same failure mode in two different real-time stacks is a great thing to say.**)

**Routing + RBAC** — `react-router` v5, `ProtectedRoute` wrapping authenticated pages, `ProtectedComponent`
for element-level permission gating, a separate `superAdmin/` surface, plus `Error403` / `Error404`.

**Also present:** a PWA service worker (`service-worker.ts`, `serviceWorkerRegistration.ts`),
`ErrorBoundary.tsx`, `reportWebVitals.ts`, `react-window` virtualization in Notifications,
`react-lazyload` in UsersList, four env files (development / staging / preprod / production) via
`env-cmd`, Docker + nginx, and GitLab CI.

---

## 7. Honest weaknesses — volunteer these

Naming a flaw before the interviewer finds it converts a liability into evidence of judgment.

1. **No test suite.** One file, `App.test.tsx`, and it is the untouched CRA default. *"There was no
   frontend test culture on that codebase. I test my own projects with Vitest and I'd push for coverage
   on critical paths — the cost calculations especially — anywhere I joined."*
2. **Create React App, not ejected.** The build is whatever CRA gives you. No bundle analysis, no custom
   webpack. `React.lazy` appears in exactly one file.
3. **Two Material-UI major versions installed at once** (`@material-ui/*` v4 and `@mui/*` v5) — a
   migration that was started and not finished. Plus Tailwind config alongside. Three styling systems.
4. **Four chart libraries** (§4).
5. **`planSlice.ts` exists but is not registered** in `configureStore` — dead code.
6. **`analytics.ts` is abandoned** — it POSTs to a hard-coded `localhost:9000` with a hard-coded IP and
   timestamp. Never cite this as analytics work; it does not run.

> **The framing that makes weaknesses land well:** *"It's a fast-moving product team, and some of this is
> what accumulates when you're shipping features for two years without a cleanup budget. I can tell you
> exactly what I'd fix first and why."* Then lead with the tests.

---

## 8. The CV bullets — drill sheet

### Bullet 1 — "Built the React and TypeScript SPA behind 40 cost dashboards spanning waste detection, rightsizing, reservations and power scheduling."
- **Mechanism:** 470 TS files / zero JS, 40 page modules, 27 component modules, CRA + react-router v5,
  `ProtectedRoute` RBAC.
- **Follow-ups:** *How do you keep 40 pages consistent?* (shared components + global filter, §2) ·
  *What's the hardest screen?* (pick one: cost analysis with multi-series ECharts over a large dataset) ·
  *How is the app structured?* (pages / components / services / store / hooks).
- **Boundary:** the waste-detection **surfaces** are yours; the detection **algorithms** are 🔴.

### Bullet 2 — "Built Node.js ingestion and REST APIs that pull EC2, EBS, S3 and CloudWatch data via STS cross-account roles into PostgreSQL."
- **Mechanism:** §5 — assume-role → SDK v3 client factory → node-cron/Bull jobs → Sequelize models →
  Express endpoints.
- **Follow-ups:** all three in §5, plus *"why PostgreSQL and not a time-series DB?"* → *"The queries are
  relational — join a resource to its account, its tenant and its price, and filter by month. Metrics
  are pre-aggregated before they land, so we're storing findings, not raw time series. A TSDB would be
  the right call if we kept the raw CloudWatch datapoints."*
- **Boundary:** recommendation algorithms 🔴 (§5, last block).

### Bullet 3 — "Architected global account and month filtering in Redux Toolkit, keeping every dashboard in sync from a single selection."
- **Mechanism:** §2 — `accountSlice` + `monthSlice`, typed `RootState` selectors, `ALL_VALUE` sentinel,
  `defaultCurrency` on the scope.
- **Follow-ups:** *Why Redux over Context?* (§2) · *Why RTK over Redux?* (§2) · *What happens on account
  switch?* → **this is where you tell the race-condition story from §3** — the two bullets connect, and
  connecting them is what a senior candidate does.

### Bullet 4 — "Built the data-visualization layer -- charts, gauges, geo maps -- on ECharts and Recharts behind a reusable chart hook."
- **Mechanism:** §4 — `useEcharts` lifecycle hook, canvas/svg renderer, devicePixelRatio, autoResize.
- **Follow-ups:** *Why ECharts over Recharts for some charts?* (imperative + large series + geo) ·
  *Why four libraries?* (§4 — volunteer it as a flaw) · *How do you handle a chart with thousands of
  points?* (canvas renderer; ECharts handles large series far better than SVG-based React charts).

### Bullet 5 — "Built a typed API layer and a generic fetch hook with request-id guards, eliminating stale-response races across 36 service modules."
- **Mechanism:** §3 — APIService → HttpService → 34 domain services; `useFetchData<T, Args>` with
  `requestIdRef`.
- **Follow-ups:** *What race?* (tell the account-switch story) · *Why not AbortController?* (§3) ·
  *Why not TanStack Query?* (§3 — **never claim you used it**) · *What doesn't your hook do?* (§3).

---

## 9. Facts I must never get wrong

- **470** TypeScript files (356 `.tsx` + 114 `.ts`), **zero** `.js`/`.jsx`. **40** pages, **27** component
  modules, **36** service modules, **5** registered slices, **6** custom hooks.
- Product = **CloudForestX**; repos = **CloudSaver / cfx-**. Cloud **cost optimization**, **multi-tenant**,
  **AWS** (don't claim Azure — the backend has Azure SDKs, but that isn't what you worked on).
- State = **Redux Toolkit**, 5 slices: user, account, ui, month, organization. **Zustand does not exist
  here or anywhere else — never say it.**
- **TanStack Query / React Query does not exist here.** Never say it.
- **No test suite** — one CRA-default file. **React Testing Library is not a claim you can make.**
- CRA `react-scripts` **4.0.2**, not ejected. `React.lazy` in **one** file. **No bundle metric exists —
  the "40%" claim was deleted on 2026-07-24 and may not return.**
- Cross-account access = **STS AssumeRole** with a trust policy and external ID. Not stored keys.
- Idle detection = **CloudWatch metrics** over a window, not EC2 inventory. Cost = **Pricing API** →
  `PredictedMonthlyCost`.
- The dashboards read **PostgreSQL**, never AWS directly. Scheduled jobs keep it warm.
- ORM = **Sequelize**; driver = **pg**. Queues = **Bull**; scheduling = **node-cron**; cache = **Redis**.
- Real-time = **Socket.IO** (not SignalR — that's Dwellworks).
- Team **6**, **Jul 2023 – May 2025**, Senior Frontend Developer.

---

### Sources (grounding)

- **Frontend shape:** `cloudsaver-frontend-master/src/` — `pages/` (40), `components/` (27),
  `services/` (36), `hooks/`, `store/`, `Router.tsx`, `tsconfig.json`, `package.json`.
- **State:** `store/index.ts` (`configureStore`, typed `RootState`/`AppDispatch`/selectors),
  `store/accountSlice.ts` (`ALL_VALUE`, `defaultCurrency`), `store/monthSlice.ts` (`getLastMonths`),
  `store/uiSlice.ts`, `userSlice.ts`, `allOrgSlice.ts`.
- **Data layer:** `services/APIService/APIService.ts`, `services/HttpService/HttpService.ts`,
  `hooks/useFetchData.tsx` (`requestIdRef` race guard, `handleError` + history redirect).
- **Charts:** `hooks/useEcharts.tsx`; `package.json` — echarts 5.4.2, recharts 2.0.9,
  react-gauge-chart, react-google-charts; `components/flagMap/`.
- **Real-time:** `Socket.ts`, `socket-init.ts`, `hooks/useSocket.ts` (generic + `off` cleanup).
- **Routing/RBAC:** `Router.tsx`, `components/AuthenticatedRoute/AuthenticatedRoute.tsx`,
  `components/ProtectedComponent/`, `superAdmin/`, `pages/Errors/403.tsx` + `404.tsx`.
- **Ingestion:** `cfx-aws-initial-fetch-master/src/authentication/auth.ts` (STS client, client factory
  switch on `AWS_CLIENT_NAME`), `src/controllers/aws/*` (15 controllers incl. idle, rightsizing, unused,
  reserved, forecasting, invoice, usage/pattern analysis), `src/cron/aws/*` (18 jobs incl.
  `awsResourceSyncService`, `awsUsageService`, `awsIdleResourceService`, `awsRightSizingService`,
  `instanceSchedulingService`), `src/models/aws/*` (idle/, rightsizing/, inventory/, invoice/, metrics/,
  scheduling/, previousGeneration/, reserved), `src/models/aws/idle/idleEFS.ts` (Sequelize model with
  `PredictedMonthlyCost`), `src/authentication/dbConfig` (Sequelize).
- **Backend stack:** `cloudsaver-master/package.json` — express, pg, sequelize, bull, node-cron, redis,
  socket.io, stripe, `@aws-sdk/client-*` (24 clients), swagger.
- **Weaknesses:** `src/App.test.tsx` (CRA default), `package.json` (`react-scripts` 4.0.2, MUI v4 + v5,
  4 chart libs), `store/planSlice.ts` (unregistered), `src/analytics.ts` (hard-coded localhost:9000).
