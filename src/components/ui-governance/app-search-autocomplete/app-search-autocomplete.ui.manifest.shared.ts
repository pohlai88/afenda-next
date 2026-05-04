/**
 * @afenda-owner app-search-autocomplete
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppSearchAutocomplete ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appSearchAutocompleteCompositionContract,
  appSearchAutocompleteControlSourcePath,
  appSearchAutocompleteDensityValues,
  appSearchAutocompleteLayoutValues,
  appSearchAutocompleteOptionalPropNames,
  appSearchAutocompleteReactAriaPrimitives,
  appSearchAutocompleteRequiredPropNames,
  appSearchAutocompleteTokenContract,
} from "./app-search-autocomplete.contract.primitive.shared";

export const appSearchAutocompleteManifest = defineApprovedComponentManifest({
  id: "app-search-autocomplete",
  owner: "components",
  exportName: "AppSearchAutocomplete",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appSearchAutocompleteControlSourcePath,

  styleSources: [
    {
      exportName: "appSearchAutocompleteContainerVariants",
      sourcePath: appSearchAutocompleteControlSourcePath,
      type: "cva",
    },
  ],

  reactAriaPrimitives: [...appSearchAutocompleteReactAriaPrimitives],

  cva: {
    appSearchAutocompleteContainerVariants: {
      required: true,
      variants: {
        layout: {
          values: [...appSearchAutocompleteLayoutValues],
          default: "stack",
        },
        density: {
          values: [...appSearchAutocompleteDensityValues],
          default: "default",
        },
      },
    },
  },

  props: {
    required: [...appSearchAutocompleteRequiredPropNames],
    optional: [...appSearchAutocompleteOptionalPropNames],
  },

  composition: {
    requiresChildren: appSearchAutocompleteCompositionContract.requiresChildren,
    requiredElements: [
      ...appSearchAutocompleteCompositionContract.requiredElements,
    ],
    optionalElements: [
      ...appSearchAutocompleteCompositionContract.optionalElements,
    ],
    notes: [...appSearchAutocompleteCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Must contain SearchField or TextField as the first direct child.",
      "Must contain Menu, ListBox, TagGroup, GridList, or Table as the second direct child.",
      "Virtual focus should remain enabled unless the workflow requires direct tabbing into the collection.",
    ],
  },

  usage: {
    useWhen: [
      "Use for command palettes, searchable menus, filterable selects, tag search, and dense ERP lookup flows.",
    ],
    avoidWhen: [
      "Do not use as a standalone input without a collection.",
      "Do not use for server search unless inputValue and onInputChange are controlled by the parent.",
    ],
  },

  tokens: {
    semanticColors: [...appSearchAutocompleteTokenContract.semanticColors],
    radii: [...appSearchAutocompleteTokenContract.radii],
    typography: [...appSearchAutocompleteTokenContract.typography],
  },

  constraints: [
    "This component is a thin React Aria wrapper, not a new primitive system.",
    "Do not register nested child SearchField, Menu, or ListBox again inside this manifest.",
    "Filtering policy belongs to the caller: pass filter for local search, omit filter for controlled async data.",
    "The class contract styles the explicit wrapper container because React Aria Autocomplete is context-only and does not render its own DOM element.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
