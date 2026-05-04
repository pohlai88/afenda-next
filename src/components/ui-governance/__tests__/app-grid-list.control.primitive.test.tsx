/**
 * @afenda-owner app-grid-list
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-grid-list explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AppGridList,
  AppGridListHeader,
  AppGridListItem,
  AppGridListLoadMoreItem,
  AppGridListSection,
  AppGridListText,
} from "@/components/ui-governance/app-grid-list/app-grid-list.control.primitive.client";

describe("AppGridList", () => {
  it("renders governed sections and a load-more sentinel", () => {
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
      <AppGridList aria-label="Document groups">
        <AppGridListSection>
          <AppGridListHeader>Receivables</AppGridListHeader>
          <AppGridListItem textValue="Invoice 1001">
            <AppGridListText>Invoice 1001</AppGridListText>
          </AppGridListItem>
        </AppGridListSection>
        <AppGridListLoadMoreItem isLoading />
      </AppGridList>,
    );

    expect(screen.getByText("Receivables")).toBeVisible();
    expect(screen.getByLabelText("Loading more...")).toBeVisible();
  });

  it("renders a governed labeled grid list with owned item affordances", () => {
    render(
      <AppGridList aria-label="Asset gallery" layout="grid" selectionMode="multiple">
        <AppGridListItem textValue="Invoice PDF">
          <AppGridListText>Invoice PDF</AppGridListText>
          <AppGridListText slot="description">PDF • 1.2 MB</AppGridListText>
        </AppGridListItem>
        <AppGridListItem textValue="Packing slip">
          <AppGridListText>Packing slip</AppGridListText>
          <AppGridListText slot="description">PNG • 420 KB</AppGridListText>
        </AppGridListItem>
      </AppGridList>,
    );

    expect(screen.getByRole("grid", { name: "Asset gallery" })).toBeVisible();
    expect(screen.getByText("Invoice PDF")).toBeVisible();
    expect(screen.getByText("Packing slip")).toBeVisible();
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
  });

  it("rejects missing accessible naming in development", () => {
    expect(() =>
      render(
        <AppGridList>
          <AppGridListItem textValue="Unnamed">
            <AppGridListText>Unnamed</AppGridListText>
          </AppGridListItem>
        </AppGridList>,
      ),
    ).toThrow("AppGridList requires aria-label or aria-labelledby.");
  });
});
