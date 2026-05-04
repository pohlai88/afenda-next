/**
 * @afenda-owner app-link
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Link for governed shared UI
 */
"use client";

import { Link as ReactAriaLink, composeRenderProps } from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appLinkCompositionContract,
  appLinkControlSourcePath,
  appLinkReactAriaPrimitives,
  type AppLinkSize,
  type AppLinkTone,
} from "@/components/ui-governance/app-link/app-link.contract.primitive.shared";

export const appLinkVariants = cva(
  [
    "rac-focus-ring rac-disabled inline-flex min-w-0 max-w-full items-center rounded-sm outline-none transition",
    "underline decoration-current underline-offset-2",
    "data-[disabled]:cursor-default data-[disabled]:no-underline data-[disabled]:opacity-50",
  ],
  {
    variants: {
      tone: {
        accent:
          "text-accent-strong decoration-current/55 hover:decoration-current pressed:text-accent",
        neutral:
          "text-foreground-subtle decoration-current/45 hover:text-foreground hover:decoration-current pressed:text-foreground",
      },
      size: {
        default: "type-body-sm",
        compact: "type-meta",
      },
    },
    defaultVariants: {
      tone: "accent",
      size: "default",
    },
  },
);

function assertAppLinkPrimitiveContract(
  children: AppLinkProps["children"],
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (appLinkControlSourcePath.length === 0 || appLinkReactAriaPrimitives.at(0) === undefined) {
    throw new Error("AppLink governance contract is incomplete.");
  }

  if (appLinkCompositionContract.requiresChildren && appLinkCompositionContract.requiredElements.at(0) === undefined) {
    throw new Error("AppLink composition contract is incomplete.");
  }

  if (
    (children === undefined || children === null) &&
    ariaLabel === undefined &&
    ariaLabelledBy === undefined
  ) {
    throw new Error("AppLink requires children, aria-label, or aria-labelledby.");
  }
}

type AppLinkBaseProps = ComponentProps<typeof ReactAriaLink>;

export type AppLinkProps = Omit<AppLinkBaseProps, "className"> & {
  children?: ReactNode;
  className?: AppLinkBaseProps["className"];
  size?: AppLinkSize;
  tone?: AppLinkTone;
};

export function AppLink({
  children,
  className,
  size = "default",
  tone = "accent",
  ...props
}: AppLinkProps) {
  assertAppLinkPrimitiveContract(
    children,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaLink
      {...props}
      className={composeRenderProps(className, (resolvedClassName) =>
        cn(appLinkVariants({ size, tone }), resolvedClassName),
      )}
    >
      {children}
    </ReactAriaLink>
  );
}
