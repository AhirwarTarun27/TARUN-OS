# Module 4 — PMS integration and writeback

> **Phase 1 depth — covers the CV boundary only. Phase 2 extends this file in place.**
> Drilled in **D12** together with `02-ai-pipeline.md`.
>
> **The CV bullet ends with:** *"…and triggering writeback into the practice's management software."*
> That clause is the reason this module exists. **Writeback is 🔴** — you triggered it from the UI, you
> did not build it.
>
> **Naming rule (`defend-map.md`):** the CV says *"the practice's management software"* and names
> nobody, because it ships publicly. **In the room, name them: Sikka is the integration bridge;
> Dentrix, Eaglesoft and Open Dental are the practice management systems behind it.** Knowing the
> vocabulary is most of what separates a domain answer from a generic one.
>
> Grounded in `Documents/Learning/Dentscribe/backend-api`. **No practice names, patient data or real
> IDs appear in this file.**

## 1. Why a bridge exists at all

Dental practices run desktop PMS software on a machine in the office. There is no public cloud API to
POST a note into. **Sikka is the vendor that sits in the middle** — an agent inside the practice plus a
cloud API on the outside — so one integration reaches many different PMS products instead of one
integration per vendor.

**That is the whole business case, and it's the answer to "why was this hard?":** the product's value is
*writing the note back into the software the practice already uses*. A note you have to copy-paste saves
nobody 40 minutes.

## 2. `requestKey` — the credential the whole integration hangs on

Every call into the bridge carries a **`requestKey`**, scoped to one office:

```
getPracticeByOfficeId(officeId) → data.requestKey
```

It's a **session credential, not a permanent API key** — fetched per office, per run. The writeback cron
makes this concrete: if the key is missing, it logs *"Cron Job failure due to Sikka requestKey not
found"* and **`continue`s to the next office.** One practice's expired session does not stop the batch.

**That failure mode is the interesting part.** *"The integration is per-practice, so it degrades per
practice — one office losing its session doesn't take the run down"* is a systems answer, not a trivia
answer.

The pipeline uses the same key to read: `sikkaService.getPatientInfo(requestKey, patientId)`
(`02-ai-pipeline.md` §3). **The bridge is read *and* write** — chart data in, finished note out.

## 3. The writeback lifecycle — and where polling actually lives

A submitted report carries a **`writebackIds` map**: writeback id → status, each starting as the
literal string `'pending'`.

**`SOAPWritebackScheduleService/SOAPWritebackStatusCron.module.ts` → `recordSOAPWritebackStatus()`** is
the thing that resolves them:

1. Collect posted reports, group by `officeId`.
2. Get that office's `requestKey`.
3. For each still-`pending` writeback id → `getWritebackStatus(officeId, key, requestKey)`.
4. Read `items[0]` → `status`, `result`, `completed_time`, and replace the string in the map with
   `{ status, message, pmsPostTime }`.
5. Persist via `updateReportWritebackStatus({ id, writebackIds, writebackSuccess })`.

> ### **This is the polling. It is a backend cron. The portal never polls.**
>
> `cv-truth-table.md` records *"polling report status"* as a **deleted claim** — the portal's only
> `setInterval` watches an OAuth popup. If you say "the portal polled for writeback status" you have
> restored a claim the code contradicts. **Say: "status resolution was a backend cron; the portal read
> the resolved state."**

## 4. Retry — narrow on purpose

Failed writebacks are **not** blanket-retried. The cron only marks one for retry when:

```
status === 'failed'  AND  message includes 's4:validation'
```

then sets `retryWriteback: true`, `writebackStatusRequested: false`. The next run picks up
`"retryWriteback" = true` and calls `retryWriteback(appointmentId, officeId, WRITEBACK_INVOKE_FROM.CRON)`.

**Why narrow?** A validation rejection is deterministic and worth one more shot after the data is
corrected. A generic failure might be a real clinical or permissions problem, and **silently
re-submitting a medical record until it sticks is exactly what you don't want.** If they ask what you'd
change: *"I'd want a retry ceiling and a dead-letter path — as written, a report that keeps failing
validation keeps getting picked up."* That's an honest, senior observation.

## 5. Two operational details worth stealing for your own answers

**Rate discipline against a third-party API.** Retries run in **chunks of 10**, with a **20-second
delay between batches** and **another 20 seconds between offices**. Not clever, just disciplined — the
bridge reaches real machines in real dental offices and hammering it is how you get throttled or
blamed for someone's slow morning.

**Don't do work for churned customers.** `filterReportsByActivePractice` drops any report whose
practice has no active users before the retry loop runs, and logs the before/after count. Cheap, and it
keeps a dead tenant from generating API traffic and emails forever.

**And the alert-fatigue guard:** the same service watches whether each practice's data has refreshed
inside its configured `spcScheduleInterval`, emails support when it hasn't — and **stops after
`failedSpuDataRefreshNotifyCount >= 3`.** An alert nobody can silence is an alert everybody ignores.

## 6. Where you connect to it — the 🟢 edge

Your portal work touches this at exactly three points, and they are the ones to claim:

1. **Submitting** a reviewed report, which is what creates the writeback.
2. **Rendering** the resolved outcome — success, failure, the PMS post time.
3. **Surfacing** the failure so a human can act, backed by push/email/SMS notifications gated on each
   user's `notificationSetting`.

That is a genuinely good UI problem: **the user's action completes in a system you don't control, minutes
later, and might fail.** Say it that way.

## 7. The boundary

> **"I triggered writeback from the portal and I built the surfaces that show its outcome. The Sikka
> integration, the writeback cron and the retry logic were backend work I consumed, not work I wrote."**

Pair it with the pipeline boundary from `02-ai-pipeline.md` §6 and the mobile-app boundary — *"the
recording app is a separate codebase I didn't work in"* — and all three of DentScribe's 🔴 edges are
closed in about fifteen seconds.

## 8. Facts I must never get wrong

- **Sikka is the bridge. Dentrix, Eaglesoft, Open Dental are the PMS products.** Say all four in the
  room; print none on the CV.
- **`requestKey` is per-office and session-scoped**, fetched via `getPracticeByOfficeId`. Missing key =
  that office is skipped, not the whole run.
- **`writebackIds` is a map**, values start as `'pending'` and are replaced with
  `{ status, message, pmsPostTime }`.
- **Polling is a backend cron. The portal never polls.** This is a previously-deleted claim — do not
  restore it.
- **Retry is gated on `failed` + an `s4:validation` message.** Not blanket retry. **No retry ceiling
  exists** — volunteer that as the improvement.
- **Batches of 10, 20s between batches, 20s between offices.**
- The bridge is used **both ways**: patient info in (pipeline), finished note out (writeback).
- **Never claim you built the integration.** The CV word is *"triggering"*.
