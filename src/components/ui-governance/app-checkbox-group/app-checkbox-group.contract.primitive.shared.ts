/**
 * @afenda-owner app-checkbox-group
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-checkbox-group client and manifest shared boundary
 */

export const appCheckboxGroupControlSourcePath =
  "@/components/ui-governance/app-checkbox-group/app-checkbox-group.control.primitive.client";

export const appCheckboxGroupOrientationValues = [
  "vertical",
  "horizontal",
] as const;

export type AppCheckboxGroupOrientation =
  (typeof appCheckboxGroupOrientationValues)[number];

export const appCheckboxGroupRequiredPropNames = ["children"] as const;

export const appCheckboxGroupOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-errormessage",
  "aria-label",
  "aria-labelledby",
  "className",
  "defaultValue",
  "description",
  "errorMessage",
  "form",
  "id",
  "isDisabled",
  "isInvalid",
  "isReadOnly",
  "isRequired",
  "label",
  "name",
  "onBlur",
  "onChange",
  "onFocus",
  "onFocusChange",
  "orientation",
  "slot",
  "validate",
  "validationBehavior",
  "value",
] as const;

export const appCheckboxGroupReactAriaPrimitives = ["CheckboxGroup", "Checkbox"] as const;

export const appCheckboxGroupCompositionContract = {
  requiresChildren: true,
  requiredElements: ["AppCheckbox"],
  optionalElements: [],
  notes: [
    "AppCheckboxGroup owns the field label, description, error presentation, and checkbox layout for governed multi-select workflows.",
    "Direct children must be AppCheckbox elements so group semantics and operator-facing styling remain explicit.",
    "Use aria-label or aria-labelledby when no visible group label is rendered.",
  ],
} as const;

export const appCheckboxGroupTokenContract = {
  semanticColors: [
    "--color-danger",
    "--color-foreground",
    "--color-foreground-muted",
  ] as const,
  radii: [] as const,
  typography: ["--text-label", "--text-meta"] as const,
} as const;
