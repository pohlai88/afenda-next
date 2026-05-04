/**
 * @afenda-owner app-button
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Button for governed shared UI
 */
"use client";

import {
  Button as ReactAriaButton,
  ProgressBar as ReactAriaProgressBar,
  composeRenderProps,
  type ButtonProps as ReactAriaButtonProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  type AppButtonSize,
  type AppButtonVariant,
  appButtonCompositionContract,
  appButtonControlSourcePath,
  appButtonReactAriaPrimitives,
} from "@/components/ui-governance/app-button/app-button.contract.primitive.shared";

export const appButtonVariants = cva(
  [
    "rac-focus-ring rac-disabled type-label relative inline-flex items-center justify-center gap-2",
    "rounded-(--radius-control) border font-medium transition outline-none",
    "[-webkit-tap-highlight-color:transparent] select-none",
    "[&:has(>svg:only-child)]:px-0 [&:has(>svg:only-child)]:rounded-full",
    "[&:has(>svg:only-child)]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "border-accent bg-accent text-accent-foreground hover:bg-accent-strong",
        secondary:
          "border-border-strong bg-field text-foreground hover:bg-field-hover",
        destructive:
          "border-danger bg-danger text-danger-foreground hover:bg-danger-strong",
        quiet:
          "border-transparent bg-transparent text-foreground-muted hover:bg-surface-raised hover:text-foreground",
      },
      size: {
        md: [
          "min-h-[var(--control-height-comfortable)] px-[var(--control-padding-x-comfortable)]",
          "py-[var(--control-padding-y-comfortable)] [&:has(>svg:only-child)]:size-[var(--control-height-comfortable)]",
        ],
        sm: [
          "min-h-[var(--control-height-compact)] px-[var(--control-padding-x-compact)]",
          "py-[var(--control-padding-y-compact)] [&:has(>svg:only-child)]:size-[var(--control-height-compact)]",
        ],
      },
      pending: {
        true: "text-transparent",
        false: "",
      },
      disabled: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      pending: false,
      disabled: false,
    },
  },
);

type AppButtonBehaviorProps = Pick<
  ReactAriaButtonProps,
  | "aria-controls"
  | "aria-current"
  | "aria-describedby"
  | "aria-details"
  | "aria-disabled"
  | "aria-expanded"
  | "aria-haspopup"
  | "aria-label"
  | "aria-labelledby"
  | "aria-pressed"
  | "autoFocus"
  | "children"
  | "excludeFromTabOrder"
  | "form"
  | "formAction"
  | "formEncType"
  | "formMethod"
  | "formNoValidate"
  | "formTarget"
  | "id"
  | "isDisabled"
  | "isPending"
  | "name"
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
  | "preventFocusOnPress"
  | "slot"
  | "type"
  | "value"
>;

export type AppButtonProps = AppButtonBehaviorProps & {
  className?: string;
  pendingLabel?: string;
  size?: AppButtonSize;
  variant?: AppButtonVariant;
};

function ButtonSpinner({ pendingLabel }: { pendingLabel: string }) {
  return (
    <ReactAriaProgressBar
      aria-label={pendingLabel}
      isIndeterminate
      className="absolute inset-0 flex items-center justify-center"
    >
      <span aria-hidden="true" className="flex items-center justify-center">
        <svg
          className="size-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            className="opacity-25"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M21 12a9 9 0 0 0-9-9"
            className="opacity-100"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </ReactAriaProgressBar>
  );
}

function assertAppButtonPrimitiveContract(children: AppButtonProps["children"]): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appButtonControlSourcePath.length === 0 ||
    appButtonReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppButton governance contract is incomplete.");
  }

  if (
    appButtonCompositionContract.requiresChildren &&
    appButtonCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppButton composition contract is incomplete.");
  }

  if (children === undefined || children === null) {
    throw new Error("AppButton requires explicit children.");
  }
}

export function AppButton({
  className,
  pendingLabel = "pending",
  size = "md",
  variant = "primary",
  children,
  ...props
}: AppButtonProps) {
  assertAppButtonPrimitiveContract(children);

  return (
    <ReactAriaButton
      {...props}
      className={(renderProps) =>
        cn(
          appButtonVariants({
            variant,
            size,
            pending: renderProps.isPending,
            disabled: renderProps.isDisabled,
          }),
          className,
        )
      }
    >
      {composeRenderProps(children, (resolvedChildren, renderProps) => (
        <>
          <span
            className={cn(
              "inline-flex items-center gap-2",
              renderProps.isPending && "opacity-0",
            )}
          >
            {resolvedChildren}
          </span>
          {renderProps.isPending ? (
            <ButtonSpinner pendingLabel={pendingLabel} />
          ) : null}
        </>
      ))}
    </ReactAriaButton>
  );
}
