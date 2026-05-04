/**
 * @afenda-owner app-switch
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Switch for governed shared UI
 */
"use client";

import {
  Switch as ReactAriaSwitch,
  composeRenderProps,
  type SwitchProps as ReactAriaSwitchProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  type AppSwitchSize,
  appSwitchCompositionContract,
  appSwitchControlSourcePath,
  appSwitchReactAriaPrimitives,
} from "@/components/ui-governance/app-switch/app-switch.contract.primitive.shared";

export const appSwitchVariants = cva(
  [
    "rac-focus-ring rac-disabled rac-readonly group inline-flex items-start gap-3 outline-none transition",
    "type-body-sm text-foreground",
    "[-webkit-tap-highlight-color:transparent]",
  ],
  {
    variants: {
      size: {
        md: "",
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

export const appSwitchTrackVariants = cva(
  [
    "mt-0.5 inline-flex shrink-0 items-center rounded-full border transition",
    "group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-accent-ring group-data-[focus-visible]:ring-offset-2 group-data-[focus-visible]:ring-offset-background",
  ],
  {
    variants: {
      size: {
        md: "h-5 w-9 px-0.5",
        sm: "h-[1.125rem] w-8 px-0.5",
      },
      selected: {
        true: "",
        false: "",
      },
      disabled: {
        true: "",
        false: "",
      },
      pressed: {
        true: "",
        false: "",
      },
      readOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        selected: false,
        disabled: false,
        pressed: false,
        readOnly: false,
        className: "border-border-strong bg-field",
      },
      {
        selected: false,
        disabled: false,
        pressed: true,
        className: "border-border-strong bg-field-hover",
      },
      {
        selected: true,
        disabled: false,
        pressed: false,
        readOnly: false,
        className: "border-accent bg-accent",
      },
      {
        selected: true,
        disabled: false,
        pressed: true,
        className: "border-accent bg-accent-strong",
      },
      {
        disabled: true,
        selected: false,
        className: "border-border bg-field opacity-70",
      },
      {
        disabled: true,
        selected: true,
        className: "border-border bg-field opacity-70",
      },
      {
        readOnly: true,
        disabled: false,
        selected: false,
        className: "border-border-strong bg-surface-raised",
      },
      {
        readOnly: true,
        disabled: false,
        selected: true,
        className: "border-accent bg-accent/80",
      },
    ],
    defaultVariants: {
      size: "md",
      selected: false,
      disabled: false,
      pressed: false,
      readOnly: false,
    },
  },
);

export const appSwitchHandleVariants = cva(
  "rounded-full shadow-sm transition-transform duration-200 ease-out",
  {
    variants: {
      size: {
        md: "size-4",
        sm: "size-3.5",
      },
      selected: {
        true: "",
        false: "",
      },
      disabled: {
        true: "",
        false: "",
      },
      pressed: {
        true: "scale-x-110",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "md",
        selected: false,
        className: "translate-x-0",
      },
      {
        size: "md",
        selected: true,
        className: "translate-x-4",
      },
      {
        size: "sm",
        selected: false,
        className: "translate-x-0",
      },
      {
        size: "sm",
        selected: true,
        className: "translate-x-[0.875rem]",
      },
      {
        selected: false,
        disabled: false,
        className: "bg-foreground",
      },
      {
        selected: true,
        disabled: false,
        className: "bg-accent-foreground",
      },
      {
        selected: false,
        disabled: true,
        className: "bg-foreground-muted",
      },
      {
        selected: true,
        disabled: true,
        className: "bg-surface-raised",
      },
    ],
    defaultVariants: {
      size: "md",
      selected: false,
      disabled: false,
      pressed: false,
    },
  },
);

function assertAppSwitchPrimitiveContract(
  children: ReactNode | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appSwitchControlSourcePath.length === 0 ||
    appSwitchReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppSwitch governance contract is incomplete.");
  }

  if (
    appSwitchCompositionContract.requiresChildren &&
    appSwitchCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppSwitch composition contract is incomplete.");
  }

  if (
    children === undefined &&
    ariaLabel === undefined &&
    ariaLabelledBy === undefined
  ) {
    throw new Error("AppSwitch requires children, aria-label, or aria-labelledby.");
  }
}

type AppSwitchBehaviorProps = Pick<
  ReactAriaSwitchProps,
  | "aria-controls"
  | "aria-describedby"
  | "aria-details"
  | "aria-label"
  | "aria-labelledby"
  | "autoFocus"
  | "defaultSelected"
  | "excludeFromTabOrder"
  | "form"
  | "id"
  | "inputRef"
  | "isDisabled"
  | "isReadOnly"
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
  | "slot"
  | "value"
>;

export type AppSwitchProps = AppSwitchBehaviorProps & {
  children?: ReactNode;
  className?: string;
  size?: AppSwitchSize;
};

export function AppSwitch({
  children,
  className,
  size = "md",
  ...props
}: AppSwitchProps) {
  assertAppSwitchPrimitiveContract(
    children,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaSwitch
      {...props}
      className={composeRenderProps(className, (resolvedClassName, renderProps) =>
        cn(
          appSwitchVariants({
            size,
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
            className={appSwitchTrackVariants({
              size,
              selected: renderProps.isSelected,
              disabled: renderProps.isDisabled,
              pressed: renderProps.isPressed,
              readOnly: renderProps.isReadOnly,
            })}
          >
            <span
              className={appSwitchHandleVariants({
                size,
                selected: renderProps.isSelected,
                disabled: renderProps.isDisabled,
                pressed: renderProps.isPressed,
              })}
            />
          </span>
          {resolvedChildren ? (
            <span className="pt-0.5">{resolvedChildren as ReactNode}</span>
          ) : null}
        </>
      ))}
    </ReactAriaSwitch>
  );
}
