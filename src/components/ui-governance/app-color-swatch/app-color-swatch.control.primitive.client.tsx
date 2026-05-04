/**
 * @afenda-owner app-color-swatch
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Color Swatch for governed shared UI
 */
"use client";

import {
  ColorSwatch as ReactAriaColorSwatch,
  parseColor,
  type Color,
  type ColorSwatchProps as ReactAriaColorSwatchProps,
  type ColorSwatchRenderProps,
} from "react-aria-components";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { cva } from "class-variance-authority";

import { cn } from "@/components/cn";
import {
  appColorSwatchCompositionContract,
  appColorSwatchControlSourcePath,
  appColorSwatchReactAriaPrimitives,
  type AppColorSwatchSize,
} from "@/components/ui-governance/app-color-swatch/app-color-swatch.contract.primitive.shared";

export const appColorSwatchVariants = cva(
  "box-border shrink-0 border border-border-strong shadow-[inset_0_0_0_1px_rgb(0_0_0_/_0.08)]",
  {
    variants: {
      size: {
        sm: "size-4 rounded-[calc(var(--radius-control)-0.25rem)]",
        md: "size-5 rounded-[calc(var(--radius-control)-0.25rem)]",
        lg: "size-8 rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export { parseColor };
export type AppColor = Color;

type AppColorSwatchBehaviorProps = Partial<
  Pick<
    ReactAriaColorSwatchProps,
    | "aria-describedby"
    | "aria-details"
    | "aria-label"
    | "aria-labelledby"
    | "color"
    | "colorName"
    | "id"
    | "slot"
  >
>;

export type AppColorSwatchProps = AppColorSwatchBehaviorProps & {
  className?: ReactAriaColorSwatchProps["className"];
  size?: AppColorSwatchSize;
};

function assertAppColorSwatchPrimitiveContract(): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appColorSwatchControlSourcePath.length === 0 ||
    appColorSwatchReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppColorSwatch governance contract is incomplete.");
  }

  if (
    appColorSwatchCompositionContract.requiresChildren &&
    appColorSwatchCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppColorSwatch composition contract is incomplete.");
  }
}

function getSwatchBackground(color: ColorSwatchRenderProps["color"]): string {
  return `linear-gradient(${color}, ${color}), repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`;
}

export function AppColorSwatch({
  className,
  size = "md",
  ...props
}: AppColorSwatchProps) {
  assertAppColorSwatchPrimitiveContract();

  return (
    <ReactAriaColorSwatch
      {...props}
      className={composeRenderProps(className, (resolvedClassName) =>
        cn(appColorSwatchVariants({ size }), resolvedClassName),
      )}
      style={({ color, defaultStyle }) => ({
        ...defaultStyle,
        background: getSwatchBackground(color),
      })}
    />
  );
}
