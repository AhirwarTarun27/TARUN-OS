# Module 3 — Odin Frontend Architecture

**Goal:** defend every Dwellworks line on the CV to explanation level, and be able to draw the front-end
architecture on a whiteboard cold.

This is **your domain** and the module drilled hardest. Module 0 taught you the business; this teaches
the thing you actually built. It is also a genuinely unusual architecture — 20 independent React SPAs
embedded in a .NET Framework Razor monolith under an IE11 constraint — which means it is *interesting*
to an interviewer in a way a standard CRA app is not. Lean into it.

**Study until you can:** draw the bundle architecture, explain why it is 20 bundles and not one SPA,
trace one piece of data from the database to a React component, and answer all six CV bullets with a
mechanism, not an adjective.

---

## 1. Where the front end sits

Odin is one repo of nine. Inside it, the front end is **not** a separate application — it lives inside
the ASP.NET MVC project:

```
Odin/                                  # the .NET web app
├── Views/                             # Razor .cshtml — the pages the server renders
├── Content/                           # SCSS → CSS (80+ compile entries), images, fonts
└── Scripts/
    ├── app/                           # legacy: jQuery + Vue.js components
    │   └── components/
    │       └── vue-ctk-date-picker-patch.js
    └── react/                         # ← the React front end
        ├── webpack.common.js          # 20 entry points, aliases, IE11 alias
        ├── webpack.dev.js / .prod.js
        ├── .babelrc                   # preset-env + preset-react
        ├── .nvmrc                      # Node 12.18.1
        └── src/
            ├── components/
            │   ├── shared/            # 78 files — the component library
            │   ├── survey/            # 43 files — 8-step intake wizard
            │   ├── resource-library/  # 31 files
            │   ├── order-dashboard/   # 28 files — Control Tower, own Redux store
            │   ├── discover/          # 28 files — map-based search
            │   ├── school/            # 24 files
            │   ├── spark-app/         # 18 files — consultant assignment
            │   └── ...  (20 feature folders total)
            ├── services/              # 14 API modules + axios.config.js
            ├── hooks/
            ├── constants/
            └── utils/                 # incl. seq-logger.js
```

**Scale, in numbers you can quote:** 409 `.js`/`.jsx` files, 20 webpack entry points, 78 shared
component files, 14 API service modules, 7 error boundaries, 156 reads of `window.globalObject`.

**There is no TypeScript here.** Zero `.ts`/`.tsx`, no `tsconfig.json`. If a JD asks for TypeScript,
your evidence is CloudForestX and your own projects — **never** this one. Say so plainly if asked.

---

## 2. The 20-bundle architecture — the thing to get right

### What it actually is

Each feature is a **separate webpack entry point** that compiles to its own bundle, and each bundle
mounts into a `<div id="react_[name]">` placed inside a Razor view:

```
webpack.common.js entry: { survey, school, service, discover, my-resources,
  resource-library, tenancy-management, rmc-reporting, feedback, payment, funds,
  help-center, pulse-check, admin, spark-app, order-dashboard, new-mymove,
  spark-app-accept, chatbot, spark-app-program-offer-page }        ← 20

output: dist/[name]/[name].bundle.js
```

So the request flow for one page is:

```
Browser requests /Spark
      │
      ▼
ASP.NET MVC routes → SparkController → Razor view (Spark.cshtml)
      │
      ├─ server renders the page shell, nav, layout   (HTML arrives complete)
      ├─ injects a JSON blob into window.globalObject (user, roles, API URLs, order ids, keys)
      └─ includes <script src="dist/spark-app/spark-app.bundle.js">
      │
      ▼
React bundle boots → reads window.globalObject as APP_CONFIG
                   → ReactDOM.render(<App/>, document.getElementById("react_spark"))
                   → axios calls Web API 2 endpoints for everything else
```

### The three words you must never use for this

| Wrong word | Why it's wrong | Say instead |
|---|---|---|
| **"hydration"** | Code calls `ReactDOM.render`, never `ReactDOM.hydrate`. There is no React SSR — the server renders *Razor*, not React. Nothing is being hydrated. | "each bundle mounts client-side into a server-rendered page, bootstrapped from a server-injected config object" |
| **"code-splitting"** | No `splitChunks` in the webpack config, zero `React.lazy`, zero dynamic `import()`. | "20 independent entry bundles, one per page" |
| **"micro-frontend"** | No independent deployment, no module federation, no runtime composition. They ship together in one .NET deploy. | "embedded SPAs" or "islands" |

**Why this matters:** every one of those three words invites a follow-up you would lose, and losing it
costs you more than the word bought. The honest version is *also the more interesting story*.

### Why 20 bundles and not one SPA — your answer

This is the #1 architecture question you will get on this project. Answer:

> *"Because the app was already a server-rendered .NET Framework monolith with hundreds of Razor pages,
> and we were modernizing it page by page rather than rewriting it. Making it one React SPA would have
> meant moving routing, auth and layout out of ASP.NET all at once — a rewrite the business was never
> going to fund. So each page that needed rich interactivity got its own React bundle mounted into the
> existing Razor view. The server keeps owning routing and auth; React owns the interactive surface."*

Then the tradeoffs, unprompted — this is what makes it a senior answer:

**What it bought us**
- Incremental migration. A page could go React without touching the other 200.
- Each page downloads only its own bundle, not one monolithic app bundle.
- Server-side auth and routing stay in one place, so there is no duplicated auth model in the client.
- Blast radius is one page. A broken bundle cannot take down the whole product.

**What it cost us**
- **Duplication.** React, Redux, axios and moment ship inside every bundle. No shared vendor chunk, so a
  user visiting five pages downloads React five times. *(This is the honest weakness — name it before
  they find it.)*
- No client-side routing between features, so every navigation is a full page load.
- No shared in-memory state across bundles. State that must survive navigation goes to the server.
- 20 builds to keep healthy.

**What I'd change** — the single highest-leverage fix is a webpack `splitChunks` vendor chunk so React
and friends are downloaded once and cached across all 20 pages. That is a config-level change, not a
rewrite, and it would cut repeat-visit payload substantially. *(Say "substantially", not a number. You
have not measured it.)*

---

## 3. Server → client data flow: `window.globalObject`

The Razor view injects a JSON payload before the bundle loads. React reads it at mount as `APP_CONFIG`.
It is read in **156 places** across the source.

```js
const APP_CONFIG = window.globalObject || {};
```

Three bundles use their own globals: `window.sparkProgramOfferPageObject`, `window.sparkAcceptObject`.

**What travels in it:** the current user and role, order/transferee ids, API base URLs for the
downstream services, the SignalR hub endpoint, and third-party keys (Google Maps, Umbraco).

**Why it exists:** it saves a round trip. The page already knows who you are and what order you are
looking at, so shipping that in the HTML avoids an extra API call before the UI can render anything.

**The follow-up you will get: "isn't a global a code smell?"**

> *"Yes, and it has real costs. It couples every bundle to a server contract that isn't typed or
> versioned, and it means React components can't be tested in isolation without mocking a global. If I
> were doing it again I'd at least parse it once into a typed config module at the entry point, so there
> is one place that knows the shape instead of 156 reads scattered through components. The pattern
> itself — server-injected bootstrap state — is sound and it's what Next.js does with
> `__NEXT_DATA__`; the problem is that ours is untyped and read everywhere."*

That answer shows you know the pattern is legitimate *and* that you can see its flaws. That is the
senior register.

---

## 4. State management — the three-way split

There is no single state strategy, and knowing *why* each is where it is matters more than knowing they exist.

| Approach | Where | Why there |
|---|---|---|
| **Redux + thunk** | `order-dashboard` (Control Tower) — its own store at `order-dashboard/store/` | Live data pushed from SignalR has to land somewhere many components read. Actions + effects + a normalized order list is the right shape for that. |
| **Redux + redux-form** | `survey` and other form-heavy bundles — main store at `components/store/` | An 8-step wizard needs form state to survive step changes. redux-form was the era-appropriate answer. |
| **Local hooks** | Most components | Default. `useState`/`useEffect`/`useCallback`. Redux is not required for new features. |
| **Context** | `LoggerContext` | Cross-cutting concern, injected once, read anywhere. Exactly what Context is for. |

**The defensible position:** *"Redux where state is shared and pushed from outside the component tree;
local state everywhere else. Most screens genuinely don't need a store, and putting them in one would
have added ceremony without buying anything."*

**If they push on redux-form:** it is legacy and deprecated. Newer forms use `react-hook-form`. If you
were starting today you'd use react-hook-form or Formik everywhere and keep form state out of Redux
entirely — form state is local by nature, and putting it in a global store was the industry's mistake,
not just ours.

---

## 5. The shared component library — CV bullet 3

`components/shared/` is 78 files and is consumed by all 20 bundles. The pieces worth naming:

```
shared/
├── form/            15 files — Form.jsx, FormContext.js, and typed field components:
│                    TextField, SelectField, DateField, CheckboxField, RadioField,
│                    TextAreaField, AutoCompleteField, InputSlider
├── fields/          a second, simpler field set (Field, TextField, SelectField, DateField…)
├── render-field/    redux-form render adapters (renderField, renderSelectField,
│                    renderPhoneField, checkboxGroup, multiDatePicker)
├── grid/            AdvancedGrid.jsx, pagination.js, CellErrorBoundary.jsx, select-drop-down.jsx
├── virtual-select.js  react-select + react-window FixedSizeList
├── discover-map/    Google Maps views
├── auto-suggest/, location-autosuggest.js, basic-location-autosuggest.js
├── date-picker/, tab/, header/, subheader/, breadcrumbs.js, accordion.js, Modal.js
├── GlobalErrorBoundary.jsx
└── react-contexts/logger.context.js
```

### The one to lead with: `virtual-select.js`

It wraps `react-select` and replaces its `MenuList` with a `react-window` `FixedSizeList`:

```js
const height = 35;
<List height={minHeightOfMenu} itemCount={children.length}
      itemSize={height} initialScrollOffset={options.indexOf(value) * height} />
```

**Why it exists:** dropdowns in this product are things like *every metro area* and *every consultant*.
Rendering thousands of `<option>` nodes froze the browser — and remember the target browser includes
**IE11**, so there was no headroom. Virtualization renders only the visible ~15 rows.

**The detail that shows you actually wrote it:** `initialScrollOffset` is computed from the index of the
currently-selected option, so reopening the dropdown lands on the current value instead of scrolling to
the top. And `shouldComponentUpdate` is bound from react-window to stop the menu re-rendering on every
keystroke.

> **Q: "Why not just paginate the dropdown or use a search-as-you-type endpoint?"**
> *"Search-as-you-type is the better answer when the list is genuinely unbounded, and we do that for
> consultant search. But for a fixed reference list like metro areas the data is small enough to send
> once and big enough to kill the DOM, so virtualizing was cheaper than adding an endpoint and a
> loading state to every dropdown."*

### The rest of the library — the reuse argument

The value isn't any single component, it is that **20 independently-built bundles present one UI**. A
field validates the same way, a grid paginates the same way and a date picker behaves the same way
whether you are in Spark or the intake survey. Without the shared layer, 20 bundles drift into 20
products.

---

## 6. Real-time: the Control Tower — CV bullet 2

The Control Tower (`order-dashboard`) is a live operations dashboard for **program managers**. Every
active relocation appears as a row, and the state updates without a refresh.

### The users, precisely

It is **program managers**, not consultants and not families. The hub registers by `programManagerId`.
Getting this wrong is the single most catchable error, because the code says it plainly:

```js
service.registerUser(selectedManager.id);
```

### Service Radar

The dashboard's headline widget classifies every program into four buckets with live counts and
percentages, and each is click-to-filter:

| Bucket | Meaning |
|---|---|
| **Sad Programs** | at-risk — something is slipping |
| **Happy Programs** | healthy |
| **On-Hold Programs** | paused |
| **Unknown Programs** | insufficient signal to classify |

A program manager opens one screen and immediately sees *which moves need attention today* instead of
reading a table of 200 orders. **That is the product value — lead with it, not with the widget.**

### The SignalR layer — `signalrHoc.jsx`

Architecture: a singleton `SignalrService` class wrapped in a **higher-order component** that injects
connection lifecycle into the dashboard.

```
SignalrService (singleton)
  ├── connect()          HubConnectionBuilder().withAutomaticReconnect().withUrl(hub)
  ├── start()
  ├── bindEvent(name,cb) validates against a whitelist (EventNames.UpdateControlTower)
  ├── _upsertCallbacks() removes the old handler before adding a new one  ← prevents duplicate handlers
  ├── registerUser(pmId) / unRegisterUser(pmId)
  └── onReconnect / onReconnecting / onClose

withSignalr(Component)
  ├── on "UpdateControlTower" → dispatch(updateControlTower(JSON.parse(message)))
  ├── on reconnecting/close   → dispatch(controlTowerDisconnected(true))   → UI shows disconnected
  └── on reconnect            → dispatch(controlTowerDisconnected(false))
                              → service.registerUser(id)
                              → dispatch(fetchOrders(...))   ← full refetch
```

**The three things that make this a senior bullet:**

1. **Auto-reconnect** via `withAutomaticReconnect()` — the connection heals itself.
2. **Honest UI during a drop.** `controlTowerDisconnected(true)` is dispatched on both `onreconnecting`
   and `onclose`, so the operator is *told* the data is stale rather than trusting a frozen screen.
   For an ops dashboard, silently-stale data is worse than a visible error.
3. **Refetch on reconnect, not replay.** Messages missed while disconnected are gone forever, so the
   HOC re-runs `fetchOrders` on reconnect to resync from source of truth.

**Point 3 is the interview answer.** The question is always *"what happens to updates you miss while
disconnected?"*:

> *"SignalR doesn't replay missed messages, so anything pushed while we were down is lost. Rather than
> try to buffer server-side, on reconnect we re-register the user and refetch the full order list — the
> push channel is an optimization on top of a REST fetch that is always the source of truth. It costs
> one request per reconnect and it means the dashboard can never silently drift."*

**Also worth knowing:** `_upsertCallbacks` calls `instance.off(...)` before re-binding. Without it,
every re-render would stack another handler and one server message would dispatch N times. That is a
real bug class in SignalR + React integrations and you fixed it structurally.

**The boundary:** you did **not** write the .NET SignalR hub. You consumed it. Say that.

---

## 7. Resilience and observability — CV bullet 4

### Seven error boundaries at three levels

```
Level 1 — global      GlobalErrorBoundary.jsx          whole-bundle fallback + link to login
Level 2 — per-feature MyMoveErrorBoundary.jsx          intake survey
                      SchoolErrorBoundary.jsx          school finding
                      TenancyErrorBoundary.jsx         tenancy management
                      photo-upload-error-boundary.js   my-resources upload
Level 3 — per-element CellErrorBoundary.jsx            one cell in AdvancedGrid
                      FieldErrorBoundary.jsx           one field in payment
```

**The argument, which is the whole bullet:** React unmounts the entire tree on an uncaught render error.
With only a global boundary, one malformed row in a 200-row grid blanks the screen for a program manager
mid-shift. Level 3 means the bad cell renders a fallback and **the other 199 rows keep working**.

> **Q: "Isn't a boundary per cell excessive?"**
> *"It would be if the data were trustworthy. This grid renders orders aggregated from several services
> with optional fields, so a null in an unexpected place is a question of when, not if. The cost is one
> tiny class component; the benefit is that a data problem degrades one cell instead of taking a
> dashboard away from someone whose job depends on it. I'd put boundaries at that granularity anywhere
> a list renders third-party or aggregated data, and nowhere else."*

**Know the mechanism, they will ask:** a boundary is a class component implementing
`static getDerivedStateFromError()` (set fallback state) and/or `componentDidCatch(error, info)` (side
effects like logging). **There is no hook equivalent** — this is one of the few places you still must
write a class in modern React. Boundaries catch errors in rendering, lifecycle methods and constructors
**below** them. They do **not** catch: event handlers, async code, SSR, or errors thrown in the boundary
itself.

### Client-side observability — `SeqLogger`

Boundaries stop the bleeding; the logger tells you it happened.

```js
logger({
  Timestamp, Level, Message,
  BrowserName, BrowserVersion, MachineInfo,   // ← from getBrowserInfo()
  Stack: exception || stack,
  Url: window.location.pathname + window.location.hash,
  Props: JSON.stringify(props),
});
```

- Ships to **Seq** (structured log server) through `services/logService.js`, so front-end errors land in
  the same searchable store as the .NET backend's Serilog output.
- `stacktrace-js` resolves real frames — minified production stacks are otherwise unreadable.
- Injected through `LoggerContext`, so components log without importing a singleton.
- Failure is swallowed (`.catch(err => console.error("[seq]", err))`) — **logging must never break the
  page it is reporting on.**

**Why browser and machine info matter here specifically:** this product supports IE11 and is used by
relocating families on unknown devices in foreign countries. "It's broken" is useless; "it's broken on
IE11 on this build" is actionable. That is a domain-driven engineering decision and it is a great thing
to say out loud.

**Honest caveat you should volunteer if pressed:** `GlobalErrorBoundary.componentDidCatch` currently has
a `// TODO - log analytics here` and does not wire into SeqLogger. The per-feature boundaries and the
survey do log. *"The wiring is inconsistent — the global boundary shows a fallback but doesn't report,
which is exactly backwards from what you'd want."* Volunteering a real flaw you noticed is worth more
than a clean story.

---

## 8. Analytics instrumentation — CV bullet 5

`shared/hooks/googleAnalytics.js`:

```js
const useGoogleAnalytics = ({ pageTitle }) => {
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) { isInitialMount.current = false; return; }   // ← skip first render
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "VirtualPageView", page_path: window.location.href,
                            page_title: pageTitle || document.title });
  }, [pageTitle]);
};
```

**The problem it solves.** GA4 records a pageview on a real page load. Inside a React bundle the user
moves between views without a page load, so GA4 sees one pageview and every subsequent screen is
invisible. Product could not tell where in the flow people were dropping out.

**The fix.** Push a `VirtualPageView` event into the GTM `dataLayer` on every in-bundle view change.

**The subtlety worth pointing at — `isInitialMount`.** The real page load already fires GA4's own
pageview. Firing the hook on first render too would double-count every entry page and corrupt the
numbers. Skipping the first render means the hook reports *only* client-side transitions.

> **Q: "Why `dataLayer` instead of calling `gtag()` directly?"**
> *"The dataLayer is Google Tag Manager's queue. Pushing events there means marketing can change what
> gets sent, add tags, or rename events in the GTM UI without a front-end deploy. Calling gtag directly
> would hard-code the analytics contract into a monolith with a slow release cycle."*

That answer shows you understand a deployment constraint, not just an API.

---

## 9. The IE11 constraint — CV bullet 1

IE11 support is deliberate, not neglect: corporate transferees sit inside locked-down enterprise IT
environments where IE11 is the standard browser.

How it is held:

| Mechanism | Where |
|---|---|
| `babel-polyfill` + `core-js` | imported at entry (`require-babel-polyfill`, `import "core-js"`) |
| `react-hook-form` → IE11 build | webpack alias: `"react-hook-form": "react-hook-form/dist/index.ie11"` |
| `blob-polyfill` | Blob API gaps for file download |
| React pinned to **16.x** | React 17+ drops IE11 |
| `@babel/preset-env` | transpiles down to ES5 |
| Node **12.18.1** | pinned in `.nvmrc` — the toolchain is frozen with the target |

**What it costs, which is the real answer:** bundle size (polyfills ship to every user, including the
95% on modern browsers), no modern CSS (grid, custom properties), no native `fetch`, and you cannot
adopt any library that has dropped IE11 — which by now is most of them. It also freezes the whole
toolchain: React 16, webpack 4, Node 12.

> **Q: "How would you get off IE11?"**
> *"Measure first — the analytics instrumentation gives us actual IE11 sessions by role. My expectation
> is that it's transferees inside a handful of corporate networks, not consultants. If that's true you
> don't need a big-bang migration: serve a differential bundle so modern browsers stop paying the
> polyfill tax, agree a sunset date with the client's IT contacts, and unfreeze the toolchain behind it.
> The constraint is contractual, not technical, so the work is mostly evidence and negotiation."*

That connects two CV bullets (analytics and IE11) into one argument. Very strong.

---

## 10. The CV bullets — drill sheet

Each row: what the bullet claims → the mechanism you cite → the follow-up → the boundary.

### Bullet 1 — "Ship React features across 20 independently-mounted SPA bundles embedded in a legacy .NET Razor monolith, holding IE11 support."

- **Mechanism:** 20 webpack entry points → `dist/[name]/[name].bundle.js` → `<div id="react_*">` in a
  Razor view → `ReactDOM.render` → `window.globalObject` for bootstrap data.
- **Follow-ups:** *Why not one SPA?* (§2) · *What does "embedded" mean exactly?* (§2 flow diagram) ·
  *How do bundles share state?* (they don't — via server, §2 costs) · *Biggest downside?* (React ships
  20 times, no vendor chunk).
- **Boundary:** you did not design the original Razor/MVC architecture. You worked inside it and
  extended it. Never say "I architected the monolith."

### Bullet 2 — "Built a real-time operations dashboard on Redux and SignalR with auto-reconnect and state recovery, tracking every active relocation."

- **Mechanism:** §6 — dedicated Redux + thunk store, `withSignalr` HOC, `withAutomaticReconnect`,
  disconnect flag → UI banner, refetch-on-reconnect, whitelist + `off()` before re-bind.
- **Follow-ups:** *What happens to messages missed while disconnected?* (refetch, not replay — the
  answer they're testing for) · *Why Redux here and not local state?* (§4) · *How do you avoid duplicate
  handlers?* (`_upsertCallbacks`) · *Why SignalR over WebSockets/polling?* (it's a .NET shop; SignalR
  negotiates transport and falls back automatically, which matters when your users are behind corporate
  proxies that block raw WebSockets).
- **Boundary:** the .NET hub is not yours. "I consumed the hub; I didn't write it."

### Bullet 3 — "Built the shared component library -- form fields, virtualized selects, advanced data grid, Google Maps views -- reused across all 20 bundles."

- **Mechanism:** §5 — 78 files, `shared/form` with FormContext + 8 typed field components,
  `AdvancedGrid` + pagination, `virtual-select` on react-window, Google Maps views, path alias
  `Shared/` so every bundle imports the same source.
- **Follow-ups:** *Why virtualize?* (thousands of options + IE11, §5) · *How did you stop 20 teams
  forking it?* (single alias, no local copies; consistency was reviewed) · *Would you publish it as a
  package?* (*"Only if bundles deployed independently. They ship in one .NET deploy, so a package would
  add versioning overhead for zero isolation benefit."*)
- **Boundary:** the library predates you in part. Safe framing: *"I built and extended components in the
  shared layer that all 20 bundles consume."* Do not claim you founded it.

### Bullet 4 — "Hardened the UI with layered React error boundaries and a stack-trace logger, containing failures to one cell instead of the whole page."

- **Mechanism:** §7 — 7 boundaries at 3 levels, `getDerivedStateFromError` / `componentDidCatch`,
  `CellErrorBoundary` inside `AdvancedGrid`, `SeqLogger` shipping browser + machine + resolved stack to
  Seq via `LoggerContext`, logging failures swallowed.
- **Follow-ups:** *How does a boundary work?* (class-only, no hook) · *What can't it catch?* (event
  handlers, async, SSR, itself) · *Isn't per-cell excessive?* (§7 answer) · *How do you know it's
  working?* (Seq — same store as backend Serilog).
- **Boundary:** you did not build Seq or the .NET logging pipeline. You wrote the client logger that
  writes into it. **Volunteer the `TODO` gap in `GlobalErrorBoundary`** — it reads as rigor.

### Bullet 5 — "Instrumented React surfaces with Google Analytics 4 virtual pageview tracking, giving product per-page visibility into user drop-off."

- **Mechanism:** §8 — `useGoogleAnalytics` hook, `dataLayer.push({event:"VirtualPageView"})`,
  `isInitialMount` guard against double-counting, applied across consultant and transferee surfaces.
- **Follow-ups:** *Why was this needed?* (SPA views fire no pageview) · *Why skip first render?* (real
  load already counted) · *Why dataLayer over gtag?* (GTM decouples analytics from deploy) · *What did
  product learn?* — **careful**: say *"it gave them per-page funnel visibility they didn't have before"*.
  Do **not** invent a conversion-lift number.
- **Boundary:** you instrumented; you did not run the analysis or own the GA4 property.

### Bullet 6 — "Work directly with the US client on requirements, design sessions, feature demos, sprint ceremonies and release coordination."

- **Mechanism:** direct sessions with the client's product owners, demos, their ceremonies, release
  coordination and production support. A distributed team across US and India time zones.
- **Follow-ups:** *Tell me about a time you disagreed with a client requirement* · *How do you handle
  a production issue in a different time zone?* · *How do you demo to a non-technical stakeholder?*
- **Prepare one real STAR story here.** This bullet is the one most likely to be probed behaviorally,
  and a vague answer undoes the technical credit from bullets 1-5. See Module 9.

---

## 11. Two stories worth having ready

**1. The date picker you fixed without forking.** `vue-ctk-date-time-picker`'s `getYears()` only
generates a ±7-year window, so entering a date of birth meant clicking one year at a time. Options were
to fork a vendored `.min.js` (unmaintainable) or swap the library (a big change across the legacy Razor
surface). Instead: a 75-line runtime patch that walks the component tree to find `YearMonthSelector` and
overrides `getYears` on its `methods` object, widening to 80 years back / 20 forward and auto-scrolling
to the selected year. Loads *after* the vendor script, guards for the component being missing, and
changes nothing else.

> **The point to land:** *"I didn't want to fork a minified vendor file or replace a library across a
> legacy surface for one method. Patching the prototype at runtime was reversible, about 75 lines, and
> if the library ever gets upgraded the patch fails safe — it checks the component and method still
> exist and no-ops if they don't."* **Reversible + fails safe** is what makes this senior rather than a
> hack.

> 🔴 **STORY 2 IS UNVERIFIED — DO NOT TELL IT IN AN INTERVIEW UNTIL TARUN CONFIRMS IT. Flagged 2026-09-10.**
> Odin contains exactly **one** AI chat feature: the `chatbot` bundle, branded **"Dwellton"**. Git says
> none of it is his. `git log --author="avnit"` returns **zero** files matching chatbot, bot, assistant or
> dwellton — including `Content/styles/css/chatbot/` and `xref_scss/22_chatbot/`, so not even the CSS.
> Every commit on `Scripts/react/src/components/chatbot/` and all **19** on the C# side
> (`ChatBotController.cs`, `Integration/ChatBotApi/`, `ChatBotRepository.cs`, the EF migrations) is **Dave
> Gottl's**, dated **Dec 2024 – May 2025**, which also **predates Tarun's June 2025 start**. There is no
> `draggable` or `resizable` anywhere in the React source either.
>
> His real Orders-area mobile work is `MP-1992` and the 2026-06-05 orders-page responsiveness commit,
> neither of which touches the chat panel. **Most likely this story was mis-attributed when the file was
> written.** Telling it invites "walk me through how you built the AI assistant", which he cannot answer.
> See the Dwellton block in `references/cv/fact-bank.md`. **No AI claim goes on the Dwellworks CV entry.**

**2. The mobile AI-assistant keyboard bug.** The Orders AI assistant chat sat in a floating panel. On
mobile the on-screen keyboard pushed the input off-screen, so the user couldn't see what they typed.
Fix was to make the chat full-screen on mobile so the layout reflows above the keyboard instead of being
pushed by it. Small, but it's a good "you noticed a real user problem" story, and it pairs with the
draggable/resizable chat window work on desktop.

---

## 12. Facts I must never get wrong

- **20** webpack entry points. **409** `.js`/`.jsx` files. **78** shared component files. **14** API
  service modules. **7** error boundaries. **156** `window.globalObject` reads.
- **`ReactDOM.render`, never `hydrate`.** No SSR. Never say "hydration".
- **No `splitChunks`, no `React.lazy`, no dynamic `import()`.** Never say "code-splitting".
- **No TypeScript.** 0 `.ts`/`.tsx`, no `tsconfig.json`.
- **No React tests.** Jest is set in the ESLint env but there is no runner and no test files. **Never
  claim testing on this project** — React Testing Library belongs to CloudForestX.
- SignalR = **`controlTowerHub`**, event **`UpdateControlTower`**, registered by **`programManagerId`**,
  serving **program managers**. Not consultants. Not families. Not messaging.
- Transferee notifications are **polling** — `GetUserNotifications?numOfDays=7`.
- React **16.12**, Redux **4.0.5**, webpack **4.41.5**, axios **0.19.2**, Node **12.18.1**, .NET
  Framework **4.6.1**, `@microsoft/signalr` **8.0.7**.
- Two Redux stores: `order-dashboard` (thunk) and the main store (redux-form). Most components use hooks.
- Three axios instances: default (with CSRF `RequestVerificationToken`), Google Maps, Umbraco CMS.
- Styling is **plain CSS via style-loader**, plus `clsx` for conditionals. No CSS Modules, no CSS-in-JS,
  no design tokens. SCSS lives on the Razor side (80+ compile entries), not in React.
- **My scope is the front end.** The .NET services, batch jobs, Azure Queues and the auth design are
  fluency, never authorship.

---

### Sources (grounding)

- **Bundle architecture:** `Odin/Scripts/react/webpack.common.js` (20 entries, aliases, IE11 alias);
  `Odin/CLAUDE.md` §3 folder structure + entry-point table, §5 tooling.
- **Mount + data flow:** `ReactDOM.render` call sites in every `components/*/index.js`;
  `axios.config.js` (`window.globalObject` → `APP_CONFIG`, CSRF header, Google + Umbraco instances);
  `Odin/CLAUDE.md` §4 "Data from server", §8 "Server → React Data Flow".
- **State:** `components/order-dashboard/store/` (`actions/order.js`, `effects/order.js`);
  `components/store/index.js` (redux-form); `Odin/CLAUDE.md` §8, §10 "Separate Redux stores per bundle".
- **Shared library:** `components/shared/` — `form/` (Form.jsx, FormContext.js + field components),
  `fields/`, `render-field/`, `grid/AdvancedGrid.jsx`, `grid/pagination.js`, `virtual-select.js`
  (react-select + react-window `FixedSizeList`), `discover-map/`, `date-picker/`.
- **Real-time:** `components/order-dashboard/shared/signalrHoc.jsx` (SignalrService singleton,
  `withAutomaticReconnect`, `_upsertCallbacks`, register/unregister by pm id);
  `store/effects/order.js` (`fetchOrders`, `getControlTowerOrders`);
  `AggregatedView/ServiceHealth.jsx` (Service Radar: sad/happy/unknown/on-hold + percentages + filters).
- **Resilience:** `shared/GlobalErrorBoundary.jsx`, `shared/grid/CellErrorBoundary.jsx`,
  `payment/FieldErrorBoundary.jsx`, `survey/MyMoveErrorBoundary.jsx`, `school/modules/SchoolErrorBoundary.jsx`,
  `tenancy-management/TenancyErrorBoundary.jsx`, `my-resources/shared/photo-upload-error-boundary.js`.
- **Observability:** `utils/seq-logger.js`, `services/logService.js`,
  `shared/react-contexts/logger.context.js`; `stacktrace-js` use in `components/survey/index.js`.
- **Analytics:** `shared/hooks/googleAnalytics.js` (`VirtualPageView` → `dataLayer`, `isInitialMount`).
- **IE11:** `webpack.common.js` alias `react-hook-form/dist/index.ie11`; `import "core-js"` and
  `require-babel-polyfill` in `axios.config.js`; `.nvmrc` (12.18.1); `Odin/CLAUDE.md` §9 rule 9, §10
  "IE11 support is baked in".
- **Date-picker patch:** `Odin/Scripts/app/components/vue-ctk-date-picker-patch.js` (75 lines).
- **No React tests:** `Odin/CLAUDE.md` §11 "No React Tests".
