/**
 * @afenda-owner app-color-wheel
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-color-wheel explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AppColorWheel,
  parseColor,
} from "@/components/ui-governance/app-color-wheel/app-color-wheel.control.primitive.client";

describe("AppColorWheel", () => {
  it("renders a labeled governed color wheel with internal track and thumb", () => {
    const { container } = render(
      <AppColorWheel
        aria-label="Hue wheel"
        defaultValue={parseColor("hsl(50, 100%, 50%)")}
        size="lg"
      />,
    );

    expect(screen.getByLabelText(/hue wheel/i)).toBeVisible();
    expect(container.firstElementChild).toHaveClass("size-60");
    expect(container.querySelector(".rounded-full")).toBeTruthy();
  });

  it("rejects missing accessible naming in development", () => {
    expect(() =>
      render(<AppColorWheel defaultValue="hsl(50, 100%, 50%)" />),
    ).toThrow("AppColorWheel requires aria-label or aria-labelledby.");
  });

  it("re-exports parseColor so feature code stays inside the governed boundary", () => {
    expect(parseColor("hsl(50, 100%, 50%)").toString("hsl")).toContain(
      "hsl(",
    );
  });
});
