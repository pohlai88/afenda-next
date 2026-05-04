/**
 * @afenda-owner app-color-slider
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-color-slider client and manifest shared boundary
 */

export const appColorSliderControlSourcePath =
  "@/components/ui-governance/app-color-slider/app-color-slider.control.primitive.client";

export const appColorSliderSizeValues = ["md", "sm"] as const;

export type AppColorSliderSize = (typeof appColorSliderSizeValues)[number];

export const appColorSliderRequiredPropNames = ["channel"] as const;

export const appColorSliderOptionalPropNames = [
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
  "label",
  "name",
  "onChange",
  "onChangeEnd",
  "orientation",
  "size",
  "slot",
  "value",
] as const;

export const appColorSliderReactAriaPrimitives = [
  "ColorSlider",
  "Label",
  "SliderOutput",
  "SliderTrack",
  "ColorThumb",
] as const;

export const appColorSliderCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: ["internal Label", "internal SliderOutput", "internal SliderTrack", "internal ColorThumb"],
  notes: [
    "AppColorSlider owns the label, output, track, and thumb so single-channel color editing stays consistent across workflows.",
    "Provide label, aria-label, or aria-labelledby so the slider always has an explicit accessible name.",
    "channel is required because the primitive must declare the edited color axis explicitly.",
  ],
} as const;

export const appColorSliderTokenContract = {
  semanticColors: [
    "--color-border-strong",
    "--color-field",
    "--color-foreground",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-control"] as const,
  typography: ["--text-body-sm", "--text-label", "--text-meta"] as const,
} as const;
