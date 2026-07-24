# Module 3 — Portal Frontend Architecture

**Goal:** defend every DentScribe line on the CV to explanation level, with a file you can point at for
each one.

Module 0 taught you the domain and why writeback is the product. This is the code you actually wrote.
**Every claim below names the file that proves it** — if you can open the file and read the line, you
can defend the bullet. That is the standard for this module.

**Study until you can:** name the four roles and what each can reach, explain the auth middleware
without notes, trace a report from "recording finished" to "written back into Dentrix", and say the
boundary sentence about the AI pipeline without hesitating.

---

## 1. The shape of the portal

`dentscribe-portal` — Create React App + TypeScript.

```
frontend/src/
├── content/applications/     19 application surfaces
│     Reports · Dashboards · Users · Accounts · Practice · Subscriptions · Plans ·
│     AiCosting · TrialUsers · CopilotBatchProcessor · GPS · StaffContacts ·
│     Referral · Training · LearningResources · FAQ · Support · Installation · AccountSettings
├── state/                    10 Redux Toolkit slices + apiMiddleware + store
│     auth · user · report · reportV2 · dashboard · utils · subscription ·
│     batchProcessor · gps · staffContacts
├── components/               shared UI (SearchBar, BigCalendar, SikkaWebView, EndLicense, …)
├── services/                 zohoAsap, zohoWebinar (third-party support/webinar embeds)
├── layouts/ · theme/ · contexts/ · hooks/ · types/ · utils/ · constants/
├── router.tsx                AuthGuard + route tree
└── axiosInstance.ts          one axios instance, withCredentials
```

**Numbers you can quote, all verifiable:** **317 TypeScript files** — 218 `.tsx` + 99 `.ts` — and
**zero JavaScript files.** 19 application surfaces. 10 Redux slices. 4 user roles.

**The four roles** — `src/constants/index.tsx`:

```ts
export enum ROLES {
  ADMIN = 'Admin',
  DENTIST = 'Dentist',
  DOCTOR_ASSISTANT = 'Dental Assistant',
  TRIAL_USER = 'Trial User'
}
```

That enum is the proof behind "across four user roles" in CV bullet 1. Admin gets a completely
different application set (AiCosting, TrialUsers, CopilotBatchProcessor, Referral) than a Dentist.

---

## 2. State architecture — CV bullet 4, part one

### The 10 slices and the coordinated reset

`src/state/store.ts`:

```ts
export const store = configureStore({
  reducer: { auth, user, report, reportV2, dashboard, utils,
             subscription, batchProcessor, gps, staffContacts },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware)
});

const resetActions = { auth: resetAuth, user: resetUser, report: resetReport, /* …all 10… */ };
export const resetStore = () => (dispatch) =>
  Object.values(resetActions).forEach((resetAction) => dispatch(resetAction()));
```

**The detail worth naming: every slice exports its own `reset`, and `resetStore` fires all ten.**

> **Q: "Why not just replace the root reducer on logout?"**
> *"That's the usual trick and it works, but it's all-or-nothing. Having each slice own its own reset
> means I can clear one domain without nuking the session — for example resetting report state when the
> user switches practice location, while auth and user stay intact. `resetStore` composes those same
> resets for the logout case. One mechanism, two granularities."*

Also typed properly:

```ts
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
```

**Honest note to volunteer:** there is a `// TODO replace useDispatch,useSelector with
useAppDispatch,useAppSelector hook everywhere` in `store.ts`. The typed hooks exist but adoption was
partial. Saying so is better than being asked.

### Why `report` **and** `reportV2`

Two slices for the same domain is the kind of thing an interviewer notices. The honest answer:

> *"The reports surface was being rebuilt — there's `ReportsList.tsx` and `ReportsListV2.tsx`, and a
> matching `reportV2` slice with its own API layer. Rather than do a big-bang swap on the most
> business-critical screen in the product, the new implementation went in alongside the old one so we
> could move surfaces over incrementally. The cost is duplicated state for a while; the benefit is that
> the old path keeps working if the new one has a problem. I'd want a deadline attached to that kind of
> migration, though — parallel implementations that live forever are how codebases rot."*

That answer shows migration judgment *and* that you know its failure mode.

---

## 3. The auth middleware — CV bullet 4, part two

`src/state/apiMiddleware.ts`. This is the single best small file in the project to talk about.

```ts
const apiMiddleware: Middleware = ({ dispatch }) => (next) => async (action) => {
  if (
    action?.type !== ACTIONS[SLICES.AUTH][ACTION_NAMES.LOGIN][ACTION_STATE.REJECTED] &&
    ( action?.payload?.msg        === ERROR_TYPES.UNAUTHORIZED ||
      action?.payload?.message    === ERROR_TYPES.UNAUTHORIZED ||
      action?.payload?.statusCode === 401 ||
      // since statusCode was changed to 400 due to mobile app issue
      (action?.payload?.statusCode === 400 &&
       action?.payload.message === 'Something wrong with the token') ||
      action?.payload === ERROR_TYPES.INVALID_SESSION )
  ) {
    dispatch(resetAuth());
    localStorage.clear();
    await delay(2000);
    window.location.href = PAGES.LOGIN;
  }
  return next(action);
};
```

**What it is:** a Redux middleware sitting in front of every dispatched action. Any rejected thunk
carrying an auth failure triggers a session teardown, wherever in the app it came from.

**Four things to say about it, in this order:**

1. **It centralizes a cross-cutting concern.** Without it, every one of the dozens of thunks needs its
   own 401 handling, and one that forgets leaves the user on a page silently failing to load.
2. **It handles five different failure shapes** — `msg`, `message`, `statusCode: 401`, the 400-with-token-message
   case, and a bare `INVALID_SESSION` string. That is what integrating with a real API looks like: the
   contract is not uniform, and the client has to be liberal in what it accepts.
3. **The 400 case is the interesting one, and the comment explains why:** *"since statusCode was changed
   to 400 due to mobile app issue."* The API changed its status code to unblock the mobile client, and
   the portal had to absorb that rather than break. **This is your cross-team-coordination evidence, and
   it is literally written in the code** — it supports CV bullet 5.
4. **The login exception.** The first condition excludes the login action itself. Without it, a wrong
   password would be read as "session expired", tear down state and redirect — an infinite loop on the
   login page. **Name this. It shows you thought about the edge case, not just the happy path.**

**The weakness to volunteer before they find it:** `await delay(2000)` then `window.location.href`.

> *"Two things I'd change. The two-second delay exists so the user sees the error toast before the
> redirect, but that's presentation logic sitting in middleware — it belongs in the UI layer. And
> `window.location.href` does a full page reload instead of a router navigation, which throws away the
> SPA. Both were pragmatic at the time; neither is what I'd write now."*

---

## 4. The access guard — CV bullet 4, part three

`src/router.tsx`, the `AuthGuard` component. **This is not simple role-based routing** — that is the
point of the bullet, and the thing to get across.

The allowed-route set is recomputed from **four independent dimensions**:

| Dimension | Source | What it means |
|---|---|---|
| **role** | `state.user.userData.role` | Admin / Dentist / Dental Assistant / Trial User |
| **tenant** | `officeId` | which practice location — `null` means onboarding is incomplete |
| **onboarding** | `practiceLocationEnabled` | whether the practice has a usable location configured |
| **billing** | `subscription.hasExpired`, `subscription._id` | whether the account is currently paid |

```ts
let allowedRoutes = [ '/login', '/signUp', '/accounts/profile', '/accounts/roles',
  '/accounts/permissions', '/accounts/assign-roles', '/subscriptions/plan',
  '/subscriptions/payment', '/reports/all', '/dashboard', '/ai-costing',
  '/training', '/resources', '/support', '/installation' ];

if (officeId === null) {
  allowedRoutes = updateAllowedRoutes(allowedRoutes, [
    '/accounts/roles', '/accounts/permissions', '/accounts/assign-roles', '/reports/all'
  ]);   // ← strip what a user with no practice yet must not reach
}
```

**The argument for why it has to be this way:**

> *"Role alone isn't enough, because the same role can be in very different states. A dentist who just
> signed up has no `officeId` yet — there's no practice, so there are no reports and no roles to assign;
> sending them to `/reports/all` shows an empty screen and looks broken. A dentist whose subscription
> lapsed shouldn't reach clinical data but must still reach billing to fix it. So access is a function
> of role **and** onboarding completeness **and** billing state, and the guard recomputes the allowed
> set from all of them rather than checking one flag."*

**The follow-up: "isn't that a lot of branching in one component?"**

> *"Yes, and it's the weakest part of the file — the guard grew a branch each time a new state appeared,
> and it's long. What I'd do is express it as a table: state combination → allowed route set, evaluated
> in one place, so adding a state is a row rather than another `if`. The logic is right; the shape isn't."*

**The frontend is not the security boundary.** Say this unprompted if the conversation goes near auth:

> *"None of this is security — it's UX. The real enforcement is server-side: the API has role guards and
> an `officeId`-match guard on the endpoints. The client-side guard exists so users don't land on
> screens they can't use. If the client were the only check, you'd just call the API directly."*

Backend proof: `app/auth/roles.guard.ts`, `officeId-match.guard.ts`, `request-office-match.guard.ts`,
`subscription.guards.ts`. **Know they exist; do not claim you wrote them.**

---

## 5. The report review surface — CV bullet 2

`content/applications/Reports/` — 19 files. The orchestrator, `DentistReports/index.tsx`, is
**2,246 lines**.

### The tabs

| Tab | File | Editable? |
|---|---|---|
| SOAP note | `SOAPNoteTab.tsx` (149 lines) | **No** — read-only + copy-to-clipboard |
| Transcript | `TranscriptTab.tsx` | No |
| Aftercare summary | `AfterCareSummaryTab.tsx` | **Yes** — `isAfterCareSummaryEditMode` |
| TC (treatment coordinator) notes | `TcNotesTab.tsx` | **Yes** — `isTcNotesEditMode` |
| TMF wellness report | `TmfWellnessReportTab.tsx` + View + Skeleton | View, with PDF + print |

**Be precise about editing.** The CV says *"aftercare and coordinator sections with per-section
editing"* — that is exactly what exists. **The SOAP note itself is read-only in the portal.** If asked
why:

> *"The SOAP note is the legal clinical record and it's what gets written back into the practice
> management software, so the portal presented it for review and copy rather than free-text editing.
> The derived artifacts — the patient's aftercare summary and the treatment-coordinator notes — are
> where the clinician actually adjusts wording, and those are editable per section."*

### Status mapping — a small detail that reads as senior

`src/constants/index.tsx`:

```ts
export enum DB_REPORTS_STATUS_MAPPING {
  start      = 'START',
  inprogress = 'INPROGRESS',
  complete   = 'REVIEW',      // ← the note is done; the ACTION is "review it"
  submitted  = 'REVIEWED',
  paused     = 'CONTINUE',    // ← generation stalled; the ACTION is "continue"
  null       = 'NA'
}
```

> *"The database status describes the pipeline; the label describes what the clinician should do next.
> `complete` means generation finished, but to the dentist the meaningful thing is 'REVIEW'. And
> `paused` — which is where a report lands when generation stalls — surfaces as 'CONTINUE' rather than
> an error, because there's a recovery path and telling a busy clinician 'failed' would send them to
> support instead of the button that fixes it. That mapping lives in one enum so every surface labels a
> status the same way."*

**That is a genuinely good answer** — it shows you think about the user, and it is provable in six lines.

### Other real pieces

- **Signature** — `state/report/reportSlice.ts` types it as
  `{ sign, signFont, name, title, license } | null`. Name, professional title and **license number**,
  rendered in a chosen signature font. It travels with the report through review to submission.
- **PDF + print** — `tmfWellnessReportPdfDownload.ts`, `tmfWellnessReportPrint.ts`
  (`html2pdf.js` + `react-to-print`).
- **Perio charting** — `Users/UserDetails/PerioChartReportsTab.tsx`.
- **Server-side search + date filtering** on the reports list —
  `searchTerm` / `appliedSearchTerm` → `buildFilters()` → `{ search, dateRange }` sent to the API.
  **This is search, not find-and-replace.** The old CV said find-and-replace; it does not exist. Never
  say it.

---

## 6. The pipeline integration — CV bullet 3

This is the bullet that carries the domain, and the one with the sharpest boundary.

### What the portal actually does

```
mobile app records  →  audio chunks to S3
                          │
        API publishes to SNS topic  soapreportgeneration
                          │
                     SQS → ReportWorkerService   (autoscales 1-10 on queue backlog)
                          │
        Whisper transcribes → GPT analyses → second GPT call formats to JSON
                          │
                     SoapReport row updated: reportProcessingAt → reportCompletedAt
                          │
   ┌──────────────────────┴────────────────────────┐
   │  THE PORTAL (your scope)                      │
   │  · reads report state and renders the tabs    │
   │  · maps DB status → clinician-facing label    │
   │  · review, per-section edit, sign, submit     │
   │  · triggers writeback                         │
   └──────────────────────┬────────────────────────┘
                          │
        API → Sikka → the PMS (Dentrix / Eaglesoft / Open Dental)
                          │
        SOAPWritebackStatusCron polls: did the PMS accept it?
                          │
        retryWriteback · failedWritebackNotifyCount · notifications
```

### Say "surfacing report state", never "polling"

**The portal does not poll.** The only `setInterval` in all 317 files is in
`components/SikkaWebView/index.tsx`, checking every 2 seconds whether an OAuth popup window closed. The
polling that matters — *did the PMS actually accept the note?* — is a **backend cron**
(`SOAPWritebackStatusCron.ts`). The old CV bullet said the portal polled report status; it does not.

### Why the pipeline is asynchronous — the architecture answer

> *"Generating a note takes minutes, not milliseconds — it's a Whisper transcription over chunked audio
> plus two GPT calls. You cannot hold an HTTP request open for that, and you must not lose the work if
> the client disconnects. So the API publishes to an SNS topic, a worker consumes from SQS and does the
> long job, and the report row is the state machine both sides read. The worker autoscales 1 to 10 tasks
> on queue backlog, so a busy morning across practices scales out instead of queueing behind one
> process. From the portal's side that means I'm never waiting on the AI — I'm rendering whatever state
> the report is currently in, which is why the status mapping matters so much."*

### Why writeback is the product

> *"The note is worthless in our web app. The patient chart, the schedule and the billing all live in
> the practice's existing software, and a dentist will not copy-paste. So the finished note goes back
> through Sikka into Dentrix, Eaglesoft or Open Dental, and the system tracks whether it landed —
> there's a writeback id, a retry flag, a status-polling cron and a failed-writeback notification count.
> Getting the note **in there** is the hard part; writing the note is the easy part."*

### THE BOUNDARY — memorize this

> *"To be clear on scope: I built the portal. I did not write the transcription workers, the prompts, or
> the Sikka integration. I integrated against all of it — the portal is the window onto that pipeline,
> so I had to know how a recording becomes a note and what every report state means to build the review
> surface. But I'd be overclaiming if I said I built the AI pipeline."*

**Never claim:** the Whisper/GPT worker code, the prompt engineering (those files are the product's
core IP), the Sikka/PQL layer, the SNS/SQS wiring, or the ECS/Copilot infrastructure. **Claim fluency in
all of it.** An interviewer respects the line; they will destroy an overclaim in two questions.

**If they push on the AI:** you can explain the chain (Whisper → GPT analysis → a second call that
formats to JSON, with a feature flag to collapse the last two), the models in use (`gpt-4o`, `gpt-5.1`,
`gpt-5.2` in `app/constants/index.ts`), and why per-model token spend is tracked. That is real fluency
and it comes from Module 2 — it is not authorship.

---

## 7. The surfaces behind bullet 1

"19 surfaces spanning clinical review, billing and admin across four user roles" — here is the proof,
grouped:

**Clinical** — Reports (review + sign + submit), Dashboards (appointments, operatory view),
Users/UserDetails (incl. PerioChartReportsTab), Practice, StaffContacts, GPS, CopilotBatchProcessor.

**Billing** — Subscriptions, Plans, and the Stripe surfaces: `PaymentDetails/` (`@stripe/react-stripe-js`),
`PlanList/`, plus a **multi-step cancellation flow**: `CancelSubscriptionFlow/RetentionStep.tsx` →
`PauseDurationStep.tsx` → `FinalConfirmationStep.tsx`, and `CancelSubscriptionModal/`.

**Admin** — AiCosting (`PracticeList/`, `PracticeCostBarChart.tsx`, `AICostingTab.tsx`, calling
`getAICostingV2`), TrialUsers (create + list), Accounts (roles, permissions, assign-roles), Referral.

**Support/content** — Training, LearningResources, FAQ, Support (Zoho ASAP + webinar embeds under
`services/`), Installation, AccountSettings.

### The cancellation flow is your best untold story

> *"Cancellation wasn't one button. It was a funnel: a retention step that asks why and offers an
> alternative, then a pause option with a duration instead of losing the customer entirely, then final
> confirmation. That's a product decision expressed in the UI — churn is cheaper to prevent than to
> re-acquire, and pausing keeps the practice's data and integration intact so coming back is trivial.
> On the Stripe side pause and cancel are genuinely different subscription states, not the same call."*

**Bring this up yourself** in a product-minded interview. It is the most commercially literate thing on
the project and nobody expects it from a frontend dev.

---

## 8. Cross-team coordination — CV bullet 5

The evidence that this is real and not a filler bullet:

1. **The `apiMiddleware` comment** — `// since statusCode was changed to 400 due to mobile app issue`.
   One client's constraint changed the shared API contract and the portal absorbed it. That is three
   teams in one comment.
2. **Shared auth across clients.** The mobile app authenticates as the same user against the same API;
   `User.fcmToken` and `deviceType` (android | iOS) exist on the backend user entity.
3. **`withCredentials: true`** in `axiosInstance.ts` — cookie-based session shared with the API, plus
   tokens (`accessToken`, `refreshToken`, `sikkaToken`, `stripePublishKey`) read from localStorage in
   the guard. Two auth mechanisms coexisting is itself a coordination artifact.
4. **A US client, an India-based team**, requirements and demos across time zones.

**Prepare one STAR story here** — ideally the 400-status-code one, because it is provable:

> *S:* The API returned 401 for an expired token. *T:* The mobile app had a problem with 401 handling on
> its HTTP layer, so the backend changed the status to 400 with a token message. *A:* That silently broke
> the portal's session teardown — users hit dead screens instead of being redirected to login. I widened
> the middleware to recognize the new shape while keeping the old one, so both contracts worked, and
> left the comment explaining why so nobody "cleaned it up" later. *R:* Both clients worked against one
> API without either team blocking on the other.

**This is the strongest behavioral answer you have from this project.** It shows debugging, cross-team
empathy, backward compatibility, and leaving the codebase legible for the next person.

---

## 9. Honest weaknesses — volunteer these

1. **`DentistReports/index.tsx` is 2,246 lines.** *"It's the orchestrator for every report tab and it
   grew past what one component should hold. I'd split it by tab with the shared fetch and status logic
   in a hook."*
2. **Two parallel report implementations** (`report` + `reportV2`, `ReportsList` + `ReportsListV2`) — §2.
3. **`window.location.href` + `await delay(2000)` in middleware** — §3.
4. **The calendar is unfinished.** `BigCalendar` is a 15-line wrapper with dummy events commented out,
   and the Dashboard's operatories are a hard-coded four-item array. **Do not claim the calendar.**
5. **No test suite.** Same answer as the other projects: *"no frontend test culture there; I use Vitest
   on my own projects."*
6. **`loadash` AND `lodash`** are both in `package.json` — a typo'd package left installed alongside the
   real one. Small, but it is the kind of thing an interviewer who opened the repo would enjoy you
   noticing.

---

## 10. The CV bullets — drill sheet

### Bullet 1 — "Built the React and TypeScript portal for a multi-tenant clinical product: 19 surfaces spanning clinical review, billing and admin across four user roles."
- **Proof:** `content/applications/` = 19 dirs · `constants/index.tsx` `ROLES` enum = 4 · 317 TS files,
  0 JS · `officeId` tenancy throughout.
- **Follow-ups:** *What does multi-tenant mean here?* (`officeId` = practice location; nearly every
  query and guard is scoped by it) · *What's different for each role?* (§1, §7) · *Biggest surface?*
  (Reports, §5).
- **Boundary:** the portal is yours. The mobile app is **a separate codebase you have not read** — say
  exactly that.

### Bullet 2 — "Built the report review surface for AI-generated clinical notes -- tabbed note, transcript, aftercare and coordinator sections with per-section editing."
- **Proof:** `Reports/DentistReports/` — SOAPNoteTab, TranscriptTab, AfterCareSummaryTab (edit mode),
  TcNotesTab (edit mode), TmfWellnessReportTab; `DB_REPORTS_STATUS_MAPPING`.
- **Follow-ups:** *Why isn't the SOAP note editable?* (§5) · *What's a TC note?* (treatment coordinator —
  the money conversation, not the clinical one) · *How does a clinician know a report is ready?* (status
  mapping, §5).
- **Never say:** find-and-replace. It does not exist.

### Bullet 3 — "Integrated the portal against a queue-backed AI generation pipeline, surfacing report state and triggering writeback into the practice's management software."
- **Proof:** §6 diagram · `SoapReport` lifecycle timestamps · SNS/SQS manifests · `SOAPWritebackStatusCron`.
- **Follow-ups:** *Why async?* (§6) · *What happens if writeback fails?* (retry flag, notify count,
  status cron) · *What is Sikka?* (the middleman over Dentrix/Eaglesoft/Open Dental, queried with PQL) ·
  *Did you build the pipeline?* → **the boundary paragraph, §6.**
- **Never say:** "polling report status" — the portal does not poll.

### Bullet 4 — "Structured the portal on 10 Redux Toolkit slices with global auth middleware and route guards deriving access from role, tenant and subscription state."
- **Proof:** `state/store.ts` (10 reducers + `resetStore`) · `state/apiMiddleware.ts` · `router.tsx`
  `AuthGuard`.
- **Follow-ups:** *Walk me through the middleware* (§3, all four points) · *Why the login exception?*
  (infinite redirect loop — §3) · *Isn't the client-side guard a security hole?* (**§4 — it's UX; the
  server guards are the boundary.** This is the one they most want to hear you get right) · *Why two
  report slices?* (§2).

### Bullet 5 — "Worked directly with the US client on requirements, demos and release cycles, coordinating API contracts across the backend and mobile teams."
- **Proof:** §8 — the 400-status comment, shared auth across clients, `withCredentials`.
- **Follow-ups:** *Tell me about a cross-team conflict* → **the STAR story in §8** · *How do you handle a
  breaking API change?* · *How do you demo to a non-technical stakeholder?* (a dentist is exactly that).

---

## 11. Facts I must never get wrong

- **317** TypeScript files (218 `.tsx` + 99 `.ts`), **zero** JS. **19** application surfaces.
  **10** Redux slices. **4** roles. `DentistReports/index.tsx` = **2,246** lines.
- Roles: **Admin, Dentist, Dental Assistant, Trial User**.
- Tenancy key = **`officeId`** (practice location).
- **SOAP** = Subjective, Objective, Assessment, Plan. The entity is `SoapReport`.
- The three PMS platforms: **Dentrix, Eaglesoft, Open Dental**, reached via **Sikka**, queried with **PQL**.
- The AI chain: **Whisper transcribes → GPT analyses → a second call formats to JSON.** Not one call.
  **Integrated, not authored.**
- **The portal does not poll.** Writeback status polling is a backend cron.
- **The SOAP note tab is read-only.** Edit mode exists on aftercare summary and TC notes only.
- **No find-and-replace exists.** **The calendar is unfinished** (hard-coded operatories).
- **No test suite.**
- Status mapping: `complete`→REVIEW, `submitted`→REVIEWED, `paused`→CONTINUE.
- Architecture: **one NestJS codebase, seven processes, SNS/SQS, ECS via AWS Copilot.** Not microservices.
- **My scope is the portal.** The mobile app is a separate codebase **I have not read** — say that, never
  guess at it.

---

### Sources (grounding — every file is in `Learning/Dentscribe/`)

- **Portal shape:** `frontend/package.json` (`dentscribe-portal`); `frontend/src/content/applications/`
  (19 dirs); file counts under `frontend/src/`.
- **Roles + status:** `frontend/src/constants/index.tsx` — `ROLES` enum, `DB_REPORTS_STATUS_MAPPING`.
- **State:** `frontend/src/state/store.ts` (10 reducers, `resetActions`, `resetStore`, `RootState`,
  `useAppDispatch`/`useAppSelector`, the `// TODO` on hook adoption).
- **Auth middleware:** `frontend/src/state/apiMiddleware.ts` (five failure shapes, the login exception,
  the `// since statusCode was changed to 400 due to mobile app issue` comment, `resetAuth` +
  `localStorage.clear()` + `delay(2000)` + `window.location.href`).
- **Access guard:** `frontend/src/router.tsx` — `AuthGuard`, `allowedRoutes`, `updateAllowedRoutes`,
  the `officeId === null` branch, `practiceLocationEnabled`, `subscription.hasExpired`,
  `retrieveDataFromLocalStorage(['accessToken','refreshToken','sikkaToken','stripePublishKey'])`.
- **HTTP:** `frontend/src/axiosInstance.ts` (`baseURL` from `REACT_APP_APP_URL`, `withCredentials: true`).
- **Reports:** `frontend/src/content/applications/Reports/` — `DentistReports/index.tsx` (2,246 lines,
  `isAfterCareSummaryEditMode`, `isTcNotesEditMode`, `searchTerm`/`appliedSearchTerm`/`buildFilters`),
  `SOAPNoteTab.tsx` (read-only + `copyTextToClipboard`), `TranscriptTab.tsx`, `AfterCareSummaryTab.tsx`,
  `TcNotesTab.tsx`, `TmfWellnessReportTab.tsx`, `tmfWellnessReportPdfDownload.ts`,
  `tmfWellnessReportPrint.ts`, `ReportsList.tsx` + `ReportsListV2.tsx`.
- **Signature:** `frontend/src/state/report/reportSlice.ts` — `signature: { sign, signFont, name, title,
  license } | null`. *(Distinct from `uploadAgreementSignature` in `state/services/user/api.ts`, which is
  the legal-agreement signature — don't confuse them.)*
- **Billing:** `content/applications/Subscriptions/PaymentDetails/`, `PlanList/`,
  `CancelSubscriptionFlow/` (`RetentionStep`, `PauseDurationStep`, `FinalConfirmationStep`),
  `CancelSubscriptionModal/`; `@stripe/react-stripe-js` in `package.json`.
- **Admin:** `content/applications/AiCosting/PracticeList/` (`getAICostingV2`, `PracticeCostBarChart`),
  `TrialUsers/`, `Accounts/AssignRoles/`, `Referral/`.
- **Unfinished calendar:** `frontend/src/components/BigCalendar/index.tsx` (15 lines, dummy events
  commented out); `content/applications/Dashboards/index.tsx` (hard-coded `resources` OP-1…OP-4).
- **Pipeline (backend — fluency only, never authorship):**
  `backend-api/src/ReportWorkerService/app.handler.ts`; `backend-api/src/BackendApi/app/modules/upload/s3.service.ts`
  (`whisper-1`); `modules/reports/report.entity.ts` (lifecycle timestamps, `retryWriteback`,
  `writebackIds`, `failedWritebackNotifyCount`); `src/SOAPWritebackScheduleService/SOAPWritebackStatusCron.ts`;
  `copilot/report-worker-service/manifest.yml` (`count.range: 1-10`, queue-backlog scaling);
  `app/constants/index.ts` (`gpt-4o`, `gpt-5.1`, `gpt-5.2`).
- **Server-side auth guards (fluency only):** `backend-api/src/BackendApi/app/auth/roles.guard.ts`,
  `officeId-match.guard.ts`, `request-office-match.guard.ts`, `subscription.guards.ts`.
- **Mobile app:** *no source read — boundary only.* Backend evidence: `User.fcmToken`, `deviceType`
  (android | iOS) in `users/users.entities.ts`; FCM send in `src/WorkerService/app.handler.ts`.
