/**
 * @afenda-owner app-search-field
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-search-field client and manifest shared boundary
 */

export const appSearchFieldControlSourcePath =
  "@/components/ui-governance/app-search-field/app-search-field.control.primitive.client";

export const appSearchFieldSizeValues = ["md", "sm"] as const;
export type AppSearchFieldSize = (typeof appSearchFieldSizeValues)[number];

export const appSearchFieldRequiredPropNames = [] as const;

export const appSearchFieldOptionalPropNames = [
  "aria-activedescendant",
  "aria-autocomplete",
  "aria-controls",
  "aria-describedby",
  "aria-details",
  "aria-errormessage",
  "aria-haspopup",
  "aria-label",
  "aria-labelledby",
  "autoComplete",
  "autoCorrect",
  "autoFocus",
  "className",
  "clearButtonAriaLabel",
  "clearButtonClassName",
  "defaultValue",
  "description",
  "enterKeyHint",
  "errorMessage",
  "excludeFromTabOrder",
  "form",
  "id",
  "inputClassName",
  "inputMode",
  "isDisabled",
  "isInvalid",
  "isReadOnly",
  "isRequired",
  "label",
  "maxLength",
  "minLength",
  "name",
  "onBeforeInput",
  "onBlur",
  "onChange",
  "onClear",
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
  "onSubmit",
  "pattern",
  "placeholder",
  "size",
  "slot",
  "spellCheck",
  "type",
  "validate",
  "validationBehavior",
  "value",
] as const;

export const appSearchFieldReactAriaPrimitives = [
  "SearchField",
  "Input",
  "Button",
  "Label",
  "Text",
  "FieldError",
] as const;

export const appSearchFieldCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: [
    "internal Label",
    "internal Input",
    "internal clear Button",
    "internal Text",
    "internal FieldError",
  ],
  notes: [
    "AppSearchField owns the search icon, input, clear affordance, and field messaging so operator search entry stays consistent across dense workflows.",
    "Provide label, aria-label, or aria-labelledby so the field has an explicit accessible name.",
    "Search behavior should extend through props like onChange, onSubmit, validation, and placeholder rather than custom child composition.",
  ],
} as const;

export const appSearchFieldTokenContract = {
  semanticColors: [
    "--color-accent-ring",
    "--color-danger",
    "--color-field-hover",
    "--color-foreground",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-control"] as const,
  typography: ["--text-body-sm", "--text-label", "--text-meta"] as const,
} as const;
