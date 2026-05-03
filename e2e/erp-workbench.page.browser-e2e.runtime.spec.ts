/**
 * @afenda-owner erp-workbench
 * @afenda-subject page
 * @afenda-artifact browser-e2e
 * @afenda-boundary runtime
 * @afenda-description Runtime browser coverage for ERP workbench page
 */
import { expect, test } from "./e2e.playwright.fixture.runtime";

test("erp runtime workbench renders tabs, selector updates, and procurement preview", async ({
  page,
}) => {
  await page.goto("/erp-workbench");

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
  await expect(inspector.getByText("PR-24023")).toBeVisible();
  await expect(inspector.getByText("Bangkok Process Controls")).toBeVisible();
});
