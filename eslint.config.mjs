import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import prettierPlugin from "eslint-plugin-prettier";
import vuePrettier from "@vue/eslint-config-prettier";

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,jsx,vue}"],
  },
  {
    name: "app/files-to-ignore",
    ignores: [
      "**/dist/**",
      "**/dist-ssr/**",
      "**/coverage/**",
      "**/node_modules/**",
      "**/docs/.vitepress/dist/**",
      "**/docs/.vitepress/cache/**",
    ],
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  vuePrettier,

  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "warn",
    },
  },
];
