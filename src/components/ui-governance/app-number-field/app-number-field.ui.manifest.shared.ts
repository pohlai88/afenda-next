/**
 * @afenda-owner app-number-field
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppNumberField ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appNumberFieldCompositionContract,
  appNumberFieldControlSourcePath,
  appNumberFieldOptionalPropNames,
  appNumberFieldReactAriaPrimitives,
  appNumberFieldRequiredPropNames,
  appNumberFieldTokenContract,
} from "./app-number-field.contract.primitive.shared";

export const appNumberFieldManifest = defineApprovedComponentManifest({
  id: "app-number-field",
  owner: "components",
  exportName: "AppNumberField",
  status: "review",

  category: "component",
  boundary: "client",

  sourcePath: appNumberFieldControlSourcePath,

  styleSources: [],
  reactAriaPrimitives: [...appNumberFieldReactAriaPrimitives],
  cva: {},

  props: {
    required: [...appNumberFieldRequiredPropNames],
    optional: [...appNumberFieldOptionalPropNames],
  },

  composition: {
    requiresChildren: appNumberFieldCompositionContract.requiresChildren,
    requiredElements: [...appNumberFieldCompositionContract.requiredElements],
    optionalElements: [...appNumberFieldCompositionContract.optionalElements],
    notes: [...appNumberFieldCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: ["Keep the numeric input group explicit."],
  },

  usage: {
    useWhen: ["Use AppNumberField for governed field entry and validation flows."],
    avoidWhen: ["Do not use AppNumberField when a display-only or non-form primitive is clearer."],
  },

  tokens: {
    semanticColors: [...appNumberFieldTokenContract.semanticColors],
    radii: [...appNumberFieldTokenContract.radii],
    typography: [...appNumberFieldTokenContract.typography],
  },

  constraints: ["This component is a thin canonical React Aria wrapper, not a second design system.", "Feature UI should consume this App* primitive instead of importing react-aria-components directly when the pattern is shared.", "Keep the documented child composition explicit at the call site."],

  verdict: {
    cvaCoverage: "not-applicable",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
