/**
 * @afenda-owner app-color-area
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-color-area explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AppColorArea,
  parseColor,
} from "@/components/ui-governance/app-color-area/app-color-area.control.primitive.client";

describe("AppColorArea", () => {
  it("renders a labeled color area with an internal governed thumb", () => {
    const { container } = render(
      <AppColorArea
        aria-label="Product accent color"
        defaultValue={parseColor("#9B80FF")}
        size="lg"
        xChannel="red"
        yChannel="green"
      />,
    );

    expect(
      screen.getByRole("group", { name: /product accent color/i }),
    ).toBeVisible();
    expect(container.querySelector(".rounded-full")).toBeTruthy();
    expect(container.querySelector(".max-w-64")).toBeTruthy();
  });

  it("rejects missing channel configuration in development", () => {
    expect(() =>
      render(
        <AppColorArea
          aria-label="Broken color area"
          defaultValue="#9B80FF"
          xChannel={"red"}
          // @ts-expect-error runtime guard coverage
          yChannel={undefined}
        />,
      ),
    ).toThrow("AppColorArea requires explicit xChannel and yChannel.");
  });

  it("rejects missing accessible naming in development", () => {
    expect(() =>
      render(
        <AppColorArea
          defaultValue="#9B80FF"
          xChannel="red"
          yChannel="green"
        />,
      ),
    ).toThrow("AppColorArea requires aria-label or aria-labelledby.");
  });

  it("re-exports parseColor so feature code stays inside the governed boundary", () => {
    expect(parseColor("#9B80FF").toString("hex").toLowerCase()).toBe(
      "#9b80ff",
    );
  });
});
