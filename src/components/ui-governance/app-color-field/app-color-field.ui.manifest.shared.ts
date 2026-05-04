/**
 * @afenda-owner app-color-field
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppColorField ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appColorFieldCompositionContract,
  appColorFieldControlSourcePath,
  appColorFieldOptionalPropNames,
  appColorFieldReactAriaPrimitives,
  appColorFieldRequiredPropNames,
  appColorFieldSizeValues,
  appColorFieldTokenContract,
} from "./app-color-field.contract.primitive.shared";

export const appColorFieldManifest = defineApprovedComponentManifest({
  id: "app-color-field",
  owner: "components",
  exportName: "AppColorField",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appColorFieldControlSourcePath,

  styleSources: [
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-color-field/app-color-field.control.primitive.client",
      exportName: "appColorFieldVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-color-field/app-color-field.control.primitive.client",
      exportName: "appColorFieldInputVariants",
    },
  ],
  reactAriaPrimitives: [...appColorFieldReactAriaPrimitives],
  cva: {
    appColorFieldVariants: {
      required: true,
      variants: {
        size: {
          values: [...appColorFieldSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appColorFieldInputVariants: {
      required: true,
      variants: {
        size: {
          values: [...appColorFieldSizeValues],
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
      },
    },
  },

  props: {
    required: [...appColorFieldRequiredPropNames],
    optional: [...appColorFieldOptionalPropNames],
  },

  composition: {
    requiresChildren: appColorFieldCompositionContract.requiresChildren,
    requiredElements: [...appColorFieldCompositionContract.requiredElements],
    optionalElements: [...appColorFieldCompositionContract.optionalElements],
    notes: [...appColorFieldCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppColorField owns the field label, input, description, and error output for governed color entry.",
      "The primitive requires label, aria-label, or aria-labelledby so color values never appear as unlabeled operator inputs.",
      "Channel editing remains explicit through channel and colorSpace props rather than hidden mode booleans.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppColorField when operators must enter a hex color or a single explicit color channel value in a governed form flow.",
    ],
    avoidWhen: [
      "Do not use AppColorField when a two-axis color plane or visual swatch-only control better matches the workflow.",
    ],
  },

  tokens: {
    semanticColors: [...appColorFieldTokenContract.semanticColors],
    radii: [...appColorFieldTokenContract.radii],
    typography: [...appColorFieldTokenContract.typography],
  },

  constraints: [
    "AppColorField owns its internal Input so feature code does not rebuild field layout and validation presentation inconsistently.",
    "Feature UI should consume this App* primitive instead of importing react-aria-components directly when the pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
