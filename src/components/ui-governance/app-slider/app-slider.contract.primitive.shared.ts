/**
 * @afenda-owner app-slider
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-slider client and manifest shared boundary
 */

export const appSliderControlSourcePath =
  "@/components/ui-governance/app-slider/app-slider.control.primitive.client";

export const appSliderRequiredPropNames = ["children"] as const;

export const appSliderOptionalPropNames = ["className", "defaultValue", "formatOptions", "isDisabled", "maxValue", "minValue", "onChange", "onChangeEnd", "orientation", "render", "slot", "step", "style", "value"] as const;

export const appSliderReactAriaPrimitives = ["Slider", "SliderTrack", "SliderThumb"] as const;

export const appSliderCompositionContract = {
  requiresChildren: true,
  requiredElements: ["SliderTrack as a direct child"],
  optionalElements: ["SliderOutput", "Label"],
  notes: ["Keep the track explicit so thumb composition remains visible."],
} as const;

export const appSliderTokenContract = {
  semanticColors: [] as const,
  radii: [] as const,
  typography: [] as const,
} as const;
