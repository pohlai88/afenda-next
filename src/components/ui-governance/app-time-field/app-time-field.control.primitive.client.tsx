/**
 * @afenda-owner app-time-field
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Time Field for governed shared UI
 */
"use client";

import {
  DateInput,
  DateSegment,
  FieldError,
  Label,
  Text,
  TimeField as ReactAriaTimeField,
  type TimeFieldProps as ReactAriaTimeFieldProps,
  type TimeValue,
  type ValidationResult,
} from "react-aria-components";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appDateFieldInputVariants,
  appDateFieldSegmentVariants,
  appDateFieldVariants,
} from "@/components/ui-governance/app-date-field/app-date-field.control.primitive.client";
import {
  appTimeFieldCompositionContract,
  appTimeFieldControlSourcePath,
  appTimeFieldReactAriaPrimitives,
  type AppTimeFieldSize,
} from "@/components/ui-governance/app-time-field/app-time-field.contract.primitive.shared";

export const appTimeFieldVariants = appDateFieldVariants;
export const appTimeFieldInputVariants = appDateFieldInputVariants;
export const appTimeFieldSegmentVariants = appDateFieldSegmentVariants;

export type AppTimeFieldProps<T extends TimeValue> = Partial<
  Pick<
    ReactAriaTimeFieldProps<T>,
    | "aria-describedby"
    | "aria-details"
    | "aria-label"
    | "aria-labelledby"
    | "autoFocus"
    | "defaultValue"
    | "form"
    | "granularity"
    | "hideTimeZone"
    | "hourCycle"
    | "id"
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
  size?: AppTimeFieldSize;
};

function assertAppTimeFieldPrimitiveContract(
  label: ReactNode | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appTimeFieldControlSourcePath.length === 0 ||
    appTimeFieldReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppTimeField governance contract is incomplete.");
  }

  if (
    appTimeFieldCompositionContract.requiresChildren &&
    appTimeFieldCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppTimeField composition contract is incomplete.");
  }

  if (
    label === undefined &&
    ariaLabel === undefined &&
    ariaLabelledBy === undefined
  ) {
    throw new Error("AppTimeField requires label, aria-label, or aria-labelledby.");
  }
}

export function AppTimeField<T extends TimeValue>({
  className,
  description,
  errorMessage,
  inputClassName,
  label,
  segmentClassName,
  size = "md",
  ...props
}: AppTimeFieldProps<T>) {
  assertAppTimeFieldPrimitiveContract(
    label,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaTimeField
      {...props}
      className={cn(appTimeFieldVariants({ size }), className)}
    >
      {label ? <Label className="type-label">{label}</Label> : null}
      <DateInput className={cn(appTimeFieldInputVariants({ size }), inputClassName)}>
        {(segment) => (
          <DateSegment
            segment={segment}
            className={cn(appTimeFieldSegmentVariants({ size }), segmentClassName)}
          />
        )}
      </DateInput>
      {description ? (
        <Text slot="description" className="type-meta text-foreground-muted">
          {description}
        </Text>
      ) : null}
      <FieldError className="type-meta text-danger">{errorMessage}</FieldError>
    </ReactAriaTimeField>
  );
}
