/**
 * @afenda-owner app-separator
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Separator for governed shared UI
 */
"use client";

import { Separator as ReactAriaSeparator } from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/components/cn";
import {
  type AppSeparatorOrientation,
  appSeparatorCompositionContract,
  appSeparatorControlSourcePath,
  appSeparatorReactAriaPrimitives,
} from "@/components/ui-governance/app-separator/app-separator.contract.primitive.shared";

export const appSeparatorVariants = cva(
  "shrink-0 rounded-full bg-border",
  {
    variants: {
      orientation: {
        horizontal: "h-px w-full",
        vertical: "h-full min-h-8 w-px",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

function assertAppSeparatorPrimitiveContract(): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appSeparatorControlSourcePath.length === 0 ||
    appSeparatorReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppSeparator governance contract is incomplete.");
  }

  if (
    appSeparatorCompositionContract.requiresChildren &&
    appSeparatorCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppSeparator composition contract is incomplete.");
  }
}

type AppSeparatorBaseProps = ComponentProps<typeof ReactAriaSeparator>;

export type AppSeparatorProps = Omit<AppSeparatorBaseProps, "className"> & {
  className?: string;
  orientation?: AppSeparatorOrientation;
};

export function AppSeparator({
  className,
  orientation = "horizontal",
  ...props
}: AppSeparatorProps) {
  assertAppSeparatorPrimitiveContract();

  return (
    <ReactAriaSeparator
      {...props}
      orientation={orientation}
      className={cn(appSeparatorVariants({ orientation }), className)}
    />
  );
}
