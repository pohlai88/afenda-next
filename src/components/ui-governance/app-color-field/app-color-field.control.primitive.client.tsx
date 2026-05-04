/**
 * @afenda-owner app-color-field
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Color Field for governed shared UI
 */
"use client";

import {
  ColorField as ReactAriaColorField,
  FieldError,
  Input,
  Label,
  Text,
  getColorChannels,
  parseColor,
  type Color,
  type ColorChannel,
  type ColorFieldProps as ReactAriaColorFieldProps,
  type ColorSpace,
  type ValidationResult,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appColorFieldCompositionContract,
  appColorFieldControlSourcePath,
  appColorFieldReactAriaPrimitives,
  type AppColorFieldSize,
} from "@/components/ui-governance/app-color-field/app-color-field.contract.primitive.shared";

export const appColorFieldVariants = cva("flex flex-col", {
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

export const appColorFieldInputVariants = cva(
  [
    "rac-focus-ring rac-disabled rac-invalid field-control w-full outline-none transition",
    "type-body-sm text-foreground placeholder:text-foreground-muted",
  ],
  {
    variants: {
      size: {
        md: "",
        sm: "field-control-compact",
      },
      disabled: {
        true: "",
        false: "hover:bg-field-hover",
      },
      invalid: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
      invalid: false,
    },
  },
);

export { getColorChannels, parseColor };
export type AppColor = Color;
export type AppColorChannel = ColorChannel;
export type AppColorSpace = ColorSpace;

type AppColorFieldBehaviorProps = Partial<
  Pick<
    ReactAriaColorFieldProps,
    | "aria-describedby"
    | "aria-details"
    | "aria-errormessage"
    | "aria-label"
    | "aria-labelledby"
    | "autoFocus"
    | "channel"
    | "colorSpace"
    | "defaultValue"
    | "excludeFromTabOrder"
    | "form"
    | "id"
    | "isDisabled"
    | "isInvalid"
    | "isReadOnly"
    | "isRequired"
    | "isWheelDisabled"
    | "name"
    | "onBeforeInput"
    | "onBlur"
    | "onChange"
    | "onCompositionEnd"
    | "onCompositionStart"
    | "onCompositionUpdate"
    | "onCopy"
    | "onCut"
    | "onFocus"
    | "onFocusChange"
    | "onInput"
    | "onKeyDown"
    | "onKeyUp"
    | "onPaste"
    | "onSelect"
    | "slot"
    | "validate"
    | "validationBehavior"
    | "value"
  >
>;

export type AppColorFieldProps = AppColorFieldBehaviorProps & {
  className?: string;
  description?: ReactNode;
  errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
  inputClassName?: string;
  label?: ReactNode;
  placeholder?: string;
  size?: AppColorFieldSize;
};

function assertAppColorFieldPrimitiveContract(
  label: ReactNode | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appColorFieldControlSourcePath.length === 0 ||
    appColorFieldReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppColorField governance contract is incomplete.");
  }

  if (
    appColorFieldCompositionContract.requiresChildren &&
    appColorFieldCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppColorField composition contract is incomplete.");
  }

  if (
    label === undefined &&
    ariaLabel === undefined &&
    ariaLabelledBy === undefined
  ) {
    throw new Error(
      "AppColorField requires label, aria-label, or aria-labelledby.",
    );
  }
}

export function AppColorField({
  className,
  description,
  errorMessage,
  inputClassName,
  label,
  placeholder,
  size = "md",
  ...props
}: AppColorFieldProps) {
  assertAppColorFieldPrimitiveContract(
    label,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaColorField
      {...props}
      className={cn(appColorFieldVariants({ size }), className)}
    >
      {label ? <Label className="type-label">{label}</Label> : null}
      <Input
        className={(renderProps) =>
          cn(
            appColorFieldInputVariants({
              size,
              disabled: renderProps.isDisabled,
              invalid: renderProps.isInvalid,
            }),
            inputClassName,
          )
        }
        {...(placeholder !== undefined ? { placeholder } : {})}
      />
      {description ? (
        <Text slot="description" className="type-meta text-foreground-muted">
          {description}
        </Text>
      ) : null}
      <FieldError className="type-meta text-danger">{errorMessage}</FieldError>
    </ReactAriaColorField>
  );
}
