/**
 * @afenda-owner app-popover
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Governed anchored popover shell for contextual overlay content
 */
"use client";

import {
  DialogTrigger as ReactAriaDialogTrigger,
  OverlayArrow as ReactAriaOverlayArrow,
  Popover as ReactAriaPopover,
  composeRenderProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactElement, ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appPopoverCompositionContract,
  appPopoverControlSourcePath,
  appPopoverReactAriaPrimitives,
} from "@/components/ui-governance/app-popover/app-popover.contract.primitive.shared";
import { getDirectElementChildren } from "@/components/ui-governance/governance.ui.react-aria-runtime.shared";

export const appPopoverVariants = cva(
  [
    "surface-raised type-body relative text-foreground outline-none",
    "rounded-(--radius-panel) p-3 shadow-xl",
    "[&[data-trigger=MenuTrigger]]:p-0 [&[data-trigger=SubmenuTrigger]]:p-0",
  ],
  {
    variants: {
      entering: {
        true: "animate-in fade-in zoom-in-95 duration-200 ease-out",
        false: "",
      },
      exiting: {
        true: "animate-out fade-out zoom-out-95 duration-150 ease-in",
        false: "",
      },
      showArrow: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      entering: false,
      exiting: false,
      showArrow: false,
    },
  },
);

export const appPopoverArrowVariants = cva(
  [
    "block [&[data-placement=bottom]_svg]:rotate-180",
    "[&[data-placement=left]_svg]:-rotate-90 [&[data-placement=right]_svg]:rotate-90",
  ],
  {
    variants: {
      base: {
        default: "",
      },
    },
    defaultVariants: {
      base: "default",
    },
  },
);

type AppPopoverBaseProps = ComponentProps<typeof ReactAriaPopover>;

export type AppPopoverProps = Omit<
  AppPopoverBaseProps,
  "children" | "className"
> & {
  arrowClassName?: string;
  children: AppPopoverBaseProps["children"];
  className?: AppPopoverBaseProps["className"];
  showArrow?: boolean;
};

export type AppPopoverTriggerProps = Omit<
  ComponentProps<typeof ReactAriaDialogTrigger>,
  "children"
> & {
  children: ReactNode;
};

function assertAppPopoverPrimitiveContract(children: AppPopoverProps["children"]): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appPopoverControlSourcePath.length === 0 ||
    appPopoverReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppPopover governance contract is incomplete.");
  }

  if (
    appPopoverCompositionContract.requiresChildren &&
    appPopoverCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppPopover composition contract is incomplete.");
  }

  if (children === undefined || children === null) {
    throw new Error("AppPopover requires children.");
  }
}

function assertTriggerPair(
  componentName: string,
  children: ReactNode,
): [ReactElement, ReactElement] {
  const directChildren = getDirectElementChildren(children);

  if (directChildren.length !== 2) {
    throw new Error(
      `${componentName} requires exactly two direct React element children.`,
    );
  }

  return [directChildren[0]!, directChildren[1]!];
}

export function AppPopover({
  arrowClassName,
  children,
  className,
  offset,
  showArrow = false,
  ...props
}: AppPopoverProps) {
  assertAppPopoverPrimitiveContract(children);

  return (
    <ReactAriaPopover
      {...props}
      offset={offset ?? (showArrow ? 12 : 8)}
      className={composeRenderProps(className, (resolvedClassName, renderProps) =>
        cn(
          appPopoverVariants({
            entering: renderProps.isEntering,
            exiting: renderProps.isExiting,
            showArrow,
          }),
          resolvedClassName,
        ),
      )}
    >
      {composeRenderProps(children, (resolvedChildren, renderProps) => {
        const hideArrowForTrigger =
          renderProps.trigger === "MenuTrigger" ||
          renderProps.trigger === "SubmenuTrigger";

        return (
          <>
            {showArrow && !hideArrowForTrigger ? (
              <ReactAriaOverlayArrow
                data-app-popover-arrow=""
                className={cn(appPopoverArrowVariants(), arrowClassName)}
              >
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 12 12"
                  className="block fill-surface-raised stroke-border stroke-[1.25] transition-transform"
                >
                  <path d="M0 0 L6 6 L12 0" />
                </svg>
              </ReactAriaOverlayArrow>
            ) : null}
            {resolvedChildren}
          </>
        );
      })}
    </ReactAriaPopover>
  );
}

export function AppPopoverTrigger({
  children,
  ...props
}: AppPopoverTriggerProps) {
  const [trigger, popover] = assertTriggerPair("AppPopoverTrigger", children);

  return (
    <ReactAriaDialogTrigger {...props}>
      {trigger}
      {popover}
    </ReactAriaDialogTrigger>
  );
}
