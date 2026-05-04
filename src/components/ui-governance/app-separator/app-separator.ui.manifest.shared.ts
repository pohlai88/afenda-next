/**
 * @afenda-owner app-separator
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppSeparator ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appSeparatorCompositionContract,
  appSeparatorControlSourcePath,
  appSeparatorOptionalPropNames,
  appSeparatorOrientationValues,
  appSeparatorReactAriaPrimitives,
  appSeparatorRequiredPropNames,
  appSeparatorTokenContract,
} from "./app-separator.contract.primitive.shared";

export const appSeparatorManifest = defineApprovedComponentManifest({
  id: "app-separator",
  owner: "components",
  exportName: "AppSeparator",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appSeparatorControlSourcePath,

  styleSources: [
    {
      exportName: "appSeparatorVariants",
      sourcePath: appSeparatorControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appSeparatorReactAriaPrimitives],
  cva: {
    appSeparatorVariants: {
      required: true,
      variants: {
        orientation: {
          values: [...appSeparatorOrientationValues],
          default: "horizontal",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appSeparatorRequiredPropNames],
    optional: [...appSeparatorOptionalPropNames],
  },

  composition: {
    requiresChildren: appSeparatorCompositionContract.requiresChildren,
    requiredElements: [...appSeparatorCompositionContract.requiredElements],
    optionalElements: [...appSeparatorCompositionContract.optionalElements],
    notes: [...appSeparatorCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppSeparator preserves semantic separator behavior for assistive technology while keeping divider styling consistent.",
      "Use vertical orientation only when the surrounding layout genuinely stacks regions side-by-side.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppSeparator to divide sections, grouped controls, or adjacent utility regions in governed ERP layouts.",
    ],
    avoidWhen: [
      "Do not use AppSeparator as a substitute for spacing when no semantic section break exists.",
      "Do not use AppSeparator to fake container borders when a panel or field boundary is the clearer primitive.",
    ],
  },

  tokens: {
    semanticColors: [...appSeparatorTokenContract.semanticColors],
    radii: [...appSeparatorTokenContract.radii],
    typography: [...appSeparatorTokenContract.typography],
  },

  constraints: [
    "AppSeparator should remain a simple governed divider surface rather than a general layout primitive.",
    "Feature UI should consume AppSeparator instead of importing react-aria-components directly when the divider pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
