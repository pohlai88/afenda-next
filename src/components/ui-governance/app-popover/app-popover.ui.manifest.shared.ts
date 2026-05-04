/**
 * @afenda-owner app-popover
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppPopover ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appPopoverCompositionContract,
  appPopoverControlSourcePath,
  appPopoverOptionalPropNames,
  appPopoverReactAriaPrimitives,
  appPopoverRequiredPropNames,
  appPopoverTokenContract,
} from "./app-popover.contract.primitive.shared";

export const appPopoverManifest = defineApprovedComponentManifest({
  id: "app-popover",
  owner: "components",
  exportName: "AppPopover",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appPopoverControlSourcePath,

  styleSources: [
    {
      exportName: "appPopoverVariants",
      sourcePath: appPopoverControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appPopoverArrowVariants",
      sourcePath: appPopoverControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appPopoverReactAriaPrimitives],
  cva: {
    appPopoverVariants: {
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
        showArrow: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appPopoverArrowVariants: {
      required: true,
      variants: {
        base: {
          values: ["default"],
          default: "default",
        },
      },
    },
  },

  props: {
    required: [...appPopoverRequiredPropNames],
    optional: [...appPopoverOptionalPropNames],
  },

  composition: {
    requiresChildren: appPopoverCompositionContract.requiresChildren,
    requiredElements: [...appPopoverCompositionContract.requiredElements],
    optionalElements: [...appPopoverCompositionContract.optionalElements],
    notes: [...appPopoverCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Popover content should stay contextual and lightweight, with explicit labeling when the overlay content is not self-describing.",
      "Do not disable keyboard dismissal casually; non-modal overlay behavior should only be used for patterns specifically designed for it.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppPopover for governed anchored overlays such as settings clusters, contextual helpers, and lightweight supporting controls.",
    ],
    avoidWhen: [
      "Do not use AppPopover for blocking confirmations or full workflow interruptions that should remain modal.",
    ],
  },

  tokens: {
    semanticColors: [...appPopoverTokenContract.semanticColors],
    radii: [...appPopoverTokenContract.radii],
    typography: [...appPopoverTokenContract.typography],
  },

  constraints: [
    "AppPopover owns the anchored surface and optional arrow instead of exposing a bare React Aria popover wrapper at shared product boundaries.",
    "Feature UI should consume AppPopoverTrigger and AppPopover rather than rebuilding contextual overlay treatment ad hoc when the popover pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
