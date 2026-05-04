/**
 * @afenda-owner app-tooltip
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-tooltip explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppButton } from "@/components/ui-governance/app-button/app-button.control.primitive.client";
import {
  AppTooltip,
  AppTooltipTrigger,
} from "@/components/ui-governance/app-tooltip/app-tooltip.control.primitive.client";

describe("AppTooltip", () => {
  it("renders tooltip content when the trigger starts open", () => {
    render(
      <AppTooltipTrigger defaultOpen>
        <AppButton aria-label="Edit row">Edit</AppButton>
        <AppTooltip>Save changes before leaving.</AppTooltip>
      </AppTooltipTrigger>,
    );

    expect(screen.getByRole("tooltip")).toHaveTextContent(
      "Save changes before leaving.",
    );
    expect(screen.getByRole("tooltip").querySelector("svg")).toBeTruthy();
  });

  it("applies compact size classes", () => {
    render(
      <AppTooltipTrigger defaultOpen>
        <AppButton aria-label="Hint">?</AppButton>
        <AppTooltip size="sm">Short</AppTooltip>
      </AppTooltipTrigger>,
    );

    expect(screen.getByRole("tooltip")).toHaveClass("text-xs");
  });
});
