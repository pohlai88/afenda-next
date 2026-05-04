/**
 * @afenda-owner app-select
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Select for governed shared UI
 */
"use client";

import {
  Button as ReactAriaButton,
  FieldError,
  Label,
  ListBox as ReactAriaListBox,
  Popover as ReactAriaPopover,
  Select as ReactAriaSelect,
  SelectValue,
  Text,
  type SelectProps as ReactAriaSelectProps,
  type ValidationResult,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import { cn } from "@/components/cn";
import {
  AppListBoxHeader,
  AppListBoxItem,
  AppListBoxSection,
  AppListBoxText,
  appListBoxVariants,
  type AppListBoxHeaderProps,
  type AppListBoxItemProps,
  type AppListBoxSectionProps,
  type AppListBoxTextProps,
} from "@/components/ui-governance/app-list-box/app-list-box.control.primitive.client";
import {
  type AppSelectSize,
  appSelectCompositionContract,
  appSelectControlSourcePath,
  appSelectReactAriaPrimitives,
} from "@/components/ui-governance/app-select/app-select.contract.primitive.shared";

export const appSelectVariants = cva(
  "rac-invalid flex flex-col text-foreground",
  {
    variants: {
      size: {
        md: "gap-1.5",
        sm: "gap-1",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const appSelectTriggerVariants = cva(
  [
    "rac-focus-ring flex w-full min-w-[14rem] max-w-full items-center gap-3 rounded-(--radius-control) border bg-field text-start outline-none transition",
    "data-[invalid]:border-danger data-[invalid]:ring-danger-ring",
  ],
  {
    variants: {
      size: {
        md: [
          "min-h-[var(--control-height-comfortable)] px-[var(--control-padding-x-comfortable)]",
          "py-[var(--control-padding-y-comfortable)]",
        ],
        sm: [
          "min-h-[var(--control-height-compact)] px-[var(--control-padding-x-compact)]",
          "py-[var(--control-padding-y-compact)]",
        ],
      },
      disabled: {
        true: "cursor-default opacity-60",
        false: "hover:bg-field-hover",
      },
      invalid: {
        true: "border-danger",
        false: "border-border-strong",
      },
      open: {
        true: "bg-field-hover",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
      invalid: false,
      open: false,
    },
  },
);

export const appSelectValueVariants = cva(
  "type-body-sm min-w-0 flex-1 truncate text-start",
  {
    variants: {
      placeholder: {
        true: "text-foreground-muted",
        false: "text-foreground",
      },
    },
    defaultVariants: {
      placeholder: false,
    },
  },
);

export const appSelectPopoverVariants = cva(
  "w-[var(--trigger-width)] p-1",
  {
    variants: {
      size: {
        md: "",
        sm: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const appSelectChevronVariants = cva(
  "size-4 shrink-0 text-foreground-muted transition",
  {
    variants: {
      open: {
        true: "rotate-180",
        false: "rotate-0",
      },
    },
    defaultVariants: {
      open: false,
    },
  },
);

const AppSelectSizeContext = createContext<AppSelectSize>("md");

function assertAppSelectPrimitiveContract<T extends object>(
  children: ReactNode | ((item: T) => ReactNode),
  label: ReactNode | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appSelectControlSourcePath.length === 0 ||
    appSelectReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppSelect governance contract is incomplete.");
  }

  if (
    appSelectCompositionContract.requiresChildren &&
    appSelectCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppSelect composition contract is incomplete.");
  }

  if (children === undefined || children === null) {
    throw new Error(
      "AppSelect requires explicit AppSelectItem children or an item renderer.",
    );
  }

  if (
    label === undefined &&
    ariaLabel === undefined &&
    ariaLabelledBy === undefined
  ) {
    throw new Error("AppSelect requires label, aria-label, or aria-labelledby.");
  }
}

type AppSelectSelectionMode = "single" | "multiple";

type AppSelectBehaviorProps<
  T extends object,
  M extends AppSelectSelectionMode,
> = Partial<
  Pick<
    ReactAriaSelectProps<T, M>,
    | "allowsEmptyCollection"
    | "aria-describedby"
    | "aria-details"
    | "aria-label"
    | "aria-labelledby"
    | "autoComplete"
    | "autoFocus"
    | "defaultOpen"
    | "defaultValue"
    | "disabledKeys"
    | "excludeFromTabOrder"
    | "form"
    | "id"
    | "isDisabled"
    | "isInvalid"
    | "isOpen"
    | "isRequired"
    | "name"
    | "onBlur"
    | "onChange"
    | "onFocus"
    | "onFocusChange"
    | "onKeyDown"
    | "onKeyUp"
    | "onOpenChange"
    | "placeholder"
    | "render"
    | "selectionMode"
    | "shouldCloseOnSelect"
    | "slot"
    | "style"
    | "validate"
    | "validationBehavior"
    | "value"
  >
>;

export type AppSelectProps<
  T extends object = object,
  M extends AppSelectSelectionMode = "single",
> = AppSelectBehaviorProps<T, M> & {
  children: ReactNode | ((item: T) => ReactNode);
  className?: string;
  description?: ReactNode;
  errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
  items?: Iterable<T>;
  label?: ReactNode;
  listBoxClassName?: string;
  popoverClassName?: string;
  size?: AppSelectSize;
  triggerClassName?: string;
  valueClassName?: string;
};

export type AppSelectItemProps<T extends object = object> = Omit<
  AppListBoxItemProps<T>,
  "size"
> & {
  size?: AppSelectSize;
};

export type AppSelectSectionProps<T extends object = object> = Omit<
  AppListBoxSectionProps<T>,
  "size"
> & {
  size?: AppSelectSize;
};

export type AppSelectHeaderProps = Omit<AppListBoxHeaderProps, "size"> & {
  size?: AppSelectSize;
};

export type AppSelectTextProps = AppListBoxTextProps;

function SelectChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6.5 8 10.5l4-4" />
    </svg>
  );
}

export function AppSelect<
  T extends object = object,
  M extends AppSelectSelectionMode = "single",
>({
  children,
  className,
  description,
  errorMessage,
  items,
  label,
  listBoxClassName,
  placeholder,
  popoverClassName,
  size = "md",
  triggerClassName,
  valueClassName,
  ...props
}: AppSelectProps<T, M>) {
  assertAppSelectPrimitiveContract(
    children,
    label,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <AppSelectSizeContext.Provider value={size}>
      <ReactAriaSelect
        {...props}
        {...(placeholder !== undefined ? { placeholder } : {})}
        className={cn(appSelectVariants({ size }), className)}
      >
        {(renderProps) => (
          <>
            {label ? <Label className="type-label">{label}</Label> : null}
            <ReactAriaButton
              className={cn(
                appSelectTriggerVariants({
                  size,
                  disabled: renderProps.isDisabled,
                  invalid: renderProps.isInvalid,
                  open: renderProps.isOpen,
                }),
                triggerClassName,
              )}
              data-invalid={renderProps.isInvalid || undefined}
            >
              <SelectValue
                className={({ isPlaceholder }) =>
                  cn(
                    appSelectValueVariants({
                      placeholder: isPlaceholder,
                    }),
                    valueClassName,
                  )
                }
              >
                {({ selectedText, defaultChildren }) =>
                  selectedText || defaultChildren
                }
              </SelectValue>
              <SelectChevronIcon
                className={appSelectChevronVariants({ open: renderProps.isOpen })}
              />
            </ReactAriaButton>
            {description ? (
              <Text slot="description" className="type-meta text-foreground-muted">
                {description}
              </Text>
            ) : null}
            <FieldError className="type-meta text-danger">{errorMessage}</FieldError>
            <ReactAriaPopover
              className={cn(appSelectPopoverVariants({ size }), popoverClassName)}
            >
              <ReactAriaListBox<T>
                {...(items !== undefined ? { items } : {})}
                className={(listBoxRenderProps) =>
                  cn(
                    appListBoxVariants({
                      layout: "stack",
                      orientation: "vertical",
                      size,
                      empty: listBoxRenderProps.isEmpty,
                      dropTarget: listBoxRenderProps.isDropTarget,
                    }),
                    "min-h-0 max-h-72 w-full rounded-none border-0 bg-transparent p-0 shadow-none",
                    listBoxClassName,
                  )
                }
              >
                {children}
              </ReactAriaListBox>
            </ReactAriaPopover>
          </>
        )}
      </ReactAriaSelect>
    </AppSelectSizeContext.Provider>
  );
}

export function AppSelectItem<T extends object = object>({
  size,
  ...props
}: AppSelectItemProps<T>) {
  const inheritedSize = useContext(AppSelectSizeContext);

  return <AppListBoxItem {...props} size={size ?? inheritedSize} />;
}

export function AppSelectSection<T extends object = object>({
  size,
  ...props
}: AppSelectSectionProps<T>) {
  const inheritedSize = useContext(AppSelectSizeContext);

  return <AppListBoxSection {...props} size={size ?? inheritedSize} />;
}

export function AppSelectHeader({
  size,
  ...props
}: AppSelectHeaderProps) {
  const inheritedSize = useContext(AppSelectSizeContext);

  return <AppListBoxHeader {...props} size={size ?? inheritedSize} />;
}

export function AppSelectText(props: AppSelectTextProps) {
  return <AppListBoxText {...props} />;
}
