/**
 * @afenda-owner app-group
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppGroup ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appGroupCompositionContract,
  appGroupControlSourcePath,
  appGroupDensityValues,
  appGroupLayoutValues,
  appGroupOptionalPropNames,
  appGroupReactAriaPrimitives,
  appGroupRequiredPropNames,
  appGroupTokenContract,
} from "./app-group.contract.primitive.shared";

export const appGroupManifest = defineApprovedComponentManifest({
  id: "app-group",
  owner: "components",
  exportName: "AppGroup",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appGroupControlSourcePath,

  styleSources: [
    {
      exportName: "appGroupVariants",
      sourcePath: appGroupControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appGroupReactAriaPrimitives],
  cva: {
    appGroupVariants: {
      required: true,
      variants: {
        layout: {
          values: [...appGroupLayoutValues],
          default: "inline",
        },
        density: {
          values: [...appGroupDensityValues],
          default: "default",
        },
      },
    },
  },

  props: {
    required: [...appGroupRequiredPropNames],
    optional: [...appGroupOptionalPropNames],
  },

  composition: {
    requiresChildren: appGroupCompositionContract.requiresChildren,
    requiredElements: [...appGroupCompositionContract.requiredElements],
    optionalElements: [...appGroupCompositionContract.optionalElements],
    notes: [...appGroupCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Use AppGroup when multiple related controls should expose a shared semantic group and unified interactive state styling.",
      "Keep per-control labels explicit, and add aria-label or aria-labelledby only when the grouped controls need an additional shared accessible name.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppGroup to wrap segmented inputs, adjacent inline actions, or other related governed controls that should share one visual shell.",
    ],
    avoidWhen: [
      "Do not use AppGroup as a generic div replacement when plain layout markup is clearer and no grouped control semantics are needed.",
    ],
  },

  tokens: {
    semanticColors: [...appGroupTokenContract.semanticColors],
    radii: [...appGroupTokenContract.radii],
    typography: [...appGroupTokenContract.typography],
  },

  constraints: [
    "AppGroup owns grouped control chrome and spacing but does not invent field-specific child APIs.",
    "Feature UI should consume this App* primitive instead of importing react-aria-components Group directly when the grouped-control pattern is shared.",
    "Keep child control composition explicit at the call site so workflow meaning stays legible.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
