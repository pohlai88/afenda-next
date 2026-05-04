/**
 * @afenda-owner app-toast
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Toast region, queue, and content for governed shared UI
 */
"use client";

import {
  Text,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from "react-aria-components";
import { flushSync } from "react-dom";
import type { CSSProperties } from "react";

import { cn } from "@/components/cn";
import { AppButton } from "@/components/ui-governance/app-button/app-button.control.primitive.client";
import {
  appToastCompositionContract,
  appToastControlSourcePath,
  appToastReactAriaPrimitives,
  type AppToastContentPayload,
} from "@/components/ui-governance/app-toast/app-toast.contract.primitive.shared";

const appToastRegionClassName = [
  "fixed z-50 flex max-h-[min(560px,80vh)] flex-col-reverse gap-2 outline-none",
  "bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))]",
  "w-[min(100vw-2rem,18rem)] sm:w-72",
  "data-[focus-visible]:ring-2 data-[focus-visible]:ring-accent-ring data-[focus-visible]:ring-offset-2 data-[focus-visible]:ring-offset-background",
].join(" ");

const appToastSurfaceClassName = [
  "flex max-w-full items-center gap-3 rounded-(--radius-lg) border border-border bg-surface-raised p-3 shadow-lg outline-none forced-color-adjust-none",
  "text-foreground [view-transition-class:toast]",
  "data-[focus-visible]:ring-2 data-[focus-visible]:ring-accent-ring data-[focus-visible]:ring-offset-2 data-[focus-visible]:ring-offset-background",
].join(" ");

function wrapToastViewTransition(fn: () => void): void {
  if (typeof document !== "undefined" && "startViewTransition" in document) {
    document.startViewTransition(() => {
      flushSync(fn);
    });
  } else {
    fn();
  }
}

/** Global toast queue for product surfaces; import and call `appToastQueue.add` from client code. */
export const appToastQueue = new ToastQueue<AppToastContentPayload>({
  wrapUpdate: wrapToastViewTransition,
});

function ToastCloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function assertAppToastRegionPrimitiveContract(): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appToastControlSourcePath.length === 0 ||
    appToastReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppToastRegion governance contract is incomplete.");
  }

  if (
    appToastCompositionContract.requiresChildren &&
    appToastCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppToastRegion composition contract is incomplete.");
  }
}

export type AppToastRegionProps = {
  /** Optional override for tests or secondary regions; defaults to `appToastQueue`. */
  queue?: ToastQueue<AppToastContentPayload>;
  className?: string;
  toastClassName?: string;
};

export function AppToastRegion({
  className,
  queue = appToastQueue,
  toastClassName,
}: AppToastRegionProps) {
  assertAppToastRegionPrimitiveContract();

  return (
    <ToastRegion queue={queue} className={cn(appToastRegionClassName, className)}>
      {({ toast }) => (
        <Toast
          toast={toast}
          className={cn(appToastSurfaceClassName, toastClassName)}
          style={{ viewTransitionName: toast.key } as CSSProperties}
        >
          <ToastContent className="flex min-w-0 flex-1 flex-col gap-0.5">
            <Text slot="title" className="type-label text-foreground">
              {toast.content.title}
            </Text>
            {toast.content.description ? (
              <Text slot="description" className="type-meta text-foreground-muted">
                {toast.content.description}
              </Text>
            ) : null}
          </ToastContent>
          <AppButton
            slot="close"
            aria-label="Dismiss notification"
            variant="quiet"
            size="sm"
            className="size-8 shrink-0 rounded-(--radius-control) p-0 text-foreground-muted hover:text-foreground"
          >
            <ToastCloseIcon />
          </AppButton>
        </Toast>
      )}
    </ToastRegion>
  );
}
