/**
 * @afenda-owner app-color-field
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-color-field client and manifest shared boundary
 */

export const appColorFieldControlSourcePath =
  "@/components/ui-governance/app-color-field/app-color-field.control.primitive.client";

export const appColorFieldSizeValues = ["md", "sm"] as const;

export type AppColorFieldSize = (typeof appColorFieldSizeValues)[number];

export const appColorFieldRequiredPropNames = [] as const;

export const appColorFieldOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-errormessage",
  "aria-label",
  "aria-labelledby",
  "autoFocus",
  "channel",
  "className",
  "colorSpace",
  "defaultValue",
  "description",
  "errorMessage",
  "excludeFromTabOrder",
  "form",
  "id",
  "inputClassName",
  "isDisabled",
  "isInvalid",
  "isReadOnly",
  "isRequired",
  "isWheelDisabled",
  "label",
  "name",
  "onBeforeInput",
  "onBlur",
  "onChange",
  "onCompositionEnd",
  "onCompositionStart",
  "onCompositionUpdate",
  "onCopy",
  "onCut",
  "onFocus",
  "onFocusChange",
  "onInput",
  "onKeyDown",
  "onKeyUp",
  "onPaste",
  "onSelect",
  "placeholder",
  "size",
  "slot",
  "validate",
  "validationBehavior",
  "value",
] as const;

export const appColorFieldReactAriaPrimitives = [
  "ColorField",
  "Input",
  "Label",
  "Text",
  "FieldError",
] as const;

export const appColorFieldCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: ["internal Label", "internal Input", "internal Text", "internal FieldError"],
  notes: [
    "AppColorField owns the label, input, description, and error structure so color entry stays consistent across ERP forms.",
    "Provide label, aria-label, or aria-labelledby so the field has an explicit accessible name.",
    "Channel editing is optional; when channel is omitted, the field edits an RGB hex value.",
  ],
} as const;

export const appColorFieldTokenContract = {
  semanticColors: [
    "--color-border",
    "--color-danger",
    "--color-field",
    "--color-field-hover",
    "--color-foreground",
    "--color-foreground-muted",
  ] as const,
  radii: ["--radius-control"] as const,
  typography: ["--text-body-sm", "--text-label", "--text-meta"] as const,
} as const;
