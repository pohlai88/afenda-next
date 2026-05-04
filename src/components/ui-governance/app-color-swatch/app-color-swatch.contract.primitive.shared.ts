/**
 * @afenda-owner app-color-swatch
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-color-swatch client and manifest shared boundary
 */

export const appColorSwatchControlSourcePath =
  "@/components/ui-governance/app-color-swatch/app-color-swatch.control.primitive.client";

export const appColorSwatchSizeValues = ["sm", "md", "lg"] as const;

export type AppColorSwatchSize = (typeof appColorSwatchSizeValues)[number];

export const appColorSwatchRequiredPropNames = [] as const;

export const appColorSwatchOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "className",
  "color",
  "colorName",
  "id",
  "size",
  "slot",
] as const;

export const appColorSwatchReactAriaPrimitives = ["ColorSwatch"] as const;

export const appColorSwatchCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: [],
  notes: [
    "AppColorSwatch owns the checkerboard-backed preview treatment so color state stays visually consistent across pickers, swatches, and review surfaces.",
    "The primitive inherits React Aria's localized color description and may be supplemented with colorName and aria-label for workflow-specific context.",
    "Provide color directly for standalone previews, or render inside a color context such as AppColorPicker.",
  ],
} as const;

export const appColorSwatchTokenContract = {
  semanticColors: ["--color-border-strong"] as const,
  radii: ["--radius-control"] as const,
  typography: [] as const,
} as const;
