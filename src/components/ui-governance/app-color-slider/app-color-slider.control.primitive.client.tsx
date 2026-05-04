/**
 * @afenda-owner app-color-slider
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Color Slider for governed shared UI
 */
"use client";

import {
  ColorSlider as ReactAriaColorSlider,
  ColorThumb,
  Label,
  SliderOutput,
  SliderTrack,
  getColorChannels,
  parseColor,
  type Color,
  type ColorChannel,
  type ColorSliderProps as ReactAriaColorSliderProps,
  type ColorSpace,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appColorSliderCompositionContract,
  appColorSliderControlSourcePath,
  appColorSliderReactAriaPrimitives,
  type AppColorSliderSize,
} from "@/components/ui-governance/app-color-slider/app-color-slider.contract.primitive.shared";

export const appColorSliderVariants = cva("type-body-sm items-center", {
  variants: {
    size: {
      md: "",
      sm: "",
    },
    orientation: {
      horizontal: "grid w-full max-w-56 grid-cols-[1fr_auto] gap-2",
      vertical: "flex flex-col gap-2",
    },
  },
  defaultVariants: {
    size: "md",
    orientation: "horizontal",
  },
});

export const appColorSliderOutputVariants = cva(
  "type-meta text-foreground-muted",
  {
    variants: {
      orientation: {
        horizontal: "text-right",
        vertical: "hidden",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

export const appColorSliderTrackVariants = cva("group rounded-(--radius-control)", {
  variants: {
    orientation: {
      horizontal: "col-span-2 h-5 w-full",
      vertical: "h-50 w-6",
    },
    disabled: {
      true: "bg-field",
      false: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    disabled: false,
  },
});

export const appColorSliderThumbVariants = cva(
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

type AppColorSliderBehaviorProps = Partial<
  Pick<
    ReactAriaColorSliderProps,
    | "aria-describedby"
    | "aria-details"
    | "aria-label"
    | "aria-labelledby"
    | "colorSpace"
    | "defaultValue"
    | "form"
    | "id"
    | "isDisabled"
    | "name"
    | "onChange"
    | "onChangeEnd"
    | "orientation"
    | "slot"
    | "value"
  >
>;

export type AppColorSliderProps = AppColorSliderBehaviorProps & {
  channel: NonNullable<ReactAriaColorSliderProps["channel"]>;
  className?: string;
  label?: ReactNode;
  size?: AppColorSliderSize;
};

function assertAppColorSliderPrimitiveContract(
  channel: AppColorSliderProps["channel"],
  label: ReactNode | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appColorSliderControlSourcePath.length === 0 ||
    appColorSliderReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppColorSlider governance contract is incomplete.");
  }

  if (
    appColorSliderCompositionContract.requiresChildren &&
    appColorSliderCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppColorSlider composition contract is incomplete.");
  }

  if (channel === undefined) {
    throw new Error("AppColorSlider requires an explicit channel.");
  }

  if (
    label === undefined &&
    ariaLabel === undefined &&
    ariaLabelledBy === undefined
  ) {
    throw new Error(
      "AppColorSlider requires label, aria-label, or aria-labelledby.",
    );
  }
}

export function AppColorSlider({
  channel,
  className,
  label,
  orientation = "horizontal",
  size = "md",
  ...props
}: AppColorSliderProps) {
  assertAppColorSliderPrimitiveContract(
    channel,
    label,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaColorSlider
      {...props}
      channel={channel}
      orientation={orientation}
      className={cn(
        appColorSliderVariants({
          size,
          orientation,
        }),
        className,
      )}
    >
      {label ? <Label className="type-label">{label}</Label> : null}
      <SliderOutput
        className={appColorSliderOutputVariants({ orientation })}
      />
      <SliderTrack
        className={appColorSliderTrackVariants({
          orientation,
          disabled: props.isDisabled,
        })}
        style={({ defaultStyle, isDisabled }) => ({
          ...defaultStyle,
          background: isDisabled
            ? undefined
            : `${defaultStyle.background}, repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
        })}
      >
        <ColorThumb
          className={(renderProps) =>
            appColorSliderThumbVariants({
              dragging: renderProps.isDragging,
              focusVisible: renderProps.isFocusVisible,
              disabled: renderProps.isDisabled,
            })
          }
          style={({ defaultStyle, isDisabled }) => ({
            ...defaultStyle,
            backgroundColor: isDisabled
              ? undefined
              : defaultStyle.backgroundColor,
            boxShadow:
              "0 0 0 1px rgb(0 0 0 / 0.85), inset 0 0 0 1px rgb(0 0 0 / 0.75)",
          })}
        />
      </SliderTrack>
    </ReactAriaColorSlider>
  );
}
