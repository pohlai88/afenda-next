/**
 * @afenda-owner app-disclosure-group
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-disclosure-group explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppDisclosure } from "@/components/ui-governance/app-disclosure/app-disclosure.control.primitive.client";
import { AppDisclosureGroup } from "@/components/ui-governance/app-disclosure-group/app-disclosure-group.control.primitive.client";

describe("AppDisclosureGroup", () => {
  it("renders a governed disclosure group with AppDisclosure children", () => {
    render(
      <AppDisclosureGroup>
        <AppDisclosure title="Personal information">
          Personal information form here.
        </AppDisclosure>
        <AppDisclosure title="Billing address">
          Billing address form here.
        </AppDisclosure>
      </AppDisclosureGroup>,
    );

    expect(
      screen.getByRole("button", { name: /personal information/i }),
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: /billing address/i }),
    ).toBeVisible();
  });

  it("rejects non-AppDisclosure direct children in development", () => {
    expect(() =>
      render(
        <AppDisclosureGroup>
          <div>Invalid</div>
        </AppDisclosureGroup>,
      ),
    ).toThrow("AppDisclosureGroup requires AppDisclosure as a direct child.");
  });
});
