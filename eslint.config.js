import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import eslint from "@eslint/js";
import markdown from "@eslint/markdown";
import vitest from "@vitest/eslint-plugin";
import jsdoc from "eslint-plugin-jsdoc";
import jsonc from "eslint-plugin-jsonc";
import n from "eslint-plugin-n";
import packageJson from "eslint-plugin-package-json";
import perfectionist from "eslint-plugin-perfectionist";
import * as regexp from "eslint-plugin-regexp";
import yml from "eslint-plugin-yml";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

const JS_FILES = ["**/*.js"];
const TS_FILES = ["**/*.ts"];
const JS_TS_FILES = [...JS_FILES, ...TS_FILES];

export default defineConfig(
	{
		ignores: ["**/*.snap", "coverage", "lib", "node_modules", "pnpm-lock.yaml"],
	},
	{ linterOptions: { reportUnusedDisableDirectives: "error" } },
	{
		extends: [
			eslint.configs.recommended,
			comments.recommended,
			n.configs["flat/recommended"],
			perfectionist.configs["recommended-natural"],
			regexp.configs["flat/recommended"],
			tseslint.configs.strictTypeChecked,
			tseslint.configs.stylisticTypeChecked,
		],
		files: JS_TS_FILES,
		languageOptions: {
			parserOptions: {
				projectService: { allowDefaultProject: ["*.config.*s"] },
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"n/no-missing-import": "off",

			// Stylistic concerns that don't interfere with Prettier
			"logical-assignment-operators": [
				"error",
				"always",
				{ enforceForIfStatements: true },
			],
			"no-useless-rename": "error",
			"object-shorthand": "error",
			"operator-assignment": "error",
		},
		settings: {
			perfectionist: { partitionByComment: true, type: "natural" },
			vitest: { typecheck: true },
		},
	},
	{
		extends: [
			jsdoc.configs["flat/contents-typescript-error"],
			jsdoc.configs["flat/logical-typescript-error"],
			jsdoc.configs["flat/stylistic-typescript-error"],
		],
		files: TS_FILES,
	},
	{
		extends: [jsonc.configs["recommended-with-json"]],
		files: ["**/*.json", "**/*.jsonc"],
	},
	{
		extends: [packageJson.configs["recommended-publishable"]],
		files: ["package.json"],
	},
	{
		extends: [markdown.configs.recommended],
		files: ["**/*.md"],
		ignores: ["CHANGELOG.md"],
		rules: {
			// https://github.com/eslint/markdown/issues/294
			"markdown/no-missing-label-refs": "off",
		},
	},
	{
		extends: [vitest.configs.recommended],
		files: ["**/*.test.*"],
	},
	{
		extends: [yml.configs["flat/recommended"], yml.configs["flat/prettier"]],
		files: ["**/*.{yml,yaml}"],
		rules: {
			"yml/file-extension": ["error", { extension: "yml" }],
			"yml/sort-sequence-values": [
				"error",
				{ order: { type: "asc" }, pathPattern: "^.*$" },
			],
		},
	},
	{
		files: ["pnpm-workspace.yaml"],
		rules: {
			"yml/file-extension": "off",
			"yml/sort-keys": [
				"error",
				{ order: { type: "asc" }, pathPattern: "^.*$" },
			],
		},
	},
	{
		files: ["./eslint.config.js", "./**/*.test.*"],
		rules: {
			"n/no-unsupported-features/node-builtins": "off",
		},
	},
);
