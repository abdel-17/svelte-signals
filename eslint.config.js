import eslint from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import tseslint from "typescript-eslint";

const extraFileExtensions = [".svelte"];

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	svelte.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
				extraFileExtensions,
			},
		},
	},
	{
		files: ["**/*.svelte", "**/*.svelte.js", "**/*.svelte.ts"],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
				projectService: true,
				extraFileExtensions,
			},
		},
	},
	{
		files: ["**/*.svelte"],
		extends: [tseslint.configs.disableTypeChecked],
	},
	{
		ignores: [".svelte-kit", "dist", "eslint.config.js", "svelte.config.js"],
	},
);
