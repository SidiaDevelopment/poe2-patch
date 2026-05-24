# Passive-tree art extraction

Decodes the official PoE2 passive-tree artwork (ascendancy "wheels" + the big
centre ring) straight from GGG's own game textures and emits the runtime files
the site loads.

## Source

Path of Building 2 ships the textures as Zstandard-compressed, BC7-encoded DDS
in [`PathOfBuildingCommunity/PathOfBuilding-PoE2`](https://github.com/PathOfBuildingCommunity/PathOfBuilding-PoE2)
under `src/TreeData/0_4/`:

- `ascendancy-background_1500_1500_BC7.dds.zst` — 33-slice texture array, one
  1500×1500 wheel per class/ascendancy.
- `ascendancy-background_4000_4000_BC7.dds.zst` — slice 0 is `BGTree`, the
  ornate ring at the tree centre.

`_pob2-tree.json` (the repo's `tree.json`) maps each ascendancy `internalId`
(e.g. `Ranger3`) → name (`Pathfinder`) → sprite slice. These match the node
icons in our `tree-data.json`, so the mapping is unambiguous for the 20
released ascendancies; unreleased slots (Marauder/Duelist/Templar/Shadow, etc.)
have no art and are skipped.

## Pipeline

- `bc7.js` — BC7 (BPTC unorm) decoder ported from
  [`bcdec.h`](https://github.com/iOrange/bcdec) (public domain). Partition
  tables in `bc7_partitions.json` are extracted verbatim from `bcdec.h`.
- `dds.js` — zstd-decompress (`fzstd`) + DX10 DDS array/mip header parsing.
- `extract.js` — decodes the mapped slices, encodes `.webp` with `sharp`, and
  computes each wheel's placement (centre + span) from our own `tree-data.json`
  node clusters (the app's coordinate space differs from PoB2 0.4, so geometry
  is derived locally, not copied). Writes:
  - `images/tree-ui/asc/*.webp` — 20 wheels + `center-ring.webp`
  - `tree-art.js` — `window.TREE_ART = { wheels:[…], center:{…} }`
- `shot.js` — headless-Chrome screenshots for visual QA.

## Reproduce

```bash
npm install                       # fzstd pngjs parse-dds sharp puppeteer
# fetch the two .dds.zst into dds/ and _pob2-tree.json into the repo root, then:
node extract.js
node shot.js                      # optional: regenerate QA screenshots
```
