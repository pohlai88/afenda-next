/**
 * @afenda-owner app-modal
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppModal ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appModalCompositionContract,
  appModalControlSourcePath,
  appModalOptionalPropNames,
  appModalPlacementValues,
  appModalReactAriaPrimitives,
  appModalRequiredPropNames,
  appModalSizeValues,
  appModalTokenContract,
} from "./app-modal.contract.primitive.shared";

export const appModalManifest = defineApprovedComponentManifest({
  id: "app-modal",
  owner: "components",
  exportName: "AppModal",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appModalControlSourcePath,

  styleSources: [
    {
      exportName: "appModalOverlayVariants",
      sourcePath: appModalControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appModalViewportVariants",
      sourcePath: appModalControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appModalPanelVariants",
      sourcePath: appModalControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appModalReactAriaPrimitives],
  cva: {
    appModalOverlayVariants: {
      required: true,
      variants: {
        entering: {
          values: ["true", "false"],
          default: "false",
        },
        exiting: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appModalViewportVariants: {
      required: true,
      variants: {
        placement: {
          values: [...appModalPlacementValues],
          default: "center",
        },
      },
    },
    appModalPanelVariants: {
      required: true,
      variants: {
        size: {
          values: [...appModalSizeValues],
          default: "md",
        },
        entering: {
          values: ["true", "false"],
          default: "false",
        },
        exiting: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
  },

  props: {
    required: [...appModalRequiredPropNames],
    optional: [...appModalOptionalPropNames],
  },

  composition: {
    requiresChildren: appModalCompositionContract.requiresChildren,
    requiredElements: [...appModalCompositionContract.requiredElements],
    optionalElements: [...appModalCompositionContract.optionalElements],
    notes: [...appModalCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Modal children must provide dialog semantics and an accessible title or label so the blocking state is announced correctly.",
      "Use dismissable behavior deliberately; workflow-critical confirmations may need escape and outside-click dismissal disabled.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppModal for governed blocking dialogs, confirmation flows, and focused record-edit interruptions that must suspend outside interaction.",
    ],
    avoidWhen: [
      "Do not use AppModal for lightweight anchored surfaces that should remain popovers, menus, or inline panels.",
    ],
  },

  tokens: {
    semanticColors: [...appModalTokenContract.semanticColors],
    radii: [...appModalTokenContract.radii],
    typography: [...appModalTokenContract.typography],
  },

  constraints: [
    "AppModal owns the overlay and panel shell instead of exposing a bare React Aria modal wrapper at shared product boundaries.",
    "Feature UI should consume AppDialogTrigger and AppModal rather than rebuilding blocking overlay treatment ad hoc when the modal pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
