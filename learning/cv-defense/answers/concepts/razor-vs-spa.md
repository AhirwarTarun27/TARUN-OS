# Razor, and why Odin is not one React SPA

Used by: [bullet 1](../dwellworks/01-bundles-ie11.md)

## What Razor is

ASP.NET's **server-side template engine**. `.cshtml` files are HTML with C# mixed in. The server runs
the C#, produces **finished HTML**, and sends that down. Same idea as EJS or Handlebars, but for .NET.

The browser receives a complete page. No JavaScript required to see content.

## The one picture

```
NORMAL REACT SPA                 ODIN
────────────────                 ────
<html>                           <html>
 <body>                           <body>
  <div id="root"></div>            <nav>…</nav>              ← Razor rendered
 </body>                           <header>…</header>        ← Razor rendered
</html>                            <div id="react_spark"/>   ← React mounts HERE
      ↑                            <footer>…</footer>        ← Razor rendered
React builds EVERYTHING:          </body>
routing, auth, layout, nav       </html>
                                       ↑
                                 Razor owns the page.
                                 React owns ONE div.
```

The word to say out loud is **islands**. React islands in a server-rendered sea.

## Why not go full SPA — the real argument

ASP.NET owns three things, and **all three are app-wide, not per-page**:

```
Routing   which URL → which page      ← ONE system for all 200 pages
Auth      logged in? what role?       ← ONE system
Layout    nav, header, footer         ← ONE system
```

**You cannot migrate half a routing system.** React can't own routing for 5 pages while ASP.NET owns
195 — there is one URL bar. So going SPA is all-or-nothing, on day one, for all 200 pages. That is a
rewrite, not a migration, and the business was never going to fund it.

A React island inside one Razor page is **per-page**, so it migrates one page at a time.

> **Lead with incremental migration.** Blast radius is the second sentence, not the first — see below.

## "But an SPA can isolate failures too" — yes, and here is the honest answer

This is a fair challenge and you should expect it. Ways a single SPA isolates failure:

| Technique | Isolates |
|---|---|
| Error boundaries per route/feature | **runtime render** errors |
| `React.lazy` + `Suspense` per route | chunk **load** failures |
| Module federation / micro-frontends | **deploy** — genuinely independent |

**What separate bundles buy that boundaries do not:**

- a **build** failure — one bad import and the whole bundle fails to compile, so nothing ships at all
- a **boot** failure — an error before React mounts, when no boundary exists yet
- **deploy coupling** — one bundle means fixing one feature redeploys all 20

So: *boundaries isolate runtime errors; separate entry points isolate build and deploy failures too.*
Odin has **both** — 20 bundles **and** 7 error boundaries. Different failure classes.

**The trap:** if you lead with blast radius, the interviewer raises error boundaries and you are on the
back foot. Lead with **incremental migration**; blast radius is a bonus you mention second.

## `window.globalObject` — the note the server leaves on the table

The server **already knows** who you are; it just authenticated you and rendered the page. So rather
than let React boot and ask over the network, it writes the answers into the HTML.

```
WITHOUT it                          WITH it
──────────                          ───────
page loads                          page loads (JSON already in the HTML)
React mounts                        React mounts
"who am I?"        → API  …wait     reads window.globalObject
"which order?"     → API  …wait       → user, role, order id, API urls
"where's the API?" → API  …wait     renders IMMEDIATELY
finally renders
```

It carries **bootstrap facts only** — user, role, order ids, API base URLs, the SignalR endpoint,
third-party keys. Real data (the order list, the schools) still comes from Web API 2 after mount.

**Follow-up: "isn't a global a code smell?"** Yes, and say so: it couples every bundle to a server
contract that is neither typed nor versioned, and components can't be tested without mocking a global.
The pattern itself is sound — it is what Next.js does with `__NEXT_DATA__`. The flaw is that ours is
untyped and read in 156 places instead of parsed once at the entry point.

## "Could we not just build an auth HOC in React?"

**Right that you can. Wrong that you should own it there.**

**Client-side auth is UX, not security.** An HOC hides buttons and redirects. It does not protect
data — anyone can open devtools and flip a flag. The server must enforce on every API call anyway.

```
✗ React decides:  React checks role → shows/hides → server trusts it        (broken)
✓ Odin:           server decides → writes role into globalObject
                  → React reads it to render the right UI
                  → server ALSO re-checks on every API call                 (correct)
```

Adding a React auth HOC would put the auth model in **two places** — C# and JS — that drift apart.
React consumes the server's decision; it does not make it.

> Same point is graded on the DentScribe route-guard bullet. It is a repeat question.

## The three words that lose the bullet

| Never say | Why it is false here | Say instead |
|---|---|---|
| **hydration** | it's `ReactDOM.render`, never `hydrate`. No React SSR — the server renders *Razor* | "each bundle mounts client-side into a server-rendered page" |
| **code-splitting** | no `splitChunks`, no `React.lazy`, no dynamic `import()` | "20 independent entry bundles, one per page" |
| **micro-frontend** | no independent deploy, no module federation — one .NET deploy | "embedded SPAs" or "islands" |

## splitChunks — the weakness and its fix

```
TODAY                              WITH splitChunks
─────                              ────────────────
survey.bundle.js  = React + app    vendor.bundle.js = React  ← downloaded ONCE, cached
school.bundle.js  = React + app    survey.bundle.js = app only
spark.bundle.js   = React + app    school.bundle.js = app only
payment.bundle.js = React + app    spark.bundle.js  = app only

visit 4 pages → React 4×           visit 4 pages → React 1×
```

**"Config-level, not a rewrite"** = a few lines in `webpack.config`. Zero application code changes.
That is why it is the highest-leverage fix: big payoff, tiny diff.

Say **"substantially"**, never a number. You have not measured it.
