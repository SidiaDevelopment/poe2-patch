# Path of Exile 2 — Patch 0.5.0 Codex

A static, hostable web page visualising the **Return of the Ancients** content update for Path of Exile 2 (patch 0.5.0, 22 May 2026; league launch 29 May 2026 · 1:00 PM PDT).

Auto-generated from the [official patch thread](https://www.pathofexile.com/forum/view-thread/3932540). Treat it as a quick overview, not a source of truth.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page shell, nav, hero, sections. |
| `styles.css` | Arcane-codex theme (obsidian + gilt + crimson + emerald). |
| `data.js` | Structured patch data — skills, supports, passives, uniques, leagues, endgame, etc. |
| `app.js` | Renderer + interactivity (search, sort, modal, countdown). |
| `patchnotes-0.5.0-raw.md` | Verbatim raw patch notes captured at generation time. Future patches can be diffed against this baseline. |

## Running locally

Just open `index.html` in a browser — everything is static. Or serve the folder:

```sh
python -m http.server 8000
# or
npx serve .
```

## Deploying to GitHub Pages

A workflow is included at `.github/workflows/pages.yml` that deploys the repo root to Pages on every push to `main`.

One-time setup (after pushing the repo):

1. Create the GitHub repo (e.g. via `gh repo create poe2-patch-0.5.0 --public --source . --push`).
2. On github.com, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main`. The workflow will deploy and surface the URL in the Actions tab.

The `.nojekyll` file disables Jekyll processing so files starting with `_` (none here, but safe) and folders like `node_modules` aren't filtered.

## Caveats

- The forum thread was fetched via an automated summariser; some bullets may have been compressed.
- The 42 new uniques are listed by name only — no mod text was published in the summary.
- Items classified as "PoE1 ancestor found" had an exact-name page on poewiki.net at capture time; the remaining 30 may still be PoE1 transfers under a different slug.
- The launch countdown uses 2026-05-29 20:00 UTC (1 PM PDT).
- See the "Sources & Caveats" section at the bottom of the page for the full disclosure.
