# JsonBeam — the placement queue (Tue + Thu, one item each)

> **Finite by design.** Developers don't use Pinterest, so JsonBeam gets one-time placements that
> keep working after you do them once, instead of a daily drip. Roughly 6 weeks at 2 a week, then
> the slot frees up for GradeJar.
>
> Do **one item** per session. Tick it. Stop. Written 2026-07-20.

**History worth knowing:** a directory batch was drafted 2026-07-08, carried once, and dropped
unsubmitted on 07-18 without a single submission. That is what this file is fixing. One item at a
time, not a batch of twenty.

---

## The canonical copy — paste from here every time

Never rewrite these per site. Same identity everywhere, same as the accounts rule.

**Name**

```
JsonBeam
```

**URL**

```
https://jsonbeam.com
```

**Tagline (60 char)**

```
A fast in-browser JSON workbench. 17 tools, nothing uploaded.
```

**Short description (~160 char)**

```
17 JSON tools in one fast workbench: format, validate, repair, diff, query, and convert to CSV, YAML, TypeScript or Go. The JSON you paste stays in your browser.
```

**Long description (~500 char)**

```
JsonBeam is a JSON workbench that runs entirely in your browser. Format, beautify, minify, validate and repair broken JSON. View it as a tree, a table or a force-directed graph. Diff two documents. Query with jq, JSONPath or JMESPath. Convert to CSV, YAML, TypeScript interfaces or Go structs.

Every operation runs client side, so the JSON you paste is never uploaded or sent to a server. There is no account, no upload limit and no round trip. Heavy engines load only when you first use them, so the editor stays fast.
```

**Categories to pick, in order of preference:** Developer Tools · JSON · Text/Code Editors · Data
Conversion · Web Utilities

**Tags:** `json` `json-formatter` `json-validator` `json-viewer` `developer-tools` `jq` `jsonpath`
`csv` `yaml` `typescript`

### Two copy rules that are not negotiable

1. **Never write "ad-free", "no ads", or "no tracking."** That exact claim is what got JsonBeam
   rejected by AdSense once. AdSense is coming back to this site. The safe and true framing is
   *the JSON you paste* stays in your browser — the website itself uses cookies like any
   ad-supported site.
2. **Never claim the privacy behaviour without it being true.** Developers check, and Hacker News
   checks live. It was verified end-to-end on 2026-07-07 (devtools open, every tool, zero payload
   leaving the browser). Re-verify before any launch post.

---

## The queue

### 1. AlternativeTo

- [ ] done
**Why this one first:** it ranks for `[product] alternatives`, which is the highest-intent query
shape in the whole directory tier. People searching it are actively trying to leave a tool they
already use.

1. Sign up at **https://alternativeto.net** with your personal Gmail. Username: `tarunbuilds`.
2. Search "JSONLint" and "JSON Formatter" first — confirm JsonBeam isn't already listed.
3. **Add application.** Paste Name, URL, Short description, Tags from the canonical block.
4. **Platforms:** Web / Online. **Licence:** Free.
5. Under "alternative to", list: **JSONLint · JSON Formatter & Validator (curiousconcept) ·
   JSON Crack · jsonformatter.org**. This is the field that does the actual work.
6. Upload `Jsonbeam/public/og-default.png` as the screenshot **only if** you have generated real
   screenshots by then — see item 3. Otherwise skip and come back.

### 2. SaaSHub

- [ ] done
Same shape, also ranks on alternatives and comparison pages.

1. Sign up at **https://www.saashub.com** (same handle, same email).
2. **Submit a product.** Name, URL, Short description, Long description, Categories, Tags.
3. Pricing: **Free**.

### 3. Generate the graph-viewer screenshots

- [ ] done
**This is a build item, not a submission, and it unblocks three others.** JsonBeam has **zero
screenshots**, which is the biggest gap in its whole marketing position. Its own
`marketing/jsonbeam/channels.md` names the missed play:

> "visualizer screenshots (JSON Crack's growth trick: pretty graph images travel even with
> throttled links; **the image IS the content**)"

Ask the AIOS to run this in the JsonBeam repo: capture `/json-graph-viewer`, `/json-tree-viewer`,
`/json-table-viewer` and `/json-diff` against a realistic payload, desktop and mobile. Needed for
Product Hunt, both directories above, and every future post.

### 4. Slant

- [ ] done
1. Sign up at **https://www.slant.co**.
2. Find or create: **"What are the best JSON formatters?"** and **"What are the best JSON
   viewers?"**
3. Add JsonBeam as an option. Slant wants **pros and cons**, not a pitch. Write real ones:
   *Pro:* runs fully client side, so payloads never leave the browser. *Pro:* 17 tools share one
   editor. *Con:* no offline/desktop build. *Con:* no team or sharing features.
   Honest cons are what keep the entry from being removed.

### 5. StackShare

- [ ] done
1. Sign up at **https://stackshare.io**.
2. Submit JsonBeam under **Developer Tools → Data Tools**.
3. Canonical copy, plus the screenshots from item 3.

### 6-8. GitHub awesome-list PRs (one per session)

- [ ] `awesome-json` — search GitHub for `awesome-json`, read CONTRIBUTING first
- [ ] `awesome-devtools` / `awesome-web-devtools`
- [ ] `public-apis`-style JSON tooling lists

**How to not get the PR closed:** read the list's own formatting rules, match the existing entry
style exactly, add **one** line in the right section, and open the PR from your own account
(`AhirwarTarun27`) with a one-sentence description. Never add to multiple lists in one PR. Never
add the same tool to a list where a near-identical entry already exists.

Suggested entry line:

```
- [JsonBeam](https://jsonbeam.com) - Browser-based JSON workbench: format, validate, repair, diff, query (jq/JSONPath/JMESPath) and convert to CSV/YAML/TypeScript/Go. Runs client side.
```

### 9. Product Hunt launch

- [ ] done
**Do not start this until items 1-3 are ticked.** You get exactly one PH launch per product, ever.
Full runbook: `marketing/setup/product-hunt.md`.

---

## Explicitly NOT on this list

- **Toolify and the AI-tool directories.** JsonBeam is not an AI tool. Your own `playbook.md`
  already scores that whole tier `L` for both products with the reason "not an AI tool." Submitting
  anyway is how you get delisted.
- **Show HN.** Still gated behind the AdSense verdict, per the existing plan. One shot, and it wants
  the site at its best.
- **Stack Overflow.** Scored `L` — "ban risk > payoff." Moderators remove tool links.
- **Source of Sources / Qwoted.** Parked 2026-07-03 and still parked: SOS's apex domain was broken,
  Qwoted's free tier rejects personal Gmail. Nothing has changed.
- **Paid directory placements.** $0 is a hard constraint. Several of the sites above will offer a
  paid "featured" upgrade at checkout. Decline every one.

---

## Log

| Date | Item | Result |
|---|---|---|
| 2026-07-08 | Directory batch drafted (AlternativeTo, SaaSHub, StackShare, Slant, Toolify) | Never submitted |
| 2026-07-18 | Batch dropped under the carry rule | 0 of 5 done |
| 2026-07-20 | Rebuilt as a one-at-a-time queue; Toolify removed as off-category | — |
