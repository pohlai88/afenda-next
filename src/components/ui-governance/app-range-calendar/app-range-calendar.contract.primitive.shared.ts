/**
 * @afenda-owner app-range-calendar
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-range-calendar client and manifest shared boundary
 */

export const appRangeCalendarControlSourcePath =
  "@/components/ui-governance/app-range-calendar/app-range-calendar.control.primitive.client";

export const appRangeCalendarRequiredPropNames = [] as const;

export const appRangeCalendarOptionalPropNames = [
  "allowsNonContiguousRanges",
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "autoFocus",
  "className",
  "commitBehavior",
  "createCalendar",
  "defaultFocusedValue",
  "defaultValue",
  "errorMessage",
  "firstDayOfWeek",
  "focusedValue",
  "id",
  "isDateUnavailable",
  "isDisabled",
  "isInvalid",
  "isReadOnly",
  "label",
  "maxValue",
  "minValue",
  "onChange",
  "onFocusChange",
  "pageBehavior",
  "selectionAlignment",
  "slot",
  "value",
  "visibleMonths",
] as const;

export const appRangeCalendarReactAriaPrimitives = [
  "RangeCalendar",
  "Button",
  "Heading",
  "CalendarGrid",
  "CalendarGridHeader",
  "CalendarGridBody",
  "CalendarHeaderCell",
  "CalendarCell",
  "Text",
] as const;

export const appRangeCalendarCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: [
    "internal previous Button",
    "internal next Button",
    "internal Heading",
    "internal CalendarGrid",
    "internal CalendarCell",
    "internal error Text",
  ],
  notes: [
    "AppRangeCalendar owns month navigation, weekday headers, range-cell chrome, and error presentation for governed contiguous date selection.",
    "Provide label, aria-label, or aria-labelledby so the calendar has an explicit accessible name.",
    "Use visibleMonths, pageBehavior, and date availability props to extend behavior instead of custom child composition.",
  ],
} as const;

export const appRangeCalendarTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-accent-foreground",
    "--color-border-strong",
    "--color-danger",
    "--color-danger-foreground",
    "--color-field",
    "--color-field-hover",
    "--color-foreground",
    "--color-foreground-muted",
  ] as const,
  radii: ["--radius-control"] as const,
  typography: ["--text-label", "--text-meta"] as const,
} as const;
