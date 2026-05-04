/**
 * @afenda-owner app-tooltip
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Tooltip for governed shared UI
 */
"use client";

import {
  OverlayArrow,
  Tooltip as ReactAriaTooltip,
  TooltipTrigger,
  composeRenderProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appTooltipCompositionContract,
  appTooltipControlSourcePath,
  appTooltipReactAriaPrimitives,
  type AppTooltipSize,
} from "@/components/ui-governance/app-tooltip/app-tooltip.contract.primitive.shared";

export { TooltipTrigger as AppTooltipTrigger };

export const appTooltipVariants = cva(
  [
    "z-50 border border-border-strong bg-surface-raised text-foreground shadow-lg outline-none forced-color-adjust-none",
    "will-change-[transform,opacity] [transform:translate3d(0,0,0)] transition-[transform,opacity] duration-200 ease-out",
    "data-[entering]:opacity-0 data-[exiting]:opacity-0",
    "data-[placement=top]:mb-2.5 data-[placement=top]:data-[entering]:translate-y-1 data-[placement=top]:data-[exiting]:translate-y-1",
    "data-[placement=bottom]:mt-2.5 data-[placement=bottom]:data-[entering]:-translate-y-1 data-[placement=bottom]:data-[exiting]:-translate-y-1",
    "data-[placement=left]:mr-2.5 data-[placement=left]:data-[entering]:translate-x-1 data-[placement=left]:data-[exiting]:translate-x-1",
    "data-[placement=right]:ml-2.5 data-[placement=right]:data-[entering]:-translate-x-1 data-[placement=right]:data-[exiting]:-translate-x-1",
    "[&_.react-aria-OverlayArrow>svg]:block [&_.react-aria-OverlayArrow>svg]:fill-[var(--color-surface-raised)] [&_.react-aria-OverlayArrow>svg]:stroke-[var(--color-border-strong)] [&_.react-aria-OverlayArrow>svg]:stroke-1",
    "data-[placement=bottom]:[&_.react-aria-OverlayArrow>svg]:rotate-180",
    "data-[placement=left]:[&_.react-aria-OverlayArrow>svg]:-rotate-90",
    "data-[placement=right]:[&_.react-aria-OverlayArrow>svg]:rotate-90",
  ],
  {
    variants: {
      size: {
        sm: "max-w-[9.375rem] rounded-(--radius-control) px-1.5 py-0.5 text-xs",
        md: "max-w-[min(12rem,calc(100vw-2rem))] rounded-(--radius-control) px-2 py-1 type-meta",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

function assertAppTooltipPrimitiveContract(children: AppTooltipProps["children"]): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appTooltipControlSourcePath.length === 0 ||
    appTooltipReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppTooltip governance contract is incomplete.");
  }

  if (
    appTooltipCompositionContract.requiresChildren &&
    appTooltipCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppTooltip composition contract is incomplete.");
  }

  if (children === undefined || children === null) {
    throw new Error("AppTooltip requires children.");
  }
}

type AppTooltipBaseProps = ComponentProps<typeof ReactAriaTooltip>;

export type AppTooltipProps = Omit<AppTooltipBaseProps, "children" | "className" | "offset"> & {
  children: ReactNode;
  className?: AppTooltipBaseProps["className"];
  /** Distance from trigger; defaults to 10 to match React Aria starter examples. */
  offset?: AppTooltipBaseProps["offset"];
  /** Max width and padding density. */
  size?: AppTooltipSize;
};

export function AppTooltip({
  children,
  className,
  offset = 10,
  size = "md",
  ...props
}: AppTooltipProps) {
  assertAppTooltipPrimitiveContract(children);

  return (
    <ReactAriaTooltip
      {...props}
      offset={offset}
      className={composeRenderProps(className, (resolvedClassName) =>
        cn(appTooltipVariants({ size }), resolvedClassName),
      )}
    >
      <OverlayArrow>
        <svg
          aria-hidden="true"
          width={8}
          height={8}
          viewBox="0 0 8 8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0 L4 4 L8 0" />
        </svg>
      </OverlayArrow>
      {children}
    </ReactAriaTooltip>
  );
}
