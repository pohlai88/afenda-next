import { globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import tseslint from "typescript-eslint";
// @ts-expect-error -- no types for this plugin
import drizzle from "eslint-plugin-drizzle";

export default tseslint.config(
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/components/ui/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/app/**",
                "@/client-runtime/**",
                "@/features/**",
                "@/server/**",
                "@/trpc/**",
              ],
              message:
                "Shared UI primitives must stay framework- and domain-agnostic. Move app, client-runtime, feature, server, or tRPC dependencies outside src/components/ui.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/client-runtime/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/trpc/trpc.server.hydration.server",
              message:
                "Browser integration modules must not import the server tRPC boundary.",
            },
          ],
          patterns: [
            {
              group: ["@/app/**", "@/features/**", "@/server/**"],
              message:
                "src/client-runtime is global browser runtime integration only. Keep route UI, ERP feature UI, and server runtime dependencies outside this boundary.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/server/db",
              message:
                "Feature modules must not import persistence directly. Route data access through server-owned boundaries.",
            },
            {
              name: "@/server/better-auth",
              message:
                "Feature modules must not import auth runtime infrastructure directly. Route auth through server-owned boundaries.",
            },
            {
              name: "@/server/api",
              message:
                "Feature modules must not import server API internals directly. Route calls through approved app/server boundaries.",
            },
          ],
          patterns: [
            {
              group: [
                "@/app/**",
                "@/server/db/**",
                "@/server/better-auth/**",
                "@/server/api/**",
              ],
              message:
                "Feature modules must not depend on App Router files or direct server runtime infrastructure.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/server/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/trpc/trpc.react.provider.client",
              message:
                "Server modules must not import the client tRPC boundary.",
            },
          ],
          patterns: [
            {
              group: [
                "@/app/**",
                "@/client-runtime/**",
                "@/components/**",
                "@/features/**/client/**",
              ],
              message:
                "Server modules must not depend on App Router UI, browser integration, shared client UI, or client-marked feature modules.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      drizzle,
    },
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "drizzle/enforce-delete-with-where": [
        "error",
        { drizzleObjectName: ["db", "ctx.db"] },
      ],
      "drizzle/enforce-update-with-where": [
        "error",
        { drizzleObjectName: ["db", "ctx.db"] },
      ],
    },
  },
  prettier,
  globalIgnores([
    ".artifacts/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "coverage/**",
    "generated/**",
    "playwright-report/**",
    "test-results/**",
  ]),
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["scripts/*.mjs"],
        },
      },
    },
  },
);
