/**
 * @afenda-owner app-tree
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-tree explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AppTree,
  AppTreeHeader,
  AppTreeItem,
  AppTreeSection,
} from "@/components/ui-governance/app-tree/app-tree.control.primitive.client";

describe("AppTree", () => {
  it("renders a governed hierarchical tree", () => {
    render(
      <AppTree aria-label="Files" defaultExpandedKeys={["documents", "project"]}>
        <AppTreeItem id="documents" title="Documents">
          <AppTreeItem id="project" title="Project">
            <AppTreeItem id="report" title="Weekly Report" />
          </AppTreeItem>
        </AppTreeItem>
        <AppTreeItem id="photos" title="Photos">
          <AppTreeItem id="image-1" title="Image 1" />
          <AppTreeItem id="image-2" title="Image 2" />
        </AppTreeItem>
      </AppTree>,
    );

    expect(screen.getByRole("treegrid", { name: "Files" })).toBeVisible();
    expect(screen.getByRole("row", { name: /Documents/i })).toBeVisible();
    expect(screen.getByRole("row", { name: /Weekly Report/i })).toBeVisible();
  });

  it("renders sectioned trees with governed headers", () => {
    render(
      <AppTree aria-label="Libraries">
        <AppTreeSection>
          <AppTreeHeader>Photos</AppTreeHeader>
          <AppTreeItem id="shared" title="Shared Photos" />
        </AppTreeSection>
      </AppTree>,
    );

    expect(screen.getByText("Photos")).toBeVisible();
    expect(screen.getByRole("row", { name: /Shared Photos/i })).toBeVisible();
  });

  it("rejects unnamed trees in development", () => {
    expect(() =>
      render(
        <AppTree>
          <AppTreeItem id="documents" title="Documents" />
        </AppTree>,
      ),
    ).toThrow("AppTree requires aria-label or aria-labelledby.");
  });
});
