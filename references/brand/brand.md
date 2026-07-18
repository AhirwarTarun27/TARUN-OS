# Tarun Web Solutions — Brand

> **The house identity.** This is the one place the logo, colours and wordmark are defined.
> Every application, client deliverable and page uses the mark from here — never a re-drawn copy.
> Business: the paid local web-solutions side (`[[web-solutions-agency]]`). Kesri Enterprise is client #1.

## The mark

A rounded-tile monogram: a deep teal gradient with a soft top sheen, a crisp white **T**, and a single
gold "foundation" line beneath the stem — one deliberate accent, standing for *solutions built on
something solid*. It is icon-first: it reads at favicon size and scales to a hero.

## Files (canonical — copy these, don't recreate)

| File | Use |
|---|---|
| `tarun-web-solutions-mark.svg` | The mark alone. Favicon, app icon, avatar, header mark, anywhere square. |
| `tarun-web-solutions-lockup.svg` | Mark + wordmark. Letterhead, proposals, footers, docs on a light background. |

For an app favicon, export `mark.svg` to 512/192/32 px PNG (or reference the SVG directly where supported).

## Palette

| Token | Hex | Role |
|---|---|---|
| Teal (top) | `#15988f` | Gradient start — the brand teal |
| Teal (deep) | `#0a4a46` | Gradient end, deep marine |
| Accent teal | `#0e857f` | Links, small accents, the "WEB SOLUTIONS" tag |
| Gold | `#d8a24e` | The single premium accent. Use sparingly — one moment per surface. |
| Ink | `#0d2226` | Wordmark + body text on light |
| Ground | `#eef3f2` | Cool off-white page ground |

Dark surfaces: brighten teal to `#3bb6ac` and gold to `#d8a24e` (already legible), ink → `#eaf3f1`.

## Wordmark

- **TARUN** — uppercase, weight 700, letter-spacing ~`.08em`.
- **WEB SOLUTIONS** — uppercase, small, letter-spacing ~`.28em`, in accent teal.
- Definitive face: a clean grotesque/system sans (`Segoe UI` / `system-ui`). No webfont dependency —
  so the wordmark never falls back silently. Keep the two lines left-aligned, stacked tight.

## Clearspace & don'ts

- Keep clearspace around the mark equal to the gold line's height on every side.
- Don't recolour the tile, stretch it, add a drop shadow beyond a soft elevation, or move the gold line.
- Don't place the colour mark on a busy photo — use it on a solid or gentle gradient ground.
- On a single-colour context (stamp, engraving), use the white **T** knocked out of a solid tile.

## HTML lockup snippet (for pages — matches the SVG, theme-aware)

```html
<span class="tws-logo">
  <svg width="40" height="40" viewBox="0 0 48 48" role="img" aria-label="Tarun Web Solutions">
    <defs>
      <linearGradient id="tws" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#15988f"/><stop offset="1" stop-color="#0a4a46"/>
      </linearGradient>
      <radialGradient id="twss" cx="30%" cy="16%" r="72%">
        <stop offset="0" stop-color="#fff" stop-opacity=".24"/><stop offset="62%" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#tws)"/>
    <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#twss)"/>
    <rect x="2.6" y="2.6" width="42.8" height="42.8" rx="12.4" fill="none" stroke="#fff" stroke-opacity=".14"/>
    <rect x="13" y="13.6" width="22" height="4.8" rx="2.4" fill="#fff"/>
    <rect x="21.6" y="13.6" width="4.8" height="17" rx="2.4" fill="#fff"/>
    <rect x="17.5" y="31.4" width="13" height="2.8" rx="1.4" fill="#d8a24e"/>
  </svg>
  <span class="tws-word"><b>TARUN</b><small>WEB SOLUTIONS</small></span>
</span>
```
```css
.tws-logo { display:inline-flex; align-items:center; gap:.7rem; }
.tws-word { display:flex; flex-direction:column; line-height:1; }
.tws-word b { font-weight:700; letter-spacing:.08em; color:#0d2226; }
.tws-word small { font-size:.6em; letter-spacing:.28em; color:#0e857f; margin-top:.34em; }
```

First use: the Kesri Enterprise growth proposal (`clients/kesri-enterprise/growth-proposal.html`).
