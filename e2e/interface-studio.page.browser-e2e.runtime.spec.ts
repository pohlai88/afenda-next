/**
 * @afenda-owner interface-studio
 * @afenda-subject page
 * @afenda-artifact browser-e2e
 * @afenda-boundary runtime
 * @afenda-description Runtime browser coverage for Interface Studio and auth callback flows
 */
import type { Page } from "@playwright/test";

import { expect, test } from "./e2e.playwright.fixture.runtime";

async function signUpThroughUi(page: Page) {
  const email = `lab-e2e-${Date.now()}@afenda.dev`;
  const password = "afenda-e2e-password";

  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  await page.getByRole("tab", { name: "Create account" }).click();
  await page.getByLabel("Display name").fill("Interface Studio E2E");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(
    page.getByRole("button", { name: "Create account" }),
  ).toBeEnabled();

  await page.getByRole("tab", { name: "Sign in" }).click();
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { exact: true, name: "Sign in" }).click();
}

test("interface studio root renders registry shell", async ({ page }) => {
  await page.goto("/interface-studio");

  await expect(
    page.getByRole("heading", { name: "Interface Studio", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Sections", { exact: true })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Interface lab sections" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Components" })).toBeVisible();
});

test("interface studio component detail mounts codegen preview (button)", async ({
  page,
}) => {
  await page.goto("/interface-studio/components/button");

  await expect(page.getByRole("heading", { name: "Button", exact: true })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Preview" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sample action" })).toBeVisible();

  await page.getByRole("tab", { name: "Usage" }).click();
  await expect(page.getByText("Registry status")).toBeVisible();
});

test("interface studio components catalog honors ?q= filter", async ({ page }) => {
  await page.goto("/interface-studio/components?q=button");

  await expect(page.locator(`a[href$="/interface-studio/components/button"]`)).toHaveCount(1);
});

test("account security route preserves sign-in callback and renders session inventory", async ({
  page,
}) => {
  await page.goto("/account/security");

  await expect(page).toHaveURL(/\/sign-in\?callbackUrl=%2Faccount%2Fsecurity$/);
  await signUpThroughUi(page);

  await expect(
    page.getByRole("heading", { name: "Account security" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Session inventory" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Registered passkeys" }),
  ).toBeVisible();
});
