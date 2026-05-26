// Serve the project root and screenshot the passive tree (canvas) for visual QA.
const http = require("http");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const ROOT = path.resolve(__dirname, "..");
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".webp": "image/webp", ".png": "image/png",
  ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".woff2": "font/woff2" };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const fp = path.join(ROOT, p);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end("404"); return; }
    res.writeHead(200, { "Content-Type": MIME[path.extname(fp)] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(0, async () => {
  const port = server.address().port;
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1100, deviceScaleFactor: 1 });
  const errs = [];
  page.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
  page.on("pageerror", e => errs.push("PAGEERR: " + e.message));
  await page.goto(`http://localhost:${port}/index.html`, { waitUntil: "networkidle0", timeout: 60000 });

  await page.evaluate(() => {
    const el = document.getElementById("tree-viewport");
    if (el) el.scrollIntoView();
  });
  await page.waitForSelector(".tree-canvas", { timeout: 30000 }).catch(() => {});
  // let the atlas images load + redraw
  await new Promise(r => setTimeout(r, 2500));

  const info = await page.evaluate(() => ({
    hasCanvas: !!document.querySelector(".tree-canvas"),
    data: !!window.TREE_DATA, sprites: !!window.TREE_SPRITES,
    nodes: window.TREE_DATA ? Object.keys(window.TREE_DATA.nodes).length : 0,
    edges: window.TREE_DATA ? window.TREE_DATA.edges.length : 0,
  }));
  console.log("INFO", JSON.stringify(info), "ERRS", errs.slice(0, 6));

  const vp = await page.$("#tree-viewport");
  if (vp) await vp.screenshot({ path: path.join(__dirname, "_shot_tree_full.png") });

  // Zoom into the centre by scrolling the wheel over the viewport middle.
  if (vp) {
    const box = await vp.boundingBox();
    const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
    await page.mouse.move(cx, cy);
    for (let i = 0; i < 8; i++) { await page.mouse.wheel({ deltaY: -300 }); await new Promise(r => setTimeout(r, 60)); }
    await new Promise(r => setTimeout(r, 600));
    await vp.screenshot({ path: path.join(__dirname, "_shot_center.png") });
  }

  // Select an ascendancy via the dropdown → it should focus the centred wheel.
  for (const asc of ["Ranger3", "Witch1", "Monk3"]) {
    await page.evaluate(id => {
      const s = document.getElementById("tree-asc-select");
      s.value = id; s.dispatchEvent(new Event("change"));
    }, asc);
    await new Promise(r => setTimeout(r, 700));
    const v = await page.$("#tree-viewport");
    if (v) await v.screenshot({ path: path.join(__dirname, "_shot_asc_" + asc + ".png") });
  }

  await browser.close();
  server.close();
  console.log("done");
});
