/**
 * @afenda-owner app-checkbox-group
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppCheckboxGroup ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appCheckboxGroupCompositionContract,
  appCheckboxGroupControlSourcePath,
  appCheckboxGroupOrientationValues,
  appCheckboxGroupOptionalPropNames,
  appCheckboxGroupReactAriaPrimitives,
  appCheckboxGroupRequiredPropNames,
  appCheckboxGroupTokenContract,
} from "./app-checkbox-group.contract.primitive.shared";

export const appCheckboxGroupManifest = defineApprovedComponentManifest({
  id: "app-checkbox-group",
  owner: "components",
  exportName: "AppCheckboxGroup",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appCheckboxGroupControlSourcePath,

  styleSources: [
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-checkbox-group/app-checkbox-group.control.primitive.client",
      exportName: "appCheckboxGroupVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-checkbox-group/app-checkbox-group.control.primitive.client",
      exportName: "appCheckboxGroupItemsVariants",
    },
  ],
  reactAriaPrimitives: [...appCheckboxGroupReactAriaPrimitives],
  cva: {
    appCheckboxGroupVariants: {
      required: true,
      variants: {
        invalid: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appCheckboxGroupItemsVariants: {
      required: true,
      variants: {
        orientation: {
          values: [...appCheckboxGroupOrientationValues],
          default: "vertical",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appCheckboxGroupRequiredPropNames],
    optional: [...appCheckboxGroupOptionalPropNames],
  },

  composition: {
    requiresChildren: appCheckboxGroupCompositionContract.requiresChildren,
    requiredElements: [...appCheckboxGroupCompositionContract.requiredElements],
    optionalElements: [...appCheckboxGroupCompositionContract.optionalElements],
    notes: [...appCheckboxGroupCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppCheckboxGroup owns field-level label, description, and error output for checkbox sets.",
      "Use a visible label or provide aria-label or aria-labelledby when the operator-facing label must be visually omitted.",
      "Direct AppCheckbox children preserve consistent semantics and layout across ERP form workflows.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppCheckboxGroup when operators may choose one or more governed options in a form or review flow.",
    ],
    avoidWhen: [
      "Do not use AppCheckboxGroup when options are mutually exclusive; use AppRadioGroup instead.",
      "Do not use AppCheckboxGroup when freeform text entry is the primary interaction.",
    ],
  },

  tokens: {
    semanticColors: [...appCheckboxGroupTokenContract.semanticColors],
    radii: [...appCheckboxGroupTokenContract.radii],
    typography: [...appCheckboxGroupTokenContract.typography],
  },

  constraints: [
    "AppCheckboxGroup must keep field messaging and layout inside the primitive so operators see a stable pattern across forms.",
    "Feature UI should consume this App* primitive instead of importing react-aria-components directly when the pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
