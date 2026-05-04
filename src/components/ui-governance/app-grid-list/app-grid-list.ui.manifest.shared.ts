/**
 * @afenda-owner app-grid-list
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppGridList ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appGridListCompositionContract,
  appGridListControlSourcePath,
  appGridListOptionalPropNames,
  appGridListReactAriaPrimitives,
  appGridListRequiredPropNames,
  appGridListTokenContract,
} from "./app-grid-list.contract.primitive.shared";

export const appGridListManifest = defineApprovedComponentManifest({
  id: "app-grid-list",
  owner: "components",
  exportName: "AppGridList",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appGridListControlSourcePath,

  styleSources: [
    {
      exportName: "appGridListVariants",
      sourcePath: appGridListControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appGridListItemVariants",
      sourcePath: appGridListControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appGridListSectionVariants",
      sourcePath: appGridListControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appGridListHeaderVariants",
      sourcePath: appGridListControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appGridListTextVariants",
      sourcePath: appGridListControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appGridListLoadMoreItemVariants",
      sourcePath: appGridListControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appGridListReactAriaPrimitives],
  cva: {
    appGridListVariants: {
      required: true,
      variants: {
        layout: {
          values: ["stack", "grid"],
          default: "stack",
        },
        orientation: {
          values: ["vertical", "horizontal"],
          default: "vertical",
        },
        size: {
          values: ["md", "sm"],
          default: "md",
        },
        empty: {
          values: ["true", "false"],
          default: "false",
        },
        dropTarget: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appGridListItemVariants: {
      required: true,
      variants: {
        size: {
          values: ["md", "sm"],
          default: "md",
        },
        selected: {
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
      },
    },
    appGridListSectionVariants: {
      required: true,
      variants: {
        size: {
          values: ["md", "sm"],
          default: "md",
        },
      },
    },
    appGridListHeaderVariants: {
      required: true,
      variants: {
        size: {
          values: ["md", "sm"],
          default: "md",
        },
      },
    },
    appGridListTextVariants: {
      required: true,
      variants: {
        description: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appGridListLoadMoreItemVariants: {
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
    required: [...appGridListRequiredPropNames],
    optional: [...appGridListOptionalPropNames],
  },

  composition: {
    requiresChildren: appGridListCompositionContract.requiresChildren,
    requiredElements: [...appGridListCompositionContract.requiredElements],
    optionalElements: [...appGridListCompositionContract.optionalElements],
    notes: [...appGridListCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Provide aria-label or aria-labelledby so the collection is announced with a stable name.",
      "Selection and drag affordances stay inside the owned item surface so keyboard and assistive-technology interactions remain consistent.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppGridList for governed interactive collections, review queues, and selectable result sets that need richer item chrome than a simple list.",
    ],
    avoidWhen: [
      "Do not use AppGridList when tabular data should remain in AppTable or when a lighter list primitive is sufficient.",
    ],
  },

  tokens: {
    semanticColors: [...appGridListTokenContract.semanticColors],
    radii: [...appGridListTokenContract.radii],
    typography: [...appGridListTokenContract.typography],
  },

  constraints: [
    "AppGridList owns collection and item styling but leaves item body content explicit so ERP screens can keep domain text, badges, and previews local.",
    "Feature UI should consume AppGridList exports instead of importing raw React Aria GridList primitives directly for shared collection patterns.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
