/**
 * @afenda-owner app-modal
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Governed modal overlay shell for blocking workflow dialogs
 */
"use client";

import {
  DialogTrigger as ReactAriaDialogTrigger,
  Modal as ReactAriaModal,
  ModalOverlay as ReactAriaModalOverlay,
  composeRenderProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactElement, ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appModalCompositionContract,
  appModalControlSourcePath,
  appModalReactAriaPrimitives,
  type AppModalPlacement,
  type AppModalSize,
} from "@/components/ui-governance/app-modal/app-modal.contract.primitive.shared";
import { getDirectElementChildren } from "@/components/ui-governance/governance.ui.react-aria-runtime.shared";

export const appModalOverlayVariants = cva(
  "absolute inset-0 z-50 min-h-[var(--page-height)] w-full bg-black/55 backdrop-blur-[2px]",
  {
    variants: {
      entering: {
        true: "animate-in fade-in duration-200 ease-out",
        false: "",
      },
      exiting: {
        true: "animate-out fade-out duration-150 ease-in",
        false: "",
      },
    },
    defaultVariants: {
      entering: false,
      exiting: false,
    },
  },
);

export const appModalViewportVariants = cva(
  "sticky top-0 flex min-h-[var(--visual-viewport-height)] w-full px-4 py-6 sm:px-6",
  {
    variants: {
      placement: {
        center: "items-center justify-center",
        top: "items-start justify-center pt-10 sm:pt-14",
      },
    },
    defaultVariants: {
      placement: "center",
    },
  },
);

export const appModalPanelVariants = cva(
  [
    "surface-raised type-body w-full overflow-auto rounded-(--radius-panel) text-foreground outline-none shadow-xl",
    "max-h-[calc(var(--visual-viewport-height)*0.9)]",
  ],
  {
    variants: {
      size: {
        md: "max-w-lg",
        lg: "max-w-2xl",
      },
      entering: {
        true: "animate-in zoom-in-95 duration-200 ease-out",
        false: "",
      },
      exiting: {
        true: "animate-out zoom-out-95 duration-150 ease-in",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      entering: false,
      exiting: false,
    },
  },
);

type AppModalOverlayBaseProps = ComponentProps<typeof ReactAriaModalOverlay>;
type AppModalPanelBaseProps = ComponentProps<typeof ReactAriaModal>;

export type AppModalProps = Omit<
  AppModalOverlayBaseProps,
  "children" | "className"
> & {
  children: ReactNode;
  className?: AppModalPanelBaseProps["className"];
  overlayClassName?: AppModalOverlayBaseProps["className"];
  placement?: AppModalPlacement;
  size?: AppModalSize;
  viewportClassName?: string;
};

export type AppDialogTriggerProps = Omit<
  ComponentProps<typeof ReactAriaDialogTrigger>,
  "children"
> & {
  children: ReactNode;
};

function assertAppModalPrimitiveContract(children: AppModalProps["children"]): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appModalControlSourcePath.length === 0 ||
    appModalReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppModal governance contract is incomplete.");
  }

  if (
    appModalCompositionContract.requiresChildren &&
    appModalCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppModal composition contract is incomplete.");
  }

  if (children === undefined || children === null) {
    throw new Error("AppModal requires children.");
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

export function AppModal({
  children,
  className,
  overlayClassName,
  placement = "center",
  size = "md",
  viewportClassName,
  ...props
}: AppModalProps) {
  assertAppModalPrimitiveContract(children);

  return (
    <ReactAriaModalOverlay
      {...props}
      className={composeRenderProps(
        overlayClassName,
        (resolvedClassName, renderProps) =>
          cn(
            appModalOverlayVariants({
              entering: renderProps.isEntering,
              exiting: renderProps.isExiting,
            }),
            resolvedClassName,
          ),
      )}
    >
      <div
        data-app-modal-viewport=""
        className={cn(appModalViewportVariants({ placement }), viewportClassName)}
      >
        <ReactAriaModal
          data-app-modal-panel=""
          className={composeRenderProps(
            className,
            (resolvedClassName, renderProps) =>
              cn(
                appModalPanelVariants({
                  size,
                  entering: renderProps.isEntering,
                  exiting: renderProps.isExiting,
                }),
                resolvedClassName,
              ),
          )}
        >
          {children}
        </ReactAriaModal>
      </div>
    </ReactAriaModalOverlay>
  );
}

export function AppDialogTrigger({
  children,
  ...props
}: AppDialogTriggerProps) {
  const [trigger, modal] = assertTriggerPair("AppDialogTrigger", children);

  return (
    <ReactAriaDialogTrigger {...props}>
      {trigger}
      {modal}
    </ReactAriaDialogTrigger>
  );
}
