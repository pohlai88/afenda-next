/**
 * @afenda-owner app-virtualizer
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-virtualizer explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { ListLayout } from "react-aria-components";
import { describe, expect, it } from "vitest";

import {
  AppListBox,
  AppListBoxItem,
} from "@/components/ui-governance/app-list-box/app-list-box.control.primitive.client";
import { AppVirtualizer } from "@/components/ui-governance/app-virtualizer/app-virtualizer.control.primitive.client";

describe("AppVirtualizer", () => {
  it("renders a governed virtualized list boundary", () => {
    render(
      <AppVirtualizer layout={ListLayout}>
        <AppListBox
          aria-label="Virtualized Items"
          items={[
            { id: "one", name: "Item 1" },
            { id: "two", name: "Item 2" },
            { id: "three", name: "Item 3" },
          ]}
          style={{ display: "block", height: 240, padding: 0 }}
        >
          {(item) => <AppListBoxItem id={item.id}>{item.name}</AppListBoxItem>}
        </AppListBox>
      </AppVirtualizer>,
    );

    expect(
      screen.getByRole("listbox", { name: "Virtualized Items" }),
    ).toBeVisible();
    expect(screen.getByRole("option", { name: "Item 1" })).toBeVisible();
  });

  it("rejects invalid direct children in development", () => {
    expect(() =>
      render(
        <AppVirtualizer layout={ListLayout}>
          <div>Invalid</div>
        </AppVirtualizer>,
      ),
    ).toThrow(
      "AppVirtualizer requires one of AppListBox, AppGridList, AppTable as a direct child.",
    );
  });

  it("rejects missing children in development", () => {
    expect(() =>
      render(<AppVirtualizer layout={ListLayout}>{null}</AppVirtualizer>),
    ).toThrow("AppVirtualizer requires a single governed collection child.");
  });
});
