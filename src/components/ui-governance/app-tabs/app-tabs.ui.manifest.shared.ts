/**
 * @afenda-owner app-tabs
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppTabs ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appTabsCompositionContract,
  appTabsControlSourcePath,
  appTabsOrientationValues,
  appTabsOptionalPropNames,
  appTabsReactAriaPrimitives,
  appTabsRequiredPropNames,
  appTabsSizeValues,
  appTabsTokenContract,
} from "./app-tabs.contract.primitive.shared";

export const appTabsManifest = defineApprovedComponentManifest({
  id: "app-tabs",
  owner: "components",
  exportName: "AppTabs",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appTabsControlSourcePath,

  styleSources: [
    {
      exportName: "appTabsVariants",
      sourcePath: appTabsControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTabListVariants",
      sourcePath: appTabsControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTabVariants",
      sourcePath: appTabsControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTabIndicatorVariants",
      sourcePath: appTabsControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTabPanelsVariants",
      sourcePath: appTabsControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTabPanelVariants",
      sourcePath: appTabsControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appTabsReactAriaPrimitives],
  cva: {
    appTabsVariants: {
      required: true,
      variants: {
        orientation: {
          values: [...appTabsOrientationValues],
          default: "horizontal",
          required: false,
        },
        size: {
          values: [...appTabsSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appTabListVariants: {
      required: true,
      variants: {
        orientation: {
          values: [...appTabsOrientationValues],
          default: "horizontal",
          required: false,
        },
        size: {
          values: [...appTabsSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appTabVariants: {
      required: true,
      variants: {
        orientation: {
          values: [...appTabsOrientationValues],
          default: "horizontal",
          required: false,
        },
        size: {
          values: [...appTabsSizeValues],
          default: "md",
          required: false,
        },
        selected: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        hovered: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        focusVisible: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appTabIndicatorVariants: {
      required: true,
      variants: {
        orientation: {
          values: [...appTabsOrientationValues],
          default: "horizontal",
          required: false,
        },
      },
    },
    appTabPanelsVariants: {
      required: true,
      variants: {
        orientation: {
          values: [...appTabsOrientationValues],
          default: "horizontal",
          required: false,
        },
        size: {
          values: [...appTabsSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appTabPanelVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTabsSizeValues],
          default: "md",
          required: false,
        },
        focusVisible: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appTabsRequiredPropNames],
    optional: [...appTabsOptionalPropNames],
  },

  composition: {
    requiresChildren: appTabsCompositionContract.requiresChildren,
    requiredElements: [...appTabsCompositionContract.requiredElements],
    optionalElements: [...appTabsCompositionContract.optionalElements],
    notes: [...appTabsCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppTabList must receive aria-label or aria-labelledby so the tab navigation is announced with a stable name.",
      "The primitive owns tab and panel state treatment so selected context stays obvious for keyboard and assistive-technology users.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppTabs for governed section switching, settings groupings, and operator workspaces where one visible panel should represent current context.",
    ],
    avoidWhen: [
      "Do not use AppTabs for in-place actions, one-step toggles, or workflows where sections should remain visible simultaneously.",
    ],
  },

  tokens: {
    semanticColors: [...appTabsTokenContract.semanticColors],
    radii: [...appTabsTokenContract.radii],
    typography: [...appTabsTokenContract.typography],
  },

  constraints: [
    "AppTabs owns shared navigation chrome and selection indication but leaves tab labels and panel content explicit so ERP sections preserve domain clarity.",
    "Feature UI should consume AppTabs exports instead of importing raw React Aria tabs primitives directly when the pattern is shared.",
    "Keep AppTabList and panel composition explicit at the call site so contributors can audit section structure quickly.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
