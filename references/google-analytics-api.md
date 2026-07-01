# Google Analytics 4 (GA4) API — local reference

> Researched-once-saved-forever. Read this instead of a live MCP or the docs site.
> Refresh on command: "update the google-analytics-api reference".
> Last researched: 2026-06-30. Version: **v1beta**. Source: developers.google.com/analytics

Two APIs:
- **Data API** — run reports (traffic, users, pageviews, sources). The one you'll use most.
- **Admin API** — manage accounts/properties; find the numeric property id.

> GA4 only. Universal Analytics (UA) is retired. The `G-XXXXXXX` you put in the site tag is
> the **measurement id**; the API uses the **numeric property id** (e.g. `properties/123456789`).

---

## 1. Auth (do this once)

- **Scope:** `https://www.googleapis.com/auth/analytics.readonly`
- **Two options:**
  - **Service account (preferred for unattended automation).** GA4 *does* support service
    accounts (unlike AdSense). Steps:
    1. Google Cloud Console → enable "Google Analytics Data API" + "Admin API" → create a
       service account → download its JSON key.
    2. In GA4 Admin → Property → Property Access Management → add the service account email
       (`…@….iam.gserviceaccount.com`) as a **Viewer**.
    3. Auth with the JSON key (google-auth library mints tokens automatically — no consent flow).
  - **OAuth2 user consent** — same 3-legged + refresh-token flow as [[google-adsense-api]]
    (use if you'd rather not create a service account).
- **Request header:** `Authorization: Bearer <access_token>`

---

## 2. Data API — base + methods

- **Base URL:** `https://analyticsdata.googleapis.com/v1beta`
- Methods (POST, on `properties/{id}:method`):
  | Method | Use |
  |---|---|
  | `runReport` | Standard report (the workhorse) |
  | `batchRunReports` | Up to 5 reports in one call |
  | `runPivotReport` | Pivoted/cross-tab report |
  | `runRealtimeReport` | Last 30 min of activity |
  | `getMetadata` | List all dimensions/metrics available for a property |
  | `checkCompatibility` | Validate a dimension+metric combo before running |

### `runReport`
```
POST https://analyticsdata.googleapis.com/v1beta/properties/{property_id}:runReport
```
**Body fields:** `dimensions[]` (`{name}`), `metrics[]` (`{name}`), `dateRanges[]`
(`{startDate,endDate}` — `YYYY-MM-DD`, or relative like `7daysAgo`, `today`, `yesterday`),
`dimensionFilter`, `metricFilter` (FilterExpression), `orderBys[]`, `limit` (default 10,000,
max 250,000), `offset`, `metricAggregations`, `keepEmptyRows`, `currencyCode`.

**Common dimensions:** `date`, `country`, `city`, `pagePath`, `pageTitle`,
`landingPage`, `sessionSource`, `sessionMedium`, `sessionDefaultChannelGroup`,
`deviceCategory`, `browser`.
**Common metrics:** `activeUsers`, `newUsers`, `totalUsers`, `sessions`,
`screenPageViews`, `engagementRate`, `engagedSessions`, `averageSessionDuration`,
`bounceRate`, `eventCount`, `screenPageViewsPerSession`.

**Sample — last 28 days, top pages by views (find GradeJar's best landing pages):**
```bash
curl -X POST \
 "https://analyticsdata.googleapis.com/v1beta/properties/123456789:runReport" \
 -H "Authorization: Bearer $GA_TOKEN" -H "Content-Type: application/json" \
 -d '{
   "dateRanges":[{"startDate":"28daysAgo","endDate":"today"}],
   "dimensions":[{"name":"pagePath"}],
   "metrics":[{"name":"screenPageViews"},{"name":"activeUsers"},{"name":"engagementRate"}],
   "orderBys":[{"metric":{"metricName":"screenPageViews"},"desc":true}],
   "limit":"25"
 }'
```

**Sample — acquisition (where US traffic comes from):**
```json
{
  "dateRanges":[{"startDate":"30daysAgo","endDate":"today"}],
  "dimensions":[{"name":"sessionDefaultChannelGroup"},{"name":"country"}],
  "metrics":[{"name":"sessions"},{"name":"engagedSessions"}],
  "orderBys":[{"metric":{"metricName":"sessions"},"desc":true}]
}
```

---

## 3. Admin API — find your property id

- **Base URL:** `https://analyticsadmin.googleapis.com/v1beta`
- `GET /v1beta/accounts` → your GA accounts.
- `GET /v1beta/properties?filter=parent:accounts/{accountId}` → properties under an account;
  each `name` is `properties/{numericId}` — that numeric id is what the Data API needs.
- `GET /v1beta/properties/{id}` → property details.

---

## 4. Practical notes for this project
- Pair with [[google-adsense-api]]: GA4 = traffic/behavior (who, where, which page),
  AdSense = revenue (how much). Joining `pagePath` (GA4) with `DOMAIN_NAME`/page (AdSense)
  shows which content earns.
- For the weekly review, a single `runReport` (sessions + users + top pages, last 7 days
  per property) is enough to bank a traffic snapshot.
- `getMetadata` lists *custom* dimensions/metrics too — check it if a name 400s.
- Data can be slightly delayed (standard processing); realtime via `runRealtimeReport`.
- Quotas are per-property token buckets; cache, don't hammer.
