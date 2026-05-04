/**
 * @afenda-owner app-color-wheel
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Color Wheel for governed shared UI
 */
"use client";

import {
  ColorThumb,
  ColorWheel as ReactAriaColorWheel,
  ColorWheelTrack,
  getColorChannels,
  parseColor,
  type Color,
  type ColorChannel,
  type ColorSpace,
  type ColorWheelProps as ReactAriaColorWheelProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";

import { cn } from "@/components/cn";
import {
  appColorWheelCompositionContract,
  appColorWheelControlSourcePath,
  appColorWheelReactAriaPrimitives,
  type AppColorWheelSize,
} from "@/components/ui-governance/app-color-wheel/app-color-wheel.contract.primitive.shared";

export const appColorWheelVariants = cva("relative", {
  variants: {
    size: {
      sm: "size-36",
      md: "size-50",
      lg: "size-60",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const appColorWheelTrackVariants = cva("rounded-full", {
  variants: {
    disabled: {
      true: "bg-field",
      false: "",
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export const appColorWheelThumbVariants = cva(
  [
    "rounded-full border-[3px] border-surface-raised ring-1 ring-border-strong transition-[width,height,background-color,transform]",
  ],
  {
    variants: {
      dragging: {
        true: "scale-110",
        false: "",
      },
      focusVisible: {
        true: "size-6",
        false: "size-4",
      },
      disabled: {
        true: "bg-field text-foreground-muted",
        false: "",
      },
    },
    defaultVariants: {
      dragging: false,
      focusVisible: false,
      disabled: false,
    },
  },
);

export { getColorChannels, parseColor };
export type AppColor = Color;
export type AppColorChannel = ColorChannel;
export type AppColorSpace = ColorSpace;

type AppColorWheelBehaviorProps = Partial<
  Omit<
    ReactAriaColorWheelProps,
    "children" | "className" | "innerRadius" | "outerRadius"
  >
>;

export type AppColorWheelProps = AppColorWheelBehaviorProps & {
  className?: string;
  size?: AppColorWheelSize;
};

function getWheelGeometry(size: AppColorWheelSize): {
  innerRadius: number;
  outerRadius: number;
} {
  switch (size) {
    case "sm":
      return {
        innerRadius: 52,
        outerRadius: 72,
      };
    case "lg":
      return {
        innerRadius: 88,
        outerRadius: 120,
      };
    case "md":
    default:
      return {
        innerRadius: 74,
        outerRadius: 100,
      };
  }
}

function assertAppColorWheelPrimitiveContract(
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appColorWheelControlSourcePath.length === 0 ||
    appColorWheelReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppColorWheel governance contract is incomplete.");
  }

  if (
    appColorWheelCompositionContract.requiresChildren &&
    appColorWheelCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppColorWheel composition contract is incomplete.");
  }

  if (ariaLabel === undefined && ariaLabelledBy === undefined) {
    throw new Error("AppColorWheel requires aria-label or aria-labelledby.");
  }
}

export function AppColorWheel({
  className,
  size = "md",
  ...props
}: AppColorWheelProps) {
  assertAppColorWheelPrimitiveContract(
    props["aria-label"],
    props["aria-labelledby"],
  );

  const geometry = getWheelGeometry(size);

  return (
    <ReactAriaColorWheel
      {...props}
      innerRadius={geometry.innerRadius}
      outerRadius={geometry.outerRadius}
      className={(renderProps) =>
        cn(appColorWheelVariants({ size }), className)
      }
    >
      <ColorWheelTrack
        className={(renderProps) =>
          appColorWheelTrackVariants({
            disabled: renderProps.isDisabled,
          })
        }
        style={({ defaultStyle, isDisabled }) => ({
          ...defaultStyle,
          background: isDisabled
            ? undefined
            : `${defaultStyle.background}, repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
        })}
      />
      <ColorThumb
        className={(renderProps) =>
          appColorWheelThumbVariants({
            dragging: renderProps.isDragging,
            focusVisible: renderProps.isFocusVisible,
            disabled: renderProps.isDisabled,
          })
        }
        style={({ defaultStyle, isDisabled }) => ({
          ...defaultStyle,
          backgroundColor: isDisabled ? undefined : defaultStyle.backgroundColor,
          boxShadow:
            "0 0 0 1px rgb(0 0 0 / 0.85), inset 0 0 0 1px rgb(0 0 0 / 0.75)",
        })}
      />
    </ReactAriaColorWheel>
  );
}
