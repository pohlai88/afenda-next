import { expect, test as base } from "@playwright/test";

const ignoredConsoleErrorPatterns = [
  /\/\.well-known\/oauth-authorization-server/i,
  /\/favicon\.ico/i,
];

export const test = base.extend({
  page: async ({ page }, run) => {
    const browserErrors: string[] = [];

    page.on("console", (message) => {
      if (message.type() !== "error") {
        return;
      }

      const text = message.text();
      if (ignoredConsoleErrorPatterns.some((pattern) => pattern.test(text))) {
        return;
      }

      const location = message.location();
      const source = location.url
        ? ` (${location.url}:${location.lineNumber})`
        : "";
      browserErrors.push(`console.error: ${text}${source}`);
    });

    page.on("pageerror", (error) => {
      browserErrors.push(`pageerror: ${error.message}`);
    });

    await run(page);

    expect(browserErrors, "browser console and page errors").toEqual([]);
  },
});

export { expect };
