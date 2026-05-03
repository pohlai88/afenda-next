import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const isCI = process.env["CI"] === "true";

// Tests stay co-located in __tests__ folders under src (see AGENTS.md).
export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    include: ["src/**/__tests__/**/*.{test,spec}.{ts,tsx}"],
    exclude: [
      "**/node_modules/**",
      "**/.next/**",
      "**/coverage/**",
      "**/dist/**",
      "**/e2e/**",
      "**/playwright-report/**",
      "**/test-results/**",
    ],
    css: true,
    environment: "jsdom",
    globals: true,
    isolate: true,
    pool: "threads",
    setupFiles: ["./vitest.setup.ts"],
    clearMocks: true,
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
    testTimeout: 10_000,
    hookTimeout: 10_000,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "coverage/vitest",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.d.ts", "src/**/__tests__/**", "src/test/**"],
    },
    ...(isCI
      ? {
          reporters: ["default", "junit"],
          outputFile: {
            junit: "test-results/vitest/junit.xml",
          },
        }
      : {
          reporters: ["default"],
        }),
  },
});
