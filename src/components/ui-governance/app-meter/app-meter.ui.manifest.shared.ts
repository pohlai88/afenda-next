/**
 * @afenda-owner app-meter
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppMeter ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appMeterCompositionContract,
  appMeterControlSourcePath,
  appMeterOptionalPropNames,
  appMeterReactAriaPrimitives,
  appMeterRequiredPropNames,
  appMeterSizeValues,
  appMeterTokenContract,
  appMeterToneValues,
} from "./app-meter.contract.primitive.shared";

export const appMeterManifest = defineApprovedComponentManifest({
  id: "app-meter",
  owner: "components",
  exportName: "AppMeter",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appMeterControlSourcePath,

  styleSources: [
    {
      exportName: "appMeterVariants",
      sourcePath: appMeterControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appMeterLabelVariants",
      sourcePath: appMeterControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appMeterValueVariants",
      sourcePath: appMeterControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appMeterTrackVariants",
      sourcePath: appMeterControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appMeterFillVariants",
      sourcePath: appMeterControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appMeterReactAriaPrimitives],
  cva: {
    appMeterVariants: {
      required: true,
      variants: {
        size: {
          values: [...appMeterSizeValues],
          default: "md",
        },
      },
    },
    appMeterLabelVariants: {
      required: true,
      variants: {
        base: {
          values: ["default"],
          default: "default",
        },
      },
    },
    appMeterValueVariants: {
      required: true,
      variants: {
        tone: {
          values: appMeterToneValues.filter((value) => value !== "auto"),
          default: "success",
        },
        size: {
          values: [...appMeterSizeValues],
          default: "md",
        },
      },
    },
    appMeterTrackVariants: {
      required: true,
      variants: {
        size: {
          values: [...appMeterSizeValues],
          default: "md",
        },
      },
    },
    appMeterFillVariants: {
      required: true,
      variants: {
        tone: {
          values: appMeterToneValues.filter((value) => value !== "auto"),
          default: "success",
        },
      },
    },
  },

  props: {
    required: [...appMeterRequiredPropNames],
    optional: [...appMeterOptionalPropNames],
  },

  composition: {
    requiresChildren: appMeterCompositionContract.requiresChildren,
    requiredElements: [...appMeterCompositionContract.requiredElements],
    optionalElements: [...appMeterCompositionContract.optionalElements],
    notes: [...appMeterCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppMeter requires label, aria-label, or aria-labelledby so bounded operational values remain identifiable.",
      "The meter remains read-only and should describe status rather than collect input.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppMeter for governed bounded utilization, completion, and risk capacity signals where the operator benefits from a quick status read.",
    ],
    avoidWhen: [
      "Do not use AppMeter for interactive entry, indeterminate loading, or workflows that require direct user adjustment.",
    ],
  },

  tokens: {
    semanticColors: [...appMeterTokenContract.semanticColors],
    radii: [...appMeterTokenContract.radii],
    typography: [...appMeterTokenContract.typography],
  },

  constraints: [
    "AppMeter is a governed read-only status primitive and should not be repurposed as an input control.",
    "Feature UI should rely on the built-in label, value, and fill treatment instead of reimplementing meter chrome ad hoc.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
