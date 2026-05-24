// Serve the project root and screenshot the passive tree for visual QA.
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

  // Reveal the passive tree section (nav anchor) and wait for the SVG.
  await page.evaluate(() => {
    const el = document.getElementById("tree-viewport") || document.querySelector("#passive-tree, [id*='tree']");
    if (el) el.scrollIntoView();
  });
  await page.waitForSelector("#tree-svg", { timeout: 30000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 1500));

  const info = await page.evaluate(() => {
    const svg = document.getElementById("tree-svg");
    return {
      hasSvg: !!svg,
      wheels: document.querySelectorAll(".tree-asc-wheel").length,
      ring: document.querySelectorAll(".tree-center-ring").length,
      art: !!window.TREE_ART,
      vb: svg ? svg.getAttribute("viewBox") : null,
    };
  });
  console.log("INFO", JSON.stringify(info), "ERRS", errs.slice(0, 5));

  const vp = await page.$("#tree-viewport");
  if (vp) await vp.screenshot({ path: path.join(__dirname, "_shot_tree_full.png") });

  // Zoom crops: override the SVG viewBox to a square region around a point.
  await page.setViewport({ width: 900, height: 900, deviceScaleFactor: 1 });
  async function crop(name, cx, cy, span) {
    await page.evaluate((cx, cy, span) => {
      const svg = document.getElementById("tree-svg");
      const pan = svg.querySelector(".tree-pan");
      if (pan) pan.setAttribute("transform", "translate(0 0) scale(1)");
      svg.setAttribute("viewBox", `${cx - span / 2} ${cy - span / 2} ${span} ${span}`);
    }, cx, cy, span);
    await new Promise(r => setTimeout(r, 600));
    const v = await page.$("#tree-viewport");
    await v.screenshot({ path: path.join(__dirname, "_shot_" + name + ".png") });
  }
  await crop("pathfinder", 16195, 6938, 5200);
  await crop("center", 0, 0, 6000);
  await crop("lich", 5087, -18332, 5200);

  await browser.close();
  server.close();
  console.log("done");
});
