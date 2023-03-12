import * as esbuild from "https://deno.land/x/esbuild@v0.12.9/mod.js";

await esbuild.build({
  entryPoints: ["./common/front.ts"],
  outfile: "./static/bundle.js",
  format: "esm",
  bundle: true,
  watch: true,
});
