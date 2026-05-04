/**
 * @afenda-owner app-color-swatch-picker
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Color Swatch Picker for governed shared UI
 */
"use client";

import {
  ColorSwatchPicker as ReactAriaColorSwatchPicker,
  ColorSwatchPickerItem as ReactAriaColorSwatchPickerItem,
  getColorChannels,
  parseColor,
  type Color,
  type ColorChannel,
  type ColorSpace,
  type ColorSwatchPickerItemProps as ReactAriaColorSwatchPickerItemProps,
  type ColorSwatchPickerProps as ReactAriaColorSwatchPickerProps,
  type ColorSwatchPickerRenderProps,
} from "react-aria-components";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";
import { AppColorSwatch } from "@/components/ui-governance/app-color-swatch/app-color-swatch.control.primitive.client";
import {
  appColorSwatchPickerCompositionContract,
  appColorSwatchPickerControlSourcePath,
  appColorSwatchPickerReactAriaPrimitives,
  type AppColorSwatchPickerItemSize,
} from "@/components/ui-governance/app-color-swatch-picker/app-color-swatch-picker.contract.primitive.shared";
import {
  assertHasDirectChildOfType,
  getDirectElementChildren,
} from "@/components/ui-governance/governance.ui.react-aria-runtime.shared";

export const appColorSwatchPickerVariants = cva("flex gap-2", {
  variants: {
    layout: {
      grid: "flex-wrap items-start",
      stack: "flex-col",
    },
  },
  defaultVariants: {
    layout: "grid",
  },
});

export const appColorSwatchPickerItemVariants = cva(
  "rac-focus-ring relative w-fit outline-none forced-color-adjust-none [-webkit-tap-highlight-color:transparent]",
  {
    variants: {
      size: {
        sm: "rounded-[calc(var(--radius-control)-0.25rem)]",
        md: "rounded-[calc(var(--radius-control)-0.25rem)]",
        lg: "rounded-full",
      },
      disabled: {
        true: "opacity-20",
        false: "",
      },
    },
    defaultVariants: {
      size: "lg",
      disabled: false,
    },
  },
);

export const appColorSwatchPickerIndicatorVariants = cva(
  "pointer-events-none absolute inset-0 rounded-[inherit] border-2 border-foreground ring-2 ring-surface-raised ring-inset forced-color-adjust-none",
  {
    variants: {
      selected: {
        true: "",
        false: "hidden",
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

export { getColorChannels, parseColor };
export type AppColor = Color;
export type AppColorChannel = ColorChannel;
export type AppColorSpace = ColorSpace;

type AppColorSwatchPickerBehaviorProps = Partial<
  Omit<ReactAriaColorSwatchPickerProps, "children" | "className">
>;

type AppColorSwatchPickerLayout = NonNullable<
  ReactAriaColorSwatchPickerProps["layout"]
>;

export type AppColorSwatchPickerProps = AppColorSwatchPickerBehaviorProps & {
  children: ReactNode;
  className?: ReactAriaColorSwatchPickerProps["className"];
};

type AppColorSwatchPickerItemBehaviorProps = Partial<
  Omit<
    ReactAriaColorSwatchPickerItemProps,
    "children" | "className" | "color"
  >
>;

export type AppColorSwatchPickerItemProps =
  AppColorSwatchPickerItemBehaviorProps & {
    className?: ReactAriaColorSwatchPickerItemProps["className"];
    color: NonNullable<ReactAriaColorSwatchPickerItemProps["color"]>;
    colorName?: string;
    size?: AppColorSwatchPickerItemSize;
  };

function normalizeColorValue(color: string | Color): string {
  if (typeof color === "string") {
    return parseColor(color).toString("hex").toLowerCase();
  }

  return color.toString("hex").toLowerCase();
}

function assertUniqueDirectChildColors(children: ReactNode): void {
  const seenColors = new Set<string>();

  for (const child of getDirectElementChildren(children)) {
    if (child.type !== AppColorSwatchPickerItem) {
      continue;
    }

    const color = (child.props as AppColorSwatchPickerItemProps).color;
    const normalized = normalizeColorValue(color);

    if (seenColors.has(normalized)) {
      throw new Error(
        "AppColorSwatchPicker requires unique colors across direct AppColorSwatchPickerItem children.",
      );
    }

    seenColors.add(normalized);
  }
}

function assertAppColorSwatchPickerPrimitiveContract(
  children: ReactNode,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appColorSwatchPickerControlSourcePath.length === 0 ||
    appColorSwatchPickerReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppColorSwatchPicker governance contract is incomplete.");
  }

  if (
    appColorSwatchPickerCompositionContract.requiresChildren &&
    appColorSwatchPickerCompositionContract.requiredElements.at(0) ===
      undefined
  ) {
    throw new Error("AppColorSwatchPicker composition contract is incomplete.");
  }

  if (children === undefined || children === null) {
    throw new Error(
      "AppColorSwatchPicker requires explicit AppColorSwatchPickerItem children.",
    );
  }

  assertHasDirectChildOfType(
    "AppColorSwatchPicker",
    children,
    AppColorSwatchPickerItem,
    "AppColorSwatchPickerItem",
  );

  const invalidDirectChild = getDirectElementChildren(children).find(
    (child) => child.type !== AppColorSwatchPickerItem,
  );

  if (invalidDirectChild) {
    throw new Error(
      "AppColorSwatchPicker direct children must be AppColorSwatchPickerItem.",
    );
  }

  if (ariaLabel === undefined && ariaLabelledBy === undefined) {
    throw new Error(
      "AppColorSwatchPicker requires aria-label or aria-labelledby.",
    );
  }

  assertUniqueDirectChildColors(children);
}

function assertAppColorSwatchPickerItemContract(
  color: AppColorSwatchPickerItemProps["color"],
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (color === undefined) {
    throw new Error("AppColorSwatchPickerItem requires an explicit color.");
  }
}

export function AppColorSwatchPicker({
  children,
  className,
  layout = "grid",
  ...props
}: AppColorSwatchPickerProps) {
  assertAppColorSwatchPickerPrimitiveContract(
    children,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaColorSwatchPicker
      {...props}
      layout={layout}
      className={composeRenderProps(
        className,
        (resolvedClassName) =>
          cn(appColorSwatchPickerVariants({ layout }), resolvedClassName),
      )}
    >
      {children}
    </ReactAriaColorSwatchPicker>
  );
}

export function AppColorSwatchPickerItem({
  color,
  colorName,
  size = "lg",
  ...props
}: AppColorSwatchPickerItemProps) {
  assertAppColorSwatchPickerItemContract(color);

  return (
    <ReactAriaColorSwatchPickerItem
      {...props}
      color={color}
      className={composeRenderProps(
        props.className,
        (resolvedClassName, renderProps) =>
          cn(
            appColorSwatchPickerItemVariants({
              size,
              disabled: renderProps.isDisabled,
            }),
            resolvedClassName,
          ),
      )}
    >
      {({ isSelected }) => (
        <>
          <AppColorSwatch
            {...(colorName !== undefined ? { colorName } : {})}
            size={size}
          />
          <div
            aria-hidden="true"
            data-slot="selection-indicator"
            className={appColorSwatchPickerIndicatorVariants({
              selected: isSelected,
            })}
          />
        </>
      )}
    </ReactAriaColorSwatchPickerItem>
  );
}
