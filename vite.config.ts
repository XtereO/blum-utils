import { defineConfig } from "vite";

import typescript from "@rollup/plugin-typescript";
import { resolve } from "path";
import { typescriptPaths } from "rollup-plugin-typescript-paths";

export default defineConfig({
  resolve: {
    alias: {
      src: "/src",
    },
  },
  build: {
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      plugins: [
        typescriptPaths({
          preserveExtensions: true,
        }),
        typescript({
          sourceMap: false,
          declaration: true,
          outDir: "dist",
        }),
      ],
    },
  },
});
