/**
 * @afenda-owner app-slider
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Slider for governed shared UI
 */
"use client";

import { Slider as ReactAriaSlider, SliderTrack as ReactAriaSliderTrack } from "react-aria-components";
import type { ComponentProps, ReactNode } from "react";
import {
  assertHasDirectChildOfType,
} from "@/components/ui-governance/governance.ui.react-aria-runtime.shared";

import {
  appSliderCompositionContract,
  appSliderControlSourcePath,
  appSliderReactAriaPrimitives,
} from "@/components/ui-governance/app-slider/app-slider.contract.primitive.shared";

function assertAppSliderPrimitiveContract(children: AppSliderProps["children"]): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (appSliderControlSourcePath.length === 0 || appSliderReactAriaPrimitives.at(0) === undefined) {
    throw new Error("AppSlider governance contract is incomplete.");
  }

  if (appSliderCompositionContract.requiresChildren && appSliderCompositionContract.requiredElements.at(0) === undefined) {
    throw new Error("AppSlider composition contract is incomplete.");
  }

  assertHasDirectChildOfType("AppSlider", children, ReactAriaSliderTrack, "SliderTrack");
}

type AppSliderBaseProps = ComponentProps<typeof ReactAriaSlider>;

export type AppSliderProps = Omit<AppSliderBaseProps, "children"> & {
  children: ReactNode;
};

export function AppSlider({ children, ...props }: AppSliderProps) {
  assertAppSliderPrimitiveContract(children);
  return <ReactAriaSlider {...props}>{children}</ReactAriaSlider>;
}
