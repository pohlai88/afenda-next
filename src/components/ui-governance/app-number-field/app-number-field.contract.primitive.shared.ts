/**
 * @afenda-owner app-number-field
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-number-field client and manifest shared boundary
 */

export const appNumberFieldControlSourcePath =
  "@/components/ui-governance/app-number-field/app-number-field.control.primitive.client";

export const appNumberFieldRequiredPropNames = ["children"] as const;

export const appNumberFieldOptionalPropNames = ["className", "defaultValue", "formatOptions", "isDisabled", "isInvalid", "isReadOnly", "isRequired", "maxValue", "minValue", "onChange", "render", "slot", "step", "style", "validationBehavior", "value"] as const;

export const appNumberFieldReactAriaPrimitives = ["NumberField", "Group"] as const;

export const appNumberFieldCompositionContract = {
  requiresChildren: true,
  requiredElements: ["Group as a direct child"],
  optionalElements: ["Label", "Text slot=\"description\"", "FieldError"],
  notes: ["Keep the numeric input group explicit."],
} as const;

export const appNumberFieldTokenContract = {
  semanticColors: [] as const,
  radii: [] as const,
  typography: [] as const,
} as const;
