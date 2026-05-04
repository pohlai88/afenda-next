/**
 * @afenda-owner app-date-picker
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Date Picker for governed shared UI
 */
"use client";

import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker as ReactAriaDatePicker,
  DateSegment,
  FieldError,
  Group,
  Heading,
  Label,
  Popover,
  Text,
  composeRenderProps,
  type DatePickerProps as ReactAriaDatePickerProps,
  type DateValue,
  type ValidationResult,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";
import { appDateFieldSegmentVariants } from "@/components/ui-governance/app-date-field/app-date-field.control.primitive.client";
import {
  appDatePickerCompositionContract,
  appDatePickerControlSourcePath,
  appDatePickerReactAriaPrimitives,
  type AppDatePickerSize,
} from "@/components/ui-governance/app-date-picker/app-date-picker.contract.primitive.shared";

export const appDatePickerVariants = cva("rac-invalid flex flex-col text-foreground", {
  variants: {
    size: {
      md: "gap-1.5",
      sm: "gap-1",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const appDatePickerGroupVariants = cva(
  [
    "field-control flex w-fit max-w-full items-center gap-1 pe-1 transition",
    "data-[focus-within]:ring-2 data-[focus-within]:ring-accent-ring data-[focus-within]:ring-offset-2 data-[focus-within]:ring-offset-background",
    "data-[disabled]:cursor-default data-[disabled]:opacity-50",
    "data-[invalid]:border-danger data-[invalid]:ring-danger-ring",
  ],
  {
    variants: {
      size: {
        md: "min-w-[13rem]",
        sm: "field-control-compact min-w-[12rem]",
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

export const appDatePickerInputVariants = cva(
  [
    "inline-flex min-w-0 flex-1 overflow-x-auto whitespace-nowrap bg-transparent px-3 py-0 outline-none [scrollbar-width:none]",
    "type-body-sm text-foreground forced-color-adjust-none",
    "data-[disabled]:cursor-default",
  ],
  {
    variants: {
      size: {
        md: "",
        sm: "px-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const appDatePickerTriggerVariants = cva(
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

export const appDatePickerPopoverVariants = cva(
  "surface-raised p-3",
);

export const appDatePickerCalendarVariants = cva(
  "flex flex-col gap-3 text-foreground",
);

export const appDatePickerCalendarHeaderVariants = cva(
  "flex items-center justify-between gap-2",
);

export const appDatePickerCalendarNavButtonVariants = cva(
  "rac-focus-ring inline-flex size-8 items-center justify-center rounded-(--radius-control) text-foreground-muted outline-none transition hover:bg-field-hover hover:text-foreground",
);

export const appDatePickerCalendarGridVariants = cva(
  "w-full border-separate border-spacing-1",
);

export const appDatePickerCalendarHeaderCellVariants = cva(
  "type-meta h-8 px-1 text-center text-foreground-muted",
);

export const appDatePickerCalendarCellVariants = cva(
  "rac-focus-ring type-body-sm h-9 w-9 rounded-(--radius-control) text-center outline-none transition",
  {
    variants: {
      selected: {
        true: "bg-accent font-medium text-accent-foreground",
        false: "text-foreground",
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
      unavailable: false,
      outsideMonth: false,
      disabled: false,
      today: false,
      invalid: false,
      focusVisible: false,
    },
  },
);

type AppDatePickerBehaviorProps<T extends DateValue> = Partial<
  Pick<
    ReactAriaDatePickerProps<T>,
    | "aria-describedby"
    | "aria-details"
    | "aria-label"
    | "aria-labelledby"
    | "autoComplete"
    | "autoFocus"
    | "defaultOpen"
    | "defaultValue"
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
    | "name"
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
    | "validate"
    | "validationBehavior"
    | "value"
  >
>;

export type AppDatePickerProps<T extends DateValue> = AppDatePickerBehaviorProps<T> & {
  buttonAriaLabel?: string;
  buttonClassName?: string;
  calendarClassName?: string;
  className?: string;
  description?: ReactNode;
  errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
  groupClassName?: string;
  inputClassName?: string;
  label?: ReactNode;
  popoverClassName?: string;
  size?: AppDatePickerSize;
};

function assertAppDatePickerPrimitiveContract(
  label: ReactNode | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appDatePickerControlSourcePath.length === 0 ||
    appDatePickerReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppDatePicker governance contract is incomplete.");
  }

  if (
    appDatePickerCompositionContract.requiresChildren &&
    appDatePickerCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppDatePicker composition contract is incomplete.");
  }

  if (
    label === undefined &&
    ariaLabel === undefined &&
    ariaLabelledBy === undefined
  ) {
    throw new Error("AppDatePicker requires label, aria-label, or aria-labelledby.");
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

function DefaultCalendar({ className }: { className?: string }) {
  return (
    <Calendar className={cn(appDatePickerCalendarVariants(), className)}>
      <div className={appDatePickerCalendarHeaderVariants()}>
        <Button
          slot="previous"
          className={appDatePickerCalendarNavButtonVariants()}
        >
          <CalendarChevron direction="left" />
        </Button>
        <Heading className="type-label text-foreground" />
        <Button
          slot="next"
          className={appDatePickerCalendarNavButtonVariants()}
        >
          <CalendarChevron direction="right" />
        </Button>
      </div>
      <CalendarGrid className={appDatePickerCalendarGridVariants()} weekdayStyle="short">
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell className={appDatePickerCalendarHeaderCellVariants()}>
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
              className={(renderProps) =>
                appDatePickerCalendarCellVariants({
                  selected: renderProps.isSelected,
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
    </Calendar>
  );
}

export function AppDatePicker<T extends DateValue>({
  buttonAriaLabel = "Open calendar",
  buttonClassName,
  calendarClassName,
  className,
  description,
  errorMessage,
  groupClassName,
  inputClassName,
  label,
  popoverClassName,
  size = "md",
  ...props
}: AppDatePickerProps<T>) {
  assertAppDatePickerPrimitiveContract(
    label,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaDatePicker
      {...props}
      className={cn(appDatePickerVariants({ size }), className)}
    >
      {label ? <Label className="type-label">{label}</Label> : null}
      <Group
        className={(renderProps) =>
          cn(
            appDatePickerGroupVariants({
              size,
              disabled: renderProps.isDisabled,
            }),
            groupClassName,
          )
        }
      >
        <DateInput className={cn(appDatePickerInputVariants({ size }), inputClassName)}>
          {(segment) => (
            <DateSegment
              segment={segment}
              className={appDateFieldSegmentVariants({ size })}
            />
          )}
        </DateInput>
        <Button
          aria-label={buttonAriaLabel}
          className={composeRenderProps(buttonClassName, (resolvedClassName, renderProps) =>
            cn(
              appDatePickerTriggerVariants({ disabled: renderProps.isDisabled }),
              resolvedClassName,
            ),
          )}
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
      <Popover placement="bottom start" className={cn(appDatePickerPopoverVariants(), popoverClassName)}>
        <DefaultCalendar
          {...(calendarClassName !== undefined
            ? { className: calendarClassName }
            : {})}
        />
      </Popover>
    </ReactAriaDatePicker>
  );
}
