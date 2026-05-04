/**
 * @afenda-owner app-date-field
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-date-field client and manifest shared boundary
 */

export const appDateFieldControlSourcePath =
  "@/components/ui-governance/app-date-field/app-date-field.control.primitive.client";

export const appDateFieldSizeValues = ["md", "sm"] as const;

export type AppDateFieldSize = (typeof appDateFieldSizeValues)[number];

export const appDateFieldRequiredPropNames = [] as const;

export const appDateFieldOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "autoComplete",
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
  "isDateUnavailable",
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

export const appDateFieldReactAriaPrimitives = [
  "DateField",
  "DateInput",
  "DateSegment",
  "Label",
  "Text",
  "FieldError",
] as const;

export const appDateFieldCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: [
    "internal Label",
    "internal DateInput",
    "internal DateSegment",
    "internal Text",
    "internal FieldError",
  ],
  notes: [
    "AppDateField owns the label, segmented date input, description, and error structure so date entry stays consistent across ERP forms.",
    "Provide label, aria-label, or aria-labelledby so the field has an explicit accessible name.",
    "Granularity, hour cycle, placeholder value, and availability constraints stay explicit through props rather than custom child composition.",
  ],
} as const;

export const appDateFieldTokenContract = {
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
