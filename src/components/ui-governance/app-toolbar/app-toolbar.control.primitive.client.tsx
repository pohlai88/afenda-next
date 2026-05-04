/**
 * @afenda-owner app-toolbar
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Toolbar for governed shared UI
 */
"use client";

import {
  SeparatorContext,
  ToggleButtonGroupContext,
  Toolbar as ReactAriaToolbar,
  composeRenderProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appToolbarCompositionContract,
  appToolbarControlSourcePath,
  appToolbarReactAriaPrimitives,
  type AppToolbarDensity,
} from "@/components/ui-governance/app-toolbar/app-toolbar.contract.primitive.shared";

export const appToolbarVariants = cva(
  [
    "flex flex-wrap outline-none",
    "w-fit max-w-full min-w-0",
    "orientation-horizontal:flex-row orientation-horizontal:items-center",
    "orientation-vertical:flex-col orientation-vertical:items-start",
    "[&_.react-aria-Group]:contents",
    "[&_.react-aria-Separator[aria-orientation=vertical]]:h-auto [&_.react-aria-Separator[aria-orientation=vertical]]:mx-1",
  ],
  {
    variants: {
      density: {
        default: "gap-1",
        compact: "gap-0.5",
      },
    },
    defaultVariants: {
      density: "default",
    },
  },
);

function assertAppToolbarPrimitiveContract(children: AppToolbarProps["children"]): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appToolbarControlSourcePath.length === 0 ||
    appToolbarReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppToolbar governance contract is incomplete.");
  }

  if (
    appToolbarCompositionContract.requiresChildren &&
    appToolbarCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppToolbar composition contract is incomplete.");
  }

  if (children === undefined || children === null) {
    throw new Error("AppToolbar requires children.");
  }
}

type AppToolbarBaseProps = ComponentProps<typeof ReactAriaToolbar>;

export type AppToolbarProps = Omit<AppToolbarBaseProps, "children" | "className"> & {
  children: ReactNode;
  className?: AppToolbarBaseProps["className"];
  /** Spacing between toolbar items. */
  density?: AppToolbarDensity;
};

export function AppToolbar({
  children,
  className,
  density = "default",
  orientation = "horizontal",
  ...props
}: AppToolbarProps) {
  assertAppToolbarPrimitiveContract(children);

  const toolbarOrientation = orientation ?? "horizontal";
  const separatorOrientation =
    toolbarOrientation === "horizontal" ? "vertical" : "horizontal";

  return (
    <ToggleButtonGroupContext.Provider value={{ orientation: toolbarOrientation }}>
      <SeparatorContext.Provider value={{ orientation: separatorOrientation }}>
        <ReactAriaToolbar
          {...props}
          orientation={orientation}
          className={composeRenderProps(className, (resolvedClassName) =>
            cn(appToolbarVariants({ density }), resolvedClassName),
          )}
        >
          {children}
        </ReactAriaToolbar>
      </SeparatorContext.Provider>
    </ToggleButtonGroupContext.Provider>
  );
}
