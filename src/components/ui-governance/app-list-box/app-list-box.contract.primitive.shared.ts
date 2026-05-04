/**
 * @afenda-owner app-list-box
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-list-box client and manifest shared boundary
 */

export const appListBoxControlSourcePath =
  "@/components/ui-governance/app-list-box/app-list-box.control.primitive.client";

export const appListBoxSizeValues = ["md", "sm"] as const;
export type AppListBoxSize = (typeof appListBoxSizeValues)[number];

export const appListBoxRequiredPropNames = ["children"] as const;

export const appListBoxOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "autoFocus",
  "className",
  "defaultSelectedKeys",
  "dependencies",
  "disabledKeys",
  "disallowEmptySelection",
  "dragAndDropHooks",
  "escapeKeyBehavior",
  "id",
  "items",
  "layout",
  "onAction",
  "onSelectionChange",
  "orientation",
  "render",
  "renderEmptyState",
  "selectedKeys",
  "selectionBehavior",
  "selectionMode",
  "shouldFocusOnHover",
  "shouldFocusWrap",
  "shouldSelectOnPressUp",
  "size",
  "slot",
  "style",
] as const;

export const appListBoxReactAriaPrimitives = [
  "ListBox",
  "ListBoxItem",
  "ListBoxSection",
  "ListBoxLoadMoreItem",
  "Header",
  "Text",
] as const;

export const appListBoxCompositionContract = {
  requiresChildren: true,
  requiredElements: ["AppListBoxItem children or an item renderer"],
  optionalElements: [
    "AppListBoxSection",
    "AppListBoxHeader",
    "AppListBoxLoadMoreItem",
    "AppListBoxText slot='description'",
  ],
  notes: [
    "AppListBox owns the shared selection surface, option chrome, section headers, and load-more treatment for dense ERP choice and review lists.",
    "Provide aria-label or aria-labelledby so the collection has an explicit accessible name.",
    "Use AppListBoxItem, AppListBoxSection, and AppListBoxLoadMoreItem instead of mixing raw React Aria collection parts at the feature boundary.",
  ],
} as const;

export const appListBoxTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-accent-ring",
    "--color-border",
    "--color-field",
    "--color-field-hover",
    "--color-field-strong",
    "--color-foreground",
    "--color-foreground-muted",
  ] as const,
  radii: ["--radius-control", "--radius-panel"] as const,
  typography: ["--text-body-sm", "--text-meta"] as const,
} as const;
