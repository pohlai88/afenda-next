/**
 * @afenda-owner app-date-picker
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-date-picker explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppDatePicker } from "@/components/ui-governance/app-date-picker/app-date-picker.control.primitive.client";

describe("AppDatePicker", () => {
  it("renders a governed labeled date picker with internal trigger and field messaging", () => {
    const { container } = render(
      <AppDatePicker
        label="Appointment date"
        description="Select the requested service date."
        errorMessage="An appointment date is required."
        isInvalid
        validationBehavior="aria"
      />,
    );

    expect(screen.getByText("Appointment date")).toBeVisible();
    expect(screen.getByRole("button", { name: /open calendar/i })).toBeVisible();
    expect(screen.getByText("Select the requested service date.")).toBeVisible();
    expect(screen.getByText("An appointment date is required.")).toBeVisible();
    expect(container.querySelector("[data-type='month']")).toBeTruthy();
    expect(container.querySelector("[data-type='day']")).toBeTruthy();
    expect(container.querySelector("[data-type='year']")).toBeTruthy();
  });

  it("renders the internal calendar when opened", () => {
    render(
      <AppDatePicker
        aria-label="Ship date"
        buttonAriaLabel="Choose ship date"
        defaultOpen
      />,
    );

    expect(
      screen.getByRole("button", { name: /choose ship date/i, hidden: true }),
    ).toBeInTheDocument();
    expect(screen.getByRole("grid")).toBeVisible();
  });

  it("rejects missing accessible naming in development", () => {
    expect(() => render(<AppDatePicker />)).toThrow(
      "AppDatePicker requires label, aria-label, or aria-labelledby.",
    );
  });
});
