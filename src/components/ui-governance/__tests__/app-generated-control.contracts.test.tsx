/**
 * @afenda-owner governance
 * @afenda-subject ui
 * @afenda-artifact test
 * @afenda-boundary test
 * @afenda-description Runtime contract coverage for generated governed React Aria primitives
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, Input } from "react-aria-components";

import { AppButton } from "@/components/ui-governance/app-button/app-button.control.primitive.client";
import { AppDatePicker } from "@/components/ui-governance/app-date-picker/app-date-picker.control.primitive.client";
import { AppDisclosureGroup } from "@/components/ui-governance/app-disclosure-group/app-disclosure-group.control.primitive.client";
import { AppDropZone } from "@/components/ui-governance/app-drop-zone/app-drop-zone.control.primitive.client";
import { AppFileTrigger } from "@/components/ui-governance/app-file-trigger/app-file-trigger.control.primitive.client";
import { AppForm } from "@/components/ui-governance/app-form/app-form.control.primitive.client";
import { AppGroup } from "@/components/ui-governance/app-group/app-group.control.primitive.client";
import { AppGridList, AppGridListItem, AppGridListText } from "@/components/ui-governance/app-grid-list/app-grid-list.control.primitive.client";
import { AppLink } from "@/components/ui-governance/app-link/app-link.control.primitive.client";
import { AppListBox, AppListBoxItem, AppListBoxText } from "@/components/ui-governance/app-list-box/app-list-box.control.primitive.client";
import { AppMeter } from "@/components/ui-governance/app-meter/app-meter.control.primitive.client";
import { AppMenu } from "@/components/ui-governance/app-menu/app-menu.control.primitive.client";
import { AppModal } from "@/components/ui-governance/app-modal/app-modal.control.primitive.client";
import { AppPopover } from "@/components/ui-governance/app-popover/app-popover.control.primitive.client";
import { AppProgressBar } from "@/components/ui-governance/app-progress-bar/app-progress-bar.control.primitive.client";
import { AppRadio, AppRadioGroup } from "@/components/ui-governance/app-radio-group/app-radio-group.control.primitive.client";
import { AppRangeCalendar } from "@/components/ui-governance/app-range-calendar/app-range-calendar.control.primitive.client";
import { AppSearchField } from "@/components/ui-governance/app-search-field/app-search-field.control.primitive.client";
import { AppSelect, AppSelectItem } from "@/components/ui-governance/app-select/app-select.control.primitive.client";
import { AppSeparator } from "@/components/ui-governance/app-separator/app-separator.control.primitive.client";
import { AppSwitch } from "@/components/ui-governance/app-switch/app-switch.control.primitive.client";
import { AppTable } from "@/components/ui-governance/app-table/app-table.control.primitive.client";
import { AppTagGroup } from "@/components/ui-governance/app-tag-group/app-tag-group.control.primitive.client";
import { AppTabs } from "@/components/ui-governance/app-tabs/app-tabs.control.primitive.client";
import { AppTree, AppTreeItem } from "@/components/ui-governance/app-tree/app-tree.control.primitive.client";
import { AppInput, AppTextField } from "@/components/ui-governance/app-text-field/app-text-field.control.primitive.client";
import { AppVirtualizer } from "@/components/ui-governance/app-virtualizer/app-virtualizer.control.primitive.client";
import { ListLayout } from "react-aria-components";

describe("generated governed primitives", () => {
  it("renders a valid simple button boundary", () => {
    render(<AppButton>Save</AppButton>);

    expect(screen.getByRole("button", { name: "Save" })).toBeVisible();
  });

  it("renders a valid text field boundary", () => {
    render(
      <AppTextField aria-label="Name">
        <AppInput />
      </AppTextField>,
    );

    expect(screen.getByRole("textbox", { name: "Name" })).toBeVisible();
  });

  it("renders a valid separator boundary", () => {
    render(<AppSeparator data-testid="separator" />);

    expect(screen.getByTestId("separator")).toBeVisible();
  });

  it("throws when AppSelect omits accessible naming", () => {
    expect(() =>
      render(
        <AppSelect>
          <AppSelectItem id="draft">Draft</AppSelectItem>
        </AppSelect>,
      ),
    ).toThrow("AppSelect requires label, aria-label, or aria-labelledby.");
  });

  it("throws when AppDatePicker omits accessible naming", () => {
    expect(() =>
      render(<AppDatePicker />),
    ).toThrow("AppDatePicker requires label, aria-label, or aria-labelledby.");
  });

  it("throws when AppDisclosureGroup omits its AppDisclosure child", () => {
    expect(() =>
      render(
        <AppDisclosureGroup>
          <div>Invalid</div>
        </AppDisclosureGroup>,
      ),
    ).toThrow("AppDisclosureGroup requires AppDisclosure as a direct child.");
  });

  it("throws when AppDropZone omits accessible naming", () => {
    expect(() =>
      render(
        <AppDropZone>
          <span>Drop files</span>
        </AppDropZone>,
      ),
    ).toThrow("AppDropZone requires label, aria-label, or aria-labelledby.");
  });

  it("throws when AppTable omits its TableHeader child", () => {
    expect(() =>
      render(
        <AppTable aria-label="Records">
          <div>Invalid</div>
        </AppTable>,
      ),
    ).toThrow("AppTable requires AppTableHeader as a direct child.");
  });

  it("throws when AppTabs omits its TabList child", () => {
    expect(() =>
      render(
        <AppTabs>
          <div>Invalid</div>
        </AppTabs>,
      ),
    ).toThrow("AppTabs requires AppTabList as a direct child.");
  });

  it("throws when AppTagGroup omits its TagList child", () => {
    expect(() =>
      render(
        <AppTagGroup aria-label="Filters">
          <div>Invalid</div>
        </AppTagGroup>,
      ),
    ).toThrow("AppTagGroup requires AppTagList as a direct child.");
  });

  it("throws when AppTree omits accessible naming", () => {
    expect(() =>
      render(
        <AppTree>
          <AppTreeItem id="docs" title="Documents" />
        </AppTree>,
      ),
    ).toThrow("AppTree requires aria-label or aria-labelledby.");
  });

  it("throws when AppVirtualizer receives a non-governed direct child", () => {
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

  it("throws when AppFileTrigger receives multiple direct children", () => {
    expect(() =>
      render(
        <AppFileTrigger>
          {[
            <Button key="one">Upload</Button>,
            <Button key="two">Another</Button>,
          ]}
        </AppFileTrigger>,
      ),
    ).toThrow("AppFileTrigger requires exactly one direct React element child.");
  });

  it("throws when AppForm omits its children", () => {
    expect(() => render(<AppForm>{null}</AppForm>)).toThrow(
      "AppForm requires children.",
    );
  });

  it("throws when AppGroup omits its children", () => {
    expect(() => render(<AppGroup>{null}</AppGroup>)).toThrow(
      "AppGroup requires children.",
    );
  });

  it("throws when AppLink omits both visible content and accessible naming", () => {
    expect(() => render(<AppLink />)).toThrow(
      "AppLink requires children, aria-label, or aria-labelledby.",
    );
  });

  it("throws when AppListBox omits accessible naming", () => {
    expect(() =>
      render(
        <AppListBox>
          <AppListBoxItem textValue="Missing label">
            <AppListBoxText>Missing label</AppListBoxText>
          </AppListBoxItem>
        </AppListBox>,
      ),
    ).toThrow("AppListBox requires aria-label or aria-labelledby.");
  });

  it("throws when AppMenu omits its children", () => {
    expect(() => render(<AppMenu>{null}</AppMenu>)).toThrow(
      "AppMenu requires explicit AppMenuItem children or an item renderer.",
    );
  });

  it("throws when AppMeter omits accessible naming", () => {
    expect(() => render(<AppMeter value={35} />)).toThrow(
      "AppMeter requires label, aria-label, or aria-labelledby.",
    );
  });

  it("throws when AppModal omits its children", () => {
    expect(() => render(<AppModal isOpen>{null}</AppModal>)).toThrow(
      "AppModal requires children.",
    );
  });

  it("throws when AppPopover omits its children", () => {
    expect(() => render(<AppPopover>{null}</AppPopover>)).toThrow(
      "AppPopover requires children.",
    );
  });

  it("throws when AppProgressBar omits accessible naming", () => {
    expect(() => render(<AppProgressBar value={25} />)).toThrow(
      "AppProgressBar requires label, aria-label, or aria-labelledby.",
    );
  });

  it("throws when AppRadioGroup omits accessible naming", () => {
    expect(() =>
      render(
        <AppRadioGroup>
          <AppRadio value="cat">Cat</AppRadio>
        </AppRadioGroup>,
      ),
    ).toThrow("AppRadioGroup requires label, aria-label, or aria-labelledby.");
  });

  it("throws when AppRangeCalendar omits accessible naming", () => {
    expect(() => render(<AppRangeCalendar />)).toThrow(
      "AppRangeCalendar requires label, aria-label, or aria-labelledby.",
    );
  });

  it("throws when AppSearchField omits accessible naming", () => {
    expect(() => render(<AppSearchField />)).toThrow(
      "AppSearchField requires label, aria-label, or aria-labelledby.",
    );
  });

  it("throws when AppSwitch omits visible and programmatic labeling", () => {
    expect(() => render(<AppSwitch />)).toThrow(
      "AppSwitch requires children, aria-label, or aria-labelledby.",
    );
  });

  it("throws when AppGridList omits accessible naming", () => {
    expect(() =>
      render(
        <AppGridList>
          <AppGridListItem textValue="Missing label">
            <AppGridListText>Missing label</AppGridListText>
          </AppGridListItem>
        </AppGridList>,
      ),
    ).toThrow("AppGridList requires aria-label or aria-labelledby.");
  });
});
