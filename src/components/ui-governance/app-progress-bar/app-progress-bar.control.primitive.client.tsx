/**
 * @afenda-owner app-progress-bar
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Governed progress surface for determinate and indeterminate operational work
 */
"use client";

import {
  Label,
  ProgressBar as ReactAriaProgressBar,
  composeRenderProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appProgressBarCompositionContract,
  appProgressBarControlSourcePath,
  appProgressBarReactAriaPrimitives,
  type AppProgressBarSize,
} from "@/components/ui-governance/app-progress-bar/app-progress-bar.contract.primitive.shared";

export const appProgressBarVariants = cva(
  "grid w-full max-w-64 grid-cols-[1fr_auto] gap-x-3 gap-y-2 text-foreground",
  {
    variants: {
      size: {
        md: "type-body-sm",
        sm: "type-meta",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const appProgressBarLabelVariants = cva("type-label", {
  variants: {
    base: {
      default: "",
    },
  },
  defaultVariants: {
    base: "default",
  },
});

export const appProgressBarValueVariants = cva(
  "justify-self-end text-right text-foreground-muted tabular-nums",
  {
    variants: {
      size: {
        md: "type-meta",
        sm: "type-meta",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const appProgressBarTrackVariants = cva(
  "col-span-2 overflow-hidden rounded-full bg-field ring-1 ring-inset ring-border",
  {
    variants: {
      size: {
        md: "h-3",
        sm: "h-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const appProgressBarFillVariants = cva(
  "h-full rounded-full bg-accent transition-[width] forced-colors:bg-[Highlight]",
  {
    variants: {
      size: {
        md: "",
        sm: "",
      },
      indeterminate: {
        true: "w-2/5 animate-pulse motion-reduce:animate-none",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      indeterminate: false,
    },
  },
);

function assertAppProgressBarPrimitiveContract(
  label: ReactNode | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appProgressBarControlSourcePath.length === 0 ||
    appProgressBarReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppProgressBar governance contract is incomplete.");
  }

  if (
    appProgressBarCompositionContract.requiresChildren &&
    appProgressBarCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppProgressBar composition contract is incomplete.");
  }

  if (
    label === undefined &&
    ariaLabel === undefined &&
    ariaLabelledBy === undefined
  ) {
    throw new Error(
      "AppProgressBar requires label, aria-label, or aria-labelledby.",
    );
  }
}

type AppProgressBarBaseProps = ComponentProps<typeof ReactAriaProgressBar>;

export type AppProgressBarProps = Omit<
  AppProgressBarBaseProps,
  "children" | "className"
> & {
  className?: AppProgressBarBaseProps["className"];
  label?: ReactNode;
  size?: AppProgressBarSize;
};

export function AppProgressBar({
  className,
  label,
  size = "md",
  ...props
}: AppProgressBarProps) {
  assertAppProgressBarPrimitiveContract(
    label,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaProgressBar
      {...props}
      className={composeRenderProps(className, (resolvedClassName) =>
        cn(appProgressBarVariants({ size }), resolvedClassName),
      )}
    >
      {({ isIndeterminate, percentage, valueText }) => (
        <>
          {label ? (
            <Label className={appProgressBarLabelVariants()}>{label}</Label>
          ) : null}
          <span
            data-app-progress-bar-value=""
            className={appProgressBarValueVariants({ size })}
          >
            {valueText}
          </span>
          <div
            data-app-progress-bar-track=""
            className={appProgressBarTrackVariants({ size })}
          >
            <div
              data-app-progress-bar-fill=""
              className={appProgressBarFillVariants({
                size,
                indeterminate: isIndeterminate,
              })}
              style={
                isIndeterminate ? undefined : { width: `${percentage}%` }
              }
            />
          </div>
        </>
      )}
    </ReactAriaProgressBar>
  );
}
