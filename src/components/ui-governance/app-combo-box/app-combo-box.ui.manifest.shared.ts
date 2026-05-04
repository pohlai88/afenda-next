/**
 * @afenda-owner app-combo-box
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppComboBox ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appComboBoxCompositionContract,
  appComboBoxControlSourcePath,
  appComboBoxOptionalPropNames,
  appComboBoxReactAriaPrimitives,
  appComboBoxRequiredPropNames,
  appComboBoxSizeValues,
  appComboBoxTokenContract,
} from "./app-combo-box.contract.primitive.shared";

export const appComboBoxManifest = defineApprovedComponentManifest({
  id: "app-combo-box",
  owner: "components",
  exportName: "AppComboBox",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appComboBoxControlSourcePath,

  styleSources: [
    {
      exportName: "appComboBoxVariants",
      sourcePath: appComboBoxControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appComboBoxFieldVariants",
      sourcePath: appComboBoxControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appComboBoxInputVariants",
      sourcePath: appComboBoxControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appComboBoxButtonVariants",
      sourcePath: appComboBoxControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appComboBoxValueVariants",
      sourcePath: appComboBoxControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appComboBoxPopoverVariants",
      sourcePath: appComboBoxControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appComboBoxListBoxVariants",
      sourcePath: appComboBoxControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appComboBoxItemVariants",
      sourcePath: appComboBoxControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appComboBoxSectionVariants",
      sourcePath: appComboBoxControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appComboBoxSectionHeaderVariants",
      sourcePath: appComboBoxControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appComboBoxReactAriaPrimitives],
  cva: {
    appComboBoxVariants: {
      required: true,
      variants: {
        size: {
          values: [...appComboBoxSizeValues],
          default: "md",
        },
      },
    },
    appComboBoxFieldVariants: {
      required: true,
      variants: {
        size: {
          values: [...appComboBoxSizeValues],
          default: "md",
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
        },
        invalid: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appComboBoxInputVariants: {
      required: true,
      variants: {
        size: {
          values: [...appComboBoxSizeValues],
          default: "md",
        },
      },
    },
    appComboBoxButtonVariants: {
      required: true,
      variants: {
        disabled: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appComboBoxValueVariants: {
      required: true,
      variants: {
        placeholder: {
          values: ["true", "false"],
          default: "true",
        },
      },
    },
    appComboBoxPopoverVariants: {
      required: true,
      variants: {
        root: {
          values: ["default"],
          default: "default",
        },
      },
    },
    appComboBoxListBoxVariants: {
      required: true,
      variants: {
        root: {
          values: ["default"],
          default: "default",
        },
      },
    },
    appComboBoxItemVariants: {
      required: true,
      variants: {
        focused: {
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
      },
    },
    appComboBoxSectionVariants: {
      required: true,
      variants: {
        root: {
          values: ["default"],
          default: "default",
        },
      },
    },
    appComboBoxSectionHeaderVariants: {
      required: true,
      variants: {
        root: {
          values: ["default"],
          default: "default",
        },
      },
    },
  },

  props: {
    required: [...appComboBoxRequiredPropNames],
    optional: [...appComboBoxOptionalPropNames],
  },

  composition: {
    requiresChildren: appComboBoxCompositionContract.requiresChildren,
    requiredElements: [...appComboBoxCompositionContract.requiredElements],
    optionalElements: [...appComboBoxCompositionContract.optionalElements],
    notes: [...appComboBoxCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Provide label, aria-label, or aria-labelledby so the editable combobox input has an explicit accessible name.",
      "AppComboBox owns the popover and listbox shell so opening, filtering, and option focus behavior stay consistent.",
      "Use AppComboBoxItem and AppComboBoxSection so option and grouping semantics stay inside the governed boundary.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppComboBox for governed searchable choice workflows where operators need to filter options before selecting.",
    ],
    avoidWhen: [
      "Do not use AppComboBox when freeform text entry is the primary interaction or when a plain select is sufficient.",
    ],
  },

  tokens: {
    semanticColors: [...appComboBoxTokenContract.semanticColors],
    radii: [...appComboBoxTokenContract.radii],
    typography: [...appComboBoxTokenContract.typography],
  },

  constraints: [
    "AppComboBox owns its internal Input, trigger Button, Popover, and ListBox; feature code should not rebuild that shell when this governed primitive is sufficient.",
    "AppComboBoxItem and AppComboBoxSection are the approved shared option helpers for this primitive.",
    "Keep complex custom value renderers behind valueChildren rather than importing raw ComboBoxValue into feature code for common workflows.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
