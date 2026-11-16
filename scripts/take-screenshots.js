/**
 * Takes the README screenshots (docs/screenshots/) from the static export in out/.
 * Run `npm run build` first, then `node scripts/take-screenshots.js`.
 * It serves out/ on a local port, so no dev server is needed. Nothing is submitted and nothing is written to Firebase.
 */
const fs = require("fs");
const http = require("http");
const path = require("path");
const { chromium } = require("playwright");

const OUT = path.join(__dirname, "..", "out");
const SHOTS = path.join(__dirname, "..", "docs", "screenshots");
const PORT = 4173;

const PAGES = [
  { name: "home", url: "/" },
  { name: "cars", url: "/cars/" },
  { name: "car-details", url: "/cars/audi-a4/" },
  { name: "contact", url: "/contact/" },
];

const VIEWPORTS = [
  { label: "desktop", width: 1440, height: 900 },
  { label: "mobile", width: 390, height: 844 },
];

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

function serve() {
  return http
    .createServer((req, res) => {
      const pathname = decodeURIComponent(new URL(req.url, "http://x").pathname);
      let file = path.join(OUT, pathname);
      if (!file.startsWith(OUT)) {
        res.writeHead(403).end();
        return;
      }
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
      if (!fs.existsSync(file)) {
        res.writeHead(404).end("not found");
        return;
      }
      res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] ?? "application/octet-stream" });
      fs.createReadStream(file).pipe(res);
    })
    .listen(PORT);
}

/** Scrolls to the bottom in steps so reveal-on-scroll sections are visible, then back to the top. */
async function revealAll(page) {
  await page.evaluate(async () => {
    const step = Math.max(300, window.innerHeight * 0.7);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
}

(async () => {
  fs.mkdirSync(SHOTS, { recursive: true });
  const server = serve();
  const browser = await chromium.launch();
  try {
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      for (const target of PAGES) {
        const page = await context.newPage();
        await page.goto(`http://localhost:${PORT}${target.url}`, { waitUntil: "load" });
        await page.waitForTimeout(800);
        await revealAll(page);
        const file = path.join(SHOTS, `${target.name}-${vp.label}.jpg`);
        await page.screenshot({ path: file, fullPage: true, type: "jpeg", quality: 70 });
        console.log("saved", path.relative(process.cwd(), file));
        await page.close();
      }
      await context.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
})();
