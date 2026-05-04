/**
 * @afenda-owner app-color-area
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-color-area client and manifest shared boundary
 */

export const appColorAreaControlSourcePath =
  "@/components/ui-governance/app-color-area/app-color-area.control.primitive.client";

export const appColorAreaSizeValues = ["md", "lg"] as const;

export type AppColorAreaSize = (typeof appColorAreaSizeValues)[number];

export const appColorAreaRequiredPropNames = ["xChannel", "yChannel"] as const;

export const appColorAreaOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "className",
  "colorSpace",
  "defaultValue",
  "form",
  "id",
  "isDisabled",
  "onChange",
  "onChangeEnd",
  "size",
  "slot",
  "value",
  "xName",
  "yName",
] as const;

export const appColorAreaReactAriaPrimitives = ["ColorArea", "ColorThumb"] as const;

export const appColorAreaCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: ["internal ColorThumb"],
  notes: [
    "AppColorArea owns the internal ColorThumb so product code consumes a single governed color-plane primitive.",
    "Callers must provide xChannel and yChannel explicitly so the two-axis editing contract is obvious at the usage site.",
    "Provide aria-label or aria-labelledby when no surrounding field primitive owns the accessible name.",
  ],
} as const;

export const appColorAreaTokenContract = {
  semanticColors: [
    "--color-border-strong",
    "--color-field",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-control"] as const,
  typography: [] as const,
} as const;
