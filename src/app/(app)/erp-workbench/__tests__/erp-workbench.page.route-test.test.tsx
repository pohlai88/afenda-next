/**
 * @afenda-owner erp-workbench
 * @afenda-subject page
 * @afenda-artifact route-test
 * @afenda-boundary test
 * @afenda-description Test coverage for the ERP Runtime Workbench page route
 */
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ErpRuntimeWorkbench } from "@/app/(app)/erp-workbench/_components/erp-runtime-workbench.route.surface.client";
import { getErpRuntimeWorkbenchData } from "@/app/(app)/erp-workbench/_components/erp-workbench.runtime.data.fixture";
import { renderWithProviders } from "@/test-runtime/test-runtime.render.helper.test";

describe("ERP Runtime Workbench page route", () => {
  it("renders the runtime workbench heading, purpose, and mode tabs", () => {
    renderWithProviders(
      <ErpRuntimeWorkbench workbench={getErpRuntimeWorkbenchData()} />,
    );

    expect(
      screen.getByRole("heading", { name: "ERP Runtime Workbench" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/preview environment for validating afenda's erp ui/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Contracts" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Methods" })).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Procurement" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Fixture data only")).toBeInTheDocument();
  });
});
