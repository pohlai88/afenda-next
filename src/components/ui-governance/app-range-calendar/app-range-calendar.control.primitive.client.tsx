/**
 * @afenda-owner app-range-calendar
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Range Calendar for governed shared UI
 */
"use client";

import {
  Button,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Heading,
  RangeCalendar as ReactAriaRangeCalendar,
  Text,
  type DateValue,
  type RangeCalendarProps as ReactAriaRangeCalendarProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import { useId, type ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appRangeCalendarCompositionContract,
  appRangeCalendarControlSourcePath,
  appRangeCalendarReactAriaPrimitives,
} from "@/components/ui-governance/app-range-calendar/app-range-calendar.contract.primitive.shared";

export const appRangeCalendarVariants = cva(
  "rac-invalid flex w-fit max-w-full flex-col gap-3 text-foreground",
);

export const appRangeCalendarLabelVariants = cva("type-label text-foreground");

export const appRangeCalendarMonthsVariants = cva(
  "flex max-w-full gap-4 overflow-x-auto pb-1",
);

export const appRangeCalendarMonthVariants = cva(
  "flex min-w-[18rem] flex-col gap-3",
);

export const appRangeCalendarHeaderVariants = cva(
  "flex items-center gap-2",
);

export const appRangeCalendarHeadingVariants = cva(
  "type-label flex-1 text-center text-foreground",
);

export const appRangeCalendarNavButtonVariants = cva(
  "rac-focus-ring inline-flex size-8 items-center justify-center rounded-(--radius-control) text-foreground-muted outline-none transition hover:bg-field-hover hover:text-foreground",
);

export const appRangeCalendarGridVariants = cva(
  "w-full border-separate border-spacing-1",
);

export const appRangeCalendarHeaderCellVariants = cva(
  "type-meta h-8 px-1 text-center text-foreground-muted",
);

export const appRangeCalendarCellVariants = cva(
  "group h-10 w-10 cursor-default rounded-none p-0 text-sm outline-none transition",
  {
    variants: {
      selected: {
        true: "bg-accent/12",
        false: "",
      },
      invalid: {
        true: "bg-danger/12",
        false: "",
      },
      selectionStart: {
        true: "rounded-s-full",
        false: "",
      },
      selectionEnd: {
        true: "rounded-e-full",
        false: "",
      },
    },
    compoundVariants: [
      {
        selected: true,
        invalid: true,
        className: "bg-danger/12",
      },
    ],
    defaultVariants: {
      selected: false,
      invalid: false,
      selectionStart: false,
      selectionEnd: false,
    },
  },
);

export const appRangeCalendarDateVariants = cva(
  [
    "inline-flex h-10 w-10 items-center justify-center rounded-full transition",
    "forced-color-adjust-none",
  ],
  {
    variants: {
      selectionState: {
        none: "text-foreground group-hover:bg-field group-data-[pressed=true]:bg-field-hover",
        middle: "text-foreground group-hover:bg-accent/20 group-data-[pressed=true]:bg-accent/25",
        cap: "bg-accent text-accent-foreground",
      },
      invalid: {
        true: "",
        false: "",
      },
      disabled: {
        true: "text-foreground-muted opacity-50",
        false: "",
      },
      outsideMonth: {
        true: "text-foreground-muted/70",
        false: "",
      },
      focusVisible: {
        true: "ring-2 ring-accent-ring ring-offset-2 ring-offset-background",
        false: "",
      },
      today: {
        true: "ring-1 ring-border-strong",
        false: "",
      },
    },
    compoundVariants: [
      {
        selectionState: "middle",
        invalid: true,
        className:
          "text-danger group-hover:bg-danger/20 group-data-[pressed=true]:bg-danger/25",
      },
      {
        selectionState: "cap",
        invalid: true,
        className: "bg-danger text-danger-foreground",
      },
      {
        selectionState: "cap",
        today: true,
        className: "ring-0",
      },
    ],
    defaultVariants: {
      selectionState: "none",
      invalid: false,
      disabled: false,
      outsideMonth: false,
      focusVisible: false,
      today: false,
    },
  },
);

export const appRangeCalendarErrorVariants = cva(
  "type-meta text-danger",
);

type AppRangeCalendarBehaviorProps<T extends DateValue> = Partial<
  Pick<
    ReactAriaRangeCalendarProps<T>,
    | "allowsNonContiguousRanges"
    | "aria-describedby"
    | "aria-details"
    | "aria-label"
    | "aria-labelledby"
    | "autoFocus"
    | "commitBehavior"
    | "createCalendar"
    | "defaultFocusedValue"
    | "defaultValue"
    | "firstDayOfWeek"
    | "focusedValue"
    | "id"
    | "isDateUnavailable"
    | "isDisabled"
    | "isInvalid"
    | "isReadOnly"
    | "maxValue"
    | "minValue"
    | "onChange"
    | "onFocusChange"
    | "pageBehavior"
    | "selectionAlignment"
    | "slot"
    | "value"
  >
>;

export type AppRangeCalendarProps<T extends DateValue> =
  AppRangeCalendarBehaviorProps<T> & {
    className?: string;
    errorMessage?: ReactNode;
    label?: ReactNode;
    visibleMonths?: number;
  };

function assertAppRangeCalendarPrimitiveContract(
  label: ReactNode | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appRangeCalendarControlSourcePath.length === 0 ||
    appRangeCalendarReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppRangeCalendar governance contract is incomplete.");
  }

  if (
    appRangeCalendarCompositionContract.requiresChildren &&
    appRangeCalendarCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppRangeCalendar composition contract is incomplete.");
  }

  if (
    label === undefined &&
    ariaLabel === undefined &&
    ariaLabelledBy === undefined
  ) {
    throw new Error("AppRangeCalendar requires label, aria-label, or aria-labelledby.");
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

function formatMonthLabel(date: DateValue, timeZone: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
    timeZone,
  }).format(date.toDate(timeZone));
}

export function AppRangeCalendar<T extends DateValue>({
  className,
  errorMessage,
  label,
  visibleMonths = 1,
  ...props
}: AppRangeCalendarProps<T>) {
  assertAppRangeCalendarPrimitiveContract(
    label,
    props["aria-label"],
    props["aria-labelledby"],
  );

  const labelId = useId();
  const mergedAriaLabelledBy =
    label !== undefined
      ? [labelId, props["aria-labelledby"]].filter(Boolean).join(" ")
      : props["aria-labelledby"];

  return (
    <ReactAriaRangeCalendar
      {...props}
      {...(label === undefined && props["aria-label"] !== undefined
        ? { "aria-label": props["aria-label"] }
        : {})}
      {...(mergedAriaLabelledBy !== undefined && mergedAriaLabelledBy.length > 0
        ? { "aria-labelledby": mergedAriaLabelledBy }
        : {})}
      visibleDuration={{ months: visibleMonths }}
      className={cn(appRangeCalendarVariants(), className)}
    >
      {({ state }) => (
        <>
          {label ? (
            <div id={labelId} className={appRangeCalendarLabelVariants()}>
              {label}
            </div>
          ) : null}
          <div className={appRangeCalendarMonthsVariants()}>
            {Array.from({ length: visibleMonths }, (_, index) => (
              <div
                key={index}
                className={appRangeCalendarMonthVariants()}
                data-app-range-calendar-month=""
              >
                <div className={appRangeCalendarHeaderVariants()}>
                  {index === 0 ? (
                    <Button
                      slot="previous"
                      aria-label="Previous month"
                      className={appRangeCalendarNavButtonVariants()}
                    >
                      <CalendarChevron direction="left" />
                    </Button>
                  ) : (
                    <span className="size-8 shrink-0" aria-hidden="true" />
                  )}
                  <Heading className={appRangeCalendarHeadingVariants()}>
                    {formatMonthLabel(
                      state.visibleRange.start.add({ months: index }),
                      state.timeZone,
                    )}
                  </Heading>
                  {index === visibleMonths - 1 ? (
                    <Button
                      slot="next"
                      aria-label="Next month"
                      className={appRangeCalendarNavButtonVariants()}
                    >
                      <CalendarChevron direction="right" />
                    </Button>
                  ) : (
                    <span className="size-8 shrink-0" aria-hidden="true" />
                  )}
                </div>
                <CalendarGrid
                  offset={{ months: index }}
                  weekdayStyle="short"
                  className={appRangeCalendarGridVariants()}
                >
                  <CalendarGridHeader>
                    {(day) => (
                      <CalendarHeaderCell className={appRangeCalendarHeaderCellVariants()}>
                        {day}
                      </CalendarHeaderCell>
                    )}
                  </CalendarGridHeader>
                  <CalendarGridBody>
                    {(date) => (
                      <CalendarCell
                        date={date}
                        className={(renderProps) =>
                          appRangeCalendarCellVariants({
                            selected: renderProps.isSelected,
                            invalid: renderProps.isInvalid,
                            selectionStart: renderProps.isSelectionStart,
                            selectionEnd: renderProps.isSelectionEnd,
                          })
                        }
                      >
                        {({ formattedDate, isDisabled, isFocusVisible, isInvalid, isOutsideMonth, isPressed, isSelected, isSelectionEnd, isSelectionStart, isToday }) => (
                          <span
                            className={appRangeCalendarDateVariants({
                              selectionState:
                                isSelected && (isSelectionStart || isSelectionEnd)
                                  ? "cap"
                                  : isSelected
                                    ? "middle"
                                    : "none",
                              invalid: isInvalid,
                              disabled: isDisabled,
                              outsideMonth: isOutsideMonth,
                              focusVisible: isFocusVisible,
                              today: isToday,
                            })}
                            data-app-range-calendar-date=""
                            data-pressed={isPressed || undefined}
                          >
                            {formattedDate}
                          </span>
                        )}
                      </CalendarCell>
                    )}
                  </CalendarGridBody>
                </CalendarGrid>
              </div>
            ))}
          </div>
          {errorMessage ? (
            <Text slot="errorMessage" className={appRangeCalendarErrorVariants()}>
              {errorMessage}
            </Text>
          ) : null}
        </>
      )}
    </ReactAriaRangeCalendar>
  );
}
