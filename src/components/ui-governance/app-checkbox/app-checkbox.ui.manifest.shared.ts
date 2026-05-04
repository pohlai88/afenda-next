/**
 * @afenda-owner app-checkbox
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppCheckbox ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appCheckboxCompositionContract,
  appCheckboxControlSourcePath,
  appCheckboxOptionalPropNames,
  appCheckboxReactAriaPrimitives,
  appCheckboxRequiredPropNames,
  appCheckboxSizeValues,
  appCheckboxTokenContract,
} from "./app-checkbox.contract.primitive.shared";

export const appCheckboxManifest = defineApprovedComponentManifest({
  id: "app-checkbox",
  owner: "components",
  exportName: "AppCheckbox",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appCheckboxControlSourcePath,

  styleSources: [
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-checkbox/app-checkbox.control.primitive.client",
      exportName: "appCheckboxVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-checkbox/app-checkbox.control.primitive.client",
      exportName: "appCheckboxIndicatorVariants",
    },
  ],
  reactAriaPrimitives: [...appCheckboxReactAriaPrimitives],
  cva: {
    appCheckboxVariants: {
      required: true,
      variants: {
        size: {
          values: [...appCheckboxSizeValues],
          default: "md",
          required: false,
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appCheckboxIndicatorVariants: {
      required: true,
      variants: {
        size: {
          values: [...appCheckboxSizeValues],
          default: "md",
          required: false,
        },
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
    required: [...appCheckboxRequiredPropNames],
    optional: [...appCheckboxOptionalPropNames],
  },

  composition: {
    requiresChildren: appCheckboxCompositionContract.requiresChildren,
    requiredElements: [...appCheckboxCompositionContract.requiredElements],
    optionalElements: [...appCheckboxCompositionContract.optionalElements],
    notes: [...appCheckboxCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppCheckbox preserves React Aria checkbox semantics and keyboard interactions.",
      "The visual check indicator is presentational only and remains outside the accessibility tree.",
      "Standalone checkboxes should render visible label content unless a parent collection or field primitive owns the accessible label.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppCheckbox for governed single-choice toggles and the item rows inside AppCheckboxGroup.",
    ],
    avoidWhen: [
      "Do not use AppCheckbox when the operator must choose exactly one option from a mutually exclusive set; use AppRadioGroup instead.",
      "Do not use AppCheckbox when freeform text entry is the primary interaction.",
    ],
  },

  tokens: {
    semanticColors: [...appCheckboxTokenContract.semanticColors],
    radii: [...appCheckboxTokenContract.radii],
    typography: [...appCheckboxTokenContract.typography],
  },

  constraints: [
    "The indicator visuals must stay driven by semantic tokens from globals.css rather than ad hoc palette values.",
    "Feature UI should consume this App* primitive instead of importing react-aria-components directly when the pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
