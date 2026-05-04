/**
 * @afenda-owner app-radio-group
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Radio Group for governed shared UI
 */
"use client";

import {
  FieldError,
  Label,
  Radio as ReactAriaRadio,
  RadioGroup as ReactAriaRadioGroup,
  Text,
  composeRenderProps,
  type RadioGroupProps as ReactAriaRadioGroupProps,
  type RadioProps as ReactAriaRadioProps,
  type ValidationResult,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  type AppRadioGroupOrientation,
  appRadioGroupCompositionContract,
  appRadioGroupControlSourcePath,
  appRadioGroupReactAriaPrimitives,
} from "@/components/ui-governance/app-radio-group/app-radio-group.contract.primitive.shared";
import { assertHasDirectChildOfType } from "@/components/ui-governance/governance.ui.react-aria-runtime.shared";

export const appRadioGroupVariants = cva(
  ["rac-invalid flex flex-col gap-2 text-foreground"],
  {
    variants: {
      invalid: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      invalid: false,
    },
  },
);

export const appRadioGroupItemsVariants = cva("flex gap-3", {
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row flex-wrap items-start gap-x-4 gap-y-3",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export const appRadioVariants = cva(
  [
    "rac-focus-ring rac-disabled rac-readonly group inline-flex items-start gap-3 outline-none",
    "type-body-sm text-foreground transition",
    "[-webkit-tap-highlight-color:transparent]",
  ],
  {
    variants: {
      disabled: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);

export const appRadioIndicatorVariants = cva(
  [
    "mt-0.5 inline-flex size-[1.125rem] shrink-0 items-center justify-center rounded-full border transition",
  ],
  {
    variants: {
      selected: {
        true: "",
        false: "",
      },
      invalid: {
        true: "",
        false: "",
      },
      disabled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        selected: false,
        invalid: false,
        disabled: false,
        className:
          "border-border-strong bg-surface-raised text-transparent group-hover:bg-field",
      },
      {
        selected: true,
        invalid: false,
        disabled: false,
        className: "border-accent bg-surface-raised text-accent",
      },
      {
        selected: false,
        invalid: true,
        disabled: false,
        className: "border-danger bg-surface-raised text-danger",
      },
      {
        selected: true,
        invalid: true,
        disabled: false,
        className: "border-danger bg-surface-raised text-danger",
      },
      {
        disabled: true,
        className: "border-border bg-field text-foreground-muted",
      },
    ],
    defaultVariants: {
      selected: false,
      invalid: false,
      disabled: false,
    },
  },
);

function assertAppRadioGroupPrimitiveContract(
  children: ReactNode,
  label: ReactNode | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (appRadioGroupControlSourcePath.length === 0 || appRadioGroupReactAriaPrimitives.at(0) === undefined) {
    throw new Error("AppRadioGroup governance contract is incomplete.");
  }

  if (appRadioGroupCompositionContract.requiresChildren && appRadioGroupCompositionContract.requiredElements.at(0) === undefined) {
    throw new Error("AppRadioGroup composition contract is incomplete.");
  }

  if (children === undefined || children === null) {
    throw new Error("AppRadioGroup requires explicit AppRadio children.");
  }

  assertHasDirectChildOfType(
    "AppRadioGroup",
    children,
    AppRadio,
    "AppRadio",
  );

  if (label === undefined && ariaLabel === undefined && ariaLabelledBy === undefined) {
    throw new Error(
      "AppRadioGroup requires label, aria-label, or aria-labelledby.",
    );
  }
}

type AppRadioGroupBehaviorProps = Partial<
  Pick<
    ReactAriaRadioGroupProps,
    | "aria-describedby"
    | "aria-details"
    | "aria-errormessage"
    | "aria-label"
    | "aria-labelledby"
    | "defaultValue"
    | "form"
    | "id"
    | "isDisabled"
    | "isInvalid"
    | "isReadOnly"
    | "isRequired"
    | "name"
    | "onBlur"
    | "onChange"
    | "onFocus"
    | "onFocusChange"
    | "slot"
    | "validate"
    | "validationBehavior"
    | "value"
  >
>;

export type AppRadioGroupProps = AppRadioGroupBehaviorProps & {
  children: ReactNode;
  className?: string;
  description?: ReactNode;
  errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
  label?: ReactNode;
  orientation?: AppRadioGroupOrientation;
};

type AppRadioBehaviorProps = Pick<
  ReactAriaRadioProps,
  | "aria-describedby"
  | "aria-details"
  | "aria-label"
  | "aria-labelledby"
  | "autoFocus"
  | "children"
  | "id"
  | "inputRef"
  | "isDisabled"
  | "onBlur"
  | "onFocus"
  | "onFocusChange"
  | "onHoverChange"
  | "onHoverEnd"
  | "onHoverStart"
  | "onKeyDown"
  | "onKeyUp"
  | "onPress"
  | "onPressChange"
  | "onPressEnd"
  | "onPressStart"
  | "onPressUp"
  | "slot"
  | "value"
>;

export type AppRadioProps = AppRadioBehaviorProps & {
  className?: string;
};

export function AppRadioGroup({
  children,
  className,
  description,
  errorMessage,
  label,
  orientation = "vertical",
  ...props
}: AppRadioGroupProps) {
  assertAppRadioGroupPrimitiveContract(
    children,
    label,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaRadioGroup
      {...props}
      className={cn(
        appRadioGroupVariants({ invalid: props.isInvalid }),
        className,
      )}
    >
      {label ? <Label className="type-label">{label}</Label> : null}
      <div
        className={appRadioGroupItemsVariants({ orientation })}
        data-app-radio-group-items=""
      >
        {children}
      </div>
      {description ? (
        <Text slot="description" className="type-meta text-foreground-muted">
          {description}
        </Text>
      ) : null}
      <FieldError className="type-meta text-danger">{errorMessage}</FieldError>
    </ReactAriaRadioGroup>
  );
}

export function AppRadio({
  children,
  className,
  ...props
}: AppRadioProps) {
  return (
    <ReactAriaRadio
      {...props}
      className={composeRenderProps(className, (resolvedClassName, renderProps) =>
        cn(
          appRadioVariants({
            disabled: renderProps.isDisabled,
          }),
          resolvedClassName,
        ),
      )}
    >
      {composeRenderProps(children, (resolvedChildren, renderProps) => (
        <>
          <span
            aria-hidden="true"
            className={appRadioIndicatorVariants({
              selected: renderProps.isSelected,
              invalid: renderProps.isInvalid,
              disabled: renderProps.isDisabled,
            })}
            data-app-radio-indicator=""
          >
            <span
              className={cn(
                "size-2 rounded-full bg-current transition",
                renderProps.isSelected ? "scale-100" : "scale-0",
              )}
            />
          </span>
          {resolvedChildren ? (
            <span className="pt-0.5">{resolvedChildren as ReactNode}</span>
          ) : null}
        </>
      ))}
    </ReactAriaRadio>
  );
}
