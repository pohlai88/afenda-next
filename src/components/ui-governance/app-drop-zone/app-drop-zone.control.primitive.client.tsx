/**
 * @afenda-owner app-drop-zone
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary client
 * @afenda-description Canonical explicit client control surface wrapping React Aria Drop Zone for governed shared UI
 */
"use client";

import {
  DropZone as ReactAriaDropZone,
  Text,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/components/cn";
import {
  appDropZoneCompositionContract,
  appDropZoneControlSourcePath,
  appDropZoneReactAriaPrimitives,
  type AppDropZoneSize,
} from "@/components/ui-governance/app-drop-zone/app-drop-zone.contract.primitive.shared";

export const appDropZoneVariants = cva(
  [
    "rac-focus-ring rac-disabled flex w-full items-center justify-center rounded-(--radius-control) border border-dashed text-center outline-none transition",
    "type-body-sm",
  ],
  {
    variants: {
      size: {
        md: "min-h-28 px-4 py-5",
        sm: "min-h-24 px-3 py-4",
      },
      disabled: {
        true: "cursor-default border-border bg-surface-raised text-foreground-muted",
        false: "cursor-pointer border-border-strong bg-field text-foreground hover:bg-field-hover",
      },
      dropTarget: {
        true: "border-accent bg-accent/10 text-foreground",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
      dropTarget: false,
    },
  },
);

export const appDropZoneContentVariants = cva("flex w-full flex-col items-center justify-center text-center", {
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

export const appDropZoneLabelVariants = cva(
  "type-label max-w-full text-balance text-foreground",
  {
    variants: {
      size: {
        md: "",
        sm: "text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const appDropZoneDescriptionVariants = cva(
  "type-meta max-w-full text-balance text-foreground-muted",
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

type AppDropZoneBehaviorProps = Partial<
  Pick<
    ComponentProps<typeof ReactAriaDropZone>,
    | "aria-describedby"
    | "aria-details"
    | "aria-label"
    | "aria-labelledby"
    | "getDropOperation"
    | "isDisabled"
    | "onDrop"
    | "onDropActivate"
    | "onDropEnter"
    | "onDropExit"
    | "onDropMove"
    | "onHoverChange"
    | "onHoverEnd"
    | "onHoverStart"
    | "slot"
  >
>;

export type AppDropZoneProps = AppDropZoneBehaviorProps & {
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  description?: ReactNode;
  descriptionClassName?: string;
  label?: ReactNode;
  labelClassName?: string;
  size?: AppDropZoneSize;
};

function assertAppDropZonePrimitiveContract(
  children: ReactNode | undefined,
  label: ReactNode | undefined,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
): void {
  if (process.env["NODE_ENV"] === "production") {
    return;
  }

  if (
    appDropZoneControlSourcePath.length === 0 ||
    appDropZoneReactAriaPrimitives.at(0) === undefined
  ) {
    throw new Error("AppDropZone governance contract is incomplete.");
  }

  if (
    appDropZoneCompositionContract.requiresChildren &&
    appDropZoneCompositionContract.requiredElements.at(0) === undefined
  ) {
    throw new Error("AppDropZone composition contract is incomplete.");
  }

  if (
    label == null &&
    ariaLabel === undefined &&
    ariaLabelledBy === undefined
  ) {
    throw new Error(
      "AppDropZone requires label, aria-label, or aria-labelledby.",
    );
  }

  if (label == null && children == null) {
    throw new Error("AppDropZone requires visible label content or children.");
  }
}

export function AppDropZone({
  children,
  className,
  contentClassName,
  description,
  descriptionClassName,
  label,
  labelClassName,
  size = "md",
  ...props
}: AppDropZoneProps) {
  assertAppDropZonePrimitiveContract(
    children,
    label,
    props["aria-label"],
    props["aria-labelledby"],
  );

  return (
    <ReactAriaDropZone
      {...props}
      className={(renderProps) =>
        cn(
          appDropZoneVariants({
            size,
            disabled: renderProps.isDisabled,
            dropTarget: renderProps.isDropTarget,
          }),
          className,
        )
      }
    >
      <div className={cn(appDropZoneContentVariants({ size }), contentClassName)}>
        {children ? <div className="max-w-full">{children}</div> : null}
        {label ? (
          <Text
            slot="label"
            className={cn(appDropZoneLabelVariants({ size }), labelClassName)}
          >
            {label}
          </Text>
        ) : null}
        {description ? (
          <div
            className={cn(
              appDropZoneDescriptionVariants({ size }),
              descriptionClassName,
            )}
          >
            {description}
          </div>
        ) : null}
      </div>
    </ReactAriaDropZone>
  );
}
