// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const unusedImports = require("eslint-plugin-unused-imports");
const globals = require("globals");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*", "node_modules/*"],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // Imports et variables non utilisés
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // Règles de base
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "warn",
      "no-var": "error",
    },
  },
  // Fichiers de test : globaux Jest
  {
    files: ["**/__tests__/**", "**/*.test.js", "**/*.test.ts", "**/*.test.tsx"],
    languageOptions: {
      globals: Object.fromEntries(
        Object.keys(globals.jest).map((k) => [k, "readonly"])
      ),
    },
  },
]);
