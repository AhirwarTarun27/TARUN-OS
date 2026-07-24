# DentScribe — CV Truth Table

**What the CV claims vs. what the repos actually back.** Read before any interview where DentScribe
will be probed.

Flags: 🟢 built it / can claim authorship · 🟡 integrated, claim fluency not authorship · 🔴 not yours.

Last verified against `Learning/Dentscribe/` (`frontend/` + `backend-api/`): **2026-07-24**.
No `.git` in the folder, so authorship is grounded in code + Tarun's account.

---

## The live CV bullets

| # | CV line | Proof file | Flag |
|---|---|---|---|
| 1 | Built the React and TypeScript portal for a multi-tenant clinical product: 19 surfaces spanning clinical review, billing and admin across four user roles | `content/applications/` = 19 dirs; `constants/index.tsx` `ROLES` enum = 4; 317 TS files / 0 JS; `officeId` tenancy | 🟢 |
| 2 | Built the report review surface for AI-generated clinical notes -- tabbed note, transcript, aftercare and coordinator sections with per-section editing | `Reports/DentistReports/` — SOAPNoteTab, TranscriptTab, AfterCareSummaryTab + `isAfterCareSummaryEditMode`, TcNotesTab + `isTcNotesEditMode`, TmfWellnessReportTab | 🟢 |
| 3 | Integrated the portal against a queue-backed AI generation pipeline, surfacing report state and triggering writeback into the practice's management software | portal side 🟢 (`reportSlice`, status mapping, submit + writeback trigger); pipeline itself is backend | **portal 🟢 · pipeline 🟡 · prompts/workers/Sikka 🔴** |
| 4 | Structured the portal on 10 Redux Toolkit slices with global auth middleware and route guards deriving access from role, tenant and subscription state | `state/store.ts` (10 reducers + `resetStore`); `state/apiMiddleware.ts`; `router.tsx` `AuthGuard` | 🟢 |
| 5 | Worked directly with the US client on requirements, demos and release cycles, coordinating API contracts across the backend and mobile teams | `apiMiddleware.ts` 400-status comment; shared auth across clients; `withCredentials` | 🟢 |

---

## Removed on 2026-07-24 — and why they may never come back

| Removed claim | What the repo actually says |
|---|---|
| "clinical note editor with **inline find-and-replace**" | **Does not exist.** Searched all 317 files. The only `searchTerm` (`DentistReports/index.tsx:233`) is a **server-side list filter** — `buildFilters()` sends `{ search: … }` to the reports-list API. Nothing resembling find-and-replace anywhere. |
| "the **clinical note editor** with per-section editing" | `SOAPNoteTab.tsx` is **149 lines and read-only** — it fetches content and offers copy-to-clipboard, with no edit mode. Edit mode exists on **two** tabs only: aftercare summary and TC notes. Reworded to name those two; **never say "the note editor".** |
| "**polling** report status" | The portal has **no** report polling. The only `setInterval` in the front end is `SikkaWebView/index.tsx:36`, checking every 2s whether an OAuth popup closed. Writeback status polling is a **backend cron** (`SOAPWritebackStatusCron.ts`). Say **"surfacing report state"**. |
| "daily appointment **calendar** laid out as **operatories against time slots**, with a multi-stage review workflow" | `components/BigCalendar/index.tsx` is a **15-line pass-through wrapper**; every operatory event is commented out under `// TODO:REMOVE DUMMY EVENTS`. The Dashboard's `resources` is a **hard-coded four-item array** (`OP-1`…`OP-4`), not the practice's real operatories. **Bullet dropped entirely — do not claim the calendar.** |
| "review-and-sign … through **clinician signature** to submission" | Partly real but overstated. `reportSlice.ts` carries a typed `signature { sign, signFont, name, title, license }`, so the portal **renders and carries** it. There is no signature-capture UI in the portal — `uploadAgreementSignature` is the **legal-agreement** signature, a different thing. Folded into bullet 2 without the word "sign". |
| "per-**model** tracking of AI token spend" | AI costing is real (`AiCosting/PracticeList/`, `getAICostingV2`, `PracticeCostBarChart`) and the backend has a per-model pricing table, but the portal surface is **per-practice**. Folded into bullet 1's "billing and admin" rather than claiming per-model in the UI. |
| **JavaScript** (tech stack) | 218 `.tsx` + 99 `.ts`, **zero** `.js`/`.jsx`. |

---

## Words to never use about this project

| Never say | Say instead | Because |
|---|---|---|
| find-and-replace | "server-side search and date filtering on the reports list" | does not exist |
| "the note editor" / "editable SOAP note" | "aftercare and coordinator sections with per-section editing" | SOAPNoteTab is read-only |
| "the portal polls report status" | "the portal surfaces report state; a backend cron polls writeback" | no polling in the front end |
| "built the appointment calendar" | (nothing) | 15-line wrapper, hard-coded operatories |
| "I built the AI pipeline / wrote the prompts" | "I integrated against it; the portal is the window onto it" | 🔴 — prompts are the product's core IP |
| "I built the Sikka integration" | "Sikka is the middleman over Dentrix/Eaglesoft/Open Dental, queried with PQL — I consumed it" | 🔴 |
| "microservices" | "one NestJS codebase deployed as seven processes, coupled by SNS/SQS" | the workers import the API's own services |
| anything about the mobile app's internals | "that's a separate codebase I didn't work in" | never read it |
| "the route guard secures the app" | "the guard is UX; the server's role and officeId guards are the boundary" | client-side checks aren't security |

---

## The authorship boundary, in one paragraph

> *"To be clear on scope: I built the portal. I did not write the transcription workers, the prompts, or
> the Sikka integration. I integrated against all of it — the portal is the window onto that pipeline,
> so I had to know how a recording becomes a note and what every report state means to build the review
> surface. But I'd be overclaiming if I said I built the AI pipeline."*

**And on the mobile app:** *"The chairside recording app is a separate codebase I didn't work in. What I
know from our side is that it authenticates as the same user, uploads audio to S3 in chunks, and gets
push notifications. I'd rather say that than guess at its internals."*

---

## Numbers that are safe to quote

- **317** TypeScript files (218 `.tsx` + 99 `.ts`), **zero** JavaScript
- **19** application surfaces · **10** Redux Toolkit slices · **4** user roles
- `DentistReports/index.tsx` = **2,246** lines *(quote it as a weakness, not an achievement)*
- **3** supported PMS platforms (Dentrix, Eaglesoft, Open Dental) · **5** auth-failure shapes handled
- Team **10** · **Oct 2022 – Jun 2023** · **40-50 minutes saved per visit** *(the product's own business
  claim — attribute it that way: "the product's pitch was 40-50 minutes back per visit". Do not present
  it as a number you measured.)*

## Numbers that do NOT exist — never invent them

No practice count. No notes-per-day. No revenue, pricing or contract values. No AI cost per note. No
accuracy or WER figure for the transcription. No test coverage. No bundle or performance metric.
**"What did it cost you per note?" is a question a sharp interviewer will ask about an AI product — the
correct answer is "I was on the product side, I don't have that number."**
