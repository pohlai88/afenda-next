/**
 * @afenda-owner app-color-swatch
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-color-swatch explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AppColorSwatch,
  parseColor,
} from "@/components/ui-governance/app-color-swatch/app-color-swatch.control.primitive.client";

describe("AppColorSwatch", () => {
  it("renders a governed standalone swatch with business context and checkerboard backing", () => {
    const { container } = render(
      <AppColorSwatch
        aria-label="Background color"
        color="#f00"
        colorName="Fire truck red"
        size="lg"
      />,
    );

    expect(screen.getByLabelText(/background color/i)).toBeVisible();
    expect(container.firstElementChild).toHaveClass("size-8");
    expect(container.firstElementChild).toHaveClass("rounded-full");
    expect(container.firstElementChild).toHaveAttribute(
      "style",
      expect.stringContaining("repeating-conic-gradient"),
    );
    expect(container.firstElementChild).toHaveAttribute(
      "style",
      expect.stringContaining("linear-gradient"),
    );
  });

  it("re-exports parseColor so feature code stays inside the governed boundary", () => {
    expect(parseColor("#0f0").toString("hex").toLowerCase()).toBe("#00ff00");
  });
});
