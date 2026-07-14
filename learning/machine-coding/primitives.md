# The Primitive Map

> **Every machine coding question is a composition of 3-5 primitives.** Own the primitives and the
> questions stop being scary. This is the file that explains why you froze on autocomplete: it is
> *four* primitives, and you own zero.
>
> **The unit of mastery is the primitive, not the question.** The queue tracks builds; this file
> tracks what those builds actually taught you. `/machine-coding review` updates the Owned column.

## How to read this

**Target** = the time to build it **cold, from a blank file, with zero lookups.** Not "how long it
takes with docs open." That number is the whole point — it is the difference between knowing *about*
a thing and *owning* it.

**Status:** `—` never attempted · `~` shaky (built it, needed lookups) · `✅` owned (cold, under target).

Statuses live in [`profile.md`](profile.md) — that's the one file the skill reads every session. This
file is the reference map; the profile is the live scoreboard. Don't duplicate the state here.

---

## Tier 1 — DOM / JS primitives

The vanilla layer. Everything else is built on these, including the React ones.

| # | Primitive | Target | The thing you must be able to do cold |
|---|-----------|--------|----------------------------------------|
| 1 | **Render a list from an array** | 3 min | `array → DOM nodes`, and re-render on change without leaking listeners |
| 2 | **Controlled input** | 3 min | The value ↔ state loop, and why the input goes read-only if you forget the handler |
| 3 | **Event delegation** | 5 min | ONE listener on the parent, `e.target.closest()`, works for nodes added later |
| 4 | **Debounce** | 5 min | Trailing-edge timer, `clearTimeout` on every call, and returning the wrapped fn |
| 5 | **Throttle** | 5 min | Leading-edge gate. And knowing *when* you want this instead of debounce |
| 6 | **localStorage persist** | 4 min | Load on init (with a parse guard), save on change. The `JSON.parse(null)` trap |
| 7 | **Fetch + loading/error/empty** | 6 min | All four states, always. **Empty ≠ loading.** The state most people forget |
| 8 | **Timer / interval + cleanup** | 5 min | `setInterval`, and the teardown that stops it leaking on unmount |
| 9 | **Event emitter (`on`/`off`/`emit`)** | 8 min | A `Map` of event → handler set. `off` must actually remove |
| 10 | **Keyboard handling** | 6 min | Arrow nav, Enter, Escape. `preventDefault` on the arrows or the page scrolls |

## Tier 2 — React state primitives

Where most frontend rounds actually live.

| # | Primitive | Target | The thing you must be able to do cold |
|---|-----------|--------|----------------------------------------|
| 11 | **Controlled input (React)** | 3 min | `value` + `onChange`. The uncontrolled→controlled warning and what causes it |
| 12 | **List CRUD in state** | 8 min | add / edit / delete / toggle, **immutably**. `map` to update, `filter` to delete |
| 13 | **Lifting state up** | 5 min | Two siblings need the same state → it moves to the parent. Do it without being told |
| 14 | **`useEffect` + cleanup** | 5 min | The return function. Subscriptions, timers, aborts. Dependency array honesty |
| 15 | **Derived vs stored state** | 4 min | **If you can compute it, do NOT store it.** The single most common structural bug |
| 16 | **Custom hook extraction** | 6 min | `useDebounce`, `useLocalStorage`, `useFetch`. Pull logic out of the component |
| 17 | **`useReducer`** | 8 min | When state has 3+ actions that touch the same object. The action-type switch |
| 18 | **Context** | 6 min | Provider + consumer, and why you don't reach for it until you actually need it |
| 19 | **Portal / modal** | 12 min | `createPortal`, Escape to close, click-outside, focus trap, scroll lock |
| 20 | **Controlled form + validation** | 10 min | Per-field errors, validate on blur *and* submit, disabled submit state |
| 21 | **Refs** | 4 min | DOM access (`focus()`) *and* the mutable-value use (a ref is not state) |

## Tier 3 — Interaction primitives

The ones that turn a medium question into a hard one.

| # | Primitive | Target | The thing you must be able to do cold |
|---|-----------|--------|----------------------------------------|
| 22 | **Drag and drop** | 15 min | `dragstart`/`dragover`/`drop`. **`preventDefault` on dragover or drop never fires** |
| 23 | **Infinite scroll** | 10 min | `IntersectionObserver` on a sentinel. Unobserve when the list is exhausted |
| 24 | **Pagination** | 8 min | Client-side slice *and* the server-side `page`/`limit` shape. Know both |
| 25 | **Undo / redo stack** | 10 min | Two stacks (past/future). A new action clears the future |
| 26 | **Optimistic update + rollback** | 10 min | Apply immediately, keep the old value, restore it if the request fails |
| 27 | **Recursion over a tree** | 10 min | A component that renders itself. Nested comments, file trees, nested checkboxes |

---

## The compositions — what questions are actually made of

**Read this table before you panic about a question.** Decompose first. If you own the primitives,
you can build the thing.

| Question | = Primitives |
|----------|--------------|
| Counter | 11 |
| Star rating | 1 + 11 (+ hover state) |
| Accordion / Tabs | 1 + 11 (+ 15 — the open index is *derived*, don't store a flag per item) |
| Stopwatch | 8 + 14 (+ 15 for the display format) |
| Traffic light | 8 + 14 + 17 |
| Progress bar | 8 + 14 + 15 |
| **Todo list** | **12 + 11 + 6** |
| Search filter | 11 + 15 *(the filtered list is derived — this is the whole lesson)* |
| OTP input | 21 + 10 + 11 |
| **Autocomplete / typeahead** | **4 + 7 + 10 + 11** ← *the four you didn't have. Not a talent gap.* |
| Modal | 19 + 14 + 10 + 21 |
| Form validation | 20 + 11 + 15 |
| Data table (sort + filter + paginate) | 15 + 24 + 11 |
| Infinite scroll feed | 23 + 7 + 1 |
| Nested comments | 27 + 12 + 11 |
| File explorer tree | 27 + 15 |
| Tic-tac-toe | 12 + 15 *(the winner is **derived** — never store it)* |
| Carousel | 8 + 10 + 15 |
| Toast system | 18 + 8 + 12 + 19 |
| Kanban board | 22 + 12 + 15 |
| Comment thread w/ optimistic post | 27 + 26 + 12 |

## The warm-up drill (5 min, every session)

Before the timed build, **one primitive, cold, from a blank file.** The lab rotates it for you,
weighted toward whatever is `~` or `—` in your profile. This is the reps that fix muscle #2.

You are not trying to be clever. You are trying to make `debounce` come out of your fingers without
thinking, the way `for (let i = 0` already does.
