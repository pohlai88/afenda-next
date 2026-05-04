/**
 * @afenda-owner app-tabs
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Tabs for governed shared UI
 */
"use client";

import {
  SelectionIndicator as ReactAriaSelectionIndicator,
  Tab as ReactAriaTab,
  TabList as ReactAriaTabList,
  TabPanel as ReactAriaTabPanel,
  TabPanels as ReactAriaTabPanels,
  Tabs as ReactAriaTabs,
  composeRenderProps,
  type TabListProps as ReactAriaTabListProps,
  type TabPanelProps as ReactAriaTabPanelProps,
  type TabPanelsProps as ReactAriaTabPanelsProps,
  type TabProps as ReactAriaTabProps,
  type TabsProps as ReactAriaTabsProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import { cn } from "@/components/cn";
import {
  assertHasDirectChildOfType,
  assertHasOneOfDirectChildTypes,
} from "@/components/ui-governance/governance.ui.react-aria-runtime.shared";
import {
  type AppTabsOrientation,
  type AppTabsSize,
  appTabsCompositionContract,
  appTabsControlSourcePath,
  appTabsReactAriaPrimitives,
} from "@/components/ui-governance/app-tabs/app-tabs.contract.primitive.shared";

export const appTabsVariants = cva("flex max-w-full gap-3 text-foreground", {
  variants: {
    orientation: {
      horizontal: "flex-col",
      vertical: "flex-row items-start",
    },
    size: {
      md: "",
      sm: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

export const appTabListVariants = cva(
  "relative flex max-w-full text-foreground-muted",
  {
    variants: {
      orientation: {
        horizontal:
          "min-w-0 flex-row gap-1 overflow-x-auto overflow-y-hidden border-b border-border",
        vertical:
          "w-52 shrink-0 flex-col gap-1 border-r border-border pr-2",
      },
      size: {
        md: "",
        sm: "",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      size: "md",
    },
  },
);

export const appTabVariants = cva(
  [
    "rac-focus-ring group relative inline-flex min-w-0 items-center justify-center rounded-(--radius-control) outline-none transition",
    "data-[selected]:text-foreground",
  ],
  {
    variants: {
      orientation: {
        horizontal: "px-3 py-2",
        vertical: "w-full justify-start px-3 py-2 text-start",
      },
      size: {
        md: "type-body-sm",
        sm: "text-[0.8125rem] leading-5",
      },
      selected: {
        true: "text-foreground",
        false: "text-foreground-muted hover:text-foreground",
      },
      hovered: {
        true: "text-foreground",
        false: "",
      },
      disabled: {
        true: "cursor-default text-foreground-muted opacity-60",
        false: "cursor-default",
      },
      focusVisible: {
        true: "ring-2 ring-accent-ring ring-inset",
        false: "",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      size: "md",
      selected: false,
      hovered: false,
      disabled: false,
      focusVisible: false,
    },
  },
);

export const appTabIndicatorVariants = cva(
  "absolute bg-accent transition duration-200",
  {
    variants: {
      orientation: {
        horizontal: "bottom-0 left-0 h-0.5 w-full rounded-t-full",
        vertical: "right-0 top-0 h-full w-0.5 rounded-l-full",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

export const appTabPanelsVariants = cva("relative min-w-0 flex-1", {
  variants: {
    orientation: {
      horizontal: "",
      vertical: "",
    },
    size: {
      md: "",
      sm: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

export const appTabPanelVariants = cva(
  [
    "rac-focus-ring min-w-0 rounded-(--radius-panel) bg-surface-raised text-foreground outline-none transition",
    "data-[entering]:opacity-0 data-[exiting]:opacity-0",
    "data-[exiting]:absolute data-[exiting]:inset-0 data-[exiting]:w-full",
  ],
  {
    variants: {
      size: {
        md: "p-4",
        sm: "p-3",
      },
      focusVisible: {
        true: "ring-2 ring-accent-ring ring-inset",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      focusVisible: false,
    },
  },
);

const AppTabsSizeContext = createContext<AppTabsSize>("md");
const AppTabsOrientationContext = createContext<AppTabsOrientation>("horizontal");

function assertAppTabsPrimitiveContract(children: AppTabsProps["children"]): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appTabsControlSourcePath.length === 0 ||
    appTabsReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppTabs governance contract is incomplete.");
  }

  if (
    appTabsCompositionContract.requiresChildren &&
    appTabsCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppTabs composition contract is incomplete.");
  }

  assertHasDirectChildOfType("AppTabs", children, AppTabList, "AppTabList");
  assertHasOneOfDirectChildTypes(
    "AppTabs",
    children,
    [AppTabPanels, AppTabPanel],
    ["AppTabPanels", "AppTabPanel"],
  );
}

function assertAppTabListPrimitiveContract<T extends object>(
  children: ReactNode | ((item: T) => ReactNode),
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (children === undefined || children === null) {
    throw new Error(
      "AppTabList requires explicit AppTab children or an item renderer.",
    );
  }

  if (ariaLabel === undefined && ariaLabelledBy === undefined) {
    throw new Error("AppTabList requires aria-label or aria-labelledby.");
  }
}

function assertAppTabPrimitiveContract(
  children: ReactNode | ReactAriaTabProps["children"] | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    children === undefined &&
    ariaLabel === undefined &&
    ariaLabelledBy === undefined
  ) {
    throw new Error("AppTab requires children, aria-label, or aria-labelledby.");
  }
}

type AppTabsBehaviorProps = Partial<
  Pick<
    ReactAriaTabsProps,
    | "aria-describedby"
    | "aria-details"
    | "aria-label"
    | "aria-labelledby"
    | "defaultSelectedKey"
    | "disabledKeys"
    | "id"
    | "isDisabled"
    | "keyboardActivation"
    | "onSelectionChange"
    | "orientation"
    | "render"
    | "selectedKey"
    | "slot"
    | "style"
  >
>;

export type AppTabsProps = AppTabsBehaviorProps & {
  children: ReactNode;
  className?: ReactAriaTabsProps["className"];
  size?: AppTabsSize;
};

export type AppTabListProps<T extends object = object> = Omit<
  ReactAriaTabListProps<T>,
  "children" | "className"
> & {
  children: ReactNode | ((item: T) => ReactNode);
  className?: ReactAriaTabListProps<T>["className"];
  size?: AppTabsSize;
};

export type AppTabProps = Omit<ReactAriaTabProps, "children" | "className"> & {
  children?: ReactNode | ReactAriaTabProps["children"];
  className?: ReactAriaTabProps["className"];
  indicatorClassName?: string;
  size?: AppTabsSize;
};

export type AppTabPanelsProps<T extends object = object> = Omit<
  ReactAriaTabPanelsProps<T>,
  "className"
> & {
  className?: string;
  size?: AppTabsSize;
};

export type AppTabPanelProps = Omit<ReactAriaTabPanelProps, "className"> & {
  className?: ReactAriaTabPanelProps["className"];
  size?: AppTabsSize;
};

export function AppTabs({
  children,
  className,
  orientation = "horizontal",
  size = "md",
  ...props
}: AppTabsProps) {
  assertAppTabsPrimitiveContract(children);

  return (
    <AppTabsSizeContext.Provider value={size}>
      <AppTabsOrientationContext.Provider value={orientation}>
        <ReactAriaTabs
          {...props}
          orientation={orientation}
          className={composeRenderProps(
            className,
            (resolvedClassName) =>
              cn(
                appTabsVariants({
                  orientation,
                  size,
                }),
                resolvedClassName,
              ),
          )}
        >
          {children}
        </ReactAriaTabs>
      </AppTabsOrientationContext.Provider>
    </AppTabsSizeContext.Provider>
  );
}

export function AppTabList<T extends object = object>({
  children,
  className,
  size,
  ...props
}: AppTabListProps<T>) {
  const inheritedSize = useContext(AppTabsSizeContext);
  const orientation = useContext(AppTabsOrientationContext);
  const resolvedSize = size ?? inheritedSize;

  assertAppTabListPrimitiveContract(
    children,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaTabList
      {...props}
      className={composeRenderProps(
        className,
        (resolvedClassName) =>
          cn(
            appTabListVariants({
              orientation,
              size: resolvedSize,
            }),
            resolvedClassName,
          ),
      )}
    >
      {children}
    </ReactAriaTabList>
  );
}

export function AppTab({
  children,
  className,
  indicatorClassName,
  size,
  ...props
}: AppTabProps) {
  const inheritedSize = useContext(AppTabsSizeContext);
  const orientation = useContext(AppTabsOrientationContext);
  const resolvedSize = size ?? inheritedSize;

  assertAppTabPrimitiveContract(
    children,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaTab
      {...props}
      className={composeRenderProps(
        className,
        (resolvedClassName, renderProps) =>
          cn(
            appTabVariants({
              orientation,
              size: resolvedSize,
              selected: renderProps.isSelected,
              hovered: renderProps.isHovered,
              disabled: renderProps.isDisabled,
              focusVisible: renderProps.isFocusVisible,
            }),
            resolvedClassName,
          ),
      )}
    >
      {composeRenderProps(children, (resolvedChildren) => (
        <>
          <span className="relative z-10 min-w-0 truncate">{resolvedChildren}</span>
          <ReactAriaSelectionIndicator
            className={cn(
              appTabIndicatorVariants({ orientation }),
              indicatorClassName,
            )}
          />
        </>
      ))}
    </ReactAriaTab>
  );
}

export function AppTabPanels<T extends object = object>({
  className,
  size,
  ...props
}: AppTabPanelsProps<T>) {
  const inheritedSize = useContext(AppTabsSizeContext);
  const orientation = useContext(AppTabsOrientationContext);
  const resolvedSize = size ?? inheritedSize;

  return (
    <ReactAriaTabPanels
      {...props}
      className={cn(
        appTabPanelsVariants({
          orientation,
          size: resolvedSize,
        }),
        className,
      )}
    />
  );
}

export function AppTabPanel({
  className,
  size,
  ...props
}: AppTabPanelProps) {
  const inheritedSize = useContext(AppTabsSizeContext);
  const resolvedSize = size ?? inheritedSize;

  return (
    <ReactAriaTabPanel
      {...props}
      className={composeRenderProps(
        className,
        (resolvedClassName, renderProps) =>
          cn(
            appTabPanelVariants({
              size: resolvedSize,
              focusVisible: renderProps.isFocusVisible,
            }),
            resolvedClassName,
          ),
      )}
    />
  );
}
