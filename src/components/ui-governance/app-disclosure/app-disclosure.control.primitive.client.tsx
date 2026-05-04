/**
 * @afenda-owner app-disclosure
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Disclosure for governed shared UI
 */
"use client";

import {
  Button,
  Disclosure as ReactAriaDisclosure,
  DisclosurePanel,
  DisclosureStateContext,
  Heading,
  type DisclosureProps as ReactAriaDisclosureProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import { useContext, type ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appDisclosureCompositionContract,
  appDisclosureControlSourcePath,
  appDisclosureReactAriaPrimitives,
  type AppDisclosureSize,
} from "@/components/ui-governance/app-disclosure/app-disclosure.contract.primitive.shared";

export const appDisclosureVariants = cva("text-foreground", {
  variants: {
    size: {
      md: "w-full max-w-xl",
      sm: "w-full max-w-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const appDisclosureTriggerVariants = cva(
  [
    "rac-focus-ring flex w-full items-center gap-2 rounded-(--radius-control) px-3 py-2 text-left outline-none transition",
    "type-body-sm font-medium text-foreground [-webkit-tap-highlight-color:transparent]",
  ],
  {
    variants: {
      size: {
        md: "",
        sm: "gap-1.5 px-2.5 py-1.5 text-sm",
      },
      disabled: {
        true: "text-foreground-muted",
        false: "hover:bg-field-hover",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  },
);

export const appDisclosureChevronVariants = cva(
  "size-4 shrink-0 text-foreground-muted transition-transform duration-200 ease-out",
  {
    variants: {
      expanded: {
        true: "rotate-90",
        false: "rotate-0",
      },
      disabled: {
        true: "text-foreground-muted",
        false: "",
      },
    },
    defaultVariants: {
      expanded: false,
      disabled: false,
    },
  },
);

export const appDisclosurePanelVariants = cva(
  "h-(--disclosure-panel-height) overflow-clip motion-safe:transition-[height]",
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

export const appDisclosurePanelContentVariants = cva(
  "text-foreground",
  {
    variants: {
      size: {
        md: "px-4 py-2",
        sm: "px-3 py-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type AppDisclosureBehaviorProps = Partial<
  Pick<
    ReactAriaDisclosureProps,
    | "defaultExpanded"
    | "id"
    | "isDisabled"
    | "isExpanded"
    | "onExpandedChange"
    | "slot"
  >
>;

export type AppDisclosureProps = AppDisclosureBehaviorProps & {
  children: ReactNode;
  className?: string;
  headerAccessory?: ReactNode;
  headingClassName?: string;
  panelClassName?: string;
  panelContentClassName?: string;
  panelRole?: "group" | "region";
  size?: AppDisclosureSize;
  title: ReactNode;
  triggerClassName?: string;
};

function assertAppDisclosurePrimitiveContract(
  title: ReactNode | undefined,
  children: ReactNode | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appDisclosureControlSourcePath.length === 0 ||
    appDisclosureReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppDisclosure governance contract is incomplete.");
  }

  if (
    appDisclosureCompositionContract.requiresChildren &&
    appDisclosureCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppDisclosure composition contract is incomplete.");
  }

  if (title === undefined || title === null) {
    throw new Error("AppDisclosure requires a title.");
  }

  if (children === undefined || children === null) {
    throw new Error("AppDisclosure requires panel content.");
  }
}

function AppDisclosureChevron({ isExpanded, isDisabled }: { isExpanded: boolean; isDisabled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={appDisclosureChevronVariants({
        expanded: isExpanded,
        disabled: isDisabled,
      })}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function DisclosureTriggerContent({
  isDisabled,
  title,
}: {
  isDisabled: boolean;
  title: ReactNode;
}) {
  const disclosureState = useContext(DisclosureStateContext);

  return (
    <>
      <AppDisclosureChevron
        isExpanded={disclosureState?.isExpanded ?? false}
        isDisabled={isDisabled}
      />
      <span>{title}</span>
    </>
  );
}

export function AppDisclosure({
  children,
  className,
  headerAccessory,
  headingClassName,
  panelClassName,
  panelContentClassName,
  panelRole = "group",
  size = "md",
  title,
  triggerClassName,
  ...props
}: AppDisclosureProps) {
  assertAppDisclosurePrimitiveContract(title, children);

  return (
    <ReactAriaDisclosure
      {...props}
      className={cn(appDisclosureVariants({ size }), className)}
    >
      <div className="flex items-center gap-2">
        <Heading className={cn("m-0 flex-1", headingClassName)}>
          <Button
            slot="trigger"
            className={(renderProps) =>
              cn(
                appDisclosureTriggerVariants({
                  size,
                  disabled: renderProps.isDisabled,
                }),
                triggerClassName,
              )
            }
          >
            {({ isDisabled: triggerDisabled }) => (
              <DisclosureTriggerContent
                isDisabled={triggerDisabled}
                title={title}
              />
            )}
          </Button>
        </Heading>
        {headerAccessory ? <div className="shrink-0">{headerAccessory}</div> : null}
      </div>
      <DisclosurePanel
        role={panelRole}
        className={cn(appDisclosurePanelVariants({ size }), panelClassName)}
      >
        <div
          className={cn(
            appDisclosurePanelContentVariants({ size }),
            panelContentClassName,
          )}
        >
          {children}
        </div>
      </DisclosurePanel>
    </ReactAriaDisclosure>
  );
}
