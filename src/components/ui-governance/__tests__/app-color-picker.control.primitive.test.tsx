/**
 * @afenda-owner app-color-picker
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-color-picker explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  AppColorPicker,
  parseColor,
} from "@/components/ui-governance/app-color-picker/app-color-picker.control.primitive.client";

describe("AppColorPicker", () => {
  it(
    "renders a governed trigger and opens the default color editing panel",
    async () => {
      const user = userEvent.setup();

      render(<AppColorPicker label="Fill color" defaultValue="#184" />);

      await user.click(screen.getByRole("button", { name: "Fill color" }));

      expect(
        screen.getByRole("group", {
          name: /color saturation and brightness/i,
        }),
      ).toBeVisible();
      expect(screen.getByRole("textbox", { name: "Hex" })).toBeVisible();
      expect(screen.getByText("Hue")).toBeVisible();
    },
    20_000,
  );

  it("renders custom panel children when provided", async () => {
    const user = userEvent.setup();

    render(
      <AppColorPicker label="Stroke color">
        <div>Custom picker body</div>
      </AppColorPicker>,
    );

    await user.click(screen.getByRole("button", { name: "Stroke color" }));

    expect(screen.getByText("Custom picker body")).toBeVisible();
    expect(screen.queryByRole("textbox", { name: "Hex" })).toBeNull();
  });

  it("rejects missing trigger naming in development", () => {
    expect(() =>
      render(<AppColorPicker defaultValue="#184" />),
    ).toThrow("AppColorPicker requires label or triggerAriaLabel.");
  });

  it("re-exports parseColor so feature code stays inside the governed boundary", () => {
    expect(parseColor("hsl(50, 100%, 50%)").toString("hsl")).toContain(
      "hsl(",
    );
  });
});
