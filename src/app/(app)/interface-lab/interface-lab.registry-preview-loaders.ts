/**
 * @afenda-generated interface-lab
 * @afenda-boundary client
 * @afenda-description Static dynamic-import map for registry previews — run pnpm interface-lab:codegen after registry changes.
 */
import type { ComponentType } from "react";

export type InterfaceLabRegistryPreviewModule = {
  default: ComponentType;
};

export const interfaceLabRegistryPreviewLoaders: Record<
  string,
  () => Promise<InterfaceLabRegistryPreviewModule>
> = {
  "app-autocomplete": () => import("./_previews/generated/app-autocomplete.preview.client"),
  "app-breadcrumbs": () => import("./_previews/generated/app-breadcrumbs.preview.client"),
  "app-button": () => import("./_previews/generated/app-button.preview.client"),
  "app-calendar": () => import("./_previews/generated/app-calendar.preview.client"),
  "app-checkbox": () => import("./_previews/generated/app-checkbox.preview.client"),
  "app-checkbox-group": () => import("./_previews/generated/app-checkbox-group.preview.client"),
  "app-color-area": () => import("./_previews/generated/app-color-area.preview.client"),
  "app-color-field": () => import("./_previews/generated/app-color-field.preview.client"),
  "app-color-picker": () => import("./_previews/generated/app-color-picker.preview.client"),
  "app-color-slider": () => import("./_previews/generated/app-color-slider.preview.client"),
  "app-color-swatch": () => import("./_previews/generated/app-color-swatch.preview.client"),
  "app-color-swatch-picker": () => import("./_previews/generated/app-color-swatch-picker.preview.client"),
  "app-color-wheel": () => import("./_previews/generated/app-color-wheel.preview.client"),
  "app-combo-box": () => import("./_previews/generated/app-combo-box.preview.client"),
  "app-date-field": () => import("./_previews/generated/app-date-field.preview.client"),
  "app-date-picker": () => import("./_previews/generated/app-date-picker.preview.client"),
  "app-date-range-picker": () => import("./_previews/generated/app-date-range-picker.preview.client"),
  "app-disclosure": () => import("./_previews/generated/app-disclosure.preview.client"),
  "app-disclosure-group": () => import("./_previews/generated/app-disclosure-group.preview.client"),
  "app-drop-zone": () => import("./_previews/generated/app-drop-zone.preview.client"),
  "app-file-trigger": () => import("./_previews/generated/app-file-trigger.preview.client"),
  "app-form": () => import("./_previews/generated/app-form.preview.client"),
  "app-grid-list": () => import("./_previews/generated/app-grid-list.preview.client"),
  "app-group": () => import("./_previews/generated/app-group.preview.client"),
  "app-link": () => import("./_previews/generated/app-link.preview.client"),
  "app-list-box": () => import("./_previews/generated/app-list-box.preview.client"),
  "app-menu": () => import("./_previews/generated/app-menu.preview.client"),
  "app-meter": () => import("./_previews/generated/app-meter.preview.client"),
  "app-modal": () => import("./_previews/generated/app-modal.preview.client"),
  "app-number-field": () => import("./_previews/generated/app-number-field.preview.client"),
  "app-popover": () => import("./_previews/generated/app-popover.preview.client"),
  "app-progress-bar": () => import("./_previews/generated/app-progress-bar.preview.client"),
  "app-radio-group": () => import("./_previews/generated/app-radio-group.preview.client"),
  "app-range-calendar": () => import("./_previews/generated/app-range-calendar.preview.client"),
  "app-search-field": () => import("./_previews/generated/app-search-field.preview.client"),
  "app-select": () => import("./_previews/generated/app-select.preview.client"),
  "app-separator": () => import("./_previews/generated/app-separator.preview.client"),
  "app-slider": () => import("./_previews/generated/app-slider.preview.client"),
  "app-switch": () => import("./_previews/generated/app-switch.preview.client"),
  "app-table": () => import("./_previews/generated/app-table.preview.client"),
  "app-tabs": () => import("./_previews/generated/app-tabs.preview.client"),
  "app-tag-group": () => import("./_previews/generated/app-tag-group.preview.client"),
  "app-text-field": () => import("./_previews/generated/app-text-field.preview.client"),
  "app-time-field": () => import("./_previews/generated/app-time-field.preview.client"),
  "app-toast": () => import("./_previews/generated/app-toast.preview.client"),
  "app-toggle-button": () => import("./_previews/generated/app-toggle-button.preview.client"),
  "app-toggle-button-group": () => import("./_previews/generated/app-toggle-button-group.preview.client"),
  "app-toolbar": () => import("./_previews/generated/app-toolbar.preview.client"),
  "app-tooltip": () => import("./_previews/generated/app-tooltip.preview.client"),
  "app-tree": () => import("./_previews/generated/app-tree.preview.client"),
  "app-virtualizer": () => import("./_previews/generated/app-virtualizer.preview.client"),
  "app-search-autocomplete": () => import("./_previews/generated/app-search-autocomplete.preview.client"),
};
