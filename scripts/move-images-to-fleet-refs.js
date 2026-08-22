const fs = require("fs");
const path = require("path");

const carFiles = new Set(fs.readdirSync(path.join("public", "images", "fleet")));
const files = [
  "src/data/service-details.ts",
  "src/app/cars/page.tsx",
  "src/app/categories/[slug]/page.tsx",
];

for (const f of files) {
  if (!fs.existsSync(f)) {
    console.log("skip missing", f);
    continue;
  }
  let c = fs.readFileSync(f, "utf8");
  const orig = c;
  c = c.replace(/"\/images\/([^"]+)"/g, (m, name) => {
    if (name.startsWith("fleet/")) return m;
    const base = name.split("?")[0];
    let decoded = base;
    try {
      decoded = decodeURIComponent(base);
    } catch {}
    if (carFiles.has(base) || carFiles.has(decoded)) {
      return `"/images/fleet/${decoded}"`;
    }
    return m;
  });
  if (c !== orig) {
    fs.writeFileSync(f, c);
    console.log("patched", f);
  } else {
    console.log("no change", f);
  }
}
