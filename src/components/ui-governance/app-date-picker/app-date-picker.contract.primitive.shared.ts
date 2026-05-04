/**
 * @afenda-owner app-date-picker
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-date-picker client and manifest shared boundary
 */

export const appDatePickerControlSourcePath =
  "@/components/ui-governance/app-date-picker/app-date-picker.control.primitive.client";

export const appDatePickerSizeValues = ["md", "sm"] as const;

export type AppDatePickerSize = (typeof appDatePickerSizeValues)[number];

export const appDatePickerRequiredPropNames = [] as const;

export const appDatePickerOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "autoComplete",
  "autoFocus",
  "buttonAriaLabel",
  "buttonClassName",
  "calendarClassName",
  "className",
  "defaultOpen",
  "defaultValue",
  "description",
  "errorMessage",
  "firstDayOfWeek",
  "form",
  "granularity",
  "groupClassName",
  "hideTimeZone",
  "hourCycle",
  "id",
  "inputClassName",
  "isDateUnavailable",
  "isDisabled",
  "isInvalid",
  "isOpen",
  "isReadOnly",
  "isRequired",
  "label",
  "maxValue",
  "minValue",
  "name",
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
  "shouldCloseOnSelect",
  "shouldForceLeadingZeros",
  "size",
  "slot",
  "validate",
  "validationBehavior",
  "value",
] as const;

export const appDatePickerReactAriaPrimitives = [
  "DatePicker",
  "Group",
  "DateInput",
  "DateSegment",
  "Button",
  "Popover",
  "Calendar",
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

export const appDatePickerCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: [
    "internal Label",
    "internal Group",
    "internal DateInput",
    "internal DateSegment",
    "internal Button",
    "internal Popover",
    "internal Calendar",
    "internal FieldError",
  ],
  notes: [
    "AppDatePicker owns the segmented field group, trigger button, popover, and calendar so date selection stays consistent across ERP forms.",
    "Provide label, aria-label, or aria-labelledby so the picker has an explicit accessible name.",
    "Calendar paging, availability, and date formatting remain explicit through props rather than custom child composition.",
  ],
} as const;

export const appDatePickerTokenContract = {
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
