/**
 * @afenda-owner app-date-range-picker
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Date Range Picker for governed shared UI
 */
"use client";

import {
  Button,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DateRangePicker as ReactAriaDateRangePicker,
  DateSegment,
  FieldError,
  Group,
  Heading,
  Label,
  Popover,
  RangeCalendar,
  Text,
  type DateRangePickerProps as ReactAriaDateRangePickerProps,
  type DateValue,
  type ValidationResult,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";
import { appDateFieldSegmentVariants } from "@/components/ui-governance/app-date-field/app-date-field.control.primitive.client";
import {
  appDateRangePickerCompositionContract,
  appDateRangePickerControlSourcePath,
  appDateRangePickerReactAriaPrimitives,
  type AppDateRangePickerSize,
} from "@/components/ui-governance/app-date-range-picker/app-date-range-picker.contract.primitive.shared";

export const appDateRangePickerVariants = cva(
  "rac-invalid flex max-w-full flex-col text-foreground",
  {
    variants: {
      size: {
        md: "gap-1.5",
        sm: "gap-1",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const appDateRangePickerGroupVariants = cva(
  [
    "field-control flex w-fit max-w-full items-center gap-1 pe-1 transition",
    "data-[focus-within]:ring-2 data-[focus-within]:ring-accent-ring data-[focus-within]:ring-offset-2 data-[focus-within]:ring-offset-background",
    "data-[disabled]:cursor-default data-[disabled]:opacity-50",
    "data-[invalid]:border-danger data-[invalid]:ring-danger-ring",
  ],
  {
    variants: {
      size: {
        md: "min-w-[16rem]",
        sm: "field-control-compact min-w-[14rem]",
      },
      disabled: {
        true: "",
        false: "hover:bg-field-hover",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  },
);

export const appDateRangePickerFieldStripVariants = cva(
  "flex min-w-0 flex-1 items-center overflow-x-auto whitespace-nowrap [scrollbar-width:none]",
  {
    variants: {
      static: {
        base: "",
      },
    },
    defaultVariants: {
      static: "base",
    },
  },
);

export const appDateRangePickerInputVariants = cva(
  [
    "inline-flex min-w-0 overflow-x-auto whitespace-nowrap bg-transparent py-0 outline-none [scrollbar-width:none]",
    "type-body-sm text-foreground forced-color-adjust-none",
    "data-[disabled]:cursor-default",
  ],
  {
    variants: {
      size: {
        md: "",
        sm: "",
      },
      position: {
        start: "px-3",
        end: "px-3",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        position: "start",
        className: "px-2.5",
      },
      {
        size: "sm",
        position: "end",
        className: "px-2.5",
      },
    ],
    defaultVariants: {
      size: "md",
      position: "start",
    },
  },
);

export const appDateRangePickerSeparatorVariants = cva(
  "type-body-sm shrink-0 px-1.5 text-foreground-muted",
  {
    variants: {
      static: {
        base: "",
      },
    },
    defaultVariants: {
      static: "base",
    },
  },
);

export const appDateRangePickerTriggerVariants = cva(
  "rac-focus-ring inline-flex size-8 items-center justify-center rounded-(--radius-control) text-foreground-muted outline-none transition",
  {
    variants: {
      disabled: {
        true: "",
        false: "hover:bg-surface-raised hover:text-foreground",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);

export const appDateRangePickerCalendarCellVariants = cva(
  "rac-focus-ring type-body-sm h-9 w-9 rounded-(--radius-control) text-center outline-none transition",
  {
    variants: {
      selected: {
        true: "bg-accent text-accent-foreground",
        false: "text-foreground",
      },
      selectionStart: {
        true: "rounded-r-none rounded-l-(--radius-control)",
        false: "",
      },
      selectionEnd: {
        true: "rounded-l-none rounded-r-(--radius-control)",
        false: "",
      },
      unavailable: {
        true: "text-foreground-muted line-through",
        false: "",
      },
      outsideMonth: {
        true: "text-foreground-muted/70",
        false: "",
      },
      disabled: {
        true: "cursor-default text-foreground-muted opacity-50",
        false: "",
      },
      today: {
        true: "ring-1 ring-border-strong",
        false: "",
      },
      invalid: {
        true: "text-danger",
        false: "",
      },
      focusVisible: {
        true: "ring-2 ring-accent-ring ring-offset-2 ring-offset-background",
        false: "",
      },
    },
    compoundVariants: [
      {
        selected: true,
        selectionStart: false,
        selectionEnd: false,
        className: "rounded-none bg-accent/15 text-foreground",
      },
      {
        selected: true,
        selectionStart: true,
        selectionEnd: true,
        className:
          "rounded-(--radius-control) bg-accent font-medium text-accent-foreground",
      },
      {
        selected: true,
        selectionStart: true,
        selectionEnd: false,
        className: "bg-accent font-medium text-accent-foreground",
      },
      {
        selected: true,
        selectionStart: false,
        selectionEnd: true,
        className: "bg-accent font-medium text-accent-foreground",
      },
      {
        selected: true,
        invalid: true,
        className: "bg-danger text-danger-foreground",
      },
      {
        selected: true,
        today: true,
        className: "ring-0",
      },
    ],
    defaultVariants: {
      selected: false,
      selectionStart: false,
      selectionEnd: false,
      unavailable: false,
      outsideMonth: false,
      disabled: false,
      today: false,
      invalid: false,
      focusVisible: false,
    },
  },
);

type AppDateRangePickerBehaviorProps<T extends DateValue> = Partial<
  Pick<
    ReactAriaDateRangePickerProps<T>,
    | "allowsNonContiguousRanges"
    | "aria-describedby"
    | "aria-details"
    | "aria-label"
    | "aria-labelledby"
    | "autoFocus"
    | "defaultOpen"
    | "defaultValue"
    | "endName"
    | "firstDayOfWeek"
    | "form"
    | "granularity"
    | "hideTimeZone"
    | "hourCycle"
    | "id"
    | "isDateUnavailable"
    | "isDisabled"
    | "isInvalid"
    | "isOpen"
    | "isReadOnly"
    | "isRequired"
    | "maxValue"
    | "minValue"
    | "onBlur"
    | "onChange"
    | "onFocus"
    | "onFocusChange"
    | "onKeyDown"
    | "onKeyUp"
    | "onOpenChange"
    | "pageBehavior"
    | "placeholderValue"
    | "shouldCloseOnSelect"
    | "shouldForceLeadingZeros"
    | "slot"
    | "startName"
    | "validate"
    | "validationBehavior"
    | "value"
  >
>;

export type AppDateRangePickerProps<T extends DateValue> =
  AppDateRangePickerBehaviorProps<T> & {
    buttonAriaLabel?: string;
    buttonClassName?: string;
    calendarClassName?: string;
    className?: string;
    description?: ReactNode;
    endInputClassName?: string;
    errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
    groupClassName?: string;
    label?: ReactNode;
    popoverClassName?: string;
    separatorClassName?: string;
    size?: AppDateRangePickerSize;
    startInputClassName?: string;
  };

function assertAppDateRangePickerPrimitiveContract(
  label: ReactNode | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appDateRangePickerControlSourcePath.length === 0 ||
    appDateRangePickerReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppDateRangePicker governance contract is incomplete.");
  }

  if (
    appDateRangePickerCompositionContract.requiresChildren &&
    appDateRangePickerCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppDateRangePicker composition contract is incomplete.");
  }

  if (
    label === undefined &&
    ariaLabel === undefined &&
    ariaLabelledBy === undefined
  ) {
    throw new Error(
      "AppDateRangePicker requires label, aria-label, or aria-labelledby.",
    );
  }
}

function CalendarChevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "left" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}

function CalendarTriggerIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function DefaultRangeCalendar({ className }: { className?: string }) {
  return (
    <RangeCalendar className={cn("flex flex-col gap-3 text-foreground", className)}>
      <div className="flex items-center justify-between gap-2">
        <Button
          slot="previous"
          className="rac-focus-ring inline-flex size-8 items-center justify-center rounded-(--radius-control) text-foreground-muted outline-none transition hover:bg-field-hover hover:text-foreground"
        >
          <CalendarChevron direction="left" />
        </Button>
        <Heading className="type-label text-foreground" />
        <Button
          slot="next"
          className="rac-focus-ring inline-flex size-8 items-center justify-center rounded-(--radius-control) text-foreground-muted outline-none transition hover:bg-field-hover hover:text-foreground"
        >
          <CalendarChevron direction="right" />
        </Button>
      </div>
      <CalendarGrid className="w-full border-separate border-spacing-1" weekdayStyle="short">
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell className="type-meta h-8 px-1 text-center text-foreground-muted">
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
              className={(renderProps) =>
                appDateRangePickerCalendarCellVariants({
                  selected: renderProps.isSelected,
                  selectionStart: renderProps.isSelectionStart,
                  selectionEnd: renderProps.isSelectionEnd,
                  unavailable: renderProps.isUnavailable,
                  outsideMonth: renderProps.isOutsideMonth,
                  disabled: renderProps.isDisabled,
                  today: renderProps.isToday,
                  invalid: renderProps.isInvalid,
                  focusVisible: renderProps.isFocusVisible,
                })
              }
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </RangeCalendar>
  );
}

export function AppDateRangePicker<T extends DateValue>({
  buttonAriaLabel = "Open date range calendar",
  buttonClassName,
  calendarClassName,
  className,
  description,
  endInputClassName,
  errorMessage,
  groupClassName,
  label,
  popoverClassName,
  separatorClassName,
  size = "md",
  startInputClassName,
  ...props
}: AppDateRangePickerProps<T>) {
  assertAppDateRangePickerPrimitiveContract(
    label,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaDateRangePicker
      {...props}
      className={cn(appDateRangePickerVariants({ size }), className)}
    >
      {label ? <Label className="type-label">{label}</Label> : null}
      <Group
        className={(renderProps) =>
          cn(
            appDateRangePickerGroupVariants({
              size,
              disabled: renderProps.isDisabled,
            }),
            groupClassName,
          )
        }
      >
        <div className={appDateRangePickerFieldStripVariants({ static: "base" })}>
          <DateInput
            slot="start"
            className={cn(
              appDateRangePickerInputVariants({ size, position: "start" }),
              startInputClassName,
            )}
          >
            {(segment) => (
              <DateSegment
                segment={segment}
                className={appDateFieldSegmentVariants({ size })}
              />
            )}
          </DateInput>
          <span
            aria-hidden="true"
            className={cn(
              appDateRangePickerSeparatorVariants(),
              separatorClassName,
            )}
          >
            –
          </span>
          <DateInput
            slot="end"
            className={cn(
              appDateRangePickerInputVariants({ size, position: "end" }),
              endInputClassName,
            )}
          >
            {(segment) => (
              <DateSegment
                segment={segment}
                className={appDateFieldSegmentVariants({ size })}
              />
            )}
          </DateInput>
        </div>
        <Button
          aria-label={buttonAriaLabel}
          className={(renderProps) =>
            cn(
              appDateRangePickerTriggerVariants({
                disabled: renderProps.isDisabled,
              }),
              buttonClassName,
            )
          }
        >
          <CalendarTriggerIcon />
        </Button>
      </Group>
      {description ? (
        <Text slot="description" className="type-meta text-foreground-muted">
          {description}
        </Text>
      ) : null}
      <FieldError className="type-meta text-danger">{errorMessage}</FieldError>
      <Popover
        placement="bottom start"
        className={cn("surface-raised p-3", popoverClassName)}
      >
        <DefaultRangeCalendar
          {...(calendarClassName !== undefined
            ? { className: calendarClassName }
            : {})}
        />
      </Popover>
    </ReactAriaDateRangePicker>
  );
}
