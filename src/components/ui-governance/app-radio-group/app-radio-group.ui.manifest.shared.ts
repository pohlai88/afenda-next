/**
 * @afenda-owner app-radio-group
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppRadioGroup ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appRadioGroupCompositionContract,
  appRadioGroupControlSourcePath,
  appRadioGroupOptionalPropNames,
  appRadioGroupOrientationValues,
  appRadioGroupReactAriaPrimitives,
  appRadioGroupRequiredPropNames,
  appRadioGroupTokenContract,
} from "./app-radio-group.contract.primitive.shared";

export const appRadioGroupManifest = defineApprovedComponentManifest({
  id: "app-radio-group",
  owner: "components",
  exportName: "AppRadioGroup",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appRadioGroupControlSourcePath,

  styleSources: [
    {
      exportName: "appRadioGroupVariants",
      sourcePath: appRadioGroupControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appRadioGroupItemsVariants",
      sourcePath: appRadioGroupControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appRadioVariants",
      sourcePath: appRadioGroupControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appRadioIndicatorVariants",
      sourcePath: appRadioGroupControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appRadioGroupReactAriaPrimitives],
  cva: {
    appRadioGroupVariants: {
      required: true,
      variants: {
        invalid: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appRadioGroupItemsVariants: {
      required: true,
      variants: {
        orientation: {
          values: [...appRadioGroupOrientationValues],
          default: "vertical",
          required: false,
        },
      },
    },
    appRadioVariants: {
      required: true,
      variants: {
        disabled: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appRadioIndicatorVariants: {
      required: true,
      variants: {
        selected: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        invalid: {
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
  },

  props: {
    required: [...appRadioGroupRequiredPropNames],
    optional: [...appRadioGroupOptionalPropNames],
  },

  composition: {
    requiresChildren: appRadioGroupCompositionContract.requiresChildren,
    requiredElements: [...appRadioGroupCompositionContract.requiredElements],
    optionalElements: [...appRadioGroupCompositionContract.optionalElements],
    notes: [...appRadioGroupCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppRadioGroup requires a visible label or aria-label or aria-labelledby so the exclusive choice set stays identifiable.",
      "Direct AppRadio children preserve stable single-choice semantics and keyboard behavior across ERP forms.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppRadioGroup when operators must choose exactly one governed option in a form, review, or workflow transition.",
    ],
    avoidWhen: [
      "Do not use AppRadioGroup when operators may select more than one option; use AppCheckboxGroup instead.",
      "Do not use AppRadioGroup when freeform text entry is the primary interaction.",
    ],
  },

  tokens: {
    semanticColors: [...appRadioGroupTokenContract.semanticColors],
    radii: [...appRadioGroupTokenContract.radii],
    typography: [...appRadioGroupTokenContract.typography],
  },

  constraints: [
    "AppRadioGroup must keep field messaging and option chrome inside the primitive so exclusive choices stay predictable across forms.",
    "Feature UI should consume AppRadioGroup and AppRadio instead of importing react-aria-components directly when the pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
