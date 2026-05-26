// Build the runtime tree from the OFFICIAL GGG PoE2 export
// (github.com/grindinggear/poe2-skilltree-export): _ggg-tree.json (= data.json,
// nodes carry precomputed x/y + explicit edges) and _ggg-assets/ (TexturePacker
// sprite atlases + coord JSONs). No PoB2, no orbit math, no BC decode.
//
// Outputs:
//   tree-data.js   window.TREE_DATA  — nodes (x/y, baked sprite keys, flags), edges, groups, centre
//   tree-sprites.js window.TREE_SPRITES — the atlas frame maps (per atlas), for the canvas renderer
// The atlas .webp images are already copied to images/tree/ (see cleanup step).
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const d = require(path.join(ROOT, "_ggg-tree.json"));
const A = path.join(ROOT, "_ggg-assets");
const j = (p) => JSON.parse(fs.readFileSync(path.join(A, p)));
const PICKED = "Monk";   // class shown in the centre (static view has no selected class)

const skills = j("skills.json"), frame = j("frame.json"), groupBg = j("group-background.json");
const fxA = j("mastery-effect-active.json");
const sharp = require(path.join(__dirname, "node_modules", "sharp"));
const skillKeys = new Set(Object.keys(skills.frames));

// Per-notable themed background = the node's OWN activeEffectImage. The official
// export only includes this on masteries, but PoB2's data (_pob2-tree.json) carries it
// on the specific notables that have one too (e.g. Echoing Thunder → MasteryLightning).
// We join by skill number — this is the authoritative mapping, not a name guess.
const pobEffect = {};   // skill -> "masteryEffectActive:...Pattern.png"
const fxKeys = new Set(Object.keys(fxA.frames));
try {
  const pob = require(path.join(ROOT, "_pob2-tree.json"));
  for (const n of Object.values(pob.nodes || {})) {
    if (!n || n.skill == null || !n.activeEffectImage || n.isMastery) continue;
    const key = "masteryEffectActive:" + n.activeEffectImage.replace(/\.png$/, "") + ".png";
    if (fxKeys.has(key)) pobEffect[n.skill] = key;        // only if the 0.5 atlas still has that pattern
  }
} catch (_) { /* PoB2 data absent → notables just won't get a themed backdrop */ }

// node.icon (full path) -> skills-atlas key (prefixed by node kind)
const iconKey = (n) => {
  if (!n.icon) return 0;
  const pre = n.isKeystone ? "keystoneActive:" : n.isNotable ? "notableActive:" : "normalActive:";
  if (skillKeys.has(pre + n.icon)) return pre + n.icon;
  if (skillKeys.has("normalActive:" + n.icon)) return "normalActive:" + n.icon;
  return 0;
};
// node -> frame-atlas key (kind + Oracle/ascendancy variants; Unallocated state)
const frameKey = (n) => {
  if (n.isAscendancyStart) return "frame:AscendancyStartNode";
  if (n.ascendancyId) return n.isNotable ? "frame:AscendancyFrameNotableUnallocated" : "frame:AscendancyFrameNormalUnallocated";
  if (n.unlockConstraint && n.unlockConstraint.ascendancy) return n.isNotable ? "frame:OracleFrameNotableUnallocated" : "frame:OracleFrameUnallocated";  // blue, Oracle-gated
  if (n.isKeystone) return "frame:KeystoneFrameUnallocated";
  if (n.isBlighted && n.isNotable) return "frame:BlightedNotableFrameUnallocated";
  if (n.isNotable) return "frame:NotableFrameUnallocated";
  if (n.isJewelSocket) return "frame:JewelFrameUnallocated";
  if (n.isMastery) return 0;                // masteries show only their fx pattern + icon
  return "frame:PSSkillFrame";
};

// --- nodes + groups ---
const groups = {};
for (const [gid, g] of Object.entries(d.groups)) if (g && g.x != null) groups[gid] = { x: +g.x.toFixed(1), y: +g.y.toFixed(1) };

// Mastery groups already get the hub's pattern, so their notables don't add one.
const masteryGroups = new Set();
for (const n of Object.values(d.nodes)) if (n.isMastery) masteryGroups.add(String(n.group));

// One themed backdrop per (group, effect): the real data (pobEffect) decides WHICH
// notables have a pattern; we just dedupe same-effect notables in a group (no stacked
// doubles) while keeping distinct effects (Echoing's lightning/fire/cold). Rep = the
// notable nearest the group centre.
const tfxRep = {};   // node id -> fx key
{
  const byGE = {};
  for (const [id, n] of Object.entries(d.nodes)) {
    if (!n.isNotable || n.ascendancyId || n.x == null || masteryGroups.has(String(n.group))) continue;
    const f = pobEffect[n.skill]; if (!f) continue;
    const g = d.groups[String(n.group)];
    (byGE[n.group + "|" + f] = byGE[n.group + "|" + f] || []).push({ id, fx: f, dist: g ? Math.hypot(n.x - g.x, n.y - g.y) : 0 });
  }
  for (const arr of Object.values(byGE)) { const r = arr.sort((a, b) => a.dist - b.dist)[0]; tfxRep[r.id] = r.fx; }
}

const out = {};
for (const [id, n] of Object.entries(d.nodes)) {
  if (!n || n.x == null || n.classStartIndex != null) continue;   // class-start nodes aren't drawn
  // Skip phantom slots — empty group-centre placeholders (id:null, no name/icon/stats)
  // that would otherwise render as blank floating frames near the centre.
  if (!n.name && !n.icon && (!n.stats || !n.stats.length) && !n.isJewelSocket && !n.isMastery && !n.isAscendancyStart && !n.isKeystone) continue;
  const o = { x: +n.x.toFixed(1), y: +n.y.toFixed(1), g: String(n.group), o: n.orbit };
  // Masteries are NOT drawn as nodes — they only carry the cluster's fx pattern,
  // which lights up when a notable in the same group is hovered.
  if (!n.isMastery) { const ic = iconKey(n); if (ic) o.ic = ic; }
  else o.m = 1;
  const fr = frameKey(n); if (fr) o.fr = fr;
  if (n.isNotable) o.nt = 1;
  if (n.activeEffectImage) o.fx = "masteryEffectActive:" + n.activeEffectImage;
  else if (tfxRep[id]) o.tfx = tfxRep[id];   // one themed backdrop per (isolated group, theme)
  if (n.name) o.n = n.name;
  if (Array.isArray(n.stats) && n.stats.length) o.d = n.stats;
  if (n.flavourText) o.f = Array.isArray(n.flavourText) ? n.flavourText.join("\n") : n.flavourText;
  if (n.ascendancyId) o.a = n.ascendancyId;
  if (n.unlockConstraint && n.unlockConstraint.ascendancy) o.cond = 1;   // Oracle "paths not taken" — blue, shown only when Oracle is selected
  out[id] = o;
}

// --- edges (explicit list; drop class-start 'root' edges + cross-ascendancy) ---
const vis = new Set(Object.keys(out));
const edges = [];
for (const e of d.edges) {
  const f = String(e.from), t = String(e.to);
  if (f === "root" || !vis.has(f) || !vis.has(t)) continue;
  if (out[f].m || out[t].m) continue;                      // masteries aren't drawn — drop their spokes
  if ((out[f].a || null) !== (out[t].a || null)) continue;
  const cond = (out[f].cond || out[t].cond) ? 1 : 0;
  // Arc edges carry their own centre (orbitX/orbitY); plain edges are straight.
  // Format: [from, to, cond, arcX?, arcY?]  (arcX/Y present ⇒ curved).
  if (e.orbitX != null && e.orbit != null) edges.push([f, t, cond, +e.orbitX.toFixed(1), +e.orbitY.toFixed(1)]);
  else if (cond) edges.push([f, t, 1]);
  else edges.push([f, t]);
}

// --- ascendancies (for the selector + centring the wheel) ---
// Each ascendancy is its own node cluster around an isAscendancyStart node.
// We don't draw them in place; the renderer re-centres the picked one at origin.
const startPos = {};   // ascendancyId -> {x,y} of its start node
for (const n of Object.values(d.nodes)) if (n.ascendancyId && n.isAscendancyStart) startPos[n.ascendancyId] = { x: +n.x.toFixed(1), y: +n.y.toFixed(1) };
const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
// The official background-<class> atlas packs 4 circular illustrations: Class0 = base
// class portrait, Class(i+1) = that class's ascendancy i (in c.ascendancies order,
// counting unnamed placeholders). We crop each to images/tree/asc/ at build time.
const ascByClass = [], ascMeta = {}, cropJobs = [];
for (const c of d.classes) {
  if (!c.ascendancies || !c.ascendancies.length) continue;
  const items = [];
  c.ascendancies.forEach((a, i) => {
    if (!a.name || !startPos[a.id]) return;          // skip unnamed placeholders (Ranger2, Druid3)
    const file = "wheel-" + kebab(a.name) + ".webp";
    cropJobs.push({ cls: c.name.toLowerCase(), classKey: "Class" + (i + 1), out: file });
    ascMeta[a.id] = { name: a.name, cls: c.name, sx: startPos[a.id].x, sy: startPos[a.id].y,
      ox: +(a.offsetX || 0).toFixed(1), oy: +(a.offsetY || 0).toFixed(1), img: "images/tree/asc/" + file };
    items.push({ id: a.id, name: a.name });
  });
  if (items.length) ascByClass.push({ cls: c.name, items });
}

// Picked class offset (for rotating the active ring to its start socket when no
// ascendancy is selected — the "None / class portrait" case).
const pickedCls = d.classes.find((c) => c.name.toLowerCase() === PICKED.toLowerCase());
const pickedAsc = pickedCls && (pickedCls.ascendancies || []).find((a) => a.offsetX != null);

const treeData = {
  bounds: [d.min_x, d.min_y, d.max_x, d.max_y],
  nodes: out, edges, groups,
  // centre art: picked class base portrait (Class0, cropped below) + the ornate ring.
  // ox/oy = the picked class's wheel offset, so the active ring points at it by default.
  centre: { img: "images/tree/asc/centre.webp", ring: "startNode:MainCircle", ringActive: "startNode:MainCircleActive",
    ox: pickedAsc ? +pickedAsc.offsetX.toFixed(1) : 0, oy: pickedAsc ? +pickedAsc.offsetY.toFixed(1) : 0 },
  asc: ascByClass, ascMeta,
};
const json = JSON.stringify(treeData);
fs.writeFileSync(path.join(ROOT, "tree-data.js"), "﻿window.TREE_DATA=" + json + ";\n");
fs.writeFileSync(path.join(ROOT, "tree-data.json"), json);

// --- sprite manifest (atlas frame maps; scale 0.5 → renderer draws at frame.w*2) ---
const sprites = {
  skills:  { img: "images/tree/skills.webp", frames: skills.frames },
  frame:   { img: "images/tree/frame.webp", frames: frame.frames },
  groupBg: { img: "images/tree/group-background.webp", frames: groupBg.frames },
  fx:      { img: "images/tree/mastery-effect-active.webp", frames: fxA.frames },
};
fs.writeFileSync(path.join(ROOT, "tree-sprites.js"), "window.TREE_SPRITES=" + JSON.stringify(sprites) + ";\n");

// --- crop official circular illustrations from the background-<class> atlases ---
(async () => {
  const dir = path.join(ROOT, "images/tree/asc");
  fs.mkdirSync(dir, { recursive: true });
  const cache = {};
  const slice = (cls, classKey) => {
    const jj = cache[cls] || (cache[cls] = j("background-" + cls + ".json"));
    const k = Object.keys(jj.frames).find((x) => x.endsWith(":" + classKey));
    return k && jj.frames[k].frame;
  };
  const crop = async (cls, classKey, out) => {
    const f = slice(cls, classKey); if (!f) { console.warn("no slice", cls, classKey); return; }
    await sharp(path.join(A, "background-" + cls + ".webp"))
      .extract({ left: f.x, top: f.y, width: f.w, height: f.h }).webp({ quality: 88 })
      .toFile(path.join(dir, out));
  };
  for (const job of cropJobs) await crop(job.cls, job.classKey, job.out);
  await crop(PICKED.toLowerCase(), "Class0", "centre.webp");   // base class portrait for the centre
  console.log("ascendancy art:", cropJobs.length, "wheels + centre cropped from official background atlases");
})();

const cnt = (f) => Object.values(out).filter(f).length;
console.log("tree-data:", Object.keys(out).length, "nodes (", cnt(o => o.ic), "icons,", cnt(o => o.fx), "fx,",
  cnt(o => o.cond), "conditional),", edges.length, "edges,", Object.keys(groups).length, "groups");
console.log("tree-sprites: skills", Object.keys(skills.frames).length, "frame", Object.keys(frame.frames).length, "fx", Object.keys(fxA.frames).length);
