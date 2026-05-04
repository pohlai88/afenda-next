/**
 * @afenda-owner app-list-box
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-list-box explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AppListBox,
  AppListBoxHeader,
  AppListBoxItem,
  AppListBoxLoadMoreItem,
  AppListBoxSection,
  AppListBoxText,
} from "@/components/ui-governance/app-list-box/app-list-box.control.primitive.client";

describe("AppListBox", () => {
  it("renders a governed labeled listbox with owned text slots and selection affordances", () => {
    render(
      <AppListBox aria-label="Sandwich contents" selectionMode="multiple">
        <AppListBoxItem textValue="Lettuce">
          <AppListBoxText slot="label">Lettuce</AppListBoxText>
          <AppListBoxText slot="description">Fresh produce</AppListBoxText>
        </AppListBoxItem>
        <AppListBoxItem textValue="Cheese">
          <AppListBoxText slot="label">Cheese</AppListBoxText>
          <AppListBoxText slot="description">Dairy</AppListBoxText>
        </AppListBoxItem>
      </AppListBox>,
    );

    expect(screen.getByRole("listbox", { name: "Sandwich contents" })).toBeVisible();
    expect(screen.getByText("Lettuce")).toBeVisible();
    expect(screen.getByText("Fresh produce")).toBeVisible();
    expect(screen.getByText("Cheese")).toBeVisible();
  });

  it("renders sections and a load-more sentinel", () => {
    const intersectionObserver = class IntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    };

    Object.defineProperty(window, "IntersectionObserver", {
      configurable: true,
      writable: true,
      value: intersectionObserver,
    });
    Object.defineProperty(globalThis, "IntersectionObserver", {
      configurable: true,
      writable: true,
      value: intersectionObserver,
    });

    render(
      <AppListBox aria-label="Sandwich groups">
        <AppListBoxSection>
          <AppListBoxHeader>Veggies</AppListBoxHeader>
          <AppListBoxItem textValue="Tomato">
            <AppListBoxText>Tomato</AppListBoxText>
          </AppListBoxItem>
        </AppListBoxSection>
        <AppListBoxLoadMoreItem isLoading />
      </AppListBox>,
    );

    expect(screen.getByText("Veggies")).toBeVisible();
    expect(screen.getByLabelText("Loading more...")).toBeVisible();
  });

  it("rejects missing accessible naming in development", () => {
    expect(() =>
      render(
        <AppListBox>
          <AppListBoxItem textValue="Unnamed">
            <AppListBoxText>Unnamed</AppListBoxText>
          </AppListBoxItem>
        </AppListBox>,
      ),
    ).toThrow("AppListBox requires aria-label or aria-labelledby.");
  });
});
