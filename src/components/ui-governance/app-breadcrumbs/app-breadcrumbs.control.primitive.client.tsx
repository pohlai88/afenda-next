/**
 * @afenda-owner app-breadcrumbs
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Breadcrumbs for governed shared UI
 */
"use client";

import {
  Breadcrumb as ReactAriaBreadcrumb,
  Breadcrumbs as ReactAriaBreadcrumbs,
  Link as ReactAriaLink,
  type BreadcrumbProps as ReactAriaBreadcrumbProps,
  type BreadcrumbsProps as ReactAriaBreadcrumbsProps,
  type LinkProps as ReactAriaLinkProps,
} from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appBreadcrumbsCompositionContract,
  appBreadcrumbsControlSourcePath,
  appBreadcrumbsReactAriaPrimitives,
} from "@/components/ui-governance/app-breadcrumbs/app-breadcrumbs.contract.primitive.shared";

export const appBreadcrumbsVariants = cva(
  "m-0 flex min-w-0 flex-wrap items-center gap-1 list-none p-0",
  {
    variants: {
      size: {
        default: "text-body",
        compact: "text-label",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export const appBreadcrumbItemVariants = cva("flex min-w-0 items-center gap-1", {
  variants: {
    size: {
      default: "",
      compact: "",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const appBreadcrumbLinkVariants = cva(
  "inline-flex min-w-0 max-w-full items-center rounded-sm outline-none transition-colors underline-offset-2",
  {
    variants: {
      size: {
        default: "",
        compact: "",
      },
      current: {
        true: "cursor-default font-medium no-underline",
        false: "opacity-75 hover:underline focus-visible:underline",
      },
      disabled: {
        true: "cursor-default opacity-50 no-underline",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      current: false,
      disabled: false,
    },
  },
);

type AppBreadcrumbsBaseProps<T extends object> = ReactAriaBreadcrumbsProps<T>;

export type AppBreadcrumbsProps<T extends object = object> =
  AppBreadcrumbsBaseProps<T> &
    VariantProps<typeof appBreadcrumbsVariants> & {
      className?: string;
    };

type AppBreadcrumbLinkProps = Omit<
  ReactAriaLinkProps,
  "children" | "className" | "id" | "render" | "slot" | "style"
>;

export type AppBreadcrumbProps = Omit<
  ReactAriaBreadcrumbProps,
  "children"
> &
  AppBreadcrumbLinkProps &
  VariantProps<typeof appBreadcrumbsVariants> & {
    children: ReactNode;
    className?: string;
    linkClassName?: string;
    separator?: ReactNode;
  };

function BreadcrumbChevron() {
  return (
    <svg
      aria-hidden="true"
      className="size-3 shrink-0 opacity-50"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 3.5L10.5 8L6 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function assertAppBreadcrumbsPrimitiveContract(): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appBreadcrumbsControlSourcePath.length === 0 ||
    appBreadcrumbsReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppBreadcrumbs governance contract is incomplete.");
  }

  if (
    appBreadcrumbsCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppBreadcrumbs composition contract is incomplete.");
  }
}

export function AppBreadcrumbs<T extends object = object>({
  className,
  size,
  ...props
}: AppBreadcrumbsProps<T>) {
  assertAppBreadcrumbsPrimitiveContract();

  return (
    <ReactAriaBreadcrumbs
      {...props}
      className={cn(appBreadcrumbsVariants({ size }), className)}
    />
  );
}

export function AppBreadcrumb({
  children,
  className,
  linkClassName,
  separator,
  size,
  ...props
}: AppBreadcrumbProps) {
  const {
    id,
    href,
    target,
    rel,
    download,
    referrerPolicy,
    ping,
    routerOptions,
  } = props;

  const breadcrumbProps: ReactAriaBreadcrumbProps = {
    ...(id !== undefined ? { id } : {}),
    className: cn(appBreadcrumbItemVariants({ size }), className),
  };

  const linkProps: AppBreadcrumbLinkProps = {
    ...(href !== undefined ? { href } : {}),
    ...(target !== undefined ? { target } : {}),
    ...(rel !== undefined ? { rel } : {}),
    ...(download !== undefined ? { download } : {}),
    ...(referrerPolicy !== undefined ? { referrerPolicy } : {}),
    ...(ping !== undefined ? { ping } : {}),
    ...(routerOptions !== undefined ? { routerOptions } : {}),
  };

  return (
    <ReactAriaBreadcrumb {...breadcrumbProps}>
      {({ isCurrent, isDisabled }) => (
        <>
          <ReactAriaLink
            {...linkProps}
            className={cn(
              appBreadcrumbLinkVariants({
                size,
                current: isCurrent,
                disabled: isDisabled && !isCurrent,
              }),
              linkClassName,
            )}
          >
            {children}
          </ReactAriaLink>
          {!isCurrent ? (
            <span aria-hidden="true" className="flex shrink-0 items-center">
              {separator ?? <BreadcrumbChevron />}
            </span>
          ) : null}
        </>
      )}
    </ReactAriaBreadcrumb>
  );
}
