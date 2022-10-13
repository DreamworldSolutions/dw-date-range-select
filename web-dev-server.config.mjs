import rollupCommonjs from "@rollup/plugin-commonjs";
import { fromRollup } from "@web/dev-server-rollup";

const commonjs = fromRollup(rollupCommonjs);

export default {
  open: true,
  nodeResolve: true,
  appIndex: "demo/index.html",
  // esbuildTarget: "auto",
  plugins: [commonjs()],
};
