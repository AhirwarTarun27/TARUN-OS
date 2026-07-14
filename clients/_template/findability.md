# <Client Name> — Findability Board

> Phase 3. The layer they can't do themselves and the reason the retainer exists.
> Owned by `/client-findable`. **Every item must be executable at 8pm without thinking.**
> If an item makes Tarun compose, decide, or research — it isn't finished yet.

**Progress:** <n>/<N> · **▶ NEXT:** <item>

---

## Canonical NAP

Generated from the site's single data file (`<repo>/src/data/company.ts`). **Never retyped.**
Every field on every platform below is a copy-paste from here. Byte-identical, everywhere.

```
Name:     <exact legal/trading name — spelled the way THEY spell it>
Address:  <one line, exactly as the site renders it>
Phone:    <primary, E.164 + display>
Email:    <>
Website:  <https://...>
```

`Plot no-1002` and `Plot No. 1002` are two different businesses to a crawler.

---

## 0 · Technical gate — P0, nothing else matters until these are green

Verified **over the wire**, not from the repo. The worst problems live in dashboards, not code.

- [ ] `curl https://<domain>/robots.txt` → Google allowed
- [ ] `curl https://<domain>/robots.txt` → **AI crawlers allowed** (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`)
- [ ] No `noindex` in the live `<head>`
- [ ] Sitemap live, URLs use the **real domain** (not a preview origin)
- [ ] Every build-time env var set in **CI**, not just locally
- [ ] Site loads fast on a real phone

---

## 1 · Google Business Profile — P1 · the single biggest lever

~32% of local ranking weight. Complete profiles get ~7× the clicks. Often outranks the site itself.

```
[ ] Create / claim                            owner: CLIENT · needs: postcard or phone verify
    Where:     business.google.com
    Category:  <the exact primary category — highest-leverage field on the profile>
    Service area: <real districts>
    Description (paste):
      <750 chars. Primary service + primary geography front-loaded.>
    Services:  <each one, named the way customers search for it>
    Photos:    real ones. Not stock.
    Verify:    profile shows on Google Maps for "<brand name>"
    Done:      <URL>
```

---

## 2 · Search consoles — P1

- [ ] **Google Search Console** — verify, submit sitemap, request indexing on money pages. *The instrument. No GSC = no monthly report = no renewal.*
- [ ] **Bing Webmaster** — import from GSC, one click
- [ ] **Bing Places** — import from GBP
- [ ] **Apple Business** — Maps, Siri, Spotlight. Free. Nobody local does it.

---

## 3 · The buyer's platforms

**B2B tier OR local-consumer tier — never both.** Chosen by the customer type in `engagement.md`.

<For each: platform · why · needs · URL · the paste-ready catalog copy · verify · done URL>

**The catalog is the work, not the signup.** A listing with just a company name is dead weight.
**Warn the client before creating IndiaMART/JustDial listings** — the sales calls start immediately.

---

## 4 · AI-search layer — the moat

See `references/ai-search-visibility.md`.

- [ ] AI crawlers allowed (the §0 P0 — gates everything here)
- [ ] **`sameAs` schema populated** with every profile created above ← the payoff for the directory grind
- [ ] `LocalBusiness` schema complete — no null `geo`, no missing `priceRange`
- [ ] `/llms.txt` published
- [ ] ≥5 question-headed sections, answer in the first 40-60 words
- [ ] Questions sourced from **real enquiries** (the client's inbox beats any keyword tool)
- [ ] Prompt-check **baseline** logged → `reports/`

### Prompt check — monthly

| Prompt | ChatGPT | Perplexity | AI Overview | Who won instead |
|---|---|---|---|---|
| <a real buying question> | | | | |

Expect a wall of ✗ at baseline. **The first ✓ is the most persuasive artifact in the engagement.**

---

## 5 · Review engine — the #2 local ranking factor

- [ ] Short GBP review link (`g.page/r/...`) + QR code → invoice, visiting card, email signature
- [ ] Pre-written WhatsApp ask (below) — the client's team sends it without composing
- [ ] Cadence set: **2-4 real reviews/month.** 20 in a week looks bought.
- [ ] Respond to every review, good and bad

**The ask (paste):**
> <one short WhatsApp message, sent at the moment of delivered value>

**B2B reality check:** procurement managers rarely leave reviews. Target 10-20/year and lean on logos + credentials. Don't promise a restaurant's velocity to an industrial supplier.

---

## 6 · Service × location pages — the substance test

Build `/<service>-in-<place>` **only** if you can write 3+ sentences that are TRUE and UNIQUE to that place:

- [ ] A real project or installation there?
- [ ] A real logistics / regulatory / industry fact about that place?
- [ ] A local office, team, or response-time commitment?

**All no → do not build the page.** `areaServed` + GBP service area + directory citations carry the local signal instead — and that's what actually ranks a single-location business.

A thin doorway page is a penalty target *and* an invitation to invent facts.

**Verdict for this client:** <BUILD / SKIP — and why>

---

## 7 · Citation filler — batch into one sitting

Honestly labelled: these are NAP citations, not lead sources.

- [ ] <platform> — <URL>

---

## Account ownership ledger

Every account in the **client's** name. Tarun manages; he never owns.

| Platform | Owner | Login | Created |
|---|---|---|---|
| | | | |
