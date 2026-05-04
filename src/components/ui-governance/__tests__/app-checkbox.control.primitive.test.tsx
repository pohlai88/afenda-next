/**
 * @afenda-owner app-checkbox
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-checkbox explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AppCheckbox } from "@/components/ui-governance/app-checkbox/app-checkbox.control.primitive.client";

describe("AppCheckbox", () => {
  it("renders an accessible checkbox with operator-facing label content", () => {
    render(<AppCheckbox value="ready">Ready for posting</AppCheckbox>);

    expect(
      screen.getByRole("checkbox", { name: "Ready for posting" }),
    ).toBeVisible();
  });

  it("normalizes selection changes through onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <AppCheckbox value="verified" onChange={onChange}>
        Verified
      </AppCheckbox>,
    );

    await user.click(screen.getByRole("checkbox", { name: "Verified" }));

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("surfaces the mixed state for indeterminate workflows", () => {
    render(
      <AppCheckbox isIndeterminate value="partial">
        Partially reconciled
      </AppCheckbox>,
    );

    expect(
      screen.getByRole("checkbox", { name: "Partially reconciled" }),
    ).toBePartiallyChecked();
  });
});
