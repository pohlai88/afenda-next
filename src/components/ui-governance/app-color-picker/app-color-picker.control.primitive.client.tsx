/**
 * @afenda-owner app-color-picker
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Color Picker for governed shared UI
 */
"use client";

import {
  Button,
  ColorPicker as ReactAriaColorPicker,
  Dialog,
  DialogTrigger,
  Popover,
  getColorChannels,
  parseColor,
  type Color,
  type ColorChannel,
  type ColorPickerProps as ReactAriaColorPickerProps,
  type ColorSpace,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";
import { AppColorArea } from "@/components/ui-governance/app-color-area/app-color-area.control.primitive.client";
import { AppColorField } from "@/components/ui-governance/app-color-field/app-color-field.control.primitive.client";
import { AppColorSlider } from "@/components/ui-governance/app-color-slider/app-color-slider.control.primitive.client";
import { AppColorSwatch } from "@/components/ui-governance/app-color-swatch/app-color-swatch.control.primitive.client";
import {
  appColorPickerCompositionContract,
  appColorPickerControlSourcePath,
  appColorPickerReactAriaPrimitives,
  type AppColorPickerSize,
} from "@/components/ui-governance/app-color-picker/app-color-picker.contract.primitive.shared";

export const appColorPickerTriggerVariants = cva(
  [
    "rac-focus-ring rac-disabled inline-flex items-center gap-2 rounded-(--radius-control) border border-transparent px-2 py-1.5 outline-none transition",
    "type-body-sm text-foreground [-webkit-tap-highlight-color:transparent]",
  ],
  {
    variants: {
      size: {
        md: "min-h-10",
        sm: "min-h-9 gap-1.5 px-2 py-1",
      },
      disabled: {
        true: "",
        false: "hover:bg-field-hover",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  },
);

export const appColorPickerPanelVariants = cva(
  "surface-raised flex min-w-60 flex-col gap-3 p-3",
);

export { getColorChannels, parseColor };
export type AppColor = Color;
export type AppColorChannel = ColorChannel;
export type AppColorSpace = ColorSpace;

type AppColorPickerBehaviorProps = Partial<
  Pick<ReactAriaColorPickerProps, "defaultValue" | "onChange" | "slot" | "value">
>;

export type AppColorPickerProps = AppColorPickerBehaviorProps & {
  children?: ReactNode;
  label?: ReactNode;
  panelClassName?: string;
  size?: AppColorPickerSize;
  triggerAriaLabel?: string;
  triggerClassName?: string;
};

function assertAppColorPickerPrimitiveContract(
  label: ReactNode | undefined,
  triggerAriaLabel: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appColorPickerControlSourcePath.length === 0 ||
    appColorPickerReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppColorPicker governance contract is incomplete.");
  }

  if (
    appColorPickerCompositionContract.requiresChildren &&
    appColorPickerCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppColorPicker composition contract is incomplete.");
  }

  if (label === undefined && triggerAriaLabel === undefined) {
    throw new Error("AppColorPicker requires label or triggerAriaLabel.");
  }
}

function DefaultColorPickerPanel({ size }: { size: AppColorPickerSize }) {
  return (
    <>
      <AppColorArea
        aria-label="Color saturation and brightness"
        colorSpace="hsb"
        xChannel="saturation"
        yChannel="brightness"
        size={size === "sm" ? "md" : "lg"}
      />
      <AppColorSlider
        label="Hue"
        colorSpace="hsb"
        channel="hue"
        size={size}
      />
      <AppColorField label="Hex" placeholder="Enter a color" size={size} />
    </>
  );
}

export function AppColorPicker({
  children,
  label,
  panelClassName,
  size = "md",
  triggerAriaLabel,
  triggerClassName,
  ...props
}: AppColorPickerProps) {
  assertAppColorPickerPrimitiveContract(label, triggerAriaLabel);

  return (
    <ReactAriaColorPicker {...props}>
      <DialogTrigger>
        <Button
          {...(triggerAriaLabel !== undefined
            ? { "aria-label": triggerAriaLabel }
            : {})}
          className={(renderProps) =>
            cn(
              appColorPickerTriggerVariants({
                size,
                disabled: renderProps.isDisabled,
              }),
              triggerClassName,
            )
          }
        >
          <span aria-hidden="true">
            <AppColorSwatch size={size} />
          </span>
          {label !== undefined ? <span>{label}</span> : null}
        </Button>
        <Popover placement="bottom start">
          <Dialog className={cn(appColorPickerPanelVariants(), panelClassName)}>
            {children ?? <DefaultColorPickerPanel size={size} />}
          </Dialog>
        </Popover>
      </DialogTrigger>
    </ReactAriaColorPicker>
  );
}
