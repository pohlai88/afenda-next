/**
 * @afenda-owner app-checkbox-group
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-checkbox-group explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AppCheckbox } from "@/components/ui-governance/app-checkbox/app-checkbox.control.primitive.client";
import { AppCheckboxGroup } from "@/components/ui-governance/app-checkbox-group/app-checkbox-group.control.primitive.client";

describe("AppCheckboxGroup", () => {
  it("renders field messaging and checkbox layout for governed multi-select flows", () => {
    const { container } = render(
      <AppCheckboxGroup
        label="Fulfillment checks"
        description="Choose every completed verification step."
        errorMessage="At least one verification step is required."
        isInvalid
        orientation="horizontal"
        validationBehavior="aria"
      >
        <AppCheckbox value="counted">Counted</AppCheckbox>
        <AppCheckbox value="sealed">Sealed</AppCheckbox>
      </AppCheckboxGroup>,
    );

    expect(screen.getByText("Fulfillment checks")).toBeVisible();
    expect(
      screen.getByText("Choose every completed verification step."),
    ).toBeVisible();
    expect(
      screen.getByText("At least one verification step is required."),
    ).toBeVisible();
    expect(screen.getByRole("checkbox", { name: "Counted" })).toBeVisible();
    expect(container.querySelector(".flex-row")).toBeTruthy();
  });

  it("calls onChange with the selected values", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <AppCheckboxGroup
        aria-label="Favorite sports"
        defaultValue={["soccer"]}
        onChange={onChange}
      >
        <AppCheckbox value="soccer">Soccer</AppCheckbox>
        <AppCheckbox value="baseball">Baseball</AppCheckbox>
      </AppCheckboxGroup>,
    );

    await user.click(screen.getByRole("checkbox", { name: "Baseball" }));

    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining(["soccer", "baseball"]),
    );
  });

  it("rejects non-governed direct children in development", () => {
    expect(() =>
      render(
        <AppCheckboxGroup aria-label="Bad composition">
          <div>Not a checkbox</div>
        </AppCheckboxGroup>,
      ),
    ).toThrow("AppCheckboxGroup requires AppCheckbox as a direct child.");
  });
});
