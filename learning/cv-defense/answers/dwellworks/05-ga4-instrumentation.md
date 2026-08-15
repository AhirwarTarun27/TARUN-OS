# Bullet 5 — GA4 virtual pageview instrumentation

> *"Instrumented React surfaces with Google Analytics 4 virtual pageview tracking, giving product
> per-page visibility into user drop-off."*

**Grounding:** kb `dwellworks/03` §8 · **Colour:** instrumentation 🟢 / analysis 🔴

## Say this

```
"GA4 records a pageview on a real page load. Inside a React bundle the user moves
between views without one, so GA4 saw a single pageview and every screen after it was
invisible — product couldn't tell where people were dropping out of the flow. I wrote
a hook that pushes a VirtualPageView event into the GTM dataLayer on every in-bundle
view change."
```

## The problem

```
A REAL MULTI-PAGE SITE                 A REACT BUNDLE
──────────────────────                 ──────────────
/orders          → page load → GA4 ✓   /spark → page load → GA4 ✓
/orders/42       → page load → GA4 ✓   then step 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8
/orders/42/docs  → page load → GA4 ✓        (React just swaps views —
                                             ZERO page loads)
GA4 sees the whole journey
                                       GA4 sees: 1 pageview. That's it.
```

Product could not answer *"where do people abandon the 8-step intake survey?"*

## The fix

```
a view changes inside the bundle
          │
          ▼
   useGoogleAnalytics fires
          │
          ▼
   window.dataLayer.push({
      event: "VirtualPageView",
      page_path:  <current url>,
      page_title: <this view's title>
   })
          │
          ▼
   Google Tag Manager watches dataLayer
          │
          ▼
   GTM forwards it to GA4 as a pageview
```

**`dataLayer`** is just a plain array on `window` that GTM watches. You push objects in; GTM reacts.

## The subtlety — why the first render is skipped

```
user lands on /spark
   │
   ├─ real page load  → GA4 fires its OWN pageview        ← 1
   └─ React mounts, hook runs on first render → pushes    ← 2  ✗ DUPLICATE

every entry page counted twice → traffic inflated, funnel numbers wrong
```

The hook keeps a ref as a *"have I run before?"* flag. First render: flip it, return, push nothing.
Every render after: push normally.

**Result:** GA4 counts the real load once; the hook counts only the client-side transitions after it.

## Follow-ups they will ask

| They ask | I say |
|---|---|
| Why was this needed at all? | SPA view changes fire no pageview, so GA4 went blind after the entry page |
| Why skip the first render? | The real page load already fired GA4's own pageview — firing again double-counts every entry page |
| **Why `dataLayer` instead of `gtag()`?** | dataLayer is GTM's queue. Marketing can add, rename or redirect tags in the GTM console with **no front-end deploy**. Calling gtag directly hard-codes the analytics contract into a monolith with a slow release cycle |
| What did product learn from it? | **Per-page funnel visibility they didn't have before.** ← stop there |

## The boundary

> *"I instrumented it. I didn't run the analysis or own the GA4 property."*

## Never get wrong

- **Do not invent a conversion-lift number.** "Per-page funnel visibility they didn't have before" is
  the whole claim
- This bullet pairs with IE11 — the instrumentation is how you'd **measure** actual IE11 sessions
  before proposing a migration. Connecting the two is a strong senior move
