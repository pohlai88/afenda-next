/**
 * @afenda-owner app-meter
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Governed read-only meter surface for bounded operational quantities
 */
"use client";

import {
  Label,
  Meter as ReactAriaMeter,
  composeRenderProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appMeterCompositionContract,
  appMeterControlSourcePath,
  appMeterReactAriaPrimitives,
  type AppMeterSize,
  type AppMeterTone,
} from "@/components/ui-governance/app-meter/app-meter.contract.primitive.shared";

export const appMeterVariants = cva(
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

export const appMeterLabelVariants = cva("type-label");

export const appMeterValueVariants = cva(
  "justify-self-end text-right tabular-nums",
  {
    variants: {
      tone: {
        accent: "text-accent-strong",
        success: "text-success",
        warning: "text-warning",
        danger: "text-danger",
      },
      size: {
        md: "type-meta",
        sm: "type-meta",
      },
    },
    defaultVariants: {
      tone: "success",
      size: "md",
    },
  },
);

export const appMeterTrackVariants = cva(
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

export const appMeterFillVariants = cva(
  [
    "h-full rounded-full transition-[width,background-color]",
    "forced-colors:bg-[Highlight]",
  ],
  {
    variants: {
      tone: {
        accent: "bg-accent",
        success: "bg-success",
        warning: "bg-warning",
        danger: "bg-danger",
      },
    },
    defaultVariants: {
      tone: "success",
    },
  },
);

type ResolvedMeterTone = Exclude<AppMeterTone, "auto">;

function getResolvedMeterTone(
  tone: AppMeterTone,
  percentage: number,
): ResolvedMeterTone {
  if (tone !== "auto") {
    return tone;
  }

  if (percentage < 70) {
    return "success";
  }

  if (percentage < 90) {
    return "warning";
  }

  return "danger";
}

function assertAppMeterPrimitiveContract(
  label: ReactNode | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appMeterControlSourcePath.length === 0 ||
    appMeterReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppMeter governance contract is incomplete.");
  }

  if (
    appMeterCompositionContract.requiresChildren &&
    appMeterCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppMeter composition contract is incomplete.");
  }

  if (
    label === undefined &&
    ariaLabel === undefined &&
    ariaLabelledBy === undefined
  ) {
    throw new Error("AppMeter requires label, aria-label, or aria-labelledby.");
  }
}

type AppMeterBaseProps = ComponentProps<typeof ReactAriaMeter>;

export type AppMeterProps = Omit<AppMeterBaseProps, "children" | "className"> & {
  className?: AppMeterBaseProps["className"];
  label?: ReactNode;
  size?: AppMeterSize;
  tone?: AppMeterTone;
};

export function AppMeter({
  className,
  label,
  size = "md",
  tone = "auto",
  ...props
}: AppMeterProps) {
  assertAppMeterPrimitiveContract(
    label,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaMeter
      {...props}
      className={composeRenderProps(className, (resolvedClassName) =>
        cn(appMeterVariants({ size }), resolvedClassName),
      )}
    >
      {({ percentage, valueText }) => {
        const resolvedTone = getResolvedMeterTone(tone, percentage);

        return (
          <>
            {label ? <Label className={appMeterLabelVariants()}>{label}</Label> : null}
            <span
              data-app-meter-value=""
              className={appMeterValueVariants({ size, tone: resolvedTone })}
            >
              {valueText}
            </span>
            <div
              data-app-meter-track=""
              className={appMeterTrackVariants({ size })}
            >
              <div
                data-app-meter-fill=""
                className={appMeterFillVariants({ tone: resolvedTone })}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </>
        );
      }}
    </ReactAriaMeter>
  );
}
