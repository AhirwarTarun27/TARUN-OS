# Metrics Log

Append-only snapshot of site traffic + revenue. One row per `/site-report` run.
Newest at the bottom. Never delete a row — this is the track record.

Organic % = organic-search sessions ÷ total sessions. US % = US users ÷ active users.
Earnings + approval from AdSense; $0 under GETTING_READY is expected (ads not live yet).
Bing clk/impr = Bing Webmaster clicks/impressions over the window (— = not yet tracked / no key).

| Date | Site | Users 7d | Sessions 7d | Views 7d | Organic % | Eng. rate | US % | Earnings 7d | Approval | Bing clk 7d | Bing impr 7d |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-07-01 | jsonbeam.com | 60 | 76 | 142 | 12% | 27.6% | 38% | $0.00 | GETTING_READY | — | — |
| 2026-07-02 | jsonbeam.com | 47 | 59 | 96 | 15% | 28.8% | 51% | $0.00 | GETTING_READY | — | — |
| 2026-07-03 | jsonbeam.com | 37 | 48 | 86 | 15% | 31.3% | 49% | $0.00 | GETTING_READY | 0 | 0 |
| 2026-07-03 | gradejar.com | ~211/day (CF edge-log, not GA4) | n/a | 718 | n/a (CF WA doesn't split channel) | n/a | ~35% (top-5 country share, 24h sample) | $0.00 | GETTING_READY | 0 | 0 |
| 2026-07-06 | jsonbeam.com | 25 | 33 | 54 | 12% | 30.3% | 48% | $0.00 | NEEDS_ATTENTION | 0 | 0 |
| 2026-07-06 | gradejar.com | ~910/day (CF edge-log, not GA4) | n/a | 1521 | n/a (CF WA doesn't split channel) | n/a | ~43% (top-5 country share, 24h sample) | $0.00 | GETTING_READY | 0 | 0 |
| 2026-07-14 | jsonbeam.com | 11 | 18 | 75 | 17% | 38.9% | 45% | $0.00 | GETTING_READY | 0 | 0 |
| 2026-07-14 | gradejar.com | ~920/day (CF edge-log, not GA4) | n/a | 956 | n/a (CF WA doesn't split channel) | n/a | ~45% (top-5 country share, 24h sample) | $0.00 | GETTING_READY | 0 | 0 |

Notes 2026-07-14: GSC 7d — JsonBeam 1 clk / 3 impr, pos 6.0; GradeJar 1 clk / **934 impr**, pos 66.7.
GradeJar's 30d impressions = 944, so ~99% of them landed in the last 7 days — Google just started surfacing the pSEO pages at scale.
JsonBeam GA4 traffic down 5x since 07-01 (60 → 11 users): launch-buzz decay, organic search never took over.
