/**
 * @afenda-owner app-text-field
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Text Field for governed shared UI
 */
"use client";

import {
  FieldError,
  Input as ReactAriaInput,
  Label,
  Text,
  TextArea as ReactAriaTextArea,
  TextField as ReactAriaTextField,
  composeRenderProps,
  type ValidationResult,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  type AppTextFieldSize,
  appTextFieldCompositionContract,
  appTextFieldControlSourcePath,
  appTextFieldReactAriaPrimitives,
} from "@/components/ui-governance/app-text-field/app-text-field.contract.primitive.shared";
import { assertHasOneOfDirectChildTypes } from "@/components/ui-governance/governance.ui.react-aria-runtime.shared";

export const appTextFieldVariants = cva("flex flex-col gap-2 text-foreground", {
  variants: {
    invalid: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    invalid: false,
  },
});

export const appInputVariants = cva(
  [
    "rac-focus-ring w-full rounded-(--radius-control) border bg-field text-foreground outline-none transition",
    "placeholder:text-foreground-muted",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      size: {
        md: "min-h-9 px-3 py-2 type-body-sm",
        sm: "min-h-8 px-2.5 py-1.5 text-[0.8125rem] leading-5",
      },
      focused: {
        true: "border-border-strong ring-2 ring-accent-ring ring-inset",
        false: "border-border",
      },
      invalid: {
        true: "border-danger ring-1 ring-danger/20",
        false: "",
      },
      disabled: {
        true: "bg-field text-foreground-muted opacity-60",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      focused: false,
      invalid: false,
      disabled: false,
    },
  },
);

export const appTextAreaVariants = cva(
  [
    "rac-focus-ring w-full rounded-(--radius-control) border bg-field text-foreground outline-none transition",
    "placeholder:text-foreground-muted",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      size: {
        md: "min-h-24 px-3 py-2 type-body-sm",
        sm: "min-h-20 px-2.5 py-1.5 text-[0.8125rem] leading-5",
      },
      focused: {
        true: "border-border-strong ring-2 ring-accent-ring ring-inset",
        false: "border-border",
      },
      invalid: {
        true: "border-danger ring-1 ring-danger/20",
        false: "",
      },
      disabled: {
        true: "bg-field text-foreground-muted opacity-60",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      focused: false,
      invalid: false,
      disabled: false,
    },
  },
);

type AppTextFieldBaseProps = Omit<
  ComponentProps<typeof ReactAriaTextField>,
  "children" | "className"
>;

export type AppTextFieldProps = AppTextFieldBaseProps & {
  children: ReactNode;
  className?: ComponentProps<typeof ReactAriaTextField>["className"];
  description?: ReactNode;
  errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
  label?: ReactNode;
};

export type AppInputProps = Omit<
  ComponentProps<typeof ReactAriaInput>,
  "className" | "size"
> & {
  className?: ComponentProps<typeof ReactAriaInput>["className"];
  size?: AppTextFieldSize;
};

export type AppTextAreaProps = Omit<
  ComponentProps<typeof ReactAriaTextArea>,
  "className" | "size"
> & {
  className?: ComponentProps<typeof ReactAriaTextArea>["className"];
  size?: AppTextFieldSize;
};

function assertAppTextFieldPrimitiveContract(
  children: AppTextFieldProps["children"],
  label: ReactNode | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appTextFieldControlSourcePath.length === 0 ||
    appTextFieldReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppTextField governance contract is incomplete.");
  }

  if (
    appTextFieldCompositionContract.requiresChildren &&
    appTextFieldCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppTextField composition contract is incomplete.");
  }

  assertHasOneOfDirectChildTypes(
    "AppTextField",
    children,
    [AppInput, AppTextArea],
    ["AppInput", "AppTextArea"],
  );

  if (label === undefined && ariaLabel === undefined && ariaLabelledBy === undefined) {
    throw new Error("AppTextField requires label, aria-label, or aria-labelledby.");
  }
}

export function AppTextField({
  children,
  className,
  description,
  errorMessage,
  label,
  ...props
}: AppTextFieldProps) {
  assertAppTextFieldPrimitiveContract(
    children,
    label,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaTextField
      {...props}
      className={composeRenderProps(className, (resolvedClassName, renderProps) =>
        cn(
          appTextFieldVariants({
            invalid: renderProps.isInvalid,
          }),
          resolvedClassName,
        ),
      )}
    >
      {label ? <Label className="type-label">{label}</Label> : null}
      {children}
      {description ? (
        <Text slot="description" className="type-meta text-foreground-muted">
          {description}
        </Text>
      ) : null}
      <FieldError className="type-meta text-danger">{errorMessage}</FieldError>
    </ReactAriaTextField>
  );
}

export function AppInput({
  className,
  size = "md",
  ...props
}: AppInputProps) {
  return (
    <ReactAriaInput
      {...props}
      className={composeRenderProps(className, (resolvedClassName, renderProps) =>
        cn(
          appInputVariants({
            size,
            focused: renderProps.isFocused,
            invalid: renderProps.isInvalid,
            disabled: renderProps.isDisabled,
          }),
          resolvedClassName,
        ),
      )}
    />
  );
}

export function AppTextArea({
  className,
  size = "md",
  ...props
}: AppTextAreaProps) {
  return (
    <ReactAriaTextArea
      {...props}
      className={composeRenderProps(className, (resolvedClassName, renderProps) =>
        cn(
          appTextAreaVariants({
            size,
            focused: renderProps.isFocused,
            invalid: renderProps.isInvalid,
            disabled: renderProps.isDisabled,
          }),
          resolvedClassName,
        ),
      )}
    />
  );
}
