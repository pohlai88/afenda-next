/**
 * @afenda-owner app-link
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-link explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppLink } from "@/components/ui-governance/app-link/app-link.control.primitive.client";

describe("AppLink", () => {
  it("renders a governed anchor link with owned inline navigation styling", () => {
    const { container } = render(
      <AppLink href="/orders/123">Open order</AppLink>,
    );

    expect(screen.getByRole("link", { name: "Open order" })).toBeVisible();
    expect(container.firstElementChild).toHaveClass("type-body-sm");
    expect(container.firstElementChild).toHaveClass("text-accent-strong");
    expect(container.firstElementChild).toHaveClass("underline");
  });

  it("supports compact neutral press-only links without href", () => {
    const { container } = render(
      <AppLink aria-label="View audit history" size="compact" tone="neutral" onPress={() => undefined} />,
    );

    expect(screen.getByRole("link", { name: "View audit history" })).toBeVisible();
    expect(container.firstElementChild?.tagName).toBe("SPAN");
    expect(container.firstElementChild).toHaveClass("type-meta");
    expect(container.firstElementChild).toHaveClass("text-foreground-subtle");
  });

  it("rejects empty unlabeled links in development", () => {
    expect(() => render(<AppLink />)).toThrow(
      "AppLink requires children, aria-label, or aria-labelledby.",
    );
  });
});
