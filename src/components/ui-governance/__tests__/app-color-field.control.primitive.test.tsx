/**
 * @afenda-owner app-color-field
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-color-field explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AppColorField,
  parseColor,
} from "@/components/ui-governance/app-color-field/app-color-field.control.primitive.client";

describe("AppColorField", () => {
  it("renders a governed labeled color input with field messaging", () => {
    render(
      <AppColorField
        label="Primary color"
        description="Enter the brand hex value."
        errorMessage="A valid brand color is required."
        isInvalid
        placeholder="Enter a color"
        validationBehavior="aria"
      />,
    );

    expect(screen.getByText("Primary color")).toBeVisible();
    expect(
      screen.getByRole("textbox", { name: "Primary color" }),
    ).toHaveAttribute("placeholder", "Enter a color");
    expect(screen.getByText("Enter the brand hex value.")).toBeVisible();
    expect(screen.getByText("A valid brand color is required.")).toBeVisible();
  });

  it("supports channel editing with an explicit color value", () => {
    render(
      <AppColorField
        label="Hue"
        channel="hue"
        colorSpace="hsl"
        value={parseColor("#7f007f")}
      />,
    );

    expect(screen.getByRole("textbox", { name: "Hue" })).toBeVisible();
  });

  it("rejects missing accessible naming in development", () => {
    expect(() =>
      render(
        <AppColorField
          defaultValue={parseColor("#e73623")}
          placeholder="Enter a color"
        />,
      ),
    ).toThrow("AppColorField requires label, aria-label, or aria-labelledby.");
  });

  it("re-exports parseColor so feature code stays inside the governed boundary", () => {
    expect(parseColor("#E73623").toString("hex").toLowerCase()).toBe(
      "#e73623",
    );
  });
});
