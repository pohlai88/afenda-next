/**
 * @afenda-owner app-toggle-button
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppToggleButton ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appToggleButtonCompositionContract,
  appToggleButtonControlSourcePath,
  appToggleButtonOptionalPropNames,
  appToggleButtonReactAriaPrimitives,
  appToggleButtonRequiredPropNames,
  appToggleButtonTokenContract,
} from "./app-toggle-button.contract.primitive.shared";

export const appToggleButtonManifest = defineApprovedComponentManifest({
  id: "app-toggle-button",
  owner: "components",
  exportName: "AppToggleButton",
  status: "review",

  category: "component",
  boundary: "client",

  sourcePath: appToggleButtonControlSourcePath,

  styleSources: [],
  reactAriaPrimitives: [...appToggleButtonReactAriaPrimitives],
  cva: {},

  props: {
    required: [...appToggleButtonRequiredPropNames],
    optional: [...appToggleButtonOptionalPropNames],
  },

  composition: {
    requiresChildren: appToggleButtonCompositionContract.requiresChildren,
    requiredElements: [...appToggleButtonCompositionContract.requiredElements],
    optionalElements: [...appToggleButtonCompositionContract.optionalElements],
    notes: [...appToggleButtonCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: ["Thin canonical wrapper over React Aria. Prefer this App* boundary over shared direct imports of react-aria-components."],
  },

  usage: {
    useWhen: ["Use AppToggleButton for governed choice and selection workflows."],
    avoidWhen: ["Do not use AppToggleButton when freeform text entry is the primary interaction."],
  },

  tokens: {
    semanticColors: [...appToggleButtonTokenContract.semanticColors],
    radii: [...appToggleButtonTokenContract.radii],
    typography: [...appToggleButtonTokenContract.typography],
  },

  constraints: ["This component is a thin canonical React Aria wrapper, not a second design system.", "Feature UI should consume this App* primitive instead of importing react-aria-components directly when the pattern is shared."],

  verdict: {
    cvaCoverage: "not-applicable",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
