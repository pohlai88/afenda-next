/**
 * @afenda-owner app-range-calendar
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-range-calendar explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppRangeCalendar } from "@/components/ui-governance/app-range-calendar/app-range-calendar.control.primitive.client";

describe("AppRangeCalendar", () => {
  it(
    "renders a governed range calendar with label, navigation, and selection",
    () => {
      const { container } = render(
        <AppRangeCalendar label="Trip dates" />,
      );

      expect(screen.getByText("Trip dates")).toBeVisible();
      expect(
        screen.getByRole("button", { name: "Previous month" }),
      ).toBeVisible();
      expect(
        screen.getByRole("button", { name: "Next month" }),
      ).toBeVisible();
      expect(container.firstElementChild).toHaveClass("text-foreground");
      expect(
        container.querySelectorAll("[data-app-range-calendar-month]").length,
      ).toBe(1);
    },
    20_000,
  );

  it("supports multiple visible months for extended planning workflows", () => {
    const { container } = render(
      <AppRangeCalendar aria-label="Planning window" visibleMonths={2} />,
    );

    expect(
      container.querySelectorAll("[data-app-range-calendar-month]").length,
    ).toBe(2);
  });

  it("renders invalid messaging when the selected range violates workflow rules", () => {
    render(
      <AppRangeCalendar
        aria-label="Blackout dates"
        isInvalid
        errorMessage="Range cannot exceed seven days."
      />,
    );

    expect(screen.getByText("Range cannot exceed seven days.")).toBeVisible();
  });

  it("rejects missing accessible naming in development", () => {
    expect(() =>
      render(<AppRangeCalendar />),
    ).toThrow(
      "AppRangeCalendar requires label, aria-label, or aria-labelledby.",
    );
  });
});
