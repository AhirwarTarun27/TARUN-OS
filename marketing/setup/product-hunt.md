# Product Hunt — profile now, launch in 2-3 weeks

> **You get exactly one launch per product, ever.** That's why this is prep-first.
> Decision 2026-07-20: create the profile now, launch JsonBeam once it has screenshots.
> Free. No fee to submit, no fee to be featured.

---

## Today — 10 minutes

1. Sign up at **https://www.producthunt.com** with your personal Gmail. Handle: `tarunbuilds`.
2. Fill the maker profile completely. **PH's own launch guide says start ~30 days early**, and an
   empty profile posting a product on day one reads as a drive-by.

**Headline**

```
I build fast, private web tools. Everything runs in your browser.
```

**About**

```
Frontend developer. I build small, fast web tools that do one job well and run entirely client side — no accounts, no uploads, no server round trip. JsonBeam is a 17-tool JSON workbench. GradeJar is a grade calculator and private gradebook for teachers. AccentWallPlanner draws your wall to scale and gives you the cut list.
```

3. Link the profile to `codertarun` on X and `AhirwarTarun27` on GitHub.
4. **Then use the account like a normal person for 2-3 weeks.** Upvote things you actually like,
   leave a couple of real comments. That's the whole point of doing it early.

---

## Before you launch — the gate

Do not schedule until all three are true:

- [ ] JsonBeam screenshots exist (`marketing/jsonbeam/placements.md` item 3). **PH's 2026 guidance
      is explicit that gallery quality is what matters most.** Launching with only an OG image
      wastes the one shot.
- [ ] The privacy claim is re-verified live, devtools open, every tool. **PH and HN both check.**
- [ ] The profile is 2+ weeks old with real activity on it.

---

## The launch

**Day:** Tuesday, Wednesday or Thursday.
**Time:** submit between **12:00 and 1:00 AM Pacific**, which is roughly **12:30-1:30 PM IST**
depending on US daylight saving. Convenient for you — it's the middle of your afternoon, not 3 AM.
Submitting early gives the post a full day on the leaderboard.

**Flow:** Submit (top right) → New Product → paste the URL → fill the form. You can schedule up to
a month ahead.

**Name**

```
JsonBeam
```

**Tagline (60 char max — this is the whole pitch)**

```
17 JSON tools in one fast, fully client-side workbench
```

**Description**

```
JsonBeam is a JSON workbench that runs entirely in your browser. Format, beautify, minify, validate and repair broken JSON. View it as a tree, a table or a force-directed graph. Diff two documents. Query with jq, JSONPath or JMESPath. Convert to CSV, YAML, TypeScript interfaces or Go structs.

Every operation runs client side, so the JSON you paste is never uploaded. No account, no upload limit, no round trip. Heavy engines lazy-load on first use, so the editor stays under a 120 KB gzipped budget and content pages ship zero first-party JavaScript.
```

**Topics:** Developer Tools · Productivity · Design Tools
**Pricing:** Free

**Gallery order** (first image is the thumbnail — make it the graph viewer, it's the one that
travels): graph viewer → tree viewer → diff → table viewer → the tool grid.

**Your first comment — post it immediately after launch.** This matters more than the description.

```
Hey Product Hunt 👋

I kept pasting production API payloads into random online JSON formatters, and then realising I'd just uploaded a response with real tokens and customer emails in it to someone else's server. Most companies tell you not to do this. Everyone does it anyway, because the tools are convenient.

So I built the version that can't do that. Every operation in JsonBeam runs in your browser — format, validate, repair, diff, query with jq/JSONPath/JMESPath, convert to CSV/YAML/TypeScript/Go. Nothing you paste is uploaded, because there's nothing to upload it to.

Two things I'm oddly proud of:
- 17 tools share one editor, and the editor route stays under 120 KB gzipped. Heavy engines (jq-wasm, jsonrepair) only load the first time you actually use them.
- Every content page ships 0 KB of first-party JS.

Open devtools and watch the network tab while you use it. That's the whole pitch.

Happy to answer anything about the build. What would you want a JSON tool to do that none of them currently does?
```

---

## Rules that get launches killed

- **Never ask anyone to upvote.** This is PH's one hard rule. Coordinated and purchased voting are
  detected and will get a launch unfeatured. **Asking people to visit and comment is fine.**
- **Hunt it yourself.** PH explicitly encourages self-hunting and says there's no advantage to a
  third-party hunter. The "famous hunter" is a myth in 2026 — page quality, your first comment, and
  a real crowd are what move it.
- **Don't launch JsonBeam and GradeJar in the same month.** Two launches from a new maker in quick
  succession reads as farming.
- **Don't launch AccentWallPlanner here at all.** PH is makers and founders. Homeowners planning a
  wall are not on Product Hunt. It's scored `L` in the playbook for exactly this reason.

## After

Whatever the rank, the durable value is the backlink and the profile. Log the result in
`marketing/log.md`, and if it goes well, the "featured on Product Hunt" line is reusable in every
directory listing afterwards.
