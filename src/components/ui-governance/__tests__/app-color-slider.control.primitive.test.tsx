/**
 * @afenda-owner app-color-slider
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-color-slider explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AppColorSlider,
  parseColor,
} from "@/components/ui-governance/app-color-slider/app-color-slider.control.primitive.client";

describe("AppColorSlider", () => {
  it("renders a governed labeled channel slider with output and track", () => {
    const { container } = render(
      <AppColorSlider
        label="Hue"
        channel="hue"
        defaultValue={parseColor("hsl(50, 100%, 50%)")}
      />,
    );

    expect(screen.getByText("Hue")).toBeVisible();
    expect(screen.getByRole("slider", { name: "Hue" })).toBeVisible();
    expect(container.querySelector(".col-span-2")).toBeTruthy();
  });

  it("supports vertical orientation for compact channel controls", () => {
    const { container } = render(
      <AppColorSlider
        aria-label="Alpha"
        channel="alpha"
        defaultValue={parseColor("#336699")}
        orientation="vertical"
      />,
    );

    expect(screen.getByRole("slider", { name: "Alpha" })).toBeVisible();
    expect(container.querySelector(".h-50")).toBeTruthy();
  });

  it("rejects missing channel configuration in development", () => {
    expect(() =>
      render(
        <AppColorSlider
          aria-label="Broken slider"
          // @ts-expect-error runtime guard coverage
          channel={undefined}
        />,
      ),
    ).toThrow("AppColorSlider requires an explicit channel.");
  });

  it("rejects missing accessible naming in development", () => {
    expect(() =>
      render(<AppColorSlider channel="hue" />),
    ).toThrow("AppColorSlider requires label, aria-label, or aria-labelledby.");
  });

  it("re-exports parseColor so feature code stays inside the governed boundary", () => {
    expect(parseColor("#336699").toString("hex").toLowerCase()).toBe(
      "#336699",
    );
  });
});
