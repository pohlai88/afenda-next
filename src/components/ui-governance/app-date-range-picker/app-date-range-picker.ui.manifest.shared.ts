/**
 * @afenda-owner app-date-range-picker
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppDateRangePicker ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appDateRangePickerCompositionContract,
  appDateRangePickerControlSourcePath,
  appDateRangePickerOptionalPropNames,
  appDateRangePickerReactAriaPrimitives,
  appDateRangePickerRequiredPropNames,
  appDateRangePickerSizeValues,
  appDateRangePickerTokenContract,
} from "./app-date-range-picker.contract.primitive.shared";

export const appDateRangePickerManifest = defineApprovedComponentManifest({
  id: "app-date-range-picker",
  owner: "components",
  exportName: "AppDateRangePicker",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appDateRangePickerControlSourcePath,

  styleSources: [
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-date-range-picker/app-date-range-picker.control.primitive.client",
      exportName: "appDateRangePickerVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-date-range-picker/app-date-range-picker.control.primitive.client",
      exportName: "appDateRangePickerGroupVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-date-range-picker/app-date-range-picker.control.primitive.client",
      exportName: "appDateRangePickerFieldStripVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-date-range-picker/app-date-range-picker.control.primitive.client",
      exportName: "appDateRangePickerInputVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-date-range-picker/app-date-range-picker.control.primitive.client",
      exportName: "appDateRangePickerSeparatorVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-date-range-picker/app-date-range-picker.control.primitive.client",
      exportName: "appDateRangePickerTriggerVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-date-range-picker/app-date-range-picker.control.primitive.client",
      exportName: "appDateRangePickerCalendarCellVariants",
    },
  ],
  reactAriaPrimitives: [...appDateRangePickerReactAriaPrimitives],
  cva: {
    appDateRangePickerVariants: {
      required: true,
      variants: {
        size: {
          values: [...appDateRangePickerSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appDateRangePickerGroupVariants: {
      required: true,
      variants: {
        size: {
          values: [...appDateRangePickerSizeValues],
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
    appDateRangePickerFieldStripVariants: {
      required: true,
      variants: {
        static: {
          values: ["base"],
          default: "base",
          required: false,
        },
      },
    },
    appDateRangePickerInputVariants: {
      required: true,
      variants: {
        size: {
          values: [...appDateRangePickerSizeValues],
          default: "md",
          required: false,
        },
        position: {
          values: ["start", "end"],
          default: "start",
          required: false,
        },
      },
    },
    appDateRangePickerSeparatorVariants: {
      required: true,
      variants: {
        static: {
          values: ["base"],
          default: "base",
          required: false,
        },
      },
    },
    appDateRangePickerTriggerVariants: {
      required: true,
      variants: {
        disabled: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appDateRangePickerCalendarCellVariants: {
      required: true,
      variants: {
        selected: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        selectionStart: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        selectionEnd: {
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
    required: [...appDateRangePickerRequiredPropNames],
    optional: [...appDateRangePickerOptionalPropNames],
  },

  composition: {
    requiresChildren: appDateRangePickerCompositionContract.requiresChildren,
    requiredElements: [...appDateRangePickerCompositionContract.requiredElements],
    optionalElements: [...appDateRangePickerCompositionContract.optionalElements],
    notes: [...appDateRangePickerCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppDateRangePicker owns the paired segmented date inputs, calendar trigger, popover, and range calendar for governed date-range selection.",
      "The primitive requires label, aria-label, or aria-labelledby so date-range pickers never appear as unlabeled operator inputs.",
      "The trigger button keeps its own accessible label while the range field itself inherits the picker name from label or ARIA props.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppDateRangePicker when operators need both typed segmented range entry and a governed range calendar popover in the same workflow.",
    ],
    avoidWhen: [
      "Do not use AppDateRangePicker when a single date picker or display-only range summary better matches the workflow.",
    ],
  },

  tokens: {
    semanticColors: [...appDateRangePickerTokenContract.semanticColors],
    radii: [...appDateRangePickerTokenContract.radii],
    typography: [...appDateRangePickerTokenContract.typography],
  },

  constraints: [
    "AppDateRangePicker owns its internal Group, paired DateInput slots, trigger Button, Popover, and RangeCalendar so feature code does not rebuild range picker behavior inconsistently.",
    "Feature UI should consume this App* primitive instead of importing react-aria-components directly when the pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
