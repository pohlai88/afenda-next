/**
 * @afenda-owner app-toggle-button-group
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-toggle-button-group explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppToggleButton } from "@/components/ui-governance/app-toggle-button/app-toggle-button.control.primitive.client";
import { AppToggleButtonGroup } from "@/components/ui-governance/app-toggle-button-group/app-toggle-button-group.control.primitive.client";

describe("AppToggleButtonGroup", () => {
  it("renders a labeled group with toggle buttons", () => {
    render(
      <AppToggleButtonGroup aria-label="Text style" defaultSelectedKeys={["bold"]}>
        <AppToggleButton id="bold">
          <span>Bold</span>
        </AppToggleButton>
        <AppToggleButton id="italic">
          <span>Italic</span>
        </AppToggleButton>
      </AppToggleButtonGroup>,
    );

    const group = screen.getByRole("radiogroup", { name: "Text style" });
    expect(group).toBeVisible();
    expect(group).toHaveClass("gap-1");
    expect(screen.getByRole("radio", { name: "Bold" })).toBeVisible();
    expect(screen.getByRole("radio", { name: "Italic" })).toBeVisible();
  });

  it("applies segmented layout when visual is segmented", () => {
    const { container } = render(
      <AppToggleButtonGroup
        aria-label="Period"
        visual="segmented"
        defaultSelectedKeys={["d"]}
      >
        <AppToggleButton id="d">Day</AppToggleButton>
        <AppToggleButton id="w">Week</AppToggleButton>
      </AppToggleButtonGroup>,
    );

    const group = screen.getByRole("radiogroup", { name: "Period" });
    expect(group).toHaveClass("gap-0");
    expect(group).toHaveClass("border-border");
    expect(container.querySelectorAll(".react-aria-ToggleButton").length).toBe(2);
  });
});
