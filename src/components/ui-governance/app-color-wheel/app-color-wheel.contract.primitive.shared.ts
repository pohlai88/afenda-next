/**
 * @afenda-owner app-color-wheel
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-color-wheel client and manifest shared boundary
 */

export const appColorWheelControlSourcePath =
  "@/components/ui-governance/app-color-wheel/app-color-wheel.control.primitive.client";

export const appColorWheelSizeValues = ["sm", "md", "lg"] as const;
export type AppColorWheelSize = (typeof appColorWheelSizeValues)[number];

export const appColorWheelRequiredPropNames = [] as const;

export const appColorWheelOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "className",
  "defaultValue",
  "form",
  "id",
  "isDisabled",
  "name",
  "onChange",
  "onChangeEnd",
  "size",
  "slot",
  "value",
] as const;

export const appColorWheelReactAriaPrimitives = [
  "ColorWheel",
  "ColorWheelTrack",
  "ColorThumb",
] as const;

export const appColorWheelCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: ["internal ColorWheelTrack", "internal ColorThumb"],
  notes: [
    "AppColorWheel owns the wheel track and thumb so hue-editing behavior and geometry stay consistent across workflows.",
    "Provide aria-label or aria-labelledby so the wheel has an explicit accessible name.",
    "Wheel geometry is governed by size; feature code should not tune raw innerRadius or outerRadius directly.",
  ],
} as const;

export const appColorWheelTokenContract = {
  semanticColors: [
    "--color-border-strong",
    "--color-field",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: [] as const,
  typography: [] as const,
} as const;
