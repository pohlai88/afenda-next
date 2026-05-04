/**
 * @afenda-owner app-tag-group
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-tag-group client and manifest shared boundary
 */

export const appTagGroupControlSourcePath =
  "@/components/ui-governance/app-tag-group/app-tag-group.control.primitive.client";

export const appTagGroupSizeValues = ["md", "sm"] as const;
export type AppTagGroupSize = (typeof appTagGroupSizeValues)[number];

export const appTagGroupRequiredPropNames = ["children"] as const;

export const appTagGroupOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "className",
  "defaultSelectedKeys",
  "description",
  "disabledKeys",
  "disallowEmptySelection",
  "errorMessage",
  "escapeKeyBehavior",
  "id",
  "label",
  "onAction",
  "onRemove",
  "onSelectionChange",
  "render",
  "selectedKeys",
  "selectionBehavior",
  "selectionMode",
  "shouldSelectOnPressUp",
  "slot",
  "style",
] as const;

export const appTagGroupReactAriaPrimitives = [
  "TagGroup",
  "TagList",
  "Tag",
  "Label",
  "Text",
  "Button",
] as const;

export const appTagGroupCompositionContract = {
  requiresChildren: true,
  requiredElements: ["AppTagList as a direct child"],
  optionalElements: [
    "AppTag",
    "Text slot='description'",
    "Text slot='errorMessage'",
  ],
  notes: [
    "AppTagGroup owns the field shell, focusable list treatment, selected-state indicator, and remove affordance for governed tag workflows.",
    "Provide label, aria-label, or aria-labelledby so the tag collection has an explicit accessible name.",
    "Keep AppTagList explicit at the call site so operators can audit the removable and selectable collection boundary quickly.",
  ],
} as const;

export const appTagGroupTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-accent-foreground",
    "--color-accent-ring",
    "--color-border",
    "--color-danger",
    "--color-field",
    "--color-field-hover",
    "--color-foreground",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-control", "--radius-panel"] as const,
  typography: ["--text-body-sm", "--text-label", "--text-meta"] as const,
} as const;
