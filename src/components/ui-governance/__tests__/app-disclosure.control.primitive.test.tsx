/**
 * @afenda-owner app-disclosure
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-disclosure explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppButton } from "@/components/ui-governance/app-button/app-button.control.primitive.client";
import { AppDisclosure } from "@/components/ui-governance/app-disclosure/app-disclosure.control.primitive.client";

describe("AppDisclosure", () => {
  it("renders a governed disclosure with internal trigger and panel content", () => {
    render(
      <AppDisclosure
        title="System requirements"
        defaultExpanded
      >
        Details about system requirements here.
      </AppDisclosure>,
    );

    expect(
      screen.getByRole("button", { name: /system requirements/i }),
    ).toBeVisible();
    expect(
      screen.getByText("Details about system requirements here."),
    ).toBeVisible();
  });

  it("supports an adjacent governed header accessory", () => {
    render(
      <AppDisclosure
        title="Files"
        headerAccessory={<AppButton aria-label="Settings">Settings</AppButton>}
      >
        Files content
      </AppDisclosure>,
    );

    expect(screen.getByRole("button", { name: /files/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /settings/i })).toBeVisible();
  });

  it("rejects missing title in development", () => {
    expect(() =>
      // @ts-expect-error intentional runtime contract coverage
      render(<AppDisclosure>Panel content</AppDisclosure>),
    ).toThrow("AppDisclosure requires a title.");
  });
});
