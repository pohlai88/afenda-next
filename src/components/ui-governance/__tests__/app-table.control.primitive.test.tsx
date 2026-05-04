/**
 * @afenda-owner app-table
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-table explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AppCell,
  AppColumn,
  AppRow,
  AppTable,
  AppTableBody,
  AppTableHeader,
  AppTableLoadMoreItem,
} from "@/components/ui-governance/app-table/app-table.control.primitive.client";

describe("AppTable", () => {
  it("renders a governed selectable and sortable operator table", () => {
    render(
      <AppTable
        aria-label="Open invoices"
        selectionMode="multiple"
        sortDescriptor={{ column: "invoice", direction: "ascending" }}
      >
        <AppTableHeader>
          <AppColumn id="invoice" isRowHeader allowsSorting>
            Invoice
          </AppColumn>
          <AppColumn id="customer">Customer</AppColumn>
          <AppColumn id="status">Status</AppColumn>
        </AppTableHeader>
        <AppTableBody>
          <AppRow id="inv-1001">
            <AppCell>INV-1001</AppCell>
            <AppCell>Atlas Foods</AppCell>
            <AppCell>Pending approval</AppCell>
          </AppRow>
          <AppRow id="inv-1002">
            <AppCell>INV-1002</AppCell>
            <AppCell>Northline Retail</AppCell>
            <AppCell>Ready to post</AppCell>
          </AppRow>
        </AppTableBody>
      </AppTable>,
    );

    expect(screen.getByRole("grid", { name: "Open invoices" })).toBeVisible();
    expect(screen.getByText("INV-1001")).toBeVisible();
    expect(screen.getByText("Northline Retail")).toBeVisible();
    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
  });

  it("renders hierarchical rows and a governed load more sentinel", () => {
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
      <AppTable
        aria-label="Document tree"
        treeColumn="name"
        defaultExpandedKeys={["documents"]}
      >
        <AppTableHeader>
          <AppColumn id="name" isRowHeader>
            Name
          </AppColumn>
          <AppColumn id="type">Type</AppColumn>
        </AppTableHeader>
        <AppTableBody>
          <AppRow id="documents">
            <AppCell>Documents</AppCell>
            <AppCell>Folder</AppCell>
            <AppRow id="budget">
              <AppCell>Budget FY26</AppCell>
              <AppCell>Spreadsheet</AppCell>
            </AppRow>
          </AppRow>
          <AppTableLoadMoreItem isLoading />
        </AppTableBody>
      </AppTable>,
    );

    expect(screen.getByText("Documents")).toBeVisible();
    expect(screen.getByText("Budget FY26")).toBeVisible();
    expect(screen.getByLabelText("Loading more rows...")).toBeVisible();
  });

  it("rejects missing accessible naming in development", () => {
    expect(() =>
      render(
        <AppTable>
          <AppTableHeader>
            <AppColumn id="invoice" isRowHeader>
              Invoice
            </AppColumn>
          </AppTableHeader>
          <AppTableBody>
            <AppRow id="inv-1001">
              <AppCell>INV-1001</AppCell>
            </AppRow>
          </AppTableBody>
        </AppTable>,
      ),
    ).toThrow("AppTable requires aria-label or aria-labelledby.");
  });
});
