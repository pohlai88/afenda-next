/**
 * @afenda-owner app-radio-group
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-radio-group client and manifest shared boundary
 */

export const appRadioGroupControlSourcePath =
  "@/components/ui-governance/app-radio-group/app-radio-group.control.primitive.client";

export const appRadioGroupOrientationValues = [
  "vertical",
  "horizontal",
] as const;

export type AppRadioGroupOrientation =
  (typeof appRadioGroupOrientationValues)[number];

export const appRadioGroupRequiredPropNames = ["children"] as const;

export const appRadioGroupOptionalPropNames = [
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

export const appRadioGroupReactAriaPrimitives = [
  "RadioGroup",
  "Radio",
  "Label",
  "Text",
  "FieldError",
] as const;

export const appRadioGroupCompositionContract = {
  requiresChildren: true,
  requiredElements: ["AppRadio"],
  optionalElements: [],
  notes: [
    "AppRadioGroup owns the field label, description, error presentation, and radio layout for governed mutually exclusive choices.",
    "Direct children must be AppRadio elements so single-choice semantics and operator-facing styling remain explicit.",
    "Use a visible label or provide aria-label or aria-labelledby when the operator-facing label must be visually omitted.",
  ],
} as const;

export const appRadioGroupTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-border",
    "--color-border-strong",
    "--color-danger",
    "--color-field",
    "--color-foreground",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: [] as const,
  typography: ["--text-body-sm", "--text-label", "--text-meta"] as const,
} as const;
