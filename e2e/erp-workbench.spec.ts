import { expect, test } from "./fixtures";

test("erp workbench renders core sections and procurement scene", async ({
  page,
}) => {
  await page.goto("/erp-workbench");

  await expect(
    page.getByRole("heading", { name: "ERP Workbench" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Primitives" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Patterns" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Scenes" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Contract Coverage" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Scenes" }).focus();
  await page.keyboard.press("Enter");

  await expect(page.getByRole("heading", { name: "Scenes" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Primitives" })).toBeHidden();
  await expect(page.getByRole("heading", { name: "Patterns" })).toBeHidden();
  await expect(
    page.getByRole("heading", { name: "Contract Coverage" }),
  ).toBeHidden();

  const procurementSceneButton = page.getByRole("button", {
    name: "Inspect Procurement Approval Scene",
  });
  await procurementSceneButton.focus();
  await page.keyboard.press("Enter");

  const inspector = page.getByLabel("Component Inspector");
  await expect(
    inspector.getByRole("heading", { name: "Component Inspector" }),
  ).toBeVisible();
  await expect(inspector.getByText("Procurement Approval Scene")).toBeVisible();
  await expect(page.getByRole("rowheader", { name: "PR-24018" })).toBeVisible();
  await expect(
    page.getByRole("gridcell", { name: "Seoul Logistics Partners" }),
  ).toBeVisible();
});
