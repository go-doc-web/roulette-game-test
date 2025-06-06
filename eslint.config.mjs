import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js"; // For basic JS rules
import typescriptParser from "@typescript-eslint/parser"; // For parsing TypeScript
import typescriptPlugin from "@typescript-eslint/eslint-plugin"; // For TypeScript rules
import globals from "globals"; // For global variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 1. Basic JavaScript rules (ESLint recommended)
  js.configs.recommended,

  // 2. TypeScript parser and plugin setup
  {
    files: ["**/*.{ts,tsx,js,jsx}"], // Apply these rules to corresponding files
    languageOptions: {
      parser: typescriptParser, // Use TypeScript parser
      parserOptions: {
        project: "./tsconfig.json", // Essential for rules requiring type information
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser, // Add browser globals
        ...globals.node, // Add Node.js globals
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin, // Connect TypeScript plugin
    },
    rules: {
      // Here you can configure your rules or override existing ones
      "@typescript-eslint/no-require-imports": "error", // Forbid require(), which is important for Prisma
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ], // Warning for unused variables
      "@typescript-eslint/no-explicit-any": "warn", // Warning for 'any' type usage
      "@typescript-eslint/no-empty-object-type": "warn", // Warning for empty object types
      "@typescript-eslint/no-unnecessary-type-constraint": "warn",
      "@typescript-eslint/no-wrapper-object-types": "warn",
      "@typescript-eslint/no-unsafe-function-type": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-this-alias": "warn",
    },
  },

  // 3. Next.js extensions (via FlatCompat)
  // Ensure these configs work correctly with your Next.js and ESLint versions.
  // They usually include React rules.
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 4. THE MOST IMPORTANT PART: File ignore rule!
  {
    ignores: [
      "src/generated/**", // Ignore all files in the src/generated directory
      "node_modules/**",
      ".next/**",
    ],
  },
];

export default eslintConfig;

// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;
