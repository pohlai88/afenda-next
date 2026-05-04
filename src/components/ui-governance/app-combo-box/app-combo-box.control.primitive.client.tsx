/**
 * @afenda-owner app-combo-box
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Combo Box for governed shared UI
 */
"use client";

import {
  Button as ReactAriaButton,
  ComboBox as ReactAriaComboBox,
  ComboBoxValue,
  FieldError,
  Header,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Popover,
  Text,
  composeRenderProps,
  type ComboBoxProps as ReactAriaComboBoxProps,
  type ComboBoxValueProps as ReactAriaComboBoxValueProps,
  type ListBoxItemProps as ReactAriaListBoxItemProps,
  type ListBoxSectionProps as ReactAriaListBoxSectionProps,
  type ValidationResult,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ReactElement, ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appComboBoxCompositionContract,
  appComboBoxControlSourcePath,
  appComboBoxReactAriaPrimitives,
  type AppComboBoxSize,
} from "@/components/ui-governance/app-combo-box/app-combo-box.contract.primitive.shared";

type SelectionMode = "single" | "multiple";

export const appComboBoxVariants = cva("rac-invalid flex flex-col text-foreground", {
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

export const appComboBoxFieldVariants = cva(
  "field-control flex w-full items-center gap-1 pe-1",
  {
    variants: {
      size: {
        md: "",
        sm: "field-control-compact",
      },
      disabled: {
        true: "",
        false: "hover:bg-field-hover",
      },
      invalid: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
      invalid: false,
    },
  },
);

export const appComboBoxInputVariants = cva(
  "type-body-sm min-w-0 flex-1 bg-transparent px-3 py-0 text-foreground outline-none placeholder:text-foreground-muted",
  {
    variants: {
      size: {
        md: "",
        sm: "px-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const appComboBoxButtonVariants = cva(
  "rac-focus-ring inline-flex size-8 items-center justify-center rounded-(--radius-control) text-foreground-muted outline-none transition",
  {
    variants: {
      disabled: {
        true: "",
        false: "hover:bg-surface-raised hover:text-foreground",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);

export const appComboBoxValueVariants = cva(
  "type-meta text-foreground-muted",
  {
    variants: {
      placeholder: {
        true: "text-foreground-muted",
        false: "text-foreground",
      },
    },
    defaultVariants: {
      placeholder: true,
    },
  },
);

export const appComboBoxPopoverVariants = cva(
  "surface-raised w-(--trigger-width) p-1",
);

export const appComboBoxListBoxVariants = cva(
  "max-h-60 overflow-auto outline-none",
);

export const appComboBoxItemVariants = cva(
  "rac-focus-ring type-body-sm flex cursor-default items-center rounded-(--radius-control) px-3 py-2 outline-none transition",
  {
    variants: {
      focused: {
        true: "bg-accent text-accent-foreground",
        false: "text-foreground",
      },
      selected: {
        true: "bg-surface-raised font-medium",
        false: "",
      },
      disabled: {
        true: "text-foreground-muted opacity-50",
        false: "",
      },
    },
    compoundVariants: [
      {
        focused: true,
        selected: true,
        className: "bg-accent text-accent-foreground",
      },
    ],
    defaultVariants: {
      focused: false,
      selected: false,
      disabled: false,
    },
  },
);

export const appComboBoxSectionVariants = cva("py-1");

export const appComboBoxSectionHeaderVariants = cva(
  "type-meta px-3 py-1 text-foreground-muted",
);

type AppComboBoxBehaviorProps<
  T extends object,
  M extends SelectionMode,
> = Partial<
  Pick<
    ReactAriaComboBoxProps<T, M>,
    | "allowsCustomValue"
    | "allowsEmptyCollection"
    | "aria-describedby"
    | "aria-details"
    | "aria-label"
    | "aria-labelledby"
    | "autoFocus"
    | "defaultFilter"
    | "defaultInputValue"
    | "defaultItems"
    | "defaultValue"
    | "disabledKeys"
    | "form"
    | "formValue"
    | "id"
    | "inputValue"
    | "isDisabled"
    | "isInvalid"
    | "isReadOnly"
    | "isRequired"
    | "items"
    | "menuTrigger"
    | "name"
    | "onBlur"
    | "onChange"
    | "onFocus"
    | "onFocusChange"
    | "onInputChange"
    | "onKeyDown"
    | "onKeyUp"
    | "onOpenChange"
    | "selectionMode"
    | "shouldFocusWrap"
    | "slot"
    | "validate"
    | "validationBehavior"
    | "value"
  >
>;

export type AppComboBoxProps<
  T extends object,
  M extends SelectionMode = "single",
> = AppComboBoxBehaviorProps<T, M> & {
  children: ReactNode | ((item: T) => ReactNode);
  className?: string;
  description?: ReactNode | null;
  errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
  inputClassName?: string;
  label?: ReactNode;
  listBoxClassName?: string;
  placeholder?: string;
  popoverClassName?: string;
  size?: AppComboBoxSize;
  valueChildren?: ReactAriaComboBoxValueProps<T>["children"];
  valueClassName?: string;
  valuePlaceholder?: ReactNode;
};

export type AppComboBoxItemProps<T extends object = object> =
  ReactAriaListBoxItemProps<T> & {
    className?: ReactAriaListBoxItemProps<T>["className"];
  };

export type AppComboBoxSectionProps<T extends object> = Omit<
  ReactAriaListBoxSectionProps<T>,
  "children"
> & {
  children: ReactNode | ((item: T) => ReactElement);
  className?: string;
  headerClassName?: string;
  title?: ReactNode;
};

function assertAppComboBoxPrimitiveContract<T extends object>(
  label: ReactNode | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
  children: ReactNode | ((item: T) => ReactNode),
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appComboBoxControlSourcePath.length === 0 ||
    appComboBoxReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppComboBox governance contract is incomplete.");
  }

  if (
    appComboBoxCompositionContract.requiresChildren &&
    appComboBoxCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppComboBox composition contract is incomplete.");
  }

  if (children === undefined || children === null) {
    throw new Error(
      "AppComboBox requires explicit AppComboBoxItem or AppComboBoxSection children.",
    );
  }

  if (
    label === undefined &&
    ariaLabel === undefined &&
    ariaLabelledBy === undefined
  ) {
    throw new Error("AppComboBox requires label, aria-label, or aria-labelledby.");
  }
}

export function AppComboBox<
  T extends object,
  M extends SelectionMode = "single",
>({
  children,
  className,
  description,
  errorMessage,
  inputClassName,
  label,
  listBoxClassName,
  placeholder,
  popoverClassName,
  size = "md",
  valueChildren,
  valueClassName,
  valuePlaceholder = "No items selected",
  ...props
}: AppComboBoxProps<T, M>) {
  assertAppComboBoxPrimitiveContract(
    label,
    props["aria-label"],
    props["aria-labelledby"],
    children,
  );

  return (
    <ReactAriaComboBox
      {...props}
      className={cn(appComboBoxVariants({ size }), className)}
    >
      {label ? <Label className="type-label">{label}</Label> : null}
      <div
        className={appComboBoxFieldVariants({
          size,
          disabled: props.isDisabled,
          invalid: props.isInvalid,
        })}
      >
        <Input
          className={cn(appComboBoxInputVariants({ size }), inputClassName)}
          {...(placeholder !== undefined ? { placeholder } : {})}
        />
        <ReactAriaButton
          className={(renderProps) =>
            appComboBoxButtonVariants({ disabled: renderProps.isDisabled })
          }
        >
          <svg
            aria-hidden="true"
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </ReactAriaButton>
      </div>
      {props.selectionMode === "multiple" ? (
        <ComboBoxValue<T>
          placeholder={valuePlaceholder}
          className={composeRenderProps(valueClassName, (resolvedClassName, renderProps) =>
            cn(
              appComboBoxValueVariants({
                placeholder: renderProps.isPlaceholder,
              }),
              resolvedClassName,
            ),
          )}
        >
          {valueChildren}
        </ComboBoxValue>
      ) : null}
      {description ? (
        <Text slot="description" className="type-meta text-foreground-muted">
          {description}
        </Text>
      ) : null}
      <FieldError className="type-meta text-danger">{errorMessage}</FieldError>
      <Popover className={cn(appComboBoxPopoverVariants(), popoverClassName)}>
        <ListBox
          {...(props.items !== undefined ? { items: props.items } : {})}
          className={cn(appComboBoxListBoxVariants(), listBoxClassName)}
        >
          {children}
        </ListBox>
      </Popover>
    </ReactAriaComboBox>
  );
}

export function AppComboBoxItem<T extends object = object>({
  className,
  ...props
}: AppComboBoxItemProps<T>) {
  return (
    <ListBoxItem
      {...props}
      className={composeRenderProps(
        className,
        (resolvedClassName, renderProps) =>
          cn(
            appComboBoxItemVariants({
              focused: renderProps.isFocused,
              selected: renderProps.isSelected,
              disabled: renderProps.isDisabled,
            }),
            resolvedClassName,
          ),
      )}
    />
  );
}

export function AppComboBoxSection<T extends object>({
  children,
  className,
  headerClassName,
  title,
  ...props
}: AppComboBoxSectionProps<T>) {
  return (
    <ListBoxSection
      {...props}
      className={cn(appComboBoxSectionVariants(), className)}
      >
        {title !== undefined ? (
          <Header
            className={cn(appComboBoxSectionHeaderVariants(), headerClassName)}
          >
            {title}
          </Header>
        ) : null}
      {children as ReactNode}
    </ListBoxSection>
  );
}
