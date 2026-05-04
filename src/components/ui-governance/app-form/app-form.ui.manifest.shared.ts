/**
 * @afenda-owner app-form
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppForm ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appFormCompositionContract,
  appFormControlSourcePath,
  appFormDensityValues,
  appFormOptionalPropNames,
  appFormReactAriaPrimitives,
  appFormRequiredPropNames,
  appFormTokenContract,
} from "./app-form.contract.primitive.shared";

export const appFormManifest = defineApprovedComponentManifest({
  id: "app-form",
  owner: "components",
  exportName: "AppForm",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appFormControlSourcePath,

  styleSources: [
    {
      exportName: "appFormVariants",
      sourcePath: appFormControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appFormReactAriaPrimitives],
  cva: {
    appFormVariants: {
      required: true,
      variants: {
        density: {
          values: [...appFormDensityValues],
          default: "default",
        },
      },
    },
  },

  props: {
    required: [...appFormRequiredPropNames],
    optional: [...appFormOptionalPropNames],
  },

  composition: {
    requiresChildren: appFormCompositionContract.requiresChildren,
    requiredElements: [...appFormCompositionContract.requiredElements],
    optionalElements: [...appFormCompositionContract.optionalElements],
    notes: [...appFormCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Keep form submission and validation semantics on the form element instead of recreating them in feature-local wrappers.",
      "Use onInvalid plus an alert region when workflows need controlled focus management for validation failures.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppForm to group governed fields and actions into an explicit submission boundary for ERP data entry flows.",
    ],
    avoidWhen: [
      "Do not use AppForm as a generic div replacement when no submission or validation boundary is needed.",
    ],
  },

  tokens: {
    semanticColors: [...appFormTokenContract.semanticColors],
    radii: [...appFormTokenContract.radii],
    typography: [...appFormTokenContract.typography],
  },

  constraints: [
    "AppForm owns shared vertical form spacing but does not invent field or action child APIs.",
    "Feature UI should compose governed field primitives inside AppForm rather than importing react-aria-components Form directly for shared product patterns.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
