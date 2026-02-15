import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig({
  files: ["**/*.ts", "**/*.js"],
  extends: ["js/recommended"],
  rules: {
    semi: ["error", "never"],
    quotes: ["error", "single"],
  },
});
