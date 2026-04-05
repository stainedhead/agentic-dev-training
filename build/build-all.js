// build-all.js — Build all 12 modules sequentially
const { execSync } = require("child_process");
const path = require("path");

const modules = [
  "module01.js","module02.js","module03.js","module04.js",
  "module05.js","module06.js","module07.js","module08.js",
  "module09.js","module10.js","module11.js","module12.js",
];

async function buildAll() {
  for (const mod of modules) {
    console.log(`\n▶ Building ${mod}...`);
    try {
      execSync(`node ${path.join(__dirname, mod)}`, { stdio:"inherit", cwd:__dirname });
      console.log(`✅ ${mod} complete`);
    } catch (err) {
      console.error(`❌ ${mod} failed:`, err.message);
      process.exit(1);
    }
  }
  console.log("\n🎉 All 12 modules built. Copy .pptx files to slides/");
}

buildAll();
