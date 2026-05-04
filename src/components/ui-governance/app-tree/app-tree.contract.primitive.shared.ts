/**
 * @afenda-owner app-tree
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-tree client and manifest shared boundary
 */

export const appTreeControlSourcePath =
  "@/components/ui-governance/app-tree/app-tree.control.primitive.client";

export const appTreeSizeValues = ["md", "sm"] as const;
export type AppTreeSize = (typeof appTreeSizeValues)[number];

export const appTreeRequiredPropNames = ["children"] as const;

export const appTreeOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "autoFocus",
  "className",
  "defaultExpandedKeys",
  "defaultSelectedKeys",
  "dependencies",
  "disabledBehavior",
  "disabledKeys",
  "disallowEmptySelection",
  "dragAndDropHooks",
  "escapeKeyBehavior",
  "expandedKeys",
  "id",
  "items",
  "onAction",
  "onExpandedChange",
  "onSelectionChange",
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

export const appTreeReactAriaPrimitives = [
  "Tree",
  "TreeItem",
  "TreeItemContent",
  "TreeLoadMoreItem",
  "TreeSection",
  "TreeHeader",
  "Button",
  "Checkbox",
  "SelectionIndicator",
] as const;

export const appTreeCompositionContract = {
  requiresChildren: true,
  requiredElements: ["AppTreeItem or AppTreeSection as a direct child, or an item renderer"],
  optionalElements: [
    "AppTreeLoadMoreItem",
    "AppTreeHeader",
    "Collection items rendered inside AppTreeItem",
  ],
  notes: [
    "AppTree owns the shared hierarchy shell, tree item chrome, section headers, chevron behavior, selection affordances, and load-more treatment for governed nested navigation.",
    "Provide aria-label or aria-labelledby so the tree is announced with a stable accessible name.",
    "Use AppTreeItem, AppTreeSection, AppTreeHeader, and AppTreeLoadMoreItem instead of mixing raw React Aria tree parts directly into shared feature code.",
  ],
} as const;

export const appTreeTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-accent-foreground",
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
  typography: ["--text-body-sm", "--text-label"] as const,
} as const;
