/**
 * @afenda-owner app-disclosure-group
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Disclosure Group for governed shared UI
 */
"use client";

import { DisclosureGroup as ReactAriaDisclosureGroup, type DisclosureGroupProps as ReactAriaDisclosureGroupProps } from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";
import { AppDisclosure } from "@/components/ui-governance/app-disclosure/app-disclosure.control.primitive.client";
import {
  appDisclosureGroupCompositionContract,
  appDisclosureGroupControlSourcePath,
  appDisclosureGroupReactAriaPrimitives,
  type AppDisclosureGroupSize,
} from "@/components/ui-governance/app-disclosure-group/app-disclosure-group.contract.primitive.shared";
import { assertHasDirectChildOfType } from "@/components/ui-governance/governance.ui.react-aria-runtime.shared";

export const appDisclosureGroupVariants = cva("flex flex-col", {
  variants: {
    size: {
      md: "w-full max-w-xl gap-2",
      sm: "w-full max-w-lg gap-1.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type AppDisclosureGroupBehaviorProps = Partial<
  Pick<
    ReactAriaDisclosureGroupProps,
    | "allowsMultipleExpanded"
    | "defaultExpandedKeys"
    | "expandedKeys"
    | "id"
    | "isDisabled"
    | "onExpandedChange"
  >
>;

export type AppDisclosureGroupProps = AppDisclosureGroupBehaviorProps & {
  children: ReactNode;
  className?: string;
  size?: AppDisclosureGroupSize;
};

function assertAppDisclosureGroupPrimitiveContract(
  children: AppDisclosureGroupProps["children"],
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appDisclosureGroupControlSourcePath.length === 0 ||
    appDisclosureGroupReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppDisclosureGroup governance contract is incomplete.");
  }

  if (
    appDisclosureGroupCompositionContract.requiresChildren &&
    appDisclosureGroupCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppDisclosureGroup composition contract is incomplete.");
  }

  assertHasDirectChildOfType(
    "AppDisclosureGroup",
    children,
    AppDisclosure,
    "AppDisclosure",
  );
}

export function AppDisclosureGroup({
  children,
  className,
  size = "md",
  ...props
}: AppDisclosureGroupProps) {
  assertAppDisclosureGroupPrimitiveContract(children);

  return (
    <ReactAriaDisclosureGroup
      {...props}
      className={cn(appDisclosureGroupVariants({ size }), className)}
    >
      {children}
    </ReactAriaDisclosureGroup>
  );
}
