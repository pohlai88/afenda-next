/**
 * @afenda-owner app-file-trigger
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria File Trigger for governed shared UI
 */
"use client";

import { FileTrigger as ReactAriaFileTrigger } from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/components/cn";
import { assertSingleDirectElementChild } from "@/components/ui-governance/governance.ui.react-aria-runtime.shared";
import {
  appFileTriggerCompositionContract,
  appFileTriggerControlSourcePath,
  appFileTriggerReactAriaPrimitives,
  type AppFileTriggerLayout,
} from "@/components/ui-governance/app-file-trigger/app-file-trigger.contract.primitive.shared";

export const appFileTriggerContainerVariants = cva("min-w-0", {
  variants: {
    layout: {
      inline: "inline-flex max-w-full",
      block: "flex w-full",
    },
  },
  defaultVariants: {
    layout: "inline",
  },
});

type AppFileTriggerBaseProps = ComponentProps<typeof ReactAriaFileTrigger>;

export type AppFileTriggerProps = Omit<AppFileTriggerBaseProps, "children"> & {
  children: ReactNode;
  containerClassName?: string;
  layout?: AppFileTriggerLayout;
};

function assertAppFileTriggerPrimitiveContract(
  children: AppFileTriggerProps["children"],
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appFileTriggerControlSourcePath.length === 0 ||
    appFileTriggerReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppFileTrigger governance contract is incomplete.");
  }

  if (
    appFileTriggerCompositionContract.requiresChildren &&
    appFileTriggerCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppFileTrigger composition contract is incomplete.");
  }

  assertSingleDirectElementChild("AppFileTrigger", children);
}

export function AppFileTrigger({
  children,
  containerClassName,
  layout = "inline",
  ...props
}: AppFileTriggerProps) {
  assertAppFileTriggerPrimitiveContract(children);

  return (
    <div
      className={cn(
        appFileTriggerContainerVariants({ layout }),
        containerClassName,
      )}
    >
      <ReactAriaFileTrigger {...props}>{children}</ReactAriaFileTrigger>
    </div>
  );
}
