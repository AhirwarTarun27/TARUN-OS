# AccentWallPlanner — channel scoring

Scored fresh for this audience on 2026-07-20. **Never copy a column** — the playbook's own rule,
and this product is the clearest proof of why. Pinterest and TikTok are `L` for both existing
products and flip hard here; Hacker News, GitHub and dev newsletters flip the other way.

**The audience:** US-first DIY homeowners riding the accent-wall trend. Heavily Pinterest and
TikTok. Weekend-project budget around $85-200 a wall. Skews home-decor DIY, majority women, phone
first. **Low ad-block — these are not developers.**

**What they're actually doing when they search:** standing in front of a wall with a tape measure
and a problem, or lying on the sofa browsing ideas. Two completely different intents, and the site
is currently titled only for the first one.

---

## The scores that differ from the rest of the portfolio

| Channel | GradeJar | JsonBeam | **AccentWallPlanner** | Why it flips |
|---|---|---|---|---|
| **Pinterest** | H | L | **H — the engine** | This is Pinterest's strongest category. And uniquely, the content can be generated from the product's own renderer, so 3 fresh pins a day is a script rather than a chore. |
| **TikTok** | L | L | **M (parked)** | Genuinely matters for this audience — the best piece of promo ammunition in the whole repo is a DIY creator's TikTok quote. Parked only because video can't be machine-generated. |
| **Instagram** | L | L | **M (parked)** | Same audience as Pinterest, worse link behaviour. Not worth a second daily slot. |
| **Google SEO** | H | H | **H — but retargeted** | See below. This is the one that's currently mis-aimed. |
| **Hacker News** | L | H | **L** | Wrong planet. |
| **GitHub / dev newsletters** | L | H | **L** | Not a developer product. |
| **Product Hunt** | M | M | **L** | PH is makers and founders, not homeowners planning a wall. |
| **Reddit** | H | H | **M (parked)** | r/DIY and r/HomeImprovement are real, but the 90/10 ratio costs weeks before one link is allowed. Parked by decision 07-20. |
| **Email newsletter** | H | L | **L** | Nobody subscribes to a wall planner. It's a once-or-twice-in-a-lifetime project. |
| **Quora** | M | L | **L** | Pinterest is the same effort with 50x the return here. |
| **Niche blogs/newsletters** | M | H | **M** | DIY and home-decor blogs are real targets, but they want room photography, which this product deliberately does not have. |

---

## The search problem, stated plainly

`research/accent-wall-trim-planner-demand.md` (2026-07-18) pulled the volumes that were never
pulled before the build, and **inverted the strategy**:

| Cluster | Volume | Site currently targets it? |
|---|---|---|
| Tool intent (`board and batten calculator`, `picture frame molding calculator`…) | **~253 Bing/mo** | **Yes — every page title** |
| Informational (`wainscoting`, `board and batten`, `accent wall ideas`…) | **~5,300 Bing/mo** | No |

`wainscoting` alone is **2,900/mo and flat across all 25 weeks**. `picture frame molding
calculator` — the declared wedge, built first — **returns no data at all**. `board and batten
calculator` (171/mo, the biggest tool term) is in genuine 45% decline and was conceded to
inchcalculator anyway.

**So the site is titled for the smallest cluster in the niche.** The replacement copy exists at
`research/accent-wall-retarget-copy.md` and has never been applied. That is P0a in the action plan
and it is the cheapest large win available anywhere in the portfolio.

**One honest caveat carried from the brief:** `accent wall ideas` (426/mo) is a *browsing* query —
people want room photos. This site has drawings, not photography, and deliberately so. Expect that
term to underperform its volume. Pinterest is the right home for browsing intent, which is another
reason it's the engine here rather than a side channel.

---

## The wedge, in the words that sell it

From the prebuild brief — a verbatim quote from a DIY creator, and the single best piece of promo
ammunition in the repo:

> "Online calculators only work if your boxes are the same size."

That is the product in one line. The #1 ranking tool (inchcalculator) **explicitly does not
visualise** — it calls itself "a calculation tool, not a visualization engine." And the niche is
fragmented into single-style calculators; nobody covers board & batten, wainscoting, picture-frame
molding and slat wall in one place.

Three things to lead with, in order:

1. **It draws your actual wall to scale, live.** Nobody else does.
2. **Different-size boxes on one wall** — the general case here, impossible everywhere else.
3. **The cost estimate packs your real cut list onto boards** first-fit-decreasing, instead of
   dividing total linear feet by board length. Every competitor makes that mistake, and it
   under-buys, because offcuts are scrap.

## What not to say

- Never **"ad-free"** or **"no tracking."** AdSense is coming to this site and that exact claim
  caused a rejection on JsonBeam. "Free · no sign up" is true and safe.
- Never imply the tool orders materials, checks stock, or knows prices in your area.
- Never use a room photo you didn't generate. See the action plan, rule 1.
