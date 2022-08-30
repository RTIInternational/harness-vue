import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  // https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      entry: resolve(__dirname, "src/harness.js"),
      name: "harness-vue",
      fileName: (format) => `harness-vue.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [vue()],
});
