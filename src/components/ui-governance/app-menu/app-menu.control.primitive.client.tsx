/**
 * @afenda-owner app-menu
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Menu for governed shared UI
 */
"use client";

import {
  Header as ReactAriaHeader,
  Menu as ReactAriaMenu,
  MenuItem as ReactAriaMenuItem,
  MenuSection as ReactAriaMenuSection,
  MenuTrigger as ReactAriaMenuTrigger,
  Popover as ReactAriaPopover,
  Separator as ReactAriaSeparator,
  SubmenuTrigger as ReactAriaSubmenuTrigger,
  Text as ReactAriaText,
  composeRenderProps,
  type MenuItemProps as ReactAriaMenuItemProps,
  type MenuProps as ReactAriaMenuProps,
  type MenuSectionProps as ReactAriaMenuSectionProps,
  type MenuTriggerProps as ReactAriaMenuTriggerProps,
  type SeparatorProps as ReactAriaSeparatorProps,
  type SubmenuTriggerProps as ReactAriaSubmenuTriggerProps,
  type TextProps as ReactAriaTextProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactElement, ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appMenuCompositionContract,
  appMenuControlSourcePath,
  appMenuReactAriaPrimitives,
  type AppMenuSize,
} from "@/components/ui-governance/app-menu/app-menu.contract.primitive.shared";
import {
  getDirectElementChildren,
} from "@/components/ui-governance/governance.ui.react-aria-runtime.shared";

export const appMenuVariants = cva(
  [
    "relative min-h-0 max-h-inherit min-w-[12rem] overflow-auto rounded-(--radius-panel) outline-none",
    "surface-raised p-1 text-foreground",
  ],
  {
    variants: {
      size: {
        md: "",
        sm: "",
      },
      empty: {
        true: "flex items-center justify-center italic text-foreground-muted",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "md",
        className: "gap-1",
      },
      {
        size: "sm",
        className: "gap-0.5",
      },
    ],
    defaultVariants: {
      size: "md",
      empty: false,
    },
  },
);

export const appMenuPopoverVariants = cva("min-w-[12rem] surface-raised p-1");

export const appMenuSubmenuPopoverVariants = cva(
  "min-w-[12rem] surface-raised p-1",
);

export const appMenuItemVariants = cva(
  [
    "rac-focus-ring group relative grid min-w-0 cursor-default items-center rounded-(--radius-control) outline-none transition",
    "grid-cols-[1rem_auto_minmax(0,1fr)_auto] gap-x-2 gap-y-0.5",
    "[&>[data-slot='selection']]:col-start-1 [&>[data-slot='selection']]:row-start-1 [&>[data-slot='selection']]:self-center",
    "[&>[data-slot='submenu']]:col-start-4 [&>[data-slot='submenu']]:row-start-1 [&>[data-slot='submenu']]:self-center",
    "[&>[data-app-menu-keyboard]]:col-start-4 [&>[data-app-menu-keyboard]]:row-start-1 [&>[data-app-menu-keyboard]]:justify-self-end",
    "[&>[data-app-menu-text='label']]:col-start-3 [&>[data-app-menu-text='label']]:row-start-1",
    "[&>[data-app-menu-text='description']]:col-start-3 [&>[data-app-menu-text='description']]:row-start-2",
    "[&>svg:not([data-app-menu-icon])]:col-start-2 [&>svg:not([data-app-menu-icon])]:row-start-1 [&>svg:not([data-app-menu-icon])]:size-4 [&>svg:not([data-app-menu-icon])]:shrink-0",
  ],
  {
    variants: {
      size: {
        md: "px-2.5 py-2",
        sm: "px-2 py-1.5",
      },
      focused: {
        true: "bg-accent text-accent-foreground",
        false: "text-foreground",
      },
      open: {
        true: "bg-field-hover",
        false: "",
      },
      pressed: {
        true: "bg-field-strong",
        false: "",
      },
      selected: {
        true: "font-medium",
        false: "",
      },
      disabled: {
        true: "text-foreground-muted opacity-60",
        false: "",
      },
      href: {
        true: "cursor-pointer no-underline",
        false: "",
      },
    },
    compoundVariants: [
      {
        focused: true,
        pressed: true,
        className: "bg-accent-strong text-accent-foreground",
      },
      {
        focused: false,
        selected: true,
        className: "bg-field-hover",
      },
    ],
    defaultVariants: {
      size: "md",
      focused: false,
      open: false,
      pressed: false,
      selected: false,
      disabled: false,
      href: false,
    },
  },
);

export const appMenuSectionVariants = cva("flex flex-col", {
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

export const appMenuHeaderVariants = cva(
  "type-meta rounded-(--radius-control) border border-border bg-field font-medium text-foreground-muted",
  {
    variants: {
      size: {
        md: "px-2.5 py-1.5",
        sm: "px-2 py-1",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const appMenuSeparatorVariants = cva("mx-2 border-border", {
  variants: {
    size: {
      md: "my-1.5",
      sm: "my-1",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const appMenuTextVariants = cva("min-w-0", {
  variants: {
    description: {
      true: "type-meta text-current/80",
      false: "type-body-sm font-medium",
    },
  },
  defaultVariants: {
    description: false,
  },
});

export const appMenuKeyboardVariants = cva(
  "type-meta rounded-[calc(var(--radius-control)-0.125rem)] border border-border bg-field px-1.5 py-0.5 text-current/80",
);

type AppMenuBaseProps<T extends object> = ReactAriaMenuProps<T>;

export type AppMenuProps<T extends object = object> = Omit<
  AppMenuBaseProps<T>,
  "children" | "className"
> & {
  children: ReactNode | ((item: T) => ReactNode);
  className?: AppMenuBaseProps<T>["className"];
  size?: AppMenuSize;
};

export type AppMenuItemProps<T extends object = object> = Omit<
  ReactAriaMenuItemProps<T>,
  "children" | "className"
> & {
  children?: ReactNode | ReactAriaMenuItemProps<T>["children"];
  className?: ReactAriaMenuItemProps<T>["className"];
  size?: AppMenuSize;
};

export type AppMenuSectionProps<T extends object = object> = Omit<
  ReactAriaMenuSectionProps<T>,
  "className" | "children"
> & {
  children: ReactNode | ((item: T) => ReactElement);
  className?: string;
  size?: AppMenuSize;
};

export type AppMenuHeaderProps = Omit<
  ComponentProps<typeof ReactAriaHeader>,
  "className"
> & {
  className?: string;
  size?: AppMenuSize;
};

export type AppMenuSeparatorProps = Omit<
  ReactAriaSeparatorProps,
  "className"
> & {
  className?: string;
  size?: AppMenuSize;
};

export type AppMenuTextProps = Omit<ReactAriaTextProps, "className"> & {
  className?: ReactAriaTextProps["className"];
};

export type AppMenuKeyboardProps = ComponentProps<"kbd"> & {
  className?: string;
};

export type AppMenuTriggerProps = Omit<
  ReactAriaMenuTriggerProps,
  "children"
> & {
  children: ReactNode;
  popoverClassName?: string;
};

export type AppSubmenuTriggerProps = Omit<
  ReactAriaSubmenuTriggerProps,
  "children"
> & {
  children: ReactNode;
  popoverClassName?: string;
};

function assertAppMenuPrimitiveContract<T extends object>(
  children: ReactNode | ((item: T) => ReactNode),
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appMenuControlSourcePath.length === 0 ||
    appMenuReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppMenu governance contract is incomplete.");
  }

  if (
    appMenuCompositionContract.requiresChildren &&
    appMenuCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppMenu composition contract is incomplete.");
  }

  if (children === undefined || children === null) {
    throw new Error(
      "AppMenu requires explicit AppMenuItem children or an item renderer.",
    );
  }
}

function assertTriggerPair(
  componentName: string,
  children: ReactNode,
): [ReactElement, ReactElement] {
  const directChildren = getDirectElementChildren(children);

  if (directChildren.length !== 2) {
    throw new Error(
      `${componentName} requires exactly two direct React element children.`,
    );
  }

  return [directChildren[0]!, directChildren[1]!];
}

function MenuCheckIcon() {
  return (
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
  );
}

function MenuDotIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-2.5 fill-current"
      viewBox="0 0 8 8"
    >
      <circle cx="4" cy="4" r="3" />
    </svg>
  );
}

function MenuChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3.5L10.5 8L6 12.5" />
    </svg>
  );
}

export function AppMenu<T extends object = object>({
  children,
  className,
  size = "md",
  ...props
}: AppMenuProps<T>) {
  assertAppMenuPrimitiveContract(children);

  return (
    <ReactAriaMenu
      {...props}
      className={composeRenderProps(
        className,
        (resolvedClassName, renderProps) =>
          cn(
            appMenuVariants({
              size,
              empty: renderProps.isEmpty,
            }),
            resolvedClassName,
          ),
      )}
    >
      {children}
    </ReactAriaMenu>
  );
}

export function AppMenuItem<T extends object = object>({
  children,
  className,
  size = "md",
  textValue,
  ...props
}: AppMenuItemProps<T>) {
  const resolvedTextValue =
    textValue ?? (typeof children === "string" ? children : undefined);

  return (
    <ReactAriaMenuItem
      {...props}
      {...(resolvedTextValue !== undefined ? { textValue: resolvedTextValue } : {})}
      className={composeRenderProps(
        className,
        (resolvedClassName, renderProps) =>
          cn(
            appMenuItemVariants({
              size,
              focused: renderProps.isFocused,
              open: renderProps.isOpen,
              pressed: renderProps.isPressed,
              selected: renderProps.isSelected,
              disabled: renderProps.isDisabled,
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
            {renderProps.selectionMode !== "none" ? (
              <span data-slot="selection" className="inline-flex size-4 items-center justify-center">
                {renderProps.isSelected ? (
                  renderProps.selectionMode === "multiple" ? (
                    <MenuCheckIcon />
                  ) : (
                    <MenuDotIcon />
                  )
                ) : null}
              </span>
            ) : null}
            {typeof resolvedChildren === "string" ? (
              <AppMenuText slot="label">{resolvedChildren}</AppMenuText>
            ) : (
              resolvedChildren
            )}
            {renderProps.hasSubmenu ? (
              <span data-slot="submenu" className="inline-flex items-center justify-center">
                <MenuChevronRightIcon />
              </span>
            ) : null}
          </>
        ),
      )}
    </ReactAriaMenuItem>
  );
}

export function AppMenuSection<T extends object = object>({
  className,
  size = "md",
  ...props
}: AppMenuSectionProps<T>) {
  return (
    <ReactAriaMenuSection
      {...props}
      className={cn(appMenuSectionVariants({ size }), className)}
    />
  );
}

export function AppMenuHeader({
  className,
  size = "md",
  ...props
}: AppMenuHeaderProps) {
  return (
    <ReactAriaHeader
      {...props}
      className={cn(appMenuHeaderVariants({ size }), className)}
    />
  );
}

export function AppMenuSeparator({
  className,
  orientation = "horizontal",
  size = "md",
  ...props
}: AppMenuSeparatorProps) {
  return (
    <ReactAriaSeparator
      {...props}
      orientation={orientation}
      className={cn(appMenuSeparatorVariants({ size }), className)}
    />
  );
}

export function AppMenuText({
  className,
  slot,
  ...props
}: AppMenuTextProps) {
  const resolvedSlot = slot === "description" ? "description" : "label";

  return (
    <ReactAriaText
      {...props}
      slot={slot}
      data-app-menu-text={resolvedSlot}
      className={cn(
        appMenuTextVariants({ description: resolvedSlot === "description" }),
        className,
      )}
    />
  );
}

export function AppMenuKeyboard({
  children,
  className,
  ...props
}: AppMenuKeyboardProps) {
  return (
    <kbd
      {...props}
      data-app-menu-keyboard=""
      className={cn(appMenuKeyboardVariants(), className)}
    >
      {children}
    </kbd>
  );
}

export function AppMenuTrigger({
  children,
  popoverClassName,
  ...props
}: AppMenuTriggerProps) {
  const [trigger, menu] = assertTriggerPair("AppMenuTrigger", children);

  return (
    <ReactAriaMenuTrigger {...props}>
      {trigger}
      <ReactAriaPopover className={cn(appMenuPopoverVariants(), popoverClassName)}>
        {menu}
      </ReactAriaPopover>
    </ReactAriaMenuTrigger>
  );
}

export function AppSubmenuTrigger({
  children,
  popoverClassName,
  ...props
}: AppSubmenuTriggerProps) {
  const [trigger, menu] = assertTriggerPair("AppSubmenuTrigger", children);

  return (
    <ReactAriaSubmenuTrigger {...props}>
      {trigger}
      <ReactAriaPopover
        offset={-2}
        crossOffset={-4}
        className={cn(appMenuSubmenuPopoverVariants(), popoverClassName)}
      >
        {menu}
      </ReactAriaPopover>
    </ReactAriaSubmenuTrigger>
  );
}
