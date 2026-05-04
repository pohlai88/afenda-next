/**
 * @afenda-owner app-menu
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppMenu ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appMenuCompositionContract,
  appMenuControlSourcePath,
  appMenuOptionalPropNames,
  appMenuReactAriaPrimitives,
  appMenuRequiredPropNames,
  appMenuSizeValues,
  appMenuTokenContract,
} from "./app-menu.contract.primitive.shared";

export const appMenuManifest = defineApprovedComponentManifest({
  id: "app-menu",
  owner: "components",
  exportName: "AppMenu",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appMenuControlSourcePath,

  styleSources: [
    {
      exportName: "appMenuVariants",
      sourcePath: appMenuControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appMenuPopoverVariants",
      sourcePath: appMenuControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appMenuSubmenuPopoverVariants",
      sourcePath: appMenuControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appMenuItemVariants",
      sourcePath: appMenuControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appMenuSectionVariants",
      sourcePath: appMenuControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appMenuHeaderVariants",
      sourcePath: appMenuControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appMenuSeparatorVariants",
      sourcePath: appMenuControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appMenuTextVariants",
      sourcePath: appMenuControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appMenuKeyboardVariants",
      sourcePath: appMenuControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appMenuReactAriaPrimitives],
  cva: {
    appMenuVariants: {
      required: true,
      variants: {
        size: {
          values: [...appMenuSizeValues],
          default: "md",
        },
        empty: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appMenuPopoverVariants: {
      required: true,
      variants: {
        base: {
          values: ["default"],
          default: "default",
        },
      },
    },
    appMenuSubmenuPopoverVariants: {
      required: true,
      variants: {
        base: {
          values: ["default"],
          default: "default",
        },
      },
    },
    appMenuItemVariants: {
      required: true,
      variants: {
        size: {
          values: [...appMenuSizeValues],
          default: "md",
        },
        focused: {
          values: ["true", "false"],
          default: "false",
        },
        open: {
          values: ["true", "false"],
          default: "false",
        },
        pressed: {
          values: ["true", "false"],
          default: "false",
        },
        selected: {
          values: ["true", "false"],
          default: "false",
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
        },
        href: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appMenuSectionVariants: {
      required: true,
      variants: {
        size: {
          values: [...appMenuSizeValues],
          default: "md",
        },
      },
    },
    appMenuHeaderVariants: {
      required: true,
      variants: {
        size: {
          values: [...appMenuSizeValues],
          default: "md",
        },
      },
    },
    appMenuSeparatorVariants: {
      required: true,
      variants: {
        size: {
          values: [...appMenuSizeValues],
          default: "md",
        },
      },
    },
    appMenuTextVariants: {
      required: true,
      variants: {
        description: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appMenuKeyboardVariants: {
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
    required: [...appMenuRequiredPropNames],
    optional: [...appMenuOptionalPropNames],
  },

  composition: {
    requiresChildren: appMenuCompositionContract.requiresChildren,
    requiredElements: [...appMenuCompositionContract.requiredElements],
    optionalElements: [...appMenuCompositionContract.optionalElements],
    notes: [...appMenuCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Keep menu items non-interactive and command-oriented so keyboard and screen reader navigation remain intact.",
      "Use visible labels or aria-label on the trigger control; the menu itself may inherit context from the governed trigger flow.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppMenu for governed action lists, command surfaces, and contextual option menus within ERP workflows.",
    ],
    avoidWhen: [
      "Do not use AppMenu for persistent navigation or chooser surfaces that should remain listboxes or grid lists.",
    ],
  },

  tokens: {
    semanticColors: [...appMenuTokenContract.semanticColors],
    radii: [...appMenuTokenContract.radii],
    typography: [...appMenuTokenContract.typography],
  },

  constraints: [
    "AppMenu owns the menu surface, submenu popover shell, and command row treatment instead of exposing raw React Aria menu parts at shared product boundaries.",
    "Feature UI should consume AppMenuTrigger, AppMenuItem, AppMenuSection, and AppSubmenuTrigger instead of importing react-aria-components Menu primitives directly when the action-menu pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
