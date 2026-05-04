/**
 * @afenda-owner app-checkbox
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-checkbox client and manifest shared boundary
 */

export const appCheckboxControlSourcePath =
  "@/components/ui-governance/app-checkbox/app-checkbox.control.primitive.client";

export const appCheckboxSizeValues = ["md", "sm"] as const;

export type AppCheckboxSize = (typeof appCheckboxSizeValues)[number];

export const appCheckboxRequiredPropNames = [] as const;

export const appCheckboxOptionalPropNames = [
  "aria-controls",
  "aria-describedby",
  "aria-details",
  "aria-errormessage",
  "aria-label",
  "aria-labelledby",
  "autoFocus",
  "children",
  "className",
  "defaultSelected",
  "excludeFromTabOrder",
  "form",
  "id",
  "inputRef",
  "isDisabled",
  "isIndeterminate",
  "isInvalid",
  "isReadOnly",
  "isRequired",
  "isSelected",
  "name",
  "onBlur",
  "onChange",
  "onFocus",
  "onFocusChange",
  "onHoverChange",
  "onHoverEnd",
  "onHoverStart",
  "onKeyDown",
  "onKeyUp",
  "onPress",
  "onPressChange",
  "onPressEnd",
  "onPressStart",
  "onPressUp",
  "size",
  "slot",
  "validationBehavior",
  "value",
] as const;

export const appCheckboxReactAriaPrimitives = ["Checkbox"] as const;

export const appCheckboxCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: [],
  notes: [
    "AppCheckbox owns the visual indicator and optional label content for standalone and grouped multi-select flows.",
    "Prefer AppCheckbox inside AppCheckboxGroup for governed form selection workflows.",
    "Selection-slot use in collection components remains allowed via slot props when the surrounding primitive owns labeling.",
  ],
} as const;

export const appCheckboxTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-accent-foreground",
    "--color-border",
    "--color-border-strong",
    "--color-danger",
    "--color-danger-foreground",
    "--color-field",
    "--color-foreground",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-control"] as const,
  typography: ["--text-body-sm"] as const,
} as const;
