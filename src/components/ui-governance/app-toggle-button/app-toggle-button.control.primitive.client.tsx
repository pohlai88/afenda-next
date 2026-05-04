/**
 * @afenda-owner app-toggle-button
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Toggle Button for governed shared UI
 */
"use client";

import { ToggleButton as ReactAriaToggleButton } from "react-aria-components";
import type { ComponentProps } from "react";

import {
  appToggleButtonCompositionContract,
  appToggleButtonControlSourcePath,
  appToggleButtonReactAriaPrimitives,
} from "@/components/ui-governance/app-toggle-button/app-toggle-button.contract.primitive.shared";

function assertAppToggleButtonPrimitiveContract(): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (appToggleButtonControlSourcePath.length === 0 || appToggleButtonReactAriaPrimitives.at(0) === undefined) {
    throw new Error("AppToggleButton governance contract is incomplete.");
  }

  if (appToggleButtonCompositionContract.requiresChildren && appToggleButtonCompositionContract.requiredElements.at(0) === undefined) {
    throw new Error("AppToggleButton composition contract is incomplete.");
  }
}

export type AppToggleButtonProps = ComponentProps<typeof ReactAriaToggleButton>;

export function AppToggleButton(props: AppToggleButtonProps) {
  assertAppToggleButtonPrimitiveContract();
  return <ReactAriaToggleButton {...props} />;
}
