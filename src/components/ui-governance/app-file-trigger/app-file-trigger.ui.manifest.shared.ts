/**
 * @afenda-owner app-file-trigger
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppFileTrigger ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appFileTriggerCompositionContract,
  appFileTriggerControlSourcePath,
  appFileTriggerLayoutValues,
  appFileTriggerOptionalPropNames,
  appFileTriggerReactAriaPrimitives,
  appFileTriggerRequiredPropNames,
  appFileTriggerTokenContract,
} from "./app-file-trigger.contract.primitive.shared";

export const appFileTriggerManifest = defineApprovedComponentManifest({
  id: "app-file-trigger",
  owner: "components",
  exportName: "AppFileTrigger",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appFileTriggerControlSourcePath,

  styleSources: [
    {
      exportName: "appFileTriggerContainerVariants",
      sourcePath: appFileTriggerControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appFileTriggerReactAriaPrimitives],
  cva: {
    appFileTriggerContainerVariants: {
      required: true,
      variants: {
        layout: {
          values: [...appFileTriggerLayoutValues],
          default: "inline",
        },
      },
    },
  },

  props: {
    required: [...appFileTriggerRequiredPropNames],
    optional: [...appFileTriggerOptionalPropNames],
  },

  composition: {
    requiresChildren: appFileTriggerCompositionContract.requiresChildren,
    requiredElements: [...appFileTriggerCompositionContract.requiredElements],
    optionalElements: [...appFileTriggerCompositionContract.optionalElements],
    notes: [...appFileTriggerCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Use exactly one direct pressable child so assistive technology exposes a single file-selection action.",
      "Any custom trigger child must forward React Aria props and ref to a semantic or ARIA-interactive DOM element.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppFileTrigger when operators need an explicit press action that opens the file system for uploads or imports.",
    ],
    avoidWhen: [
      "Do not use AppFileTrigger for drag-and-drop intake; use AppDropZone for governed drop surfaces.",
      "Do not use AppFileTrigger when navigation or a non-file action semantic is required.",
    ],
  },

  tokens: {
    semanticColors: [...appFileTriggerTokenContract.semanticColors],
    radii: [...appFileTriggerTokenContract.radii],
    typography: [...appFileTriggerTokenContract.typography],
  },

  constraints: [
    "AppFileTrigger keeps trigger content explicit at the call site instead of inventing a second button API.",
    "The class contract styles the explicit wrapper container because React Aria FileTrigger is behavioral and does not own a visible DOM control.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
