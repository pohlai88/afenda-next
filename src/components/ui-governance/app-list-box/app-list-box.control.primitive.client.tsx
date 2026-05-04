/**
 * @afenda-owner app-list-box
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria List Box for governed shared UI
 */
"use client";

import {
  Header as ReactAriaHeader,
  ListBox as ReactAriaListBox,
  ListBoxItem as ReactAriaListBoxItem,
  ListBoxLoadMoreItem as ReactAriaListBoxLoadMoreItem,
  ListBoxSection as ReactAriaListBoxSection,
  Text as ReactAriaText,
  composeRenderProps,
  type ListBoxItemProps as ReactAriaListBoxItemProps,
  type ListBoxLoadMoreItemProps as ReactAriaListBoxLoadMoreItemProps,
  type ListBoxProps as ReactAriaListBoxProps,
  type ListBoxSectionProps as ReactAriaListBoxSectionProps,
  type TextProps as ReactAriaTextProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactElement, ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appListBoxCompositionContract,
  appListBoxControlSourcePath,
  appListBoxReactAriaPrimitives,
  type AppListBoxSize,
} from "@/components/ui-governance/app-list-box/app-list-box.contract.primitive.shared";

export const appListBoxVariants = cva(
  [
    "rac-focus-ring relative max-w-full overflow-auto rounded-(--radius-panel) border border-border bg-field outline-none",
    "text-foreground",
  ],
  {
    variants: {
      layout: {
        stack: "",
        grid: "",
      },
      orientation: {
        vertical: "",
        horizontal: "",
      },
      size: {
        md: "",
        sm: "",
      },
      empty: {
        true: "flex items-center justify-center italic text-foreground-muted",
        false: "",
      },
      dropTarget: {
        true: "bg-accent/10 ring-2 ring-accent ring-inset",
        false: "",
      },
    },
    compoundVariants: [
      {
        layout: "stack",
        orientation: "vertical",
        size: "md",
        className: "flex min-h-28 w-[16rem] flex-col gap-1.5 p-2",
      },
      {
        layout: "stack",
        orientation: "vertical",
        size: "sm",
        className: "flex min-h-24 w-[14rem] flex-col gap-1 p-1.5",
      },
      {
        layout: "stack",
        orientation: "horizontal",
        size: "md",
        className: "flex w-full flex-row flex-nowrap gap-1.5 p-2",
      },
      {
        layout: "stack",
        orientation: "horizontal",
        size: "sm",
        className: "flex w-full flex-row flex-nowrap gap-1 p-1.5",
      },
      {
        layout: "grid",
        orientation: "vertical",
        size: "md",
        className:
          "grid w-fit max-w-full auto-rows-min gap-1.5 p-2 [grid-template-columns:repeat(2,minmax(0,1fr))]",
      },
      {
        layout: "grid",
        orientation: "vertical",
        size: "sm",
        className:
          "grid w-fit max-w-full auto-rows-min gap-1 p-1.5 [grid-template-columns:repeat(2,minmax(0,1fr))]",
      },
      {
        layout: "grid",
        orientation: "horizontal",
        size: "md",
        className: "grid auto-flow-col auto-cols-[10rem] grid-rows-2 gap-1.5 p-2",
      },
      {
        layout: "grid",
        orientation: "horizontal",
        size: "sm",
        className: "grid auto-flow-col auto-cols-[9rem] grid-rows-2 gap-1 p-1.5",
      },
    ],
    defaultVariants: {
      layout: "stack",
      orientation: "vertical",
      size: "md",
      empty: false,
      dropTarget: false,
    },
  },
);

export const appListBoxItemVariants = cva(
  [
    "rac-focus-ring group relative min-w-0 rounded-(--radius-control) outline-none transition",
    "[[data-layout=stack]_&]:flex [[data-layout=stack]_&]:items-center [[data-layout=stack]_&]:gap-3",
    "[[data-layout=grid]_&]:flex [[data-layout=grid]_&]:flex-col [[data-layout=grid]_&]:justify-center [[data-layout=grid]_&]:gap-1.5",
    "[[data-layout=stack][data-orientation=horizontal]_&]:min-w-max [[data-layout=stack][data-orientation=horizontal]_&]:shrink-0",
  ],
  {
    variants: {
      size: {
        md: "px-3 py-2",
        sm: "px-2.5 py-1.5",
      },
      selected: {
        true: "bg-accent text-accent-foreground",
        false: "text-foreground hover:bg-field-hover",
      },
      focused: {
        true: "ring-2 ring-accent-ring ring-inset",
        false: "",
      },
      pressed: {
        true: "bg-field-strong",
        false: "",
      },
      disabled: {
        true: "text-foreground-muted opacity-60",
        false: "",
      },
      dropTarget: {
        true: "bg-accent/10 ring-2 ring-accent ring-inset",
        false: "",
      },
      href: {
        true: "cursor-pointer no-underline",
        false: "cursor-default",
      },
    },
    compoundVariants: [
      {
        selected: true,
        focused: true,
        className: "ring-accent-foreground/40",
      },
      {
        selected: true,
        pressed: true,
        className: "bg-accent-strong text-accent-foreground",
      },
    ],
    defaultVariants: {
      size: "md",
      selected: false,
      focused: false,
      pressed: false,
      disabled: false,
      dropTarget: false,
      href: false,
    },
  },
);

export const appListBoxSectionVariants = cva("flex flex-col", {
  variants: {
    size: {
      md: "gap-1.5",
      sm: "gap-1",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const appListBoxHeaderVariants = cva(
  "type-meta sticky top-0 z-10 rounded-(--radius-control) border border-border bg-field font-medium text-foreground-muted",
  {
    variants: {
      size: {
        md: "px-3 py-1.5",
        sm: "px-2.5 py-1",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const appListBoxTextVariants = cva("min-w-0", {
  variants: {
    description: {
      true: "type-meta text-current/80",
      false: "type-body-sm",
    },
  },
  defaultVariants: {
    description: false,
  },
});

export const appListBoxLoadMoreItemVariants = cva(
  "flex items-center justify-center text-foreground-muted",
  {
    variants: {
      size: {
        md: "py-2",
        sm: "py-1.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type AppListBoxLayout = NonNullable<ReactAriaListBoxProps<object>["layout"]>;
type AppListBoxOrientation = NonNullable<
  ReactAriaListBoxProps<object>["orientation"]
>;

export type AppListBoxProps<T extends object = object> = Omit<
  ReactAriaListBoxProps<T>,
  "children" | "className"
> & {
  children: ReactNode | ((item: T) => ReactNode);
  className?: ReactAriaListBoxProps<T>["className"];
  size?: AppListBoxSize;
};

export type AppListBoxItemProps<T extends object = object> = Omit<
  ReactAriaListBoxItemProps<T>,
  "children" | "className"
> & {
  children?: ReactNode | ReactAriaListBoxItemProps<T>["children"];
  className?: ReactAriaListBoxItemProps<T>["className"];
  size?: AppListBoxSize;
};

export type AppListBoxSectionProps<T extends object = object> = Omit<
  ReactAriaListBoxSectionProps<T>,
  "className" | "children"
> & {
  children: ReactNode | ((item: T) => ReactElement);
  className?: string;
  size?: AppListBoxSize;
};

export type AppListBoxHeaderProps = Omit<
  ComponentProps<typeof ReactAriaHeader>,
  "className"
> & {
  className?: string;
  size?: AppListBoxSize;
};

export type AppListBoxLoadMoreItemProps = Omit<
  ReactAriaListBoxLoadMoreItemProps,
  "children" | "className"
> & {
  children?: ReactNode;
  className?: string;
  size?: AppListBoxSize;
  spinnerLabel?: string;
};

export type AppListBoxTextProps = Omit<ReactAriaTextProps, "className"> & {
  className?: ReactAriaTextProps["className"];
};

function assertAppListBoxPrimitiveContract<T extends object>(
  children: ReactNode | ((item: T) => ReactNode),
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appListBoxControlSourcePath.length === 0 ||
    appListBoxReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppListBox governance contract is incomplete.");
  }

  if (
    appListBoxCompositionContract.requiresChildren &&
    appListBoxCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppListBox composition contract is incomplete.");
  }

  if (children === undefined || children === null) {
    throw new Error(
      "AppListBox requires explicit AppListBoxItem children or an item renderer.",
    );
  }

  if (ariaLabel === undefined && ariaLabelledBy === undefined) {
    throw new Error("AppListBox requires aria-label or aria-labelledby.");
  }
}

function DefaultLoadMoreSpinner({ label }: { label: string }) {
  return (
    <div role="status" aria-label={label} className="inline-flex items-center gap-2">
      <svg
        aria-hidden="true"
        className="size-4 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          className="opacity-25"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function ListBoxSelectionIndicator() {
  return (
    <span className="ml-auto inline-flex size-4 shrink-0 items-center justify-center text-current">
      <svg
        aria-hidden="true"
        className="size-3.5"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8.5L6.5 12L13 4.5" />
      </svg>
    </span>
  );
}

export function AppListBox<T extends object = object>({
  children,
  className,
  layout = "stack",
  orientation = "vertical",
  size = "md",
  ...props
}: AppListBoxProps<T>) {
  assertAppListBoxPrimitiveContract(
    children,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaListBox
      {...props}
      layout={layout}
      orientation={orientation}
      className={composeRenderProps(
        className,
        (resolvedClassName, renderProps) =>
          cn(
            appListBoxVariants({
              layout: layout as AppListBoxLayout,
              orientation: orientation as AppListBoxOrientation,
              size,
              empty: renderProps.isEmpty,
              dropTarget: renderProps.isDropTarget,
            }),
            resolvedClassName,
          ),
      )}
    >
      {children}
    </ReactAriaListBox>
  );
}

export function AppListBoxItem<T extends object = object>({
  children,
  className,
  size = "md",
  textValue,
  ...props
}: AppListBoxItemProps<T>) {
  const resolvedTextValue =
    textValue ?? (typeof children === "string" ? children : undefined);

  return (
    <ReactAriaListBoxItem
      {...props}
      {...(resolvedTextValue !== undefined ? { textValue: resolvedTextValue } : {})}
      className={composeRenderProps(
        className,
        (resolvedClassName, renderProps) =>
          cn(
            appListBoxItemVariants({
              size,
              selected: renderProps.isSelected,
              focused: renderProps.isFocused || renderProps.isFocusVisible,
              pressed: renderProps.isPressed,
              disabled: renderProps.isDisabled,
              dropTarget: renderProps.isDropTarget,
              href: props.href !== undefined,
            }),
            resolvedClassName,
          ),
      )}
    >
      {composeRenderProps(
        children as ReactNode,
        (resolvedChildren, renderProps) => (
          <>
            {typeof resolvedChildren === "string" ? (
              <AppListBoxText slot="label">{resolvedChildren}</AppListBoxText>
            ) : (
              resolvedChildren
            )}
            {renderProps.selectionMode !== "none" && renderProps.isSelected ? (
              <ListBoxSelectionIndicator />
            ) : null}
          </>
        ),
      )}
    </ReactAriaListBoxItem>
  );
}

export function AppListBoxSection<T extends object = object>({
  className,
  size = "md",
  ...props
}: AppListBoxSectionProps<T>) {
  return (
    <ReactAriaListBoxSection
      {...props}
      className={cn(appListBoxSectionVariants({ size }), className)}
    />
  );
}

export function AppListBoxHeader({
  className,
  size = "md",
  ...props
}: AppListBoxHeaderProps) {
  return (
    <ReactAriaHeader
      {...props}
      className={cn(appListBoxHeaderVariants({ size }), className)}
    />
  );
}

export function AppListBoxText({
  className,
  slot,
  ...props
}: AppListBoxTextProps) {
  return (
    <ReactAriaText
      {...props}
      slot={slot}
      className={cn(
        appListBoxTextVariants({ description: slot === "description" }),
        className,
      )}
    />
  );
}

export function AppListBoxLoadMoreItem({
  children,
  className,
  size = "md",
  spinnerLabel = "Loading more...",
  ...props
}: AppListBoxLoadMoreItemProps) {
  return (
    <ReactAriaListBoxLoadMoreItem
      {...props}
      className={cn(appListBoxLoadMoreItemVariants({ size }), className)}
    >
      {children ?? <DefaultLoadMoreSpinner label={spinnerLabel} />}
    </ReactAriaListBoxLoadMoreItem>
  );
}
