/**
 * @afenda-owner app-color-swatch-picker
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-color-swatch-picker explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  AppColorSwatchPicker,
  AppColorSwatchPickerItem,
  parseColor,
} from "@/components/ui-governance/app-color-swatch-picker/app-color-swatch-picker.control.primitive.client";

describe("AppColorSwatchPicker", () => {
  it("renders a labeled governed picker and selects a swatch option", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <AppColorSwatchPicker
        aria-label="Preset brand colors"
        defaultValue="#A00"
        onChange={handleChange}
      >
        <AppColorSwatchPickerItem
          aria-label="Dark red"
          color="#A00"
          colorName="Dark red"
        />
        <AppColorSwatchPickerItem
          aria-label="Bright orange"
          color="#f80"
          colorName="Bright orange"
        />
      </AppColorSwatchPicker>,
    );

    expect(
      screen.getByRole("listbox", { name: /preset brand colors/i }),
    ).toBeVisible();

    const orangeOption = screen.getByRole("option", { name: /bright orange/i });
    await user.click(orangeOption);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0]?.[0].toString("hex").toLowerCase()).toBe(
      "#ff8800",
    );
    expect(
      orangeOption.querySelector('[data-slot="selection-indicator"]'),
    ).toBeTruthy();
  });

  it("rejects missing picker naming in development", () => {
    expect(() =>
      render(
        <AppColorSwatchPicker>
          <AppColorSwatchPickerItem color="#A00" />
        </AppColorSwatchPicker>,
      ),
    ).toThrow("AppColorSwatchPicker requires aria-label or aria-labelledby.");
  });

  it("rejects duplicate equivalent direct-child colors in development", () => {
    expect(() =>
      render(
        <AppColorSwatchPicker aria-label="Duplicate palette">
          <AppColorSwatchPickerItem color="#f00" />
          <AppColorSwatchPickerItem color="hsl(0, 100%, 50%)" />
        </AppColorSwatchPicker>,
      ),
    ).toThrow(
      "AppColorSwatchPicker requires unique colors across direct AppColorSwatchPickerItem children.",
    );
  });

  it("re-exports parseColor so feature code stays inside the governed boundary", () => {
    expect(parseColor("#A00").toString("hex").toLowerCase()).toBe("#aa0000");
  });
});
