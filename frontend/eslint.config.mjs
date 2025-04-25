import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable no-unused-vars for the entire project or specific rule adjustment
      "@typescript-eslint/no-unused-vars": [
        "warn", // Change this to "off" to disable the rule entirely
        {
          argsIgnorePattern: "^_", // Allow unused variables that start with "_"
          ignoreRestSiblings: true, // Ignore unused variables in rest syntax
        },
      ],
    },
  },
];

export default eslintConfig;
