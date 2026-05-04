/**
 * @afenda-owner app-breadcrumbs
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-breadcrumbs explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  AppBreadcrumb,
  AppBreadcrumbs,
} from "@/components/ui-governance/app-breadcrumbs/app-breadcrumbs.control.primitive.client";

describe("AppBreadcrumbs", () => {
  it("renders a static breadcrumb trail and omits the trailing separator", () => {
    const { container } = render(
      <AppBreadcrumbs aria-label="Location" size="compact">
        <AppBreadcrumb href="/home">Home</AppBreadcrumb>
        <AppBreadcrumb href="/catalog">Catalog</AppBreadcrumb>
        <AppBreadcrumb>Current record</AppBreadcrumb>
      </AppBreadcrumbs>,
    );

    const breadcrumbList = screen.getByRole("list", { name: "Location" });

    expect(breadcrumbList).toBeVisible();
    expect(screen.getByRole("link", { name: "Home" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Catalog" })).toBeVisible();
    expect(screen.getByText("Current record")).toBeVisible();
    expect(breadcrumbList).toHaveClass("text-label");

    const separators = container.querySelectorAll("svg[aria-hidden='true']");
    expect(separators).toHaveLength(2);
  });

  it("supports the collection API and calls onAction with the breadcrumb key", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    const items = [
      { id: 1, href: "/home", label: "Home" },
      { id: 2, href: "/orders", label: "Orders" },
      { id: 3, label: "Current order" },
    ] as const;

    render(
      <AppBreadcrumbs items={items} onAction={onAction}>
        {(item) => (
          <AppBreadcrumb
            id={item.id}
            {...("href" in item ? { href: item.href } : {})}
          >
            {item.label}
          </AppBreadcrumb>
        )}
      </AppBreadcrumbs>,
    );

    await user.click(screen.getByRole("link", { name: "Orders" }));

    expect(onAction).toHaveBeenCalledWith(2);
  });
});
