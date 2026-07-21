---
name: verify-live
description: The wire-truth checker. Asserts house invariants against PRODUCTION for every live property and client site, then diffs reality against what the AIOS files claim. Catches "logged as done but not done" before it reaches a weekly review or a client. Trigger on "/verify-live", "verify over the wire", "is it actually live", "check production", "did that actually ship", "is the robots.txt fixed", "check the sitemap", or before ticking any outcome that asserts something about a live site. One run = the truth about what production is actually serving.
bike-method-phase: 1  # Phase 1 — Training wheels. Run manually first.
three-ms-attribution: |
  Adapted from The Three Ms of AI™ © 2026 Nate Herk.
---

# /verify-live — the wire-truth checker

## Why this exists

Between 2026-07-13 and 2026-07-19, four claims in this repo disagreed with production:

1. Kesri's robots.txt flip was logged in `shipped.md` as done. It wasn't. (×3 across separate sessions)
2. `connections.md` carried two stale rows (Bing "pending key", CF token "scope pending") that reality had already moved past.
3. `shipped.md` 2026-07-03 claims "robots.txt allows AI crawlers" for both products. **Production says otherwise** — found by this script's first run.
4. accentwallplanner.com went live 2026-07-19 with `Always Use HTTPS` off, so `http://` served the whole site at 200. Nobody claimed otherwise — **nobody checked at all**, and Google noticed first: the site ranked with its URL displayed as `http://`. Invariant 6 exists so the next domain cannot ship that way quietly.

The failure is usually the same shape: **something looked done without being done**, and it was caught late, by hand, usually at the Sunday review. Incident 4 is the variant worth naming — nothing lied, the check simply did not exist. The fix is not more discipline. It's making production — not a file — the thing that gets read.

## The law

**It reports. It never fixes.**

An auto-fixer would give you a fourth thing that looks done. The machine owns finding the drift; Tarun owns fixing it. Do not add a `--fix` flag. If you are tempted, re-read the list above.

## Run it

```bash
node scripts/verify-live.mjs              # failures only (default)
node scripts/verify-live.mjs --all        # show passing checks too
node scripts/verify-live.mjs --site=gradejar.com
node scripts/verify-live.mjs --json       # machine-readable
```

Exit `0` = every P0 green. Exit `1` = at least one P0 failed.

## When to run it

- **Before ticking any `week.md` outcome that asserts something about a live site.** This is the main one.
- Inside `/weekly-review`, before scoring. A board scored from memory is how this started.
- Inside `/client-pipeline`, before reporting a client's phase. CLAUDE.md rule #1 is *never invent a fact about a client* — a stale board is one step from that.
- After any `/cloudflare-go-live` or `/gsc-onboard` run.
- Any time a status file and your memory disagree. Production wins.

## The invariants

Each one traces to a real incident in this repo. Don't add invariants speculatively — add them when something breaks.

| # | Level | Check | Origin |
|---|---|---|---|
| 1 | P0 | `/` returns 200 | baseline |
| 2 | P0 | `robots.txt` is 200 + `text/plain` | baseline |
| 3 | P0 | classic crawlers (`*`, Googlebot, Bingbot) not `Disallow: /` | de-indexing risk |
| 4 | P1 | AI crawlers (ClaudeBot, GPTBot, Google-Extended, CCBot, meta-externalagent, PerplexityBot) not `Disallow: /` | `references/ai-search-visibility.md` — the moat |
| 5 | P0 | sitemap is 200 + real XML, resolved from the `Sitemap:` directive | the `/gsc-onboard` "sitemap is HTML" bug |
| 6 | P0 | `http://` does not serve the site (301s to `https://`, or refuses) | accentwallplanner.com indexed as `http://`, 2026-07-19 |
| 7 | P0 | no `noindex` in `<head>` or `X-Robots-Tag` | baseline |
| 8 | P0 | monetized sites: `ads.txt` 200 + matches `ADSENSE_ACCOUNT_ID` | AdSense serving |
| 9 | P1 | client sites: `LocalBusiness`/`Organization` JSON-LD present | the AI-search layer |

**P0 = a search engine cannot see the site.** **P1 = the site is visible but forfeits something (AI citation, entity identity).**

### Three things the script deliberately does NOT check

- **The presence of the Cloudflare managed robots block is not a failure.** Its default content is `User-agent: * / Allow: /`. What matters is which agents are disallowed — invariants 3 and 4 cover that, and the managed block is reported only as a *pointer to where the fix lives* (CF dashboard vs. the app route). An earlier version scored its mere presence as P0 and produced three false alarms on its first run.
- **The sitemap path is not hardcoded.** Astro's `@astrojs/sitemap` emits `sitemap-index.xml`; hand-rolled sites emit `sitemap.xml`. The script reads the `Sitemap:` directive from robots.txt and only probes as a fallback. Hardcoding `/sitemap.xml` produced three more false alarms.

- **An unreachable port 80 is not scored as a failure.** Invariant 6 asks whether a plaintext copy of the site is *reachable and serving*. A refused connection, a timeout, or a 4xx/5xx over `http://` all mean there is nothing for Google to index, so they pass. Only a 2xx over plain `http://` is red. Scoring "port 80 closed" as a failure would flag a *correctly* hardened host.

All three were caught by checking the checker against `curl` before trusting its output. **Do the same before adding an invariant** — a checker that cries wolf is worse than no checker, because you'll learn to skim it.

## Adding a site

One table at the top of `scripts/verify-live.mjs`. Four fields:

```js
{ domain: 'newsite.com', label: 'New Site (bet #4)', monetized: false, client: false },
```

`monetized` gates the ads.txt check. `client` gates the entity-schema check. Flip AccentWallPlanner to `monetized: true` when it comes off the deliberate AdSense hold.

## KPI

- **Bucket:** less cost.
- **Metric:** status-vs-production disagreements that survive to a weekly review or a client.
- **Baseline:** 5 incidents in ~8 days (3 Kesri + 2 stale `connections.md` rows), plus 1 more found on first run.
- **Target:** 0.

---

> *The Three Ms of AI™ is a trademark of Nate Herk. © 2026 Nate Herk. All rights reserved.*
