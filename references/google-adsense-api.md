# Google AdSense Management API v2 — local reference

> Researched-once-saved-forever. Read this instead of a live MCP or the docs site.
> Refresh on command: "update the google-adsense-api reference".
> Last researched: 2026-06-30. Version: **v2**. Source: developers.google.com/adsense/management

**What this API is for:** reading earnings + performance data (programmatic reporting and
inventory management). It is essentially **read-only**. It does NOT place ads — that's done
by the AdSense **ad code** (`ca-pub-…` client + ad-unit slot ids) embedded in the site
(GradeJar already has env-gated `<AdSlot>` components for this). Use this API to *monitor*
revenue/RPM per site/page and to fetch ad-unit slot ids.

---

## 1. Base URL + auth

- **Base URL:** `https://adsense.googleapis.com/v2`
- **Auth:** OAuth 2.0 (3-legged user consent). Scopes:
  - `https://www.googleapis.com/auth/adsense.readonly` — read reports/inventory (use this)
  - `https://www.googleapis.com/auth/adsense` — read + manage (create ad units, channels)
- **No service accounts.** The AdSense API requires a real user's consent. For unattended
  automation: do the OAuth consent once with `access_type=offline`, store the **refresh
  token**, exchange it for short-lived access tokens going forward.
- **Request header:** `Authorization: Bearer <access_token>`
- **Account id format:** `accounts/pub-XXXXXXXXXXXXXXXX` (your publisher id; find via
  `accounts.list`).

### One-time OAuth setup (to get a refresh token)
1. Google Cloud Console → enable "AdSense Management API" → create OAuth client (Desktop or Web).
2. Consent with `scope=...adsense.readonly`, `access_type=offline`, `prompt=consent`.
3. Exchange the auth code at `https://oauth2.googleapis.com/token` → save `refresh_token`.
4. Refresh anytime: POST `oauth2.googleapis.com/token` with
   `grant_type=refresh_token&refresh_token=…&client_id=…&client_secret=…`.

---

## 2. Resources & methods

| Resource | Methods |
|---|---|
| `accounts` | `list`, `get`, `listChildAccounts`, `getAdBlockingRecoveryTag` |
| `accounts.adclients` | `list`, `get`, `getAdcode` |
| `accounts.adclients.adunits` | `create`, `get`, `list`, `patch`, `getAdcode`, `listLinkedCustomChannels` |
| `accounts.adclients.customchannels` | `create`, `delete`, `get`, `list`, `patch`, `listLinkedAdUnits` |
| `accounts.adclients.urlchannels` | `get`, `list` |
| `accounts.sites` | `list`, `get` |
| `accounts.reports` | `generate`, `generateCsv`, `getSaved` |
| `accounts.reports.saved` | `generate`, `generateCsv`, `list` |
| `accounts.payments` | `list` |
| `accounts.alerts` | `list` |
| `accounts.policyIssues` | `get`, `list` |

Common quick calls:
- `GET /v2/accounts` → find `accounts/pub-…`
- `GET /v2/accounts/pub-…/adclients` → find the ad client (`ca-pub-…`)
- `GET /v2/accounts/pub-…/adclients/{adclient}/adunits` → ad units + their slot ids/ad code
- `GET /v2/accounts/pub-…/sites` → registered sites + their approval state

---

## 3. The workhorse: `accounts.reports.generate`

```
GET https://adsense.googleapis.com/v2/{account=accounts/*}/reports:generate
```

**Query params:**
- `metrics[]` (required) — e.g. `ESTIMATED_EARNINGS`, `CLICKS`, `PAGE_VIEWS`,
  `IMPRESSIONS`, `PAGE_RPM`, `IMPRESSIONS_RPM`, `IMPRESSIONS_CTR`, `COST_PER_CLICK`,
  `AD_REQUESTS`, `MATCHED_AD_REQUESTS`.
- `dimensions[]` — e.g. `DATE`, `MONTH`, `WEEK`, `DOMAIN_NAME`, `URL_CHANNEL_NAME`,
  `AD_UNIT_NAME`, `COUNTRY_NAME`, `PLATFORM_TYPE_NAME`, `AD_CLIENT_ID`.
- `dateRange` — enum: `TODAY`, `YESTERDAY`, `MONTH_TO_DATE`, `YEAR_TO_DATE`,
  `LAST_7_DAYS`, `LAST_30_DAYS`, `CUSTOM` (default if unset → needs start/end).
- `startDate.year/month/day` + `endDate.year/month/day` — for `CUSTOM`.
- `orderBy[]` — dimension/metric with `+`/`-` prefix (e.g. `-ESTIMATED_EARNINGS`).
- `filters[]`, `currencyCode` (ISO-4217), `reportingTimeZone`, `languageCode`,
  `limit` (default 100,000; CSV variant 1,000,000).

**Sample — month-to-date earnings by day:**
```bash
curl "https://adsense.googleapis.com/v2/accounts/pub-1234567890/reports:generate\
?dateRange=MONTH_TO_DATE\
&metrics=ESTIMATED_EARNINGS&metrics=PAGE_VIEWS&metrics=PAGE_RPM&metrics=CLICKS\
&dimensions=DATE&orderBy=+DATE" \
  -H "Authorization: Bearer $ADSENSE_TOKEN"
```

**Sample — earnings by site (compare JsonBeam vs GradeJar):**
```
?dateRange=LAST_30_DAYS&metrics=ESTIMATED_EARNINGS&metrics=PAGE_RPM
&dimensions=DOMAIN_NAME&orderBy=-ESTIMATED_EARNINGS
```

`generateCsv` is the same params, returns CSV instead of JSON — handy for the AIOS to
drop a weekly earnings snapshot into `shipped.md` / a report.

---

## 4. Practical notes for this project
- Use `adsense.readonly` for all monitoring (the AIOS only needs to *read* earnings).
- Earnings are **estimated** and lag/finalize; treat daily numbers as directional.
- A site must be **approved** (`accounts.sites` state) before it serves real ads — check
  this at GradeJar go-live.
- Rate limits are modest; cache results, don't poll tighter than ~hourly.
- Pair with [[google-analytics-api]] (traffic) — AdSense tells you $$, GA4 tells you who/why.
