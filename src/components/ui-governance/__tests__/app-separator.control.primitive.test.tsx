/**
 * @afenda-owner app-separator
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-separator explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppSeparator } from "@/components/ui-governance/app-separator/app-separator.control.primitive.client";

describe("AppSeparator", () => {
  it("renders a governed horizontal separator by default", () => {
    render(<AppSeparator data-testid="separator" />);

    const separator = screen.getByTestId("separator");

    expect(separator).toHaveAttribute("role", "separator");
    expect(separator).toHaveClass("h-px");
    expect(separator).toHaveClass("w-full");
  });

  it("renders a governed vertical separator when requested", () => {
    render(
      <AppSeparator
        data-testid="vertical-separator"
        orientation="vertical"
        elementType="div"
      />,
    );

    const separator = screen.getByTestId("vertical-separator");

    expect(separator).toHaveAttribute("aria-orientation", "vertical");
    expect(separator).toHaveClass("w-px");
    expect(separator).toHaveClass("min-h-8");
  });
});
