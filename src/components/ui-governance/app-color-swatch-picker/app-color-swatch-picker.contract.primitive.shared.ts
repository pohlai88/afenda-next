/**
 * @afenda-owner app-color-swatch-picker
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-color-swatch-picker client and manifest shared boundary
 */

export const appColorSwatchPickerControlSourcePath =
  "@/components/ui-governance/app-color-swatch-picker/app-color-swatch-picker.control.primitive.client";

export const appColorSwatchPickerLayoutValues = ["grid", "stack"] as const;
export type AppColorSwatchPickerLayout =
  (typeof appColorSwatchPickerLayoutValues)[number];

export const appColorSwatchPickerItemSizeValues = ["sm", "md", "lg"] as const;
export type AppColorSwatchPickerItemSize =
  (typeof appColorSwatchPickerItemSizeValues)[number];

export const appColorSwatchPickerRequiredPropNames = ["children"] as const;

export const appColorSwatchPickerOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "className",
  "defaultValue",
  "id",
  "layout",
  "onChange",
  "slot",
  "value",
] as const;

export const appColorSwatchPickerItemRequiredPropNames = ["color"] as const;

export const appColorSwatchPickerItemOptionalPropNames = [
  "aria-label",
  "aria-labelledby",
  "className",
  "colorName",
  "id",
  "isDisabled",
  "onHoverChange",
  "onHoverEnd",
  "onHoverStart",
  "onPress",
  "onPressChange",
  "onPressEnd",
  "onPressStart",
  "onPressUp",
  "size",
  "style",
] as const;

export const appColorSwatchPickerReactAriaPrimitives = [
  "ColorSwatchPicker",
  "ColorSwatchPickerItem",
  "ColorSwatch",
] as const;

export const appColorSwatchPickerCompositionContract = {
  requiresChildren: true,
  requiredElements: ["Direct AppColorSwatchPickerItem children"],
  optionalElements: [],
  notes: [
    "AppColorSwatchPicker owns the selectable swatch collection boundary and AppColorSwatchPickerItem owns the internal swatch preview and selection indicator.",
    "Provide aria-label or aria-labelledby on the picker root so the color choice set has an explicit accessible name.",
    "Direct AppColorSwatchPickerItem colors must be unique, including equivalent values expressed in different color spaces.",
  ],
} as const;

export const appColorSwatchPickerTokenContract = {
  semanticColors: [
    "--color-border-strong",
    "--color-foreground",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-control"] as const,
  typography: [] as const,
} as const;
