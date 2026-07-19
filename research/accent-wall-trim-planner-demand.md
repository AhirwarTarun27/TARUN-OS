# Demand Gate — AccentWallPlanner (the numbers that were never pulled)

**Run 2026-07-18.** Closes the open item that has been carried since 2026-07-06: the scout brief
ordered "confirm exact figures with Semrush/Ahrefs as step 1 of `/explore-project`", the run opened
with Domain instead, and the product got built without it. This is that data.

**Source:** Bing Webmaster Tools `GetKeywordStats`, US / en-US, 23-25 weeks ending 2026-07-11.
Pulled with `scripts/keyword-volumes.mjs` (written this session; re-runnable).

**Read the numbers correctly.** The Bing column is **observed impression data**, not a model. The
Google column is an **extrapolation** at x8-x13 (Bing US share ~7-12%) and must never be quoted as
measured. Exact-match only, so cluster totals miss unlisted long-tail.

---

## Finding 1 — the tool-intent cluster is close to empty

This is what every page on the site currently targets.

| Keyword | Bing/mo (observed) | Google est/mo | Trend |
|---|---|---|---|
| board and batten calculator | 171 | 1.4k - 2.2k | **-45%, genuine decline** |
| wainscoting calculator | 82 | 659 - 1.1k | -19% |
| picture frame molding calculator | **no data** | — | — |
| picture frame moulding calculator | **no data** | — | — |
| slat wall calculator | **no data** | — | — |
| accent wall calculator | **no data** | — | — |
| board and batten spacing calculator | **no data** | — | — |
| wainscoting layout calculator | **no data** | — | — |
| **CLUSTER TOTAL** | **~253** | **~2.0k - 3.3k** | |

"No data" means Bing returned zero rows. That is not proof of zero searches, but it does mean the
term sits below Bing's reporting floor, which for a US-focused product is itself a verdict.

## Finding 2 — the informational cluster is healthy, and nothing targets it

| Keyword | Bing/mo (observed) | Google est/mo | Trend (verified week-by-week) |
|---|---|---|---|
| wainscoting | **2,900** | 23.0k - 37.4k | **flat/stable** (550-800/wk all 25 weeks) |
| board and batten | 820 | 6.6k - 10.7k | mild |
| accent wall ideas | 426 | 3.4k - 5.5k | mild |
| slat wall | 353 | 2.8k - 4.6k | mild |
| accent wall | 325 | 2.6k - 4.2k | **flat** (the "-39%" is one Feb spike, baseline ~60/wk) |
| board and batten wall | 280 | 2.2k - 3.6k | mild |
| picture frame molding | 128 | 1.0k - 1.7k | -7% |
| picture frame moulding | 110 | 878 - 1.4k | -17% |
| **CLUSTER TOTAL** | **~5,300** | **~42.6k - 69.2k** | |

**The scout brief's "low-to-mid tens of thousands/mo US" was right about the niche and wrong about
the product.** It describes this cluster, ~20x the size of the one the site was built and titled for.

## Finding 3 — two strategy assumptions inverted

1. **The declared wedge has no measurable demand.** Build order put picture-frame molding first
   because "it IS the wedge" (decision, 2026-07-10). `picture frame molding calculator` returns no
   data at all. The informational `picture frame molding` (128/mo) is the weakest head term too.
2. **The only tool term with volume was deliberately conceded.** `board and batten calculator` at
   171/mo is the biggest tool term by 2x, and the scout brief conceded it to inchcalculator's domain
   authority. It is also the one term with a real decline.

## Finding 4 — a hypothesis worth naming, not yet proven

Tool queries are falling while informational queries hold flat, across the same window and the same
niche. `wainscoting` did not decline; `board and batten calculator` halved. Pure DIY seasonality
would have moved both.

The likeliest structural explanation is **AI Overviews absorbing calculator intent** — a "board and
batten calculator" query increasingly gets answered inline, with no click. Two data points is not
proof. But it is a headwind that applies to every calculator product in the portfolio, it matches
the post-AI-Overviews CTR curve in `references/adsense-economics.md`, and it should be checked
before the next tool-shaped bet is scouted.

---

## Verdict

**The gate FAILS as positioned, and PASSES re-positioned.** The build is sound and the niche is
real. The targeting points at the wrong half of it.

Rough revenue bands (home improvement RPM ~$8-15, which is a decent vertical):

- **As-is** (tool cluster, ~2.5k/mo Google-scale): 10-20% capture over a year is 250-500 sessions/mo
  → roughly **$3-9/mo**. Not a business.
- **Re-targeted** (informational cluster, ~53k/mo): 5% capture is ~2,650 sessions/mo → **$25-50/mo**;
  15% is **~$95-145/mo**. Modest, real, and it compounds.

**The pivot is cheap because the content already exists.** Every style page already carries
1,000-1,170 words. This is a re-targeting job (titles, H1s, meta descriptions, internal links,
adding the inspiration/how-to angle) not a rebuild. The planner stops being the keyword and starts
being the differentiator inside a page that ranks for the thing people actually search.

**Recommended before buying the domain:** re-target the six content pages at the informational
cluster. Keep "[style] calculator" as a secondary phrase in body copy, not as the title.

**Unchanged:** do not add this site to AdSense while JsonBeam and GradeJar are both mid-re-review.

---

*Re-run: `node scripts/keyword-volumes.mjs "kw" "kw" ...` · discovery: `--related "seed"` ·
`--json` for machine-readable. Refresh before any future go/no-go on this product.*
