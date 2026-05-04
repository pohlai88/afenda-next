/**
 * @afenda-owner app-toggle-button-group
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-toggle-button-group client and manifest shared boundary
 */

export const appToggleButtonGroupControlSourcePath =
  "@/components/ui-governance/app-toggle-button-group/app-toggle-button-group.control.primitive.client";

export const appToggleButtonGroupVisualValues = ["toolbar", "segmented"] as const;
export type AppToggleButtonGroupVisual =
  (typeof appToggleButtonGroupVisualValues)[number];

export const appToggleButtonGroupRequiredPropNames = [] as const;

export const appToggleButtonGroupOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "children",
  "className",
  "defaultSelectedKeys",
  "disallowEmptySelection",
  "isDisabled",
  "onSelectionChange",
  "orientation",
  "render",
  "selectedKeys",
  "selectionMode",
  "slot",
  "style",
  "visual",
] as const;

export const appToggleButtonGroupReactAriaPrimitives = [
  "ToggleButtonGroup",
  "ToggleButton",
] as const;

export const appToggleButtonGroupCompositionContract = {
  requiresChildren: false,
  requiredElements: [] as const,
  optionalElements: [
    "AppToggleButton or ToggleButton children with stable ids for selection keys",
  ],
  notes: [
    "Provide aria-label or aria-labelledby on the group so operators get an explicit scope name for the toggle set.",
    "Use selectionMode, selectedKeys, and onSelectionChange for controlled multi-select workflows per React Aria selection patterns.",
    "visual=\"segmented\" expects direct ToggleButton children (e.g. AppToggleButton) for sibling layout and z-index stacking.",
  ],
} as const;

export const appToggleButtonGroupTokenContract = {
  semanticColors: [
    "--color-border",
    "--color-field",
    "--color-foreground",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-control"] as const,
  typography: [] as const,
} as const;
