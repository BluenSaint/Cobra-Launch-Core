import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";

export default [
  js.configs.recommended,
  ts.configs.recommended,
  react.configs.recommended,
  prettier.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Add custom rules here
    },
    env: {
      browser: true,
      node: true,
      es6: true,
    },
  },
];
