# Bullet 4 — layered error boundaries + the stack-trace logger

> *"Hardened the UI with layered React error boundaries and a stack-trace logger, containing failures
> to one cell instead of the whole page."*

**Grounding:** kb `dwellworks/03` §7 · **Colour:** client 🟢 / Seq server 🔴
**Concepts:** [error boundaries — code + why a class](../concepts/error-boundaries.md)

## Say this

```
"React unmounts the whole tree on an uncaught render error. With only a global
boundary, one malformed row in a 200-row grid blanks the screen for a program manager
mid-shift. So I layered them: global, per-feature, and per-element — down to a single
cell in the grid. The bad cell renders a fallback and the other 199 rows keep working.
Alongside it I wrote the client logger that ships the resolved stack plus browser and
machine info to Seq, so front-end errors land in the same searchable store as the
backend's logs."
```

## The layering

```
GlobalErrorBoundary                      ← L1: the whole bundle
  └── SchoolErrorBoundary                ← L2: one feature
        └── AdvancedGrid
              └── CellErrorBoundary      ← L3: one cell
                    └── <OrderCell/>     ← the throw happens here
```

Nearest boundary wins, exactly like nested `try/catch`. **7 boundaries at 3 levels.**

## Follow-ups they will ask

| They ask | I say |
|---|---|
| **How does a boundary actually work?** | A class with `getDerivedStateFromError` (return state → render fallback) and `componentDidCatch` (side effects → log) → [code](../concepts/error-boundaries.md) |
| **Why a class and not a function?** | React never shipped a hook version. No `useErrorBoundary`. `react-error-boundary` exists but is a class internally too |
| What can't a boundary catch? | Event handlers, async code, SSR, and errors it throws itself. It catches what happens **while React is rendering** |
| Isn't per-cell excessive? | Only if the data were trustworthy. That grid aggregates several services with optional fields, so a null in an unexpected place is when, not if → [full answer](../concepts/error-boundaries.md) |
| How do you know it's working? | Seq — the same store as the backend's logs, so one search returns both sides of an incident |
| Why browser + machine info? | Users are relocating families on unknown devices abroad, IE11 in scope. *"It's broken"* is unactionable; *"broken on IE11 on this build"* is a ticket |

## Volunteer this — it reads as rigor

The **global** boundary shows its fallback but has a `TODO` and never reports to the logger. The
per-feature ones do.

> *"The wiring is inconsistent — the global boundary shows a fallback but doesn't report, which is
> exactly backwards from what you'd want."*

## The boundary

> *"I wrote the client logger that writes into Seq. I didn't build Seq or the .NET logging pipeline."*

## Never get wrong

- **7** boundaries at **3** levels
- Boundaries are **class-only**. There is no hook equivalent
- They do **not** catch event handlers or async
- `stacktrace-js` exists because production JS is minified and raw stacks are unreadable
- Logging failures are **swallowed** — logging must never break the page it reports on
