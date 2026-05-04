/**
 * @afenda-owner app-group
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-group explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, Input } from "react-aria-components";

import { AppGroup } from "@/components/ui-governance/app-group/app-group.control.primitive.client";

describe("AppGroup", () => {
  it("renders a governed inline group shell for related controls", () => {
    const { container } = render(
      <AppGroup aria-label="Tax identifier">
        <Input aria-label="First 3 digits" />
        <span aria-hidden="true">-</span>
        <Input aria-label="Middle 2 digits" />
        <span aria-hidden="true">-</span>
        <Input aria-label="Last 4 digits" />
      </AppGroup>,
    );

    expect(screen.getByRole("group", { name: "Tax identifier" })).toBeVisible();
    expect(screen.getByRole("textbox", { name: "First 3 digits" })).toBeVisible();
    expect(container.firstElementChild).toHaveClass("field-control");
    expect(container.firstElementChild).toHaveClass("inline-flex");
  });

  it("supports compact stacked groups with governed interactive state styling", () => {
    const { container } = render(
      <AppGroup density="compact" isDisabled isInvalid isReadOnly layout="stack">
        <Button>Lookup</Button>
        <Button>Reset</Button>
      </AppGroup>,
    );

    expect(screen.getByRole("button", { name: "Lookup" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Reset" })).toBeVisible();
    expect(container.firstElementChild).toHaveClass("field-control-compact");
    expect(container.firstElementChild).toHaveClass("flex-col");
    expect(container.firstElementChild).toHaveAttribute("data-disabled");
    expect(container.firstElementChild).toHaveAttribute("data-invalid");
    expect(container.firstElementChild).toHaveAttribute("data-readonly");
  });

  it("rejects missing children in development", () => {
    expect(() => render(<AppGroup>{null}</AppGroup>)).toThrow(
      "AppGroup requires children.",
    );
  });
});
