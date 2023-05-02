import esbuild from "esbuild";

import CDNModule from "./CDNModule.mjs";

const result = await esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: "docs/bundle.js",
  plugins: [CDNModule],
  loader: { ".mp3": "file" },
});
console.log(
  `build ended with ${result.errors.length} errors and ${result.warnings.length} warnings`
);
