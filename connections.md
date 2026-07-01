# Connections

Registry of every system your AIOS can reach. Filled by `/onboard` from Q4-Q7 answers; expanded over time as you wire new tools. `/audit` checks this file for domain coverage and freshness.

| # | Domain | Tool | Mechanism | Auth | Last checked |
|---|---|---|---|---|---|
| 1 | Revenue / Financials | Google AdSense (account exists; currently $0) | key+ref → `references/google-adsense-api.md` | OAuth2 refresh token (to wire) | 2026-06-30 |
| 2 | Customer interactions | None yet — pre-launch, no audience inbox | not yet connected | — | — |
| 3 | Calendar | TBD (work calendar is OUT of scope) | not yet connected | — | — |
| 4 | Communication | Product marketing channel TBD — NOT LinkedIn (job-only), work email @thinksys.com is OUT | not yet connected | — | — |
| 5 | Project / task tracking | `week.md` (this repo) | not yet connected | — | — |
| 6 | Meeting intelligence | None (solo builder, no recordings) | not yet connected | — | — |
| 7 | Knowledge / files | This repo + local; Notion, Google Drive, Google Docs (lightly used) | not yet connected | — | — |

## Infrastructure & measurement (API-via-reference, not MCP)

Per the token-efficiency rule, these are used through their REST APIs with a local
reference file instead of a live MCP server. Accounts already exist (Tarun's).

| Tool | Used for | Reference file | Auth | Last checked |
|---|---|---|---|---|
| Cloudflare | Hosting (Pages), DNS, domain registrar (JsonBeam bought here; GradeJar at go-live), Web Analytics | `references/cloudflare-api.md` | Scoped API token (Bearer) | 2026-06-30 ✓ verified |
| Google AdSense | Earnings/performance reporting (read-only) | `references/google-adsense-api.md` | OAuth2 refresh token | 2026-06-30 ✓ verified |
| Google Analytics 4 | Traffic/behavior reporting | `references/google-analytics-api.md` | Service account (Viewer) | 2026-06-30 ✓ verified |

Secrets live in `.env` (gitignored); GA4 key JSON in `secrets/` (gitignored). Re-test all
three any time with: `node scripts/verify-connections.mjs` (read-only, prints no secrets).

**Mechanism options:** `mcp` (MCP server), `script` (Python/Bash hitting an API, in `scripts/`), `export` (CSV/JSON dump pipeline), `key+ref` (`.env` key + `references/{tool}-api.md` guide), `not yet connected`.

When you wire a new tool, also save `references/{tool}-api.md` capturing endpoints, auth flow, and common queries — researched-once-saved-forever.

---

**Boundaries (do not cross):**
- `@thinksys.com` work email + all employer/work communication stay OUT of the AIOS.
- LinkedIn is professional/job-growth only — never used as a product-marketing channel.
