/**
 * @afenda-owner app-grid-list
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-grid-list client and manifest shared boundary
 */

export const appGridListControlSourcePath =
  "@/components/ui-governance/app-grid-list/app-grid-list.control.primitive.client";

export const appGridListSizeValues = ["md", "sm"] as const;
export type AppGridListSize = (typeof appGridListSizeValues)[number];

export const appGridListRequiredPropNames = ["children"] as const;

export const appGridListOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "autoFocus",
  "className",
  "defaultSelectedKeys",
  "dependencies",
  "disabledBehavior",
  "disabledKeys",
  "disallowEmptySelection",
  "disallowTypeAhead",
  "dragAndDropHooks",
  "escapeKeyBehavior",
  "id",
  "items",
  "keyboardNavigationBehavior",
  "layout",
  "onAction",
  "onSelectionChange",
  "orientation",
  "render",
  "renderEmptyState",
  "selectedKeys",
  "selectionBehavior",
  "selectionMode",
  "shouldSelectOnPressUp",
  "size",
  "slot",
  "style",
] as const;

export const appGridListReactAriaPrimitives = [
  "GridList",
  "GridListItem",
  "GridListSection",
  "GridListHeader",
  "GridListLoadMoreItem",
  "Button",
  "Checkbox",
  "Text",
] as const;

export const appGridListCompositionContract = {
  requiresChildren: true,
  requiredElements: ["AppGridListItem children or an item renderer"],
  optionalElements: [
    "AppGridListSection",
    "AppGridListHeader",
    "AppGridListLoadMoreItem",
    "AppGridListText slot='description'",
  ],
  notes: [
    "AppGridList owns the shared collection surface, item chrome, selection affordances, and load-more treatment for dense ERP review lists.",
    "Provide aria-label or aria-labelledby so the collection has an explicit accessible name.",
    "Use AppGridListItem, AppGridListSection, and AppGridListLoadMoreItem instead of mixing raw React Aria collection parts at the feature boundary.",
  ],
} as const;

export const appGridListTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-border",
    "--color-field",
    "--color-field-hover",
    "--color-foreground",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-control", "--radius-panel"] as const,
  typography: ["--text-body-sm", "--text-label", "--text-meta"] as const,
} as const;
