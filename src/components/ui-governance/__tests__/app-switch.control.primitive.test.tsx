/**
 * @afenda-owner app-switch
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-switch explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppSwitch } from "@/components/ui-governance/app-switch/app-switch.control.primitive.client";

describe("AppSwitch", () => {
  it("renders a governed labeled switch with selected state", () => {
    render(
      <AppSwitch defaultSelected name="low-power">
        Low power mode
      </AppSwitch>,
    );

    expect(screen.getByRole("switch", { name: "Low power mode" })).toBeVisible();
    expect(screen.getByRole("switch", { name: "Low power mode" })).toBeChecked();
  });

  it("supports compact sizing and disabled state", () => {
    const { container } = render(
      <AppSwitch aria-label="Compact switch" isDisabled size="sm" />,
    );

    const switchControl = screen.getByRole("switch", { name: "Compact switch" });

    expect(switchControl).toBeVisible();
    expect(switchControl).toBeDisabled();
    expect(container.querySelector("label")).toHaveClass("text-[0.8125rem]");
  });

  it("rejects missing visible and programmatic labeling in development", () => {
    expect(() => render(<AppSwitch />)).toThrow(
      "AppSwitch requires children, aria-label, or aria-labelledby.",
    );
  });
});
