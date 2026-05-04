/**
 * @afenda-owner app-tag-group
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Tag Group for governed shared UI
 */
"use client";

import {
  Button,
  Label,
  Tag as ReactAriaTag,
  TagGroup as ReactAriaTagGroup,
  TagList as ReactAriaTagList,
  Text,
  composeRenderProps,
  type TagGroupProps as ReactAriaTagGroupProps,
  type TagListProps as ReactAriaTagListProps,
  type TagProps as ReactAriaTagProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  type AppTagGroupSize,
  appTagGroupCompositionContract,
  appTagGroupControlSourcePath,
  appTagGroupReactAriaPrimitives,
} from "@/components/ui-governance/app-tag-group/app-tag-group.contract.primitive.shared";
import { assertHasDirectChildOfType } from "@/components/ui-governance/governance.ui.react-aria-runtime.shared";

export const appTagGroupVariants = cva("flex flex-col gap-2 text-foreground", {
  variants: {
    invalid: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    invalid: false,
  },
});

export const appTagListVariants = cva(
  [
    "rac-focus-ring flex flex-wrap items-start rounded-(--radius-panel) outline-none",
    "gap-2",
  ],
  {
    variants: {
      size: {
        md: "min-h-9",
        sm: "min-h-8 gap-1.5",
      },
      empty: {
        true: "italic text-foreground-muted",
        false: "",
      },
      focused: {
        true: "ring-2 ring-accent-ring ring-inset",
        false: "",
      },
      focusVisible: {
        true: "ring-2 ring-accent-ring ring-inset",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      empty: false,
      focused: false,
      focusVisible: false,
    },
  },
);

export const appTagVariants = cva(
  [
    "rac-focus-ring group inline-flex max-w-full items-center rounded-full border outline-none transition",
    "type-body-sm [-webkit-tap-highlight-color:transparent]",
  ],
  {
    variants: {
      size: {
        md: "min-h-7 gap-1.5 px-3 py-1",
        sm: "min-h-6 gap-1 px-2.5 py-0.5 text-[0.8125rem] leading-5",
      },
      selected: {
        true: "border-accent bg-accent text-accent-foreground",
        false: "border-border bg-surface-raised text-foreground hover:bg-field",
      },
      disabled: {
        true: "border-border bg-field text-foreground-muted opacity-60",
        false: "",
      },
      focused: {
        true: "ring-2 ring-accent-ring ring-inset",
        false: "",
      },
      pressed: {
        true: "scale-[0.98]",
        false: "",
      },
      removable: {
        true: "pr-1",
        false: "",
      },
      href: {
        true: "cursor-pointer no-underline",
        false: "cursor-default",
      },
    },
    defaultVariants: {
      size: "md",
      selected: false,
      disabled: false,
      focused: false,
      pressed: false,
      removable: false,
      href: false,
    },
  },
);

export const appTagSelectionIndicatorVariants = cva(
  "inline-flex size-3.5 shrink-0 items-center justify-center text-current",
  {
    variants: {
      visible: {
        true: "",
        false: "hidden",
      },
    },
    defaultVariants: {
      visible: false,
    },
  },
);

export const appTagRemoveButtonVariants = cva(
  [
    "rac-focus-ring inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-transparent outline-none transition",
  ],
  {
    variants: {
      size: {
        md: "size-5",
        sm: "size-4.5",
      },
      selected: {
        true: "text-current hover:bg-white/15",
        false: "text-foreground-muted hover:bg-field-hover hover:text-foreground",
      },
      disabled: {
        true: "text-foreground-muted",
        false: "",
      },
      pressed: {
        true: "scale-95",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      selected: false,
      disabled: false,
      pressed: false,
    },
  },
);

function assertAppTagGroupPrimitiveContract(
  children: AppTagGroupProps["children"],
  label: ReactNode | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appTagGroupControlSourcePath.length === 0 ||
    appTagGroupReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppTagGroup governance contract is incomplete.");
  }

  if (
    appTagGroupCompositionContract.requiresChildren &&
    appTagGroupCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppTagGroup composition contract is incomplete.");
  }

  assertHasDirectChildOfType("AppTagGroup", children, AppTagList, "AppTagList");

  if (label === undefined && ariaLabel === undefined && ariaLabelledBy === undefined) {
    throw new Error("AppTagGroup requires label, aria-label, or aria-labelledby.");
  }
}

function assertAppTagListPrimitiveContract<T extends object>(
  children: ReactNode | ((item: T) => ReactNode),
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (children === undefined || children === null) {
    throw new Error(
      "AppTagList requires explicit AppTag children or an item renderer.",
    );
  }
}

function assertAppTagPrimitiveContract(
  children: ReactNode | ReactAriaTagProps["children"] | undefined,
  textValue: string | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    children === undefined &&
    textValue === undefined &&
    ariaLabel === undefined &&
    ariaLabelledBy === undefined
  ) {
    throw new Error(
      "AppTag requires children, textValue, aria-label, or aria-labelledby.",
    );
  }

  if (
    typeof children !== "string" &&
    children !== undefined &&
    textValue === undefined &&
    ariaLabel === undefined &&
    ariaLabelledBy === undefined
  ) {
    throw new Error(
      "AppTag requires textValue, aria-label, or aria-labelledby when children are not plain text.",
    );
  }
}

type AppTagGroupBehaviorProps = Partial<
  Pick<
    ReactAriaTagGroupProps,
    | "aria-describedby"
    | "aria-details"
    | "aria-label"
    | "aria-labelledby"
    | "defaultSelectedKeys"
    | "disabledKeys"
    | "disallowEmptySelection"
    | "escapeKeyBehavior"
    | "id"
    | "onAction"
    | "onRemove"
    | "onSelectionChange"
    | "render"
    | "selectedKeys"
    | "selectionBehavior"
    | "selectionMode"
    | "shouldSelectOnPressUp"
    | "slot"
    | "style"
  >
>;

export type AppTagGroupProps = AppTagGroupBehaviorProps & {
  children: ReactNode;
  className?: string;
  description?: ReactNode;
  errorMessage?: ReactNode;
  label?: ReactNode;
};

export type AppTagListProps<T extends object = object> = Omit<
  ReactAriaTagListProps<T>,
  "children" | "className"
> & {
  children: ReactNode | ((item: T) => ReactNode);
  className?: ReactAriaTagListProps<T>["className"];
  size?: AppTagGroupSize;
};

type AppTagBaseProps = Omit<ComponentProps<typeof ReactAriaTag>, "children" | "className">;

export type AppTagProps = AppTagBaseProps & {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children?: ReactNode | ReactAriaTagProps["children"];
  className?: ComponentProps<typeof ReactAriaTag>["className"];
  removeButtonClassName?: string;
  size?: AppTagGroupSize;
};

export function AppTagGroup({
  children,
  className,
  description,
  errorMessage,
  label,
  ...props
}: AppTagGroupProps) {
  assertAppTagGroupPrimitiveContract(
    children,
    label,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaTagGroup
      {...props}
      className={cn(
        appTagGroupVariants({ invalid: errorMessage !== undefined }),
        className,
      )}
    >
      {label ? <Label className="type-label">{label}</Label> : null}
      {children}
      {description ? (
        <Text slot="description" className="type-meta text-foreground-muted">
          {description}
        </Text>
      ) : null}
      {errorMessage ? (
        <Text slot="errorMessage" className="type-meta text-danger">
          {errorMessage}
        </Text>
      ) : null}
    </ReactAriaTagGroup>
  );
}

export function AppTagList<T extends object = object>({
  children,
  className,
  size = "md",
  ...props
}: AppTagListProps<T>) {
  assertAppTagListPrimitiveContract(children);

  return (
    <ReactAriaTagList
      {...props}
      className={composeRenderProps(
        className,
        (resolvedClassName, renderProps) =>
          cn(
            appTagListVariants({
              size,
              empty: renderProps.isEmpty,
              focused: renderProps.isFocused,
              focusVisible: renderProps.isFocusVisible,
            }),
            resolvedClassName,
          ),
      )}
    >
      {children}
    </ReactAriaTagList>
  );
}

export function AppTag({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  children,
  className,
  removeButtonClassName,
  size = "md",
  textValue,
  ...props
}: AppTagProps) {
  const resolvedTextValue =
    textValue ?? (typeof children === "string" ? children : undefined);

  assertAppTagPrimitiveContract(
    children,
    resolvedTextValue,
    ariaLabel,
    ariaLabelledBy,
  );

  return (
    <ReactAriaTag
      {...props}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      {...(resolvedTextValue !== undefined ? { textValue: resolvedTextValue } : {})}
      className={composeRenderProps(
        className,
        (resolvedClassName, renderProps) =>
          cn(
            appTagVariants({
              size,
              selected: renderProps.isSelected,
              disabled: renderProps.isDisabled,
              focused: renderProps.isFocusVisible,
              pressed: renderProps.isPressed,
              removable: renderProps.allowsRemoving,
              href: props.href !== undefined,
            }),
            resolvedClassName,
          ),
      )}
    >
      {composeRenderProps(children, (resolvedChildren, renderProps) => (
        <>
          <span
            aria-hidden="true"
            className={appTagSelectionIndicatorVariants({
              visible: renderProps.selectionMode !== "none" && renderProps.isSelected,
            })}
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3"
            >
              <path d="M3 8.5L6.5 12L13 4.5" />
            </svg>
          </span>
          {resolvedChildren ? (
            <span className="min-w-0 truncate">{resolvedChildren}</span>
          ) : null}
          {renderProps.allowsRemoving ? (
            <Button
              slot="remove"
              className={cn(
                appTagRemoveButtonVariants({
                  size,
                  selected: renderProps.isSelected,
                  disabled: renderProps.isDisabled,
                  pressed: false,
                }),
                removeButtonClassName,
              )}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                className="size-3"
              >
                <path d="M4 4l8 8" />
                <path d="M12 4l-8 8" />
              </svg>
            </Button>
          ) : null}
        </>
      ))}
    </ReactAriaTag>
  );
}
