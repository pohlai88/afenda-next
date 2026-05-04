/**
 * @afenda-owner app-tag-group
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-tag-group explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AppTag,
  AppTagGroup,
  AppTagList,
} from "@/components/ui-governance/app-tag-group/app-tag-group.control.primitive.client";

describe("AppTagGroup", () => {
  it("renders a governed labeled tag collection with owned tags", () => {
    render(
      <AppTagGroup label="Categories" selectionMode="multiple">
        <AppTagList>
          <AppTag id="news">News</AppTag>
          <AppTag id="travel">Travel</AppTag>
          <AppTag id="gaming">Gaming</AppTag>
        </AppTagList>
      </AppTagGroup>,
    );

    expect(screen.getByText("Categories")).toBeVisible();
    expect(screen.getByRole("grid")).toBeVisible();
    expect(screen.getByRole("row", { name: "News" })).toBeVisible();
  });

  it("renders dynamic removable tags through AppTagList items", () => {
    render(
      <AppTagGroup aria-label="Selected filters" onRemove={() => undefined}>
        <AppTagList
          items={[
            { id: "status-open", label: "Open" },
            { id: "priority-high", label: "High priority" },
          ]}
        >
          {(item) => <AppTag id={item.id}>{item.label}</AppTag>}
        </AppTagList>
      </AppTagGroup>,
    );

    expect(screen.getByRole("grid", { name: "Selected filters" })).toBeVisible();
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("rejects unnamed tag groups in development", () => {
    expect(() =>
      render(
        <AppTagGroup>
          <AppTagList>
            <AppTag id="news">News</AppTag>
          </AppTagList>
        </AppTagGroup>,
      ),
    ).toThrow("AppTagGroup requires label, aria-label, or aria-labelledby.");
  });
});
