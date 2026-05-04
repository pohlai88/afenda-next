/**
 * @afenda-owner app-date-field
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppDateField ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appDateFieldCompositionContract,
  appDateFieldControlSourcePath,
  appDateFieldOptionalPropNames,
  appDateFieldReactAriaPrimitives,
  appDateFieldRequiredPropNames,
  appDateFieldSizeValues,
  appDateFieldTokenContract,
} from "./app-date-field.contract.primitive.shared";

export const appDateFieldManifest = defineApprovedComponentManifest({
  id: "app-date-field",
  owner: "components",
  exportName: "AppDateField",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appDateFieldControlSourcePath,

  styleSources: [
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-date-field/app-date-field.control.primitive.client",
      exportName: "appDateFieldVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-date-field/app-date-field.control.primitive.client",
      exportName: "appDateFieldInputVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-date-field/app-date-field.control.primitive.client",
      exportName: "appDateFieldSegmentVariants",
    },
  ],
  reactAriaPrimitives: [...appDateFieldReactAriaPrimitives],
  cva: {
    appDateFieldVariants: {
      required: true,
      variants: {
        size: {
          values: [...appDateFieldSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appDateFieldInputVariants: {
      required: true,
      variants: {
        size: {
          values: [...appDateFieldSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appDateFieldSegmentVariants: {
      required: true,
      variants: {
        size: {
          values: [...appDateFieldSizeValues],
          default: "md",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appDateFieldRequiredPropNames],
    optional: [...appDateFieldOptionalPropNames],
  },

  composition: {
    requiresChildren: appDateFieldCompositionContract.requiresChildren,
    requiredElements: [...appDateFieldCompositionContract.requiredElements],
    optionalElements: [...appDateFieldCompositionContract.optionalElements],
    notes: [...appDateFieldCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppDateField owns the field label, segmented date input, description, and error output for governed date entry.",
      "The primitive requires label, aria-label, or aria-labelledby so date values never appear as unlabeled operator inputs.",
      "Segment rendering stays internal so keyboard date editing remains consistent and traceable across ERP forms.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppDateField when operators must enter or edit a governed date or date-time value inside a form workflow.",
    ],
    avoidWhen: [
      "Do not use AppDateField when the workflow needs a calendar popover picker or a date-range primitive instead of inline segment editing.",
    ],
  },

  tokens: {
    semanticColors: [...appDateFieldTokenContract.semanticColors],
    radii: [...appDateFieldTokenContract.radii],
    typography: [...appDateFieldTokenContract.typography],
  },

  constraints: [
    "AppDateField owns its internal DateInput and DateSegment structure so feature code does not rebuild segmented field layout inconsistently.",
    "Feature UI should consume this App* primitive instead of importing react-aria-components directly when the pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
