/**
 * @afenda-owner app-color-slider
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppColorSlider ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appColorSliderCompositionContract,
  appColorSliderControlSourcePath,
  appColorSliderOptionalPropNames,
  appColorSliderReactAriaPrimitives,
  appColorSliderRequiredPropNames,
  appColorSliderSizeValues,
  appColorSliderTokenContract,
} from "./app-color-slider.contract.primitive.shared";

export const appColorSliderManifest = defineApprovedComponentManifest({
  id: "app-color-slider",
  owner: "components",
  exportName: "AppColorSlider",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appColorSliderControlSourcePath,

  styleSources: [
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-color-slider/app-color-slider.control.primitive.client",
      exportName: "appColorSliderVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-color-slider/app-color-slider.control.primitive.client",
      exportName: "appColorSliderOutputVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-color-slider/app-color-slider.control.primitive.client",
      exportName: "appColorSliderTrackVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-color-slider/app-color-slider.control.primitive.client",
      exportName: "appColorSliderThumbVariants",
    },
  ],
  reactAriaPrimitives: [...appColorSliderReactAriaPrimitives],
  cva: {
    appColorSliderVariants: {
      required: true,
      variants: {
        size: {
          values: [...appColorSliderSizeValues],
          default: "md",
          required: false,
        },
        orientation: {
          values: ["horizontal", "vertical"],
          default: "horizontal",
          required: false,
        },
      },
    },
    appColorSliderOutputVariants: {
      required: true,
      variants: {
        orientation: {
          values: ["horizontal", "vertical"],
          default: "horizontal",
          required: false,
        },
      },
    },
    appColorSliderTrackVariants: {
      required: true,
      variants: {
        orientation: {
          values: ["horizontal", "vertical"],
          default: "horizontal",
          required: false,
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appColorSliderThumbVariants: {
      required: true,
      variants: {
        dragging: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        focusVisible: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appColorSliderRequiredPropNames],
    optional: [...appColorSliderOptionalPropNames],
  },

  composition: {
    requiresChildren: appColorSliderCompositionContract.requiresChildren,
    requiredElements: [...appColorSliderCompositionContract.requiredElements],
    optionalElements: [...appColorSliderCompositionContract.optionalElements],
    notes: [...appColorSliderCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppColorSlider owns the label, output, track, and thumb for single-channel color adjustment.",
      "The primitive requires label, aria-label, or aria-labelledby so the slider has an explicit accessible name.",
      "The slider output remains hidden in vertical mode to preserve compact layout while keeping the control itself accessible.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppColorSlider when operators must adjust one explicit color channel with a governed output and track.",
    ],
    avoidWhen: [
      "Do not use AppColorSlider when a two-axis area or a text field is the better fit for the workflow.",
    ],
  },

  tokens: {
    semanticColors: [...appColorSliderTokenContract.semanticColors],
    radii: [...appColorSliderTokenContract.radii],
    typography: [...appColorSliderTokenContract.typography],
  },

  constraints: [
    "AppColorSlider owns its internal track and thumb so feature code does not recompose channel sliders inconsistently.",
    "Feature UI should consume this App* primitive instead of importing react-aria-components directly when the pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
