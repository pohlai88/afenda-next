/**
 * @afenda-owner app-text-field
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-text-field explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AppInput,
  AppTextArea,
  AppTextField,
} from "@/components/ui-governance/app-text-field/app-text-field.control.primitive.client";

describe("AppTextField", () => {
  it("renders a governed labeled input field", () => {
    render(
      <AppTextField label="Email" description="Used for order updates.">
        <AppInput type="email" placeholder="operator@afenda.test" />
      </AppTextField>,
    );

    expect(screen.getByLabelText("Email")).toBeVisible();
    expect(screen.getByPlaceholderText("operator@afenda.test")).toBeVisible();
    expect(screen.getByText("Used for order updates.")).toBeVisible();
  });

  it("renders a governed text area field", () => {
    render(
      <AppTextField aria-label="Internal notes">
        <AppTextArea placeholder="Enter a note" />
      </AppTextField>,
    );

    expect(screen.getByRole("textbox", { name: "Internal notes" })).toBeVisible();
    expect(screen.getByPlaceholderText("Enter a note")).toBeVisible();
  });

  it("rejects unnamed text fields in development", () => {
    expect(() =>
      render(
        <AppTextField>
          <AppInput />
        </AppTextField>,
      ),
    ).toThrow("AppTextField requires label, aria-label, or aria-labelledby.");
  });
});
