/**
 * @afenda-owner app-date-range-picker
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-date-range-picker explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppDateRangePicker } from "@/components/ui-governance/app-date-range-picker/app-date-range-picker.control.primitive.client";

describe("AppDateRangePicker", () => {
  it(
    "renders a governed labeled date range picker with internal start and end fields",
    () => {
      const { container } = render(
        <AppDateRangePicker
          label="Trip dates"
          description="Choose the requested travel window."
          errorMessage="Trip dates are required."
          isInvalid
          validationBehavior="aria"
        />,
      );

      expect(screen.getByText("Trip dates")).toBeVisible();
      expect(
        screen.getByRole("button", { name: /open date range calendar/i }),
      ).toBeVisible();
      expect(
        screen.getByText("Choose the requested travel window."),
      ).toBeVisible();
      expect(screen.getByText("Trip dates are required.")).toBeVisible();
      expect(container.querySelectorAll("[role='spinbutton']")).toHaveLength(6);
      expect(screen.getByText("–")).toBeVisible();
    },
    20_000,
  );

  it("renders the internal range calendar when opened", () => {
    render(
      <AppDateRangePicker
        aria-label="Ship window"
        buttonAriaLabel="Choose ship window"
        defaultOpen
      />,
    );

    expect(
      screen.getByRole("button", {
        name: /choose ship window/i,
        hidden: true,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("grid")).toBeVisible();
  });

  it("rejects missing accessible naming in development", () => {
    expect(() => render(<AppDateRangePicker />)).toThrow(
      "AppDateRangePicker requires label, aria-label, or aria-labelledby.",
    );
  });
});
