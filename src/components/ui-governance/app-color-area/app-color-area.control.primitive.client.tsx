/**
 * @afenda-owner app-color-area
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Color Area for governed shared UI
 */
"use client";

import {
  ColorArea as ReactAriaColorArea,
  ColorThumb as ReactAriaColorThumb,
  getColorChannels,
  parseColor,
  type Color,
  type ColorChannel,
  type ColorAreaProps as ReactAriaColorAreaProps,
  type ColorSpace,
  type ColorThumbProps as ReactAriaColorThumbProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";

import { cn } from "@/components/cn";
import {
  appColorAreaCompositionContract,
  appColorAreaControlSourcePath,
  appColorAreaReactAriaPrimitives,
  appColorAreaSizeValues,
  type AppColorAreaSize,
} from "@/components/ui-governance/app-color-area/app-color-area.contract.primitive.shared";

export const appColorAreaVariants = cva(
  [
    "rac-disabled rac-focus-ring relative aspect-square w-full overflow-hidden border transition outline-none",
    "rounded-(--radius-control) border-border-strong bg-field",
  ],
  {
    variants: {
      size: {
        md: "max-w-56",
        lg: "max-w-64",
      },
      disabled: {
        true: "bg-field",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  },
);

export const appColorAreaThumbVariants = cva(
  [
    "pointer-events-none absolute top-1/2 left-1/2 rounded-full border-[3px] border-surface-raised",
    "ring-1 ring-border-strong transition-[width,height,background-color,transform]",
    "-translate-x-1/2 -translate-y-1/2",
  ],
  {
    variants: {
      focusVisible: {
        true: "size-7",
        false: "size-4",
      },
      dragging: {
        true: "scale-110",
        false: "",
      },
      disabled: {
        true: "bg-field text-foreground-muted",
        false: "",
      },
    },
    defaultVariants: {
      focusVisible: false,
      dragging: false,
      disabled: false,
    },
  },
);

export { getColorChannels, parseColor };
export type AppColor = Color;
export type AppColorChannel = ColorChannel;
export type AppColorSpace = ColorSpace;

function assertAppColorAreaPrimitiveContract(
  xChannel: AppColorAreaProps["xChannel"],
  yChannel: AppColorAreaProps["yChannel"],
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (appColorAreaControlSourcePath.length === 0 || appColorAreaReactAriaPrimitives.at(0) === undefined) {
    throw new Error("AppColorArea governance contract is incomplete.");
  }

  if (appColorAreaCompositionContract.requiresChildren && appColorAreaCompositionContract.requiredElements.at(0) === undefined) {
    throw new Error("AppColorArea composition contract is incomplete.");
  }

  if (xChannel === undefined || yChannel === undefined) {
    throw new Error("AppColorArea requires explicit xChannel and yChannel.");
  }

  if (ariaLabel === undefined && ariaLabelledBy === undefined) {
    throw new Error("AppColorArea requires aria-label or aria-labelledby.");
  }
}

type AppColorAreaBehaviorProps = Partial<
  Pick<
    ReactAriaColorAreaProps,
    | "aria-describedby"
    | "aria-details"
    | "aria-label"
    | "aria-labelledby"
    | "colorSpace"
    | "defaultValue"
    | "form"
    | "id"
    | "isDisabled"
    | "onChange"
    | "onChangeEnd"
    | "slot"
    | "value"
    | "xName"
    | "yName"
  >
>;

export type AppColorAreaProps = AppColorAreaBehaviorProps & {
  className?: string;
  size?: AppColorAreaSize;
  xChannel: NonNullable<ReactAriaColorAreaProps["xChannel"]>;
  yChannel: NonNullable<ReactAriaColorAreaProps["yChannel"]>;
};

function AppColorAreaThumb(props: ReactAriaColorThumbProps) {
  return (
    <ReactAriaColorThumb
      {...props}
      className={(renderProps) =>
        appColorAreaThumbVariants({
          focusVisible: renderProps.isFocusVisible,
          dragging: renderProps.isDragging,
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
  );
}

export function AppColorArea({
  className,
  size = "md",
  xChannel,
  yChannel,
  ...props
}: AppColorAreaProps) {
  assertAppColorAreaPrimitiveContract(
    xChannel,
    yChannel,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaColorArea
      {...props}
      xChannel={xChannel}
      yChannel={yChannel}
      className={(renderProps) =>
        cn(
          appColorAreaVariants({
            size,
            disabled: renderProps.isDisabled,
          }),
          className,
        )
      }
      style={({ defaultStyle, isDisabled }) => ({
        ...defaultStyle,
        background: isDisabled ? undefined : defaultStyle.background,
      })}
    >
      <AppColorAreaThumb />
    </ReactAriaColorArea>
  );
}
