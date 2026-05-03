import userEvent from "@testing-library/user-event";
import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { WorkbenchPageClient } from "@/features/workbench/client/erp-workbench.page.client";
import { WORKBENCH_ITEMS } from "@/features/workbench/erp-workbench.registry.workbench";
import { renderWithProviders } from "@/test/test.render.shared";

describe("ERP Workbench", () => {
  it("renders the main sections and updates the inspector selection", async () => {
    const user = userEvent.setup();
    renderWithProviders(<WorkbenchPageClient />);

    expect(screen.getByRole("heading", { name: "ERP Workbench" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Primitives" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Patterns" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Scenes" })).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: "Contract Coverage" }),
    ).toBeTruthy();

    const inspector = screen.getByLabelText("Component Inspector");
    expect(within(inspector).getByText("AppButton")).toBeTruthy();

    await user.click(
      screen.getAllByRole("button", {
        name: "Inspect Procurement Approval Scene",
      })[0]!,
    );

    expect(
      within(inspector).getByText("Procurement Approval Scene"),
    ).toBeTruthy();
    expect(
      within(inspector).getByText(
        "src/features/workbench/components/erp-workbench.surfaces.client.tsx",
      ),
    ).toBeTruthy();
  }, 15000);

  it("requires the minimum metadata for each approved workbench item", () => {
    const categories = new Set(WORKBENCH_ITEMS.map((item) => item.category));

    expect(categories).toEqual(
      new Set(["primitive", "pattern", "scene", "contract"]),
    );

    for (const item of WORKBENCH_ITEMS.filter(
      (candidate) => candidate.status === "approved",
    )) {
      expect(item.name.length).toBeGreaterThan(0);
      expect(item.sourcePath.length).toBeGreaterThan(0);
      expect(item.ariaPrimitives.length).toBeGreaterThan(0);
      expect(item.states.length).toBeGreaterThan(0);
      expect(item.tokens.length).toBeGreaterThan(0);
      expect(item.useWhen.length).toBeGreaterThan(0);
      expect(item.doNotUseWhen.length).toBeGreaterThan(0);
      expect(item.render()).toBeTruthy();
    }
  });

  it("filters the single-route workbench by section", async () => {
    const user = userEvent.setup();
    renderWithProviders(<WorkbenchPageClient />);

    await user.click(screen.getByRole("button", { name: "Scenes" }));

    expect(screen.queryByRole("heading", { name: "Primitives" })).toBeNull();
    expect(screen.queryByRole("heading", { name: "Patterns" })).toBeNull();
    expect(screen.getByRole("heading", { name: "Scenes" })).toBeTruthy();
    expect(
      screen.queryByRole("heading", { name: "Contract Coverage" }),
    ).toBeNull();
  });

  it("shows ERP App Shell as a pattern and procurement approval as the hosted scene", async () => {
    const user = userEvent.setup();
    renderWithProviders(<WorkbenchPageClient />);

    await user.click(screen.getByRole("button", { name: "Patterns" }));
    expect(screen.getAllByText("ERP App Shell").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "Scenes" }));
    expect(
      screen.getAllByText("Procurement Approval Scene").length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("Procurement Approval").length).toBeGreaterThan(
      0,
    );
    expect(screen.getByText("Approval Queue")).toBeTruthy();
  });

  it("updates the bulk toolbar and detail panel when queue rows are selected", async () => {
    const user = userEvent.setup();
    renderWithProviders(<WorkbenchPageClient />);

    await user.click(screen.getByRole("button", { name: "Scenes" }));

    expect(screen.getByText("1 selected")).toBeTruthy();
    expect(screen.getAllByText("PR-24018").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("row", { name: /PR-24023/ }));

    expect(screen.getByText("2 selected")).toBeTruthy();
    expect(
      screen.getAllByText("Bangkok Process Controls").length,
    ).toBeGreaterThan(0);
  }, 15000);

  it("opens approval dialogs from the procurement approval scene", async () => {
    const user = userEvent.setup();
    renderWithProviders(<WorkbenchPageClient />);

    await user.click(screen.getByRole("button", { name: "Scenes" }));
    await user.click(screen.getByRole("button", { name: "Approve Request" }));

    expect(
      await screen.findByRole("dialog", { name: "Approve Request" }),
    ).toBeTruthy();
    expect(screen.getByText("Decision record")).toBeTruthy();
  });
});
