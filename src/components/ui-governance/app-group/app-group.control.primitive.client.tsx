/**
 * @afenda-owner app-group
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Group for governed shared UI
 */
"use client";

import { Group as ReactAriaGroup, composeRenderProps } from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appGroupCompositionContract,
  appGroupControlSourcePath,
  appGroupReactAriaPrimitives,
  type AppGroupDensity,
  type AppGroupLayout,
} from "@/components/ui-governance/app-group/app-group.contract.primitive.shared";

export const appGroupVariants = cva(
  [
    "rac-disabled rac-invalid rac-readonly field-control transition",
    "data-[focus-within]:ring-2 data-[focus-within]:ring-accent-ring data-[focus-within]:ring-offset-2 data-[focus-within]:ring-offset-background",
    "data-[disabled]:cursor-default data-[disabled]:opacity-50",
    "data-[invalid]:border-danger data-[invalid]:ring-danger-ring",
    "data-[readonly]:bg-surface-raised",
  ],
  {
    variants: {
      layout: {
        inline: "inline-flex w-fit max-w-full items-center gap-2",
        stack: "flex w-full flex-col gap-2",
      },
      density: {
        default: "",
        compact: "field-control-compact",
      },
    },
    defaultVariants: {
      layout: "inline",
      density: "default",
    },
  },
);

function assertAppGroupPrimitiveContract(children: AppGroupProps["children"]): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (appGroupControlSourcePath.length === 0 || appGroupReactAriaPrimitives.at(0) === undefined) {
    throw new Error("AppGroup governance contract is incomplete.");
  }

  if (appGroupCompositionContract.requiresChildren && appGroupCompositionContract.requiredElements.at(0) === undefined) {
    throw new Error("AppGroup composition contract is incomplete.");
  }

  if (children === undefined || children === null) {
    throw new Error("AppGroup requires children.");
  }
}

type AppGroupBaseProps = ComponentProps<typeof ReactAriaGroup>;

export type AppGroupProps = Omit<AppGroupBaseProps, "children" | "className"> & {
  children: ReactNode;
  className?: AppGroupBaseProps["className"];
  density?: AppGroupDensity;
  layout?: AppGroupLayout;
};

export function AppGroup({
  children,
  className,
  density = "default",
  layout = "inline",
  ...props
}: AppGroupProps) {
  assertAppGroupPrimitiveContract(children);

  return (
    <ReactAriaGroup
      {...props}
      className={composeRenderProps(className, (resolvedClassName) =>
        cn(appGroupVariants({ density, layout }), resolvedClassName),
      )}
    >
      {children}
    </ReactAriaGroup>
  );
}
