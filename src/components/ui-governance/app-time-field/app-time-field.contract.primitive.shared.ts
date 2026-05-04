/**
 * @afenda-owner app-time-field
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-time-field client and manifest shared boundary
 */

export {
  appDateFieldSizeValues as appTimeFieldSizeValues,
  type AppDateFieldSize as AppTimeFieldSize,
} from "@/components/ui-governance/app-date-field/app-date-field.contract.primitive.shared";

export const appTimeFieldControlSourcePath =
  "@/components/ui-governance/app-time-field/app-time-field.control.primitive.client";

export const appTimeFieldRequiredPropNames = [] as const;

export const appTimeFieldOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "autoFocus",
  "className",
  "defaultValue",
  "description",
  "errorMessage",
  "form",
  "granularity",
  "hideTimeZone",
  "hourCycle",
  "id",
  "inputClassName",
  "isDisabled",
  "isInvalid",
  "isReadOnly",
  "isRequired",
  "label",
  "maxValue",
  "minValue",
  "name",
  "onBlur",
  "onChange",
  "onFocus",
  "onFocusChange",
  "onKeyDown",
  "onKeyUp",
  "placeholderValue",
  "segmentClassName",
  "shouldForceLeadingZeros",
  "size",
  "slot",
  "validate",
  "validationBehavior",
  "value",
] as const;

export const appTimeFieldReactAriaPrimitives = [
  "TimeField",
  "DateInput",
  "DateSegment",
  "Label",
  "Text",
  "FieldError",
] as const;

export const appTimeFieldCompositionContract = {
  requiresChildren: false,
  requiredElements: [] as const,
  optionalElements: [
    "internal Label",
    "internal DateInput",
    "internal DateSegment",
    "internal Text",
    "internal FieldError",
  ],
  notes: [
    "AppTimeField owns the label, segmented time input, description, and error structure so time entry stays consistent across ERP forms.",
    "Provide label, aria-label, or aria-labelledby so the field has an explicit accessible name.",
    "Granularity, hour cycle, placeholder value, and min/max constraints stay explicit through props rather than custom child composition.",
  ],
} as const;

export const appTimeFieldTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-accent-foreground",
    "--color-border",
    "--color-danger",
    "--color-danger-foreground",
    "--color-field",
    "--color-foreground",
    "--color-foreground-muted",
  ] as const,
  radii: ["--radius-control"] as const,
  typography: ["--text-body-sm", "--text-label", "--text-meta"] as const,
} as const;
