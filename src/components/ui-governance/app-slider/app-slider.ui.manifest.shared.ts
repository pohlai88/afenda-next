/**
 * @afenda-owner app-slider
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppSlider ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appSliderCompositionContract,
  appSliderControlSourcePath,
  appSliderOptionalPropNames,
  appSliderReactAriaPrimitives,
  appSliderRequiredPropNames,
  appSliderTokenContract,
} from "./app-slider.contract.primitive.shared";

export const appSliderManifest = defineApprovedComponentManifest({
  id: "app-slider",
  owner: "components",
  exportName: "AppSlider",
  status: "review",

  category: "component",
  boundary: "client",

  sourcePath: appSliderControlSourcePath,

  styleSources: [],
  reactAriaPrimitives: [...appSliderReactAriaPrimitives],
  cva: {},

  props: {
    required: [...appSliderRequiredPropNames],
    optional: [...appSliderOptionalPropNames],
  },

  composition: {
    requiresChildren: appSliderCompositionContract.requiresChildren,
    requiredElements: [...appSliderCompositionContract.requiredElements],
    optionalElements: [...appSliderCompositionContract.optionalElements],
    notes: [...appSliderCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: ["Keep the track explicit so thumb composition remains visible."],
  },

  usage: {
    useWhen: ["Use AppSlider for governed field entry and validation flows."],
    avoidWhen: ["Do not use AppSlider when a display-only or non-form primitive is clearer."],
  },

  tokens: {
    semanticColors: [...appSliderTokenContract.semanticColors],
    radii: [...appSliderTokenContract.radii],
    typography: [...appSliderTokenContract.typography],
  },

  constraints: ["This component is a thin canonical React Aria wrapper, not a second design system.", "Feature UI should consume this App* primitive instead of importing react-aria-components directly when the pattern is shared.", "Keep the documented child composition explicit at the call site."],

  verdict: {
    cvaCoverage: "not-applicable",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
