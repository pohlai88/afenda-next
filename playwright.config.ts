import { defineConfig, devices } from "@playwright/test";

const isCI = process.env["CI"] === "true";
const defaultBaseURL = "http://127.0.0.1:3001";
const configuredBaseURL =
  process.env["PLAYWRIGHT_BASE_URL"] ?? process.env["BASE_URL"];
const baseURL = configuredBaseURL ?? defaultBaseURL;

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.spec.ts",
  outputDir: "test-results/playwright",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  ...(isCI ? { workers: "50%" } : {}),
  reporter: isCI
    ? [
        ["github"],
        ["html", { open: "never", outputFolder: "playwright-report" }],
        ["junit", { outputFile: "test-results/playwright/junit.xml" }],
      ]
    : [
        ["list"],
        ["html", { open: "never", outputFolder: "playwright-report" }],
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
