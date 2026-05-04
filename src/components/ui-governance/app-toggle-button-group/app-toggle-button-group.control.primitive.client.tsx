/**
 * @afenda-owner app-toggle-button-group
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Toggle Button Group for governed shared UI
 */
"use client";

import {
  ToggleButtonGroup as ReactAriaToggleButtonGroup,
  composeRenderProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/components/cn";
import {
  appToggleButtonGroupCompositionContract,
  appToggleButtonGroupControlSourcePath,
  appToggleButtonGroupReactAriaPrimitives,
  type AppToggleButtonGroupVisual,
} from "@/components/ui-governance/app-toggle-button-group/app-toggle-button-group.contract.primitive.shared";

export const appToggleButtonGroupVariants = cva(
  [
    "outline-none",
    "data-disabled:cursor-not-allowed data-disabled:opacity-60",
  ],
  {
    variants: {
      visual: {
        toolbar: [
          "inline-flex flex-wrap gap-1",
          "orientation-horizontal:flex-row orientation-vertical:flex-col",
          "orientation-vertical:w-fit orientation-vertical:max-w-full",
        ],
        segmented: [
          "inline-flex gap-0 overflow-hidden rounded-(--radius-control) border border-border bg-field p-px",
          "orientation-horizontal:flex-row orientation-vertical:flex-col",
          "orientation-vertical:w-fit",
          "[&>.react-aria-ToggleButton]:relative [&>.react-aria-ToggleButton]:z-1 [&>.react-aria-ToggleButton]:min-w-0 [&>.react-aria-ToggleButton]:rounded-none",
          "[&>.react-aria-ToggleButton]:bg-transparent [&>.react-aria-ToggleButton]:text-foreground-muted",
          "[&>.react-aria-ToggleButton]:data-disabled:z-0",
          "[&>.react-aria-ToggleButton]:data-selected:z-2 [&>.react-aria-ToggleButton]:data-focus-visible:z-2",
          "[&>.react-aria-ToggleButton]:data-selected:bg-surface-raised [&>.react-aria-ToggleButton]:data-selected:text-foreground",
          "[&>.react-aria-ToggleButton]:data-pressed:[&>span]:scale-90",
        ],
      },
    },
    defaultVariants: {
      visual: "toolbar",
    },
  },
);

function assertAppToggleButtonGroupPrimitiveContract(): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appToggleButtonGroupControlSourcePath.length === 0 ||
    appToggleButtonGroupReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppToggleButtonGroup governance contract is incomplete.");
  }

  if (
    appToggleButtonGroupCompositionContract.requiresChildren &&
    appToggleButtonGroupCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppToggleButtonGroup composition contract is incomplete.");
  }
}

type AppToggleButtonGroupBaseProps = ComponentProps<
  typeof ReactAriaToggleButtonGroup
>;

export type AppToggleButtonGroupProps = AppToggleButtonGroupBaseProps & {
  /**
   * `toolbar`: spaced inline toggles. `segmented`: merged control (horizontal or vertical via `orientation`).
   */
  visual?: AppToggleButtonGroupVisual;
};

export function AppToggleButtonGroup({
  className,
  visual = "toolbar",
  ...props
}: AppToggleButtonGroupProps) {
  assertAppToggleButtonGroupPrimitiveContract();

  return (
    <ReactAriaToggleButtonGroup
      {...props}
      className={composeRenderProps(className, (resolvedClassName) =>
        cn(appToggleButtonGroupVariants({ visual }), resolvedClassName),
      )}
    />
  );
}
