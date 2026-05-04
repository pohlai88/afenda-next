/**
 * @afenda-owner app-progress-bar
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-progress-bar explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppProgressBar } from "@/components/ui-governance/app-progress-bar/app-progress-bar.control.primitive.client";

describe("AppProgressBar", () => {
  it("renders a governed determinate progress surface with label, value, and fill width", () => {
    const { container } = render(
      <AppProgressBar
        label="Inventory sync"
        minValue={0}
        maxValue={100}
        value={48}
        valueLabel="48% complete"
      />,
    );

    expect(
      screen.getByRole("progressbar", { name: "Inventory sync" }),
    ).toBeVisible();
    expect(screen.getByText("48% complete")).toBeVisible();
    expect(container.firstElementChild).toHaveClass("max-w-64");
    expect(container.firstElementChild).toHaveClass("type-body-sm");
    expect(
      container.querySelector("[data-app-progress-bar-fill]"),
    ).toHaveClass("bg-accent");
    expect(
      container.querySelector("[data-app-progress-bar-fill]"),
    ).toHaveStyle({ width: "48%" });
  });

  it("supports compact indeterminate progress bars for active work", () => {
    const { container } = render(
      <AppProgressBar
        aria-label="Reindexing queue"
        isIndeterminate
        size="sm"
      />,
    );

    expect(
      screen.getByRole("progressbar", { name: "Reindexing queue" }),
    ).toBeVisible();
    expect(container.firstElementChild).toHaveClass("type-meta");
    expect(
      container.querySelector("[data-app-progress-bar-fill]"),
    ).toHaveClass("animate-pulse");
  });

  it("rejects missing accessible naming in development", () => {
    expect(() => render(<AppProgressBar value={10} />)).toThrow(
      "AppProgressBar requires label, aria-label, or aria-labelledby.",
    );
  });
});
