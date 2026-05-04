/**
 * @afenda-owner app-number-field
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Number Field for governed shared UI
 */
"use client";

import { NumberField as ReactAriaNumberField, Group as ReactAriaGroup } from "react-aria-components";
import type { ComponentProps, ReactNode } from "react";
import {
  assertHasDirectChildOfType,
} from "@/components/ui-governance/governance.ui.react-aria-runtime.shared";

import {
  appNumberFieldCompositionContract,
  appNumberFieldControlSourcePath,
  appNumberFieldReactAriaPrimitives,
} from "@/components/ui-governance/app-number-field/app-number-field.contract.primitive.shared";

function assertAppNumberFieldPrimitiveContract(children: AppNumberFieldProps["children"]): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (appNumberFieldControlSourcePath.length === 0 || appNumberFieldReactAriaPrimitives.at(0) === undefined) {
    throw new Error("AppNumberField governance contract is incomplete.");
  }

  if (appNumberFieldCompositionContract.requiresChildren && appNumberFieldCompositionContract.requiredElements.at(0) === undefined) {
    throw new Error("AppNumberField composition contract is incomplete.");
  }

  assertHasDirectChildOfType("AppNumberField", children, ReactAriaGroup, "Group");
}

type AppNumberFieldBaseProps = ComponentProps<typeof ReactAriaNumberField>;

export type AppNumberFieldProps = Omit<AppNumberFieldBaseProps, "children"> & {
  children: ReactNode;
};

export function AppNumberField({ children, ...props }: AppNumberFieldProps) {
  assertAppNumberFieldPrimitiveContract(children);
  return <ReactAriaNumberField {...props}>{children}</ReactAriaNumberField>;
}
