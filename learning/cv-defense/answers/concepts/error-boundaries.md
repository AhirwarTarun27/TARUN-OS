# Error boundaries — the code, and why it must be a class

Used by: [bullet 4](../dwellworks/04-error-boundaries.md)

## The problem

React's default: if a component throws **while rendering**, React unmounts the **entire tree**.
White screen.

```
WITHOUT boundaries                 WITH a cell-level boundary
──────────────────                 ──────────────────────────
┌──────────────────────┐           ┌──────────────────────┐
│ Order Dashboard      │           │ Order Dashboard      │
│  row 1   ✓           │           │  row 1   ✓           │
│  row 2   ✓           │           │  row 2   ✓           │
│  row 3   💥 null     │           │  row 3   [  —  ]     │ ← only this cell
│  row 4   ✓           │           │  row 4   ✓           │
│  … 196 more          │           │  … 196 more  ✓       │
└──────────────────────┘           └──────────────────────┘
          ↓                                   ↓
   ENTIRE SCREEN BLANK              199 rows keep working
```

For a program manager mid-shift, a blank dashboard is the job stopping.

## The three levels in Odin

```
GlobalErrorBoundary                      ← L1: the whole bundle
  └── SchoolErrorBoundary                ← L2: one feature
        └── AdvancedGrid
              └── CellErrorBoundary      ← L3: one cell
                    └── <OrderCell/>     ← the throw happens here
```

A boundary catches throws from anything **below** it, and the **nearest one wins** — exactly like
nested `try/catch`. So the cell boundary catches it before the grid or the page ever notice.

7 boundaries at 3 levels.

## The code

```jsx
class CellErrorBoundary extends React.Component {
  state = { hasError: false };

  // Called when a child throws. Return new state → React renders the fallback.
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Called with the error + component stack. For side effects — i.e. logging.
  componentDidCatch(error, info) {
    logger({ Message: error.message, Stack: error.stack, ...getBrowserInfo() });
  }

  render() {
    if (this.state.hasError) return <td>—</td>;   // the fallback
    return this.props.children;                    // the normal path
  }
}
```

Wrapped per cell, so every row gets its own independent boundary:

```jsx
{rows.map(row => (
  <CellErrorBoundary key={row.id}>
    <OrderCell data={row} />
  </CellErrorBoundary>
))}
```

**Two methods, two jobs:**

| Method | Job |
|---|---|
| `static getDerivedStateFromError(error)` | return new state → **render the fallback** |
| `componentDidCatch(error, info)` | **side effects** — log it, report it |

## Why a class and not a function

**Because React never shipped a hook version.** `getDerivedStateFromError` and `componentDidCatch` are
**class lifecycle methods**, and there is no `useErrorBoundary`. This is one of the very few places in
modern React where you still must write a class.

Say it like this:

> *"Error boundaries are class-only — `getDerivedStateFromError` and `componentDidCatch` are lifecycle
> methods and React has no hook equivalent. If you don't want to write the class yourself you pull in
> `react-error-boundary`, but that library is a class internally too. It's one of the last genuine
> class use-cases."*

## What boundaries do NOT catch

Expect this follow-up.

| Not caught | Use instead |
|---|---|
| event handlers (`onClick`) | plain `try/catch` |
| async — `setTimeout`, promises, `.then` | `try/catch` / `.catch()` |
| server-side rendering | n/a here — no SSR |
| an error thrown by the boundary itself | the boundary above it |

**Memory hook:** boundaries catch errors **that happen while React is rendering.** Anything outside
the render pass is invisible to them.

## "Isn't a boundary per cell excessive?"

> *"It would be if the data were trustworthy. That grid renders orders aggregated from several services
> with optional fields, so a null in an unexpected place is a question of when, not if. The cost is one
> tiny class; the benefit is a data problem degrading one cell instead of taking a dashboard away from
> someone whose job depends on it. I'd put boundaries at that granularity anywhere a list renders
> aggregated or third-party data, and nowhere else."*

The last sentence is the important one — it shows judgement, not a blanket rule.

## The logger → Seq

Boundaries stop the bleeding. The logger tells you it happened.

```
error thrown during render
        │
        ▼
componentDidCatch(error, info)
        │
        ▼
seq-logger builds one record:
   { Timestamp, Level, Message,
     BrowserName, BrowserVersion, MachineInfo,   ← who, what, where
     Stack: resolved via stacktrace-js,          ← readable frames
     Url, Props }
        │
        ▼
    POST → Seq  ═════▶  the SAME store as the .NET backend's logs
                         → one search returns frontend + backend
                           for the same incident
```

- **`stacktrace-js`** — production JS is minified, so a raw stack reads
  `a.b is not a function at t.min.js:1:4823`. It maps back to real file and line.
- **Injected via `LoggerContext`** so components log without importing a singleton.
- **Logging failures are swallowed** — logging must never break the page it is reporting on.

**Why browser + machine info specifically:** the users are relocating families on unknown devices in
foreign countries, and IE11 is in scope. *"It's broken"* is unactionable. *"It's broken on IE11 on
this build"* is a ticket someone can pick up. That is a **domain-driven** engineering decision, and
saying that out loud is what makes it senior.

## Volunteer this flaw — it reads as rigor

`GlobalErrorBoundary.componentDidCatch` has a `// TODO - log analytics here` and **does not** wire
into the logger. The per-feature boundaries and the survey do log.

> *"The wiring is inconsistent — the global boundary shows a fallback but doesn't report, which is
> exactly backwards from what you'd want."*

## The boundary (the CV kind)

**You wrote the client logger that writes into Seq. You did not build Seq or the .NET logging pipeline.**
