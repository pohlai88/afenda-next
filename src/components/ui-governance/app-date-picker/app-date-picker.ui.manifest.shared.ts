/**
 * @afenda-owner app-date-picker
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppDatePicker ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appDatePickerCompositionContract,
  appDatePickerControlSourcePath,
  appDatePickerOptionalPropNames,
  appDatePickerReactAriaPrimitives,
  appDatePickerRequiredPropNames,
  appDatePickerSizeValues,
  appDatePickerTokenContract,
} from "./app-date-picker.contract.primitive.shared";

export const appDatePickerManifest = defineApprovedComponentManifest({
  id: "app-date-picker",
  owner: "components",
  exportName: "AppDatePicker",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appDatePickerControlSourcePath,

  styleSources: [
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-date-picker/app-date-picker.control.primitive.client",
      exportName: "appDatePickerVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-date-picker/app-date-picker.control.primitive.client",
      exportName: "appDatePickerGroupVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-date-picker/app-date-picker.control.primitive.client",
      exportName: "appDatePickerInputVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-date-picker/app-date-picker.control.primitive.client",
      exportName: "appDatePickerTriggerVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-date-picker/app-date-picker.control.primitive.client",
      exportName: "appDatePickerCalendarCellVariants",
    },
  ],
  reactAriaPrimitives: [...appDatePickerReactAriaPrimitives],
  cva: {
    appDatePickerVariants: {
      required: true,
      variants: {
        size: {
          values: [...appDatePickerSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appDatePickerGroupVariants: {
      required: true,
      variants: {
        size: {
          values: [...appDatePickerSizeValues],
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
    appDatePickerInputVariants: {
      required: true,
      variants: {
        size: {
          values: [...appDatePickerSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appDatePickerTriggerVariants: {
      required: true,
      variants: {
        disabled: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appDatePickerCalendarCellVariants: {
      required: true,
      variants: {
        selected: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        unavailable: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        outsideMonth: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        today: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        invalid: {
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
  },

  props: {
    required: [...appDatePickerRequiredPropNames],
    optional: [...appDatePickerOptionalPropNames],
  },

  composition: {
    requiresChildren: appDatePickerCompositionContract.requiresChildren,
    requiredElements: [...appDatePickerCompositionContract.requiredElements],
    optionalElements: [...appDatePickerCompositionContract.optionalElements],
    notes: [...appDatePickerCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppDatePicker owns the labeled segmented input, calendar trigger, popover, and calendar grid for governed date selection.",
      "The primitive requires label, aria-label, or aria-labelledby so date pickers never appear as unlabeled operator inputs.",
      "The trigger button keeps its own accessible label while the field itself inherits the picker name from label or ARIA props.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppDatePicker when operators need both typed segmented date entry and a governed calendar popover in the same workflow.",
    ],
    avoidWhen: [
      "Do not use AppDatePicker when inline segment editing alone or a range calendar better matches the workflow.",
    ],
  },

  tokens: {
    semanticColors: [...appDatePickerTokenContract.semanticColors],
    radii: [...appDatePickerTokenContract.radii],
    typography: [...appDatePickerTokenContract.typography],
  },

  constraints: [
    "AppDatePicker owns its internal Group, DateInput, trigger Button, Popover, and Calendar so feature code does not rebuild picker behavior inconsistently.",
    "Feature UI should consume this App* primitive instead of importing react-aria-components directly when the pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
