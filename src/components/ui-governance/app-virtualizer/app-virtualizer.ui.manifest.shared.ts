/**
 * @afenda-owner app-virtualizer
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppVirtualizer ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appVirtualizerApprovedLayoutNames,
  appVirtualizerCompositionContract,
  appVirtualizerControlSourcePath,
  appVirtualizerLayoutKindValues,
  appVirtualizerOptionalPropNames,
  appVirtualizerReactAriaPrimitives,
  appVirtualizerRequiredPropNames,
  appVirtualizerTokenContract,
} from "./app-virtualizer.contract.primitive.shared";

export const appVirtualizerManifest = defineApprovedComponentManifest({
  id: "app-virtualizer",
  owner: "components",
  exportName: "AppVirtualizer",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appVirtualizerControlSourcePath,

  styleSources: [
    {
      exportName: "appVirtualizerContainerVariants",
      sourcePath: appVirtualizerControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appVirtualizerReactAriaPrimitives],
  cva: {
    appVirtualizerContainerVariants: {
      required: true,
      variants: {
        layoutKind: {
          values: [...appVirtualizerLayoutKindValues],
          default: "custom",
        },
      },
    },
  },

  props: {
    required: [...appVirtualizerRequiredPropNames],
    optional: [...appVirtualizerOptionalPropNames],
  },

  composition: {
    requiresChildren: appVirtualizerCompositionContract.requiresChildren,
    requiredElements: [...appVirtualizerCompositionContract.requiredElements],
    optionalElements: [...appVirtualizerCompositionContract.optionalElements],
    notes: [...appVirtualizerCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppVirtualizer delegates accessible naming and collection semantics to its governed child collection primitive.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppVirtualizer for very large governed list, grid, or table collections where DOM size would otherwise reduce operator throughput.",
      `Use approved layouts only: ${appVirtualizerApprovedLayoutNames.join(", ")}.`,
    ],
    avoidWhen: [
      "Do not use AppVirtualizer for modest collections where standard AppListBox, AppGridList, or AppTable rendering is simpler and easier to inspect.",
      "Do not use AppVirtualizer when the child collection cannot provide explicit measurable dimensions.",
    ],
  },

  tokens: {
    semanticColors: [...appVirtualizerTokenContract.semanticColors],
    radii: [...appVirtualizerTokenContract.radii],
    typography: [...appVirtualizerTokenContract.typography],
  },

  constraints: [
    "This component is an explicit virtualization boundary, not a style primitive.",
    "Use exactly one direct governed child collection: AppListBox, AppGridList, or AppTable.",
    "Keep the virtualized child layout-compatible and explicitly sized so measurement remains stable.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
