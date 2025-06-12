const esbuild = require("esbuild");
const path = require("path");

esbuild
  .build({
    entryPoints: [path.join(__dirname, "src", "extension.ts")],
    bundle: true,
    outdir: path.join(__dirname, "dist"),
    platform: "node",
    target: "node14",
    sourcemap: true,
    minify: false,
    external: ["vscode"],
  })
  .catch(() => process.exit(1));
