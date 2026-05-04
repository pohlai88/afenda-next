/**
 * @afenda-owner app-range-calendar
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppRangeCalendar ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appRangeCalendarCompositionContract,
  appRangeCalendarControlSourcePath,
  appRangeCalendarOptionalPropNames,
  appRangeCalendarReactAriaPrimitives,
  appRangeCalendarRequiredPropNames,
  appRangeCalendarTokenContract,
} from "./app-range-calendar.contract.primitive.shared";

export const appRangeCalendarManifest = defineApprovedComponentManifest({
  id: "app-range-calendar",
  owner: "components",
  exportName: "AppRangeCalendar",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appRangeCalendarControlSourcePath,

  styleSources: [
    {
      exportName: "appRangeCalendarVariants",
      sourcePath: appRangeCalendarControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appRangeCalendarLabelVariants",
      sourcePath: appRangeCalendarControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appRangeCalendarMonthsVariants",
      sourcePath: appRangeCalendarControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appRangeCalendarMonthVariants",
      sourcePath: appRangeCalendarControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appRangeCalendarHeaderVariants",
      sourcePath: appRangeCalendarControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appRangeCalendarHeadingVariants",
      sourcePath: appRangeCalendarControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appRangeCalendarNavButtonVariants",
      sourcePath: appRangeCalendarControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appRangeCalendarGridVariants",
      sourcePath: appRangeCalendarControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appRangeCalendarHeaderCellVariants",
      sourcePath: appRangeCalendarControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appRangeCalendarCellVariants",
      sourcePath: appRangeCalendarControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appRangeCalendarDateVariants",
      sourcePath: appRangeCalendarControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appRangeCalendarErrorVariants",
      sourcePath: appRangeCalendarControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appRangeCalendarReactAriaPrimitives],
  cva: {
    appRangeCalendarVariants: {
      required: true,
      variants: {
        base: {
          values: ["default"],
          default: "default",
        },
      },
    },
    appRangeCalendarLabelVariants: {
      required: true,
      variants: {
        base: {
          values: ["default"],
          default: "default",
        },
      },
    },
    appRangeCalendarMonthsVariants: {
      required: true,
      variants: {
        base: {
          values: ["default"],
          default: "default",
        },
      },
    },
    appRangeCalendarMonthVariants: {
      required: true,
      variants: {
        base: {
          values: ["default"],
          default: "default",
        },
      },
    },
    appRangeCalendarHeaderVariants: {
      required: true,
      variants: {
        base: {
          values: ["default"],
          default: "default",
        },
      },
    },
    appRangeCalendarHeadingVariants: {
      required: true,
      variants: {
        base: {
          values: ["default"],
          default: "default",
        },
      },
    },
    appRangeCalendarNavButtonVariants: {
      required: true,
      variants: {
        base: {
          values: ["default"],
          default: "default",
        },
      },
    },
    appRangeCalendarGridVariants: {
      required: true,
      variants: {
        base: {
          values: ["default"],
          default: "default",
        },
      },
    },
    appRangeCalendarHeaderCellVariants: {
      required: true,
      variants: {
        base: {
          values: ["default"],
          default: "default",
        },
      },
    },
    appRangeCalendarCellVariants: {
      required: true,
      variants: {
        selected: {
          values: ["true", "false"],
          default: "false",
        },
        invalid: {
          values: ["true", "false"],
          default: "false",
        },
        selectionStart: {
          values: ["true", "false"],
          default: "false",
        },
        selectionEnd: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appRangeCalendarDateVariants: {
      required: true,
      variants: {
        selectionState: {
          values: ["none", "middle", "cap"],
          default: "none",
        },
        invalid: {
          values: ["true", "false"],
          default: "false",
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
        },
        outsideMonth: {
          values: ["true", "false"],
          default: "false",
        },
        focusVisible: {
          values: ["true", "false"],
          default: "false",
        },
        today: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appRangeCalendarErrorVariants: {
      required: true,
      variants: {
        base: {
          values: ["default"],
          default: "default",
        },
      },
    },
  },

  props: {
    required: [...appRangeCalendarRequiredPropNames],
    optional: [...appRangeCalendarOptionalPropNames],
  },

  composition: {
    requiresChildren: appRangeCalendarCompositionContract.requiresChildren,
    requiredElements: [...appRangeCalendarCompositionContract.requiredElements],
    optionalElements: [...appRangeCalendarCompositionContract.optionalElements],
    notes: [...appRangeCalendarCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppRangeCalendar requires label, aria-label, or aria-labelledby so the date-range field remains identifiable.",
      "Built-in navigation and weekday headers preserve keyboard and screen-reader behavior without custom child composition.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppRangeCalendar for governed contiguous date-range selection such as trips, blackout windows, accounting periods, and scheduling workflows.",
    ],
    avoidWhen: [
      "Do not use AppRangeCalendar for single-date entry; use the governed single-date calendar or date-picker patterns instead.",
    ],
  },

  tokens: {
    semanticColors: [...appRangeCalendarTokenContract.semanticColors],
    radii: [...appRangeCalendarTokenContract.radii],
    typography: [...appRangeCalendarTokenContract.typography],
  },

  constraints: [
    "AppRangeCalendar owns navigation, range highlighting, and invalid messaging so date-range workflows stay consistent across the product.",
    "Feature UI should extend date logic through props like visibleMonths, pageBehavior, and availability rules rather than reimplementing calendar chrome.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
