/**
 * @afenda-owner app-date-field
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-date-field explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppDateField } from "@/components/ui-governance/app-date-field/app-date-field.control.primitive.client";

describe("AppDateField", () => {
  it("renders a governed labeled segmented input with field messaging", () => {
    const { container } = render(
      <AppDateField
        label="Requested date"
        description="Use the operator's local calendar date."
        errorMessage="A requested date is required."
        isInvalid
        validationBehavior="aria"
      />,
    );

    expect(screen.getByText("Requested date")).toBeVisible();
    expect(screen.getByText("Use the operator's local calendar date.")).toBeVisible();
    expect(screen.getByText("A requested date is required.")).toBeVisible();
    expect(container.querySelector("[data-type='month']")).toBeTruthy();
    expect(container.querySelector("[data-type='day']")).toBeTruthy();
    expect(container.querySelector("[data-type='year']")).toBeTruthy();
  });

  it("supports compact sizing while keeping the internal segmented input", () => {
    const { container } = render(
      <AppDateField aria-label="Compact date" size="sm" />,
    );

    expect(screen.getByLabelText("Compact date")).toBeVisible();
    expect(container.firstElementChild).toHaveClass("gap-1");
    expect(container.querySelector("[data-type='month']")).toBeTruthy();
  });

  it("rejects missing accessible naming in development", () => {
    expect(() => render(<AppDateField />)).toThrow(
      "AppDateField requires label, aria-label, or aria-labelledby.",
    );
  });
});
