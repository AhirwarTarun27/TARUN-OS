# astro-docs — local reference

Local cache of the **Astro Docs MCP** (`astro-docs`). Read this instead of calling the live MCP — same knowledge, far fewer tokens. Tuned to the house stack: **Astro SSG + Preact islands + Tailwind v4 + static on Cloudflare Pages + localStorage** (the Gradejar pattern).

- **Source MCP:** `https://mcp.docs.astro.build/mcp` (HTTP streamable transport). kapa.ai-backed search over the official Astro docs at <https://docs.astro.build>. Free, remote, nothing to install. Repo: `withastro/docs-mcp`.
- **What the live MCP does:** one search/query tool that returns answers + doc snippets from the latest Astro docs. This file caches the slices that matter for the house stack.
- **Astro version captured:** v5 (Content Layer API era). Researched 2026-06-29.
- **Refresh:** say "update the astro-docs reference" → re-research and overwrite this file. Not auto-updated.

---

## Project structure

```
src/
  pages/        # file-based routes — each .astro/.md = a URL
  components/   # .astro + framework (.tsx) components
  layouts/      # shared page shells
  styles/       # global.css (Tailwind entry)
  content.config.ts   # content collections config (v5: src/content.config.ts)
public/         # static assets served as-is (favicon, robots.txt, ads.txt)
astro.config.mjs
```

`npm run dev` → dev server. `npm run build` → static output to `dist/`. `npm run preview` → serve the build.

---

## astro.config.mjs (static SSG → Cloudflare Pages)

`output: 'static'` is the default. **A static site does NOT need the `@astrojs/cloudflare` adapter** — the adapter is only for SSR / on-demand rendering. Keep it out for Gradejar.

```js
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://gradejar.com',   // REQUIRED for sitemap + canonical URLs
  output: 'static',               // default; prerender everything
  trailingSlash: 'ignore',        // 'always' | 'never' | 'ignore'
  integrations: [preact(), sitemap()],
  vite: { plugins: [tailwindcss()] },   // Tailwind v4 is a Vite plugin
  build: {
    format: 'directory',          // /about/index.html (pretty URLs)
    inlineStylesheets: 'auto',    // inline small CSS to cut requests
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  redirects: { '/old': '/new' },
});
```

Key options: `site` (required for SEO/sitemap), `base` (path prefix), `image` (sharp service), `redirects`.

---

## .astro component anatomy

```astro
---
// component script (runs at BUILD time for static) — TS/JS
import Layout from '../layouts/Layout.astro';
import Calculator from '../components/Calculator.tsx';
const { title } = Astro.props;     // props from parent / getStaticPaths
---
<Layout title={title}>
  <h1>{title}</h1>
  <Calculator client:load />       <!-- island, see directives -->
  <slot />                          <!-- children -->
</Layout>

<style>/* scoped by default */</style>
```

`Astro.props`, `Astro.params`, `Astro.url`, `Astro.site`, `Astro.request` are the globals. Frontmatter runs at build time in static mode — no JS shipped unless an island opts in.

---

## Islands — client:* hydration directives

By default Astro ships **zero JS**. A framework component is static HTML until you add a `client:*` directive. Use the lightest one that works (CWV budget).

| Directive | Hydrates when | Use for |
|---|---|---|
| `client:load` | immediately on page load | above-the-fold interactive UI (the grade calculator) |
| `client:idle` | after load, on `requestIdleCallback` | lower-priority widgets. Opt: `client:idle={{timeout: 500}}` |
| `client:visible` | when it scrolls into viewport | below-the-fold / heavy. Opt: `client:visible={{rootMargin: "200px"}}` |
| `client:media` | when CSS media query matches | mobile-only / desktop-only UI: `client:media="(max-width: 50em)"` |
| `client:only` | skips SSR, renders only on client | components that can't SSR. **Requires framework:** `client:only="preact"` |

```astro
<Calculator client:load />
<Settings client:visible />
<MobileMenu client:media="(max-width: 50em)" />
<LocalStorageThing client:only="preact">
  <div slot="fallback">Loading…</div>
</LocalStorageThing>
```

**localStorage note:** anything touching `localStorage`/`window` must run in an island (client-side), not in frontmatter. `client:only="preact"` is the safe choice when there's no meaningful server render (avoids hydration mismatch). The persistence wedge lives inside islands.

---

## Preact integration (the island framework)

```bash
npx astro add preact
```

```js
// astro.config.mjs
import preact from '@astrojs/preact';
export default defineConfig({ integrations: [preact()] });
```

```jsonc
// tsconfig.json
{ "compilerOptions": { "jsx": "react-jsx", "jsxImportSource": "preact" } }
```

Options: `preact({ compat: true })` (run React libs on Preact), `devtools: true`. Use `.tsx` components, hydrate with `client:*`.

---

## Tailwind CSS v4 (Vite plugin — current method)

v4 is **not** the old `@astrojs/tailwind` integration. It's the `@tailwindcss/vite` plugin + a CSS `@import`.

```bash
npx astro add tailwind        # Astro >=5.2 wires the Vite plugin automatically
```

```css
/* src/styles/global.css */
@import "tailwindcss";
```

```astro
---
// import once in your root layout so it applies everywhere
import "../styles/global.css";
---
```

Config-as-CSS in v4 (`@theme { --color-… }`) rather than `tailwind.config.js`.

---

## Routing & generating many landing pages

File-based: every file in `src/pages/` is a route. `index.astro` → `/`, `about.astro` → `/about`.

**Static dynamic routes** need `getStaticPaths()` (runs at build, returns every path to prerender). This is how the keyword landing pages get generated from one template.

```astro
---
// src/pages/[slug].astro  → one page per data row
export async function getStaticPaths() {
  const tools = [
    { slug: 'ez-grader', name: 'EZ Grader', ... },
    { slug: 'test-score-calculator', name: 'Test Score Calculator', ... },
  ];
  return tools.map((t) => ({
    params: { slug: t.slug },   // strings only (they go in the URL)
    props: { tool: t },         // any data, not encoded in URL
  }));
}
const { tool } = Astro.props;
const { slug } = Astro.params;
---
<h1>{tool.name}</h1>
```

- **Rest/spread route:** `src/pages/docs/[...slug].astro` matches `/docs`, `/docs/a`, `/docs/a/b`.
- **Pagination:** `getStaticPaths({ paginate })` → `paginate(items, { pageSize: 10 })`. Page object: `page.data`, `page.currentPage`, `page.total`, `page.url.next/prev/first/last`.

---

## Content collections (Content Layer API, v5)

Type-safe content from local files (Markdown/MDX/JSON/YAML/TOML) or remote sources. Config lives at `src/content.config.ts`.

```ts
// src/content.config.ts
import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    author: reference('authors'),
    draft: z.boolean().optional(),
  }),
});

const authors = defineCollection({
  loader: file('src/data/authors.json'),
  schema: z.object({ name: z.string() }),
});

export const collections = { blog, authors };
```

Query / render:

```astro
---
import { getCollection, getEntry, render } from 'astro:content';

const posts = await getCollection('blog', ({ data }) => !data.draft);
const post = await getEntry('blog', 'my-post');
const { Content, headings } = await render(post);
---
<Content />
```

- **Loaders** (`astro/loaders`): `glob({ pattern, base })` for many files, `file(path)` for one data file.
- **Functions** (`astro:content`): `defineCollection`, `getCollection(name, filterFn?)`, `getEntry(name, id)`, `getEntries(refs)`, `reference(name)`, `render(entry)`.
- **Type:** `CollectionEntry<'blog'>` → `.id`, `.collection`, `.data`, `.body`, `.rendered`, `.filePath`.
- After editing the schema, restart dev or sync (`s` + enter) so `astro:content` types regenerate.

---

## SEO

**Sitemap** — `@astrojs/sitemap`, needs `site` set:

```bash
npx astro add sitemap
```

```js
integrations: [sitemap({ changefreq: 'weekly', priority: 0.7 })]
```

Generates `sitemap-index.xml` + `sitemap-0.xml` at build. Link it:

```astro
<link rel="sitemap" href="/sitemap-index.xml" />
```

```
# public/robots.txt
User-agent: *
Allow: /
Sitemap: https://gradejar.com/sitemap-index.xml
```

Options: `filter(page)`, `customPages[]`, `changefreq`, `lastmod`, `priority`, `serialize(item)`.

**Canonical + head:** set per page in the layout:

```astro
---
const canonical = new URL(Astro.url.pathname, Astro.site);
---
<link rel="canonical" href={canonical} />
```

**JSON-LD structured data** — inject with `set:html` (trusted, stringified):

```astro
<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

---

## Template directives (non-hydration)

- `set:html={str}` — inject raw HTML (no escape; trust the value). Used for JSON-LD above.
- `set:text={str}` — inject escaped text.
- `class:list={[...]}` — build class strings from arrays/objects: `class:list={['btn', { active: isOn }]}`.
- `define:vars={{ x }}` — pass build-time vars into `<script>`/`<style>`. Note: makes the script `is:inline`.
- `is:inline` — leave a `<script>`/`<style>` un-bundled (no npm imports resolved).
- `is:global` — opt a `<style>` out of scoping.
- `server:defer` — server island (SSR-only; N/A for pure static).

**AdSense caveat (house decision):** load AdSense natively with reserved slots; do **not** offload it via Partytown — it breaks ad scripts and lowers Lighthouse. (See `decisions/log.md` Gradejar entry.)

---

## Cloudflare Pages — static deploy

- **No adapter** for `output: 'static'`.
- Build command: `npm run build` → output dir `dist/`.
- Git-based: connect repo in Cloudflare dashboard, set build command `npm run build` and output directory `dist`. Pushes auto-deploy; PRs get preview URLs (`*.pages.dev`).
- Buy domain + wire DNS as the final go-live step — ship on the `*.pages.dev` preview first.

---

## Common commands

```bash
npm create astro@latest        # scaffold
npx astro add preact tailwind sitemap   # add integrations
npm run dev                    # localhost:4321
npm run build                  # → dist/
npm run preview                # serve the build
npx astro check                # type-check .astro
npx astro sync                 # regenerate content/types
```

---

## Stack gotchas (Gradejar)

1. **Static needs no Cloudflare adapter.** Only add `@astrojs/cloudflare` if you switch to SSR.
2. **localStorage only in islands.** Frontmatter runs at build — no `window`/`localStorage` there. Wedge logic lives in `client:*` Preact components; `client:only="preact"` avoids hydration mismatches.
3. **Tailwind v4 = Vite plugin**, not `@astrojs/tailwind`. `@import "tailwindcss"` in one global CSS, imported in the root layout.
4. **`site` must be set** or sitemap + canonical URLs break.
5. **Keep islands minimal** for CWV — prefer `client:visible`/`client:idle` over `client:load` unless it's above-the-fold interactive.
6. **AdSense native, not Partytown.**
