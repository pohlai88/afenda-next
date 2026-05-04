/**
 * @afenda-owner app-tag-group
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppTagGroup ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appTagGroupCompositionContract,
  appTagGroupControlSourcePath,
  appTagGroupOptionalPropNames,
  appTagGroupReactAriaPrimitives,
  appTagGroupRequiredPropNames,
  appTagGroupSizeValues,
  appTagGroupTokenContract,
} from "./app-tag-group.contract.primitive.shared";

export const appTagGroupManifest = defineApprovedComponentManifest({
  id: "app-tag-group",
  owner: "components",
  exportName: "AppTagGroup",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appTagGroupControlSourcePath,

  styleSources: [
    {
      exportName: "appTagGroupVariants",
      sourcePath: appTagGroupControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTagListVariants",
      sourcePath: appTagGroupControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTagVariants",
      sourcePath: appTagGroupControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTagSelectionIndicatorVariants",
      sourcePath: appTagGroupControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTagRemoveButtonVariants",
      sourcePath: appTagGroupControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appTagGroupReactAriaPrimitives],
  cva: {
    appTagGroupVariants: {
      required: true,
      variants: {
        invalid: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appTagListVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTagGroupSizeValues],
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
        focusVisible: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appTagVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTagGroupSizeValues],
          default: "md",
          required: false,
        },
        selected: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        focused: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        pressed: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        removable: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        href: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appTagSelectionIndicatorVariants: {
      required: true,
      variants: {
        visible: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appTagRemoveButtonVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTagGroupSizeValues],
          default: "md",
          required: false,
        },
        selected: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        pressed: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appTagGroupRequiredPropNames],
    optional: [...appTagGroupOptionalPropNames],
  },

  composition: {
    requiresChildren: appTagGroupCompositionContract.requiresChildren,
    requiredElements: [...appTagGroupCompositionContract.requiredElements],
    optionalElements: [...appTagGroupCompositionContract.optionalElements],
    notes: [...appTagGroupCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppTagGroup requires label, aria-label, or aria-labelledby so the focusable tag collection is announced with a stable name.",
      "AppTag requires textValue, aria-label, or aria-labelledby when its children are not plain text so assistive technology can announce the item correctly.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppTagGroup for governed labels, filters, categories, and removable tag sets that need keyboard-safe scanning and selection.",
    ],
    avoidWhen: [
      "Do not use AppTagGroup for freeform rich content, long prose, or layouts where items should remain visible but not behave like a focusable collection.",
    ],
  },

  tokens: {
    semanticColors: [...appTagGroupTokenContract.semanticColors],
    radii: [...appTagGroupTokenContract.radii],
    typography: [...appTagGroupTokenContract.typography],
  },

  constraints: [
    "AppTagGroup owns shared tag chrome, focus treatment, selection indication, and removal affordances so feature code should not rebuild this pattern ad hoc.",
    "Feature UI should consume AppTagGroup, AppTagList, and AppTag instead of importing raw React Aria tag primitives directly when the pattern is shared.",
    "Keep the documented child composition explicit at the call site so selectable and removable collections stay legible to the next contributor.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
