/**
 * @afenda-owner app-table
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-table client and manifest shared boundary
 */

export const appTableControlSourcePath =
  "@/components/ui-governance/app-table/app-table.control.primitive.client";

export const appTableSizeValues = ["md", "sm"] as const;
export type AppTableSize = (typeof appTableSizeValues)[number];

export const appTableRequiredPropNames = ["children"] as const;

export const appTableOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "className",
  "defaultExpandedKeys",
  "defaultSelectedKeys",
  "disabledBehavior",
  "disabledKeys",
  "disallowEmptySelection",
  "dragAndDropHooks",
  "escapeKeyBehavior",
  "expandedKeys",
  "onExpandedChange",
  "onRowAction",
  "onScroll",
  "onSelectionChange",
  "onSortChange",
  "render",
  "selectedKeys",
  "selectionBehavior",
  "selectionMode",
  "shouldSelectOnPressUp",
  "size",
  "slot",
  "sortDescriptor",
  "style",
  "treeColumn",
] as const;

export const appTableReactAriaPrimitives = [
  "Table",
  "TableHeader",
  "TableBody",
  "Column",
  "Row",
  "Cell",
  "ColumnResizer",
  "TableLoadMoreItem",
  "ResizableTableContainer",
  "Button",
  "Checkbox",
] as const;

export const appTableCompositionContract = {
  requiresChildren: true,
  requiredElements: [
    "AppTableHeader as a direct child",
    "AppTableBody as a direct child",
  ],
  optionalElements: [
    "AppResizableTableContainer wrapper outside AppTable",
    "AppTableLoadMoreItem",
    "AppColumn allowsResizing",
  ],
  notes: [
    "AppTable owns the dense tabular surface, row chrome, selection affordances, sorting cues, tree expansion affordances, and load-more treatment for governed operator grids.",
    "Provide aria-label or aria-labelledby so the table has an explicit accessible name.",
    "Use AppTableHeader, AppColumn, AppRow, and AppCell instead of mixing raw React Aria table primitives into shared feature boundaries.",
  ],
} as const;

export const appTableTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-accent-ring",
    "--color-border",
    "--color-border-strong",
    "--color-field",
    "--color-field-hover",
    "--color-foreground",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-control", "--radius-panel"] as const,
  typography: ["--text-body-sm"] as const,
} as const;
