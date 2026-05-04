/**
 * @afenda-owner app-search-autocomplete
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-search-autocomplete explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Input,
  ListBox,
  ListBoxItem,
  TextField,
} from "react-aria-components";

import { AppSearchAutocomplete } from "@/components/ui-governance/app-search-autocomplete/app-search-autocomplete.control.primitive.client";

describe("AppSearchAutocomplete", () => {
  it("renders valid direct children and applies explicit container styling", () => {
    const children = [
      <TextField key="input" aria-label="Search results">
        <Input />
      </TextField>,
      <ListBox key="collection" aria-label="Results">
        <ListBoxItem id="one">One</ListBoxItem>
      </ListBox>,
    ] as const;

    const { container } = render(
      <AppSearchAutocomplete
        layout="inline"
        density="compact"
        containerClassName="test-container"
      >
        {children}
      </AppSearchAutocomplete>,
    );

    expect(screen.getByRole("textbox", { name: "Search results" })).toBeVisible();
    expect(screen.getByRole("listbox", { name: "Results" })).toBeVisible();
    expect(container.firstElementChild).toHaveClass(
      "flex-row",
      "items-center",
      "text-label",
      "test-container",
    );
  });

  it("throws when the first direct child is not SearchField or TextField", () => {
    expect(() =>
      render(
        <AppSearchAutocomplete>
          {[
            <div key="invalid-input">Invalid</div>,
            <ListBox key="collection" aria-label="Results">
              <ListBoxItem id="one">One</ListBoxItem>
            </ListBox>,
          ] as const}
        </AppSearchAutocomplete>,
      ),
    ).toThrow(
      "AppSearchAutocomplete requires SearchField or TextField as the first direct child.",
    );
  });

  it("throws when the second direct child is not a filterable collection", () => {
    expect(() =>
      render(
        <AppSearchAutocomplete>
          {[
            <TextField key="input" aria-label="Search results">
              <Input />
            </TextField>,
            <div key="invalid-collection">Invalid</div>,
          ] as const}
        </AppSearchAutocomplete>,
      ),
    ).toThrow(
      "AppSearchAutocomplete requires Menu, ListBox, TagGroup, GridList, or Table as the second direct child.",
    );
  });
});
