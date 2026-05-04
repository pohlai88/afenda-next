/**
 * @afenda-owner app-text-field
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-text-field client and manifest shared boundary
 */

export const appTextFieldControlSourcePath =
  "@/components/ui-governance/app-text-field/app-text-field.control.primitive.client";

export const appTextFieldSizeValues = ["md", "sm"] as const;
export type AppTextFieldSize = (typeof appTextFieldSizeValues)[number];

export const appTextFieldRequiredPropNames = ["children"] as const;

export const appTextFieldOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-errormessage",
  "aria-label",
  "aria-labelledby",
  "autoComplete",
  "autoCorrect",
  "autoFocus",
  "className",
  "defaultValue",
  "description",
  "enterKeyHint",
  "errorMessage",
  "excludeFromTabOrder",
  "form",
  "id",
  "inputMode",
  "isDisabled",
  "isInvalid",
  "isReadOnly",
  "isRequired",
  "label",
  "maxLength",
  "minLength",
  "name",
  "onBlur",
  "onChange",
  "onFocus",
  "onFocusChange",
  "onKeyDown",
  "onKeyUp",
  "pattern",
  "render",
  "slot",
  "spellCheck",
  "style",
  "type",
  "validate",
  "validationBehavior",
  "value",
] as const;

export const appTextFieldReactAriaPrimitives = [
  "TextField",
  "Input",
  "TextArea",
  "Label",
  "Text",
  "FieldError",
] as const;

export const appTextFieldCompositionContract = {
  requiresChildren: true,
  requiredElements: ["AppInput or AppTextArea as a direct child"],
  optionalElements: ["Text slot='description'", "FieldError"],
  notes: [
    "AppTextField owns the field shell, label, validation message, and text-entry styling for governed operator input flows.",
    "Provide label, aria-label, or aria-labelledby so the field has an explicit accessible name.",
    "Keep the concrete text entry control explicit through AppInput or AppTextArea so single-line and multi-line entry remain obvious at the call site.",
  ],
} as const;

export const appTextFieldTokenContract = {
  semanticColors: [
    "--color-accent-ring",
    "--color-border",
    "--color-border-strong",
    "--color-danger",
    "--color-field",
    "--color-foreground",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-control"] as const,
  typography: ["--text-body-sm", "--text-label", "--text-meta"] as const,
} as const;
