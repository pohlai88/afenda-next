/**
 * @afenda-owner erp-runtime-workbench
 * @afenda-subject client
 * @afenda-artifact interaction
 * @afenda-boundary test
 * @afenda-description Test coverage for ERP Runtime Workbench client interactions
 */
import userEvent from "@testing-library/user-event";
import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ErpRuntimeWorkbench } from "@/app/(app)/erp-workbench/_components/erp-runtime-workbench.route.surface.client";
import { getErpRuntimeWorkbenchData } from "@/app/(app)/erp-workbench/_components/erp-workbench.runtime.data.fixture";
import { renderWithProviders } from "@/test-runtime/test-runtime.render.helper.test";

describe("ERP Runtime Workbench client island", () => {
  it("switches modes and updates inspector state from selector items", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ErpRuntimeWorkbench workbench={getErpRuntimeWorkbenchData()} />,
    );

    const inspector = screen.getByLabelText("Workbench inspector");
    expect(within(inspector).getByText("Runtime density")).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Contracts" }));
    expect(
      screen.getByRole("heading", { name: "Shared UI approval ledger" }),
    ).toBeInTheDocument();
    const contractsInspector = screen.getByLabelText("Workbench inspector");
    expect(within(contractsInspector).getByText("AppTabs")).toBeInTheDocument();
    expect(
      screen.getByRole("grid", { name: "Approval ledger details" }),
    ).toBeInTheDocument();

    await user.click(screen.getByText("AppTable"));
    expect(
      within(screen.getByLabelText("Workbench inspector")).getByText(
        "AppTable",
      ),
    ).toBeInTheDocument();
    expect(
      within(screen.getByLabelText("Workbench inspector")).getAllByText(
        "Keep the primitive dense and legible instead of turning it into a spreadsheet engine.",
      ).length,
    ).toBeGreaterThan(0);
  });

  it("updates procurement selection and opens decision dialogs", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ErpRuntimeWorkbench workbench={getErpRuntimeWorkbenchData()} />,
    );

    await user.click(screen.getByRole("tab", { name: "Procurement" }));
    expect(
      screen.getByRole("heading", { name: "Procurement preview" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("row", { name: /PR-24023/ }));

    expect(screen.getAllByText("PR-24023").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText("Bangkok Process Controls").length,
    ).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "Approve Request" }));
    expect(
      await screen.findByRole("dialog", { name: "Approve Request" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("dialog", { name: "Approve Request" }),
    ).toBeNull();
  });
});
