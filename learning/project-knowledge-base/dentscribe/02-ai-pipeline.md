# Module 2 — The AI pipeline

> **Phase 1 depth — covers the CV boundary only. Phase 2 extends this file in place.**
> Drilled in **D12** together with `04-sikka-integration.md`.
>
> **The CV bullet:** *"Integrated the portal against a queue-backed AI generation pipeline, surfacing
> report state and triggering writeback into the practice's management software."* The portal is 🟢.
> **The pipeline is 🔴** — the workers and the prompts are not yours.
>
> **What Phase 1 needs:** trace the path end to end, name the two-call design and why it exists, know
> the states the portal renders, and hand the workers back. **What it does not need:** the prompt
> contents, the model tuning, or the batch machinery.
>
> Grounded in `Documents/Learning/Dentscribe/backend-api`. **IP rule from the kb README holds: prompt
> files are named and their role described. Their contents are never copied — they are the product.**

## 1. The path, in one breath

**Audio lands in S3 → SNS publishes → SQS delivers → a worker transcribes it, pulls the patient's chart
from the practice management system, sends both to the LLM to reason, sends the reasoning back to the
LLM to format as JSON, writes the result to S3, flips the report to `complete`, and notifies the user.**

The portal watches the status field. It does not run any of this.

## 2. The trigger — a queue, and what rides on it

`ReportWorkerService/app.handler.ts` — `SOAPReportMessageHandler`, an `@SqsMessageHandler` bound to
`COPILOT_QUEUE_URI`. The message body is an SNS envelope, so the real payload is
`JSON.parse(_.get(obj, 'Message'))`:

```
requestId · fileName · requestKey · userId · fcmToken · firstName · officeId
```

**Two of those are worth pointing at:**

- **`officeId` travels in the message.** Tenancy is carried through the queue, not re-derived on the
  other side. Every subsequent call — `findReportByIdAndOfficeId`, `updateReport`, the writeback —
  takes it explicitly. **A multi-tenant medical product that inferred the tenant inside a worker would
  be one bug away from cross-practice data leakage**, and that is a very good thing to say out loud.
- **`requestKey`** is the practice-management session credential. See `04-sikka-integration.md` §2.

## 3. The steps, in order

1. **Stamp `reportProcessingAt`.** The pipeline is timestamped at each stage —
   `reportProcessingAt` → `reportCompletedAt` → `finalNotificationSentAt`. That's how "40-50 minutes
   saved per visit" becomes measurable rather than a slogan.
2. **`checkAndCreateTranscript`** then **`finishUploading`** → returns `mergedText`. Recordings arrive
   in chunks; this is where they become one transcript.
3. **`getReportPlan`** → `predefinedPlan`, `procedureKeys`, `procedureCodes`, `patientId`,
   `description`. If there is no predefined plan and no procedure codes, the run is flagged
   `generateFullReport` and the plan section is stubbed per procedure key instead of invented.
4. **`sikkaService.getPatientInfo(requestKey, patientId)`** — **the PMS is called inside the pipeline.**
5. **Build one tagged prompt input:**
   ```
   <Transcript> … <Procedure_Keys> … </Procedure_Keys>
                 <Patient_Information> … </Patient_Information>
                 <Appointment_Details> … </Appointment_Details>
                 <CDT_Codes> … </CDT_Codes> </Transcript>
   ```
   Delimited sections, not one prose blob. Uploaded to S3 as
   `…_final_transcript_with_meta.txt` **before** the model is called.
6. **Call 1 — `getAnalysis(promptText, …)`.** Clinical reasoning, free text.
7. **Call 2 — `reportGenerator('createJsonFormat', …)`** with `markupPromptText`, fed the *output of
   call 1*. Turns the reasoning into the structured note. The composed prompt is also written to S3.
8. **Optional calls, gated per user setting:** report summary (`Summary_report_prompt.txt` → `TLDR`),
   aftercare summary, specialist report. Each is behind both a user setting **and** an env flag.
9. **`uploadReportToS3`** → `reportUrl` → status `COMPLETE`, plus `procedureKeys` and the generation
   flags. Then an SNS publish (`ems.sendNotification`) for push/email.

## 4. The three design decisions worth defending

**Why a queue at all?** Transcription plus three-to-five LLM calls is minutes of work. Holding an HTTP
request open for that is not an option, and the mobile app that uploads the audio must be free to leave.
The queue also gives you retry and back-pressure for free when a model provider is slow.

**Why two LLM calls instead of one?** *Reason first, format second.* Asking a model to do clinical
reasoning **and** emit strict JSON in one shot degrades both — you get worse notes and more parse
failures. Splitting them means each call has one job, and the formatting call can be given a cheaper or
differently-tuned model. **The code shows they were testing the alternative:** an env flag
`GENRATE_REPORT_IN_SINGLE_CALL_WITH_GPT5` (typo is in the real variable name) runs a single-call path
alongside the two-call one. *"They were A/B-ing whether a stronger model made the split unnecessary"*
is the honest and interesting way to say it.

**Why write every intermediate prompt to S3?** It's a medical record generated by a model. When a
clinician disputes a note, you need the exact input that produced it. **That's auditability, and in
healthcare it's not optional.** Volunteer this — it's the answer that shows you understood the domain
and not just the plumbing.

## 5. What the portal actually sees — and this is your 🟢 half

`ReportStatus` (`modules/reports/report.entity.ts`):

```
start · inprogress · submitted · complete · paused
```

That enum **is** the contract between the pipeline and your UI. The portal renders state from it and
nothing else.

**`paused` is the one to explain.** In the worker's `catch`, if the report is not already `submitted`
or `complete`, status is set to `PAUSED`. So a pipeline failure becomes **a visible, recoverable state**
rather than a report stuck on a spinner forever. *"Failures surface as a state the user can see and act
on"* is a far better sentence than *"we had error handling."*

**The portal never polls for this** — see `04-sikka-integration.md` §3 and
`cv-truth-table.md`. Polling is a backend cron. Getting this wrong is a deleted-claim regression.

## 6. The boundary — say it early, unprompted

> **"I built the portal that sits on top of this pipeline — the report review surface, the state
> handling, the role-gated access. I did not write the transcription workers, the prompts, or the
> practice-management integration. On the backend I wrote CRUD and support endpoints, not the AI
> pipeline."**

That last clause matters since the DentScribe backend was raised to 🟢 for the CRUD/support tier on
2026-07-29 (`fact-bank.md`). **The raise did not move the pipeline boundary and never may.**

**If pushed — "so what did you actually have to understand?"** — the good answer is the contract:
*"Enough to build against it. The status enum, the shape of the JSON the formatting call produces,
which sections are editable and which aren't, and what `paused` means for the user. I designed the UI
around a process that could fail halfway."*

## 7. Facts I must never get wrong

- **SNS → SQS → worker.** Not a webhook, not a cron, not a direct call.
- **`officeId` rides in the message.** Tenancy is explicit end to end.
- **Two LLM calls: analyse, then format.** A single-call path exists behind an env flag.
- **The PMS is called inside the pipeline** to ground the prompt in chart data.
- **Prompts live in S3**, loaded by `readFiles()` / `readLocalFiles()` — **not** in the codebase, **not**
  version-controlled. That is a real weakness and it's Module 7 material. **Never quote their contents.**
- **Status enum: `start · inprogress · submitted · complete · paused`.** `paused` = failed and
  recoverable.
- **Every prompt and intermediate output is archived to S3** for audit.
- **The portal does not poll.** Ever.
- **Never claim the pipeline.** The CV word is *"integrated against"*, and that is exactly what it says.
- **Do not name the framework.** `fact-bank.md` is explicit: say *"Node.js and TypeScript REST
  endpoints."* Naming it invites a question with no upside.
