const fs = require("fs");
const path = require("path");

const imagesDir = path.join(__dirname, "..", "public", "images");
const carsPath = path.join(__dirname, "..", "src", "data", "cars.ts");
const servicePath = path.join(__dirname, "..", "src", "data", "service-details.ts");
const categoryPage = path.join(__dirname, "..", "src", "app", "categories", "[slug]", "page.tsx");

function sanitizeName(name) {
  return name
    .replace(/\s+/g, "-")
    .replace(/_+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

const files = fs.readdirSync(imagesDir).filter((f) => fs.statSync(path.join(imagesDir, f)).isFile());
const renameMap = new Map();

for (const file of files) {
  if (!/\s/.test(file)) continue;
  const next = sanitizeName(file);
  if (next === file) continue;
  const from = path.join(imagesDir, file);
  const to = path.join(imagesDir, next);
  if (fs.existsSync(to)) {
    // Prefer keeping already-sanitized target if identical size, else overwrite
    fs.unlinkSync(to);
  }
  fs.renameSync(from, to);
  renameMap.set(file, next);
  console.log(`rename: ${file} -> ${next}`);
}

function patchFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;

  for (const [from, to] of renameMap.entries()) {
    // raw filename in carImage("...")
    content = content.split(`"${from}"`).join(`"${to}"`);
    content = content.split(`'${from}'`).join(`'${to}'`);
    // URL-encoded path forms
    const encFrom = encodeURIComponent(from);
    const encTo = encodeURIComponent(to);
    content = content.split(`/images/${encFrom}`).join(`/images/${to}`);
    content = content.split(`/images/${from}`).join(`/images/${to}`);
    content = content.split(encFrom).join(to);
  }

  // Also normalize any remaining encoded spaces in /images/ paths to hyphen style leftovers
  content = content.replace(/\/images\/([^"'\)\s]+)/g, (match, filename) => {
    try {
      const decoded = decodeURIComponent(filename);
      if (/\s/.test(decoded)) {
        return `/images/${sanitizeName(decoded)}`;
      }
    } catch {}
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`patched: ${path.relative(path.join(__dirname, ".."), filePath)}`);
  }
}

patchFile(carsPath);
patchFile(servicePath);
patchFile(categoryPage);

console.log(`Done. Renamed ${renameMap.size} files.`);
