import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Les landings sont servies par le segment racine src/app/(frontend)/[slug]
    // (02/10/2026) : la règle croit alors que tout lien à un niveau (/contact,
    // /seance-essai...) vise cette route. Le site utilise volontairement des
    // <a> pour ses liens internes (chargement complet de page).
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
