/**
 * @afenda-owner governance
 * @afenda-subject ui
 * @afenda-artifact registry
 * @afenda-boundary shared
 * @afenda-description Shared manifest registry aggregate with stable lookup maps for UI governance
 *
 * **New system:** manifests are registered only here (and co-located under `ui-governance/app-*`). There is no
 * `components.json` inventory and no separate aggregate module — this file is the manifest aggregate.
 *
 * Rules:
 * - Keep this file data-only (manifest imports + derived arrays/maps only).
 * - Do not add validation logic here (use `governance.ui.guard.shared.ts`).
 * - Add each new `app-*` manifest once to `uiGovernanceManifestList`.
 * - Do not import this full registry into Client Components.
 *
 * @see ./README.md
 */
import type { ApprovedComponentManifest } from "./governance.ui.manifest.shared";

import { appAutocompleteManifest } from "@/components/ui-governance/app-autocomplete/app-autocomplete.ui.manifest.shared";
import { appBreadcrumbsManifest } from "@/components/ui-governance/app-breadcrumbs/app-breadcrumbs.ui.manifest.shared";
import { appButtonManifest } from "@/components/ui-governance/app-button/app-button.ui.manifest.shared";
import { appCalendarManifest } from "@/components/ui-governance/app-calendar/app-calendar.ui.manifest.shared";
import { appCheckboxManifest } from "@/components/ui-governance/app-checkbox/app-checkbox.ui.manifest.shared";
import { appCheckboxGroupManifest } from "@/components/ui-governance/app-checkbox-group/app-checkbox-group.ui.manifest.shared";
import { appColorAreaManifest } from "@/components/ui-governance/app-color-area/app-color-area.ui.manifest.shared";
import { appColorFieldManifest } from "@/components/ui-governance/app-color-field/app-color-field.ui.manifest.shared";
import { appColorPickerManifest } from "@/components/ui-governance/app-color-picker/app-color-picker.ui.manifest.shared";
import { appColorSliderManifest } from "@/components/ui-governance/app-color-slider/app-color-slider.ui.manifest.shared";
import { appColorSwatchManifest } from "@/components/ui-governance/app-color-swatch/app-color-swatch.ui.manifest.shared";
import { appColorSwatchPickerManifest } from "@/components/ui-governance/app-color-swatch-picker/app-color-swatch-picker.ui.manifest.shared";
import { appColorWheelManifest } from "@/components/ui-governance/app-color-wheel/app-color-wheel.ui.manifest.shared";
import { appComboBoxManifest } from "@/components/ui-governance/app-combo-box/app-combo-box.ui.manifest.shared";
import { appDateFieldManifest } from "@/components/ui-governance/app-date-field/app-date-field.ui.manifest.shared";
import { appDatePickerManifest } from "@/components/ui-governance/app-date-picker/app-date-picker.ui.manifest.shared";
import { appDateRangePickerManifest } from "@/components/ui-governance/app-date-range-picker/app-date-range-picker.ui.manifest.shared";
import { appDisclosureManifest } from "@/components/ui-governance/app-disclosure/app-disclosure.ui.manifest.shared";
import { appDisclosureGroupManifest } from "@/components/ui-governance/app-disclosure-group/app-disclosure-group.ui.manifest.shared";
import { appDropZoneManifest } from "@/components/ui-governance/app-drop-zone/app-drop-zone.ui.manifest.shared";
import { appFileTriggerManifest } from "@/components/ui-governance/app-file-trigger/app-file-trigger.ui.manifest.shared";
import { appFormManifest } from "@/components/ui-governance/app-form/app-form.ui.manifest.shared";
import { appGridListManifest } from "@/components/ui-governance/app-grid-list/app-grid-list.ui.manifest.shared";
import { appGroupManifest } from "@/components/ui-governance/app-group/app-group.ui.manifest.shared";
import { appLinkManifest } from "@/components/ui-governance/app-link/app-link.ui.manifest.shared";
import { appListBoxManifest } from "@/components/ui-governance/app-list-box/app-list-box.ui.manifest.shared";
import { appMenuManifest } from "@/components/ui-governance/app-menu/app-menu.ui.manifest.shared";
import { appMeterManifest } from "@/components/ui-governance/app-meter/app-meter.ui.manifest.shared";
import { appModalManifest } from "@/components/ui-governance/app-modal/app-modal.ui.manifest.shared";
import { appNumberFieldManifest } from "@/components/ui-governance/app-number-field/app-number-field.ui.manifest.shared";
import { appPopoverManifest } from "@/components/ui-governance/app-popover/app-popover.ui.manifest.shared";
import { appProgressBarManifest } from "@/components/ui-governance/app-progress-bar/app-progress-bar.ui.manifest.shared";
import { appRadioGroupManifest } from "@/components/ui-governance/app-radio-group/app-radio-group.ui.manifest.shared";
import { appRangeCalendarManifest } from "@/components/ui-governance/app-range-calendar/app-range-calendar.ui.manifest.shared";
import { appSearchFieldManifest } from "@/components/ui-governance/app-search-field/app-search-field.ui.manifest.shared";
import { appSelectManifest } from "@/components/ui-governance/app-select/app-select.ui.manifest.shared";
import { appSeparatorManifest } from "@/components/ui-governance/app-separator/app-separator.ui.manifest.shared";
import { appSliderManifest } from "@/components/ui-governance/app-slider/app-slider.ui.manifest.shared";
import { appSwitchManifest } from "@/components/ui-governance/app-switch/app-switch.ui.manifest.shared";
import { appTableManifest } from "@/components/ui-governance/app-table/app-table.ui.manifest.shared";
import { appTabsManifest } from "@/components/ui-governance/app-tabs/app-tabs.ui.manifest.shared";
import { appTagGroupManifest } from "@/components/ui-governance/app-tag-group/app-tag-group.ui.manifest.shared";
import { appTextFieldManifest } from "@/components/ui-governance/app-text-field/app-text-field.ui.manifest.shared";
import { appTimeFieldManifest } from "@/components/ui-governance/app-time-field/app-time-field.ui.manifest.shared";
import { appToastManifest } from "@/components/ui-governance/app-toast/app-toast.ui.manifest.shared";
import { appToggleButtonManifest } from "@/components/ui-governance/app-toggle-button/app-toggle-button.ui.manifest.shared";
import { appToggleButtonGroupManifest } from "@/components/ui-governance/app-toggle-button-group/app-toggle-button-group.ui.manifest.shared";
import { appToolbarManifest } from "@/components/ui-governance/app-toolbar/app-toolbar.ui.manifest.shared";
import { appTooltipManifest } from "@/components/ui-governance/app-tooltip/app-tooltip.ui.manifest.shared";
import { appTreeManifest } from "@/components/ui-governance/app-tree/app-tree.ui.manifest.shared";
import { appVirtualizerManifest } from "@/components/ui-governance/app-virtualizer/app-virtualizer.ui.manifest.shared";
import { appSearchAutocompleteManifest } from "@/components/ui-governance/app-search-autocomplete/app-search-autocomplete.ui.manifest.shared";

/** Register each governed manifest once, in stable order. */
const uiGovernanceManifestList: ApprovedComponentManifest[] = [
  appAutocompleteManifest,
  appBreadcrumbsManifest,
  appButtonManifest,
  appCalendarManifest,
  appCheckboxManifest,
  appCheckboxGroupManifest,
  appColorAreaManifest,
  appColorFieldManifest,
  appColorPickerManifest,
  appColorSliderManifest,
  appColorSwatchManifest,
  appColorSwatchPickerManifest,
  appColorWheelManifest,
  appComboBoxManifest,
  appDateFieldManifest,
  appDatePickerManifest,
  appDateRangePickerManifest,
  appDisclosureManifest,
  appDisclosureGroupManifest,
  appDropZoneManifest,
  appFileTriggerManifest,
  appFormManifest,
  appGridListManifest,
  appGroupManifest,
  appLinkManifest,
  appListBoxManifest,
  appMenuManifest,
  appMeterManifest,
  appModalManifest,
  appNumberFieldManifest,
  appPopoverManifest,
  appProgressBarManifest,
  appRadioGroupManifest,
  appRangeCalendarManifest,
  appSearchFieldManifest,
  appSelectManifest,
  appSeparatorManifest,
  appSliderManifest,
  appSwitchManifest,
  appTableManifest,
  appTabsManifest,
  appTagGroupManifest,
  appTextFieldManifest,
  appTimeFieldManifest,
  appToastManifest,
  appToggleButtonManifest,
  appToggleButtonGroupManifest,
  appToolbarManifest,
  appTooltipManifest,
  appTreeManifest,
  appVirtualizerManifest,
  appSearchAutocompleteManifest,
];

/** Full ordered list for deterministic guards, docs, and Interface Studio previews. */
export const uiComponentRegistry = [...uiGovernanceManifestList];

export const uiComponentRegistryById: Record<string, ApprovedComponentManifest> =
  Object.fromEntries(uiGovernanceManifestList.map((m) => [m.id, m]));

export const uiComponentRegistryByExportName: Record<
  string,
  ApprovedComponentManifest
> = Object.fromEntries(uiGovernanceManifestList.map((m) => [m.exportName, m]));

/** Lightweight aggregates for dashboards and CI summaries. */
export const uiComponentRegistryCounts = {
  total: uiGovernanceManifestList.length,
  approved: uiGovernanceManifestList.filter((m) => m.status === "approved").length,
  draft: uiGovernanceManifestList.filter((m) => m.status === "draft").length,
  deprecated: uiGovernanceManifestList.filter((m) => m.status === "deprecated")
    .length,
} as const;
