/**
 * @afenda-owner app-combo-box
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-combo-box explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  AppComboBox,
  AppComboBoxItem,
  AppComboBoxSection,
} from "@/components/ui-governance/app-combo-box/app-combo-box.control.primitive.client";

describe("AppComboBox", () => {
  it("renders a labeled governed combobox and opens its internal listbox", async () => {
    const user = userEvent.setup();

    render(
      <AppComboBox label="Favorite animal" placeholder="Select an animal" menuTrigger="focus">
        <AppComboBoxItem id="aardvark">Aardvark</AppComboBoxItem>
        <AppComboBoxItem id="cat">Cat</AppComboBoxItem>
        <AppComboBoxItem id="dog">Dog</AppComboBoxItem>
      </AppComboBox>,
    );

    const input = screen.getByRole("combobox", { name: /favorite animal/i });
    await user.click(input);

    expect(input).toHaveAttribute("placeholder", "Select an animal");
    expect(screen.getByRole("listbox")).toBeVisible();
    expect(screen.getByRole("option", { name: "Aardvark" })).toBeVisible();
  });

  it("renders grouped collection content with AppComboBoxSection", async () => {
    const user = userEvent.setup();

    render(
      <AppComboBox label="Preferred produce" menuTrigger="focus">
        <AppComboBoxSection title="Fruit">
          <AppComboBoxItem id="apple">Apple</AppComboBoxItem>
        </AppComboBoxSection>
        <AppComboBoxSection title="Vegetable">
          <AppComboBoxItem id="carrot">Carrot</AppComboBoxItem>
        </AppComboBoxSection>
      </AppComboBox>,
    );

    await user.click(
      screen.getByRole("combobox", { name: /preferred produce/i }),
    );

    expect(screen.getByText("Fruit")).toBeVisible();
    expect(screen.getByRole("option", { name: "Carrot" })).toBeVisible();
  });

  it("shows the governed multiple-selection placeholder", () => {
    render(
      <AppComboBox
        aria-label="Selected states"
        selectionMode="multiple"
        valuePlaceholder="No selected items"
      >
        <AppComboBoxItem id="al">Alabama</AppComboBoxItem>
        <AppComboBoxItem id="ak">Alaska</AppComboBoxItem>
      </AppComboBox>,
    );

    expect(screen.getByText("No selected items")).toBeVisible();
  });

  it("rejects missing accessible naming in development", () => {
    expect(() =>
      render(
        <AppComboBox>
          <AppComboBoxItem id="cat">Cat</AppComboBoxItem>
        </AppComboBox>,
      ),
    ).toThrow("AppComboBox requires label, aria-label, or aria-labelledby.");
  });
});
