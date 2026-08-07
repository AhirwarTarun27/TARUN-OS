# Drill D30 — Next.js

**Phase 1, sitting 10 (with D31).** Status in `../skills-defense.md`: **quick-learn**.

**The honest position:** Next.js is on the Summary line *and* the Skills line, and it is backed by
`MyProjects/portfolio` (Next 16) plus the ThinkSys site verbally. **No production Next at scale.** Your
production React is CRA and hand-configured webpack. That's a fine answer — but only if you know the
rendering model cold, because a JD that lists Next expects you to.

**The rep that closes it (queue #6, ~1.5 hr):** explain `portfolio`'s current rendering strategy out
loud, then **add one route in a different rendering mode** and be able to say why you chose it.

---

## Teach block (read once, then close)

### The four rendering modes — the only thing they really test

| Mode | When HTML is made | Use it for | Cost |
|---|---|---|---|
| **Static (SSG)** | build time | marketing pages, docs, blog — content that changes on deploy | rebuild to change |
| **ISR** | build time, then **re-generated on a timer or on demand** | a catalogue that changes hourly | stale window |
| **SSR** | every request | per-user or per-request data | a server on the critical path |
| **Client** | in the browser | dashboards behind auth where SEO is irrelevant | blank first paint, bigger JS |

**The senior answer to "which do you pick?"** is never a mode. It's two questions: **does a crawler need
this HTML, and how stale can it be?** Static unless one of those forces your hand. Everything else is
cost you took on voluntarily.

### App Router vs Pages Router

- **Pages Router** — file-based routes, `getStaticProps` / `getServerSideProps` / `getStaticPaths`.
  Every component is a client component.
- **App Router** — nested layouts, `loading.tsx` and `error.tsx` per segment, and **Server Components
  by default**.

### Server Components — the one concept to get right

**A server component runs on the server and its code never ships to the browser.** So it can read a
database or a secret directly, and the client bundle doesn't grow. **It cannot use `useState`,
`useEffect`, or an event handler** — those need a client, and you opt in with `'use client'` at the top
of a file.

**The follow-up they'll ask:** *"where do you put `'use client'`?"* → **as far down the tree as
possible.** It's contagious: everything imported by a client component becomes client too. A `'use
client'` at the top of a layout hands the whole subtree back to the browser and throws away the point.

### Caching — where people get burned

Next caches aggressively and in several layers (a request memo, a persistent data cache, a full route
cache, and the client router cache). **The practical answer:** you control freshness per fetch with
`revalidate` or `cache: 'no-store'`, and you invalidate on demand with `revalidatePath` /
`revalidateTag`. **Say the honest thing if pushed:** *"caching defaults are the part of Next I'd want to
re-verify against the current version rather than quote from memory — they've changed more than once."*
That is a stronger answer than confidently reciting a version-specific default.

### Next vs Astro — you have a real opinion, use it

You ship Astro on four live sites. **The distinction:** Astro ships **zero JS by default** and you
opt *in* to interactivity per component. Next ships a React runtime and you optimise *down*.

> *"For a content site that has to rank and load fast, Astro's default is the right default — I chose it
> for four of my own products. Next is what I'd reach for when the app is genuinely interactive and I
> want server components and routing to be one system."*

That answer shows you chose a tool rather than defaulted to the famous one.

---

## Closed-book quiz

1. "Explain SSG, ISR, SSR and client rendering, and when you'd pick each."
2. "What's a server component and why does it matter?"
3. Ladder: "Where do you put `'use client'`, and what happens if you put it too high?"
4. "How do you control how fresh cached data is?"
5. "You've also used Astro. Why not just use Next everywhere?"
6. **The honest one:** "How much production Next have you shipped?"

## Grading key — *Claude only*

- Q1 → the two questions (crawler? staleness?) beat a memorised table. Full marks needs both.
- Q2-3 → **server components don't ship JS and can't hold state; `'use client'` goes as low as
  possible and is contagious.** Q3 is the differentiator — a candidate who has only read about Next
  misses the contagion.
- Q4 → `revalidate` / `no-store` / `revalidatePath`. **Hedging on version-specific defaults is a credit,
  not a deduction.**
- Q5 → zero-JS-by-default vs optimise-down, with the four live Astro sites as evidence.
- **Q6 fails the drill on any inflation.** The correct answer names `portfolio` and the ThinkSys site
  and says the production React was CRA and webpack. **Getting Q1-5 right and Q6 wrong is worse than
  the reverse** — knowledge without the boundary is exactly the profile that gets caught.

**Coverage gate:** rendering model explained, `'use client'` contagion landed, scope stated honestly.
