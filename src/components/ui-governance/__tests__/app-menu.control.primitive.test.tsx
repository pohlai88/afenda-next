/**
 * @afenda-owner app-menu
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-menu explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "react-aria-components";

import {
  AppMenu,
  AppMenuHeader,
  AppMenuItem,
  AppMenuKeyboard,
  AppMenuSection,
  AppMenuSeparator,
  AppMenuText,
  AppMenuTrigger,
} from "@/components/ui-governance/app-menu/app-menu.control.primitive.client";

describe("AppMenu", () => {
  it("renders a governed command menu with sections, separators, and shortcut text", () => {
    render(
      <AppMenu aria-label="File actions">
        <AppMenuSection>
          <AppMenuHeader>File</AppMenuHeader>
          <AppMenuItem textValue="Open">
            <AppMenuText slot="label">Open</AppMenuText>
            <AppMenuKeyboard>Cmd+O</AppMenuKeyboard>
          </AppMenuItem>
          <AppMenuItem textValue="Rename">
            <AppMenuText slot="label">Rename</AppMenuText>
            <AppMenuText slot="description">Update the current file name</AppMenuText>
          </AppMenuItem>
        </AppMenuSection>
        <AppMenuSeparator />
        <AppMenuItem textValue="Delete">Delete</AppMenuItem>
      </AppMenu>,
    );

    expect(screen.getByRole("menu", { name: "File actions" })).toBeVisible();
    expect(screen.getByText("File")).toBeVisible();
    expect(screen.getByText("Open")).toBeVisible();
    expect(screen.getByText("Cmd+O")).toBeVisible();
    expect(screen.getByText("Update the current file name")).toBeVisible();
    expect(screen.getByText("Delete")).toBeVisible();
  });

  it("opens a governed popover shell from AppMenuTrigger", () => {
    render(
      <AppMenuTrigger defaultOpen>
        <Button aria-label="Actions">Actions</Button>
        <AppMenu aria-label="Record actions">
          <AppMenuItem textValue="Open">Open</AppMenuItem>
        </AppMenu>
      </AppMenuTrigger>,
    );

    expect(
      screen.getByRole("button", { name: "Actions", hidden: true }),
    ).toBeInTheDocument();
    expect(screen.getByRole("menu")).toBeVisible();
    expect(screen.getByText("Open")).toBeVisible();
  });

  it("rejects missing children in development", () => {
    expect(() => render(<AppMenu>{null}</AppMenu>)).toThrow(
      "AppMenu requires explicit AppMenuItem children or an item renderer.",
    );
  });

  it("rejects invalid trigger composition in development", () => {
    expect(() =>
      render(
        <AppMenuTrigger>
          <Button>Actions</Button>
        </AppMenuTrigger>,
      ),
    ).toThrow("AppMenuTrigger requires exactly two direct React element children.");
  });
});
