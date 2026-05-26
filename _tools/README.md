# Passive-tree build pipeline

`build-tree.js` builds the runtime tree (`tree-data.js`) and art manifest
(`tree-art.js`) the site loads.

## Source of truth

The **PoB2 0.4 export (`_pob2-tree.json`) is the only source** — node set, flags,
stats, names, connections, ascendancies (only the 8 released classes, so no PoE1
leftovers). Everything is computed from it; no RePoE, no oracle.

> ⚠️ **The one gotcha:** a node's `group` field is unreliable. The authoritative
> node→group mapping is the **inverse of each group's `nodes` array** (the group
> whose `nodes` lists the node). Using `node.group` scatters the tree into ~1000
> fragments and mangles the ascendancy wheels; using `group.nodes → node` gives a
> single connected tree and the correct bespoke ascendancy layouts.

Position = `group.{x,y} + orbitRadii[node.orbit]·(sin θ, −cos θ)`, where
θ = `orbitAnglesByOrbit[node.orbit][node.orbitIndex]`.

## What `build-tree.js` does

1. Positions every node via the `group.nodes → node` mapping + orbit. Kinds from
   flags, stats/names/connections from PoB2. Edges from `connections`
   (`[a,b,orbit]`). Groups (for cluster halos) from the same group set.
2. Class starts: the six shared archetype starts, named after their primary
   released PoE2 class (Warrior/Ranger/Witch/Druid/Mercenary/Monk).
3. Ascendancy wheels: art `Classes<Name>` placed at `ascendancy.background.{x,y}`,
   size `width·2` (3000). The nodes already sit at their wheel in global coords
   with the real per-ascendancy layout — no relocation. Node-less variants
   (Abyssal Lich) are skipped.
4. Decodes class illustrations + wheels + centre ring (`BGTree`) from the PoB2
   BC7 DDS.
5. Writes `tree-data.js` (+ `.json`), `tree-art.js`, and
   `images/tree-ui/{asc,class}/*.webp`.

## Pipeline modules

- `bc7.js` — BC7 (BPTC unorm) decoder ported from
  [`bcdec.h`](https://github.com/iOrange/bcdec) (public domain); partition
  tables in `bc7_partitions.json`.
- `dds.js` — zstd-decompress (`fzstd`) + DX10 DDS array/mip header parsing.
- `shot.js` — headless-Chrome screenshots for visual QA.

## Reproduce

```bash
npm install                       # fzstd parse-dds sharp puppeteer
# needs _pob2-tree.json in the repo root and the two .dds.zst in dds/, then:
node build-tree.js
node shot.js                      # optional: regenerate QA screenshots
```
