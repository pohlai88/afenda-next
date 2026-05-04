/**
 * @afenda-owner app-date-field
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Date Field for governed shared UI
 */
"use client";

import {
  DateField as ReactAriaDateField,
  DateInput,
  DateSegment,
  FieldError,
  Label,
  Text,
  type DateFieldProps as ReactAriaDateFieldProps,
  type DateValue,
  type ValidationResult,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appDateFieldCompositionContract,
  appDateFieldControlSourcePath,
  appDateFieldReactAriaPrimitives,
  type AppDateFieldSize,
} from "@/components/ui-governance/app-date-field/app-date-field.contract.primitive.shared";

export const appDateFieldVariants = cva("rac-invalid flex flex-col text-foreground", {
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

export const appDateFieldInputVariants = cva(
  [
    "field-control inline-flex min-w-[11rem] max-w-full items-center overflow-x-auto whitespace-nowrap outline-none transition [scrollbar-width:none]",
    "type-body-sm text-foreground forced-color-adjust-none",
    "data-[focus-within]:ring-2 data-[focus-within]:ring-accent-ring data-[focus-within]:ring-offset-2 data-[focus-within]:ring-offset-background",
    "data-[disabled]:cursor-default data-[disabled]:opacity-50",
    "data-[invalid]:border-danger data-[invalid]:ring-danger-ring",
  ],
  {
    variants: {
      size: {
        md: "",
        sm: "field-control-compact min-w-[10rem]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const appDateFieldSegmentVariants = cva(
  [
    "rounded-[4px] px-0.5 py-[2px] text-right outline-none [-webkit-tap-highlight-color:transparent]",
    "[font-variant-numeric:tabular-nums]",
    "data-[type=literal]:px-0 data-[placeholder]:text-foreground-muted",
    "data-[focused]:bg-accent data-[focused]:text-accent-foreground",
    "data-[invalid]:text-danger",
    "data-[invalid][data-focused]:bg-danger data-[invalid][data-focused]:text-danger-foreground",
    "data-[disabled]:cursor-default data-[disabled]:text-foreground-muted",
  ],
  {
    variants: {
      size: {
        md: "type-body-sm",
        sm: "text-xs leading-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type AppDateFieldProps<T extends DateValue> = Partial<
  Pick<
    ReactAriaDateFieldProps<T>,
    | "aria-describedby"
    | "aria-details"
    | "aria-label"
    | "aria-labelledby"
    | "autoComplete"
    | "autoFocus"
    | "defaultValue"
    | "form"
    | "granularity"
    | "hideTimeZone"
    | "hourCycle"
    | "id"
    | "isDateUnavailable"
    | "isDisabled"
    | "isInvalid"
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
    | "placeholderValue"
    | "shouldForceLeadingZeros"
    | "slot"
    | "validate"
    | "validationBehavior"
    | "value"
  >
> & {
  className?: string;
  description?: ReactNode;
  errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
  inputClassName?: string;
  label?: ReactNode;
  segmentClassName?: string;
  size?: AppDateFieldSize;
};

function assertAppDateFieldPrimitiveContract(
  label: ReactNode | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appDateFieldControlSourcePath.length === 0 ||
    appDateFieldReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppDateField governance contract is incomplete.");
  }

  if (
    appDateFieldCompositionContract.requiresChildren &&
    appDateFieldCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppDateField composition contract is incomplete.");
  }

  if (
    label === undefined &&
    ariaLabel === undefined &&
    ariaLabelledBy === undefined
  ) {
    throw new Error("AppDateField requires label, aria-label, or aria-labelledby.");
  }
}

export function AppDateField<T extends DateValue>({
  className,
  description,
  errorMessage,
  inputClassName,
  label,
  segmentClassName,
  size = "md",
  ...props
}: AppDateFieldProps<T>) {
  assertAppDateFieldPrimitiveContract(
    label,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaDateField
      {...props}
      className={cn(appDateFieldVariants({ size }), className)}
    >
      {label ? <Label className="type-label">{label}</Label> : null}
      <DateInput className={cn(appDateFieldInputVariants({ size }), inputClassName)}>
        {(segment) => (
          <DateSegment
            segment={segment}
            className={cn(appDateFieldSegmentVariants({ size }), segmentClassName)}
          />
        )}
      </DateInput>
      {description ? (
        <Text slot="description" className="type-meta text-foreground-muted">
          {description}
        </Text>
      ) : null}
      <FieldError className="type-meta text-danger">{errorMessage}</FieldError>
    </ReactAriaDateField>
  );
}
