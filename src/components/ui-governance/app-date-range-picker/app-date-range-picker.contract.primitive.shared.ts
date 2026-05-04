/**
 * @afenda-owner app-date-range-picker
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-date-range-picker client and manifest shared boundary
 */

export const appDateRangePickerControlSourcePath =
  "@/components/ui-governance/app-date-range-picker/app-date-range-picker.control.primitive.client";

export const appDateRangePickerSizeValues = ["md", "sm"] as const;

export type AppDateRangePickerSize =
  (typeof appDateRangePickerSizeValues)[number];

export const appDateRangePickerRequiredPropNames = [] as const;

export const appDateRangePickerOptionalPropNames = [
  "allowsNonContiguousRanges",
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "autoFocus",
  "buttonAriaLabel",
  "buttonClassName",
  "calendarClassName",
  "className",
  "defaultOpen",
  "defaultValue",
  "description",
  "endInputClassName",
  "endName",
  "errorMessage",
  "firstDayOfWeek",
  "form",
  "granularity",
  "groupClassName",
  "hideTimeZone",
  "hourCycle",
  "id",
  "isDateUnavailable",
  "isDisabled",
  "isInvalid",
  "isOpen",
  "isReadOnly",
  "isRequired",
  "label",
  "maxValue",
  "minValue",
  "onBlur",
  "onChange",
  "onFocus",
  "onFocusChange",
  "onKeyDown",
  "onKeyUp",
  "onOpenChange",
  "pageBehavior",
  "placeholderValue",
  "popoverClassName",
  "separatorClassName",
  "shouldCloseOnSelect",
  "shouldForceLeadingZeros",
  "size",
  "slot",
  "startInputClassName",
  "startName",
  "validate",
  "validationBehavior",
  "value",
] as const;

export const appDateRangePickerReactAriaPrimitives = [
  "DateRangePicker",
  "Group",
  "DateInput",
  "DateSegment",
  "Button",
  "Popover",
  "RangeCalendar",
  "CalendarGrid",
  "CalendarGridHeader",
  "CalendarGridBody",
  "CalendarHeaderCell",
  "CalendarCell",
  "Heading",
  "Label",
  "Text",
  "FieldError",
] as const;

export const appDateRangePickerCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: [
    "internal Label",
    "internal Group",
    "internal start DateInput",
    "internal end DateInput",
    "internal Button",
    "internal Popover",
    "internal RangeCalendar",
    "internal FieldError",
  ],
  notes: [
    "AppDateRangePicker owns the paired segmented date inputs, trigger button, popover, and range calendar so date-range selection stays consistent across ERP forms.",
    "Provide label, aria-label, or aria-labelledby so the picker has an explicit accessible name.",
    "Range availability, paging, and commit behavior remain explicit through props rather than custom child composition.",
  ],
} as const;

export const appDateRangePickerTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-accent-foreground",
    "--color-border",
    "--color-border-strong",
    "--color-danger",
    "--color-danger-foreground",
    "--color-field",
    "--color-field-hover",
    "--color-foreground",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-control", "--radius-panel"] as const,
  typography: ["--text-body-sm", "--text-label", "--text-meta"] as const,
} as const;
