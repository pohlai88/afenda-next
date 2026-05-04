/**
 * @afenda-owner app-toast
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppToastRegion ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appToastCompositionContract,
  appToastControlSourcePath,
  appToastOptionalPropNames,
  appToastReactAriaPrimitives,
  appToastRequiredPropNames,
  appToastTokenContract,
} from "./app-toast.contract.primitive.shared";

export const appToastManifest = defineApprovedComponentManifest({
  id: "app-toast",
  owner: "components",
  exportName: "AppToastRegion",
  status: "review",

  category: "component",
  boundary: "client",

  sourcePath: appToastControlSourcePath,

  styleSources: [],
  reactAriaPrimitives: [...appToastReactAriaPrimitives],
  cva: {},

  props: {
    required: [...appToastRequiredPropNames],
    optional: [...appToastOptionalPropNames],
  },

  composition: {
    requiresChildren: appToastCompositionContract.requiresChildren,
    requiredElements: [...appToastCompositionContract.requiredElements],
    optionalElements: [...appToastCompositionContract.optionalElements],
    notes: [...appToastCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppToastRegion is a landmark region (F6 / Shift+F6) with a labeled dismiss control beside ToastContent.",
      "Auto-dismiss via ToastQueue options should stay at least 5 seconds and only for non-critical copy.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppToastRegion and appToastQueue for short-lived operator feedback that does not belong in persistent page chrome.",
    ],
    avoidWhen: [
      "Do not use toasts for required workflow steps, validation that blocks submit, or information that is not recoverable elsewhere.",
    ],
  },

  tokens: {
    semanticColors: [...appToastTokenContract.semanticColors],
    radii: [...appToastTokenContract.radii],
    typography: [...appToastTokenContract.typography],
  },

  constraints: [
    "Mount AppToastRegion once near the root layout; trigger notifications through appToastQueue from client code.",
    "Feature UI should consume this App* surface instead of importing react-aria-components toast primitives directly.",
  ],

  verdict: {
    cvaCoverage: "not-applicable",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
