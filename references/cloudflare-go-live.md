# Cloudflare go-live — API reference

> Researched-once-saved-forever. The API layer under `.claude/skills/cloudflare-go-live/`.
> Read the SKILL.md for the runbook and the gotchas. This file is the endpoint detail.
> Last researched: **2026-07-12**. API version: **v4**. Every endpoint below was verified
> against developers.cloudflare.com on that date, not recalled from memory.
>
> Supersedes `cloudflare-api.md` for anything Workers-related. That file is Pages-era and
> Pages is the wrong product for this stack (see §6).

Base URL `https://api.cloudflare.com/client/v4`, Bearer token, and **every response is
`{ success, errors, messages, result }`**. Cloudflare returns **HTTP 200 with
`success: false`** on logical errors, so branch on `success`, never on the status code.

---

## 1. Token permissions

The Pages-era token (`Zone → DNS`, `Account → Pages`, `Zone → Analytics`) is **not enough**.
A go-live needs:

| Surface | Permission group |
|---|---|
| Find / create the zone | `Zone → Zone → Edit` (Edit, not Read — Read cannot create) |
| DNS records | `Zone → DNS → Edit` |
| Worker custom domains | `Account → Workers Scripts → Edit` |
| www redirect rule | `Zone → Single Redirect → Edit` (see naming trap below) |
| Always Use HTTPS | `Zone → Zone Settings → Edit` |
| Turnstile widget | `Account → Turnstile → Edit` |
| Email Routing — destinations | `Account → Email Routing Addresses → Edit` |
| Email Routing — forwarding rules | `Zone → Email Routing Rules → Edit` |

**Email Routing is two permission groups, not one.** Destination addresses are account-scoped;
the forwarding rules are zone-scoped. Grant only one and the email step dies halfway.

Set **Resources** to the account + `All zones`, so a new client domain works without editing
the token again.

A missing permission surfaces as a flat **`10000: Authentication error`** with no indication
of which one. `scripts/cloudflare-go-live.mjs` probes each surface at preflight and names
the missing group — that probe exists solely because this error message is useless.

Edit a token at: dashboard → My Profile → API Tokens → Edit. Cannot be self-granted via API.

---

## 2. Zone

| Action | Call |
|---|---|
| Find | `GET /zones?name=example.com` → `result[0]` |
| Create | `POST /zones` `{ name, account: { id }, type: "full" }` |

The create response carries `name_servers` (the two to paste at the registrar) and `status`.
Status is `pending` until the registrar's nameservers actually point at Cloudflare, then it
flips to `active`. **Nothing downstream works while it is `pending`** — the script hard-gates
on this rather than letting later steps fail confusingly.

There is no registrar API for BigRock. Repointing nameservers is manual, always.

---

## 3. Worker custom domain

```
PUT /accounts/{account_id}/workers/domains
{ "hostname": "example.com", "service": "my-worker",
  "zone_id": "...", "zone_name": "example.com", "environment": "production" }
```

Idempotent-ish: check first with `GET /accounts/{account_id}/workers/domains?hostname=...`.
Cloudflare provisions the TLS cert on its own.

**This API has no equivalent of the dashboard's subdomain bug.** The dashboard's Add
Domain / Add Route widget cannot attach `www.example.com` (or `api.example.com`) once the
apex is already a Custom Domain — it dead-ends on `No zones match`, even with a valid DNS
record present. The API attaches it fine. Use the API.

---

## 4. www → apex redirect (Single Redirect)

**Naming trap.** This feature has two names and you need both:

| Where | Called |
|---|---|
| Dashboard — token permission group, Rules menu | **Single Redirect** |
| API — ruleset phase | **`http_request_dynamic_redirect`** |

Searching the token permission dropdown for "dynamic" returns nothing. Searching the API docs
for "single redirect phase" returns nothing. It was renamed in the UI and not in the API.

The phase name is the thing people get wrong:

- **`http_request_dynamic_redirect`**, kind **`zone`** ← Single Redirects. This is the one.
- `http_request_redirect`, kind `root` ← account-level **Bulk** Redirects. Different product.

Docs summaries conflate them. A rule created under the wrong phase never fires.

```
GET  /zones/{zone_id}/rulesets/phases/http_request_dynamic_redirect/entrypoint   # existing?
POST /zones/{zone_id}/rulesets
{
  "name": "Redirect rules", "kind": "zone", "phase": "http_request_dynamic_redirect",
  "rules": [{
    "expression": "http.host eq \"www.example.com\"",
    "action": "redirect",
    "action_parameters": { "from_value": {
      "target_url": { "expression": "concat(\"https://example.com\", http.request.uri.path)" },
      "status_code": 301, "preserve_query_string": true } }
  }]
}
```

If the entrypoint ruleset already exists, `PUT /zones/{id}/rulesets/{ruleset_id}` with the
full rules array (existing + new). Posting a second ruleset to the same phase will not work.

`www` still needs a DNS record to be resolvable at all. A **proxied A record to `192.0.2.1`**
does it — RFC 5737 documentation address, never actually reached, because the proxy
intercepts and redirects before any origin fetch happens.

---

## 5. Turnstile

| Action | Call |
|---|---|
| List | `GET /accounts/{account_id}/challenges/widgets` |
| Create | `POST /accounts/{account_id}/challenges/widgets` `{ name, mode: "managed", domains: [...] }` |
| Update hostnames | `PUT /accounts/{account_id}/challenges/widgets/{sitekey}` (send all fields) |

Create returns **both** `result.sitekey` (public, safe in HTML) and `result.secret` (goes to
`wrangler secret put TURNSTILE_SECRET_KEY`).

**Free cap: 20 widgets per account, 15 hostnames per widget.** With one Cloudflare account
across every client, this is the first real wall — at roughly the 20th client.

The widget's hostname list must contain **every** production hostname (apex *and* `www`) or
the challenge silently fails on the missing one.

---

## 6. Email — the split, and why

**Sending and receiving are two different products and only one of them is free.**

| | Product | Free? |
|---|---|---|
| Receive `info@domain` → Gmail | Cloudflare **Email Routing** | Yes, unlimited |
| Send the notification email | **Resend** | Yes, 3,000/mo, 100/day |
| ~~Send via Cloudflare~~ | Cloudflare **Email Sending** | **No — needs Workers Paid, $5/mo** |

Cloudflare Email Sending advertises "3,000 included per month" and it is easy to read that as
free. It is not: it is included *with the paid plan*. Resend's 3,000/month genuinely is free.
Hence the split stack.

Resend's free tier is **per Resend account**, so each client gets their own Resend account and
their own 3,000. The Cloudflare account stays single and shared.

### Email Routing (receive)

```
POST /zones/{zone_id}/email/routing/enable
GET  /zones/{zone_id}/email/routing/dns                     # the MX/SPF records it needs
POST /accounts/{account_id}/email/routing/addresses  { "email": "you@gmail.com" }
POST /zones/{zone_id}/email/routing/rules
{ "name": "Forward info@", "enabled": true,
  "matchers": [{ "type": "literal", "field": "to", "value": "info@example.com" }],
  "actions":  [{ "type": "forward", "value": ["you@gmail.com"] }] }
```

**The destination address must be verified by clicking a link Cloudflare emails.** There is no
API to self-verify. A rule pointing at an unverified address **silently drops mail** — it does
not error. This is a hard manual gate.

### Resend (send)

```
POST https://api.resend.com/domains          { "name": "send.example.com" }   → id + records[]
GET  https://api.resend.com/domains/{id}                                      → status, records
POST https://api.resend.com/domains/{id}/verify                               → async verify
```

`records[]` is the DKIM/SPF set. Write them into Cloudflare with
`POST /zones/{zone_id}/dns_records` — that is exactly what Resend's "Auto configure" button
does, just scripted and reviewable.

**All mail records must be `proxied: false`.** DKIM, SPF, MX are not HTTP. Orange-clouding
them silently breaks mail.

**Send from the `send.` subdomain, never the apex.** The apex MX belongs to Email Routing.
Resend on the apex collides with it and breaks receiving. Subdomain keeps the two independent,
which is why `send.example.com` and `info@example.com` can coexist.

---

## 7. Free-tier ceilings (verified 2026-07-12)

| Resource | Free | Note |
|---|---|---|
| Zones per account | Unlimited | 1,000 DNS records each (zones created after Sep 2024) |
| Worker requests | 100k/day, **account-wide** | Static asset requests are free and unlimited |
| Worker CPU | **10 ms/request** | Milliseconds. The wall that forces the $5 plan. Paid: 5 min. |
| Subrequests | 50/request | Every outbound `fetch` counts. Paid: 10,000. |
| Script size | 3 MB gzipped | Paid: 10 MB |
| Workers Builds | 3,000 min/mo, 1 concurrent | Available on free |
| Turnstile | Unlimited challenges | **20 widgets/account**, 15 hostnames each |
| Email Routing | Unlimited | Free |
| D1 | 5 GB, 5M row reads/day | |
| KV | 1 GB, 100k reads/day | **1k writes/day** — tight |
| R2 | 10 GB | Zero egress fees |
| Durable Objects | 100k req/day | SQLite backend only on free |

A static brochure site costs **nothing** and consumes **none** of the 100k/day, because static
asset requests do not count. Only dynamic routes (`/api/contact`) do.

---

## 8. Why not Pages

`references/cloudflare-api.md` documents the Pages deploy path. **Do not use it for an Astro
site on the Cloudflare adapter.** `@astrojs/cloudflare` does not support Pages. It targets
Workers with Static Assets. Deploy with `wrangler deploy`, never `wrangler pages deploy`.
Guides and model training data both say otherwise and are out of date.

Two related adapter traps, both of which pass `astro check` and 500 on the first real request:

- `Astro.locals.runtime` was removed in adapter v13+. It is a getter that throws.
  Read secrets with `import { env } from 'cloudflare:workers'`.
- `Astro.clientAddress` throws under `@astrojs/cloudflare`. Read the
  `CF-Connecting-IP` header instead.
