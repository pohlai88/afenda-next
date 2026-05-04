/**
 * @afenda-owner app-progress-bar
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppProgressBar ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appProgressBarCompositionContract,
  appProgressBarControlSourcePath,
  appProgressBarOptionalPropNames,
  appProgressBarReactAriaPrimitives,
  appProgressBarRequiredPropNames,
  appProgressBarSizeValues,
  appProgressBarTokenContract,
} from "./app-progress-bar.contract.primitive.shared";

export const appProgressBarManifest = defineApprovedComponentManifest({
  id: "app-progress-bar",
  owner: "components",
  exportName: "AppProgressBar",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appProgressBarControlSourcePath,

  styleSources: [
    {
      exportName: "appProgressBarVariants",
      sourcePath: appProgressBarControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appProgressBarLabelVariants",
      sourcePath: appProgressBarControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appProgressBarValueVariants",
      sourcePath: appProgressBarControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appProgressBarTrackVariants",
      sourcePath: appProgressBarControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appProgressBarFillVariants",
      sourcePath: appProgressBarControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appProgressBarReactAriaPrimitives],
  cva: {
    appProgressBarVariants: {
      required: true,
      variants: {
        size: {
          values: [...appProgressBarSizeValues],
          default: "md",
        },
      },
    },
    appProgressBarLabelVariants: {
      required: true,
      variants: {
        base: {
          values: ["default"],
          default: "default",
        },
      },
    },
    appProgressBarValueVariants: {
      required: true,
      variants: {
        size: {
          values: [...appProgressBarSizeValues],
          default: "md",
        },
      },
    },
    appProgressBarTrackVariants: {
      required: true,
      variants: {
        size: {
          values: [...appProgressBarSizeValues],
          default: "md",
        },
      },
    },
    appProgressBarFillVariants: {
      required: true,
      variants: {
        size: {
          values: [...appProgressBarSizeValues],
          default: "md",
        },
        indeterminate: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
  },

  props: {
    required: [...appProgressBarRequiredPropNames],
    optional: [...appProgressBarOptionalPropNames],
  },

  composition: {
    requiresChildren: appProgressBarCompositionContract.requiresChildren,
    requiredElements: [...appProgressBarCompositionContract.requiredElements],
    optionalElements: [...appProgressBarCompositionContract.optionalElements],
    notes: [...appProgressBarCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppProgressBar requires label, aria-label, or aria-labelledby so the tracked operation remains identifiable.",
      "Indeterminate progress should communicate active work without implying a false completion percentage.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppProgressBar for governed determinate or indeterminate task progress, uploads, sync work, and long-running operational actions.",
    ],
    avoidWhen: [
      "Do not use AppProgressBar for bounded status thresholds that should remain semantic meters rather than task progress.",
    ],
  },

  tokens: {
    semanticColors: [...appProgressBarTokenContract.semanticColors],
    radii: [...appProgressBarTokenContract.radii],
    typography: [...appProgressBarTokenContract.typography],
  },

  constraints: [
    "AppProgressBar is a governed operational progress primitive and should not be repurposed as an input or general status badge.",
    "Feature UI should rely on the built-in label, value, and fill treatment instead of reimplementing progress chrome ad hoc.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
