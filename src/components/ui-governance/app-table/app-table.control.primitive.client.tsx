/**
 * @afenda-owner app-table
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Table for governed shared UI
 */
"use client";

import {
  Button as ReactAriaButton,
  Cell as ReactAriaCell,
  Checkbox as ReactAriaCheckbox,
  Collection,
  Column as ReactAriaColumn,
  ColumnResizer as ReactAriaColumnResizer,
  Group,
  ResizableTableContainer as ReactAriaResizableTableContainer,
  Row as ReactAriaRow,
  Table as ReactAriaTable,
  TableBody as ReactAriaTableBody,
  TableHeader as ReactAriaTableHeader,
  TableLoadMoreItem as ReactAriaTableLoadMoreItem,
  composeRenderProps,
  type CellProps as ReactAriaCellProps,
  type ColumnProps as ReactAriaColumnProps,
  type ColumnResizerProps as ReactAriaColumnResizerProps,
  type RowProps as ReactAriaRowProps,
  type TableBodyProps as ReactAriaTableBodyProps,
  type TableHeaderProps as ReactAriaTableHeaderProps,
  type TableLoadMoreItemProps as ReactAriaTableLoadMoreItemProps,
  type TableProps as ReactAriaTableProps,
  useTableOptions,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import {
  createContext,
  useContext,
  type ComponentProps,
  type ReactNode,
} from "react";

import { cn } from "@/components/cn";
import {
  assertHasDirectChildOfType,
} from "@/components/ui-governance/governance.ui.react-aria-runtime.shared";
import {
  type AppTableSize,
  appTableCompositionContract,
  appTableControlSourcePath,
  appTableReactAriaPrimitives,
} from "@/components/ui-governance/app-table/app-table.contract.primitive.shared";

export const appTableContainerVariants = cva(
  "relative max-w-full overflow-auto rounded-(--radius-panel)",
);

export const appTableVariants = cva(
  [
    "rac-focus-ring w-full border-separate border-spacing-0 rounded-(--radius-panel) border border-border bg-surface-raised text-foreground outline-none",
    "[-webkit-tap-highlight-color:transparent]",
  ],
  {
    variants: {
      size: {
        md: "text-[var(--text-body-sm)] leading-[var(--text-body-sm--line-height)]",
        sm: "text-[0.8125rem] leading-5",
      },
      dropTarget: {
        true: "ring-2 ring-inset ring-accent bg-accent/10",
        false: "",
      },
      focusVisible: {
        true: "ring-2 ring-inset ring-accent-ring",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      dropTarget: false,
      focusVisible: false,
    },
  },
);

export const appTableHeaderVariants = cva("bg-surface-raised text-foreground-muted");

export const appTableColumnVariants = cva(
  [
    "sticky top-0 z-10 border-b border-border bg-surface-raised text-start font-medium outline-none",
    "last:border-r-0",
  ],
  {
    variants: {
      size: {
        md: "px-3 py-2",
        sm: "px-2.5 py-1.5",
      },
      sortable: {
        true: "cursor-default",
        false: "cursor-default",
      },
      sorted: {
        true: "text-foreground",
        false: "",
      },
      pressed: {
        true: "bg-field-hover",
        false: "",
      },
      focusVisible: {
        true: "ring-2 ring-inset ring-accent-ring",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      sortable: false,
      sorted: false,
      pressed: false,
      focusVisible: false,
    },
  },
);

export const appTableBodyVariants = cva("", {
  variants: {
    empty: {
      true: "italic text-foreground-muted",
      false: "",
    },
  },
  defaultVariants: {
    empty: false,
  },
});

export const appTableRowVariants = cva("group/table-row outline-none transition-colors", {
  variants: {
    selected: {
      true: "bg-accent/10",
      false: "odd:bg-surface-raised even:bg-field/35 hover:bg-field-hover",
    },
    pressed: {
      true: "bg-field-hover",
      false: "",
    },
    disabled: {
      true: "text-foreground-muted opacity-60",
      false: "",
    },
    dropTarget: {
      true: "ring-2 ring-inset ring-accent bg-accent/10",
      false: "",
    },
    focusVisible: {
      true: "ring-2 ring-inset ring-accent-ring",
      false: "",
    },
    href: {
      true: "cursor-pointer",
      false: "cursor-default",
    },
  },
  compoundVariants: [
    {
      selected: true,
      pressed: true,
      className: "bg-accent/15",
    },
  ],
  defaultVariants: {
    selected: false,
    pressed: false,
    disabled: false,
    dropTarget: false,
    focusVisible: false,
    href: false,
  },
});

export const appTableCellVariants = cva(
  [
    "min-w-0 border-b border-border align-middle text-foreground outline-none",
    "group-last/table-row:border-b-0 group-data-[selected]/table-row:border-accent/20",
  ],
  {
    variants: {
      size: {
        md: "px-3 py-2.5",
        sm: "px-2.5 py-1.5",
      },
      focusVisible: {
        true: "ring-2 ring-inset ring-accent-ring",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      focusVisible: false,
    },
  },
);

export const appTableResizerVariants = cva(
  [
    "h-5 w-px shrink-0 rounded-sm bg-border-strong bg-clip-content px-2 py-1 outline-none transition",
    "translate-x-2 box-content",
  ],
  {
    variants: {
      resizing: {
        true: "w-0.5 bg-accent px-[0.4375rem]",
        false: "",
      },
      focusVisible: {
        true: "ring-2 ring-accent-ring ring-inset",
        false: "",
      },
    },
    defaultVariants: {
      resizing: false,
      focusVisible: false,
    },
  },
);

export const appTableLoadMoreItemVariants = cva(
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

const AppTableSizeContext = createContext<AppTableSize>("md");

function assertAppTablePrimitiveContract(
  children: ReactNode,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appTableControlSourcePath.length === 0 ||
    appTableReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppTable governance contract is incomplete.");
  }

  if (
    appTableCompositionContract.requiresChildren &&
    appTableCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppTable composition contract is incomplete.");
  }

  if (ariaLabel === undefined && ariaLabelledBy === undefined) {
    throw new Error("AppTable requires aria-label or aria-labelledby.");
  }

  assertHasDirectChildOfType("AppTable", children, AppTableHeader, "AppTableHeader");
  assertHasDirectChildOfType("AppTable", children, AppTableBody, "AppTableBody");
}

type AppTableBehaviorProps = Partial<
  Pick<
    ReactAriaTableProps,
  | "aria-describedby"
  | "aria-details"
  | "aria-label"
  | "aria-labelledby"
  | "defaultExpandedKeys"
  | "defaultSelectedKeys"
  | "disabledBehavior"
  | "disabledKeys"
  | "disallowEmptySelection"
  | "dragAndDropHooks"
  | "escapeKeyBehavior"
  | "expandedKeys"
  | "onExpandedChange"
  | "onRowAction"
  | "onScroll"
  | "onSelectionChange"
  | "onSortChange"
  | "render"
  | "selectedKeys"
  | "selectionBehavior"
  | "selectionMode"
  | "shouldSelectOnPressUp"
  | "slot"
  | "sortDescriptor"
  | "style"
  | "treeColumn"
  >
>;

export type AppTableProps = AppTableBehaviorProps & {
  children: ReactNode;
  className?: ReactAriaTableProps["className"];
  size?: AppTableSize;
};

export type AppResizableTableContainerProps = Omit<
  ComponentProps<typeof ReactAriaResizableTableContainer>,
  "className"
> & {
  className?: string;
};

export type AppTableHeaderProps<T extends object = object> = Omit<
  ReactAriaTableHeaderProps<T>,
  "className"
> & {
  className?: ReactAriaTableHeaderProps<T>["className"];
};

export type AppColumnProps = Omit<ReactAriaColumnProps, "className"> & {
  allowsResizing?: boolean;
  className?: ReactAriaColumnProps["className"];
  size?: AppTableSize;
};

export type AppTableBodyProps<T extends object = object> = Omit<
  ReactAriaTableBodyProps<T>,
  "className"
> & {
  className?: ReactAriaTableBodyProps<T>["className"];
};

export type AppRowProps<T extends object = object> = Omit<
  ReactAriaRowProps<T>,
  "className"
> & {
  className?: ReactAriaRowProps<T>["className"];
  size?: AppTableSize;
};

export type AppCellProps = Omit<ReactAriaCellProps, "className"> & {
  className?: ReactAriaCellProps["className"];
  size?: AppTableSize;
};

export type AppColumnResizerProps = Omit<
  ReactAriaColumnResizerProps,
  "aria-label" | "className"
> & {
  ariaLabel?: string;
  className?: ReactAriaColumnResizerProps["className"];
};

export type AppTableLoadMoreItemProps = Omit<
  ReactAriaTableLoadMoreItemProps,
  "children" | "className"
> & {
  children?: ReactNode;
  className?: string;
  size?: AppTableSize;
  spinnerLabel?: string;
};

function SortIndicator({
  direction,
}: {
  direction: "ascending" | "descending" | undefined;
}) {
  if (direction === undefined) {
    return <span aria-hidden="true" className="size-4 shrink-0" />;
  }

  return (
    <span aria-hidden="true" className="inline-flex size-4 shrink-0 items-center justify-center text-foreground-muted">
      <svg
        className={cn("size-3.5", direction === "descending" ? "rotate-180" : "")}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 12V4" />
        <path d="M5.5 6.5 8 4l2.5 2.5" />
      </svg>
    </span>
  );
}

function TreeChevron({
  expanded,
  disabled,
}: {
  expanded: boolean;
  disabled: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "size-4 shrink-0 text-foreground-muted transition",
        expanded ? "rotate-90" : "rotate-0",
        disabled ? "opacity-50" : "",
      )}
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

function TableDragHandle() {
  return (
    <ReactAriaButton
      slot="drag"
      className="rac-focus-ring inline-flex size-7 items-center justify-center rounded-(--radius-control) text-foreground-muted outline-none transition hover:bg-field-hover hover:text-foreground"
    >
      <DragHandleIcon />
    </ReactAriaButton>
  );
}

export function AppTable({
  children,
  className,
  size = "md",
  ...props
}: AppTableProps) {
  assertAppTablePrimitiveContract(
    children,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <AppTableSizeContext.Provider value={size}>
      <ReactAriaTable
        {...props}
        className={composeRenderProps(
          className,
          (resolvedClassName, renderProps) =>
            cn(
              appTableVariants({
                size,
                dropTarget: renderProps.isDropTarget,
                focusVisible: renderProps.isFocusVisible,
              }),
              resolvedClassName,
            ),
        )}
      >
        {children}
      </ReactAriaTable>
    </AppTableSizeContext.Provider>
  );
}

export function AppResizableTableContainer({
  className,
  ...props
}: AppResizableTableContainerProps) {
  return (
    <ReactAriaResizableTableContainer
      {...props}
      className={cn(appTableContainerVariants(), className)}
    />
  );
}

export function AppTableHeader<T extends object = object>({
  columns,
  children,
  className,
  ...props
}: AppTableHeaderProps<T>) {
  const size = useContext(AppTableSizeContext);
  const { allowsDragging, selectionBehavior, selectionMode } = useTableOptions();

  return (
    <ReactAriaTableHeader
      {...props}
      className={composeRenderProps(className, (resolvedClassName) =>
        cn(appTableHeaderVariants(), resolvedClassName),
      )}
    >
      {allowsDragging ? (
        <ReactAriaColumn width={40} minWidth={40} className={appTableColumnVariants({ size })} />
      ) : null}
      {selectionBehavior === "toggle" ? (
        <ReactAriaColumn
          width={40}
          minWidth={40}
          className={appTableColumnVariants({ size })}
        >
          {selectionMode === "multiple" ? (
            <SelectionCheckbox ariaLabel="Select all rows" />
          ) : null}
        </ReactAriaColumn>
      ) : null}
      <Collection {...(columns !== undefined ? { items: columns } : {})}>
        {children}
      </Collection>
    </ReactAriaTableHeader>
  );
}

export function AppColumn({
  allowsResizing = false,
  children,
  className,
  size,
  ...props
}: AppColumnProps) {
  const inheritedSize = useContext(AppTableSizeContext);
  const resolvedSize = size ?? inheritedSize;

  return (
    <ReactAriaColumn
      {...props}
      className={composeRenderProps(
        className,
        (resolvedClassName, renderProps) =>
          cn(
            appTableColumnVariants({
              size: resolvedSize,
              sortable: renderProps.allowsSorting,
              sorted: renderProps.sortDirection !== undefined,
              pressed: renderProps.isPressed,
              focusVisible: renderProps.isFocusVisible,
            }),
            resolvedClassName,
          ),
      )}
    >
      {composeRenderProps(children, (resolvedChildren, renderProps) => (
        <div className="flex items-center gap-2">
          <Group
            role="presentation"
            tabIndex={-1}
            className="min-w-0 flex-1 truncate outline-none"
          >
            {resolvedChildren}
          </Group>
          {renderProps.allowsSorting ? (
            <SortIndicator direction={renderProps.sortDirection} />
          ) : null}
          {allowsResizing ? <AppColumnResizer /> : null}
        </div>
      ))}
    </ReactAriaColumn>
  );
}

export function AppTableBody<T extends object = object>({
  className,
  ...props
}: AppTableBodyProps<T>) {
  return (
    <ReactAriaTableBody
      {...props}
      className={composeRenderProps(
        className,
        (resolvedClassName, renderProps) =>
          cn(
            appTableBodyVariants({ empty: renderProps.isEmpty }),
            resolvedClassName,
          ),
      )}
    />
  );
}

export function AppRow<T extends object = object>({
  columns,
  children,
  className,
  id,
  size,
  ...props
}: AppRowProps<T>) {
  const inheritedSize = useContext(AppTableSizeContext);
  const resolvedSize = size ?? inheritedSize;
  const { allowsDragging, selectionBehavior } = useTableOptions();

  return (
    <ReactAriaRow
      {...(id !== undefined ? { id } : {})}
      {...props}
      className={composeRenderProps(
        className,
        (resolvedClassName, renderProps) =>
          cn(
            appTableRowVariants({
              selected: renderProps.isSelected,
              pressed: renderProps.isPressed,
              disabled: renderProps.isDisabled,
              dropTarget: renderProps.isDropTarget,
              focusVisible: renderProps.isFocusVisible,
              href: props.href !== undefined,
            }),
            resolvedClassName,
          ),
      )}
    >
      {allowsDragging ? (
        <AppCell size={resolvedSize}>
          <TableDragHandle />
        </AppCell>
      ) : null}
      {selectionBehavior === "toggle" ? (
        <AppCell size={resolvedSize}>
          <SelectionCheckbox ariaLabel="Select row" />
        </AppCell>
      ) : null}
      <Collection {...(columns !== undefined ? { items: columns } : {})}>
        {children}
      </Collection>
    </ReactAriaRow>
  );
}

export function AppCell({
  children,
  className,
  size,
  ...props
}: AppCellProps) {
  const inheritedSize = useContext(AppTableSizeContext);
  const resolvedSize = size ?? inheritedSize;

  return (
    <ReactAriaCell
      {...props}
      className={composeRenderProps(
        className,
        (resolvedClassName, renderProps) =>
          cn(
            appTableCellVariants({
              size: resolvedSize,
              focusVisible: renderProps.isFocusVisible,
            }),
            resolvedClassName,
          ),
      )}
      style={composeRenderProps(
        props.style,
        (resolvedStyle, renderProps) => ({
          ...resolvedStyle,
          paddingInlineStart:
            renderProps.isTreeColumn === true
              ? 12 +
                (renderProps.hasChildItems ? 0 : 20) +
                (renderProps.level - 1) * 16
              : resolvedStyle?.paddingInlineStart,
        }),
      )}
    >
      {composeRenderProps(children, (resolvedChildren, renderProps) => (
        <>
          {renderProps.hasChildItems && renderProps.isTreeColumn ? (
            <ReactAriaButton
              slot="chevron"
              className="rac-focus-ring mr-1 inline-flex size-5 shrink-0 items-center justify-center rounded-(--radius-control) text-foreground-muted outline-none transition hover:bg-field-hover hover:text-foreground"
            >
              <TreeChevron
                expanded={renderProps.isExpanded}
                disabled={renderProps.isDisabled}
              />
            </ReactAriaButton>
          ) : null}
          {resolvedChildren}
        </>
      ))}
    </ReactAriaCell>
  );
}

export function AppColumnResizer({
  ariaLabel = "Resize column",
  className,
  ...props
}: AppColumnResizerProps) {
  return (
    <ReactAriaColumnResizer
      {...props}
      aria-label={ariaLabel}
      className={composeRenderProps(
        className,
        (resolvedClassName, renderProps) =>
          cn(
            appTableResizerVariants({
              resizing: renderProps.isResizing,
              focusVisible: renderProps.isFocusVisible,
            }),
            resolvedClassName,
          ),
      )}
    />
  );
}

export function AppTableLoadMoreItem({
  children,
  className,
  size,
  spinnerLabel = "Loading more rows...",
  ...props
}: AppTableLoadMoreItemProps) {
  const inheritedSize = useContext(AppTableSizeContext);
  const resolvedSize = size ?? inheritedSize;

  return (
    <ReactAriaTableLoadMoreItem
      {...props}
      className={cn(appTableLoadMoreItemVariants({ size: resolvedSize }), className)}
    >
      {children ?? <SpinnerIcon label={spinnerLabel} />}
    </ReactAriaTableLoadMoreItem>
  );
}
