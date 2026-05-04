/**
 * @afenda-owner app-search-field
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-search-field explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppSearchField } from "@/components/ui-governance/app-search-field/app-search-field.control.primitive.client";

describe("AppSearchField", () => {
  it("renders a governed labeled search field with messaging and a visible clear action when populated", () => {
    const { container } = render(
      <AppSearchField
        label="Document search"
        description="Search invoices by number or vendor."
        errorMessage="Enter at least three characters."
        defaultValue="INV-1042"
        isInvalid
        validationBehavior="aria"
      />,
    );

    expect(screen.getByLabelText("Document search")).toBeVisible();
    expect(screen.getByText("Search invoices by number or vendor.")).toBeVisible();
    expect(screen.getByText("Enter at least three characters.")).toBeVisible();
    expect(screen.getByRole("button", { name: "Clear search" })).toBeVisible();
    expect(container.firstElementChild).toHaveClass("gap-1.5");
  });

  it("supports compact sizing while preserving the internal search affordances", () => {
    const { container } = render(
      <AppSearchField
        aria-label="Compact search"
        placeholder="Find records"
        size="sm"
      />,
    );

    expect(screen.getByLabelText("Compact search")).toBeVisible();
    expect(screen.getByPlaceholderText("Find records")).toBeVisible();
    expect(container.firstElementChild).toHaveClass("gap-1");
  });

  it("hides the clear action when the field is empty", () => {
    render(<AppSearchField aria-label="Empty search" />);

    expect(screen.queryByRole("button", { name: "Clear search" })).toBeNull();
  });

  it("rejects missing accessible naming in development", () => {
    expect(() => render(<AppSearchField />)).toThrow(
      "AppSearchField requires label, aria-label, or aria-labelledby.",
    );
  });
});
