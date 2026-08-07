# The Story Bank

> **One bank, not one per project.** Behavioral rounds interleave — the same story answers "a hard bug"
> and "a time you pushed back," and an interviewer who hears the same anecdote twice notices.
>
> **Rewritten, not appended.** Read with `drills/50-behavioral.md`. **Six good stories beat twenty
> half-remembered ones** — this file is capped at eight and stays capped.

## How a story is stored here

**S** situation · **T** task · **A** action · **R** result · **⇢** what it *also* answers.

**The rule:** ~90 seconds spoken. If the setup takes longer than the action, the story is wrong.
**Result is the part everyone drops** — a story with no outcome is an anecdote.

---

## 1. The date picker you fixed without forking 🟢

*Grounded: `../project-knowledge-base/dwellworks/03-frontend-architecture.md` §11*

- **S** — `vue-ctk-date-time-picker`'s `getYears()` only generated a ±7-year window. Entering a date of
  birth meant clicking back one year at a time. Real users, real forms, every day.
- **T** — Fix it without destabilising a legacy surface.
- **A** — Two obvious options were both bad: fork a vendored minified file (unmaintainable), or swap the
  library across a large legacy Razor surface (a big change for one method). Instead, a ~75-line runtime
  patch that walks the component tree to find `YearMonthSelector` and overrides `getYears` on its
  `methods` object — 80 years back, 20 forward, auto-scrolling to the selected year. Loads *after* the
  vendor script and guards for the component being missing.
- **R** — Date entry became one interaction. **Reversible, and it fails safe**: if the library is ever
  upgraded the patch checks the component and method still exist and no-ops.

⇢ *technical judgment · working in legacy code · a hard bug · pragmatism over purity*

> **The sentence that makes it senior:** *"Reversible and fails safe."* Without those two words it's a
> hack. With them it's a considered decision.

## 2. The stale-response race across 36 service modules 🟢

*Grounded: `../project-knowledge-base/cloudforestx/04-frontend-and-data-layer.md` §3*

- **S** — Dashboards with a global account and month filter. Change the filter twice quickly and the
  slower first response could land after the second, painting the wrong account's data. Intermittent,
  and it looked like a backend bug.
- **T** — Fix it once, not per screen.
- **A** — A generic fetch hook holding a `requestIdRef`: each request takes an id, and on resolve the
  response is discarded unless its id is still current. Applied across **36 service modules** rather
  than patched per component.
- **R** — The class of bug disappeared, and every new dashboard inherited the fix.

⇢ *a hard bug · systems thinking · a time you fixed the cause not the symptom*

> **The pairing that makes this your best technical story:** *"The same problem showed up four years
> earlier at MyWorkMyDay in a `useFetch` hook and I half-handled it. Same bug, four years of judgment
> apart."* **That's a growth arc told through code.** Use it when asked how you've improved.

## 3. The mobile keyboard bug nobody reported 🟢

*Grounded: `../project-knowledge-base/dwellworks/03-frontend-architecture.md` §11*

- **S** — The Orders AI assistant chat lived in a floating panel. On mobile the on-screen keyboard
  pushed the input off-screen, so users couldn't see what they were typing.
- **T** — Nobody had filed it. It was noticed, not assigned.
- **A** — Made the chat full-screen on mobile so the layout reflows *above* the keyboard instead of
  being pushed by it.
- **R** — The feature became usable on the device where it was being used.

⇢ *user empathy · initiative · going beyond the ticket*

> **Small on purpose.** Don't inflate it. Its value is that you *noticed* — say that plainly.

## 4. The mobile team's API contract 🟢

*Grounded: `../project-knowledge-base/dentscribe/03-portal-architecture.md` §8*

- **S** — DentScribe had three surfaces on one API: the portal (yours), the backend, and a mobile
  recording app in a separate codebase you never worked in.
- **T** — Ship a portal against a contract shared with a team you didn't sit with.
- **A** — Worked the contract explicitly with the backend and mobile teams, and handled the cases where
  the shapes diverged. *(There is a literal comment in the codebase noting a `statusCode 400 due to
  mobile app issue` — a contract mismatch documented in the code rather than argued about.)*
- **R** — The portal shipped against a moving contract, and the divergences were visible instead of
  mysterious.

⇢ *cross-team work · communication · ambiguity*

> **Boundary attached:** *"The mobile app is a separate codebase I didn't work in."* Say it inside the
> story so it never has to be extracted from you.

## 5. The AdSense rejection 🟢

*Grounded: `adsense-review-status` — JsonBeam rejected 2026-07-08*

- **S** — JsonBeam went live: fast, ad-free, genuinely good at its one job. It was rejected for
  low-value content.
- **T** — Work out whether the product was wrong or the plan was.
- **A** — The plan. A single-purpose tool page is thin by a content policy's standard however well it
  works — the tool was the product, but the thing being monetised is *pages*. So monetisability moved to
  **scoping time**: every project since gets checked for a real revenue band and a content plan *before*
  it's built, not after.
- **R** — The scoping check now runs before any build starts, and it has killed ideas that would have
  ranked and never paid.

⇢ *a failure · learning from it · commercial awareness · being wrong*

> **The best "tell me about a failure" answer you have**, because the lesson changed a process rather
> than producing a resolution to try harder. **Don't dress it up. "I misread the business model" is the
> line.**

## 6. Taking the numbers off your own CV 🟢

*Grounded: `../../references/cv/fact-bank.md`, the three `cv-truth-table.md` files, 2026-07-24*

- **S** — Preparing to interview, you went back through your own CV against the actual repos.
- **T** — Check whether every claim was true.
- **A** — Several weren't. A bundle-reduction percentage bound to a library that was never installed. A
  load-time improvement attributed to memoization, which reduces re-renders and cannot change initial
  load. A test-coverage claim backed by one untouched default file. **They came off.**
- **R** — Everything on the CV can now be opened in a repo. **The claims that survived got stronger,
  because they're the ones with evidence.**

⇢ *integrity · attention to detail · a time you were wrong · self-review*

> **Deploy this when performance numbers come up**, or when asked about a time you held yourself to a
> standard nobody was checking. **It is disarming precisely because nobody would have caught it.**

---

## Still needed — Tarun supplies these, they will not be drafted for him

These four are asked constantly and there is **no grounding for them in this repo.** Bring the real
situations to the D50 sitting and they get written up here in his words.

| # | Story | Prompt to answer |
|:--:|---|---|
| 7 | **Disagreeing with the client** | Dwellworks is client-facing: requirements, design sessions, demos. **When did you push back on a requirement, and what happened?** *(kb `dwellworks/03` §10 flags this bullet as the one most likely to be probed behaviorally.)* |
| 8 | **A production issue across time zones** | A US client, an India-based team. **When did something break on their clock, not yours?** |
| — | **Influencing without authority** | Getting another team to change something you didn't own. |
| — | **Why you're leaving** | Forward-looking. **Never trash the employer. Never leak internal detail.** Hard boundary. |

> **Two of these must exist before D50 passes.** Stories 1-6 are strong on *technical* judgment and
> thin on *interpersonal* judgment — and behavioral rounds are mostly the second kind.
