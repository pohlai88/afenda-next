/**
 * @afenda-owner app-calendar
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Calendar for governed shared UI
 */
"use client";

import { Calendar as ReactAriaCalendar, CalendarGrid as ReactAriaCalendarGrid } from "react-aria-components";
import type { ComponentProps, ReactNode } from "react";
import {
  assertHasDirectChildOfType,
} from "@/components/ui-governance/governance.ui.react-aria-runtime.shared";

import {
  appCalendarCompositionContract,
  appCalendarControlSourcePath,
  appCalendarReactAriaPrimitives,
} from "@/components/ui-governance/app-calendar/app-calendar.contract.primitive.shared";

function assertAppCalendarPrimitiveContract(children: AppCalendarProps["children"]): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (appCalendarControlSourcePath.length === 0 || appCalendarReactAriaPrimitives.at(0) === undefined) {
    throw new Error("AppCalendar governance contract is incomplete.");
  }

  if (appCalendarCompositionContract.requiresChildren && appCalendarCompositionContract.requiredElements.at(0) === undefined) {
    throw new Error("AppCalendar composition contract is incomplete.");
  }

  assertHasDirectChildOfType("AppCalendar", children, ReactAriaCalendarGrid, "CalendarGrid");
}

type AppCalendarBaseProps = ComponentProps<typeof ReactAriaCalendar>;

export type AppCalendarProps = Omit<AppCalendarBaseProps, "children"> & {
  children: ReactNode;
};

export function AppCalendar({ children, ...props }: AppCalendarProps) {
  assertAppCalendarPrimitiveContract(children);
  return <ReactAriaCalendar {...props}>{children}</ReactAriaCalendar>;
}
