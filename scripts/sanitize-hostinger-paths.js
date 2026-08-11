/**
 * Hostinger/Apache 404s Next.js static-export paths that contain `$`
 * (e.g. __next.categories.$d$slug). Rename those segments and patch the
 * client path encoder so soft navigation keeps working.
 */
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "out");
const SEGMENT_RE = /\$([a-z])\$/g;
const SEGMENT_REPLACER = (_m, type) => `_${type}_`;

function walkFiles(dir, onFile) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, onFile);
    else onFile(full);
  }
}

function renameDollarPaths(dir) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) renameDollarPaths(full);
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.name.includes("$")) continue;
    const fromPath = path.join(dir, entry.name);
    const toName = entry.name.replace(SEGMENT_RE, SEGMENT_REPLACER);
    const toPath = path.join(dir, toName);
    if (fromPath === toPath) continue;
    if (fs.existsSync(toPath)) {
      console.warn("skip exists:", path.relative(OUT, toPath));
      continue;
    }
    fs.renameSync(fromPath, toPath);
    console.log("rename", path.relative(OUT, fromPath), "->", path.relative(OUT, toPath));
  }
}

function patchJsEncoders(filePath) {
  if (!filePath.endsWith(".js")) return;
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;

  // Next client: return"$"+e[2]+"$"+f(t)  →  "_"+e[2]+"_"+f(t)
  content = content.replace(/"\$"\s*\+\s*([a-zA-Z0-9_\[\]]+)\s*\+\s*"\$"\s*\+/g, '"_"+$1+"_"+');
  content = content.replace(/'\$'\s*\+\s*([a-zA-Z0-9_\[\]]+)\s*\+\s*'\$'\s*\+/g, "'_'+$1+'_'+");

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log("patch encoder", path.relative(OUT, filePath));
  }
}

function main() {
  if (!fs.existsSync(OUT)) {
    console.error("Missing out/ — run yarn build first");
    process.exit(1);
  }

  console.log("Renaming $ paths under out/...");
  renameDollarPaths(OUT);

  console.log("Patching JS path encoders...");
  walkFiles(path.join(OUT, "_next"), patchJsEncoders);

  let leftover = 0;
  function check(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.name.includes("$")) {
        leftover++;
        console.warn("leftover $:", path.relative(OUT, full));
      }
      if (entry.isDirectory()) check(full);
    }
  }
  check(OUT);

  const sample = path.join(OUT, "categories", "economy", "__next.categories", "_d_slug", "__PAGE__.txt");
  console.log("sample exists:", fs.existsSync(sample), sample);
  console.log(leftover === 0 ? "OK: no $ left in out/ names" : `WARN: ${leftover} leftover`);
}

main();
