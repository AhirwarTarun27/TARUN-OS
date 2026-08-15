# Bullet 1 — 20 bundles in a Razor monolith, IE11 held

> *"Ship React features across 20 independently-mounted SPA bundles embedded in a legacy .NET Razor
> monolith, holding IE11 support."*

**Grounding:** kb `dwellworks/03` §1, §2, §9 · **Colour:** features 🟢 / original architecture 🟡
**Concepts:** [Razor vs SPA](../concepts/razor-vs-spa.md) · [IE11](../concepts/ie11.md)

**This is the #1 architecture question you will get on this project.**

## Say this

```
"Odin is a .NET Framework Razor monolith we modernized page by page. I ship React
features into it as 20 separate webpack entry points — each compiles to its own
bundle and mounts into a div inside a server-rendered Razor view. The server injects
a JSON config into window.globalObject, the bundle reads it at mount, then goes to
Web API 2 for everything else. We hold IE11 because our transferees sit inside
locked-down corporate IT."
```

## The mechanism, as a flow

```
Browser requests /Spark
   ↓
ASP.NET MVC routes → SparkController → Razor view (Spark.cshtml)
   ↓
   ├─ server renders shell, nav, layout        (HTML arrives complete)
   ├─ injects JSON into window.globalObject    (user, roles, API urls, order ids)
   └─ includes <script src="dist/spark-app/spark-app.bundle.js">
   ↓
React boots → reads window.globalObject as APP_CONFIG
            → ReactDOM.render(<App/>, document.getElementById("react_spark"))
            → axios → Web API 2 for the actual data
```

## Follow-ups they will ask

| They ask | I say |
|---|---|
| **Why not one SPA?** | Routing, auth and layout are app-wide, not per-page — you can't migrate half a routing system. Full SPA is all-or-nothing across 200 pages, i.e. a rewrite. → [detail](../concepts/razor-vs-spa.md) |
| What does "embedded" mean exactly? | Server-rendered page, one `<div id="react_*">` per feature, bundle mounts into it client-side |
| How do bundles share state? | They don't. Anything that must survive navigation goes to the server |
| **Biggest downside?** | React ships inside every bundle — no vendor chunk. Visit 5 pages, download React 5× |
| How would you fix it? | A webpack `splitChunks` vendor chunk. Config-level, not a rewrite. Say "substantially" — no number, I never measured it |
| But an SPA can isolate failures too | True for *runtime* errors. Separate entries also isolate **build** and **deploy** failures → [detail](../concepts/razor-vs-spa.md) |
| Why still IE11? | Contractual — corporate transferees are locked to it by their IT → [detail](../concepts/ie11.md) |

## The boundary

> *"I didn't design the Razor architecture — I worked inside it and extended it."*

**Never say "I architected the monolith."**

## Never get wrong

- **20** webpack entry points · **409** js/jsx files
- `ReactDOM.render`, **never** `hydrate` — there is no SSR
- **No** `splitChunks`, **no** `React.lazy`, **no** dynamic `import()`
- **No TypeScript** on this project. Zero `.ts`/`.tsx`
- Banned words: **hydration** · **code-splitting** · **micro-frontend**
- **Lead with incremental migration**, not blast radius
