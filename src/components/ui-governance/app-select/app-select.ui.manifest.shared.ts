/**
 * @afenda-owner app-select
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppSelect ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appSelectCompositionContract,
  appSelectControlSourcePath,
  appSelectOptionalPropNames,
  appSelectReactAriaPrimitives,
  appSelectRequiredPropNames,
  appSelectSizeValues,
  appSelectTokenContract,
} from "./app-select.contract.primitive.shared";

export const appSelectManifest = defineApprovedComponentManifest({
  id: "app-select",
  owner: "components",
  exportName: "AppSelect",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appSelectControlSourcePath,

  styleSources: [
    {
      exportName: "appSelectVariants",
      sourcePath: appSelectControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appSelectTriggerVariants",
      sourcePath: appSelectControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appSelectValueVariants",
      sourcePath: appSelectControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appSelectPopoverVariants",
      sourcePath: appSelectControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appSelectChevronVariants",
      sourcePath: appSelectControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appSelectReactAriaPrimitives],
  cva: {
    appSelectVariants: {
      required: true,
      variants: {
        size: {
          values: [...appSelectSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appSelectTriggerVariants: {
      required: true,
      variants: {
        size: {
          values: [...appSelectSizeValues],
          default: "md",
          required: false,
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        invalid: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        open: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appSelectValueVariants: {
      required: true,
      variants: {
        placeholder: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appSelectPopoverVariants: {
      required: true,
      variants: {
        size: {
          values: [...appSelectSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appSelectChevronVariants: {
      required: true,
      variants: {
        open: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appSelectRequiredPropNames],
    optional: [...appSelectOptionalPropNames],
  },

  composition: {
    requiresChildren: appSelectCompositionContract.requiresChildren,
    requiredElements: [...appSelectCompositionContract.requiredElements],
    optionalElements: [...appSelectCompositionContract.optionalElements],
    notes: [...appSelectCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppSelect requires a visible label or aria-label or aria-labelledby so the choice control stays identifiable.",
      "The primitive owns trigger and popover behavior so selection state, keyboard support, and validation messaging remain stable.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppSelect when operators must choose one governed option from a collapsible list in a form or dense workflow.",
    ],
    avoidWhen: [
      "Do not use AppSelect when operators need freeform text entry or typeahead; use a governed search or combobox pattern instead.",
      "Do not use AppSelect when many choices must remain visible at once; use a governed list or radio surface instead.",
    ],
  },

  tokens: {
    semanticColors: [...appSelectTokenContract.semanticColors],
    radii: [...appSelectTokenContract.radii],
    typography: [...appSelectTokenContract.typography],
  },

  constraints: [
    "AppSelect must keep trigger chrome, selected-value treatment, and popover list behavior inside the primitive so choice workflows remain predictable.",
    "Feature UI should consume AppSelect and companion AppSelectItem helpers instead of importing react-aria-components directly when the pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
