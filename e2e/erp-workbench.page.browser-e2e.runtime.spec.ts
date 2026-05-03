/**
 * @afenda-owner erp-workbench
 * @afenda-subject page
 * @afenda-artifact browser-e2e
 * @afenda-boundary runtime
 * @afenda-description Runtime browser coverage for ERP workbench page
 */
import type { Page } from "@playwright/test";

import { expect, test } from "./e2e.playwright.fixture.runtime";

async function signUpThroughUi(page: Page) {
  const email = `erp-e2e-${Date.now()}@afenda.dev`;
  const password = "afenda-e2e-password";

  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  await page.getByRole("tab", { name: "Create account" }).click();
  await page.getByLabel("Display name").fill("ERP E2E");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(
    page.getByRole("button", { name: "Create account" }),
  ).toBeEnabled();

  await page.getByRole("tab", { name: "Sign in" }).click();
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
}

test("erp runtime workbench renders tabs, selector updates, and procurement preview", async ({
  page,
}) => {
  await page.goto("/erp-workbench");
  await signUpThroughUi(page);

  await expect(
    page.getByRole("heading", { name: "ERP Runtime Workbench" }),
  ).toBeVisible();
  await expect(page.getByRole("tab", { name: "Overview" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Contracts" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Methods" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Procurement" })).toBeVisible();

  await page.getByRole("tab", { name: "Contracts" }).focus();
  await page.keyboard.press("Enter");

  const inspector = page.getByLabel("Workbench inspector");
  await expect(
    inspector.getByRole("heading", { name: "Current context" }),
  ).toBeVisible();
  await expect(inspector.getByText("AppTabs")).toBeVisible();

  await page.getByText("AppTable").click();
  await expect(inspector.getByText("AppTable")).toBeVisible();

  await page.getByRole("tab", { name: "Procurement" }).click();
  await expect(
    page.getByRole("heading", { name: "Procurement preview" }),
  ).toBeVisible();
  await expect(page.getByRole("rowheader", { name: "PR-24018" })).toBeVisible();
  await expect(
    page.getByRole("gridcell", { name: "Seoul Logistics Partners" }),
  ).toBeVisible();

  await page.getByRole("row", { name: /PR-24023/ }).click();
  await expect(page.getByRole("heading", { name: "PR-24023" })).toBeVisible();
  await expect(
    page.getByText(
      "Local supplier request with matched quote and short aging window.",
    ),
  ).toBeVisible();
});
