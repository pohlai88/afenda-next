/**
 * @afenda-owner app-autocomplete
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppAutocomplete ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appAutocompleteCompositionContract,
  appAutocompleteControlSourcePath,
  appAutocompleteOptionalPropNames,
  appAutocompleteReactAriaPrimitives,
  appAutocompleteRequiredPropNames,
  appAutocompleteTokenContract,
} from "./app-autocomplete.contract.primitive.shared";

export const appAutocompleteManifest = defineApprovedComponentManifest({
  id: "app-autocomplete",
  owner: "components",
  exportName: "AppAutocomplete",
  status: "review",

  category: "component",
  boundary: "client",

  sourcePath: appAutocompleteControlSourcePath,

  styleSources: [],
  reactAriaPrimitives: [...appAutocompleteReactAriaPrimitives],
  cva: {},

  props: {
    required: [...appAutocompleteRequiredPropNames],
    optional: [...appAutocompleteOptionalPropNames],
  },

  composition: {
    requiresChildren: appAutocompleteCompositionContract.requiresChildren,
    requiredElements: [...appAutocompleteCompositionContract.requiredElements],
    optionalElements: [...appAutocompleteCompositionContract.optionalElements],
    notes: [...appAutocompleteCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: ["Keep the input primitive and filterable collection explicit at the canonical boundary.", "Prefer AppSearchAutocomplete when the ERP-specific search wrapper is the better fit."],
  },

  usage: {
    useWhen: ["Use AppAutocomplete for governed field entry and validation flows."],
    avoidWhen: ["Do not use AppAutocomplete when a display-only or non-form primitive is clearer."],
  },

  tokens: {
    semanticColors: [...appAutocompleteTokenContract.semanticColors],
    radii: [...appAutocompleteTokenContract.radii],
    typography: [...appAutocompleteTokenContract.typography],
  },

  constraints: ["This component is a thin canonical React Aria wrapper, not a second design system.", "Feature UI should consume this App* primitive instead of importing react-aria-components directly when the pattern is shared.", "Keep the documented child composition explicit at the call site."],

  verdict: {
    cvaCoverage: "not-applicable",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
