/**
 * @afenda-owner app-virtualizer
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Virtualizer for governed shared UI
 */
"use client";

import {
  GridLayout,
  ListLayout,
  TableLayout,
  Virtualizer as ReactAriaVirtualizer,
  type VirtualizerProps as ReactAriaVirtualizerProps,
  WaterfallLayout,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";
import { AppGridList } from "@/components/ui-governance/app-grid-list/app-grid-list.control.primitive.client";
import { AppListBox } from "@/components/ui-governance/app-list-box/app-list-box.control.primitive.client";
import { AppTable } from "@/components/ui-governance/app-table/app-table.control.primitive.client";
import {
  assertHasOneOfDirectChildTypes,
  assertSingleDirectElementChild,
} from "@/components/ui-governance/governance.ui.react-aria-runtime.shared";
import {
  appVirtualizerCompositionContract,
  appVirtualizerControlSourcePath,
  appVirtualizerLayoutKindValues,
  appVirtualizerReactAriaPrimitives,
} from "@/components/ui-governance/app-virtualizer/app-virtualizer.contract.primitive.shared";

export const appVirtualizerContainerVariants = cva("contents", {
  variants: {
    layoutKind: {
      list: "",
      grid: "",
      waterfall: "",
      table: "",
      custom: "",
    },
  },
  defaultVariants: {
    layoutKind: "custom",
  },
});

export type AppVirtualizerProps<O> = Omit<
  ReactAriaVirtualizerProps<O>,
  "children"
> & {
  children: ReactNode;
};

type AppVirtualizerLayoutKind = (typeof appVirtualizerLayoutKindValues)[number];

function assertAppVirtualizerPrimitiveContract(
  children: AppVirtualizerProps<unknown>["children"],
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appVirtualizerControlSourcePath.length === 0 ||
    appVirtualizerReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppVirtualizer governance contract is incomplete.");
  }

  if (
    appVirtualizerCompositionContract.requiresChildren &&
    appVirtualizerCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppVirtualizer composition contract is incomplete.");
  }

  if (children === undefined || children === null) {
    throw new Error("AppVirtualizer requires a single governed collection child.");
  }

  assertSingleDirectElementChild("AppVirtualizer", children);
  assertHasOneOfDirectChildTypes(
    "AppVirtualizer",
    children,
    [AppListBox, AppGridList, AppTable],
    ["AppListBox", "AppGridList", "AppTable"],
  );
}

function resolveAppVirtualizerLayoutKind(
  layout: AppVirtualizerProps<unknown>["layout"],
): AppVirtualizerLayoutKind {
  if (layout === ListLayout || layout instanceof ListLayout) {
    return "list";
  }

  if (layout === GridLayout || layout instanceof GridLayout) {
    return "grid";
  }

  if (layout === WaterfallLayout || layout instanceof WaterfallLayout) {
    return "waterfall";
  }

  if (layout === TableLayout || layout instanceof TableLayout) {
    return "table";
  }

  return "custom";
}

export function AppVirtualizer<O>({
  children,
  ...props
}: AppVirtualizerProps<O>) {
  assertAppVirtualizerPrimitiveContract(children);
  const layoutKind = resolveAppVirtualizerLayoutKind(
    props.layout as AppVirtualizerProps<unknown>["layout"],
  );

  return (
    <div
      className={cn(appVirtualizerContainerVariants({ layoutKind }))}
      data-layout-kind={layoutKind}
    >
      <ReactAriaVirtualizer {...props}>{children}</ReactAriaVirtualizer>
    </div>
  );
}
