/**
 * @afenda-owner interface-lab
 * @afenda-subject codegen
 * @afenda-boundary automation
 * @afenda-description Preview module bodies for Interface Lab registry codegen (run from scripts only).
 *
 * Some previews import `react-aria-components` child slots where a governed `App*` wrapper does not
 * exist for a required composition edge (for example `Group` inside `AppNumberField`).
 */
import type { ApprovedComponentManifest } from "../src/components/ui-governance/governance.ui.manifest.shared";

export type RegistryPreviewSnippet = {
  importLines: string[];
  body: string;
};

function genericAriaLabeled(m: ApprovedComponentManifest): RegistryPreviewSnippet {
  return {
    importLines: [`import { ${m.exportName} } from "${m.sourcePath}";`],
    body: `<${m.exportName} aria-label="Interface lab preview" />`,
  };
}

function genericWithChildText(m: ApprovedComponentManifest, text: string): RegistryPreviewSnippet {
  return {
    importLines: [`import { ${m.exportName} } from "${m.sourcePath}";`],
    body: `<${m.exportName} aria-label="Interface lab preview">${text}</${m.exportName}>`,
  };
}

/** @public — used by generate automation */
export function getRegistryPreviewSnippet(m: ApprovedComponentManifest): RegistryPreviewSnippet {
  switch (m.id) {
    case "app-button":
      return {
        importLines: [`import { AppButton } from "${m.sourcePath}";`],
        body: `<AppButton>Sample action</AppButton>`,
      };
    case "app-link":
      return {
        importLines: [`import { AppLink } from "${m.sourcePath}";`],
        body: `<AppLink href="/interface-lab">Interface Lab</AppLink>`,
      };
    case "app-text-field":
      return {
        importLines: [
          `import { AppTextField, AppInput } from "${m.sourcePath}";`,
        ],
        body: `<AppTextField aria-label="Preview field"><AppInput placeholder="Sample" /></AppTextField>`,
      };
    case "app-number-field":
      return {
        importLines: [
          `import { Group, Input, Label } from "react-aria-components";`,
          `import { AppNumberField } from "${m.sourcePath}";`,
        ],
        body: `<AppNumberField aria-label="Preview amount" defaultValue={1}><Group className="flex items-center gap-2"><Label>Qty</Label><Input className="border-border bg-field rounded-(--radius-control) border px-2 py-1" /></Group></AppNumberField>`,
      };
    case "app-search-field":
      return {
        importLines: [`import { AppSearchField } from "${m.sourcePath}";`],
        body: `<AppSearchField aria-label="Preview search" placeholder="Search…" />`,
      };
    case "app-separator":
      return {
        importLines: [`import { AppSeparator } from "${m.sourcePath}";`],
        body: `<AppSeparator />`,
      };
    case "app-switch":
      return {
        importLines: [`import { AppSwitch } from "${m.sourcePath}";`],
        body: `<AppSwitch aria-label="Preview toggle">Preview</AppSwitch>`,
      };
    case "app-checkbox":
      return {
        importLines: [`import { AppCheckbox } from "${m.sourcePath}";`],
        body: `<AppCheckbox aria-label="Preview checkbox">Preview option</AppCheckbox>`,
      };
    case "app-meter":
      return {
        importLines: [`import { AppMeter } from "${m.sourcePath}";`],
        body: `<AppMeter aria-label="Preview meter" value={40} minValue={0} maxValue={100} />`,
      };
    case "app-progress-bar":
      return {
        importLines: [`import { AppProgressBar } from "${m.sourcePath}";`],
        body: `<AppProgressBar aria-label="Preview progress" value={35} />`,
      };
    case "app-slider":
      return {
        importLines: [
          `import { SliderThumb, SliderTrack } from "react-aria-components";`,
          `import { AppSlider } from "${m.sourcePath}";`,
        ],
        body: `<AppSlider aria-label="Preview slider" defaultValue={30}><SliderTrack className="bg-surface-muted relative h-2 w-48 rounded-full"><SliderThumb className="bg-foreground top-1/2 size-4 rounded-full" /></SliderTrack></AppSlider>`,
      };
    case "app-radio-group":
      return {
        importLines: [
          `import { AppRadio, AppRadioGroup } from "${m.sourcePath}";`,
        ],
        body: `<AppRadioGroup aria-label="Preview choice" defaultValue="a"><AppRadio value="a">Option A</AppRadio><AppRadio value="b">Option B</AppRadio></AppRadioGroup>`,
      };
    case "app-select":
      return {
        importLines: [
          `import { AppSelect, AppSelectItem } from "${m.sourcePath}";`,
        ],
        body: `<AppSelect aria-label="Preview select" placeholder="Choose"><AppSelectItem id="a">Alpha</AppSelectItem><AppSelectItem id="b">Bravo</AppSelectItem></AppSelect>`,
      };
    case "app-combo-box":
      return {
        importLines: [
          `import { AppComboBox, AppComboBoxItem } from "${m.sourcePath}";`,
        ],
        body: `<AppComboBox label="Preview combobox" placeholder="Pick" menuTrigger="focus"><AppComboBoxItem id="x">One</AppComboBoxItem><AppComboBoxItem id="y">Two</AppComboBoxItem></AppComboBox>`,
      };
    case "app-menu":
      return {
        importLines: [
          `import { AppMenu, AppMenuItem } from "${m.sourcePath}";`,
        ],
        body: `<AppMenu aria-label="Preview menu"><AppMenuItem textValue="Cut">Cut</AppMenuItem><AppMenuItem textValue="Copy">Copy</AppMenuItem></AppMenu>`,
      };
    case "app-table":
      return {
        importLines: [
          `import { AppCell, AppColumn, AppRow, AppTable, AppTableBody, AppTableHeader } from "${m.sourcePath}";`,
        ],
        body: `<AppTable aria-label="Preview table"><AppTableHeader><AppColumn id="c1" isRowHeader>Name</AppColumn><AppColumn id="c2">Value</AppColumn></AppTableHeader><AppTableBody><AppRow id="r1"><AppCell>Row A</AppCell><AppCell>1</AppCell></AppRow></AppTableBody></AppTable>`,
      };
    case "app-tabs":
      return {
        importLines: [
          `import { AppTab, AppTabList, AppTabPanel, AppTabPanels, AppTabs } from "${m.sourcePath}";`,
        ],
        body: `<AppTabs selectedKey="a"><AppTabList aria-label="Preview tabs"><AppTab id="a">Tab A</AppTab><AppTab id="b">Tab B</AppTab></AppTabList><AppTabPanels><AppTabPanel id="a">Panel A</AppTabPanel><AppTabPanel id="b">Panel B</AppTabPanel></AppTabPanels></AppTabs>`,
      };
    case "app-modal":
      return {
        importLines: [`import { AppModal } from "${m.sourcePath}";`],
        body: `<AppModal isOpen aria-label="Preview modal"><div className="type-body p-4">Modal preview surface</div></AppModal>`,
      };
    case "app-popover":
      return {
        importLines: [
          `import { AppButton } from "@/components/ui-governance/app-button/app-button.control.primitive.client";`,
          `import { AppPopover, AppPopoverTrigger } from "${m.sourcePath}";`,
        ],
        body: `<AppPopoverTrigger><AppButton>Open</AppButton><AppPopover><p className="type-body-sm">Popover body</p></AppPopover></AppPopoverTrigger>`,
      };
    case "app-tooltip":
      return {
        importLines: [
          `import { AppButton } from "@/components/ui-governance/app-button/app-button.control.primitive.client";`,
          `import { AppTooltip, AppTooltipTrigger } from "${m.sourcePath}";`,
        ],
        body: `<AppTooltipTrigger><AppButton>Hover me</AppButton><AppTooltip>Tooltip copy</AppTooltip></AppTooltipTrigger>`,
      };
    case "app-toast":
      return {
        importLines: [`import { AppToastRegion } from "${m.sourcePath}";`],
        body: `<AppToastRegion />`,
      };
    case "app-form":
      return {
        importLines: [`import { AppForm } from "${m.sourcePath}";`],
        body: `<AppForm><p className="type-body-sm text-foreground-muted">Preview form shell</p></AppForm>`,
      };
    case "app-group":
      return {
        importLines: [`import { AppGroup } from "${m.sourcePath}";`],
        body: `<AppGroup><span className="type-body-sm">Grouped controls</span></AppGroup>`,
      };
    case "app-toolbar":
      return {
        importLines: [`import { AppToolbar } from "${m.sourcePath}";`],
        body: `<AppToolbar aria-label="Preview toolbar"><span className="type-body-sm">Toolbar preview</span></AppToolbar>`,
      };
    case "app-file-trigger":
      return {
        importLines: [
          `import { AppButton } from "@/components/ui-governance/app-button/app-button.control.primitive.client";`,
          `import { AppFileTrigger } from "${m.sourcePath}";`,
        ],
        body: `<AppFileTrigger><AppButton>Choose file</AppButton></AppFileTrigger>`,
      };
    case "app-drop-zone":
      return {
        importLines: [`import { AppDropZone } from "${m.sourcePath}";`],
        body: `<AppDropZone aria-label="Preview drop zone"><span className="type-body-sm">Drop files here</span></AppDropZone>`,
      };
    case "app-list-box":
      return {
        importLines: [
          `import { AppListBox, AppListBoxItem, AppListBoxText } from "${m.sourcePath}";`,
        ],
        body: `<AppListBox aria-label="Preview list" selectionMode="single"><AppListBoxItem id="1" textValue="One"><AppListBoxText>One</AppListBoxText></AppListBoxItem><AppListBoxItem id="2" textValue="Two"><AppListBoxText>Two</AppListBoxText></AppListBoxItem></AppListBox>`,
      };
    case "app-grid-list":
      return {
        importLines: [
          `import { AppGridList, AppGridListItem, AppGridListText } from "${m.sourcePath}";`,
        ],
        body: `<AppGridList aria-label="Preview grid list" items={[{ id: "1", name: "Alpha" }, { id: "2", name: "Beta" }]}>{(item) => (<AppGridListItem id={item.id} textValue={item.name}><AppGridListText>{item.name}</AppGridListText></AppGridListItem>)}</AppGridList>`,
      };
    case "app-tag-group":
      return {
        importLines: [
          `import { AppTagGroup, AppTagList, AppTag } from "${m.sourcePath}";`,
        ],
        body: `<AppTagGroup aria-label="Preview tags"><AppTagList><AppTag id="t1">Tag A</AppTag><AppTag id="t2">Tag B</AppTag></AppTagList></AppTagGroup>`,
      };
    case "app-tree":
      return {
        importLines: [
          `import { AppTree, AppTreeItem } from "${m.sourcePath}";`,
        ],
        body: `<AppTree aria-label="Preview tree"><AppTreeItem id="root" title="Root"><AppTreeItem id="child" title="Child" /></AppTreeItem></AppTree>`,
      };
    case "app-breadcrumbs":
      return {
        importLines: [
          `import { AppBreadcrumb, AppBreadcrumbs } from "${m.sourcePath}";`,
        ],
        body: `<AppBreadcrumbs><AppBreadcrumb href="/interface-lab">Lab</AppBreadcrumb><AppBreadcrumb>Preview</AppBreadcrumb></AppBreadcrumbs>`,
      };
    case "app-disclosure":
      return {
        importLines: [`import { AppDisclosure } from "${m.sourcePath}";`],
        body: `<AppDisclosure title="Preview disclosure"><p className="type-body-sm p-2">Panel body</p></AppDisclosure>`,
      };
    case "app-disclosure-group":
      return {
        importLines: [
          `import { AppDisclosure } from "@/components/ui-governance/app-disclosure/app-disclosure.control.primitive.client";`,
          `import { AppDisclosureGroup } from "${m.sourcePath}";`,
        ],
        body: `<AppDisclosureGroup><AppDisclosure id="d1" title="First"><p className="type-body-sm">One</p></AppDisclosure><AppDisclosure id="d2" title="Second"><p className="type-body-sm">Two</p></AppDisclosure></AppDisclosureGroup>`,
      };
    case "app-toggle-button":
      return {
        importLines: [`import { AppToggleButton } from "${m.sourcePath}";`],
        body: `<AppToggleButton aria-label="Preview toggle">Mode</AppToggleButton>`,
      };
    case "app-toggle-button-group":
      return {
        importLines: [
          `import { AppToggleButton } from "@/components/ui-governance/app-toggle-button/app-toggle-button.control.primitive.client";`,
          `import { AppToggleButtonGroup } from "${m.sourcePath}";`,
        ],
        body: `<AppToggleButtonGroup aria-label="Preview group" selectionMode="single"><AppToggleButton id="left">Left</AppToggleButton><AppToggleButton id="right">Right</AppToggleButton></AppToggleButtonGroup>`,
      };
    case "app-checkbox-group":
      return {
        importLines: [
          `import { AppCheckbox } from "@/components/ui-governance/app-checkbox/app-checkbox.control.primitive.client";`,
          `import { AppCheckboxGroup } from "${m.sourcePath}";`,
        ],
        body: `<AppCheckboxGroup aria-label="Preview group"><AppCheckbox value="a">A</AppCheckbox><AppCheckbox value="b">B</AppCheckbox></AppCheckboxGroup>`,
      };
    case "app-date-picker":
      return {
        importLines: [`import { AppDatePicker } from "${m.sourcePath}";`],
        body: `<AppDatePicker label="Preview date" />`,
      };
    case "app-date-field":
      return {
        importLines: [`import { AppDateField } from "${m.sourcePath}";`],
        body: `<AppDateField aria-label="Preview date field" />`,
      };
    case "app-date-range-picker":
      return {
        importLines: [`import { AppDateRangePicker } from "${m.sourcePath}";`],
        body: `<AppDateRangePicker aria-label="Preview range" />`,
      };
    case "app-time-field":
      return {
        importLines: [`import { AppTimeField } from "${m.sourcePath}";`],
        body: `<AppTimeField aria-label="Preview time" />`,
      };
    case "app-calendar":
      return {
        importLines: [
          `import { CalendarCell, CalendarGrid, CalendarGridBody, CalendarGridHeader, CalendarHeaderCell } from "react-aria-components";`,
          `import { AppCalendar } from "${m.sourcePath}";`,
        ],
        body: `<AppCalendar aria-label="Preview calendar"><CalendarGrid weekdayStyle="short" className="border-separate border-spacing-1"><CalendarGridHeader>{(day) => <CalendarHeaderCell className="text-xs text-foreground-muted">{day}</CalendarHeaderCell>}</CalendarGridHeader><CalendarGridBody>{(date) => <CalendarCell date={date} className="text-xs" />}</CalendarGridBody></CalendarGrid></AppCalendar>`,
      };
    case "app-range-calendar":
      return {
        importLines: [`import { AppRangeCalendar } from "${m.sourcePath}";`],
        body: `<AppRangeCalendar aria-label="Preview range calendar" />`,
      };
    case "app-color-area":
      return {
        importLines: [`import { AppColorArea } from "${m.sourcePath}";`],
        body: `<AppColorArea aria-label="Preview color area" xChannel="saturation" yChannel="lightness" defaultValue="hsl(210, 80%, 50%)" />`,
      };
    case "app-color-field":
      return {
        importLines: [`import { AppColorField } from "${m.sourcePath}";`],
        body: `<AppColorField aria-label="Preview color field" defaultValue="#3366cc" />`,
      };
    case "app-color-picker":
      return {
        importLines: [`import { AppColorPicker } from "${m.sourcePath}";`],
        body: `<AppColorPicker aria-label="Preview color picker" defaultValue="hsl(210, 80%, 50%)" />`,
      };
    case "app-color-slider":
      return {
        importLines: [`import { AppColorSlider } from "${m.sourcePath}";`],
        body: `<AppColorSlider aria-label="Preview color slider" channel="hue" defaultValue="hsl(210, 80%, 50%)" />`,
      };
    case "app-color-swatch":
      return {
        importLines: [`import { AppColorSwatch } from "${m.sourcePath}";`],
        body: `<AppColorSwatch color="hsl(210, 80%, 50%)" />`,
      };
    case "app-color-swatch-picker":
      return {
        importLines: [
          `import { AppColorSwatchPicker, AppColorSwatchPickerItem } from "${m.sourcePath}";`,
        ],
        body: `<AppColorSwatchPicker aria-label="Preview swatches" defaultValue="hsl(210, 80%, 50%)"><AppColorSwatchPickerItem color="hsl(210, 80%, 50%)" /><AppColorSwatchPickerItem color="hsl(120, 60%, 45%)" /></AppColorSwatchPicker>`,
      };
    case "app-color-wheel":
      return {
        importLines: [`import { AppColorWheel } from "${m.sourcePath}";`],
        body: `<AppColorWheel aria-label="Preview color wheel" defaultValue="hsl(210, 80%, 50%)" />`,
      };
    case "app-virtualizer":
      return {
        importLines: [
          `import { AppListBox, AppListBoxItem, AppListBoxText } from "@/components/ui-governance/app-list-box/app-list-box.control.primitive.client";`,
          `import { AppVirtualizer } from "${m.sourcePath}";`,
          `import { ListLayout } from "react-aria-components";`,
        ],
        body: `<AppVirtualizer layout={ListLayout}><AppListBox aria-label="Preview virtual list" items={[{ id: "1", name: "A" }]}>{(item) => (<AppListBoxItem id={item.id} textValue={item.name}><AppListBoxText>{item.name}</AppListBoxText></AppListBoxItem>)}</AppListBox></AppVirtualizer>`,
      };
    case "app-autocomplete": {
      const path = m.sourcePath;
      return {
        importLines: [
          `import { AppAutocomplete } from "${path}";`,
          `import { ListBox, ListBoxItem, SearchField, Input } from "react-aria-components";`,
        ],
        body: `<AppAutocomplete><SearchField aria-label="Preview autocomplete"><Input /></SearchField><ListBox><ListBoxItem>Alpha</ListBoxItem><ListBoxItem>Beta</ListBoxItem></ListBox></AppAutocomplete>`,
      };
    }
    case "app-search-autocomplete": {
      const path = m.sourcePath;
      return {
        importLines: [
          `import { AppSearchAutocomplete } from "${path}";`,
          `import { ListBox, ListBoxItem, SearchField, Input } from "react-aria-components";`,
        ],
        body: `<AppSearchAutocomplete><SearchField aria-label="Preview lookup"><Input /></SearchField><ListBox><ListBoxItem id="1">Result 1</ListBoxItem></ListBox></AppSearchAutocomplete>`,
      };
    }
    default:
      return genericAriaLabeled(m);
  }
}
