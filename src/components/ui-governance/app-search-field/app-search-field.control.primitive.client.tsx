/**
 * @afenda-owner app-search-field
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Search Field for governed shared UI
 */
"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  SearchField as ReactAriaSearchField,
  Text,
  type SearchFieldProps as ReactAriaSearchFieldProps,
  type ValidationResult,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  type AppSearchFieldSize,
  appSearchFieldCompositionContract,
  appSearchFieldControlSourcePath,
  appSearchFieldReactAriaPrimitives,
} from "@/components/ui-governance/app-search-field/app-search-field.contract.primitive.shared";

export const appSearchFieldVariants = cva(
  "rac-invalid flex flex-col text-foreground",
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

export const appSearchFieldControlVariants = cva(
  [
    "field-control flex min-w-[14rem] max-w-full items-center gap-2 rounded-full pe-1 transition",
    "data-[focus-within]:ring-2 data-[focus-within]:ring-accent-ring data-[focus-within]:ring-offset-2 data-[focus-within]:ring-offset-background",
    "data-[invalid]:border-danger data-[invalid]:ring-danger-ring",
  ],
  {
    variants: {
      size: {
        md: "",
        sm: "field-control-compact min-w-[12rem]",
      },
      disabled: {
        true: "cursor-default opacity-50",
        false: "hover:bg-field-hover",
      },
      invalid: {
        true: "",
        false: "",
      },
      readOnly: {
        true: "bg-surface-raised",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
      invalid: false,
      readOnly: false,
    },
  },
);

export const appSearchFieldIconVariants = cva(
  "shrink-0 text-foreground-muted",
  {
    variants: {
      size: {
        md: "ms-3 size-4",
        sm: "ms-2.5 size-4",
      },
      disabled: {
        true: "text-foreground-muted",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  },
);

export const appSearchFieldInputVariants = cva(
  [
    "min-w-0 flex-1 bg-transparent outline-none",
    "type-body-sm text-foreground placeholder:text-foreground-muted",
    "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
    "data-[disabled]:cursor-default",
  ],
  {
    variants: {
      size: {
        md: "py-0",
        sm: "py-0",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const appSearchFieldClearButtonVariants = cva(
  "rac-focus-ring inline-flex items-center justify-center rounded-full outline-none transition",
  {
    variants: {
      size: {
        md: "size-7",
        sm: "size-6",
      },
      empty: {
        true: "pointer-events-none invisible",
        false: "visible",
      },
      disabled: {
        true: "text-foreground-muted",
        false: "text-foreground-muted hover:bg-surface-raised hover:text-foreground",
      },
    },
    defaultVariants: {
      size: "md",
      empty: true,
      disabled: false,
    },
  },
);

function assertAppSearchFieldPrimitiveContract(
  label: ReactNode | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appSearchFieldControlSourcePath.length === 0 ||
    appSearchFieldReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppSearchField governance contract is incomplete.");
  }

  if (
    appSearchFieldCompositionContract.requiresChildren &&
    appSearchFieldCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppSearchField composition contract is incomplete.");
  }

  if (
    label === undefined &&
    ariaLabel === undefined &&
    ariaLabelledBy === undefined
  ) {
    throw new Error("AppSearchField requires label, aria-label, or aria-labelledby.");
  }
}

type AppSearchFieldBehaviorProps = Partial<
  Pick<
    ReactAriaSearchFieldProps,
    | "aria-activedescendant"
    | "aria-autocomplete"
    | "aria-controls"
    | "aria-describedby"
    | "aria-details"
    | "aria-errormessage"
    | "aria-haspopup"
    | "aria-label"
    | "aria-labelledby"
    | "autoComplete"
    | "autoCorrect"
    | "autoFocus"
    | "defaultValue"
    | "enterKeyHint"
    | "excludeFromTabOrder"
    | "form"
    | "id"
    | "inputMode"
    | "isDisabled"
    | "isInvalid"
    | "isReadOnly"
    | "isRequired"
    | "maxLength"
    | "minLength"
    | "name"
    | "onBeforeInput"
    | "onBlur"
    | "onChange"
    | "onClear"
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
    | "onSubmit"
    | "pattern"
    | "slot"
    | "spellCheck"
    | "type"
    | "validate"
    | "validationBehavior"
    | "value"
  >
>;

export type AppSearchFieldProps = AppSearchFieldBehaviorProps & {
  className?: string;
  clearButtonAriaLabel?: string;
  clearButtonClassName?: string;
  description?: ReactNode;
  errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
  inputClassName?: string;
  label?: ReactNode;
  placeholder?: string;
  size?: AppSearchFieldSize;
};

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ClearIcon() {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function AppSearchField({
  className,
  clearButtonAriaLabel = "Clear search",
  clearButtonClassName,
  description,
  errorMessage,
  inputClassName,
  label,
  placeholder,
  size = "md",
  ...props
}: AppSearchFieldProps) {
  assertAppSearchFieldPrimitiveContract(
    label,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaSearchField
      {...props}
      className={cn(appSearchFieldVariants({ size }), className)}
    >
      {(renderProps) => (
        <>
          {label ? <Label className="type-label">{label}</Label> : null}
          <div
            className={appSearchFieldControlVariants({
              size,
              disabled: renderProps.isDisabled,
              invalid: renderProps.isInvalid,
              readOnly: renderProps.isReadOnly,
            })}
            data-invalid={renderProps.isInvalid || undefined}
          >
            <SearchIcon
              className={appSearchFieldIconVariants({
                size,
                disabled: renderProps.isDisabled,
              })}
            />
            <Input
              {...(placeholder !== undefined ? { placeholder } : {})}
              className={cn(appSearchFieldInputVariants({ size }), inputClassName)}
            />
            {!renderProps.isEmpty ? (
              <Button
                aria-label={clearButtonAriaLabel}
                className={cn(
                  appSearchFieldClearButtonVariants({
                    size,
                    empty: renderProps.isEmpty,
                    disabled: renderProps.isDisabled,
                  }),
                  clearButtonClassName,
                )}
              >
                <ClearIcon />
              </Button>
            ) : null}
          </div>
          {description ? (
            <Text slot="description" className="type-meta text-foreground-muted">
              {description}
            </Text>
          ) : null}
          <FieldError className="type-meta text-danger">{errorMessage}</FieldError>
        </>
      )}
    </ReactAriaSearchField>
  );
}
