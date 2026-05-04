/**
 * @afenda-owner app-popover
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-popover explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "react-aria-components";

import {
  AppPopover,
  AppPopoverTrigger,
} from "@/components/ui-governance/app-popover/app-popover.control.primitive.client";

describe("AppPopover", () => {
  it("renders a governed anchored popover shell with optional arrow", () => {
    render(
      <AppPopoverTrigger defaultOpen>
        <Button aria-label="Settings">Settings</Button>
        <AppPopover showArrow>
          <div>Wi-Fi controls</div>
        </AppPopover>
      </AppPopoverTrigger>,
    );

    expect(
      screen.getByRole("button", { name: "Settings", hidden: true }),
    ).toBeInTheDocument();
    expect(screen.getByText("Wi-Fi controls")).toBeVisible();
    expect(document.querySelector("[data-app-popover-arrow]")).toBeInTheDocument();
  });

  it("supports controlled anchored popovers without an inline trigger wrapper", () => {
    const triggerRef = { current: document.createElement("button") };

    render(
      <AppPopover isOpen triggerRef={triggerRef}>
        <div>Anchored helper</div>
      </AppPopover>,
    );

    expect(screen.getByText("Anchored helper")).toBeVisible();
    expect(document.querySelector(".surface-raised")).toBeInTheDocument();
  });

  it("rejects missing children in development", () => {
    expect(() => render(<AppPopover>{null}</AppPopover>)).toThrow(
      "AppPopover requires children.",
    );
  });

  it("rejects invalid trigger composition in development", () => {
    expect(() =>
      render(
        <AppPopoverTrigger>
          <Button>Settings</Button>
        </AppPopoverTrigger>,
      ),
    ).toThrow(
      "AppPopoverTrigger requires exactly two direct React element children.",
    );
  });
});
