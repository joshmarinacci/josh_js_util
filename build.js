import { build } from "esbuild";
import pkg from "npm-dts";
const { Generator } = pkg;

async function go() {
  const outdir = "dist";
  const sharedConfig = {
    entryPoints: ["src/index.ts"],
    bundle: true,
    minify: false,
  };

  await new Generator({
    entry: "src/index.ts",
    output: `${outdir}/index.d.ts`,
  }).generate();

  // await build({
  //   ...sharedConfig,
  //   platform: "node",
  //   outfile: `${outdir}/index.cjs`,
  //   external: ["rtds-core", "react", "react-dom"],
  // });

  await build({
    ...sharedConfig,
    platform: "neutral",
    format: "esm",
    outfile: `${outdir}/index.esm.js`,
    external: [""],
  });
}

go()
  .then(() => console.log("done"))
  .catch((e) => console.log(e));
