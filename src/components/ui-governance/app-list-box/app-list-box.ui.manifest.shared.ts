/**
 * @afenda-owner app-list-box
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppListBox ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appListBoxCompositionContract,
  appListBoxControlSourcePath,
  appListBoxOptionalPropNames,
  appListBoxReactAriaPrimitives,
  appListBoxRequiredPropNames,
  appListBoxSizeValues,
  appListBoxTokenContract,
} from "./app-list-box.contract.primitive.shared";

export const appListBoxManifest = defineApprovedComponentManifest({
  id: "app-list-box",
  owner: "components",
  exportName: "AppListBox",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appListBoxControlSourcePath,

  styleSources: [
    {
      exportName: "appListBoxVariants",
      sourcePath: appListBoxControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appListBoxItemVariants",
      sourcePath: appListBoxControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appListBoxSectionVariants",
      sourcePath: appListBoxControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appListBoxHeaderVariants",
      sourcePath: appListBoxControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appListBoxTextVariants",
      sourcePath: appListBoxControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appListBoxLoadMoreItemVariants",
      sourcePath: appListBoxControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appListBoxReactAriaPrimitives],
  cva: {
    appListBoxVariants: {
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
          values: [...appListBoxSizeValues],
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
    appListBoxItemVariants: {
      required: true,
      variants: {
        size: {
          values: [...appListBoxSizeValues],
          default: "md",
        },
        selected: {
          values: ["true", "false"],
          default: "false",
        },
        focused: {
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
        href: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appListBoxSectionVariants: {
      required: true,
      variants: {
        size: {
          values: [...appListBoxSizeValues],
          default: "md",
        },
      },
    },
    appListBoxHeaderVariants: {
      required: true,
      variants: {
        size: {
          values: [...appListBoxSizeValues],
          default: "md",
        },
      },
    },
    appListBoxTextVariants: {
      required: true,
      variants: {
        description: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appListBoxLoadMoreItemVariants: {
      required: true,
      variants: {
        size: {
          values: [...appListBoxSizeValues],
          default: "md",
        },
      },
    },
  },

  props: {
    required: [...appListBoxRequiredPropNames],
    optional: [...appListBoxOptionalPropNames],
  },

  composition: {
    requiresChildren: appListBoxCompositionContract.requiresChildren,
    requiredElements: [...appListBoxCompositionContract.requiredElements],
    optionalElements: [...appListBoxCompositionContract.optionalElements],
    notes: [...appListBoxCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Provide aria-label or aria-labelledby so listbox purpose is explicit to assistive technology users.",
      "Keep children non-interactive; use AppGridList instead when items need embedded interactive controls.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppListBox for governed option collections, dense ERP pickers, and keyboard-first review lists.",
    ],
    avoidWhen: [
      "Do not use AppListBox when the workflow needs interactive children or richer record cards better served by AppGridList.",
    ],
  },

  tokens: {
    semanticColors: [...appListBoxTokenContract.semanticColors],
    radii: [...appListBoxTokenContract.radii],
    typography: [...appListBoxTokenContract.typography],
  },

  constraints: [
    "AppListBox owns the collection surface, item treatment, and selection indicator instead of exposing raw React Aria parts at shared product boundaries.",
    "Feature UI should consume AppListBoxItem, AppListBoxSection, AppListBoxHeader, and AppListBoxLoadMoreItem instead of importing react-aria-components ListBox primitives directly when the pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
