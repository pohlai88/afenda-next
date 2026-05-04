/**
 * @afenda-owner app-search-field
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppSearchField ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appSearchFieldCompositionContract,
  appSearchFieldControlSourcePath,
  appSearchFieldOptionalPropNames,
  appSearchFieldReactAriaPrimitives,
  appSearchFieldRequiredPropNames,
  appSearchFieldSizeValues,
  appSearchFieldTokenContract,
} from "./app-search-field.contract.primitive.shared";

export const appSearchFieldManifest = defineApprovedComponentManifest({
  id: "app-search-field",
  owner: "components",
  exportName: "AppSearchField",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appSearchFieldControlSourcePath,

  styleSources: [
    {
      exportName: "appSearchFieldVariants",
      sourcePath: appSearchFieldControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appSearchFieldControlVariants",
      sourcePath: appSearchFieldControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appSearchFieldIconVariants",
      sourcePath: appSearchFieldControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appSearchFieldInputVariants",
      sourcePath: appSearchFieldControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appSearchFieldClearButtonVariants",
      sourcePath: appSearchFieldControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appSearchFieldReactAriaPrimitives],
  cva: {
    appSearchFieldVariants: {
      required: true,
      variants: {
        size: {
          values: [...appSearchFieldSizeValues],
          default: "md",
        },
      },
    },
    appSearchFieldControlVariants: {
      required: true,
      variants: {
        size: {
          values: [...appSearchFieldSizeValues],
          default: "md",
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
        },
        invalid: {
          values: ["true", "false"],
          default: "false",
        },
        readOnly: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appSearchFieldIconVariants: {
      required: true,
      variants: {
        size: {
          values: [...appSearchFieldSizeValues],
          default: "md",
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appSearchFieldInputVariants: {
      required: true,
      variants: {
        size: {
          values: [...appSearchFieldSizeValues],
          default: "md",
        },
      },
    },
    appSearchFieldClearButtonVariants: {
      required: true,
      variants: {
        size: {
          values: [...appSearchFieldSizeValues],
          default: "md",
        },
        empty: {
          values: ["true", "false"],
          default: "true",
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
  },

  props: {
    required: [...appSearchFieldRequiredPropNames],
    optional: [...appSearchFieldOptionalPropNames],
  },

  composition: {
    requiresChildren: appSearchFieldCompositionContract.requiresChildren,
    requiredElements: [...appSearchFieldCompositionContract.requiredElements],
    optionalElements: [...appSearchFieldCompositionContract.optionalElements],
    notes: [...appSearchFieldCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppSearchField requires label, aria-label, or aria-labelledby so the search intent remains identifiable.",
      "The built-in clear button remains keyboard accessible while hiding itself when the field is empty.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppSearchField for governed operator search, filter entry, lookup bars, and submit-on-enter query workflows.",
    ],
    avoidWhen: [
      "Do not use AppSearchField when the input is not semantically a search query; use the more general text-field primitives instead.",
    ],
  },

  tokens: {
    semanticColors: [...appSearchFieldTokenContract.semanticColors],
    radii: [...appSearchFieldTokenContract.radii],
    typography: [...appSearchFieldTokenContract.typography],
  },

  constraints: [
    "AppSearchField owns the search icon, clear affordance, and field messaging so search input behaves consistently across ERP work surfaces.",
    "Feature UI should extend this primitive through props rather than reassembling raw SearchField composition for shared patterns.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
