# Bullet 3 — the shared component library

> *"Built the shared component library — form fields, virtualized selects, advanced data grid, Google
> Maps views — reused across all 20 bundles."*

**Grounding:** kb `dwellworks/03` §5 · **Colour:** 🟢 built + extended

## Say this

```
"I built and extended the shared layer that all 20 bundles consume — 78 files. Typed
form fields on a form context, an advanced grid with pagination, Google Maps views,
and a virtualized select. The point isn't any one component: 20 independently-built
bundles have to present one product. A field validates the same way and a grid
paginates the same way whether you're in Spark or the intake survey. Without that
layer, 20 bundles drift into 20 products."
```

## Lead with the virtualized select

The problem — dropdowns here are *every metro area*, *every consultant*:

```
NAIVE                              VIRTUALIZED
─────                              ───────────
<select>                           only the visible ~15 rows exist in the DOM
  3,000 × <option>                        │
</select>                          ┌───────┴────────┐
   │                               │ ▓ visible rows │ ← rendered
   ▼                               ├────────────────┤
3,000 DOM nodes                    │   (not in DOM) │ ← just empty space
browser freezes                    └────────────────┘
   — and the target                scroll → rows recycle
     includes IE11, so
     there is no headroom
```

It wraps `react-select` and replaces the menu with a windowed list.

**The detail that proves you wrote it:** the initial scroll offset is computed from the **index of the
currently-selected option**, so reopening the dropdown lands on the current value instead of jumping
to the top.

## Follow-ups they will ask

| They ask | I say |
|---|---|
| Why virtualize instead of search-as-you-type? | That's better when the list is genuinely unbounded, and we do it for consultant search. For a fixed reference list like metros the data is small enough to send once and big enough to kill the DOM — virtualizing was cheaper than adding an endpoint and a loading state to every dropdown |
| How did you stop 20 teams forking it? | One path alias, no local copies. Consistency was reviewed |
| Would you publish it as a package? | Only if the bundles deployed independently. They ship in one .NET deploy, so a package adds versioning overhead for zero isolation benefit |
| What's actually in it? | Typed form fields on a form context, a second simpler field set, redux-form render adapters, the advanced grid + pagination, the virtual select, Google Maps views, date picker, modal, breadcrumbs |

## The boundary

> *"I built and extended components in the shared layer that all 20 bundles consume."*

**Do not say you founded it** — parts predate you.

## Never get wrong

- **78** shared component files, consumed by all **20** bundles
- Styling is **plain CSS via style-loader** + `clsx`. No CSS Modules, no CSS-in-JS, no tokens.
  SCSS lives on the **Razor** side, not in React
- `redux-form` is legacy/deprecated — today you'd use `react-hook-form`, and keep form state **out** of
  a global store. Form state is local by nature
