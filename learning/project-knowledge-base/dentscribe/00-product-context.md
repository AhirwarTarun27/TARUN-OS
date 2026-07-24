# Module 0 — Product & Business Context

**Goal:** explain what DentScribe *is*, what business it serves, and who pays for it — to someone who
has never set foot in a dental practice. Cold, in plain English, without a single technical term.

This module exists because of a specific interview failure mode: you describe the tech beautifully and
the interviewer still has no idea what the product does. DentScribe has an extra trap on top of that —
it's an **AI product**, so the lazy answer ("it's a ChatGPT wrapper for dentists") is right there,
sounds fine, and kills you. The value is not the model call. It's everything around it: pulling the
schedule out of the practice's own software, and pushing a finished clinical note back *into* it.
Module 0.5 turns this into the pitch; this module is the understanding underneath it.

**Study until you can explain the domain and the customer to a non-technical person, unprompted.**

---

## 1. The one sentence

> **DentScribe listens to a dental appointment, writes the clinical note the dentist would otherwise
> have typed up afterwards, and files it back into the practice's own management software
> automatically.**

Two products share one system: the **mobile app** the clinician records on chairside, and the **web
portal** (`dentscribe-portal`) where notes are reviewed, signed, and the practice is administered.
The portal is where I worked.

## 2. The domain, explained cold

This is the section to over-learn. Everything else depends on it.

### The business it serves

Every time a dentist sees a patient, they have to write it up — what the patient complained about,
what was observed, the diagnosis, the plan. That write-up is a legal record, it's what insurance
claims are built from, and it's what the next clinician reads. It's also unpaid work that happens
after the last patient leaves.

So the practice has a choice: pay the dentist's evening, or pay software. That's the market.

The catch — and this is the whole product — is that the note is worthless sitting in someone else's
app. It has to end up inside the practice's existing **practice management software** (Dentrix,
Eaglesoft, Open Dental), because that's where the patient chart, the schedule and the billing already
live. A dentist will not copy-paste. **Getting the note back in there is the hard part, not writing
it.**

### The chain of who pays whom

```
Dental practice  ─ subscribes ─►  DentScribe  ─ integrates via ─►  Sikka  ─ reads/writes ─►  the PMS
(practice owner                   (the product)                    (the data                 (Dentrix,
 buys the seats)                                                    middleman)                Eaglesoft,
                                                                                              Open Dental)
```

Much simpler than a relocation platform: **the practice pays directly**, by Stripe subscription. There
is no procurement middleman. But there *is* a technical middleman — **Sikka** — and it's the single
most important third party in the system. Every appointment, patient and procedure code comes from
Sikka, and every finished note goes back through Sikka. If Sikka is down, the product has nothing to
work on and nowhere to put the result.

### The vocabulary (an interviewer won't know these — knowing them makes you sound senior)

| Term | What it means |
|---|---|
| **SOAP note** | The standard clinical write-up format: **S**ubjective (what the patient says), **O**bjective (what the clinician observes), **A**ssessment (the diagnosis), **P**lan (what's being done). The core artifact — the entity is literally `SoapReport` |
| **PMS** | Practice Management Software — the system a dental office already runs on. Three supported: **Dentrix, Eaglesoft, Open Dental** |
| **Writeback** | Pushing the finished note back into the PMS. The thing the product is actually selling. It's asynchronous and it can fail, which is why there's a retry flag and a status-polling cron |
| **Sikka** | The third-party API that sits in front of every PMS and gives one interface to all of them. Queried with **PQL**, a SQL-like query language |
| **requestKey** | Sikka's per-practice access credential. It expires, so it gets refreshed — hence `sikkaRequestKey` + `sikkaRequestKeyCreatedAt` on the practice |
| **officeId** | The practice-location tenant key. Nearly every query and guard is scoped by it — this is the multi-tenancy boundary |
| **CDT code** | The standard billing code for a dental procedure (the dental equivalent of a medical CPT code). Drives what the note must justify |
| **Operatory** | A treatment room. A practice's daily schedule is organized as operatories × time slots |
| **Perio chart** | Periodontal charting — the per-tooth gum measurements taken during a cleaning. Tracked with its own status and submission history |
| **Recall** | The routine "you're due for a cleaning" cycle. Whether a patient is compliant with theirs is a core CoPilot signal |
| **TC notes** | **Treatment Coordinator** notes — the summary of the *money* conversation (treatment options, cost, scheduling), not the clinical one |
| **Aftercare summary** | The plain-English version generated for the patient to take home |
| **Specialist report** | The referral letter generated for an outside specialist |
| **Draft report** | A recording taken with **no appointment behind it** — keyed on patient + date instead. For when the visit isn't on the PMS schedule |

### The lifecycle of one note

This is the spine of the product. Learn it as a sequence — nearly every service maps to one step:

```
 1. Practice connects its PMS         (Sikka requestKey issued for the office)   → SikkaModule
 2. Schedule pulled                   (appointments, operatories, CDT codes)     → SikkaService (PQL)
 3. Clinician records the appointment (chairside)                                → mobile app
 4. Audio lands in S3                 (chunked, one folder per appointment)      → S3Service
 5. Message published                 (SNS topic → SQS queue)                    → BackendApi
 6. Audio transcribed                 (OpenAI Whisper, per chunk, then merged)   → ReportWorkerService
 7. Transcript + patient + codes      (assembled into one prompt)                → ReportWorkerService
 8. GPT writes the analysis           (then a second call formats it to JSON)    → ReportWorkerService
 9. Extra artifacts generated         (summary, aftercare, specialist report)    → ReportWorkerService
10. Clinician reviews and signs       (signature block on the report)            → portal
11. Submitted                         (status → submitted)                       → portal
12. Written back to the PMS           (via Sikka, returns a writeback id)        → BackendApi
13. Writeback status polled           (did the PMS actually accept it?)          → SOAPWritebackScheduleService
14. Notifications fired               (push / email / SMS at each milestone)     → WorkerService
```

Every one of those steps is visible in `SoapReport`'s own columns — `reportProcessingAt`,
`reportCompletedAt`, `initialNotificationSentAt`, `submittedAt`, `submittedForWritebackAt`,
`writebackSuccessAt`, `failedWritebackNotifyCount`, `retryWriteback`. **The entity is the pipeline
written down.** If you can recite this lifecycle, you can answer any "what does the product do"
question by pointing at a step.

**Note the shape of step 6-8:** it is not one AI call. It's transcribe → analyse → re-format, with a
feature flag (`GENRATE_REPORT_IN_SINGLE_CALL_WITH_GPT5`) for collapsing the last two into one. That
detail alone proves you worked on a real AI product and not a demo.

## 3. Who the customers are

Four distinct audiences. Naming all four is what separates "I worked on a dashboard" from "I
understood the business."

**1. The buyer — the practice owner.** Usually a dentist who owns the practice, sometimes a group.
They're buying back clinical time and cleaner records. They care about whether it actually files into
Dentrix, and what it costs per month. They self-serve: sign up, pick a plan, enter a card. The whole
Subscriptions / Plans / Payments surface exists for them.

**2. The clinical users — dentist, hygienist, dental assistant.** The people wearing gloves. They
record on the mobile app and review in the portal. Non-technical, mid-procedure, hands busy. The code
has real roles for this: `Dentist` and `Dental Assistant`, with an assistant able to work under a
dentist (`parentId`, `create-assistant-user.dto.ts`). **This audience never chose the software and
can't be trained on it** — same constraint as Dwellworks' transferees.

**3. The front office — treatment coordinator, staff contacts.** Not clinical. They handle the
treatment-plan and cost conversation, the follow-ups, the referrals. **TC notes** and the specialist
report are theirs. Easy to forget this audience exists; naming it shows you read the whole product.

**4. Internal DentScribe staff — admin and support.** The `Admin` role gets a different portal
entirely: trial-user management, the CoPilot batch processor, **AI costing** (per-model OpenAI token
spend per practice), telemetry, referrals, and a Zoho-backed support/webinar surface. There's a full
roles-and-permissions system underneath (`role`, `permission`, `rolePermissions` entities), so this
isn't a hardcoded admin flag.

**The one-liner if they ask "who are the users?":** *"Four groups — the practice owner who pays for
it, the clinicians who record with it, the front-office staff who use the treatment and referral
summaries, and our own admin and support team. The portal shows a different application to each."*

## 4. The business model — YOU FILL THIS IN

**The code cannot tell us what a practice is charged, and I will not invent it.** What the code *does*
show is subscription machinery, and it's detailed: Stripe customer + card on file, plan tiers with
product ids, free trials (`freeTrialUsed`), coupon codes with `discountPrice` and `durationInMonths`,
a pause/resume state with a source of `api | webhook | system`, cancellation with a reason list,
expiry guards that gate routes, and payment-failure emails. It also tracks **cost**: `AiCosting`
records OpenAI token spend per model per practice, which only matters if someone is watching margin.

Fill these in from what you actually know, and if you don't know, say so in the interview — *"I was on
the product side, I don't have the commercial detail"* is a completely fine answer:

- Per-seat, per-practice, or per-note? Monthly or annual?
- Roughly what does a practice pay? (Order of magnitude only — never quote a real contract.)
- Rough scale: how many practices, how many notes a day at peak?
- How many people on your team, and who else was on the platform?

> **Never fabricate a number to fill a pause.** Same rule as CloudForestX and Dwellworks. A made-up
> figure is the one thing an interviewer can catch you on cold — and in an AI product, "what did it
> cost you per note?" is a question a sharp interviewer will absolutely ask.

## 5. What the platform actually does — four buckets

Don't list screens. Group them. This is how you narrate a product with twenty applications in 30
seconds:

1. **Connect the practice and pull its world in.** Sikka onboarding, requestKey lifecycle, schedule
   and appointment sync, patient lookup, CDT and internal procedure-code import (including a Google
   Sheets import path). *"Everything the note needs to know before anyone speaks."*
2. **Turn a conversation into a signed clinical note.** Chunked audio to S3, Whisper transcription,
   GPT analysis, JSON formatting, the review-and-sign surface, perio charting, draft recordings.
   *"The core service people actually pay for."*
3. **Get it back into the PMS, and prove it landed.** Writeback through Sikka, writeback ids, retry
   flags, the status-polling cron, failed-writeback notifications. *"The part that makes it real
   instead of a transcript in a web app."*
4. **Run the business around it.** Signup with OTP and 2FA, roles and permissions, subscriptions and
   billing, AI cost tracking, trial users, referrals, training and learning resources, FAQ and Zoho
   support. *"Everything that isn't the note."*

**Plus the second act, which is where the product was heading:**
- **Dental CoPilot** — a per-patient briefing generated *before* the appointment: alerts, recall
  compliance, production opportunities, and rapport notes. Documentation looking forwards instead of
  backwards.
- **GPS** — a whole-day AI briefing across the practice's operatories: an executive summary, critical
  priorities, production intelligence and a closing directive for the day. Gated to specific offices
  by an allow-list, so it was clearly still being rolled out.
  **The acronym is never spelled out anywhere in either repo. If asked, say that** — don't guess.

## 6. Why one repo with seven services — the honest read

Do not describe this as a microservice architecture. It isn't, and claiming it invites a question
you'll lose. The accurate description:

> **"It's one NestJS codebase that builds seven different processes — an API, four workers and a
> couple of crons — all sharing the same source tree and the same Postgres. The real boundary in the
> system is the queue, not the service."**

The evidence, which you should be able to cite:

- **One `package.json`, seven entry points**: `start:api`, `start:worker`, `start:reportworker`,
  `start:draftreportworker`, `start:scheduled`, `start:writebackscheduler`, `start:dailySch`. Same
  repo, seven Dockerfiles, seven AWS Copilot manifests.
- **The workers import the API's own services directly.** `ReportWorkerService/app.handler.ts` pulls
  in `S3Service`, `ReportService` and `SikkaService` from `BackendApi/`. That is not a service
  boundary — it's a deployment boundary over shared code.
- **One Postgres, shared by everything**, ~21 TypeORM entities.
- **The genuine architectural win is the async split.** The API publishes to SNS topics
  (`soapreportgeneration`, `draftreportgeneration`, `dentScribeSendNotification`); workers subscribe
  through SQS. The report worker **autoscales 1-10 tasks on queue backlog and message latency**. That
  is a real, deliberate decision: report generation takes minutes and must not block an HTTP request
  or die with it.
- **Deployment is AWS Copilot on ECS** — a Load Balanced Web Service for the API, Worker Services for
  the consumers, secrets from SSM Parameter Store, three environments (test, stage, production) with
  their own pipelines. LocalStack stands in for S3/SQS/SNS locally.

**Why this framing wins.** "We split the long-running AI work onto queue-backed workers that scale on
backlog" is a strong, specific, senior answer. "We had microservices" is a claim the next two
questions will dismantle. Own the modular monolith; the queue is the interesting part.

## 7. Where you sit

**Frontend-heavy**, working in the `dentscribe-portal` React application — the review-and-sign surface
and the admin/business applications around it — integrating against the NestJS API.

The posture, word for word:

> *"I worked primarily on the front end — the DentScribe portal. But the portal is the window onto the
> whole pipeline: it starts recordings, polls report status, renders the generated SOAP note for
> review and signature, triggers writeback, and surfaces the Sikka connection state. I had to
> understand where each piece of that data came from to build against it. I won't claim I wrote the
> transcription workers or the Sikka integration, but I can walk you through how a recording becomes a
> note in the dentist's own software, and why it's built the way it is."*

**The boundary you never cross:** don't claim authorship of the worker services, the prompt
engineering, the Sikka/PQL layer, or the Copilot/ECS infrastructure. Claim *fluency*. An interviewer
respects "I integrated with it and understand it" enormously; they will destroy an overclaim in two
follow-ups.

**Where you can go deep without risk:** the portal architecture — ten Redux Toolkit slices, the
role-gated routing allow-list in `router.tsx`, the global 401 middleware that resets auth and
redirects, the `services/` API layer over a shared axios instance with `withCredentials`, MUI 5
theming, the data-grid and calendar surfaces, PDF generation in the browser. That's Module 3 and it's
your strongest material.

**The mobile app is a boundary, not a gap.** The chairside recording client is a separate codebase and
**I have not read it.** What the backend proves about it: it authenticates as the same user, uploads
audio to S3 in chunks, receives FCM push notifications, and reports a device type of android or iOS.
Say exactly that much and stop. Guessing at its internals is the same failure as inventing a price.

## 8. Facts I must never get wrong

- Domain: **AI clinical documentation for dental practices.** Not a scribe service. Not a
  transcription tool — transcription is step one of fourteen.
- The product's real value is the **writeback into the PMS**, not the AI note.
- The three supported PMS platforms: **Dentrix, Eaglesoft, Open Dental.** Reached through **Sikka**,
  queried with **PQL**.
- Central entity: **`SoapReport`**, scoped by **`officeId`**, keyed to an **appointment** and a
  **patient**. Status: start → inprogress → complete → submitted, with paused as the failure landing.
- **SOAP** = Subjective, Objective, Assessment, Plan.
- The AI chain: **Whisper transcribes → GPT analyses → a second call formats to JSON.** Not one call.
- Four audiences: practice owner (buyer) · clinicians · front office · internal admin/support.
- Architecture in one line: **one NestJS codebase deployed as seven processes on ECS, coupled by
  SNS/SQS, with the report worker autoscaling on queue backlog.** Not microservices.
- My role: **frontend-heavy on the portal.** The mobile app is a separate codebase I did not read.
- **I do not know the commercial model from the code** — §4 is mine to fill or to decline.

---

### Sources (grounding)

- **Product identity:** `frontend/package.json` (`dentscribe-portal`, author `dentscribe.ai`);
  `backend-api/package.json` (`dent-scribe`).
- **Central entity + lifecycle timestamps:** `backend-api/src/BackendApi/app/modules/reports/report.entity.ts`
  (`SoapReport`, `ReportStatus`, `PerioChartStatus`, `writebackIds`, `retryWriteback`,
  `reportProcessingAt`, `submittedForWritebackAt`, `writebackSuccessAt`, `failedWritebackNotifyCount`,
  `tcNotes`, `perioChart`, `signature`).
- **The AI chain:** `modules/upload/s3.service.ts` — `createTranscript` (OpenAI `whisper-1`),
  `createTranscriptAndUpload`, `checkAndCreateTranscript`; `src/ReportWorkerService/app.handler.ts`
  (prompt assembly, `getAnalysis` → `reportGenerator('createJsonFormat')`, summary / aftercare /
  specialist branches, `GENRATE_REPORT_IN_SINGLE_CALL_WITH_GPT5`).
- **Models in use:** `app/constants/index.ts` — `GPT5 = 'gpt-5.1'`, `GPT5_2 = 'gpt-5.2'`,
  `GPT4 = 'gpt-4o'`, plus a per-model pricing table used by AI costing.
- **Prompt assets (existence only — contents are product IP, not copied):**
  `modules/upload/instructions/` — `markup_prompt.txt`, `plan_prompt.txt`, `tc_notes_prompt.txt`
  (confirms TC = *treatment coordinator*), `Summary_report_prompt.txt`,
  `Pediatric_summary_report_prompt.txt`, `specialist_email_prompt.txt`, `tmf_prompt.txt`.
- **Sikka / PMS:** `modules/sikka/sikka.service.ts` (PQL query building, `SIKKA_TABLES`,
  appointment/patient field selectors, rate-limit extraction); `common/services/SikkaService.ts`;
  `modules/practices/practices.entity.ts` (`sikkaRequestKey`, `sikkaRequestKeyCreatedAt`, `PMSName`,
  `officeId`, `spuConfiguration`, `lastDataRefreshDateAndTime`).
- **Supported PMS list:** `frontend/src/utils/constantTypes.ts` — `pmsDropDownList`
  (Eaglesoft, Dentrix, OpenDental).
- **Roles + personas:** `frontend/src/constants/index.tsx` — `ROLES` (Admin, Dentist,
  Dental Assistant, Trial User); `modules/role/role.entity.ts`,
  `modules/permission/permission.entity.ts`, `modules/role/rolePermissions.entity.ts`;
  `modules/users/dtos/create-assistant-user.dto.ts`; `User.parentId` in `users/users.entities.ts`.
- **Writeback loop:** `src/SOAPWritebackScheduleService/` (`SOAPWritebackStatusCron.ts`,
  `SOAPWritebackStatusCron.module.ts`); `IS_WRITE_BACK`, `SEND_FAILED_WRITEBACK_NOTIFICATION`,
  `WRITEBACK_FAILED_NOTIFICATION_COUNT` in `copilot/backend-api/manifest.yml`.
- **Async architecture:** `copilot/backend-api/manifest.yml` (publishes `soapreportgeneration`,
  `draftreportgeneration`, `dentScribeSendNotification`);
  `copilot/report-worker-service/manifest.yml` (subscribes, `count.range: 1-10`,
  `scaling.queue.acceptable_backlog_per_task`, `queue_delay.acceptable_latency`);
  `src/WorkerService/app.handler.ts` (SQS consumer → push via FCM, email via mailer, SMS via Twilio).
- **Seven entry points:** `backend-api/package.json` scripts (`start:api`, `start:worker`,
  `start:reportworker`, `start:draftreportworker`, `start:scheduled`, `start:writebackscheduler`,
  `start:dailySch`); one Dockerfile per service directory.
- **Shared-code coupling (the "not microservices" evidence):** `src/ReportWorkerService/app.handler.ts`
  imports `S3Service`, `ReportService`, `SikkaService` from `src/BackendApi/app/modules/`.
- **Persistence:** `src/BackendApi/app/app.module.ts` (TypeORM Postgres, `autoLoadEntities`,
  `synchronize: true`); 21 `*.entity.ts` files; `docker-compose.yml` (Postgres + LocalStack
  for s3/sqs/sns).
- **Draft reports:** `modules/draft-report/draft-report.entity.ts` — unique on
  (`officeId`, `patientId`, `recordingDate`), `DraftReportType` general | soap, no `appointmentId`.
- **CoPilot + GPS:** `frontend/src/components/DentalCoPilot/index.tsx` (checklist tags Alert /
  Production / Followup / Monitor, recall profile, rapport); `modules/checklist/`;
  `frontend/src/content/applications/GPS/DentScribeGPS.tsx`; `src/common/constants/index.ts`
  (`GPSData`, `GPSMetadata`, `DailyNarrativeBriefing`, `ChecklistResponse`);
  `ALLOWED_GPS_OFFICE_IDS` in `copilot/backend-api/manifest.yml`. **No acronym expansion exists in
  either repo.**
- **Billing + AI cost:** `modules/payment/subscription.entity.ts`, `modules/payment/payments.entity.ts`,
  `modules/plans/plans.entity.ts`; `User.subscription` / `User.paymentInfo` jsonb in
  `users/users.entities.ts`; `frontend/src/content/applications/AiCosting/`;
  `modules/upload/dtos/ai-costing-v2.dto.ts`, `dashboard-ai-usage-summary-query.ts`.
- **Security surface:** `app/auth/` (JWT + local strategies; `roles.guard.ts`,
  `officeId-match.guard.ts`, `request-office-match.guard.ts`, `subscription.guards.ts`);
  `modules/otp/` + `modules/trusted-device/`; `User.failedLoginAttemptCount` / `canLoginAfter` /
  `inactivityTimeout`; `src/DailyScheduleService/sunday-data-purge.service.ts`.
- **Portal architecture:** `frontend/src/state/store.ts` (10 slices),
  `frontend/src/state/apiMiddleware.ts` (global 401 → reset + redirect),
  `frontend/src/router.tsx` (`AuthGuard`, per-role route allow-lists),
  `frontend/src/axiosInstance.ts` (`withCredentials`), `frontend/src/content/applications/`.
- **Mobile app:** *no source read — inferred boundary only.* Evidence is backend-side:
  `User.fcmToken`, `deviceType` (android | iOS) in `users/users.entities.ts`; FCM send in
  `src/WorkerService/app.handler.ts`; `DYNAMIC_LINK_*` secrets in `copilot/backend-api/manifest.yml`.
- **Business model:** *no source — deliberately blank.* §4 is Tarun's to supply.
