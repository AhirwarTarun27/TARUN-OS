# AccentWallPlanner — re-targeted titles & meta (draft)

**Written 2026-07-18** off the demand data in `accent-wall-trim-planner-demand.md`.
Destination: `src/lib/styleContent.ts` (`title` / `description` / `h1` / `subhead` per style)
and `src/pages/index.astro` + `how-it-works.astro` for the two non-generated pages.

## The strategy in one line

Current titles lead with **"[style] calculator"**, which has ~no measurable search volume. These
lead with **the topic that does** and qualify it with **the layout angle you can actually own**.

**What this is not:** a promise these rank quickly. `wainscoting` (2.9k Bing/mo) is contested by
Houzz, Home Depot, This Old House and Family Handyman. A new domain climbs that slowly. The reason
to re-target anyway is simple: aiming at terms with measurable demand strictly beats aiming at terms
with none. The planner + cut list is a real differentiator none of those sites have, and it is the
kind of asset that earns links and dwell time.

**Honest read on intent:** `accent wall ideas` (426/mo) is a *browsing* query — people want photos.
You have drawings, not room photography. Expect that one to underperform its volume until the site
has visual inspiration content. Flagged rather than papered over.

---

## 1. `/wainscoting` — the biggest single opportunity (2.9k Bing/mo, flat all 25 weeks)

```
title: 'Wainscoting Layout — Panel Spacing, Chair Rail Height, Cut List'
```

```
description: 'Plan wainscoting panels to scale: solve panel widths and spacing, set the chair rail height (32-36in is the classic proportion), and get every mitered piece as a long-point cut list.'
```

```
h1: 'Wainscoting layout, drawn to scale'
```

```
subhead: 'Set your wall size and chair rail height, and see the framed panels solved and drawn at true proportions — with every mitered cut listed before you touch the saw.'
```

**Why:** captures `wainscoting` plus `chair rail height` (90/mo, the one long-tail term that
measured). "Layout" is the qualifier you can win; "calculator" is not what people type.

---

## 2. `/board-and-batten` — 820 + 280/mo (`board and batten`, `board and batten wall`)

```
title: 'Board and Batten Wall — Batten Spacing, Layout, and Cut List'
```

```
description: 'Plan a board and batten accent wall to scale. Solve how many battens and how far apart, add rails, and get exact cut lengths for every piece — drawn to your wall size as you type.'
```

```
h1: 'Board and batten wall layout, drawn to scale'
```

```
subhead: 'Enter your wall, choose the batten count, and the spacing solves itself — evenly, edge to edge, with a cut list you can take to the saw.'
```

**Note:** `board and batten calculator` (171/mo) is the one tool term with real volume, and the
scout conceded it to inchcalculator. Keep the exact phrase in the body copy and one FAQ answer, so
you stay eligible without building the whole page around a term you chose not to fight for.

---

## 3. `/slat-wall` — 353/mo

```
title: 'Slat Wall Layout — Slat Spacing and Gaps, Drawn to Scale'
```

```
description: 'Plan a wood slat accent wall: set the slat count and stock width, and see the gaps solved evenly across your wall, drawn to scale with the exact slat length and quantity.'
```

```
h1: 'Slat wall layout, drawn to scale'
```

```
subhead: 'Pick how many slats you want and the planner spaces them evenly across your wall, then tells you how long to cut each one.'
```

---

## 4. `/picture-frame-molding` — 128 + 110/mo, and cover both spellings

```
title: 'Picture Frame Molding Layout — Box Spacing and Miter Cut List'
```

```
description: 'Plan picture frame molding (box trim or shadow boxes) to scale. Solve box sizes, gaps and margins — even or different-size boxes — and get every mitered long-point length.'
```

```
h1: 'Picture frame molding layout, drawn to scale'
```

```
subhead: 'Lay out box trim on your wall, even or with a wide center box, and get every mitered piece in an exact cut list. It redraws as you type.'
```

**Do this too:** `picture frame moulding` (110/mo) is nearly as big as the US spelling and is a
separate query. Put the British spelling once in the intro prose ("also spelled moulding") and once
in a FAQ. Do not put it in the title — it reads like a typo to a US audience.

---

## 5. `/` home — `accent wall` 325 + `accent wall ideas` 426

```
title: 'Accent Wall Planner — Design Your Layout, Drawn to Scale, Free'
```

```
description: 'Plan an accent wall in four trim styles: picture frame molding, board and batten, wainscoting and slat wall. Set your wall size, see it drawn to scale, and get an exact cut list. Free, no sign-up.'
```

Keep the existing H1 (`Design an accent wall, drawn to scale — even or different-size boxes.`). It
already leads with the topic and names the differentiator. No change needed.

---

## 6. `/how-it-works` — leave it

It is a methodology and trust page, not a ranking target. Its current title is accurate and it does
real work for AdSense review (it is the page that proves the site has genuine expertise). Changing
it to chase a keyword would weaken it. No edit.

---

## Beyond titles — what actually decides whether this works

Re-titling is the cheap 20%. The rest, in order of leverage:

1. **The `wainscoting` page needs to earn a head term.** Today its informational depth is the
   "how to measure" + "design guide" sections. To compete it needs the questions searchers actually
   have: panel *styles* (raised, flat, beadboard), typical *heights* by room, rough *cost*, and
   materials. That is a genuine content expansion, not a rewrite. Highest-leverage single page.
2. **`accent wall ideas` needs visuals.** Your planner renders SVG. Generating a gallery of
   worked example layouts (8-12 real configurations, each drawn, each linking to the planner
   pre-loaded) is inspiration content you can produce from the engine you already built. Nobody
   else in this niche can do that cheaply. This is the most interesting asset available to you.
3. **Internal linking already exists** ("Other accent wall styles"). Good. Keep it.
4. **Re-check in 90 days.** Re-run `node scripts/keyword-volumes.mjs` against this same set. If the
   tool-term decline continues while informational holds, the AI-Overviews hypothesis firms up and
   it should change how the next product gets scouted.

---

*Apply into `src/lib/styleContent.ts` and `src/pages/index.astro`. The build has no tests asserting
copy strings, so nothing breaks; re-run `npm run build` and re-check the FAQ/HowTo JSON-LD still
matches the visible text.*
