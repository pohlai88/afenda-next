/**
 * @afenda-owner app-grid-list
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Grid List for governed shared UI
 */
"use client";

import {
  Button as ReactAriaButton,
  Checkbox as ReactAriaCheckbox,
  GridList as ReactAriaGridList,
  GridListHeader as ReactAriaGridListHeader,
  GridListItem as ReactAriaGridListItem,
  GridListLoadMoreItem as ReactAriaGridListLoadMoreItem,
  GridListSection as ReactAriaGridListSection,
  Text as ReactAriaText,
  composeRenderProps,
  type GridListItemProps as ReactAriaGridListItemProps,
  type GridListLoadMoreItemProps as ReactAriaGridListLoadMoreItemProps,
  type GridListProps as ReactAriaGridListProps,
  type GridListSectionProps as ReactAriaGridListSectionProps,
  type TextProps as ReactAriaTextProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactElement, ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appGridListCompositionContract,
  appGridListControlSourcePath,
  appGridListReactAriaPrimitives,
  type AppGridListSize,
} from "@/components/ui-governance/app-grid-list/app-grid-list.contract.primitive.shared";

export const appGridListVariants = cva(
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
        className: "flex flex-col gap-2 p-2.5",
      },
      {
        layout: "stack",
        orientation: "vertical",
        size: "sm",
        className: "flex flex-col gap-1.5 p-2",
      },
      {
        layout: "stack",
        orientation: "horizontal",
        size: "md",
        className: "flex flex-row flex-nowrap gap-2.5 p-2.5",
      },
      {
        layout: "stack",
        orientation: "horizontal",
        size: "sm",
        className: "flex flex-row flex-nowrap gap-2 p-2",
      },
      {
        layout: "grid",
        orientation: "vertical",
        size: "md",
        className:
          "grid auto-rows-min gap-3 p-3 [grid-template-columns:repeat(auto-fit,minmax(12rem,1fr))]",
      },
      {
        layout: "grid",
        orientation: "vertical",
        size: "sm",
        className:
          "grid auto-rows-min gap-2 p-2 [grid-template-columns:repeat(auto-fit,minmax(10rem,1fr))]",
      },
      {
        layout: "grid",
        orientation: "horizontal",
        size: "md",
        className: "grid auto-flow-col auto-cols-[12rem] grid-rows-2 gap-3 p-3",
      },
      {
        layout: "grid",
        orientation: "horizontal",
        size: "sm",
        className: "grid auto-flow-col auto-cols-[10rem] grid-rows-2 gap-2 p-2",
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

export const appGridListItemVariants = cva(
  [
    "rac-focus-ring group relative min-w-0 overflow-hidden rounded-(--radius-control) border border-border bg-surface-raised text-foreground outline-none transition",
    "[[data-layout=grid]_&]:flex [[data-layout=grid]_&]:flex-col [[data-layout=grid]_&]:gap-2",
    "[[data-layout=stack]_&]:grid [[data-layout=stack]_&]:grid-cols-[auto_minmax(0,1fr)_auto] [[data-layout=stack]_&]:items-start [[data-layout=stack]_&]:gap-x-3 [[data-layout=stack]_&]:gap-y-1",
    "[[data-layout=stack][data-orientation=horizontal]_&]:min-w-[16rem] [[data-layout=stack][data-orientation=horizontal]_&]:shrink-0",
  ],
  {
    variants: {
      size: {
        md: "p-3",
        sm: "p-2.5",
      },
      selected: {
        true: "border-accent bg-accent/10",
        false: "hover:bg-field-hover",
      },
      disabled: {
        true: "text-foreground-muted opacity-60",
        false: "",
      },
      dropTarget: {
        true: "ring-2 ring-accent ring-inset",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      selected: false,
      disabled: false,
      dropTarget: false,
    },
  },
);

export const appGridListSectionVariants = cva("flex flex-col", {
  variants: {
    size: {
      md: "gap-3",
      sm: "gap-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const appGridListHeaderVariants = cva(
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

export const appGridListTextVariants = cva("min-w-0", {
  variants: {
    description: {
      true: "type-meta text-foreground-muted",
      false: "type-label text-foreground",
    },
  },
  defaultVariants: {
    description: false,
  },
});

export const appGridListLoadMoreItemVariants = cva(
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

type AppGridListLayout = NonNullable<ReactAriaGridListProps<object>["layout"]>;
type AppGridListOrientation = NonNullable<
  ReactAriaGridListProps<object>["orientation"]
>;

export type AppGridListProps<T extends object = object> = Omit<
  ReactAriaGridListProps<T>,
  "children" | "className"
> & {
  children: ReactNode | ((item: T) => ReactNode);
  className?: ReactAriaGridListProps<T>["className"];
  size?: AppGridListSize;
};

export type AppGridListItemProps<T extends object = object> = Omit<
  ReactAriaGridListItemProps<T>,
  "children" | "className"
> & {
  children?: ReactNode | ReactAriaGridListItemProps<T>["children"];
  className?: ReactAriaGridListItemProps<T>["className"];
  size?: AppGridListSize;
};

export type AppGridListSectionProps<T extends object = object> = Omit<
  ReactAriaGridListSectionProps<T>,
  "className"
> & {
  className?: string;
  size?: AppGridListSize;
};

export type AppGridListHeaderProps = Omit<
  ComponentProps<typeof ReactAriaGridListHeader>,
  "className"
> & {
  className?: string;
  size?: AppGridListSize;
};

export type AppGridListLoadMoreItemProps = Omit<
  ReactAriaGridListLoadMoreItemProps,
  "children" | "className"
> & {
  children?: ReactNode;
  className?: string;
  size?: AppGridListSize;
  spinnerLabel?: string;
};

export type AppGridListTextProps = Omit<ReactAriaTextProps, "className"> & {
  className?: ReactAriaTextProps["className"];
};

function assertAppGridListPrimitiveContract<T extends object>(
  children: ReactNode | ((item: T) => ReactNode),
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appGridListControlSourcePath.length === 0 ||
    appGridListReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppGridList governance contract is incomplete.");
  }

  if (
    appGridListCompositionContract.requiresChildren &&
    appGridListCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppGridList composition contract is incomplete.");
  }

  if (children === undefined || children === null) {
    throw new Error(
      "AppGridList requires explicit AppGridListItem children or an item renderer.",
    );
  }

  if (ariaLabel === undefined && ariaLabelledBy === undefined) {
    throw new Error("AppGridList requires aria-label or aria-labelledby.");
  }
}

function GridListDragHandle() {
  return (
    <ReactAriaButton
      slot="drag"
      className="rac-focus-ring [[data-layout=grid]_&]:absolute [[data-layout=grid]_&]:right-2 [[data-layout=grid]_&]:bottom-2 inline-flex size-8 items-center justify-center rounded-(--radius-control) text-foreground-muted outline-none transition hover:bg-field-hover hover:text-foreground"
    >
      <svg
        aria-hidden="true"
        className="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M10 5h4" />
        <path d="M10 12h4" />
        <path d="M10 19h4" />
      </svg>
    </ReactAriaButton>
  );
}

function GridListSelectionCheckbox() {
  return (
    <ReactAriaCheckbox
      slot="selection"
      aria-label="Select item"
      className="rac-focus-ring [[data-layout=grid]_&]:absolute [[data-layout=grid]_&]:top-2.5 [[data-layout=grid]_&]:left-2.5 inline-flex items-center justify-center rounded-(--radius-control) outline-none"
    >
      <span className="inline-flex size-4 items-center justify-center rounded-[calc(var(--radius-control)-0.25rem)] border border-border-strong bg-field text-transparent transition group-hover:border-accent group-data-[selected]:border-accent group-data-[selected]:bg-accent group-data-[selected]:text-accent-foreground">
        <svg
          aria-hidden="true"
          className="size-3"
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
    </ReactAriaCheckbox>
  );
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

export function AppGridList<T extends object = object>({
  children,
  className,
  layout = "stack",
  orientation = "vertical",
  size = "md",
  ...props
}: AppGridListProps<T>) {
  assertAppGridListPrimitiveContract(
    children,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaGridList
      {...props}
      layout={layout}
      orientation={orientation}
      className={composeRenderProps(
        className,
        (resolvedClassName, renderProps) =>
          cn(
            appGridListVariants({
              layout: layout as AppGridListLayout,
              orientation: orientation as AppGridListOrientation,
              size,
              empty: renderProps.isEmpty,
              dropTarget: renderProps.isDropTarget,
            }),
            resolvedClassName,
          ),
      )}
    >
      {children}
    </ReactAriaGridList>
  );
}

export function AppGridListItem<T extends object = object>({
  children,
  className,
  size = "md",
  textValue,
  ...props
}: AppGridListItemProps<T>) {
  const resolvedTextValue =
    textValue ?? (typeof children === "string" ? children : undefined);

  return (
    <ReactAriaGridListItem
      {...props}
      {...(resolvedTextValue !== undefined ? { textValue: resolvedTextValue } : {})}
      className={composeRenderProps(
        className,
        (resolvedClassName, renderProps) =>
          cn(
            appGridListItemVariants({
              size,
              selected: renderProps.isSelected,
              disabled: renderProps.isDisabled,
              dropTarget: renderProps.isDropTarget,
            }),
            resolvedClassName,
          ),
      )}
    >
      {composeRenderProps(
        children as ReactNode,
        (resolvedChildren, renderProps) => (
          <>
            {renderProps.allowsDragging ? <GridListDragHandle /> : null}
            {renderProps.selectionMode === "multiple" &&
            renderProps.selectionBehavior === "toggle" ? (
              <GridListSelectionCheckbox />
            ) : null}
            {resolvedChildren}
          </>
        ),
      )}
    </ReactAriaGridListItem>
  );
}

export function AppGridListSection<T extends object = object>({
  className,
  size = "md",
  ...props
}: AppGridListSectionProps<T>) {
  return (
    <ReactAriaGridListSection
      {...props}
      className={cn(appGridListSectionVariants({ size }), className)}
    />
  );
}

export function AppGridListHeader({
  className,
  size = "md",
  ...props
}: AppGridListHeaderProps) {
  return (
    <ReactAriaGridListHeader
      {...props}
      className={cn(appGridListHeaderVariants({ size }), className)}
    />
  );
}

export function AppGridListText({
  className,
  slot,
  ...props
}: AppGridListTextProps) {
  return (
    <ReactAriaText
      {...props}
      slot={slot}
      className={cn(
        appGridListTextVariants({ description: slot === "description" }),
        className,
      )}
    />
  );
}

export function AppGridListLoadMoreItem({
  children,
  className,
  size = "md",
  spinnerLabel = "Loading more...",
  ...props
}: AppGridListLoadMoreItemProps) {
  return (
    <ReactAriaGridListLoadMoreItem
      {...props}
      className={cn(appGridListLoadMoreItemVariants({ size }), className)}
    >
      {children ?? <DefaultLoadMoreSpinner label={spinnerLabel} />}
    </ReactAriaGridListLoadMoreItem>
  );
}
