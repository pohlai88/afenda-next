/**
 * @afenda-owner app-checkbox
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Checkbox for governed shared UI
 */
"use client";

import {
  Checkbox as ReactAriaCheckbox,
  composeRenderProps,
  type CheckboxProps as ReactAriaCheckboxProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  type AppCheckboxSize,
  appCheckboxCompositionContract,
  appCheckboxControlSourcePath,
  appCheckboxReactAriaPrimitives,
} from "@/components/ui-governance/app-checkbox/app-checkbox.contract.primitive.shared";

export const appCheckboxVariants = cva(
  [
    "rac-focus-ring rac-disabled group inline-flex items-start gap-3",
    "type-body-sm text-foreground transition outline-none",
    "[-webkit-tap-highlight-color:transparent]",
  ],
  {
    variants: {
      size: {
        md: "text-[var(--text-body-sm)] leading-[var(--text-body-sm--line-height)]",
        sm: "text-[0.8125rem] leading-5",
      },
      disabled: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  },
);

export const appCheckboxIndicatorVariants = cva(
  [
    "mt-0.5 inline-flex shrink-0 items-center justify-center border transition",
    "rounded-[calc(var(--radius-control)-0.25rem)]",
  ],
  {
    variants: {
      size: {
        md: "size-[1.125rem]",
        sm: "size-4",
      },
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
        className: "border-accent bg-accent text-accent-foreground",
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
        className: "border-danger bg-danger text-danger-foreground",
      },
      {
        disabled: true,
        className: "border-border bg-field text-foreground-muted",
      },
    ],
    defaultVariants: {
      size: "md",
      selected: false,
      invalid: false,
      disabled: false,
    },
  },
);

function assertAppCheckboxPrimitiveContract(): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (appCheckboxControlSourcePath.length === 0 || appCheckboxReactAriaPrimitives.at(0) === undefined) {
    throw new Error("AppCheckbox governance contract is incomplete.");
  }

  if (appCheckboxCompositionContract.requiresChildren && appCheckboxCompositionContract.requiredElements.at(0) === undefined) {
    throw new Error("AppCheckbox composition contract is incomplete.");
  }
}

type AppCheckboxBehaviorProps = Pick<
  ReactAriaCheckboxProps,
  | "aria-controls"
  | "aria-describedby"
  | "aria-details"
  | "aria-errormessage"
  | "aria-label"
  | "aria-labelledby"
  | "autoFocus"
  | "children"
  | "defaultSelected"
  | "excludeFromTabOrder"
  | "form"
  | "id"
  | "inputRef"
  | "isDisabled"
  | "isIndeterminate"
  | "isInvalid"
  | "isReadOnly"
  | "isRequired"
  | "isSelected"
  | "name"
  | "onBlur"
  | "onChange"
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
  | "validationBehavior"
  | "value"
>;

export type AppCheckboxProps = AppCheckboxBehaviorProps & {
  className?: string;
  size?: AppCheckboxSize;
};

function CheckboxIcon({
  indeterminate,
  selected,
}: {
  indeterminate: boolean;
  selected: boolean;
}) {
  if (!indeterminate && !selected) {
    return null;
  }

  return indeterminate ? (
    <svg
      aria-hidden="true"
      className="size-3"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8H13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg
      aria-hidden="true"
      className="size-3"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8.5L6.5 12L13 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AppCheckbox({
  className,
  size = "md",
  children,
  ...props
}: AppCheckboxProps) {
  assertAppCheckboxPrimitiveContract();

  return (
    <ReactAriaCheckbox
      {...props}
      className={composeRenderProps(className, (resolvedClassName, renderProps) =>
        cn(
          appCheckboxVariants({
            size,
            disabled: renderProps.isDisabled,
          }),
          resolvedClassName,
        ),
      )}
    >
      {composeRenderProps(children, (resolvedChildren, renderProps) => {
        const selected = renderProps.isSelected || renderProps.isIndeterminate;

        return (
          <>
            <span
              aria-hidden="true"
              className={appCheckboxIndicatorVariants({
                size,
                selected,
                invalid: renderProps.isInvalid,
                disabled: renderProps.isDisabled,
              })}
            >
              <CheckboxIcon
                indeterminate={renderProps.isIndeterminate}
                selected={selected}
              />
            </span>
            {resolvedChildren ? (
              <span className="pt-0.5">{resolvedChildren as ReactNode}</span>
            ) : null}
          </>
        );
      })}
    </ReactAriaCheckbox>
  );
}
