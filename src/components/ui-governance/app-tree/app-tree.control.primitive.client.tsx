/**
 * @afenda-owner app-tree
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Tree for governed shared UI
 */
"use client";

import {
  Button as ReactAriaButton,
  Checkbox as ReactAriaCheckbox,
  SelectionIndicator as ReactAriaSelectionIndicator,
  Tree as ReactAriaTree,
  TreeHeader as ReactAriaTreeHeader,
  TreeItem as ReactAriaTreeItem,
  TreeItemContent as ReactAriaTreeItemContent,
  TreeLoadMoreItem as ReactAriaTreeLoadMoreItem,
  TreeSection as ReactAriaTreeSection,
  composeRenderProps,
  type TreeItemContentProps as ReactAriaTreeItemContentProps,
  type TreeItemProps as ReactAriaTreeItemProps,
  type TreeLoadMoreItemProps as ReactAriaTreeLoadMoreItemProps,
  type TreeProps as ReactAriaTreeProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  assertHasOneOfDirectChildTypes,
  getDirectElementChildren,
  hasDirectChildOfType,
} from "@/components/ui-governance/governance.ui.react-aria-runtime.shared";
import {
  type AppTreeSize,
  appTreeCompositionContract,
  appTreeControlSourcePath,
  appTreeReactAriaPrimitives,
} from "@/components/ui-governance/app-tree/app-tree.contract.primitive.shared";

export const appTreeVariants = cva(
  [
    "rac-focus-ring flex flex-col overflow-auto rounded-(--radius-panel) border border-border bg-surface-raised text-foreground outline-none",
    "[-webkit-tap-highlight-color:transparent]",
  ],
  {
    variants: {
      size: {
        md: "min-h-28 w-64 p-1.5",
        sm: "min-h-24 w-56 p-1",
      },
      empty: {
        true: "items-center justify-center italic text-foreground-muted",
        false: "",
      },
      focused: {
        true: "ring-2 ring-accent-ring ring-inset",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      empty: false,
      focused: false,
    },
  },
);

export const appTreeSectionVariants = cva("flex flex-col", {
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

export const appTreeHeaderVariants = cva(
  "type-label px-2 text-foreground-muted",
  {
    variants: {
      size: {
        md: "pb-1",
        sm: "pb-0.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const appTreeItemVariants = cva(
  [
    "group/tree-item relative rounded-(--radius-control) outline-none transition",
    "data-[href]:cursor-pointer",
  ],
  {
    variants: {
      size: {
        md: "",
        sm: "",
      },
      selected: {
        true: "bg-accent/10 text-foreground",
        false: "text-foreground hover:bg-field/60",
      },
      pressed: {
        true: "bg-field-hover",
        false: "",
      },
      disabled: {
        true: "text-foreground-muted opacity-60",
        false: "",
      },
      focusVisible: {
        true: "ring-2 ring-accent-ring ring-inset",
        false: "",
      },
      dragging: {
        true: "opacity-60",
        false: "",
      },
      dropTarget: {
        true: "bg-accent/10 ring-2 ring-accent ring-inset",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      selected: false,
      pressed: false,
      disabled: false,
      focusVisible: false,
      dragging: false,
      dropTarget: false,
    },
  },
);

export const appTreeItemContentVariants = cva(
  "flex min-w-0 items-center gap-2",
  {
    variants: {
      size: {
        md: "min-h-8 px-2 py-1.5",
        sm: "min-h-7 px-2 py-1",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const appTreeChevronButtonVariants = cva(
  "rac-focus-ring inline-flex shrink-0 items-center justify-center rounded-(--radius-control) text-foreground-muted outline-none transition hover:bg-field-hover hover:text-foreground",
  {
    variants: {
      size: {
        md: "size-6",
        sm: "size-5",
      },
      visible: {
        true: "",
        false: "invisible",
      },
    },
    defaultVariants: {
      size: "md",
      visible: true,
    },
  },
);

export const appTreeChevronIconVariants = cva("transition", {
  variants: {
    expanded: {
      true: "rotate-90",
      false: "rotate-0",
    },
    disabled: {
      true: "opacity-50",
      false: "",
    },
  },
  defaultVariants: {
    expanded: false,
    disabled: false,
  },
});

export const appTreeDragButtonVariants = cva(
  "rac-focus-ring inline-flex shrink-0 items-center justify-center rounded-(--radius-control) text-foreground-muted outline-none transition hover:bg-field-hover hover:text-foreground",
  {
    variants: {
      size: {
        md: "size-6",
        sm: "size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const appTreeSelectionIndicatorVariants = cva(
  "inline-flex shrink-0 items-center justify-center text-current",
  {
    variants: {
      size: {
        md: "size-4",
        sm: "size-3.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const appTreeLoadMoreItemVariants = cva(
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

type AppTreeBehaviorProps<T extends object> = Partial<
  Pick<
    ReactAriaTreeProps<T>,
    | "aria-describedby"
    | "aria-details"
    | "aria-label"
    | "aria-labelledby"
    | "autoFocus"
    | "defaultExpandedKeys"
    | "defaultSelectedKeys"
    | "dependencies"
    | "disabledBehavior"
    | "disabledKeys"
    | "disallowEmptySelection"
    | "dragAndDropHooks"
    | "escapeKeyBehavior"
    | "expandedKeys"
    | "id"
    | "items"
    | "onAction"
    | "onExpandedChange"
    | "onSelectionChange"
    | "render"
    | "renderEmptyState"
    | "selectedKeys"
    | "selectionBehavior"
    | "selectionMode"
    | "shouldSelectOnPressUp"
    | "slot"
    | "style"
  >
>;

export type AppTreeProps<T extends object = object> = AppTreeBehaviorProps<T> & {
  children: ReactNode | ((item: T) => ReactNode);
  className?: ReactAriaTreeProps<T>["className"];
  size?: AppTreeSize;
};

export type AppTreeItemContentProps = Omit<ReactAriaTreeItemContentProps, "children"> & {
  children?: ReactNode;
  size?: AppTreeSize;
};

export type AppTreeItemProps<T extends object = object> = Omit<
  ReactAriaTreeItemProps<T>,
  "children" | "className" | "textValue"
> & {
  children?: ReactNode;
  className?: ReactAriaTreeItemProps<T>["className"];
  size?: AppTreeSize;
  textValue?: string;
  title: ReactNode;
};

export type AppTreeLoadMoreItemProps = Omit<
  ReactAriaTreeLoadMoreItemProps,
  "children" | "className"
> & {
  children?: ReactNode;
  className?: ReactAriaTreeLoadMoreItemProps["className"];
  size?: AppTreeSize;
  spinnerLabel?: string;
};

export type AppTreeSectionProps<T extends object = object> = Omit<
  ComponentProps<typeof ReactAriaTreeSection<T>>,
  "className"
> & {
  className?: string;
  size?: AppTreeSize;
};

export type AppTreeHeaderProps = Omit<
  ComponentProps<typeof ReactAriaTreeHeader>,
  "className"
> & {
  className?: string;
  size?: AppTreeSize;
};

function assertAppTreePrimitiveContract<T extends object>(
  children: ReactNode | ((item: T) => ReactNode),
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appTreeControlSourcePath.length === 0 ||
    appTreeReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppTree governance contract is incomplete.");
  }

  if (
    appTreeCompositionContract.requiresChildren &&
    appTreeCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppTree composition contract is incomplete.");
  }

  if (ariaLabel === undefined && ariaLabelledBy === undefined) {
    throw new Error("AppTree requires aria-label or aria-labelledby.");
  }

  if (typeof children === "function") {
    return;
  }

  const directChildren = getDirectElementChildren(children);
  if (directChildren.length === 0) {
    return;
  }

  assertHasOneOfDirectChildTypes(
    "AppTree",
    children,
    [AppTreeItem, AppTreeSection],
    ["AppTreeItem", "AppTreeSection"],
  );
}

function assertAppTreeItemPrimitiveContract(
  title: ReactNode,
  textValue: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (title === undefined || title === null) {
    throw new Error("AppTreeItem requires title.");
  }

  if (typeof title !== "string" && textValue === undefined) {
    throw new Error("AppTreeItem requires textValue when title is not plain text.");
  }
}

function assertAppTreeSectionPrimitiveContract<T extends object>(
  children: ReactNode | ((item: T) => ReactNode),
  ariaLabel: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (children === undefined || children === null) {
    throw new Error("AppTreeSection requires children.");
  }

  if (typeof children === "function") {
    return;
  }

  const hasHeader = hasDirectChildOfType(children, AppTreeHeader);
  if (!hasHeader && ariaLabel === undefined) {
    throw new Error("AppTreeSection requires AppTreeHeader as a direct child or aria-label.");
  }
}

function SelectionCheckbox({ ariaLabel }: { ariaLabel: string }) {
  return (
    <ReactAriaCheckbox
      slot="selection"
      aria-label={ariaLabel}
      className="rac-focus-ring inline-flex items-center justify-center rounded-[calc(var(--radius-control)-0.25rem)] outline-none"
    >
      {({ isDisabled, isIndeterminate, isSelected }) => {
        const checked = isIndeterminate || isSelected;

        return (
          <span
            aria-hidden="true"
            className={cn(
              "inline-flex size-4 items-center justify-center rounded-[calc(var(--radius-control)-0.35rem)] border transition",
              checked
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border-strong bg-field text-transparent",
              isDisabled ? "opacity-60" : "",
            )}
          >
            {isIndeterminate ? (
              <svg
                className="size-3"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M3 8H13" />
              </svg>
            ) : (
              <svg
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
            )}
          </span>
        );
      }}
    </ReactAriaCheckbox>
  );
}

function SelectionMark({ size }: { size: AppTreeSize }) {
  return (
    <span
      aria-hidden="true"
      className={appTreeSelectionIndicatorVariants({ size })}
      data-app-tree-selection-indicator=""
    >
      <ReactAriaSelectionIndicator>
        <svg
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
      </ReactAriaSelectionIndicator>
    </span>
  );
}

function ChevronIcon({
  expanded,
  disabled,
}: {
  expanded: boolean;
  disabled: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      className={cn(appTreeChevronIconVariants({ expanded, disabled }), "size-4")}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 4 4 4-4 4" />
    </svg>
  );
}

function DragHandleIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <circle cx="5" cy="4" r="1.1" />
      <circle cx="11" cy="4" r="1.1" />
      <circle cx="5" cy="8" r="1.1" />
      <circle cx="11" cy="8" r="1.1" />
      <circle cx="5" cy="12" r="1.1" />
      <circle cx="11" cy="12" r="1.1" />
    </svg>
  );
}

function SpinnerIcon({ label }: { label: string }) {
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

export function AppTree<T extends object = object>({
  children,
  className,
  size = "md",
  ...props
}: AppTreeProps<T>) {
  assertAppTreePrimitiveContract(
    children,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaTree
      {...props}
      className={composeRenderProps(
        className,
        (resolvedClassName, renderProps) =>
          cn(
            appTreeVariants({
              size,
              empty: renderProps.isEmpty,
              focused: renderProps.isFocused,
            }),
            resolvedClassName,
          ),
      )}
    >
      {children}
    </ReactAriaTree>
  );
}

export function AppTreeItemContent({
  children,
  size = "md",
}: AppTreeItemContentProps) {
  return (
    <ReactAriaTreeItemContent>
      {(renderProps) => (
        <div className={appTreeItemContentVariants({ size })}>
          {renderProps.allowsDragging ? (
            <ReactAriaButton
              slot="drag"
              className={appTreeDragButtonVariants({ size })}
            >
              <DragHandleIcon />
            </ReactAriaButton>
          ) : null}
          {renderProps.selectionMode !== "none" &&
          renderProps.selectionBehavior === "toggle" ? (
            <SelectionCheckbox ariaLabel="Select tree item" />
          ) : renderProps.selectionMode !== "none" ? (
            <SelectionMark size={size} />
          ) : null}
          <div
            aria-hidden="true"
            className="shrink-0"
            style={{
              width: `${Math.max(renderProps.level - 1, 0) * 16}px`,
            }}
          />
          <ReactAriaButton
            slot="chevron"
            className={appTreeChevronButtonVariants({
              size,
              visible: renderProps.hasChildItems,
            })}
          >
            <ChevronIcon
              expanded={renderProps.isExpanded}
              disabled={renderProps.isDisabled}
            />
          </ReactAriaButton>
          <div className="min-w-0 flex-1 truncate">{children}</div>
        </div>
      )}
    </ReactAriaTreeItemContent>
  );
}

export function AppTreeItem<T extends object = object>({
  children,
  className,
  size = "md",
  textValue,
  title,
  ...props
}: AppTreeItemProps<T>) {
  const resolvedTextValue =
    textValue ?? (typeof title === "string" ? title : undefined);

  assertAppTreeItemPrimitiveContract(title, resolvedTextValue);

  return (
    <ReactAriaTreeItem
      {...props}
      textValue={resolvedTextValue!}
      className={composeRenderProps(
        className,
        (resolvedClassName, renderProps) =>
          cn(
            appTreeItemVariants({
              size,
              selected: renderProps.isSelected,
              pressed: renderProps.isPressed,
              disabled: renderProps.isDisabled,
              focusVisible: renderProps.isFocusVisible || renderProps.isFocusVisibleWithin,
              dragging: renderProps.isDragging,
              dropTarget: renderProps.isDropTarget,
            }),
            resolvedClassName,
          ),
      )}
    >
      <AppTreeItemContent size={size}>{title}</AppTreeItemContent>
      {children}
    </ReactAriaTreeItem>
  );
}

export function AppTreeLoadMoreItem({
  children,
  className,
  size = "md",
  spinnerLabel = "Loading more items...",
  ...props
}: AppTreeLoadMoreItemProps) {
  return (
    <ReactAriaTreeLoadMoreItem
      {...props}
      className={composeRenderProps(
        className,
        (resolvedClassName) =>
          cn(appTreeLoadMoreItemVariants({ size }), resolvedClassName),
      )}
    >
      {children ?? <SpinnerIcon label={spinnerLabel} />}
    </ReactAriaTreeLoadMoreItem>
  );
}

export function AppTreeSection<T extends object = object>({
  children,
  className,
  size = "md",
  ...props
}: AppTreeSectionProps<T>) {
  assertAppTreeSectionPrimitiveContract(children, props["aria-label"]);

  return (
    <ReactAriaTreeSection
      {...props}
      className={cn(appTreeSectionVariants({ size }), className)}
    >
      {children}
    </ReactAriaTreeSection>
  );
}

export function AppTreeHeader({
  className,
  size = "md",
  ...props
}: AppTreeHeaderProps) {
  return (
    <ReactAriaTreeHeader
      {...props}
      className={cn(appTreeHeaderVariants({ size }), className)}
    />
  );
}
