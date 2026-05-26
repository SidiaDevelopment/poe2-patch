# Passive-tree build pipeline

`build-tree.js` generates the runtime tree files the site loads:
`tree-data.js` (+ `.json`), `tree-sprites.js`, and the cropped ascendancy
illustrations in `images/tree/asc/`.

## Source of truth

The **official GGG PoE2 export** ([grindinggear/poe2-skilltree-export](https://github.com/grindinggear/poe2-skilltree-export)):

- `_ggg-tree.json` = their `data.json` — nodes with **precomputed `x`/`y`**,
  explicit **edges** (each carrying its arc centre `orbitX`/`orbitY` where the
  connection is curved), flags, stats, ascendancies. No orbit math, no PoB2
  geometry hacks.
- `_ggg-assets/` = the TexturePacker sprite atlases (`<name>.webp` + coord
  `<name>.json`, `meta.scale = 0.5`): `skills`, `frame`, `group-background`,
  `mastery-effect-active`, `line`, `background-<class>` (Class0 = base portrait,
  Class1+ = that class's ascendancy illustrations).

These are gitignored build inputs (not loaded at runtime — the generated files
above are checked in and served).

One supplementary input: `_pob2-tree.json` (PoB2 0.4) is used **only** to read each
notable's real `activeEffectImage` (the themed background), which the official
export omits for non-masteries. Joined by skill number; absent → no backdrop.

## What `build-tree.js` does

1. **Nodes** (`tree-data.js`): copies precomputed `x`/`y`, routes each node's
   sprite keys (icon from `skills`, frame from `frame` — incl. Oracle/ascendancy
   variants), flags (`nt` notable, `m` mastery, `cond` Oracle, `a` ascendancyId).
   Drops class-start and empty phantom placeholder nodes. Themed backdrops
   (`fx` for masteries, `tfx` for notables) come from real `activeEffectImage`.
2. **Edges**: the explicit edge list; arc edges keep their centre `[from,to,cond,arcX,arcY]`.
3. **Ascendancies**: `asc` (selector, grouped by class) + `ascMeta` (name, class,
   start pos, wheel offset, illustration). Illustrations are cropped from the
   `background-<class>` atlases (`Class(i+1)` = ascendancy `i`) into
   `images/tree/asc/wheel-<name>.webp`; the picked class's `Class0` → `centre.webp`.
4. **Sprites** (`tree-sprites.js`): the atlas frame maps for the canvas renderer.

The renderer is the `initPassiveTree` IIFE in `../app.js` (single `<canvas>`,
viewport culling + zoom LOD).

## Tools

- `shot.js` — headless-Chrome screenshots of the tree for visual QA.

## Reproduce

```bash
npm install                       # sharp puppeteer
# needs _ggg-tree.json + _ggg-assets/ in the repo root (and _pob2-tree.json
# for the notable background images), then:
node build-tree.js
node shot.js                      # optional: regenerate QA screenshots
```
