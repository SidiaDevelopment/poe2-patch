// Extract PoE2 passive-tree art (ascendancy wheels + center ring) from the
// PoB2 0.4 BC7 DDS files, and compute placement in the app's tree-data coords.
"use strict";
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { load } = require("./dds.js");
const bc7 = require("./bc7.js");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "images", "tree-ui", "asc");
fs.mkdirSync(OUT, { recursive: true });

const pob = require(path.join(ROOT, "_pob2-tree.json"));
const td = require(path.join(ROOT, "tree-data.json"));

// --- 1. internalId -> { name, image } from PoB2 (authoritative, matches tree-data icons) ---
const ddsIndex = pob.ddsCoords["ascendancy-background_1500_1500_BC7.dds.zst"]; // name -> 1-based slice
const ascById = {}; // Ranger3 -> { name:"Pathfinder", image:"ClassesPathfinder" }
for (const c of pob.classes)
  for (const a of c.ascendancies || [])
    ascById[a.internalId] = { name: a.name, image: a.background.image };

// --- 2. placement per tree-data ascendancy (trim the far start node, then centroid+radius) ---
const pct = (arr, q) => [...arr].sort((a, b) => a - b)[Math.min(arr.length - 1, Math.floor(arr.length * q))];
function placement(nodes) {
  const pts = nodes.map((n) => ({ x: n.x, y: n.y }));
  let cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
  let cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
  // Drop the single far ascendancy start node before re-centering, so the
  // centroid is the node ring's true center.
  const d0 = pts.map((p) => Math.hypot(p.x - cx, p.y - cy));
  const cut = pct(d0, 0.95) * 1.05;
  const keep = pts.filter((_, i) => d0[i] <= cut);
  cx = keep.reduce((s, p) => s + p.x, 0) / keep.length;
  cy = keep.reduce((s, p) => s + p.y, 0) / keep.length;
  // Radius = 90th-percentile node distance (robust outer-ring estimate).
  const R = pct(pts.map((p) => Math.hypot(p.x - cx, p.y - cy)), 0.90);
  return { cx, cy, R };
}

const tdByAsc = {};
for (const id in td.nodes) {
  const n = td.nodes[id];
  if (n.a) (tdByAsc[n.a] = tdByAsc[n.a] || []).push(n);
}

// --- 3. decode + write wheels, build manifest ---
const SHEET = load(path.join(__dirname, "dds", "ascendancy-background_1500_1500_BC7.dds.zst"));
const WHEEL_PX = 720;        // output resolution (downscaled from 1500)
const FIT = 1.18;            // wheel half-size = R90 * FIT (decorative margin beyond node ring)

(async () => {
  const wheels = [];
  for (const ascId of Object.keys(tdByAsc).sort()) {
    const meta = ascById[ascId];
    if (!meta) continue;                       // unreleased / no art (Marauder, Duelist, ...)
    const idx1 = ddsIndex["Classes" + meta.name.replace(/^Classes/, "")] || ddsIndex[meta.image];
    if (!idx1) { console.log("  ! no sprite for", ascId, meta.name); continue; }
    const rgba = Buffer.from(bc7.decodeImage(SHEET.slice(idx1 - 1), SHEET.width, SHEET.height));
    const file = "wheel-" + meta.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".webp";
    await sharp(rgba, { raw: { width: 1500, height: 1500, channels: 4 } })
      .resize(WHEEL_PX, WHEEL_PX)
      .webp({ quality: 82, alphaQuality: 90 })
      .toFile(path.join(OUT, file));
    const p = placement(tdByAsc[ascId]);
    const size = 2 * p.R * FIT;
    wheels.push({ id: ascId, name: meta.name, file: "asc/" + file,
      x: +p.cx.toFixed(1), y: +p.cy.toFixed(1), size: +size.toFixed(1) });
    const kb = (fs.statSync(path.join(OUT, file)).size / 1024).toFixed(0);
    console.log(`  ${ascId.padEnd(11)} ${meta.name.padEnd(22)} -> ${file} (${kb}KB)  @(${p.cx.toFixed(0)},${p.cy.toFixed(0)}) size ${size.toFixed(0)}`);
  }

  // --- 4. center ring (BGTree, 4000 slice 0) -> centered at origin, 4000 tree-units ---
  const BG = load(path.join(__dirname, "dds", "ascendancy-background_4000_4000_BC7.dds.zst"));
  const bgRgba = Buffer.from(bc7.decodeImage(BG.slice(0), BG.width, BG.height));
  await sharp(bgRgba, { raw: { width: 4000, height: 4000, channels: 4 } })
    .resize(1600, 1600)
    .webp({ quality: 82, alphaQuality: 90 })
    .toFile(path.join(OUT, "center-ring.webp"));
  const center = { file: "asc/center-ring.webp", x: 0, y: 0, size: 4000 };
  console.log("  center-ring.webp", (fs.statSync(path.join(OUT, "center-ring.webp")).size / 1024).toFixed(0) + "KB");

  const manifest = { wheels, center };
  fs.writeFileSync(path.join(ROOT, "tree-art.js"),
    "window.TREE_ART = " + JSON.stringify(manifest) + ";\n");
  console.log("\nwrote tree-art.js with", wheels.length, "wheels + center ring");
})();
