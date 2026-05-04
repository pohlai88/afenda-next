/**
 * @afenda-owner app-time-field
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-time-field explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppTimeField } from "@/components/ui-governance/app-time-field/app-time-field.control.primitive.client";

describe("AppTimeField", () => {
  it("renders a governed labeled segmented input with field messaging", () => {
    const { container } = render(
      <AppTimeField
        label="Shift start"
        description="Use the operator's local time."
        errorMessage="A shift start time is required."
        isInvalid
        validationBehavior="aria"
      />,
    );

    expect(screen.getByText("Shift start")).toBeVisible();
    expect(screen.getByText("Use the operator's local time.")).toBeVisible();
    expect(screen.getByText("A shift start time is required.")).toBeVisible();
    expect(container.querySelector("[data-type='hour']")).toBeTruthy();
    expect(container.querySelector("[data-type='minute']")).toBeTruthy();
  });

  it("supports compact sizing while keeping the internal segmented input", () => {
    const { container } = render(
      <AppTimeField aria-label="Compact time" size="sm" />,
    );

    expect(screen.getByLabelText("Compact time")).toBeVisible();
    expect(container.firstElementChild).toHaveClass("gap-1");
    expect(container.querySelector("[data-type='hour']")).toBeTruthy();
  });

  it("rejects missing accessible naming in development", () => {
    expect(() => render(<AppTimeField />)).toThrow(
      "AppTimeField requires label, aria-label, or aria-labelledby.",
    );
  });
});
