/**
 * @afenda-owner app-select
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-select explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AppSelect,
  AppSelectHeader,
  AppSelectItem,
  AppSelectSection,
} from "@/components/ui-governance/app-select/app-select.control.primitive.client";

describe("AppSelect", () => {
  it("renders a governed labeled select with selected value, messaging, and grouped items", () => {
    render(
      <AppSelect
        label="Fulfillment status"
        description="Choose the next workflow state."
        errorMessage="Status is required."
        defaultValue="picked"
        defaultOpen
        isInvalid
        validationBehavior="aria"
      >
        <AppSelectSection id="active">
          <AppSelectHeader>Active</AppSelectHeader>
          <AppSelectItem id="picked">Picked</AppSelectItem>
          <AppSelectItem id="packed">Packed</AppSelectItem>
        </AppSelectSection>
      </AppSelect>,
    );

    expect(screen.getByText("Fulfillment status")).toBeVisible();
    expect(screen.getAllByText("Picked").length).toBeGreaterThan(0);
    expect(screen.getByText("Choose the next workflow state.")).toBeVisible();
    expect(screen.getByText("Status is required.")).toBeVisible();
    expect(screen.getByRole("option", { name: "Packed" })).toBeVisible();
    expect(screen.getByText("Active")).toBeVisible();
  });

  it("supports compact sizing and placeholder-driven empty state", () => {
    render(
      <AppSelect aria-label="Compact select" placeholder="Select a warehouse" size="sm">
        <AppSelectItem id="bkk">Bangkok</AppSelectItem>
        <AppSelectItem id="cnx">Chiang Mai</AppSelectItem>
      </AppSelect>,
    );

    const trigger = screen.getByRole("button", { name: /Compact select/ });

    expect(trigger).toBeVisible();
    expect(screen.getByText("Select a warehouse")).toBeVisible();
    expect(trigger.parentElement).toHaveClass("gap-1");
  });

  it("rejects missing item content in development", () => {
    expect(() =>
      render(
        <AppSelect aria-label="Status">
          {null}
        </AppSelect>,
      ),
    ).toThrow(
      "AppSelect requires explicit AppSelectItem children or an item renderer.",
    );
  });

  it("rejects missing accessible naming in development", () => {
    expect(() =>
      render(
        <AppSelect>
          <AppSelectItem id="draft">Draft</AppSelectItem>
        </AppSelect>,
      ),
    ).toThrow("AppSelect requires label, aria-label, or aria-labelledby.");
  });
});
