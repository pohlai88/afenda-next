/**
 * @afenda-owner app-color-wheel
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppColorWheel ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appColorWheelCompositionContract,
  appColorWheelControlSourcePath,
  appColorWheelOptionalPropNames,
  appColorWheelReactAriaPrimitives,
  appColorWheelRequiredPropNames,
  appColorWheelSizeValues,
  appColorWheelTokenContract,
} from "./app-color-wheel.contract.primitive.shared";

export const appColorWheelManifest = defineApprovedComponentManifest({
  id: "app-color-wheel",
  owner: "components",
  exportName: "AppColorWheel",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appColorWheelControlSourcePath,

  styleSources: [
    {
      exportName: "appColorWheelVariants",
      sourcePath: appColorWheelControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appColorWheelTrackVariants",
      sourcePath: appColorWheelControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appColorWheelThumbVariants",
      sourcePath: appColorWheelControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appColorWheelReactAriaPrimitives],
  cva: {
    appColorWheelVariants: {
      required: true,
      variants: {
        size: {
          values: [...appColorWheelSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appColorWheelTrackVariants: {
      required: true,
      variants: {
        disabled: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appColorWheelThumbVariants: {
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
    required: [...appColorWheelRequiredPropNames],
    optional: [...appColorWheelOptionalPropNames],
  },

  composition: {
    requiresChildren: appColorWheelCompositionContract.requiresChildren,
    requiredElements: [...appColorWheelCompositionContract.requiredElements],
    optionalElements: [...appColorWheelCompositionContract.optionalElements],
    notes: [...appColorWheelCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Provide aria-label or aria-labelledby so the wheel has an explicit accessible name.",
      "AppColorWheel owns the track and thumb, preserving consistent keyboard and pointer hue editing.",
      "Wheel geometry is governed by the shared primitive rather than tuned ad hoc in feature code.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppColorWheel when operators need controlled hue adjustment as part of a governed color-editing workflow.",
    ],
    avoidWhen: [
      "Do not use AppColorWheel when a simple swatch, field, or one-axis slider is sufficient.",
    ],
  },

  tokens: {
    semanticColors: [...appColorWheelTokenContract.semanticColors],
    radii: [...appColorWheelTokenContract.radii],
    typography: [...appColorWheelTokenContract.typography],
  },

  constraints: [
    "AppColorWheel owns the internal ColorWheelTrack and ColorThumb so feature code does not recompose hue editing inconsistently.",
    "Do not import raw React Aria ColorWheel into feature code when this governed primitive is sufficient.",
    "Keep radius geometry inside the primitive; use size rather than passing raw innerRadius or outerRadius from feature code.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
