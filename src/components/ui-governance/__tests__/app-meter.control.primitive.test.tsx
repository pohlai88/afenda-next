/**
 * @afenda-owner app-meter
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-meter explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppMeter } from "@/components/ui-governance/app-meter/app-meter.control.primitive.client";

describe("AppMeter", () => {
  it("renders a governed bounded meter with inline label, value, and auto tone fill", () => {
    const { container } = render(
      <AppMeter
        label="Inventory utilization"
        maxValue={100}
        minValue={0}
        value={62}
        valueLabel="62% utilized"
      />,
    );

    expect(
      screen.getByRole("meter", { name: "Inventory utilization" }),
    ).toBeVisible();
    expect(screen.getByText("62% utilized")).toBeVisible();
    expect(container.firstElementChild).toHaveClass("max-w-64");
    expect(container.firstElementChild).toHaveClass("type-body-sm");
    expect(
      container.querySelector("[data-app-meter-fill]"),
    ).toHaveClass("bg-success");
  });

  it("supports compact critical meters with explicit tone override", () => {
    const { container } = render(
      <AppMeter
        aria-label="Storage threshold"
        size="sm"
        tone="danger"
        value={92}
        valueLabel="92% allocated"
      />,
    );

    expect(screen.getByRole("meter", { name: "Storage threshold" })).toBeVisible();
    expect(screen.getByText("92% allocated")).toBeVisible();
    expect(container.firstElementChild).toHaveClass("type-meta");
    expect(
      container.querySelector("[data-app-meter-fill]"),
    ).toHaveClass("bg-danger");
    expect(
      container.querySelector("[data-app-meter-value]"),
    ).toHaveClass("text-danger");
  });

  it("rejects missing accessible naming in development", () => {
    expect(() => render(<AppMeter value={40} />)).toThrow(
      "AppMeter requires label, aria-label, or aria-labelledby.",
    );
  });
});
