/**
 * @afenda-owner app-tree
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppTree ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appTreeCompositionContract,
  appTreeControlSourcePath,
  appTreeOptionalPropNames,
  appTreeReactAriaPrimitives,
  appTreeRequiredPropNames,
  appTreeSizeValues,
  appTreeTokenContract,
} from "./app-tree.contract.primitive.shared";

export const appTreeManifest = defineApprovedComponentManifest({
  id: "app-tree",
  owner: "components",
  exportName: "AppTree",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appTreeControlSourcePath,

  styleSources: [
    {
      exportName: "appTreeVariants",
      sourcePath: appTreeControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTreeSectionVariants",
      sourcePath: appTreeControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTreeHeaderVariants",
      sourcePath: appTreeControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTreeItemVariants",
      sourcePath: appTreeControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTreeItemContentVariants",
      sourcePath: appTreeControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTreeChevronButtonVariants",
      sourcePath: appTreeControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTreeChevronIconVariants",
      sourcePath: appTreeControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTreeDragButtonVariants",
      sourcePath: appTreeControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTreeSelectionIndicatorVariants",
      sourcePath: appTreeControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTreeLoadMoreItemVariants",
      sourcePath: appTreeControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appTreeReactAriaPrimitives],
  cva: {
    appTreeVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTreeSizeValues],
          default: "md",
          required: false,
        },
        empty: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        focused: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appTreeSectionVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTreeSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appTreeHeaderVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTreeSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appTreeItemVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTreeSizeValues],
          default: "md",
          required: false,
        },
        selected: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        pressed: {
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
        dragging: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        dropTarget: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appTreeItemContentVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTreeSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appTreeChevronButtonVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTreeSizeValues],
          default: "md",
          required: false,
        },
        visible: {
          values: ["true", "false"],
          default: "true",
          required: false,
        },
      },
    },
    appTreeChevronIconVariants: {
      required: true,
      variants: {
        expanded: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appTreeDragButtonVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTreeSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appTreeSelectionIndicatorVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTreeSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appTreeLoadMoreItemVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTreeSizeValues],
          default: "md",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appTreeRequiredPropNames],
    optional: [...appTreeOptionalPropNames],
  },

  composition: {
    requiresChildren: appTreeCompositionContract.requiresChildren,
    requiredElements: [...appTreeCompositionContract.requiredElements],
    optionalElements: [...appTreeCompositionContract.optionalElements],
    notes: [...appTreeCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppTree requires aria-label or aria-labelledby so the hierarchical collection is announced with a stable name.",
      "AppTreeSection must include AppTreeHeader or aria-label so grouped branches remain understandable to assistive-technology users.",
      "AppTreeItem requires plain-text title or explicit textValue so typeahead and tree navigation preserve domain clarity.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppTree for governed hierarchical navigation, nested record browsers, expandable review queues, and directory-style operator workflows.",
    ],
    avoidWhen: [
      "Do not use AppTree when the data is flat, when simultaneous visibility matters more than hierarchy, or when a table or list communicates the workflow more directly.",
    ],
  },

  tokens: {
    semanticColors: [...appTreeTokenContract.semanticColors],
    radii: [...appTreeTokenContract.radii],
    typography: [...appTreeTokenContract.typography],
  },

  constraints: [
    "AppTree owns shared hierarchy chrome, expansion cues, selection treatment, and load-more affordances so feature code should not rebuild this nested pattern ad hoc.",
    "Feature UI should consume AppTree, AppTreeItem, AppTreeSection, AppTreeHeader, and AppTreeLoadMoreItem instead of importing raw React Aria tree parts directly when the pattern is shared.",
    "Keep section, item, and nested child composition explicit at the call site so the next contributor can audit workflow depth and branch behavior quickly.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
