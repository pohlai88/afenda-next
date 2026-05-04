/**
 * @afenda-owner app-radio-group
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-radio-group explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AppRadio,
  AppRadioGroup,
} from "@/components/ui-governance/app-radio-group/app-radio-group.control.primitive.client";

describe("AppRadioGroup", () => {
  it("renders a governed exclusive-choice field with label, description, and selected option", () => {
    const { container } = render(
      <AppRadioGroup
        label="Preferred carrier"
        description="Choose the default shipping path."
        defaultValue="express"
      >
        <AppRadio value="standard">Standard</AppRadio>
        <AppRadio value="express">Express</AppRadio>
      </AppRadioGroup>,
    );

    expect(
      screen.getByRole("radiogroup", { name: "Preferred carrier" }),
    ).toBeVisible();
    expect(
      screen.getByText("Choose the default shipping path."),
    ).toBeVisible();
    expect(screen.getByRole("radio", { name: "Express" })).toBeChecked();
    expect(
      screen
        .getByText("Express")
        .closest("label")
        ?.querySelector("[data-app-radio-indicator]"),
    ).toHaveClass("border-accent");
    expect(container.firstElementChild).toHaveClass("text-foreground");
  });

  it("supports horizontal radio layouts for dense operator choices", () => {
    const { container } = render(
      <AppRadioGroup label="Receipt mode" orientation="horizontal">
        <AppRadio value="email">Email</AppRadio>
        <AppRadio value="print">Print</AppRadio>
      </AppRadioGroup>,
    );

    expect(
      container.querySelector("[data-app-radio-group-items]"),
    ).toHaveClass("flex-row");
  });

  it("renders governed validation feedback when the field is invalid", () => {
    render(
      <AppRadioGroup
        label="Approval route"
        isInvalid
        errorMessage="Select one approval route."
      >
        <AppRadio value="manager">Manager</AppRadio>
        <AppRadio value="controller">Controller</AppRadio>
      </AppRadioGroup>,
    );

    expect(screen.getByText("Select one approval route.")).toBeVisible();
  });

  it("rejects missing accessible naming in development", () => {
    expect(() =>
      render(
        <AppRadioGroup>
          <AppRadio value="cat">Cat</AppRadio>
        </AppRadioGroup>,
      ),
    ).toThrow("AppRadioGroup requires label, aria-label, or aria-labelledby.");
  });

  it("rejects groups without direct AppRadio children in development", () => {
    expect(() =>
      render(
        <AppRadioGroup label="Invalid">
          <div>Not a radio</div>
        </AppRadioGroup>,
      ),
    ).toThrow("AppRadioGroup requires AppRadio as a direct child.");
  });
});
