/**
 * @afenda-owner app-table
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppTable ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appTableCompositionContract,
  appTableControlSourcePath,
  appTableOptionalPropNames,
  appTableReactAriaPrimitives,
  appTableRequiredPropNames,
  appTableTokenContract,
} from "./app-table.contract.primitive.shared";

export const appTableManifest = defineApprovedComponentManifest({
  id: "app-table",
  owner: "components",
  exportName: "AppTable",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appTableControlSourcePath,

  styleSources: [
    {
      exportName: "appTableVariants",
      sourcePath: appTableControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTableColumnVariants",
      sourcePath: appTableControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTableBodyVariants",
      sourcePath: appTableControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTableRowVariants",
      sourcePath: appTableControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTableCellVariants",
      sourcePath: appTableControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTableResizerVariants",
      sourcePath: appTableControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTableLoadMoreItemVariants",
      sourcePath: appTableControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appTableReactAriaPrimitives],
  cva: {
    appTableVariants: {
      required: true,
      variants: {
        size: {
          values: ["md", "sm"],
          default: "md",
        },
        dropTarget: {
          values: ["true", "false"],
          default: "false",
        },
        focusVisible: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appTableColumnVariants: {
      required: true,
      variants: {
        size: {
          values: ["md", "sm"],
          default: "md",
        },
        sortable: {
          values: ["true", "false"],
          default: "false",
        },
        sorted: {
          values: ["true", "false"],
          default: "false",
        },
        pressed: {
          values: ["true", "false"],
          default: "false",
        },
        focusVisible: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appTableBodyVariants: {
      required: true,
      variants: {
        empty: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appTableRowVariants: {
      required: true,
      variants: {
        selected: {
          values: ["true", "false"],
          default: "false",
        },
        pressed: {
          values: ["true", "false"],
          default: "false",
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
        },
        dropTarget: {
          values: ["true", "false"],
          default: "false",
        },
        focusVisible: {
          values: ["true", "false"],
          default: "false",
        },
        href: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appTableCellVariants: {
      required: true,
      variants: {
        size: {
          values: ["md", "sm"],
          default: "md",
        },
        focusVisible: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appTableResizerVariants: {
      required: true,
      variants: {
        resizing: {
          values: ["true", "false"],
          default: "false",
        },
        focusVisible: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appTableLoadMoreItemVariants: {
      required: true,
      variants: {
        size: {
          values: ["md", "sm"],
          default: "md",
        },
      },
    },
  },

  props: {
    required: [...appTableRequiredPropNames],
    optional: [...appTableOptionalPropNames],
  },

  composition: {
    requiresChildren: appTableCompositionContract.requiresChildren,
    requiredElements: [...appTableCompositionContract.requiredElements],
    optionalElements: [...appTableCompositionContract.optionalElements],
    notes: [...appTableCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Provide aria-label or aria-labelledby so assistive technology announces the table with a stable name.",
      "Selection, drag handles, chevrons, and sort cues stay inside the owned table exports so keyboard and screen-reader behavior remains consistent.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppTable for governed dense record grids, review queues, hierarchical data tables, and operator surfaces that need selection, sorting, or row actions.",
    ],
    avoidWhen: [
      "Do not use AppTable when a lighter list primitive is enough or when the data should remain in card or form layouts instead of rows and columns.",
    ],
  },

  tokens: {
    semanticColors: [...appTableTokenContract.semanticColors],
    radii: [...appTableTokenContract.radii],
    typography: [...appTableTokenContract.typography],
  },

  constraints: [
    "AppTable owns dense table chrome but leaves domain column definitions and cell content explicit so ERP workflows preserve business meaning at the route boundary.",
    "Feature UI should consume AppTable exports instead of importing raw React Aria table primitives directly for shared tabular patterns.",
    "Keep AppTableHeader and AppTableBody as direct children so the governed composition remains legible and auditable.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
