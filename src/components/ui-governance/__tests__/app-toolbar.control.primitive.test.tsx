/**
 * @afenda-owner app-toolbar
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-toolbar explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppButton } from "@/components/ui-governance/app-button/app-button.control.primitive.client";
import { AppToolbar } from "@/components/ui-governance/app-toolbar/app-toolbar.control.primitive.client";

describe("AppToolbar", () => {
  it("renders a toolbar landmark with labeled controls", () => {
    render(
      <AppToolbar aria-label="Actions">
        <AppButton variant="secondary" aria-label="Save">
          Save
        </AppButton>
      </AppToolbar>,
    );

    expect(screen.getByRole("toolbar", { name: "Actions" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Save" })).toBeVisible();
  });

  it("applies compact density classes", () => {
    const { container } = render(
      <AppToolbar aria-label="Compact" density="compact">
        <AppButton aria-label="One">1</AppButton>
      </AppToolbar>,
    );

    expect(container.querySelector('[role="toolbar"]')).toHaveClass("gap-0.5");
  });
});
