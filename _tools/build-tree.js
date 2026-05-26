// Build the runtime passive tree directly from the PoB2 0.4 export
// (_pob2-tree.json) — the single source of truth. No RePoE, no oracle, no
// hand-tuned relocation: every node's position, the ascendancy wheel layouts,
// the edges and the flags come straight from PoB2.
//
// THE ONE GOTCHA: a node's `group` field is unreliable. The authoritative
// node→group mapping is the inverse of each group's `nodes` array. Using
// `node.group` scatters the tree into fragments and mangles the ascendancy
// wheels; using `group.nodes → node` gives the correct, fully-connected tree
// and the real per-ascendancy layouts (e.g. Chronomancer's hourglass).
"use strict";
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { load } = require("./dds.js");
const bc7 = require("./bc7.js");
const bc1 = require("./bc1.js");

const ROOT = path.resolve(__dirname, "..");
const pob = require(path.join(ROOT, "_pob2-tree.json"));
const UI = path.join(ROOT, "images", "tree-ui");
const NODES = pob.nodes, G = pob.groups, OR = pob.constants.orbitRadii, OA = pob.constants.orbitAnglesByOrbit;
const RELEASED = new Set(["Warrior", "Ranger", "Witch", "Monk", "Mercenary", "Huntress", "Sorceress", "Druid"]);

// Authoritative node → group (the group whose `nodes` array lists the node).
const node2group = {};
for (const [gid, g] of Object.entries(G)) if (g && g.nodes) for (const nid of g.nodes) node2group[String(nid)] = gid;

function nodePos(id, n) {
  const gid = node2group[id]; const g = G[gid]; if (!g) return null;
  const r = OR[n.orbit] || 0;
  const a = (OA[n.orbit] && OA[n.orbit][n.orbitIndex]) || 0;
  return { x: g.x + Math.sin(a) * r, y: g.y - Math.cos(a) * r, gid };
}
// Skill-icon atlases (BC1). node.icon is a full path → atlas slice. Flatten the
// path to a safe filename used both for the decoded webp and node.i.
const iconFlat = (s) => s ? s.replace(/^Art\/2DArt\/SkillIcons\//i, "").replace(/\.dds$/i, "").replace(/[\/ ]+/g, "-") : "";
const skillAtlas = {};
const iconLoc = {};  // icon path -> { atlas, slice }
for (const k of Object.keys(pob.ddsCoords)) {
  if (!/^skills_\d/.test(k)) continue;
  try { skillAtlas[k] = load(path.join(__dirname, "dds", k)); } catch (e) { continue; }
  for (const [name, idx] of Object.entries(pob.ddsCoords[k])) if (!iconLoc[name]) iconLoc[name] = { atlas: k, slice: idx - 1 };
}
const kindOf = (n) => n.isOnlyImage ? 4 : n.isJewelSocket ? 3 : n.isKeystone ? 2 : n.isNotable ? 1 : 0;

// --- 1. nodes ------------------------------------------------------------
const outNodes = {};
const groupsUsed = new Set();
for (const [id, n] of Object.entries(NODES)) {
  if (!n) continue;
  const p = nodePos(id, n); if (!p) continue;
  const o = { x: +p.x.toFixed(1), y: +p.y.toFixed(1), k: kindOf(n), i: iconFlat(n.icon), n: n.name || "", g: p.gid, o: n.orbit };
  const stats = Array.isArray(n.stats) ? n.stats.filter(Boolean) : [];
  if (stats.length) o.d = stats;
  if (n.flavourText) o.f = Array.isArray(n.flavourText) ? n.flavourText.join("\n") : n.flavourText;
  if (n.ascendancyName) o.a = n.ascendancyName;
  // Conditional nodes: only available under a specific ascendancy (all 197 are
  // gated on the Oracle Druid notable "The Unseen Path"). Rendered blue.
  if (n.unlockConstraint) o.cond = 1;
  // Type-themed "active effect" pattern drawn faintly behind the node (full on
  // hover/alloc in-game) — e.g. MasteryLightningPattern behind shock clusters.
  if (n.activeEffectImage) o.fx = n.activeEffectImage.split("/").pop();
  if (n.isAscendancyStart) { o.as = 1; o.n = n.ascendancyName; }
  if (n.classesStart) {
    o.root = 1;
    const rel = n.classesStart.filter((c) => RELEASED.has(c));
    if (rel.length) o.n = rel.join(" / ");
  }
  outNodes[id] = o;
  groupsUsed.add(p.gid);
}

// --- 2. edges (spline = connection.orbit) --------------------------------
const edges = [];
const seen = new Set();
for (const [id, n] of Object.entries(NODES)) {
  if (!n || !outNodes[id]) continue;
  for (const c of n.connections || []) {
    const t = String(c.id);
    if (!outNodes[t]) continue;
    const key = +id < +t ? id + "_" + t : t + "_" + id;
    if (seen.has(key)) continue; seen.add(key);
    const sp = c.orbit == null ? 0 : c.orbit;
    // A connection is conditional (blue) if either endpoint is a conditional node.
    const cond = outNodes[id].cond || outNodes[t].cond;
    edges.push(cond ? [+id, +t, sp, 1] : [+id, +t, sp]);
  }
}

// --- 3. groups (cluster halos): centre + outer-orbit radius + count ------
const groups = {};
for (const gid of groupsUsed) {
  const g = G[gid]; if (!g) continue;
  const ns = (g.nodes || []).filter((nid) => outNodes[String(nid)]);
  const r = Math.max(0, ...ns.map((nid) => OR[NODES[String(nid)].orbit] || 0));
  groups[gid] = { x: +g.x.toFixed(1), y: +g.y.toFixed(1), r, n: ns.length };
}

// --- 4. art --------------------------------------------------------------
const SHEET = load(path.join(__dirname, "dds", "ascendancy-background_1500_1500_BC7.dds.zst"));
const ddsIndex = pob.ddsCoords["ascendancy-background_1500_1500_BC7.dds.zst"];
async function decodeSprite(sprite, outFile, px) {
  const i1 = ddsIndex[sprite]; if (!i1) return false;
  const rgba = Buffer.from(bc7.decodeImage(SHEET.slice(i1 - 1), SHEET.width, SHEET.height));
  await sharp(rgba, { raw: { width: 1500, height: 1500, channels: 4 } })
    .resize(px, px).webp({ quality: 82, alphaQuality: 90 }).toFile(outFile);
  return true;
}

(async () => {
  // 4a. ascendancy wheels — art "Classes<Name>" at the background position,
  // size = background.width * 2 (the in-game wheel size the nodes are laid in).
  fs.mkdirSync(path.join(UI, "asc"), { recursive: true });
  const ascWithNodes = new Set(Object.values(outNodes).filter((o) => o.a).map((o) => o.a));
  const wheels = [];
  for (const c of pob.classes) {
    if (!RELEASED.has(c.name)) continue;
    for (const a of c.ascendancies || []) {
      const bg = a.background; if (!bg || !ascWithNodes.has(a.name)) continue;   // skip node-less variants (Abyssal Lich)
      const file = "wheel-" + a.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".webp";
      if (!(await decodeSprite("Classes" + a.name, path.join(UI, "asc", file), 1024))) continue;
      wheels.push({ id: a.name, name: a.name, file: "asc/" + file, x: +bg.x.toFixed(1), y: +bg.y.toFixed(1), size: bg.width * 2 });
    }
  }

  // 4c. centre — like PoB2's per-class centre, for the picked class (a static
  // all-tree view has no selected class, so we pick one): the class portrait at
  // origin, the active wedge (BGTreeActive) rotated toward that class's start,
  // and the ornate ring (BGTree) on top.
  const PICKED = "Monk";
  const classFile = "class-" + PICKED.toLowerCase() + ".webp";
  await decodeSprite("Classes" + PICKED, path.join(UI, "asc", classFile), 1024);
  const classMid = { file: "asc/" + classFile, x: 0, y: 0, size: 3000 };

  const BG = load(path.join(__dirname, "dds", "ascendancy-background_4000_4000_BC7.dds.zst"));
  for (const [slice, name] of [[0, "center-ring"], [1, "bgtree-active"]]) {
    const rgba = Buffer.from(bc7.decodeImage(BG.slice(slice), BG.width, BG.height));
    await sharp(rgba, { raw: { width: 4000, height: 4000, channels: 4 } })
      .resize(1600, 1600).webp({ quality: 82, alphaQuality: 90 }).toFile(path.join(UI, "asc", name + ".webp"));
  }
  const center = { file: "asc/center-ring.webp", x: 0, y: 0, size: 4000 };

  // active wedge rotated toward the picked class's start (PoB2: π/2 + atan2(y,x))
  let pickedStart = null;
  for (const [id, o] of Object.entries(outNodes))
    if (o.root && NODES[id].classesStart && NODES[id].classesStart.includes(PICKED)) pickedStart = o;
  const wedgeAngle = pickedStart ? 90 + Math.atan2(pickedStart.y, pickedStart.x) * 180 / Math.PI : 0;
  const centerActive = { file: "asc/bgtree-active.webp", x: 0, y: 0, size: 4000, angle: +wedgeAngle.toFixed(1) };

  // 4d. mastery "active effect" patterns (60 type-themed motifs) — decoded once,
  // drawn faintly behind their nodes by the renderer (see node.fx).
  const FX = load(path.join(__dirname, "dds", "mastery-active-effect_776_768_BC7.dds.zst"));
  const fxIndex = pob.ddsCoords["mastery-active-effect_776_768_BC7.dds.zst"];
  fs.mkdirSync(path.join(UI, "fx"), { recursive: true });
  let fxCount = 0;
  for (const [sprite, idx1] of Object.entries(fxIndex)) {
    const rgba = Buffer.from(bc7.decodeImage(FX.slice(idx1 - 1), FX.width, FX.height));
    await sharp(rgba, { raw: { width: FX.width, height: FX.height, channels: 4 } })
      .resize(512, 512).webp({ quality: 86, alphaQuality: 90 }).toFile(path.join(UI, "fx", sprite.split("/").pop() + ".webp"));
    fxCount++;
  }
  console.log("fx patterns:", fxCount);

  // 4e. skill icons — decode each icon used by a kept node from its BC1 atlas.
  const ICONDIR = path.join(UI, "icon");
  fs.mkdirSync(ICONDIR, { recursive: true });
  const iconPaths = new Set();
  for (const [id, n] of Object.entries(NODES)) if (n && n.icon && outNodes[id]) iconPaths.add(n.icon);
  let iconDec = 0, iconMiss = 0;
  for (const ipath of iconPaths) {
    const loc = iconLoc[ipath]; if (!loc) { iconMiss++; continue; }
    const a = skillAtlas[loc.atlas];
    const rgba = Buffer.from(bc1.decodeImage(a.slice(loc.slice), a.width, a.height));
    await sharp(rgba, { raw: { width: a.width, height: a.height, channels: 4 } })
      .webp({ quality: 88, alphaQuality: 92 }).toFile(path.join(ICONDIR, iconFlat(ipath) + ".webp"));
    iconDec++;
  }
  console.log("icons:", iconDec, "decoded,", iconMiss, "missing (mastery/group on hidden nodes)");

  fs.writeFileSync(path.join(ROOT, "tree-art.js"), "window.TREE_ART = " + JSON.stringify({ center, classMid, centerActive, wheels }) + ";\n");

  // --- 5. bounds + write tree-data ---------------------------------------
  let mnx = Infinity, mny = Infinity, mxx = -Infinity, mxy = -Infinity;
  for (const o of Object.values(outNodes)) { mnx = Math.min(mnx, o.x); mny = Math.min(mny, o.y); mxx = Math.max(mxx, o.x); mxy = Math.max(mxy, o.y); }
  for (const w of wheels) { mnx = Math.min(mnx, w.x - w.size / 2); mny = Math.min(mny, w.y - w.size / 2); mxx = Math.max(mxx, w.x + w.size / 2); mxy = Math.max(mxy, w.y + w.size / 2); }
  const td = { bounds: [Math.round(mnx), Math.round(mny), Math.round(mxx), Math.round(mxy)], orbits: OR, nodes: outNodes, edges, groups };
  const json = JSON.stringify(td);
  fs.writeFileSync(path.join(ROOT, "tree-data.json"), json);
  fs.writeFileSync(path.join(ROOT, "tree-data.js"), "﻿window.TREE_DATA = " + json + ";\n");
  console.log("tree-data:", Object.keys(outNodes).length, "nodes,", edges.length, "edges,", Object.keys(groups).length, "groups; bounds", td.bounds.join(","));
  console.log("tree-art:", PICKED, "centre +", wheels.length, "wheels");
})();
