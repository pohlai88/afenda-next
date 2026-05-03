import { defineConfig, devices } from "@playwright/test";

const isCI = process.env["CI"] === "true";
const defaultBaseURL = "http://127.0.0.1:3001";
const configuredBaseURL =
  process.env["PLAYWRIGHT_BASE_URL"] ?? process.env["BASE_URL"];
const baseURL = configuredBaseURL ?? defaultBaseURL;

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.runtime.spec.ts",
  outputDir: ".artifacts/test-results/playwright",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  ...(isCI ? { workers: "50%" } : {}),
  reporter: isCI
    ? [
        ["github"],
        [
          "html",
          { open: "never", outputFolder: ".artifacts/playwright-report" },
        ],
        [
          "junit",
          { outputFile: ".artifacts/test-results/playwright/junit.xml" },
        ],
      ]
    : [
        ["list"],
        [
          "html",
          { open: "never", outputFolder: ".artifacts/playwright-report" },
        ],
      ],
  timeout: 30_000,
  expect: {
    timeout: 7_500,
  },
  use: {
    baseURL,
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    locale: "en-US",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    video: "retain-on-failure",
  },
  ...(configuredBaseURL
    ? {}
    : {
        webServer: {
          command: "pnpm exec next start -p 3001",
          env: {
            ...process.env,
            BETTER_AUTH_URL: process.env["BETTER_AUTH_URL"] ?? baseURL,
            NODE_ENV: "production",
            // Local Playwright webServer only — do not set on real deployments.
            AFENDA_E2E_SKIP_AUTH_GUARD: "true",
          },
          reuseExistingServer: !isCI,
          timeout: 120_000,
          url: baseURL,
          stdout: "pipe",
          stderr: "pipe",
        },
      }),
  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
});
