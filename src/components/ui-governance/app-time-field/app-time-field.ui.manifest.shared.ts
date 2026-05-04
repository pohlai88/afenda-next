/**
 * @afenda-owner app-time-field
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppTimeField ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appTimeFieldCompositionContract,
  appTimeFieldControlSourcePath,
  appTimeFieldOptionalPropNames,
  appTimeFieldReactAriaPrimitives,
  appTimeFieldRequiredPropNames,
  appTimeFieldSizeValues,
  appTimeFieldTokenContract,
} from "./app-time-field.contract.primitive.shared";

export const appTimeFieldManifest = defineApprovedComponentManifest({
  id: "app-time-field",
  owner: "components",
  exportName: "AppTimeField",
  status: "review",

  category: "component",
  boundary: "client",

  sourcePath: appTimeFieldControlSourcePath,

  styleSources: [
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-time-field/app-time-field.control.primitive.client",
      exportName: "appTimeFieldVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-time-field/app-time-field.control.primitive.client",
      exportName: "appTimeFieldInputVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-time-field/app-time-field.control.primitive.client",
      exportName: "appTimeFieldSegmentVariants",
    },
  ],
  reactAriaPrimitives: [...appTimeFieldReactAriaPrimitives],
  cva: {
    appTimeFieldVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTimeFieldSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appTimeFieldInputVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTimeFieldSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appTimeFieldSegmentVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTimeFieldSizeValues],
          default: "md",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appTimeFieldRequiredPropNames],
    optional: [...appTimeFieldOptionalPropNames],
  },

  composition: {
    requiresChildren: appTimeFieldCompositionContract.requiresChildren,
    requiredElements: [...appTimeFieldCompositionContract.requiredElements],
    optionalElements: [...appTimeFieldCompositionContract.optionalElements],
    notes: [...appTimeFieldCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppTimeField owns the field label, segmented time input, description, and error output for governed time entry.",
      "The primitive requires label, aria-label, or aria-labelledby so time values never appear as unlabeled operator inputs.",
      "Segment rendering stays internal so keyboard time editing remains consistent and traceable across ERP forms.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppTimeField when operators must enter or edit a governed time value inside a form workflow.",
    ],
    avoidWhen: [
      "Do not use AppTimeField when the workflow needs a full date-time field, calendar picker, or display-only clock output.",
    ],
  },

  tokens: {
    semanticColors: [...appTimeFieldTokenContract.semanticColors],
    radii: [...appTimeFieldTokenContract.radii],
    typography: [...appTimeFieldTokenContract.typography],
  },

  constraints: [
    "AppTimeField owns its internal DateInput and DateSegment structure so feature code does not rebuild segmented time layout inconsistently.",
    "Feature UI should consume this App* primitive instead of importing react-aria-components directly when the pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
