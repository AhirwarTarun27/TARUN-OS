---
name: domain-namer
description: Research and suggest SEO-friendly, brandable, Google-norm-compliant domain names for a new product or website. Use when the user wants to name a product, brainstorm or pick a domain, check domain availability, or choose a brandable URL meant to rank well and spread. The user gives a free-form product brief; the skill reads it, asks only about genuine gaps, then generates, scores, and verifies candidates with live web checks.
---

# Domain Namer

Turn a product idea into a ranked shortlist of **brandable, SEO-friendly, Google-norm-compliant** domains — with live availability + competition checks, not guesses. The goal of every recommendation is a name that can (a) rank in Google for its category, and (b) spread by word of mouth.

Work in four phases. **Do not skip the intake.** A domain is a 10-year decision; 90 seconds of questions beats a regretted name.

---

## Phase 1 — Read the brief, then ask only the gaps

The user opens by **pasting a free-form brief** describing their product and vision. **Read it first.** Do not interrogate them with a fixed questionnaire — extract everything you can from what they wrote.

Parse the brief against this checklist and silently fill in what's present:

- **Product** — what it does + the core *thing* it operates on (e.g. "json", "invoices", "resumes", "habits")
- **Audience & vibe** — who it's for + tone (developer/clean, consumer/playful, enterprise/trustworthy)
- **Primary search phrases** — what people would Google to find it *(the SEO anchor the domain should evoke)*
- **Platform** — web/mobile/CLI/SaaS/extension *(shapes whether `.dev`/`.app`/`.io` fits)*
- **Vision / one-line promise** — what makes it special *(mined for brand metaphors, e.g. "beams data through" → `beam`)*
- **TLD preference & budget** — `.com`-first unless stated otherwise
- **Key pages / features** — the surface area *(surfaces sub-brand words)*
- **Constraints** — words to love, words to avoid, competitors to differentiate from

**Then decide:**
- If the brief covers enough to name well (at minimum: what it does + roughly who it's for), **proceed to Phase 2** — but first echo back a 2–3 line summary of what you understood, and **state any assumptions** you're making for the missing pieces (e.g. "Assuming `.com`-first and a developer audience").
- **Only if a genuine gap blocks good naming** — e.g. you can't tell the core keyword, or TLD is wide open with no budget signal — ask a **short, targeted batch (1–3 questions max)** about *just those gaps*, then wait. You MAY use `AskUserQuestion` for multiple-choice gaps (TLD, tone). Never re-ask anything the brief already answered.

Bias toward proceeding. A confident name with stated assumptions beats a wall of questions.

---

## Phase 2 — Generate candidates

From the answers, extract a **primary keyword** (the category term) and **brand seeds** (metaphors from the vision). Generate **~20 candidates** spread across these patterns:

- **keyword + action/verb** — `jsonbeam`, `sendloop`, `paystream`
- **keyword + metaphor** — mine the vision for speed/clarity/trust words (`beam`, `flow`, `forge`, `north`, `atlas`)
- **invented but pronounceable** — coined, ownable, says-as-spelled (`figma`, `vercel`, `stripe`)
- **short compound** — two small real words fused (`mailchimp`, `dropbox`)

Bias toward names that **contain or strongly evoke the primary keyword** without being a generic exact-match phrase.

---

## Phase 3 — Score every candidate (show the table)

Rate each candidate **1–5** on every criterion. These criteria *are* the Google-norm + virality filter:

| # | Criterion | What 5/5 looks like |
|---|-----------|---------------------|
| 1 | **Keyword relevance** | Contains/evokes the primary search term → topical relevance signal |
| 2 | **Length & pronounceability** | Short, says-as-spelled, no ambiguous homophones |
| 3 | **Brandability** | Distinctive + memorable; NOT a generic keyword-stuffed phrase |
| 4 | **TLD strength** | `.com` likely available (note alternatives) |
| 5 | **Trademark / collision risk** | No obvious existing brand clash |
| 6 | **SERP feasibility** | Category isn't already dominated by a giant for that exact term |
| 7 | **Virality / word-of-mouth** | Easy to say out loud, spell after hearing once, type without thinking |

**Hard rules (reject or down-score on violation):**
- ❌ No hyphens. ❌ No numbers/digits. ❌ No doubled letters that cause typos.
- ❌ No keyword-stuffed exact-match domains (e.g. `bestcheapjsontools.com`) — post **EMD update** these rank *worse* and read as spam. Prefer a brand term that *includes* the keyword.
- ✅ Prefer `.com` unless the user opened other TLDs. ✅ Pronounceable on first hearing. ✅ Trademark-safe.
- ✅ ≤ ~15 characters where possible; one easy "syllable beat" beyond the keyword.

Sort the table by total score, descending.

---

## Phase 4 — Verify the top candidates (use live tools — don't claim, check)

For the **top 5–6** by score, actually verify rather than assert. **Never state a domain is "available" from memory** — only a live lookup can.

- **Availability** — WHOIS / registrar lookup. Use `WebFetch` against a WHOIS endpoint (e.g. `https://rdap.org/domain/<name>.com`) or `WebSearch` for "`<name>.com` whois". An RDAP 404 ≈ unregistered; a record ≈ taken.
- **SERP competition** — `WebSearch` the primary keyword + the bare brand term: is page 1 owned by a dominant incumbent? Flag if so.
- **Trademark** — `WebSearch` "`<name>` trademark" and the USPTO TESS path; flag obvious clashes (not legal advice).
- **Social handles** — `WebSearch`/`WebFetch` X, GitHub, Instagram for handle consistency; note conflicts.

If web tools aren't available in the session, say so and output the **exact manual checks** the user should run instead.

---

## Output

1. The **scored table**, sorted by total.
2. **Top 3 picks**, each with: a one-line rationale, live availability result (✅ likely open / ❌ taken / ⚠️ unverified), and any trademark/SERP/social caveat.
3. **Why #1 wins** — tie the choice back to ranking (keyword relevance + brandable for direct/branded search) and virality (easy to say/spell/share).
4. **Next actions** — which registrar to buy `.com` from, social handles to grab same-day, and one line on the EMD/brand-vs-keyword trade-off so the choice is understood, not just handed over.

Keep it tight and decisive — recommend, don't just survey. The user wants a name they can commit to and build a rankable, shareable brand on.
