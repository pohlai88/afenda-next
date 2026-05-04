/**
 * @afenda-owner app-button
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-button explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AppButton } from "@/components/ui-governance/app-button/app-button.control.primitive.client";

describe("AppButton", () => {
  it("renders the semantic primary action styling", () => {
    render(<AppButton variant="primary">Save</AppButton>);

    expect(screen.getByRole("button", { name: "Save" })).toHaveClass(
      "bg-accent",
      "text-accent-foreground",
    );
  });

  it("calls onPress for normalized user interactions", async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();

    render(<AppButton onPress={onPress}>Submit</AppButton>);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("keeps the button label in the DOM while showing a pending spinner", () => {
    const { container } = render(
      <AppButton isPending pendingLabel="Saving progress">
        Saving
      </AppButton>,
    );

    expect(screen.getByRole("button", { name: "Saving" })).toBeVisible();
    expect(
      screen.getByRole("progressbar", { name: "Saving progress" }),
    ).toBeVisible();
    expect(container.querySelector("span.opacity-0")).toBeTruthy();
    expect(container.querySelector("svg.animate-spin")).toBeTruthy();
  });
});
